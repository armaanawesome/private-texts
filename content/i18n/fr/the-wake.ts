import type { CaseTranslation } from '../caseText';

/**
 * Case 5 — "La veillée". French.
 *
 * Four things this had to get right.
 *
 * 1. The one sentence forty-one people said. The collective alibi only works if
 *    it is the *same words* every time somebody repeats it, because the player
 *    is meant to notice a sentence being recited rather than remembered. So
 *    `on était tous dans le salon` is fixed: Donal says it in f4, Maureen says it
 *    in f6, the player throws it back in r5, Maureen explains it in u2, and both
 *    revelations quote it. Vary the wording and it stops being a recitation and
 *    becomes four people who happen to agree.
 *
 * 2. Times. Everything on the day is spoken in words, because the English speaks
 *    it in words: `quatre heures` for the speeches, `quatre heures dix` for the
 *    ten past that puts Donal in two places. The chips carry the digits. Nobody
 *    in this pack ever types a clock, and the test pins that — a family at a
 *    funeral does not talk in timestamps, and the moment one of them does, the
 *    prose stops sounding like grief.
 *
 * 3. Names and places. People keep their names, including the English's own
 *    alternation between a display name and a fuller one — `Eileen` in the
 *    threads but `Bridie Mulvey` in the epilogue, `Donal` but `Donal Fahey` in
 *    r4, `Cass` but `Cassie` when her grandmother is upset with her. That is
 *    preserved where the English puts it rather than tidied.
 *
 *      you   → Toi       house      → la maison
 *      tony  → Tony      frontroom  → le salon
 *      donal → Donal     kitchen    → la cuisine
 *      nuala → Maureen   gardenroom → la véranda
 *      bridie→ Eileen    sidereturn → le passage latéral
 *      cass  → Cass      chemist    → la pharmacie de Ballybough Road
 *
 *    Every one of those is a word the prose actually says, not only the chip:
 *    `le salon` in f4 and f6, `la cuisine` in the press, `la véranda` in the
 *    briefing and k7, `le passage latéral` in r4, r9 and k10, `la maison` in the
 *    briefing and f1. `la véranda` is the choice worth defending — a garden room
 *    is a room with an outside door and a step down into it, which is what the
 *    whole death depends on, and `la pièce du jardin` is not a thing French
 *    houses have.
 *
 *    Irish specifics stay Irish: Ballybough Road, the Mulveys, and `la messe du
 *    mois` for the month's mind. `the guards` is `la police`, because `les
 *    gardaí` would need a gloss no message has room for. `vingt pieds` stays in
 *    feet — converting to metres would change a stated fact rather than
 *    translate it.
 *
 * 4. Voice. Tony, Donal, Cass and the player all run lowercase and never land a
 *    final full stop. Eileen writes in complete sentences and finishes every one
 *    of them, because she is eighty-one and was taught to. Maureen is the
 *    interesting one: she capitalises properly and then never punctuates the
 *    end, the way somebody types a long message on a phone — with exactly one
 *    exception, f12, where `Donal.` is a full stop used as a rebuke. Cass does
 *    not capitalise names, which is the line between her and her mother.
 *
 * No arc content: pack 5 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated, which shaped three lines: r1 opens `Tu as
 * fait le déplacement` rather than `tu es venu(e)`, y10 becomes `tu étais au fond
 * de l’église` rather than `je t’ai vu(e)`, and deflection 1 is `Tu n’as pas mis
 * les pieds ici` rather than a past participle.
 */
