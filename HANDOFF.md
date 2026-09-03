# HANDOFF — Read Receipts

**Read this first. It is the authority on project state.**

A murder mystery played through text-message threads. Find the statement that
cannot be true, prove it, name the killer.

Built for the **RevenueCat Shipaton 2026 — Next Gen (student) award**.

| | |
|---|---|
| Repo | https://github.com/armaanawesome/read-receipts (public) |
| Deadline | **2026-09-30 23:45 PDT** · internal target **2026-09-28** |
| Started | 2026-08-08 |
| This file last verified | **2026-08-29** — test count re-run, and Supabase re-checked against the live project rather than from notes |
| Plan | `../docs/superpowers/plans/2026-08-08-shipaton-detective.md` |
| Build constraints | `docs/BUILDING.md` — **read before touching eas.json** |
| Security review | `docs/SECURITY.md` — threat model, findings, and **why `npm audit fix --force` must never be run here** |
| Design system | `design-system/shipaton-detective/MASTER.md` |

---

## 1. What this is competing for

**Next Gen** waives the paid-developer-account requirement: the deliverable is a
**2-minute video + open-source repo**, not a store listing. That single fact
drives every technical decision here, most importantly the use of the RevenueCat
**Test Store**.

Hard requirement for eligibility: the app must integrate the RevenueCat SDK to
power **at least one in-app purchase**.

Also eligible with the same submission: Design Award (judged on craft alone),
Best Game, and OneSignal's "Keep Them Coming Back" ($25k, needs Task 15).

---

## 2. Current state

**Working and verified on device (iOS simulator via Limrun):**
read a thread → long-press a message → put a statement on the record → pin two
on the board → COMPARE → contradiction confirmed → a locked thread unlocks →
accuse.

> **Everything below §2 that touches saves, accounts, settings or languages is
> on the branch `feat/accounts-settings-i18n`, which is NOT merged to master.**
> Merging it is the first decision of the next session. See §9.

| Area | State |
|---|---|
| Deduction engine (`src/engine`) | ✅ pure TS, 94% stmts |
| State store (`src/state`) | ✅ + autosave, resume, save-merge |
| Chat UI + craft pass | ✅ Mobbin-grounded |
| Evidence board | ✅ functional, **no craft pass** |
| Accusation screen | ✅ functional, **no craft pass** |
| Routes | ✅ landing → threads → board → accuse, + settings, language, sign-in — all reachable. `/how-to-play` is **gone**; `/landing` replaces it |
| Paywall | ✅ custom UI, **purchase unverified** |
| RevenueCat Test Store | ⚠️ SDK configures; **a completed purchase has never been observed** |
| 15 case packs + tutorial | ✅ written, and **all sixteen read end to end by the owner** (2026-08-28) |
| Autosave / resume | ✅ tested, **never exercised by a human closing the app mid-case** |
| Settings screen + audio model | ✅ code complete, volume is a real slider, **22 files in `assets/audio/` — 5 cues + 17 beds, all synthesised by `tools/make-audio.mjs`. Structurally verified; never listened to by a human** |
| Accounts (Supabase) | ✅ email sign-in, persistent session, cross-device sync. **RLS re-verified live 2026-08-29** (anonymous read `[]`, anonymous insert `401 / 42501`), `solved` column applied, keys registered with EAS |
| Languages | ✅ 4 UI catalogues + **all 16 cases in all four locales** (es, fr, de, pt-BR) — **no native speaker has read any of it** |
| Standalone build | ✅ `preview` launches with no Metro (bundle verified inside the `.app`) |
| OneSignal | ❌ not started — **not a dependency, no code**. Only an `.env.example` placeholder, plus a `remote-notification` iOS background mode in `app.json` that nothing uses |
| Video, screenshots | ❌ not started — both need a device |
| App icon | ✅ the original Canva mark (two overlapping speech bubbles on oxblood). Alternates carrying a detective element were drawn on 2026-09-03 and **rejected — the owner prefers this one. Do not redo it.** One real caveat: `app.json` sets `icon` with no `adaptiveIcon`, so Android launchers mask it to a circle and clip the bubble edges |
| Android | ⚠️ APK builds; never installed on a handset |
| Linear progression | ✅ cases unlock in order, enforced on the tile **and** at the route; `solved` persists locally and syncs |
| Onboarding | ✅ animated landing (sign in / play as guest) → Bakehouse, with the walkthrough running **inside** the case as coach marks. Re-armed from Settings |
| Case closed | ✅ closed-file header, proof tally, coda, and three exits: next case, all cases, play again |

**Tests:** `.\check.cmd` → **4794 passing across 126 files**, typecheck clean,
coverage 94.3% statements / 91.1% branches on the measured directories. Verified
by running the suite on 2026-09-03, not copied forward. The file added since the
last count is `src/audio/beds.test.ts`. Most of the growth is
translation: registering a pack in a locale runs every generic suite over it, and
all sixty-four locale registrations (16 cases x 4 languages) are now in.

**Run `.\check.cmd`, not `npx vitest` by hand.** It `cd`s to the project root
first. Running vitest from the parent directory silently picks up unrelated
projects — far more test files than this repo has, most of them failing — and `npx tsc`
there resolves to a **squatter package** called `tsc` rather than the compiler.
Both failures look alarming and neither is real.

**Take the test count in any handoff as a claim to re-check, not a fact.** This
number has been wrong in this file twice — it said 86 when 15 packs existed, and
595 after that. It goes stale every session and nobody notices, because a number
in a document does not fail.

**A green suite is not a playthrough.** It is worth being precise about what the
4794 actually prove: that no case is unsolvable, no thread is unreachable, no
contradiction fires that the author did not declare, and no translation drops an
id. They prove nothing whatever about whether a case is *enjoyable*, whether a
screen looks right, or whether a purchase completes.

---

## 3. Accounts and services

All of these are already set up. Nothing here needs recreating.

| Service | Identity | Notes |
|---|---|---|
| **Devpost** | academic email | Registered for Shipaton 2026. The student-email check is the Next Gen gate. |
| **Expo / EAS** | `armaanaswm` · `armaan.sami@bscdsmh.christuniversity.in` | Project `shipaton-detective`, id `998feb4c-b919-478e-9798-d7afe3b9c40f`. Free tier. |
| **GitHub** | `armaanawesome` | `gh` CLI authed with `repo` scope. Push works. |
| **RevenueCat** | academic email | Project *Shipaton Detective*. Test Store key registered as an EAS env var. |
| **OneSignal** | — | App created, Android enabled. App id in EAS env. Not yet wired into the app. |
| **Limrun** | — | Cloud iOS simulators in the browser. **This is how iOS gets tested with no Mac.** |
| **Mobbin** | — | MCP connected. Design reference for the craft passes. **Does not propagate to subagents** — see §6. |
| **Supabase** | armaan1902@gmail.com | Accounts and cross-device progress. Schema + verified RLS in `docs/SUPABASE.md`. |

**Secrets live in exactly two places** — never in the repo:
- Local dev: `.env` (gitignored)
- Cloud builds: EAS environment variables

```bash
npx.cmd eas-cli@latest env:list --environment preview
```

`EXPO_PUBLIC_*` values are **inlined into the client bundle and extractable**. A
Test Store key is fine there; a production RevenueCat secret key never would be.

**The same rule decides which Supabase key ships.** Only the anon/publishable key
belongs in `EXPO_PUBLIC_SUPABASE_ANON_KEY`. A `service_role` key bypasses every
RLS policy in §7b, so putting one in the client would hand any player with a text
editor read and write access to every account's progress. This is not left to
discipline: `src/auth/config.ts` refuses to start on a key matching
`sb_secret_` or `"role":"service_role"`.

