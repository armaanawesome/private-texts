import type { CaseTranslation } from '../caseText';

/**
 * Case 1 — "Le phare". French.
 *
 * Three things this had to get right, in this order.
 *
 * 1. Times, and the *form* the English chose for each one. Where the English
 *    writes digits it stays digits (Fiona logs `21:40`, `22:00`, `21:47`, because
 *    a survey log is the one voice in this case that writes a clock down); where
 *    the English writes words it stays words (`twenty to ten` is `dix heures
 *    moins vingt`, never 21:40). That split is the case. Fiona is believed over a
 *    woman with forty years of goodwill because Fiona has a number and everyone
 *    else has a memory, and a translation that tidies the village up into digits
 *    hands the player the answer on the first read.
 *
 *    The village clock is the English clock: chips carry 24-hour times, prose
 *    carries the spoken form. `ten past ten` from Callum, `22:05–22:15` on his
 *    chip. A French player takes the same small step an English one takes, and
 *    neither half was allowed to drift.
 *
 * 2. Names. People and businesses stay: Ruth Calder, Mairi Bell, Callum, Fiona
 *    Trian, and Ardnoe itself. Places that are descriptions are translated,
 *    because `the cliff path` sitting untranslated inside a French sentence is
 *    the sound of a machine. Full list, so every decision is visible in review
 *    rather than looking like an oversight:
 *
 *      you    → Toi       point      → la pointe d’Ardnoe
 *      ruth   → Ruth      lighthouse → le phare
 *      mairi  → Mairi     path       → le chemin de la falaise
 *      callum → Callum    harbour    → le port
 *      esme   → Fiona     cafe       → le café
 *                         slip       → la rampe
 *                         cottage    → la maisonnette
 *                         ferry      → le ferry
 *
 *    `la pointe d’Ardnoe` keeps the toponym and translates the feature, the way
 *    French writes any headland. `Ardnoe` surviving intact matters: it is the
 *    group thread title, and it is the first word the Listener says in the coda.
 *    `la rampe` is where Callum mends the stern line and it is one word
 *    everywhere — chip, message and confrontation — because that chip against the
 *    café chip is the first contradiction the player proves.
 *
 *    `the Trust` is `la Fondation`, which is what a small British charitable
 *    trust is called in French, and it is the same word on the chip, in Mairi's
 *    "I do the Trust books", and in the motive.
 *
 * 3. Voice. Five people type differently and the difference is the character.
 *    Ruth is lowercase and never lands a full stop at the end of a message, but
 *    she capitalises Callum and Mairi, because she is sixty one and they are
 *    people. Callum types lowercase too and capitalises nobody — `ruth`, `mairi`,
 *    `ma mère` — which is the whole distance between the two of them. Mairi
 *    writes like a woman who has filled in forms: capitals, full sentences, and
 *    never a quotable line. Fiona writes properly and gives you a number. The
 *    player is lowercase and short, because they are thumbing a phone in a room
 *    they grew up in.
 *
 * `the Keeper` stays `le Keeper`, untranslated, in both of the two places the
 * English says it — n9, where Mairi finally admits the telephone call, and the
 * x-papers-lie revelation, where it turns cold.
 *
 * `le Gardien` was the obvious French reading and it is wrong, for reasons that
 * only show up outside this case. He gives this name in six packs — a care home,
 * a rowing club, a canal, a crisis line, and the finale — and there is no
 * lighthouse in any of them. It also pre-empts what the finale pays off: eleven
 * box files in a wardrobe, one per person, and `I have kept all of them`. He is
 * not the keeper of a light, he is the keeper of *records*, and Pack 1 only looks
 * like it is about a lighthouse.
 *
 * Beyond that, the alias is the one thing the player has to recognise across
 * fifteen packs. English in every locale means no later translator re-derives
 * the choice and breaks the through line. `arcAlias.test.ts` counts the mentions
 * per case and enforces it.
 *
 * The player's gender is never stated, so nothing addressed to them may agree.
 * That quietly shaped four lines: the briefing takes `Tu as pris le dernier
 * ferry` rather than `tu es arrivé(e)`, Mairi's m11 opens `Tu as poussé cette
 * porte` rather than `tu es entré(e)`, g7 uses `t’aurait fait basculer` because
 * `fait` before an infinitive never agrees, and deflection 1 is `Tu as passé six
 * ans loin d’ici` rather than `tu es partie`.
 */
