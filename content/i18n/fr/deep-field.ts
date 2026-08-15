import type { CaseTranslation } from '../caseText';

/**
 * Case 4 — "Champ profond". French.
 *
 * `Deep Field` is the astronomy term, and `champ profond` is what French
 * astronomy calls it (`le champ profond de Hubble`). It carries the second
 * meaning the English has too: a field station a very long way out.
 *
 * Four things this had to get right.
 *
 * 1. Which clock. The whole case is one record kept in the wrong clock, so the
 *    three clocks have three fixed names and never drift: `l’heure station`,
 *    `UTC`, and the watch each of them left running from home. `UTC plus trois`
 *    is the conversion the player does by hand, so p3 states it exactly once and
 *    exactly as the English does. The platform log entry stays `21:45` in digits
 *    and its converted form stays `une heure moins le quart du matin` in words,
 *    because that gap between a machine time and a spoken time is the clue.
 *
 * 2. Digits. Only three lines carry a clock in digits, and all three are machine
 *    records: w1 (the time of death, 02:10), p3 (the platform log, 21:45) and p6
 *    (the card access, 22:35 and 22:44). Everybody else speaks times in words —
 *    including Theo reading the camera timestamp aloud in v2 as `vingt-deux
 *    heures onze`, which the English also spells out. If the station starts
 *    talking in digits the machine records stop being the hard facts.
 *
 * 3. Names. People and places with names keep them: Rothera Ridge, Cambridge,
 *    Boulder, Dunfermline, the Shackleton. Descriptive places are translated:
 *
 *      you   → Toi     station   → la station
 *      orla  → Laura   block     → le bâtiment d’hébergement
 *      mal   → Mal     mess      → le réfectoire
 *      rune  → Erik    surgery   → l’infirmerie
 *      pilar → Maria   coldporch → le sas froid
 *      theo  → Theo    outside   → dehors
 *                      telescope → la plateforme d’instruments
 *                      metmast   → le mât météo
 *
 *    The English alternates between a display name and a fuller name for three
 *    people — `Laura` in the threads but `Laura Byrne` in the briefing and the
 *    epilogue, `Maria` in the messages but `Maria Otxoa` in the epilogue, `Erik`
 *    throughout but `Erik Sandved` in the epilogue. That is preserved exactly
 *    where the English puts it rather than tidied, because tidying it would be
 *    rewriting the source from inside a translation.
 *
 *    `outer layer` is `sa parka` throughout — the English shortens it to "her
 *    outer" in w3, and French has no comfortable short form of `couche
 *    extérieure`. `parka` also keeps it the same garment as the four red parkas
 *    the case argues about, which is what the cuff tear depends on.
 *
 * 4. Voice. Laura writes lowercase and never lands a final full stop. Theo is
 *    lowercase too and never finishes either, but he opens on a name when he is
 *    naming somebody. Mal and Maria both write in full sentences with full
 *    stops, and the distance between them is that Maria is precise and Mal is
 *    plausible. Erik only sends voice notes, so every message of his opens on a
 *    bracketed duration — he reads badly, Maria has quietly accommodated it for
 *    nine years, and the case makes a point of that not being a clue. The player
 *    is lowercase and short.
 *
 * No arc content: pack 4 is standalone, so there is no Keeper here and no coda.
 *
 * One deliberate departure, flagged for review. The English confrontation
 * opening has Mal say `now it is a radio link and a man in Cambridge`, which
 * marks the player as male — the same class of line `playerNeutral.test.ts` was
 * written for, though it sits outside that rule because the noun is not the
 * complement of a copula. French says `quelqu’un à Cambridge`, which keeps the
 * dismissiveness intact and marks nobody.
 */
