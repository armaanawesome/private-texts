# Engine v2 — more axes than time and place

Design only. Nothing here is implemented yet. Written so the direction can be
argued with before any of it is built, because the current rules are
load-bearing and every case would have to be re-authored if they change twice.

## The one thing that must not break

The engine's value is that a rejection **explains itself**:

> "These are about different people." · "These describe different times."

That is what turns a wrong guess into a lesson, and it is the clearest evidence
on camera that a real rules engine is running rather than a scripted
if-statement. Every addition below has to survive that test: if a new rule
cannot produce a one-line reason a player understands, it does not go in.

## What the engine does today

`checkContradiction(places, a, b)` asks four questions in order:

1. same claim twice? → reject
2. **different subject? → reject**
3. windows do not overlap? → reject
4. different predicate kind? → reject

then a per-kind rule: `at_place` conflicts if the places conflict, `doing`
conflicts within an `exclusiveGroup`, `with_person` never conflicts.

Step 2 is the constraint that blocks most of what is wanted below.

---

## 1. Murder weapon — needs the subject rule generalised

A weapon contradiction is *"you both cannot have had the knife at ten past
ten"*. That is two claims about **different people**, so step 2 rejects it
today.

**The fix is a generalisation, not an exception.** A claim already has an
implicit anchor — the thing it makes a statement about. For `at_place` that is
the person. For a weapon it is the object.

```ts
type ClaimPredicate =
  | { kind: 'at_place';    placeId: string }
  | { kind: 'with_person'; personId: string }
  | { kind: 'doing';       actionId: string; exclusiveGroup: string }
  | { kind: 'has_object';  objectId: string }   // NEW

interface CaseObject {
  id: string;
  name: string;          // "the boat key", "the storm lamp"
  /** Only one can exist, so two holders at once is impossible. */
  unique: boolean;
}
```

Step 2 becomes *"different **anchor** → reject"*, where

| predicate | anchor | conflicts when |
|---|---|---|
| `at_place` | `claim.subject` | places conflict |
| `doing` | `claim.subject` | same `exclusiveGroup`, different `actionId` |
| `with_person` | `claim.subject` | never |
| `has_object` | `predicate.objectId` | object is `unique` **and** subjects differ |

Every existing case behaves identically, because for the three current
predicates the anchor *is* the subject. New reason string: *"Only one person can
have had it."*

## 2. Location of the body — already supported

Worth stating so nobody builds machinery for it. The victim is a character, so
"the body was at the foot of the stairs" is an ordinary `at_place` claim with
`subject: victimId`. Conflicting accounts of where the body was found already
work, today, with no engine change.

## 3. Motive — deliberately NOT a contradiction

Motive does not fit and should not be forced. The engine answers *"can these
both be true?"*. Motive answers *"why would they?"* — it is not falsifiable by
pairing two statements, and squeezing it in would produce exactly the
unexplainable verdict the top of this document forbids.

So it becomes a **second axis of evidence**, gating the accusation:

```ts
interface Motive {
  id: string;
  characterId: string;
  summary: string;              // "The Trust money was covering Callum's debts."
  establishedByMessageIds: string[];   // reading ALL of these establishes it
}
```

`evaluateAccusation` gains one step, checked **after** proof and **before**
identity — same reasoning as the existing order, so the killer stays
un-brute-forceable:

1. all required contradictions proven? → else *"You cannot prove it yet."*
2. **motive established for the accused? → else "You can break their story, but not say why."**
3. right person? → else *"The evidence does not fit this person."*

This is the real deepening. Today you win by breaking an alibi. Then you win by
breaking an alibi **and** knowing why they did it — and the two are found in
different places, so the reading matters as much as the pairing.

## 4. Case intro — a dossier, not a cutscene

Shown once on first open, reachable afterwards from the board.

```ts
interface CaseBriefing {
  victimId: string;
  foundAt: { placeId: string; minutes: number };
  causeOfDeath: string;   // "a fall from the tower stairs"
  ruling: string;         // "Recorded as accidental."
  opening: string;        // the hook, two sentences
}
```

Rendered in the instrument language already established — the poster field, the
tick strip, mono for the recorded facts. It states what is **not** in dispute,
which is what makes the disputed parts legible. The weapon and the body location
belong here, as facts, so that a later claim contradicting them lands.

## 5. Thread discovery — follow the information

Today a thread unlocks on `requiresContradictionIds`, which only models
escalation. The wanted shape — first responders, then family, then whoever they
mention — is *discovery*: someone names a person, and that person becomes
reachable.

```ts
interface ThreadGate {
  contradictionIds?: string[];   // as today: escalation
  readMessageIds?: string[];     // NEW: someone mentioned them
  motiveIds?: string[];          // NEW: you learned why
}
```

`visibleThreads` requires every listed condition. `readMessageIds` is the one
that produces the natural chain, and it costs almost nothing: the store already
tracks `readMessageIds`, and `availableClaims` already derives from it.

**Content rule this implies:** a thread unlocked by a mention must be *named* in
the message that unlocks it. If Mairi says "ask the boy who runs the ferry", the
ferry thread appearing is a reward for reading. If nothing named it, the same
event is a bug.

## Order to build in

Each step ships and is playable on its own.

| # | Step | Why here |
|---|---|---|
| 1 | Anchor generalisation + `has_object` | Pure engine, fully unit-testable, unlocks the weapon axis |
| 2 | `ThreadGate.readMessageIds` | Smallest change with the largest effect on how the game *feels* |
| 3 | Motive + the accusation step | Changes the win condition, so it wants the other two settled |
| 4 | Case briefing screen | Presentation only, but reads better once weapon and motive exist to point at |

## Risks

- **Re-authoring.** Every change to `ThreadGate` or `CaseSolution` invalidates
  existing case scripts. Case 1 is the only one; do all of these before writing
  Case 2, or pay for it twice.
- **Explanation debt.** Two new reject reasons and one new accusation refusal
  have to be written as carefully as the existing ones. They are the interface.
- **The pairwise scan gets stricter.** `has_object` creates cross-subject pairs,
  so the "no unintended contradictions" test in `the-lighthouse.test.ts` will
  suddenly be checking a much larger space. That is a feature, but expect it to
  fail loudly the first time a weapon is added to a case.
