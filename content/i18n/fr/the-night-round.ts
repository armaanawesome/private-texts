import type { CaseTranslation } from '../caseText';

/**
 * Case 3 — "La ronde de nuit". French.
 *
 * Four things this had to get right, in this order.
 *
 * 1. The two records. The case is one paper record disagreeing with one machine
 *    record, so each has exactly one French name and never a second. `le cahier
 *    de nuit` is the night book in the blurb, in the briefing, in Margo's mouth,
 *    in Claire's, in the revelation and in the epilogue. `la ronde` is the round
 *    everywhere — Margo signe la ronde de onze heures et ne la fait pas. `le
 *    badge` is the fob, `badge de porte` and `badge visiteur` where the English
 *    qualifies it and bare where the English says just "fob", which is the same
 *    distinction the English makes. Two names for the night book would be two
 *    books and the case stops working. `le cahier des médicaments` is
 *    deliberately a different book, exactly as the English keeps the medicines
 *    book apart.
 *
 * 2. Times. Every time survives in the same grammatical position, because the
 *    player solves this by holding two of them side by side. Ali signs out at
 *    `dix heures moins vingt` in the briefing, in g6 and in the revelation. She
 *    is home from `dix heures et quart`, asleep from `dix heures et demie`, and
 *    Teddy has her on the corridor at `onze heures et demie` and back down the
 *    stairs at `minuit moins vingt`. Margo sits from `onze heures moins cinq`
 *    until `onze heures vingt`, which is the pair that breaks her. 23:47 stays
 *    23:47 in Claire's account, on the chip, in the revelation and in the press,
 *    because it is the one fact nobody can call a memory.
 *
 * 3. Names. People stay: Ivy, Ali (Alison in prose, exactly as the English
 *    alternates), Margo, Teddy, Claire, and Lagos, Kilmarnock and Marchbank
 *    House with them. Descriptive places are translated, because "the day room"
 *    sitting untranslated inside a French sentence reads as machine output. Full
 *    list, so every decision is visible in review:
 *
 *      you      → Toi      marchbank → Marchbank House
 *      ivy      → Ivy      ivyroom   → la chambre d’Ivy
 *      fen      → Ali      corridor  → le couloir du premier étage
 *      margo    → Margo    dayroom   → la salle commune
 *      teddy    → Teddy    desk      → le poste de nuit
 *      saoirse  → Claire   carpark   → le parking
 *                          fenhouse  → la maison d’Ali
 *
 *    The British units and money stay British — `onze milles`, `livres` — because
 *    the case is set in a British care home and converting them would change
 *    facts rather than translate them.
 *
 * 4. Voice. Six people write differently and the difference is the character.
 *    Ivy is eighty-four, precise and dry, complete sentences, understatement
 *    doing the work (`C’est précisément là qu’est l’ennui`). Margo is warm, runs
 *    on, exclaims, and leaves the final full stop off nearly every message, which
 *    the English does too. Teddy is clipped and exact and never estimates. Ali is
 *    formal and on the defensive. Claire writes like someone whose words may be
 *    read back to her. The player is lowercase and short, thumbing a phone.
 *
 * `the Keeper` stays `le Keeper`, untranslated, and it appears exactly once —
 * inside the confession, which is the whole design of pack 3. The reveal lands
 * only after the case is already solved, so the word must not leak into a
 * message, a revelation, the briefing or the coda. A player who met the name in
 * Pack 1 is supposed to feel the floor move here, and that is carried entirely by
 * recognising the same word. `le Gardien` would break the arc for French players
 * and nothing else would fail. `arcAlias.test.ts` counts the mentions per case.
 *
 * Gender. This case used to be the exception: the English had Margo call the
 * player `Ivy's godson`, so the French said `le filleul` and the rest of the
 * pack agreed with it rather than dodging. That was the right call for as long
 * as the English said it — a translation should not delete a fact.
 *
 * Flagging it got the English changed instead. It was the only line in fifteen
 * packs that stated what the player is, and it forced French, Spanish and
 * Portuguese into a choice the game makes nowhere else. Margo now names the
 * relationship from Ivy's side — `Ivy était ta marraine` — which carries the
 * identical fact, since Ivy is dead, female and known, and leaves the player
 * unmarked.
 *
 * So nothing addressed to the player agrees here. Ivy's `dear` is `mon trésor`,
 * whose own gender is fixed and says nothing about who is being addressed. The
 * coda needed no change: `plus rapide` is invariable.
 */
