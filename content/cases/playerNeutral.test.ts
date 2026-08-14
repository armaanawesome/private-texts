import { describe, it, expect } from 'vitest';
// CASES already includes the tutorial, which is the one case most likely to
// reach for a chummy second person and slip.
import { CASES } from './index';
import { caseTextEntries } from '../i18n/caseText';

/**
 * The player has no gender, and the English is where that gets decided.
 *
 * Every pack addresses the player directly and none of them describes them —
 * no age, no job, no face — because the player is supposed to be the person
 * holding the phone. That is a deliberate design property and it survived
 * fifteen packs.
 *
 * It broke in exactly one line. Pack 3 had Margo say `You are Ivy's godson
 * aren't you`, and nothing caught it, because in English it is one word in one
 * message and reads perfectly naturally.
 *
 * It surfaced only under translation, and only because two agents working in
 * different languages both stopped to flag it: French and Portuguese each
 * wrote a test *pinning the masculine*, with a comment explaining they were
 * following the English rather than assuming. They were right to — a
 * translation should not delete a fact the source states. But the cost was
 * that three languages had to gender a person the game keeps blank everywhere
 * else, and Spanish, French and Portuguese all agreed the wrong way down the
 * whole pack: `querido` from Ivy, `mais rápido` in the coda, each one
 * following from that single word.
 *
 * The English now names the relationship from Ivy's side — she is dead, female
 * and known — which carries the identical fact and marks nobody.
 *
 * So: a guard on the source, since the source is what forces every translator's
 * hand. Deliberately narrow. It looks for a gendered noun applied to the player
 * in the second person, not for gendered words generally — plenty of *characters*
 * are described as somebody's son or a young man, and must go on being.
 */

/** Nouns that would pin the player's gender if applied to them. */
const GENDERED = [
  'godson',
  'goddaughter',
  'son',
  'daughter',
  'nephew',
  'niece',
  'brother',
  'sister',
  'boy',
  'girl',
  'lad',
  'lass',
  'man',
  'woman',
  'sir',
  'madam',
];

/**
 * "You are X's godson", "you're his daughter", "you were her nephew".
 *
 * Matches a copula whose complement *is* the gendered noun, with at most one
 * determiner or possessive between them. Both looser drafts produced false
 * positives worth recording, because they are the shapes English keeps
 * offering:
 *
 * - Any gendered noun within forty characters of `you` flagged The Listener's
 *   `You went at the drug round and not at the woman` — two different people in
 *   one sentence.
 * - Adding a copula was not enough on its own: `You were slow on the son` and
 *   `you are doing to a man` both have one, with the noun sitting inside a
 *   prepositional phrase about somebody else.
 *
 * Requiring the noun to follow the copula directly is what separates a sentence
 * that *equates* the player with a gendered noun from one that merely mentions
 * both. It will miss a sufficiently baroque phrasing, and that is the right
 * trade — a rule that cries wolf on ordinary prose gets switched off.
 */
const ADDRESSED = new RegExp(
  String.raw`\byou(?:'re|’re| are| were)\s+(?:(?:a|an|the|his|her|their|my|your)\s+|\w+(?:'|’)s\s+)?(?:${GENDERED.join('|')})\b`,
  'i',
);

function prose(script: (typeof CASES)[number]): string {
  return [...caseTextEntries(script).values()].join('\n');
}

describe('the player stays unmarked', () => {
  it('never tells the player what they are, in any pack', () => {
    const offenders = CASES.map((script) => ({ id: script.id, hit: ADDRESSED.exec(prose(script)) }))
      .filter((r) => r.hit !== null)
      .map((r) => `${r.id}: "${r.hit![0].trim()}"`);

    expect(
      offenders,
      'the player has no gender, age or face — describe the character saying it instead',
    ).toEqual([]);
  });

  /**
   * Guards the guard, with the real line that got through.
   *
   * Without this, a later tightening of the pattern could quietly stop matching
   * anything and the suite would still be green — which is the state this rule
   * spent fifteen packs in.
   */
  it('would have caught all three lines that got through', () => {
    // Pack 3, found by two translators independently, in different languages.
    expect(ADDRESSED.test('You are Ivy’s godson aren’t you. She showed me your photograph')).toBe(
      true,
    );
    // Packs 14 and 11, found by this test on its first two runs — phrasings a
    // manual grep for `your son` missed entirely, which is the whole argument
    // for the rule being executable rather than written down somewhere.
    expect(ADDRESSED.test('I am giving it to you because you are her son and because')).toBe(true);
    expect(ADDRESSED.test('You are his daughter and you have come up here to do this')).toBe(true);
  });

  /**
   * And does not fire on the cases that are fine. All three of these are real
   * lines from shipped packs, describing somebody who is not the player: a
   * witness, a victim's child, a suspect's son.
   */
  it('leaves gendered descriptions of other people alone', () => {
    const fine = [
      'A very frightened young man on his fourth shift, who had just found a woman he liked.',
      'She found the hole in the Trust books that week. And it had your son inside it.',
      'Her daughter visited on the Tuesday evening and signed out at twenty to ten.',
      // Each of these broke an earlier draft of the pattern.
      'You went at the drug round and not at the woman.',
      'You were slow on the son.',
      'I know what you are doing to a man who cannot answer.',
      'You were kind to the girl and she remembered it.',
    ];
    for (const line of fine) {
      expect(ADDRESSED.test(line), `false positive on: ${line}`).toBe(false);
    }
  });
});
