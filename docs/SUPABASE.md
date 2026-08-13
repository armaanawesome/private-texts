# Supabase — accounts and progress sync

What the app expects a Supabase project to look like. **Nothing here has been run
against a live project.** No project is provisioned yet, so treat this as the
spec to build from, not a record of what exists.

Accounts are **optional**. The game is fully playable signed out on local saves,
and every case is reachable without an account. Sync is the only thing an
account buys, so nothing below may become a requirement to play.

---

## 1. Environment

Two variables, read in `src/auth/config.ts`:

```
EXPO_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<the anon / publishable key>
```

**Only the anon key.** `EXPO_PUBLIC_*` values are inlined into the JavaScript
bundle at build time and are extractable from any shipped app — this project has
already been bitten once by assuming otherwise. The `service_role` key bypasses
row-level security entirely; if it ever reaches a client bundle, every player can
read and rewrite every other player's rows. `decideSupabaseConfig` refuses a key
that looks like a service key rather than letting it through.

If either variable is missing the app does **not** crash. `getSupabase()` returns
`{ kind: 'unavailable' }`, sign-in reports that accounts are unavailable, and the
game carries on with local saves. That degradation is deliberate: this project
has already shipped one launch crash caused by configuring a client with a bad
key, so an absent or wrong key must never take the app down on startup.

## 2. Auth settings

Email/password only. **Do not enable Google or Apple.** Apple's App Store
guideline 4.8 requires Sign in with Apple wherever a third-party social login is
offered, and that needs a paid Apple Developer membership this project does not
have. Adding Google would make the iOS build unshippable.

In **Authentication → Providers**: leave Email enabled, disable everything else.

In **Authentication → Sign In / Providers → Email**, decide on confirmation:

- **Confirm email ON** (default) — the player must click a link before the
  session works. Safer, but they cannot sync until they leave the app and come
  back, which is a poor first run and a poor demo.
- **Confirm email OFF** — sign-up returns a usable session immediately.

For the hackathon build, **off** is the honest choice: the account exists only to
carry save data between two phones, there is nothing to abuse, and a demo that
requires an inbox round trip is a demo that fails on stage. Turn it on before any
real public release.

## 3. Schema

One table. Column names are snake_case because that is Postgres convention;
`src/auth/sync.ts` maps them to the app's camelCase blob and then validates the
result through `saveBlobSchema` — the *same* schema local saves use — so a row
written by a newer build or hand-edited in the dashboard is never trusted blind.

```sql
create table public.case_progress (
  user_id     uuid        not null references auth.users (id) on delete cascade,
  case_id     text        not null,
  read_message_ids            text[] not null default '{}',
  confirmed_contradiction_ids text[] not null default '{}',
  last_thread_id  text,
  last_message_id text,
  updated_at  timestamptz not null default now(),

  -- Load-bearing. sync.ts upserts with { onConflict: 'user_id,case_id' }, and
  -- without this exact composite key every sync inserts duplicate rows instead
  -- of updating, so a player accumulates one row per sync per case.
  primary key (user_id, case_id)
);
```

Notes on the column choices:

- **`text[]`, not `jsonb`.** The client sends real JavaScript arrays of ids and
  reads them back the same way. `jsonb` would work but would put a second
  encoding step between two things that are already arrays on both sides.
- **`on delete cascade`** — deleting the auth user takes their progress with it,
  which is what a player asking to delete their account means.
- **`last_thread_id` / `last_message_id` are nullable.** A save written before
  the resume feature existed has neither, and the local schema treats them as
  optional for exactly that reason: making them required would have deleted
  every existing playthrough on upgrade as though it were corrupt.
- **No `id` surrogate key.** The natural key is the pair, and adding a serial
  would let two rows exist for one (user, case).

## 4. Row-level security

**This is the part that matters.** Without it, the anon key — which ships in the
bundle and is readable by anyone — grants every player read and write access to
every other player's rows.

```sql
alter table public.case_progress enable row level security;

create policy "read own progress"
  on public.case_progress for select
  using (auth.uid() = user_id);

create policy "insert own progress"
  on public.case_progress for insert
  with check (auth.uid() = user_id);

create policy "update own progress"
  on public.case_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own progress"
  on public.case_progress for delete
  using (auth.uid() = user_id);
```

Both `using` and `with check` are needed on update: `using` decides which rows
you may target, `with check` decides what you may leave behind. With only
`using`, a player could take one of their own rows and rewrite its `user_id` to
somebody else's.

The upsert in `sync.ts` needs **insert and update** policies, because an upsert
is whichever one the row turns out to need.

`sync.ts` also filters `.eq('user_id', user.id)` on read even though RLS already
does that. It is redundant on purpose — it costs nothing and it states at the
call site that the query is per-user, so the intent survives someone later
reading the query without knowing the policies exist.

## 5. Verifying it

Row-level security is the thing most likely to be silently wrong, and a wrong
policy looks exactly like a working one from a single account. Check it with
two:

1. Sign up as A on one device, play a case, sync.
2. Sign up as B on another (or a simulator). Sync.
3. B must see **none** of A's progress. If B sees A's rows, RLS is off or the
   policies did not apply — stop and fix it before shipping.
4. Sign in as A on B's device. A's progress must arrive.

Then the merge behaviour, which is the part that can lose real work:

5. Play case 1 offline on both devices, reading *different* messages on each.
6. Sync both.
7. Both devices must end with the **union** of the two sets. Losing a read
   message is the failure this design exists to prevent — `planSaveSync` in
   `src/state/saveMerge.ts` unions rather than overwrites, and it is unit-tested,
   but this is the end-to-end proof.

## 6. What is not built

- **No profile table.** There is nothing to store beyond the auth user; the
  player has no display name, avatar, or friends in this game.
- **No entitlement sync.** Purchases are RevenueCat's job and RevenueCat already
  restores them per store account. Duplicating that here would create two
  sources of truth about who has paid.
- **No realtime.** Sync is explicit, on sign-in and from settings. A deduction
  game played alone has nothing to push live.
