import type { CaseTranslation } from '../caseText';

/**
 * Case 10 — "Scène ouverte". French.
 *
 * THE VOCATIVE. `h8` is Kevin answering Dave in `t-club`, which has four
 * participants, so `Fiston` lands on Dave and is exactly the put-down the
 * English `Son` is. The same word in `t-ferdy` would be a defect: that thread
 * has two participants, so any vocative there is aimed at the player and would
 * state a gender the game never states. Kevin therefore addresses the player
 * without one, all nine messages.
 *
 * Digits. Only Kit writes a clock — `21:30`, `21:55`, `21:28` — because Kit is
 * the one who wrote it down in biro on the back of a float sheet. Everybody else
 * speaks in words: `dix heures moins cinq`, `neuf heures et demie`, `dix heures
 * moins vingt-cinq`. That split is the case. The running order beats the video
 * because one of them is a record and the other is a man remembering, and if the
 * room starts talking in timestamps the float sheet stops being the hard thing.
 *
 * Two different clips. Dave's clip is real and Dave is really in it; it is from
 * the previous Tuesday. So `le clip` stays his throughout and the thing that
 * dates it is the callback — `le cygne`, one word everywhere, because Priya
 * dropped it and only the week before has one.
 *
 * Places, and the contraction trap. `le Hatch` and `le bar` are the exposed
 * ones: `au Hatch` and `au bar` would swallow the article and leave the name
 * unspoken. So h1 ends `Cette semaine, le Hatch est fermé`, the epilogue says
 * `dans le Hatch`, and Debbie stands `devant le bar` rather than `au bar` — on
 * the chip and in h4 both, which keeps chip and sentence matching.
 *
 *   you    → Toi      club      → le Hatch
 *   marnie → Debbie   stage     → la scène
 *   gil    → Dave     bar       → le bar
 *   roz    → Roz      greenroom → la loge
 *   ferdy  → Kevin    box       → la régie
 *   kit    → Kit      alley     → la ruelle
 *                     card      → la carte de la caméra
 *
 * Circuit vocabulary is the real French: `la scène ouverte`, `présenter` for
 * compering, `l’ordre de passage`, `la feuille de caisse`, `au casque` for in
 * the cans, `la porte coupe-feu`, `se planter` for dying on stage, `un
 * programmateur` for a promoter, `le rappel` for a callback.
 *
 * Voice. Debbie and the player run lowercase — with one exception the English
 * also makes, n2, which is a shout and stays capitals. Roz, Kevin and Kit
 * capitalise and finish every sentence. Dave capitalises like them and never
 * lands a final full stop, in all four of his messages, because he is always
 * mid-pitch: being useful, getting in front of it, trying.
 *
 * No arc content: pack 10 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated; deflection 1 is `Tu n’as jamais mis un
 * pied sur une scène` rather than `tu n’es jamais monté·e`.
 *
 * The old name is gone from both sides. n6 said `gils set` twice for a
 * character called Dave, and this file reproduced it rather than quietly
 * correcting it, on the rule that a translation which fixes a fact is a
 * translation nobody can diff. The English is fixed at source now and this
 * file with it. `renameLeak.test.ts` had missed it because `gil` needs a
 * boundary after the name and `gils` has none — these characters drop
 * apostrophes, so the possessive is bare. The rule is possessive-aware now.
 */
