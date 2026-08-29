-- Progress sync: the table, its row-level security, and the limits that keep a
-- signed-in player from using this table as free storage.
--
-- WHY THIS FILE EXISTS
--
-- These policies were previously written down only as prose in docs/SUPABASE.md.
-- They had genuinely been applied and verified against a live project, but a
-- policy that lives in a paragraph cannot be re-applied, diffed, or reviewed --
-- and row-level security is the single thing standing between the anon key,
-- which ships inside every build and is readable by anyone, and every player's
-- rows. If the project is ever recreated, restored, or edited in the dashboard,
-- prose is not what puts the policies back. This file is.
--
-- Idempotent throughout, so it can be re-run against a project that already has
-- some of it.

create table if not exists public.case_progress (
  user_id     uuid        not null references auth.users (id) on delete cascade,
  case_id     text        not null,
  read_message_ids            text[] not null default '{}',
  confirmed_contradiction_ids text[] not null default '{}',
  last_thread_id  text,
  last_message_id text,
  updated_at  timestamptz not null default now(),

  -- Load-bearing. src/auth/sync.ts upserts with { onConflict: 'user_id,case_id' },
  -- and without this exact composite key every sync inserts duplicate rows
  -- instead of updating, so a player accumulates one row per sync per case.
  primary key (user_id, case_id)
);

-- ---------------------------------------------------------------------------
-- Row-level security
--
-- Without this the anon key grants every player read and write over every other
-- player's rows.
-- ---------------------------------------------------------------------------

-- Added after the table shipped, so it is a separate idempotent statement
-- rather than a column in the create above: existing projects already have the
-- table and would skip a changed create-if-not-exists entirely.
--
-- Solved means the right person was named, with the proof and motive in hand.
-- Cases unlock in order, so this row is what stands between a player and the
-- rest of the game. NOT NULL DEFAULT false so every row written before this
-- column existed reads as unsolved, which is the safe direction.
alter table public.case_progress
  add column if not exists solved boolean not null default false;

alter table public.case_progress enable row level security;

drop policy if exists "read own progress"   on public.case_progress;
drop policy if exists "insert own progress" on public.case_progress;
drop policy if exists "update own progress" on public.case_progress;
drop policy if exists "delete own progress" on public.case_progress;

-- `(select auth.uid())`, not bare `auth.uid()`: wrapped in a subselect Postgres
-- evaluates it once as an InitPlan; bare, it is re-evaluated for every row
-- scanned.
--
-- `to authenticated` on every policy: without a TO clause the policy is also
-- evaluated for the anon role, which can never satisfy it. Note that the role
-- check alone would be authentication without authorisation -- it is only safe
-- paired with the ownership predicate below. Do not swap in
-- `auth.role() = 'authenticated'`: Supabase has deprecated it, and it passes for
-- anonymous sign-ins, which carry the authenticated Postgres role.

create policy "read own progress"
  on public.case_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "insert own progress"
  on public.case_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- Both clauses are required. `using` decides which rows may be targeted;
-- `with check` decides what may be left behind. With only `using`, a player
-- could take one of their own rows and rewrite its user_id to somebody else's.
create policy "update own progress"
  on public.case_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "delete own progress"
  on public.case_progress for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- Size limits
--
-- RLS decides WHOSE rows a player may write. It says nothing about HOW MUCH,
-- and the client is not the only thing that can write here: an account holder
-- can call the REST API directly with their own token and put whatever they
-- like in their own rows. Unconstrained, `case_progress` is an open write-any-
-- volume endpoint attached to the project's quota -- a signed-up attacker could
-- park arbitrary megabytes in these text arrays, which is somebody else's
-- storage bill and, on a free tier, a denial of service against the app itself.
--
-- The app's real numbers are nowhere near these ceilings: the longest case id is
-- around fifteen characters and the busiest case has a few hundred messages. The
-- limits are set far above legitimate use so they can never reject a real save,
-- and far below anything worth abusing.
-- ---------------------------------------------------------------------------

alter table public.case_progress drop constraint if exists case_progress_case_id_shape;
alter table public.case_progress drop constraint if exists case_progress_read_ids_bounded;
alter table public.case_progress drop constraint if exists case_progress_confirmed_ids_bounded;
alter table public.case_progress drop constraint if exists case_progress_pointer_bounded;

-- Case ids are slugs (`the-night-ferry`). Anchored and bounded, so the column
-- cannot become a general-purpose key-value store.
alter table public.case_progress
  add constraint case_progress_case_id_shape
  check (case_id ~ '^[a-z0-9][a-z0-9-]{0,63}$');

alter table public.case_progress
  add constraint case_progress_read_ids_bounded
  check (
    cardinality(read_message_ids) <= 2000
    and octet_length(array_to_string(read_message_ids, ',')) <= 65536
  );

alter table public.case_progress
  add constraint case_progress_confirmed_ids_bounded
  check (
    cardinality(confirmed_contradiction_ids) <= 500
    and octet_length(array_to_string(confirmed_contradiction_ids, ',')) <= 16384
  );

alter table public.case_progress
  add constraint case_progress_pointer_bounded
  check (
    (last_thread_id  is null or length(last_thread_id)  <= 128)
    and (last_message_id is null or length(last_message_id) <= 128)
  );

-- KNOWN CEILING: the number of ROWS one account may create is still unbounded --
-- an attacker can invent as many distinct slug-shaped case_ids as they like, at
-- roughly 80KB each. The per-row caps bound the damage per row and the slug
-- pattern makes bulk junk awkward, which is the cheap ninety percent. If this
-- ever matters, the fix is a per-user row-count trigger, not a wider constraint
-- here. Supabase's own rate limits are the other half of the answer.

-- No index beyond the primary key. Every query filters on user_id, and the
-- composite PK (user_id, case_id) already has it as the leading column, so the
-- PK index serves both the RLS predicate and sync.ts's `.eq('user_id', ...)`.
