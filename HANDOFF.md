# HANDOFF — Private Texts

**Read this first. It is the authority on project state.**

A murder mystery played through text-message threads. Find the statement that
cannot be true, prove it, name the killer.

Built for the **RevenueCat Shipaton 2026 — Next Gen (student) award**.

| | |
|---|---|
| Repo | https://github.com/armaanawesome/private-texts (public) |
| Deadline | **2026-09-30 23:45 PDT** · internal target **2026-09-28** |
| Started | 2026-08-08 |
| Plan | `../docs/superpowers/plans/2026-08-08-shipaton-detective.md` |
| Build constraints | `docs/BUILDING.md` — **read before touching eas.json** |
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

| Area | State |
|---|---|
| Deduction engine (`src/engine`) | ✅ pure TS, 86 tests, ~98% stmts |
| State store (`src/state`) | ✅ |
| Chat UI + craft pass | ✅ Mobbin-grounded |
| Evidence board | ✅ functional, **no craft pass** |
| Accusation screen | ✅ functional, **no craft pass** |
| Routes | ✅ threads → board → accuse |
| Paywall | ✅ custom UI, **purchase unverified** |
| RevenueCat Test Store | ⚠️ SDK configures; **a completed purchase has never been observed** |
| Case 1 content | ❌ not written — fixtures only |
| OneSignal | ❌ not started |
| Sound, video, assets | ❌ not started |
| Android | ❌ never built or tested |

**Tests:** `npm test` → 86 passing in ~100ms. `npx tsc --noEmit` → clean.

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
| **Mobbin** | — | MCP connected. Design reference for the craft passes. |

**Secrets live in exactly two places** — never in the repo:
- Local dev: `.env` (gitignored)
- Cloud builds: EAS environment variables

```bash
npx.cmd eas-cli@latest env:list --environment preview
```

`EXPO_PUBLIC_*` values are **inlined into the client bundle and extractable**. A
Test Store key is fine there; a production RevenueCat secret key never would be.

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

## 5. The build pipeline — hard-won, read before changing anything

**Four cloud builds died before this worked. `docs/BUILDING.md` has the full
trail. Do not re-litigate it.**

Two rules pull against each other:

1. A **Test Store key only works in a non-Release build.** The SDK checks the
   `test_` prefix at `configure()` and **terminates the app** otherwise.
2. A **Debug build does not embed the JS bundle** — it needs Metro, or it dies
   with *"No script URL provided"*.

Release → app closes itself. Debug → app can't start. Expo supports
**Debug+Metro** or **Release+embedded**, *not* Debug+embedded.

**Attempts that failed** (verified by extracting the `.app` and finding no
`main.jsbundle`): `FORCE_BUNDLING` as an eas.json env var; the same via a config
plugin (Expo could not even resolve `./plugins/*.js` as a plugin module, so it
silently never ran).

### The working setup

```bash
npx.cmd eas-cli@latest build --profile development --platform ios
```

Then on the machine holding the source:

```bash
npx.cmd expo start --tunnel --dev-client
```

Install the `.app` on Limrun, open it, point it at the printed tunnel URL.
Test Store purchases work because the dev client is a Debug build.

**Metro must stay running while testing and while recording the demo video.**
That is acceptable — Next Gen wants a video and source, not an installable binary.

### Build gotchas

- **A build profile must declare `"environment"`** or it resolves **none** of the
  stored EXPO_PUBLIC vars and the app launches with no API key.
- **Native modules need a rebuild**, not a Metro reload: `react-native-purchases`,
  `expo-blur`, and anything added later.
- `@expo/ngrok` is a **local** devDependency on purpose — Expo's `resolveGlobal`
  could not find the global copy on this machine.
- Verify a build before trusting it:
  ```bash
  curl -sL <artifact-url> -o a.tar.gz && tar -xzf a.tar.gz && ls PrivateTexts.app/
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

### Not yet run — do these next session

`impeccable`, `frontend-design`, `find-animation-opportunities`,
`verification-before-completion`.

### MCP

- **Mobbin** ✅ connected. `search_screens`, `search_flows`, `search_sections`.
- **ruflo** ⚠️ installed (`.mcp.json`, gitignored) but **never connected**. This
  desktop app does not load project `.mcp.json` — MCP is managed through the
  app's own connector UI, *not* `~/.claude.json` and *not* `claude_desktop_config.json`.
  Adding a server means using that UI.

---

## 7. Open bugs and unknowns

**1. Entitlement identifier may be wrong — highest priority.**
The RevenueCat log shows product `case_pack_1`, but the code gates on entitlement
**`case_pack_01`** (`src/entitlements/ids.ts`). Product and entitlement are
different objects so this may be fine, but if the dashboard entitlement is
`case_pack_1`, **a purchase will succeed and unlock nothing, silently.**

A dev log now prints it on every update:
```
[entitlements] active: …
```
Buy the case pack and read that line. If it disagrees with `ids.ts`, change the
constant. One-line fix.

**2. Paywall render loop — fixed, unverified.** Root cause was
`<Stack.Screen options={{...}} />` with an inline literal (new reference every
render → `setOptions` → re-render → forever). Options now live in
`app/_layout.tsx` at module scope. **Never put an inline options literal in a
screen component.**

**3. Task 0 results undocumented.** The clue-legibility test passed on 5 people
but the write-up was never captured. `docs/task-0-clue-test.md` is specified in
the plan and belongs in the judged repo — it is evidence of a design process.

**4. Android never built.** `FORCE_BUNDLING` behaves differently there
(`react { debuggableVariants }` in generated Gradle). Unknown territory.

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

**Next task is Task 13 — Case 1, "The Lighthouse".** Highest risk in the plan and
the only one no tool can do. ~20 minutes of play, 5 characters, 6 threads, ~90
messages, **3 contradictions**, all required to accuse.

Write it **backwards**: solution first, then the claim table, then the dialogue.
Writing forwards produces a story with a mystery bolted on. Every case
automatically inherits 7 tests (`content/cases/cases.test.ts`) that mechanically
prove it is solvable and has no orphaned threads.

**Write the prose by hand.** LLM-drafted mystery generates plot holes at branch
depth 3, and 2026 judges have calibrated AI-prose radar. Use AI to check the
claim table for consistency, not to generate dialogue.

Then: Task 15 (OneSignal), 16 (Case 2), 17 (polish + sound), 18 (icon,
screenshots, README), 20 (video), 21 (submit).

---

## 10. Machine gotchas (Windows)

| Issue | Fix |
|---|---|
| Node missing from the agent's tool shell | Prefix: `$env:Path = "C:\Program Files\nodejs;" + $env:Path` |
| `npm`/`npx` blocked by execution policy in the user's terminal | Use **`npm.cmd`** / **`npx.cmd`**. Do not tell them to change execution policy — that is theirs to decide. |
| PowerShell 5.1 has no `&&` | Use `;` or separate lines |
| `npx tsc \| head` then `echo $?` | Reads *head's* exit code. Redirect to a file and capture properly. |
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
