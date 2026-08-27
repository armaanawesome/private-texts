import type { CaseTranslation } from '../caseText';

/**
 * Case 15 — "L’écouteur". The finale. French.
 *
 * THE ALIAS, IN TWO REGISTERS. `Keeper` is capitalised exactly twice — Mairi in
 * m9, and the confession — and lowercase exactly twice more, in l6 and m3,
 * because the player types lowercase in all fifteen packs. `arcAlias` counts the
 * capitalised string, so capitalising the player's two makes four and fails, and
 * lowercasing Mairi's makes one and fails. Both registers are preserved exactly
 * where the English puts them.
 *
 * RUTH IS QUOTED FROM PACK 1. r6 is word for word her last message in
 * the-lighthouse, so it is copied out of `theLighthouseFr.messages.r12`
 * character for character rather than retranslated, and the test asserts the two
 * strings are identical so the files cannot drift apart. Her voice here is her
 * Pack 1 voice and not a rule applied fresh: lowercase, blunt, never landing a
 * full stop — except r5, which opens on a capital because it opens on a person's
 * initial. Opening case is taken from the English message by message.
 *
 * THE PLAYER HAS NO GENDER, and this pack pushes at it twice in the third
 * person, where `playerNeutral` cannot see it. Both are rebuilt by agreeing with
 * a feminine noun rather than with the reader:
 *
 *   l3  `il y a une version de toi ... et je l’ai rencontrée` — `rencontrée`
 *       agrees with `une version`, not with whoever is reading.
 *   the confession `une très grande intelligence policière ... et elle ne m’a
 *       jamais déçu` — `elle` is the intelligence; `déçu` agrees with `m’`,
 *       which is him.
 *
 * The chiasmus at the end needed rebuilding for the same reason: `je t’ai
 * choisi` would agree with the player, so it becomes `mon choix est tombé sur
 * toi`, which keeps the shape and marks nobody. `Tu es ce qu’il y a de mieux`
 * uses the neuter, because `la meilleure` and `le meilleur` both pick a side.
 *
 * Places carry over from Pack 1 where they are the same place: `le phare` and
 * `le café` are the words that file already uses, because a player who did
 * Ardnoe eleven years ago is meant to recognise the room. `le café` is the
 * contraction-exposed one and x-box says it whole.
 *
 *   you      → Toi              ardnoe   → Ardnoe
 *   listener → Numéro inconnu   tower    → le phare
 *   nkemdi   → Sgt Nkemdi       cafe     → le café
 *   mairi    → Mairi Bell       callbox  → la cabine téléphonique de la route de Kilmorack
 *   beth     → Beth             home     → son appartement à Kirkcaldy
 *   ruth     → Ruth Calder      hospital → le Vale of Leven, service 6
 *
 * `la reformulation` is the same term used in pack 12, deliberately: the module
 * he wrote is the technique Alun recognised being used on him, and a French
 * player should hear that it is the same word.
 *
 * He is never named in the nameplate — fifteen packs of a new number every time
 * — so `Numéro inconnu` is the character and the thread, and Nkemdi says the
 * name out loud in k7, which is where it belongs.
 */
