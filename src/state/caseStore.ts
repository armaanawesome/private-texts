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
  /**
   * The contradiction proven by the most recent submit, so the board can show
   * that revelation specifically. Without it the UI cannot tell which of several
   * proven contradictions the player just landed.
   */
  lastConfirmedId: string | null;
  /**
   * The pair the most recent check actually compared.
   *
   * A success clears `pinnedClaimIds`, which is right for the chips — they
   * deselect ready for the next pairing. But the comparison sheet draws the two
   * statements it just broke, so it has to keep showing them, or the board
   * blanks itself at the exact moment the player wins.
   */
  lastComparedClaimIds: string[];

  /**
   * Where the player was, so Continue can reopen the conversation rather than
   * the case index. Persisted; see saveBlob.ts.
   */
  lastThreadId: string | null;
  lastMessageId: string | null;
  /**
   * Whether the saved progress for this case has been read back yet.
   *
   * The inbox waits on this. Without it, a resumed case renders for a frame
   * with `readMessageIds` still empty, which the briefing gate reads as "fresh
   * case" — so returning to a case you are halfway through flashes its briefing
   * screen at you before the save lands.
   */
  hydrated: boolean;

  loadScript: (script: CaseScript) => void;
  relocaliseScript: (script: CaseScript) => void;
  markRead: (messageId: string) => void;
  openThread: (threadId: string) => void;
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
  lastConfirmedId: null,
  lastComparedClaimIds: [] as string[],
  lastThreadId: null,
  lastMessageId: null,
  hydrated: false,
});

export const useCaseStore = create<CaseState>((set, get) => ({
  ...empty(),

  loadScript: (script) => set({ ...empty(), script }),

  /**
   * Swap the script's prose without touching a single thing the player has done.
   *
   * `loadScript` clears progress, which is right when a different case opens and
   * catastrophic when the same case comes back in another language: changing the
   * language mid-case would erase the session. A localised case is structurally
   * identical to its English — same ids, same windows, same predicates, same
   * order, enforced by the contract test in content/i18n — so every id already
   * held in `readMessageIds`, `pinnedClaimIds` and `confirmedContradictionIds`
   * still resolves against the new object.
   *
   * Guarded on the id rather than trusting the caller: relocalising to a
   * *different* case would leave progress from one case attached to another, and
   * that is a silent corruption rather than a visible crash.
   */
  relocaliseScript: (script) =>
    set((s) => (s.script === null || s.script.id !== script.id ? {} : { script })),

  /**
   * The early return also keeps `lastMessageId` honest. Reopening a finished
   * thread re-marks every message in it, so without the guard the resume
   * pointer would walk backwards over messages the player read days ago and
   * come to rest on whichever one happened to be last in the loop.
   */
  markRead: (messageId) =>
    set((s) =>
      s.readMessageIds.includes(messageId)
        ? s
        : { readMessageIds: [...s.readMessageIds, messageId], lastMessageId: messageId },
    ),

  /**
   * Records the conversation itself, which `markRead` cannot: a thread the
   * player has already finished produces no new reads, and it is still the
   * thread they were last in. Returns the same state when nothing changed, so
   * the screen can call this on every render without causing one.
   */
  openThread: (threadId) =>
    set((s) => (s.lastThreadId === threadId ? s : { lastThreadId: threadId })),

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

    const verdict = checkContradiction(script, a, b);
    const compared = [idA, idB];
    // A rejected pairing keeps its pins on the board so the player can swap one
    // out and try again, rather than rebuilding the comparison from scratch.
    if (!verdict.ok) {
      set({ lastVerdict: verdict, lastComparedClaimIds: compared });
      return;
    }

    const match = script.contradictions.find(
      (c) =>
        (c.claimIdA === idA && c.claimIdB === idB) || (c.claimIdA === idB && c.claimIdB === idA),
    );
    // The engine found a genuine conflict the author did not anticipate.
    // Accept it as a valid deduction, but it unlocks nothing.
    if (!match) {
      set({
        lastVerdict: verdict,
        pinnedClaimIds: [],
        lastConfirmedId: null,
        lastComparedClaimIds: compared,
      });
      return;
    }

    set({
      lastVerdict: verdict,
      pinnedClaimIds: [],
      lastConfirmedId: match.id,
      lastComparedClaimIds: compared,
      confirmedContradictionIds: confirmedContradictionIds.includes(match.id)
        ? confirmedContradictionIds
        : [...confirmedContradictionIds, match.id],
    });
  },

  clearPins: () => set({ pinnedClaimIds: [], lastVerdict: null }),

  reset: () => set({ ...empty() }),
}));
