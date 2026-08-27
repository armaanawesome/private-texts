import type { CaseTranslation } from '../caseText';

/**
 * Case 12 — "La ligne d’écoute". French.
 *
 * REGISTER. This is a listening charity's overnight shift and it is the pack
 * where one flippant word does the most damage. Everybody here except the
 * player writes in full, careful sentences and finishes them, because they are
 * trained to and because the whole thing rests on a promise about care. Nothing
 * is slangy, nobody is arch, and the two people who could be cruel — Sunny about
 * being pushed out, Prem about doing the opposite of his job — are given plain
 * words instead. The callers stay unnamed and off the page, exactly as in the
 * English.
 *
 * THE VOICE AXIS, since casing separates only the player. It is what each person
 * does under pressure:
 *
 *   Connie names the cost to other people before her own — `c’est cette
 *          partie-là qui m’empêche de dormir`, about the callers, not about her.
 *   Alun   is the only one who trails off. b3 and b7 both break with `...`, and
 *          his first deflection is a question that hands the silence back. He
 *          listens even in a group chat, which is the thing he is good at and
 *          the thing he does to the player.
 *   Yusuf  counts his own inexperience into every answer: `quatre permanences`,
 *          `je l’ai fait quatre fois`.
 *   Sunny  says the thing nobody joins up, and says she liked him anyway.
 *   Prem   cites the rule and then what he has had to do against it.
 *   You    lowercase, short, no terminal stop.
 *
 * Times. Only Prem writes a clock in digits — `02:10`/`03:40` from the duty book,
 * `02:55`/`03:05` from the alarm panel — because those are the two written
 * records, and everybody else speaks in words. That split is the case: the book
 * is handwriting and the panel is a machine, and only one of them can be wrong
 * by accident.
 *
 * Places. `le bureau` is the contraction-exposed one — `au bureau` and `du
 * bureau` would swallow the article — so y7 says `Il est passé dans le bureau`
 * and the chips carry it whole.
 *
 *   you    → Toi      branch     → l’antenne
 *   connie → Connie   callroom   → la salle d’appels
 *   alun   → Alun     office     → le bureau
 *   yusuf  → Yusuf    kitchen    → la cuisine
 *   sunny  → Sunny    backstairs → l’escalier de service
 *   prem   → Prem     sunnyhome  → l’appartement de Sunny
 *
 * Charity vocabulary is the real French: `la ligne d’écoute`, `un écoutant` for
 * a listener, `le cahier de permanence` for the duty book, `le planning` for the
 * rota, `un badge` for a fob, `la centrale` for the alarm panel, `les voyants`
 * for the lamps, `la reformulation` for reflecting back — which is the actual
 * counselling term, and matters, because that is the technique he recognises
 * being used on him.
 *
 * `le Keeper` stays English and appears three times, all after the case is
 * solved: twice in the confession and once in the coda. This is the fourth arc
 * connection and clue 5 — that he is one of them — lands in the confession only.
 *
 * The player's gender is never stated. Three lines were built around it: the
 * briefing ends `c’est elle qui t’a appris le métier` rather than `qui t’a
 * formé·e`, c1 opens `Tu dors` rather than `tu es réveillé·e`, and p8 has Connie
 * sit `à la place où tu es` rather than `là où tu es assis·e`.
 */
