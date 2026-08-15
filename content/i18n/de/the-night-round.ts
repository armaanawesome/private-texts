import type { CaseTranslation } from '../caseText';

/**
 * Case 3 — "Die Nachtrunde". German. The last free case, and the first arc
 * connection.
 *
 * Five things this had to get right, in this order.
 *
 * 1. `the Keeper`, once, in the confession, and this is the pack the whole arc
 *    is aimed at. A player met the name in Pack 1 and is supposed to feel the
 *    floor move here, so it is written exactly as it is written there:
 *    `the Keeper`, English article and all.
 *
 *    German makes that less obvious than it looks. `der Keeper` is already a
 *    German word — it is what you call a goalkeeper — so `ein Mann, der sich der
 *    Keeper nannte` reads as "a man who called himself the goalie", which is
 *    funny in the one paragraph of the game that must not be. `der Wärter`, `der
 *    Hüter` and `der Leuchtturmwärter` all throw the recognition away, and the
 *    last is doubly wrong here because there is no lighthouse within a hundred
 *    miles of Marchbank. Keeping the English article marks it as a foreign name
 *    rather than a German noun, and keeps the string byte-identical across
 *    locales. One mention in the English, one here; `arcAlias.test.ts` counts.
 *
 * 2. The caller says `Sie` to Ali, and this is the one deliberate exception to
 *    the `du` rule in this pack.
 *
 *    He is not a friend. He is a stranger on the telephone claiming to be from
 *    the continuing care team, and the entire trick is that Ali believed him. A
 *    German care official phoning a resident-s daughter says `Sie` without
 *    thinking about it; if he says `du` he does not sound official at all, and
 *    the reason she took the call seriously stops existing. So his two quoted
 *    lines use `Sie` and everything else in the pack uses `du`.
 *
 *    The coda is `du` again, because there he is texting the player directly and
 *    has dropped the disguise. He speaks to each person in whatever register
 *    works on them, and in German that is visible on the page.
 *
 * 3. Times. The night is the case: signed out at 21:40, the round at 23:00 that
 *    was never walked, the door at 23:30, the fob at 23:47. British `half ten`
 *    is 22:30 and German `halb elf` is the same minute, so the idiom moves and
 *    the minute does not — likewise `half eleven` to `halb zwölf` at Ivy-s door.
 *    Only three things stay digits, and all three are machines or records rather
 *    than memories: the 23:47 fob reading, the year 2021 on the power of
 *    attorney, and the `7` in the last line Ivy ever wrote in her ledger.
 *
 * 4. Names. Ivy, Ali (Alison Reid), Margo Adeyemi, Teddy Balfour, Claire Nolan,
 *    Marchbank House, Lagos and Kilmarnock all keep theirs. Descriptive places
 *    are translated, bare where German would otherwise decline them:
 *
 *      marchbank → Marchbank House    desk    → Nachtdienstplatz
 *      ivyroom   → Ivys Zimmer        carpark → Parkplatz
 *      corridor  → Flur im ersten Stock
 *      dayroom   → Aufenthaltsraum    fenhouse → Alis Haus
 *
 *    The fob is `Transponder` everywhere — chip, message, contradiction and
 *    confrontation beat — because `x-fen-carpark` is the proof that is a machine
 *    rather than a person, and a second word for it would be a second machine.
 *
 * 5. Voice, and Pack 3 needed no rescue where Pack 1 did.
 *
 *    The Lighthouse leaned hard on lowercase, with three voices sharing it, and
 *    German noun capitalisation flattened that. This cast inverts it: four of
 *    the six write standard prose with full stops, and only the player is
 *    lowercase. So the casing axis was never carrying the weight here and loses
 *    nothing in German. What carries it instead:
 *
 *      Margo — capitalised like the others, and the only voice that never ends a
 *              message with a full stop. She runs on, she uses `!!`, she
 *              apologises. That marker is punctuation, not casing, so it crosses
 *              into German untouched.
 *      Teddy — the shortest sentences in the pack and the only person who gives
 *              a time to the minute without being asked. Forty one years a
 *              Baukalkulator, and he types like a man reading off a schedule.
 *      Ivy   — long, dry, faintly old-fashioned, and funny on purpose. She keeps
 *              a ledger and her sentences are ledger-shaped.
 *      Claire — institutional German: `Nachweis`, `Zulassung`, `Bewohner`,
 *              `Gefährdungsmeldung`. Careful because she is liable.
 *      Ali   — controlled and defensive, and the only one who tells other people
 *              how to behave. Every message manages somebody.
 *      Du    — lowercase including its nouns, which in German breaks a rule the
 *              other five keep, and never more than a few words.
 *
 * `Kind` is how Ivy addresses the player, for the same reason Tom does in the
 * tutorial: every other German endearment an old woman has for a grown godchild
 * is gendered, and this seat has no gender.
 *
 * m1 names the relationship from Ivy-s side: `Ivy war deine Patentante`. That
 * genders Ivy, who is dead, female and known, and marks the player with
 * nothing.
 *
 * This line used to read `You are Ivy-s godson` and was the only place in
 * fifteen packs where the game told the player what they were. The German went
 * out as `Patenkind` rather than `Patensohn` — neuter, natural, and free, where
 * Spanish had to pick a gender because `ahijado` has no neutral form. The
 * English has since been changed to name it from the other side, so the German
 * now follows it directly instead of quietly disagreeing with it, and
 * `playerNeutral.test.ts` guards the source.
 */