Note the asymmetry — the anon key is *designed* to be public. It is safe only
because RLS is doing the work. If RLS were ever dropped from a table, that key
alone would open it.

---

## 4. Ship-kit tools

| Tool | Status | Purpose here |
|---|---|---|
| **RevenueCat** | ✅ in use | Mandatory. Test Store = no paid dev accounts. |
| **Limrun** | ✅ in use | Remote iOS simulator. Replaces owning a Mac. |
| **Mobbin** | ✅ in use | Real messaging-app reference. Drives the Design Award work. |
| **OneSignal** | ⚠️ claimed, unused | In-fiction push ("Nadia: are you still awake?") — the genre's signature mechanic, and a separate **$25k** category. Task 15. |
| **Codemagic** | ⬜ not claimed | Only needed if we want a downloadable APK for judges. |
| **Linearity / AppScreens** | ⬜ not claimed | Icon (1024×1024) and the required 1179×2556 **unframed** screenshot. Task 18. |
| Everything else | ⬜ skip | ASO/attribution/store tooling — irrelevant when not publishing. |

---

## 5. The build pipeline — corrected 2026-08-11, read before changing anything

**`docs/BUILDING.md` has the full trail.** An earlier version of this section
was wrong in a way that cost four builds; the correction is below.

There is exactly **one** hard rule:

> A **Test Store key only works in a Debug build.** The SDK checks the `test_`
> prefix at `configure()`, shows a "Wrong API Key" alert, and **terminates the
> app**. Confirmed against RevenueCat's own guidance and reproduced on device.

The *second* rule this project used to believe — "a Release build closes itself,
so we are forced into Debug" — was **our own bug**, not Expo's and not
RevenueCat's. `resolveApiKey()` logged that a `test_` key cannot run in Release
and then called `configure()` with it anyway, so every Release build killed
itself on the splash screen. `src/entitlements/keyPolicy.ts` now decides before
the SDK is touched, and a Release build runs normally with purchases off.

### Two builds, two jobs

| Want | Profile | How |
|---|---|---|
| **Play and test the game** | `preview` (Release) | Install and open. Standalone — no Metro, no tunnel, no laptop. |
| **Demo a real purchase** | `development` (Debug) | Needs Metro over a tunnel. |

```bash
npx.cmd eas-cli@latest build --profile preview --platform android
```

That APK installs straight onto a phone and is the fastest way to look at
anything. For the purchase demo and the submission video:

```bash
npx.cmd eas-cli@latest build --profile development --platform ios
npx.cmd expo start --tunnel --dev-client
```

Metro must stay running for that one. Acceptable — Next Gen wants a video and
source, not an installable binary.

### Correcting the record on Debug + embedded bundle

The old claim that Expo "does not support Debug + embedded bundle" is **false**.
`node_modules/expo/scripts/react-native-xcode.sh` skips bundling *only* for
Debug **+ simulator**, and only when `FORCE_BUNDLING` is unset; Debug builds for
a physical device bundle automatically. The two attempts to use it failed for
mechanical reasons (an env var that never reached the Xcode phase; a config
plugin Expo never resolved), not because the combination is impossible. It is no
longer needed — see the table above — so do not spend builds on it.

### Build gotchas

- **A build profile must declare `"environment"`** or it resolves **none** of the
  stored EXPO_PUBLIC vars and the app launches with no API key.
- **Native modules need a rebuild**, not a Metro reload: `react-native-purchases`,
  `expo-blur`, and anything added later.
- `@expo/ngrok` is a **local** devDependency on purpose — Expo's `resolveGlobal`
  could not find the global copy on this machine.
- Verify a build before trusting it:
  ```bash
  curl -sL <artifact-url> -o a.tar.gz && tar -xzf a.tar.gz && ls ReadReceipts.app/
  ```

---

## 6. Skills and MCP

Skills live in `../.claude/skills` (~104 installed) and load at session start.
Invoke with the Skill tool by exact name.

**The user's standing instruction: run `using-superpowers` then `find-skills`
before every task.** They have called this out when it lapsed. Honour it.

### Skills that earned their place

| Skill | Used for |
|---|---|
| `using-superpowers` | Process gate before every task |
| `find-skills` | `npx.cmd skills find "<query>"` — note it **exits non-zero on success**; read the output, ignore the exit code |
| `systematic-debugging` | Mandatory after 2 failed fixes. Its "3 failures = wrong architecture" rule is what finally cracked the build problem |
| `writing-plans` | Produced the 22-task plan |
| `roast` | Chose this idea over two others; log at `~/.claude/roast-log.md` |
| `revenuecat-purchase-flow` | Audited the IAP code and found 4 real bugs |
| `revenuecat-paywall` | Decided custom UI over RevenueCatUI |
| `expo-router` | Route structure; SDK 56+ forbids `@react-navigation/*` imports |
| `ui-ux-pro-max` | **Its `--design-system` output was rejected** (returned a light-theme landing page and Orbitron). Its `--stack react-native` and `--domain ux` rules were kept and are good |
| `impeccable` | Settings, language, sign-in screens |
| `storytelling` / `anti-ai-writing` / `viral-hooks` | Per pack, per §9. Not optional |
| `humanizer-zh` | Passed over the message text in packs 1–3 heavily, elsewhere on the stiffer lines |
| `supabase` / `supabase-postgres-best-practices` | The RLS policies in §7b, including the InitPlan form |

### Still not run

`frontend-design`, `find-animation-opportunities`,
`verification-before-completion`.

### MCP

- **Mobbin** ✅ connected — but **connector auth does not propagate to
  subagents.** A subagent told to "use Mobbin" reports it as not connected, and
  will say so confidently. The working pattern is: the main session fetches the
  references and passes them to the agent **as text in the brief**.

  Worth stating plainly because this file got it wrong in both directions in one
  session — first reported unavailable when it was connected under a
  UUID-named server, then trusted the agents' "not connected" as a global fact.
  Check it in the main session before believing either claim.
- **ruflo** ✅ installed and used for the multi-agent translation work. The old
  note here said "never connected"; that is out of date.

  **Its MCP tools are not reachable from this app — the CLI is.** What earns its
  place is `ruflo memory`, used as a **shared convention store the agents read
  and write across their own deaths.** Sixteen entries under `privatetexts/i18n/`
  in the namespace `translation`, each one a rule that cost real debugging:
  `contracted-prepositions`, `dont-mirror-english-edits`,
  `third-person-player-gender`, `place-names-in-prose`, the clock-wrap rule, the
  arc-alias rule, the `<pack> · en` diagnostic. Agents die on session limits
  roughly once per pack; a rule that lives only in a brief dies with them, and a
  rule in the store is retrieved by the next one.

  ```bash
  npx ruflo memory retrieve --namespace translation --key privatetexts/i18n/contracted-prepositions
  ```

  Two gotchas, both real:
  - **`memory store` fails from Git Bash.** The `.cmd` shim re-enters `cmd.exe`
    and chokes on the space in `C:\Program Files`. Store from PowerShell.
    Retrieval works from either.
  - **A double quote in `--value` truncates the value at that character.** Same
    class as the `git commit -m` gotcha in §10 — seven entries were silently
    stored as 18 bytes. Write values without embedded double quotes and **check
    the size column** afterwards.

  `memory list --namespace translation` shows an access count per entry, which
  is the honest measure of whether this is working. The cross-locale rules are
  read four to six times each; the four locale-specific ones (`es-...`, `de-...`,
  `fr-...`, `pt-...`) sit at **zero** — only their own agent would ever want
  them, and that agent already knows. Store cross-locale rules; write
  locale-specific ones into the pack file's header comment instead, where the
  next reader of that file cannot miss them.