export const theHelplineFr: CaseTranslation = {
  title: 'La ligne d’écoute',
  blurb:
    'Chaque appel est noté à la main et personne n’a jamais eu de raison d’en vérifier un. Son alibi, c’est quatre-vingt-dix minutes sur une ligne qui n’a jamais servi.',

  characters: {
    you: 'Toi',
    connie: 'Connie',
    alun: 'Alun',
    yusuf: 'Yusuf',
    sunny: 'Sunny',
    prem: 'Prem',
  },

  places: {
    branch: 'l’antenne',
    callroom: 'la salle d’appels',
    office: 'le bureau',
    kitchen: 'la cuisine',
    backstairs: 'l’escalier de service',
    sunnyhome: 'l’appartement de Sunny',
  },

  threads: {
    't-connie': 'Connie',
    't-branch': 'Bénévoles Beacon',
    't-yusuf': 'Yusuf',
    't-sunny': 'Sunny',
    't-prem': 'Prem Chandrasekaran',
  },

  briefing: {
    causeOfDeath:
      'Un traumatisme crânien. Il y a une marche pour descendre dans ce bureau et elle est au registre des risques depuis 2019.',
    ruling:
      'Enregistré comme une chute. Deux bénévoles étaient de permanence et tous les deux étaient au téléphone, c’est ce que dit le cahier de permanence.',
    opening:
      'Beacon tient une ligne d’écoute dans deux pièces au-dessus d’un magasin de moquettes. Rien n’est enregistré, rien n’est traçable, et chaque appel est noté à la main après coup par la personne qui l’a pris, et c’est la promesse sur laquelle tout repose.\n\nConstance Bawa était directrice des bénévoles depuis onze ans. On l’a retrouvée dans le bureau à sept heures du matin quand le binôme de jour est arrivé.\n\nTu as fait quatre ans sur cette ligne avant de déménager, et c’est elle qui t’a appris le métier.',
  },

  messages: {
    // --------------------------------------------------------------- t-connie
    c1: 'Tu dors ou tu es quelqu’un qui a un travail normal maintenant. J’ai un truc et j’aimerais le dire à quelqu’un qui a fait la formation.',
    c2: 'vas-y',
    c3: 'Une appelante a téléphoné sur la ligne du bureau la semaine dernière pour dire merci. Pas sur la ligne d’écoute. Sur la ligne du bureau, en pleine journée, en demandant un bénévole par son prénom.',
    c4: 'oh non',
    c5: 'Elle avait son numéro de portable. Elle l’a depuis deux ans. Elle pensait que ça me ferait plaisir et elle ne comprenait pas pourquoi je m’étais tue.',
    c6: 'C’est Alun. Vingt-deux ans, deux nuits par semaine, le meilleur écoutant que j’aie jamais mis sur cette ligne, et il donne son numéro aux gens depuis à peu près 2011 d’après ce que j’arrive à reconstituer.',
    c7: 'pourquoi il ferait ça',
    c8: 'Parce qu’à la fin d’un appel on raccroche et on ne sait jamais. C’est ça le métier et c’est la partie la plus dure du métier et tous ceux qui l’ont fait se sont tenus dans cette cuisine à quatre heures du matin en voulant savoir.',
    c9: 'Lui voulait savoir. Alors il a arrêté de raccrocher.',
    c10: 'tu dois le porter au conseil',
    c11: 'Oui, et ça va le détruire, et Prem devra écrire à chaque appelant qu’on peut identifier, et il y a dehors des gens qui vont apprendre que la personne en qui ils avaient confiance ne le faisait pas comme on le leur avait promis. C’est cette partie-là qui m’empêche de dormir.',
    c12: 'Je suis de nuit le jeudi avec lui. Je vais le lui dire en face d’abord, dans le bureau, avant d’écrire quoi que ce soit.',
    c13: 'Arrivée. Yusuf est avec nous, le pauvre, trois semaines après sa formation. Je le ferai vers deux heures quand les téléphones se calmeront.',

    // --------------------------------------------------------------- t-branch
    b1: 'À tous les bénévoles. Connie est morte à l’antenne dans la nuit de jeudi. Le binôme de jour l’a trouvée dans le bureau à sept heures. La ligne est suspendue jusqu’à lundi et le conseil se réunit demain.',
    b2: 'Personne ne doit parler à qui que ce soit des affaires de l’antenne. Ce n’est pas moi qui fais des difficultés, c’est la seule règle qui ait jamais compté ici.',
    b3: 'Onze ans qu’elle dirigeait cette antenne et elle connaissait chacun de nos noms et lesquels d’entre nous elle devait appeler un mauvais dimanche... Je n’ai rien de mieux que ça à dire.',
    b4: 'J’étais au téléphone. De deux heures dix à quatre heures moins vingt, un seul appel, et il n’a pas été facile. C’est dans le cahier.',
    b5: 'Dans la salle d’appels toute la permanence, tous les deux, casques sur les oreilles. C’est pour ça qu’aucun de nous n’a rien entendu, et je vis avec ça depuis vendredi.',
    b6: 'Je veux le dire maintenant, avant que quelqu’un le dise à ma place : je n’ai pas mis les pieds dans ce bâtiment depuis le trois et j’ai remis mon badge à Prem moi-même.',
    b7: 'Personne n’a rien dit sur toi, Sunny... même si j’ai cru entendre quelqu’un dans l’escalier de service vers deux heures et demie, et je me suis posé la question.',
    b8: 'Dis-le correctement ou ne le dis pas du tout. C’est toute la formation et tu en as vingt-deux ans derrière toi.',
    b9: 'Ça suffit. Tous les deux. À moi, pas à quarante personnes.',

    // ---------------------------------------------------------------- t-yusuf
    y1: 'C’était ma quatrième permanence. J’ai fait quatre permanences. Je n’arrête pas de le dire aux gens comme si ça expliquait quelque chose.',
    y2: 'J’étais dans la salle d’appels de deux heures à quatre heures. Je n’ai pris aucun appel de toute la nuit, ce qu’on te dit qui arrive et à quoi personne ne te prépare.',
    y3: 'est-ce qu’alun était en appel',
    y4: 'Il y a un tableau au mur avec quatre voyants, un par ligne. Quand une ligne est occupée le voyant est allumé. Il date d’à peu près 1990 et c’est la seule chose de cette pièce qui te dise quoi que ce soit.',
    y5: 'Aucun voyant n’était allumé entre deux heures et demie et trois heures et demie environ. Je le sais parce que je suis resté à regarder quatre voyants éteints pendant une heure en me disant voilà ce que j’ai rejoint.',
    y6: 'il était où',
    y7: 'Il est passé dans le bureau vers deux heures et demie. Je l’ai vu y aller et je ne l’ai pas vu revenir pendant un moment et je n’y ai pas prêté attention, parce qu’il fait ça depuis vingt-deux ans et moi je l’ai fait quatre fois.',
    y8: 'Connie était dans ce bureau depuis minuit. Elle y fait le planning et les statistiques et elle avait laissé la porte ouverte, ce qu’elle fait toujours pour que les gens entrent.',
    y9: 'Parle à Sunny Halvorsen. Tout le monde a décidé qu’elle est difficile et c’est la seule personne de cette antenne qui dit la chose telle qu’elle est.',

    // ---------------------------------------------------------------- t-sunny
    s1: 'J’ai fait un signalement de protection en janvier et on m’a demandé de me mettre en retrait en mars, et on a laissé ces deux faits côte à côte pendant cinq mois sans que personne les relie.',
    s2: 'Le signalement portait sur un bénévole qui gardait le contact avec une appelante. Je n’avais pas de nom. J’avais un schéma et un mauvais pressentiment et pas de nom, alors ça n’a mené nulle part, et c’est normal.',
    s3: 'tu étais où jeudi',
    s4: 'Dans mon appartement, avec mon chien, à regarder quatre épisodes d’une série danoise. Personne ne peut le confirmer et je ne vais pas prétendre que quelqu’un le peut.',
    s5: 'Ce que je peux prouver, c’est que j’ai remis mon badge à Prem le trois mars devant deux personnes, et que cette porte ne s’ouvre pas sans badge, et que la centrale note chaque fois qu’elle s’ouvre.',
    s6: 'Donc quand Alun Meredith dit qu’il a entendu quelqu’un dans l’escalier de service, soit il se trompe, soit il te dit où il était, et j’aimerais beaucoup que quelqu’un lui demande laquelle des deux.',
    s7: 'Et je l’aimais bien. C’est ça que je n’arrive à faire entendre à personne. Je me suis assise dans cette cuisine avec cet homme à quatre heures du matin et c’est la personne la plus gentille de ce planning.',
    s8: 'Demande la centrale à Prem. Il l’a depuis vendredi et il est administrateur et il a peur de ce qu’elle dit.',

    // ----------------------------------------------------------------- t-prem
    p1: 'Je suis administrateur depuis neuf ans et tout mon travail a consisté à protéger la promesse que rien de ce qui se dit sur cette ligne n’en sort. J’ai passé cette semaine à faire le contraire et j’en suis conscient à chaque heure.',
    p2: 'Le cahier de permanence a un seul appel pour Alun jeudi. 02:10 à 03:40, quatre-vingt-dix minutes, noté de sa main avec trois lignes de résumé, ce qui est exactement à quoi ressemble un long appel.',
    p3: 'La facture de télécoms est arrivée mercredi. Elle ne dit pas qui a appelé ni ce qui a été dit, parce qu’elle ne le peut pas. Elle dit combien de minutes chaque ligne a portées, et jeudi entre deux heures et quatre heures, les quatre lignes n’ont rien porté du tout.',
    p4: 'la centrale de la porte',
    p5: 'La porte de l’escalier de service est sous alarme entre onze heures et six heures et chaque ouverture est notée avec un numéro de badge. Il y a une seule ouverture jeudi soir. 02:55, le badge d’Alun Meredith, et une fermeture à 03:05.',
    p6: 'Le badge de Sunniva Halvorsen a été désactivé le trois mars et n’a rien ouvert depuis. Je l’ai fait moi-même et j’ai le formulaire.',
    p7: 'Connie est venue me voir le lundi au sujet d’Alun et des numéros. Elle avait deux noms et une date qui remontait à 2011 et elle allait porter ça au conseil le quatorze.',
    p8: 'Elle n’était pas en colère contre lui. Je veux que quelqu’un l’écrive quelque part. Elle s’est assise à la place où tu es et elle a dit, Prem, il l’a fait parce qu’il ne supportait pas de ne pas savoir, et ce n’est pas une excuse et je vais devoir le faire quand même.',
    p9: 'Vingt-deux ans. Deux nuits par semaine. Calcule ce que ça fait en heures un de ces jours, et calcule ensuite ce qu’il faudrait pour le perdre.',
  },

  claims: {
    'c-connie-kitchen': 'Connie : dans la cuisine, 23:00–23:40',
    'c-alun-oncall': 'Alun : en appel, 02:10–03:40',
    'c-alun-callroom': 'Alun : dans la salle d’appels, 02:00–04:00',
    'c-sunny-branch': 'Sunny : à l’antenne, 02:00–03:00 (selon Alun)',
    'c-yusuf-callroom': 'Yusuf : dans la salle d’appels, 02:00–04:00',
    'c-alun-offphones': 'Alun : pas au téléphone, 02:20–03:20 (selon Yusuf)',
    'c-alun-office': 'Alun : dans le bureau, 02:30–02:50 (selon Yusuf)',
    'c-connie-office': 'Connie : dans le bureau, 00:00–03:00 (selon Yusuf)',
    'c-sunny-home': 'Sunny : dans son appartement, 01:00–04:00',
    'c-alun-backstairs': 'Alun : dans l’escalier de service, 02:55–03:05 (centrale d’alarme)',
  },

  motives: {
    'm-numbers':
      'Il donnait son numéro personnel aux appelants depuis à peu près 2011, parce qu’à la fin d’un appel on raccroche et on ne sait jamais. Connie avait deux noms et une date et elle portait ça au conseil le quatorze, ce qui l’aurait détruit.',
  },

  contradictions: {
    'x-alun-office':
      'Il les a mis tous les deux dans la salle d’appels avec les casques sur les oreilles pendant toute la permanence, ce qui explique qu’aucun des deux n’ait rien entendu. Yusuf Kaya l’a vu passer dans le bureau vers deux heures et demie, à sa quatrième permanence, et n’y a pas prêté attention, parce qu’Alun fait ça depuis vingt-deux ans et que Yusuf l’avait fait quatre fois.',
    'x-alun-call':
      'Le cahier de permanence porte quatre-vingt-dix minutes de sa main avec trois lignes de résumé, et rien sur cette ligne n’est enregistré ni traçable, ce qui est la promesse sur laquelle repose toute l’association. Il y a au mur de la salle d’appels un tableau avec quatre voyants, un par ligne, et il date d’à peu près 1990. Yusuf est resté à regarder quatre voyants éteints pendant une heure en se disant voilà ce que j’ai rejoint.',
    'x-alun-stairs':
      'La porte de l’escalier de service est sous alarme de onze heures à six heures et chaque ouverture est notée en face d’un numéro de badge. Il y a exactement une ouverture jeudi soir. Son badge, 02:55, refermée à 03:05. Il a dit à quarante bénévoles qu’il croyait avoir entendu quelqu’un dans cet escalier.',
    'x-sunny-fob':
      'Il a mis Sunniva Halvorsen dans le bâtiment devant quarante personnes, huit minutes après qu’elle a dit qu’elle n’y était pas venue depuis mars. Elle a remis son badge à Prem le trois devant deux témoins, il a été désactivé le jour même, et cette porte ne s’ouvre pas sans badge. Elle l’aimait bien. Elle s’était assise dans cette cuisine avec lui à quatre heures du matin.',
  },

  confrontation: {
    opening:
      'Tu as fait quatre ans sur cette ligne. Donc tu sais déjà que la première chose que je vais faire, c’est te laisser parler, et tu sais déjà que le savoir n’empêche pas que ça marche.',
    beats: {
      'p-office': {
        press:
          'Tu as dit que vous étiez tous les deux dans la salle d’appels toute la nuit avec les casques. Yusuf t’a vu passer dans le bureau à deux heures et demie.',
        rebuttal:
          'Un jeune homme terrifié à sa quatrième permanence, qui venait de trouver au pied d’une marche une femme qu’il aimait bien... Je ferais attention au poids que tu mets sur lui. Il le portera de toute façon.',
      },
      'p-call': {
        press:
          'Quatre-vingt-dix minutes dans le cahier, de ta main. Les quatre lignes n’ont rien porté entre deux heures et quatre heures, et Yusuf est resté une heure à regarder quatre voyants éteints.',
        rebuttal: 'Les voyants tombent en panne. Ce tableau est plus vieux que Yusuf.',
      },
      'p-stairs': {
        press:
          'La porte de l’escalier de service est sous alarme à partir de onze heures. Une seule ouverture jeudi soir. Ton badge, trois heures moins cinq, refermée à trois heures cinq. Et tu as dit à quarante personnes que tu croyais avoir entendu quelqu’un dans cet escalier.',
      },
      'p-why': {
        press:
          'Elle avait deux noms et une date qui remontait à 2011, et le conseil se réunissait le quatorze. Elle n’était pas en colère contre toi. Elle a dit à Prem que tu l’avais fait parce que tu ne supportais pas de ne pas savoir.',
      },
    },
    deflections: [
      'Mm. Et qu’est-ce que tu voudrais qu’il se passe, si c’était vrai ?',
      'Tu travailles très fort. Je le reconnais, parce que je le fais pour de vrai, deux fois par semaine, gratuitement.',
      'Apporte-moi autre chose qu’un jeune homme qui se souvient d’une mauvaise nuit.',
    ],
    confession:
      'Elle avait laissé la porte ouverte. Elle laissait toujours la porte ouverte, parce que dans ce bâtiment une porte fermée veut dire quelque chose.\n\nEt elle a été gentille. Elle a dit Alun, je sais pourquoi, et elle l’a dit comme on nous apprend à le dire, c’est-à-dire comme moi j’ai appris à la moitié d’entre eux à le dire.\n\nJ’écoute depuis vingt-deux ans et je n’ai jamais dit une seule fois ce que je voulais. C’est ça la discipline. On ne se met pas dans la pièce. Et je me suis assis dans ce bureau et je l’ai entendue être professionnelle avec moi, et j’ai compris que j’allais devenir un dossier, et que des gens à qui je parle à quatre heures du matin depuis dix ans allaient recevoir une lettre.\n\nJe ne me souviens pas de m’être levé.\n\nIl y a encore une chose et je vais la dire parce que c’est la pire partie de chaque journée depuis.\n\nUn homme qui se faisait appeler le Keeper m’a appelé chez moi le mardi. Il a dit qu’il faisait une étude sur le bien-être des bénévoles pour la fédération, et qu’il voulait entendre comment l’antenne me traitait.\n\nEt il était bon. Il était tellement bon. Il faisait les silences. Il faisait la reformulation, mes mots exacts, les petits mots qu’on utilise pour ouvrir quelqu’un sans qu’il s’en aperçoive. Il m’a demandé ce que ce serait, après, et il a attendu, et il n’a pas comblé le vide.\n\nJe savais ce qu’il faisait. C’est ça le pire. J’ai enseigné ça. Je me suis assis dans ma propre cuisine et j’ai écouté le Keeper utiliser ma propre formation sur moi et je l’ai laissé faire, parce que c’était la première fois en vingt-deux ans que quelqu’un me demandait quelque chose et attendait la réponse.\n\nIl n’a pas dit un seul mot sur Connie. Pas un. Il est très prudent et il est des nôtres, ou il l’a été.',
  },

  coda: {
    from: 'Numéro inconnu',
    messages: [
      'Beacon. Celle-là a dû te coûter quelque chose et j’en suis désolé, que tu le croies ou non.',
      'Il a raison, bien sûr. C’est là que j’ai appris. Neuf ans de jeudis dans une pièce comme celle-là, il y a longtemps, et personne n’a jamais posé la question parce que personne n’a jamais pensé à chercher le Keeper à sa manière d’être.',
      'Tu en as cinq maintenant. L’âge, l’accès, les décennies, le rappel, et celle-ci. C’est assez pour me trouver et nous le savons tous les deux.',
      'Je ne vais pas m’arrêter. Mais j’aimerais que tu comprennes que je n’ai jamais eu à dire la chose moi-même. À aucun d’eux. Demande-toi si ça rend les choses meilleures ou pires, parce que je me le demande depuis trente ans et je n’ai abouti à rien.',
    ],
  },

  epilogue:
    'Le conseil a écrit à onze personnes. Prem Chandrasekaran a rédigé la lettre neuf fois et la neuvième faisait deux paragraphes, et elle n’employait pas le mot manquement.\n\nQuatre des onze ont répondu. Trois d’entre elles ont dit que l’homme au bout du fil les avait maintenues en vie, et ont demandé si elles avaient le droit de le dire.\n\nSunniva Halvorsen a été réinvitée sur le planning en septembre et a refusé, puis a accepté en janvier, et fait maintenant la nuit du jeudi.\n\nYusuf Kaya a fait cent quarante permanences. Le tableau au mur a été remplacé au printemps par un qui enregistre, et il s’y est opposé à la réunion des bénévoles au motif qu’une pièce où rien n’est écrit est tout l’intérêt de la chose, et il a perdu, et il avait raison.',
};
