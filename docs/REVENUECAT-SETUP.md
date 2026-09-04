# RevenueCat setup, from an empty project

Written 2026-09-04, after a build showed **$0.99** on a pack meant to cost
**$9.99** and offered no per-case option at all. Both are dashboard state, not
code — this file is the exact sequence to rebuild it.

**Read §0 first.** It decides how much of the rest you have to do.

---

## 0. Decide how much you are building

| | Work in the dashboard | What the player sees |
|---|---|---|
| **Pack only** | 1 product, 1 entitlement, 1 offering, 1 package | One card: *All 12 cases · $9.99* |
| **Pack + per-case** | **13** products, **13** entitlements, 1 offering, **13** packages | Two cards: *This case · $0.99* beside *All 12 cases · $9.99* |

The Shipaton requires the SDK to power **at least one** in-app purchase. Pack
only satisfies that completely.

The per-case option is twelve more products and twelve more entitlements, typed
by hand, each one an exact string that fails silently when it is wrong. The app
already handles their absence: with no `single_case_*` product in the offering
the paywall simply draws one card. **Nothing is broken by skipping it**, and it
can be added later with no app update, because products are matched by name at
runtime.

Do §1–§5. Do §6 only if you want the second card.

---

## 1. The price is a property of the PRODUCT

This is the whole explanation for the $0.99.

The app never hardcodes a price. `app/paywall.tsx` renders
`pkg.product.priceString`, which is whatever the store says — so the screen was
telling the truth and the product is set to 0.99.

The one number the app does own is the struck-through `$12`, which is
`PAID_CASE_COUNT × REFERENCE_PER_CASE` in `src/entitlements/pricing.ts`. It is a
reference figure, not a former price.

> **Changing the price means editing the product in the dashboard. There is no
> code change and no rebuild.** The app picks it up on the next launch.

---

## 2. Project and app

1. RevenueCat → **Projects** → your project (or create one).
2. **Project settings → Apps → + New**, platform **Test Store**.
3. Copy the **public app key**. It starts with `test_`.

> A `test_` key **only works in a Debug build.** The SDK checks the prefix at
> `configure()` and terminates the app otherwise. `src/entitlements/keyPolicy.ts`
> stops it reaching `configure()` in a Release build, so `preview` builds launch
> with purchases switched off rather than crashing. Use the `development` profile
> for anything involving a purchase. See `docs/BUILDING.md`.

Register the key with EAS — never in the repo:

```bash
npx.cmd eas-cli@latest env:create --name EXPO_PUBLIC_RC_TEST_STORE_KEY --scope project --environment development --visibility sensitive
```

---

## 3. The pack product

**Products → + New product.**

| Field | Value |
|---|---|
| Identifier | `all_cases` |
| Type | **Non-consumable** (one-time, permanent) |
| Price | **9.99** |

Non-consumable matters: a consumable can be bought twice and does not restore,
and the paywall promises *"Yours permanently — this is not a subscription"*.

**If the price is wrong, this field is the only place to fix it.**

---

## 4. The pack entitlement

**Entitlements → + New.**

| Field | Value |
|---|---|
| Identifier | `all_cases` |
| Attached products | `all_cases` |

> The identifier must match `CASE_PACK_ENTITLEMENT` in `src/entitlements/ids.ts`
> **character for character**. This project has already lost a real purchase to
> `case_pack_01` vs `case_pack_1`. When the two disagree, `purchase()` succeeds,
> the receipt is valid, and the player pays for nothing with no error anywhere.
>
> The app also still honours `case_pack_1` (`LEGACY_PACK_ENTITLEMENTS`), so an
> older purchase is not revoked. You do not need to recreate it.

---

## 5. The offering

**Offerings → + New offering.**

| Field | Value |
|---|---|
| Identifier | `default` (any name — the app never reads it) |
| **Make current** | **YES** |

Then **+ New package** inside it:

| Field | Value |
|---|---|
| Identifier | `$rc_lifetime` |
| Attached product | `all_cases` |

> **`getCasePackOffering()` reads `offerings.current` and nothing else.** An
> offering that is not marked current is invisible to the app, which then reports
> "The store has nothing to sell right now." If you build a second offering and
> forget this switch, that is the symptom.

