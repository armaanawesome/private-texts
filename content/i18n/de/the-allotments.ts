import type { CaseTranslation } from '../caseText';

/**
 * Case 11 — "Die Kleingärten". German.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The fork has one name and the whole feud is about whose it is, so
 *    `Grabegabel mit dem umwickelten Griff` is the object and `die Gabel` is
 *    what everybody actually calls it — a short form of one name, not a second
 *    name. Both chips say `die umwickelte Gabel`, because the point of `x-fork`
 *    is that two people claim the identical thing across the identical window.
 *    It is also the one contradiction that convicts nobody: what it proves is
 *    that the fork was inside Wilf-s own door, so picking it up means standing
 *    where he stood.
 *
 * 2. Digits are plot numbers and years, plus the one camera timestamp. Plots
 *    are `14`, `3`, `22`, `40`; the years are 1998 and 2010; and only the
 *    scrapyard camera writes a clock — `19:02` and `19:11`. Everything a person
 *    says is spoken: `halb acht`, `halb sieben`, `von sechs bis halb acht`.
 *
 * 3. Names and places. Wilf Sankey, Deb and Ray Threlfall, Nev Ashworth, Joyce
 *    Ubani, Sami Rahimi, Ted Harrap and Carr Bank keep theirs. Places bare, so
 *    no fused preposition can eat them — `in der Schuppenreihe` still contains
 *    `Schuppenreihe`:
 *
 *      site   → Kleingartenanlage Carr Bank   tank → Wassertank
 *      plot14 → Parzelle 14                   lane → Carr Bank Lane
 *      plot3  → Parzelle 3                    shedrow → Schuppenreihe
 *
 *    `Carr Bank Lane` keeps the English word: it is a road name on a sign, and
 *    `Carr-Bank-Weg` would be inventing a German street that does not exist.
 *
 * 4. Voice. Four of the six write standard prose and close every sentence, so
 *    they are separated by what each is responsible for:
 *
 *      Wilf  — the secretary. Minutes, tenancy, the council, the blank sheet.
 *              He is the only one who writes about duty.
 *      Joyce — the treasurer. She keeps everything, and it shows: dates,
 *              footage, who refused her and for how long.
 *      Sami  — newest on the site and counting. Four trips, four times past the
 *              end of 14, and reluctant about every word of it.
 *      Deb   — defensive and possessive, and the only one who puts somebody
 *              else-s name into a group chat.
 *      Nev   — lowercase sentence starts with the nouns capitalised, no full
 *              stop, and he lowercases people: `deb`, `joyce`, `sami`. That is
 *              what separates him from the player, who is lowercase throughout
 *              and short.
 *
 * 5. `Er war dein Vater` genders Wilf, who is dead and male, and marks the
 *    player with nothing. The English line used to be the third place this game
 *    told the player what they are, and it disagreed with the other two.
 */
