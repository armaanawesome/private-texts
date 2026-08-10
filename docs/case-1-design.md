# Case 1 — "The Lighthouse": design notes

Written before any dialogue, per Task 13 Step 1. The claim table below **is** the
puzzle; the prose exists only to plant it. Contains the full solution.

## The solution, backwards

**Mairi Bell killed Ruth Calder** at the lighthouse on the night of the equinox
storm, between 22:05 and 22:15.

Ruth administered the Ardnoe Light Trust and Mairi kept its books. Mairi had been
taking from it for two years to cover her son Callum's debts. Ruth found the hole
in the accounts that week and told Mairi, that evening, that she would go to the
police in the morning. Mairi walked out to the Point to talk her round. Ruth was
at the top of the stairs.

It was recorded as a fall. Lighthouse stairs, a storm, a woman of sixty-one.

**The shape of the case:** Mairi's first lie is not about herself. It is about
Callum — she puts him in the café to keep him out of the questioning, because he
is the one person who saw her come back. That protective lie is the loose thread,
and pulling it unravels her. She lied for her son and it cost her everything.

## The three lies

Each proof forces her story to move, and the new story creates the next
contradiction. Her café alibi is the spine: it breaks twice, in two places, from
two different witnesses.

| # | id | Claim A | Claim B | Why it breaks |
|---|---|---|---|---|
| 1 | `x-callum-alibi` | Mairi: *Callum was in the café* | Callum: *I was at the slipway* | A mother gave her son an alibi he never asked for |
| 2 | `x-mairi-path` | Mairi: *I was in the café all evening* | Esme: *I passed her on the cliff path* | She was not where she put herself |
| 3 | `x-mairi-door` | Mairi: *I was in the café all evening* | Callum: *I saw her at the lighthouse door* | She was at the door at the minute Ruth fell |

Contradictions 1 and 2 are findable from the four threads that are open from the
start — the early win the player needs. Contradiction 3 requires Callum's
sighting, which only arrives after 1 **and** 2 are proven.

## Claim table

Times are minutes since the case epoch (day 1, 00:00), so `1300` = 21:40.

| id | subject | asserted by | predicate | window | thread |
|---|---|---|---|---|---|
| `c-mairi-cafe` | mairi | mairi | at_place `cafe` | 1230–1380 | `t-mairi` |
| `c-mairi-path` | mairi | esme | at_place `path` | 1305–1320 | `t-esme` |
| `c-mairi-door` | mairi | callum | at_place `lighthouse` | 1325–1335 | `t-callum-truth` |
| `c-mairi-cashing` | mairi | mairi | doing `cashing_up` | 1355–1380 | `t-mairi` |
| `c-callum-cafe` | callum | mairi | at_place `cafe` | 1260–1380 | `t-mairi` |
| `c-callum-slip` | callum | callum | at_place `slip` | 1300–1335 | `t-group` |
| `c-callum-ferry` | callum | callum | at_place `ferry` | 1140–1200 | `t-group` |
| `c-esme-cottage` | esme | esme | at_place `cottage` | 1140–1290 | `t-esme` |
| `c-esme-path` | esme | esme | at_place `path` | 1300–1330 | `t-esme` |
| `c-esme-cottage-late` | esme | mairi | at_place `cottage` | 1380–1440 | `t-mairi` |
| `c-ruth-tower` | ruth | ruth | at_place `lighthouse` | 1245–1350 | `t-ruth` |
| `c-ruth-lamp` | ruth | esme | at_place `lighthouse` | 1300–1320 | `t-esme` |
| `c-you-ferry` | you | you | at_place `ferry` | 1140–1200 | `t-group` |
| `c-you-cafe` | you | mairi | at_place `cafe` | 1265–1290 | `t-mairi` |

14 claims. Only 6 of them take part in a contradiction; the other 8 exist so the
player has to think rather than pair everything with everything.

## Why the decoys do not fire

The engine will confirm *any* pair that satisfies its rules, whether the author
intended it or not, so every same-subject pair was checked by hand and is
re-checked by `the-lighthouse.test.ts`.

- `c-mairi-path` × `c-mairi-door` — 1305–1320 vs 1325–1335, **no overlap**. She
  had time to walk from the path to the door; that is the point.
- `c-mairi-cashing` is the only `doing` claim, so it can only ever meet an
  `at_place` claim — the engine rejects those as *"different kinds of thing"*.
  It is there to teach that rejection.
- `c-ruth-tower` × `c-ruth-lamp` — same place, so no conflict. Two people
  independently putting Ruth up the tower is corroboration, and reads like it.
- Every remaining same-subject pair (`esme`, `callum`, `you`) is separated in
  time. Callum's ferry run ends at 20:00, an hour before any claim about him.

## Places

`placesConflict` treats nesting as compatible — standing on the pier is standing
at the harbour — so the tree matters:

```
point                harbour              cottage      ferry
├── lighthouse       ├── cafe
└── path             └── slip
```

`lighthouse` and `path` are siblings, so they conflict. Either against `point`
would **not** conflict, which is why no claim ever uses `point` directly.

## Cast

Five characters, one of them the player.

- **you** — Ruth's niece. Off the island for six years. Came back on the last
  ferry the night she died.
- **ruth calder** — 61. Kept the light after it was automated because nobody
  asked her to stop. Chair of the Ardnoe Light Trust.
- **mairi bell** — runs the harbour café. Kept the Trust's books. The killer.
- **callum bell** — 19. Mairi's son. Works the ferry. Saw his mother come back
  along the path, wet through, and said nothing.
- **esme trian** — marine biologist, renting the cottage for a seal survey.
  An outsider, and the only person with no reason to shade the truth. Her
  precision is what breaks the case.
