import type { CaseTranslation } from '../caseText';

/**
 * Case 4 — "Deep Field". German. First paid pack.
 *
 * Five things this had to get right, in this order.
 *
 * 1. Which clock. This case is not about where anybody was, it is about which
 *    clock the record was written in, so the two words `UTC` and `Stationszeit`
 *    have to stay exactly as sharp in German as they are in English and must
 *    never drift into each other. `Das Plattform-Log schreibt in UTC`,
 *    `Stationszeit ist UTC plus drei`, and the entry that reads 21:45 therefore
 *    puts Mal at the dome from `Viertel vor eins nachts`. That last phrase is
 *    the whole case: it is three hours *after* Theo watched Laura go through the
 *    porch, and a translation that quietly wrote 21:45 in both clocks would hand
 *    Mal an alibi the engine does not give him.
 *
 *    `c-mal-log` exists to be rejected, and the rejection is the clue. Its
 *    window runs past midnight (00:45–01:30), so anything reading these chips
 *    has to wrap the clock at 1440 or it prints 24:45 and calls a correct chip
 *    wrong.
 *
 * 2. Digits stay where the English put them, and only there. Machines write
 *    digits: the 02:10 Maria records, the 21:45 in the platform log, the 22:35
 *    and 22:44 card readings, the 22:11 on the camera, the years 2007 and 2011,
 *    and the length of each of Erik-s voice notes. People say times in words —
 *    `Viertel vor zehn`, `zehn nach`, `halb elf`. Theo reading the camera clock
 *    aloud at v2 says `zweiundzwanzig Uhr elf` in words, exactly as the English
 *    says "twenty two eleven", because he is a person reading a machine and the
 *    difference between those two registers is the case.
 *
 * 3. Names. Laura, Mal, Erik, Maria, Theo, Rothera Ridge, the Shackleton,
 *    Cambridge, Boulder, Dunfermline all keep theirs. Places are translated and
 *    bare, so German case declension cannot make one place look like two:
 *
 *      station   → Station          coldporch → Kälteschleuse
 *      block     → Wohntrakt        outside   → Draußen
 *      mess      → Messe            telescope → Instrumentenplattform
 *      surgery   → Ambulanz         metmast   → Wettermast
 *
 *    `Ambulanz` and not `Krankenstation` on purpose: `Station` is already a
 *    place in this case, and a surgery whose name contains it would blur the two
 *    every time a player scanned the board. `Kälteschleuse` is the real German
 *    term for the cold air lock a polar station keeps, and the prose shortens it
 *    to `Schleuse` the way the English shortens to "the porch" — a short form of
 *    one name, not a second name.
 *
 * 4. Voice. Six people, and the split is not where Pack 1 put it.
 *
 *      Du     — lowercase including its nouns, and short. It lowercases names
 *               too (`laura`, `erik`, `mal`), which is what the English does.
 *      Laura  — lowercase sentence starts with the nouns capitalised, and never
 *               a full stop at the end. Clinical, exact, and carrying the
 *               decision she has already made.
 *      Theo   — the same casing and the same missing full stop, separated from
 *               Laura entirely by register: he is the cook, and he thinks in
 *               concrete objects. Brot, Kombüse, Innenstiefel, Ärmel, Manschette.
 *               Laura reasons; Theo notices.
 *      Mal    — standard orthography, full stops, controlled and defensive, and
 *               he counts his seasons in every second message.
 *      Maria  — standard orthography, full stops, and the register of somebody
 *               who is responsible for six people and knows the report will be
 *               read: `Protokoll`, `verzeichne`, `Bericht`.
 *      Erik   — standard orthography, and the only voice that never types at
 *               all. Every message opens `[Sprachnachricht, 0:41]`. That marker
 *               is his and it survives translation untouched, which is lucky,
 *               because it is doing the work three other markers would.
 *
 * 5. The player is not a man. The English confrontation opens `a radio link and
 *    a man in Cambridge`, which is Mal describing the player, and it is the same
 *    class of leak that `Ivy-s godson` was in Pack 3 — third person this time,
 *    so `playerNeutral.test.ts` does not catch it. German says `jemand in
 *    Cambridge`, which costs nothing and marks nobody. Flagged for the English.
 *
 * The title stays `Deep Field`. It is the astronomical term, German astronomers
 * use it untranslated, and it is doing double duty here for a telescope and for
 * fieldwork a long way from anywhere — `Tiefes Feld` would keep neither sense.
 */