### Subagents — what actually goes wrong

Four agents were run in parallel for translation. The failure modes were not the
ones anticipated:

- **Session limits kill agents silently.** All four died twice. Only one
  produced a failure notification; the other three simply stopped, and the
  reminder still listed them as "still running". **Check for files on disk, not
  status.** They resume from transcript with `SendMessage`, which is far cheaper
  than respawning — a fresh agent re-derives everything.
- **So brief them to write to disk early and report.** The German agent finished
  a complete tutorial and was cut off before touching the next file; because it
  had written and reported, that work shipped. An unwritten file in a dead
  agent's context is worth nothing.
- **Agents converge on plausible-but-conflicting answers** when the decision is a
  judgement call. That is the alias story in §7b, and it is why the rule is now a
  test rather than a paragraph in a brief.
- **`git add -A` sweeps an agent's in-progress files** into your commit. It
  happened. Scope commits to explicit paths while agents are running. For the
  same reason, **do not trust a single test run while agents are writing** — one
  run showed a failure at 2132 tests and the next showed 2134 passing, because
  the suite had raced a half-written file.
- **Budget for roughly one death per pack.** Limits have reset at 6:20am,
  5:40pm, 1:30am, 8:10pm, 9:20am, 6:30am. This is not a problem to solve; it is
  the cadence to design the brief around — one pack at a time, write to disk,
  report after each.
- **The coordinator's job is salvage and registration, and that is where the
  defects are.** Every round the pattern repeats: the agents die mid-pack, their
  finished files are sitting on disk unregistered, and registering them is what
  first runs the generic suites over that pack. Four of the last five real bugs
  surfaced at exactly that moment — including two in the *English*. Do the
  salvage before spawning anything new.

---

## 7. Open bugs and unknowns

**1. Entitlement identifier — RESOLVED 2026-08-11. Do not revert it.**
The constant is **`case_pack_1`** — one digit, no leading zero
(`src/entitlements/ids.ts`). It was `case_pack_01`, a real purchase unlocked
nothing, and the owner confirmed the dashboard identifier cannot be changed, so
the code moved to match it.

This section previously said the opposite: that an earlier session's change to
`case_pack_1` was unverified and the constant was "back to `case_pack_01`". That
is no longer true and following it would silently re-break purchases. The failure
mode is the worst kind — `purchase()` succeeds, the receipt is valid, and the
player pays for nothing with no error anywhere.

`explainEntitlementGap()` (`src/entitlements/diagnosis.ts`) is what tells the two
causes apart: a wrong constant, versus a dashboard that grants nothing at all. A
dev log still prints the truth on every update:
```
[entitlements] active: …
```
If that line ever disagrees with `ids.ts`, the log wins.

**2. Paywall render loop — fixed, unverified.** Root cause was
`<Stack.Screen options={{...}} />` with an inline literal (new reference every
render → `setOptions` → re-render → forever). Options now live in
`app/_layout.tsx` at module scope. **Never put an inline options literal in a
screen component.**

**3. Task 0 results undocumented.** The clue-legibility test passed on 5 people
but the write-up was never captured. `docs/task-0-clue-test.md` is specified in
the plan and belongs in the judged repo — it is evidence of a design process.

**4. Android — first APK built 2026-08-11** via the `preview` profile (a
keystore already existed on EAS). It has not yet been installed on a real
handset, so Android remains the least-exercised platform. The `development`
(Debug + Metro) path on Android is still untried.

**5. LICENSE is still Expo's.** `LICENSE` reads *"Copyright (c) 2015-present 650
Industries, Inc. (aka Expo)"* — boilerplate from `create-expo-app`, never
replaced. Shipping a judged repo under someone else's copyright is the kind of
thing a judge notices. It needs a name, which is a decision rather than a fix.

**6. The app icon is the Expo scaffold.** `assets/icon.png` is still the blue
chevron **with the construction guides visible on it**. Verified by opening it,
2026-08-12. It is the first thing on a store listing and in a demo video.

**7. `docs/ARCHITECTURE.md` does not exist.** Task 18 Step 4. The README carries
an architecture section, so this is a nice-to-have rather than a blocker.

**8. "the Keeper" collided with a real character in Pack 9 — FIXED 2026-08-12.**
`the-cut.ts` had an innocent man described as *"Eleven years a volunteer lock
keeper at Tyrley"*, in one of the arc packs where the villain names himself the
Keeper. A player would read him as a clue that never resolves, which breaks the
arc's rule that a red herring must be innocent *for a reason you can prove*. He
now goes *"Eleven years lock-wheeling at Tyrley"* — the real canal word for it.

Kept here because it is the failure mode to watch for: a global alias pass can
collide with ordinary vocabulary already in the prose. Grep new aliases against
all fifteen packs before applying them.

**9. Pack 15's deflection contradicted the alias — FIXED 2026-08-12.** He said
*"not one file has a word of me in it"* while naming himself in every call. It
now reads *"not one file has a name in it that a court can serve papers on,"*
which is what he actually means.

**10. Three shipped deadlocks — ALL FIXED, and the reason they shipped matters
more than the fix.** `sunday-service` (Grace), `the-bothy` (Hamish) and
`the-understudy` (Bea) each gated a thread on a contradiction whose claims lived
*inside that same thread*. Unopenable. A player would meet a locked conversation
with nothing left anywhere to read, at which point the game is simply over with
no explanation.

Every one of them passed the whole suite, because the old check handed the
player every contradiction at once and asked whether each thread was reachable —
which cannot see ordering. `caseContract.ts` now plays forward from nothing to a
fixpoint: open what is open, read it, confirm what you can prove, repeat. That
catches self-supply *and* two-thread cycles.

**The Bea one is the warning.** It was in a **free** case — pack 2, one of the
first things any player touches — and it survived because the shared contract
was extracted at Pack 3 and never retrofitted to packs 1–2. It was found by
accident, months later, when registering a Spanish translation ran the contract
over those packs for the first time. **When you add a check, run it over the
existing content, not just the next thing you write.**

**11. `NO_DISCOVERY_THREAD` in `caseContract.ts` exempts `the-lighthouse`** from
the "at least one thread found by reading" rule. Pack 1 predates the rule and no
message in it names Fiona, so satisfying it means writing a name-drop into prose
a human has already played and that is now translated into Spanish. The
exemption is by exact id, and the rule **asserts the exemption is still
deserved** rather than skipping — the day Pack 1 gains a discovery thread, the
test fails and tells you to delete the entry.

---

## 7a. Storybook — generated, not hand-maintained

`docs/storybook.md` and `docs/storybook.html` are the whole game as one readable
document, for reading passes and review notes. They are **written by
`content/cases/storybook.gen.test.ts` on every test run**.

Do not hand-edit them. An earlier session did, while the file was still a
throwaway artefact, and a later regeneration erased the edits — the edits had to
be recovered from a diff and ported into `content/cases/*.ts` by hand. Running
the generator inside the suite is the fix: the document cannot drift, and the
only way to change it is to change the source.

---

## 7b. Saves, accounts and languages — added 2026-08-13/14

All of this is new since this file was last accurate, and all of it is on
`feat/accounts-settings-i18n`.

### Saves and resume (`src/state`)

`saveBlob.ts` defines one schema used by **both** the local save and the
Supabase row, which is the whole reason a device switch works — there is no
translation step between "on disk" and "in the cloud" to get out of sync.

