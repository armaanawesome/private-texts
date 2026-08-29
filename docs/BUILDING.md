# Building this app

## Read this first: do not spend a build on a JS change

EAS free-tier builds are limited and **the quota is shared across platforms** —
`--platform android` costs exactly what `--platform ios` costs. Switching
platform to save builds does not work. This is an Expo project on both.

What actually costs nothing:

> **Install a development build once, then iterate over Metro.** Every
> JavaScript change — screens, layout, motion, copy, engine, content — reloads
> on the device with **no new build**. Only a native change needs a rebuild:
> adding or upgrading a native module, or editing `app.json` plugins,
> permissions, icons, or the bundle id.

```bash
.\dev.cmd
```

Scan the QR from the installed dev client. The tunnel needs an ngrok authtoken
configured.

Both scripts `cd` to the project root themselves, so they work from **either**
`ClaudeCode\` or `ClaudeCode\shipaton-detective\`. Thin shims of the same names
sit in the parent folder (untracked — the parent is not a git repo) because the
terminal usually opens there.

Running Expo from the parent folder *without* them gives:

```
ConfigError: The expected package.json path: ...\ClaudeCode\package.json does not exist
```

which means only "wrong directory" — Expo reads its config from the current
directory, not from wherever the command lives.

### Why `.cmd` and not `npx`

This machine's PowerShell execution policy is **`AllSigned`** at LocalMachine
scope, and npm ships `npx.ps1` and `npm.ps1` **unsigned**. So a bare `npx expo
start` fails with *"npx.ps1 is not digitally signed"*.

`dev.cmd` and `check.cmd` exist to sidestep that: a `.cmd` file runs through
cmd.exe, which never consults the PowerShell execution policy. No admin rights,
no security setting changed.

```bash
.\check.cmd
```

runs the typecheck and the full suite the same way. The leading `.\` matters in
PowerShell.

If you would rather fix it machine-wide, `MachinePolicy` and `UserPolicy` are
both `Undefined` here — nothing is group-policy locked — so a CurrentUser
setting wins over LocalMachine without admin:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

`RemoteSigned` allows local scripts and requires signatures only on downloaded
ones. That is a genuine loosening of a security setting, so it is the user's
call to make, not something to run on their behalf.

### Dev clients that already exist

Both were verified to contain **no embedded JS bundle**, which is what makes them
stay current: they fetch everything from Metro at launch.

| Platform | Built from | Notes |
|---|---|---|
| Android APK | `9189368` (2026-08-11) | Dev launcher confirmed inside the APK. ~244 MB. |
| iOS simulator (dev client) | `bcc6cca` (2026-08-09) | **Stale.** `app.json` and `package.json` both changed after it — new icon and splash, `expo-splash-screen` added. Superseded by the preview build below. |
| iOS simulator (preview) | `11b9b4c` (2026-08-28) | Superseded. Its grid rendered one full-width tile per row. |
| iOS simulator (**preview**) | `0d944c2` (2026-08-29) | Current. Self-contained Release `.tar.gz` for a cloud simulator (Limrun). Purchases OFF by design — see below. |

An older dev client stays valid as long as nothing **native** has changed. To
check before assuming, list what actually changed:

```bash
git diff <build-commit>..HEAD --name-only
```

If that touches only `.ts`, `.tsx`, or docs, the existing dev client is fine.
`app.json`, `package.json`, `plugins/`, or an SDK bump means rebuild.

EAS artifact links expire (roughly 30 days on the free tier). If a link is dead
the build itself is gone, and a rebuild is the only option — so keep the APK
somewhere local rather than relying on the URL.

> **The 2026-08-28 iOS preview link expires around 2026-09-27 — three days
> before the 2026-09-30 deadline.** Download the `.tar.gz` and keep it locally
> now, rather than discovering on submission weekend that the only iOS artifact
> has evaporated and the quota is spent.

## What a `preview` iOS build can and cannot test

Worth writing down because two of these look like bugs and are not.

`preview` is a **Release** build, and `src/entitlements/keyPolicy.ts` refuses a
`test_`-prefixed key outside `__DEV__` — the native SDK would otherwise put up a
"Wrong API Key" alert and kill the process on the splash screen. So on any
preview build the store is switched off:

- **All twelve paid cases stay locked**, and since the entitlement guard landed
  they also refuse to open by deep link. That is the guard working, not a
  regression.
- **The paywall shows the build-configuration reason**, not "nothing to sell".
- **Purchases, restore, and the unlock path are untestable here.** They need the
  `development` profile with Metro.
- **Sign-in and sync are unavailable**: `EXPO_PUBLIC_SUPABASE_URL` and
  `EXPO_PUBLIC_SUPABASE_ANON_KEY` are not registered in *any* EAS environment.
  Only the RevenueCat key is. Register them before demoing sync.

What it *is* the only build that can prove: that `privatetexts://debug`
redirects instead of opening the Test Store harness, which is a Release-only
behaviour.

