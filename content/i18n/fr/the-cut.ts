import type { CaseTranslation } from '../caseText';

/**
 * Case 9 — "Le canal". French.
 *
 * The alias. `le Keeper` stays English and appears exactly once, in the
 * confession — this is the third arc connection and it lands after the case is
 * solved. The coda circles it without naming it (`Je l’ai bien rappelé après`),
 * which is the point: the follow-up call is the careless thing, and he says so
 * himself. Nothing before the confrontation may say the word.
 *
 * The arithmetic is the lie. A narrowboat does three miles an hour and a lock
 * takes a quarter of an hour, so everyone on the cut answers questions in miles
 * and locks and never notices they are answering about the boat. Those units
 * therefore stay exactly as the English has them — `six milles`, `cinq écluses`,
 * `trois milles à l’heure`, and `quarante minutes à vélo` against them. Convert
 * miles to kilometres and the sum a player is meant to do in their head stops
 * being the sum the village did.
 *
 * Digits. Exactly one message carries a clock — g6, the key log at `20:44` —
 * because that is a machine and everything else is a person remembering. The
 * test pins it: if the moorings start talking in timestamps, the log stops being
 * the only hard thing in the case.
 *
 * Places, and the contraction trap. Four of these begin with an article that
 * `au`/`du`/`aux` would swallow, so each is written somewhere it survives whole:
 * `le canal` in the blurb, `le chemin de halage` in k9, `le Junction` in g7
 * (`dans le Junction`, never `au Junction`), `les écluses de Tyrley` in g1 (`à
 * faire les écluses de Tyrley`, never `aux écluses`), `le quai de Norbury` in
 * g5. The hospital is `l’hôpital Royal Shrewsbury` rather than `le Royal
 * Shrewsbury` for the same reason — elision survives, contraction does not.
 *
 *   you    → Toi      cut          → le canal
 *   verity → Julie    norbury      → Norbury
 *   nate   → Nate     norburywharf → le quai de Norbury
 *   bo     → Sam      veritysboat  → le bateau de Julie
 *   gwyn   → Alan     pub          → le Junction
 *   tam    → Tam      tyrley       → Tyrley
 *                     tyrleylocks  → les écluses de Tyrley
 *                     towpath      → le chemin de halage
 *                     hospital     → l’hôpital Royal Shrewsbury
 *
 * Canal vocabulary is the real French: `faire les écluses` for lock-wheeling,
 * `le plat-bord` for the gunwale, `le pont arrière` for the stern deck, `les
 * amarrages` for the moorings, `le chemin de l’autre rive` for the offside path,
 * `les urgences` for A&E. `le Trust` stays, because the Canal and River Trust is
 * an organisation with a name.
 *
 * Voice. The player is lowercase and never terminates. Julie, Sam and Alan write
 * in full sentences and finish them. Nate is the interesting one: he capitalises
 * like the others and then trails off without a full stop every time he
 * volunteers something nobody asked for — k4, k6, k7 — which is exactly what he
 * is doing, getting in front of it. Tam splits by audience: lowercase and
 * unterminated in the group, capitalised and finished one-to-one.
 *
 * The player's gender is never stated; the briefing takes `tu vis à terre depuis
 * quatre ans` rather than `tu es installé·e`.
 */