export const deepFieldFr: CaseTranslation = {
  title: 'Champ profond',
  blurb:
    'Six personnes, quatre mois de nuit, et personne ne peut partir. L’alibi est un horodatage, et l’horodatage est dans la mauvaise horloge.',

  characters: {
    you: 'Toi',
    orla: 'Laura',
    mal: 'Mal',
    rune: 'Erik',
    pilar: 'Maria',
    theo: 'Theo',
  },

  places: {
    station: 'la station',
    block: 'le bâtiment d’hébergement',
    mess: 'le réfectoire',
    surgery: 'l’infirmerie',
    coldporch: 'le sas froid',
    outside: 'dehors',
    telescope: 'la plateforme d’instruments',
    metmast: 'le mât météo',
  },

  threads: {
    't-orla': 'Laura',
    't-station': 'Rothera Ridge',
    't-theo': 'Theo',
    't-rune': 'Erik',
    't-pilar': 'Maria Otxoa',
    't-porch': 'Caméra du sas froid',
  },

  briefing: {
    causeOfDeath: 'Hypothermie. Elle est sortie du sas froid sans sa parka.',
    ruling:
      'Enregistré comme mort accidentelle. Personne ne peut atteindre la station avant octobre et personne ne l’a demandé.',
    opening:
      'Rothera Ridge tient trois horloges. L’heure station pour les gens, UTC pour les instruments, et ce que chacun a laissé tourner à son propre poignet, venu de chez lui.\n\nLaura Byrne était le médecin. On l’a trouvée dans le sas froid à deux heures du matin, sa parka encore accrochée à sa patère, et à eux six ils se sont mis d’accord sur le fait qu’elle était sortie regarder le ciel et qu’elle avait mal jugé. Le prochain avion est en octobre.\n\nC’est toi qui gères son dossier à Cambridge, et la dernière personne à qui elle a écrit.',
  },

  messages: {
    // ----------------------------------------------------------------- t-orla
    o1: 'jour soixante et un sans soleil. Theo a commencé à donner des noms aux pommes de terre. je te le dis pour que Cambridge l’ait au dossier',
    o2: 'noté. et les bilans annuels, ça avance',
    o3: 'c’est justement pour ça que je suis debout. j’ai un résultat de bilan que je n’ai pas envie d’avoir',
    o4: 'fibrillation auriculaire, et pas une limite. sur un homme qui a soixante et un ans et dix-neuf saisons derrière lui et qui n’a jamais quitté ce continent une seule fois quand il avait le choix',
    o5: 'le protocole est le protocole. c’est un premier vol',
    o6: 'je sais ce que c’est. j’ai écrit la formulation deux fois et je l’ai effacée deux fois et je vais la déposer demain matin parce qu’il n’existe aucune version de ça où je ne le fais pas',
    o7: 'il n’aura pas d’autre saison. il n’aura plus rien d’autre. il est arrivé en 2007 et il est revenu tous les ans et je l’ai vu descendre de cet avion en octobre comme un homme qui rentre chez lui',
    o8: 'tu le lui as dit',
    o9: 'ce soir. je ne vais pas déposer quelque chose sur un homme sans le lui dire en face d’abord, c’est tout le métier',
    o10: 'je le lui ai dit. il a été très calme et très poli et il m’a remerciée, et ça a été pire que s’il avait crié',
    o11: 'je sors dix minutes. il fait moins quarante et un et il n’y a rien au-dessus de nous à part la totalité. on se parle demain bisous',

    // -------------------------------------------------------------- t-station
    w1: 'Cambridge. Laura Byrne est morte cette nuit. Trouvée dans le sas froid à 02:10 heure station par Erik. Réanimation tentée pendant quarante minutes. Je l’enregistre comme mort accidentelle et j’enverrai le rapport complet à la liaison du matin.',
    w2: 'Avant que quelqu’un me le demande : oui, je sais ce que six personnes et quatre mois de nuit font à un rapport comme celui-là. Je l’ai écrit droit quand même.',
    w3: 'elle est sortie sans sa parka. elle m’a engueulé pour exactement ça. deux fois. elle l’avait écrit sur le tableau du sas',
    w4: 'J’étais sur la plateforme de dix heures moins le quart jusqu’à onze heures, à faire l’arrêt. Je n’ai rien vu et rien entendu et j’en suis désolé, parce que j’étais à deux cents mètres.',
    w5: 'Le journal de la plateforme m’aura. Il enregistre un opérateur chaque fois que la coupole bouge et la coupole a bougé toute la soirée.',
    w6: 'mal je t’ai vu dans le bâtiment à dix heures dix. tu es passé par le couloir et tu ne m’as rien dit',
    w7: 'Tu as vu quelqu’un en parka rouge dans un couloir dans le noir. Il y a quatre parkas rouges sur cette station et l’une d’elles est la tienne.',
    w8: 'Et pendant qu’on y est, Erik était dehors au mât la moitié de la soirée et personne ne lui a posé une seule question, et j’aimerais bien savoir pourquoi.',
    w9: 'Ça suffit. Personne sur cette station n’accuse personne sur cette station sur une liaison radio avec Cambridge à l’écoute. Venez me voir.',

    // ----------------------------------------------------------------- t-theo
    h1: 'j’ai cuisiné pour elle pendant six mois et j’ai fait quatre cents repas dans cette cuisine et ce soir je n’arrive pas à en faire un',
    h2: 'j’étais dans le réfectoire de neuf heures à onze heures à faire le pain pour demain. on voit tout le couloir depuis le passe-plat, c’est la seule raison pour laquelle je sais quoi que ce soit',
    h3: 'quand est-ce que tu as vu laura pour la dernière fois',
    h4: 'dix heures et quart, en train de traverser le sas. elle avait ses chaussures d’intérieur. j’y suis revenu cent fois parce que j’ai vu ses chaussures d’intérieur et je n’ai rien dit',
    h5: 'et c’était Mal dans ce couloir. je sais à quoi ressemblent les parkas. je sais comment il marche. dix-neuf saisons d’un homme, c’est une silhouette qu’on apprend',
    h6: 'il dit qu’erik était dehors',
    h7: 'Erik était à la radio avec le Shackleton pendant tout ce temps. je suis resté à côté de lui pendant dix minutes et le navire enregistre de son côté. ce n’est pas un truc sur lequel on peut rester vague',
    h8: 'parle à Erik. il ne te tapera pas de texte, il envoie les vocales. n’en fais pas une histoire, tout le monde ici sait pourquoi et personne ici n’en parle',

    // ----------------------------------------------------------------- t-rune
    n1: '[note vocale, 0:41] C’est moi qui l’ai trouvée. Deux heures dix. J’étais allé au sas parce que la porte ne se referme pas bien par ce froid et je la vérifie en dernier. Je ne vais pas décrire dans quel état elle était.',
    n2: '[note vocale, 0:19] Je fais comme ça parce que je lis mal et que je ne me suis jamais fait à la frappe. Maria le sait depuis neuf ans. Ce n’est pas un secret, c’est seulement fatigant.',
    n3: 'mal dit que tu étais au mât',
    n4: '[note vocale, 1:02] J’étais au poste avec le Shackleton de dix heures moins dix jusqu’à la demie. Quarante minutes sur un transfert de carburant qui n’aura pas lieu avant décembre. Leur salle radio enregistre chaque appel de leur côté et Cambridge peut leur demander ce soir, alors demandez-leur, je préfère.',
    n5: '[note vocale, 0:33] Il a dit le mât parce que le mât est le seul endroit de cette station que personne ne peut voir. Il n’est pas bête. C’est ça avec lui, il n’a jamais été bête une seule fois.',
    n6: '[note vocale, 0:28] Demandez à Maria le journal de la plateforme. Demandez-lui quelle heure il tient. Je le lui ai dit deux fois et elle s’est tue deux fois, et je suis mécanicien, alors qu’est-ce que j’y connais.',

    // ---------------------------------------------------------------- t-pilar
    p1: 'J’ai six personnes et cent onze jours. Quoi que je te dise maintenant, je devrai encore leur servir le petit-déjeuner à tous ensemble demain matin. Je veux que ce soit acté avant le reste.',
    p2: 'Erik a raison au sujet du journal et j’ai été lente parce que je ne voulais pas qu’il ait raison. Le journal de la plateforme écrit en UTC. Il écrit en UTC depuis l’installation de l’instrument, parce que l’instrument appartient à un consortium de Boulder et que Boulder se moque de l’heure qu’il est ici.',
    p3: 'L’heure station, c’est UTC plus trois. Donc l’entrée qui le place à la coupole à partir de 21:45 le place là-bas à partir d’une heure moins le quart du matin, heure station. Trois heures après que Theo l’a vue traverser ce sas.',
    p4: 'Le journal n’est pas son alibi. Le journal est un relevé de l’endroit où il est allé après.',
    p5: 'l’infirmerie',
    p6: 'Accès par badge. Son badge a ouvert l’infirmerie à 22:35 et de nouveau à 22:44. Laura était déjà dans ce sas à ce moment-là. Il n’avait aucune raison clinique d’être dans cette pièce à quelque heure que ce soit et il n’en a jamais eu en dix-neuf saisons.',
    p7: 'Son dossier de bilan n’est pas dans le système. La copie papier n’est pas dans le tiroir. J’ai regardé deux fois et j’ai fait regarder Theo une fois pour que ce ne soit pas seulement moi qui le dise.',
    p8: 'Elle m’a dit le mardi ce qu’elle avait trouvé et ce qu’elle allait devoir en faire. Elle m’a demandé si dix-neuf saisons achetaient quelque chose à un homme. J’ai dit non. Je repense à cette réponse toutes les heures depuis.',
    p9: 'Et j’étais dans le bâtiment de neuf heures et demie à minuit avec ma porte ouverte, à faire le tableur de ravitaillement, ce qui est l’alibi le moins utile que quelqu’un ait jamais eu.',

    // ---------------------------------------------------------------- t-porch
    v1: 'il y a une caméra dans le sas. c’est pour le joint de la porte, elle vise la charnière, ce n’est pas un truc de sécurité et elle n’enregistre pas le son',
    v2: 'vingt-deux heures onze. quelqu’un entre dans le champ du côté du couloir, reste onze secondes devant les patères, et sort par la porte extérieure derrière elle. on ne voit pas de visage. on voit une manche',
    v3: 'la manche a l’accroc à la manchette. Mal a fait cette manchette sur le treuil en avril et a refusé une parka neuve parce qu’il a celle-là depuis 2011',
    v4: 'pourquoi personne n’a regardé ça avant',
    v5: 'parce que c’est une caméra de joint de porte et qu’elle se réécrit dessus tous les dix jours et qu’aucun de nous n’y a pensé comme à un truc qui regarde les gens. elle a regardé une personne',
  },

  claims: {
    'c-orla-surgery': 'Laura : à l’infirmerie, 21:00–21:40',
    'c-mal-telescope': 'Mal : sur la plateforme d’instruments, 21:45–23:00',
    'c-mal-block': 'Mal : dans le bâtiment d’hébergement, 22:00–22:10 (selon Theo)',
    'c-rune-outside': 'Erik : dehors au mât météo, 22:00–22:20 (selon Mal)',
    'c-theo-mess': 'Theo : au réfectoire, 21:40–23:00',
    'c-orla-coldporch': 'Laura : dans le sas froid, 21:55–22:10 (selon Theo)',
    'c-rune-radio': 'Erik : à la radio avec le navire, 21:50–22:30 (selon Theo)',
    'c-mal-log': 'Mal : à la coupole, 00:45–01:30 (journal de la plateforme, converti)',
    'c-mal-surgery': 'Mal : à l’infirmerie, 22:35–22:50 (accès par badge)',
    'c-pilar-block': 'Maria : dans le bâtiment d’hébergement, 21:30–24:00',
    'c-mal-coldporch': 'Mal : dans le sas froid, 22:10–22:25 (caméra)',
  },

  motives: {
    'm-medevac':
      'Laura avait trouvé une fibrillation auriculaire sur son bilan annuel. Le protocole, c’est l’évacuation sanitaire au premier vol, et à soixante et un ans et dix-neuf saisons il n’y aurait pas eu de vingtième.',
  },

  contradictions: {
    'x-mal-block':
      'Il s’est placé à deux cents mètres de là, sur la plateforme, à partir de dix heures moins le quart. Theo l’a vu passer dans le couloir d’hébergement à dix heures dix, depuis un passe-plat qui en voit toute la longueur, et l’a reconnu à sa façon de marcher.',
    'x-mal-porch':
      'La caméra du joint de porte vise une charnière et personne n’y a jamais pensé comme à un truc qui regarde les gens. À 22:11, une manche à la manchette déchirée reste onze secondes devant les patères puis sort par la porte extérieure derrière elle. Il a fait cette manchette sur le treuil en avril et n’a pas voulu d’une parka neuve.',
    'x-mal-surgery':
      'Son badge a ouvert l’infirmerie à 22:35 et de nouveau à 22:44, alors qu’il dit qu’il était encore sur la plateforme et alors que Laura était déjà dans ce sas. Son dossier de bilan n’est pas dans le système et la copie papier n’est pas dans le tiroir, et en dix-neuf saisons il n’a jamais eu de raison clinique d’être dans cette pièce.',
    'x-rune-mast':
      'Erik était au poste avec le Shackleton pendant quarante minutes, sur un transfert de carburant qui n’aura pas lieu avant décembre, et le navire enregistre son côté de chaque appel. Mal l’a placé au mât météo parce que le mât météo est le seul endroit de cette station que personne ne peut voir, et parce qu’un homme qui répond en notes vocales est l’homme le plus facile à rendre étrange sur toute la banquise.',
  },

  confrontation: {
    opening:
      'Dix-neuf saisons. J’ai enterré deux personnes depuis cette station et j’en ai porté une moi-même, et maintenant c’est une liaison radio et quelqu’un à Cambridge. Vas-y.',
    beats: {
      'f-block': {
        press:
          'Tu t’es placé sur la plateforme à partir de dix heures moins le quart. Theo t’a vu descendre le couloir d’hébergement à dix heures dix et t’a reconnu à ta façon de marcher.',
        rebuttal:
          'Theo est dans le noir depuis soixante et un jours et il y a quatre parkas rouges sur cette station. Il veut que ce soit quelqu’un. Tout le monde ici veut que ce soit quelqu’un, à ce stade.',
      },
      'f-porch': {
        press:
          'La caméra du sas a une manche devant les patères à 22:11, onze secondes, puis dehors par la porte extérieure derrière elle. La manchette est déchirée. Tu l’as faite sur le treuil en avril et tu n’as pas voulu d’une parka neuve.',
        rebuttal:
          'Une manchette. Dans un bâtiment où on porte tous la même chose et où on se la prête tous les jours de l’hiver.',
      },
      'f-surgery': {
        press:
          'Ton badge a ouvert l’infirmerie à 22:35 et de nouveau à 22:44. Son dossier de bilan a disparu du système et la copie papier a disparu du tiroir, et tu n’as jamais eu une seule raison d’être dans cette pièce.',
      },
      'f-why': {
        press:
          'Elle a trouvé une fibrillation auriculaire sur ton bilan annuel et elle allait la déposer le lendemain matin. Premier vol, et pas de vingtième saison.',
      },
    },
    deflections: [
      'C’est Cambridge qui parle. Cambridge n’a jamais été ici dans le noir.',
      'Apporte-moi une chose et pas l’impression d’une chose.',
      'Tu es à onze mille milles d’ici et tu ne doutes de rien.',
    ],
    confession:
      'Elle est venue me le dire elle-même. Elle n’était pas obligée. Elle aurait pu le déposer et me laisser l’apprendre en octobre quand l’avion serait arrivé avec un siège à mon nom dedans.\n\nJe l’ai remerciée. J’y suis revenu et je l’ai bien remerciée, et je le pensais sur le moment.\n\nEnsuite je me suis assis au bord de la couchette pendant à peu près une heure et j’ai calculé ce qu’était le reste. Un appartement à Dunfermline. Un fauteuil. Une télévision allumée l’après-midi. Dix-neuf ans de la seule chose à laquelle j’aie jamais été bon, terminées, à cause d’un rythme.\n\nElle est sortie regarder le ciel. Elle le faisait presque tous les soirs. Je suis sorti derrière elle et je n’avais rien prévu, et je veux que ce soit compris parce que ce n’est pas une excuse, c’est seulement ce qui s’est passé.\n\nElle avait ses chaussures d’intérieur. J’ai remis sa parka sur la patère. C’est la partie que j’ai décidée, et je l’ai décidée en à peu près quatre secondes, et ce sont ces quatre secondes qui font que c’est ce que c’est.',
  },

  epilogue:
    'La station a fini l’hiver. Il n’y avait pas d’autre option et pas d’autre endroit où le mettre, alors pendant cent onze jours six personnes ont pris le petit-déjeuner ensemble et cinq d’entre elles savaient.\n\nMaria Otxoa a écrit un rapport de douze pages sans en adoucir une ligne, puis a cuisiné avec Theo tous les soirs jusqu’en octobre parce que Theo n’y arrivait plus tout seul.\n\nErik Sandved a fait sa déposition en onze notes vocales. La personne chargée de la transcription à Cambridge a dit après que c’était la déclaration de témoin la plus claire qu’elle ait jamais prise, et a demandé s’il était écrivain.\n\nLe dossier de bilan d’Laura Byrne n’a jamais été retrouvé. L’arythmie a été confirmée à Rothera lors de la visite médicale d’octobre, par un médecin arrivé en avion le matin même et qui n’avait jamais rencontré ni l’une ni l’autre.',
};