Two decisions that look like style and are not:

- **`.catch(() => [])`, never `.catch([])`.** The value form shares a single
  array instance across every failed parse, so two corrupt saves would alias
  each other. There is a test that fails if someone simplifies it back.
- **`lastThreadId` / `lastMessageId` are optional.** Saves written before resume
  existed have no such fields, and making them required would classify every
  one of them as corrupt and delete a player's progress on upgrade.

`saveMerge.ts` decides what happens when the device and the server disagree —
which is the normal case after playing offline, not an edge case.

### Accounts (`src/auth`, `docs/SUPABASE.md`)

Email sign-in, session persisted through `expo-secure-store`, progress synced to
`public.case_progress`.

**RLS was verified live on 2026-08-12, not assumed.** Two accounts were created,
each wrote progress, and each was checked to be unable to read or write the
other's row. Results table is in `docs/SUPABASE.md`. The policies use
`(select auth.uid()) = user_id` rather than bare `auth.uid()` — the subquery
form lets Postgres hoist it to an InitPlan and evaluate it once per statement
instead of once per row — and the update policy carries **both** `using` and
`with check`, because `using` alone allows a row to be edited into someone
else's ownership.

The table's PK is composite `(user_id, case_id)`. That is not a modelling
preference; `onConflict` upserts require it.

**Two test accounts still exist and should be deleted by the owner:**
`rls-test-a-608514@example.com`, `rls-test-b-608514@example.com`. Their data row
was removed; the auth users were not, because deleting a user is the owner's
call. Nobody but the owner can do this.

**Gotcha, cost an hour:** a `sb_publishable_...` key returned 401 from this
project despite being well-formed. The legacy `anon` JWT works. Documented in
`docs/SUPABASE.md`; do not "modernise" the key without testing an actual request.

### Languages (`src/i18n`, `content/i18n`)

Two separate systems, deliberately:

| | UI strings | Case text |
|---|---|---|
| Where | `src/i18n/strings.ts` | `content/i18n/<locale>/<case>.ts` |
| Shape | 88 flat dotted keys | prose keyed by the case's own ids |
| Complete in | es, fr, de, pt-BR | see below |

Flat dotted keys are not a style choice — they make parity testable with
`Object.keys`, which is how a missing translation is caught rather than
discovered by a player staring at a blank button.

**Case text carries prose and nothing else.** No windows, no predicates, no
times-as-data. Ids appear only as keys. This is what lets a player change
language *mid-case* without the engine noticing: the structure is identical in
every locale, so every claim id, saved contradiction and progress row stays
valid. `caseStore.relocaliseScript` swaps the script while preserving progress —
note it deliberately does **not** go through `loadScript`, which calls
`set({ ...empty(), script })` and would wipe the playthrough.

**Case text status, 2026-08-18:**

| Locale | Cases |
|---|---|
| es, de, pt-BR | tutorial + packs 1–7 (`the-bothy` is pack 7) |
| fr | tutorial + packs 1–6 |

Eight packs left per locale, starting at `sunday-service`. **`de/the-bothy` has
no test file** — the German agent died between the translation and the test, so
it is the one registered pack without prose-time pinning. Write it before
anything else German. Japanese was **removed**
from the picker on 2026-08-14 — it had a row and an empty catalogue, which is a
worse state than absence because the picker offered a language that did nothing.
`src/i18n/locales.ts` carries a comment saying what re-adding costs: a UI
catalogue *and* case text, not a row.

Each translated pack carries its own test file asserting the load-bearing prose
times against the message ids that state them. That is not duplication of the
generic checks — `caseText.test.ts` can see that a number changed, but not that
`ten past three` was reworded into a different minute, which is the single edit
that leaves a case unsolvable and the whole suite green.

**Registering a translation is the first time the generic suites run over that
pack at all**, and it is where the real defects surface — in the *English* as
often as in the translation. So far registration has caught the `the-understudy`
deadlock, two gaps in the discovery-thread naming rule, a Spanish place name the
prose never spoke, and a French one the same rule caught for the opposite
reason. The diagnostic, worth keeping: **if it fails for `<pack> · en` too, the
rule is wrong; if only the locale fails, the translation is wrong.**

Two rules that came out of that and will bite again:

- **A place name beginning with an article gets eaten by a contracted
  preposition.** French shipped `place.bar` as `le bar du club` with a claim
  label reading `au bar du club` — `au` is à + le, so the full name appeared in
  no sentence and the chip and the message read as two different rooms. Write
  `dans le bar du club`. Every language that fuses preposition with article has
  this: French au/du, Spanish al/del, Portuguese no/na/do/da, German im/am/zum.
- **An English fix does not imply a translation fix.** When `Answer him, Donal`
  was corrected in the source, two of the four locales were already neutral
  (`le`/`lui` do not inflect) and only Portuguese leaked. Rewriting them anyway
  broke the Spanish voice test — that pack substitutes kept-versus-dropped
  *accents* for the English's kept-versus-dropped apostrophes, and a replacement
  with no accent in it made a careful character type like a careless one. Check
  whether the locale actually has the problem before editing it.

### The one rule that outranks translator judgement

**"the Keeper" stays in English in every locale.** It is the alias the arc
villain gives himself across five packs, and the arc exists *only* by
recognition — a player meets it in Pack 1 and is meant to feel the floor move in
Pack 3.

It broke within a day of translation starting. Two agents produced `el Farero`
and `el Keeper` for the same man in the same language, which a Spanish player
reads as two different people.

`el Farero` was the better-argued option and still wrong: it means the keeper of
a *lighthouse*, and he uses the name in a care home, a rowing club, a canal and
a crisis line. It also pre-empts what the finale pays off — eleven box files in
a wardrobe, one per person, *"I have kept all of them."* He keeps **records**.
Pack 1 only looks like it is about a lighthouse.

`content/i18n/arcAlias.test.ts` enforces this across every registered
translation. It **counts mentions** rather than checking presence, because a
translation that keeps the first and paraphrases the rest breaks recognition at
exactly the moments the arc is being handed over. It also asserts the English
still uses the word in more than one case, so the suite cannot pass vacuously if
the arc is ever reworked.

### What is not done here

- **No native speaker has read any of it.** The tests prove same ids, same
  numbers, same alias, nothing blank. They cannot prove it reads well, and
  machine-plausible prose is exactly the failure they cannot see. `Sensación`
  vs `Tacto` in the Spanish settings screen was flagged and never resolved.
- **The Continue card is fixed** (2026-08-14). `describeElapsed` returns a
  string *key* now rather than English prose, so the gap is translated by the
  same catalogue as the sentence around it. It used to render
  *"3 de 4 probadas. Última partida 2 hours ago."*

  Worth copying as a pattern: keeping the rules in `src/state` and the words in
  the catalogue means a language whose plurals do not split at one can say so in
  its own file, instead of being forced through English's singular/plural shape
  by a `{count} {unit} ago` template assembled in code.

  `ElapsedKey` is a hand-written union in `src/state` so the store need not
  import the catalogue. That independence costs one thing — nothing stops the
  union naming a key the catalogue lacks, which would show a raw
  `elapsed.hourMany` to every player in every language — so `resume.test.ts`
  checks both directions: every key resolves, and a `{count}` placeholder is
  supplied exactly where the English text asks for one.

