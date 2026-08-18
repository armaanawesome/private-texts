import type { CaseTranslation } from '../caseText';

/**
 * Case 7 — "Le refuge". French.
 *
 * Five things this had to get right.
 *
 * 1. Order, not clock. A bothy has no clock, no signal and no introductions, and
 *    the case is built on that: nobody in the room knows what time anything
 *    happened, only what happened before what. So every time in the prose is
 *    spoken in words — `sept heures moins dix`, `dix heures moins vingt` — and no
 *    message anywhere carries a digit clock. The digits live on the chips, which
 *    are the board rather than the room. Anne says it outright in m2: `tu ne sais
 *    pas quelle heure il est, tu sais ce qui est déjà arrivé`.
 *
 * 2. The two book chips. `c-keir-book-late` reads `à 21:40` and
 *    `c-keir-book-early` reads `avant 20:00`, and both sit on the same 20:00–22:00
 *    window. That is correct rather than sloppy: the two claims are an exclusive
 *    group, the engine needs overlapping windows to see the collision at all, so
 *    the window is machinery and each label names what was *asserted*. That pair
 *    of numbers is the contradiction the player is meant to spot, and forcing
 *    both labels to name the window would make the pair invisible.
 *
 * 3. Two different books. The English says "the book" for both the bothy log and
 *    Struan's published one, and French would blur them badly, so the log is `le
 *    registre` throughout and the published one is `le livre`. That keeps
 *    `x-keir-book` about the thing it is actually about, and it keeps s9 (`ça va
 *    tuer ton livre`) from reading as a threat against a visitors' book.
 *
 * 4. Names and places. People keep their names, including the English's own
 *    alternation — `Sandra` in her thread but `Madame Nkemelu` when Hamish is
 *    being formal and `Priscilla Nkemelu` in the epilogue, `Iain` but `K. Lamont`
 *    in the register and `Iain Lamont` when Hamish quotes Struan.
 *
 *      you    → Toi      bothy    → le refuge
 *      struan → Struan   mainroom → la pièce principale
 *      keir   → Iain     backroom → la pièce du fond
 *      morven → Anne     porch    → le porche
 *      pris   → Sandra   hill     → la montagne
 *      hamish → Hamish
 *
 *    Each is spoken with its article intact somewhere, not only on a chip: `le
 *    refuge` in s5, `la pièce principale` in m6, `la pièce du fond` in the
 *    briefing, `le porche` in m10 and r4, `la montagne` inside `le sentier de la
 *    montagne` on Iain's chip. Feminine names are safe from the contraction that
 *    broke pack 6; `le refuge` and `le porche` are the exposed ones, so both are
 *    written somewhere that does not take `au` or `du`.
 *
 *    Scottish and mountaineering vocabulary is the real French: a whiteout is `un
 *    jour blanc`, a head torch is `une frontale`, the Munros stay `les Munros`,
 *    the glen is `le vallon`, and `quatre milles` stays in miles because
 *    converting would change a stated fact.
 *
 * 5. Voice. Hamish and Sandra write in complete sentences and finish every one of
 *    them with a full stop — they are the two people in this case who expect to
 *    be quoted. Struan and Iain also capitalise properly but never land a final
 *    full stop. Anne and the player run lowercase throughout, except where a
 *    message opens on somebody's name, which both of them capitalise.
 *
 * No arc content: pack 7 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated, which shaped three lines: the briefing
 * ends `tu n’as pas bougé de chez toi` rather than `tu es resté·e`, the
 * confrontation opens the same way, and deflection 1 is `tu n’as jamais mis les
 * pieds sur cette montagne`.
 */
