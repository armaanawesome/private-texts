import type { CaseTranslation } from '../caseText';

/**
 * Case 6 — "Die Langstrecke". German. Second arc connection.
 *
 * Five things this had to get right, in this order.
 *
 * 1. `the Keeper`, twice, and both mentions carry weight. Once in the confession
 *    where Graham describes the call, and once in the coda where the caller
 *    dares the player to ask how he knew. English article kept, as everywhere:
 *    a bare `der Keeper` is German for a goalkeeper, and this is the second pack
 *    where a player is supposed to feel the floor move. arcAlias.test.ts counts.
 *
 * 2. The uniform is the alibi, so the words for the kit have to be as
 *    interchangeable in German as the kit is on the water. `Anzug`, `Mütze`,
 *    `Rennkleidung`, `Seniorenanzug` — the same handful, reused, because the
 *    point is that eight people are indistinguishable and the prose should feel
 *    that way too. `Welche acht, zählt nie jemand.`
 *
 * 3. Times, and one of them is doing something unusual. Nearly every time here
 *    is spoken: `zehn Uhr fünfzig`, `zwanzig nach elf`, `drei nach`, `zwanzig
 *    nach zehn`. Warren says the one that matters — `elf Uhr acht` — in words
 *    too, because the English says "eleven oh eight" in words, and that is the
 *    difference between a man reading a burned-in timecode aloud and a machine
 *    printing it. The digits appear only where the English puts them: the four
 *    years (2011, 2013, 2016, 2014), the 2009 the whole case rests on, and the
 *    single `11:08` in `x-saul-slipway`, which is the proof rather than the
 *    telling of it.
 *
 * 4. Names. Pauline Vaine, Graham Brightwell, Warren Ako, Carol Prentice, Em /
 *    Emma Kerr, Robbie and Dorothy Nance, Ken Wardle and Ravensholt all keep
 *    theirs. Places translated and bare so German declension cannot split one
 *    place into two:
 *
 *      club      → Verein         bar   → Bar im Vereinsheim
 *      boathouse → Bootshaus      river → Fluss
 *      bank      → Uferweg        slipway → Slipanlage
 *
 *    `Uferweg` rather than `Treidelpfad`: the towpath in this case is where
 *    forty-one members stand and shout, not a historic haulage path, and every
 *    one of the four claims that touch it has to read naturally on a chip.
 *    `Slipanlage` is where boats go down to the water and is the word a German
 *    club actually uses. Every one of these is spoken in the prose as well as
 *    printed on a chip, which is the thing the Spanish Deep Field got wrong.
 *
 * 5. Voice. Six people, three of them lowercase, and the separation is
 *    vocabulary rather than casing:
 *
 *      Pauline — capitals and full stops. Nineteen years of signing minutes by
 *                hand, and she writes like it.
 *      Carol   — capitals and full stops as well, separated from Pauline by
 *                subject: Pauline handles documents, Carol reports what she saw
 *                and keeps apologising for her own eyesight.
 *      Graham  — capitals, and never a full stop at the end. The captain-s
 *                register: he states positions and closes discussions.
 *      Warren  — lowercase, and the only technical vocabulary in the case.
 *                `Timecode`, `Schlagzahl`, `Einbeinstativ`, `schwenken`. He
 *                thinks in equipment.
 *      Em      — lowercase, nineteen, `sorry` twice in her first message, and
 *                clipping (`hab`, `is`). She apologises where Warren explains.
 *      Du      — lowercase including nouns, short, and no clipping at all.
 *
 * Two names in the epilogue are stale in the source and are translated as they
 * stand: `Pauline Vaine` for Pauline and `Emma Kerr` for Emma. That is the
 * third pack with this — Deep Field says `Orla`, `Pilar` and `Rune` for Laura,
 * Maria and Erik, and The Wake says `Bridie` for Eileen. All look like renames
 * that missed the epilogue. Flagged rather than fixed, because the fix belongs
 * in the English where every language gets it at once.
 */
