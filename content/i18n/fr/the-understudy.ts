import type { CaseTranslation } from '../caseText';

/**
 * Case 2 — "La doublure". French.
 *
 * Four things this had to get right, in this order.
 *
 * 1. The key. The case is a locked room resting on one object, so the object has
 *    exactly one name: `la clé de la loge`, with `l’étiquette rouge` on it. Both
 *    chips say `la clé de la loge`, the revelation says it, Beatrice is pressed
 *    with it. Where the English shortens to "the key" mid-sentence the French
 *    shortens to `la clé` the same way — a short form of one name, not a second
 *    name. A second name would be a second key, and a locked room with two keys
 *    has a way out of it.
 *
 * 2. Times. The interval is 20:05–20:40 and the English writes almost all of it
 *    in words: "ten past", "twelve past", "twenty to nine". French cannot leave
 *    the hour implicit the way English can, so `ten past` becomes `huit heures
 *    dix` — the same minute, said in full. Exactly three things stay in digits,
 *    because they are digits in the English too: the 20:12 train, the 20:51 it
 *    actually arrived on (which is the whole of Dev being innocent), and J14, the
 *    seat Beatrice puts herself in.
 *
 * 3. Names. Diane, Beatrice, Dev, Nell, Joel Petrie, Sheffield and the Alhambra
 *    are people and places with names and they keep them. Descriptive places are
 *    translated, because `the dressing room corridor` sitting untranslated inside
 *    a French sentence reads as machine output. Full list, so every decision is
 *    visible in review:
 *
 *      you    → Toi        theatre    → l’Alhambra
 *      coral  → Diane      stage      → la scène
 *      bea    → Beatrice   auditorium → la salle
 *      dev    → Dev        corridor   → le couloir des loges
 *      nell   → Nell       dressing1  → la loge de Diane
 *                          stagedoor  → l’entrée des artistes
 *                          station    → la gare
 *                          key1       → la clé de la loge
 *
 *    `la salle` is the auditorium as a whole, and that matters: Beatrice claims
 *    the auditorium and Nell puts her at the back of the circle, so `le balcon`
 *    has to sit inside `la salle` exactly as the circle sits inside the
 *    auditorium. Calling it `le parterre` would have made those two places
 *    different and invented a contradiction the engine does not hold.
 *
 * 4. Voice. Beatrice writes like a woman dictating a letter: capitals, full
 *    stops, subordinate clauses, and the knife inside the good manners. She is
 *    the only one in the case who finishes a sentence with a full stop. Dev is
 *    lowercase and technical — `la régie`, `les coulisses`, `l’entrée des
 *    artistes`, `conduire un spectacle` — because he has called the show for
 *    twenty two years and types like it. Nell is lowercase and hedges: `c’est
 *    que`, `je ne sais pas`. Diane is lowercase and clipped and never explains
 *    herself.
 *
 * The theatre words are the real ones rather than the literal ones: `beginners`
 * is `en scène` because that is the call a French stage manager gives, `the
 * interval` is `l’entracte`, `the prompt corner` is `la régie`, `the wings` are
 * `les coulisses`, `press night` is `la soirée de presse`, and an understudy is
 * `une doublure`.
 *
 * No arc content: pack 2 is deliberately standalone, so there is no Keeper here,
 * no Listener and no coda. Nothing in this file may start one.
 *
 * The player's gender is never stated, so nothing addressed to them may agree.
 * That shaped two lines: Beatrice opens b1 with `Tu n’as pas chômé` rather than
 * `tu as été occupé(e)`, and deflection 1 is `Tu es dans ce bâtiment depuis
 * quatre jours` rather than a past participle.
 */
