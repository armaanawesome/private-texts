# Security review — 2026-08-28

An adversarial pass over everything built so far: what an attacker can reach,
what they can take, and what changed in response. Written as a record rather than
a checklist, because the two real findings were both *placement* bugs — the rule
existed and was correct, it just was not applied where it had to be.

Scope: the Expo/React Native client, the Supabase progress-sync backend, the
RevenueCat entitlement path, local storage, and the dependency tree.

---

## Threat model

The app is a single-player deduction game. Worth stating plainly, because it
decides what counts as a vulnerability here:

- **Every case's prose is bundled into the app.** All sixteen ship in the binary.
  Someone determined to read a paid case without paying can unzip the `.apk` and
  read the JavaScript bundle. That is inherent to an offline game and is not
  fixable by gating; it is why the paywall protects *convenience and the play
  experience*, not *secrecy of the text*.
- **Local save files are not an attack surface worth defending.** A player can
  edit their own progress. They cheat themselves in a game with no leaderboard,
  no multiplayer, and no shared state. Not a finding.
- **What genuinely matters:** (1) one player reading or writing another player's
  data, (2) a paid case opening for someone who has not paid through the app's own
  navigation, (3) a secret reaching the client bundle, (4) anything that turns the
  project's Supabase quota into somebody else's resource.

---

## Findings

### 1. CRITICAL — the paywall was enforced on the tile, not on the case

**Fixed.** `app/case/[caseId]/_layout.tsx`, `src/entitlements/access.ts`.

Lock state was computed in `app/index.tsx` for one purpose: choosing a link
target. A ternary picked `/paywall` or the case route and handed it to `<Link>`.

That decides what a *tile* does. Nothing at the destination re-asked the question
— `useEntitlements` was not imported anywhere under `app/case/`, and the case
layout's only guard was a redirect when the script was missing, which checks that
the case *exists*, not that the player may open it.

`app.json` sets `"scheme": "privatetexts"`, and expo-router derives a deep link
for every file under `app/` with no allowlist. So every paid case also answered to
a URL that never passed through the grid:

```
privatetexts://case/the-wake/threads
```

Twelve of the sixteen cases — the entire paid catalogue — open that way. No
rooting, no patched bundle, no proxy, no tooling: a URL in a browser, a link in a
note, or one `adb shell am start`.

**Confidence.** The missing guard is certain — it is the absence of a check, read
directly from the source, and the regression tests below now assert its presence.
The deep-link *reachability* follows from expo-router's documented file-based
linking plus the registered scheme; it has not been demonstrated on a handset,
because the app has never been installed on one. That demonstration is still
outstanding and worth doing when the first device build lands, but the fix does
not depend on it: a route that never checks entitlement is wrong regardless of
which paths reach it.

**The fix.** The rule moved to `src/entitlements/access.ts` and is enforced in the
case layout — the single component every case tab is a child of, and the only
thing that loads a script into `useCaseStore`. Three things were needed, and the
last is the one that is easy to get wrong:

- **Block at the destination.** A blocked verdict redirects home. Home rather
  than `/paywall`, because the paywall is a modal that dismisses with
  `router.back()`, and a deep link arrives with no history behind it —
  redirecting into it would strand the player in a modal with no way out.
- **Fail closed, but not on the customer.** `useEntitlements` opens at `[]` with
  `loading: true`. A guard that treated an empty array as "blocked" would eject a
  *paying* player from a case they own on the first render, every time. Hence a
  distinct `checking` state that renders nothing and decides nothing.
- **Gate the load, not just the render.** The layout's effect ran *before* the
  early return, so a render-only guard would still have put the paid script into
  the store on its way out — and `app/thread/[threadId].tsx` renders whatever the
  store holds. The case would have stayed readable at a second URL after the first
  one bounced. The effect is now gated on the access decision too.

### 2. HIGH — the Test Store harness shipped in release builds

**Fixed.** `app/debug.tsx`.

`app/index.tsx` wrapped its link to the harness in `__DEV__`. That hides the
entrance and nothing else: the route is a file under `app/`, so expo-router
published it and `app/_layout.tsx` registered its screen unconditionally.
`privatetexts://debug` therefore opened a live purchase-and-restore harness with
internal entitlement diagnostics in a production build.

It cannot grant anything for free — every button goes through the real store — so
this is exposure and workshop debris rather than a bypass. The guard now lives in
the screen, because the screen is what the URL reaches.

### 3. MEDIUM — row-level security existed only as prose

**Fixed.** `supabase/migrations/0001_case_progress.sql`.

