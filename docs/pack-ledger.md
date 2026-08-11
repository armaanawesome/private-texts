# Pack ledger

The uniqueness contract. Thirteen mysteries written by one hand will start
repeating shapes unless something stops them, so this fixes the **shape of the
lie** for every pack before any of them are written. Setting alone is not
variety: two cases in different buildings with the same kind of lie are the same
case.

Rules this table enforces:

1. **No two packs share a shape of lie.**
2. **No two consecutive packs lean on the same engine axis.**
3. Every pack has a red herring who is **innocent for a provable reason**.
4. Connection packs (3, 6, 9, 12, 15) reveal only in the confrontation.

| # | Title | Setting | Shape of the lie | Axis | Arc |
|---|---|---|---|---|---|
| 1 | **The Lighthouse** | Scottish coastal village | Killer's first lie is about a **third party** — protective misdirection that unravels her | place + action | **Hook** |
| 2 | **The Understudy** | Touring theatre, press night | **Locked room.** Victim was the aggressor; killer's crime is an omission | object (unique key) | — |
| 3 | **The Night Round** | Care home, night shift | The lie is about **routine** — a round she signed for and never walked | action + discovery | **Connection 1** |
| 4 | **Deep Field** | Antarctic station, winter-over | The lie is about **which clock** — the station runs three time zones at once | time | — |
| 5 | **The Wake** | A house full of family | **Collective alibi.** Everyone lies identically to protect someone; the killer hides inside it | place (theme: with_person) | — |
| 6 | **The Long Course** | Rowing club, regatta day | The lie is about **identity** — eight people in the same kit, from the bank you cannot tell | place | **Connection 2** |
| 7 | **The Bothy** | Mountain bothy, snowed in | The lie is about **order** — who arrived before whom | time | — |
| 8 | **Sunday Service** | Village church, missing funds | The lie is a **forged record** that contradicts a living memory | object + action | — |
| 9 | **The Cut** | Canal boat community | The lie is about **movement** — a boat that could not have gone that far in that time | place + time | **Connection 3** |
| 10 | **Open Mic** | Comedy club, filmed night | The alibi is **on video**, and the timestamp is wrong | object | — |
| 11 | **The Allotments** | Allotment society, long feud | The lie is about **possession** — whose tool, whose key, whose shed | action + place | — |
| 12 | **The Helpline** | A crisis line, overnight | The lie is about **a call that was never made** | action | **Connection 4** |
| 13 | **The Reunion** | School reunion, twenty years on | A **twenty-year-old lie**, and this killing exists to keep it | time (theme: with_person) | — |
| 14 | **The Night Ferry** | Overnight crossing | The lie depends on a **crossing time** | time | — |
| 15 | **The Listener** | Everywhere the player has been | He has never lied. **Except once, in Pack 1** | all | **Finale** |

## Arc beats, in the confrontation only

| Pack | What the killer lets slip |
|---|---|
| 3 | The caller knew the victim's **prognosis** — months, not years. That was in no record the killer could reach |
| 6 | He mentioned a death from **decades** ago as though he had been there |
| 9 | He asked, afterwards, **how it had gone**. He follows up. Every time |
| 12 | He knew the **script** — the exact phrasing a trained listener uses. Because he was one |
| 15 | The first one was yours |

## Red herrings, once a clue is public

Each must be innocent for a reason the player can prove.

| From pack | Clue known | Herring seeded in |
|---|---|---|
| 1 | never writes, only calls | **4** — a man who never texts because he cannot read well |
| 3 | had private access | **7** — someone who knew because they cleaned the house |
| 6 | been at it for decades | **10** — the right age, the right towns, and simply unlucky |
| 12 | trained on a crisis line | **13** — a suspect who volunteered on one. Thousands did |

## Corrections made in flight

**Pack 11 axis, changed 2026-08-12.** The ledger originally filed both Pack 10
and Pack 11 under `object`, which breaks its own rule 2. Caught before Pack 11
was written.

Possession stays the *theme* — it is what the whole feud is about — but the three
required proofs now run on action and place. The object appears exactly once, in
the optional contradiction that clears the red herring, which is the right weight
for it: the fork everybody argues about is not what convicts anybody.

**`with_person` is not a provable axis, corrected 2026-08-12.** The ledger filed
Packs 5 and 13 under `with_person`. The engine can never fire a contradiction on
it — `checkContradiction` ends at `src/engine/contradiction.ts:85` with *"Those
two things can both be true,"* because being with one person does not exclude
being with another. A pack that leaned on it would have nothing to prove with.

Pack 5 had already shipped its required proofs on place, so only its row was
wrong. Pack 13 is corrected to **time**, and turns the constraint into the pack's
signature: a reunion is a room where everyone can tell you who they were standing
with, and the engine refuses every one of those statements. The `with_person`
claims are written as *deliberate* dead ends — the player pairs them, gets told
they can both be true, and learns that co-presence was never proof. That is the
whole emotional content of the setting, enforced by a rule rather than narrated.

The axis column now reads `axis (theme: X)` where a pack's subject matter and its
proving axis differ.

**Rule 2 is not mechanically checkable, established 2026-08-12.** Moving Pack 13
to `time` put it next to Pack 14, which is also `time`, so the rule was measured
against the written packs rather than argued about. The result
(`content/cases/ledger.test.ts` computes it):

> Eight of the first thirteen packs break on exactly `at_place + doing`.

That is not a variety failure. Place and action are the ordinary vocabulary of
any alibi, and the set does not distinguish Pack 7 (who arrived before whom) from
Pack 8 (a forged record) from Pack 9 (a boat that could not have gone that far).
Those are plainly different cases. There is also no time *rule* in the engine —
`windowsOverlap` is a gate every comparison passes through, not a predicate — so
a "time pack" is always realised through place or action claims with carefully
chosen windows. Pack 4 and Pack 7 were already doing that.

So **rule 1 is the one that protects variety**, and rule 2 was a proxy for it
that could never have been enforced. Rule 1 is now executable: every pack
declares its dimension in `ledger.test.ts` and no two may match. The same file
also fails any pack whose required proof runs on `with_person`, which is the bug
that started this.

Keep reading the axis column when writing — varying the engine vocabulary is
still good practice, and it is what stopped Packs 10 and 11 being the same case.
It is guidance now, not a contract.

## Standing craft rules

- **Cast:** 5–6 including the player. More than six and nobody is a person.
- **Threads:** 5–7. At least one opened by **discovery**, not by a proof.
- **Contradictions:** 3 required, plus 1 optional that clears the red herring.
- **Motive:** 1, established by reading two messages in different threads.
- **Voice:** every character needs one tell in how they type — capitals, no
  punctuation, a word they overuse. If two characters could be swapped without
  the reader noticing, one of them is not written yet.
- **The victim gets a thread.** Their last messages, before. It is the only place
  the player meets them alive, and it is what makes the ending cost anything.
