import type { CaseTranslation } from '../caseText';

/**
 * Case 7 — "Die Schutzhütte". German.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The lie is order, not time, and German has to keep it that way. Nobody in
 *    that building knows what time anything happened — there is no clock, no
 *    signal and no light but head torches. They know what happened *before*
 *    what. So the prose runs on sequence words (`zuerst`, `als Zweite`,
 *    `zuletzt`, `schon hinten durch`) and the few clock times that exist are
 *    ones a person guessed at. Anne says it outright at m2: `du weißt nicht, wie
 *    spät es ist, du weißt, was bis jetzt passiert ist.`
 *
 * 2. The book is the proof, so the signing has one set of words everywhere:
 *    `sich ins Buch eintragen`, `eingetragen`, `zwei K. Lamonts, einer unter dem
 *    anderen`. Iain signs at the door, Hamish had read the same page an hour and
 *    a half earlier, and the page is what convicts him. Varying the verb would
 *    make those two chips describe two different habits.
 *
 * 3. Names. Struan Baillie, Iain Lamont, Anne, Sandra, Hamish Dunnet, Nkemelu,
 *    Corrie Fhithich, the Munros and Raven’s Line all keep theirs. Places
 *    translated and bare, so a contracted preposition cannot eat them — `im
 *    Hauptraum` still contains `Hauptraum`, where a name written `der Hauptraum`
 *    would disappear into the `im`:
 *
 *      bothy    → Schutzhütte     porch → Vorraum
 *      mainroom → Hauptraum       hill  → Berg
 *      backroom → Hinterraum
 *
 *    `Schutzhütte` rather than keeping `Bothy`: German has its own word for an
 *    unlocked mountain refuge and it declines cleanly, and the Scottish weather
 *    of the thing is carried by Corrie Fhithich, the glen and the Munros without
 *    needing the loanword to do it.
 *
 * 4. Voice. Six people in three pairs, each pair sharing a casing signature, so
 *    every pair needed a second axis:
 *
 *      Hamish  — capitals and full stops. Maintenance officer since 1998, and he
 *      Sandra    counts: four times a year, twenty seven years, five names, the
 *                fifth already dry. Sandra shares his punctuation exactly and is
 *                separated by what she does with it — she argues. Every message
 *                of hers pushes back on being reduced to the woman who cleans.
 *      Struan  — capitals, never a full stop at the end. Struan is warm and
 *      Iain      self-lacerating and uses `!!`; Iain is clipped and spends his
 *                three messages moving suspicion onto somebody else. One offers,
 *                the other accuses.
 *      Anne    — lowercase sentence starts, nouns capitalised, no full stop. She
 *      Du        capitalises people at the start of a sentence (`Struan zuerst`,
 *                `Sandra war die ganze Stunde`). The player lowercases them
 *                (`iain`, `hinterraum`) and is short. That is the same axis that
 *                separated these two voices in Packs 1, 2 and 5, and the only
 *                one that survives German noun capitalisation.
 *
 * 5. Two things in the source are reproduced rather than corrected, and both are
 *    flagged rather than fixed here.
 *
 *    The epilogue calls Sandra `Priscilla Nkemelu`. That is the rename leak
 *    `renameLeak.test.ts` exists for, but the rule cannot see this one: it
 *    matches `\bPris\b`, and `Priscilla` runs on past the boundary, so the id is
 *    a diminutive of the old name rather than the whole of it.
 *
 *    The book is signed `K. Lamont`, three times, by a man the case calls Iain
 *    Lamont — who would sign `I. Lamont`. `keir` is this character-s id and
 *    almost certainly the old first name. It matters more than the epilogue one,
 *    because `zwei K. Lamonts, einer unter dem anderen` is the crux of
 *    `x-keir-book`, and a German player is being asked to convict a man on an
 *    initial that is not his.
 */