The policies were correct, and `docs/SUPABASE.md` records a real two-account
verification against a live project on 2026-08-12, including the test that matters
most: B inserting a row with A's `user_id` returned `403`. That is genuine
evidence and it is why this is not rated higher.

But RLS is the *only* thing between the anon key — which ships in every build and
is readable by anyone — and every player's rows, and it lived in a paragraph. A
paragraph cannot be re-applied to a restored project, diffed in review, or run.
The policies are now a committed, idempotent migration.

### 4. MEDIUM — `case_progress` was an unbounded write endpoint

**Fixed** in the same migration.

RLS decides *whose* rows a player may write. It says nothing about *how much*, and
the app's client is not the only thing that can write: any account holder can call
the REST API directly with their own token. Unconstrained, the table was an open
write-any-volume endpoint attached to the project's quota — a signed-up attacker
could park arbitrary megabytes in the `text[]` columns, which on a free tier is a
denial of service against the app itself.

Added `CHECK` constraints on `case_id` shape and on array cardinality and byte
length, set far above real usage (the longest case id is fifteen characters; the
busiest case has a few hundred messages) and far below anything worth abusing. The
known remaining ceiling is documented in the migration: the *number* of rows one
account may create is still unbounded, and the fix for that, if it ever matters,
is a per-user row-count trigger rather than a wider constraint.

### 5. INFORMATIONAL — `npm audit` reports 16 vulnerabilities. Do not "fix" them.

> **Updated 2026-09-05: the count is now 20, and one of them ships.** The three
> advisories below are still build-time only and still must not be "fixed". Two
> more have appeared since — see the checklist audit below.

**Not fixed, deliberately. Read this before running `npm audit fix --force`.**

`npm audit --omit=dev` reports 16 vulnerabilities, 5 high. They collapse to three
advisories, and both packages are build-time only:

| Advisory | Package | Reaches a player's device? |
|---|---|---|
| [GHSA-w3rx-r6r6-pgpr](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr) | `image-size` (DoS, ICNS) | No — `expo` → `@expo/metro` → `metro`, the bundler |
| [GHSA-5p2g-fcmc-qvqq](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq) | `image-size` (DoS, JXL/HEIF) | No — same path |
| [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq) | `uuid` (bounds check) | No — `expo-splash-screen` → `@expo/config-plugins` → `xcode`, prebuild only |

Neither is in the shipped JavaScript bundle. Both are denial-of-service in tooling
that only ever processes this project's own files, on this machine.

**The trap:** `npm audit fix --force` resolves these by *downgrading `expo` from
`~57.0.11` to `46.0.21`* — a major-version rollback across eleven SDK releases,
which would take React Native, expo-router, and every `expo-*` package with it.
The "fix" is far more destructive than the finding. The count is expected to stay
non-zero until Expo updates its own transitive pins.

---

## Checked and found clean

Recorded so the next pass knows what has already been looked at, and so a future
finding in one of these areas reads as a regression rather than a discovery.

- **No secret has ever been committed.** `.env` is gitignored and absent from the
  full history (`git log --all -- .env` is empty). No `.pem`, `.key`, `.p12`,
  `.jks`, or service-account file appears in any commit.
- **Only publishable keys are client-side.** All four env vars are `EXPO_PUBLIC_*`,
  correctly, and `src/auth/config.ts` mechanically refuses a key matching
  `sb_secret_` or a JWT carrying a `service_role` claim — it degrades to "accounts
  unavailable" rather than constructing a client with it.
- **No injection sinks.** No `eval`, no `new Function`, no
  `dangerouslySetInnerHTML`, no prototype access anywhere in `src/`, `app/`, or
  `content/`.
- **No `WebView`, no `Linking.openURL`, no raw `fetch`/`axios`, no `http://`.** The
  only network client is supabase-js, over the configured HTTPS URL.
- **Entitlements are never persisted locally.** No cached "unlocked" flag exists in
  AsyncStorage, so there is nothing to flip. Entitlement state is read from the
  RevenueCat SDK on every launch and updated by its listener — which also catches
  revocations and refunds, not just purchases.
- **Saves are validated, never cast.** Every read goes through `saveBlobSchema`
  (Zod), and a corrupt or hand-edited save is deleted and started fresh rather than
  trusted. Rows coming back from Supabase go through the *same* schema.
- **Sync cannot be aimed at another user.** `sync.ts` filters on the caller's own
  `user_id` even though RLS already enforces it, and the upsert's `user_id` comes
  from the live session, not from any stored or remote value.
- **The auth session store is deliberately narrowed** to `getItem`/`setItem`/
  `removeItem`, so supabase-js cannot reach `AsyncStorage.clear()` and take every
  case save with it on sign-out.