- **The English-only helpers are done** (2026-08-14). `describeAuthError`,
  `describeSyncResult`, `restoreStatusLine` and `restoreErrorMessage` all
  return a `Message` now — see `src/i18n/message.ts`. Sign-in and settings
  render it at display time.

  **`Message` is the pattern to reuse.** Anything below the UI that needs to
  say something returns `{ key, params }` or `{ raw }`, and the screen turns it
  into words. `raw` is a deliberate variant, not an oversight: a server can
  return an error nobody has classified, and an unfamiliar message the player
  can screenshot beats a polished one that says nothing. Making it explicit
  means passing text through is a visible decision rather than the default.

  Holding these in state as `Message` rather than rendered strings also means a
  notice on screen survives a language change instead of freezing in the old
  language.

  One dependency worth knowing: the `describeAuthError` patterns match
  Supabase's **English** error text on purpose. They are matched against what
  the API returns, never against what the player sees, so they must not be
  translated. If Supabase ever localises its errors, every branch stops firing
  and everything falls through to `raw` — degraded, not broken.

- **Japanese was removed, not finished** (2026-08-14). It had a picker row, an
  empty catalogue and no case text — technically working, since everything fell
  back to English, but the picker was offering a language that did nothing.
  Removing it was a one-line change and a migration question: a save written
  before the removal holds `ja`, and the resolver must not hand that save a
  blank UI. `src/i18n/translate.test.ts` now pins the behaviour using a
  **synthetic tag** (`'zz' as LocaleTag`) rather than a real one, which is
  stronger than the `ja` test it replaced — `ja` was a defined-but-empty
  catalogue returning `{}`, whereas an unknown tag returns `undefined`, and
  `undefined` is what a save actually holds after a locale is dropped.

- **Nothing has been read by a native speaker, and the packs have not been read
  end to end by anyone.** Restating it here because the two compound: the tests
  are structural, and every defect found in translation this week — the stale
  names, the third-person gender leaks, the French place name — was found by an
  agent *reading for sense*, never by the suite. That is the shape of what is
  still hiding.

---

## 7j. Three fixes that shipped and did nothing — 2026-09-03

All three passed review, passed the suite, and were reported by the owner as
simply absent from the device. None was a broken build; each was a correct
implementation at a value no human could perceive. **The pattern is the lesson:
a rendered pixel or an emitted sample is not the same as a perceived one, and
this repo has now verified three separate features in a desktop browser that had
no chance of working on a handset.**

**1. Bold evidence lines did nothing on Android.** `ChatBubble` set
`bodyClaim: { fontWeight: '600' }`. `theme.type.body` sets
`fontFamily: 'sans-serif'` on Android, and React Native resolves a named Android
family through `Typeface.create`, which understands only normal and bold —
**every numeric weight below 700 collapses to regular.** It rendered correctly in
the browser harness, which is exactly how it survived. Now `'700'` plus a white
fill and a 3pt accent left edge on the bubble.

**2. The chat wallpaper was invisible by construction.** Marks were `textDim` at
`opacity: 0.05` over a tint six points off the background — under one step of
8-bit colour in places, so some were not drawn at all. The file's own comment
argued for that number at length. Now 0.14, denser, with three mark shapes and
per-cell jitter from a stable hash.

**3. Nobody could hear the audio, and it was not Limrun.** This took two passes,
and the first pass fixed a real problem that was not the cause. Worth reading in
order, because the mistake generalises: *the measurable defect is not
automatically the operative one.*

**The actual cause — the audio session.** `sound.ts` set
`playsInSilentMode: false`, reasoned about in its own comment as though the flag
only meant the iOS mute switch. expo-audio's type documentation is explicit that
on **Android**, when it is `false`, "playback is suppressed when the ringer mode
is silent or vibrate". Most people carry a phone on vibrate, so the whole
soundtrack was suppressed at the session level before a sample was ever read. No
amount of retuning could reach that, and a full pass of retuning did not. Ringer
mode governs alerts; a game belongs on the media stream, and this app already
offers a sound toggle and a volume slider in Settings. Now `true`.

**A second, independent bug in the same file.** `playCue` was
`seekTo(0).then(play).catch(() => {})`, which makes playback conditional on a
promise that can reject: seeking a player that has not finished loading fails,
and the empty catch swallowed the error *and* the sound. The first play of any
cue is the most likely to hit it. `play()` is now called unconditionally and the
rewind is best-effort.

**The real but secondary defect.** Every bed's fundamental sat at **55–78Hz**,
and a handset speaker is a few millimetres across and rolls off hard below
roughly 300Hz — the hardware cannot move air at that frequency. The files were
also normalised to half scale and attenuated again by `BED_GAIN = 0.2`,
compounding to about **-36dBFS**. Both were worth fixing; neither was why
nothing played.

The measurement worth keeping, because it is what found this and would find it
again — the share of a file's energy below 300Hz, roughly what a phone speaker
throws away:

```bash
node -e "const fs=require('fs');const b=fs.readFileSync('assets/audio/bed-menu.wav');const rate=b.readUInt32LE(24);const n=(b.length-44)/2;let lp=0,lo=0,tot=0;const k=1-Math.exp(-2*Math.PI*300/rate);for(let i=0;i<n;i++){const s=b.readInt16LE(44+i*2)/32768;lp+=k*(s-lp);lo+=lp*lp;tot+=s*s;}console.log((lo/tot*100).toFixed(0)+'% below 300Hz')"
```

Beds went from essentially all of their energy under 300Hz to 43%, and from
-36dBFS to about -26dBFS. `confession` moved 159Hz → 333Hz and `accusation`
92Hz → 262Hz; both were also inaudible on a handset. **Still unheard by a
human** — this replaces one unverified claim with a better-argued one, and only
a listen closes it.

---

## 7i. Audio — 22 files, all synthesised, none ever heard — 2026-09-02

**Nobody has listened to any of this.** It is verified structurally: valid
RIFF/WAVE, mono, 16-bit, zero clipped samples, one bed per case. That says
nothing about whether it sounds good, and retuning is now a fast loop.

`tools/make-audio.mjs` generates all 22 files (4.0MB): five cues at 22050Hz
(`message`, `pin`, `contradiction`, `confession`, `accusation`) and seventeen
beds at 16000Hz (menu + one per case), each an 8-second seamless loop whose tail
is crossfaded into its head. Root and swell vary by a hash of the track name, so
beds differ 78–96Hz without anybody choosing sixteen keys by hand.

`src/audio/` splits the same way `src/settings` does: every decision is made in a
pure file and only the service modules touch expo-audio.

**`resolveBedVolume` lives in `volume.ts`, not `beds.ts`, and that is load-bearing.**
`beds.ts` is a list of `require` calls on binaries, and requiring a WAV outside
Metro throws — so a test importing it cannot run in Node at all. Same trap and
same fix as `caseArtAssets.test.ts`: put the arithmetic somewhere importable and
verify the registry by the shape of the directory it points at.

Two decisions worth not re-litigating:

- **`useBed` uses `useFocusEffect`, not `useEffect`.** Screens below the top of a
  stack stay mounted, so a mount effect never re-fires on the way back and the
  bed would not change when the player returned to the menu.
- **Beds are silent under Reduce Motion; cues are not.** A drone carries no
  information and somebody who asked for less sensory load should not get
  seventeen of them. A cue marks the moment a contradiction landed, and removing
  it would hide something.

**Two cues were coded and never fired.** They existed in the registry and no call
site played them. The contradiction cue now fires in `EvidenceBoard` after
`submitPins()`, gated on `lastVerdict?.ok` — read the verdict from
`useCaseStore.getState()` after the call, not from the render-scope value, which
is a frame stale. A cue in a registry is not a cue in the game; grep for the call
site before believing one works.

