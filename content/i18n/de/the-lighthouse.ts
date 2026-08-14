import type { CaseTranslation } from '../caseText';

/**
 * Case 1 — "Der Leuchtturm". German.
 *
 * Four things this had to get right, in this order.
 *
 * 1. `the Keeper` stays in English, and German makes that harder than Spanish
 *    did, because German has a false friend sitting exactly on top of it.
 *
 *    `der Keeper` is already a German word. It is what you call a goalkeeper.
 *    Written that way, `ein Mann, der sich der Keeper nannte` reads to a German
 *    player as "a man who called himself the goalie" — which is not sinister,
 *    it is funny, and it is the one line in this pack that must not be funny.
 *    The obvious translations are worse: `der Wärter`, `der Hüter`, and above
 *    all `der Leuchtturmwärter`, which is the tempting one because Ruth kept the
 *    light and the rhyme looks free. It is not free. He uses this name in six
 *    packs — a care home, a rowing club, a canal, a crisis line, the finale —
 *    and there is no lighthouse in any of them. He is the keeper of *records*,
 *    which is what the finale pays off, and Pack 1 only looks like it is about a
 *    lighthouse.
 *
 *    So it is written `the Keeper`, article and all, as an untranslated foreign
 *    name. German does this routinely with English titles and callsigns, it
 *    blocks the goalkeeper reading, and it keeps the string identical in every
 *    locale so no later translator has to re-derive the choice. Two mentions in
 *    the English (n9 and x-papers-lie), two here; `arcAlias.test.ts` counts them
 *    and a paraphrase in either place fails.
 *
 * 2. Times, in the form the English chose. Where the English writes digits it
 *    stays digits, and where it writes words it stays words. That split is not
 *    cosmetic: Fiona is the only person in Ardnoe who writes a clock down
 *    (`21:40`, `22:00`, `21:47`), and she beats Mairi because she has a number
 *    while everyone else has a memory. Tidying the village into digits would
 *    hand the player the answer on the first read.
 *
 *    The village therefore speaks the spoken clock and the chips carry the
 *    24-hour one, exactly as in English. `zehn nach zehn` from Callum against
 *    `22:05–22:15` on his chip; `zwanzig vor zehn bis viertel nach` from him at
 *    the ramp against `21:40–22:15`; `halb neun bis elf` from Mairi against
 *    `20:30–23:00`. British `half eight` is 20:30 and German `halb neun` is the
 *    same minute, so the idiom moves and the minute does not.
 *
 * 3. Names. People and businesses stay: Ruth Calder, Mairi Bell, Callum, Fiona
 *    Trian, Peter — and Ardnoe, which is the thread title and the first word the
 *    caller says in the coda. Places that are descriptions are translated. The
 *    full list, so every decision is visible in review rather than looking like
 *    an oversight:
 *
 *      you    → Du        point     → Ardnoe Point    cafe    → Café
 *      ruth   → Ruth      lighthouse→ Leuchtturm      slip    → Bootsrampe
 *      mairi  → Mairi     path      → Klippenpfad     cottage → Häuschen
 *      callum → Callum    harbour   → Hafen           ferry   → Fähre
 *      esme   → Fiona
 *
 *    `Ardnoe Point` keeps both words. It is a Scottish headland with a real
 *    name, not a description, and German leaves such toponyms alone; inventing
 *    `Landzunge Ardnoe` would be naming a place that has a name. `Hafen` never
 *    appears in the prose, and neither does `the harbour` in the English — the
 *    village says `an der Bootsrampe` the way it says "down the slip".
 *
 *    The place names carry no article, as in the German tutorial. German
 *    declines the article and the adjective with the case, so a chip reading
 *    `der Klippenpfad` beside a message reading `auf dem Klippenpfad` is two
 *    spellings of one place, and matching chip to sentence is the whole move.
 *    Bare compounds survive every case the prose puts them in.
 *
 *    `the Trust` is `die Stiftung`, and `the Ardnoe Light Trust` is `die
 *    Leuchtturmstiftung Ardnoe`. One word everywhere — chip, message,
 *    contradiction, confrontation — because `Bootsrampe` against `Café` at
 *    overlapping minutes is the first thing the player proves, and the Trust is
 *    the second thing they have to hold.
 *
 *    Three notebooks stay three different objects, which English blurs and
 *    German cannot afford to: Ruth's survey notebook is her `Logbuch`, Fiona's
 *    survey log is her `Beobachtungsprotokoll`, and the officer writes in his
 *    `Notizbuch`. Collapsing them would make the epilogue read as if Fiona had
 *    written Ruth's confession.
 *
 * 4. Voice. Five people type differently and the difference is the character.
 *    English separates them mostly by capitals, and German cannot lean on that
 *    the same way: nouns are capitalised by rule, so all-lowercase is a louder
 *    signal here than in English but a blunter one, because three of these five
 *    are lowercase. They are told apart by what else they do.
 *
 *      Ruth   — lowercase, and never a full stop at the end of a message. She
 *               lowercases every common noun and capitalises people: `Callum`,
 *               `Mairi`. Sixty one, warm, ruminative, long trailing clauses.
 *      Callum — lowercase, and capitalises nobody, not even `ruth` or his own
 *               mother. That is the line between him and Ruth. Blunt short
 *               clauses, spoken clipping (`hab`, `is`, `rum`), no images.
 *      Du     — lowercase like both of them, and separated by length: a handful
 *               of words, no closing punctuation. The one exception is the
 *               shouted `WEM` at r11, which the English shouts too.
 *      Mairi  — capitals, whole sentences, no contractions, and never once a
 *               quotable line. She writes like a woman who has filled in forms:
 *               flat, correct, declarative, no picture in any of it.
 *      Fiona  — capitals and precision. Technical nouns (`Zählung`,
 *               `Windstärke`, `Beobachtungsprotokoll`) and the only clock digits
 *               in the case. She is the instrument the village is measured
 *               against, and she sounds like one.
 *
 * `du` throughout, never `Sie`, including in the confrontation. Mairi has known
 * this player since they were a child and Ruth was their aunt. The player's
 * gender is never stated and nothing here states it.
 */
