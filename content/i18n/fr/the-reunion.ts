import type { CaseTranslation } from '../caseText';

/**
 * Case 13 — "Les retrouvailles". French.
 *
 * THE TIME LIE. He did not falsify a clock, he became one: he wrote the running
 * order, moved his own speech forty-five minutes early, and ninety people now
 * date the whole evening off a sequence he authored. So the two times that do
 * the work have to stay exactly where the English puts them and in the form it
 * puts them — `neuf heures` on the programme, `huit heures et quart` when he
 * actually spoke — and the gap between them is the case. Collapse either into
 * the other and every witness statement in the pack becomes consistent again.
 *
 * Digits. Two messages carry a clock and both are machine records: Michelle's
 * catering invoice (`20:55`) and Vale's barrier log (`21:08`, `21:19`). Everyone
 * else speaks in words, because nobody at a reunion looks at a watch — which is
 * the sentence the whole pack turns on.
 *
 * `Year 4` keeps its numeral as `la 4e année`. French primary years are named
 * (CE1, CE2) rather than numbered, so the idiomatic rendering would drop the
 * digit the numbers rule protects — and a year group is exactly the kind of fact
 * that must not quietly become a different one.
 *
 * The four `with_person` claims are deliberate dead ends: the engine cannot fire
 * on co-presence, because being with one person does not exclude being with
 * another. Their labels are translated as flatly as the English so they read as
 * ordinary evidence, because a player is meant to pin them and be told that both
 * things can be true. That refusal is the emotional content of a reunion.
 *
 * Places, and the contraction trap. `le bâtiment de musique`, `le parking du
 * personnel` and `le chemin de la rivière` are all `du`-exposed, so each is
 * written somewhere it survives whole: c2, the car park chip, and the briefing.
 *
 *   you    → Toi        school     → le lycée Ardenshaw
 *   nia    → Nia        hall       → la grande salle
 *   rafe   → Mark       musicblock → le bâtiment de musique
 *   marika → Michelle   carpark    → le parking du personnel
 *   tobi   → Tobi       riverpath  → le chemin de la rivière
 *   corin  → M. Vale    branch     → l’antenne de Calderside
 *
 * The English alternates registers for the staff — `Colin Vale` from Tobi, `Mr
 * Ellory` and `Miss Boateng` and `Miss Selkirk` from Vale himself, who has
 * worked there thirty-six years and calls everybody by their title. That
 * survives as `M. Ellory`, `Mlle Boateng`, `Mlle Selkirk`, because it is how he
 * holds himself apart from the party.
 *
 * Voice. Michelle and the player are the two who run lowercase and never land a
 * full stop, and that is not decoration: she is the one who never learned to
 * perform and she is the one telling the truth the whole way through. Nia, Mark,
 * Tobi and Vale all capitalise and finish — Mark most carefully of anyone, which
 * is the thing he has built a career on.
 *
 * No arc content: pack 13 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated; the briefing takes `tu n’as jamais été
 * dans ce groupe`, where `été` does not agree.
 */
