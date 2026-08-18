import type { CaseTranslation } from '../caseText';

/**
 * Case 8 — "Der Sonntagsgottesdienst". German.
 *
 * Five things this had to get right, in this order.
 *
 * 1. One word for the register, everywhere. The case is a forged record against
 *    a living memory, so the record has exactly one name: `Kirchenbuch`. It is
 *    `Kirchenbuch` in Avril-s first question, in Grace-s rule about the safe, on
 *    both chips, in `x-cordy-register` and in the beat that presses it. The one
 *    volume in question is `das Trauungsbuch von 1974` — a specific book inside
 *    the same word, exactly as the English narrows "the registers" to "the 1974
 *    marriage register". Two words for it would be two documents, and the whole
 *    contradiction is that Pam said she never touched *the* thing she signed out.
 *
 * 2. Digits are years and entry numbers, never clock times. 1974 is the year the
 *    roof was off, 1975 the year Jack-s father died, 1976 the year the four
 *    lines were actually written, 1985 the year Pam started the flowers, and 114
 *    and 115 are the entries that were squeezed apart. Every hour in the case is
 *    spoken: `halb zehn`, `zwanzig vor acht`, `zehn nach acht`, `zwanzig nach
 *    acht`. The register chips carry a date rather than a clock and so state
 *    `11. März` — they sit on a day in March rather than the night of the death,
 *    which is why they need no wall clock at all.
 *
 * 3. Names. Avril Dacre, Pam Hale, Grace Fowler, Jack Tenby, Denise Voss,
 *    St Ninian-s, St Cuthbert-s, Sowerby, Bicester and Coventry all keep theirs.
 *    Places translated and bare, so a fused preposition cannot eat them — `in
 *    der Sakristei` still contains `Sakristei`, where a name written `die
 *    Sakristei` would survive but `im Kirchenschiff` would swallow `das
 *    Kirchenschiff` whole:
 *
 *      church  → St Ninian’s        tower   → Turm
 *      nave    → Kirchenschiff      carpark → Kirchenparkplatz
 *      vestry  → Sakristei          cordyhome → Pams Haus
 *
 *    `Pams Haus` is named on its own chip rather than left as a bare `zu Hause`,
 *    because a place whose name appears in no sentence is a chip the player
 *    cannot match to anything — the defect that hid inside the French `au bar du
 *    club`.
 *
 * 4. Voice, and this pack inverts the problem. Five of the six write standard
 *    prose and close every sentence with a full stop; only the player is
 *    lowercase. So casing separates one voice out of six and the other five had
 *    to be separated on the vocabulary of what they each do:
 *
 *      Avril  — the archivist. `Eintrag`, `Nummerierung`, `Linierung`, `Tinte`,
 *               `Handschrift`. She asks questions instead of making claims, and
 *               she is the only one who does.
 *      Grace  — the vicar, two years in and liable. `Kirchenordnung`,
 *               `Gemeinderat`, rules quoted before opinions, and every sentence
 *               about a person hedged with care.
 *      Jack   — eighty-four, and the shortest sentences in the pack. Dates,
 *               materials, weather. He refuses interpretation on purpose: `Ich
 *               sage nicht, was es bedeutet. Ich sage, wo sie war.`
 *      Denise — the outsider, and the only musician. `Schwellwerk`, `stimmen`,
 *               `Klang`, Bach. Precise about her own timeline because nobody
 *               else will be.
 *      Pam    — possessive and wounded. She counts what she has given and what
 *               she is owed, and she is the only one who accuses somebody else.
 *      Du     — lowercase including nouns, short, and it lowercases names.
 *
 * 5. `Pfarrerin`, not `Pfarrer`. Grace is a woman and the English says `the
 *    vicar` twice about her; German has to pick, and picking the masculine would
 *    quietly change who was standing next to Pam when she lied to the police.
 */