export const theLighthouseDe: CaseTranslation = {
  title: 'Der Leuchtturm',
  blurb:
    'Deine Tante hat das Licht auf Ardnoe Point gehütet. Sie nennen es einen Sturz. Du hast ihr Telefon, und alle haben ihre Version immer noch parat.',

  characters: {
    you: 'Du',
    ruth: 'Ruth',
    mairi: 'Mairi',
    callum: 'Callum',
    esme: 'Fiona',
  },

  places: {
    point: 'Ardnoe Point',
    lighthouse: 'Leuchtturm',
    path: 'Klippenpfad',
    harbour: 'Hafen',
    cafe: 'Café',
    slip: 'Bootsrampe',
    cottage: 'Häuschen',
    ferry: 'Fähre',
  },

  threads: {
    't-ruth': 'Ruth',
    't-group': 'Ardnoe',
    't-mairi': 'Mairi Bell',
    't-esme': 'Fiona Trian',
    't-callum-truth': 'Callum',
    't-mairi-again': 'Mairi Bell',
  },

  briefing: {
    causeOfDeath: 'Ein Sturz von der Turmtreppe.',
    ruling: 'Als Unfall verzeichnet. Keine weiteren Ermittlungen.',
    opening:
      'Ruth Calder hat das Licht auf Ardnoe Point noch vierzig Jahre gehütet, nachdem es automatisiert worden war, weil niemand sie je gebeten hat aufzuhören. Gefunden wurde sie am Fuß der Turmtreppe, in der Nacht des Äquinoktialsturms.\n\nDu bist mit der letzten Fähre gekommen. Du hast ihr Telefon, und alle haben ihre Version immer noch parat.',
  },

  messages: {
    // ----------------------------------------------------------------- t-ruth
    r1: 'du bist also tatsächlich eingestiegen',
    r2: 'letzte fähre. sechs jahre und immer noch derselbe mann der die tickets abreißt',
    r3: 'das wird jetzt der kleine Callum sein. der junge von Mairi. er war neun als du weggegangen bist',
    r4: 'komm heute abend nicht rauf. hier draußen pfeift es wie verrückt und der weg ist die reinste eisbahn',
    r5: 'dann morgen. du klingst komisch',
    r6: 'mir gehts gut. da ist eine sache mit der stiftung die erzähl ich dir morgen wenn ich eine nacht drüber geschlafen habe',
    r7: 'zwei jahre buchführung und mitten drin ein loch so groß wie ein boot',
    r8: 'ruth. was heißt das',
    r9: 'es heißt dass ich jemandem etwas sagen muss den ich seit vierzig jahren kenne und ich würde lieber ins meer laufen',
    r10: 'ich habe es ihr gesagt. das ist erledigt. sie kommt heute abend zu mir und morgen früh gehe ich zur polizei egal was sie sagt',
    r11: 'du hast es WEM gesagt',
    r12: 'ich gehe hoch in den turm, die lampe zickt schon wieder. vierzig jahre automatisiert und sie will immer noch jemanden der daneben steht',
    r13: 'mach dir keine sorgen um mich. mach dir sorgen um den zustand von meinem gästezimmer',
    r14: 'ruth?',
    r15: 'ruth bitte',

    // ---------------------------------------------------------------- t-group
    g1: 'Für alle, die es noch nicht gehört haben. Ruth wurde heute Morgen am Fuß der Turmtreppe gefunden. Sie ist tot, und es tut mir leid, dass ich es in eine Gruppe schreibe.',
    g2: 'Das Café hat heute auf. Es kostet nichts. Kommt, wenn ihr nicht allein im Haus sitzen wollt.',
    g3: 'oh gott',
    g4: 'Es tut mir sehr leid. Ich habe sie dreimal getroffen, und sie hat mir einen Schlüssel zum Turm gegeben, damit ich von der Galerie aus zählen kann.',
    g5: 'ich war auf der überfahrt. sie hat gesagt ich soll wegen dem weg nicht raufkommen',
    g6: 'sie hat gesagt ich soll nicht raufkommen',
    g7: 'Und damit hatte sie recht. Der Weg bei dem Wind hätte dich genauso runtergeholt. Fang nicht an, es dir selbst anzulasten.',
    g8: 'die polizei war heute früh unten an der bootsrampe und hat jeden gefragt wo er war. fand ich komisch für einen sturz',
    g9: 'Das müssen sie. Plötzlicher Todesfall, das ist einfach Vorschrift. Mich haben sie auch gefragt.',
    g10: 'hab ich ihnen auch klipp und klar gesagt. ich hab das letzte boot um acht reingebracht mit deiner tante drauf',
    g11: 'hast du. du hast meine tasche die stufen hochgetragen und ich hab mich nicht bedankt',
    g12: 'und danach war ich unten an der bootsrampe von ungefähr zwanzig vor zehn bis viertel nach. die achterleine war ihr weggegangen und bei dem seegang lass ich das nicht so',
    g13: 'am ende war ich bis auf die haut durch',
    g14: 'Callum. Niemand braucht das Minute für Minute.',
    g15: 'ich sag doch nur was ich ihnen gesagt habe',
    g16: 'Ich weiß, mein Junge. Aber nicht hier.',
    g17: 'Wer auch immer sich um die Stiftung kümmert. Ihr Logbuch liegt noch oben im Turm, wo sie es hingelegt hat. Es steht mir nicht zu, es mitzunehmen. Jemand sollte es der Familie sagen.',
    g18: 'Ich führe die Bücher der Stiftung. Ich kümmere mich darum.',
    g19: 'sie hat gesagt da war eine sache mit der stiftung. in der nacht als sie gestorben ist. sie hat gesagt da ist ein loch drin',
    g20: 'Sie war müde. Sie war einundsechzig, und die Lampe machte seit Juli Probleme. Lass es gut sein.',

    // ---------------------------------------------------------------- t-mairi
    m1: 'Du hättest es nicht in einem Gruppenchat erfahren sollen. Das war ich, und es tut mir leid.',
    m2: 'sie hat gesagt sie hat jemandem von den büchern erzählt. sie hat gesagt sie kommt heute abend zu mir',
    m3: 'sie. du führst die bücher',
    m4: 'Ich führe die Bücher, weil es sonst niemand umsonst machen würde.\n\nUnd ja, sie hat mich wegen einer Spalte angerufen, die nicht aufging. Ich habe gesagt, ich bringe ihr den Ordner am Wochenende hoch.',
    m5: 'Ich bin nicht dort hinaufgegangen. Ich war im Café.',
    m6: 'Von halb neun, bis ich um elf abgeschlossen habe. Im Café. Wie an jedem anderen Abend.',
    m7: 'allein?',
    m8: 'Callum war bei mir. Im Café von neun, bis wir zugemacht haben.\n\nDann sind wir also zwei, die es sagen, falls du einen Zeugen suchst.',
    m9: 'ich hab keinen zeugen gesucht',
    m10: 'Nein. Ich weiß. Hör nicht auf mich, ich habe nicht geschlafen.',
    m11: 'Du warst in der Nacht selbst da. Weißt du noch. Viertel nach neun, bevor du zu ihr hochgegangen bist. Du hattest den Tee und hast ihn nicht angerührt.',
    m12: 'ich weiß noch',
    m13: 'Ich habe um zwanzig vor elf abgerechnet, wie immer. In der Kasse fehlten elf Pfund, und ich habe es dreimal nachgezählt.',
    m14: 'Elf Pfund. Und sie lag die ganze Zeit, während ich gezählt habe, unten an diesen Stufen.',
    m15: 'Bei dem Mädchen im Häuschen brannte Licht, als ich nach elf nach Hause gegangen bin. Ich weiß noch, dass ich dachte, es ist noch jemand wach.',
    m16: 'Komm morgen ins Café. Ich gebe dir etwas zu essen, und du lässt mich.',

    // ----------------------------------------------------------------- t-esme
    e1: 'Entschuldige, dass ich dir direkt schreibe. Du hast in der Gruppe gesagt, sie hat dir gesagt, du sollst nicht hochkommen. Zu mir hat sie in der Woche dasselbe gesagt.',
    e2: 'Bei dem Weg und schlechtem Wetter war sie sehr streng. Deshalb stört mich das Ergebnis.',
    e3: 'stört dich wie',
    e4: 'Ich führe ein Beobachtungsprotokoll. Zeiten, Positionen, Bedingungen, jede Nacht.\n\nDas ist Gewohnheit. Und deshalb kann ich dir das hier auf die Minute genau sagen.',
    e5: 'Ich war von sieben bis halb zehn im Häuschen und habe die Nachmittagszählung ins Reine geschrieben.',
    e6: 'Dann ließ der Wind für etwa eine halbe Stunde nach. Das macht er, bevor er rückdreht. Ich bin auf den Klippenpfad hinaus, um ein letztes Mal nach den Jungtieren zu horchen.',
    e7: 'Ihre Lampe brannte die ganze Zeit, die ich draußen war. Ich habe es um 21:40 notiert und noch einmal um 22:00. Der Lichtstrahl ist meine Zeitmarke.',
    e8: 'du warst auf dem weg zur selben zeit als sie da oben war',
    e9: 'Ja. Und ich war nicht die Einzige darauf.',
    e10: 'Um 21:47 ist mir Mairi Bell entgegengekommen. Ich habe es notiert, weil ich alles notiere, und weil es mich gewundert hat: Sie hatte einen Mantel über dem Kopf und ist ohne ein Wort an mir vorbeigegangen.',
    e11: 'sie erzählt allen sie war die ganze nacht im café',
    e12: 'Dann irrt sich eine von uns beiden, und ich habe es damals sofort aufgeschrieben, mit einer Windstärke daneben. Ich sage nicht, was das bedeutet. Ich sage, dass ich es nicht wieder ausstreichen werde.',
    e13: 'Ich habe es dem Beamten gesagt. Er hat es hinten in sein Notizbuch geschrieben, hinter die Stelle, an der schon „Sturz“ stand.',
    e14: 'Ich bin noch sechs Wochen hier. Wenn du das Protokoll willst, gehört es dir.',

    // --------------------------------------------------------- t-callum-truth
    k1: 'du weißt es oder',
    k2: 'sie hat allen erzählt ich war im café. ich war nicht im café. du kannst jeden fragen der in der nacht unten an der bootsrampe war',
    k3: 'warum sollte sie das sagen',
    k4: 'weil wenn ich mit ihr im café bin fragt mich keiner was. das ist der ganze grund. sie hat nicht mich gedeckt. sie hat sich selbst gedeckt und mich dafür benutzt',
    k5: 'ich war mit der leine gegen viertel nach zehn fertig und bin hinten rum am point vorbei hoch weil das kürzer ist',
    k6: 'sie stand an der leuchtturmtür. zehn nach zehn, vielleicht eine minute hin oder her. ich hab sie im lichtstrahl gesehen als er rumkam',
    k7: 'ich hab nicht gerufen. ich weiß nicht warum. sie stand so still da',
    k8: 'callum',
    k9: 'sie kam nach elf klatschnass rein und hat ihren mantel in die maschine gesteckt. meine mutter hat in ihrem leben noch nie nachts einen mantel gewaschen',
    k10: 'und ich sitze seit zwei tagen darauf und lasse sie den leuten erzählen ich wäre neben ihr gewesen',
    k11: 'das geld war meins. das loch in ruths büchern. das war für mich. ich wusste nicht wo es herkam und ich hab nicht gefragt und das ist dasselbe wie es zu wissen oder',
    k12: 'mach was du machen musst. ich werde kein zweites mal sagen dass es nicht stimmt',

    // ---------------------------------------------------------- t-mairi-again
    n1: 'Er hat mit dir gesprochen. Ich merke es daran, wie lange du mir nicht geantwortet hast.',
    n2: 'Also gut. Ich bin hinaus zu Ardnoe Point gelaufen. Ich habe das Café gesagt, weil das Café einfacher ist und weil man eine Sache, die man einem Polizisten einmal gesagt hat, weiter sagen muss.',
    n3: 'Ich bin bis zum Tor gekommen und habe kehrtgemacht. Ich konnte es nicht. Ich bin den langen Weg nach Hause gegangen, damit niemand mein Gesicht sieht.',
    n4: 'das tor',
    n5: 'Das Tor. Nicht die Tür. Ich bin der Tür nicht nahe gekommen.',
    n6: 'Sie wollte ihn mir wegnehmen. Nicht das Geld: das Geld hätte sie haben können, ich hätte das Café verkauft. Sie wollte seinen Namen da hineinschreiben.',
    n7: 'Vierzig Jahre kenne ich sie, und sie konnte mir den einen Morgen nicht geben.',
    n8: 'Was mein Sohn dir auch erzählt hat, er war im Dunkeln an der Bootsrampe, und der Lichtstrahl spielt einem da draußen Streiche. Frag wen du willst. Frag ihn morgen noch einmal.',
    n9: 'Und es gibt eine Sache, die ich niemandem gesagt habe, weil es klingt, als würde ich mir eine Ausrede bauen. Ein Mann, der sich the Keeper nannte, hat in der Nacht im Café angerufen. Halb zehn, ungefähr.',
    n10: 'Er sagte, er sei von der Prüfstelle. Er sagte, Ruth habe die Unterlagen schon hinuntergeschickt, die Sache sei jetzt nicht mehr in ihrer Hand, und Callums Name werde bis Montag darauf stehen, ganz gleich was irgendwer tue.',
    n11: 'Ich habe ihn nie nach seinem Namen gefragt. Ich habe nie gefragt, woher er die Nummer vom Café hatte. Er hat mich zu nichts gedrängt, er hat kaum ein Wort gesagt, und ich habe aufgelegt und meinen Mantel geholt. Mach daraus, was du willst. Ich habe aufgehört, es zu versuchen.',
  },

  /**
   * The chips are 24-hour digits in both languages and must stay digit for digit
   * identical to the English: this is the board the player lays the village out
   * on, and `Bootsrampe` against `Café` at overlapping minutes is the first
   * thing they prove.
   */
  claims: {
    'c-ruth-tower': 'Ruth: oben im Turm, 20:45–22:30',
    'c-callum-ferry': 'Callum: auf der Fähre, 19:00–20:00',
    'c-you-ferry': 'Du: auf der letzten Fähre, 19:00–20:00',
    'c-callum-slip': 'Callum: an der Bootsrampe, 21:40–22:15',
    'c-papers-kept': 'Ruth: hatte die Unterlagen der Stiftung noch, ab 20:45',
    'c-mairi-cafe': 'Mairi: im Café, 20:30–23:00',
    'c-callum-cafe': 'Callum: im Café, 21:00–23:00 (laut Mairi)',
    'c-you-cafe': 'Du: im Café, 21:05–21:30 (laut Mairi)',
    'c-mairi-cashing': 'Mairi: beim Abrechnen, 22:35–23:00',
    'c-esme-cottage-late': 'Fiona: im Häuschen, 23:00–24:00 (laut Mairi)',
    'c-esme-cottage': 'Fiona: im Häuschen, 19:00–21:30',
    'c-esme-path': 'Fiona: auf dem Klippenpfad, 21:40–22:10',
    'c-ruth-lamp': 'Ruth: oben im Turm, 21:40–22:00 (laut Fiona)',
    'c-mairi-path': 'Mairi: auf dem Klippenpfad, 21:45–22:00 (laut Fiona)',
    'c-papers-sent': 'Ruth: hatte die Unterlagen schon abgeschickt, 20:00–23:00 (laut einem Anrufer)',
    'c-mairi-door': 'Mairi: an der Leuchtturmtür, 22:05–22:15 (laut Callum)',
  },

  motives: {
    'm-trust':
      'Sie hatte zwei Jahre lang Geld aus der Leuchtturmstiftung Ardnoe genommen, um Callums Schulden zu decken, und Ruth hatte in der Woche das Loch in den Büchern gefunden.',
  },

  contradictions: {
    'x-callum-alibi':
      'Callum kann nicht gleichzeitig an der Bootsrampe eine Leine repariert und im Café seiner Mutter gesessen haben. Er hat sich selbst an die Bootsrampe gestellt, freiwillig, vor allen, bevor sie etwas anderes sagte: also ist die falsche Hälfte ihre. Sie hat ihrem Sohn ein Alibi gegeben, um das er nie gebeten hat, und das heißt, sie brauchte es, dass ihn niemand fragt.',
    'x-mairi-path':
      'Sie hat sich selbst von halb neun bis elf hinter den Tresen gestellt. Um 21:47 kam ihr auf dem Klippenpfad eine Frau mit einem Beobachtungsprotokoll und ohne eigenes Interesse an der Sache entgegen, mit einem Mantel über dem Kopf. Das Café war kein Alibi. Es war ein Ort, an den sie sich stellen konnte.',
    'x-papers-lie':
      'Die Prüfstelle hatte diese Unterlagen nie. Ruth hat alles hinten in ihr Logbuch geschrieben, und das Logbuch lag noch oben im Turm, wo sie es hingelegt hatte. Der Mann, der sich the Keeper nannte und um halb zehn im Café anrief, war also nicht von der Stiftung, er hatte überhaupt nichts von der Stiftung zu wissen, und was er Mairi Bell erzählt hat, war kein Irrtum. Er wusste, was eine Frau, der noch eine Nacht blieb, damit machen würde.',
    'x-mairi-door':
      'Der Weg konnte immer noch ein Spaziergang gewesen sein, um den Kopf frei zu bekommen. Die Tür kann das nicht. Um zehn nach zehn stand sie am Fuß des Turms, angeleuchtet von der Lampe ihrer eigenen Freundin, in der Minute, in der Ruth aufhörte zu antworten, und eine Stunde bevor sie nach Hause kam und einen Mantel wusch, den sie in ihrem Leben noch nie nachts gewaschen hatte.',
  },

  confrontation: {
    opening:
      'Ich habe mich gefragt, wie lange du brauchst. Dann setz dich. Sag es richtig, mir ins Gesicht, und sei dir sehr sicher, bevor du es tust.',
    beats: {
      'b-alibi': {
        press:
          'Du hast allen erzählt, Callum wäre mit dir im Café gewesen. Er war an der Bootsrampe, und er hat es zuerst gesagt, vor dem ganzen Dorf.',
        rebuttal:
          'Eine Frau bringt nach so einem Schock einen Abend durcheinander. Das ist kein Verbrechen, und das weißt du auch.',
      },
      'b-path': {
        press:
          'Du hast dich selbst von halb neun bis elf hinter diesen Tresen gestellt. Fiona Trian ist dir um 21:47 auf dem Klippenpfad begegnet und hat die Uhrzeit aufgeschrieben.',
        rebuttal:
          'Dann bin ich eben gelaufen. Menschen laufen. Es war die erste ruhige halbe Stunde seit einer Woche, und ich wollte Luft.',
      },
      'b-door': {
        press:
          'Du hast gesagt, du hast am Tor kehrtgemacht. Callum hat dich um zehn nach zehn an der Leuchtturmtür gesehen. Er hat dich in ihrem eigenen Lichtstrahl gesehen.',
        rebuttal:
          'Er war durchnässt und es war dunkel und dieses Licht spielt einem Streiche. Frag doch wen du willst.',
      },
      'b-why': {
        press:
          'Sie hat in der Woche das Loch in den Büchern der Stiftung gefunden. Zwei Jahre davon. Und dein Sohn steckte darin.',
      },
    },
    deflections: [
      'Das beweist rein gar nichts.',
      'Du bist sechs Jahre weg gewesen. Du weißt gar nicht, was du da vor dir hast.',
      'Sag etwas, das etwas bedeutet.',
    ],
    confession:
      'Sie stand oben an der Treppe, den Ordner in der Hand, und sie wollte ihn nicht weglegen.\n\nIch wollte nur den Morgen. Einen Morgen, um das Geld irgendwo aufzutreiben, damit sein Name nie da hineinkommt. Sie sagte, sie habe es schon aufgeschrieben.\n\nIch habe nichts entschieden. Ich gehe es seitdem jede Stunde durch, und ich finde den Moment nicht, in dem ich es entschieden habe.\n\nDieser Mann am Telefon. Kein einziges Mal hat er ihren Namen gesagt, und kein einziges Mal hat er ein Wort davon gesagt, ihr etwas anzutun. Er hat mich gefragt, was ich jetzt tun werde, und ich habe es ihm erzählt, alles, laut, so wie man das um halb zehn abends jemandem erzählt, den man nie treffen wird.\n\nUnd er hat mich ausreden lassen. Er hat mich die ganze Zeit kein einziges Mal unterbrochen.\n\nDann sagte er: dann weißt du es ja schon.\n\nUnd er legte auf, und ich holte meinen Mantel.',
  },

  coda: {
    from: 'Unbekannte Nummer',
    messages: [
      'Ardnoe war gute Arbeit. Vier Tage. Ich hatte zwei Wochen angesetzt, und so weit liege ich selten daneben.',
      'Beim Sohn warst du langsam. Er hätte es dir sowieso erzählt. Er hatte seit Dienstag darauf gewartet, dass ihn jemand richtig fragt.',
      'Diese Nummer werde ich nicht wieder benutzen. Glückwunsch. Das meine ich ernst.',
    ],
  },

  epilogue:
    'Sie hat es nicht bestritten, als sie kamen. Sie hat gefragt, ob Callum in einem Raum aufstehen und es laut sagen müsste, und als sie ihr sagten, dass er das müsste, hat sie alles selbst erzählt, damit er es nicht muss.\n\nDer Stiftung fehlten elftausend Pfund. Ruth hatte alles hinten in das Logbuch geschrieben, mit eigener Hand, mit dem Datum, an dem sie zur Polizei gehen wollte. Darunter hatte sie außerdem geschrieben: „M. ist meine Freundin, seit wir fünf waren. Bittet sie, freundlich zu ihr zu sein.“\n\nIn dem Winter haben sie die Lampe ausgebaut. Vierzig Jahre lang war niemand gebeten worden, daneben zu stehen.',
};