export const theNightRoundFr: CaseTranslation = {
  title: 'La ronde de nuit',
  blurb:
    'Une signature dans le cahier de nuit dit que quelqu’un est entré la voir à onze heures. Personne n’est entré.',

  characters: {
    you: 'Toi',
    ivy: 'Ivy',
    fen: 'Ali',
    margo: 'Margo',
    teddy: 'Teddy',
    saoirse: 'Claire',
  },

  places: {
    marchbank: 'Marchbank House',
    ivyroom: 'la chambre d’Ivy',
    corridor: 'le couloir du premier étage',
    dayroom: 'la salle commune',
    desk: 'le poste de nuit',
    carpark: 'le parking',
    fenhouse: 'la maison d’Ali',
  },

  threads: {
    't-ivy': 'Ivy',
    't-marchbank': 'Familles de Marchbank',
    't-margo': 'Margo',
    't-teddy': 'Teddy',
    't-saoirse': 'Claire Nolan',
  },

  briefing: {
    causeOfDeath: 'Insuffisance cardiaque. Elle avait quatre-vingt-quatre ans et elle avait un cœur.',
    ruling: 'Enregistré comme mort naturelle. Aucune autopsie demandée par la famille.',
    opening:
      'Ivy Rennick était à Marchbank House depuis trois ans et s’en plaignait par écrit, tous les jours, à quiconque lui donnait un numéro.\n\nSa fille lui a rendu visite le mardi soir et a signé la sortie à dix heures moins vingt. Le cahier de nuit dit que quelqu’un est entré la voir à onze heures et de nouveau à deux heures. On l’a trouvée à sept heures du matin, froide, et la famille n’a pas demandé d’autopsie.',
  },

  messages: {
    // ------------------------------------------------------------------ t-ivy
    i1: 'La soupe était la même soupe, mon trésor. Je l’ai noté. Le jeudi et le mardi, la même soupe, et il y en a une des deux qu’ils appellent bouillon.',
    i2: 'tu es la seule personne que je connaisse qui tienne un registre des soupes',
    i3: 'Je tiens un registre de tout. Ça les agace.',
    i4: 'Alison vient à sept heures. Elle a pris au téléphone cette voix qui veut dire qu’elle veut me faire signer quelque chose.',
    i5: 'ne signe rien',
    i6: 'Je n’ai rien signé depuis mars et elle le sait. C’est précisément là qu’est l’ennui.',
    i7: 'Je suis dans la salle commune avec Teddy. Il se montre désagréable à propos des mots croisés et je le laisse faire.',
    i8: 'Elle est partie. Elle est restée cinquante minutes et quarante ont porté sur les frais.',
    i9: 'Appelle-moi demain et je te dirai ce qu’elle m’a demandé. Je veux le dire à voix haute à quelqu’un qui n’est pas payé pour être ici.',
    i10: 'dès demain matin. va dormir',

    // ------------------------------------------------------------ t-marchbank
    g1: 'Ce message est pour informer les familles que nous avons perdu Ivy Rennick dans la nuit de mardi à mercredi. Sa fille a été prévenue et elle est avec nous. Nous en dirons davantage quand il y aura davantage à dire.',
    g2: 'Je suis vraiment désolée. Elle a été deux ans dans mon couloir et elle ne m’a jamais rien laissé passer !! Elle va me manquer énormément',
    g3: 'Merci à tous. Il est évident qu’à son âge ce n’était pas inattendu. Nous préférons qu’il n’y ait pas d’autopsie et je l’ai dit au médecin traitant, alors je vous prie de ne plus me le proposer.',
    g4: 'elle m’a écrit à dix heures dix. elle allait bien à dix heures dix',
    g5: 'Elle avait quatre-vingt-quatre ans. Aller bien à dix heures et être partie à minuit, c’est exactement ce qui arrive, et je te demanderais de faire attention à l’impression que tu donnes.',
    g6: 'Je suis partie à dix heures moins vingt. J’ai signé la sortie à dix heures moins vingt. À la maison à dix heures et quart, au lit à dix heures et demie. Comme toujours.',
    g7: 'Endormie depuis dix heures et demie. Mon téléphone est sur le palier, il charge sur le palier, demandez à n’importe qui me connaît.',
    g8: 'Personne n’insinue quoi que ce soit. Je demande que nous laissions une semaine à la famille.',
    g9: 'Teddy a demandé après toi. À moi il ne veut pas en parler, il dit que je suis du personnel. Il est dans la salle commune à partir de six heures tous les matins si tu veux le voir',

    // ---------------------------------------------------------------- t-margo
    m1: 'Ivy était ta marraine, n’est-ce pas ? Elle m’a montré ta photo à peu près quatre cents fois, et je n’exagère pas !',
    m2: 'qui est entré la voir cette nuit-là',
    m3: 'Moi. Je fais la ronde de onze heures et celle de deux heures dans ce couloir, c’est dans le cahier de nuit avec mes initiales. Onze heures et deux heures, tous les soirs, quatorze ans que je le fais',
    m4: 'Elle dormait. C’est ce que j’ai écrit. Endormie, tranquille, rien à signaler',
    m5: 'tu as vu quelqu’un d’autre dans le couloir',
    m6: 'J’ai entendu une voiture sortir du parking très tard. Assez tard pour que je lève la tête. On a des taxis mais pas à cette heure-là et pas avec ce moteur, c’était un diesel et il a tourné à gauche',
    m7: 'comment tu sais que c’était sa voiture',
    m8: 'Parce qu’elle vient depuis trois ans et que j’entends ce moteur depuis trois ans. Dans le groupe je ne le dirai pas et s’il te plaît ne m’y oblige pas. J’ai besoin de ce travail, j’en ai deux à la maison',
    m9: 'De toute façon j’étais au bureau avec le cahier des médicaments depuis une heure jusqu’à la relève, donc j’aurais entendu n’importe quoi d’autre',

    // ---------------------------------------------------------------- t-teddy
    t1: 'Tu as pris ton temps.',
    t2: 'Quarante et un ans de métreur. Je ne dors pas et je n’estime pas les heures à vue de nez. Si je te donne une heure, c’est une heure.',
    t3: 'Ivy est restée avec moi dans la salle commune jusqu’à dix heures moins dix. Sa fille est venue la chercher et l’a emmenée en haut. C’est la dernière chose que j’ai vue d’elle.',
    t4: 'et après ça',
    t5: 'La nuit je m’assois dans l’embrasure de la salle commune parce que mon fauteuil est là et que ma hanche est ce qu’elle est. Je vois le poste de nuit et le bas de l’escalier. J’ai tout vu.',
    t6: 'Margo n’est pas montée à onze heures. Elle est restée assise à ce poste depuis onze heures moins cinq jusqu’à onze heures vingt avec son téléphone collé à l’oreille et elle ne s’est pas levée une seule fois.',
    t7: 'Je ne te dis pas ça pour la faire renvoyer. Elle parle à sa mère à Lagos le mardi à cause du décalage. Tout le monde ici le sait et tout le monde ici la laisse faire.',
    t8: 'La fille est redescendue par l’escalier à minuit moins vingt. À onze heures et demie elle était dans ce couloir, parce que j’ai entendu la porte d’Ivy, et la porte d’Ivy attend une réparation depuis un an.',
    t9: 'Elle ne m’a pas vu. Les gens ne me voient pas. Ça a ses avantages.',
    t10: 'Ivy m’a dit en septembre qu’ils lui avaient donné un chiffre. Elle n’a pas voulu me dire lequel. Elle a dit qu’elle ne l’avait pas dit à sa fille et qu’elle n’avait pas l’intention de le faire, à cause de ce que sa fille en ferait.',

    // -------------------------------------------------------------- t-saoirse
    s1: 'Je vais te dire certaines choses et je vais faire attention, parce que j’ai vingt-neuf résidents et une autorisation à conserver.',
    s2: 'Le cahier de nuit est signé. C’est un registre. Les badges de porte en sont un autre et les deux ne concordent pas, et je ne le savais pas avant que tu me fasses aller regarder.',
    s3: 'Le badge visiteur d’Alison Reid a ouvert la porte du parking vers l’extérieur à 23:47. Il n’y a aucune lecture d’entrée avant ça, parce que la porte d’entrée est restée calée toute la soirée pour la blanchisserie, ce qui est une autre conversation que j’ai avec quelqu’un d’autre.',
    s4: 'les frais',
    s5: 'Trois mois impayés. Alison a la procuration et elle l’a depuis 2021. Je lui avais écrit deux fois et la deuxième lettre disait que si on arrivait à quatre mois j’étais tenue de faire un signalement aux services sociaux au sujet des finances.',
    s6: 'Cette lettre est partie le vendredi. Elle a dû la recevoir le lundi. Ivy est morte dans la nuit de mardi.',
    s7: 'Un signalement, ça veut dire que quelqu’un d’extérieur à ce bâtiment regarde trois ans de ce compte. Je veux être claire : je n’y ai pas pensé comme à un mobile. J’y ai pensé comme à une lettre.',
  },

  /**
   * The clock times here are digits in both languages and stay digit for digit
   * identical to the English, because these are the chips the player lays side by
   * side. The `11` in the Margo round chip is the hour she signed for rather than
   * a clock time, and it stays a bare 11 for the same reason.
   */
  claims: {
    'c-ivy-dayroom': 'Ivy : dans la salle commune, 21:00–21:50',
    'c-fen-home': 'Ali : à la maison, 22:15–24:00',
    'c-fen-asleep': 'Ali : endormie à la maison, 22:30–24:00',
    'c-margo-round': 'Margo : a fait la ronde de 11 h du soir, 23:00–23:20',
    'c-ivy-room': 'Ivy : dans sa chambre, 22:00–24:00 (selon Margo)',
    'c-fen-driving': 'Ali : quittant Marchbank en voiture, 23:25–23:45 (selon Margo)',
    'c-margo-office': 'Margo : au poste de nuit, 01:00–02:00',
    'c-teddy-dayroom': 'Teddy : dans l’embrasure de la salle commune, 23:00–00:30',
    'c-margo-desk': 'Margo : assise au poste de nuit, 23:00–23:15 (selon Teddy)',
    'c-fen-corridor': 'Ali : dans le couloir du premier étage, 23:30–23:40 (selon Teddy)',
    'c-fen-carpark': 'Ali : dans le parking, 23:47–23:57 (relevé du badge)',
  },

  motives: {
    'm-attorney':
      'Elle a la procuration depuis 2021, les frais étaient impayés depuis trois mois, et un signalement aux services sociaux au bout de quatre mois aurait mis trois ans de ce compte sous les yeux de quelqu’un d’extérieur au bâtiment.',
  },

  contradictions: {
    'x-fen-corridor':
      'Elle a signé la sortie à dix heures moins vingt et s’est placée à la maison à partir de dix heures et quart. Teddy Balfour était assis dans l’embrasure de la salle commune avec l’escalier bien en vue et il a entendu la porte d’Ivy à onze heures et demie, et cette porte attend une réparation depuis un an.',
    'x-fen-asleep':
      'Endormie depuis dix heures et demie, a-t-elle dit, avec son téléphone en charge sur le palier. Margo a entendu un moteur diesel sortir du parking à cette heure-là et tourner à gauche, et cela fait trois ans qu’elle entend ce moteur arriver.',
    'x-fen-carpark':
      'Le cahier de nuit est une signature. Le badge est une machine. Le sien a ouvert la porte du parking vers l’extérieur à 23:47, deux heures après l’heure à laquelle elle dit qu’elle était au lit et à onze milles de là où elle dit qu’elle était.',
    'x-margo-round':
      'Margo a signé la ronde de onze heures et ne l’a pas faite. Elle est restée assise au poste avec le téléphone collé à l’oreille, à parler avec sa mère à Lagos, comme elle le fait tous les mardis à cause du décalage. C’est pour ça que personne n’est entré voir Ivy pendant dix heures. C’est un motif de licenciement et ce n’est pas un meurtre, et toutes les personnes de ce bâtiment étaient au courant des appels du mardi et les lui laissaient.',
  },

  confrontation: {
    opening:
      'Tu as parlé à un homme de quatre-vingt-dix ans qui passe ses nuits assis dans une embrasure et à une aide-soignante qui a falsifié un registre. Évidemment que je vais t’écouter, mais je veux que tu entendes comment ça sonne.',
    beats: {
      'r-corridor': {
        press:
          'Tu as signé la sortie à dix heures moins vingt et tu t’es placée à la maison à partir de dix heures et quart. Teddy a entendu la porte de ta mère à onze heures et demie, et cette porte s’annonce toute seule.',
        rebuttal:
          'Il a quatre-vingt-onze ans et il reste assis dans le noir. La moitié du temps il ne sait pas quel jour on est, et tu as construit tout ça sur lui.',
      },
      'r-asleep': {
        press:
          'Tu as dit endormie depuis dix heures et demie. Margo a entendu ta voiture quitter ce parking et tourner à gauche, et cela fait trois ans qu’elle l’entend arriver toutes les semaines.',
        rebuttal: 'Un diesel. Dans une ville qui en est pleine. C’est ça que tu as.',
      },
      // r-carpark and r-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'r-carpark': {
        press:
          'Alors en voici une qui n’est pas une personne. Ton badge a ouvert la porte du parking vers l’extérieur à 23:47. La machine ne s’assoit pas dans une embrasure et la machine n’a pas besoin du travail.',
      },
      'r-why': {
        press:
          'Trois mois impayés, et la lettre de Claire disait qu’à quatre mois il fallait faire un signalement. Cette lettre t’est arrivée le lundi. Ta mère est morte le mardi.',
      },
    },
    deflections: [
      'Ce n’est pas un fait, c’est quelque chose que quelqu’un a ressenti.',
      'Tu n’étais là pour aucune de ces trois années. Tu venais en visite.',
      'Apporte-moi quelque chose qui ne dépende de la mémoire de personne.',
    ],
    confession:
      'Elle était réveillée quand je suis remontée. Elle l’était toujours. Elle a dit n’allume pas la lumière, et puis elle a dit je sais ce que tu as fait, Alison, et elle l’a dit avec douceur, ce qui a été le pire de tout.\n\nJ’ai tenu l’oreiller et j’ai compté et elle ne s’est pas débattue très longtemps. Je ne vais pas le décrire mieux que ça. J’ai eu onze semaines pour trouver une façon de le dire qui le rende plus petit et il n’y en a pas.\n\nEt je veux dire l’autre chose, parce que tu finiras par la trouver et je préfère qu’elle vienne de moi.\n\nUn homme qui se faisait appeler le Keeper m’a téléphoné le lundi soir. Il a dit qu’il était de l’équipe de soins continus. Il savait ce que disait la lettre. Il savait pour le signalement, ce que personne en dehors de ce bureau ne savait, et ensuite il m’a dit qu’on avait donné à ma mère de huit à quatorze mois en septembre et qu’elle avait demandé qu’on ne le dise pas à la famille.\n\nJe ne le savais pas. Elle ne me l’a jamais dit. Lui le savait et moi non, et il l’a dit comme on donne l’heure à quelqu’un.\n\nEnsuite il a dit : donc l’argent doit durer plus longtemps qu’elle, et la lettre passe en premier. Et j’ai dit qu’est-ce que je suis censée faire. Et il n’a pas répondu pendant un moment. Il m’a laissée dedans.\n\nEt puis il a dit, eh bien. Tu y as déjà pensé, sinon tu ne me l’aurais pas demandé.\n\nIl ne m’a jamais dit de faire quoi que ce soit. J’y suis revenue encore et encore. Pas une seule fois il ne m’a dit de faire quoi que ce soit.',
  },

  coda: {
    from: 'Numéro inconnu',
    messages: [
      'Marchbank, donc. Tu as été plus rapide cette fois. Six jours.',
      'Le vieux métreur était un coup de chance et tu ne devrais pas t’en féliciter. Il allait le dire à quelqu’un. L’aide-soignante, tu l’as bien gérée, et je l’ai remarqué.',
      'Tu voudras savoir comment j’avais le chiffre de septembre. Reste avec celle-là. C’est la question intéressante et tu ne l’as pas encore posée.',
      'Un autre numéro la prochaine fois. Comme toujours.',
    ],
  },

  epilogue:
    'Le compte a fini par être examiné. Quarante et un mille livres en trois ans, et un virement permanent vers un garde-meubles de Kilmarnock que personne n’a jamais réussi à expliquer.\n\nMargo Adeyemi a été suspendue onze jours à cause du cahier de nuit puis discrètement réintégrée, parce que Marchbank ne pouvait pas tenir le couloir sans elle et parce que vingt-neuf familles ont écrit. Elle fait toujours celle de onze heures et celle de deux heures. Maintenant elle les fait vraiment.\n\nTeddy Balfour a fait sa déposition d’une seule traite, avec les heures, et l’agent qui l’a recueillie a dit après que c’était le récit le plus net qu’on lui ait jamais donné, par quiconque, à n’importe quel âge.\n\nLe registre d’Ivy était dans le tiroir. Trois ans de notes. La dernière entrée est celle du mardi, et elle dit : Alison, 7 h du soir, veut me faire signer. Pas signé.',
};
