import type { CaseTranslation } from '../caseText';

/**
 * Case 6 — "La longue course". French.
 *
 * Five things this had to get right.
 *
 * 1. The alias. `le Keeper` stays English and appears exactly twice, both times
 *    after the case is already solved: once in the confession, where Graham
 *    admits the telephone call, and once in coda message three, where the caller
 *    asks the player to notice what he knew. It must not leak into a message, a
 *    revelation or the briefing — this is the second arc connection and it only
 *    works if it lands late. `le Gardien` would break recognition for French
 *    players and nothing else in the suite would fail.
 *
 * 2. The uniform. The lie is identity: eight people in identical kit, and the
 *    photographs prove eight were in the boat without proving which eight. So
 *    `la combinaison` and `le bonnet` are fixed words — Graham hands them over in
 *    g5, Carol says everyone wears them in d9, Warren identifies a man by the one
 *    missing in w4, and the revelation repeats it. If the kit is described three
 *    different ways it stops being a uniform.
 *
 * 3. Times. Everything spoken stays in words, including `onze heures zéro huit`,
 *    which the English writes out as "eleven oh eight". Exactly one thing in the
 *    whole pack is a digit clock — `11:08` in the x-saul-slipway revelation —
 *    because that is a burned-in camera timecode rather than somebody
 *    remembering, and the difference between those two is the case. A test pins
 *    it: no message may carry a digit clock.
 *
 * 4. Names and places. People keep their names, including the English's own
 *    alternation — `Em` in her thread but `Emma Kerr` when Carol is being formal,
 *    `Graham` but `Graham Brightwell` and `S. Brightwell` in the duty column.
 *
 *      you    → Toi       club      → le club
 *      hester → Pauline   boathouse → le hangar à bateaux
 *      saul   → Graham    bank      → le chemin de halage
 *      imo    → Em        slipway   → la cale
 *      warren → Warren    bar       → le bar du club
 *      dilys  → Carol     river     → la rivière
 *
 *    Every one is a word the prose actually speaks and not only a chip label:
 *    `le hangar à bateaux` in the briefing and d5, `le chemin de halage` in c6
 *    and d4, `la cale` in d2 and w4, `la rivière` in x7, `le club` in c1. `la
 *    cale` is the rowing word for a slipway and nothing else in this pack uses
 *    it for anything.
 *
 *    `le bar du club` is the one that needed a preposition chosen for it. The
 *    claim chip wanted `au bar du club`, and `au` is à + le — the contraction
 *    swallows the article, so the full name never appears in the prose and the
 *    place reads as two different rooms. `dans le bar du club` keeps the article
 *    intact, matches `dans le hangar à bateaux` beside it, and is what the
 *    English `in the clubhouse bar` was doing all along. Any language that
 *    fuses a preposition with its article has this hazard on every place name
 *    that starts with one: French au/du, Spanish al/del, Portuguese no/na/do/da,
 *    German im/am/zum.
 *
 *    Rowing vocabulary is the real French: a head race is `une tête de rivière`,
 *    the eight is `le huit senior`, five seat is `le cinq`, to feather is
 *    `plumer`, a riggers' spanner is `une clé de portant`, the spares are `les
 *    remplaçants`, and a race entry is `un engagement`. Imperial stays imperial —
 *    the river is up `deux pieds`, because converting would change a stated fact.
 *
 * 5. Voice. Pauline and Carol write in complete sentences and finish them.
 *    Graham capitalises properly and then never lands a final full stop, which is
 *    the whole of him: correct on the surface, unfinished underneath. Warren and
 *    Em both run lowercase and neither capitalises a name — `graham`, `carol`,
 *    `pauline` — and the player does the same.
 *
 * Player-addressed lines are built to avoid agreeing participles: the
 * confrontation opens `Dis ce que tu as à dire` rather than `ce que tu es venu·e
 * dire`, deflection 1 is `Tu ne mets plus les pieds ici`, and coda message two is
 * `Tu as fait preuve de gentillesse` rather than `tu as été gentil·le`.
 */
