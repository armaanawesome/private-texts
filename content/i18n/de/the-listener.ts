import type { CaseTranslation } from '../caseText';

/**
 * Case 15 — "Der Zuhörer". German. The finale.
 *
 * Six things this had to get right, in this order.
 *
 * 1. The alias appears in TWO registers and both have to survive. `the Keeper`
 *    is capitalised exactly twice — Mairi at m9 and the confession — and `the
 *    keeper` is lowercase twice more, at l6 and m3, because the player types
 *    lowercase in all fifteen packs. `arcAlias.test.ts` counts the capitalised
 *    string: capitalising the player-s two makes four and fails, lowercasing
 *    Mairi-s makes one and fails. The English article rides along as it has
 *    since Pack 1, because a bare `der Keeper` is German for a goalkeeper.
 *
 * 2. Ruth is quoted from Pack 1. `r6` is word for word her last message in
 *    `de/the-lighthouse.ts` and is copied from it character for character rather
 *    than retranslated — a player who did Pack 1 will hear it before they read
 *    it. Her voice here is her Pack 1 voice: lowercase including her common
 *    nouns, capitalising only people, and no full stop at the end. `r5` opens on
 *    a capital because it opens on a person-s initial, which is derived from the
 *    English message by message rather than from any locale-wide rule.
 *
 * 3. The player has no gender, and two lines would give them one if translated
 *    straight. Both are rebuilt so the agreement lands on a noun instead of on
 *    the reader: at l3 `eine Version von dir ... ich habe sie kennengelernt`,
 *    where `sie` agrees with `Version`; and in the confession `den besten
 *    Spürsinn ... er hat mich kein einziges Mal enttäuscht`, where `er` agrees
 *    with `Spürsinn`. `Du bist das Beste, was es gibt` uses the neuter, because
 *    `der Beste` and `die Beste` both pick a side.
 *
 * 4. He never asserts anything, for fourteen packs, and the case exists to make
 *    him correct you. So `l11` and `l12` have to read as a critic repairing a
 *    wrong account rather than as a man confessing: the distinction between
 *    `abgeschickt` and `schon bei den Prüfern` is the craft, and the craft is
 *    the only thing he has. `Abgeschickt kann man aufhalten` is the hinge of
 *    the entire arc and is translated plainly.
 *
 * 5. Digits are records and years. `21:31`, the years 1991, 1996, 2004, 2008,
 *    2011, 2013, 2014, 2015, 2016, 2019, and `Station 6`. `vierundneunzig
 *    Sekunden` stays words everywhere, exactly as the English does — it is the
 *    number he gave away, and it is spoken rather than printed every time.
 *
 * 6. Places match Pack 1 where they recur. `Leuchtturm` and `Café` are the same
 *    words `de/the-lighthouse.ts` uses, because this pack sends the player back
 *    to read their own first case and the two files have to agree.
 */