export const theBothyFr: CaseTranslation = {
  title: 'Le refuge',
  blurb:
    'Cinq personnes sont sorties d’un jour blanc pour entrer dans une seule pièce, à des heures d’intervalle. Elles sont d’accord sur tout sauf sur l’ordre.',

  characters: {
    you: 'Toi',
    struan: 'Struan',
    keir: 'Iain',
    morven: 'Anne',
    pris: 'Sandra',
    hamish: 'Hamish',
  },

  places: {
    bothy: 'le refuge',
    mainroom: 'la pièce principale',
    backroom: 'la pièce du fond',
    porch: 'le porche',
    hill: 'la montagne',
  },

  threads: {
    't-struan': 'Struan',
    't-group': 'Corrie Fhithich',
    't-morven': 'Anne',
    't-pris': 'Sandra',
    't-hamish': 'Hamish Dunnet',
  },

  briefing: {
    causeOfDeath:
      'Une fracture du crâne. Il y a un âtre en pierre dans la pièce du fond et il avait bu.',
    ruling:
      'Enregistré comme une chute. Personne n’a pu monter un véhicule dans le vallon avant le dimanche et d’ici là onze personnes avaient traversé cette pièce.',
    opening:
      'Le refuge de Corrie Fhithich a deux pièces, un âtre en pierre, pas d’électricité et pas de réseau. Il y a un registre près de la porte que les gens signent parce que le code de bonne conduite le veut.\n\nStruan Baillie a été retrouvé dans la pièce du fond le samedi matin. Cinq autres personnes étaient entrées la veille au soir en sortant du jour blanc, une par une, à des heures d’intervalle, et pas une d’elles n’a de montre qui soit d’accord avec celle des autres.\n\nC’est toi qui as organisé le week-end. Tu t’es cassé la cheville en novembre et tu n’as pas bougé de chez toi.',
  },

  messages: {
    // --------------------------------------------------------------- t-struan
    s1: 'Le livre est chez l’imprimeur !! Raven’s Line, relié, février. Vingt-deux ans à monter des trucs et il y en a un qui paie un crédit',
    s2: 'félicitations. sincèrement',
    s3: 'Iain vient ce week-end. Première fois depuis quatre ans qu’il dit oui à quelque chose que j’organise',
    s4: 'ça va vous deux ?',
    s5: 'Il y a une conversation qu’on n’a jamais eue et j’ai décidé que je vais l’avoir dans le refuge avec un verre dans le nez, ce qui est la façon dont toutes les mauvaises idées de ma vie ont commencé',
    s6: 'à propos de la voie',
    s7: 'Il l’a faite en solo en 2016 et il l’a dit à une seule personne et cette personne c’était moi, et j’ai mis mon nom dessus en 2018 et je dîne là-dessus depuis',
    s8: 'Je l’ai mis dans les remerciements. Ce n’est pas assez et je sais que ce n’est pas assez. Je vais lui offrir la chose entière, devant les autres, et le laisser décider de ce qu’il veut qu’on en fasse',
    s9: 'ça va tuer ton livre',
    s10: 'Ouais. Enfin',
    s11: 'Arrivé le premier, feu allumé, neige absolument horizontale dehors. Anne est là. Personne d’autre pour l’instant et ça va être une longue nuit pour qui est encore sur ce sentier',

    // ---------------------------------------------------------------- t-group
    p1: 'du réseau enfin. je ne sais pas comment écrire ça alors je vais l’écrire mal. Struan est mort au refuge vendredi soir. on l’a trouvé samedi matin dans la pièce du fond',
    p2: 'La police est montée dimanche une fois la route dégagée. Ils ont pris le registre et ils ont pris des dépositions et ils étaient convaincus que c’était une chute contre l’âtre.',
    p3: 'Je suis arrivé en dernier. Dix heures moins vingt, à moitié mort, j’ai signé le registre à la porte parce que Hamish t’oblige. Struan était déjà passé dans le fond à ce moment-là et je ne l’ai jamais vu',
    p4: 'J’étais sur ce sentier à partir de sept heures moins vingt environ. Trois heures pour quatre milles. C’est ce qu’était cette nuit-là',
    p5: 'j’étais dans cette pièce principale de six heures jusqu’à ce qu’on abandonne tous vers onze heures. je n’ai pas bougé, j’avais le poêle qui tournait et je ne laissais ma place à personne',
    p6: 'Et la femme qui fait le ménage chez lui est entrée et sortie de cette pièce du fond toute la soirée, ce que personne n’a encore mentionné à un policier',
    p7: 'Madame Nkemelu est entrée avec moi et elle est membre de ce club et elle est sur cette montagne depuis plus longtemps que toi, Iain.',
    p8: 'on peut éviter de faire ça ici',

    // --------------------------------------------------------------- t-morven
    m1: 'c’est toi qui as organisé ça et tu n’étais pas là et je n’arrête pas de penser à comment tu vas le prendre, alors je vais te dire tout ce dont je me souviens vraiment plutôt que tout ce que j’ai dit à un policier à huit heures du matin',
    m2: 'le truc avec un refuge c’est qu’il n’y a pas d’horloge. il n’y a pas de lumière à part les frontales et un poêle. tu ne sais pas quelle heure il est, tu sais ce qui est déjà arrivé',
    m3: 'Struan en premier, moi en deuxième vers six heures. Hamish et Sandra ensemble, et Iain en dernier, qui entre en tapant des pieds et en jurant et tout le monde s’est occupé de lui parce qu’il avait l’air détruit',
    m4: 'c’était la première fois que tu voyais iain cette nuit-là',
    m5: 'non. et je vis avec ça depuis onze jours',
    m6: 'vers sept heures moins dix quelqu’un est entré dans la pièce principale, frontale éteinte, n’a pas parlé, est passé directement dans le fond. j’ai supposé que c’était Struan qui revenait de la réserve de tourbe. ce n’était pas Struan parce que Struan était déjà passé dans le fond',
    m7: 'c’était la veste. bleue, empiècement orange à l’épaule, cette vieille Berghaus qu’il a depuis des années. je n’y ai pas pensé une seule seconde jusqu’à trois jours plus tard',
    m8: 'pourquoi tu n’as rien dit',
    m9: 'parce qu’à huit heures du matin avec lui mort dans la pièce d’à côté j’ai dit ce que tout le monde disait, c’est-à-dire que Iain est arrivé en dernier à dix heures moins vingt. et c’est vrai. c’est ça tout le problème. il est bien arrivé à dix heures moins vingt',
    m10: 'Sandra était dans le porche toute cette heure-là à trier un sac. parle-lui. elle essaie de faire écouter quelqu’un depuis dimanche et tout le monde a décidé qu’elle était la femme de ménage',

    // ----------------------------------------------------------------- t-pris
    r1: 'Neuf ans que j’ai fait la maison de cet homme. Neuf ans de son courrier et de ses poubelles et de sa salle de bain, alors oui, je sais des choses sur lui. Ce n’est pas un mobile, c’est un mardi.',
    r2: 'Je marche aussi. J’ai fait les Munros deux fois et la deuxième en hiver, et je suis dans le même club que Hamish Dunnet, et j’aimerais qu’une personne dans cette histoire tienne ces deux faits en même temps.',
    r3: 'iain t’a mise dans la pièce du fond',
    r4: 'C’est vrai. J’étais dans le porche avec mon sac ouvert en travers de tout le sol de sept heures à huit heures, et Anne m’a regardée faire, et Hamish m’a enjambée deux fois.',
    r5: 'Et je vais te dire la chose que je sais, puisque savoir des choses sur lui est apparemment ce à quoi je sers.',
    r6: 'Il y a eu deux lettres d’un éditeur sur cette table de cuisine pendant un mois et j’ai épousseté autour pendant un mois. Il avait écrit un paragraphe au dos de l’une d’elles, au crayon. Ça disait : dis-leur la vérité sur le Raven et laisse-les annuler.',
    r7: 'Un homme n’écrit pas ça au dos de la lettre d’un éditeur s’il n’a pas décidé. Il avait décidé. Il montait là-haut pour la donner.',

    // --------------------------------------------------------------- t-hamish
    h1: 'Je suis responsable de l’entretien de ce refuge depuis 1998 et j’y monte quatre fois par an depuis vingt-sept ans, et je n’ai jamais eu à me demander une seule fois si le registre était la trace de quoi que ce soit.',
    h2: 'Je le regarde en arrivant. Ce n’est pas une règle, c’est une habitude, et je l’ai fait à huit heures avec une frontale entre les dents comme toutes les autres fois.',
    h3: 'Il y avait cinq noms dedans à huit heures. Struan, Anne, moi, Madame Nkemelu, et K. Lamont. Le sien était le dernier des cinq et l’encre était déjà sèche.',
    h4: 'À dix heures moins vingt il est entré par cette porte et il l’a signé une deuxième fois, sur la ligne suivante, devant quatre personnes. Deux K. Lamont, l’un sous l’autre. La police a emporté le registre et je ne crois pas que quiconque ait tourné cette page.',
    h5: 'la pièce du fond',
    h6: 'Je suis passé dans le fond vers sept heures et quart pour la cartouche de gaz de secours, qui vit sur l’étagère au-dessus de l’âtre. Struan était par terre, le dos contre le mur, et un homme était accroupi devant lui.',
    h7: 'J’ai dit pardon, le gaz, et j’ai pris le gaz, et je suis ressorti. Struan avait bu et j’ai vu cet homme par terre dans un refuge à quatre reprises différentes et je n’ai rien pensé d’aucune d’elles.',
    h8: 'tu n’as pas vu qui c’était',
    h9: 'Un dos et une veste bleue et une frontale qui était éteinte. J’ai soixante-huit ans et c’était une pièce en pierre éclairée par une porte. Mais il y avait cinq personnes dans ce bâtiment et j’en situe trois à cette minute-là, et Struan était le quatrième.',
    h10: 'C’est la signature que je n’arrive pas à dépasser. Un homme qui a froid et qui est cassé et qui vient de marcher quatre milles ne pense pas au registre. Un homme qui a besoin qu’on se souvienne de son arrivée, si.',
    h11: 'Struan m’a dit l’été dernier qu’il avait pris à Iain Lamont quelque chose qui n’était pas à lui, et qu’il allait le rendre, et que ça lui faisait peur. J’ai cru qu’il parlait d’une dette.',
  },

  /**
   * The two register chips name what was asserted rather than the window they
   * share, because they are an exclusive group and the shared window is
   * machinery. `à 21:40` against `avant 20:00` is the contradiction itself.
   */
  claims: {
    'c-struan-mainroom': 'Struan : dans la pièce principale, 17:00–18:00',
    'c-keir-book-late': 'Iain : a signé le registre en arrivant à 21:40',
    'c-keir-hill': 'Iain : sur le sentier de la montagne, 18:40–21:40',
    'c-morven-mainroom': 'Anne : dans la pièce principale, 18:00–22:00',
    'c-pris-backroom': 'Sandra : dans la pièce du fond, 19:10–19:40 (selon Iain)',
    'c-keir-mainroom': 'Iain : dans la pièce principale, 18:50–19:10 (selon Anne)',
    'c-pris-porch': 'Sandra : dans le porche, 19:00–20:00 (selon Anne)',
    'c-keir-book-early': 'Iain : avait déjà signé le registre avant 20:00 (selon Hamish)',
    'c-keir-backroom': 'Iain : dans la pièce du fond, 19:15–19:30 (selon Hamish)',
  },

  motives: {
    'm-raven':
      'Iain a fait Raven’s Line en solo en 2016 et l’a dit à une seule personne. Struan l’a revendiquée en 2018 et a construit sept ans et un livre dessus, et avait décidé de la rendre devant témoins ce week-end-là.',
  },

  contradictions: {
    'x-keir-mainroom':
      'Il s’est placé sur le sentier de sept heures moins vingt à dix heures moins vingt. Vers sept heures moins dix quelqu’un a traversé la pièce principale, frontale éteinte, sans parler, et Anne a supposé que c’était Struan qui revenait de la réserve de tourbe. Struan était déjà passé dans le fond. Elle a reconnu la veste et n’y a pas pensé pendant trois jours.',
    'x-keir-book':
      'Il a signé le registre à la porte à dix heures moins vingt, devant quatre personnes, parce que Hamish oblige. Hamish avait déjà lu ce registre à huit heures avec une frontale entre les dents, et K. Lamont était le cinquième nom dedans et l’encre était sèche. Il y a deux K. Lamont sur cette page, l’un sous l’autre, et personne ne l’a tournée.',
    'x-keir-backroom':
      'À sept heures et quart Hamish est passé dans le fond pour la cartouche de secours et il y avait un homme accroupi devant Struan, qui était par terre, le dos au mur. Une veste bleue et une frontale éteinte. Trois des cinq personnes de ce bâtiment sont situées à cette minute-là et Struan était la quatrième.',
    'x-pris-porch':
      'Il a mis la femme qui fait le ménage chez Struan dans la pièce du fond toute la soirée. Elle était dans le porche de sept heures à huit heures avec son sac ouvert en travers de tout le sol, Anne l’a regardée faire et Hamish l’a enjambée deux fois. Elle essaie de faire écouter quelqu’un depuis dimanche et tout le monde a décidé qu’elle était la femme de ménage.',
  },

  confrontation: {
    opening:
      'Tu n’étais pas là. Tu t’es cassé la cheville, tu n’as pas bougé de chez toi et tu as lu quelques messages. Vas-y, raconte-moi cette nuit-là.',
    beats: {
      'b-mainroom': {
        press:
          'Tu t’étais mis sur le sentier pendant trois heures. À sept heures moins dix quelqu’un a traversé cette pièce principale frontale éteinte et est passé dans le fond, et Anne a reconnu la veste.',
        rebuttal:
          'Une pièce noire et une veste bleue. La moitié de la montagne porte cette veste. Elle a eu onze jours et beaucoup de gens pour lui dire que ça comptait.',
      },
      'b-book': {
        press:
          'Tu as signé le registre à la porte à dix heures moins vingt devant quatre personnes. Hamish a lu ce registre à huit heures et ton nom y était déjà le cinquième, et sec. Il y a deux K. Lamont sur cette page.',
        rebuttal:
          'Alors quelqu’un a écrit mon nom dans un registre. N’importe qui peut écrire un nom dans un registre.',
      },
      'b-backroom': {
        press:
          'À sept heures et quart Hamish est passé pour le gaz. Struan était par terre le dos au mur et un homme était accroupi devant lui, frontale éteinte. Trois des cinq sont situés et Struan est le quatrième.',
      },
      'b-why': {
        press:
          'Tu as fait Raven’s Line en solo en 2016 et tu l’as dit à une seule personne. Il a mis son nom dessus en 2018 et il allait te la rendre ce week-end-là, devant tout le monde, et tuer son propre livre en le faisant.',
      },
    },
    deflections: [
      'C’est une pièce sans lumière et cinq personnes qui avaient toutes marché pendant des heures.',
      'Tu n’étais pas sur cette montagne. Tu n’as jamais mis les pieds sur cette montagne en février.',
      'Reviens avec autre chose que quelqu’un qui se souvient d’un manteau.',
    ],
    confession:
      'Il allait la rendre. C’est la partie que personne ne va réussir à garder en tête, alors je vais le dire simplement.\n\nJe suis monté tôt. Je suis passé par l’épaule et je suis arrivé avant six heures parce que j’ai fait ce sentier quarante fois et qu’il ne prend pas trois heures quand on le connaît. Je voulais une heure avec lui avant que les autres arrivent.\n\nEt il était assis par terre et il l’a dit. Il a dit Iain, elle est à toi, je la rends dimanche devant eux tous, je l’ai déjà écrit dans le livre.\n\nEt je n’ai jamais rien ressenti de ma vie qui ressemble à ce que j’ai ressenti à ce moment-là, et ce n’était pas de la gratitude.\n\nSept ans. Sept ans à me tenir au fond des salles pendant qu’il racontait l’histoire de ma nuit. Sept ans à décider chaque matin de ne rien dire. Et il allait défaire ça en un dimanche après-midi et être un homme bien en le faisant, et tout le monde dirait quelle chose extraordinaire, et ce serait de nouveau à lui. Même le fait de rendre serait à lui.\n\nJe n’avais rien apporté avec moi. Il y a un âtre dans cette pièce et il était déjà par terre.\n\nEnsuite je suis ressorti là-dedans pendant deux heures et demie dans le noir, et je suis entré à dix heures moins vingt et j’ai laissé quatre personnes s’occuper de moi, et j’ai signé mon nom sous mon propre nom.',
  },

  epilogue:
    'Le registre est dans un dépôt de scellés à Aviemore. La page quarante et un porte K. Lamont écrit deux fois, à quatre lignes d’intervalle, au même crayon.\n\nPriscilla Nkemelu a été interrogée correctement en mars, quatre mois après l’avoir demandé la première fois. Elle leur a donné la lettre avec le paragraphe au crayon au dos, qu’elle avait gardée dans un tiroir parce que personne ne lui avait jamais rien demandé.\n\nRaven’s Line est paru en février avec l’attribution d’origine, parce que le tirage était déjà relié. La deuxième édition porte un autre nom et une note de deux paragraphes, et Struan Baillie a écrit les deux lui-même l’automne avant sa mort.\n\nHamish Dunnet y monte toujours quatre fois par an. Il a arrêté de regarder le registre.',
};