- **Production logging leaks nothing.** Three `console` calls survive in shipped
  code; they print configuration *reasons*, never key values, and the verbose
  entitlement dump is `__DEV__`-guarded.
- **Android permissions are minimal** — `MODIFY_AUDIO_SETTINGS` only, with
  `RECORD_AUDIO` explicitly blocked and `expo-audio` configured with
  `microphonePermission: false`.

---

## Re-verified against the live project — 2026-08-29

Run with the anon key against the real Supabase project, not read off the
migration file:

| Check | Result |
|---|---|
| `auth/v1/health` | `200` |
| Anonymous read of `case_progress` | `[]` — no rows leak |
| Anonymous insert | `401`, `42501 new row violates row-level security policy` |
| `solved` column | present (migration applied by the owner) |

**The anon key was checked before it was uploaded to EAS, not assumed.** A
`service_role` key is also a JWT and is indistinguishable from an anon key at a
glance; this one's payload decodes to `"role":"anon"`, which is what makes it safe
to inline into a client bundle. Had it read `service_role` the correct move was to
stop and ask for it to be rotated, because `EXPO_PUBLIC_*` values are extractable
from any shipped build.

**What could not be verified this way:** the `CHECK` constraints from finding 4.
Row-level security refuses an anonymous insert before Postgres evaluates a column
constraint, so a probe with a deliberately malformed `case_id` comes back as an
RLS refusal rather than a constraint violation. Confirming those needs an
authenticated session — and RLS is the outer gate in any case.

## A second route guard, for the same reason as the first — 2026-08-29

Linear progression was added after this review, and it arrived with the same
shape of hole the paywall had: the rule was applied on the case tile, and a tile
decides what a tap does and nothing more. Writing the route guard surfaced a live
version of it — the layout's script-loading effect was gated on the entitlement
alone, so a progression-blocked case would still have been loaded into the store
on its way to the redirect, and `/thread/[threadId]` renders whatever the store
holds.

Both gates now hold the load, and `src/entitlements/routeGuards.test.ts` asserts
it. Worth stating plainly because it is now the second instance: **in this app,
any rule deciding whether content may be seen has to be enforced at the route,
because expo-router publishes a deep link for every file under `app/`.**

## Checklist audit — 2026-09-05

Twenty items, checked against the code rather than recalled. Four do not apply:
this is a native app talking to Supabase, with no server of its own, no cookies,
no uploads and no user-generated content. Saying so is more useful than ticking
them.

| # | Item | Verdict | Evidence |
|---|---|---|---|
| 1 | Hide API keys | **PASS** | `.env` ignored at `.gitignore:44` and never tracked. Only publishable keys live in `EXPO_PUBLIC_*`; `config.ts` refuses to start on a secret one |
| 2 | Purge git secrets | **PASS** | History and tree scanned for `sb_secret_`, `service_role`, JWT and store-key prefixes. Every hit is a guard or its test |
| 3 | Use public DB key | **PASS** | Anon/publishable only. `isSecretKey()` rejects `sb_secret_` and `"role":"service_role"` before `createClient` |
| 4 | Enable row-level security | **PASS** | Enabled on `public.case_progress`; four policies, every one `to authenticated`. Re-verified against the live project 2026-08-29 |
| 5 | Encrypt sensitive data | **GAP** | See below |
| 6 | Enforce server-side auth | **BY DESIGN** | Auth and row access are enforced server-side by RLS. Entitlement gating is client-side and cannot be otherwise — see the threat model |
| 7 | Lock record access | **PASS** | `(select auth.uid()) = user_id` on all four policies; composite PK `(user_id, case_id)` |
| 8 | Block field tampering | **PASS** | The update policy carries **both** `using` and `with check`. With `using` alone a row can be edited into someone else's ownership |
| 9 | Secure session cookies | **N/A** | No cookies. The session is a token in app storage, which is item 5 |
| 10 | Hash passwords | **PASS** | Supabase hashes; the app never stores, logs or transmits one anywhere but the auth call. Grepped for it |
| 11 | Rate limit login | **PASS, not ours** | Supabase enforces it. `describeAuthError` recognises the response and says so in five languages |
| 12 | Bot protection | **GAP** | See below |
| 13 | Parameterize queries | **PASS** | PostgREST query builder only. No `.rpc(`, no raw SQL, no template-literal query anywhere in `src/`, `app/` or `content/` |
| 14 | Validate all input | **PASS** | Zod at five boundaries — `sync`, `engine/schema`, `settings/schema`, `resume`, `saveBlob` — plus `credentials.ts` before any auth call |
| 15 | Escape user content | **N/A** | There is none. All prose is authored, compiled into the binary, and rendered by RN `<Text>`, which interprets no markup |
| 16 | Restrict file uploads | **N/A** | No upload path exists: no Supabase Storage, no picker, no `FormData` |
| 17 | Trim API responses | **PASS** | `.select(SELECT_COLUMNS)`, never `*` |
| 18 | Security headers | **N/A** | No server. The web build is a local harness and is not deployed |
| 19 | Force HTTPS | **PASS** | No `http://` outside one localhost test fixture. Supabase and RevenueCat are both TLS |
| 20 | Scan dependencies | **PASS, with a change** | See below |