**Stop here if you chose "pack only" in §0.** Skip to §7.

---

## 6. Per-case products (optional — the $0.99 card)

Twelve of everything. The app derives the entitlement name from the case id by
replacing hyphens with underscores (`singleCaseEntitlement()` in
`src/entitlements/access.ts`), so these strings are not a choice.

For **each** row: one product, one entitlement of the same name attached to that
product, and one package in the current offering attached to that product.

| Case | Product identifier **and** entitlement identifier |
|---|---|
| The Wake | `single_case_the_wake` |
| The Bothy | `single_case_the_bothy` |
| The Cut | `single_case_the_cut` |
| Open Mic | `single_case_open_mic` |
| Sunday Service | `single_case_sunday_service` |
| The Listener | `single_case_the_listener` |
| The Reunion | `single_case_the_reunion` |
| The Allotments | `single_case_the_allotments` |
| The Helpline | `single_case_the_helpline` |
| The Night Ferry | `single_case_the_night_ferry` |
| The Long Course | `single_case_the_long_course` |
| Deep Field | `single_case_deep_field` |

Type **Non-consumable**, price **0.99** each. The package identifier can be
anything; reuse the product string to keep it simple.

The four free cases — `tutorial`, `the-lighthouse`, `the-night-round`,
`the-understudy` — get nothing. They are not gated.

> **Never name a per-case product `case_pack_1` or `all_cases`.** The
> `single_case_` prefix exists because a test caught `case_` colliding: a case id
> of `pack-1` produced exactly `case_pack_1`, and a $0.99 purchase would have
> unlocked all twelve.

---

## 7. Supabase, so purchases follow the account

Two settings, both in the Supabase dashboard. Neither is optional now that the
app calls `Purchases.logIn`.

1. **Authentication → URL Configuration → Site URL.** The password-reset email
   sends people here. Unset, the link goes nowhere useful.
2. **Authentication → Policies.** Set a minimum password length of **8** to match
   the client, and switch on **leaked password protection** — it checks against
   Have I Been Pwned, which is strictly better than any word list the app could
   ship.

The app passes the Supabase `user.id` UUID to RevenueCat as the app user id, so a
purchase belongs to the account rather than to the handset. Nothing to configure
for that; it is code.

---

## 8. Verify, in this order

Run a `development` build with Metro:

```bash
npx.cmd eas-cli@latest build --profile development --platform ios
```

```bash
cd C:\Users\armaa\Downloads\ClaudeCode\shipaton-detective; npx.cmd expo start --tunnel --dev-client
```

1. **The catalogue loaded.** Open a locked case. The card shows the price set in
   §3. If it says "nothing to sell", the offering is not **current** (§5).
2. **The identity took.** Sign in, then check the Metro log:
   `[entitlements] identified as <uuid>`. In the dashboard, **Customers** should
   show that UUID and not `$RCAnonymousID:…`. If it still shows an anonymous id,
   `logIn` never ran.
3. **The purchase grants the right thing.** Buy. The log must print
   `[entitlements] active: all_cases`. **If that line disagrees with `ids.ts`, the
   log is right and the code is wrong** — that is the whole diagnosis.
4. **It follows the account.** Sign in as the same account on a second device (or
   delete and reinstall). The cases must be unlocked with no purchase and no
   restore tap.
5. **It does not follow the wrong account.** Sign out, sign in as a different
   account. The cases must be locked again.
6. **Failure paths.** Turn on airplane mode and buy — the paywall must say *"No
   connection to the store"*, not a generic error. The Test Store also has a
   simulated-failure code (`TEST_STORE_SIMULATED_PURCHASE_ERROR`) for exercising
   the declined path.

---

## 9. When something is wrong

`app/debug.tsx` is the Test Store harness, reachable from the case list in a dev
build. `diagnoseEntitlements()` reads the whole customer record — inactive
entitlements and purchased product ids included — and `explainEntitlementGap()`
turns it into one line naming the problem and where it is fixed. Two different
faults produce the identical symptom of "money taken, nothing unlocked", and that
function is what tells them apart.