**Optional:** the 3.9MB of WAV beds would be about a tenth the size as m4a. That
needs ffmpeg, which is not on this machine.

---

## 7h. The browser harness renders case routes after all — 2026-08-31

**§7d's limit was wrong.** It said the harness 'cannot render anything under
app/case/'. It can: loading `/case/tutorial/threads` on web renders the
NativeTabs bar, the case title, and the screen under it. That mistaken limit had
been used to skip verification of the case flow more than once.

What it verified this session, live rather than by argument: a solved case opens
on its closing screen (CASE CLOSED, the killer, the three-figure score row), and
'Next case' lands on the next case rather than the current one.

**The console buffer accumulates across navigations.** Errors from before a fix
keep appearing after it. Judge by whether the page renders, not by the presence
of an old entry in that list.

## 7g. Where the skills actually live — 2026-08-31

**Both skill roots are real, and they hold different skills.** Searching only
one of them proves nothing, which is a mistake this session made out loud: a
`find` over `~/.claude` came back empty for `impeccable` and `ui-ux-pro-max`
and was reported to the user as "not installed". They were installed the whole
time, one directory over.

| Root | Holds |
|---|---|
| `C:\Users\armaa\Downloads\ClaudeCode\.claude\skills\` — the PROJECT root, which is the PARENT of this repo | `impeccable`, `ui-ux-pro-max`, `using-superpowers`, `find-skills`, `expo-router`, every `expo-*` and `revenuecat-*`, `taste-skill`, `emil-design-eng`, `web-design-guidelines` |
| `~/.claude/skills/` | `anti-ai-writing`, `storytelling`, `viral-hooks`, `ruflo`, `supabase`, `prompt-master` |
| `~/.claude/plugins/` | `ecc:*`, `ponytail`, `karpathy-guidelines`, `claude-seo` |

**The skill listing in the session context is the authority — read it rather
than probing the filesystem.** `ListSkills` is not the check either: it returns
claude.ai-managed skills only, and comes back empty for every skill above.

**Mobbin is authorized and works.** The tools are `search_screens`,
`search_flows`, `search_sections`. The session context has listed Mobbin under
"requires authentication" while it was answering queries in the same turn — that
notice is unreliable for this server, so **call it and see** rather than
believing the reminder.

## 7f. Onboarding, and the back button that was not there — 2026-08-31

Reported from a Limrun run: the demo case opened on first launch **with no back
button**, and closing and reopening the app fixed it. Both halves of that are the
same cause.

`app/index.tsx` sent a first-time player on with `<Redirect href="/how-to-play" />`,
and **a redirect REPLACES the current route**. The home screen was consumed on the
way past; the walkthrough then replaced *itself* with the demo case; and the case
arrived as the only entry on the stack, so the navigator had no parent to draw a
back button from. The second launch worked because `hasSeenHowToPlay` was set by
then and the whole chain was skipped.

**A push, not a redirect,** is the fix, and it is now the rule for every route
into a case: leave the home screen underneath. `app/case/[caseId]/_layout.tsx`
also carries a `headerLeft` for the case a push cannot help — a deep link, which
expo-router publishes for every route under `app/` whether or not anybody meant
it to.

### What replaced the slideshow

`app/how-to-play.tsx` is deleted. Five full-screen pages taught the controls
somewhere the controls did not exist, so the player had to remember a gesture
until they met the thing it acts on. The walkthrough now runs **inside the
Bakehouse**, as a strip above the real inbox, the real conversation, the real
board and the real accusation screen.

`src/tutorial/steps.ts` holds the whole rule, and it stores **no step counter**.
The step is derived from the save — read count, pin count, proved count — which
is correct after a crash, after a reinstall, after a sync from another device,
and on replay, none of which a counter survives for free. It is also therefore
testable, which the slideshow never was.

**`hasSeenHowToPlay` is gone from settings**, replaced by `hasSeenLanding` and
`tutorialDismissed`. Zod drops the retired key as unknown and both new fields
`.catch` to `false`, so an existing install reads clean and meets the landing once.

### A trap worth knowing about

`vitest.config.mts` `test.include` is an **allowlist of directories**, not a hint.
`src/tutorial/steps.test.ts` was written, passing, and **never collected** — the
suite stayed green while proving nothing about it. A new source directory needs
its glob added there or its tests silently do not exist.

## 7e. EAS build quota — iOS is spent until 2026-09-01

**Latest Android APK — build `7722aec6`, commit `70dbc11`, finished 2026-08-31 17:22.**

`https://expo.dev/artifacts/eas/Vlcnz5Hae6beZB2lvFlgSgHCLmu429YZmZcfQZWfLs8.apk`

Free-tier artifacts expire in roughly 30 days, so download it rather than
relying on the link. It carries the landing page, the in-case walkthrough, the
redesigned case-closed screen, the solved ticks, and the back-button fix. The one
commit after it (`9fbaad1`) is hardening with no behavioural change — verified
rather than assumed: `useRouter()` returns a module-level singleton, so the memo
it rewrites could not have been looping. **No rebuild is needed for it.**


The free plan's **iOS** allowance ran out on 2026-08-29 and resets on
**Tue 1 Sep**. The refusal is instant and costs nothing, so attempting a build is
a cheap way to check the state rather than something to avoid.

**Quota is per platform, not shared.** `docs/BUILDING.md` said the opposite —
"the quota is shared across platforms, `--platform android` costs exactly what
`--platform ios` costs" — and that is wrong: with iOS refusing instantly,
Android went straight through to a real build. Corrected there too.

1 September is also when the Canva generation quota returns for the last ten
case covers, so the two jobs land on the same day and are worth doing together.

## 7d. Rendering the app in a browser — added 2026-08-29

**This found two real bugs in twenty minutes that the suite and the flex
arithmetic both said were not there.** It is now the first thing to reach for
when a device screenshot disagrees with what the code says should happen.

```
npm run web --prefix shipaton-detective
```

Already wired as the `read-receipts` entry in the workspace
`.claude/launch.json`, on port 8081.

**What renders:** the case grid, Settings, the language picker, the sign-in
screen, and the how-to-play walkthrough. **What does not:** anything under
`app/case/`, because the case layout uses
`expo-router/unstable-native-tabs`. That is most of the game, so this is a
harness for the shell, not a substitute for a device.

**It is react-native-web, not Yoga.** Layout here is CSS flexbox and native
layout is Yoga, and they disagree in exactly the places percentage sizing gets
interesting. Treat a measurement as evidence about *this* renderer. What makes it
worth doing anyway is that it measures — `getBoundingClientRect` and
`getComputedStyle` give numbers, and numbers settle arguments that screenshots
and arithmetic cannot.

### The two bugs, because both are the same shape

**The tiles were never sized.** `styles.tile` set `flexBasis: '47%'`,
`flexGrow: 1` and `maxWidth: '48%'`. The rendered element computed to
`flex-basis: auto; flex-grow: 0; max-width: none` — none of the three arrived.
`<Link asChild>` clones its child and supplies its own props, and the
Pressable's style went with it. Tiles were sized by their contents, so they came
out unequal (117, 118, 120, 127 wide) and on a device filled the row:
content-sizing a subtree whose first child is a bare `aspectRatio` box with no
width has no reason to stop. **The width now lives on a plain View outside the
Link**, and the grid is two 48% columns with `space-between` rather than three
interacting values that all have to survive.