export const theLighthouseFr: CaseTranslation = {
  title: 'Le phare',
  blurb:
    'Ta tante gardait la lumière de la pointe d’Ardnoe. Ils appellent ça une chute. Tu as son téléphone, et tout le monde a encore sa version bien en place.',

  characters: {
    you: 'Toi',
    ruth: 'Ruth',
    mairi: 'Mairi',
    callum: 'Callum',
    esme: 'Fiona',
  },

  places: {
    point: 'la pointe d’Ardnoe',
    lighthouse: 'le phare',
    path: 'le chemin de la falaise',
    harbour: 'le port',
    cafe: 'le café',
    slip: 'la rampe',
    cottage: 'la maisonnette',
    ferry: 'le ferry',
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
    causeOfDeath: 'Une chute dans les escaliers de la tour.',
    ruling: 'Classée comme accidentelle. Sans autre enquête.',
    opening:
      'Ruth Calder a gardé la lumière de la pointe d’Ardnoe pendant quarante ans après qu’ils l’ont automatisée, parce que personne ne lui a jamais demandé d’arrêter. On l’a retrouvée au pied des escaliers de la tour la nuit de la tempête d’équinoxe.\n\nTu as pris le dernier ferry. Tu as son téléphone, et tout le monde a encore sa version bien en place.',
  },

  messages: {
    // ----------------------------------------------------------------- t-ruth
    r1: 'alors comme ça tu l’as pris finalement',
    r2: 'dernier ferry. six ans et toujours le même homme qui poinçonne les billets',
    r3: 'ça doit être le petit Callum maintenant. le fils de Mairi. il avait neuf ans quand tu as quitté le village',
    r4: 'ne monte pas ce soir. ça souffle comme pas permis ici et le chemin est une vraie patinoire',
    r5: 'demain alors. tu as une drôle de voix',
    r6: 'ça va. il y a une histoire avec la fondation je t’en parle demain quand j’aurai dormi dessus',
    r7: 'deux ans de comptes et un trou au milieu de la taille d’un bateau',
    r8: 'ruth. qu’est-ce que ça veut dire',
    r9: 'ça veut dire que je dois dire une chose à quelqu’un que je connais depuis quarante ans et que je préférerais entrer dans la mer à pied',
    r10: 'je le lui ai dit. c’est fait. elle doit venir me voir ce soir et demain matin je vais à la police quoi qu’elle dise',
    r11: 'dit à QUI',
    r12: 'je monte à la tour, la lampe fait encore des siennes. quarante ans qu’elle est automatisée et elle veut toujours quelqu’un debout à côté',
    r13: 'ne t’inquiète pas pour moi. inquiète-toi plutôt de l’état de ma chambre d’amis',
    r14: 'ruth ?',
    r15: 'ruth s’il te plaît',

    // ---------------------------------------------------------------- t-group
    g1: 'Pour ceux qui ne sont pas encore au courant. Ruth a été retrouvée ce matin au pied des escaliers de la tour. Elle nous a quittés, et je suis désolée de le mettre dans un groupe.',
    g2: 'Le café est ouvert aujourd’hui. Rien à payer. Venez si vous préférez ne pas rester seuls chez vous.',
    g3: 'putain',
    g4: 'Je suis vraiment désolée. Je l’ai rencontrée trois fois et elle m’a donné une clé de la tour pour que je puisse compter depuis la galerie.',
    g5: 'j’étais sur le bateau. elle m’a dit de ne pas monter à cause du chemin',
    g6: 'elle m’a dit de ne pas monter',
    g7: 'Et elle a bien fait. Ce chemin par ce vent-là t’aurait fait basculer toi aussi. Ne commence pas à t’en vouloir.',
    g8: 'les flics étaient sur la rampe ce matin à demander à tout le monde où il était. bizarre pour une chute',
    g9: 'Ils sont obligés. Mort subite, c’est la procédure, rien de plus. Ils m’ont interrogée aussi.',
    g10: 'ouais ben je leur ai dit clairement. j’ai ramené le dernier bateau à huit heures avec ta tante dedans',
    g11: 'c’est vrai. tu m’as monté mon sac par les marches et je ne t’ai pas dit merci',
    g12: 'et après j’étais sur la rampe de dix heures moins vingt à dix heures et quart à peu près. l’amarre arrière avait lâché et je n’allais pas la laisser comme ça avec cette houle',
    g13: 'trempé jusqu’aux os à la fin',
    g14: 'Callum. Personne n’a besoin du minute par minute.',
    g15: 'je dis juste ce que je leur ai dit',
    g16: 'Je sais, mon grand. Mais pas ici.',
    g17: 'Pour la personne qui s’occupe de la Fondation. Son carnet de relevés est toujours en haut de la tour, là où elle l’a laissé. Ce n’est pas à moi de le prendre. Quelqu’un devrait le dire à la famille.',
    g18: 'C’est moi qui tiens les comptes de la Fondation. Je m’en occupe.',
    g19: 'elle a dit qu’il y avait une histoire avec la fondation. la nuit où elle est morte. elle a dit qu’il y avait un trou dedans',
    g20: 'Elle était fatiguée. Elle avait soixante et un ans et cette lampe défaillait depuis juillet. Laisse tomber.',

    // ---------------------------------------------------------------- t-mairi
    m1: 'Tu n’aurais pas dû l’apprendre dans une conversation de groupe. C’est moi et je suis désolée.',
    m2: 'elle a dit qu’elle en avait parlé à quelqu’un pour les comptes. elle a dit elle doit venir me voir ce soir',
    m3: 'elle. c’est toi qui tiens les comptes',
    m4: 'Je tiens les comptes parce que personne d’autre ne le ferait gratuitement.\n\nEt oui, elle m’a appelée pour une colonne qui ne tombait pas juste. Je lui ai dit que je monterais le dossier ce week-end.',
    m5: 'Je ne suis pas montée là-haut. J’étais au café.',
    m6: 'De huit heures et demie jusqu’à la fermeture à onze heures. Au café. Comme tous les autres soirs.',
    m7: 'toute seule ?',
    m8: 'Callum était avec moi. Au café de neuf heures jusqu’à la fermeture.\n\nÇa fait donc deux personnes qui le disent, si c’est un témoin que tu cherches.',
    m9: 'je ne cherchais pas de témoin',
    m10: 'Non. Je sais. Ne fais pas attention à moi, je n’ai pas dormi.',
    m11: 'Tu as poussé cette porte toi-même ce soir-là. Tu t’en souviens. Neuf heures et quart, avant de monter chez elle. Je t’avais servi le thé et tu n’y as pas touché.',
    m12: 'je m’en souviens',
    m13: 'J’ai fait la caisse à onze heures moins vingt, comme toujours. Il manquait onze livres dans le fonds et je les ai comptées trois fois.',
    m14: 'Onze livres. Et elle était couchée au pied de ces escaliers pendant tout le temps que je comptais.',
    m15: 'La fille de la maisonnette avait sa lumière allumée quand je suis rentrée après onze heures. Je me souviens m’être dit qu’il y avait quelqu’un d’autre debout.',
    m16: 'Viens au café demain. Je vais te nourrir et tu vas me laisser faire.',

    // ----------------------------------------------------------------- t-esme
    e1: 'Désolée de t’écrire directement. Tu as dit dans le groupe qu’elle t’avait dit de ne pas monter. Elle m’a dit la même chose cette semaine-là.',
    e2: 'Elle était très ferme sur ce chemin par mauvais temps. C’est pour ça que la conclusion me gêne.',
    e3: 'elle te gêne comment',
    e4: 'Je tiens un carnet de relevés. Heures, positions, conditions, tous les soirs.\n\nC’est une habitude. C’est aussi pour ça que je peux te donner tout ceci à la minute près.',
    e5: 'J’étais dans la maisonnette de sept heures à neuf heures et demie à mettre au propre le comptage de l’après-midi.',
    e6: 'Puis le vent est tombé pendant une demi-heure environ. Il fait ça avant de virer. Je suis sortie sur le chemin de la falaise pour une dernière écoute des petits.',
    e7: 'Sa lampe est restée allumée tout le temps où j’étais dehors. Je l’ai noté à 21:40 et de nouveau à 22:00. Le faisceau est mon repère horaire.',
    e8: 'tu étais sur le chemin en même temps qu’elle était là-haut',
    e9: 'Oui. Et je n’étais pas la seule dessus.',
    e10: 'J’ai croisé Mairi Bell qui venait en sens inverse à 21:47. Je l’ai noté parce que je note tout, et parce que j’ai été surprise : elle avait un manteau sur la tête et elle est passée à côté de moi sans un mot.',
    e11: 'elle raconte à tout le monde qu’elle était au café toute la nuit',
    e12: 'Alors l’une de nous deux se trompe, et moi je l’ai noté sur le moment avec une vitesse de vent à côté. Je ne dis pas ce que ça signifie. Je dis que je ne vais pas le rayer.',
    e13: 'Je l’ai bien dit à l’agent. Il l’a écrit à la fin de son carnet, après l’endroit où il avait déjà écrit « chute ».',
    e14: 'Je reste encore six semaines. Si tu veux le carnet, il est à toi.',

    // --------------------------------------------------------- t-callum-truth
    k1: 'tu sais hein',
    k2: 'elle a dit à tout le monde que j’étais au café. j’étais pas au café. tu peux demander à n’importe qui était sur la rampe cette nuit-là',
    k3: 'pourquoi elle dirait ça',
    k4: 'parce que si je suis au café avec elle personne me demande rien. c’est toute la raison. elle me couvrait pas moi. elle se couvrait elle et elle se servait de moi pour le faire',
    k5: 'j’ai fini avec l’amarre vers dix heures et quart et je suis remonté par derrière en passant par la pointe parce que c’est plus court',
    k6: 'elle était à la porte du phare. dix heures dix, à une minute près. je l’ai vue dans le faisceau quand il est passé',
    k7: 'j’ai pas crié. je sais pas pourquoi. elle se tenait tellement immobile',
    k8: 'callum',
    k9: 'elle est rentrée après onze heures trempée et elle a mis son manteau dans la machine. ma mère a jamais lavé un manteau la nuit de sa vie',
    k10: 'et je suis resté avec ça pendant deux jours à la laisser raconter aux gens que j’étais à côté d’elle',
    k11: 'l’argent c’était le mien. le trou dans les comptes de ruth. c’était pour moi. je savais pas d’où ça venait et j’ai pas demandé et c’est pareil que de savoir non',
    k12: 'fais ce que tu as à faire. je vais pas dire que c’est pas vrai une deuxième fois',

    // ---------------------------------------------------------- t-mairi-again
    n1: 'Il t’a parlé. Je le vois au temps que tu mets à ne pas me répondre.',
    n2: 'Très bien. Je suis allée à pied jusqu’à la pointe. J’ai dit le café parce que le café est plus facile et parce qu’une fois que tu as dit une chose à un policier tu dois continuer à la dire.',
    n3: 'Je suis arrivée jusqu’au portail et j’ai fait demi-tour. Je n’ai pas pu. Je suis rentrée par le chemin long pour que personne ne voie mon visage.',
    n4: 'le portail',
    n5: 'Le portail. Pas la porte. Je ne me suis jamais approchée de la porte.',
    n6: 'Elle allait me le prendre. Pas l’argent : elle pouvait bien avoir l’argent, j’aurais vendu le café. Elle allait mettre son nom là-dedans.',
    n7: 'Quarante ans que je la connais et elle n’a pas été capable de me donner une seule matinée.',
    n8: 'Quoi que mon fils t’ait dit, il était sur la rampe dans le noir et le faisceau joue des tours là-bas. Demande à qui tu veux. Redemande-lui demain.',
    n9: 'Et il y a une chose que je n’ai dite à personne, parce que ça sonne comme si je me fabriquais une excuse. Un homme qui se faisait appeler le Keeper a téléphoné au café cette nuit-là. Neuf heures et demie, à peu près.',
    n10: 'Il a dit qu’il était avec les auditeurs. Il a dit que Ruth leur avait déjà envoyé les papiers, que ça ne dépendait plus d’elle, et que le nom de Callum y figurerait dès le lundi quoi que fasse qui que ce soit.',
    n11: 'Je ne lui ai jamais demandé son nom. Je ne lui ai jamais demandé comment il avait le numéro du café. Il ne m’a poussée à rien, il a à peine dit un mot, et j’ai raccroché et j’ai pris mon manteau. Fais-en ce que tu veux. Moi j’ai arrêté d’essayer.',
  },

  /**
   * The chips are 24-hour digits in both languages and must stay digit for digit
   * identical to the English: this is the board the player lays the village out
   * on, and `la rampe` against `le café` at overlapping minutes is the first
   * thing they prove.
   */
  claims: {
    'c-ruth-tower': 'Ruth : en haut de la tour, 20:45–22:30',
    'c-callum-ferry': 'Callum : sur le ferry, 19:00–20:00',
    'c-you-ferry': 'Toi : sur le dernier ferry, 19:00–20:00',
    'c-callum-slip': 'Callum : sur la rampe, 21:40–22:15',
    'c-papers-kept': 'Ruth : avait encore les papiers de la Fondation, à partir de 20:45',
    'c-mairi-cafe': 'Mairi : au café, 20:30–23:00',
    'c-callum-cafe': 'Callum : au café, 21:00–23:00 (selon Mairi)',
    'c-you-cafe': 'Toi : au café, 21:05–21:30 (selon Mairi)',
    'c-mairi-cashing': 'Mairi : en train de faire la caisse, 22:35–23:00',
    'c-esme-cottage-late': 'Fiona : à la maisonnette, 23:00–24:00 (selon Mairi)',
    'c-esme-cottage': 'Fiona : à la maisonnette, 19:00–21:30',
    'c-esme-path': 'Fiona : sur le chemin de la falaise, 21:40–22:10',
    'c-ruth-lamp': 'Ruth : en haut de la tour, 21:40–22:00 (selon Fiona)',
    'c-mairi-path': 'Mairi : sur le chemin de la falaise, 21:45–22:00 (selon Fiona)',
    'c-papers-sent': 'Ruth : avait déjà envoyé les papiers, 20:00–23:00 (selon un appel)',
    'c-mairi-door': 'Mairi : à la porte du phare, 22:05–22:15 (selon Callum)',
  },

  motives: {
    'm-trust':
      'Elle prenait de l’argent à la Fondation du Phare d’Ardnoe depuis deux ans pour couvrir les dettes de Callum, et Ruth avait trouvé le trou dans les comptes cette semaine-là.',
  },

  contradictions: {
    'x-callum-alibi':
      'Callum ne pouvait pas être en train de réparer une amarre sur la rampe et assis dans le café de sa mère au même moment. Il s’est mis lui-même sur la rampe, devant tout le village, avant qu’elle dise le contraire : la moitié fausse est donc la sienne à elle. Elle a donné à son fils un alibi qu’il n’avait pas demandé, ce qui veut dire qu’elle avait besoin qu’on ne lui pose pas de questions.',
    'x-mairi-path':
      'Elle s’est mise derrière le comptoir de huit heures et demie jusqu’à onze heures. À 21:47, une femme avec un carnet de relevés et rien à gagner ici l’a croisée sur le chemin de la falaise, en sens inverse, un manteau sur la tête. Le café n’était pas un alibi. C’était un endroit où se mettre.',
    'x-papers-lie':
      'Les auditeurs n’ont jamais eu ces papiers. Ruth avait tout écrit à la fin de son carnet de relevés, et le carnet était toujours en haut de la tour, là où elle l’avait laissé. Donc l’homme qui se faisait appeler le Keeper, celui qui a téléphoné au café à neuf heures et demie, n’était pas de la Fondation, il n’avait aucune raison de savoir quoi que ce soit sur la Fondation, et ce qu’il a dit à Mairi Bell n’était pas une erreur. Il savait ce qu’une femme à qui il restait une nuit allait en faire.',
    'x-mairi-door':
      'Le chemin pouvait encore être une promenade pour s’aérer la tête. La porte, non. À dix heures dix elle était debout au pied de la tour, éclairée par la lampe de sa propre amie, à la minute où Ruth a cessé de répondre, et une heure avant de rentrer chez elle et de laver un manteau qu’elle n’avait jamais lavé la nuit de sa vie.',
  },

  confrontation: {
    opening:
      'Je me demandais combien de temps ça te prendrait. Assieds-toi, alors. Dis-le comme il faut, en face, et réfléchis très bien avant de le faire.',
    beats: {
      'b-alibi': {
        press:
          'Tu as dit à tout le monde que Callum était au café avec toi. Il était sur la rampe, et c’est lui qui l’a dit en premier, devant tout le village.',
        rebuttal:
          'Une femme se trompe sur une soirée après un choc pareil. Ce n’est pas un crime, et tu sais bien que non.',
      },
      'b-path': {
        press:
          'Tu t’es mise derrière ce comptoir de huit heures et demie jusqu’à onze heures. Fiona Trian t’a croisée sur le chemin de la falaise à 21:47 et elle a noté l’heure.',
        rebuttal:
          'Alors j’ai marché. Les gens marchent. C’était la première demi-heure de calme en une semaine et je voulais de l’air.',
      },
      'b-door': {
        press:
          'Tu as dit que tu avais fait demi-tour au portail. Callum t’a vue à la porte du phare à dix heures dix. Il t’a vue dans son faisceau à elle.',
        rebuttal:
          'Il était trempé et il faisait noir et cette lumière joue des tours. Demande à qui tu veux.',
      },
      'b-why': {
        press:
          'Elle a trouvé le trou dans les comptes de la Fondation cette semaine-là. Deux ans de trou. Et ton fils était dedans.',
      },
    },
    deflections: [
      'Ça ne prouve strictement rien.',
      'Tu as passé six ans loin d’ici. Tu ne sais pas ce que tu regardes.',
      'Dis quelque chose qui veuille dire quelque chose.',
    ],
    confession:
      'Elle était en haut des escaliers avec le dossier à la main et elle ne voulait pas le poser.\n\nJe voulais seulement la matinée. Une matinée, pour trouver l’argent quelque part, pour que son nom n’y entre jamais. Elle m’a dit qu’elle l’avait déjà écrit.\n\nJe n’ai rien décidé. J’y suis revenue toutes les heures depuis et je ne trouve pas le moment où j’ai décidé.\n\nCet homme au téléphone. Pas une seule fois il n’a dit son nom et pas une seule fois il n’a dit un mot sur le fait de lui faire du mal. Il m’a demandé ce que j’allais faire, et je le lui ai dit, tout, à voix haute, comme on fait à neuf heures et demie du soir à quelqu’un qu’on ne rencontrera jamais.\n\nEt il m’a laissée finir. Il ne m’a pas interrompue une seule fois.\n\nPuis il a dit : alors tu sais déjà.\n\nEt il a raccroché, et j’ai pris mon manteau.',
  },

  coda: {
    from: 'Numéro inconnu',
    messages: [
      'Ardnoe, c’était du bon travail. Quatre jours. J’avais prévu quinze jours et je ne me trompe pas souvent d’autant.',
      'Tu as mis du temps pour le fils. Il allait te le dire de toute façon. Il attendait depuis le mardi que quelqu’un lui pose la question comme il faut.',
      'Je ne réutiliserai pas ce numéro. Félicitations. Je le pense vraiment.',
    ],
  },

  epilogue:
    'Elle n’a pas nié quand ils sont venus. Elle a demandé si Callum devrait se lever dans une salle et le dire à voix haute, et quand ils lui ont répondu que oui, elle a tout raconté elle-même pour qu’il n’ait pas à le faire.\n\nIl manquait onze mille livres à la Fondation. Ruth avait tout écrit à la fin du carnet de relevés, de sa propre main, avec la date à laquelle elle comptait aller à la police. Elle avait aussi écrit, en dessous : « M. est mon amie depuis que nous avons cinq ans. Demandez-leur d’être gentils avec elle. »\n\nIls ont enlevé la lampe cet hiver-là. Cela faisait quarante ans que personne n’avait demandé à qui que ce soit de se tenir debout à côté.',
};
