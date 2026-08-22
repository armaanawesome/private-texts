import type { CaseTranslation } from '../caseText';

/**
 * Case 12 — "Die Telefonseelsorge". German. Fourth arc connection.
 *
 * Six things this had to get right, in this order.
 *
 * 1. Register. This is a listening charity on an overnight shift and the pack
 *    is written with care: callers stay off the page and unnamed, there is no
 *    method detail anywhere, and the breach at the centre comes from caring too
 *    much rather than too little. German has to hold that. No word here is
 *    flippant, nobody is described as a case, and the one line that says what
 *    the job is — `man legt am Ende eines Gesprächs auf und erfährt es nie` —
 *    is the sentence the whole motive rests on and is translated plainly.
 *
 * 2. `the Keeper`, three times, English article intact. Twice in the confession
 *    and once in the coda, and this is the pack where he stops being a voice
 *    and becomes a person: Alun recognised the technique while it was being
 *    used on him. `der Keeper` alone is German for a goalkeeper, so the article
 *    rides along as it has in every pack.
 *
 * 3. Alun-s voice is the technique. He is the only one who uses the ellipsis,
 *    and his deflections are not evasions but listening moves — `Mm. Und was
 *    würdest du dir wünschen, wenn das so wäre?` is a trained listener turning
 *    the question round, and it has to read as skill rather than as sarcasm.
 *    That is what makes the confession land: he knew what was being done to him
 *    and let it happen anyway.
 *
 * 4. Digits are years and the two machine records. 2019 on the risk register,
 *    2011 for the numbers, 1990 for the lamp board; and `02:10`–`03:40` in the
 *    duty book, `02:55`–`03:05` on the alarm panel. Everything a person says is
 *    spoken: `zehn nach zwei`, `zwanzig vor vier`, `halb drei`. The overnight
 *    windows run past midnight, so anything reading these chips has to wrap at
 *    1440 — `testkit`-s clock does.
 *
 * 5. Names and places. Constance Bawa, Alun Meredith, Sunniva Halvorsen, Yusuf
 *    Kaya, Prem Chandrasekaran and Beacon keep theirs. Places bare, so no fused
 *    preposition can eat them:
 *
 *      branch   → Zweigstelle      kitchen    → Küche
 *      callroom → Telefonraum      backstairs → Hintertreppe
 *      office   → Büro             sunnyhome  → Sunnys Wohnung
 *
 * 6. Voice. Five of the six write standard prose and close every sentence, so
 *    they are separated by what each is holding:
 *
 *      Connie — the director, and she thinks about the cost to other people
 *               before her own. Every message ends on somebody else.
 *      Prem   — the trustee. Forms, panels, bills, dates. Procedural because he
 *               is frightened, and he says so.
 *      Alun   — the listener, and the ellipsis is his. He reflects, he pauses,
 *               he never states.
 *      Sunny  — blunt. Short declaratives, and the only one who says the actual
 *               thing out loud, which is why nobody listened to her.
 *      Yusuf  — four shifts, and counting them. Self-deprecating and exact.
 *      Du     — lowercase, short.
 */