export const theCutFr: CaseTranslation = {
  title: 'Le canal',
  blurb:
    'Une péniche fait trois milles à l’heure, et tout le monde sur le canal sait faire ce calcul. Personne n’a pensé à demander s’il avait pris le bateau.',

  characters: {
    you: 'Toi',
    verity: 'Julie',
    nate: 'Nate',
    bo: 'Sam',
    gwyn: 'Alan',
    tam: 'Tam',
  },

  places: {
    cut: 'le canal',
    norbury: 'Norbury',
    norburywharf: 'le quai de Norbury',
    veritysboat: 'le bateau de Julie',
    pub: 'le Junction',
    tyrley: 'Tyrley',
    tyrleylocks: 'les écluses de Tyrley',
    towpath: 'le chemin de halage',
    hospital: 'l’hôpital Royal Shrewsbury',
  },

  threads: {
    't-verity': 'Julie',
    't-cut': 'Amarrages de Norbury',
    't-tam': 'Tam',
    't-bo': 'Sam',
    't-gwyn': 'Alan Pryce',
  },

  briefing: {
    causeOfDeath:
      'Noyade. Elle est tombée de son propre pont arrière et le canal fait quatre pieds de profondeur à cet endroit.',
    ruling:
      'Enregistré comme accidentel. Elle avait soixante-quatre ans, il faisait nuit, et il y avait eu une bouteille de vin sur la table.',
    opening:
      'Julie Cusk vivait à bord depuis dix-neuf ans et connaissait tous ceux qui vivent à bord entre Autherley et Nantwich par leur bateau avant leur nom.\n\nOn l’a retrouvée dans l’eau le long de sa propre poupe un vendredi soir d’octobre, avec le poêle encore allumé et deux verres sur la table.\n\nTu as rendu ton bateau et tu vis à terre depuis quatre ans, et elle t’écrivait quand même toutes les semaines à ce sujet.',
  },

  messages: {
    // --------------------------------------------------------------- t-verity
    v1: 'Il s’est passé quelque chose et je suis restée dessus quatre jours parce que je ne savais pas à qui le dire en premier.',
    v2: 'Effie Ogilvy m’a écrit. La fille de Nate. Elle a vingt-quatre ans et elle est infirmière en pédiatrie à Chester et elle m’a trouvée par le groupe Facebook.',
    v3: 'oh',
    v4: 'Elle m’a remerciée. Quatre pages. Elle a dit que le jour où j’ai appelé les services sociaux est le jour où sa vie a commencé et qu’elle essaie de le dire depuis ses dix-huit ans.',
    v5: 'tu as pleuré hein',
    v6: 'Je me suis assise sur le plat-bord sous la pluie comme une idiote. Quinze ans à être la femme qui a fait ça à Nate Ogilvy et il se trouve que j’étais la femme qui a fait ça pour Effie Ogilvy, et les deux ont été vraies tout du long.',
    v7: 'Elle vient samedi. À Norbury, aux amarrages, devant tout le monde. Elle veut le dire là où les gens qui ont regardé ça arriver peuvent l’entendre le dire.',
    v8: 'est-ce que nate est au courant',
    v9: 'Je le lui ai dit moi-même mardi. Je ne vais pas le laisser l’apprendre par Sam au point d’eau. Je lui devais ça et je ne lui ai jamais rien dû d’autre.',
    v10: 'Il a été très silencieux. Il a dit d’accord. Deux fois. Et ensuite il m’a demandé à quelle heure samedi.',
    v11: 'Poêle allumé, bouteille ouverte, et je ne bouge pas de ce bateau avant samedi. Monte si tu te sens de faire la route.',

    // ------------------------------------------------------------------ t-cut
    k1: 'Pour ceux qui ne l’ont pas appris de quelqu’un. Julie est tombée de sa propre poupe vendredi soir et Sam l’a trouvée à onze heures. La police est venue samedi matin et ils appellent ça un accident.',
    k2: 'dix-neuf ans sur ce canal. elle a sorti mon bateau de la vase au pont 39 dans le noir en février et n’a pas voulu qu’on lui paie un verre',
    k3: 'J’étais à Tyrley toute la semaine et j’étais à Tyrley tout le vendredi soir. Six milles et cinq écluses plus loin. Quarante bateaux ont vu le mien posé sur les amarrages visiteurs au-dessus de l’écluse du haut depuis mercredi.',
    k4: 'Jamais bougée. Pas d’un pouce, du mercredi au dimanche. N’importe qui qui connaît ce canal sait faire le calcul',
    k5: 'Personne ne t’a rien demandé, Nate.',
    k6: 'Ils le feront. Quinze ans que ce canal décide de ce que je suis. Je prends les devants',
    k7: 'Et Tam était à Norbury vendredi et s’est disputé avec elle en juin à propos de la règle des quatorze jours, ce que la moitié des amarrages a entendu',
    k8: 'j’étais aux urgences à shrewsbury avec ma mère de huit heures à deux heures du matin et j’ai le bulletin de sortie et je ne le mets pas dans un groupe',
    k9: 'Parlez à Sam. Sam était sur le chemin de halage toute cette soirée à promener le chien et Sam ne rate rien, ce que les autres savent parce que c’est pour ça que vous ne vous amarrez pas à côté de Sam.',

    // ------------------------------------------------------------------ t-tam
    m1: 'Je me suis disputé avec elle en juin et j’y pense tous les jours depuis vendredi. C’était à propos de la règle des quatorze jours et ça a duré quatre minutes et elle avait raison.',
    m2: 'Ma mère est tombée le vendredi à l’heure du thé. Ambulance à sept heures et demie, urgences à huit heures, sortie à deux heures vingt. J’ai passé six heures sur une chaise en plastique avec mon téléphone à quatre pour cent.',
    m3: 'nate t’a mis à norbury',
    m4: 'Oui. Devant tout le canal, quarante minutes après qu’Alan lui a dit que personne ne lui avait rien demandé.',
    m5: 'Et je vais dire la chose que je n’arrête pas de ne pas dire. Tout le monde sait que Nate la détestait. C’est le fait le plus connu de ce canal. Alors quand c’est arrivé, tout le monde y a pensé et ensuite tout le monde a fait le calcul et l’a rangé.',
    m6: 'Six milles. Cinq écluses. Trois heures à monter et trois à redescendre et quarante bateaux qui regardent son toit tout du long. Il n’y a aucune version de ça. Je l’ai fait dans ma tête vingt fois.',
    m7: 'Va voir Sam. Sam marche sur ce chemin de halage à la même heure tous les soirs et le fait depuis trois ans, et Sam remarque ce qui a bougé.',

    // ------------------------------------------------------------------- t-bo
    b1: 'C’est moi qui l’ai trouvée. Je vais le dire une fois et ensuite je préfère répondre à des questions que raconter.',
    b2: 'Je promène Moss de huit heures à neuf heures quarante environ tous les soirs. De Norbury jusqu’au pont 39 et retour. Trois ans, le même trajet, parce qu’il a treize ans et qu’il a son itinéraire.',
    b3: 'tu as vu quelqu’un',
    b4: 'Nate Ogilvy. Huit heures et demie, sur le chemin de l’autre rive après le quai, en veste orange. J’ai dit salut Nate et il n’a pas répondu et je n’y ai pas pensé parce qu’il ne répond jamais.',
    b5: 'son bateau était à tyrley',
    b6: 'Il y était. Je l’ai dit à trois personnes maintenant et chacune d’elles m’a expliqué les écluses comme si je ne vivais pas sur cette eau depuis six ans.',
    b7: 'Il était à vélo. Le Dawes au guidon course qui est sanglé sur son toit depuis que je suis arrivé. Ce n’est pas une chose que je devine, je me suis écarté du chemin pour le laisser passer.',
    b8: 'Six milles de chemin de halage plat, c’est quarante minutes à vélo. Tout le monde répétait le bateau, le bateau, le bateau, et le bateau n’est allé nulle part et la question non plus.',
    b9: 'Demande à Alan pour la clé. La station sanitaire prend une clé CRT et les plus récentes enregistrent. Alan est sur le dos du Trust pour ces données depuis un an à cause du vandalisme.',

    // ----------------------------------------------------------------- t-gwyn
    g1: 'Onze ans à faire les écluses de Tyrley et je n’ai jamais eu envie de la paperasse avant cette semaine.',
    g2: 'Son bateau n’a pas bougé. C’est vrai et je le dirai devant un tribunal. J’ai fait passer quarante et un bateaux à l’écluse cette semaine-là et le sien n’en était pas, et j’aurais reconnu son toit à un demi-mille.',
    g3: 'Et c’est exactement ce qui cloche dans toute cette histoire. Chacun d’entre nous a répondu à une question sur le bateau. Personne n’a posé de question sur l’homme.',
    g4: 'le relevé de la clé',
    g5: 'La station de vidange et le point d’eau du quai de Norbury sont passés aux serrures à enregistrement au printemps, parce qu’on avait eu un an de quelqu’un qui laissait les robinets ouverts. Je demande ces données au Trust depuis mars à cause des robinets.',
    g6: 'Ils les ont envoyées mardi. La clé de Nate Ogilvy a ouvert le portail du quai à 20:44 le vendredi. Sa clé. Enregistrée à sa licence, sur un bateau qui était à six milles de là et qui n’avait pas bougé depuis mercredi.',
    g7: 'Julie était dans le Junction de six heures à sept heures avec Sam et moi et elle a bu un verre et elle était plus heureuse que je ne l’avais vue depuis quinze ans.',
    g8: 'Elle a raconté toute l’histoire de la lettre à la petite salle. Elle en a lu des passages. Effie venait samedi à deux heures et Julie avait acheté un gâteau à la ferme et l’avait laissé sur le côté.',
    g9: 'Le gâteau était encore là quand ils l’ont sortie de l’eau. Je n’arrive pas à passer là-dessus et j’ai soixante-trois ans et j’ai passé pire.',
  },

  claims: {
    'c-verity-boat': 'Julie : sur son bateau, 20:00–21:30',
    'c-nate-tyrley': 'Nate : à Tyrley, 19:00–22:00',
    'c-nate-moored': 'Nate : amarré à Tyrley toute la soirée',
    'c-tam-norbury': 'Tam : à Norbury, 20:30–21:00 (selon Nate)',
    'c-tam-hospital': 'Tam : à l’hôpital Royal Shrewsbury, 20:00–22:00',
    'c-bo-towpath': 'Sam : sur le chemin de halage, 20:00–21:40',
    'c-nate-norbury': 'Nate : à Norbury, 20:30–20:50 (selon Sam)',
    'c-nate-bike': 'Nate : sur le chemin de halage à vélo, 20:20–21:00 (selon Sam)',
    'c-gwyn-locks': 'Alan : aux écluses de Tyrley, 19:00–20:30',
    'c-nate-wharf': 'Nate : au quai de Norbury, 20:44–20:50 (relevé de clé)',
    'c-verity-pub': 'Julie : dans le Junction, 18:00–19:00 (selon Alan)',
  },

  motives: {
    'm-effie':
      'Julie l’a signalé aux services sociaux en 2009 et sa fille est partie chez sa tante. Effie a vingt-quatre ans maintenant, elle est infirmière à Chester, et elle venait à Norbury le samedi pour remercier Julie à voix haute devant les amarrages qui avaient regardé ça arriver.',
  },

  contradictions: {
    'x-nate-norbury':
      'Il s’est placé à six milles et cinq écluses de là toute la soirée, et quarante bateaux confirmeront où était son toit. À huit heures et demie Sam Ferreira lui a dit salut Nate sur le chemin de l’autre rive à Norbury, en veste orange, et n’a pas eu de réponse, et n’y a pas pensé parce qu’il ne répond jamais.',
    'x-nate-bike':
      'Six milles de chemin de halage plat, c’est quarante minutes à vélo. Tout le monde sur ce canal a répondu à une question sur le bateau, et le bateau n’est pas ce qui est descendu par le chemin de halage. Le Dawes au guidon course est sanglé sur son toit depuis 2011.',
    'x-nate-wharf':
      'Le portail du quai de Norbury est passé à une serrure à enregistrement au printemps, parce que quelqu’un avait passé un an à laisser les robinets ouverts. Sa clé l’a ouvert à 20:44, enregistrée à sa licence, sur un bateau qui n’avait pas bougé depuis mercredi.',
    'x-tam-hospital':
      'Il a mis Tam Oyelaran à Norbury quarante minutes après qu’on lui a dit que personne ne lui avait rien demandé. Tam était sur une chaise en plastique à l’hôpital Royal Shrewsbury de huit heures à deux heures vingt avec sa mère et un téléphone à quatre pour cent.',
  },

  confrontation: {
    opening:
      'Quinze ans que ce canal me regarde comme ça et je me suis amarré où on me disait et j’ai payé ma licence et je n’ai rien dit. Vas-y. Dis-le correctement.',
    beats: {
      'c-norbury': {
        press:
          'Tu étais à Tyrley toute la nuit. Sam t’a dit salut Nate sur le chemin de l’autre rive à Norbury à huit heures et demie et tu n’as pas répondu.',
        rebuttal:
          'Sam est ici depuis six ans et croit que ça fait de lui quelqu’un d’ici. Il faisait noir et il y a une seule veste orange sur ce canal, c’est ça.',
      },
      'c-bike': {
        press:
          'Ton bateau n’a jamais bougé et c’est vrai. Tu es descendu par six milles de chemin de halage plat sur le Dawes de ton toit. Quarante minutes.',
        rebuttal:
          'Alors maintenant je suis à vélo. Dans le noir. Six milles. Tu as décidé de la réponse et tu remontes à l’envers depuis.',
      },
      'c-wharf': {
        press:
          'Le portail du quai enregistre maintenant. Depuis le printemps, à cause des robinets. Ta clé l’a ouvert à 20:44, et ton bateau était à six milles en amont du canal.',
      },
      'c-why': {
        press:
          'Effie venait le samedi à deux heures. Pour dire merci à Julie, à voix haute, sur ces amarrages, devant tous ceux qui ont regardé ça arriver.',
      },
    },
    deflections: [
      'C’est ce canal qui parle. Il parle de moi depuis 2009.',
      'Tu as rendu ton bateau. Tu n’as pas le droit de revenir me dire ce qui s’est passé dessus.',
      'Apporte-moi une chose avec mon nom dessus.',
    ],
    confession:
      'J’aurais pu supporter quinze ans qu’ils me prennent pour un mauvais père. J’étais devenu bon à ça. Tu te lèves et tu fais tes écluses et tu salues des gens qui ne te saluent pas et au bout d’un moment c’est juste la météo.\n\nCe que je ne pouvais pas supporter, c’était samedi.\n\nMa fille, vingt-quatre ans, infirmière, debout sur ces amarrages devant Alan et Sam et tous les autres, en train de dire à voix haute que la meilleure chose qui lui soit arrivée a été qu’on la retire de chez moi. Et chacun d’eux qui hoche la tête. Et moi sur un bateau à six milles en amont avec mes rideaux fermés, et tout le monde qui sait exactement où je suis et pourquoi.\n\nElle était sur le pont arrière quand je suis arrivé par derrière. Elle était contente de me voir. C’est ça le pire. Elle a dit Nate, entre, et elle avait sorti deux verres parce qu’elle attendait quelqu’un depuis le début de la soirée et ce n’était pas moi.\n\nEt il y a encore une chose.\n\nUn homme qui se faisait appeler le Keeper m’a téléphoné le mercredi. Il a dit qu’il était du service du tribunal des affaires familiales et qu’il faisait une révision de dossiers. Il savait pour 2009. Il savait qu’Effie était infirmière à Chester et il savait pour le samedi, ce que je n’avais dit à personne, parce qu’à qui est-ce que je l’aurais dit.\n\nIl m’a demandé ce que ça me faisait et j’ai parlé longtemps et lui n’a pas dit grand-chose.\n\nEt le dimanche il a rappelé. Juste pour demander comment ça s’était passé.\n\nC’est ce qu’il a dit. Comment ça s’est passé, Nate. Comme un homme qui prend des nouvelles après un entretien.',
  },

  coda: {
    from: 'Numéro inconnu',
    messages: [
      'Norbury. Tu as fait ça en cinq jours et l’un d’eux a été dépensé sur le mauvais homme, ce que j’appellerais honnête.',
      'Le vélo était bien vu. Tout le monde sur ce canal pense en milles et en écluses et ça ne les a jamais trompés jusqu’ici, alors il n’est venu à l’idée d’aucun d’eux de s’arrêter.',
      'Tu en as quatre maintenant, si tu comptes. Moi je compte.',
      'Et oui. Je l’ai bien rappelé après. Je le fais toujours. Tu devrais te demander pourquoi ça vaut le risque pour moi, parce que c’est la seule chose imprudente que je fais.',
    ],
  },

  epilogue:
    'Le Canal and River Trust a fourni onze mois de données de clés dans un seul tableur et s’est excusé du retard.\n\nEffie Ogilvy est venue à Norbury le samedi parce que personne n’avait son numéro pour l’arrêter. Alan Pryce l’a accueillie en haut du chemin et le lui a dit sur le parking, et ensuite il est resté avec elle dans le Junction pendant quatre heures.\n\nElle a lu la lettre à l’enterrement. Les quatre pages. Elle a dit après qu’elle l’avait écrite pour être lue à Julie et qu’elle ne voyait aucune raison d’en changer un mot maintenant.\n\nSam Ferreira promène toujours Moss de huit heures à dix heures moins vingt. Le trajet passe devant l’ancien amarrage de Julie, et Sam ne l’a pas changé, parce que Moss a treize ans et qu’il a son itinéraire.',
};
