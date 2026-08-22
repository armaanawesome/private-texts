import type { CaseTranslation } from '../caseText';

/**
 * Case 11 — "Les jardins familiaux". French.
 *
 * Digits stay digits. Plot numbers are how this site names its geography — `la
 * 14`, `la parcelle 3`, `la 40`, `la parcelle 22` — and the English writes them
 * as numerals every time, including inside sentences where French would happily
 * spell them out. It does not. `Year 4` written as `quatrième` is the mistake
 * this rule exists for, and a plot number is the same kind of fact.
 *
 * Where the English spells a time out, so does this. The scrapyard camera says
 * `19:02` and `19:11` in j3 and in the revelation because it is a machine; the
 * same two minutes are `sept heures deux` and `sept heures onze` in the
 * confrontation press because a person is saying them out loud. Both forms
 * survive, in the places the English put them, and j3 is the only message in the
 * pack with a digit clock.
 *
 * Places, and the contraction trap. `le chemin de Carr Bank` is the exposed one
 * and it is exactly where Spanish lost it — `al camino` swallows the article and
 * the chip stops matching any sentence. So j3 opens `Elle regarde droit dans le
 * chemin de Carr Bank`, article intact. Same care for `la parcelle 14` and `la
 * parcelle 3`, which appear in lower case in the epilogue and in v5 rather than
 * only capitalised at the head of a sentence.
 *
 *   you   → Toi     site     → les jardins familiaux de Carr Bank
 *
 * `site` needed its preposition chosen for it. The briefing wanted `secrétaire
 * des jardins familiaux de Carr Bank`, and `des` is de + les — the contraction
 * swallows the article, so the full place name is spoken nowhere and the chip
 * and the sentence read as two different places. `tenait le secrétariat pour
 * les jardins familiaux` keeps the article and keeps Wilf as the subject, which
 * the English `had been secretary of Carr Bank allotments` does too.
 *
 * Third pack in a row with this: `au bar du club`, `al camino`, now `des
 * jardins`. Any place name beginning with an article is exposed.
 *   wilf  → Wilf    plot14   → la parcelle 14
 *   deb   → Deb     plot3    → la parcelle 3
 *   nev   → Nev     shedrow  → la rangée de cabanes
 *   joyce → Joyce   tank     → la citerne
 *   sami  → Sami    lane     → le chemin de Carr Bank
 *                   fork     → la fourche au manche entouré de ruban
 *
 * Allotment vocabulary is the real French: `les jardins familiaux` is what the
 * councils call them, `la parcelle` for a plot, `le chiendent` for couch grass,
 * `les branchages` for prunings, `les dépôts sauvages` for fly tipping, `la
 * casse` for the scrapyard, `l’assemblée générale` for the AGM, `le bail` for
 * the tenancy. Imperial stays imperial: the fork is recognisable `à quarante
 * pieds`, because converting would change a stated fact.
 *
 * Voice. Nev and the player are the two who run lowercase and never land a full
 * stop — Nev has been feuding for fifteen years and types the way he talks. Wilf,
 * Joyce, Sami and Deb all capitalise and finish, and Deb finishing hers is part
 * of the performance: she is the only one of the four with something to sell.
 *
 * No arc content: pack 11 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated — the confrontation opens `C’était ton
 * père`, from the dead man's side, and deflection 1 is `Tu n’as pas remis les
 * pieds ici` rather than `tu n’es pas monté·e`.
 */