**Preferences were never read at launch.** `hydrateSettings()` was called from
`app/settings.tsx` and nowhere else, so the store sat on `DEFAULT_SETTINGS`
until the player opened Settings. Every stored preference was ignored until then,
**including `localeTag`** — a player who chose German got an English home
screen every launch and only saw their own language after visiting a screen that
had nothing to do with it. In a game translated into four languages that is not a
small bug. The root layout now hydrates once, before any screen renders.

Both share a lesson worth keeping: **a value that has to survive a component
boundary to be correct will eventually not survive it.** State the width where
nothing can take it; load the preferences where every screen benefits.

## 7c. Case cover art — all sixteen painted, two worth redoing

`assets/cases/<caseId>.png` holds painted covers; `src/ui/caseArtAssets.ts` maps
them; `src/ui/CaseArt.tsx` renders the painting where one exists and falls back
to the generated `CasePoster` where it does not.

**All sixteen cases are painted** as of commit `9c994bf`. `assets/` is now 17MB.

**One `generate-design` call returns FOUR candidates, not one.** This was learned
the expensive way. The last ten covers were deliberately briefed as "two options
per case" to conserve quota, on the assumption that options cost calls — they do
not. Twenty options came back for ten calls. Offering the owner *more* choice was
half the price of offering less. Brief four next time.

**`export-design` fails with "Not allowed to access design" if you pass `width`,
`height` or `lossless`.** Send `{"type": "png"}` alone. Call `get-export-formats`
first; it is required.

**Two covers shipped as the owner picked them but miss their own brief**, and
both are one call each to redo when quota returns:

- **sunday-service** — briefed as a church with its roof *absent*, which is the
  case's entire lie ("the man who reroofed the church says there was no roof on
  it"). It came back with a roof and a spire. Handsome poster, missing wound.
- **the-reunion** — renders its crowd as faces. No other cover in the set
  contains a face, and its blank clock reads as a moon.

Regenerating both was attempted on 2026-09-03 and **both generators are out of
credit**: Canva returns `quota limit`, and the Gamma image MCP returns
`402 Insufficient credits`. Prompts written for the retry are in
`docs/cover-prompts-pending.md` — the fix for sunday-service is to brief a *ruin*
rather than "a church without a roof", because the model normalises the second
back into a church.

**Aspect ratio is deliberately inconsistent.** The first six are 640×640; the last
ten are 1080×1350. `CaseArt` draws into a 3:4 frame with `resizeMode="cover"`, so
a square source loses about a quarter of itself top and bottom where a 4:5 source
loses almost nothing. Generate at 4:5.

The system, so the last ten match: flat editorial linocut, one solid background
colour per case, black and warm cream shapes only, print speckle, no text and no
people. The motif is the case's lie abstracted — a rehearsed crowd with one unit
out of alignment for The Wake, eleven box files with one pulled forward for The
Listener. Oxblood is reserved for the finale because the app icon is oxblood.

**The fallback is permanent, not a stopgap.** It is what lets art land one case
at a time, and it is why the art map may stay partial forever without anything
looking broken. `caseArtAssets.test.ts` asserts every art filename is a real case
id — the map is hand-written because React Native resolves `require` at bundle
time, and a hand-written map is the kind of thing a rename rots.

Two traps already paid for: `caseArt.ts` beside `CaseArt.tsx` resolve to one
module on a case-insensitive filesystem, and `StyleSheet.absoluteFillObject` is
not typed in this RN version.

**Verified in the running grid on 2026-08-31**, correcting the previous entry
here, which said the covers had only been seen as standalone exports: all sixteen
tiles render their painting in the browser harness, with the green solved tick,
and each new cover's motif is still legible at tile size.

---

## 8. Design work — needs a fresh session

The chat surface has had one Mobbin-grounded craft pass. **Nothing else has.**

### The governing idea

**The chat surface should be invisible.** The player is reading a dead person's
group chat; the moment the UI announces itself as a game, the fiction dies. That
is why it uses the platform system font and no custom chrome.

**The evidence board is the opposite** — it is diegetically the player's own
workspace, and it is where the game's visual identity should live. That contrast
is the strongest design idea available here **and it is currently unexploited.**
The board today is a plain list. This is the single highest-value design work
remaining, and the Design Award is judged on craft alone.

### What a fresh session should do

1. `using-superpowers` → `find-skills` → `impeccable` + `frontend-design`
2. Mobbin: search evidence boards, pinboards, comparison and diff UIs, annotation
   tools — *not* messaging apps, that pass is done
3. Rebuild the board around the COMPARE moment: the connector line, the shake,
   the revelation typing out
4. Craft pass on the accusation screen — the proof-gated refusal is the design
   thesis on screen and currently reads as a plain alert
5. `find-animation-opportunities` across all screens
6. Sound: three cues only (receive, pin, contradiction) via `expo-audio`

### Already established, do not redo

- `src/ui/theme.ts` — tokens, motion durations, the length-proportional typing
  formula, `hitSlop` defaults
