import type { CaseTranslation } from '../caseText';

/**
 * Tutorial — "Die Backstube". German.
 *
 * Four things this had to get right, in this order.
 *
 * 1. Times. Every clock time in the English survives unchanged, in the same
 *    grammatical position, because the whole case is one person in two places at
 *    one moment. "ten past three" is 03:10 in Roza's account of the smoke break,
 *    03:10 on the claim chip and 03:10 in her confession — `zehn nach drei` in
 *    all three, or the player is comparing two different facts. The durations go
 *    the same way: half an hour is `eine halbe Stunde`, twenty two years is
 *    `zweiundzwanzig`, and "back before half two" stays `vor halb drei`, which is
 *    the same minute in both languages and the reason the wording was not
 *    "helpfully" squared with the 02:45 on the chip.
 *
 * 2. Names. Roza, Ivy, Tom Vardy, Peter Osei and Vardy’s stay as they are —
 *    those are people and a business. The five places are translated, because
 *    they are descriptions rather than names, and "the garage on the bypass"
 *    sitting untranslated inside a German sentence reads as a machine.
 *    `Umgehungsstraße` is the road Peter Osei died on and the road the garage is
 *    on, one word in both places for exactly that reason.
 *
 *    The place names carry no article — `Backstube`, not `die Backstube`. German
 *    declines the article and the adjective with the case, so a chip reading
 *    `der Hinterhof` next to a message reading `im Hinterhof` is two spellings
 *    of one place, and matching a chip to a sentence is the entire move this
 *    tutorial teaches. Bare nouns survive every case the prose puts them in.
 *
 * 3. Voice. Four people text differently and the difference is the character.
 *    English carries most of it on capitalisation and dropped apostrophes, and
 *    German has neither lever in the same strength: nouns are capitalised by
 *    rule, and the clipped forms a nineteen year old actually types (`hab`,
 *    `is`, `grad`, `ne`) need no apostrophe to begin with. So the load moved to
 *    syntax and length:
 *
 *      Papa   — capitalised, plain words, short main clauses, and sentence
 *               fragments where a man of sixty would just stop (`Öfen an.`).
 *               Never a contraction, never a colloquialism.
 *      Roza   — capitalised and hypotactic. Long sentences that hold their
 *               subordinate clauses to the end, precise conjunctions, textbook
 *               word order. She learned the language as an adult and is proud of
 *               it, so she is the only one who never clips a single word.
 *      Ivy    — all lowercase, which in German breaks the noun-capitalisation
 *               rule and so reads as *more* deliberate than it does in English.
 *               No commas anywhere. Run-on. Spoken clipping (`is`, `hab`, `ne`,
 *               `halt`, `grad`) and the spoken `weil` with main-clause word
 *               order at iv3, which no adult in this case would write.
 *      Du     — lowercase like Ivy, and separated from her by length: never more
 *               than a handful of words, no closing punctuation. Someone typing
 *               on a phone in the dark. Lowercase-plus-run-on is Ivy;
 *               lowercase-plus-terse is the player.
 *
 * 4. `du`, never `Sie`, in every thread and in the confrontation. Games in
 *    German are informal almost without exception, the UI catalogue already is,
 *    and Roza has known this player since they were a child.
 *
 * `kiddo` is `Kind`. Every other option a German father has for a grown child is
 * either gendered or a pet name for a partner; `Kind` is neuter, warm and
 * slightly old-fashioned, which is Tom exactly. The player's gender is never
 * stated in this case and nothing here states it.
 *
 * No arc content: the tutorial does not carry the Keeper and must not start.
 */
