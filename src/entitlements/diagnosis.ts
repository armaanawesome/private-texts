/**
 * Turns RevenueCat's customer state into a verdict about why a case is still
 * locked after a successful purchase.
 *
 * Two very different faults produce the identical symptom — money taken,
 * nothing unlocked, no error anywhere — and they need opposite fixes. Guessing
 * between them costs a debugging session each time, so this decides from
 * evidence instead.
 *
 * Pure and free of react-native imports, like the rest of this folder, so it is
 * covered by the Node test suite.
 */

export interface EntitlementEvidence {
  /** The id this app gates on — `CASE_PACK_ENTITLEMENT`. */
  readonly expected: string;
  /** Entitlement ids currently active for this customer. */
  readonly activeIds: readonly string[];
  /** Every entitlement id RevenueCat knows for them, active or not. */
  readonly allIds: readonly string[];
  /** Product ids they have ever bought. */
  readonly purchasedProductIds: readonly string[];
}

export interface EntitlementVerdict {
  readonly ok: boolean;
  /** One line naming the problem and where it is fixed. */
  readonly fix: string;
}

export function explainEntitlementGap(e: EntitlementEvidence): EntitlementVerdict {
  if (e.activeIds.includes(e.expected)) {
    return { ok: true, fix: `Active: "${e.expected}". The gate should be open.` };
  }

  // Something is granted, just not under the name the code expects. This is the
  // cheap case: one constant, no dashboard access needed.
  if (e.activeIds.length > 0) {
    return {
      ok: false,
      fix:
        `RevenueCat reports "${e.activeIds.join('", "')}" active, but this app gates on ` +
        `"${e.expected}". Change CASE_PACK_ENTITLEMENT in src/entitlements/ids.ts to match.`,
    };
  }

  // The entitlement exists for this customer but is not currently granted.
  if (e.allIds.includes(e.expected)) {
    return {
      ok: false,
      fix:
        `"${e.expected}" exists for this customer but is no longer active — expired or revoked. ` +
        'Buy again, or check the entitlement period in the dashboard.',
    };
  }

  // Bought something, got nothing. No constant can fix this: there is no
  // entitlement to point at. Deliberately does not mention ids.ts.
  if (e.purchasedProductIds.length > 0) {
    return {
      ok: false,
      fix:
        `Product "${e.purchasedProductIds.join('", "')}" was purchased but grants no entitlement ` +
        'at all. Fix this in the RevenueCat dashboard: open the product, attach it to an ' +
        'entitlement, then buy again. Changing code cannot help here.',
    };
  }

  return {
    ok: false,
    fix:
      'No purchase and no entitlement reached RevenueCat for this customer. The buy either did ' +
      'not complete or went to a different app user id.',
  };
}