- **`danger` (#C4483C) is non-text only** — 3.1:1, fails WCAG AA. Use
  `dangerText` (#F2695C) for any danger-coloured type. This rule has caught
  three real bugs.
- Reduced motion is respected everywhere; keep it that way
- Tap-to-skip on message playback is **mandatory**, not polish — without it the
  game is unplayable on replay and unfilmable

---

## 9. Plan ahead

| Date | Milestone |
|---|---|
| **2026-09-04** | **KILL GATE — Case 1 playable end to end.** If missed, cut Tasks 15 and 16 that day. |
| 2026-09-18 | Five outside playtesters have finished Case 1 |
| 2026-09-25 | Demo video locked |
| **2026-09-28** | **Submit.** Not the 30th. |

### Next session, in order

1. **Merge `feat/accounts-settings-i18n` to master.** It carries the tutorial,
   autosave, resume, settings, audio model, accounts and all of i18n — the
   majority of the last week's work — and it is unmerged. Everything else on
   this list is smaller than the risk of leaving it there.
2. **LICENSE and app icon** (§7 items 5 and 6). Both are judge-visible, both are
   still scaffold defaults, and the LICENSE needs a *decision* rather than a fix.
3. Evidence board craft pass (§8) — the highest-value design work remaining.
4. Then Tasks 15, 17–21.

   The mixed-language Continue card that used to head this list is **fixed**
   (§7b). Translation of packs 7–15 is running in four background agents and is
   not on the critical path — none of it is judge-visible before the free tier,
   which has been complete in all four languages for a week.

**Two ship-blockers with no code in them:** the LICENSE still reads *"Copyright
(c) 2015-present 650 Industries, Inc. (aka Expo)"*, and `assets/icon.png` is
still the Expo chevron with construction guides visible. Neither is hard. Both
are the first thing a judge sees.

**All 15 packs are written** (2026-08-12), plus a tutorial, each with its own
test file. The
uniqueness contract — shape of the lie, engine axis, red herring, arc beat — is
`docs/pack-ledger.md`, and the parts of it that can be checked mechanically now
are, in `content/cases/ledger.test.ts`. It was corrected in flight three times;
all three corrections are recorded in it.

**Packs 1–3 are free**, per `docs/arc-design.md`: the free tier ends on Pack 3's
first arc connection, so it closes on the floor moving rather than a full stop.
Packs 2 and 3 shipped gated by mistake until Pack 15 and a test now pins it.

**The tutorial ("The Bakehouse") is separate from the fifteen** and excluded from
the ledger by exact id. It teaches by *refusing*: pick two claims about the same
place and the engine says "Those two places are the same area"; pick two about
different times and it says "These describe different times". The player learns
what a contradiction is by being told what one isn't, which is the only way that
doesn't require a tutorial voice explaining the rules.

**All sixteen packs have now been read end to end by the owner** (2026-08-28),
which closes what this file called the largest remaining risk to the content.
A passing suite is still not a playthrough — it proves no case is unsolvable
and no translation drops an id, and nothing about whether a case is enjoyable
— but the reading job that only a human could do is done for the English.

**The translations are the part still unread.** Four locales, sixteen packs
each, and no native speaker has read any of them. Every defect found in them
so far — stale names, four shapes of player-gender leak, contracted
prepositions eating place names, six converted units — was found by an agent
reading for sense, never by the suite.

Write every case **backwards**: solution first, then the claim table, then the
dialogue. Writing forwards produces a story with a mystery bolted on. Every case
inherits the shared contract in `content/cases/caseContract.ts` — including an
exhaustive pairwise scan that fails on any contradiction the author did not
declare, which is the check that catches a nudged time window silently letting a
player skip a gated thread.

**The three writing skills are not optional, per standing instruction:**
`/storytelling` for the case as a whole, `/anti-ai-writing` for the in-game
message text, `/viral-hooks` for the blurb. Invoke them per pack, not from
memory.

**Sweep straight apostrophes before committing a pack.** A `'` inside a
single-quoted TypeScript string breaks the whole file, and it has done so twice.

Then: Task 15 (OneSignal), 17 (polish + sound — `expo-audio` is installed and
wired to nothing), 18 (icon, screenshots — **README done 2026-08-12**), 19
(final Android build), 20 (video), 21 (submit).

**README written 2026-08-12.** Root `README.md` follows the Task 18 Step 3
spec: hook, GIF placeholder, engine pitch, architecture (with a mermaid
diagram of the pure-engine boundary), the 15-case table, the RevenueCat
integration writeup with the judge access note from Task 21 Step 3, run
instructions (`cp .env.example .env`, the `preview`/`development` build
split from §5), the real test count, an APK-link placeholder, a screenshot
placeholder, and a license link. What's still missing, confirmed by looking
rather than assuming:
- **No GIF or screenshots exist yet.** `assets/` has no screenshot files at
  all; the README placeholders point at Task 18 Steps 1-2, still open.
- **`assets/icon.png` is the default Expo scaffold icon** (the blue chevron
  with construction guides), not a designed mark. Linearity is still
  unclaimed per §4. Task 18 Step 1 is not done, despite the file existing.
- **No Codemagic APK** — Task 19 hasn't started, so the README's APK link is
  a placeholder pointing at `docs/BUILDING.md`'s EAS instructions instead.
- **`LICENSE` is still Expo's own boilerplate** — copyright "2015-present 650
  Industries, Inc. (aka Expo)", left over from `create-expo-app`. The README
  links to it as-is because rewriting a license file wasn't asked for, but a
  judge-read public repo probably shouldn't ship someone else's copyright
  notice. Worth a real decision (MIT in the owner's name, or something else)
  before submission.
- `docs/ARCHITECTURE.md` (Task 18 Step 4) is a separate deliverable and was
  not written this session — the README's architecture section covers the
  same ground at README depth, but the two-page standalone doc doesn't exist.

---

## 10. Machine gotchas (Windows)

| Issue | Fix |
|---|---|
| Node missing from the agent's tool shell | Prefix: `$env:Path = "C:\Program Files\nodejs;" + $env:Path` |
| `npm`/`npx` blocked by execution policy in the user's terminal | Use **`npm.cmd`** / **`npx.cmd`**. Do not tell them to change execution policy — that is theirs to decide, on their own machine. Hand them the command; do not run it for them. |
| PowerShell 5.1 has no `&&` | Use `;` or separate lines |
| **Double quotes in `git commit -m` break native arg parsing** | Happened three times. Write the message to a file and use **`git commit -F <file>`**. |
| `Set-Content -Encoding utf8` writes a **BOM** | Which a JSON body parser rejects. Use `[System.IO.File]::WriteAllText($f, $json, (New-Object System.Text.UTF8Encoding($false)))`. |
| `curl` JSON bodies get mangled by PowerShell quoting | Write the body to a file, pass `--data @file`. |
| `npx tsc \| head` then `echo $?` | Reads *head's* exit code. Redirect to a file and capture properly. |
| **A Bash heredoc cannot write a TypeScript file containing a template literal** | Backticks and `${...}` do not survive the shell wrapper — it fails with an unmatched-quote parse error. Two agents hit this independently. Use the Write tool for those files; auto-mode's prefer-Bash instruction does not override it. |
| **Python `"\b"` inside a Bash-tool heredoc arrives as a backspace byte** | A layer collapses the doubled backslash, so `\b` becomes 0x08 and lands invisibly in the file. Build the escape as `chr(92) + 'b'`, or check afterwards for control characters. **This very table row was corrupted by the bug it documents, twice.** |
| No Android SDK, no emulator, JDK 8 | Never `expo run:android` locally. Cloud builds only. |
| ruflo wrote ~250 files into the repo | `.claude*/`, `.agents/`, `.swarm/`, `*.db` are gitignored. Keep it that way — judges read this repo. |

---

## 11. Architecture rules that are enforced, not suggested

- **`src/engine/` and `content/` import nothing from React Native, Expo, or
  React.** This keeps the suite runnable in plain Node in ~100ms.
  `src/engine/boundary.test.ts` walks every file and fails on violation — and it
  has already caught one.
- **Cases are validated at module load.** `loadCase` throws on a dangling
  reference so a broken case fails at startup, never mid-playthrough.
- **Accusation checks proof before identity.** Otherwise a player brute-forces
  the killer by tapping every suspect.
- **The paywall sells more cases, never the free case's ending.** A paywall over
  a mystery's answer dies to one YouTube upload.
- **The player has no gender, age or face.**
  `content/cases/playerNeutral.test.ts` guards the *English*, because the
  English is what forces every translator's hand — one `You are Ivy's godson`
  made three languages gender a person the game keeps blank, and it shipped
  through fifteen packs because in English it is one word that reads perfectly
  naturally. Deliberately narrow: it matches a gendered noun as the complement
  of a copula addressed to `you`, not gendered words generally.

  **Read its "WHAT THIS CANNOT SEE" block before trusting it.** It is blind to
  the player in the **third person** — `now it is a radio link and a man in
  Cambridge`, `Answer him, Donal` — because knowing that `him` means the player
  needs coreference, and a pattern loose enough to guess would fire on every
  ordinary sentence about every other character. Both of those were found by
  translation agents reading for sense, and the evidence that the English was
  the outlier is that all four translators had already gone neutral without
  being asked: `alguien`, `quelqu'un`, `alguém`, `jemand`. **The detector that
  works for this class is a careful reader**, not the suite.
- **A rename leaves nothing behind.** `content/cases/renameLeak.test.ts`. Three
  packs shipped calling one person two different things — a case ran for an
  hour about Laura and closed on `Orla Byrne`; The Wake said `Bridie Mulvey`
  about a woman the player had spent the case calling Eileen. All of them in
  briefings and epilogues, which is where a reader is least able to shrug it
  off. The naming rules never saw it: they ask whether the *current* name
  appears, and it always did.

  The signal was in the data the whole time — **a character's id is the name it
  was written under.** Renaming meant editing `name:` and the prose; the id
  stayed. So an id that is not part of the current display name, appearing
  capitalised in the prose, is the old name surfacing. On its first run it found
  **thirteen across seven packs.** Found originally by a translation agent, not
  by a test, and then made executable — a manual `grep -c "\bName\b"` for the
  same thing returned 0 twice **while the name was present**, because `\b` does
  not match in this shell. That is the argument for the test in one line.
