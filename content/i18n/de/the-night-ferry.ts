import type { CaseTranslation } from '../caseText';

/**
 * Case 14 — "Die Nachtfähre". German.
 *
 * Six things this had to get right, in this order.
 *
 * 1. Kirkwall is a place the ship never reached, and the whole case rests on
 *    that. `Kirkwall, am Kai` is the chip; the dropped call is `um 21:00`,
 *    announced twice and on every passenger screen. The alibi is built out of
 *    the document that says what should have been true, so the German for it
 *    has to sound as plausible as the English does — an hour smoking `in Lee des
 *    Terminals` at a terminal he never saw.
 *
 * 2. The alibi failure is the character, twice over. He told the bar he was a
 *    `Kapitän auf großer Fahrt` for thirty-one years; he was a `Messesteward`
 *    for nine. Those two words are the case, so neither is softened and neither
 *    drifts: `Messesteward` in Hannah-s message, in Sheila-s account, in the
 *    motive and in the confession, against the rank he grew in the telling.
 *
 * 3. Digits are ship records. `23:10`, `21:00`, `21:04`, `21:05`, `22:25`,
 *    `23:40`, the years 1979, 1983, 2003, 2009, 2011, the cabin 6042 and
 *    `Deck 6`. `1730` and `2106` stay four-digit because that is how a sailor
 *    writes a time and Hannah is one. Everything a passenger says is spoken:
 *    `halb neun`, `fünf nach neun`, `zehn nach zehn`.
 *
 * 4. Names and places. Hannah Pirie, Dougie/Douglas Yarrow, Sheila Kinnaird,
 *    Eck Tulloch, Senga Moar, Nurse Bhatti, the Rona, Lerwick, Peterhead and
 *    Aberdeen keep theirs. Places bare, so no fused preposition can eat them:
 *
 *      ship  → MV Roost        cabins   → Kabinengang auf Deck 6
 *      bar   → Magnus Bar      hospital → Bordhospital
 *      afterdeck → Achterdeck  kirkwall → Kirkwall, am Kai
 *
 * 5. Voice. Four write standard prose and close every sentence; Sheila is all
 *    lowercase and never closes; the player is lowercase and short.
 *
 *      Mama   — warm, dry, and brief. She is a purser and she writes like one.
 *      Dougie — rank-inflated and formal, and he reaches for his years at sea
 *               in almost every message. That tic is the tell.
 *      Eck    — plain, self-disclosing, and he closes with `Ja.` the way the
 *               English closes with `Aye.` — a one-word sentence used twice as
 *               a full stop, which is the whole of his register.
 *      Senga  — procedural and exact, and she gives both halves of anything she
 *               tells you, including the accusation against Eck with the answer
 *               attached.
 *      Sheila — lowercase, running on, and the only one who noticed the thing
 *               that matters without knowing it mattered.
 *
 * 6. `weil sie deine Mutter war` genders Hannah, who is dead and known, and
 *    marks the player with nothing. The English used to say `because you are
 *    her son` and was changed for exactly that reason.
 */