export const theHelplineDe: CaseTranslation = {
  title: 'Die Telefonseelsorge',
  blurb:
    'Jedes Gespräch wird von Hand ins Buch eingetragen, und niemand hatte je einen Grund, eines davon zu prüfen. Sein Alibi sind neunzig Minuten auf einer Leitung, die nie belegt war.',

  characters: {
    you: 'Du',
    connie: 'Connie',
    alun: 'Alun',
    yusuf: 'Yusuf',
    sunny: 'Sunny',
    prem: 'Prem',
  },

  places: {
    branch: 'Zweigstelle',
    callroom: 'Telefonraum',
    office: 'Büro',
    kitchen: 'Küche',
    backstairs: 'Hintertreppe',
    sunnyhome: 'Sunnys Wohnung',
  },

  threads: {
    't-connie': 'Connie',
    't-branch': 'Beacon Ehrenamtliche',
    't-yusuf': 'Yusuf',
    't-sunny': 'Sunny',
    't-prem': 'Prem Chandrasekaran',
  },

  briefing: {
    causeOfDeath:
      'Eine Kopfverletzung. In dieses Büro führt eine Stufe hinunter, und sie steht seit 2019 im Gefährdungsverzeichnis.',
    ruling:
      'Als Sturz verzeichnet. Zwei Ehrenamtliche hatten Dienst und beide waren an den Telefonen, so steht es im Dienstbuch.',
    opening:
      'Beacon betreibt eine Zuhörleitung in zwei Räumen über einem Teppichladen. Nichts wird aufgezeichnet, nichts ist nachverfolgbar, und jedes Gespräch wird hinterher von Hand aufgeschrieben, von dem, der es angenommen hat, und darauf ruht das ganze Versprechen.\n\nConstance Bawa war elf Jahre lang ehrenamtliche Leiterin. Gefunden wurde sie um sieben Uhr morgens im Büro, als das Tagespaar kam.\n\nDu hast vier Jahre an dieser Leitung gemacht, bevor du weggezogen bist, und sie hat dich ausgebildet.',
  },

  messages: {
    // --------------------------------------------------------------- t-connie
    c1: 'Bist du wach, oder bist du jetzt ein Mensch mit einem normalen Beruf. Ich habe da eine Sache und ich würde sie gern jemandem sagen, der die Ausbildung gemacht hat.',
    c2: 'erzähl',
    c3: 'Eine Anruferin hat letzte Woche die Bürodurchwahl angerufen, um sich zu bedanken. Nicht die Leitung. Die Bürodurchwahl, am Tag, und hat nach einem Ehrenamtlichen mit Vornamen gefragt.',
    c4: 'oh nein',
    c5: 'Sie hatte seine Handynummer. Sie hat sie seit zwei Jahren. Sie dachte, ich würde mich freuen, und konnte nicht verstehen, warum ich still geworden bin.',
    c6: 'Es ist Alun. Zweiundzwanzig Jahre, zwei Nachtschichten die Woche, der beste Zuhörer, den ich je an diese Leitung gesetzt habe, und er gibt den Leuten seit ungefähr 2011 seine Nummer, soweit ich das rekonstruieren kann.',
    c7: 'warum sollte er',
    c8: 'Weil man am Ende eines Gesprächs auflegt und es nie erfährt. Das ist die Arbeit und es ist der schwerste Teil der Arbeit, und jeder, der sie je gemacht hat, hat um vier Uhr morgens in dieser Küche gestanden und es wissen wollen.',
    c9: 'Er wollte es wissen. Also hat er aufgehört aufzulegen.',
    c10: 'du musst damit zum vorstand',
    c11: 'Muss ich, und es wird ihn erledigen, und Prem wird an jeden Anrufer schreiben müssen, den wir identifizieren können, und es gibt Menschen da draußen, die erfahren werden, dass die Person, der sie vertraut haben, es nicht so gemacht hat, wie es ihnen versprochen wurde. Das ist der Teil, der mich wach hält.',
    c12: 'Ich habe die Donnerstagsnacht mit ihm. Ich sage es ihm zuerst ins Gesicht, im Büro, bevor ich irgendetwas aufschreibe.',
    c13: 'Drin. Yusuf hat mit uns Dienst, der arme Kerl, drei Wochen nach seiner Ausbildung. Ich mache es gegen zwei, wenn die Telefone ruhig werden.',

    // --------------------------------------------------------------- t-branch
    b1: 'An alle Ehrenamtlichen. Connie ist in der Nacht auf Freitag in der Zweigstelle gestorben. Das Tagespaar hat sie um sieben im Büro gefunden. Die Leitung ist bis Montag ausgesetzt und der Vorstand trifft sich morgen.',
    b2: 'Niemand spricht mit irgendwem über Angelegenheiten der Zweigstelle. Das ist keine Schikane, das ist die einzige Regel, auf die es hier je angekommen ist.',
    b3: 'Elf Jahre hat sie diese Zweigstelle geführt und sie kannte jeden einzelnen Namen von uns und wusste, wen sie an einem schlechten Sonntag anrufen musste... Ich habe nichts Besseres als das zu sagen.',
    b4: 'Ich war an den Telefonen. Zehn nach zwei bis zwanzig vor vier, ein Gespräch, und es war kein leichtes. Es steht im Buch.',
    b5: 'Die ganze Schicht im Telefonraum, wir beide, Headsets auf. Deswegen hat keiner von uns etwas gehört, und daran sitze ich seit Freitag.',
    b6: 'Ich möchte das jetzt sagen, bevor es jemand für mich sagt: Ich war seit dem Dritten nicht mehr in diesem Gebäude und ich habe meinen Chip Prem selbst übergeben.',
    b7: 'Niemand hat etwas über dich gesagt, Sunny... obwohl ich gegen halb drei jemanden auf der Hintertreppe gehört zu haben glaubte, und ich habe mich schon gewundert.',
    b8: 'Sag es richtig oder sag es gar nicht. Das ist die ganze Ausbildung und du hast zweiundzwanzig Jahre davon.',
    b9: 'Es reicht. Ihr beide. Zu mir, nicht zu vierzig Leuten.',

    // ---------------------------------------------------------------- t-yusuf
    y1: 'Es war meine vierte Schicht. Ich habe vier Schichten gemacht. Ich sage das den Leuten immer wieder, als würde es irgendetwas erklären.',
    y2: 'Ich war von zwei bis vier im Telefonraum. Ich habe die ganze Nacht kein einziges Gespräch angenommen, was einem gesagt wird, dass es vorkommt, und worauf einen niemand vorbereitet.',
    y3: 'war alun in einem gespräch',
    y4: 'An der Wand hängt eine Tafel mit vier Lampen, eine pro Leitung. Wenn eine Leitung belegt ist, leuchtet die Lampe. Sie ist von ungefähr 1990 und sie ist das Einzige in diesem Raum, das einem etwas sagt.',
    y5: 'Zwischen ungefähr halb drei und halb vier hat keine Lampe geleuchtet. Ich weiß es, weil ich eine Stunde lang auf vier unbeleuchtete Lampen geschaut und gedacht habe, das ist es also, wozu ich gekommen bin.',
    y6: 'wo war er',
    y7: 'Er ist gegen halb drei ins Büro rübergegangen. Ich habe ihn gehen sehen und ich habe ihn eine Weile nicht zurückkommen sehen und ich habe mir nichts dabei gedacht, weil er das seit zweiundzwanzig Jahren macht und ich viermal.',
    y8: 'Connie war ab Mitternacht in diesem Büro. Sie macht dort den Dienstplan und die Meldungen und sie hatte die Tür offen, was sie immer tut, damit Leute hereinkommen.',
    y9: 'Red mit Sunny Halvorsen. Alle haben entschieden, dass sie schwierig ist, und sie ist der einzige Mensch in dieser Zweigstelle, der die eigentliche Sache laut ausspricht.',

    // ---------------------------------------------------------------- t-sunny
    s1: 'Ich habe im Januar eine Gefährdungsmeldung gemacht und im März wurde ich gebeten, kürzerzutreten, und diese beiden Tatsachen durften fünf Monate lang nebeneinanderstehen, ohne dass sie jemand zusammengebracht hat.',
    s2: 'Die Meldung ging um einen Ehrenamtlichen, der Kontakt zu einer Anruferin hielt. Ich hatte keinen Namen. Ich hatte ein Muster und ein schlechtes Gefühl und keinen Namen, also ist sie zu Recht im Sande verlaufen.',
    s3: 'wo warst du donnerstag',
    s4: 'In meiner Wohnung, mit meinem Hund, und habe vier Folgen von irgendetwas Dänischem gesehen. Das kann niemand bestätigen und ich werde nicht so tun, als könnte es jemand.',
    s5: 'Was ich beweisen kann, ist, dass ich Prem am dritten März vor zwei Leuten meinen Chip gegeben habe, und dass diese Tür sich ohne einen nicht öffnet, und dass die Anlage jedes einzelne Mal mitschreibt, wenn sie es tut.',
    s6: 'Wenn Alun Meredith also sagt, er habe jemanden auf der Hintertreppe gehört, dann irrt er sich entweder oder er sagt dir, wo er war, und ich hätte sehr gern, dass ihn jemand fragt, was davon.',
    s7: 'Und ich mochte ihn. Das ist das, was ich niemandem begreiflich machen kann. Ich habe mit diesem Mann um vier Uhr morgens in dieser Küche gesessen und er ist der freundlichste Mensch auf diesem Dienstplan.',
    s8: 'Frag Prem nach der Anlage. Er hat sie seit Freitag und er ist im Vorstand und er hat Angst vor dem, was darin steht.',

    // ----------------------------------------------------------------- t-prem
    p1: 'Ich bin seit neun Jahren im Vorstand und meine ganze Aufgabe war es, das Versprechen zu schützen, dass nichts, was auf dieser Leitung gesagt wird, irgendwohin gelangt. Diese Woche habe ich das Gegenteil getan und ich bin mir dessen jede Stunde bewusst.',
    p2: 'Im Dienstbuch steht für Alun am Donnerstag ein Gespräch. 02:10 bis 03:40, neunzig Minuten, in seiner Handschrift eingetragen, mit drei Zeilen Zusammenfassung, und genau so sieht ein langes Gespräch aus.',
    p3: 'Die Telefonrechnung kam am Mittwoch. Sie sagt nicht, wer angerufen hat oder was gesagt wurde, weil sie das nicht kann. Sie sagt, wie viele Minuten jede Leitung getragen hat, und am Donnerstag zwischen zwei und vier haben alle vier Leitungen überhaupt nichts getragen.',
    p4: 'die türanlage',
    p5: 'Die Tür zur Hintertreppe ist zwischen elf und sechs alarmgesichert und jedes Öffnen wird mit einer Chipnummer festgehalten. In der Donnerstagnacht gibt es ein Öffnen. 02:55, der Chip von Alun Meredith, und ein Schließen um 03:05.',
    p6: 'Der Chip von Sunniva Halvorsen wurde am dritten März deaktiviert und hat seitdem nichts mehr geöffnet. Ich habe es selbst gemacht und ich habe das Formular.',
    p7: 'Connie kam am Montag zu mir, wegen Alun und den Nummern. Sie hatte zwei Namen und ein Datum, das bis 2011 zurückgeht, und sie wollte es am Vierzehnten in den Vorstand bringen.',
    p8: 'Sie war nicht wütend auf ihn. Ich möchte, dass das irgendwo von jemandem festgehalten wird. Sie saß da, wo du sitzt, und sie hat gesagt, Prem, er hat es getan, weil er das Nichtwissen nicht ertragen hat, und das ist keine Rechtfertigung und ich werde es trotzdem tun müssen.',
    p9: 'Zweiundzwanzig Jahre. Zwei Nachtschichten die Woche. Rechne das irgendwann in Stunden um, und dann rechne aus, was es kosten würde, das zu verlieren.',
  },

  /**
   * The shift runs past midnight, so every window here is minutes past the
   * case-s own zero and the chips only read correctly wrapped at 1440. The
   * `alun-shift` pair overlaps by nesting: off the phones 02:20–03:20 sits
   * inside the ninety minutes he claims, 02:10–03:40.
   */
  claims: {
    'c-connie-kitchen': 'Connie: in der Küche, 23:00–23:40',
    'c-alun-oncall': 'Alun: in einem Gespräch, 02:10–03:40',
    'c-alun-callroom': 'Alun: im Telefonraum, 02:00–04:00',
    'c-sunny-branch': 'Sunny: in der Zweigstelle, 02:00–03:00 (laut Alun)',
    'c-yusuf-callroom': 'Yusuf: im Telefonraum, 02:00–04:00',
    'c-alun-offphones': 'Alun: nicht an den Telefonen, 02:20–03:20 (laut Yusuf)',
    'c-alun-office': 'Alun: im Büro, 02:30–02:50 (laut Yusuf)',
    'c-connie-office': 'Connie: im Büro, 00:00–03:00 (laut Yusuf)',
    'c-sunny-home': 'Sunny: in Sunnys Wohnung, 01:00–04:00',
    'c-alun-backstairs': 'Alun: auf der Hintertreppe, 02:55–03:05 (Alarmanlage)',
  },

  motives: {
    'm-numbers':
      'Er hat den Anrufern seit ungefähr 2011 seine private Nummer gegeben, weil man am Ende eines Gesprächs auflegt und es nie erfährt. Connie hatte zwei Namen und ein Datum und wollte es am Vierzehnten in den Vorstand bringen, was ihn erledigt hätte.',
  },

  contradictions: {
    'x-alun-office':
      'Er hat beide für die ganze Schicht mit Headsets in den Telefonraum gestellt, weswegen keiner von ihnen etwas gehört hat. Yusuf Kaya hat in seiner allerersten vierten Schicht gesehen, wie er gegen halb drei ins Büro rüberging, und hat sich nichts dabei gedacht, weil Alun das seit zweiundzwanzig Jahren macht und Yusuf es viermal gemacht hatte.',
    'x-alun-call':
      'Im Dienstbuch stehen neunzig Minuten in seiner eigenen Handschrift, mit drei Zeilen Zusammenfassung, und nichts auf dieser Leitung wird aufgezeichnet oder ist nachverfolgbar, worauf die ganze Einrichtung ruht. An der Wand des Telefonraums hängt eine Tafel mit vier Lampen, eine pro Leitung, und sie ist von ungefähr 1990. Yusuf hat eine Stunde lang auf vier unbeleuchtete Lampen geschaut und gedacht, das ist es also, wozu er gekommen ist.',
    'x-alun-stairs':
      'Die Tür zur Hintertreppe ist von elf bis sechs alarmgesichert und jedes Öffnen wird gegen eine Chipnummer festgehalten. In der Donnerstagnacht gibt es genau ein Öffnen. Sein Chip, 02:55, wieder geschlossen um 03:05. Er hat vierzig Ehrenamtlichen erzählt, er habe geglaubt, jemanden auf dieser Treppe zu hören.',
    'x-sunny-fob':
      'Er hat Sunniva Halvorsen vor vierzig Leuten in das Gebäude gestellt, acht Minuten nachdem sie gesagt hatte, sie sei seit März nicht mehr dort gewesen. Sie hat Prem am Dritten vor zwei Zeugen ihren Chip übergeben, er wurde am selben Tag deaktiviert, und diese Tür öffnet sich ohne einen nicht. Sie hatte ihn gemocht. Sie hatte um vier Uhr morgens mit ihm in dieser Küche gesessen.',
  },

  confrontation: {
    opening:
      'Du hast vier Jahre an dieser Leitung gemacht. Dann weißt du schon, dass ich dich als Erstes reden lassen werde, und du weißt auch schon, dass dieses Wissen nichts daran ändert, dass es funktioniert.',
    beats: {
      'p-office': {
        press:
          'Du hast gesagt, ihr wart beide die ganze Nacht mit Headsets im Telefonraum. Yusuf hat gesehen, wie du gegen halb drei ins Büro rübergegangen bist.',
        rebuttal:
          'Ein sehr verängstigter junger Mann in seiner vierten Schicht, der gerade eine Frau, die er mochte, unten an einer Stufe gefunden hat... Ich wäre vorsichtig damit, wie viel Gewicht du auf ihn legst. Er trägt es so oder so.',
      },
      'p-call': {
        press:
          'Neunzig Minuten im Buch, in deiner Handschrift. Zwischen zwei und vier haben alle vier Leitungen nichts getragen, und Yusuf hat eine Stunde lang auf vier unbeleuchtete Lampen geschaut.',
        rebuttal: 'Lampen fallen aus. Diese Tafel ist älter als Yusuf.',
      },
      'p-stairs': {
        press:
          'Die Tür zur Hintertreppe ist ab elf alarmgesichert. Ein Öffnen in der Donnerstagnacht. Dein Chip, fünf vor drei, geschlossen um fünf nach. Und du hast vierzig Leuten erzählt, du hättest geglaubt, jemanden auf dieser Treppe zu hören.',
      },
      'p-why': {
        press:
          'Sie hatte zwei Namen und ein Datum, das bis 2011 zurückgeht, und der Vorstand hat sich am Vierzehnten getroffen. Sie war nicht wütend auf dich. Sie hat Prem gesagt, du hast es getan, weil du das Nichtwissen nicht ertragen hast.',
      },
    },
    deflections: [
      'Mm. Und was würdest du dir wünschen, wenn das so wäre?',
      'Du arbeitest sehr hart. Ich erkenne es, weil ich es beruflich mache, zweimal die Woche, umsonst.',
      'Bring mir etwas, das nicht ein junger Mann ist, der sich an eine schlimme Nacht erinnert.',
    ],
    confession:
      'Sie hatte die Tür offen. Sie hatte immer die Tür offen, weil eine geschlossene Tür in diesem Gebäude etwas bedeutet.\n\nUnd sie war freundlich dabei. Sie hat gesagt, Alun, ich weiß, warum, und sie hat es so gesagt, wie man es lernt, und wie ich es der Hälfte von ihnen beigebracht habe.\n\nIch höre seit zweiundzwanzig Jahren zu und ich habe kein einziges Mal gesagt, was ich wollte. Das ist die Disziplin. Man stellt sich nicht selbst in den Raum. Und ich saß in diesem Büro und hörte, wie sie professionell mit mir umging, und mir wurde klar, dass ich ein Fall werden würde und dass Menschen, mit denen ich seit einem Jahrzehnt um vier Uhr morgens rede, einen Brief bekommen würden.\n\nIch erinnere mich nicht daran, aufgestanden zu sein.\n\nEs gibt noch eine Sache und ich sage sie, weil sie seitdem jeden Tag der schlimmste Teil war.\n\nEin Mann, der sich the Keeper nannte, hat mich am Dienstag zu Hause angerufen. Sagte, er mache eine Erhebung zum Wohlergehen der Ehrenamtlichen für den Dachverband, und er wolle hören, wie die Zweigstelle mich behandelt.\n\nUnd er war gut. Er war so gut. Er hat die Pausen gemacht. Er hat gespiegelt, genau die Worte, die ich benutze, die kleinen, mit denen man jemanden öffnet, ohne dass er es merkt. Er hat mich gefragt, wie es danach sein würde, und er hat gewartet, und er hat es nicht gefüllt.\n\nIch wusste, was er tat. Das ist die Sache. Ich habe das unterrichtet. Ich saß in meiner eigenen Küche und hörte zu, wie the Keeper meine eigene Ausbildung an mir anwendete, und ich habe ihn machen lassen, weil es das erste Mal in zweiundzwanzig Jahren war, dass mich überhaupt jemand etwas gefragt und auf die Antwort gewartet hat.\n\nEr hat kein einziges Wort über Connie gesagt. Nicht eins. Er ist sehr vorsichtig und er ist einer von uns, oder er war es.',
  },

  coda: {
    from: 'Unbekannte Nummer',
    messages: [
      'Beacon. Das wird dich etwas gekostet haben, und das tut mir leid, was du mir glauben kannst oder nicht.',
      'Er hat natürlich recht. Dort habe ich es gelernt. Neun Jahre Donnerstage in einem Raum wie diesem, vor langer Zeit, und niemand hat die Frage je gestellt, weil niemand je auf die Idee gekommen ist, the Keeper an seiner Art zu suchen.',
      'Du hast jetzt fünf. Alter, Zugang, Jahrzehnte, der Rückruf und das hier. Das reicht, um mich zu finden, und das wissen wir beide.',
      'Ich werde nicht aufhören. Aber ich möchte, dass du verstehst, dass ich es kein einziges Mal selbst sagen musste. Bei keinem von ihnen. Frag dich, ob das die Sache besser oder schlimmer macht, denn ich frage mich das seit dreißig Jahren und bin nicht weitergekommen.',
    ],
  },

  epilogue:
    'Der Vorstand hat an elf Menschen geschrieben. Prem Chandrasekaran hat den Brief neunmal entworfen, und der neunte war zwei Absätze lang und benutzte das Wort Verstoß nicht.\n\nVier der elf haben zurückgeschrieben. Drei davon sagten, der Mann am anderen Ende habe sie am Leben gehalten, und fragten, ob sie das sagen dürften.\n\nSunniva Halvorsen wurde im September wieder auf den Dienstplan eingeladen und lehnte ab, und nahm dann im Januar an, und macht jetzt die Donnerstagsnacht.\n\nYusuf Kaya hat hundertvierzig Schichten gemacht. Die Tafel an der Wand wurde im Frühjahr durch eine ersetzt, die protokolliert, und er hat auf der Ehrenamtlichenversammlung dagegen argumentiert, mit der Begründung, dass ein Raum, in dem nichts aufgeschrieben wird, der ganze Sinn der Sache ist, und er hat verloren, und er hatte recht.',
};