**Test Store purchases work in these builds** because a dev client is Debug.
That makes the dev client, not a preview build, the one to record the submission
video on.

Rebuild only when:

- a dependency with native code is added or upgraded
- `app.json` changes (plugins, permissions, icons, scheme, bundle id)
- the Expo SDK is upgraded

---

One non-obvious constraint shapes every build decision here, and it is worth
understanding before changing `eas.json`.

## The constraint

**A RevenueCat Test Store key only works in a Debug build.** The SDK checks the
`test_` prefix at `Purchases.configure()` time, shows a *"Wrong API Key"* alert,
and **terminates the app**. There is no override — it is a deliberate safeguard
against shipping a test key to a store. Confirmed against RevenueCat's own
guidance and reproduced on device.

That is the only hard constraint. Everything else that looked like a constraint
turned out to be a bug in this repo (see below).

## What was actually broken (fixed 2026-08-11)

For four builds, this project believed a second rule: *"a Release build closes
itself on launch, so we must use Debug, and Debug cannot embed a bundle."*

The first half of that was **our bug, not Expo's and not RevenueCat's**.
`resolveApiKey()` logged a warning that a `test_` key cannot run in Release —
and then called `configure()` with it anyway. The SDK did exactly what it
documents and killed the process on the splash screen.

`src/entitlements/keyPolicy.ts` now decides *before* the SDK is touched. If the
key on hand cannot legally run in this build, purchases are switched off and the
app runs normally. So:

> **A Release (`preview`) build now launches standalone — no Metro, no tunnel, no
> laptop. It is the build to use for playing and testing the game.**

## Correcting the record on Debug + embedded bundle

The old version of this file said Expo "supports Debug + Metro or Release +
embedded bundle, not Debug + embedded bundle." **That is wrong**, and it is worth
stating precisely so nobody re-derives the wrong lesson.

`node_modules/expo/scripts/react-native-xcode.sh` skips bundling only under a
narrow condition:

```sh
case "$CONFIGURATION" in
  *Debug*)
    if [[ "$PLATFORM_NAME" == *simulator ]]; then
      if [[ "$FORCE_BUNDLING" ]]; then
        echo "FORCE_BUNDLING enabled; continuing to bundle."
      else
        echo "Skipping bundling in Debug for the Simulator"; exit 0;
      fi
    else
      echo "Bundling for physical device."   # Debug DOES bundle here
    fi
```

So Debug + embedded bundle **is** supported — via `FORCE_BUNDLING`, and
automatically for physical devices. Two attempts to use it failed for mechanical
reasons, not because the combination is impossible:

1. `env: { FORCE_BUNDLING: "1" }` in `eas.json` — the variable did not reach the
   Xcode script phase. Verified by extracting the `.app`: no `main.jsbundle`.
2. A config plugin patching the build phase — Expo never resolved
   `"./plugins/with-force-bundling.js"`, so it silently did nothing.

If this is ever needed again, the mechanism most likely to work is a config
plugin that adds `FORCE_BUNDLING = 1` to the target's **Xcode build settings**
(build settings are exported into script-phase environments by definition,
unlike an outer shell variable). It has not been tried. Do not spend more than
one build on it — the Release path above removes the need.

## Profiles

| Profile | Config | Bundle | Purchases | Use |
|---|---|---|---|---|
| `preview` | Release | embedded | **off** (guarded) | **Play and test the game.** Launches standalone. Android APK + iOS simulator. |
| `development` | Debug | Metro (tunnel) | **live** | Test Store purchases, and recording the submission video. |
| `production` | Release | embedded | needs real keys | Store submission. Needs paid developer accounts. |

### Play and test the game

```bash
npx eas-cli@latest build --profile preview --platform android
```

Install the APK directly on an Android phone. Nothing else to run.

### Demo a real purchase

```bash
npx eas-cli@latest build --profile development --platform ios
```

Then, on the machine holding the source:

```bash
npx expo start --tunnel --dev-client
```

The tunnel needs an ngrok authtoken configured. Test Store purchases work here
because the dev client is a Debug build.

## Environment variables

Two separate traps here, both already hit:

**`EXPO_PUBLIC_*` values are inlined at build time**, and EAS Build uploads only
git-tracked files — so the gitignored `.env` never reaches the build server.
Cloud builds read these from EAS, registered once with:

```bash
npx eas-cli@latest env:create --name EXPO_PUBLIC_RC_TEST_STORE_KEY --value <key> --environment preview --visibility plaintext --scope project
```

**Uncommitted work is not in your build.** EAS uploads the git tree, not the
working directory. Commit before building or you will test the previous code.

Anything behind `EXPO_PUBLIC_` is extractable from a shipped bundle. A Test
Store key is fine there; a production RevenueCat secret key is not.