export const theAllotmentsDe: CaseTranslation = {
  title: 'Die Kleingärten',
  blurb:
    'Jeder auf dieser Anlage weiß, wem die Gabel gehört. Niemand hat gefragt, in wessen Schuppen sie zehn Tage lang gestanden hat.',

  characters: {
    you: 'Du',
    wilf: 'Wilf',
    deb: 'Deb',
    nev: 'Nev',
    joyce: 'Joyce',
    sami: 'Sami',
  },

  places: {
    site: 'Kleingartenanlage Carr Bank',
    plot14: 'Parzelle 14',
    plot3: 'Parzelle 3',
    shedrow: 'Schuppenreihe',
    tank: 'Wassertank',
    lane: 'Carr Bank Lane',
  },

  objects: {
    fork: 'Grabegabel mit dem umwickelten Griff',
  },

  threads: {
    't-wilf': 'Papa',
    't-society': 'Pächter Carr Bank',
    't-nev': 'Nev',
    't-sami': 'Sami',
    't-joyce': 'Joyce Ubani',
  },

  briefing: {
    causeOfDeath: 'Ein einzelner Schlag. Die Gabel lag noch neben ihm auf dem Weg.',
    ruling:
      'Offen. Auf dieser Anlage läuft seit fünfzehn Jahren ein Streit um eine Hecke, und die Gabel gehört dem Mann am anderen Ende davon.',
    opening:
      'Wilf Sankey war einunddreißig Jahre lang Schriftführer der Kleingartenanlage Carr Bank und hat die Protokolle jeder Jahresversammlung in dasselbe gebundene Notizbuch geschrieben.\n\nGefunden wurde er an einem Oktoberabend um halb acht in der Schuppenreihe, die Feuersaison zwei Tage alt und die Gabel von irgendwem neben ihm.\n\nEr war dein Vater. Er hat dich jeden Sonntag angerufen und dir vom Wasserdruck erzählt.',
  },

  messages: {
    // ----------------------------------------------------------------- t-wilf
    w1: 'Die Gemeinde hat wieder wegen unbewirtschafteter Parzellen geschrieben. Vier auf unserer Anlage, und sie wollen bis Ende des Monats eine Entscheidung.',
    w2: 'ist deb eine davon',
    w3: 'Ist sie. Zwei Drittel davon sind Quecke, und sie hat keinen Spaten mehr angefasst, seit Ray gestorben ist, und das sind im Mai drei Jahre.',
    w4: 'du musst sie ihr also wegnehmen',
    w5: 'Ich muss tun, was der Pachtvertrag sagt, oder ich muss schreiben und sie bitten, mich nicht dazu zu zwingen. Ich sitze seit Dienstag vor einem leeren Blatt.',
    w6: 'Der Schuppen ist Rays Schuppen. Er hat ihn 1998 aus einer Palettenlieferung gebaut und die Hälfte davon ist nicht gerade. Sie sitzt samstags mit einer Thermoskanne darin.',
    w7: 'papa',
    w8: 'Ich habe es gemacht. Zwei Seiten, mit der Empfehlung einer Ausnahme aus Härtefallgründen, und ich habe hineingeschrieben, dass eine Parzelle nicht nur eine Parzelle ist, was sie hassen werden.',
    w9: 'Ich sage es ihr heute Abend, bevor ich es abschicke. Sie hatte drei Jahre lang Leute, die vor ihr über ihre Parzelle geredet haben, und mir wäre lieber, sie hört es im Stehen.',
    w10: 'Bin jetzt oben und mache die Vorhängeschlösser, bevor das Licht geht. Ruf mich morgen an, dann erzähle ich dir, wie es gelaufen ist.',

    // -------------------------------------------------------------- t-society
    s1: 'Liebe Pächterinnen und Pächter. Wilf wurde am Dienstagabend in der Schuppenreihe gefunden und er ist gestorben. Die Polizei hat das obere Ende abgesperrt und die Anlage bleibt geschlossen, bis sie etwas anderes sagt. Ich bin ab dieser Nachricht kommissarische Schriftführerin und es tut mir leid, dass ich es auf diesem Weg tue.',
    s2: 'einunddreißig Jahre hat er die Protokolle gemacht und das Wasser und den Container und die Saatgutbestellung, und keiner von uns hat ihn je darum gebeten. ich habe mich fünfzehn davon mit ihm über eine Hecke gestritten und ich würde viel dafür geben, mich jetzt mit ihm zu streiten',
    s3: 'Ich war den ganzen Abend auf 14. Die Feuersaison hat am Sonntag angefangen und ich hatte vierzehn Tage Schnittgut und war damit von sechs bis halb acht unten am hinteren Ende.',
    s4: 'Die ganze Zeit am Verbrennen. Jeder, der am Dienstag in Windrichtung stand, wird es dir sagen.',
    s5: 'Und es ist Nevs Gabel. Jeder auf dieser Anlage weiß, dass es Nevs Gabel ist, sie hat das Klebeband seit dem Jubiläum am Griff.',
    s6: 'deb',
    s7: 'Das reicht. Was auch immer jemand zu sagen hat, sagt es einem Polizisten und nicht einundsechzig Leuten, die sich einen Wassertank teilen.',

    // ------------------------------------------------------------------ t-nev
    v1: 'dein Vater und ich haben uns 2010 wegen einer Hecke zerstritten und wir haben kein einziges Mal aufgehört zu reden. das ist eine Anlage und niemand von außerhalb hat das je verstanden',
    v2: 'es ist deine gabel',
    v3: 'ist sie. Klebeband am Griff, meine Initialen in den Schaft gebrannt, und ich habe sie seit vorletzter Woche nicht angefasst, weil dein Vater sie sich geliehen hat',
    v4: 'er hat sie am freitag geholt, für die Himbeerruten am oberen Ende, und ich habe gesagt, behalt sie, bis du fertig bist, und seitdem steht sie in seinem Schuppen. joyce hat gesehen, wie er sie hochgetragen hat',
    v5: 'ich war ab sechs mit einer Taschenlampe auf 3 und habe die letzten Bohnen abgeräumt. sami war die ganze Zeit zwei Parzellen weiter und wir haben uns über den Fußball zugerufen',
    v6: 'und das sage ich einmal. deb Threlfall hat meinen Namen in einen Gruppenchat mit einundsechzig Leuten gestellt, bevor dein Vater unter der Erde war. ich kenne sie seit zwanzig Jahren und ich wusste nicht, dass sie das in sich hat',
    v7: 'red mit sami. er ist neuer und er schuldet niemandem auf dieser Anlage etwas, was ihn auf Carr Bank zum einzigen verlässlichen Zeugen unter hundertvierzig Parzellen macht',

    // ----------------------------------------------------------------- t-sami
    m1: 'Ich habe Parzelle 22 seit vierzehn Monaten. Dein Vater hat mir an meinem ersten Samstag eine Tüte Steckzwiebeln gegeben und mir gesagt, ich soll mir Zuckermais sparen, und er hatte recht.',
    m2: 'Ich war am Dienstag oft am Wassertank. Die Tonnen auf 22 sind leer, bis das Dach drauf ist, also fülle ich Kannen, und das sind vier Gänge.',
    m3: 'hat deb verbrannt',
    m4: 'Nein. Und ich bin das durchgegangen, weil ich nicht derjenige sein wollte, der es sagt. Ihr Haufen war da und er war nicht angezündet. Ich bin viermal am Ende von 14 vorbeigekommen und es gab an dem Abend auf der ganzen Anlage keinen Rauch außer bei Ted Harrap auf 40.',
    m5: 'Sie war zweimal mit mir am Wassertank. Wir haben über das Dach geredet. Sie war völlig normal und hat nach meiner Mutter gefragt.',
    m6: 'hast du sie bei den schuppen gesehen',
    m7: 'Halb sieben, ungefähr. Sie ist die Schuppenreihe hochgegangen, mit je einer leeren Kanne in jeder Hand, was mir aufgefallen ist, weil man da keine leeren hochträgt, der Wassertank ist in die andere Richtung.',
    m8: 'Frag Joyce wegen der Carr Bank Lane. Am Tor des Schrottplatzes ist eine Kamera, die genau hinaufschaut, und sie versucht seit zwei Jahren, das Material wegen der illegalen Müllablagerung zu bekommen.',

    // ---------------------------------------------------------------- t-joyce
    j1: 'Ich bin seit neunzehn Jahren Kassenwartin und ich hebe alles auf, was die Leute lustig finden, bis zu der Woche, in der sie es nicht mehr tun.',
    j2: 'Der Schrottplatz hat mir am Donnerstag elf Tage Material gegeben, nachdem er es mir zwei Jahre lang wegen der illegalen Müllablagerung verweigert hat. Es hat gebraucht, dass ein Polizist fragt statt ich.',
    j3: 'Sie schaut genau die Carr Bank Lane hinauf. Deborah Threlfall geht um 19:02 hinauf und um 19:11 wieder hinunter, und in elf Tagen Material ist zu keinem Zeitpunkt ein Feuer auf dieser Anlage zu sehen außer Teds.',
    j4: 'die gabel',
    j5: 'Wilf hat diese Gabel am Freitag vor einer Woche zu seinem eigenen Schuppen hochgetragen und ich habe ihm dabei zugesehen, weil er stehen geblieben ist und sich den ganzen Weg über seine Schulter beschwert hat. Sie stand von da an bis Dienstag innen an seiner Tür.',
    j6: 'Wer sie also aufgehoben hat, hat sie in dieser Schuppenreihe aufgehoben, an der Stelle, an der er stand. Vergiss Nev. Es sagt dir, wer nah genug dran war, um sie zu erreichen.',
    j7: 'Und Wilf war ab fünf mit den Vorhängeschlössern in dieser Reihe unterwegs. Er macht das jeden Oktober und es dauert bei ihm anderthalb Stunden, weil er mit allen redet.',
    j8: 'Der Brief der Gemeinde über die vier Parzellen kam auch an mich. Deborah sitzt seit dem Elften darauf und hat mich zweimal angerufen, ob ein Widerspruch etwas kostet.',
    j9: 'Ich habe ihr gesagt, Wilf entscheidet. Das waren meine Worte. Ich habe es freundlich gemeint, weil Wilf sie mochte, und ich denke seitdem jede Nacht über die Form dieses Satzes nach.',
  },

  /**
   * Two exclusive pairs with different shapes. `deb-evening` overlaps by
   * nesting — the tank window sits inside the burning window — while the two
   * fork claims cover the identical window, because they are two people
   * claiming one object across the same evening.
   */
  claims: {
    'c-wilf-tank': 'Wilf: am Wassertank, 17:00–17:25',
    'c-deb-plot': 'Deb: auf Parzelle 14, 18:00–19:30',
    'c-deb-burning': 'Deb: verbrennt Schnittgut, 18:00–19:30',
    'c-fork-nev': 'Nev: hatte die umwickelte Gabel, 18:00–19:30 (laut Deb)',
    'c-nev-plot3': 'Nev: auf Parzelle 3, 18:00–20:00 (laut Sami)',
    'c-sami-tank': 'Sami: am Wassertank, 18:20–19:20',
    'c-deb-tank': 'Deb: füllt Kannen am Wassertank, 18:20–19:20 (laut Sami)',
    'c-deb-shedrow': 'Deb: in der Schuppenreihe, 18:30–18:50 (laut Sami)',
    'c-deb-lane': 'Deb: in der Carr Bank Lane, 19:00–19:10 (Schrottplatzkamera)',
    'c-fork-wilf': 'Wilf: hatte die umwickelte Gabel, 18:00–19:30 (laut Joyce)',
    'c-wilf-shed': 'Wilf: in der Schuppenreihe, 17:30–19:30 (laut Joyce)',
  },

  motives: {
    'm-plot':
      'Die Gemeinde wollte bis Ende des Monats eine Entscheidung über vier unbewirtschaftete Parzellen, und ihre war eine davon. Parzelle 14 war Rays Parzelle und der Schuppen ist der Schuppen, den er 1998 gebaut hat, und sie sitzt seit den drei Jahren seit seinem Tod samstags darin.',
  },

  contradictions: {
    'x-deb-shedrow':
      'Sie hat sich selbst von sechs bis halb acht unten am hinteren Ende von 14 verortet. Gegen halb sieben hat Sami Rahimi gesehen, wie sie die Schuppenreihe hochging, mit je einer leeren Kanne in jeder Hand, was ihm aufgefallen ist, weil man da keine leeren hochträgt. Der Wassertank ist in die andere Richtung.',
    'x-deb-burning':
      'Sie hat gesagt, sie habe die ganze Zeit verbrannt und jeder in Windrichtung werde das bestätigen. Ihr Haufen war nie angezündet. Sami ist viermal am Ende von 14 vorbeigekommen und der einzige Rauch auf Carr Bank an diesem Abend war Ted Harrap auf 40, und sie stand zweimal mit Sami am Wassertank und füllte Kannen, redete über sein Dach und fragte nach seiner Mutter.',
    'x-deb-lane':
      'Die Schrottplatzkamera schaut genau die Carr Bank Lane hinauf, und Joyce Ubani hatte zwei Jahre lang wegen der illegalen Müllablagerung um dieses Material gebeten. Es hat gebraucht, dass ein Polizist statt ihrer fragt. Deborah Threlfall geht um 19:02 die Lane hinauf und um 19:11 wieder hinunter, und in elf Tagen Material gibt es auf dieser Anlage kein Feuer außer Teds.',
    'x-fork':
      'Jeder auf dieser Anlage erkennt diese Gabel auf vierzig Fuß, und genau deswegen hat niemand gefragt, wo sie gewesen ist. Wilf hat sie sich am Freitag vor einer Woche für die Himbeerruten geliehen und selbst zu seinem eigenen Schuppen hochgetragen, den ganzen Weg über seine Schulter klagend, und Joyce hat ihm dabei zugesehen. Seitdem stand sie innen an seiner Tür. Sie ist kein Beweis über Nev Ashworth. Sie ist ein Beweis darüber, wer dort stand, wo er stand.',
  },

  confrontation: {
    opening:
      'Er war dein Vater, und du kommst hier herauf, um das auf seiner Anlage zu machen. Ich möchte, dass du weißt, dass er das gehasst hätte.',
    beats: {
      'a-shedrow': {
        press:
          'Du warst von sechs bis halb acht auf 14. Um halb sieben hat Sami gesehen, wie du mit je einer leeren Kanne in jeder Hand die Schuppenreihe hochgegangen bist.',
        rebuttal:
          'Ein Junge, der seit vierzehn Monaten auf dieser Anlage ist, im Oktober, in der Dämmerung, der mit Kannen hin und her läuft. Der weiß nicht, was er gesehen hat.',
      },
      'a-burning': {
        press:
          'Du hast gesagt, du hättest die ganze Zeit verbrannt. Dein Haufen war nie angezündet. Er ist viermal am Ende von 14 vorbeigekommen und du warst zweimal mit ihm am Wassertank und hast nach seiner Mutter gefragt.',
        rebuttal:
          'Es wollte nicht brennen. Am Sonntag hat es geregnet. Frag irgendwen, der je versucht hat, vierzehn Tage nasses Schnittgut zu verbrennen.',
      },
      'a-lane': {
        press:
          'Die Schrottplatzkamera schaut genau die Lane hinauf. Du gehst um zwei nach sieben hinauf und kommst um elf nach wieder herunter, und in elf Tagen Material gibt es auf dieser Anlage kein Feuer.',
      },
      'a-why': {
        press:
          'Die Gemeinde wollte vier Parzellen bis Ende des Monats entschieden haben und deine war eine davon. Joyce hat dir gesagt, Wilf entscheidet.',
      },
    },
    deflections: [
      'Das sind hundertvierzig Leute, die seit drei Jahren vor mir über meine Parzelle reden.',
      'Du warst seit dem Leichenschmaus nicht mehr hier oben. Du kennst diese Anlage nicht.',
      'Bring mir etwas, das nicht jemand mit einer Gießkanne ist.',
    ],
    confession:
      'Er hat gesagt, Deb, hast du eine Minute, und hat die Hand in seine Manteltasche gesteckt.\n\nÜber diese Hand bin ich tausendmal gegangen.\n\nWeil Joyce es mir am Sonntag gesagt hatte. Wilf entscheidet, hat sie gesagt, und sie hat es freundlich gesagt, und ich bin nach Hause gegangen und habe nicht geschlafen und bis Dienstag hatte ich mir das Ganze zusammengebaut. Der Brief in seiner Tasche. Er macht es im Stehen in der Schuppenreihe, damit ich in der Hütte keine Szene machen kann. Rays Schuppen mit einem Aufkleber der Gemeinde an der Tür bis Weihnachten.\n\nUnd die Gabel stand innen an seiner Tür und ich musste nicht einmal danach suchen.\n\nEr hat den Satz nie zu Ende gebracht. Das ist das, was irgendwo aufgeschrieben werden soll. Ich habe das Ende davon nie gehört.\n\nIch hatte acht Wochen, um herauszufinden, was in dieser Tasche war, und ich weiß es seit ungefähr der zweiten Woche, weil es Wilf ist, und es gab immer nur eine Sache, die es sein konnte.',
  },

  epilogue:
    'Der Brief steckte in seiner Manteltasche innen, dreifach gefaltet, in einem Umschlag an das Amt für Parks und Grünflächen, frankiert und fertig zum Abschicken.\n\nZwei Seiten. Er empfahl eine Ausnahme aus Härtefallgründen für die Pächterin von Parzelle 14 und legte den Fall ausführlich dar, und im letzten Absatz stand, dass eine Parzelle nicht nur eine Parzelle ist und dass der Vorstand wissen werde, was er meint, auch wenn die Gemeinde es nicht weiß.\n\nDie Gemeinde hat sie im Januar bewilligt, auf der Grundlage eines Briefes von einem Mann, der seit Oktober tot war, und Joyce Ubani hat die Entscheidung auf der Jahresversammlung vorgelesen und musste dann abbrechen und das Notizbuch jemand anderem geben.\n\nParzelle 14 hat im Frühjahr Sami Rahimis Mutter übernommen. Sie hat den Schuppen behalten. Der Vorstand hat einstimmig beschlossen, dass er stehen bleibt, mit der Begründung, dass er nicht gerade ist und dass Ray Threlfall ihn 1998 aus einer Palettenlieferung gebaut hat, was jetzt im Protokoll steht.',
};
