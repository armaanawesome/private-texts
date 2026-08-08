# Building this app

There is one non-obvious constraint that shapes every build profile, and it is
worth understanding before changing `eas.json`.

## Why the `demo` profile exists

Two rules pull in opposite directions:

1. **The RevenueCat Test Store key only works in a non-Release build.** The SDK
   checks the `test_` prefix at `Purchases.configure()` time, shows a
   *"Wrong API Key"* alert, and **terminates the app**. There is no override
   flag — it is a deliberate safeguard against shipping a test key to a store.

2. **A Debug build does not embed the JS bundle.** It expects to fetch it from a
   Metro packager at runtime. Without `developmentClient: true` there is not even
   a launcher UI to point it at a server, so it fails with
   *"No script URL provided… unsanitizedScriptURLString = (null)"*.

Satisfying (1) alone gives you an app that cannot load. Satisfying (2) by going
Release gives you an app that closes itself on launch.

`FORCE_BUNDLING=1` resolves it. React Native's `react-native-xcode.sh` skips
bundling in Debug by default; this env var overrides that, so the bundle is
embedded **and** the configuration stays Debug.

## Profiles

| Profile | Config | Bundle | Use |
|---|---|---|---|
| `demo` | Debug | embedded (`FORCE_BUNDLING=1`) | **Test Store works.** Record the demo video and hand builds to judges from here. |
| `preview` | Release | embedded | Only useful with real Apple/Google store products and a production RevenueCat key. Will close on launch with a `test_` key. |
| `development` | Debug | Metro | Local iteration with `expo start`. |

## Commands

```bash
npx eas-cli@latest build --profile demo --platform ios
```

```bash
npx eas-cli@latest build --profile demo --platform android
```

## Environment variables

`EXPO_PUBLIC_*` values are **inlined at build time**, and EAS Build uploads only
git-tracked files — so the gitignored `.env` never reaches the build server.
Cloud builds read these from EAS, registered once with:

```bash
npx eas-cli@latest env:create --name EXPO_PUBLIC_RC_TEST_STORE_KEY --value <key> --environment preview --visibility plaintext --scope project
```

Anything behind `EXPO_PUBLIC_` is extractable from a shipped bundle. A Test Store
key is fine there. A production RevenueCat secret key is not.

## Android caveat

The `FORCE_BUNDLING` env var is honoured by the iOS build phase script. On
Android, RN >= 0.71 controls this through
`react { debuggableVariants = [] }` in `android/app/build.gradle`, which is a
generated file. If the Android `demo` build shows the same null-script-URL error,
that is the reason, and it needs an Expo config plugin rather than an env var.
