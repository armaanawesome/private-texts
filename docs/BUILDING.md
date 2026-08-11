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
npx.cmd expo start --tunnel --dev-client
```

Scan the QR from the installed dev client. The tunnel needs an ngrok authtoken
configured.

### Dev clients that already exist

Both were verified to contain **no embedded JS bundle**, which is what makes them
stay current: they fetch everything from Metro at launch.

| Platform | Built from | Notes |
|---|---|---|
| Android APK | `9189368` (2026-08-11) | Dev launcher confirmed inside the APK. ~244 MB. |
| iOS simulator | `bcc6cca` (2026-08-09) | Still valid — every commit since changed only `.ts`/`.tsx`/`.md`. |

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
