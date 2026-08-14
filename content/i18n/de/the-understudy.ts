import type { CaseTranslation } from '../caseText';

/**
 * Case 2 — "Die Zweitbesetzung". German.
 *
 * Four things this had to get right, in this order.
 *
 * 1. The key. The case is a locked room resting on one object, so the object has
 *    exactly one name: `Garderobenschlüssel`, with `der rote Anhänger` on it.
 *    Both chips say `Garderobenschlüssel`, `x-key` says it, Beatrice is pressed
 *    with it. Where the English shortens to "the key" mid-sentence the German
 *    shortens to `der Schlüssel` the same way — that is a short form of one
 *    name, not a second name. A second name would be a second key, and the
 *    locked room would have a way out of it.
 *
 * 2. Times. The interval is 20:05–20:40 and nearly every time in the prose is
 *    written as words, because the English writes them as words. German cannot
 *    leave the hour implicit the way English does, so "ten past" becomes `zehn
 *    nach acht` — the same minute, said in full. Only three things stay digits,
 *    and all three are load-bearing: the 20:12 train, the 20:51 it actually
 *    arrived on (together those are the whole of Dev being innocent), and J14,
 *    the seat Beatrice puts herself in.
 *
 * 3. Names. Diane, Beatrice, Dev, Nell, Joel Petrie, Sheffield and the Alhambra
 *    keep theirs. The descriptive places are translated, bare and article-less
 *    so they survive German case declension — a chip reading `der
 *    Garderobengang` beside a message reading `im Garderobengang` is two
 *    spellings of one place, and matching chip to sentence is the whole move:
 *
 *      theatre → Alhambra          corridor  → Garderobengang
 *      stage   → Bühne             dressing1 → Dianes Garderobe
 *      auditorium → Zuschauerraum  stagedoor → Bühneneingang
 *      station → Bahnhof           key1      → Garderobenschlüssel
 *
 *    `Zuschauerraum` is the auditorium as a whole, and that matters: Beatrice
 *    claims the auditorium and Nell puts her at the back of the circle, and `der
 *    Rang` sits inside `der Zuschauerraum` exactly as the circle sits inside the
 *    auditorium. Calling it `Parkett` would have made those two different places
 *    and invented a contradiction the engine does not hold.
 *
 *    The theatre words are the real German ones, not literal ones: `beginners`
 *    is `auf die Bühne`, the prompt corner is `Inspizientenpult`, the wings are
 *    `Seitenbühne`, the pass door is `Verbindungstür`, press night is
 *    `Premierenabend`, interval notes are `Anmerkungen`, and Dev does not "call
 *    shows" but `gibt Einsätze`, which is what the job is called here.
 *
 * 4. Voice, and this pack needed a different answer from Pack 1.
 *
 *    In The Lighthouse three voices were lowercase and I separated them by
 *    whether they capitalise people and by length. That does not transfer: here
 *    the English gives Diane, Dev and Nell the *same* casing — lowercase
 *    sentence starts with capitalised names and a capital I — and only Beatrice
 *    writes standard prose. German has no capital `ich` to lean on, so the three
 *    would have collapsed into one voice.
 *
 *    So the axis moved to two places at once:
 *
 *      Du     — the only voice that is lowercase *including its nouns*. German
 *               capitalises every noun, so this breaks a rule the other four
 *               keep, and it is unmistakable at a glance. It also matches the
 *               English, where the player types `diane` in lower case while
 *               everyone else types `Diane`; the English wobbles twice (`and
 *               Beatrice`, `Dev says`) and the German does not.
 *      Diane  — lowercase sentence starts, nouns capitalised. Clipped, never
 *               explains herself, lands the quotable line and stops.
 *      Dev    — same casing, separated by *vocabulary*: he is the Inspizient and
 *               types like one. `Einsätze`, `Inspizientenpult`, `Seitenbühne`,
 *               `Bühneneingang`, `Verspätung`, and a time to the minute.
 *      Nell   — same casing, separated by *hedging*: `halt`, `irgendwie`,
 *               `sorry`, `ich weiß nicht`, and sentences that keep going because
 *               she is afraid to end one.
 *      Beatrice — the only one in standard orthography. Long periodic sentences
 *               that hold their subordinate clause to the end, and the knife
 *               inside the good manners. She is a director dictating a letter.
 *
 * `du` throughout, never `Sie`, including in the confrontation — a touring
 * company is not a place where anybody uses `Sie`. The player's gender is never
 * stated and nothing here states it.
 *
 * No arc content: Pack 2 is deliberately standalone. No Keeper, no coda.
 */