export const theUnderstudyFr: CaseTranslation = {
  title: 'La doublure',
  blurb:
    'Une actrice principale meurt enfermée dans sa loge pendant la soirée de presse. Il n’existe qu’une seule clé, et deux personnes disent qu’elles l’avaient.',

  characters: {
    you: 'Toi',
    coral: 'Diane',
    bea: 'Beatrice',
    dev: 'Dev',
    nell: 'Nell',
  },

  places: {
    theatre: 'l’Alhambra',
    stage: 'la scène',
    auditorium: 'la salle',
    corridor: 'le couloir des loges',
    dressing1: 'la loge de Diane',
    stagedoor: 'l’entrée des artistes',
    station: 'la gare',
  },

  objects: {
    key1: 'la clé de la loge',
  },

  threads: {
    't-coral': 'Diane',
    't-company': 'Compagnie de l’Alhambra',
    't-dev': 'Dev',
    't-nell': 'Nell',
    't-bea': 'Beatrice Kyd',
  },

  briefing: {
    causeOfDeath: 'Une overdose de ses propres médicaments.',
    ruling: 'Enregistrée comme auto-administrée. La porte était fermée de l’intérieur.',
    opening:
      'Diane Vane portait la tournée à bout de bras depuis Sheffield, et tout le monde le disait, en général devant elle.\n\nLa soirée de presse, elle est sortie de scène à l’entracte, elle est allée dans sa loge et elle n’est pas revenue. La porte était fermée à clé. La compagnie a continué sans elle, et la doublure a reçu l’annonce qu’elle attendait depuis onze mois.',
  },

  messages: {
    // ---------------------------------------------------------------- t-coral
    cl1: 'soirée de presse. dix-sept d’entre eux ce soir et deux qui comptent',
    cl2: 'tu as fait ça cent fois',
    cl3: 'pas avec Bea dans le bâtiment. elle est dans la salle tous les soirs cette semaine avec un carnet et elle n’écrit rien dedans',
    cl4: 'elle veut que j’arrête de demander. je ne vais pas arrêter de demander',
    cl5: 'diane combien tu lui as pris',
    cl6: 'ne dis pas ça comme ça. c’est elle qui conduisait. on était deux à savoir et l’une des deux passe onze ans à faire comme si non',
    cl7: 'onze mille cette année. c’est elle qui l’a proposé, je n’ai rien demandé. et elle peut se le permettre et Joel Petrie ne peut pas marcher',
    cl8: 'ça reste une chose que tu lui fais',
    cl9: 'je sais ce que c’est. après ce soir j’en ai fini d’une manière ou d’une autre. en scène. on parle après',
    cl10: 'diane',

    // -------------------------------------------------------------- t-company
    q1: 'Compagnie. Diane est morte hier soir dans sa loge. La police est venue et repartie, et elle est convaincue que c’était sa propre médication.',
    q2: 'Nous jouons ce soir. Elle aurait insisté et je ne vais pas prétendre le contraire. Nell entre en scène.',
    q3: 'je ne veux pas que ce soit comme ça',
    q4: 'Personne ne veut que ce soit comme ça. Tu es en scène à sept heures et demie.',
    q5: 'la porte était fermée à clé. je veux le dire à voix haute parce que dans cette pièce personne ne l’a dit à voix haute',
    q6: 'il y a une clé. une. le double s’est perdu à Sheffield et on n’en a jamais refait parce que ça coûtait quarante livres et Bea a dit non',
    q7: 'et je l’ai eue à la ceinture tout l’entracte, à la régie, là où elle vit',
    q8: 'Dev. Pas ici.',
    q9: 'Et tu n’étais pas dans le bâtiment pendant tout ce temps, alors je te prie de mesurer l’assurance avec laquelle tu parles.',
    q10: 'ce n’est pas juste et tu sais que ce n’est pas juste',
    q11: 'elle m’a écrit à sept heures. elle a dit qu’après ce soir c’était fini d’une manière ou d’une autre',
    q12: 'Elle disait beaucoup de choses à beaucoup de gens. C’était là, pour une bonne part, la difficulté avec elle.',
    q13: 'elle a été gentille avec moi. elle a été la seule à l’être',
    q14: 'demande à Nell où elle était à huit heures dix. elle a vu plus que ce qu’elle a dit ici',

    // ------------------------------------------------------------------ t-dev
    d1: 'désolé pour tout à l’heure. ça fait vingt-deux ans que je conduis des spectacles et je n’ai jamais perdu personne pendant un entracte',
    d2: 'elle a dit que tu n’étais pas dans le bâtiment',
    d3: 'j’allais y être. notre ensemblière arrivait par le train de 20:12 et j’ai dit que je descendais la chercher, c’est quatre minutes',
    d4: 'le 20:12 avait quarante minutes de retard. il est arrivé à 20:51. je n’ai pas bougé de l’entrée des artistes, je suis resté dedans à fumer et à regarder le tableau sur mon téléphone',
    d5: 'Nell est passée devant moi deux fois. elle te le dira. elle était dans le couloir à huit heures cinq à attendre qu’on lui dise qu’elle ne jouait pas, comme tous les soirs',
    d6: 'et Beatrice',
    d7: 'Bea est descendue par le couloir vers huit heures douze et elle est remontée vers huit heures vingt. je l’ai vue depuis la porte. je n’y ai pas prêté attention, elle va où elle veut',
    d8: 'Diane est descendue à huit heures dix et je ne l’ai plus revue. j’ai annoncé la deuxième partie et elle n’est pas venue et j’ai pensé qu’elle faisait sa Diane à propos des critiques',
    d9: 'j’y ai pensé toute la nuit. si j’étais descendu à huit heures vingt au lieu de rester planté là comme un piquet',

    // ----------------------------------------------------------------- t-nell
    e1: 'Dev a dit que tu voudrais me parler. tout le monde pense que c’est moi. moi aussi je penserais que c’est moi',
    e2: 'onze mois à entrer dans la robe et à la ressortir. tu peux le dire. c’est ce que ça a l’air d’être',
    e3: 'tu étais où pendant l’entracte',
    e4: 'dans le couloir, de huit heures cinq à huit heures douze, debout devant l’habillage à attendre que Dev me dise que je ne jouais pas. après en haut aux coulisses pour la deuxième partie parce que je la regarde de là',
    e5: 'et après j’étais sur la scène à partir de neuf heures moins vingt devant quatre cents personnes',
    e6: 'Dev dit que tu as vu plus que ce que tu as raconté',
    e7: 'Bea est passée à côté de moi vers huit heures dix. elle avait la clé à la main. je la connais cette clé, elle a l’étiquette rouge que Dev a mise dessus pour qu’elle arrête de se perdre',
    e8: 'je ne l’ai pas dit dans le groupe parce que c’est elle qui me donne le travail. c’est elle qui me donnera tous les travaux que j’aurai dans cette ville',
    e8b: 'elle dit qu’elle donnait des notes pendant l’entracte',
    e8c: 'personne n’a eu de note. demande à n’importe qui. c’est que moi je monte par le fond du balcon pour arriver aux coulisses parce qu’à l’entracte ils ferment la porte de communication, et elle était debout en haut de l’allée sur son téléphone, dos à la salle, tout le temps où je suis passée',
    e9: 'tu es en train de le dire maintenant',
    e10: 'parce que hier soir je suis entrée en scène dans sa robe et elle m’allait, et depuis ça me rend malade. elle a été gentille avec moi et elle a été horrible avec Bea. je ne sais pas quoi faire de ça',

    // ------------------------------------------------------------------ t-bea
    b1: 'Tu n’as pas chômé. Deux personnes de ma compagnie ont cessé de croiser mon regard et je ne crois pas que ce soit une coïncidence.',
    b2: 'J’étais dans la salle depuis huit heures cinq jusqu’à ce que la deuxième partie commence. Je suis assise en J14 tous les soirs de toutes les séries et quarante personnes pourraient te décrire ma nuque.',
    b3: 'Et je travaillais. Une soirée de presse, je donne des notes à l’entracte, toujours, parce que ce sont les seules vingt minutes où quelqu’un écoute.',
    b4: 'elle te prenait de l’argent',
    b5: 'Elle m’en prenait. Onze mille cette année, dix-neuf mille l’année d’avant. J’ai tout payé et j’aurais continué à payer. L’autre solution, c’était que Joel Petrie lise mon nom dans un journal.',
    b6: 'C’est moi qui conduisais. Voilà tout. Il y a onze ans, sur une route mouillée à la sortie de Sheffield, avec la camionnette de la compagnie et deux personnes dedans, et l’une des deux ne s’est jamais relevée.',
    b7: 'Je n’ai jamais dit une seule fois que ce n’était pas moi. J’ai dit que c’était la route. Diane était sur le siège passager et elle savait que ce n’était pas la route.',
    b8: 'et la semaine dernière elle a dit qu’elle en avait fini d’une manière ou d’une autre',
    b9: 'Oui. Fini au sens où elle allait le dire. Une soirée de presse. Avec dix-sept d’entre eux dans la salle.',
    b10: 'Rien de tout cela ne me met dans ce couloir. Fais attention à ce que tu crois avoir.',
  },

  /**
   * Digits here are digits in both languages and stay identical to the English,
   * because these are the twelve lines the player lays side by side on the board.
   * The two that break the locked room are the two `clé` chips.
   */
  claims: {
    'c-coral-stage': 'Diane : sur la scène, 19:00–20:05',
    'c-key-dev': 'Dev : avait la clé de la loge, 19:50–20:40',
    'c-dev-station': 'Dev : à la gare, 20:05–20:35 (selon Beatrice)',
    'c-dev-stagedoor': 'Dev : à l’entrée des artistes, 19:50–20:40',
    'c-bea-corridor': 'Beatrice : dans le couloir, 20:12–20:22 (selon Dev)',
    'c-coral-dressing': 'Diane : dans sa loge, 20:10–20:40',
    'c-nell-corridor': 'Nell : dans le couloir, 20:05–20:12',
    'c-nell-stage': 'Nell : sur la scène, 20:40–22:00',
    'c-key-bea': 'Beatrice : avait la clé de la loge, 20:10–20:20 (selon Nell)',
    'c-bea-call': 'Beatrice : seule au téléphone, 20:10–20:20 (selon Nell)',
    'c-bea-auditorium': 'Beatrice : dans la salle, 20:05–20:45',
    'c-bea-notes': 'Beatrice : en train de donner les notes de l’entracte, 20:05–20:25',
  },

  motives: {
    'm-sheffield':
      'Diane lui prenait de l’argent depuis deux ans à cause de l’accident de Sheffield, et elle avait décidé de le dire à voix haute la soirée de presse.',
  },

  contradictions: {
    'x-key':
      'Il y a une clé et il n’y en a qu’une seule depuis Sheffield. Dev dit qu’il l’avait à la ceinture, à la régie ; Nell a vu Beatrice descendre le couloir en la tenant par l’étiquette rouge. Les deux ne peuvent pas être vraies, et une seule des deux ferme une porte de l’extérieur et la laisse avec l’air d’être fermée de l’intérieur.',
    'x-bea-corridor':
      'Elle s’est placée en J14 pendant tout l’entracte, là où quarante personnes connaissent sa nuque. Dev l’a vue descendre le couloir des loges à huit heures douze et remonter à huit heures vingt, depuis une entrée des artistes dont il n’a pas bougé.',
    'x-bea-notes':
      'Des notes à l’entracte une soirée de presse, a-t-elle dit, parce que ce sont les seules vingt minutes où quelqu’un écoute. Cette nuit-là, personne dans la compagnie n’a reçu la moindre note. Elle était au téléphone dans le noir au fond du balcon, seule, pendant tout ce temps.',
    'x-dev-train':
      'Le 20:12 avait quarante minutes de retard et n’est arrivé qu’à 20:51, donc Dev n’avait aucun train à aller chercher et il n’a pas bougé de l’entrée des artistes. Il était la seule personne du bâtiment à voir ce couloir pendant tout l’entracte, et c’est Beatrice qui a essayé de l’en faire sortir.',
  },

  confrontation: {
    opening:
      'Assieds-toi. J’ai mis en scène quarante et une productions et je n’ai jamais été en retard une seule fois à une conversation difficile, alors dis-le correctement.',
    beats: {
      'u-key': {
        press:
          'Il n’y a qu’une clé. Dev l’avait à la ceinture pendant tout l’entracte, et Nell t’a vue descendre le couloir en la tenant par l’étiquette rouge.',
        rebuttal:
          'Nell aimerait bien ma place et la veut depuis mars. Mets une fille de dix-neuf ans devant un policier et elle se souviendra de tout ce qu’il faut pour sortir de la pièce.',
      },
      'u-corridor': {
        press:
          'Tu t’es placée en J14 pendant tout l’entracte. Dev t’a vue descendre ce couloir à huit heures douze et remonter à huit heures vingt.',
        rebuttal:
          'Dev conduit des spectacles depuis vingt-deux ans en dormant quatre heures par nuit. C’est un homme merveilleux et il serait incapable de te dire ce qu’il a mangé à midi.',
      },
      'u-notes': {
        press:
          'Tu as dit que tu donnais les notes de l’entracte. Pas une seule personne de cette compagnie n’a reçu de note. Tu étais au téléphone au fond du balcon, toute seule, dans le noir.',
        rebuttal: 'Et une femme a le droit de passer un coup de téléphone.',
      },
      'u-why': {
        press:
          'Dix-neuf mille une année et onze mille la suivante, pour onze ans de c’était la route et pas toi. Et elle avait décidé de le dire la soirée de presse.',
      },
    },
    deflections: [
      'Ce n’est pas une preuve, c’est une humeur.',
      'Tu es dans ce bâtiment depuis quatre jours. Moi j’y suis depuis mars.',
      'Recommence, et cette fois avec quelque chose que je ne pourrais pas démonter devant un jury.',
    ],
    confession:
      'Elle est sortie de scène à l’entracte et elle était illuminée. Pas cruelle. C’est ce que les gens ne comprendront pas d’elle. Elle n’était pas cruelle, elle était *libre*, enfin, après onze ans à porter ça pour moi.\n\nElle a dit qu’elle avait annoncé aux deux critiques qu’elle allait leur donner mieux que la pièce. Elle l’a dit comme on annonce une bonne nouvelle.\n\nJ’avais la clé à la main parce que j’étais descendue lui demander de ne pas le faire. Je ne suis descendue que pour ça. Je veux que ce soit écrit quelque part.\n\nElle s’est moquée de moi, et j’ai été moquée par de meilleures qu’elle, et puis elle s’est retournée vers son miroir et elle a commencé à se démaquiller, et elle a dit ne me fais pas d’ombre.\n\nEt j’ai posé les cachets devant elle et je me suis assise sur l’autre chaise et je n’ai pas dit un seul mot pour l’arrêter. Voilà ce que j’ai fait. Je ne l’ai pas forcée à les prendre. Je n’ai simplement pas dit la chose qui l’aurait arrêtée, et je sais exactement combien de temps j’ai passé à ne pas la dire.',
  },

  epilogue:
    'Ils ont trouvé le deuxième verre dans l’évier, lavé, et la clé à l’étiquette rouge encore tiède dans la poche de son manteau quand la police lui a enfin demandé de la vider.\n\nNell a joué toute la série puis la reprise, et elle y était très bien, et elle n’a pas parlé une seule fois de tout ça à un journaliste.\n\nUn avocat a écrit à Joel Petrie au printemps. Il savait pour la route depuis onze ans. Il a dit que la seule chose qu’il avait jamais voulue, c’était que quelqu’un le dise à voix haute sans qu’il ait à le demander.',
};