export const deepFieldDe: CaseTranslation = {
  title: 'Deep Field',
  blurb:
    'Sechs Menschen, vier Monate Dunkelheit, und niemand kann weg. Das Alibi ist ein Zeitstempel, und der Zeitstempel steht in der falschen Uhr.',

  characters: {
    you: 'Du',
    orla: 'Laura',
    mal: 'Mal',
    rune: 'Erik',
    pilar: 'Maria',
    theo: 'Theo',
  },

  places: {
    station: 'Station',
    block: 'Wohntrakt',
    mess: 'Messe',
    surgery: 'Ambulanz',
    coldporch: 'Kälteschleuse',
    outside: 'Draußen',
    telescope: 'Instrumentenplattform',
    metmast: 'Wettermast',
  },

  threads: {
    't-orla': 'Laura',
    't-station': 'Rothera Ridge',
    't-theo': 'Theo',
    't-rune': 'Erik',
    't-pilar': 'Maria Otxoa',
    't-porch': 'Kamera in der Kälteschleuse',
  },

  briefing: {
    causeOfDeath: 'Unterkühlung. Sie ist ohne ihre äußere Schicht aus der Kälteschleuse gegangen.',
    ruling:
      'Als Unglücksfall verzeichnet. Bis Oktober kommt niemand zur Station, und niemand hat darum gebeten.',
    opening:
      'Rothera Ridge hält drei Uhren. Stationszeit für die Menschen, UTC für die Instrumente, und was jeder von ihnen am eigenen Handgelenk von zu Hause weiterlaufen lässt.\n\nOrla Byrne war die Ärztin. Gefunden wurde sie um zwei Uhr nachts in der Kälteschleuse, ihre äußere Schicht noch am Haken, und die sechs haben untereinander ausgemacht, dass sie hinausgegangen war, um den Himmel anzusehen, und sich verschätzt hat. Das nächste Flugzeug kommt im Oktober.\n\nDu bist in Cambridge für sie zuständig und der letzte Mensch, dem sie geschrieben hat.',
  },

  messages: {
    // ----------------------------------------------------------------- t-orla
    o1: 'tag einundsechzig ohne Sonne. Theo hat angefangen, den Kartoffeln Namen zu geben. ich sage dir das, damit Cambridge es in der Akte hat',
    o2: 'notiert. wie laufen die jahresuntersuchungen',
    o3: 'deswegen bin ich eigentlich noch wach. ich habe ein Untersuchungsergebnis, das ich nicht haben will',
    o4: 'vorhofflimmern, und kein grenzwertiges. bei einem Mann, der einundsechzig ist und neunzehn Saisons tief drin und der diesen Kontinent kein einziges Mal verlassen hat, wenn er die Wahl hatte',
    o5: 'protokoll ist protokoll. das heißt erster flieger raus',
    o6: 'ich weiß, was es ist. ich habe die Formulierung zweimal geschrieben und zweimal gelöscht und ich reiche es morgen früh ein, weil es keine Version davon gibt, in der ich das nicht tue',
    o7: 'er bekommt keine weitere Saison. er bekommt gar nichts weiter. er ist 2007 rausgekommen und seitdem jedes Jahr wieder, und ich habe ihn im Oktober aus dem Flugzeug steigen sehen wie einen Mann, der nach Hause kommt',
    o8: 'hast du es ihm gesagt',
    o9: 'heute Abend. ich reiche nichts über einen Mann ein, ohne es ihm vorher ins Gesicht zu sagen, das ist der ganze Beruf',
    o10: 'gesagt. er war sehr ruhig und sehr höflich und hat sich bedankt, und das war schlimmer, als wenn er geschrien hätte',
    o11: 'gehe zehn Minuten raus. es sind minus einundvierzig und über uns ist nichts als das Ganze. reden morgen x',

    // -------------------------------------------------------------- t-station
    w1: 'Cambridge. Laura Byrne ist letzte Nacht gestorben. Von Erik um 02:10 Stationszeit in der Kälteschleuse gefunden. Vierzig Minuten Reanimation. Ich verzeichne es als Unglücksfall und schicke den vollständigen Bericht im Morgenfunk.',
    w2: 'Bevor mich jemand fragt: ja, ich weiß, was sechs Menschen und vier Monate Dunkelheit mit so einem Bericht machen. Ich habe ihn trotzdem geradeaus geschrieben.',
    w3: 'sie ist ohne ihre äußere Schicht raus. genau dafür hat sie mich zusammengefaltet. zweimal. sie hat es in der Schleuse an die Tafel geschrieben',
    w4: 'Ich war von Viertel vor zehn bis elf auf der Plattform und habe das Herunterfahren gemacht. Ich habe nichts gesehen und nichts gehört, und das tut mir leid, weil ich zweihundert Meter entfernt war.',
    w5: 'Das Plattform-Log hat mich drin. Es schreibt bei jeder Kuppelbewegung einen Bediener mit, und die Kuppel hat sich den ganzen Abend bewegt.',
    w6: 'mal ich habe dich um zehn nach im Wohntrakt gesehen. du bist durch den Gang gekommen und hast nichts zu mir gesagt',
    w7: 'Du hast jemanden in einem roten Parka in einem dunklen Gang gesehen. Auf dieser Station gibt es vier rote Parkas, und einer davon gehört dir.',
    w8: 'Und wenn wir schon dabei sind: Erik war den halben Abend draußen am Wettermast, und niemand hat ihm eine einzige Frage gestellt, und ich wüsste gern, warum das so ist.',
    w9: 'Schluss. Niemand auf dieser Station beschuldigt jemanden auf dieser Station über eine Funkverbindung, während Cambridge mithört. Kommt damit zu mir.',

    // ----------------------------------------------------------------- t-theo
    h1: 'ich habe sechs Monate für sie gekocht und ich habe in dieser Kombüse vierhundert Essen gemacht und heute Abend kriege ich keins hin',
    h2: 'ich war von neun bis elf in der Messe und habe das Brot für morgen gemacht. von der Durchreiche aus sieht man den ganzen Gang, nur deswegen weiß ich überhaupt etwas',
    h3: 'wann hast du laura zuletzt gesehen',
    h4: 'viertel nach zehn, durch die Schleuse. sie hatte ihre Innenstiefel an. ich bin das hundertmal durchgegangen, weil ich ihre Innenstiefel gesehen und nichts gesagt habe',
    h5: 'und in dem Gang war Mal. ich weiß, wie die Parkas aussehen. ich weiß, wie er geht. neunzehn Saisons von einem Mann sind eine Form, die man lernt',
    h6: 'er sagt erik war draußen',
    h7: 'Erik war die ganze Zeit im Funk mit der Shackleton. ich stand zehn Minuten davon neben ihm und das Schiff protokolliert seine Seite. da kann man nicht vage werden',
    h8: 'red mit Erik. er tippt dir nichts, er schickt die Sprachnachrichten. mach daraus nichts, hier wissen alle warum und hier sagt es keiner',

    // ----------------------------------------------------------------- t-rune
    n1: '[Sprachnachricht, 0:41] Ich war es, der sie gefunden hat. Zehn nach zwei. Ich war zur Schleuse gegangen, weil die Tür bei dieser Kälte nicht richtig schließt und ich sie als Letztes kontrolliere. Ich werde nicht beschreiben, wie sie dalag.',
    n2: '[Sprachnachricht, 0:19] Ich mache die hier, weil ich nicht gut lese und mit dem Tippen nie zurechtgekommen bin. Maria weiß es seit neun Jahren. Es ist kein Geheimnis, es ist nur anstrengend.',
    n3: 'mal sagt du warst am mast',
    n4: '[Sprachnachricht, 1:02] Ich war von zehn vor zehn bis halb elf am Funkgerät mit der Shackleton. Vierzig Minuten über eine Treibstoffübergabe, die vor Dezember sowieso nicht stattfindet. Ihr Funkraum protokolliert jeden Ruf auf ihrer Seite, und Cambridge kann sie heute Nacht fragen, also fragt sie bitte, mir wäre lieber, ihr tut es.',
    n5: '[Sprachnachricht, 0:33] Er hat den Mast gesagt, weil der Mast die einzige Stelle auf dieser Station ist, die niemand einsehen kann. Er ist nicht dumm. Das ist die Sache mit ihm, er war kein einziges Mal dumm.',
    n6: '[Sprachnachricht, 0:28] Frag Maria nach dem Plattform-Log. Frag sie, welche Uhr es führt. Ich habe es ihr zweimal gesagt und sie ist zweimal still geworden, und ich bin Mechaniker, was weiß ich schon.',

    // ---------------------------------------------------------------- t-pilar
    p1: 'Ich habe sechs Menschen und einhundertelf Tage. Was ich dir jetzt auch sage, ich muss ihnen morgen früh trotzdem allen zusammen Frühstück machen. Das soll im Protokoll stehen, bevor der Rest kommt.',
    p2: 'Erik hat mit dem Log recht, und ich war langsam, weil ich nicht wollte, dass er recht hat. Das Plattform-Log schreibt in UTC. Es schreibt in UTC, seit das Instrument eingebaut wurde, weil das Instrument einem Konsortium in Boulder gehört und Boulder egal ist, wie spät es hier ist.',
    p3: 'Stationszeit ist UTC plus drei. Der Eintrag, der ihn ab 21:45 an der Kuppel hat, hat ihn also ab Viertel vor eins nachts dort, Stationszeit. Drei Stunden, nachdem Theo sie durch diese Schleuse gehen sah.',
    p4: 'Das Log ist nicht sein Alibi. Das Log ist eine Aufzeichnung davon, wohin er danach gegangen ist.',
    p5: 'die ambulanz',
    p6: 'Kartenzugang. Seine Karte hat die Ambulanz um 22:35 geöffnet und noch einmal um 22:44. Laura war zu dem Zeitpunkt schon in dieser Schleuse. Er hatte zu keiner Stunde einen klinischen Grund, in diesem Raum zu sein, und in neunzehn Saisons hat er nie einen gehabt.',
    p7: 'Ihre Untersuchungsakte ist nicht im System. Die Papierkopie ist nicht in der Schublade. Ich habe zweimal nachgesehen und Theo einmal nachsehen lassen, damit es nicht nur ich bin, die das sagt.',
    p8: 'Sie hat mir am Dienstag gesagt, was sie gefunden hatte und was sie deswegen würde tun müssen. Sie hat mich gefragt, ob neunzehn Saisons einem Mann irgendetwas einbringen. Ich habe nein gesagt. Über diese Antwort denke ich seitdem jede Stunde nach.',
    p9: 'Und ich war von halb zehn bis Mitternacht im Wohntrakt, bei offener Tür, an der Nachschubtabelle, was das nutzloseste Alibi ist, das je jemand hatte.',

    // ---------------------------------------------------------------- t-porch
    v1: 'in der Schleuse ist eine Kamera. sie ist für die Türdichtung, sie zeigt auf das Scharnier, sie ist nichts Sicherheitstechnisches und sie nimmt keinen Ton auf',
    v2: 'zweiundzwanzig Uhr elf. jemand kommt von der Gangseite ins Bild, steht elf Sekunden an den Haken und geht durch die äußere Tür hinter ihr raus. ein Gesicht sieht man nicht. einen Ärmel sieht man',
    v3: 'der Ärmel hat den Riss an der Manschette. Mal hat sich die Manschette im April an der Winde aufgerissen und einen neuen Parka abgelehnt, weil er den da seit 2011 hat',
    v4: 'warum hat da vorher niemand reingesehen',
    v5: 'weil es eine Türdichtungskamera ist und sich alle zehn Tage selbst überschreibt und keiner von uns sie als etwas gedacht hat, das Menschen beobachtet. sie hat einen Menschen beobachtet',
  },

  /**
   * The chips are the board. `c-mal-log` is the one that must read 00:45–01:30:
   * it is the converted entry, it is three hours after the death, and it is the
   * pairing the engine is supposed to reject in front of the player.
   */
  claims: {
    'c-orla-surgery': 'Laura: in der Ambulanz, 21:00–21:40',
    'c-mal-telescope': 'Mal: auf der Instrumentenplattform, 21:45–23:00',
    'c-mal-block': 'Mal: im Wohntrakt, 22:00–22:10 (laut Theo)',
    'c-rune-outside': 'Erik: draußen am Wettermast, 22:00–22:20 (laut Mal)',
    'c-theo-mess': 'Theo: in der Messe, 21:40–23:00',
    'c-orla-coldporch': 'Laura: in der Kälteschleuse, 21:55–22:10 (laut Theo)',
    'c-rune-radio': 'Erik: im Funk mit dem Schiff, 21:50–22:30 (laut Theo)',
    'c-mal-log': 'Mal: an der Kuppel, 00:45–01:30 (Plattform-Log, umgerechnet)',
    'c-mal-surgery': 'Mal: in der Ambulanz, 22:35–22:50 (Kartenzugang)',
    'c-pilar-block': 'Maria: im Wohntrakt, 21:30–24:00',
    'c-mal-coldporch': 'Mal: in der Kälteschleuse, 22:10–22:25 (Kamera)',
  },

  motives: {
    'm-medevac':
      'Laura hatte bei seiner Jahresuntersuchung Vorhofflimmern gefunden. Das Protokoll sieht die medizinische Ausfliegung mit dem ersten Flug vor, und mit einundsechzig und neunzehn Saisons hätte es keine zwanzigste gegeben.',
  },

  contradictions: {
    'x-mal-block':
      'Er hat sich selbst ab Viertel vor zehn zweihundert Meter entfernt auf die Plattform gestellt. Theo hat ihn um zehn nach durch den Gang des Wohntrakts kommen sehen, von einer Durchreiche aus, die dessen ganze Länge einsieht, und hat ihn daran erkannt, wie er geht.',
    'x-mal-porch':
      'Die Türdichtungskamera zeigt auf ein Scharnier, und niemand hat sie je als etwas gedacht, das Menschen beobachtet. Um 22:11 steht ein Ärmel mit gerissener Manschette elf Sekunden an den Haken und geht dann durch die äußere Tür hinter ihr hinaus. Diese Manschette hat er sich im April an der Winde aufgerissen und wollte keinen neuen Parka.',
    'x-mal-surgery':
      'Seine Karte hat die Ambulanz um 22:35 geöffnet und noch einmal um 22:44, während er nach eigener Aussage noch auf der Plattform war und während Laura schon in dieser Schleuse lag. Ihre Untersuchungsakte ist nicht im System und die Papierkopie nicht in der Schublade, und in neunzehn Saisons hatte er nie einen klinischen Grund, in diesem Raum zu sein.',
    'x-rune-mast':
      'Erik war vierzig Minuten am Funkgerät mit der Shackleton, wegen einer Treibstoffübergabe, die vor Dezember nicht stattfindet, und das Schiff protokolliert seine Seite jedes Rufs. Mal hat ihn an den Wettermast gestellt, weil der Wettermast die einzige Stelle auf dieser Station ist, die niemand einsehen kann, und weil ein Mann, der in Sprachnachrichten antwortet, der leichteste Mann auf dem Eis ist, den man fremd aussehen lässt.',
  },

  confrontation: {
    opening:
      'Neunzehn Saisons. Ich habe zwei Menschen von dieser Station beerdigt und einen davon selbst getragen, und jetzt ist es eine Funkverbindung und jemand in Cambridge. Los.',
    beats: {
      'f-block': {
        press:
          'Du hast dich selbst ab Viertel vor zehn auf die Plattform gestellt. Theo hat dich um zehn nach den Gang des Wohntrakts herunterkommen sehen und hat dich daran erkannt, wie du gehst.',
        rebuttal:
          'Theo ist seit einundsechzig Tagen im Dunkeln, und auf dieser Station gibt es vier rote Parkas. Er will, dass es jemand ist. Hier unten wollen inzwischen alle, dass es jemand ist.',
      },
      'f-porch': {
        press:
          'Die Schleusenkamera hat um 22:11 einen Ärmel an den Haken, elf Sekunden, und dann hinaus durch die äußere Tür hinter ihr. Die Manschette ist gerissen. Das hast du dir im April an der Winde gemacht und wolltest keinen neuen Parka.',
        rebuttal:
          'Eine Manschette. In einem Gebäude, in dem wir alle dasselbe tragen und es uns den ganzen Winter jeden Tag gegenseitig leihen.',
      },
      'f-surgery': {
        press:
          'Deine Karte hat die Ambulanz um 22:35 geöffnet und noch einmal um 22:44. Ihre Untersuchungsakte ist aus dem System verschwunden und die Papierkopie aus der Schublade, und du hattest kein einziges Mal einen Grund, in diesem Raum zu sein.',
      },
      'f-why': {
        press:
          'Sie hat bei deiner Jahresuntersuchung Vorhofflimmern gefunden und wollte es am Morgen einreichen. Erster Flug raus, und keine zwanzigste Saison.',
      },
    },
    deflections: [
      'Das ist Cambridge, das da redet. Cambridge war noch nie hier im Dunkeln.',
      'Bring mir eine Sache und nicht den Eindruck von einer Sache.',
      'Du bist elftausend Meilen weit weg und du bist dir sehr sicher.',
    ],
    confession:
      'Sie ist gekommen und hat es mir selbst gesagt. Das hätte sie nicht tun müssen. Sie hätte es einreichen und mich im Oktober herausfinden lassen können, wenn das Flugzeug kommt und ein Platz darin meinen Namen trägt.\n\nIch habe mich bedankt. Ich bin das noch einmal durchgegangen, und ich habe mich wirklich bedankt, und in dem Moment habe ich es auch so gemeint.\n\nDann saß ich ungefähr eine Stunde auf der Kante der Koje und habe mir ausgerechnet, was der Rest davon ist. Eine Wohnung in Dunfermline. Ein Sessel. Ein Fernseher, der nachmittags läuft. Neunzehn Jahre von dem Einzigen, worin ich je zu etwas getaugt habe, vorbei, wegen eines Rhythmus.\n\nSie ist hinausgegangen, um den Himmel anzusehen. Das hat sie fast jede Nacht gemacht. Ich bin ihr nachgegangen und ich habe nichts davon geplant, und ich will, dass das verstanden wird, denn es ist keine Entschuldigung, es ist nur, was passiert ist.\n\nSie hatte ihre Innenstiefel an. Ich habe ihre äußere Schicht zurück an den Haken gehängt. Das ist der Teil, den ich entschieden habe, und ich habe ungefähr vier Sekunden dafür gebraucht, und es sind die vier Sekunden, die es zu dem machen, was es ist.',
  },

  epilogue:
    'Die Station hat den Winter zu Ende gebracht. Es gab keine andere Möglichkeit und keinen anderen Ort für ihn, also haben einhundertelf Tage lang sechs Menschen zusammen gefrühstückt, und fünf von ihnen wussten es.\n\nPilar Otxoa hat einen zwölfseitigen Bericht geschrieben und keine Zeile davon abgemildert, und hat danach bis Oktober jeden Abend mit Theo gekocht, weil Theo es allein nicht mehr konnte.\n\nRune Sandved hat seine Aussage in elf Sprachnachrichten gemacht. Die Schreibkraft in Cambridge sagte hinterher, es sei die klarste Zeugenaussage, die sie je aufgenommen habe, und fragte, ob er Schriftsteller sei.\n\nOrla Byrnes Untersuchungsakte ist nie wieder aufgetaucht. Die Rhythmusstörung wurde bei der Oktoberuntersuchung in Rothera bestätigt, von einer Ärztin, die an dem Morgen eingeflogen war und keinen von beiden je getroffen hatte.',
};