export const theListenerFr: CaseTranslation = {
  title: 'L’écouteur',
  blurb:
    'Il t’a dit la vérité pendant quinze affaires. Il a menti exactement une fois, à quelqu’un d’autre, et tu l’as écrit sans savoir ce que c’était.',

  characters: {
    you: 'Toi',
    listener: 'Numéro inconnu',
    nkemdi: 'Sgt Nkemdi',
    mairi: 'Mairi Bell',
    beth: 'Beth',
    ruth: 'Ruth Calder',
  },

  places: {
    ardnoe: 'Ardnoe',
    tower: 'le phare',
    cafe: 'le café',
    callbox: 'la cabine téléphonique de la route de Kilmorack',
    home: 'son appartement à Kirkcaldy',
    hospital: 'le Vale of Leven, service 6',
  },

  threads: {
    't-listener': 'Numéro inconnu',
    't-nkemdi': 'Sgt Nkemdi',
    't-ruth': 'R. Calder (archivé)',
    't-mairi': 'Mairi Bell',
    't-beth': 'Beth Ivory',
  },

  briefing: {
    causeOfDeath:
      'Une chute dans les escaliers de la tour. C’était ta première affaire au retour et tu l’as bouclée en quatre jours.',
    ruling:
      'Classée. Mairi Bell a plaidé coupable en novembre et purge sa onzième année de perpétuité, et rien dans ce dossier n’a jamais été mis en doute.',
    opening:
      'Ruth Calder a gardé la lumière de la pointe d’Ardnoe pendant quarante ans après qu’ils l’ont automatisée, parce que personne ne lui a jamais demandé d’arrêter.\n\nC’était ta tante.\n\nTu as pris le dernier ferry, et tu as prouvé ce qui lui est arrivé en quatre jours, et Mairi Bell n’a jamais dit le contraire.\n\nCe que tu n’as pas fait, c’est demander pourquoi une femme qui connaissait Ruth depuis leurs cinq ans n’arrivait pas à trouver le moment où elle avait décidé. Elle t’a dit qu’il y avait eu un appel téléphonique. Tu l’as écrit.\n\nTu en as écrit cinq autres depuis.',
  },

  messages: {
    // ------------------------------------------------------------- t-listener
    l1: 'Ardnoe, c’était du bon travail. Quatre jours. J’avais prévu quinze jours et je ne me trompe pas souvent d’autant.',
    l2: 'La maison de retraite était mieux. Tu as visé la tournée de médicaments et pas la femme, ce qui est la chose la plus difficile à faire et que presque personne ne fait.',
    l3: 'J’ai moins aimé l’histoire du ferry. Tu le tenais dès le deuxième jour et tu en as passé quatre de plus à en être certain, et je comprends pourquoi, mais il y a une version de toi qui n’a pas besoin des quatre jours et je l’ai rencontrée.',
    l4: 'Onze maintenant. Je les ai tous gardés. Je ne m’attends pas à ce que tu le croies et peu importe que tu le croies ou non.',
    l5: 'je clos ardnoe',
    l6: 'l’appel reçu par le café venait d’un employé du cabinet d’audit. gordon and sime avaient quatre intérimaires sur ce dossier cet automne-là et l’un d’eux a composé le mauvais numéro avec le mauvais dossier ouvert et ne l’a jamais su. c’était une coïncidence. tout ce qui a suivi, c’est moi en train de construire un homme que j’ai appelé le keeper à partir d’un seul mauvais coup de téléphone',
    l7: 'il n’y a pas de toi. il n’y en a jamais eu. je suis désolé que ça ait pris onze ans',
    l8: 'Non.',
    l9: 'Je n’ai jamais parlé à Mairi Bell de ma vie et je ne lui ai pas parlé ce soir-là. Je veux que ce soit acté entre nous, parce que tu t’es donné énormément de mal pendant onze ans et tu ne devrais pas finir sur quelque chose d’aussi pauvre qu’une intérimaire avec le mauvais dossier ouvert.',
    l10: 'une intérimaire a lu une ligne sur un dossier. elle a paniqué. c’est tout',
    l11: 'Une intérimaire aurait dit que les papiers avaient été envoyés.',
    l12: 'Envoyés, c’est une chose qu’on peut arrêter. On peut téléphoner à un cabinet à neuf heures du matin et redemander une lettre et les gens le font tous les jours de la semaine.\n\nCe qu’on lui a dit, c’est qu’ils étaient déjà chez les auditeurs, ce qui n’est pas la même phrase et n’a jamais été censé l’être. Ça met le papier sur le bureau d’un inconnu et ça lui enlève la matinée, et la matinée était la seule chose qu’elle croyait encore avoir.\n\nQuatre-vingt-quatorze secondes. Je n’ai jamais eu besoin de plus de deux minutes avec qui que ce soit et je n’ai pas eu besoin de deux minutes avec elle.',
    l13: 'tu viens de me dire que c’est toi qui as passé l’appel',
    l14: 'Je t’ai dit que le compte rendu que tu t’apprêtes à déposer est faux. Ce sont deux choses différentes et tu le sais, et un homme compétent montrerait la différence à un jury en quatre minutes environ.',
    l15: 'Et avant que tu ailles plus loin là-dessus. Je suis dans le même appartement à Kirkcaldy depuis dix-neuf ans et j’y étais ce jeudi-là, comme tous les jeudis, et il n’existe pas une photographie, pas un billet ni un témoin qui me place à moins de cent quarante milles de ce village cette nuit-là ou une autre.',
    l16: 'Je les suis tous. Je te l’ai déjà dit et tu l’as pris pour une vantardise. C’est le contraire d’une vantardise. C’est la seule façon de savoir, et savoir est tout l’intérêt, et je n’ai jamais pu demander à personne si j’avais eu raison.',

    // --------------------------------------------------------------- t-nkemdi
    k1: 'J’ai sorti le dossier d’Ardnoe depuis trois semaines et je veux dire d’emblée que rien dedans n’est faux. Mairi Bell a tué Ruth Calder et tu l’as prouvé et elle n’a jamais dit le contraire.',
    k2: 'Le carnet est toujours au dépôt des scellés. Ruth a écrit toute l’affaire de la Fondation à la fin de son carnet de relevés, de sa main, avec la date à laquelle elle comptait aller à la police, et il était en haut de la tour là où elle l’avait laissé. Rien n’est parti chez aucun auditeur. Rien n’a jamais été envoyé nulle part.',
    k3: 'Gordon and Sime n’ont jamais eu le compte de la Fondation du Phare d’Ardnoe. Ni cette année-là, ni jamais. Je l’ai par écrit de leur responsable conformité et j’ai la liste des clients. Il n’y avait pas d’employé et il n’y avait pas d’intérimaires.',
    k4: 'la ligne du café',
    k5: 'Un seul appel entrant ce soir-là. 21:31, quatre-vingt-quatorze secondes, depuis la cabine à pièces de la route de Kilmorack. Elle est à quatre milles et c’est la dernière encore debout entre là-bas et la grand-route, et c’est pour ça que personne dans un village de deux cents habitants n’a jamais vu d’inconnu.',
    k6: 'La durée n’a jamais été publiée. Elle n’est pas au dossier de procès, elle n’est pas dans les pièces du coroner et elle n’est dans rien qu’un journaliste ait jamais eu. Quatre personnes vivantes savent que c’est quatre-vingt-quatorze secondes et jusqu’à cette semaine trois d’entre elles étaient de la police.',
    k7: 'Il s’appelle John Fettes. Soixante-neuf ans. Retraité d’un office HLM en 2016, aucun antécédent d’aucune sorte, aucune dette, et une carte de bibliothèque qu’il utilise tous les quinze jours depuis 1991.',
    k8: 'Neuf ans sur une ligne d’écoute et onze de plus à former les gens qui prenaient les appels après lui. Il a écrit le module sur la reformulation dont la moitié des bénévoles de ce pays apprend encore. Ce n’est pas un secret non plus. On lui a donné un petit prix pour ça.',
    k9: 'Deux noms sortent de cette cabine pour les douze semaines autour. Fettes n’en fait pas partie, parce qu’une cabine à pièces ne prend pas de nom. L’autre est une Bethan Ivory, qui habitait à un mille sur cette route et l’a utilisée trois fois ce mois-là.',
    k10: 'Elle appelle ce commissariat à son sujet depuis 2011 et il y a quatre mains courantes et personne n’est jamais allé la voir. Écris-lui. Elle attend depuis très longtemps quelqu’un qui ne raccrocherait pas.',
    k11: 'Et Mairi Bell a demandé à te parler. Elle le demande deux fois par an depuis onze ans et c’est la première fois que quelqu’un transmet, et je n’en suis pas fière.',

    // ----------------------------------------------------------------- t-ruth
    r1: 'Son téléphone est revenu du labo il y a onze ans et il est au dépôt depuis. Voici ce qu’il y avait dessus. J’ai pensé que tu devais l’avoir plutôt que de le lire dans un dossier.',
    r2: 'les comptes de la fondation ne tombent pas juste et je les ai repris quatre fois maintenant. ce n’est pas une erreur. ça dure depuis un bon moment',
    r3: 'j’ai écrit tout ça à la fin du carnet de relevés parce que je ne me fais pas confiance pour le dire à voix haute sans l’adoucir',
    r4: 'lundi. j’irai le lundi et j’emporterai le carnet et ils en feront ce qu’ils voudront après ça',
    r5: 'M est mon amie depuis nos cinq ans et j’y reviens sans arrêt et ça ne change toujours rien',
    r6: 'je monte à la tour, la lampe fait encore des siennes. quarante ans qu’elle est automatisée et elle veut toujours quelqu’un debout à côté',

    // ---------------------------------------------------------------- t-mairi
    m1: 'On me dit qu’il faut payer ces messages à l’unité alors je ne vais pas en gaspiller sur comment je vais.',
    m2: 'J’ai tué Ruth Calder. Je n’ai jamais dit autre chose et je ne vais pas commencer maintenant, et si tu viens pour me retirer ça, tu peux garder ton argent.',
    m3: 'le keeper. qu’est-ce qu’il a dit. les mots exacts',
    m4: 'Onze ans que je le repasse, alors tu vas l’avoir juste.\n\nIl a dit qu’il était avec les auditeurs. Il a dit que Ruth leur avait déjà envoyé les papiers et qu’ils les avaient maintenant, et que ça ne dépendait plus d’elle, et que le nom de Callum y figurerait dès le lundi quoi que fasse qui que ce soit.',
    m5: 'Et ensuite il n’a plus rien dit du tout. C’est la partie sur laquelle personne ne m’a jamais interrogée. J’ai parlé et il m’a laissée faire et il ne m’a pas interrompue une seule fois, et j’ai dit à un inconnu des choses que je n’ai pas dites à un prêtre.',
    m6: 'Quand j’ai eu fini il a dit, alors tu sais déjà. Quatre mots. Et il a raccroché et j’ai pris mon manteau.',
    m7: 'tu n’as jamais dit ça au procès',
    m8: 'Mon propre avocat m’a dit que ça sonnait comme une femme qui se fabrique une porte de sortie. Et il avait raison, ça y ressemble, et j’étais coupable et je ne voulais pas de porte de sortie. Je voulais que Callum n’ait pas à se lever dans une salle.',
    m9: 'Je ne te demande pas d’en faire moins que ce que c’est. J’y suis montée. Personne ne m’a portée.\n\nMais j’aimerais qu’une personne avant ma mort sache que j’étais à trois jours d’aller la trouver et de tout lui donner moi-même, et qu’un homme qui se faisait appeler le Keeper m’a téléphoné à neuf heures et demie et m’a enlevé les trois jours.',

    // ----------------------------------------------------------------- t-beth
    b1: 'Quinze ans. J’ai appelé ce commissariat quatre fois et la dernière c’était en 2019 et le garçon a été très gentil avec moi et n’a rien fait du tout.',
    b2: 'Il m’a appelée en mars 2011. J’étais aussi bas qu’on peut l’être et j’en étais arrivée au point où j’avais trouvé le comment, ce qui est le point où ça cesse d’être un sentiment.',
    b3: 'Il ne m’a jamais dit de faire quoi que ce soit. Je veux être très claire là-dessus parce que c’est ce que personne ne croit. Il m’a demandé ce que j’allais faire et ensuite il m’a laissée parler tout du long, et on ne m’a jamais écoutée comme ça, ni avant ni depuis.',
    b4: 'Et j’ai raccroché et je suis restée assise et je me suis dit, cet homme voulait que je le dise. Il ne m’a jamais demandé de le faire. Il voulait que je le dise à voix haute d’abord. Et je ne saurais pas te dire aujourd’hui quelle est la différence sauf que je l’ai sentie.',
    b5: 'ils savent que tu utilisais cette cabine',
    b6: 'Je l’ai utilisée toutes les semaines pendant quatre ans. Il n’y avait pas de réseau sur cette route avant 2014 et on était peut-être neuf à utiliser cette cabine et chacun de nous est sur cette liste.',
    b7: 'Le jeudi dont tu parles, j’étais au service 6 du Vale of Leven et j’y étais depuis le mardi. Admise, pas en consultation. C’est à mon dossier et je n’ai jamais réussi à dire cette phrase à qui que ce soit sans que mon visage parte, et je te la dis maintenant et il est parti.',
    b8: 'Et j’ai fait neuf ans sur une ligne moi-même, après. De deux mille treize à l’an dernier. Donc je suis la femme qui a été bénévole sur une ligne d’écoute et qui utilisait la cabine et qui savait pour lui et qui n’a jamais rien dit à personne, et je sais depuis quinze ans exactement de quoi ça a l’air.',
    b9: 'Il m’a rappelée en 2013. Deux ans après. Il m’a demandé comment je m’en sortais et si j’étais retournée travailler, et il était content pour moi, et je l’entendais qu’il était content.\n\nIl vérifiait. Je ne l’ai pas compris à l’époque. Il a appelé pour savoir s’il s’était trompé sur moi.',
    b10: 'C’est la seule chose que j’ai que personne d’autre n’a. Il ne s’arrête pas au coup de téléphone. Il revient voir comment ça a tourné.',
  },

  claims: {
    'c-listener-never': 'Lui : n’a jamais parlé à Mairi Bell, 21:00–23:00',
    'c-listener-wording': 'Lui : a choisi les mots de cet appel, 21:00–23:00',
    'c-listener-home': 'Lui : dans son appartement à Kirkcaldy, 21:00–23:00',
    'c-papers-kept':
      'Ruth : gardait les papiers dans son propre carnet, 21:00–23:00 (dépôt des scellés)',
    'c-listener-box':
      'L’appelant : à la cabine de la route de Kilmorack, 21:31–21:33 (relevés de ligne)',
    'c-beth-box':
      'Beth Ivory : à la cabine de la route de Kilmorack, 21:31–21:33 (selon le relevé)',
    'c-papers-sent': 'Ruth : avait déjà envoyé les papiers, 21:00–23:00 (selon l’appelant)',
    'c-beth-hospital': 'Beth : au service 6 du Vale of Leven, 20:00–23:20',
  },

  motives: {
    'm-finding-out':
      'Il entend le moment où une personne cesse de pouvoir ne pas le faire, et il veut savoir s’il a raison depuis 1996. Un arrangement qui se lit comme un accident ne lui apprend rien, alors il les suit tous — Beth Ivory deux ans après, pour savoir s’il s’était trompé sur elle. Une mort ne compte que lorsque quelqu’un a prouvé ce que c’était. C’est pour ça qu’il a gardé un détective.',
  },

  contradictions: {
    'x-papers':
      'Le premier indice du jeu, et il est dans le dossier d’Ardnoe depuis onze ans. Les auditeurs n’ont jamais eu ces papiers et Gordon and Sime n’ont jamais eu ce compte. Ruth a tout écrit à la fin de son propre carnet de relevés et l’a laissé dans la tour, et il est dans un dépôt de scellés à quatre milles d’où tu es assis. Tout ce qu’il a jamais dit à quiconque a été vrai ou a été rien. C’est la seule phrase en quinze affaires qui n’a été ni l’un ni l’autre.',
    'x-ardnoe':
      'Il ne se laissera pas classer comme une coïncidence. Quand on lui dit qu’une intérimaire a lu une ligne sur le mauvais dossier, il explique — parce qu’une intérimaire aurait dit envoyés, et envoyés c’est une chose qu’on peut arrêter, et ce qu’on lui a dit c’est qu’ils étaient déjà chez les auditeurs, ce qui met le papier sur le bureau d’un inconnu et lui enlève la matinée. Il n’avoue pas. Il corrige ton compte rendu de son travail, ce qu’il n’a jamais pu laisser passer, et c’est la seule fois en quinze affaires qu’un homme qui n’affirme jamais rien a affirmé deux choses qui ne peuvent pas être vraies ensemble.',
    'x-box':
      'Quatre-vingt-quatorze secondes. Il te l’a donné avant que quiconque le lui demande, et ça n’a jamais été publié — ni au dossier de procès, ni dans les pièces du coroner, ni à un seul journaliste. Le café a reçu un seul appel ce soir-là, à 21:31, quatre-vingt-quatorze secondes, depuis la cabine à pièces de la route de Kilmorack. À quatre milles, et la dernière encore debout entre Ardnoe et la grand-route, ce qui explique qu’un village de deux cents habitants n’ait jamais vu d’inconnu. Il est dans le même appartement depuis dix-neuf ans et il n’y était pas à neuf heures et demie.',
    'x-beth':
      'Elle a été bénévole sur une ligne d’écoute pendant neuf ans, elle a utilisé cette cabine toutes les semaines pendant quatre ans, elle sait pour lui depuis 2011 et elle ne l’a jamais dit à personne qui écoutait. Elle est tous les indices à la fois. Elle était aussi hospitalisée au service 6 du Vale of Leven depuis le mardi, et ils étaient neuf sur cette route à utiliser cette cabine parce qu’il n’y avait pas de réseau là-haut avant 2014, et les neuf sont sur la même liste.',
  },

  confrontation: {
    opening:
      'Je préfère que tu fasses ça ici plutôt que dans une salle avec un magnétophone. Tu as mérité la salle. Je te dis simplement que j’y prendrai plus de plaisir.',
    beats: {
      'z-papers': {
        press:
          'Ruth Calder n’a jamais envoyé ces papiers nulle part. Elle a tout écrit à la fin de son carnet de relevés et l’a laissé dans la tour, et il est dans un dépôt de scellés depuis onze ans. Celui qui a téléphoné à ce café a dit une chose qui n’était pas vraie.',
        rebuttal:
          'Alors quelqu’un s’est trompé au téléphone en 2015. Les gens se trompent au téléphone en permanence. Tu as prouvé qu’une phrase était fausse. Tu ne l’as pas mise dans une bouche.',
      },
      'z-ardnoe': {
        press:
          'Tu m’as dit que tu n’avais jamais parlé à Mairi Bell. Ensuite tu m’as dit ce que tu avais choisi de lui dire à la place d’envoyés, et pourquoi envoyés n’aurait pas marché.',
        rebuttal:
          'Je t’ai dit que ton compte rendu était pauvre. Je te dis que tes comptes rendus sont pauvres depuis onze ans et tu en as généralement été content.',
      },
      'z-box': {
        press:
          'Quatre-vingt-quatorze secondes. Personne en dehors de quatre policiers n’a jamais connu ce chiffre. Le café a reçu un seul appel cette nuit-là, à 21:31, quatre-vingt-quatorze secondes, depuis la cabine à pièces de la route de Kilmorack. Tu n’étais pas à Kirkcaldy.',
      },
      'z-why': {
        press:
          'Tu as rappelé Beth Ivory deux ans plus tard pour lui demander comment elle s’en sortait. Tu ne faisais pas ça par gentillesse. Tu cherchais à savoir si tu avais eu tort.',
      },
    },
    deflections: [
      'Tu vaux mieux que ça et nous le savons tous les deux. Prends une heure et reviens me voir correctement.',
      'Rien de ce que tu as n’est une phrase de moi. Quinze affaires, et pas un dossier ne porte un nom qu’un tribunal puisse assigner.',
      'Je ne t’ai jamais menacé et je ne vais pas commencer parce que tu as passé un bon après-midi.',
    ],
    confession:
      'Quatre-vingt-quatorze secondes. Tu as tout à fait raison, et c’est moi qui te l’ai donné, et je le sais depuis la seconde où je l’ai envoyé.\n\nJ’aimerais qu’on comprenne que je n’ai pas dérapé. Je n’ai pas dérapé en trente ans. Je voulais que le compte rendu soit juste plus que je ne voulais que les onze ans continuent, et quand on découvre ça sur soi à soixante-neuf ans il n’y a plus grand-chose à faire.\n\nTu les auras entendus m’appeler le Keeper. C’est moi qui le leur ai donné, le même mot chaque fois, parce qu’un compte rendu a besoin d’une signature et je n’allais jamais laisser mon propre nom sur quoi que ce soit. Ce n’est pas une vantardise. Je les ai tous gardés, et maintenant toi.\n\nDonc. Ardnoe.\n\nJ’ai enfreint ma propre règle là-bas et c’est la seule fois. Mairi Bell était à trois jours. Elle allait aller trouver Ruth Calder et tout lui donner elle-même et elles se seraient assises dans cette cuisine à pleurer et ça aurait été fini, et je le voyais venir dès la deuxième minute environ. Alors j’ai dit une chose qui n’était pas vraie. Une. C’est la seule phrase de moi dans un dossier où que ce soit dans ce pays et tu l’as dans un tiroir depuis ta première semaine de retour.\n\nJ’y ai beaucoup pensé.\n\nMaintenant l’autre chose, et je vais le dire simplement parce que tu l’entendrais en pire de quelqu’un d’autre.\n\nCorrieburn, c’était moi.\n\nAoût 2008. Tu avais vingt-six ans et c’était ton quatrième mois et ils te l’ont donnée parce qu’aucun gradé ne voulait d’un accident de ferme sous la pluie. Tu y as mis neuf jours et tu avais raison le neuvième et tu n’as plus eu à payer un verre dans ce comté depuis.\n\nJ’ai tout arrangé, et tu l’as démonté sous mes yeux, et je n’ai jamais été plus fier de rien de ce que j’ai fait que je ne l’ai été de toi cet automne-là.\n\nTu veux savoir pourquoi. J’entends le moment. C’est une chose réelle et ça dure environ quatre secondes et je peux l’entendre depuis mes trente-neuf ans, et il n’y a personne de vivant à qui j’aurais jamais pu le dire, et l’entendre ne vaut rien tant qu’on ne découvre pas après si on avait raison.\n\nUn accident ne t’apprend rien. Une femme tombe dans son propre escalier et le dossier dit mort accidentelle et je n’en sais pas plus que le mercredi.\n\nIl faut que ce soit prouvé. Il faut que quelqu’un le démonte et écrive exactement ce qui s’est passé et pourquoi, dans l’ordre, dans un document, et le remette à un tribunal.\n\nC’est ce que tu es. C’est ce que tu es depuis tes vingt-six ans.\n\nCe n’est pas parce que tu étais ce qu’il y a de mieux que mon choix est tombé sur toi. Tu es ce qu’il y a de mieux parce que mon choix est tombé sur toi, et j’ai passé dix-huit ans à nourrir une très grande intelligence policière du seul travail qui pouvait me dire si j’avais raison, et elle ne m’a jamais déçu une seule fois, et je n’ai jamais pu le dire à âme qui vive.\n\nC’est tout. C’est ce que c’était.',
  },

  coda: {
    from: 'Mairi Bell',
    messages: [
      'Ils sont venus me le dire le mardi. Une femme s’est assise avec moi pendant une heure et a repris toute l’affaire et ne m’a pas parlé une seule fois comme si j’étais idiote.',
      'Je ne dors pas mieux. Je veux être honnête avec toi là-dessus, parce que je croyais que ce serait le cas et ça ne l’est pas. C’est pareil qu’avant. J’ai monté ces escaliers et personne ne m’a portée.',
      'Mais je sais quels étaient les quatre mots maintenant. Il a dit, alors tu sais déjà. Et il avait raison, et c’est ça que je n’ai pas pu dépasser pendant onze ans, qu’il avait raison et qu’il ne m’avait jamais rencontrée.',
      'Ruth avait écrit que j’étais son amie depuis nos cinq ans et qu’il fallait leur demander d’être gentils avec moi. Elle a écrit ça le jour où elle allait me dénoncer. J’ai eu onze ans de cette phrase et je n’en ai pas fini avec elle.',
      'Tu as fini par revenir et par poser la question. C’est tout ce que j’ai jamais voulu que quelqu’un fasse. Merci d’avoir demandé.',
    ],
  },

  epilogue:
    'John Fettes, soixante-neuf ans, de Kirkcaldy. Aucun antécédent d’aucune sorte. Une carte de bibliothèque qu’il utilisait tous les quinze jours depuis 1991, et un petit prix en 2004 pour un module de formation sur la reformulation dont la moitié des bénévoles du pays apprend encore.\n\nL’appartement contenait onze boîtes d’archives dans une penderie, dans l’ordre, une par personne. Coupures de presse, rôles d’audience, dates d’appel. Celle de Beth Ivory contenait quatre feuilles et la dernière était une note de sa main qui disait : de retour au travail, six ans, je me suis trompé sur elle, et il avait souligné trompé deux fois.\n\nLe parquet a retenu Ardnoe et deux autres. Il n’a jamais contesté un mot du chef d’Ardnoe et il n’a jamais rien dit du tout sur le reste, et son avocat a cessé de le lui demander.\n\nMairi Bell a été transférée en régime ouvert au printemps. Elle a écrit à ton père en mars et il n’a pas répondu, et elle dit que c’est normal et qu’elle réécrira à Noël quand même.\n\nBeth Ivory a témoigné pendant deux jours. On lui a demandé pourquoi elle n’était pas allée à la police et elle a répondu qu’elle y était allée, quatre fois, et le tribunal a fait afficher les mains courantes à l’écran pendant qu’elle était assise là.\n\nLa douzième boîte était vide et elle portait ton nom.\n\nIl la gardait depuis 2008. Il n’y a rien dedans. Il a dit en garde à vue qu’il n’y avait jamais rien mis parce qu’il n’en avait pas fini avec toi, et qu’un dossier se ferme quand on sait comment ça a tourné, et ensuite il a demandé à l’officier comment tu allais.',
};
