import type { CaseTranslation } from '../caseText';

/**
 * Case 10 — "Open Mic". German.
 *
 * Five things this had to get right, in this order.
 *
 * 1. Kevin-s paternal vocative, which appears once and must not appear twice.
 *    At h8 he says it to Dave, who has just put him in the alley in front of
 *    the whole group — `Junge, ich hatte das Mikrofon in der Hand.` That is a
 *    sixty-one year old compere putting a younger man back in his place, and it
 *    is correct. In `t-ferdy` there are only two people in the thread and the
 *    only person he could be addressing is the player, so the English has
 *    dropped it there and German drops it too: `Junge` or `mein Sohn` aimed at
 *    the player would state a gender the game does not have. The rule is the
 *    thread, not the phrase.
 *
 * 2. The identical five minutes. The alibi works because Dave has never changed
 *    anything in sixteen years, so the repeated phrases are repeated *exactly*:
 *    `dasselbe Hemd`, `dieselbe Reihenfolge`, `derselbe Lacher an derselben
 *    Stelle` in the blurb and again in the confession, and `dieselben fünf
 *    Minuten` wherever the set is described. Varying them for elegance would
 *    make sixteen years of sameness read as ordinary description.
 *
 * 3. Digits are the running order and the years, and nothing else. Kit is the
 *    only person who says a clock in numbers — `21:30`, `21:55`, `21:28` — and
 *    that is the point of Kit: the running order is in biro and everybody else
 *    is remembering. Everyone else speaks: `halb zehn`, `fünf vor zehn`,
 *    `zwanzig nach`. `fünf nach halb zehn` is 21:35, the minute Dave goes out
 *    the fire door, and it is spoken because Kevin is remembering it.
 *
 * 4. Names and places. Debbie Vaux, Dave Prosser, Kevin Boyce, Roz Antrim, Kit
 *    Nwachukwu, Priya and the Hatch keep theirs. Places bare, so no fused
 *    preposition can eat them:
 *
 *      club  → Hatch      greenroom → Künstlergarderobe
 *      stage → Bühne      box       → Tonkabine
 *      bar   → Tresen     alley     → Gasse
 *      card  → Kamerakarte
 *
 *    `Kamerakarte` is one word everywhere — both chips, `x-card`, and the beat
 *    that presses it. It is a unique object and two names for it would be two
 *    cards, which is exactly the thing the contradiction denies.
 *
 * 5. Voice. Roz, Kevin and Kit all write standard prose and close every
 *    sentence, so they are separated by domain: Roz owns the room and talks
 *    about money and systems, Kevin has thirty-one years and names towns, Kit
 *    does sound and door and gives times to the minute. Dave writes in capitals
 *    and never closes a message, which is the English-s own pattern for a man
 *    talking to stay ahead of a question. Debbie is lowercase and unclosed. The
 *    player is lowercase and short, and shouts once, in capitals, at n2.
 *
 * One thing reproduced rather than corrected: n6 says `gils set` twice, and the
 * character is called Dave. `gil` is his id and the old first name. It is the
 * same rename leak class as the thirteen already fixed, and it hides from
 * `renameLeak.test.ts` twice over — lowercase, and with a possessive `s`
 * attached, so neither the capital nor the word boundary matches. Flagged, not
 * fixed, because a locale that repairs the English on its own diverges from
 * every other locale while the English stays as it is.
 */
