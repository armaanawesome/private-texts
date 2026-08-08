import { create } from 'zustand';
import {
  checkContradiction,
  type CaseScript,
  type Claim,
  type ContradictionVerdict,
} from '@/engine';

interface CaseState {
  script: CaseScript | null;
  readMessageIds: string[];
  pinnedClaimIds: string[];
  confirmedContradictionIds: string[];
  lastVerdict: ContradictionVerdict | null;

  loadScript: (script: CaseScript) => void;
  markRead: (messageId: string) => void;
  togglePin: (claimId: string) => void;
  submitPins: () => void;
  clearPins: () => void;
  reset: () => void;
}

function allClaims(script: CaseScript): Map<string, Claim> {
  const map = new Map<string, Claim>();
  for (const thread of script.threads) {
    for (const msg of thread.messages) {
      for (const c of msg.claims ?? []) map.set(c.id, c);
    }
  }
  return map;
}

/**
 * A factory, not a frozen constant: each reset must get its own arrays, or every
 * case would share — and mutate — the same three lists.
 */
const empty = () => ({
  script: null,
  readMessageIds: [] as string[],
  pinnedClaimIds: [] as string[],
  confirmedContradictionIds: [] as string[],
  lastVerdict: null,
});

export const useCaseStore = create<CaseState>((set, get) => ({
  ...empty(),

  loadScript: (script) => set({ ...empty(), script }),

  markRead: (messageId) =>
    set((s) =>
      s.readMessageIds.includes(messageId)
        ? s
        : { readMessageIds: [...s.readMessageIds, messageId] },
    ),

  togglePin: (claimId) =>
    set((s) => {
      if (s.pinnedClaimIds.includes(claimId)) {
        return {
          pinnedClaimIds: s.pinnedClaimIds.filter((id) => id !== claimId),
          lastVerdict: null,
        };
      }
      // The board holds two slots. A third pin pushes out the oldest.
      return { pinnedClaimIds: [...s.pinnedClaimIds, claimId].slice(-2), lastVerdict: null };
    }),

  submitPins: () => {
    const { script, pinnedClaimIds, confirmedContradictionIds } = get();
    if (!script || pinnedClaimIds.length !== 2) {
      set({ lastVerdict: { ok: false, reason: 'Pin two statements to compare them.' } });
      return;
    }
    const claims = allClaims(script);
    const [idA, idB] = pinnedClaimIds as [string, string];
    const a = claims.get(idA);
    const b = claims.get(idB);
    if (!a || !b) {
      set({ lastVerdict: { ok: false, reason: 'Those statements are no longer on the record.' } });
      return;
    }

    const verdict = checkContradiction(script.places, a, b);
    // A rejected pairing keeps its pins on the board so the player can swap one
    // out and try again, rather than rebuilding the comparison from scratch.
    if (!verdict.ok) {
      set({ lastVerdict: verdict });
      return;
    }

    const match = script.contradictions.find(
      (c) =>
        (c.claimIdA === idA && c.claimIdB === idB) || (c.claimIdA === idB && c.claimIdB === idA),
    );
    // The engine found a genuine conflict the author did not anticipate.
    // Accept it as a valid deduction, but it unlocks nothing.
    if (!match) {
      set({ lastVerdict: verdict, pinnedClaimIds: [] });
      return;
    }

    set({
      lastVerdict: verdict,
      pinnedClaimIds: [],
      confirmedContradictionIds: confirmedContradictionIds.includes(match.id)
        ? confirmedContradictionIds
        : [...confirmedContradictionIds, match.id],
    });
  },

  clearPins: () => set({ pinnedClaimIds: [], lastVerdict: null }),

  reset: () => set({ ...empty() }),
}));