export const theUnderstudyDe: CaseTranslation = {
  title: 'Die Zweitbesetzung',
  blurb:
    'Eine Hauptdarstellerin stirbt am Premierenabend in einer abgeschlossenen Garderobe. Es gibt einen einzigen Schlüssel, und zwei Leute sagen, sie hätten ihn gehabt.',

  characters: {
    you: 'Du',
    coral: 'Diane',
    bea: 'Beatrice',
    dev: 'Dev',
    nell: 'Nell',
  },

  places: {
    theatre: 'Alhambra',
    stage: 'Bühne',
    auditorium: 'Zuschauerraum',
    corridor: 'Garderobengang',
    dressing1: 'Dianes Garderobe',
    stagedoor: 'Bühneneingang',
    station: 'Bahnhof',
  },

  objects: {
    key1: 'Garderobenschlüssel',
  },

  threads: {
    't-coral': 'Diane',
    't-company': 'Ensemble Alhambra',
    't-dev': 'Dev',
    't-nell': 'Nell',
    't-bea': 'Beatrice Kyd',
  },

  briefing: {
    causeOfDeath: 'Eine Überdosis ihres eigenen Medikaments.',
    ruling: 'Als selbst herbeigeführt verzeichnet. Die Tür war von innen abgeschlossen.',
    opening:
      'Diane Vane hat die Tournee seit Sheffield getragen, und alle haben das auch gesagt, meistens während sie im Raum stand.\n\nAm Premierenabend ging sie in der Pause von der Bühne, ging in ihre Garderobe und kam nicht wieder. Die Tür war abgeschlossen. Das Ensemble spielte ohne sie weiter, und die Zweitbesetzung bekam die Ansage, auf die sie elf Monate gewartet hatte.',
  },

  messages: {
    // ---------------------------------------------------------------- t-coral
    cl1: 'premiere. siebzehn von denen heute Abend und zwei, die zählen',
    cl2: 'du hast das schon hundertmal gemacht',
    cl3: 'nicht mit Bea im Haus. sie sitzt diese Woche jeden Abend im Zuschauerraum mit einem Notizbuch und schreibt nichts hinein',
    cl4: 'sie will, dass ich aufhöre zu fragen. ich höre nicht auf zu fragen',
    cl5: 'diane wie viel hast du ihr abgenommen',
    cl6: 'sag es nicht so. sie ist gefahren. zwei von uns wussten es, und eine von uns tut seit elf Jahren so, als wüsste sie es nicht',
    cl7: 'elftausend dieses Jahr. sie hat es angeboten, ich habe nicht gefragt. und sie kann es sich leisten und Joel Petrie kann nicht laufen',
    cl8: 'das ist trotzdem etwas, das du ihr antust',
    cl9: 'ich weiß, was es ist. nach heute Abend ist es so oder so vorbei. auf die Bühne. reden wir später',
    cl10: 'diane',

    // -------------------------------------------------------------- t-company
    q1: 'Ensemble. Diane ist gestern Abend in ihrer Garderobe gestorben. Die Polizei war da und ist wieder weg, und sie ist zufrieden damit, dass es ihr eigenes Medikament war.',
    q2: 'Wir spielen heute Abend. Sie hätte darauf bestanden, und ich werde nicht so tun, als wäre es anders. Nell übernimmt.',
    q3: 'ich will es nicht so',
    q4: 'Niemand will es so. Du stehst um halb acht auf der Bühne.',
    q5: 'die Tür war abgeschlossen. ich will das laut sagen, weil es in dem Raum niemand laut gesagt hat',
    q6: 'es gibt einen Schlüssel. einen. der Ersatzschlüssel ist in Sheffield verschwunden und wir haben nie einen neuen machen lassen, weil das vierzig Pfund gekostet hätte und Bea nein gesagt hat',
    q7: 'und er hing die ganze Pause an meinem Gürtel, am Inspizientenpult, wo er hingehört',
    q8: 'Dev. Nicht hier.',
    q9: 'Und du warst nicht die ganze Zeit im Haus, also sei bitte vorsichtig damit, wie sicher du klingst.',
    q10: 'das ist nicht fair und das weißt du auch',
    q11: 'sie hat mir um sieben geschrieben. sie hat gesagt nach heute abend ist es so oder so vorbei',
    q12: 'Sie hat sehr vielen Leuten sehr vieles gesagt. Das war, um ehrlich zu sein, die Schwierigkeit mit ihr.',
    q13: 'sie war nett zu mir. sie war die Einzige',
    q14: 'frag Nell, wo sie um zehn nach acht stand. sie hat mehr gesehen, als sie hier gesagt hat',

    // ------------------------------------------------------------------ t-dev
    d1: 'sorry wegen da drin. zweiundzwanzig Jahre gebe ich jetzt Einsätze und ich habe noch nie jemanden in einer Pause verloren',
    d2: 'sie hat gesagt du warst nicht im haus',
    d3: 'wollte ich auch sein. unsere Ausstatterin kam mit der 20:12 und ich habe gesagt, ich gehe runter und hole sie, das sind vier Minuten',
    d4: 'die 20:12 hatte vierzig Minuten Verspätung. sie kam um 20:51 an. ich bin nicht vom Bühneneingang weg, ich stand darin und habe geraucht und die Anzeige auf dem Handy verfolgt',
    d5: 'Nell ist zweimal an mir vorbei. sie wird es dir sagen. sie stand um fünf nach acht im Garderobengang und hat darauf gewartet, dass man ihr sagt, sie wird nicht gebraucht, wie jeden Abend',
    d6: 'und beatrice',
    d7: 'Bea kam gegen zwölf nach acht den Garderobengang runter und ging gegen zwanzig nach acht wieder hoch. ich habe sie vom Eingang aus gesehen. ich habe mir nichts dabei gedacht, sie geht, wohin sie will',
    d8: 'Diane ist um zehn nach acht runter und das war das Letzte von ihr. ich habe den zweiten Teil angesagt und sie kam nicht und ich dachte, sie macht wegen der Kritiken auf Diane',
    d9: 'ich habe die ganze Nacht darüber nachgedacht. wenn ich um zwanzig nach acht runtergegangen wäre, statt da zu stehen wie ein Pfosten',

    // ----------------------------------------------------------------- t-nell
    e1: 'Dev hat gesagt, du willst mit mir reden. alle denken, ich war es. ich würde auch denken, ich war es',
    e2: 'elf Monate lang in das Kleid rein und wieder raus. du kannst es ruhig sagen. es sieht ja auch so aus',
    e3: 'wo warst du in der pause',
    e4: 'garderobengang, fünf nach acht bis zwölf nach acht, vor der Kostümabteilung gestanden und gewartet, dass Dev mir sagt, ich muss nicht rein. dann hoch auf die Seitenbühne für den zweiten Teil, weil ich es von da aus gucke',
    e5: 'und dann stand ich ab zwanzig vor neun vor vierhundert Leuten auf der Bühne',
    e6: 'dev sagt du hast mehr gesehen als du gesagt hast',
    e7: 'Bea kam gegen zehn nach acht an mir vorbei. sie hatte den Schlüssel in der Hand. ich kenne den Schlüssel, er hat den roten Anhänger dran, den Dev drangemacht hat, damit er nicht dauernd verschwindet',
    e8: 'ich habe es in der Gruppe nicht gesagt, weil sie mir meine Arbeit gibt. sie gibt mir jede Arbeit, die ich in dieser Stadt je haben werde',
    e8b: 'sie sagt sie hat in der pause anmerkungen gegeben',
    e8c: 'niemand hat eine Anmerkung bekommen. frag irgendeinen von denen. ich gehe hinten durch den Rang hoch zur Seitenbühne, weil sie in der Pause die Verbindungstür abschließen, und sie stand oben am Gang mit dem Handy, mit dem Rücken zum Saal, die ganze Zeit, während ich vorbeiging',
    e9: 'jetzt sagst du es',
    e10: 'weil ich gestern Abend in ihrem Kleid rausgegangen bin und es hat gepasst, und mir ist seitdem schlecht davon. sie war nett zu mir und sie war furchtbar zu Bea. ich weiß nicht, was ich damit machen soll',

    // ------------------------------------------------------------------ t-bea
    b1: 'Du warst fleißig. Zwei aus meinem Ensemble sehen mir nicht mehr in die Augen, und ich halte das nicht für einen Zufall.',
    b2: 'Ich war von fünf nach acht bis zum Beginn des zweiten Teils im Zuschauerraum. Ich sitze in J14, an jedem Abend jeder Spielzeit, und vierzig Leute könnten dir meinen Hinterkopf beschreiben.',
    b3: 'Und ich habe gearbeitet. An einem Premierenabend gebe ich in der Pause Anmerkungen, immer, weil das die einzigen zwanzig Minuten sind, in denen jemand zuhört.',
    b4: 'sie hat dir geld abgenommen',
    b5: 'Hat sie. Elftausend dieses Jahr, neunzehntausend im Jahr davor. Ich habe alles bezahlt und ich hätte weiter bezahlt. Die Alternative war, dass Joel Petrie in einer Zeitung über mich liest.',
    b6: 'Ich bin gefahren. Das ist alles. Vor elf Jahren, auf einer nassen Straße außerhalb von Sheffield, mit dem Wagen des Ensembles und zwei Leuten darin, und einer von ihnen steht seitdem nicht mehr auf.',
    b7: 'Ich habe kein einziges Mal gesagt, dass ich es nicht war. Ich habe gesagt, es lag an der Straße. Diane saß auf dem Beifahrersitz und sie wusste, dass es nicht an der Straße lag.',
    b8: 'und sie hat letzte woche gesagt es ist so oder so vorbei',
    b9: 'Ja. Vorbei in dem Sinne, dass sie es sagen wollte. An einem Premierenabend. Mit siebzehn von denen im Haus.',
    b10: 'Nichts davon bringt mich in diesen Gang. Sei vorsichtig mit dem, was du zu haben glaubst.',
  },

  /**
   * Digits here are digits in both languages and stay identical to the English,
   * because these are the twelve lines the player lays side by side on the
   * board. The two that break the locked room are the two Schlüssel chips.
   */
  claims: {
    'c-coral-stage': 'Diane: auf der Bühne, 19:00–20:05',
    'c-key-dev': 'Dev: hatte den Garderobenschlüssel, 19:50–20:40',
    'c-dev-station': 'Dev: am Bahnhof, 20:05–20:35 (laut Beatrice)',
    'c-dev-stagedoor': 'Dev: am Bühneneingang, 19:50–20:40',
    'c-bea-corridor': 'Beatrice: im Garderobengang, 20:12–20:22 (laut Dev)',
    'c-coral-dressing': 'Diane: in ihrer Garderobe, 20:10–20:40',
    'c-nell-corridor': 'Nell: im Garderobengang, 20:05–20:12',
    'c-nell-stage': 'Nell: auf der Bühne, 20:40–22:00',
    'c-key-bea': 'Beatrice: hatte den Garderobenschlüssel, 20:10–20:20 (laut Nell)',
    'c-bea-call': 'Beatrice: allein am Telefon, 20:10–20:20 (laut Nell)',
    'c-bea-auditorium': 'Beatrice: im Zuschauerraum, 20:05–20:45',
    'c-bea-notes': 'Beatrice: gibt Anmerkungen in der Pause, 20:05–20:25',
  },

  motives: {
    'm-sheffield':
      'Diane hatte ihr zwei Jahre lang Geld wegen des Unfalls in Sheffield abgenommen und hatte beschlossen, es am Premierenabend laut auszusprechen.',
  },

  contradictions: {
    'x-key':
      'Es gibt einen Garderobenschlüssel, und seit Sheffield gibt es nur diesen einen. Dev sagt, er hing an seinem Gürtel am Inspizientenpult; Nell hat gesehen, wie Beatrice ihn am roten Anhänger den Garderobengang hinuntertrug. Beides kann nicht wahr sein, und nur eines von beiden schließt eine Tür von außen ab und lässt sie aussehen, als wäre sie von innen abgeschlossen.',
    'x-bea-corridor':
      'Sie hat sich für die ganze Pause in J14 gesetzt, wo vierzig Leute ihren Hinterkopf kennen. Dev hat gesehen, wie sie um zwölf nach acht den Garderobengang herunterkam und um zwanzig nach acht wieder hinaufging, von einem Bühneneingang aus, den er nie verlassen hat.',
    'x-bea-notes':
      'Anmerkungen in der Pause an einem Premierenabend, hat sie gesagt, weil das die einzigen zwanzig Minuten sind, in denen jemand zuhört. In dieser Nacht hat niemand im Ensemble eine Anmerkung bekommen. Sie stand die ganze Zeit allein im Dunkeln hinten im Rang am Telefon.',
    'x-dev-train':
      'Die 20:12 hatte vierzig Minuten Verspätung und kam erst um 20:51 an, also gab es für Dev keinen Zug abzuholen, und er hat den Bühneneingang nie verlassen. Er war der Einzige im Haus, der diesen Garderobengang die ganze Pause über sehen konnte, und Beatrice war diejenige, die ihn da wegzubekommen versuchte.',
  },

  confrontation: {
    opening:
      'Setz dich. Ich habe einundvierzig Inszenierungen gemacht und bin kein einziges Mal zu spät zu einem schwierigen Gespräch gekommen, also sag es richtig.',
    beats: {
      'u-key': {
        press:
          'Es gibt einen Schlüssel. Dev hatte ihn die ganze Pause am Gürtel, und Nell hat gesehen, wie du ihn am roten Anhänger den Gang hinuntergetragen hast.',
        rebuttal:
          'Nell hätte gern meine Stelle und will sie seit März. Setz eine Neunzehnjährige vor einen Polizisten, und sie erinnert sich an alles, was sie aus dem Zimmer bringt.',
      },
      'u-corridor': {
        press:
          'Du hast dich für die ganze Pause in J14 gesetzt. Dev hat gesehen, wie du um zwölf nach acht diesen Gang herunterkamst und um zwanzig nach acht wieder hinaufgingst.',
        rebuttal:
          'Dev gibt seit zweiundzwanzig Jahren Einsätze, bei vier Stunden Schlaf pro Nacht. Er ist ein wunderbarer Mensch, und er könnte dir nicht sagen, was er zu Mittag gegessen hat.',
      },
      'u-notes': {
        press:
          'Du hast gesagt, du gibst Anmerkungen in der Pause. Nicht eine einzige Person in diesem Ensemble hat eine Anmerkung bekommen. Du warst hinten im Rang am Telefon, allein, im Dunkeln.',
        rebuttal: 'Und eine Frau darf wohl telefonieren.',
      },
      'u-why': {
        press:
          'Neunzehntausend in dem einen Jahr und elftausend im nächsten, für elf Jahre, in denen es die Straße war und nicht du. Und sie hatte beschlossen, es am Premierenabend zu sagen.',
      },
    },
    deflections: [
      'Das ist kein Beweis, das ist eine Stimmung.',
      'Du bist seit vier Tagen in diesem Haus. Ich bin seit März darin.',
      'Versuch es noch einmal, und diesmal mit etwas, das ich vor Gericht nicht auseinandernehmen könnte.',
    ],
    confession:
      'Sie kam in der Pause von der Bühne und sie leuchtete regelrecht. Nicht grausam. Das ist es, was die Leute an ihr nicht verstehen werden. Sie war nicht grausam, sie war *frei*, endlich, nach elf Jahren, in denen sie es für mich getragen hat.\n\nSie sagte, sie habe den beiden Kritikern gesagt, sie werde ihnen etwas Besseres geben als das Stück. Sie sagte es so, wie man jemandem eine gute Nachricht sagt.\n\nIch hatte den Schlüssel in der Hand, weil ich hinuntergegangen war, um sie darum zu bitten, es nicht zu tun. Nur deswegen bin ich hinuntergegangen. Ich möchte, dass das irgendwo aufgeschrieben wird.\n\nSie hat mich ausgelacht, und ich bin von Besseren ausgelacht worden, und dann drehte sie sich zu ihrem Spiegel und fing an, ihr Gesicht abzunehmen, und sie sagte, stell dich mir nicht ins Licht.\n\nUnd ich habe ihr die Tabletten hingestellt und mich auf den anderen Stuhl gesetzt und kein einziges Wort gesagt, um sie aufzuhalten. Das ist, was ich getan habe. Ich habe sie nicht gezwungen, sie zu nehmen. Ich habe nur das eine nicht gesagt, das sie aufgehalten hätte, und ich weiß genau, wie lange ich es nicht gesagt habe.',
  },

  epilogue:
    'Das zweite Glas fanden sie im Waschbecken, abgespült, und den roten Anhänger am Schlüssel noch warm in ihrer Manteltasche, als die Polizei sie endlich bat, sie auszuleeren.\n\nNell spielte die Spielzeit zu Ende und danach die Übernahme, und sie war sehr gut darin, und sie hat kein einziges Mal mit einem Journalisten über all das gesprochen.\n\nJoel Petrie bekam im Frühjahr einen Brief von einem Anwalt. Er wusste seit elf Jahren von der Straße. Er sagte, das Einzige, was er je gewollt habe, sei gewesen, dass es jemand laut ausspricht, ohne dass er darum bitten muss.',
};