### 5. Encrypt sensitive data — the one real gap

The Supabase **refresh token sits in AsyncStorage, unencrypted**. `client.ts`
says so in its own comment: `expo-secure-store` was removed deliberately, because
adding a native module back would force a dev-client rebuild against a finite EAS
quota.

The storage is app-private, so this needs a rooted or jailbroken device, or an
unencrypted device backup, to reach. What it would yield is one account's read
message ids. **It must not be reused for anything that matters more** — and if a
native rebuild is happening anyway, moving the session to `expo-secure-store` is
a small change with no interface consequences.

### 12. Bot protection — absent, and cheap to add

Supabase supports hCaptcha or Turnstile on sign-up; it is switched off. The abuse
available is mass account creation against the project's own quota, which is
threat-model item (4). Enabling it is a dashboard toggle plus a token on the
client call — worth doing before any public release, not before the hackathon.

### 20. Dependencies — one advisory now reaches the bundle

The count has moved from 16 to **20 in production dependencies (5 high)**, and
the composition changed. Finding 5 above still holds for three of them, but there
are two new advisories and they are not the same as each other:

| Advisory | Package | Arrives via | Ships? |
|---|---|---|---|
| [GHSA-6gmq-8vp8-gcm6](https://github.com/advisories/GHSA-6gmq-8vp8-gcm6) | `@xmldom/xmldom` | `expo-splash-screen` → `@expo/config-plugins` → plist/xcode | **No** — prebuild only |
| [GHSA-vcc3-ghjq-m6fr](https://github.com/advisories/GHSA-vcc3-ghjq-m6fr) | `decode-uri-component` | **`expo-router` → `query-string`** | **Yes** |

The second one is the first advisory in this project that is actually in the
shipped JavaScript. Installed is `0.2.2` and the affected range is `<=0.4.2`, so
there is no patched release to move to.

**Impact, stated honestly:** it is a denial of service through a malformed
percent-encoded URI. The app parses search params from its own deep links
(`privatetexts://paywall?caseId=…`), so reaching it requires persuading a player
to open a crafted link, and the worst outcome is the app hanging. No data is
exposed. `npm audit`'s offered fix is `expo-router@5.1.11` — a **major
downgrade**, the same destructive trap finding 5 documents for `expo` itself.

Left in place, recorded here, and worth re-checking when Expo repins.

---

## Still outstanding

- **Demonstrate the deep-link fix on a device.** The guard is tested structurally;
  it has not been exercised against a real `privatetexts://case/the-wake/threads`
  intent, because the app has never been installed on a handset. Do this with the
  first device build.
- **Confirm the size constraints landed.** `solved` is verified present, but the
  `CHECK` constraints cannot be probed anonymously (see above). If the whole
  migration was run they are there; if only the `solved` line was, they are not.
- **Delete the two Supabase test accounts** (`rls-test-a-608514@example.com`,
  `rls-test-b-608514@example.com`). Only the project owner can do this.
- **Turn email confirmation back on** before any public release. `docs/SUPABASE.md`
  §2 explains why it is off for the hackathon build.
- **Legacy anon JWT key** is in use; Supabase deprecates those at the end of 2026.

---

## Regression tests

The fixes are held in place by two files:

- `src/entitlements/access.test.ts` — proves the *rule* is right, including that it
  fails closed while the store is answering without stranding an owner.
- `src/entitlements/routeGuards.test.ts` — proves the rule is *applied*, by reading
  the route sources the way `src/engine/boundary.test.ts` reads the engine's. It
  asserts the case layout calls the shared decision, blocks, holds while checking,
  and gates the script load; that `app/debug.tsx` redirects out of itself in
  release; and that **no file under `app/` mentions `requiredEntitlementId` at
  all** — a local copy of the rule is precisely how this vulnerability happened, so
  a second derivation is now a test failure.

Each assertion was verified by mutation: the guards were removed one pair at a
time and the corresponding tests confirmed to fail, then restored.