export const openMicDe: CaseTranslation = {
  title: 'Open Mic',
  blurb:
    'Sein Alibi ist auf Video. Dasselbe Hemd, dieselben fünf Minuten, derselbe Lacher an derselben Stelle. Es ist vom Dienstag davor.',

  characters: {
    you: 'Du',
    marnie: 'Debbie',
    gil: 'Dave',
    roz: 'Roz',
    ferdy: 'Kevin',
    kit: 'Kit',
  },

  places: {
    club: 'Hatch',
    stage: 'Bühne',
    bar: 'Tresen',
    greenroom: 'Künstlergarderobe',
    box: 'Tonkabine',
    alley: 'Gasse',
  },

  objects: {
    card: 'Kamerakarte',
  },

  threads: {
    't-marnie': 'Debbie',
    't-club': 'Hatch dienstags',
    't-kit': 'Kit',
    't-ferdy': 'Kevin',
    't-roz': 'Roz Antrim',
  },

  briefing: {
    causeOfDeath: 'Eine Kopfverletzung an der Bordsteinkante. Sie ist einmal gestürzt und nicht wieder aufgestanden.',
    ruling:
      'Als Sturz verzeichnet. Sie hatte getrunken, die Gasse fällt ab, und der ganze Saal saß drinnen und sah einem Mann bei fünf Minuten über Züge zu.',
    opening:
      'Das Hatch macht jeden Dienstag einen Open Mic und filmt ihn für einen Kanal, den niemand ansieht, und genau so kommen elf Auftritte pro Woche zu etwas, das man einem Veranstalter schicken kann.\n\nDebbie Vaux wurde um zwanzig nach elf in der Gasse dahinter gefunden. Sie hatte um fünf vor zehn sieben Minuten gespielt und war an die Luft gegangen.\n\nDu machst einen Podcast über die Szene. Sie hat dir seit März Sprachnachrichten geschickt.',
  },

  messages: {
    // --------------------------------------------------------------- t-marnie
    n1: 'die tour-vorband ist durch. acht wochen. ich habe es noch niemandem gesagt und mir wird gleich schlecht',
    n2: 'DEBBIE',
    n3: 'ich weiß. ich weiß. ich muss es dave heute abend sagen und ich schiebe es seit neun tagen vor mir her',
    n4: 'warum ist das schwer. er ist dein kumpel',
    n5: 'weil wir im selben monat angefangen haben. oktober 2009, derselbe raum, dieselbe liste für die offenen slots. und ich gehe auf tour und er bucht immer noch den dienstag',
    n6: 'und er macht dieselben fünf. wirklich dieselben fünf. ich könnte gils set machen. jeder in dem raum könnte gils set machen',
    n7: 'das ist nicht deine schuld',
    n8: 'nein aber er wird mein gesicht sehen wenn er daran denkt. jahrelang. ich mache das lange genug um genau zu wissen wie das läuft',
    n9: 'bin da. um fünf vor zehn dran. mache es danach, in der gasse, weg vom saal, wie eine feige',
    n10: 'lief eigentlich ganz gut. ok. gehe raus',

    // ----------------------------------------------------------------- t-club
    h1: 'Debbie ist am Dienstagabend in der Gasse gestorben. Die Polizei kam am Mittwoch, hat von neun von uns Aussagen aufgenommen und nennt es einen Sturz. Das Hatch bleibt diese Woche zu.',
    h2: 'Ich moderiere diesen Raum seit elf Jahren und ich musste kein einziges Mal so etwas hineinsagen. Ich habe sie 2010 zum ersten Mal angesagt und sie ist vier Minuten lang bei mir gestorben und kam die Woche darauf wieder, und genau das ist der ganze Beruf.',
    h3: 'Ich war dran, als es passiert ist. Ich stand buchstäblich auf der Bühne. Was, ich weiß, eine furchtbare Art ist, das zu sagen, aber da war ich, und irgendwer wird fragen, also sage ich es lieber jetzt',
    h4: 'Und es ist natürlich gefilmt. Ich habe es geschnitten und auf das Laufwerk gelegt. Zweiundzwanzig Minuten, ohne Schnitt, ich um halb zehn mit der Züge-Nummer und Debbie hinter mir am Tresen',
    h5: 'Niemand hat dich nach einem Clip gefragt, Dave.',
    h6: 'Ich versuche, nützlich zu sein',
    h7: 'Und wenn wir schon durchgehen, wo alle waren, Kevin war mitten in der Show gute zwanzig Minuten hinten draußen, und ich glaube, das hat noch niemand gesagt',
    h8: 'Junge, ich hatte das Mikrofon in der Hand.',
    h9: 'So, das reicht jetzt. Alles Weitere geht an mich und nicht an achtundzwanzig Leute.',

    // ------------------------------------------------------------------ t-kit
    k1: 'Ich mache Ton und Einlass. Ich schreibe die Auftrittsreihenfolge mit Kugelschreiber auf die Rückseite des Kassenzettels, und ich habe jeden einzelnen davon seit meinem Anfang, weil ich nie etwas wegwerfe.',
    k2: 'Dienstag. Kevin moderiert. Dann Priya, Dave, Debbie, Pause, vier weitere. Debbie war um 21:30 dran. Nicht 21:55, nicht fünf vor zehn. 21:30, und sie kam um zehn vor runter.',
    k3: 'dave sagt sie war um halb zehn am tresen',
    k4: 'Sie stand um halb zehn auf der Bühne. Ich hatte ihr Mikrofon offen. Ich weiß, wo sie war, weil ich ihr zwanzig Minuten lang beim Atmen zugehört habe.',
    k5: 'Und Dave war vor ihr dran. Er kam um 21:28 runter und ist bis zur Pause nicht wieder reingekommen.',
    k6: 'bist du dir bei der reihenfolge sicher',
    k7: 'Es steht mit Kugelschreiber auf einem Kassenzettel in einer Schublade in diesem Gebäude. Ich bin mir bei wenig sicher, aber dabei bin ich mir sicher.',
    k8: 'Red mit Kevin. Er hatte den ganzen Mittelteil das Mikrofon und er sieht diesen Raum besser als die Kamera, weil die Kamera nur in eine Richtung zeigt.',

    // ---------------------------------------------------------------- t-ferdy
    f1: 'Beim Tippen musst du Geduld mit mir haben. Ich habe ein Nokia und habe es, seit meine Tochter geheiratet hat, und alle finden das urkomisch, bis sie jemanden brauchen, der um zwei Uhr nachts noch ein funktionierendes Telefon hat.',
    f2: 'Einunddreißig Jahre. Glasgow, Leeds, die zwei Räume in Birmingham, der Mittwoch in Bristol, den es nicht mehr gibt. Ich habe in den meisten Städten moderiert, die du nennen kannst, und in den meisten davon wurde ich auch bezahlt.',
    f3: 'dave hat gesagt du warst hinten draußen',
    f4: 'Ich habe diesen ganzen Abschnitt lang ein Mikrofon vor vierzig Leuten gehalten. Es gibt eine Aufnahme davon. Es ist dieselbe Aufnahme, die er dir zeigen will.',
    f5: 'Und ich sage dir, was ich gesehen habe, weil ich den ganzen Abend in die andere Richtung geschaut habe als diese Kamera.',
    f6: 'Dave ist gegen fünf nach halb zehn durch die Notausgangstür raus und war zur Pause nicht zurück. Ich habe Debbie angesagt und ich konnte sehen, dass die Tür die ganzen sieben Minuten hinter ihr auf Klinke stand.',
    f7: 'Ich habe den Clip, den er auf das Laufwerk gelegt hat, ungefähr neunmal angesehen. Es ist ein schöner Clip. Er ist sehr gut darin.',
    f8: 'Er macht die Züge, dann die über seine Mutter, dann bezieht er sich zurück auf den Schwan. Am Dienstag gibt es keinen Schwan. Der Schwan ist Priya, und Priya war am Dienstag dran, aber die Schwan-Nummer ist vom Dienstag davor, weil sie sie rausgenommen hat.',
    f9: 'Sechzehn Jahre lang habe ich diesem Mann dabei zugesehen, wie er dieselben fünf Minuten im selben Hemd macht, und ich habe es kein einziges Mal für irgendjemanden als nützlich angesehen.',

    // ------------------------------------------------------------------ t-roz
    r1: 'Ich führe diesen Raum seit vierzehn Jahren und ich habe einem Polizisten noch nie auf irgendetwas eine gerade Antwort gegeben, und diese Woche habe ich ihnen neun gegeben.',
    r2: 'Eine Kamera, eine Karte, ein Abend. Das ist das ganze System und es ist seit 2016 das ganze System, weil ich kein Geld dafür ausgebe.',
    r3: 'Dave macht den Kanal. Er nimmt am Ende die Kamerakarte mit, schneidet sie über die Woche und legt die Clips auf das Laufwerk. So ist die Abmachung und das war kein einziges Mal ein Problem.',
    r4: 'Nur am Dienstag habe ich sie um neun herausgenommen und die erste Hälfte in der Tonkabine auf meinen Laptop gezogen, weil die Tourleute Debbies Set bis Mittwoch wollten und ich dafür nicht auf Dave gewartet habe.',
    r5: 'Um zwanzig nach habe ich sie wieder eingesetzt. Was er also wem auch immer gegeben hat und was auch immer auf diesem Laufwerk liegt, es gibt eine Kopie dieses Abends auf meinem Laptop, die er nie gesehen hat.',
    r6: 'und debbie',
    r7: 'Hat mir am Montag von der Tour erzählt und mich gebeten, nichts zu sagen, bis sie es Dave gesagt hat. Sie hat sich Sorgen um ihn gemacht. Wirklich Sorgen, so wie man sich um jemanden sorgt, den man mag.',
    r8: 'Sie haben im selben Monat angefangen. Fünfzehn Jahre. Sie hatte eine Tour und er hatte einen Dienstag, und sie war diejenige, der es leidtat, was alles über die beiden sagt.',
  },

  /**
   * The two Kamerakarte chips are the exclusive pair, and their windows overlap
   * rather than match: Roz had it 21:00–21:20, inside the 21:00–22:30 Dave
   * claims. One card, one night, two people who cannot both have held it.
   */
  claims: {
    'c-marnie-stage': 'Debbie: auf der Bühne, 21:30–21:50 (Auftrittsreihenfolge)',
    'c-gil-stage': 'Dave: auf der Bühne, 21:30–21:50',
    'c-marnie-bar': 'Debbie: am Tresen, 21:30–21:50 (laut Daves Clip)',
    'c-ferdy-alley': 'Kevin: in der Gasse, 21:30–21:50 (laut Dave)',
    'c-ferdy-stage': 'Kevin: moderiert auf der Bühne, 21:25–21:55',
    'c-gil-alley': 'Dave: in der Gasse, 21:35–21:45 (laut Kevin)',
    'c-card-gil': 'Dave: hatte die Kamerakarte, 21:00–22:30',
    'c-card-roz': 'Roz: hatte die Kamerakarte, 21:00–21:20',
    'c-roz-box': 'Roz: in der Tonkabine, 21:00–21:20',
  },

  motives: {
    'm-tour':
      'Sie haben 2009 im selben Monat angefangen. Sie hatte acht Wochen als Tour-Vorband und schob es seit neun Tagen vor sich her, es ihm zu sagen, und sie hat ihn in die Gasse mitgenommen, um es freundlich zu tun.',
  },

  contradictions: {
    'x-gil-alley':
      'Er hat sich selbst auf die Bühne gestellt, und er hat es zuerst gesagt, bevor ihn irgendwer gefragt hat. Kevin Boyce hatte das Mikrofon in der Hand und hat gesehen, wie er gegen fünf nach halb zehn durch die Notausgangstür ging, und konnte sehen, dass sie die ganzen sieben Minuten, die Debbie dran war, hinter ihr auf Klinke stand.',
    'x-marnie-bar':
      'In seinem Clip steht Debbie hinter ihm am Tresen. In dieser Minute stand sie mit offenem Mikrofon auf der Bühne, und Kit hat ihr beim Atmen zugehört. Der Clip ist echt und Dave ist wirklich darin. Er ist vom Dienstag davor, der einzigen Woche, in der Priya den Schwan gemacht hat.',
    'x-card':
      'Eine Kamera, eine Karte, ein Abend, seit 2016, weil Roz kein Geld dafür ausgibt. Sie hat sie um neun herausgenommen, um Debbies Set zu den Tourleuten zu bringen, und hatte sie bis zwanzig nach in ihrem Laptop. Es gibt eine Kopie dieses Abends, die er nie gesehen hat.',
    'x-ferdy-stage':
      'Er hat einen einundsechzigjährigen Moderator zwanzig Minuten lang in die Gasse gestellt, in einem Gruppenchat, acht Minuten nachdem man ihm gesagt hatte, dass ihn niemand etwas gefragt hat. Kevin hatte das Mikrofon vor vierzig Leuten in der Hand, auf derselben Aufnahme, die Dave alle sehen lassen wollte.',
  },

  confrontation: {
    opening:
      'Du machst einen Podcast. Das ist es, was du machst. Du redest mit Leuten, die besser sind als ich, darüber, wie sie besser geworden sind als ich. Also los, das wird großartig.',
    beats: {
      'o-alley': {
        press:
          'Du warst auf der Bühne, hast du gesagt, bevor dich irgendwer gefragt hat. Kevin hatte das Mikrofon und hat gesehen, wie du gegen fünf nach halb zehn durch die Notausgangstür gegangen bist.',
        rebuttal:
          'Kevin ist einundsechzig und macht das, seit ich geboren wurde, und er hat an dem Abend elf Auftritte moderiert. Der könnte dir nicht sagen, welche Farbe die Wände haben.',
      },
      'o-bar': {
        press:
          'In deinem Clip steht Debbie hinter dir am Tresen. Sie stand mit offenem Mikrofon auf der Bühne und Kit hatte sie im Kopfhörer. Und du beziehst dich zurück auf Priyas Schwan, und Priya hat den Schwan rausgenommen.',
        rebuttal:
          'Dann habe ich eben eine Auftrittsreihenfolge falsch in Erinnerung. Ich habe vierhundert von diesen Räumen gemacht. Das ist alles derselbe Raum.',
      },
      'o-card': {
        press:
          'Eine Kamera, eine Karte. Roz hat sie um neun herausgezogen, um Debbies Set zu den Tourleuten zu bringen, und sie lag bis zwanzig nach in ihrem Laptop. Es gibt eine Kopie dieses Abends, die du nie gesehen hast.',
      },
      'o-why': {
        press:
          'Sie hatte acht Wochen als Vorband und saß neun Tage darauf, weil sie nicht herausfand, wie sie es dir sagen soll. Sie hat dich in die Gasse mitgenommen, um es freundlich zu tun.',
      },
    },
    deflections: [
      'Das ist ein Raum voller Leute, die mir sechzehn Jahre lang beim Baden zugesehen haben. Natürlich haben die eine Version.',
      'Du hast in deinem Leben nie auf einer Bühne gestanden.',
      'Bring mir etwas, das nicht jemand ist, der sich an einen Dienstag erinnert.',
    ],
    confession:
      'Sie hat es wirklich nett gesagt. Das ist es, was ich niemandem begreiflich machen kann. Sie hatte sich zurechtgelegt, wie sie es sagt, damit es bei mir nicht als irgendetwas ankommt, und sie hatte neun Tage daran gearbeitet, was länger ist, als sie an den meisten ihrer Nummern gearbeitet hat.\n\nUnd ich habe Glückwunsch gesagt und es ungefähr vier Sekunden lang auch so gemeint.\n\nDann hat sie das gesagt, was sie für den freundlichen Teil hielt. Sie hat gesagt, Dave, komm doch und mach ein paar von den kleineren mit, ich bring dich rein.\n\nIch bring dich rein.\n\nWir haben im selben Monat angefangen. Dieselbe Liste, im selben Raum, im Oktober 2009, und sie wollte mich reinbringen.\n\nIch habe die Hand ausgestreckt. Mehr war es nicht. Da ist eine Bordsteinkante und sie fällt ab und sie ist einmal gestürzt.\n\nUnd dann hatte ich zwanzig Minuten und eine Kamera, die ich seit sechs Jahren jede Woche schneide, und ich saß in dieser Künstlergarderobe und wusste genau, was zu tun ist, weil ich dieselben fünf Minuten von elf verschiedenen Dienstagen habe und die sind identisch. Dasselbe Hemd. Dieselbe Reihenfolge. Derselbe Lacher an derselben Stelle.\n\nSechzehn Jahre lang nie irgendetwas geändert, und das eine Mal, wo es mir je etwas genützt hat, war dafür.',
  },

  epilogue:
    'Auf Roz Antrims Laptop lag die ungeschnittene erste Hälfte des tatsächlichen Abends, in einem Ordner namens DEBBIE FOR TOUR PPL. Zweiundzwanzig Minuten, eine Einstellung, und ab 21:35 am Bildrand eine Notausgangstür auf Klinke.\n\nKit Nwachukwus Kassenzettel gingen als Beweismittel ein, einundvierzig Stück, mit Kugelschreiber, in einer Schublade.\n\nKevin Boyce hat im Februar die Benefizveranstaltung im Hatch moderiert und neunzehn Minuten gemacht und kein einziges Mal etwas davon erwähnt, und danach vier weitere Benefizveranstaltungen in vier Städten, weil die Leute ihn immer wieder gefragt haben.\n\nDie acht Wochen sind an jemand anderen gegangen. Der Tourmanager hat Roz geschrieben und sie gebeten auszurichten, dass sie sich das Set elf Mal angesehen hatten, bevor sie sie gebucht haben, und dass sie sie auch nach zwei Minuten davon gebucht hätten.',
};
