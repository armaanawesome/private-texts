import { describe, it, expect } from 'vitest';
import { CASES } from './index';
import { caseTextEntries } from '../i18n/caseText';

/**
 * Old names left behind by a rename.
 *
 * Three packs shipped calling the same person two different things. Deep Field
 * ran a whole case about Laura and then closed with `Orla Byrne's screen file
 * was never recovered`; The Wake said `Bridie Mulvey did not attend the trial`
 * about a woman the player had spent an hour calling Eileen; The Long Course
 * did it twice. Six instances, all in briefings and epilogues — the two places
 * a reader is least able to shrug it off, because that is where the case tells
 * them what it all meant.
 *
 * Nothing caught it. The naming rules only ask whether the *current* name
 * appears somewhere, and it always did.
 *
 * The signal that does catch it is already sitting in the data: **a character's
 * id is the name it was written under.** Renaming meant editing `name:` and the
 * prose, and the id stayed as it was — so an id that is not part of the current
 * display name, showing up capitalised in the text, is the old name surfacing.
 * `orla`/Laura, `pilar`/Maria, `hester`/Pauline, `bridie`/Eileen: every one of
 * the six was visible this way, in the file, the whole time.
 *
 * Found by a translation agent rather than by a test — it noticed the epilogue
 * naming somebody who had never appeared, which is exactly the kind of thing
 * that only shows up when a human-shaped reader goes through the prose line by
 * line looking for meaning rather than structure.
 */

/**
 * Ids whose display name is a relationship or a placeholder rather than a name.
 *
 * In these the id IS the character's real name and the prose is right to use
 * it: the tutorial's `tom` is signed in the player's phone as `Dad` and called
 * Tom Vardy by everybody else, and the Listener has no name at all, which is
 * the entire point of him.
 *
 * Listed by exact id so a genuine rename cannot hide behind the exemption, and
 * each is asserted to still deserve it below.
 */
const NAME_IS_NOT_A_NAME = new Map([
  ['tutorial:tom', 'Dad'],
  ['the-night-ferry:hannah', 'Mum'],
  ['the-listener:listener', 'Unknown number'],
]);

const capitalise = (s: string) => s.slice(0, 1).toUpperCase() + s.slice(1);

describe('renames leave nothing behind', () => {
  it('never calls a character by the name they were written under', () => {
    const leaks: string[] = [];

    for (const script of CASES) {
      const prose = [...caseTextEntries(script).values()].join('\n');

      for (const character of script.characters) {
        const old = capitalise(character.id);
        // The id is a short form of the current name — `mairi`/`Mairi Bell`,
        // `bea`/`Beatrice`, `ruth`/`Ruth Calder`. Not a rename.
        if (character.name.includes(old)) continue;

        const exempt = NAME_IS_NOT_A_NAME.get(`${script.id}:${character.id}`);
        if (exempt !== undefined) {
          expect(
            character.name,
            `${script.id}:${character.id} is exempt as "${exempt}" but is now called "${character.name}" — recheck the exemption`,
          ).toBe(exempt);
          continue;
        }

        if (new RegExp(`\\b${old}\\b`).test(prose)) {
          leaks.push(`${script.id}: "${old}" in the prose, but the character is called "${character.name}"`);
        }
      }
    }

    expect(leaks, 'a rename missed the prose — the player meets two names for one person').toEqual(
      [],
    );
  });

  /**
   * Guards the guard, with a real one that shipped. If the exemption list or
   * the substring shortcut ever widens far enough to swallow a genuine rename,
   * this fails rather than the suite going quietly green.
   */
  it('would have caught the six that shipped', () => {
    const prose = 'Bridie Mulvey did not attend the trial.';
    const character = { id: 'bridie', name: 'Eileen' };
    const old = capitalise(character.id);

    expect(character.name.includes(old)).toBe(false);
    expect(new RegExp(`\\b${old}\\b`).test(prose)).toBe(true);
  });
});