export const theLongCourseDe: CaseTranslation = {
  title: 'Die Langstrecke',
  blurb:
    'Acht Menschen in derselben Kleidung, auf dem Wasser, zweiundzwanzig Minuten lang. Die Aufnahmen beweisen, dass acht in diesem Boot saßen. Welche acht, können sie nicht beweisen.',

  characters: {
    you: 'Du',
    hester: 'Pauline',
    saul: 'Graham',
    imo: 'Em',
    warren: 'Warren',
    dilys: 'Carol',
  },

  places: {
    club: 'Verein',
    boathouse: 'Bootshaus',
    bank: 'Uferweg',
    slipway: 'Slipanlage',
    bar: 'Bar im Vereinsheim',
    river: 'Fluss',
  },

  threads: {
    't-hester': 'Pauline',
    't-club': 'Ravensholt RC',
    't-dilys': 'Carol Prentice',
    't-imo': 'Em',
    't-warren': 'Warren Ako',
  },

  briefing: {
    causeOfDeath: 'Stumpfe Gewalt. Ein Riggerschlüssel aus dem Regal neben den Toren.',
    ruling:
      'Offen. Niemand wurde festgenommen, weil einundvierzig Mitglieder auf dem Uferweg waren und der Senioren-Achter auf dem Wasser.',
    opening:
      'Pauline Vaine war neunzehn Jahre lang Vorsitzende des Ruderclubs Ravensholt und hat jedes Protokoll im Schrank mit der Hand unterschrieben.\n\nGefunden wurde sie um zehn nach zwölf im Bootshaus, am Morgen der Herbstlangstrecke, die Tore offen und die Regale halb leer.\n\nDer Senioren-Achter war von elf bis zwanzig nach auf dem Wasser. Jeder Einzelne von ihnen hat dasselbe Alibi, und jeder Einzelne von ihnen trägt es am Leib.',
  },

  messages: {
    // --------------------------------------------------------------- t-hester
    x1: 'An Dorothy Nance wirst du dich nicht erinnern. Sie war 2011 beim Vereinsessen und hat das Ganze durchgesessen und nichts gegessen.',
    x2: 'robbies mutter',
    x3: 'Sie ist im März gestorben, und ihre Schwester räumt das Haus aus, und sie hat mir eine Kiste geschickt, weil mein Name in den Protokollen steht.',
    x4: 'Das Ausfahrtsbuch für die Woche liegt darin. Das Original, nicht das, was zur Untersuchung ging. Es sind nicht dieselben Bücher, und ich habe seit Dienstag beide auf diesem Tisch.',
    x5: 'inwiefern anders',
    x6: 'Der Untersuchung wurde gesagt, Ken Wardle habe die Boote an dem Morgen ausgetragen. Ken hatte 2013 einen Schlaganfall und ist 2016 gestorben und konnte da niemandem mehr widersprechen.',
    x7: 'Im Original steht S. Brightwell in der Dienstspalte, in seiner eigenen Handschrift, für den Samstag. Er war vierundzwanzig und die einzige qualifizierte Person am Ufer, und der Fluss stand zwei Fuß höher.',
    x8: 'was wirst du machen',
    x9: 'Es am Montag der Untersuchungsbehörde geben. Und es Graham am Samstag sagen, bevor ich das tue, weil ein Mensch ein Recht darauf hat, es von einer Person zu hören und nicht aus einem Brief.',
    x10: 'pauline mach das nicht allein in einem leeren bootshaus',
    x11: 'Neun Uhr, und die Bar ist voller Eltern. Ich habe das Buch in der Tasche und ich mache es nach dem Seniorenrennen, wenn es hier ruhig ist.',

    // ----------------------------------------------------------------- t-club
    c1: 'Die Mitglieder werden inzwischen gehört haben, dass Pauline gestern Nachmittag im Bootshaus gefunden wurde. Ich soll ausrichten, dass die Polizei mit allen sprechen möchte, die auf dem Gelände waren, und dass der Verein bis auf Weiteres geschlossen bleibt. Es tut mir leid, dass ich es so nüchtern sage, ich weiß keinen besseren Weg.',
    c2: 'neunzehn Jahre. sie hat der Hälfte von euch das Blattdrehen beigebracht',
    c3: 'Falls es irgendjemandem etwas nützt, der Senioren-Achter war um zehn Uhr fünfzig auf dem Wasser und wir haben das Ufer erst um zwanzig nach elf wieder berührt. Acht von uns. Damit sind zumindest acht Leute erklärt',
    c4: 'ich habe das ganze Rennen vom Ufer gefilmt. von Bug bis Heck, beide Ufer, von Anfang bis Ende. die Polizei hat die Karte',
    c5: 'Dann wäre das ja geklärt. Warren hat acht von uns das ganze Fenster über auf Video und Carol hat den Uferweg',
    c6: 'Ich war von zwanzig vor elf bis fast Mittag mit der Einweisungstafel auf dem Uferweg, was leider bedeutet, dass ich sehr viel von allen gesehen habe und sehr wenig von irgendetwas.',
    c7: 'Und wo war Warren in der Mitte davon. Weil er um halb zehn an den Böcken einen Streit mit Pauline hatte, den der halbe Verein gehört hat',
    c8: 'wir haben uns über eine Juniorenprüfung gestritten. darüber haben wir uns gestritten. sag den Rest laut, graham',
    c9: 'Nicht hier. Bitte.',

    // ---------------------------------------------------------------- t-dilys
    d1: 'Du hast hier gerudert, nicht wahr. Zwei, und Pauline hat gesagt, du hattest die schlimmsten Hände, die sie je verbunden hat, und den besten Kopf, den sie je vergeudet hat.',
    d2: 'Ich stehe bei jeder Langstrecke an derselben Stelle, oben an der Slipanlage, wo die Tafel steht, weil ich den Weg hinunter zum Start nicht mehr schaffe. Das heißt, ich sehe alle zweimal vorbeigehen.',
    d3: 'hast du warren gesehen',
    d4: 'Warren Ako war das ganze Rennen über mit dieser Kamera auf einem Einbeinstativ auf dem Uferweg und hat eine Mannschaft angebrüllt, die ihn nicht hören konnte, was, soweit ich das beurteilen kann, das ganze Trainerwesen ist. Er hat sich eine halbe Stunde nicht bewegt.',
    d5: 'Und Pauline ist kurz vor elf mit ihrer Tasche ins Bootshaus gegangen, und sie ist nicht herausgekommen, solange ich hingesehen habe, und ich habe eine Stunde lang auf diese Tore gesehen, ohne ein einziges Mal an sie zu denken.',
    d6: 'ist sonst jemand reingegangen',
    d7: 'Graham Brightwell, ungefähr drei nach, in seiner Rennkleidung. Ich weiß es noch, weil ich dachte, er sei wegen eines Schlüssels zurückgegangen, und mehr habe ich mir dabei nicht gedacht, und seitdem denke ich an nichts anderes mehr.',
    d8: 'er sagt er war im boot',
    d9: 'Alle in dieser Mannschaft tragen denselben Anzug und dieselbe Mütze, und ich bin neunundsiebzig. Genau das habe ich dem Beamten gesagt, und er hat es aufgeschrieben, und ich konnte hören, wie er entschied, dass ich nichts tauge.',
    d10: 'Frag Emma Kerr. Sie ist Juniorin und stand um halb elf in Seniorenkleidung in der Umkleide, und Juniorinnen tragen keine Seniorenkleidung, und sie ist sehr rot geworden, als ich ihr guten Morgen gesagt habe.',

    // ------------------------------------------------------------------ t-imo
    g1: 'sorry dass ich so lange nicht geantwortet hab. sorry. ich sitze hier und starre das an',
    g2: 'ich bin bei der Langstrecke auf Platz fünf im Senioren-Achter gerudert. ich bin neunzehn und hab in meinem Leben noch nie in dem Boot gesessen',
    g3: 'wer hat dich gefragt',
    g4: 'graham. um zwanzig nach zehn an den Böcken. sagte, sein Rücken sei beim Aufwärmen weg gewesen und es sei keine Zeit, die Mannschaft zurückzuziehen, und ob ich nicht einfach einsteige und kein Ding draus mache',
    g5: 'er hat mir seinen Anzug und seine Mütze gegeben. ich hab gesagt, was ist mit der Meldung, und er hat gesagt, die Meldungen macht carol und carol ist neunundsiebzig',
    g6: 'und du hast ja gesagt',
    g7: 'ich will seit ich elf bin in dem Boot sitzen. das wusste er. das wissen alle. das ist keine Entschuldigung, ich sage dir nur den echten Grund',
    g8: 'und dann war pauline tot und graham hat in den Gruppenchat geschrieben, dass acht von uns auf dem Wasser waren, und mir wurde klar, dass uns niemand zählen würde',
    g9: 'er hat allen erzählt, ich wäre mit dem Ersatzmaterial am Uferweg gewesen. das ist der Teil, von dem mir schlecht wurde. er benutzt mich nicht nur, er sagt auch, wo ich war',
    g10: 'ich verliere den Verein, oder. das ist das, woran ich immer hängen bleibe, und ich weiß, wie das klingt, wo sie tot ist',

    // --------------------------------------------------------------- t-warren
    w1: 'er hat mich vor dem ganzen Verein in dieses Bootshaus gestellt. vierzig Sekunden hat er dafür gebraucht. ich trainiere hier seit elf Jahren',
    w2: 'das video',
    w3: 'einunddreißig Minuten am Stück. ich stoppe nicht, man kann nicht stoppen, sonst verliert man die Schlagzahl. und zwischen den Mannschaften schwenke ich aus Gewohnheit über das Ufer',
    w4: 'elf Uhr acht. ich schwenke ungefähr vier Sekunden vom Wasser weg und da steht einer an der Slipanlage in einem Seniorenanzug, die Mütze ab. das ist graham. Haare, Statur, das Tape am linken Handgelenk, das er seit April trägt',
    w5: 'vier Sekunden. ich habe es inzwischen ungefähr zweihundert Mal angesehen und der Timecode ist von der Kamera eingebrannt, das ist nichts, was ich getippt habe',
    w6: 'warum hattest du streit mit pauline',
    w7: 'weil ich em für das Frühjahr im Seniorenboot haben wollte und pauline gesagt hat, nicht solange graham dessen Kapitän ist. ich dachte, sie meint, em ist nicht so weit. sie meinte etwas anderes und konnte es noch nicht sagen',
    w8: 'sie hat mich im August gefragt, in welchem Jahr ich angefangen habe. ich habe 2014 gesagt. sie hat gut gesagt und ist weggegangen, und ich habe mir vier Monate lang nichts dabei gedacht',
    w9: 'ich habe gestern Abend robbie nance nachgeschlagen. fünfzehn. am Start steht eine Bank mit seinem Namen drauf und ich brülle seit elf Jahren Zwischenzeiten darüber hinweg',
  },

  /**
   * Two chips carry the identical window on purpose — `c-saul-river` and
   * `c-imo-river` are both 11:00–11:22, because both of them claim the same
   * seat in the same boat. That is the case.
   */
  claims: {
    'c-hester-bar': 'Pauline: in der Bar im Vereinsheim, 10:00–10:40',
    'c-saul-river': 'Graham: auf dem Fluss im Achter, 11:00–11:22',
    'c-dilys-bank': 'Carol: auf dem Uferweg, 10:40–11:40',
    'c-warren-boathouse': 'Warren: im Bootshaus, 11:02–11:18 (laut Graham)',
    'c-warren-bank': 'Warren: auf dem Uferweg, 10:55–11:30 (laut Carol)',
    'c-hester-boathouse': 'Pauline: im Bootshaus, 10:50–11:22 (laut Carol)',
    'c-saul-boathouse': 'Graham: im Bootshaus, 11:03–11:08 (laut Carol)',
    'c-imo-river': 'Em: auf dem Fluss im Achter, 11:00–11:22',
    'c-imo-bank': 'Em: mit dem Ersatzmaterial auf dem Uferweg, 10:55–11:25 (laut Graham)',
    'c-saul-slipway': 'Graham: an der Slipanlage, 11:08–11:14 (auf Video)',
  },

  motives: {
    'm-nance':
      'Im ursprünglichen Ausfahrtsbuch steht S. Brightwell in der Dienstspalte für den Samstag, an dem Robbie Nance 2009 ertrunken ist, nicht der tote Trainer, den man der Untersuchung gegeben hat. Pauline hatte beide Bücher auf ihrem Tisch und wollte sie am Montag zur Untersuchungsbehörde bringen.',
  },

  contradictions: {
    'x-saul-boathouse':
      'Er hat sich selbst von elf bis zwanzig nach auf das Wasser gestellt, mit sieben Zeugen im selben Boot. Carol Prentice stand eine Stunde lang oben an der Slipanlage und hat ihn um drei nach in Rennkleidung in dieses Bootshaus gehen sehen und dachte, er sei wegen eines Schlüssels zurückgegangen.',
    'x-imo-seat':
      'Er hat dem Verein erzählt, Emma Kerr sei mit dem Ersatzmaterial auf dem Uferweg gewesen. Sie saß auf Platz fünf, in seinem Anzug und seiner Mütze, weil er sie um zwanzig nach zehn an den Böcken gefragt hat und sie diesen Platz haben will, seit sie elf ist. Acht Menschen sind in diesem Boot rausgefahren und acht sind zurückgekommen. Welche acht, zählt nie jemand.',
    'x-saul-slipway':
      'Warren Ako filmt die ganzen einunddreißig Minuten ohne Unterbrechung, weil Stoppen die Schlagzahl kostet. Um 11:08 schwenkt er vier Sekunden vom Wasser weg, und da steht ein Mann an der Slipanlage in einem Seniorenanzug, die Mütze ab, mit einem Tape am linken Handgelenk, das seit April da ist. Der Timecode ist von der Kamera eingebrannt.',
    'x-warren-bank':
      'Graham hat Warren vor dem ganzen Verein in vierzig Sekunden in das Bootshaus gestellt, auf der Grundlage eines Streits über eine Juniorenprüfung. Warren hat sich eine halbe Stunde nicht von diesem Uferweg wegbewegt, und Carol hat ihm dabei zugesehen, wie er sich nicht bewegt hat, und das Video, das er dabei gemacht hat, ist das, was die Sache beendet.',
  },

  confrontation: {
    opening:
      'Neunzehn Jahre hat sie diesen Verein geführt, und jetzt sitzt ein Polizist in ihrem Büro und geht die Protokollbücher durch. Sag, wozu du gekommen bist.',
    beats: {
      'l-boathouse': {
        press:
          'Du hattest dich selbst ab elf auf dem Wasser. Carol hat dich um drei nach in Rennkleidung in dieses Bootshaus gehen sehen und dachte, du seist wegen eines Schlüssels zurückgegangen.',
        rebuttal:
          'Sie ist neunundsiebzig und jeder Einzelne von uns ist identisch gekleidet. Das hat sie selbst gesagt, zu einem Polizisten, mit genau diesen Worten.',
      },
      'l-seat': {
        press:
          'Du hast dem Verein erzählt, Em sei mit dem Ersatzmaterial am Ufer gewesen. Sie saß in deinem Anzug auf Platz fünf, weil du sie an den Böcken gefragt hast und sie dieses Boot haben will, seit sie elf ist.',
        rebuttal:
          'Eine Juniorin, die ohne Meldung in einer Seniorenmannschaft gesessen hat und drei Tage damit zugebracht hat, sich zu überlegen, wie sie dafür nicht rausgeworfen wird. Natürlich hat sie jetzt eine Geschichte.',
      },
      'l-slipway': {
        press:
          'Warren stoppt die Kamera nicht, weil Stoppen die Schlagzahl kostet. Elf Uhr acht, vier Sekunden, ein Mann an der Slipanlage, die Mütze ab und das Tape am linken Handgelenk. Der Timecode ist von der Kamera eingebrannt.',
      },
      'l-why': {
        press:
          'Und in dem Ausfahrtsbuch, das aus Dorothy Nances Haus kam, steht dein Name in der Dienstspalte für diesen Samstag. Nicht Ken Wardle. Pauline hatte beide Bücher auf ihrem Tisch und wollte am Montag zur Untersuchungsbehörde.',
      },
    },
    deflections: [
      'Das ist ein Verein voller Leute, die sich seit dreißig Jahren kennen. Jeder hat eine Version.',
      'Du warst nicht mehr hier unten, seit du aufgehört hast zu rudern. Du weißt nicht, was dieser Ort ist.',
      'Komm wieder, wenn du etwas hast, das nicht das Augenlicht von jemandem ist.',
    ],
    confession:
      'Der Fluss stand zwei Fuß höher und ich habe sie trotzdem rausgeschickt, weil wir am Wochenende darauf eine Prüfung hatten und ich vierundzwanzig war und dachte, zwei Wochen ohne Training wären das Schlimmste, was einem Menschen passieren kann.\n\nRobbie hat mich gebeten, nicht rauszufahren. Auf dem Steg, vor zwei anderen Jungen. Er hat gesagt, das Wasser sieht schnell aus, und ich habe gesagt, das Wasser sieht immer schnell aus, und er ist gefahren, weil ich es ihm gesagt habe.\n\nKen Wardle hat drei Tage später seinen Namen in diese Spalte gesetzt. Ich habe ihn nicht darum gebeten. Er hat es getan, und er hat mir gesagt, dass er es getan hat, und ich habe nichts gesagt, und das ist meine ganze Verteidigung und sie ist nichts wert.\n\nSie ist ins Bootshaus gekommen, um es mir zuerst zu sagen. Sie hat gesagt, ein Mensch hat ein Recht darauf, es von einer Person zu hören. Neunzehn Jahre, und sie hat immer noch gedacht, so macht man das.\n\nUnd es gibt noch eine Sache, und ich sage sie, weil du sie irgendwann sowieso hörst.\n\nEin Mann, der sich the Keeper nannte, hat mich am Donnerstag angerufen. Er sagte, er sei von der Untersuchungsbehörde und mache eine Nachprüfung, und ob ich ein paar Angaben von 2009 bestätigen könne. Und dann hat er über diesen Morgen geredet, als hätte er dabei am Ufer gestanden.\n\nEr wusste, dass Robbie darum gebeten hat, nicht zu fahren. Das stand nie in der Untersuchung. Das stand nie in der Zeitung. Zwei Jungen haben es gehört und keiner von beiden hat es je laut gesagt, ich habe das geprüft, ich habe es damals geprüft und ich habe es seitdem geprüft.\n\nEr hat es zu mir gesagt wie einer, der mich an etwas erinnert, bei dem wir beide dabei waren.\n\nUnd dann hat er mich gefragt, was Pauline am Montag vorhat. Und ich habe es ihm gesagt. Ich saß in meiner Küche und habe einer Stimme am Telefon genau gesagt, was sie vorhatte und genau wann, und er hat mir kein einziges Mal irgendetwas gesagt.',
  },

  coda: {
    from: 'Unbekannte Nummer',
    messages: [
      'Ravensholt. Acht in einem Boot und niemand zählt. Das ist ein gutes, und ich habe es nicht kommen sehen, was mir inzwischen selten passiert.',
      'Du warst freundlich zu dem Mädchen. Das ist mir aufgefallen. Es hat dich zwei Tage gekostet, und ich hätte sie nicht ausgegeben.',
      'Frag dich, woher the Keeper, der eine Untersuchung von 2009 nachprüft, wusste, was ein Fünfzehnjähriger auf einem Steg gesagt hat. Zwei Jungen haben es gehört. Keiner von beiden hat es je wiederholt.',
      'Du kommst der falschen Frage näher. Mach trotzdem weiter.',
    ],
  },

  epilogue:
    'Die Untersuchung von 2009 wurde im Frühjahr wieder aufgenommen, auf der Grundlage eines Ausfahrtsbuchs, das sechzehn Jahre in einer Kiste im Gästezimmer von Dorothy Nance gelegen hatte.\n\nEmma Kerr wurde nicht rausgeworfen. Carol Prentice ist mit einer schriftlichen Erklärung vor den Vorstand getreten, ist völlig davon abgekommen und hat zum Schluss gesagt, der Verein habe eine Neunzehnjährige vor die Wahl zwischen einem Boot und einem Mann gestellt, und der Verein könne sich schwerlich darüber beschweren, wofür sie sich entschieden hat. Em ist im Frühjahr für die Senioren auf Platz fünf gerudert, mit Meldung.\n\nWarren Ako hat der Polizei einunddreißig ununterbrochene Minuten Fluss gegeben und vier Sekunden Slipanlage.\n\nPauline Vaines Tasche lag die ganze Zeit unter den Böcken. Beide Bücher waren noch darin. Sie hatte eine Büroklammer an die Seite gesteckt und mit Bleistift an den Rand geschrieben: Graham zuerst sagen.',
};