export const openMicFr: CaseTranslation = {
  title: 'Scène ouverte',
  blurb:
    'Son alibi est en vidéo. Même chemise, mêmes cinq minutes, même rire au même endroit. C’est celle du mardi d’avant.',

  characters: {
    you: 'Toi',
    marnie: 'Debbie',
    gil: 'Dave',
    roz: 'Roz',
    ferdy: 'Kevin',
    kit: 'Kit',
  },

  places: {
    club: 'le Hatch',
    stage: 'la scène',
    bar: 'le bar',
    greenroom: 'la loge',
    box: 'la régie',
    alley: 'la ruelle',
  },

  objects: {
    card: 'la carte de la caméra',
  },

  threads: {
    't-marnie': 'Debbie',
    't-club': 'Les mardis du Hatch',
    't-kit': 'Kit',
    't-ferdy': 'Kevin',
    't-roz': 'Roz Antrim',
  },

  briefing: {
    causeOfDeath:
      'Un traumatisme crânien contre la bordure. Elle est tombée une fois et ne s’est pas relevée.',
    ruling:
      'Enregistré comme une chute. Elle avait bu, la ruelle est en pente, et toute la salle était à l’intérieur à regarder un homme faire cinq minutes sur les trains.',
    opening:
      'Le Hatch organise une scène ouverte tous les mardis et la filme pour une chaîne que personne ne regarde, ce qui fait que onze artistes par semaine repartent avec quelque chose à envoyer à un programmateur.\n\nDebbie Vaux a été retrouvée dans la ruelle derrière à onze heures vingt. Elle avait fait sept minutes à dix heures moins cinq et elle était sortie prendre l’air.\n\nTu fais un podcast sur le circuit. Elle t’envoyait des notes vocales depuis mars.',
  },

  messages: {
    // --------------------------------------------------------------- t-marnie
    n1: 'la première partie de tournée est confirmée. huit semaines. je ne l’ai dit à personne et je vais vomir',
    n2: 'DEBBIE',
    n3: 'je sais. je sais. je dois le dire à dave ce soir et je repousse depuis neuf jours',
    n4: 'pourquoi c’est dur. c’est ton pote',
    n5: 'parce qu’on a commencé le même mois. octobre 2009, la même salle, la même liste des ouvertures. et moi je pars en tournée et lui il programme toujours le mardi',
    n6: 'et il fait les mêmes cinq minutes. vraiment les mêmes cinq. je pourrais faire le set de dave. tout le monde dans cette salle pourrait faire le set de dave',
    n7: 'ce n’est pas ta faute',
    n8: 'non mais c’est mon visage qu’il verra quand il y pensera. pendant des années. je fais ça depuis assez longtemps pour savoir exactement comment ça marche',
    n9: 'j’y suis. je passe à dix heures moins cinq. je vais le faire après, dans la ruelle, loin de la salle, comme une lâche',
    n10: 'ça s’est bien passé en fait. bon. je sors',

    // ----------------------------------------------------------------- t-club
    h1: 'Debbie est morte dans la ruelle mardi soir. La police est venue mercredi, a pris les dépositions de neuf d’entre nous, et ils appellent ça une chute. Cette semaine, le Hatch est fermé.',
    h2: 'Je présente cette salle depuis onze ans et je n’ai jamais eu à dire une chose pareille dedans. Je l’ai fait passer pour la première fois en 2010 et elle s’est plantée devant moi pendant quatre minutes et elle est revenue la semaine d’après, et c’est tout le métier.',
    h3: 'J’étais sur scène quand c’est arrivé. J’étais littéralement sur la scène. Ce qui est une horrible façon de le dire je sais mais c’est là que j’étais et quelqu’un va poser la question alors je préfère le dire maintenant',
    h4: 'Et c’est filmé, évidemment. Je l’ai monté et mis sur le disque. Vingt-deux minutes, sans coupure, moi à neuf heures et demie en train de faire le passage sur les trains avec Debbie debout devant le bar derrière moi',
    h5: 'Personne ne t’a demandé de clip, Dave.',
    h6: 'J’essaie d’être utile',
    h7: 'Et si on fait le tour de qui était où, Kevin est resté dehors derrière une bonne vingtaine de minutes au milieu de ce spectacle et je ne crois pas que quelqu’un l’ait dit',
    h8: 'Fiston, j’étais au micro.',
    h9: 'Bon, ça suffit. Le reste, vous me l’envoyez à moi et pas à vingt-huit personnes.',

    // ------------------------------------------------------------------ t-kit
    k1: 'Je fais le son et l’entrée. J’écris l’ordre de passage au dos de la feuille de caisse au stylo bille et je les ai toutes depuis que j’ai commencé parce que je ne jette jamais rien.',
    k2: 'Mardi. Kevin qui présente. Puis Priya, Dave, Debbie, entracte, quatre autres. Debbie passait à 21:30. Pas à 21:55, pas à dix heures moins cinq. 21:30, et elle est sortie de scène à moins dix.',
    k3: 'dave dit qu’elle était au bar à neuf heures et demie',
    k4: 'Elle était sur la scène à neuf heures et demie. J’avais son micro ouvert. Je sais où elle était parce que je l’ai écoutée respirer pendant vingt minutes.',
    k5: 'Et Dave passait avant elle. Il est sorti de scène à 21:28 et il n’est pas revenu avant l’entracte.',
    k6: 'tu es sûr de l’ordre',
    k7: 'C’est au stylo bille sur une feuille de caisse dans un tiroir de ce bâtiment. Je ne suis sûr de pas grand-chose mais je suis sûr de ça.',
    k8: 'Parle à Kevin. Il était au micro pendant toute la partie du milieu et il voit cette salle mieux que la caméra, parce que la caméra ne regarde que dans un sens.',

    // ---------------------------------------------------------------- t-ferdy
    f1: 'Il faudra me supporter pour les textos. J’ai un Nokia et je l’ai depuis le mariage de ma fille, et tout le monde trouve ça hilarant jusqu’au moment où il faut que quelqu’un ait encore un téléphone qui marche à deux heures du matin.',
    f2: 'Trente et un ans. Glasgow, Leeds, les deux salles de Birmingham, le mercredi de Bristol qui n’existe plus. J’ai présenté dans la plupart des villes que tu peux citer et j’ai été payé dans la plupart.',
    f3: 'dave a dit que tu étais dehors derrière',
    f4: 'Je tenais un micro devant quarante personnes pendant toute cette partie. Il existe un enregistrement de moi en train de le faire. C’est le même enregistrement que celui qu’il veut te faire regarder.',
    f5: 'Et je vais te dire ce que j’ai vu, moi, puisque j’étais tourné dans l’autre sens que cette caméra toute la soirée.',
    f6: 'Dave est sorti par la porte coupe-feu vers dix heures moins vingt-cinq et il n’était pas revenu à l’entracte. J’ai fait monter Debbie et je voyais que la porte est restée entrebâillée derrière elle pendant les sept minutes.',
    f7: 'J’ai regardé ce clip qu’il a mis sur le disque à peu près neuf fois. C’est un joli clip. Il est très bon dedans.',
    f8: 'Il fait les trains, puis celle sur sa mère, puis il fait un rappel sur le cygne. Il n’y a pas de cygne le mardi. Le cygne c’est Priya et Priya passait le mardi, mais le passage du cygne vient du mardi d’avant, parce qu’elle l’a coupé.',
    f9: 'Seize ans que je regarde cet homme faire les mêmes cinq minutes identiques dans la même chemise identique et je n’ai jamais pensé une seule fois que ça pouvait servir à quelqu’un.',

    // ------------------------------------------------------------------ t-roz
    r1: 'Je fais tourner cette salle depuis quatorze ans et je n’ai jamais donné de réponse droite à un policier sur quoi que ce soit, et cette semaine je leur en ai donné neuf.',
    r2: 'Une caméra, une carte, une soirée. C’est tout le système et c’est tout le système depuis 2016 parce que je refuse d’y mettre de l’argent.',
    r3: 'C’est Dave qui monte la chaîne. Il prend la carte à la fin, il la découpe pendant la semaine, il met les clips sur le disque. C’est l’arrangement et ça n’a jamais posé le moindre problème.',
    r4: 'Sauf que mardi je l’ai sortie à neuf heures et j’ai déchargé la première moitié sur mon portable dans la régie, parce que les gens de la tournée voulaient le set de Debbie pour le mercredi et je n’allais pas attendre après Dave.',
    r5: 'Je l’ai remise à neuf heures vingt. Donc quoi qu’il ait donné à qui que ce soit, et quoi qu’il y ait sur ce disque, il existe une copie de cette soirée sur mon portable qu’il n’a jamais vue.',
    r6: 'et debbie',
    r7: 'Elle m’a parlé de la tournée le lundi et m’a demandé de ne rien dire tant qu’elle ne l’avait pas dit à Dave. Elle s’inquiétait pour lui. Vraiment inquiète, comme on l’est pour quelqu’un qu’on aime bien.',
    r8: 'Ils ont commencé le même mois. Quinze ans. Elle avait une tournée et lui avait un mardi, et c’est elle qui culpabilisait, ce qui dit tout de ces deux-là.',
  },

  claims: {
    'c-marnie-stage': 'Debbie : sur la scène, 21:30–21:50 (ordre de passage)',
    'c-gil-stage': 'Dave : sur la scène, 21:30–21:50',
    'c-marnie-bar': 'Debbie : devant le bar, 21:30–21:50 (selon le clip de Dave)',
    'c-ferdy-alley': 'Kevin : dans la ruelle, 21:30–21:50 (selon Dave)',
    'c-ferdy-stage': 'Kevin : sur la scène à présenter, 21:25–21:55',
    'c-gil-alley': 'Dave : dans la ruelle, 21:35–21:45 (selon Kevin)',
    'c-card-gil': 'Dave : avait la carte de la caméra, 21:00–22:30',
    'c-card-roz': 'Roz : avait la carte de la caméra, 21:00–21:20',
    'c-roz-box': 'Roz : dans la régie, 21:00–21:20',
  },

  motives: {
    'm-tour':
      'Ils ont commencé le même mois en 2009. Elle avait huit semaines de première partie de tournée et repoussait depuis neuf jours le moment de le lui dire, et elle l’a emmené dans la ruelle pour le faire gentiment.',
  },

  contradictions: {
    'x-gil-alley':
      'Il s’est placé sur la scène, et l’a dit le premier, avant que qui que ce soit le lui demande. Kevin Boyce tenait le micro et l’a vu sortir par la porte coupe-feu à dix heures moins vingt-cinq, et voyait qu’elle est restée entrebâillée derrière Debbie pendant les sept minutes où elle était sur scène.',
    'x-marnie-bar':
      'Son clip montre Debbie debout devant le bar derrière lui. Elle était sur la scène à cette minute-là avec son micro ouvert, et Kit l’écoutait respirer. Le clip est vrai et Dave est vraiment dedans. Il vient du mardi d’avant, la seule semaine où Priya a fait le cygne.',
    'x-card':
      'Une caméra, une carte, une soirée, depuis 2016, parce que Roz refuse d’y mettre de l’argent. Elle l’a sortie à neuf heures pour envoyer le set de Debbie aux gens de la tournée et l’a gardée dans son portable jusqu’à neuf heures vingt. Il existe une copie de cette soirée qu’il n’a jamais vue.',
    'x-ferdy-stage':
      'Il a mis un présentateur de soixante et un ans dans la ruelle pendant une vingtaine de minutes, dans un groupe, huit minutes après qu’on lui a dit que personne ne lui avait rien demandé. Kevin était au micro devant quarante personnes, sur l’enregistrement même que Dave voulait faire regarder à tout le monde.',
  },

  confrontation: {
    opening:
      'Tu fais un podcast. C’est ça que tu fais. Tu parles à des gens qui sont meilleurs que moi de comment ils sont devenus meilleurs que moi. Vas-y, ça va être formidable.',
    beats: {
      'o-alley': {
        press:
          'Tu étais sur la scène, tu l’as dit avant que personne demande. Kevin tenait le micro et t’a vu sortir par la porte coupe-feu à dix heures moins vingt-cinq.',
        rebuttal:
          'Kevin a soixante et un ans et il fait ça depuis avant ma naissance et il a présenté onze artistes ce soir-là. Il serait incapable de te dire la couleur des murs.',
      },
      'o-bar': {
        press:
          'Ton clip montre Debbie devant le bar derrière toi. Elle était sur scène avec son micro ouvert et Kit l’avait au casque. Et tu fais un rappel sur le cygne de Priya, et Priya avait coupé le cygne.',
        rebuttal:
          'Alors j’ai mal retenu un ordre de passage. J’ai fait quatre cents salles comme celle-là. C’est toutes la même salle.',
      },
      'o-card': {
        press:
          'Une caméra, une carte. Roz l’a sortie à neuf heures pour envoyer le set de Debbie aux gens de la tournée, et elle est restée dans son portable jusqu’à neuf heures vingt. Il existe une copie de cette soirée que tu n’as jamais vue.',
      },
      'o-why': {
        press:
          'Elle avait huit semaines de première partie et elle était dessus depuis neuf jours parce qu’elle n’arrivait pas à trouver comment te le dire. Elle t’a emmené dans la ruelle pour le faire gentiment.',
      },
    },
    deflections: [
      'C’est une salle pleine de gens qui m’ont regardé me planter pendant seize ans. Évidemment qu’ils ont une version.',
      'Tu n’as jamais mis un pied sur une scène de ta vie.',
      'Apporte-moi autre chose que quelqu’un qui se souvient d’un mardi.',
    ],
    confession:
      'Elle l’a dit vraiment gentiment. C’est ça que je n’arrive à faire comprendre à personne. Elle avait trouvé comment le dire pour que ça ne me tombe pas dessus comme quoi que ce soit, et elle travaillait dessus depuis neuf jours, ce qui est plus long que ce qu’elle passait sur la plupart de ses textes.\n\nEt j’ai dit félicitations et je l’ai pensé pendant environ quatre secondes.\n\nEnsuite elle a dit la chose qu’elle croyait être la partie gentille. Elle a dit Dave, tu devrais venir en faire quelques-unes des petites, je te ferai passer.\n\nJe te ferai passer.\n\nOn a commencé le même mois. La même liste, dans la même salle, en octobre 2009, et elle allait me faire passer.\n\nJ’ai tendu la main. Ce n’est que ça. Il y a une bordure et ça descend et elle est tombée une fois.\n\nEt ensuite j’ai eu vingt minutes et une caméra que je monte toutes les semaines depuis six ans, et je me suis assis dans cette loge et je savais exactement quoi faire, parce que j’ai les mêmes cinq minutes sur onze mardis différents et elles sont identiques. Même chemise. Même ordre. Même rire au même endroit.\n\nSeize ans à ne jamais rien changer, et la seule fois où ça m’a servi à quelque chose, c’était pour faire ça.',
  },

  epilogue:
    'Le portable de Roz Antrim contenait la première moitié de la vraie soirée, sans coupure, dans un dossier appelé DEBBIE POUR LES GENS DE LA TOURNÉE. Vingt-deux minutes, un seul angle, et une porte coupe-feu entrebâillée au bord du cadre à partir de 21:35.\n\nLes feuilles de caisse de Kit Nwachukwu sont entrées comme pièces à conviction, quarante et une, au stylo bille, dans un tiroir.\n\nKevin Boyce a présenté le gala de soutien dans le Hatch en février et a fait dix-neuf minutes sans en parler une seule fois, et ensuite il a fait quatre autres galas dans quatre villes parce que les gens n’arrêtaient pas de le lui demander.\n\nLes huit semaines sont allées à quelqu’un d’autre. Le tourneur a envoyé un message à Roz en lui demandant de transmettre qu’ils avaient regardé le set onze fois avant de la programmer et qu’ils l’auraient programmée sur deux minutes.',
};
