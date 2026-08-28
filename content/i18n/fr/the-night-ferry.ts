import type { CaseTranslation } from '../caseText';

/**
 * Case 14 — "Le ferry de nuit". French.
 *
 * THE LIE IS A DOCUMENT. He did not misremember the crossing; he read out what
 * the timetable said should have happened, which is how he has built everything
 * else about himself. So the two accounts must stay in different registers:
 * Dougie talks in confident maritime nouns he is entitled to none of, and Senga
 * answers in log entries with times attached. `capitaine au long cours` against
 * `agent du service général` is the whole of him, and both terms are the real
 * French ones so the gap between them is a fact rather than a tone.
 *
 * Digits. Three messages carry a clock and all three are Senga reading records —
 * s2 (the dropped call), s5 (lost property and the safe), s7 (the nurse signing
 * Eck in and out). Everyone else speaks in words. Hannah's own two timestamps,
 * `1730` and `2106`, stay bare four-digit ship's time in her messages, because
 * that is a purser of twenty-six years writing the way she wrote for a living,
 * and it is not the same thing as a clock in prose.
 *
 * Places, and the contraction trap. `le pont arrière` and `le Magnus Bar` are
 * the exposed ones — `du pont arrière`, `au Magnus Bar` — so the briefing says
 * `sur le pont arrière` and the chips carry `dans le Magnus Bar` whole.
 *
 *   you    → Toi          ship      → le MV Roost
 *   hannah → Maman        bar       → le Magnus Bar
 *   dougie → Dougie       afterdeck → le pont arrière
 *   marisa → Sheila       cabins    → le couloir des cabines du pont 6
 *   eck    → Eck          hospital  → l’infirmerie du bord
 *   senga  → Senga Moar   kirkwall  → Kirkwall, à quai
 *                         phone     → le téléphone de Hannah, dans une coque verte avec un oiseau dessus
 *
 * Ferry vocabulary is the real French: `commissaire de bord` for a purser,
 * `garçon de carré` for a messroom steward, `la rampe` for the linkspan and `la
 * passerelle` for a gangway — two different things, and the case turns on there
 * being nothing to rig one to. `le journal de bord` for the deck log, `le
 * registre des objets trouvés` for lost property.
 *
 * Voice. Sheila and the player run lowercase and never land a full stop. Hannah,
 * Dougie, Eck and Senga capitalise. Eck's tell is a confirming tic that closes a
 * message — `Aye.` in the English, `Voilà.` here — and he speaks in short plain
 * sentences. His Scots is not reproduced as a French dialect, because inventing
 * one would make a specific man from Shetland into a generic rustic; the
 * bluntness carries him instead.
 *
 * No arc content: pack 14 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated. s1 names the relationship from Hannah's
 * side — `parce qu’elle était ta mère` — which carries the identical fact and
 * marks nobody, and Hannah signs off `je t’embrasse` rather than anything that
 * agrees.
 */