export const theWakeFr: CaseTranslation = {
  title: 'La veillée',
  blurb:
    'Quarante et une personnes étaient dans la maison et elles racontent toutes la même histoire, mot pour mot. Elle a été bâtie pour protéger quelqu’un qui ne l’a pas fait.',

  characters: {
    you: 'Toi',
    tony: 'Tony',
    donal: 'Donal',
    nuala: 'Maureen',
    bridie: 'Eileen',
    cass: 'Cass',
  },

  places: {
    house: 'la maison',
    frontroom: 'le salon',
    kitchen: 'la cuisine',
    gardenroom: 'la véranda',
    sidereturn: 'le passage latéral',
    chemist: 'la pharmacie de Ballybough Road',
  },

  threads: {
    't-tony': 'Tony',
    't-family': 'Les Mulvey',
    't-bridie': 'Eileen',
    't-cass': 'Cass',
    't-nuala': 'Maureen',
  },

  briefing: {
    causeOfDeath: 'Un seul coup à l’arrière de la tête contre la marche.',
    ruling:
      'Enregistré comme une chute. Il buvait depuis onze heures et la marche qui descend dans la véranda est mauvaise.',
    opening:
      'Gerald Mulvey a été enterré le jeudi et quarante et une personnes sont revenues à la maison.\n\nSon fils aîné Anthony a été retrouvé à cinq heures au bas de la marche qui descend dans la véranda, un verre encore à la main et le relevé des ordonnances de son père dans le sac à côté de lui.\n\nTu n’avais pas mis les pieds dans cette maison depuis neuf ans. C’est Tony qui t’a demandé de venir.',
  },

  messages: {
    // ----------------------------------------------------------------- t-tony
    y1: 'neuf ans. personne ne dira rien là-dessus le jour même, ils vont tous juste te regarder et dire mon dieu tu es tout son portrait',
    y2: 'je ne viens pas pour eux',
    y3: 'bien. parce qu’il y a une chose que je veux montrer à quelqu’un qui n’est pas dans cette famille jusqu’au cou',
    y4: 'papa était à 5 mg de morphine liquide à la fin et la pharmacie l’a noté pour cent quatre-vingts millilitres sur trois semaines. ce n’est pas une erreur, c’est quelqu’un qui va les chercher',
    y5: 'qui allait les chercher',
    y6: 'c’est ça que j’ai et je ne le mets pas dans un message. j’ai le relevé imprimé. je l’apporte jeudi dans le sac avec les lectures pour la messe',
    y7: 'je lui ai demandé en face dimanche, sans détour, et il m’a ri au nez et il a dit fais attention à toi Tony. c’est la phrase exacte. fais attention à toi',
    y8: 'tony va à la police',
    y9: 'avec ma mère dans la maison. après l’enterrement. je ne lui fais pas ça la semaine où elle l’enterre, je le ferai le vendredi et je le ferai correctement',
    y10: 'tu es là. tu étais au fond de l’église et j’ai failli venir',
    y11: 'dans la cuisine avec les sandwichs comme un idiot. trouve-moi avant les discours, j’ai le sac avec moi',

    // --------------------------------------------------------------- t-family
    f1: 'Pour ceux à qui on ne l’a pas dit correctement et pas par quelqu’un d’autre, Tony est mort hier à la maison. Il est tombé sur la marche qui descend dans la véranda. On s’occupe de Maman et s’il vous plaît ne l’appelez pas aujourd’hui, appelez-moi, enfin je vous ferai savoir pour les dispositions quand il y en aura',
    f2: 'J’ai enterré un mari le jeudi et un fils le jeudi soir. Je n’ai rien à dire à aucun d’entre vous sauf que Dieu a une très mauvaise idée du moment où une chose suffit.',
    f3: 'la police a été correcte là-dessus. ils sont entrés et repartis en une heure et ils ont dit ce que tout le monde dans cette maison savait déjà. mauvaise marche, de la boisson depuis onze heures, rien de plus',
    f4: 'et on était tous dans le salon à partir de quatre heures pour les discours. tous. c’est ce que je leur ai dit et c’est ce que tout le monde leur a dit',
    f5: 'je distribuais les verres pendant tout ce temps. demande à n’importe lequel d’entre eux',
    f6: 'On était tous dans le salon. Chacun d’entre nous. Je veux que ce soit dit clairement parce qu’il y a déjà des bruits et je sais d’où ils viennent',
    f7: 'il avait un sac avec lui. où est le sac',
    f8: 'neuf ans et c’est ta première question. très bien',
    f9: 'Réponds-lui, Donal.',
    f10: 'je ne sais pas où est son sac. c’est une maison avec quarante personnes dedans et un homme mort au fond',
    f11: 'et si on fait des questions, Cass était dehors derrière pendant tout ce temps et personne n’a dit un mot là-dessus non plus',
    f12: 'Donal.',
    f13: 'Cette petite était avec moi. Je le dirai à toi et à un policier et à un juge et on ne me le demandera pas deux fois.',

    // --------------------------------------------------------------- t-bridie
    r1: 'Tu as fait le déplacement. Neuf ans, et tu as fait le déplacement, et c’est lui qui te l’avait demandé. Il y a une leçon là-dedans quelque part et je suis trop fatiguée pour aller la chercher.',
    r2: 'tu étais dans le salon',
    r3: 'J’étais dans ma cuisine à quatre heures dix à chercher des verres, parce que personne n’avait tendu un verre à personne et les discours continuaient sans eux.',
    r4: 'Et de la fenêtre de ma cuisine je vois le passage latéral, et Donal Fahey se tenait dedans au téléphone, dos à la maison.',
    r5: 'tu as dit à la police que tout le monde était dans le salon',
    r6: 'Oui. Et je le referais, et je vais te dire exactement pourquoi, et après tu penseras de moi ce que tu voudras.',
    r7: 'Cassie a pris quatre cents livres dans mon sac à main mercredi. Maureen l’a surprise et j’ai surpris les deux, et on s’est mises d’accord toutes les trois pour dire que le jour où on enterrait son grand-père n’était pas le jour.',
    r8: 'Alors quand le policier a demandé où était tout le monde, on a dit le salon, nous tous, ensemble. C’était pour elle. Ce n’était pour personne d’autre et je n’ai pas pensé une seconde que ça pouvait être pour quelqu’un d’autre.',
    r9: 'Cette petite était dans le passage latéral à vomir de honte, et mon fils mourait à vingt pieds d’elle, et c’est moi qui l’ai envoyée dehors.',
    r10: 'Parle-lui. Elle ne veut pas me parler et je ne lui en veux pas.',

    // ----------------------------------------------------------------- t-cass
    k1: 'mamie a dit que tu écrirais',
    k2: 'j’ai pris l’argent. je ne vais pas rester là à faire le truc où je tourne autour avant de le dire',
    k3: 'je n’ai pas posé de question sur l’argent',
    k4: 'tout le monde finit par poser des questions sur l’argent. j’étais dehors sur le côté tout le temps. de quatre heures jusqu’à ce que mamie sorte me chercher',
    k5: 'donal est sorti vers quatre heures dix. il ne m’a pas vue, je suis petite et il y a une poubelle à roulettes, c’est toute la raison pour laquelle je sais quoi que ce soit',
    k6: 'qu’est-ce qu’il a fait',
    k7: 'il est entré par la porte de la véranda. celle de dehors. il est resté un peu dedans et puis il est ressorti et il était différent. pas bouleversé. plutôt net. il a rajusté sa cravate dans la vitre',
    k8: 'et il avait le sac de tonton tony. je ne savais pas que c’était celui de tonton tony à ce moment-là. je le sais maintenant',
    k9: 'pourquoi tu n’as rien dit',
    k10: 'parce que pour dire où il était il faut que je dise où j’étais. et où j’étais c’est le passage latéral à vomir parce que j’avais volé ma mamie le jour de l’enterrement de papi',
    k11: 'ils ont tous couvert pour moi. tous, tout de suite, personne n’en a même discuté. et je passe mes nuits à me dire que la raison pour laquelle il s’en est tiré c’est qu’ils étaient gentils avec moi',

    // ---------------------------------------------------------------- t-nuala
    u1: 'Je suis mariée avec lui depuis vingt-six ans et je sais depuis environ neuf heures, alors il va falloir me laisser une minute sur la façon dont je dis les choses',
    u2: 'J’ai dit à la police qu’on était tous dans le salon parce que Maman l’a dit en premier et je n’allais pas la laisser plantée là toute seule après l’avoir dit. C’est tout mon raisonnement et ce n’en est pas un bien fameux',
    u3: 'les ordonnances',
    u4: 'C’est Donal qui faisait la pharmacie. La dernière fois c’était le mardi, onze heures dix, et son nom est sur le registre parce qu’ils font signer pour le liquide. Il les a toutes faites ce mois-là, parce que moi je ne pouvais pas entrer là-dedans et dire le nom de Papa à la fille derrière le comptoir sans partir en morceaux',
    u5: 'Et il a dit à la police qu’il n’en avait jamais pris une seule. Il l’a dit devant moi et je l’ai entendu le dire et je n’ai rien dit, parce qu’à ce moment-là je pensais qu’il était seulement fainéant avec la paperasse',
    u6: 'Cent quatre-vingts millilitres. Tony me l’a dit le dimanche et je lui ai répondu qu’il se donnait en spectacle à la messe du mois de son propre père',
    u7: 'Papa avait de l’argent. Pas beaucoup. Assez pour que quatre ans de plus de maison de retraite emportent tout et que trois ans en laissent un peu',
    u8: 'Je reviens sans arrêt au salon et je compte les têtes. J’ai compté cette pièce quarante fois depuis hier et il n’y est pas, et j’ai dit qu’il y était, et j’aurais continué à le dire',
  },

  claims: {
    'c-tony-kitchen': 'Tony : dans la cuisine, 15:00–15:55',
    'c-donal-front': 'Donal : dans le salon, 16:00–16:30',
    'c-donal-toast': 'Donal : en train de distribuer les verres, 16:00–16:30',
    'c-nuala-front': 'Maureen : dans le salon, 16:00–16:30',
    'c-cass-gardenroom': 'Cass : dans la véranda, 16:05–16:25 (selon Donal)',
    'c-bridie-kitchen': 'Eileen : dans la cuisine, 16:05–16:15',
    'c-donal-outside': 'Donal : au téléphone dans le passage latéral, 16:05–16:25 (selon Eileen)',
    'c-cass-return': 'Cass : dans le passage latéral, 16:00–16:30 (selon Eileen)',
    'c-donal-garden': 'Donal : dans la véranda, 16:10–16:20 (selon Cass)',
    'c-donal-collected': 'Donal : a signé pour la dernière ordonnance, 10:00–12:00',
    'c-donal-scripts': 'Donal : n’a jamais pris une ordonnance, 09:00–13:00 (sa version)',
  },

  motives: {
    'm-morphine':
      'Il allait chercher les ordonnances de Gerald toutes les semaines du dernier mois et cent quatre-vingts millilitres sont sortis sur une dose de cinq millilitres. Tony avait le relevé de la pharmacie dans son sac et il allait à la police le vendredi.',
  },

  contradictions: {
    'x-donal-garden':
      'Chaque adulte de cette maison a dit la même phrase à la police, et elle était vraie pour presque tous. À quatre heures dix, Donal Fahey est entré par la porte extérieure de la véranda, et une fille de dix-neuf ans derrière une poubelle à roulettes l’a vu ressortir et rajuster sa cravate dans la vitre.',
    'x-donal-glasses':
      'Il a dit qu’il distribuait les verres pendant tout ce temps. Eileen Mulvey est allée dans sa propre cuisine à quatre heures dix chercher des verres, parce que personne n’en avait tendu un à personne, et de cette fenêtre elle l’a regardé debout dans le passage latéral, dos à la maison.',
    'x-donal-scripts':
      'Il a dit à la police qu’il n’avait jamais pris une seule ordonnance de Gerald. Sa femme les a faites pendant un mois et sait exactement pourquoi elle ne pouvait pas : elle ne pouvait pas dire le nom de son père à la fille derrière le comptoir. Cent quatre-vingts millilitres de morphine liquide sont sortis contre une dose de cinq millilitres, et le relevé était dans le sac de Tony.',
    'x-cass-return':
      'Il a mis la petite dans la véranda, ce qui est la seule accusation que quelqu’un de cette famille ait prononcée à voix haute. Elle a passé toute la demi-heure dans le passage latéral, à vomir de honte pour quatre cents livres, et c’est sa grand-mère qui l’a envoyée là et qui peut le dire.',
  },

  confrontation: {
    opening:
      'Neuf ans que tu n’étais plus là. Tu reviens pour un après-midi et maintenant tu connais cette famille, c’est ça. Vas-y.',
    beats: {
      'w-garden': {
        press:
          'Tu as dit à la police que tout le monde était dans le salon à partir de quatre heures. À quatre heures dix tu es entré par la porte extérieure de la véranda, et Cass t’a regardé ressortir et rajuster ta cravate dans la vitre.',
        rebuttal:
          'Une gamine qui a volé sa grand-mère le jour d’un enterrement. Voilà ton témoin. Elle a toutes les raisons du monde de mettre quelqu’un d’autre dehors avec elle.',
      },
      'w-glasses': {
        press:
          'Tu as dit que tu distribuais les verres pendant tout ce temps. Eileen est allée à la cuisine à quatre heures dix chercher des verres, parce que personne n’en avait tendu un à personne, et elle t’a regardé depuis la fenêtre.',
        rebuttal: 'Elle a quatre-vingt-un ans et elle a enterré un mari ce matin-là.',
      },
      'w-scripts': {
        press:
          'Et tu leur as dit que tu n’avais jamais pris les ordonnances de Gerald. Maureen les a faites pendant un mois, et elle peut te dire exactement pourquoi elle ne pouvait pas.',
      },
      'w-why': {
        press:
          'Cent quatre-vingts millilitres contre une dose de cinq millilitres. Tony avait le relevé dans ce sac et il allait à la police le vendredi. C’est toi qui lui as dit de faire attention à lui.',
      },
    },
    deflections: [
      'C’est une maison pleine de chagrin et tu la lis comme un livre de comptes.',
      'Tu n’as pas mis les pieds ici pendant neuf ans. Tu ne débarques pas pour avoir raison.',
      'Apporte-moi une chose. Pas une impression que quelqu’un a eue à un enterrement.',
    ],
    confession:
      'Il est sorti dans le passage pour me le dire. Pas pour me menacer. C’était ça, Tony, il ne savait pas menacer, il est sorti pour me dire ce qu’il allait faire le vendredi pour que je ne l’apprenne pas par un policier.\n\nIl était correct là-dessus. Il avait le sac sous le bras et il était correct là-dessus.\n\nEt j’ai dit entre une minute, et il est entré devant moi, et la marche qui descend dans cette véranda est mauvaise depuis 1994.\n\nJe veux dire l’autre partie parce que tu ne croiras pas la première sans elle.\n\nJe n’ai rien construit de tout ça. Le salon. Nous tous ensemble. Je n’ai pas dit un mot pour que ça arrive. Ils l’ont fait tout seuls, en quatre secondes, dans le couloir, parce que Cassie pleurait et qu’Eileen a dit qu’on était tous dans le salon et que Maureen a dit oui c’est ça, et elles se sont regardées et c’était fait.\n\nEt je suis resté là et je les ai laissés se refermer sur moi comme de l’eau.\n\nVoilà ce que j’ai fait. J’ai volé une chose qui était destinée à une enfant.',
  },

  epilogue:
    'Gerald Mulvey a été exhumé en février. Le rapport a utilisé le mot compatible quatre fois et n’est pas allé plus loin, et il n’avait pas à le faire, parce qu’à ce moment-là il y avait le registre de la pharmacie et il y avait Maureen.\n\nElle a fait sa déposition sur deux jours et n’a pas demandé une seule fois ce que ça lui ferait. Quand on lui a demandé pourquoi elle avait dit le salon, elle a répondu : parce que ma mère l’a dit en premier.\n\nBridie Mulvey n’est pas venue au procès. Elle a envoyé une lettre à lire, d’une seule ligne, demandant qu’on dise au tribunal que sa petite-fille était dans le passage latéral tout le temps et n’avait rien à voir avec quoi que ce soit.\n\nCass a remboursé les quatre cents livres par versements à une femme qui ne les a jamais réclamés.',
};