export const theAllotmentsFr: CaseTranslation = {
  title: 'Les jardins familiaux',
  blurb:
    'Tout le monde sur ce site sait à qui est cette fourche. Personne n’a demandé dans quelle cabane elle était depuis dix jours.',

  characters: {
    you: 'Toi',
    wilf: 'Wilf',
    deb: 'Deb',
    nev: 'Nev',
    joyce: 'Joyce',
    sami: 'Sami',
  },

  places: {
    site: 'les jardins familiaux de Carr Bank',
    plot14: 'la parcelle 14',
    plot3: 'la parcelle 3',
    shedrow: 'la rangée de cabanes',
    tank: 'la citerne',
    lane: 'le chemin de Carr Bank',
  },

  objects: {
    fork: 'la fourche au manche entouré de ruban',
  },

  threads: {
    't-wilf': 'Papa',
    't-society': 'Usagers de Carr Bank',
    't-nev': 'Nev',
    't-sami': 'Sami',
    't-joyce': 'Joyce Ubani',
  },

  briefing: {
    causeOfDeath: 'Un seul coup. La fourche était encore dans l’allée à côté de lui.',
    ruling:
      'Non élucidé. Il y a sur ce site un conflit vieux de quinze ans à propos d’une haie, et la fourche appartient à l’homme qui est à l’autre bout.',
    opening:
      'Wilf Sankey tenait le secrétariat pour les jardins familiaux de Carr Bank depuis trente et un ans et avait écrit le compte rendu de chaque assemblée générale dans le même cahier cartonné.\n\nOn l’a retrouvé dans la rangée de cabanes à sept heures et demie un soir d’octobre, la saison des feux ouverte depuis deux jours et la fourche de quelqu’un à côté de lui.\n\nC’était ton père. Il t’appelait tous les dimanches et te parlait de la pression de l’eau.',
  },

  messages: {
    // ----------------------------------------------------------------- t-wilf
    w1: 'La mairie a encore écrit au sujet des parcelles non cultivées. Quatre sur notre site et ils veulent une décision avant la fin du mois.',
    w2: 'est-ce que deb en fait partie',
    w3: 'Oui. Les deux tiers sont du chiendent et elle n’a pas donné un coup de bêche depuis la mort de Ray, et ça fera trois ans en mai.',
    w4: 'donc tu dois la lui retirer',
    w5: 'Je dois faire ce que dit le bail ou je dois écrire pour leur demander de ne pas m’y obliger. Je suis devant une feuille blanche depuis mardi.',
    w6: 'Cette cabane, c’est la cabane de Ray. Il l’a construite en 1998 avec une livraison de palettes et la moitié n’est pas droite. Elle s’y assoit le samedi avec un thermos.',
    w7: 'papa',
    w8: 'Je l’ai fait. Deux pages, recommandant une dérogation pour raisons humanitaires, et j’ai écrit dedans qu’une parcelle n’est pas seulement une parcelle, ce qu’ils vont détester.',
    w9: 'Je vais le lui dire ce soir avant de la poster. Elle a eu trois ans de gens qui parlent de sa parcelle devant elle et je préfère qu’elle l’entende debout.',
    w10: 'Je suis là-haut à faire les cadenas avant que la lumière tombe. Appelle-moi demain et je te dirai comment ça s’est passé.',

    // -------------------------------------------------------------- t-society
    s1: 'Aux usagers. Wilf a été retrouvé dans la rangée de cabanes mardi soir et il est mort. La police a mis le haut du site sous scellés et le site est fermé jusqu’à nouvel ordre. Je suis secrétaire par intérim à partir de ce message et je suis désolée de le faire comme ça.',
    s2: 'trente et un ans qu’il a fait les comptes rendus et l’eau et la benne et la commande de graines et pas un de nous ne le lui a jamais demandé. je me suis disputé avec lui pendant quinze de ces années à propos d’une haie et je donnerais beaucoup pour me disputer avec lui maintenant',
    s3: 'J’étais sur la 14 toute la soirée. La saison des feux a commencé dimanche et j’avais quinze jours de branchages et j’étais tout au fond avec de six heures à sept heures et demie.',
    s4: 'À brûler tout le temps. N’importe qui sous le vent mardi vous le dira.',
    s5: 'Et c’est la fourche de Nev. Tout le monde sur ce site sait que c’est la fourche de Nev, elle a ce ruban dessus depuis le Jubilé.',
    s6: 'deb',
    s7: 'Ça suffit. Ce que chacun a à dire, qu’il le dise à un policier et pas à soixante et une personnes qui partagent une citerne.',

    // ------------------------------------------------------------------ t-nev
    v1: 'ton père et moi on s’est fâchés en 2010 à propos d’une haie et on n’a jamais cessé de se parler. c’est ça un site et personne d’extérieur ne l’a jamais compris',
    v2: 'c’est ta fourche',
    v3: 'oui. du ruban sur le manche, mes initiales brûlées dans le fer, et je n’y ai pas touché depuis la semaine d’avant parce que ton père me l’a empruntée',
    v4: 'il est venu la chercher le vendredi pour les framboisiers du haut et je lui ai dit garde-la le temps qu’il faut et elle est restée debout dans sa cabane depuis. joyce l’a vu la monter',
    v5: 'j’étais sur la parcelle 3 à partir de six heures avec une lampe à finir les haricots. sami était deux parcelles plus bas tout le temps et on s’est gueulé dessus à propos du foot',
    v6: 'et je le dirai une fois. deb threlfall a mis mon nom dans un groupe de soixante et une personnes avant que ton père soit en terre. je la connais depuis vingt ans et je ne savais pas qu’elle avait ça en elle',
    v7: 'parle à sami. il est plus nouveau et il ne doit rien à personne sur ce site, ce qui à Carr Bank fait de lui le seul témoin fiable sur cent quarante parcelles',

    // ----------------------------------------------------------------- t-sami
    m1: 'J’ai la parcelle 22 depuis quatorze mois. Ton père m’a donné un sac d’oignons à planter mon premier samedi et m’a dit de ne pas m’embêter avec le maïs doux et il avait raison.',
    m2: 'J’étais beaucoup à la citerne mardi. Les récupérateurs de la 22 sont vides tant que le toit n’est pas posé, alors je remplis des arrosoirs, et ça fait quatre allers-retours.',
    m3: 'est-ce que deb brûlait',
    m4: 'Non. Et j’y ai repensé parce que je ne voulais pas être celui qui le dit. Son tas était là et il n’était pas allumé. Je suis passé au bout de la 14 quatre fois et il n’y avait pas de fumée sur ce site de toute la soirée à part Ted Harrap sur la 40.',
    m5: 'Elle était à la citerne avec moi deux fois. On a parlé du toit. Elle était tout à fait normale et elle a demandé des nouvelles de ma mère.',
    m6: 'tu l’as vue vers les cabanes',
    m7: 'Six heures et demie, à peu près. Elle est montée dans la rangée de cabanes avec un arrosoir vide dans chaque main, ce que j’ai remarqué parce qu’on ne monte pas des arrosoirs vides là-haut, la citerne est de l’autre côté.',
    m8: 'Demande à Joyce pour le chemin. Il y a une caméra sur le portail de la casse qui regarde droit dedans et elle essaie depuis deux ans de leur faire donner les images pour les dépôts sauvages.',

    // ---------------------------------------------------------------- t-joyce
    j1: 'Je suis trésorière depuis dix-neuf ans et je garde tout, ce que les gens trouvent drôle jusqu’à la semaine où ils ne le trouvent plus.',
    j2: 'La casse m’a donné onze jours d’images jeudi, après m’avoir refusé pendant deux ans pour les dépôts sauvages. Il a fallu qu’un policier demande à ma place.',
    j3: 'Elle regarde droit dans le chemin de Carr Bank. Deborah Threlfall le monte à 19:02 et le redescend à 19:11, et il n’y a aucun feu visible sur ce site à aucun moment en onze jours d’images à part celui de Ted.',
    j4: 'la fourche',
    j5: 'Wilf a monté cette fourche jusqu’à sa propre cabane le vendredi de la semaine d’avant et je l’ai vu le faire, parce qu’il s’est arrêté et s’est plaint de son épaule tout le long. Elle est restée debout derrière sa porte à partir de là et jusqu’au mardi.',
    j6: 'Donc celui qui l’a ramassée l’a ramassée dans cette rangée de cabanes, debout là où il était debout. Oubliez Nev. Ça dit qui était assez près pour l’atteindre.',
    j7: 'Et Wilf a monté et descendu cette rangée à partir de cinq heures avec les cadenas. Il les fait tous les mois d’octobre et ça lui prend une heure et demie parce qu’il parle à tout le monde.',
    j8: 'La lettre de la mairie sur les quatre parcelles m’est arrivée aussi. Deborah est dessus depuis le onze et elle m’a appelée deux fois pour savoir si un recours coûte quelque chose.',
    j9: 'Je lui ai dit que c’est Wilf qui décide. Ce sont mes mots. Je l’ai dit pour être gentille, parce que Wilf l’aimait bien, et j’ai pensé à la forme de cette phrase toutes les nuits depuis.',
  },

  claims: {
    'c-wilf-tank': 'Wilf : à la citerne, 17:00–17:25',
    'c-deb-plot': 'Deb : sur la parcelle 14, 18:00–19:30',
    'c-deb-burning': 'Deb : en train de brûler des branchages, 18:00–19:30',
    'c-fork-nev': 'Nev : avait la fourche au manche entouré de ruban, 18:00–19:30 (selon Deb)',
    'c-nev-plot3': 'Nev : sur la parcelle 3, 18:00–20:00 (selon Sami)',
    'c-sami-tank': 'Sami : à la citerne, 18:20–19:20',
    'c-deb-tank':
      'Deb : en train de remplir des arrosoirs à la citerne, 18:20–19:20 (selon Sami)',
    'c-deb-shedrow': 'Deb : dans la rangée de cabanes, 18:30–18:50 (selon Sami)',
    'c-deb-lane': 'Deb : dans le chemin de Carr Bank, 19:00–19:10 (caméra de la casse)',
    'c-fork-wilf': 'Wilf : avait la fourche au manche entouré de ruban, 18:00–19:30 (selon Joyce)',
    'c-wilf-shed': 'Wilf : dans la rangée de cabanes, 17:30–19:30 (selon Joyce)',
  },

  motives: {
    'm-plot':
      'La mairie voulait une décision sur quatre parcelles non cultivées avant la fin du mois et la sienne en faisait partie. La parcelle 14 était la parcelle de Ray et la cabane est celle qu’il a construite en 1998, et elle s’y assoit le samedi depuis les trois ans qu’il est mort.',
  },

  contradictions: {
    'x-deb-shedrow':
      'Elle s’est placée tout au fond de la 14 de six heures à sept heures et demie. Vers six heures et demie, Sami Rahimi l’a vue monter dans la rangée de cabanes avec un arrosoir vide dans chaque main, ce qu’il a remarqué parce qu’on ne monte pas des arrosoirs vides là-haut. La citerne est de l’autre côté.',
    'x-deb-burning':
      'Elle a dit qu’elle brûlait tout le temps et que n’importe qui sous le vent le confirmerait. Son tas n’a jamais été allumé. Sami est passé au bout de la 14 quatre fois et la seule fumée de Carr Bank ce soir-là était celle de Ted Harrap sur la 40, et elle était à la citerne à remplir des arrosoirs avec Sami deux fois, à parler de son toit, à demander des nouvelles de sa mère.',
    'x-deb-lane':
      'La caméra de la casse regarde droit dans le chemin de Carr Bank et Joyce Ubani demandait ces images depuis deux ans pour les dépôts sauvages. Il a fallu qu’un policier demande à sa place. Deborah Threlfall monte le chemin à 19:02 et le redescend à 19:11, et en onze jours d’images il n’y a aucun feu sur ce site à part celui de Ted.',
    'x-fork':
      'Tout le monde sur ce site peut reconnaître cette fourche à quarante pieds, ce qui est exactement pourquoi personne n’a demandé où elle était. Wilf l’a empruntée le vendredi de la semaine d’avant pour les framboisiers et l’a montée lui-même jusqu’à sa propre cabane, en se plaignant de son épaule tout le long, et Joyce l’a vu le faire. Elle est restée debout derrière sa porte depuis. Ce n’est pas une preuve sur Nev Ashworth. C’est une preuve sur le fait d’être debout là où il était debout.',
  },

  confrontation: {
    opening:
      'C’était ton père et tu montes ici pour faire ça sur son site. Je veux que tu saches que je pense qu’il aurait détesté ça.',
    beats: {
      'a-shedrow': {
        press:
          'Tu étais sur la 14 de six heures à sept heures et demie. À six heures et demie Sami t’a vue monter dans la rangée de cabanes avec un arrosoir vide dans chaque main.',
        rebuttal:
          'Un gamin qui est sur ce site depuis quatorze mois, en octobre, au crépuscule, en train de faire des allers-retours avec des arrosoirs. Il ne sait pas ce qu’il a vu.',
      },
      'a-burning': {
        press:
          'Tu as dit que tu brûlais tout le temps. Ton tas n’a jamais été allumé. Il est passé au bout de la 14 quatre fois et tu étais à la citerne avec lui deux fois, à demander des nouvelles de sa mère.',
        rebuttal:
          'Ça ne prenait pas. Il avait plu le dimanche. Demande à n’importe qui a déjà essayé de brûler quinze jours de branchages mouillés.',
      },
      'a-lane': {
        press:
          'La caméra de la casse regarde droit dans le chemin. Tu le montes à sept heures deux et tu le redescends à sept heures onze, et il n’y a aucun feu sur ce site en onze jours d’images.',
      },
      'a-why': {
        press:
          'La mairie voulait quatre parcelles décidées avant la fin du mois et la tienne en faisait partie. Joyce t’a dit que c’est Wilf qui décide.',
      },
    },
    deflections: [
      'C’est cent quarante personnes qui parlent de ma parcelle devant moi depuis trois ans.',
      'Tu n’as pas remis les pieds ici depuis le repas d’enterrement. Tu ne connais pas ce site.',
      'Apporte-moi autre chose que quelqu’un avec un arrosoir.',
    ],
    confession:
      'Il a dit Deb, tu as une minute, et il a mis la main dans la poche de son manteau.\n\nJ’ai repensé à cette main mille fois.\n\nParce que Joyce me l’avait dit le dimanche. C’est Wilf qui décide, elle a dit, et elle l’a dit gentiment, et je suis rentrée et je n’ai pas dormi et le mardi j’avais construit tout le reste. La lettre dans sa poche. Lui qui le fait debout dans la rangée de cabanes pour que je ne puisse pas faire une scène au local. La cabane de Ray avec un autocollant de la mairie sur la porte avant Noël.\n\nEt la fourche était debout derrière sa porte et je n’ai même pas eu à la chercher.\n\nIl n’a jamais fini sa phrase. C’est la chose que je veux qu’on écrive quelque part. Je n’ai jamais entendu la fin.\n\nJ’ai eu huit semaines pour comprendre ce qu’il y avait dans cette poche et je le sais depuis la deuxième semaine à peu près, parce que c’est Wilf, et il n’y a jamais eu qu’une seule chose que ça pouvait être.',
  },

  epilogue:
    'La lettre était dans la poche intérieure de son manteau, pliée en trois, dans une enveloppe adressée au service des espaces verts et timbrée, prête à partir.\n\nDeux pages. Elle recommandait une dérogation pour raisons humanitaires en faveur de la titulaire de la parcelle 14 et exposait le dossier assez longuement, et le dernier paragraphe disait qu’une parcelle n’est pas seulement une parcelle et que le comité comprendrait ce qu’il voulait dire même si la mairie ne le comprenait pas.\n\nLa mairie l’a accordée en janvier, sur la foi d’une lettre d’un homme mort depuis octobre, et Joyce Ubani a lu la décision à l’assemblée générale et a ensuite dû s’arrêter et passer le cahier à quelqu’un d’autre.\n\nLa parcelle 14 a été reprise par la mère de Sami Rahimi au printemps. Elle a gardé la cabane. Le comité a voté à l’unanimité qu’elle reste, au motif qu’elle n’est pas droite et que Ray Threlfall l’a construite avec une livraison de palettes en 1998, ce qui est maintenant écrit dans le compte rendu.',
};