export const theNightRoundDe: CaseTranslation = {
  title: 'Die Nachtrunde',
  blurb:
    'Eine Unterschrift im Nachtbuch sagt, dass um elf jemand nach ihr gesehen hat. Niemand hat es getan.',

  characters: {
    you: 'Du',
    ivy: 'Ivy',
    fen: 'Ali',
    margo: 'Margo',
    teddy: 'Teddy',
    saoirse: 'Claire',
  },

  places: {
    marchbank: 'Marchbank House',
    ivyroom: 'Ivys Zimmer',
    corridor: 'Flur im ersten Stock',
    dayroom: 'Aufenthaltsraum',
    desk: 'Nachtdienstplatz',
    carpark: 'Parkplatz',
    fenhouse: 'Alis Haus',
  },

  threads: {
    't-ivy': 'Ivy',
    't-marchbank': 'Angehörige Marchbank',
    't-margo': 'Margo',
    't-teddy': 'Teddy',
    't-saoirse': 'Claire Nolan',
  },

  briefing: {
    causeOfDeath: 'Herzversagen. Sie war vierundachtzig und hatte ein Herz.',
    ruling: 'Als natürliche Todesursache verzeichnet. Keine Obduktion von der Familie beantragt.',
    opening:
      'Ivy Rennick war seit drei Jahren in Marchbank House und hat sich täglich schriftlich darüber beschwert, bei jedem, der ihr eine Nummer gab.\n\nIhre Tochter kam am Dienstagabend zu Besuch und trug sich um zwanzig vor zehn wieder aus. Im Nachtbuch steht, dass um elf und noch einmal um zwei jemand nach Ivy gesehen hat. Gefunden wurde sie um sieben Uhr morgens, kalt, und die Familie hat keine Obduktion verlangt.',
  },

  messages: {
    // ------------------------------------------------------------------ t-ivy
    i1: 'Die Suppe war dieselbe Suppe, Kind. Ich habe es aufgeschrieben. Donnerstag und Dienstag, dieselbe Suppe, und eine davon nennen sie Brühe.',
    i2: 'du bist der einzige mensch den ich kenne der über suppe buch führt',
    i3: 'Ich führe über alles Buch. Das ärgert sie.',
    i4: 'Alison kommt um sieben. Sie hat am Telefon diese Stimme, die bedeutet, dass ich etwas unterschreiben soll.',
    i5: 'unterschreib nichts',
    i6: 'Ich habe seit März nichts unterschrieben, und das weiß sie. Das ist ja gerade das Problem.',
    i7: 'Ich bin mit Teddy im Aufenthaltsraum. Er ist gemein wegen des Kreuzworträtsels, und ich lasse es zu.',
    i8: 'Sie ist weg. Sie war fünfzig Minuten hier, und vierzig davon ging es um die Gebühren.',
    i9: 'Ruf mich morgen an, dann sage ich dir, worum sie mich gebeten hat. Ich möchte es einmal laut sagen, zu jemandem, der nicht dafür bezahlt wird, hier zu sein.',
    i10: 'gleich morgen früh. schlaf jetzt',

    // ------------------------------------------------------------ t-marchbank
    g1: 'Hiermit informieren wir die Angehörigen, dass wir Ivy Rennick in den frühen Stunden des Mittwochs verloren haben. Ihre Tochter ist verständigt und ist bei uns. Wir sagen mehr, sobald es mehr zu sagen gibt.',
    g2: 'Es tut mir so leid. Sie war zwei Jahre auf meinem Flur und hat mir kein einziges Mal etwas durchgehen lassen!! Sie wird mir sehr fehlen',
    g3: 'Danke euch allen. In ihrem Alter kam es natürlich nicht unerwartet. Wir möchten lieber keine Obduktion, und das habe ich dem Hausarzt auch gesagt, also schlägt es mir bitte niemand noch einmal vor.',
    g4: 'sie hat mir um zehn nach zehn geschrieben. um zehn nach zehn ging es ihr gut',
    g5: 'Sie war vierundachtzig. Um zehn geht es ihnen gut und um Mitternacht sind sie tot, genau so läuft das, und ich möchte dich bitten, vorsichtig zu sein mit dem Eindruck, den du erweckst.',
    g6: 'Ich bin um zwanzig vor zehn gegangen. Ich habe mich um zwanzig vor zehn ausgetragen. Um Viertel nach zu Hause, um halb elf im Bett. Wie immer.',
    g7: 'Ab halb elf geschlafen. Mein Telefon liegt oben im Flur, es lädt oben im Flur, frag jeden, der mich kennt.',
    g8: 'Niemand unterstellt hier etwas. Ich bitte darum, dass wir der Familie eine Woche lassen.',
    g9: 'Teddy hat nach dir gefragt. Mit mir redet er nicht darüber, er sagt, ich gehöre zum Personal. Er ist ab sechs jeden Morgen im Aufenthaltsraum, falls du ihn sprechen willst',

    // ---------------------------------------------------------------- t-margo
    m1: 'Ivy war deine Patentante, oder? Sie hat mir dein Foto ungefähr vierhundert Mal gezeigt, und ich übertreibe nicht!',
    m2: 'wer hat in der nacht nach ihr gesehen',
    m3: 'Ich. Ich mache elf und zwei auf dem Flur, das steht mit meinen Initialen im Nachtbuch. Elf und zwei, jede Nacht, vierzehn Jahre lang mache ich das schon',
    m4: 'Sie hat geschlafen. Das habe ich geschrieben. Schläft, ruhig, keine Auffälligkeiten',
    m5: 'hast du sonst jemanden auf dem flur gesehen',
    m6: 'Ich habe sehr spät ein Auto vom Parkplatz fahren hören. Spät genug, dass ich aufgeschaut habe. Wir haben Taxis, aber nicht um die Uhrzeit und nicht mit dem Motor, das war ein Diesel und er ist links abgebogen',
    m7: 'woher weißt du dass es ihr auto war',
    m8: 'Weil sie seit drei Jahren kommt und ich diesen Motor seit drei Jahren höre. Im Gruppenchat sage ich das nicht, und bitte zwing mich nicht dazu. Ich brauche diese Stelle, ich habe zwei Kinder zu Hause',
    m9: 'Ich war sowieso von eins bis zur Übergabe am Nachtdienstplatz und habe das Medikamentenbuch geführt, ich hätte also alles andere gehört',

    // ---------------------------------------------------------------- t-teddy
    t1: 'Du hast dir Zeit gelassen.',
    t2: 'Einundvierzig Jahre Baukalkulator. Ich schlafe nicht und ich schätze keine Uhrzeiten. Wenn ich dir eine Uhrzeit nenne, dann ist es eine Uhrzeit.',
    t3: 'Ivy war bis zehn vor zehn mit mir im Aufenthaltsraum. Ihre Tochter hat sie geholt und mit nach oben genommen. Das war das Letzte, was ich von ihr gesehen habe.',
    t4: 'und danach',
    t5: 'Nachts sitze ich in der Tür des Aufenthaltsraums, weil mein Sessel dort steht und meine Hüfte ist, wie sie ist. Ich sehe den Nachtdienstplatz und den Fuß der Treppe. Ich habe das Ganze gesehen.',
    t6: 'Margo ist um elf nicht hochgegangen. Sie saß von fünf vor elf bis zwanzig nach elf an diesem Nachtdienstplatz, mit dem Telefon am Ohr, und ist kein einziges Mal aufgestanden.',
    t7: 'Ich sage dir das nicht, damit sie entlassen wird. Sie spricht dienstags mit ihrer Mutter in Lagos, wegen der Zeitverschiebung. Alle hier wissen es und alle hier lassen es zu.',
    t8: 'Die Tochter kam um zwanzig vor zwölf die Treppe wieder herunter. Um halb zwölf war sie auf dem Flur, denn ich habe Ivys Tür gehört, und Ivys Tür gehört seit einem Jahr gerichtet.',
    t9: 'Sie hat mich nicht gesehen. Menschen sehen mich nicht. Das hat seinen Nutzen.',
    t10: 'Ivy hat mir im September gesagt, dass man ihr eine Zahl genannt hat. Welche, wollte sie mir nicht sagen. Sie sagte, sie habe es ihrer Tochter nicht gesagt und werde es auch nicht tun, wegen dem, was ihre Tochter damit anfangen würde.',

    // -------------------------------------------------------------- t-saoirse
    s1: 'Ich werde dir ein paar Dinge sagen, und ich werde dabei vorsichtig sein, weil ich neunundzwanzig Bewohner und eine Zulassung zu verlieren habe.',
    s2: 'Das Nachtbuch ist unterschrieben. Das ist der eine Nachweis. Die Türtransponder sind der andere Nachweis, und die beiden stimmen nicht überein, und das wusste ich nicht, bis du mich dazu gebracht hast nachzusehen.',
    s3: 'Der Besuchertransponder von Alison Reid hat um 23:47 die Parkplatztür nach außen geöffnet. Davor gibt es keine Buchung für den Weg hinein, weil die Tür nach innen den ganzen Abend für die Wäscherei aufgekeilt war, was ein eigenes Gespräch ist, das ich mit jemand anderem führe.',
    s4: 'die gebühren',
    s5: 'Drei Monate offen. Alison hat die Vollmacht, und zwar seit 2021. Ich hatte ihr zweimal geschrieben, und im zweiten Brief stand, dass ich bei vier Monaten verpflichtet bin, eine Gefährdungsmeldung zu den Finanzen zu machen.',
    s6: 'Dieser Brief ging am Freitag raus. Am Montag hatte sie ihn. Ivy ist in der Dienstagnacht gestorben.',
    s7: 'Eine Meldung bedeutet, dass jemand außerhalb dieses Hauses drei Jahre dieses Kontos ansieht. Ich will deutlich sagen, dass ich es nicht als Motiv gesehen habe. Ich habe es als Brief gesehen.',
  },

  /**
   * Digits here are digits in both languages and stay identical to the English.
   * `11-Uhr-Runde` keeps its number because the English chip says `11pm`, and
   * the round that was signed for and never walked is the one the player has to
   * be able to name.
   */
  claims: {
    'c-ivy-dayroom': 'Ivy: im Aufenthaltsraum, 21:00–21:50',
    'c-fen-home': 'Ali: zu Hause, 22:15–24:00',
    'c-fen-asleep': 'Ali: schläft zu Hause, 22:30–24:00',
    'c-margo-round': 'Margo: hat die 11-Uhr-Runde gelaufen, 23:00–23:20',
    'c-ivy-room': 'Ivy: in ihrem Zimmer, 22:00–24:00 (laut Margo)',
    'c-fen-driving': 'Ali: fährt von Marchbank weg, 23:25–23:45 (laut Margo)',
    'c-margo-office': 'Margo: am Nachtdienstplatz, 01:00–02:00',
    'c-teddy-dayroom': 'Teddy: in der Tür des Aufenthaltsraums, 23:00–00:30',
    'c-margo-desk': 'Margo: saß am Nachtdienstplatz, 23:00–23:15 (laut Teddy)',
    'c-fen-corridor': 'Ali: auf dem Flur im ersten Stock, 23:30–23:40 (laut Teddy)',
    'c-fen-carpark': 'Ali: auf dem Parkplatz, 23:47–23:57 (Transponder-Protokoll)',
  },

  motives: {
    'm-attorney':
      'Sie hat seit 2021 die Vollmacht, die Gebühren waren drei Monate offen, und eine Gefährdungsmeldung bei vier Monaten hätte drei Jahre dieses Kontos jemandem außerhalb des Hauses vorgelegt.',
  },

  contradictions: {
    'x-fen-corridor':
      'Sie hat sich um zwanzig vor zehn ausgetragen und sich selbst ab Viertel nach zu Hause verortet. Teddy Balfour saß in der Tür des Aufenthaltsraums mit freiem Blick auf die Treppe und hat um halb zwölf Ivys Tür gehört, und diese Tür gehört seit einem Jahr gerichtet.',
    'x-fen-asleep':
      'Ab halb elf geschlafen, hat sie gesagt, das Telefon lädt oben im Flur. Margo hat um diese Uhrzeit einen Dieselmotor vom Parkplatz wegfahren und links abbiegen hören, und sie hört diesen Motor seit drei Jahren ankommen.',
    'x-fen-carpark':
      'Das Nachtbuch ist eine Unterschrift. Der Türtransponder ist eine Maschine. Ihrer hat um 23:47 die Parkplatztür nach außen geöffnet, zwei Stunden nachdem sie im Bett gewesen sein will, und elf Meilen von dort entfernt, wo sie gewesen sein will.',
    'x-margo-round':
      'Margo hat die Elf-Uhr-Runde abgezeichnet und ist sie nicht gelaufen. Sie saß mit dem Telefon am Ohr am Nachtdienstplatz und sprach mit ihrer Mutter in Lagos, so wie sie es jeden Dienstag tut, wegen der Zeitverschiebung. Deshalb hat zehn Stunden lang niemand nach Ivy gesehen. Das ist ein Kündigungsgrund und kein Mord, und jeder Mensch in diesem Haus wusste von den Dienstagsanrufen und hat sie ihr gelassen.',
  },

  confrontation: {
    opening:
      'Du hast mit einem neunzigjährigen Mann gesprochen, der die ganze Nacht in einer Tür sitzt, und mit einer Pflegerin, die einen Nachweis gefälscht hat. Natürlich höre ich zu, aber ich möchte, dass du hörst, wie das klingt.',
    beats: {
      'r-corridor': {
        press:
          'Du hast dich um zwanzig vor zehn ausgetragen und dich selbst ab Viertel nach zu Hause verortet. Teddy hat um halb zwölf die Tür deiner Mutter gehört, und diese Tür kündigt sich an.',
        rebuttal:
          'Er ist einundneunzig und sitzt im Dunkeln. Die Hälfte der Zeit weiß er nicht, welcher Tag ist, und darauf hast du das hier gebaut.',
      },
      'r-asleep': {
        press:
          'Du hast gesagt, ab halb elf geschlafen. Margo hat dein Auto von diesem Parkplatz wegfahren und links abbiegen hören, und sie hört es seit drei Jahren jede Woche ankommen.',
        rebuttal: 'Ein Diesel. In einer Stadt voll davon. Mehr hast du nicht.',
      },
      'r-carpark': {
        press:
          'Dann hier eines, das kein Mensch ist. Dein Transponder hat um 23:47 die Parkplatztür nach außen geöffnet. Die Maschine sitzt in keiner Tür und die Maschine braucht die Stelle nicht.',
      },
      'r-why': {
        press:
          'Drei Monate offen, und in Claires Brief stand, dass vier Monate eine Gefährdungsmeldung bedeuten. Dieser Brief hat dich am Montag erreicht. Deine Mutter ist am Dienstag gestorben.',
      },
    },
    deflections: [
      'Das ist keine Tatsache, das ist ein Gefühl, das jemand hatte.',
      'Du warst in diesen drei Jahren kein einziges Mal hier. Du hast Besuche gemacht.',
      'Bring mir etwas, das nicht von jemandes Erinnerung abhängt.',
    ],
    confession:
      'Sie war wach, als ich wieder hinaufging. Das war sie immer. Sie sagte, mach das Licht nicht an, und dann sagte sie, ich weiß, was du getan hast, Alison, und sie sagte es freundlich, und das war das Schlimmste daran.\n\nIch habe das Kissen gehalten und gezählt, und sie hat sich nicht lange gewehrt. Ich werde es nicht besser beschreiben als so. Ich hatte elf Wochen, um eine Art zu finden, es zu sagen, die es kleiner macht, und es gibt keine.\n\nUnd ich will das andere auch sagen, weil du es irgendwann findest und mir lieber ist, es kommt von mir.\n\nEin Mann, der sich the Keeper nannte, hat mich am Montagabend angerufen. Er sagte, er sei vom Team für die weitere Pflege. Er wusste, was in dem Brief stand. Er wusste von der Meldung, von der außerhalb dieses Büros niemand wusste, und dann sagte er mir, dass man meiner Mutter im September acht bis vierzehn Monate gegeben hatte und dass sie darum gebeten hatte, es der Familie nicht zu sagen.\n\nIch wusste das nicht. Sie hat es mir nie gesagt. Er wusste es und ich nicht, und er sagte es so, wie man jemandem die Uhrzeit sagt.\n\nDann sagte er: das Geld muss also länger reichen als sie, und der Brief kommt zuerst. Und ich sagte, was soll ich denn tun. Und er antwortete eine Weile nicht. Er ließ mich darin sitzen.\n\nUnd dann sagte er, nun ja. Sie haben darüber nachgedacht, sonst hätten Sie mich nicht gefragt.\n\nEr hat mir nie gesagt, dass ich etwas tun soll. Ich bin es wieder und wieder durchgegangen. Kein einziges Mal hat er mir gesagt, dass ich etwas tun soll.',
  },

  coda: {
    from: 'Unbekannte Nummer',
    messages: [
      'Marchbank also. Diesmal warst du schneller. Sechs Tage.',
      'Der alte Kalkulator war Glück, und dafür solltest du dir nicht auf die Schulter klopfen. Er hätte es sowieso irgendwem gesagt. Die Pflegerin hast du richtig behandelt, und das ist mir aufgefallen.',
      'Du wirst wissen wollen, woher ich die Zahl vom September hatte. Bleib damit sitzen. Das ist die interessante Frage, und du hast sie noch nicht gestellt.',
      'Nächstes Mal eine andere Nummer. Wie immer.',
    ],
  },

  epilogue:
    'Am Ende wurde das Konto doch geprüft. Einundvierzigtausend Pfund in drei Jahren, und ein Dauerauftrag an ein Lagerhaus in Kilmarnock, den nie jemand hat erklären können.\n\nMargo Adeyemi wurde wegen des Nachtbuchs elf Tage suspendiert und dann still wieder eingestellt, weil Marchbank den Flur ohne sie nicht besetzen konnte und weil neunundzwanzig Familien geschrieben haben. Sie macht immer noch elf und zwei. Jetzt läuft sie sie auch.\n\nTeddy Balfour hat seine Aussage in einem Zug gemacht, mit Uhrzeiten, und der Beamte, der sie aufnahm, sagte hinterher, es sei die sauberste Schilderung, die er je von irgendjemandem bekommen habe, in irgendeinem Alter.\n\nIvys Buch lag in der Schublade. Drei Jahre davon. Der letzte Eintrag ist der vom Dienstag, und er lautet: Alison, 7 Uhr abends, will eine Unterschrift. Nicht unterschrieben.',
};