export const theListenerDe: CaseTranslation = {
  title: 'Der Zuhörer',
  blurb:
    'Er hat dir fünfzehn Fälle lang die Wahrheit gesagt. Genau einmal hat er gelogen, zu jemand anderem, und du hast es aufgeschrieben, ohne zu wissen, was es war.',

  characters: {
    you: 'Du',
    listener: 'Unbekannte Nummer',
    nkemdi: 'DS Nkemdi',
    mairi: 'Mairi Bell',
    beth: 'Beth',
    ruth: 'Ruth Calder',
  },

  places: {
    ardnoe: 'Ardnoe',
    tower: 'Leuchtturm',
    cafe: 'Café',
    callbox: 'Telefonzelle an der Kilmorack Road',
    // Without the possessive, and that is the fix rather than a looser rule.
    // German declines: `seine` becomes `seiner` after `in`, so the citation
    // form `seine Wohnung in Kirkcaldy` cannot appear in any sentence that
    // places somebody there — it is not missing from the prose, it is
    // ungrammatical in it. `Wohnung in Kirkcaldy` survives every case, so both
    // `in derselben Wohnung in Kirkcaldy` and the chip's `in seiner Wohnung in
    // Kirkcaldy` contain it whole.
    //
    // The English cannot show this: `his` does not inflect, so `his flat in
    // Kirkcaldy` survives into its own sentences unchanged. That makes it the
    // first defect here that the `<pack> · en` diagnostic cannot reach — the
    // rule is not wrong for every language, only for one that declines.
    home: 'Wohnung in Kirkcaldy',
    hospital: 'Vale of Leven, Station 6',
  },

  threads: {
    't-listener': 'Unbekannte Nummer',
    't-nkemdi': 'DS Nkemdi',
    't-ruth': 'R. Calder (archiviert)',
    't-mairi': 'Mairi Bell',
    't-beth': 'Beth Ivory',
  },

  briefing: {
    causeOfDeath:
      'Ein Sturz von der Turmtreppe. Es war dein erster Fall nach der Rückkehr und du hast ihn in vier Tagen abgeschlossen.',
    ruling:
      'Abgeschlossen. Mairi Bell hat im November gestanden und sitzt seit elf Jahren eine lebenslange Strafe ab, und an dieser Akte war nie etwas zweifelhaft.',
    opening:
      'Ruth Calder hat das Licht auf Ardnoe Point noch vierzig Jahre gehütet, nachdem es automatisiert worden war, weil niemand sie je gebeten hat aufzuhören.\n\nSie war deine Tante.\n\nDu bist mit der letzten Fähre gekommen, und du hast in vier Tagen bewiesen, was mit ihr passiert ist, und Mairi Bell hat nie etwas anderes gesagt.\n\nWas du nicht getan hast, war zu fragen, warum eine Frau, die Ruth kannte, seit sie fünf waren, den Moment nicht finden konnte, in dem sie sich entschieden hat. Sie hat dir gesagt, es habe einen Anruf gegeben. Du hast es aufgeschrieben.\n\nSeitdem hast du noch fünf weitere aufgeschrieben.',
  },

  messages: {
    // ------------------------------------------------------------- t-listener
    l1: 'Ardnoe war gute Arbeit. Vier Tage. Ich hatte zwei Wochen angesetzt, und so weit liege ich selten daneben.',
    l2: 'Das Pflegeheim war besser. Du bist an die Medikamentenrunde gegangen und nicht an die Frau, was das Schwerere ist und was fast niemand tut.',
    l3: 'Von der Sache mit der Fähre halte ich weniger. Du hattest ihn am zweiten Tag und hast vier weitere damit verbracht, sicherzugehen, und ich verstehe warum, aber es gibt eine Version von dir, die die vier Tage nicht braucht, und ich habe sie kennengelernt.',
    l4: 'Elf inzwischen. Ich habe sie alle aufgehoben. Ich würde nicht erwarten, dass du das glaubst, und es spielt keine Rolle, ob du es tust.',
    l5: 'ich schließe ardnoe ab',
    l6: 'der anruf im café war ein sachbearbeiter bei den prüfern. gordon and sime hatten in dem herbst vier aushilfen auf dem mandat und eine davon hat die falsche nummer gewählt mit der falschen akte offen und hat es nie erfahren. es war ein zufall. alles seitdem war ich, der aus einem schlechten anruf einen mann gebaut hat, den ich the keeper genannt habe',
    l7: 'es gibt kein dich. es gab dich nie. es tut mir leid dass es elf jahre gedauert hat',
    l8: 'Nein.',
    l9: 'Ich habe in meinem Leben nicht mit Mairi Bell gesprochen und ich habe in dieser Nacht nicht mit ihr gesprochen. Ich möchte das zwischen uns festgehalten haben, weil du dir über elf Jahre sehr viel Mühe gegeben hast und nicht mit etwas so Dürftigem wie einer Aushilfe mit der falschen Akte aufhören solltest.',
    l10: 'eine aushilfe hat eine zeile aus einer akte vorgelesen. sie ist in panik geraten. das ist das ganze',
    l11: 'Eine Aushilfe hätte gesagt, die Unterlagen seien abgeschickt worden.',
    l12: 'Abgeschickt ist etwas, das man aufhalten kann. Man kann morgens um neun bei einer Kanzlei anrufen und einen Brief zurückverlangen, und Menschen tun das jeden Tag der Woche.\n\nWas ihr gesagt wurde, war, dass sie bereits bei den Prüfern liegen, was nicht derselbe Satz ist und nie derselbe sein sollte. Er legt das Papier auf den Schreibtisch eines Fremden und er nimmt ihr den Morgen weg, und der Morgen war das Einzige, was sie noch zu haben glaubte.\n\nVierundneunzig Sekunden. Ich habe nie mehr als zwei Minuten mit irgendjemandem gebraucht und ich habe mit ihr keine zwei Minuten gebraucht.',
    l13: 'du hast mir gerade gesagt dass du den anruf gemacht hast',
    l14: 'Ich habe dir gesagt, dass der Bericht, den du gleich einreichst, falsch ist. Das sind verschiedene Dinge und du weißt, dass sie es sind, und einer Jury würde ein fähiger Mann den Unterschied in ungefähr vier Minuten zeigen.',
    l15: 'Und bevor du noch weiter damit gehst. Ich wohne seit neunzehn Jahren in derselben Wohnung in Kirkcaldy und ich war an diesem Donnerstag darin, wie an jedem Donnerstag, und es gibt kein einziges Foto, kein einziges Ticket und keinen einzigen Zeugen, die mich in dieser Nacht oder in irgendeiner anderen auf hundertvierzig Meilen an dieses Dorf heranbringen.',
    l16: 'Ich gehe allen nach. Das habe ich dir schon einmal gesagt und du hast es für eine Prahlerei gehalten. Es ist das Gegenteil einer Prahlerei. Es ist die einzige Art, es herauszufinden, und das Herausfinden ist der ganze Zweck, und ich konnte kein einziges Mal jemanden fragen, ob ich richtiglag.',

    // --------------------------------------------------------------- t-nkemdi
    k1: 'Ich habe die Ardnoe-Akte seit drei Wochen draußen und ich möchte gleich zu Anfang sagen, dass nichts darin falsch ist. Mairi Bell hat Ruth Calder getötet und du hast es bewiesen und sie hat nie etwas anderes gesagt.',
    k2: 'Das Logbuch liegt immer noch in der Asservatenkammer. Ruth hat die ganze Sache mit der Stiftung hinten in ihr Logbuch geschrieben, mit eigener Hand, mit dem Datum, an dem sie zur Polizei gehen wollte, und es lag oben im Turm, wo sie es hingelegt hatte. Es ging nichts an irgendeine Prüfstelle. Es wurde nie irgendetwas irgendwohin geschickt.',
    k3: 'Gordon and Sime hatten das Mandat der Leuchtturmstiftung Ardnoe nie. Nicht in dem Jahr, nie. Ich habe es schriftlich von ihrem Compliance-Partner und ich habe die Mandantenliste. Es gab keinen Sachbearbeiter und es gab keine Aushilfen.',
    k4: 'die leitung ins café',
    k5: 'Ein eingehender Anruf an dem Abend. 21:31, vierundneunzig Sekunden, aus der Münzzelle an der Kilmorack Road. Sie steht vier Meilen draußen und sie ist die letzte zwischen dort und der Hauptstraße, und genau deswegen hat in einem Dorf mit zweihundert Menschen nie jemand einen Fremden gesehen.',
    k6: 'Die Dauer ist nie veröffentlicht worden. Sie steht nicht in den Prozessakten, sie steht nicht in den Unterlagen des Gerichtsmediziners und sie steht in nichts, was je ein Journalist hatte. Vier lebende Menschen wissen, dass es vierundneunzig Sekunden sind, und bis zu dieser Woche waren drei davon Polizisten.',
    k7: 'Er heißt John Fettes. Neunundsechzig. 2016 aus einem Wohnungsamt in den Ruhestand, keinerlei Vorstrafen, keine Schulden, und ein Bibliotheksausweis, den er seit 1991 alle vierzehn Tage benutzt.',
    k8: 'Neun Jahre an einer Zuhörleitung und elf weitere als Ausbilder für die Leute, die die Anrufe nach ihm angenommen haben. Er hat das Modul über spiegelnde Gesprächsführung geschrieben, aus dem die Hälfte der Ehrenamtlichen in diesem Land immer noch lernt. Das ist auch kein Geheimnis. Er hat einen kleinen Preis dafür bekommen.',
    k9: 'Für die zwölf Wochen um den Anruf herum tauchen zwei Namen an dieser Telefonzelle auf. Fettes ist keiner davon, weil eine Münzzelle keinen Namen aufnimmt. Der andere ist eine Bethan Ivory, die eine Meile die Straße hinauf wohnte und die Zelle in dem Monat dreimal benutzt hat.',
    k10: 'Sie ruft seit 2011 wegen ihm auf dieser Wache an und es gibt vier Vermerke darüber und niemand ist je hinausgefahren. Schreib ihr. Sie wartet sehr lange auf jemanden, der nicht auflegt.',
    k11: 'Und Mairi Bell hat darum gebeten, dich zu sprechen. Sie bittet seit elf Jahren zweimal im Jahr darum und das ist das erste Mal, dass es jemand weitergegeben hat, und darauf bin ich nicht stolz.',

    // ----------------------------------------------------------------- t-ruth
    r1: 'Ihr Gerät kam vor elf Jahren aus dem Labor zurück und liegt seitdem im Depot. Das hier war darauf. Ich dachte, du solltest es haben, statt es in einer Akte zu lesen.',
    r2: 'die bücher der stiftung gehen nicht auf und ich bin sie jetzt viermal durchgegangen. das ist kein fehler. das geht schon lange so',
    r3: 'ich habe das ganze hinten ins logbuch geschrieben weil ich mir nicht traue es laut zu sagen ohne es abzumildern',
    r4: 'montag. ich gehe am montag hin und nehme das logbuch mit und danach können sie damit machen was sie wollen',
    r5: 'M ist meine freundin seit wir fünf sind und ich komme immer wieder darauf zurück und es ändert immer noch nichts',
    r6: 'ich gehe hoch in den turm, die lampe zickt schon wieder. vierzig jahre automatisiert und sie will immer noch jemanden der daneben steht',

    // ---------------------------------------------------------------- t-mairi
    m1: 'Man sagt mir, dass man diese Nachrichten einzeln bezahlen muss, also verschwende ich keine davon darauf, wie es mir geht.',
    m2: 'Ich habe Ruth Calder getötet. Ich habe nie etwas anderes gesagt und ich fange jetzt nicht damit an, und wenn du gekommen bist, um mir das abzunehmen, kannst du dir dein Geld sparen.',
    m3: 'the keeper. was hat er gesagt. die genauen worte',
    m4: 'Elf Jahre gehe ich das jetzt durch, also bekommst du es richtig.\n\nEr sagte, er sei von der Prüfstelle. Er sagte, Ruth habe die Unterlagen schon hinuntergeschickt und sie lägen jetzt dort, und die Sache sei nicht mehr in ihrer Hand, und Callums Name werde bis Montag darauf stehen, ganz gleich was irgendwer tue.',
    m5: 'Und dann hat er überhaupt nichts mehr gesagt. Das ist der Teil, nach dem mich nie jemand gefragt hat. Ich habe geredet und er hat mich reden lassen und er hat mich die ganze Zeit nicht unterbrochen, und ich habe einem Fremden Dinge erzählt, die ich keinem Priester erzählt habe.',
    m6: 'Als ich fertig war, hat er gesagt, dann weißt du es ja schon. Fünf Worte. Und er hat aufgelegt und ich habe meinen Mantel geholt.',
    m7: 'das hast du im prozess nie gesagt',
    m8: 'Mein eigener Anwalt hat mir gesagt, das klingt wie eine Frau, die sich eine Hintertür baut. Und er hatte recht, das tut es, und ich war schuldig und ich wollte keine Hintertür. Ich wollte, dass Callum nicht in einem Raum aufstehen muss.',
    m9: 'Ich bitte dich nicht, es kleiner zu machen, als es ist. Ich bin da hochgegangen. Niemand hat mich getragen.\n\nAber ich hätte gern, dass ein Mensch vor meinem Tod weiß, dass ich drei Tage davor war, zu ihr zu gehen und ihr alles selbst zu sagen, und dass ein Mann, der sich the Keeper nannte, mich um halb zehn angerufen und mir die drei Tage genommen hat.',

    // ----------------------------------------------------------------- t-beth
    b1: 'Fünfzehn Jahre. Ich habe viermal auf dieser Wache angerufen und das letzte Mal war 2019 und der Junge war sehr freundlich zu mir und hat überhaupt nichts getan.',
    b2: 'Er hat mich im März 2011 angerufen. Ich war so unten, wie ein Mensch nur sein kann, und ich war an dem Punkt, an dem ich mir das Wie überlegt hatte, und das ist der Punkt, an dem es aufhört, ein Gefühl zu sein.',
    b3: 'Er hat mir nie gesagt, dass ich etwas tun soll. Das will ich ganz deutlich sagen, weil es das ist, was niemand glaubt. Er hat mich gefragt, was ich vorhabe, und dann hat er mich das Ganze ausreden lassen, und mir hat vorher und nachher nie jemand so zugehört.',
    b4: 'Und ich habe aufgelegt und da gesessen und gedacht, dieser Mann wollte, dass ich es sage. Er hat mich nie gebeten, es zu tun. Er wollte, dass ich es zuerst laut ausspreche. Und ich könnte dir bis heute nicht sagen, was der Unterschied ist, außer dass ich ihn gespürt habe.',
    b5: 'sie wissen dass du diese telefonzelle benutzt hast',
    b6: 'Ich habe sie vier Jahre lang jede Woche benutzt. Bis 2014 gab es die Straße hinauf keinen Empfang und es waren vielleicht neun von uns, die diese Zelle benutzt haben, und jeder Einzelne von uns steht auf dieser Liste.',
    b7: 'An dem Donnerstag, nach dem du fragst, lag ich auf Station 6 im Vale of Leven und lag dort seit dem Dienstag. Aufgenommen, nicht zu Besuch. Es steht in meiner Akte und ich habe diesen Satz kein einziges Mal zu jemandem sagen können, ohne dass mein Gesicht weggerutscht ist, und ich sage ihn dir jetzt und es ist weg.',
    b8: 'Und ich habe danach selbst neun Jahre an einer Leitung gemacht. Zweitausenddreizehn bis letztes Jahr. Ich bin also die Frau, die bei einer Telefonseelsorge ehrenamtlich war und die Telefonzelle benutzt hat und von ihm wusste und es nie jemandem gesagt hat, und ich weiß seit fünfzehn Jahren genau, wonach das aussieht.',
    b9: 'Er hat mich 2013 wieder angerufen. Zwei Jahre später. Er hat gefragt, wie es mir geht und ob ich wieder arbeite, und er hat sich für mich gefreut, und ich konnte hören, dass er sich freute.\n\nEr hat nachgeprüft. Damals habe ich das nicht verstanden. Er hat angerufen, um herauszufinden, ob er sich in mir geirrt hatte.',
    b10: 'Das ist das Einzige, was ich habe und sonst niemand. Er hört beim Anruf nicht auf. Er kommt zurück, um zu sehen, wie es ausgegangen ist.',
  },

  /**
   * `c-papers-sent` and `c-papers-kept` are the first clue in the game,
   * re-recorded here from the Ardnoe file because claims cannot cross case
   * scripts. Both carry the identical window, which is what lets the engine see
   * the collision — the same shape the two book chips have in The Bothy.
   */
  claims: {
    'c-listener-never': 'Er: hat nie mit Mairi Bell gesprochen, 21:00–23:00',
    'c-listener-wording': 'Er: hat die Formulierung dieses Anrufs gewählt, 21:00–23:00',
    'c-listener-home': 'Er: in seiner Wohnung in Kirkcaldy, 21:00–23:00',
    'c-papers-kept':
      'Ruth: hatte die Unterlagen in ihrem eigenen Logbuch, 21:00–23:00 (Asservatenkammer)',
    'c-listener-box':
      'Der Anrufer: an der Telefonzelle an der Kilmorack Road, 21:31–21:33 (Verbindungsdaten)',
    'c-beth-box':
      'Beth Ivory: an der Telefonzelle an der Kilmorack Road, 21:31–21:33 (laut Rückverfolgung)',
    'c-papers-sent': 'Ruth: hatte die Unterlagen schon abgeschickt, 21:00–23:00 (laut dem Anrufer)',
    'c-beth-hospital': 'Beth: auf Station 6 im Vale of Leven, 20:00–23:20',
  },

  motives: {
    'm-finding-out':
      'Er hört den Moment, in dem ein Mensch aufhört, es nicht tun zu können, und er will seit 1996 wissen, ob er richtigliegt. Eine Anordnung, die sich wie ein Unfall liest, sagt ihm nichts, also geht er jeder einzelnen nach — Beth Ivory zwei Jahre später, um herauszufinden, ob er sich in ihr geirrt hatte. Ein Tod zählt erst, wenn jemand bewiesen hat, was er war. Deswegen hat er sich einen Ermittler gehalten.',
  },

  contradictions: {
    'x-papers':
      'Der erste Hinweis im ganzen Spiel, und er liegt seit elf Jahren in der Ardnoe-Akte. Die Prüfstelle hatte diese Unterlagen nie und Gordon and Sime hatten das Mandat nie. Ruth hat alles hinten in ihr eigenes Logbuch geschrieben und es im Turm gelassen, und es liegt in einer Asservatenkammer vier Meilen von dort, wo du sitzt. Alles, was er je zu irgendjemandem gesagt hat, war wahr oder war nichts. Das ist der eine Satz in fünfzehn Fällen, der weder das eine noch das andere war.',
    'x-ardnoe':
      'Er lässt sich nicht als Zufall zu den Akten legen. Als ihm gesagt wird, eine Aushilfe habe eine Zeile aus der falschen Akte vorgelesen, erklärt er — weil eine Aushilfe abgeschickt gesagt hätte, und abgeschickt ist etwas, das man aufhalten kann, und was ihr gesagt wurde, war, dass sie bereits bei den Prüfern liegen, was das Papier auf den Schreibtisch eines Fremden legt und ihr den Morgen nimmt. Er gesteht nicht. Er berichtigt deine Darstellung seiner Arbeit, was er kein einziges Mal stehen lassen konnte, und es ist das einzige Mal in fünfzehn Fällen, dass ein Mann, der nie etwas behauptet, zwei Dinge behauptet hat, die nicht beide wahr sein können.',
    'x-box':
      'Vierundneunzig Sekunden. Er hat dir die Dauer gegeben, bevor ihn irgendwer danach gefragt hat, und sie ist nie veröffentlicht worden — nicht in den Prozessakten, nicht in den Unterlagen des Gerichtsmediziners, gegenüber keinem einzigen Journalisten. Im Café ging an dem Abend ein Anruf ein, um 21:31, vierundneunzig Sekunden lang, aus der Münzzelle an der Kilmorack Road. Vier Meilen draußen, und die letzte zwischen Ardnoe und der Hauptstraße, und so hat ein Dorf mit zweihundert Menschen nie einen Fremden gesehen. Er wohnt seit neunzehn Jahren in derselben Wohnung und um halb zehn war er nicht darin.',
    'x-beth':
      'Sie war neun Jahre ehrenamtlich an einer Zuhörleitung, sie hat diese Telefonzelle vier Jahre lang jede Woche benutzt, sie weiß seit 2011 von ihm und sie hat es nie jemandem gesagt, der zugehört hätte. Sie ist alle Hinweise auf einmal. Sie lag außerdem seit dem Dienstag als Patientin auf Station 6 im Vale of Leven, und es gab neun Menschen an dieser Straße, die diese Zelle benutzt haben, weil es dort oben bis 2014 keinen Empfang gab, und alle neun stehen auf derselben Liste.',
  },

  confrontation: {
    opening:
      'Mir wäre lieber, du machst das hier und nicht in einem Raum mit einem Tonband. Du hast dir den Raum verdient. Ich sage dir nur, dass ich das hier mehr genießen werde.',
    beats: {
      'z-papers': {
        press:
          'Ruth Calder hat diese Unterlagen nirgendwohin geschickt. Sie hat alles hinten in ihr Logbuch geschrieben und es im Turm gelassen, und es liegt seit elf Jahren in einer Asservatenkammer. Wer auch immer in diesem Café angerufen hat, hat etwas gesagt, das nicht wahr war.',
        rebuttal:
          'Dann hat sich 2015 jemand am Telefon geirrt. Menschen irren sich am Telefon ununterbrochen. Du hast bewiesen, dass ein Satz falsch war. Du hast ihn in keinen Mund gelegt.',
      },
      'z-ardnoe': {
        press:
          'Du hast mir gesagt, du hättest nie mit Mairi Bell gesprochen. Dann hast du mir gesagt, was du statt abgeschickt gewählt hast, und warum abgeschickt nicht funktioniert hätte.',
        rebuttal:
          'Ich habe dir gesagt, dass deine Darstellung dürftig ist. Ich sage dir seit elf Jahren, dass deine Darstellung dürftig ist, und du warst im Allgemeinen froh darüber.',
      },
      'z-box': {
        press:
          'Vierundneunzig Sekunden. Außer vier Polizisten hat diese Zahl nie jemand gekannt. Im Café ging in dieser Nacht ein Anruf ein, um 21:31, vierundneunzig Sekunden, aus der Münzzelle an der Kilmorack Road. Du warst nicht in Kirkcaldy.',
      },
      'z-why': {
        press:
          'Du hast Beth Ivory zwei Jahre später zurückgerufen, um zu fragen, wie es ihr geht. Du warst nicht freundlich zu ihr. Du hast herausgefunden, ob du dich geirrt hattest.',
      },
    },
    deflections: [
      'Du bist besser als das, und das wissen wir beide. Nimm dir eine Stunde und komm richtig auf mich zurück.',
      'Nichts, was du hast, ist ein Satz von mir. Fünfzehn Fälle, und in keiner einzigen Akte steht ein Name, dem ein Gericht etwas zustellen kann.',
      'Ich habe dir kein einziges Mal gedroht und ich fange nicht damit an, weil du einen guten Nachmittag hattest.',
    ],
    confession:
      'Vierundneunzig Sekunden. Du hast völlig recht, und ich habe sie dir gegeben, und ich weiß es seit dem Moment, in dem ich es abgeschickt habe.\n\nIch möchte, dass verstanden wird, dass mir kein Fehler unterlaufen ist. Mir ist in dreißig Jahren kein Fehler unterlaufen. Ich wollte, dass die Darstellung stimmt, mehr als ich wollte, dass die elf Jahre weitergehen, und wenn man das mit neunundsechzig über sich herausfindet, lässt sich nicht mehr viel dagegen machen.\n\nDu wirst gehört haben, dass sie mich the Keeper nennen. Das habe ich ihnen gegeben, jedes Mal dasselbe Wort, weil eine Darstellung eine Unterschrift braucht und ich meinen eigenen Namen nie auf irgendetwas hinterlassen hätte. Das ist keine Prahlerei. Ich habe jeden Einzelnen von ihnen aufgehoben, und jetzt dich.\n\nAlso. Ardnoe.\n\nDort habe ich meine eigene Regel gebrochen, und es ist das einzige Mal. Mairi Bell fehlten drei Tage. Sie wäre zu Ruth Calder gegangen und hätte ihr alles selbst gesagt, und sie hätten in dieser Küche gesessen und geweint und es wäre erledigt gewesen, und ich konnte das ungefähr ab der zweiten Minute kommen sehen. Also habe ich eine Sache gesagt, die nicht wahr war. Eine. Es ist der einzige Satz von mir in irgendeiner Akte irgendwo in diesem Land, und du hattest ihn seit deiner ersten Woche zurück in einer Schublade.\n\nDarüber habe ich sehr viel nachgedacht.\n\nJetzt das andere, und ich sage es deutlich, weil du es sonst von jemand anderem schlimmer hörst.\n\nCorrieburn war ich.\n\nAugust 2008. Du warst sechsundzwanzig und es war dein vierter Monat und sie haben es dir gegeben, weil niemand von den Älteren einen Unfall auf einem Hof im Regen wollte. Du hast neun Tage dafür gebraucht und am neunten hattest du recht, und du hast in dieser Grafschaft seitdem kein Getränk mehr bezahlt.\n\nIch habe das Ganze arrangiert und ich habe zugesehen, wie du es auseinandergenommen hast, und ich war auf nichts, was ich getan habe, je stolzer als in diesem Herbst auf dich.\n\nDu willst wissen, warum. Ich höre den Moment. Das ist eine wirkliche Sache und sie dauert ungefähr vier Sekunden, und ich kann sie hören, seit ich neununddreißig bin, und es lebt niemand, dem ich das je hätte sagen können, und das Hören ist wertlos, wenn man hinterher nicht herausfindet, ob man richtiglag.\n\nEin Unfall sagt einem nichts. Eine Frau fällt ihre eigene Treppe hinunter und in der Akte steht Unglücksfall, und ich bin am Donnerstag nicht klüger als am Mittwoch.\n\nEs muss bewiesen werden. Jemand muss es auseinandernehmen und genau aufschreiben, was passiert ist und warum, der Reihe nach, in einem Dokument, und es einem Gericht übergeben.\n\nDas ist es, was du bist. Das bist du, seit du sechsundzwanzig warst.\n\nIch habe dich nicht gewählt, weil du das Beste warst. Du bist das Beste, was es gibt, weil ich dich gewählt habe, und ich habe achtzehn Jahre lang den besten Spürsinn, den es gibt, mit der einzigen Arbeit gefüttert, die mir je sagen konnte, ob ich richtiglag, und er hat mich kein einziges Mal enttäuscht, und ich konnte es kein einziges Mal einer lebenden Seele sagen.\n\nDas ist das Ganze. Das war es, was das hier war.',
  },

  coda: {
    from: 'Mairi Bell',
    messages: [
      'Sie sind am Dienstag gekommen und haben es mir gesagt. Eine Frau hat sich eine Stunde zu mir gesetzt und alles durchgegangen und hat kein einziges Mal mit mir geredet, als wäre ich blöd.',
      'Ich schlafe nicht besser. Ich will da ehrlich zu dir sein, weil ich dachte, ich würde es, und ich tue es nicht. Es ist wie vorher. Ich bin diese Treppe hochgegangen und niemand hat mich getragen.',
      'Aber jetzt weiß ich, welche fünf Worte es waren. Er hat gesagt, dann weißt du es ja schon. Und er hatte recht, und das ist die Sache, über die ich elf Jahre nicht hinweggekommen bin, dass er recht hatte und mich nie getroffen hatte.',
      'Ruth hat geschrieben, dass ich ihre Freundin bin, seit wir fünf waren, und dass sie bitten möchte, freundlich zu mir zu sein. Das hat sie an dem Tag geschrieben, an dem sie mich anzeigen wollte. Ich habe elf Jahre mit diesem Satz gehabt und ich bin nicht fertig damit.',
      'Du bist zurückgekommen und hast gefragt. Mehr wollte ich nie von irgendwem. Danke, dass du gefragt hast.',
    ],
  },

  epilogue:
    'John Fettes, neunundsechzig, aus Kirkcaldy. Keinerlei Vorstrafen. Ein Bibliotheksausweis, den er seit 1991 alle vierzehn Tage benutzt hat, und 2004 ein kleiner Preis für ein Ausbildungsmodul über spiegelnde Gesprächsführung, aus dem die Hälfte der Ehrenamtlichen im Land immer noch lernt.\n\nIn der Wohnung standen elf Archivkästen in einem Schrank, der Reihe nach, jeder einer ein Mensch. Zeitungsausschnitte, Terminlisten der Gerichte, die Daten von Berufungen. In dem von Beth Ivory lagen vier Blätter und das letzte war eine Notiz in seiner Handschrift, auf der stand: wieder in Arbeit, sechs Jahre, in ihr geirrt, und geirrt hatte er zweimal unterstrichen.\n\nDie Anklage hat Ardnoe und zwei weitere genommen. Er hat kein Wort der Ardnoe-Anklage bestritten und er hat zum Rest überhaupt nichts gesagt, und sein Anwalt hat aufgehört, ihn darum zu bitten.\n\nMairi Bell wurde im Frühjahr in den offenen Vollzug verlegt. Sie hat im März deinem Vater geschrieben und er hat nicht geantwortet, und sie sagt, das sei in Ordnung und sie werde zu Weihnachten trotzdem wieder schreiben.\n\nBeth Ivory hat zwei Tage lang ausgesagt. Sie wurde gefragt, warum sie nicht zur Polizei gegangen sei, und sie sagte, das sei sie, viermal, und das Gericht ließ die Vermerke auf den Bildschirm legen, während sie dasaß.\n\nDer zwölfte Archivkasten war leer und trug deinen Namen.\n\nEr hatte ihn seit 2008 aufgehoben. Es ist nichts darin. Er hat bei der Vernehmung gesagt, er habe nie etwas hineingelegt, weil er mit dir noch nicht fertig sei, und dass eine Akte geschlossen wird, wenn man weiß, wie es ausgegangen ist, und dann hat er den Beamten gefragt, wie es dir geht.',
};