export const theNightFerryFr: CaseTranslation = {
  title: 'Le ferry de nuit',
  blurb:
    'Il peut te dire exactement ce qu’il a fait pendant que le navire était à quai à Kirkwall. Le navire n’a jamais fait escale à Kirkwall.',

  characters: {
    you: 'Toi',
    hannah: 'Maman',
    dougie: 'Dougie',
    marisa: 'Sheila',
    eck: 'Eck',
    senga: 'Senga Moar',
  },

  places: {
    ship: 'le MV Roost',
    bar: 'le Magnus Bar',
    afterdeck: 'le pont arrière',
    cabins: 'le couloir des cabines du pont 6',
    hospital: 'l’infirmerie du bord',
    kirkwall: 'Kirkwall, à quai',
  },

  objects: {
    phone: 'le téléphone de Hannah, dans une coque verte avec un oiseau dessus',
  },

  threads: {
    't-hannah': 'Maman',
    't-crossing': 'Roost, traversée de mardi',
    't-dougie': 'Dougie Yarrow',
    't-marisa': 'Sheila',
    't-eck': 'Eck',
    't-senga': 'Senga Moar',
  },

  briefing: {
    causeOfDeath:
      'Une chute contre un aménagement de pont. Elle a été retrouvée sur le pont arrière à 23:10 par un membre d’équipage en ronde.',
    ruling:
      'Non élucidé. Il y avait force six et le pont arrière était mouillé, et les quatre premières personnes interrogées ont toutes dit le même mot, qui était accident.',
    opening:
      'Hannah Pirie a été commissaire de bord pendant vingt-six ans, sur quatre navires, et était à la retraite depuis six.\n\nElle était sur la traversée de mardi vers le nord parce que tu vis à Lerwick maintenant et elle avait un sac avec ton cadeau d’anniversaire dedans. On l’a retrouvée sur le pont arrière à onze heures dix.\n\nElle connaissait chaque pont de chaque bateau sur lequel elle a navigué et ce n’était pas une femme qui tombe.',
  },

  messages: {
    // --------------------------------------------------------------- t-hannah
    n1: 'Réservé. Mardi, une cabine et pas un fauteuil-couchette, j’ai soixante et un ans et j’ai bien mérité une porte.',
    n2: 'n’apporte rien',
    n3: 'J’ai apporté quelque chose. Arrête.',
    n4: 'Parti à 1730 pile. Toujours la seule compagnie du nord qui part quand elle dit qu’elle part.',
    n5: 'Le dîner était très bien. La houle monte et la moitié du bar est devenue très silencieuse et je m’amuse énormément.',
    n6: 'Tu ne vas pas croire qui est assis à quatre pieds de moi. Dougie Yarrow. Il était sur le Rona avec moi en 2003 et je ne l’avais pas revu depuis vingt-deux ans.',
    n7: 'qui',
    n8: 'Garçon de carré. Magnifique chanteur. Il a fait un Ewan MacColl à la fête de Noël qui a mis quatre hommes adultes en morceaux.',
    n9: 'Il est devenu un peu bizarre avec moi. Je crois que je l’ai gêné et je ne le voulais pas, j’étais seulement contente.',
    n10: 'Je sors cinq minutes à l’arrière. Ça souffle sérieusement dehors. 2106. Bonne nuit, je t’embrasse x',

    // ------------------------------------------------------------- t-crossing
    g1: 'Ce groupe est destiné aux passagers de la traversée de mardi vers le nord qui ont demandé à être tenus informés. Je suis le second officier et je l’ai créé parce que quarante d’entre vous ont appelé le bureau en une matinée.\n\nUne passagère est morte à bord mardi soir. Police Scotland a les registres du navire et parle aux gens individuellement.',
    g2: 'elle a passé deux heures dans mon bar et c’était la meilleure compagnie de ce bateau. c’est tout ce que je veux dire ici',
    g3: 'Un drame, et mes condoléances à la famille. Je dirais à tout le monde que le pont de manœuvre arrière ne devrait pas être accessible aux passagers par force six et je l’ai dit au commandant. Trente et un ans en mer et je n’ai jamais vu cette porte laissée sur le crochet.',
    g4: 'Le pont arrière est un pont passagers et il est ouvert par tous les temps en dessous de force huit. La porte n’était pas sur le crochet.',
    g5: 'dougie tu étais au bar jusqu’à neuf heures et demie tu n’as pas approché cette porte par force six',
    g6: 'S’il vous plaît, ne faites pas ça ici. Tout ce que quelqu’un a, qu’il le donne à l’officier chargé du dossier, et je transmettrai un numéro à qui en veut un.',

    // --------------------------------------------------------------- t-dougie
    d1: 'Je suis vraiment désolé pour ta perte. Ta mère et moi avons servi ensemble sur le Rona et c’était une commissaire de bord de premier ordre, et je le dirai à quiconque me le demandera.',
    d2: 'tu étais au bar avec elle',
    d3: 'J’ai pris un verre dans le Magnus Bar à partir de huit heures et demie environ. Nous avons parlé brièvement. Elle était en forme et il n’y avait absolument rien entre nous, quoi que veuille insinuer qui que ce soit dans un groupe.',
    d4: 'et après',
    d5: 'Je suis monté sur le pont pour l’escale de Kirkwall. Je le fais toujours. À quai à neuf heures et demie, et j’étais sorti au bout de la rampe à fumer à l’abri du terminal jusqu’à ce qu’on largue à onze heures moins le quart. N’importe qui qui fait cette ligne régulièrement te dira que c’est la meilleure heure de la traversée.',
    d6: 'Trente et un ans en mer, la plupart à la passerelle, et j’ai fait cette approche par pire que mardi.',
    d7: 'son téléphone était derrière le bar',
    d8: 'Parce que c’est moi qui l’y ai mis. Je suis repassé par le Magnus vers dix heures dix et il était posé sur une table près de la porte arrière dans une coque verte, et je l’ai remis à la fille de service. Je ferais la même chose pour n’importe qui.',
    d9: 'Je regarderais plus près. Il y avait mardi sur ce pont un homme avec un casier long comme le bras et tout le monde à bord connaît son nom, et je remarque que personne ne met ça dans un groupe.',

    // --------------------------------------------------------------- t-marisa
    m1: 'je fais quatre soirs par semaine derrière ce bar et on devient très bon pour savoir qui passe un bon moment. ta mère passait un bon moment',
    m2: 'elle est entrée vers huit heures et demie après son dîner et s’est assise au bout, là où il y a le rebord. elle a pris un gin pour toute la soirée et elle l’a fait durer comme une professionnelle',
    m3: 'et dougie yarrow tenait salon à ce bar depuis aberdeen. capitaine au long cours. trente et un ans. second capitaine sur les pétroliers. il m’a raconté les quatre mêmes histoires sur six traversées et j’ai ri à toutes parce que c’est le métier',
    m4: 'elle a fait dougie yarrow. tu étais sur le rona avec moi, tu faisais le carré. et elle était RAVIE. elle était tellement contente de le voir. elle a dit quelque chose sur le fait qu’il chantait à une fête de noël',
    m5: 'il y avait peut-être huit personnes à ce bout du bar. personne ne s’est moqué de lui. je veux être claire là-dessus parce que j’y ai repensé. personne ne s’est moqué',
    m6: 'il est devenu de la couleur de la moquette et il s’est assis et il n’a plus dit un mot. elle est sortie par la porte arrière vers neuf heures cinq pour prendre l’air et elle a laissé son téléphone sur mon comptoir, et je l’ai mis sur l’étagère sous la caisse',
    m7: 'il l’a suivie dehors vers neuf heures vingt. je l’ai vu passer la porte arrière parce que je débarrassais le rebord et il faut se pencher devant. il n’est pas parti deux minutes et il n’est pas parti une heure, je ne saurais pas te dire, c’était bondé',
    m8: 'il dit qu’il a remis le téléphone à dix heures dix',
    m9: 'il ne m’a rien remis du tout. demande à senga, elle a le registre des objets trouvés et elle a la caisse du bar et elle a chaque porte de ce navire sur un journal. senga moar ne devine rien du tout',
    m10: 'et avant que quelqu’un commence sur eck tulloch. tout le monde commence sur eck tulloch. il est sur ce bateau deux fois par mois et il a fait de la prison et il te le dira lui-même dans les dix premières minutes',

    // ------------------------------------------------------------------ t-eck
    e1: 'J’ai fait quatre ans à Peterhead entre 1979 et 1983 pour quelque chose que j’ai fait. Je le dis en premier pour que personne n’ait à y venir doucement. Voilà.',
    e2: 'Je fais cette traversée deux fois par mois pour voir ma sœur. Quarante ans. Je pourrais faire le tour de ce bateau les yeux fermés.',
    e3: 'tu étais sur le pont arrière',
    e4: 'Plus tôt, oui. Avant le dîner. Je sors fumer et je me tiens dans le même coin chaque fois et l’équipage le sait.',
    e5: 'À partir de neuf heures cinq j’étais à l’infirmerie avec l’infirmière pour ma tension. C’est une chose que je dois faire et elle signe le registre. J’y suis resté jusqu’à dix heures vingt-cinq parce qu’elle m’a fait asseoir jusqu’à ce que ça redescende.',
    e6: 'Elle s’appelle Bhatti. Elle l’aura écrit. Tout se note sur un bateau, c’est la seule chose avec un bateau.',
    e7: 'on a fait escale à kirkwall',
    e8: 'Non. C’est passé aux haut-parleurs à neuf heures et c’était sur les écrans toute la nuit. Rampe en panne. On a filé et on est arrivés en avance à Lerwick et j’étais sur le quai à six heures et demie avec rien d’ouvert. Voilà.',
    e9: 'N’importe qui était sur ce bateau et réveillé sait qu’on n’y est pas entrés. Il aurait fallu dormir dans une cabine porte fermée pour ne pas le savoir.',

    // ---------------------------------------------------------------- t-senga
    s1: 'Second officier, onze ans dans la compagnie. J’ai donné tout ceci à Police Scotland et je te le donne parce qu’elle était ta mère et parce que tu m’as posé une question droite.',
    s2: 'L’escale de Kirkwall a été annulée à 21:00. La rampe là-bas a eu une panne hydraulique le lundi. C’est passé deux fois aux haut-parleurs, c’était sur les écrans d’information passagers de chaque pont à partir de 21:00 et jusqu’à l’accostage, et c’est au journal de bord de la main du commandant.',
    s3: 'Nous ne nous sommes pas arrêtés. Aucune passerelle n’a été mise en place parce qu’il n’y avait rien pour la poser. Personne n’est descendu à terre, personne n’est monté à bord, et le navire n’a pas changé de cap à moins de six milles de Kirkwall.',
    s4: 'le téléphone',
    s5: 'Il est entré au registre des objets trouvés à 21:04 de l’écriture de Sheila Kinnaird, coque verte, trouvé sur le comptoir du bar. Il est resté sur l’étagère sous la caisse à partir de là et jusqu’à ce que je le lui prenne à 23:40 pour le mettre au coffre. Personne n’a remis quoi que ce soit à personne à dix heures dix.',
    s6: 'Je vais te dire la chose que personne ne t’a dite, qui est que la première idée de l’équipage a été Eck Tulloch. Il était sur le pont arrière avant le dîner, il a une condamnation de 1979, et c’est le nom qui revient sur ce navire chaque fois qu’il se passe quelque chose.',
    s7: 'Il était à l’infirmerie avec l’infirmière Bhatti de 21:05 à 22:25 et elle l’a signé à l’entrée et à la sortie. Je te dis les deux moitiés parce que je préfère que tu entendes l’accusation de ma bouche avec la réponse attachée.',
    s8: 'et yarrow',
    s9: 'Douglas Yarrow a navigué pour cette compagnie pendant neuf ans comme agent du service général et il est parti en 2011. Il n’a jamais détenu de brevet. Ce n’est pas un secret, c’est sur une liste d’équipage, et pas une personne dans ce bar n’avait de raison d’aller le vérifier.',
    s10: 'Je suis sur des navires depuis mes dix-neuf ans et j’ai rencontré beaucoup d’hommes qui ont gagné un grade en le racontant. C’est en général sans gravité et c’est en général triste. Je n’ai pas su quoi en faire et je ne sais toujours pas.',
  },

  claims: {
    'c-dougie-bar': 'Dougie : dans le Magnus Bar, 20:30–21:05 (selon Sheila)',
    'c-dougie-kirkwall': 'Dougie : à terre à Kirkwall, 21:30–22:45',
    'c-phone-dougie': 'Dougie : avait le téléphone de Hannah, 22:10–22:25',
    'c-hannah-bar': 'Hannah : dans le Magnus Bar, 20:30–21:00 (selon Sheila)',
    'c-hannah-afterdeck': 'Hannah : sur le pont arrière, 21:05–22:10 (selon Sheila)',
    'c-dougie-afterdeck': 'Dougie : sur le pont arrière, 21:35–22:00 (selon Sheila)',
    'c-eck-hospital': 'Eck : à l’infirmerie du bord, 21:05–22:25',
    'c-dougie-aboard': 'Dougie : à bord du Roost, 21:00–23:00 (selon le journal de bord)',
    'c-phone-marisa':
      'Sheila : avait le téléphone de Hannah, 21:04–23:00 (registre des objets trouvés)',
    'c-marisa-bar': 'Sheila : derrière le Magnus Bar, 20:00–23:00 (selon Senga)',
    'c-eck-afterdeck': 'Eck : sur le pont arrière, 21:30–22:00 (version de l’équipage)',
  },

  motives: {
    'm-messroom':
      'Il racontait au Magnus Bar qu’il était capitaine au long cours, trente et un ans, second capitaine sur les pétroliers, sur six traversées. Hannah Pirie avait navigué avec lui sur le Rona en 2003 et l’a reconnu, et l’a dit devant huit personnes, et était ravie de le voir. Elle n’était pas cruelle. Elle était contente.',
  },

  contradictions: {
    'x-dougie-deck':
      'Il se place à terre à Kirkwall à partir de neuf heures et demie. Sheila Kinnaird l’a vu passer la porte arrière vers neuf heures vingt, parce qu’elle débarrassait le rebord et qu’il faut se pencher devant cette porte pour le faire. Elle ne saurait pas te dire combien de temps il est resté dehors. Elle peut te dire qu’il y est allé.',
    'x-dougie-kirkwall':
      'Il n’y a pas eu d’escale à Kirkwall. La rampe est tombée en panne le lundi et l’escale a été annulée à 21:00, annoncée deux fois aux haut-parleurs et affichée sur les écrans passagers de chaque pont jusqu’à Lerwick. Aucune passerelle n’a été mise en place parce qu’il n’y avait rien pour la poser, et le navire n’a pas changé de cap à moins de six milles de l’endroit. Il était à bord pendant toute l’heure qu’il a passée à fumer au bout d’une rampe, à l’abri d’un terminal qu’il n’a jamais vu.',
    'x-phone':
      'Il lui fallait une raison d’avoir été à l’arrière, alors il en a inventé une, et il a choisi le mauvais objet. Hannah a laissé son téléphone sur le comptoir du bar en sortant prendre l’air. Il est entré au registre des objets trouvés à 21:04 de l’écriture de Sheila Kinnaird, coque verte, et il est resté sur l’étagère sous la caisse jusqu’à ce que le second officier le mette au coffre à 23:40. Il n’a rien remis à personne à dix heures dix.',
    'x-eck':
      'La première idée de l’équipage a été Eck Tulloch, parce qu’il était dehors avant le dîner, à cause de quatre ans à Peterhead en 1979, et parce que c’est le nom qui revient sur ce navire dès qu’il se passe quelque chose. Il était à l’infirmerie avec l’infirmière Bhatti de 21:05 à 22:25, signé à l’entrée et à la sortie, à rester assis jusqu’à ce que sa tension redescende.',
  },

  confrontation: {
    opening:
      'Tu ferais bien de faire attention. J’ai trente et un ans de mer et une réputation sur cette côte, et j’ai été très patient avec une famille en deuil.',
    beats: {
      'a-deck': {
        press:
          'Tu te places à terre à partir de neuf heures et demie. Sheila Kinnaird t’a vu sortir par la porte arrière vingt minutes avant ça.',
        rebuttal:
          'Une fille de trente-quatre ans, avec quatre rangs de monde au bar, par force six, en train de tenir une caisse. Je ne condamnerais pas un chien là-dessus et toi non plus.',
      },
      'a-phone': {
        press:
          'Tu as dit avoir trouvé son téléphone près de la porte arrière à dix heures dix et l’avoir remis. Il a été enregistré aux objets trouvés à neuf heures quatre et il n’a jamais quitté l’étagère sous la caisse.',
        rebuttal:
          'Alors le registre est faux, ou la fille l’a rempli en fin de service, ce qu’elles font toutes. Tu n’as jamais travaillé dans un bar.',
      },
      'a-kirkwall': {
        press:
          'Tu as passé une heure à fumer sur la rampe à Kirkwall. La rampe est tombée en panne le lundi, l’escale a été annulée à neuf heures, et le navire n’est jamais passé à moins de six milles.',
      },
      'a-why': {
        press:
          'Elle a dit que tu étais sur le Rona avec elle et que tu faisais le carré. Elle était contente de te voir. Personne à ce bar ne s’est moqué.',
      },
    },
    deflections: [
      'Demande à n’importe qui sur cette côte ce qu’il pense de Dougie Yarrow. Vas-y. Demande-leur.',
      'Tu prends la parole d’une serveuse de bar et d’un homme qui a fait quatre ans à Peterhead.',
      'Ta mère aurait honte de ce que tu fais à un homme qui a navigué avec elle.',
    ],
    confession:
      'J’ai entendu l’annonce. C’est la partie que je voudrais corriger, parce qu’on me l’a présentée deux fois maintenant comme si je l’avais dormie.\n\nJe l’ai entendue au bar à neuf heures et je l’ai entendue en entier.\n\nEt quatre jours plus tard, quand l’officier m’a demandé de rendre compte de ma soirée, j’ai ouvert les horaires sur mon téléphone et j’ai lu ce qui aurait dû se passer, et je l’ai fait sans un battement de cils, parce que c’est la version dans laquelle je vis depuis 2011 et qu’on y est plus à l’aise.\n\nElle l’a dit gentiment. Je veux que ce soit écrit. Elle a dit Dougie Yarrow, tu étais sur le Rona avec moi, tu faisais le carré, et elle était ravie, et elle le pensait, et elle m’a demandé des nouvelles de ma mère.\n\nHuit personnes. Personne ne s’est moqué. J’ai repassé ce bar visage par visage et pas un ne s’est moqué, et je veux que tu comprennes que ça a rendu les choses pires et je ne peux pas t’expliquer pourquoi.\n\nJe l’ai suivie dehors pour lui demander de ne pas le redire. C’est tout ce pour quoi je suis sorti. J’ai dit Hannah, rends-moi un service, et elle m’a regardé — et elle allait être gentille. Je la voyais se préparer à être gentille.\n\nJ’ai tendu la main et elle est partie en arrière contre l’aménagement.\n\nEt je suis resté sur ce pont sous la pluie et je n’ai pas fait une seule chose qu’un capitaine au long cours aurait faite, parce que je n’en suis pas un et je n’en ai jamais été un, et il ne reste personne en vie que ça surprendrait à part moi.\n\nJe faisais le carré.\n\nJe l’ai fait pendant neuf ans et j’étais bon, et elle se souvenait de mon chant après vingt-deux ans, et je l’ai tuée pour l’avoir dit.',
  },

  epilogue:
    'Le sac avec ton cadeau dedans était dans la cabine 6042 avec son manteau plié sur le bout de la couchette, comme elle a plié un manteau sur chaque navire où elle a travaillé.\n\nSenga Moar a témoigné pendant un jour et demi. On lui a demandé onze fois si un passager pouvait s’être trompé sur une escale, et onze fois elle a répondu que les écrans avaient passé l’avis en boucle de quatre-vingt-dix secondes sur chaque pont pendant dix heures.\n\nSheila Kinnaird fait toujours quatre soirs par semaine sur cette ligne. Elle n’a rien écrit de différent dans le registre des objets trouvés, parce qu’il n’y a jamais rien eu de faux dans la façon dont elle l’avait rempli.\n\nOn a demandé à Eck Tulloch une déposition sur ses déplacements et il en a donné une, puis il a demandé à l’officier d’y mettre que l’infirmière l’avait fait asseoir pendant quatre-vingts minutes et qu’il avait raté le foot. Il fait la traversée deux fois par mois pour voir sa sœur. Il se tient toujours dans le même coin.\n\nLe Rona a été démoli à Aliaga en 2009. Il y a une photo de son équipage à la fête de Noël 2003 dans le bureau d’Aberdeen, une quarantaine de personnes en chapeaux de papier, et ta mère est au deuxième rang.\n\nLui aussi y est. En haut à gauche, en plein chant, et chaque visage devant lui est retourné pour écouter.',
};