export const tutorialDe: CaseTranslation = {
  title: 'Die Backstube',
  blurb:
    'Fang hier an. Dein Vater ist im Hof hinter seiner eigenen Bäckerei gestorben, und schuld war angeblich die Handbremse. Drei Gespräche, und darin ein Satz, der nicht wahr sein kann.',

  characters: {
    you: 'Du',
    tom: 'Papa',
    roza: 'Roza',
    ivy: 'Ivy',
  },

  places: {
    bakery: 'Vardy’s',
    ovens: 'Backstube',
    yard: 'Hinterhof',
    square: 'Marktplatz',
    station: 'Tankstelle an der Umgehungsstraße',
  },

  threads: {
    't-tom': 'Papa',
    't-roza': 'Roza Bielik',
    't-ivy': 'Ivy',
  },

  briefing: {
    causeOfDeath: 'Vom Lieferwagen im Hinterhof erfasst.',
    ruling: 'Die Handbremse. Als Unfall zu den Akten gelegt, keine weiteren Ermittlungen.',
    opening:
      'Tom Vardy hat einunddreißig Jahre lang oben am Marktplatz die Nächte durchgebacken. Die zwei Morgen, die er verpasst hat, waren der nach dem Tod seiner Frau und der nach deiner Geburt.\n\nGefunden haben sie ihn um zehn nach vier im Hinterhof, den Lieferwagen an der Mauer und die Handbremse gelöst. Alle waren sehr freundlich. Alle haben außerdem ihre Version dieser Nacht, und eine Version ist nichts weiter als das Wort von jemandem.',
  },

  messages: {
    // ------------------------------------------------------------------ t-tom
    t1: 'Öfen an. Zwei Stunden zu früh dran. Konnte wieder nicht schlafen.',
    t2: 'es ist 2 uhr nachts',
    t3: 'Es ist auch hier zwei Uhr nachts, Kind. Ich bin bis zur ersten Auslieferung um drei in der Backstube. Rede mit mir.',
    t4: 'Heute früh bin ich an der Kurve an der Umgehungsstraße vorbeigefahren. Sie legt immer noch Blumen hin. Am Donnerstag sind es drei Jahre, und in keinem davon habe ich ein Wort gesagt.',
    t5: 'papa wovon redest du',
    t6: 'Ich habe ihr heute Nacht gesagt, dass ich am Montag hingehe. Was es uns beide auch kostet.\n\nSie hat es besser aufgenommen, als ich erwartet habe. Genau das ist der Teil, mit dem ich nicht ins Reine komme.',
    t7: 'Jemand hat den Lieferwagen wieder am Hang stehen lassen. Ich stelle ihn um, wenn die zweite Charge drin ist.',
    t8: 'ich mache das hier dauernd auf und es kommt nichts neues',

    // ----------------------------------------------------------------- t-roza
    r1: 'Es tut mir so leid. Ich hätte selbst zu dir kommen müssen, statt es einen Polizisten an einer Haustür sagen zu lassen. Ich habe diese Nachricht viermal angefangen.',
    r2: 'Zweiundzwanzig Jahre habe ich neben deinem Vater gearbeitet. Er hat mir Arbeit gegeben, als ich neunzehn war und kaum auf Englisch danach fragen konnte, und kein einziges Mal hat er es mich spüren lassen.',
    r3: 'alle sagen mir es war die handbremse',
    r4: 'Ich bin um zwanzig nach zwei losgegangen, um Milch zu holen, zur Tankstelle an der Umgehungsstraße, weil wir keine mehr hatten und er sie in den Tee nimmt. Ich war vor halb drei wieder da.\n\nIch erzähle es dir genauso, wie ich es ihnen erzählt habe, weil du es genauso haben sollst wie sie.',
    r5: 'Danach habe ich die Backstube nicht mehr verlassen. Zwischen drei und vier war ich kein einziges Mal draußen. Wenn ich draußen gewesen wäre, hätte ich ihn hinausgehen sehen.',
    r6: 'Er ist gegen zehn nach drei zum Rauchen nach hinten hinausgegangen. Das hat er immer getan, zwischen der zweiten und der dritten Charge. Er war eine halbe Stunde draußen, und ich habe mir nichts dabei gedacht, weil es auch nichts zu denken gab.',
    r7: 'hast du irgendwas gehört',
    r8: 'Nichts. Der Abzug ist sehr laut, und ich hatte die Knetmaschine mit der zweiten Schüssel laufen. Ich bin es wieder und wieder durchgegangen.\n\nIvy kam um fünf, um den Laden aufzumachen, und ich habe sie nach Hause geschickt. Neunzehn Jahre alt. Sie hätte den Hinterhof so nicht sehen müssen.',

    // ------------------------------------------------------------------ t-ivy
    iv1: 'hi sorry dass ich dir schreibe ich bin ivy vom tresen bei vardys. sorry ich weiß es is grad echt der schlechteste zeitpunkt überhaupt drück dich',
    iv2: 'schon ok. roza hat gesagt du warst um fünf da',
    iv3: 'war ich auch aber deswegen schreib ich nicht. ich konnte in der nacht nicht schlafen. ich saß bei mir am fenster mit dem licht aus weil ich hatte streit mit meiner mutter und sie sollte nicht merken dass ich noch wach bin',
    iv4: 'der abzug lief die ganze zeit also wusste ich dass tom drin is. man hört den über den ganzen marktplatz. der lief von drei uhr bis nach vier als der krankenwagen kam',
    iv5: 'roza sagt er war ab zehn nach drei hinten rauchen. du sagst er hat die bäckerei nie verlassen',
    iv6: 'der hinterhof is doch die bäckerei. du gehst hinten raus und stehst trotzdem noch drin. sorry das soll nicht zickig klingen es is halt einfach dasselbe gebäude',
    iv7: 'das is das was mir nicht aus dem kopf geht. ich hab roza um zwanzig nach drei auf dem marktplatz gesehen. sie is vorne zur tür raus und dann um die ecke rum. ich hab ihr gesicht unter der laterne gesehen',
    iv8: 'sie hat mir gesagt sie war zwischen drei und vier durchgehend in der backstube',
    iv9: 'ja. ich hab es dem polizisten gesagt und er hat es aufgeschrieben und dann hat er mich gefragt ob ich was getrunken hatte. hatte ich nicht. ich saß im dunkeln an einem fenster wie so ne verrückte und ich weiß ganz genau was ich gesehen hab',
    iv10:
      'da is noch eine sache und dann lass ich dich in ruhe. vor ein paar wochen hat tom mich gefragt wie man sich für was stellt was man nicht gemacht hat aber direkt danebengesessen is. ich dachte er redet über einen film. er hat gesagt roza würde es schlimmer treffen als ihn drück dich',
  },

  /**
   * The clock times here are digits in both languages and must stay digit for
   * digit identical to the English, because these are the six lines the player
   * lays side by side on the board.
   */
  claims: {
    'c-tom-ovens': 'Papa: in der Backstube, 02:05–03:00',
    'c-roza-station': 'Roza: bei der Tankstelle an der Umgehungsstraße, 02:20–02:45',
    'c-roza-ovens': 'Roza: in der Backstube, 03:00–04:00',
    'c-tom-yard': 'Papa: draußen im Hinterhof, 03:10–03:40 (laut Roza)',
    'c-tom-bakery': 'Papa: bei Vardy’s, 03:00–04:00 (laut Ivy)',
    'c-roza-square': 'Roza: auf dem Marktplatz, 03:15–03:30 (laut Ivy)',
  },

  motives: {
    'm-bypass':
      'Vor drei Jahren hat der Lieferwagen der Bäckerei um vier Uhr morgens auf der Umgehungsstraße einen Mann erfasst. Roza saß am Steuer, Tom schlief auf dem Beifahrersitz, und zusammen haben sie es ein Reh genannt. In der Woche hat er ihr gesagt, dass er am Montag zur Polizei geht.',
  },

  contradictions: {
    'x-roza-square':
      'Sie hat die Backstube zwischen drei und vier nicht verlassen. Sie hat es einem Polizisten gesagt und danach hat sie es dir gesagt.\n\nUm zwanzig nach drei hat eine Neunzehnjährige an einem dunklen Fenster gesehen, wie sie vorne zur Tür herauskam und um das Gebäude herum ging. Um die Ecke ist nichts außer dem Hinterhof.',
  },

  confrontation: {
    opening:
      'Dann sag es. Ich warte seit drei Tagen darauf, dass es endlich jemand ausspricht, und mir ist lieber, du bist es als ein Mann mit einer Aktenmappe.',
    beats: {
      'b-square': {
        press:
          'Du hast mir zweimal gesagt, dass du die Backstube zwischen drei und vier nicht verlassen hast. Ivy hat gesehen, wie du um zwanzig nach drei vorne zur Tür herauskamst und um die Ecke gegangen bist.',
        rebuttal:
          'Ein Mädchen am Fenster, im Dunkeln, um drei Uhr nachts, das man gerade aus einem Hof nach Hause geschickt hatte. Und das willst du gegen zweiundzwanzig Jahre von mir stellen.',
      },
      'b-why': {
        press:
          'Vor drei Jahren bist du diesen Lieferwagen auf der Umgehungsstraße gefahren. Er hat neben dir geschlafen, und ihr beide habt es ein Reh genannt. In der Nacht hat er dir gesagt, dass er am Montag hingeht.',
      },
    },
    deflections: [
      'Das beweist überhaupt nichts.',
      'Du warst lange nicht mehr hier. Du weißt gar nicht, was du da vor dir hast.',
      'Frag mich etwas, das du wirklich in der Hand halten kannst.',
    ],
    confession:
      'Er stand hinten daran, die Hand an der Tür, und er war nicht einmal wütend auf mich. Das ist es, worüber ich nicht hinwegkomme. Er hat sich umgedreht und gesagt, komm und sieh dir diese Handbremse an, Roza, einer von uns beiden verletzt sich damit noch.\n\nIch bin vorne herum gegangen und habe sie gelöst.\n\nIch sage mir seit drei Tagen, dass ich es nicht entschieden habe. Das ist eine Lüge von derselben Größe wie das Reh. Entschieden habe ich es um zehn nach drei, am Spülbecken, die Hände im Wasser.\n\nEr hat mir Arbeit gegeben, als ich neunzehn war und nicht richtig danach fragen konnte. Daraus ist ein ganzes Leben geworden. Am Montag wollte er alles zurückgeben, und über diesen Punkt hinaus konnte ich nicht denken, und ich kann es immer noch nicht.',
  },

  epilogue:
    'Sie hat alles erzählt, bevor das Band lief, und danach hat sie es fürs Band noch einmal erzählt, ohne ein Wort zu ändern.\n\nDer Mann auf der Umgehungsstraße hieß Peter Osei. Er war vierundfünfzig und ging nach einer Schicht im Lager zu Fuß nach Hause, weil der letzte Bus weg war. Seine Mutter legt jedes Jahr Blumen an diese Kurve. Dieses Jahr lagen dort zwei Sträuße, weil dein Vater schon da gewesen war.\n\nVardy’s hat nicht wieder aufgemacht. Ivy hat Arbeit in der großen Bäckerei im Gewerbegebiet gefunden und sagt, das Brot ist in Ordnung und es ist nicht dasselbe. Seitdem schreibt sie dir jeden Sonntag.',
};