export const theReunionFr: CaseTranslation = {
  title: 'Les retrouvailles',
  blurb:
    'Quatre-vingt-dix personnes peuvent te dire avec qui elles étaient. Pas une ne peut te dire quelle heure il était.',

  characters: {
    you: 'Toi',
    nia: 'Nia',
    rafe: 'Mark',
    marika: 'Michelle',
    tobi: 'Tobi',
    corin: 'M. Vale',
  },

  places: {
    school: 'le lycée Ardenshaw',
    hall: 'la grande salle',
    musicblock: 'le bâtiment de musique',
    carpark: 'le parking du personnel',
    riverpath: 'le chemin de la rivière',
    branch: 'l’antenne de Calderside',
  },

  threads: {
    't-nia': 'Nia',
    't-year': 'Ardenshaw 2005',
    't-marika': 'Michelle',
    't-rafe': 'Mark Ellory',
    't-tobi': 'Tobi',
    't-corin': 'M. Vale',
  },

  briefing: {
    causeOfDeath:
      'Elle est tombée dans la Calder du haut de la berge. Le chemin n’est pas éclairé et la hauteur à cet endroit fait à peu près vingt pieds.',
    ruling:
      'Non élucidé. Deux personnes ont déjà dit à la police que c’est le même bras d’eau où un garçon de sa promotion s’est noyé en 2005, et toutes les deux l’ont dit sans qu’on le leur demande.',
    opening:
      'Nia Boateng enseignait la 4e année dans une école à onze milles de celle où elle était allée, et elle avait organisé les retrouvailles des vingt ans parce que personne d’autre ne l’aurait fait.\n\nOn l’a retrouvée sur le chemin de la rivière en contrebas des terrains de sport à neuf heures et demie, à trente mètres de l’endroit où Ashley Crewe est tombé dans la même rivière en juin 2005.\n\nElle t’a écrit il y a trois semaines. Tu étais dans cette promotion et tu n’as jamais été dans ce groupe, et elle a dit que c’était exactement pour ça qu’elle avait besoin de te parler.',
  },

  messages: {
    // ------------------------------------------------------------------ t-nia
    n1: 'Tu ne te souviendras pas de moi. Je me suis assise derrière toi en géographie pendant deux ans et tu dessinais sur ma trousse.',
    n2: 'je me souviens de toi',
    n3: 'J’organise les retrouvailles. Vingt ans. C’est dans la grande salle et le traiteur est celui qui a fait l’enterrement de ma tante et j’ai dû les appeler quatre fois.',
    n4: 'Je voulais te demander quelque chose et j’ai recommencé ce message à peu près neuf fois.',
    n5: 'La mère d’Ashley Crewe habite toujours Brantwood Road. La même maison. Je passe devant en allant chez ma mère et je passe devant depuis vingt ans.',
    n6: 'nia',
    n7: 'On était quatre sur cette berge et elle croit qu’il était tout seul. Elle le croit depuis vingt ans. Je lui ai écrit une lettre et elle fait huit pages et je vais la poster avant les retrouvailles parce que si j’attends après je ne le ferai pas.',
    n8: 'Je n’ai mis le nom de personne dedans. Je veux être claire là-dessus avec toi parce que je ne l’ai été avec personne d’autre. Elle dit nous. Elle dit nous du début à la fin.',
    n9: 'Elle doit savoir qu’il n’était pas tout seul dans le noir. C’est tout. C’est la seule raison pour laquelle je le fais.',
    n10: 'Postée à huit heures dix ce matin à la boîte devant le Co-op et ensuite je suis restée un peu dans ma voiture. Ouverture à sept heures si tu changes d’avis. Ça me ferait plaisir que tu viennes.',

    // ----------------------------------------------------------------- t-year
    g1: 'Tout le monde. Je vais dire ceci une fois et ensuite je vais arrêter d’utiliser ce groupe, parce que ce n’est pas l’endroit pour ça.\n\nNia est morte samedi soir. La police a déjà parlé à plusieurs d’entre nous et elle parlera à d’autres. Répondez-leur complètement et ne spéculez pas ici, s’il vous plaît.',
    g2: 'elle m’a appelée le jeudi pour demander si les tables devaient être rondes ou longues. rondes. j’ai dit rondes. c’est la dernière conversation que j’ai eue avec elle de ma vie',
    g3: 'Je n’y étais pas. Je veux le dire clairement plutôt que de laisser les gens le deviner. J’étais de garde et je l’ai appris dimanche matin par ma sœur.',
    g4: 'la police m’a demandé à quelle heure les choses s’étaient passées et je n’ai pas pu leur en donner une seule. j’ai dit après le discours. je l’ai dit pour quatre choses différentes et c’était la seule réponse que j’avais',
    g5: 'C’est ce que tout le monde a dit, et ce n’est pas une faute. Personne ne regarde sa montre à une fête. J’ai donné le déroulé à la police et je leur ai suggéré de travailler à partir de ça.',
    g6: 'mark il y a une femme morte sur la même berge qu’ashley et toi tu parles d’un déroulé',
    g7: 'Je parle du seul document que quiconque possède. Je ne ferai pas ça ici.',

    // --------------------------------------------------------------- t-marika
    k1: 'je suis restée avec elle depuis le moment où on a servi jusqu’à ce qu’elle sorte. tout le temps. on a fait le truc où on dit qu’on va chercher un verre et où on ne bouge pas pendant une heure',
    k2: 'de quoi elle parlait',
    k3: 'de sa classe. d’un garçon dedans qui ne veut pas s’asseoir. elle était vraiment heureuse et je n’arrête pas de le dire aux gens parce qu’ils veulent qu’elle ait eu peur et elle n’avait pas peur',
    k4: 'j’étais dans la grande salle de neuf heures moins le quart jusqu’à passé la demie. n’importe qui te le dira et aucun d’eux ne pourra te dire quand',
    k5: 'le discours',
    k6: 'le programme disait neuf heures. il l’a fait à huit heures et quart. je le sais parce que c’est moi qui le lui ai dit — le traiteur avait quarante minutes de retard et je suis allée le trouver et je lui ai dit fais-le maintenant pendant que les gens sont encore debout',
    k7: 'j’ai la facture sur mon téléphone. service chaud 20:55. donc n’importe qui dans cette salle qui t’a dit que quelque chose s’est passé après le discours t’a dit que ça s’est passé après huit heures et quart et il croit t’avoir dit après neuf heures',
    k8: 'personne n’a poussé ashley. j’ai besoin que tu entendes ça avant que quelqu’un te l’arrange. il est tombé du haut sur un défi et on est tous restés là à crier son nom et personne n’est allé le chercher et personne n’a appelé pendant vingt minutes. vingt minutes. c’est ça. c’est la seule chose qu’il y a jamais eu',
    k9: 'et mark a monté l’histoire sur la berge avant que l’ambulance arrive. on a dit qu’on avait appelé tout de suite. il a dit les mots le premier et nous trois on les a dits après lui et je les ai dits à un policier, à un coroner et à ma propre mère',
    k10: 'il avait dix-sept ans. moi aussi. je ne prétends pas avoir dit non',

    // ----------------------------------------------------------------- t-rafe
    r1: 'Je suis proviseur à St Cuthbert’s depuis six ans. Je le mentionne seulement pour que tu comprennes pourquoi je suis prudent, et pas parce que je pense que ça me donne droit à quoi que ce soit.',
    r2: 'J’étais dans cette grande salle de neuf heures moins le quart jusqu’à neuf heures et demie. J’étais debout devant quatre-vingt-dix personnes pendant une bonne partie du temps. Je ne crois pas qu’il existe de meilleure réponse pour qui que ce soit qui était là.',
    r3: 'c’était quand le discours',
    r4: 'Neuf heures. C’est sur le programme, il y en a deux cents d’imprimés, et je serais stupéfait que tu n’en trouves pas un dans la poche d’un manteau cet après-midi. Il a duré une vingtaine de minutes.',
    r5: 'Michelle était à côté de moi la plus grande partie de la soirée et j’étais à côté de Nia pendant un moment. C’était une salle de quatre-vingt-dix personnes qui ne s’étaient pas vues depuis leurs dix-sept ans. Personne n’a été seul une seconde.',
    r6: 'elle a écrit à la mère d’ashley crewe',
    r7: 'Elle a dit à plusieurs personnes qu’elle en avait l’intention. Je te demanderais de réfléchir à qui d’autre cette lettre faisait peur, et je commencerais par Tobi Marchetti, qui était dans cette salle samedi et qui a passé deux ans sur une ligne d’écoute et qui sait exactement comment s’asseoir avec quelqu’un et l’amener à faire quelque chose.',
    r8: 'Je suis conscient de la façon dont ça se lit. J’ai réfléchi quatre jours à savoir si je devais le dire et j’ai conclu que le taire serait pire.',
    r9: 'Ce qui s’est passé en 2005 était un accident dont quatre enfants ont été témoins. Il n’existe aucune version où quelqu’un a fait quoi que ce soit à Ashley Crewe. Je l’ai dit à toutes les personnes qui me l’ont demandé et je te le dis à toi.',

    // ----------------------------------------------------------------- t-tobi
    t1: 'Quelqu’un t’a parlé de la ligne d’écoute. Je l’entends dans la question, et je préfère y répondre directement plutôt que de te faire tourner autour.',
    t2: 'Deux ans. Un samedi sur deux, de six heures à deux heures, à l’antenne de Calderside, qui est à quarante et un milles de cette salle. J’y étais ce soir-là. Neuf sur le planning et un superviseur.',
    t3: 'mark dit que tu étais dans la salle',
    t4: 'Ah oui. J’ai dit à Nia en mars que je ne pouvais pas venir et elle a déplacé la date une fois pour essayer de me caser et n’y est pas arrivée, et elle a été adorable là-dessus.',
    t5: 'Des milliers de gens le font. Il y en a quatre cents rien que dans cette région et il y a une affiche là-dessus dans toutes les salles d’attente de médecin du pays. Ce n’est pas une chose rare à être. Ça n’a l’air rare que d’où tu te tiens.',
    t6: 'tu étais sur la berge en 2005',
    t7: 'Non. Ils étaient quatre et je n’en étais pas, et j’ai passé vingt ans à être celui qui n’était pas là, ce qui est une chose étrange à être dans une ville de cette taille.',
    t8: 'Nia m’a appelé en avril. Elle a parlé cinquante minutes et je n’ai pas dit grand-chose, ce qui est l’essentiel du métier. Elle m’a demandé à la fin si c’était égoïste de le faire, de le dire à sa mère, et j’ai dit que je ne pouvais pas répondre à ça pour elle.',
    t9: 'Va voir Colin Vale. Il a les clés de ce bâtiment depuis 1989 et c’est lui qui fermait samedi, et c’est la seule personne de toute cette histoire qui n’était pas à une fête.',

    // ---------------------------------------------------------------- t-corin
    c1: 'Je suis concierge ici depuis trente-six ans. Je ne vous ai rien enseigné à aucun d’entre vous et je connais tous vos noms.',
    c2: 'Je ne me règle pas sur la fête. Je me règle sur mes rondes. Je fais le bâtiment de musique à neuf heures et la barrière du parking est sur un registre.',
    c3: 'M. Ellory était dans le couloir du bâtiment de musique quand je suis venu fermer. Neuf heures deux ou trois. J’ai dû rester à l’attendre et il ne m’a pas entendu la première fois que je lui ai parlé.',
    c4: 'vous êtes sûr de l’heure',
    c5: 'Je suis sûr de ma ronde. Neuf heures c’est neuf heures et c’est neuf heures depuis que Mme Hartley était directrice. La fête peut être à l’heure qu’elle veut.',
    c6: 'Le registre de la barrière a sa plaque en sortie à 21:08 et en entrée à 21:19. C’est un badge et ça imprime. J’ai donné la feuille à l’agent dimanche et j’en ai gardé une photo.',
    c7: 'Mlle Selkirk était dans cette salle tout du long. J’ai passé la tête deux fois pour la porte coupe-feu et elle était à la même table les deux fois, et elle avait ses chaussures à la main.',
    c8: 'Mlle Boateng est venue me trouver vers huit heures et demie pour me dire merci. Personne ne m’a jamais dit merci à une de ces soirées. Elle a demandé des nouvelles de ma femme par son prénom et ma femme est morte il y a quatre ans et elle le savait aussi.',
    c9: 'Je l’ai vue descendre vers la rivière après ça. Je n’y ai pas prêté attention. Ils y vont tous. Cette clôture est par terre depuis 1991 et j’ai fait onze demandes.',
    c10: 'J’étais là en 2005 aussi. J’ai ouvert ce bâtiment à la police à deux heures du matin et j’ai fait une tasse de thé à quatre enfants et pas un ne l’a bue.',
  },

  claims: {
    'c-nia-hall': 'Nia : dans la grande salle, 19:00–20:40 (selon Michelle)',
    'c-marika-with-nia': 'Michelle : avec Nia, 20:45–21:30',
    'c-nia-with-marika': 'Nia : avec Michelle, 20:45–21:25',
    'c-marika-hall': 'Michelle : dans la grande salle, 20:45–21:40 (selon M. Vale)',
    'c-rafe-outside':
      'Mark : dehors près des poubelles au téléphone, 20:55–21:15 (selon Michelle)',
    'c-rafe-hall': 'Mark : dans la grande salle, 20:45–21:30',
    'c-rafe-speech': 'Mark : en train de faire le discours, 21:00–21:20',
    'c-marika-with-rafe': 'Michelle : avec Mark, 20:50–21:20 (selon Mark)',
    'c-nia-with-rafe': 'Nia : avec Mark, 20:55–21:15 (selon Mark)',
    'c-tobi-hall': 'Tobi : dans la grande salle, 20:45–21:30 (selon Mark)',
    'c-tobi-branch': 'Tobi : à l’antenne de Calderside, 20:00–22:00',
    'c-rafe-music': 'Mark : dans le bâtiment de musique, 20:58–21:06 (selon M. Vale)',
    'c-rafe-carpark':
      'Mark : dans le parking du personnel, 21:08–21:20 (registre de la barrière)',
    'c-nia-riverpath': 'Nia : sur le chemin de la rivière, 21:00–21:30 (selon M. Vale)',
  },

  motives: {
    'm-riverbank':
      'Personne n’a touché Ashley Crewe. Ils étaient quatre sur cette berge et personne n’a appelé pendant vingt minutes, et Mark Ellory a monté l’histoire avant l’arrivée de l’ambulance et a fait dire les mots aux trois autres après lui. Il est proviseur depuis six ans. Nia a posté une lettre de huit pages à la mère d’Ashley le matin des retrouvailles.',
  },

  contradictions: {
    'x-rafe-speech':
      'Le programme dit neuf heures et il y en a deux cents d’imprimés. Il a parlé à huit heures et quart, parce que le traiteur avait quarante minutes de retard et que Michelle est allée le trouver et lui a dit de le faire pendant que les gens étaient encore debout. La facture sur son téléphone porte le service chaud à 20:55. Donc chaque témoin de cette salle qui a daté quelque chose d’après le discours croit t’avoir dit après neuf heures, et t’a dit après huit heures et quart — et à neuf heures, quand il dit qu’il était debout devant quatre-vingt-dix personnes, il était dehors près des poubelles au téléphone.',
    'x-rafe-music':
      'Colin Vale ne se règle pas sur la fête. Il se règle sur ses rondes, et le bâtiment de musique est fermé à neuf heures et l’est depuis que Mme Hartley était directrice. Mark Ellory se tenait dans ce couloir à deux ou trois minutes passées, et Vale a dû l’attendre, et a dû lui parler deux fois.',
    'x-rafe-gate':
      'La barrière du parking du personnel est un badge et ça imprime. Sa plaque sort à 21:08 et rentre à 21:19. Il n’était pas dans cette salle pendant onze minutes du temps dont il a rendu compte, et la seule personne du bâtiment qui n’était pas à une fête est celle qui a gardé la feuille.',
    'x-tobi-branch':
      'Mark Ellory a mis Tobi Marchetti dans cette salle. Tobi était à quarante et un milles de là, à l’antenne de Calderside, de six heures à deux heures, sur un planning de neuf avec un superviseur, et Nia avait déplacé la date des retrouvailles une fois en essayant de le caser et n’y était pas arrivée. Quatre cents personnes sont bénévoles sur cette ligne rien que dans cette région. Ce n’est pas une chose rare à être. Ça n’a l’air rare que d’où tu te tiens.',
  },

  confrontation: {
    opening:
      'J’ai donné trente et un ans aux écoles de cette circonscription et j’aimerais que tu comprennes ce que tu proposes de démonter.',
    beats: {
      'a-speech': {
        press:
          'Tu as écrit le déroulé et ensuite tu as avancé ton propre discours de quarante-cinq minutes. Depuis samedi, chaque personne de cette salle date la soirée à partir de lui. À neuf heures tu étais dehors près des poubelles.',
        rebuttal:
          'Le traiteur était en retard. Michelle Selkirk m’a demandé de l’avancer et je l’ai avancé, devant quatre-vingt-dix personnes, ce qui est une drôle de façon de cacher quelque chose.',
      },
      'a-music': {
        press:
          'Colin Vale ferme le bâtiment de musique à neuf heures. Il t’a trouvé dans ce couloir à neuf heures trois et a dû te parler deux fois avant que tu l’entendes.',
        rebuttal:
          'Il a soixante et un ans et il promenait un trousseau de clés dans un bâtiment dans le noir. J’ai fait des allers-retours dans ce couloir toute la soirée. Il a mis deux soirées bout à bout.',
      },
      'a-gate': {
        press:
          'La barrière imprime. Ta plaque sort à 21:08 et rentre à 21:19. Onze minutes, à l’intérieur des quarante-cinq dont tu as rendu compte depuis le plancher de la salle.',
      },
      'a-why': {
        press:
          'Personne n’a poussé Ashley Crewe. Vous étiez quatre sur cette berge et personne n’a appelé pendant vingt minutes, et c’est toi qui as monté les mots avant l’arrivée de l’ambulance et les trois autres les ont dits après toi.',
      },
    },
    deflections: [
      'Tu n’étais pas dans cette promotion d’une façon qui compte. Tu étais dans la salle et tu n’étais pas dans la promotion.',
      'Un concierge, une barrière et une femme qui raconte aux gens ce qu’elle pense qu’il s’est passé sur cette berge depuis ses dix-sept ans.',
      'Amène-moi une seule personne qui m’a vu sur ce chemin.',
    ],
    confession:
      'Je suis descendu lui demander de ne pas l’envoyer.\n\nC’est toute mon intention et je sais que ça ne vaut rien maintenant. Elle m’a dit que c’était parti à huit heures dix ce matin-là, de la boîte devant le Co-op, et je ne l’ai pas crue. J’ai cru que c’était la chose qu’on dit.\n\nAlors je l’ai prise par le bras. Pour la retenir. C’est tout ce que c’était et j’ai dit cette phrase dans ma tête à peu près quatre mille fois depuis samedi et elle rétrécit à chaque fois.\n\nEt elle est tombée du haut de la berge.\n\nÀ trente mètres de l’endroit où il est tombé. Les mêmes vingt pieds. Je veux que quelqu’un l’écrive correctement parce que personne ne me l’a encore dit à voix haute et j’attends depuis quatre jours que quelqu’un le fasse.\n\nJe suis resté là.\n\nJe veux être exact, parce que j’ai passé vingt ans à être exact et c’est la seule chose à laquelle je sois bon. Je ne suis pas tombé et je n’ai pas paniqué et je n’avais pas dix-sept ans. J’en avais quarante-deux et j’avais bu deux verres de vin en quatre heures et je me suis tenu sur ce chemin et j’ai compté, et à onze minutes environ je suis remonté au parking et j’ai passé ma voiture sous une barrière qui imprime.\n\nJe l’ai fait deux fois. À vingt ans d’écart. La deuxième fois je savais exactement ce que je faisais et je l’ai fait quand même, et la seule différence entre le garçon sur cette berge et l’homme sur ce chemin, c’est que l’homme avait déjà découvert qu’il pouvait vivre avec.\n\nElle disait nous. Elle le disait dans la lettre du début à la fin et elle me l’a dit sur ce chemin, et j’ai repassé les huit pages que je n’ai jamais lues plus soigneusement que tout ce que j’ai lu de ma vie.\n\nJe ne lui ai jamais demandé ce qu’il y avait dedans. Pas une fois, en trois semaines.\n\nC’est moi qui leur ai appris ça. Sur la berge, quand on avait dix-sept ans. J’ai dit on n’en parle pas, et aucun de nous ne l’a jamais fait, et j’ai bâti une carrière sur le fait d’être un homme vers qui on peut aller, et je n’ai pas su poser une seule question directe à une femme que je connaissais depuis mes quatre ans.\n\nElle n’allait pas me nommer.\n\nJe l’ai tuée pour arrêter une lettre qui était dans une boîte aux lettres depuis huit heures dix du matin, et elle n’avait pas mon nom dedans, et elle n’allait jamais l’avoir.',
  },

  epilogue:
    'La lettre est arrivée Brantwood Road le mardi, au courrier de l’après-midi, quatre jours après la mort de Nia Boateng et deux jours avant que ce soit dans le journal local.\n\nHuit pages. Elle disait nous du début à la fin. Elle disait qu’ils étaient quatre sur la berge et qu’Ashley n’était pas tout seul dans le noir et qu’ils avaient crié son nom jusqu’à ne plus s’entendre, et elle disait que personne n’y était allé et que personne n’avait appelé pendant vingt minutes, et elle disait que Nia était désolée d’une façon qui ne demandait pas à être pardonnée.\n\nSheila Crewe l’a gardée dans le tiroir avec les torchons pendant un mois avant de la donner à qui que ce soit.\n\nMichelle Selkirk est entrée au commissariat d’Ardenshaw le mercredi matin avec la facture sur son téléphone et une déclaration qu’elle avait écrite à la main la veille au soir, corrigeant celle qu’elle avait faite en 2005 quand elle avait dix-sept ans. Le coroner a rouvert le dossier sur cette base. Ça n’a rien changé à la façon dont Ashley Crewe est mort et ça a tout changé aux vingt dernières minutes de sa vie, ce sur quoi le dossier se trompait.\n\nTobi Marchetti a fait sa garde le samedi. Il a dit après qu’il avait pensé à ne pas y aller et qu’il y était allé, parce que neuf sur un planning c’est neuf sur un planning.\n\nColin Vale a fait une douzième demande pour la clôture. Elle a été posée en novembre.',
};