export const theBothyDe: CaseTranslation = {
  title: 'Die Schutzhütte',
  blurb:
    'Fünf Menschen kamen Stunden voneinander getrennt aus einem Whiteout in einen einzigen Raum. Sie sind sich über alles einig, außer über die Reihenfolge.',

  characters: {
    you: 'Du',
    struan: 'Struan',
    keir: 'Iain',
    morven: 'Anne',
    pris: 'Sandra',
    hamish: 'Hamish',
  },

  places: {
    bothy: 'Schutzhütte',
    mainroom: 'Hauptraum',
    backroom: 'Hinterraum',
    porch: 'Vorraum',
    hill: 'Berg',
  },

  threads: {
    't-struan': 'Struan',
    't-group': 'Corrie Fhithich',
    't-morven': 'Anne',
    't-pris': 'Sandra',
    't-hamish': 'Hamish Dunnet',
  },

  briefing: {
    causeOfDeath:
      'Ein Schädelbruch. Im Hinterraum steht ein Kamin aus Stein, und er hatte getrunken.',
    ruling:
      'Als Sturz verzeichnet. Bis Sonntag kam niemand mit einem Fahrzeug das Tal hinauf, und bis dahin waren elf Menschen durch diesen Raum gelaufen.',
    opening:
      'Die Schutzhütte Corrie Fhithich hat zwei Räume, einen Kamin aus Stein, keinen Strom und keinen Empfang. Neben der Tür liegt ein Buch, in das man sich einträgt, weil die Regeln es so vorsehen.\n\nStruan Baillie wurde am Samstagmorgen im Hinterraum gefunden. Fünf andere waren in der Nacht davor aus dem Whiteout hereingekommen, einer nach dem anderen, Stunden voneinander getrennt, und keiner von ihnen besitzt eine Uhr, die mit der von irgendwem sonst übereinstimmt.\n\nDu hast das Wochenende organisiert. Du hast dir im November den Knöchel gebrochen und bist zu Hause geblieben.',
  },

  messages: {
    // --------------------------------------------------------------- t-struan
    s1: 'Das Buch ist in der Druckerei!! Raven’s Line, gebunden, Februar. Zweiundzwanzig Jahre lang irgendwo hochklettern und eines davon zahlt eine Hypothek',
    s2: 'glückwunsch. ernsthaft',
    s3: 'Iain kommt dieses Wochenende. Zum ersten Mal seit ungefähr vier Jahren hat er zu etwas ja gesagt, das ich organisiert habe',
    s4: 'ist zwischen euch alles ok?',
    s5: 'Es gibt ein Gespräch, das wir nie geführt haben, und ich habe beschlossen, es in der Schutzhütte zu führen, mit einem Drink intus, so hat jede schlechte Idee angefangen, die ich je hatte',
    s6: 'wegen der linie',
    s7: 'Er ist sie 2016 solo gegangen und hat es einer Person erzählt, und diese eine Person war ich, und ich habe 2018 meinen Namen daraufgesetzt und zehre seitdem davon',
    s8: 'Ich habe ihn in die Danksagung geschrieben. Das reicht nicht und ich weiß, dass es nicht reicht. Ich werde ihm das Ganze anbieten, vor den anderen, und ihn entscheiden lassen, was damit passiert',
    s9: 'das beendet dein buch',
    s10: 'Ja. Nun',
    s11: 'Als Erster da, Feuer an, draußen absolut waagerechter Schnee. Anne ist da. Sonst noch niemand, und für alle, die noch auf dem Weg sind, wird das eine lange Nacht',

    // ---------------------------------------------------------------- t-group
    p1: 'endlich Empfang. ich weiß nicht, wie man das schreibt, also schreibe ich es schlecht. Struan ist Freitagnacht in der Schutzhütte gestorben. wir haben ihn Samstagmorgen im Hinterraum gefunden',
    p2: 'Die Polizei war am Sonntag oben, als die Straße wieder frei war. Sie haben das Buch mitgenommen und Aussagen aufgenommen und waren zufrieden damit, dass es ein Sturz gegen den Kamin war.',
    p3: 'Ich kam als Letzter an. Zwanzig vor zehn, halb tot, habe mich an der Tür ins Buch eingetragen, weil Hamish einen dazu zwingt. Struan war da schon hinten durch und ich habe ihn nie gesehen',
    p4: 'Ich war ab ungefähr zwanzig vor sieben auf diesem Weg. Drei Stunden für vier Meilen. So war diese Nacht',
    p5: 'ich war ab sechs in diesem Hauptraum, bis wir alle gegen elf aufgegeben haben. ich habe mich nicht bewegt, ich hatte den Ofen am Laufen und diesen Platz habe ich für niemanden geräumt',
    p6: 'Und die Frau, die sein Haus putzt, ist den ganzen Abend in diesen Hinterraum rein und raus, was noch niemand einem Polizisten gegenüber erwähnt hat',
    p7: 'Frau Nkemelu ist mit mir hereingekommen, und sie ist Mitglied dieses Vereins und sie ist länger auf diesem Berg unterwegs als du, Iain.',
    p8: 'können wir das bitte nicht hier drin machen',

    // --------------------------------------------------------------- t-morven
    m1: 'du hast es organisiert und warst nicht da, und ich denke immer wieder daran, wie das für dich sein muss, also erzähle ich dir alles, woran ich mich wirklich erinnere, und nicht alles, was ich um acht Uhr morgens einem Polizisten gesagt habe',
    m2: 'die Sache mit einer Schutzhütte ist, dass es keine Uhr gibt. es gibt kein Licht außer Stirnlampen und einem Ofen. du weißt nicht, wie spät es ist, du weißt, was bis jetzt passiert ist',
    m3: 'Struan zuerst, ich als Zweite gegen sechs. Hamish und Sandra zusammen, und Iain zuletzt, kam rein, hat den Schnee abgestampft und geflucht, und alle haben ein Aufheben um ihn gemacht, weil er fertig aussah',
    m4: 'war das das erste mal dass du iain in der nacht gesehen hast',
    m5: 'nein. und ich sitze seit elf Tagen darauf',
    m6: 'gegen zehn vor sieben kam jemand in den Hauptraum, keine Lampe an, hat nichts gesagt, ist direkt nach hinten durch. ich bin davon ausgegangen, dass es Struan ist, der vom Torfschuppen zurückkommt. es war nicht Struan, weil Struan schon hinten durch war',
    m7: 'es war die Jacke. blau, oranger Schulterbesatz, diese alte Berghaus, die er seit Jahren hat. ich habe mir bis drei Tage später keinen einzigen Gedanken darüber gemacht',
    m8: 'warum hast du nichts gesagt',
    m9: 'weil ich um acht Uhr morgens, mit ihm tot im Nebenraum, gesagt habe, was alle gesagt haben, nämlich dass Iain als Letzter um zwanzig vor zehn hereingekommen ist. und das ist er. das ist das ganze Problem. er ist um zwanzig vor zehn hereingekommen',
    m10: 'Sandra war die ganze Stunde im Vorraum und hat einen Rucksack sortiert. red mit ihr. sie versucht seit Sonntag, dass ihr jemand zuhört, und alle haben entschieden, dass sie die Putzfrau ist',

    // ----------------------------------------------------------------- t-pris
    r1: 'Neun Jahre habe ich das Haus dieses Mannes gemacht. Neun Jahre seine Post und seine Mülltonnen und sein Bad, also ja, ich weiß Dinge über ihn. Das ist kein Motiv, das ist ein Dienstag.',
    r2: 'Ich gehe auch auf die Berge. Ich habe die Munros zweimal gemacht, das zweite Mal im Winter, und ich bin im selben Verein wie Hamish Dunnet, und ich hätte gern, dass eine einzige Person hier beide Tatsachen gleichzeitig im Kopf behält.',
    r3: 'iain hat dich in den hinterraum gesetzt',
    r4: 'Hat er. Ich war von sieben bis acht im Vorraum, mit meinem Rucksack quer über den ganzen Boden ausgebreitet, und Anne hat mir dabei zugesehen, und Hamish ist zweimal über mich gestiegen.',
    r5: 'Und ich sage dir das, was ich weiß, da Dinge über ihn zu wissen offenbar das ist, wofür ich da bin.',
    r6: 'Auf diesem Küchentisch lagen einen Monat lang zwei Briefe von einem Verlag, und ich habe einen Monat lang um sie herum Staub gewischt. Auf die Rückseite von einem hatte er mit Bleistift einen Absatz geschrieben. Da stand: Sag ihnen die Wahrheit über den Raven und lass sie es absagen.',
    r7: 'So etwas schreibt ein Mann nicht auf die Rückseite eines Verlagsbriefs, wenn er sich nicht entschieden hat. Er hatte sich entschieden. Er ist da hochgefahren, um es herzugeben.',

    // --------------------------------------------------------------- t-hamish
    h1: 'Ich bin seit 1998 für die Instandhaltung dieser Schutzhütte zuständig und ich fahre seit siebenundzwanzig Jahren viermal im Jahr hinauf, und ich musste kein einziges Mal über das Buch als Nachweis von irgendetwas nachdenken.',
    h2: 'Ich sehe es durch, wenn ich ankomme. Das ist keine Vorschrift, das ist Gewohnheit, und ich habe es um acht Uhr mit der Stirnlampe zwischen den Zähnen gemacht wie jedes andere Mal.',
    h3: 'Um acht Uhr standen fünf Namen darin. Struan, Anne, ich selbst, Frau Nkemelu und K. Lamont. Seiner war der letzte der fünf und er war schon trocken.',
    h4: 'Um zwanzig vor zehn kam er durch diese Tür herein und hat sich noch einmal eingetragen, in die nächste Zeile, vor vier Leuten. Zwei K. Lamonts, einer unter dem anderen. Die Polizei hat das Buch mitgenommen und ich glaube nicht, dass irgendjemand diese Seite umgeblättert hat.',
    h5: 'der hinterraum',
    h6: 'Ich bin gegen viertel nach sieben nach hinten durch, wegen der Ersatzkartusche, die im Regal über dem Kamin liegt. Struan saß auf dem Boden mit dem Rücken an der Wand, und ein Mann hockte vor ihm.',
    h7: 'Ich habe gesagt, Entschuldigung, Gas, und habe das Gas genommen und bin wieder raus. Struan hatte getrunken, und ich habe diesen Mann bei vier verschiedenen Gelegenheiten auf dem Boden einer Schutzhütte gesehen und mir bei keiner davon etwas gedacht.',
    h8: 'du hast nicht gesehen wer es war',
    h9: 'Ein Rücken und eine blaue Jacke und eine Stirnlampe, die aus war. Ich bin achtundsechzig und es war ein Steinraum, beleuchtet von einer Türöffnung. Aber es waren fünf Menschen in diesem Gebäude, und für drei davon kann ich diese Minute belegen, und Struan war der vierte.',
    h10: 'Das Eintragen ist der Teil, über den ich nicht hinwegkomme. Ein Mann, der durchgefroren und fertig ist und gerade vier Meilen gelaufen ist, denkt nicht an das Buch. Ein Mann, der will, dass man sich an sein Ankommen erinnert, schon.',
    h11: 'Struan hat mir im Sommer gesagt, dass er Iain Lamont etwas genommen hatte, das ihm nicht zustand, und dass er es zurückgeben wollte, und dass er Angst davor hatte. Ich dachte, er meint eine Schuld.',
  },

  /**
   * `c-keir-book-late` states the minute Iain claims he arrived, which is what
   * the English chip states; the window behind it is the whole evening the
   * engine will tolerate. The two book chips are the pair that convicts him.
   */
  claims: {
    'c-struan-mainroom': 'Struan: im Hauptraum, 17:00–18:00',
    'c-keir-book-late': 'Iain: hat sich bei der Ankunft um 21:40 ins Buch eingetragen',
    'c-keir-hill': 'Iain: auf dem Bergweg, 18:40–21:40',
    'c-morven-mainroom': 'Anne: im Hauptraum, 18:00–22:00',
    'c-pris-backroom': 'Sandra: im Hinterraum, 19:10–19:40 (laut Iain)',
    'c-keir-mainroom': 'Iain: im Hauptraum, 18:50–19:10 (laut Anne)',
    'c-pris-porch': 'Sandra: im Vorraum, 19:00–20:00 (laut Anne)',
    'c-keir-book-early': 'Iain: hatte sich um 20:00 schon eingetragen (laut Hamish)',
    'c-keir-backroom': 'Iain: im Hinterraum, 19:15–19:30 (laut Hamish)',
  },

  motives: {
    'm-raven':
      'Iain ist die Raven’s Line 2016 solo gegangen und hat es einer Person erzählt. Struan hat sie 2018 für sich beansprucht und darauf sieben Jahre und ein Buch aufgebaut und hatte beschlossen, sie an diesem Wochenende vor Zeugen zurückzugeben.',
  },

  contradictions: {
    'x-keir-mainroom':
      'Er hat sich selbst von zwanzig vor sieben bis zwanzig vor zehn auf den Weg gestellt. Gegen zehn vor sieben ging jemand mit ausgeschalteter Lampe durch den Hauptraum und sagte nichts, und Anne ist davon ausgegangen, dass es Struan ist, der vom Torfschuppen zurückkommt. Struan war schon hinten durch. Sie kannte die Jacke und hat sich drei Tage lang nichts dabei gedacht.',
    'x-keir-book':
      'Er hat sich um zwanzig vor zehn an der Tür ins Buch eingetragen, vor vier Leuten, weil Hamish einen dazu zwingt. Hamish hatte dieses Buch um acht Uhr schon gelesen, mit der Stirnlampe zwischen den Zähnen, und K. Lamont war der fünfte Name darin und die Tinte war trocken. Auf dieser Seite stehen zwei K. Lamonts, einer unter dem anderen, und niemand hat sie umgeblättert.',
    'x-keir-backroom':
      'Um viertel nach sieben ging Hamish wegen der Ersatzkartusche nach hinten durch, und da hockte ein Mann vor Struan, der mit dem Rücken zur Wand auf dem Boden saß. Eine blaue Jacke und eine Stirnlampe, die ausgeschaltet war. Für drei der fünf Menschen in diesem Gebäude ist diese Minute belegt, und Struan war der vierte.',
    'x-pris-porch':
      'Er hat die Frau, die Struans Haus putzt, den ganzen Abend in den Hinterraum rein und raus gehen lassen. Sie war von sieben bis acht im Vorraum, mit ihrem Rucksack quer über den ganzen Boden, Anne hat ihr dabei zugesehen und Hamish ist zweimal über sie gestiegen. Sie versucht seit Sonntag, dass ihr jemand zuhört, und alle haben entschieden, dass sie die Putzfrau ist.',
  },

  confrontation: {
    opening:
      'Du warst nicht da. Du hast dir den Knöchel gebrochen und zu Hause gesessen und ein paar Textnachrichten gelesen. Also los, erzähl mir von dieser Nacht.',
    beats: {
      'b-mainroom': {
        press:
          'Du hattest dich selbst drei Stunden lang auf den Weg gestellt. Um zehn vor sieben ging jemand mit ausgeschalteter Lampe durch diesen Hauptraum und nach hinten durch, und Anne kannte die Jacke.',
        rebuttal:
          'Ein dunkler Raum und eine blaue Jacke. Die halbe Bergwelt trägt diese Jacke. Sie hatte elf Tage und eine Menge Leute, die ihr sagen, dass es wichtig ist.',
      },
      'b-book': {
        press:
          'Du hast dich um zwanzig vor zehn an der Tür ins Buch eingetragen, vor vier Leuten. Hamish hat dieses Buch um acht gelesen, und dein Name stand schon als fünfter darin, und er war trocken. Auf dieser Seite stehen zwei K. Lamonts.',
        rebuttal:
          'Dann hat jemand meinen Namen in ein Buch geschrieben. Einen Namen in ein Buch schreiben kann jeder.',
      },
      'b-backroom': {
        press:
          'Um viertel nach sieben kam Hamish wegen des Gases nach hinten durch. Struan saß mit dem Rücken zur Wand auf dem Boden und ein Mann hockte mit ausgeschalteter Lampe vor ihm. Für drei der fünf ist die Minute belegt und Struan ist der vierte.',
      },
      'b-why': {
        press:
          'Du bist die Raven’s Line 2016 solo gegangen und hast es einer Person erzählt. Er hat 2018 seinen Namen daraufgesetzt und wollte sie dir an diesem Wochenende zurückgeben, vor allen, und sein eigenes Buch damit beenden.',
      },
    },
    deflections: [
      'Das ist ein Raum ohne Licht darin und fünf Menschen, die alle stundenlang gelaufen waren.',
      'Du warst nicht auf diesem Berg. Du warst noch nie im Februar auf diesem Berg.',
      'Komm wieder mit etwas, das nicht jemand ist, der sich an eine Jacke erinnert.',
    ],
    confession:
      'Er wollte sie zurückgeben. Das ist der Teil, den niemand wird im Kopf behalten können, also sage ich ihn deutlich.\n\nIch bin früh hoch. Ich bin über die Schulter gekommen und war vor sechs unten, weil ich diesen Weg vierzigmal gegangen bin und er keine drei Stunden dauert, wenn man ihn kennt. Ich wollte eine Stunde mit ihm, bevor die anderen kamen.\n\nUnd er saß auf diesem Boden und hat es gesagt. Er hat gesagt, Iain, sie gehört dir, ich gebe sie am Sonntag vor allen zurück, ich habe es schon ins Buch geschrieben.\n\nUnd ich habe in meinem Leben nie etwas gefühlt wie das, was ich da gefühlt habe, und es war keine Dankbarkeit.\n\nSieben Jahre. Sieben Jahre hinten in Räumen stehen, während er die Geschichte von meiner Nacht erzählt. Sieben Jahre lang jeden einzelnen Morgen entscheiden, es nicht zu sagen. Und er wollte das an einem Sonntagnachmittag rückgängig machen und dabei ein guter Mensch sein, und alle würden sagen, was für eine außergewöhnliche Sache, und dann wäre es wieder seins. Sogar das Zurückgeben wäre seins.\n\nIch hatte nichts dabei. In diesem Raum gibt es einen Kamin und er saß schon auf dem Boden.\n\nDann bin ich zweieinhalb Stunden im Dunkeln wieder da hinausgelaufen, und um zwanzig vor zehn bin ich hereingekommen und habe vier Leute ein Aufheben um mich machen lassen, und ich habe meinen Namen unter meinen eigenen Namen geschrieben.',
  },

  epilogue:
    'Das Buch liegt in einer Asservatenkammer in Aviemore. Auf Seite einundvierzig steht K. Lamont zweimal, vier Zeilen auseinander, in demselben Bleistift.\n\nPriscilla Nkemelu wurde im März ordentlich befragt, vier Monate nachdem sie zum ersten Mal darum gebeten hatte. Sie hat ihnen den Brief mit dem Bleistiftabsatz auf der Rückseite gegeben, den sie in einer Schublade aufbewahrt hatte, weil niemand sie je um irgendetwas gebeten hatte.\n\nRaven’s Line ist im Februar mit der ursprünglichen Zuschreibung erschienen, weil die Auflage schon gebunden war. Die zweite Auflage trägt einen anderen Namen und eine Anmerkung von zwei Absätzen, und Struan Baillie hat beide im Herbst vor seinem Tod selbst geschrieben.\n\nHamish Dunnet fährt immer noch viermal im Jahr hinauf. Er hat aufgehört, das Buch durchzusehen.',
};