export const theNightFerryDe: CaseTranslation = {
  title: 'Die Nachtfähre',
  blurb:
    'Er kann dir genau sagen, was er gemacht hat, während das Schiff in Kirkwall am Kai lag. Das Schiff hat Kirkwall nie angelaufen.',

  characters: {
    you: 'Du',
    hannah: 'Mama',
    dougie: 'Dougie',
    marisa: 'Sheila',
    eck: 'Eck',
    senga: 'Senga Moar',
  },

  places: {
    ship: 'MV Roost',
    bar: 'Magnus Bar',
    afterdeck: 'Achterdeck',
    cabins: 'Kabinengang auf Deck 6',
    hospital: 'Bordhospital',
    kirkwall: 'Kirkwall, am Kai',
  },

  objects: {
    phone: 'Hannahs Telefon, in einer grünen Hülle mit einem Vogel darauf',
  },

  threads: {
    't-hannah': 'Mama',
    't-crossing': 'Roost, Dienstagsfahrt',
    't-dougie': 'Dougie Yarrow',
    't-marisa': 'Sheila',
    't-eck': 'Eck',
    't-senga': 'Senga Moar',
  },

  briefing: {
    causeOfDeath:
      'Ein Sturz gegen einen Deckbeschlag. Gefunden wurde sie um 23:10 auf dem Achterdeck von einem Besatzungsmitglied auf Rundgang.',
    ruling:
      'Offen. Es herrschte Windstärke sechs und das Achterdeck war nass, und die ersten vier Befragten haben alle dasselbe Wort gesagt, nämlich Unfall.',
    opening:
      'Hannah Pirie war sechsundzwanzig Jahre lang Zahlmeisterin, auf vier Schiffen, und seit sechs Jahren im Ruhestand.\n\nSie war auf der Dienstagsfahrt nach Norden, weil du jetzt in Lerwick wohnst, und sie hatte eine Tasche mit deinem Geburtstagsgeschenk dabei. Gefunden wurde sie um zehn nach elf auf dem Achterdeck.\n\nSie kannte jedes Deck jedes Bootes, auf dem sie je gefahren ist, und sie war keine Frau, die hinfällt.',
  },

  messages: {
    // --------------------------------------------------------------- t-hannah
    n1: 'Gebucht. Dienstag, Kabine und keine Schlafkoje, ich bin einundsechzig und ich habe mir eine Tür verdient.',
    n2: 'bring nichts mit',
    n3: 'Ich habe etwas mitgebracht. Hör auf damit.',
    n4: 'Um 1730 auf die Minute los. Immer noch die einzige Reederei im Norden, die fährt, wenn sie es sagt.',
    n5: 'Das Essen war in Ordnung. Der Seegang nimmt zu und die halbe Bar ist sehr still geworden und ich amüsiere mich prächtig.',
    n6: 'Du glaubst nicht, wer vier Fuß neben mir sitzt. Dougie Yarrow. Er war 2003 mit mir auf der Rona und ich habe ihn seit zweiundzwanzig Jahren nicht zu Gesicht bekommen.',
    n7: 'wer',
    n8: 'Messesteward. Wunderbarer Sänger. Er hat auf der Weihnachtsfeier einen Ewan MacColl gesungen, bei dem vier erwachsene Männer zusammengebrochen sind.',
    n9: 'Er ist ein bisschen komisch mit mir geworden. Ich glaube, ich habe ihm etwas peinlich gemacht, und das wollte ich nicht, ich habe mich nur gefreut.',
    n10: 'Gehe für fünf Minuten nach hinten raus. Da draußen pfeift es. 2106. Nacht, mein Schatz x',

    // ------------------------------------------------------------- t-crossing
    g1: 'Diese Gruppe ist für Passagiere der Dienstagsfahrt nach Norden, die informiert bleiben wollten. Ich bin die Zweite Offizierin und ich habe sie eingerichtet, weil vierzig von Ihnen an einem Morgen im Büro angerufen haben.\n\nAn Bord ist am Dienstagabend eine Passagierin gestorben. Police Scotland hat die Unterlagen des Schiffes und spricht mit den Leuten einzeln.',
    g2: 'sie war zwei stunden in meiner bar und sie war die beste gesellschaft auf diesem boot. mehr will ich hier drin nicht sagen',
    g3: 'Eine Tragödie, und mein Beileid an die Familie. Ich möchte allen sagen, dass das achtere Manöverdeck bei Windstärke sechs für Passagiere nicht zugänglich sein sollte, und das habe ich dem Kapitän auch gesagt. Einunddreißig Jahre auf See und ich habe diese Tür noch nie eingehakt stehen sehen.',
    g4: 'Das Achterdeck ist ein Passagierdeck und es ist bei allem Wetter unter Windstärke acht offen. Die Tür war nicht eingehakt.',
    g5: 'dougie du warst bis halb zehn in der bar du warst bei windstärke sechs nirgends in der nähe von der tür',
    g6: 'Bitte tun Sie das nicht hier. Was auch immer jemand hat, gebt es dem zuständigen Beamten, und ich gebe jedem eine Nummer, der eine haben möchte.',

    // --------------------------------------------------------------- t-dougie
    d1: 'Mein aufrichtiges Beileid. Deine Mutter und ich haben zusammen auf der Rona gefahren und sie war eine erstklassige Zahlmeisterin, und das sage ich jedem, der fragt.',
    d2: 'du warst mit ihr in der bar',
    d3: 'Ich habe ab ungefähr halb neun in der Magnus Bar etwas getrunken. Wir haben kurz gesprochen. Sie war gut in Form und zwischen uns war rein gar nichts, was auch immer irgendwer in einem Gruppenchat andeuten will.',
    d4: 'und danach',
    d5: 'Ich bin für den Kirkwall-Anlauf nach oben. Das mache ich immer. Halb zehn am Kai, und ich stand bis Viertel vor elf am Ende der Rampe und habe in Lee des Terminals geraucht. Jeder, der diese Strecke regelmäßig fährt, wird dir sagen, dass das die beste Stunde der Überfahrt ist.',
    d6: 'Einunddreißig Jahre auf See, den größten Teil davon auf der Brücke, und ich habe diese Ansteuerung bei Schlimmerem als am Dienstag gemacht.',
    d7: 'ihr telefon lag hinter der bar',
    d8: 'Weil ich es dorthin gelegt habe. Ich bin gegen zehn nach zehn wieder durch die Magnus gekommen und es lag auf einem Tisch bei der achteren Tür, in einer grünen Hülle, und ich habe es dem Mädchen im Dienst gegeben. Das würde ich für jeden tun.',
    d9: 'Ich würde näher am eigenen Haus suchen. Auf diesem Deck war am Dienstag ein Mann mit einem Vorstrafenregister so lang wie dein Arm, und jeder an Bord kennt seinen Namen, und mir fällt auf, dass das niemand in einen Gruppenchat stellt.',

    // --------------------------------------------------------------- t-marisa
    m1: 'ich mache vier nächte die woche hinter dieser bar und man wird sehr gut darin zu erkennen, wer einen schönen abend hat. deine mutter hatte einen schönen abend',
    m2: 'sie kam gegen halb neun nach dem essen rein und hat sich ans ende gesetzt, wo die reling ist. sie hatte den ganzen abend einen gin und hat ihn sich eingeteilt wie eine profi',
    m3: 'und dougie yarrow hielt seit aberdeen hof an dieser bar. kapitän auf großer fahrt. einunddreißig jahre. erster offizier auf den tankern. er hat mir dieselben vier geschichten auf sechs überfahrten erzählt und ich habe über alle gelacht, weil das der job ist',
    m4: 'sie sagte, dougie yarrow. du warst mit mir auf der rona, du hast die messe gemacht. und sie war HELLAUF BEGEISTERT. sie hat sich so gefreut, ihn zu sehen. sie hat irgendetwas davon gesagt, dass er auf einer weihnachtsfeier gesungen hat',
    m5: 'da waren vielleicht acht leute an dem ende der bar. niemand hat ihn ausgelacht. das will ich klarstellen, weil ich es durchgegangen bin. niemand hat gelacht',
    m6: 'er ist farblich zum teppich geworden und hat sich hingesetzt und kein wort mehr gesagt. sie ist gegen fünf nach neun durch die achtere tür an die luft gegangen und hat ihr telefon auf meinem tresen liegen lassen, und ich habe es ins regal unter die kasse gelegt',
    m7: 'er ist ihr gegen zwanzig nach raus gefolgt. ich habe gesehen, wie er durch die achtere tür ging, weil ich die reling abgeräumt habe und man sich daran vorbeilehnen muss. er war keine zwei minuten weg und er war keine stunde weg, ich könnte es dir nicht sagen, es war rappelvoll',
    m8: 'er sagt er hat das telefon um zehn nach zehn abgegeben',
    m9: 'er hat mir gar nichts gegeben. frag senga, sie hat das fundbuch und sie hat die barkasse und sie hat jede tür auf diesem schiff im protokoll. senga moar rät bei gar nichts',
    m10: 'und bevor irgendwer mit eck tulloch anfängt. alle fangen mit eck tulloch an. er ist zweimal im monat auf dem boot und er war im gefängnis und er sagt es dir in den ersten zehn minuten selbst',

    // ------------------------------------------------------------------ t-eck
    e1: 'Ich habe zwischen 1979 und 1983 vier Jahre in Peterhead gesessen, für etwas, das ich getan habe. Ich sage es zuerst, damit sich niemand dazu durchringen muss. Ja.',
    e2: 'Ich mache diese Überfahrt zweimal im Monat, um meine Schwester zu besuchen. Vierzig Jahre. Ich könnte dieses Boot blind ablaufen.',
    e3: 'warst du auf dem achterdeck',
    e4: 'Vorher, ja. Vor dem Essen. Ich gehe zum Rauchen raus und ich stehe jedes Mal in derselben Ecke und die Besatzung weiß das alles.',
    e5: 'Ab fünf nach neun war ich mit der Schwester im Bordhospital und habe meinen Blutdruck messen lassen. Das muss ich machen und sie trägt es ins Buch ein. Ich war bis fünf nach halb elf da drin, weil sie mich sitzen ließ, bis er runter war.',
    e6: 'Sie heißt Bhatti. Sie wird es aufgeschrieben haben. Auf einem Boot wird alles aufgeschrieben, das ist das eine an einem Boot.',
    e7: 'haben wir kirkwall angelaufen',
    e8: 'Nein. Es kam um neun über die Lautsprecher und es stand die ganze Nacht auf den Bildschirmen. Rampe ausgefallen. Wir sind vorbeigefahren und waren früh in Lerwick und ich stand um halb sieben am Kai und nichts hatte auf. Ja.',
    e9: 'Jeder, der auf diesem Boot und wach war, weiß, dass wir nie reingefahren sind. Man hätte in einer Kabine bei zugezogener Tür schlafen müssen, um das nicht zu wissen.',

    // ---------------------------------------------------------------- t-senga
    s1: 'Zweite Offizierin, elf Jahre bei der Reederei. Ich habe das alles Police Scotland gegeben und ich gebe es dir, weil sie deine Mutter war und weil du mir eine gerade Frage gestellt hast.',
    s2: 'Der Kirkwall-Anlauf wurde um 21:00 gestrichen. Die Rampe dort hatte am Montag einen Hydraulikschaden. Es lief zweimal über die Lautsprecher, es stand ab 21:00 bis zum Anlegen auf den Passagierbildschirmen auf jedem Deck, und es steht im Decklog in der Handschrift des Kapitäns.',
    s3: 'Wir haben nicht angelegt. Es war keine Gangway ausgebracht, weil es nichts gab, wohin man eine hätte ausbringen können. Niemand ist an Land gegangen, niemand ist an Bord gekommen, und das Schiff hat den Kurs nicht innerhalb von sechs Meilen um Kirkwall geändert.',
    s4: 'das telefon',
    s5: 'Es ist um 21:04 in Sheila Kinnairds Handschrift ins Fundbuch eingetragen worden, grüne Hülle, gefunden auf dem Bartresen. Es lag von da an im Regal unter der Kasse, bis ich es ihr um 23:40 abgenommen und in den Safe gelegt habe. Um zehn nach zehn hat niemand irgendwem irgendetwas gegeben.',
    s6: 'Ich sage dir das, was dir noch niemand gesagt hat, nämlich dass der erste Gedanke der Besatzung Eck Tulloch war. Er war vor dem Essen auf dem Achterdeck, er hat eine Verurteilung von 1979, und seiner ist der Name, der auf diesem Schiff jedes Mal fällt, wenn etwas passiert.',
    s7: 'Er war von 21:05 bis 22:25 mit Schwester Bhatti im Bordhospital und sie hat ihn ein- und ausgetragen. Ich sage dir beide Hälften davon, weil mir lieber ist, du hörst die Beschuldigung von mir mit der Antwort daran.',
    s8: 'und yarrow',
    s9: 'Douglas Yarrow ist neun Jahre für diese Reederei gefahren, als Angehöriger des Küchenpersonals, und ist 2011 gegangen. Er hat nie ein Befähigungszeugnis besessen. Das ist kein Geheimnis, es steht auf einer Musterrolle, und keine einzige Person in dieser Bar hatte einen Grund, es nachzuschlagen.',
    s10: 'Ich bin auf Schiffen, seit ich neunzehn bin, und ich habe eine Menge Männer getroffen, die sich im Erzählen einen Rang zugelegt haben. Meistens ist es harmlos und meistens ist es traurig. Ich wusste nicht, was ich damit anfangen soll, und ich weiß es immer noch nicht.',
  },

  /**
   * The two phone claims are the object pair and their windows overlap by
   * nesting — Dougie-s 22:10–22:25 sits inside the 21:04–23:00 the lost
   * property book holds. He needed a reason to have been aft and picked an
   * object that was already written down.
   */
  claims: {
    'c-dougie-bar': 'Dougie: in der Magnus Bar, 20:30–21:05 (laut Sheila)',
    'c-dougie-kirkwall': 'Dougie: an Land in Kirkwall, 21:30–22:45',
    'c-phone-dougie': 'Dougie: hatte Hannahs Telefon, 22:10–22:25',
    'c-hannah-bar': 'Hannah: in der Magnus Bar, 20:30–21:00 (laut Sheila)',
    'c-hannah-afterdeck': 'Hannah: auf dem Achterdeck, 21:05–22:10 (laut Sheila)',
    'c-dougie-afterdeck': 'Dougie: auf dem Achterdeck, 21:35–22:00 (laut Sheila)',
    'c-eck-hospital': 'Eck: im Bordhospital, 21:05–22:25',
    'c-dougie-aboard': 'Dougie: an Bord der Roost, 21:00–23:00 (laut Decklog)',
    'c-phone-marisa': 'Sheila: hatte Hannahs Telefon, 21:04–23:00 (Fundbuch)',
    'c-marisa-bar': 'Sheila: hinter der Magnus Bar, 20:00–23:00 (laut Senga)',
    'c-eck-afterdeck': 'Eck: auf dem Achterdeck, 21:30–22:00 (Aussage der Besatzung)',
  },

  motives: {
    'm-messroom':
      'Er hatte der Magnus Bar über sechs Überfahrten hinweg erzählt, er sei Kapitän auf großer Fahrt, einunddreißig Jahre, Erster Offizier auf den Tankern. Hannah Pirie ist 2003 mit ihm auf der Rona gefahren und hat ihn erkannt und es vor acht Leuten gesagt, und sie hat sich gefreut, ihn zu sehen. Sie war nicht grausam. Sie hat sich gefreut.',
  },

  contradictions: {
    'x-dougie-deck':
      'Er verortet sich ab halb zehn an Land in Kirkwall. Sheila Kinnaird hat gesehen, wie er gegen zwanzig nach neun durch die achtere Tür ging, weil sie die Reling abgeräumt hat und man sich an dieser Tür vorbeilehnen muss. Sie könnte dir nicht sagen, wie lange er weg war. Sie könnte dir sagen, dass er gegangen ist.',
    'x-dougie-kirkwall':
      'Es gab keinen Kirkwall-Anlauf. Die Rampe ist am Montag ausgefallen und der Anlauf wurde um 21:00 gestrichen, zweimal über die Lautsprecher angesagt und bis Lerwick auf den Passagierbildschirmen auf jedem Deck gezeigt. Es war keine Gangway ausgebracht, weil es nichts gab, wohin man eine hätte ausbringen können, und das Schiff hat den Kurs nicht innerhalb von sechs Meilen um den Ort geändert. Er war die ganze Stunde an Bord, die er am Ende der Rampe verraucht hat, in Lee eines Terminals, das er nie gesehen hat.',
    'x-phone':
      'Er brauchte einen Grund, achtern gewesen zu sein, also hat er einen erfunden und dabei den falschen Gegenstand gewählt. Hannah hat ihr Telefon auf dem Bartresen liegen lassen, als sie an die Luft ging. Es ist um 21:04 in Sheila Kinnairds Handschrift ins Fundbuch eingetragen worden, grüne Hülle, und es lag im Regal unter der Kasse, bis die Zweite Offizierin es um 23:40 in den Safe gelegt hat. Er hat um zehn nach zehn niemandem irgendetwas gegeben.',
    'x-eck':
      'Der erste Gedanke der Besatzung war Eck Tulloch, weil er vor dem Essen dort draußen war, wegen vier Jahren in Peterhead ab 1979, und weil seiner der Name ist, der auf diesem Schiff fällt, sobald etwas passiert. Er war von 21:05 bis 22:25 mit Schwester Bhatti im Bordhospital, ein- und ausgetragen, und saß still, bis sein Blutdruck runter war.',
  },

  confrontation: {
    opening:
      'Du solltest vorsichtig sein. Ich habe einunddreißig Jahre auf See und einen Ruf an dieser Küste, und ich war sehr geduldig mit einer Familie in Not.',
    beats: {
      'a-deck': {
        press:
          'Du hast dich ab halb zehn an Land. Sheila Kinnaird hat dich zwanzig Minuten davor durch die achtere Tür gehen sehen.',
        rebuttal:
          'Ein Mädchen von vierunddreißig, vier Reihen tief an einer Bar, bei Windstärke sechs, an einer Kasse. Darauf würde ich keinen Hund verurteilen und du auch nicht.',
      },
      'a-phone': {
        press:
          'Du hast gesagt, du hättest ihr Telefon um zehn nach zehn bei der achteren Tür gefunden und abgegeben. Es wurde um vier nach neun ins Fundbuch eingetragen und hat das Regal unter der Kasse nie verlassen.',
        rebuttal:
          'Dann ist das Buch falsch, oder das Mädchen hat es am Ende ihrer Schicht nachgetragen, was die alle machen. Du hast noch nie hinter einer Bar gearbeitet.',
      },
      'a-kirkwall': {
        press:
          'Du hast eine Stunde an der Rampe in Kirkwall geraucht. Die Rampe ist am Montag ausgefallen, der Anlauf wurde um neun gestrichen, und das Schiff ist nie auf sechs Meilen herangekommen.',
      },
      'a-why': {
        press:
          'Sie hat gesagt, du warst mit ihr auf der Rona und du hast die Messe gemacht. Sie hat sich gefreut, dich zu sehen. Niemand an dieser Bar hat gelacht.',
      },
    },
    deflections: [
      'Frag irgendwen an dieser Küste nach Dougie Yarrow. Nur zu. Frag sie.',
      'Du nimmst das Wort einer Bardame und eines Mannes, der vier Jahre in Peterhead gesessen hat.',
      'Deine Mutter würde sich schämen für das, was du einem Mann antust, der mit ihr gefahren ist.',
    ],
    confession:
      'Ich habe die Ansage gehört. Das möchte ich richtiggestellt haben, weil es mir jetzt zweimal so vorgehalten worden ist, als hätte ich sie verschlafen.\n\nIch habe sie um neun Uhr in der Bar gehört und ich habe sie ganz gehört.\n\nUnd vier Tage später, als der Beamte mich gebeten hat, meinen Abend zu erklären, habe ich den Fahrplan auf meinem Telefon geöffnet und vorgelesen, was hätte passieren sollen, und ich habe es ohne mit der Wimper zu zucken getan, weil das die Version ist, in der ich seit 2011 lebe, und darin ist es bequemer.\n\nSie hat es freundlich gesagt. Das soll aufgeschrieben werden. Sie hat gesagt, Dougie Yarrow, du warst mit mir auf der Rona, du hast die Messe gemacht, und sie war hellauf begeistert, und sie hat jedes Wort davon so gemeint, und sie hat mich nach meiner Mutter gefragt.\n\nAcht Leute. Niemand hat gelacht. Ich bin diese Bar Gesicht für Gesicht durchgegangen und nicht einer hat gelacht, und ich will, dass du verstehst, dass es das schlimmer gemacht hat, und ich kann dir nicht erklären, warum.\n\nIch bin ihr rausgefolgt, um sie zu bitten, es nicht noch einmal zu sagen. Nur dafür bin ich rausgegangen. Ich habe gesagt, Hannah, tu mir einen Gefallen, und sie hat mich angesehen — und sie wollte nett darüber sein. Ich konnte sehen, wie sie sich bereit machte, nett darüber zu sein.\n\nIch habe die Hand ausgestreckt und sie ist gegen den Beschlag zurückgefallen.\n\nUnd ich stand im Regen auf diesem Deck und ich habe nicht eine einzige Sache getan, die ein Kapitän auf großer Fahrt getan hätte, weil ich keiner bin und nie einer war, und es lebt niemand mehr, den das überraschen würde, außer mir.\n\nIch habe die Messe gemacht.\n\nIch habe es neun Jahre gemacht und ich war gut darin und sie hat sich nach zweiundzwanzig Jahren an mein Singen erinnert, und ich habe sie dafür getötet, dass sie es gesagt hat.',
  },

  epilogue:
    'Die Tasche mit deinem Geschenk stand in Kabine 6042, den Mantel über dem Ende der Koje gefaltet, so wie sie auf jedem Schiff, auf dem sie je gearbeitet hat, einen Mantel gefaltet hat.\n\nSenga Moar hat anderthalb Tage ausgesagt. Sie wurde elfmal gefragt, ob ein Passagier sich bei einem Hafenanlauf geirrt haben könnte, und elfmal hat sie gesagt, dass die Bildschirme die Meldung zehn Stunden lang auf jedem Deck in einer Schleife von neunzig Sekunden gezeigt haben.\n\nSheila Kinnaird macht immer noch vier Nächte die Woche auf dieser Strecke. Sie hat nichts anders ins Fundbuch geschrieben, weil an der Art, wie sie es eingetragen hat, nie etwas falsch war.\n\nEck Tulloch wurde um eine Aussage zu seinen Wegen gebeten und hat eine gemacht, und hat den Beamten dann gebeten hineinzuschreiben, dass die Schwester ihn achtzig Minuten hat sitzen lassen und dass er das Fußballspiel verpasst hat. Er macht die Überfahrt zweimal im Monat, um seine Schwester zu besuchen. Er steht immer noch in derselben Ecke.\n\nDie Rona ist 2009 in Aliaga abgewrackt worden. Im Aberdeener Büro hängt ein Foto ihrer Besatzung von der Weihnachtsfeier 2003, vierzig und mehr Leute mit Papierhüten, und deine Mutter ist in der zweiten Reihe.\n\nEr ist auch darauf. Hinten links, mitten im Lied, und jedes Gesicht vor ihm ist umgedreht und hört zu.',
};