export const theLongCourseFr: CaseTranslation = {
  title: 'La longue course',
  blurb:
    'Huit personnes dans la même tenue, sur l’eau, pendant vingt-deux minutes. Les photos prouvent qu’ils étaient huit dans ce bateau. Elles ne peuvent pas prouver lesquels.',

  characters: {
    you: 'Toi',
    hester: 'Pauline',
    saul: 'Graham',
    imo: 'Em',
    warren: 'Warren',
    dilys: 'Carol',
  },

  places: {
    club: 'le club',
    boathouse: 'le hangar à bateaux',
    bank: 'le chemin de halage',
    slipway: 'la cale',
    bar: 'le bar du club',
    river: 'la rivière',
  },

  threads: {
    't-hester': 'Pauline',
    't-club': 'Ravensholt RC',
    't-dilys': 'Carol Prentice',
    't-imo': 'Em',
    't-warren': 'Warren Ako',
  },

  briefing: {
    causeOfDeath: 'Traumatisme contondant. Une clé de portant prise au râtelier près des portes.',
    ruling:
      'Non élucidé. Personne n’a été arrêté, parce que quarante et un membres étaient sur le chemin de halage et que le huit senior était sur l’eau.',
    opening:
      'Pauline Vaine était présidente du Ravensholt Rowing Club depuis dix-neuf ans et avait signé à la main tous les procès-verbaux du placard.\n\nOn l’a retrouvée dans le hangar à bateaux à midi dix le matin de la tête de rivière d’automne, les portes ouvertes et les râteliers à moitié vides.\n\nLe huit senior était sur l’eau de onze heures à onze heures vingt. Chacun d’eux a le même alibi et chacun d’eux le porte sur lui.',
  },

  messages: {
    // --------------------------------------------------------------- t-hester
    x1: 'Tu ne te souviendras pas de Dorothy Nance. Elle est venue au dîner du club en 2011 et elle est restée toute la soirée sans rien manger.',
    x2: 'la mère de robbie',
    x3: 'Elle est morte en mars et sa sœur vide la maison, et elle m’a envoyé un carton parce que mon nom est sur les procès-verbaux.',
    x4: 'Le registre de sortie de cette semaine-là est dedans. L’original, pas celui qui est allé à l’enquête. Ce ne sont pas le même registre et je les ai tous les deux sur cette table depuis mardi.',
    x5: 'différents comment',
    x6: 'On a dit à l’enquête que c’était Ken Wardle qui avait signé la sortie des bateaux ce matin-là. Ken a eu une attaque en 2013 et il est mort en 2016 et il ne pouvait contredire personne à ce moment-là.',
    x7: 'L’original porte S. Brightwell dans la colonne de permanence, de sa propre main, pour le samedi. Il avait vingt-quatre ans et il était la seule personne qualifiée sur cette berge et la rivière était montée de deux pieds.',
    x8: 'qu’est-ce que tu vas faire',
    x9: 'Le remettre au bureau du coroner lundi. Et le dire à Graham samedi, avant, parce qu’un homme a le droit de l’entendre d’une personne et pas d’une lettre.',
    x10: 'pauline ne fais pas ça toute seule dans un hangar à bateaux vide',
    x11: 'Neuf heures et le bar est plein de parents. J’ai le registre dans mon sac et je le ferai après la course des seniors quand ce sera calme.',

    // ----------------------------------------------------------------- t-club
    c1: 'Les membres auront appris entre-temps que Pauline a été retrouvée hier après-midi dans le hangar à bateaux. On me demande de dire que la police voudra parler à tous ceux qui étaient sur le site et que le club sera fermé jusqu’à nouvel ordre. Je suis désolée de le dire aussi crûment, je ne connais pas de meilleure façon.',
    c2: 'dix-neuf ans. elle a appris à plumer à la moitié d’entre vous',
    c3: 'Pour ce que ça vaut pour qui que ce soit, le huit senior a été mis à l’eau à dix heures cinquante et on n’a pas retouché la berge avant onze heures vingt. Huit d’entre nous. Ça fait donc au moins huit personnes dont on sait où elles étaient',
    c4: 'j’ai filmé toute la course depuis la berge. de la proue à la poupe, les deux berges, du début à la fin. la police a la carte',
    c5: 'Alors voilà qui règle la question. Warren a huit d’entre nous en vidéo sur toute la fenêtre et Carol a le chemin de halage',
    c6: 'J’étais sur le chemin de halage de onze heures moins vingt jusqu’à presque midi avec le tableau de départ, ce qui veut malheureusement dire que j’ai beaucoup vu tout le monde et très peu vu quoi que ce soit.',
    c7: 'Et Warren, il était où au milieu de tout ça. Parce qu’il s’est disputé avec Pauline aux tréteaux à neuf heures et demie et la moitié du club l’a entendu',
    c8: 'on s’est disputés à propos d’une sélection junior. voilà à propos de quoi on se disputait. dis le reste à voix haute graham',
    c9: 'Pas ici. S’il vous plaît.',

    // ---------------------------------------------------------------- t-dilys
    d1: 'Tu as ramé ici, n’est-ce pas. Au deux, et Pauline disait que tu avais les pires mains qu’elle ait jamais bandées et la meilleure tête qu’elle ait jamais gâchée.',
    d2: 'Je me tiens au même endroit à chaque tête de rivière, en haut de la cale où se trouve le tableau, parce que je ne peux plus faire le trajet jusqu’au départ. Ça veut dire que je vois tout le monde passer deux fois.',
    d3: 'tu as vu warren',
    d4: 'Warren Ako était sur le chemin de halage pendant toute la course avec cette caméra sur un monopode, à crier après un équipage qui ne pouvait pas l’entendre, ce qui est tout l’entraînement pour autant que je sache. Il n’a pas bougé pendant une demi-heure.',
    d5: 'Et Pauline est entrée dans le hangar à bateaux un peu avant onze heures avec son sac, et elle n’en est pas ressortie pendant que je regardais, et j’ai regardé ces portes pendant une heure sans y penser une seule fois.',
    d6: 'quelqu’un d’autre est entré',
    d7: 'Graham Brightwell, vers onze heures trois, en tenue. Je m’en souviens parce que je me suis dit qu’il était retourné chercher une clé et je n’y ai pas pensé plus que ça, et je n’ai pensé à rien d’autre depuis.',
    d8: 'il dit qu’il était dans le bateau',
    d9: 'Tout le monde dans cet équipage porte la même combinaison et le même bonnet et j’ai soixante-dix-neuf ans. Je l’ai dit à l’agent et il l’a noté et je l’entendais décider que je ne servais à rien.',
    d10: 'Demande à Emma Kerr. C’est une junior et elle était dans le vestiaire en tenue senior à dix heures et demie, et les juniors ne portent pas la tenue senior, et elle est devenue toute rouge quand je lui ai dit bonjour.',

    // ------------------------------------------------------------------ t-imo
    g1: 'désolée de ne pas avoir répondu pendant des heures. désolée. je suis restée assise à regarder ça',
    g2: 'j’ai ramé au cinq dans le huit senior à la tête de rivière. j’ai dix-neuf ans et je ne me suis jamais assise dans ce bateau de ma vie',
    g3: 'qui te l’a demandé',
    g4: 'graham. à dix heures vingt aux tréteaux. il a dit que son dos avait lâché à l’échauffement et qu’il n’y avait pas le temps de déclarer forfait et est-ce que je pouvais juste m’asseoir dedans sans en faire une histoire',
    g5: 'il m’a donné sa combinaison et son bonnet. j’ai dit et l’engagement et il a dit que c’est carol qui fait les engagements et que carol a soixante-dix-neuf ans',
    g6: 'et tu as dit oui',
    g7: 'je veux m’asseoir dans ce bateau depuis mes onze ans. il le savait. tout le monde le sait. ce n’est pas une excuse je te dis juste la vraie raison',
    g8: 'et puis pauline était morte et graham a mis dans le groupe qu’on était huit sur l’eau et j’ai compris que personne n’allait nous compter',
    g9: 'il a dit à tout le monde que j’étais sur la berge avec les remplaçants. c’est ça qui m’a rendue malade. il ne se sert pas seulement de moi il dit où j’étais',
    g10: 'je vais perdre le club hein. c’est là-dessus que je bloque et je sais comment ça sonne avec elle morte',

    // --------------------------------------------------------------- t-warren
    w1: 'il m’a mis dans ce hangar à bateaux devant tout le club. quarante secondes ça lui a pris. j’entraîne ici depuis onze ans',
    w2: 'la vidéo',
    w3: 'trente et une minutes en continu. je ne l’arrête pas, on ne peut pas l’arrêter, on perd le comptage de la cadence. et je balaie la berge entre les équipages par habitude',
    w4: 'onze heures zéro huit. je décroche de l’eau pendant à peu près quatre secondes et il y a un type sur la cale en combinaison senior avec le bonnet enlevé. c’est graham. les cheveux, la carrure, le sparadrap au poignet gauche qu’il porte depuis avril',
    w5: 'quatre secondes. je l’ai regardé environ deux cents fois maintenant et le timecode est incrusté par la caméra, ce n’est pas quelque chose que j’ai tapé',
    w6: 'pourquoi tu t’es disputé avec pauline',
    w7: 'parce que je voulais em dans le bateau senior pour le printemps et pauline a dit pas tant que graham en est le capitaine. j’ai cru qu’elle voulait dire qu’em n’était pas prête. elle voulait dire autre chose et elle ne pouvait pas encore le dire',
    w8: 'elle m’a demandé en août en quelle année j’avais commencé. j’ai dit 2014. elle a dit bien, et elle est partie, et je n’y ai pas pensé pendant quatre mois',
    w9: 'j’ai cherché robbie nance hier soir. quinze ans. il y a un banc près du départ avec son nom dessus et je crie des temps de passage par-dessus depuis onze ans',
  },

  claims: {
    'c-hester-bar': 'Pauline : dans le bar du club, 10:00–10:40',
    'c-saul-river': 'Graham : sur la rivière dans le huit, 11:00–11:22',
    'c-dilys-bank': 'Carol : sur le chemin de halage, 10:40–11:40',
    'c-warren-boathouse': 'Warren : dans le hangar à bateaux, 11:02–11:18 (selon Graham)',
    'c-warren-bank': 'Warren : sur le chemin de halage, 10:55–11:30 (selon Carol)',
    'c-hester-boathouse': 'Pauline : dans le hangar à bateaux, 10:50–11:22 (selon Carol)',
    'c-saul-boathouse': 'Graham : dans le hangar à bateaux, 11:03–11:08 (selon Carol)',
    'c-imo-river': 'Em : sur la rivière dans le huit, 11:00–11:22',
    'c-imo-bank': 'Em : sur le chemin de halage avec les remplaçants, 10:55–11:25 (selon Graham)',
    'c-saul-slipway': 'Graham : sur la cale, 11:08–11:14 (sur la vidéo)',
  },

  motives: {
    'm-nance':
      'Le registre de sortie original porte S. Brightwell dans la colonne de permanence pour le samedi où Robbie Nance s’est noyé en 2009, et pas l’entraîneur mort qu’on a donné à l’enquête. Pauline avait les deux registres sur sa table et elle les apportait au coroner le lundi.',
  },

  contradictions: {
    'x-saul-boathouse':
      'Il s’est placé sur l’eau de onze heures à onze heures vingt, avec sept témoins dans le même bateau. Carol Prentice s’est tenue en haut de la cale pendant une heure et l’a vu entrer dans ce hangar à bateaux en tenue à onze heures trois, et a pensé qu’il était retourné chercher une clé.',
    'x-imo-seat':
      'Il a dit au club qu’Emma Kerr était sur le chemin de halage avec les remplaçants. Elle était au cinq, dans sa combinaison et son bonnet, parce qu’il le lui a demandé à dix heures vingt aux tréteaux et qu’elle veut cette place depuis ses onze ans. Huit personnes sont sorties dans ce bateau et huit sont revenues. Personne ne compte jamais lesquelles.',
    'x-saul-slipway':
      'Warren Ako filme les trente et une minutes entières sans arrêter, parce qu’arrêter fait perdre le comptage de la cadence. À 11:08 il décroche de l’eau pendant quatre secondes et il y a un homme sur la cale en combinaison senior avec le bonnet enlevé, avec du sparadrap au poignet gauche qui est là depuis avril. Le timecode est incrusté par la caméra.',
    'x-warren-bank':
      'Graham a mis Warren dans le hangar à bateaux devant tout le club, en quarante secondes, sur la foi d’une dispute à propos d’une sélection junior. Warren n’a pas bougé de ce chemin de halage pendant une demi-heure et Carol l’a regardé ne pas bouger, et la vidéo qu’il était en train de faire est ce qui règle la question.',
  },

  confrontation: {
    opening:
      'Dix-neuf ans qu’elle dirigeait ce club et maintenant il y a un policier dans son bureau qui épluche les registres de procès-verbaux. Dis ce que tu as à dire.',
    beats: {
      'l-boathouse': {
        press:
          'Tu t’étais mis sur l’eau à partir de onze heures. Carol t’a vu entrer dans ce hangar à bateaux en tenue à onze heures trois et a pensé que tu étais retourné chercher une clé.',
        rebuttal:
          'Elle a soixante-dix-neuf ans et nous sommes tous habillés à l’identique. Elle l’a dit elle-même, à un policier, dans ces termes.',
      },
      'l-seat': {
        press:
          'Tu as dit au club qu’Em était sur la berge avec les remplaçants. Elle était au cinq dans ta combinaison, parce que tu le lui as demandé aux tréteaux et qu’elle veut ce bateau depuis ses onze ans.',
        rebuttal:
          'Une junior qui s’est assise dans un équipage senior sans engagement et qui a passé trois jours à chercher comment ne pas se faire exclure pour ça. Bien sûr qu’elle a une histoire maintenant.',
      },
      'l-slipway': {
        press:
          'Warren n’arrête pas la caméra, parce qu’arrêter fait perdre le comptage de la cadence. Onze heures zéro huit, quatre secondes, un homme sur la cale avec le bonnet enlevé et le sparadrap au poignet gauche. Le timecode est incrusté par la caméra.',
      },
      'l-why': {
        press:
          'Et le registre de sortie qui est sorti de la maison de Dorothy Nance porte ton nom dans la colonne de permanence pour ce samedi-là. Pas Ken Wardle. Pauline avait les deux registres sur sa table et elle allait chez le coroner le lundi.',
      },
    },
    deflections: [
      'C’est un club plein de gens qui se connaissent depuis trente ans. Tout le monde a sa version.',
      'Tu ne mets plus les pieds ici depuis que tu as arrêté de ramer. Tu ne sais pas ce qu’est cet endroit.',
      'Reviens quand tu auras autre chose que la vue de quelqu’un.',
    ],
    confession:
      'La rivière était montée de deux pieds et je les ai quand même envoyés dehors, parce qu’on avait une sélection le week-end suivant et que j’avais vingt-quatre ans et que je pensais que quinze jours sans entraînement étaient la pire chose qui puisse arriver à quelqu’un.\n\nRobbie m’a demandé de ne pas sortir. Sur le ponton, devant deux autres garçons. Il a dit l’eau a l’air rapide et j’ai dit l’eau a toujours l’air rapide, et il y est allé, parce que je le lui ai dit.\n\nKen Wardle a mis son nom dans cette colonne trois jours plus tard. Je ne le lui ai pas demandé. Il l’a fait, et il m’a dit qu’il l’avait fait, et je n’ai rien dit, et c’est toute ma défense et elle ne vaut rien.\n\nElle est entrée dans le hangar à bateaux pour me le dire à moi d’abord. Elle a dit qu’un homme a le droit de l’entendre d’une personne. Dix-neuf ans et elle pensait encore que c’était comme ça qu’on faisait les choses.\n\nEt il y a encore une chose et je vais la dire parce que tu finiras par l’apprendre.\n\nUn homme qui se faisait appeler le Keeper m’a téléphoné le jeudi. Il a dit qu’il était du bureau du coroner, qu’il faisait une révision, et est-ce que je pouvais confirmer certains détails de 2009. Et ensuite il a parlé de ce matin-là comme s’il avait été sur la berge.\n\nIl savait que Robbie avait demandé à ne pas sortir. Ça n’a jamais été dans l’enquête. Ça n’a jamais été dans le journal. Deux garçons l’ont entendu et aucun des deux ne l’a jamais dit à voix haute, j’ai vérifié, j’ai vérifié cette année-là et j’ai vérifié depuis.\n\nIl me l’a dit comme un homme qui me rappelle une chose à laquelle nous avions été tous les deux.\n\nEt ensuite il m’a demandé ce que Pauline allait faire lundi. Et je le lui ai dit. Je me suis assis dans ma cuisine et j’ai dit à une voix au téléphone exactement ce qu’elle allait faire et exactement quand, et lui ne m’a jamais rien dit.',
  },

  coda: {
    from: 'Numéro inconnu',
    messages: [
      'Ravensholt. Huit dans un bateau et personne pour compter. Celle-là est bonne et je ne l’avais pas vue venir, ce qui n’arrive plus souvent.',
      'Tu as fait preuve de gentillesse avec la petite. Je l’ai remarqué. Ça t’a coûté deux jours et moi je ne les aurais pas dépensés.',
      'Demande-toi comment le Keeper, en révisant une enquête de 2009, savait ce qui a été dit sur un ponton par un garçon de quinze ans. Deux garçons l’ont entendu. Aucun des deux ne l’a jamais répété.',
      'Tu te rapproches de la mauvaise question. Continue quand même.',
    ],
  },

  epilogue:
    'L’enquête de 2009 a été rouverte au printemps sur la foi d’un registre de sortie qui avait passé seize ans dans un carton dans la chambre d’amis de Dorothy Nance.\n\nEmma Kerr n’a pas été exclue. Carol Prentice s’est présentée devant le comité avec une déclaration écrite, en est complètement sortie, et a fini en disant que le club avait demandé à une fille de dix-neuf ans de choisir entre un bateau et un homme, et que le club pouvait difficilement se plaindre de ce qu’elle avait choisi. Em a ramé au cinq chez les seniors au printemps, avec un engagement.\n\nWarren Ako a donné à la police trente et une minutes de rivière sans coupure et quatre secondes de cale.\n\nLe sac de Pauline Vaine est resté sous les tréteaux tout ce temps. Les deux registres étaient encore dedans. Elle avait mis un trombone sur la page et écrit, au crayon, dans la marge : le dire à Graham d’abord.',
};
