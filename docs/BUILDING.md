# Building this app

One non-obvious constraint shapes every build decision here, and it is worth
understanding before changing `eas.json`.

## The constraint

Two rules pull in opposite directions:

1. **A RevenueCat Test Store key only works in a non-Release build.** The SDK
   checks the `test_` prefix at `Purchases.configure()` time, shows a
   *"Wrong API Key"* alert, and **terminates the app**. There is no override —
   it is a deliberate safeguard against shipping a test key to a store.

2. **A Debug build does not embed the JS bundle.** It expects Metro to serve it
   at runtime, and fails with *"No script URL provided…
   unsanitizedScriptURLString = (null)"* otherwise.

Release gives an app that closes itself on launch. Debug gives an app that
cannot start. Expo supports **Debug + Metro** or **Release + embedded bundle** —
not Debug + embedded bundle.

Three attempts to force the second combination failed (`FORCE_BUNDLING` as an
EAS env var, then as a config plugin). Each was verified by extracting the built
`.app` and checking for `main.jsbundle`. **Do not retry this** without reading
the git history first.

## The working setup: development build + Metro

`development` is the profile that works. It builds a dev client, and Metro
serves the bundle over a tunnel so a remote simulator can reach it.

```bash
npx eas-cli@latest build --profile development --platform ios
```

Then, on the machine holding the source:

```bash
npx expo start --tunnel --dev-client
```

Install the resulting `.app` on the simulator (Limrun works for this from
Windows), open it, and point it at the tunnel URL that `expo start` prints.

**Test Store purchases work here** because the dev client is a Debug build.

## Profiles

| Profile | Config | Bundle | Use |
|---|---|---|---|
| `development` | Debug | Metro (tunnel) | **The one that works.** Test Store purchases, and the demo-video recording. |
| `preview` | Release | embedded | Only useful with real Apple/Google store products and a production RevenueCat key. Closes on launch with a `test_` key. |
| `production` | Release | embedded | Store submission. Needs paid developer accounts. |

## Environment variables

Two separate traps here, both already hit:

**`EXPO_PUBLIC_*` values are inlined at build time**, and EAS Build uploads only
git-tracked files — so the gitignored `.env` never reaches the build server.
Cloud builds read these from EAS, registered once with:

```bash
npx eas-cli@latest env:create --name EXPO_PUBLIC_RC_TEST_STORE_KEY --value <key> --environment preview --visibility plaintext --scope project
```

**A build profile must declare which environment it reads.** A profile with no
`"environment"` field resolves *none* of the stored variables, and the app
launches with no API key at all. Every profile here sets it explicitly.

Anything behind `EXPO_PUBLIC_` is extractable from a shipped bundle. A Test
Store key is fine there; a production RevenueCat secret key is not.