export const sundayServiceDe: CaseTranslation = {
  title: 'Der Sonntagsgottesdienst',
  blurb:
    'Das Kirchenbuch sagt, in diesem August habe es eine Trauung gegeben. Der Mann, der das Kirchendach neu gedeckt hat, sagt, es war kein Dach darauf.',

  characters: {
    you: 'Du',
    avril: 'Avril',
    cordy: 'Pam',
    ines: 'Grace',
    jack: 'Jack',
    petra: 'Denise',
  },

  places: {
    church: 'St Ninian’s',
    nave: 'Kirchenschiff',
    vestry: 'Sakristei',
    tower: 'Turm',
    carpark: 'Kirchenparkplatz',
    cordyhome: 'Pams Haus',
  },

  threads: {
    't-avril': 'Avril',
    't-parish': 'Gemeinderat St Ninian’s',
    't-petra': 'Denise',
    't-jack': 'Jack Tenby',
    't-ines': 'Grace Fowler',
  },

  briefing: {
    causeOfDeath: 'Ein Schädelbruch. Sie ist gegen die Ecke des Tresors gestürzt.',
    ruling:
      'Als Sturz verzeichnet. Sie war einundsiebzig, der Boden der Sakristei ist uneben, und sie war allein in einer abgeschlossenen Kirche.',
    opening:
      'Avril Dacre war zweiundzwanzig Jahre lang Kirchenvorsteherin von St Ninian’s und war seit drei Monaten dabei, vierhundert Jahre Kirchenbücher für die Diözese zu scannen, Seite für Seite, auf einem Flachbettscanner in der Sakristei.\n\nGefunden wurde sie an einem Dienstagabend um halb zehn, das Trauungsbuch von 1974 noch aufgeschlagen auf dem Schreibtisch.\n\nDu leitest das Diözesanarchiv. Sie hat dir seit März jede Woche geschrieben, und du hattest angefangen, dich darauf zu freuen.',
  },

  messages: {
    // ---------------------------------------------------------------- t-avril
    a1: 'Frage ans Archiv. Wenn ein Eintrag in einem Kirchenbuch in anderer Tinte und anderer Handschrift steht als die Einträge davor und danach, ist das etwas, wovon ihr wissen wollt, oder etwas, das jede Gemeinde in England hat?',
    a2: 'jede gemeinde hat welche. was stört dich an diesem hier',
    a3: 'Die Nummerierung. Eintrag 114 ist über 115 hineingequetscht, und die Linierung der Seite ist darunter neu gezogen worden. Jemand hat Platz gemacht.',
    a4: 'Es ist eine Trauung. Dritter August 1974. Hale und Sowerby.',
    a5: 'hale wie pam hale',
    a6: 'Ihre Mutter und der Vater, der auf jedem Dokument steht, das sie besitzt. Pam ist im November geboren.',
    a7: 'Und ich bin mein ganzes Leben in dieser Gemeinde und könnte dir nicht sagen, was daran falsch ist, also habe ich Jack Tenby gefragt, weil Jack sich an 1974 besser erinnert als 1974 selbst.',
    a8: 'Er hat mich ausgelacht. Er sagte, im August 1974 war kein Dach auf dieser Kirche, weil er selbst darauf war. Jede Trauung in diesem Sommer ist nach St Cuthbert’s gegangen.',
    a9: 'avril. sag es niemandem im dorf bevor du es mir sagst',
    a10: 'Ich habe es einer Person gesagt und es tut mir nicht leid. Sie hat ein Recht darauf, es von einer Freundin zu hören und nicht aus einem Brief mit einem Wappen darauf.',
    a11: 'Heute Abend wird gescannt. Seite 114 geht am Montag mit dem Rest der Lieferung an dich, und dann ist sie aus meinen Händen und in deinen, Gott sei Dank.',

    // --------------------------------------------------------------- t-parish
    p1: 'Liebe alle. Avril ist am Dienstagabend in der Sakristei gestorben. Ich habe sie um halb zehn gefunden, als ich wegen meines Telefons zurückkam. Die Polizei war da und behandelt es als Sturz.',
    p2: 'An diesem Sonntag findet kein Gottesdienst statt. Ich schaffe das nicht, und ich werde nicht so tun, als wäre es anders.',
    p3: 'Zweiundzwanzig Jahre hat sie dieser Kirche gegeben, und sie ist allein auf diesem Boden gestorben. Ich habe nicht geschlafen. Ich war den ganzen Abend zu Hause, mit dem Radio an, und ich denke immerzu, ich hätte hinuntergehen können.',
    p4: 'Ich war im Gebäude. Das will ich sagen, bevor es jemand anderes für mich sagt. Ich habe ab sieben das Schwellwerk gestimmt und ich wusste überhaupt nicht, dass sie in der Sakristei war.',
    p5: 'Du warst den größten Teil dieses Abends im Kirchenschiff, Denise. Du musst sechsmal an dieser Tür vorbeigelaufen sein.',
    p6: 'Das stimmt nicht und du weißt, dass es nicht stimmt, und ich mache das hier nicht.',
    p7: 'Niemand macht das hier. Pam, bitte.',

    // ---------------------------------------------------------------- t-petra
    e1: 'Ich bin seit vier Jahren Organistin und ich bin sechsunddreißig und ich bin nicht von hier, und diese Woche habe ich begriffen, dass diese drei Tatsachen eine einzige Tatsache sind.',
    e2: 'wo warst du',
    e3: 'Im Turm. Von sieben bis zehn nach acht, beim Stimmen, mit geschlossener Tür, weil die Tür zu sein muss, sonst kommt der Klang zurück.',
    e4: 'Und dann kam ich nicht mehr heraus. Diese Tür klemmt seit März und steht auf einer Liste. Jack hat mich um zehn nach acht herausgelassen und mich vorher vier Minuten lang ausgelacht.',
    e5: 'hattest du streit mit avril wegen des orgelfonds',
    e6: 'Ja. Vor elf Leuten im Gemeinderat im Januar, und ich habe etwas über totes Holz gesagt, das ich jetzt sehr gern zurücknehmen würde.',
    e7: 'Sie hat mich am nächsten Morgen angerufen und mir im selben Satz gesagt, ich hätte recht gehabt und wäre unverschämt gewesen, und dann hat sie mir zweitausend Pfund aus dem Bauunterhaltsfonds besorgt. So war sie.',
    e8: 'Frag Jack wegen der Tür. Frag Jack ehrlich gesagt nach allem. Er ist vierundachtzig und der einzige Mensch in diesem Dorf, der sagt, was er gesehen hat, statt was es bedeutet.',

    // ----------------------------------------------------------------- t-jack
    j1: 'Dieses Dach habe ich 1974 mit meinem Vater und meinem Onkel Ted gedeckt. Angefangen in der letzten Juniwoche, fertig in der zweiten Septemberwoche. Elf Wochen, und in sechs davon hat es geregnet.',
    j2: 'Im August 1974 gab es in dieser Kirche keine Trauung. Im August 1974 gab es in dieser Kirche gar nichts. Sie stand offen zum Himmel und im Chor saßen Tauben.',
    j3: 'bist du dir beim jahr sicher',
    j4: 'Mein Vater ist im Februar 1975 gestorben, und dieses Dach war die letzte Arbeit, die wir zusammen gemacht haben. Ich bin mir beim Jahr so sicher, wie du dir bei deinem eigenen Namen sicher bist.',
    j5: 'Avril hat mich im März gefragt und ich habe es ihr gesagt und dachte, damit wäre es erledigt, und ich sitze seit Dienstag hier und wünschte, ich hätte gesagt, ich erinnere mich nicht.',
    j6: 'du hast denise aus dem turm gelassen',
    j7: 'Zehn nach acht. Sie hatte schon eine Weile dagegen gehämmert. Diese Tür braucht eine neue Klinke, und sie steht bei mir seit März auf einer Liste, und jetzt mache ich es wohl, aus schlechtem Gewissen.',
    j8: 'Und ich sage dir das andere, weil mich niemand gefragt hat und ich darauf gewartet habe, dass es jemand tut.',
    j9: 'Pam Hale ist gegen zwanzig vor acht in diese Sakristei gegangen. Ich war im Kirchenschiff und habe an der Klinke der Turmtür gearbeitet, und sie ist an mir vorbeigegangen und hat mich nicht gesehen, weil niemand einen Mann sieht, der auf den Knien mit einem Schraubenzieher hantiert.',
    j10: 'Ich kenne diese Frau, seit sie im Kinderwagen lag. Ich sage nicht, was es bedeutet. Ich sage, wo sie war.',

    // ----------------------------------------------------------------- t-ines
    i1: 'Ich bin seit zwei Jahren hier. Avril war diejenige, die mir gesagt hat, wem ich worin glauben soll, und jetzt mache ich das allein und mache es schlecht.',
    i2: 'Die Kirchenbücher verlassen den Tresor nicht. Das ist keine Regel, die ich erfunden habe, das steht in der Kirchenordnung, und es gibt ein Buch, in das man sich einträgt, wenn eines herausgeht.',
    i3: 'Pam hat den Band von 1974 am elften März herausgenommen, hat dafür unterschrieben und ihn vier Tage lang gehabt. Sie ist im Gemeinderat und hat die Geschichte des Blumendienstes gemacht, und ich habe keine Sekunde darüber nachgedacht.',
    i4: 'Und als die Polizei sie am Mittwoch gefragt hat, ob sie je mit den Kirchenbüchern zu tun gehabt habe, hat sie gesagt, nie, kein einziges Mal, das sei Avrils Bereich. Ich stand neben ihr.',
    i5: 'stand ihr auto da',
    i6: 'Ich kam um zwanzig nach acht wegen meines Telefons zurück, und ihr Auto stand auf dem Kirchenparkplatz unter der Eibe, wo sie es immer hinstellt, und ich weiß noch, dass ich mich gefreut habe, weil ich dachte, jemand ist bei Avril.',
    i7: 'Ich bin hineingegangen, habe mein Telefon vom Chorgestühl geholt und bin wieder hinaus. Ich bin nicht bis zur Sakristei durchgegangen. Damit muss ich leben, und ich möchte das lieber nicht schriftlich tun.',
    i8: 'Avril war ab sieben in dieser Sakristei. Sie hatte den Scanner und die Lampe und eine Thermoskanne und wäre für einen Feueralarm nicht aufgestanden.',
    i9: 'Pam Hale macht seit vierzig Jahren den Blumenschmuck in dieser Kirche. Im Südschiff hängt eine Tafel mit dem Namen ihrer Mutter darauf. Ich habe ihr zwei Jahre lang zugesehen, wie sie zweimal die Woche daran vorbeigeht.',
  },

  /**
   * The two register chips carry a date rather than a clock, because they sit on
   * a day in March rather than the night of the death — that is what keeps the
   * pair inside one day and the comparison honest.
   */
  claims: {
    'c-avril-nave': 'Avril: im Kirchenschiff, 18:00–18:50',
    'c-cordy-home': 'Pam: in Pams Haus, 19:00–21:00',
    'c-petra-nave': 'Denise: im Kirchenschiff, 19:30–20:50 (laut Pam)',
    'c-petra-tower': 'Denise: im Turm eingeschlossen, 19:00–20:10 (laut Jack)',
    'c-cordy-vestry': 'Pam: in der Sakristei, 19:40–20:00 (laut Jack)',
    'c-jack-nave': 'Jack: im Kirchenschiff, 19:00–20:30',
    'c-cordy-signed-out': 'Pam: hat das Kirchenbuch von 1974 ausgetragen, 11. März',
    'c-cordy-never-register': 'Pam: hatte nie mit den Kirchenbüchern zu tun (ihre Aussage)',
    'c-cordy-carpark': 'Pam: auf dem Kirchenparkplatz, 20:20–20:30 (laut Grace)',
    'c-ines-carpark': 'Grace: auf dem Kirchenparkplatz, 20:10–20:40',
    'c-avril-vestry': 'Avril: in der Sakristei, 19:00–21:00 (laut Grace)',
  },

  motives: {
    'm-register':
      'Eintrag 114 wurde in anderer Handschrift in das Trauungsbuch von 1974 hineingequetscht, und in diesem August war kein Dach auf der Kirche. Ihr Name, ihr Vater, ihr Haus und vierzig Jahre Ansehen in dieser Gemeinde ruhen auf vier Zeilen, die jemand nachträglich geschrieben hat, und der Scan sollte am Montag an die Diözese gehen.',
  },

  contradictions: {
    'x-cordy-vestry':
      'Sie hat sich selbst von sieben bis neun mit dem Radio zu Hause verortet. Jack Tenby kniete im Kirchenschiff an der Klinke der Turmtür und hat gesehen, wie sie um zwanzig vor acht in die Sakristei ging. Niemand sieht einen Mann, der auf den Knien mit einem Schraubenzieher hantiert.',
    'x-cordy-register':
      'Sie hat der Polizei gesagt, sie habe nie mit den Kirchenbüchern zu tun gehabt, das sei Avrils Bereich, und die Pfarrerin stand daneben. Sie hat den Band von 1974 am elften März aus diesem Tresor ausgetragen und ihn vier Tage lang behalten, und es gibt ein Buch, in das man sich einträgt, weil die Kirchenbücher den Tresor nicht verlassen.',
    'x-cordy-carpark':
      'Um zwanzig nach acht stand ihr Auto unter der Eibe, wo sie es immer stehen lässt, und Grace hat es gesehen und sich gefreut, weil sie dachte, es bedeutet, dass jemand bei Avril sitzt.',
    'x-petra-tower':
      'Pam hat die Organistin ins Kirchenschiff gestellt, sechsmal an dieser Tür vorbei. Denise war ab sieben im Turm eingeschlossen, bei geschlossener Tür, weil der Klang sonst zurückkommt, und die Klinke ist seit März kaputt. Jack hat sie um zehn nach acht herausgelassen und sie vorher vier Minuten lang ausgelacht.',
  },

  confrontation: {
    opening:
      'Du bist neun Tage in diesem Dorf und hast mit einem Handwerker geredet und mit einem Mädchen, das nicht von hier ist. Ich mache den Blumenschmuck in dieser Kirche seit 1985. Also los.',
    beats: {
      'v-vestry': {
        press:
          'Du warst zu Hause, mit dem Radio an. Jack war mit einem Schraubenzieher im Kirchenschiff und hat gesehen, wie du um zwanzig vor acht in diese Sakristei gegangen bist.',
        rebuttal:
          'Jack Tenby ist vierundachtzig und erzählt diesem Dorf seit sechzig Jahren, was er gesehen hat, und die Hälfte davon hat er gesehen.',
      },
      'v-register': {
        press:
          'Du hast der Polizei gesagt, du hättest nie mit den Kirchenbüchern zu tun gehabt. Du hast den Band von 1974 am elften März aus diesem Tresor ausgetragen und ihn vier Tage behalten, und die Pfarrerin stand neben dir, als du es gesagt hast.',
        rebuttal:
          'Der Blumendienst. Ich habe die Geschichte des Blumendienstes für das Jubiläum gemacht, was dir jeder in diesem Gemeinderat sagen wird.',
      },
      'v-carpark': {
        press:
          'Dein Auto stand um zwanzig nach acht unter der Eibe. Grace hat es gesehen und sich gefreut, weil sie dachte, es bedeutet, dass Avril nicht allein ist.',
      },
      'v-why': {
        press:
          'Eintrag 114 wurde nachträglich hineingeschrieben, und im August 1974 war kein Dach auf dieser Kirche. Der Scan sollte am Montag an die Diözese gehen.',
      },
    },
    deflections: [
      'Das ist kein Beweis. Das ist ein Dorf, das redet, was es seit der Eroberung tut.',
      'Du hast mit Papier zu tun. Du hast keine Ahnung, was das alles hier ist.',
      'Bring mir etwas, das nicht ein alter Mann auf den Knien ist.',
    ],
    confession:
      'Ich habe es mit dreißig erfahren. Meine Mutter hat es mir in einer Küche in Bicester gesagt, mit dem Boiler an, und dann ist sie elf Wochen später gestorben und hat es mir in die Hand gedrückt.\n\nEs gab keine Trauung. Es gab einen Mann in Coventry, der mich nicht wollte, und einen Vikar hier, der meiner Großmutter etwas schuldete, und vier Zeilen, die 1976 in ein Buch geschrieben wurden, in einer Handschrift, die niemand je überprüfen würde.\n\nUnd ich mache seit vierzig Jahren den Blumenschmuck in dieser Kirche, und ich habe an Weihnachten die Lesung gehalten, und im Südschiff hängt eine Tafel mit dem Namen meiner Mutter darauf, und jedes einzelne Stück davon steht auf diesen vier Zeilen.\n\nAvril ist gekommen, um es mir selbst zu sagen. Das ist der Teil, der gesagt werden soll. Sie ist nicht zuerst zur Diözese gegangen, sie kam am Sonntag in meine Küche und hat sich hingesetzt und gesagt, Pam, ich habe etwas gefunden und ich werde es einschicken müssen, und ich wollte, dass du es von einer Freundin hörst.\n\nUnd ich habe danke gesagt. Ich habe wirklich danke gesagt.\n\nDann bin ich am Dienstag hinuntergegangen, um sie zu bitten, die Lieferung zurückzuhalten. Nur die Lieferung. Nur bis nach dem Jubiläum, habe ich gesagt, und sie hat gesagt, Pam, ich kann nicht, und hat sich zum Scanner umgedreht.\n\nSie war einundsiebzig und ich habe ihr die Hand auf die Schulter gelegt und ich weiß nicht, was ich damit gemeint habe. Ich habe mir das vierhundertmal gesagt und es ist immer noch der einzige wahre Satz, den ich habe.',
  },

  epilogue:
    'Der Band von 1974 ist am Montag mit der Lieferung, die Avril schon beschriftet hatte, ans Diözesanarchiv gegangen, weil niemand daran gedacht hat, ihn aufzuhalten.\n\nEintrag 114 wurde im Juni unter Streiflicht untersucht. Die Linierung der Seite war mit Kugelschreiber neu gezogen worden, und der Eintrag sitzt etwa zwei Millimeter über der Linie, auf der er zu stehen vorgibt.\n\nJack Tenby hat am Donnerstag die Klinke der Turmtür ausgewechselt, und dann die ganze Tür neu gestrichen, und dann die Vorhalle gemacht, und seine Tochter sagt, er hat seitdem nicht aufgehört.\n\nDenise Voss hat bei der Beerdigung gespielt. Sie hat den Bach gewählt, über den Avril sich im Januar beschwert hatte, was die Gemeinde eine Weile gebraucht hat zu verstehen und dann auf einmal verstanden hat.',
};
