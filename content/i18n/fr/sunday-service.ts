import type { CaseTranslation } from '../caseText';

/**
 * Case 8 — "L’office du dimanche". French.
 *
 * THE VOICE AXIS, chosen deliberately, because this pack does not have one.
 *
 * Five of the six write standard prose and land a full stop, so casing and
 * punctuation separate nobody — only the player, who is lowercase and never
 * terminates. Copying the usual capitals-versus-lowercase split would have
 * produced five identical voices and one exception.
 *
 * So the axis here is **what each person does with a fact**, which is already
 * what the English is doing and merely needs to survive:
 *
 *   Avril  gives the physical detail and withholds the conclusion. She describes
 *          ink, hand, numbering, a redrawn ruling — and then asks whether it
 *          means anything, because that is somebody else's job. a1 is a question.
 *   Jack   gives the observation and refuses the meaning, out loud: `Je ne dis
 *          pas ce que ça veut dire. Je dis où elle était.` He anchors dates to
 *          his own life rather than to records.
 *   Denise attaches her own standing to every fact she reports — quatre ans,
 *          trente-six ans, pas d’ici — because she has worked out that those
 *          three facts are one fact.
 *   Pam    answers every fact with length of service. Vingt-deux ans, quarante
 *          ans, depuis 1985. It is her whole argument and it is also her motive.
 *   Grace  answers with the rule and with what she failed to do. Deux ans, and
 *          doing it badly, and `ce n’est pas une règle que j’ai inventée`.
 *   You    lowercase, no terminal stop, asks the next question and nothing else.
 *
 * That split is testable and it is the characterisation, so the test pins a
 * marker for each rather than a capital letter.
 *
 * Places. `la nef`, `la sacristie` and `le clocher` are each spoken with the
 * article intact — `le clocher` matters most, since `au`/`du` would swallow it,
 * and e3 opens `Dans le clocher.` `la maison de Pam` and `le parking de
 * l’église` are defined but the English never speaks either name, so neither is
 * held to the prose rule.
 *
 *   you   → Toi      church    → St Ninian’s
 *   avril → Avril    nave      → la nef
 *   cordy → Pam      vestry    → la sacristie
 *   ines  → Grace    tower     → le clocher
 *   jack  → Jack     carpark   → le parking de l’église
 *   petra → Denise   cordyhome → la maison de Pam
 *
 * Church of England vocabulary is the real French: a churchwarden is
 * `marguillière`, the PCC is `le conseil paroissial`, the swell is `le récit`,
 * the chancel `le chœur`, the south aisle `le bas-côté sud`, and Grace is `la
 * pasteure`. The curate who wrote the four lines is `un vicaire`, which is a
 * different office and stays different.
 *
 * The two register chips are an exclusive group, so their windows overlap and
 * each label names what was asserted instead: `le 11 mars` against `n’a jamais
 * touché aux registres`. That pair is the contradiction.
 *
 * No arc content: pack 8 is standalone, so no Keeper, no Listener, no coda.
 *
 * The player's gender is never stated; deflection 1 is built as `Toi, tu
 * travailles sur du papier` rather than anything that agrees.
 */
export const sundayServiceFr: CaseTranslation = {
  title: 'L’office du dimanche',
  blurb:
    'Le registre dit qu’il y a eu un mariage cet août-là. L’homme qui a refait le toit de l’église dit qu’il n’y avait pas de toit dessus.',

  characters: {
    you: 'Toi',
    avril: 'Avril',
    cordy: 'Pam',
    ines: 'Grace',
    jack: 'Jack',
    petra: 'Denise',
  },

  places: {
    church: 'St Ninian’s',
    nave: 'la nef',
    vestry: 'la sacristie',
    tower: 'le clocher',
    carpark: 'le parking de l’église',
    cordyhome: 'la maison de Pam',
  },

  threads: {
    't-avril': 'Avril',
    't-parish': 'Conseil paroissial de St Ninian’s',
    't-petra': 'Denise',
    't-jack': 'Jack Tenby',
    't-ines': 'Grace Fowler',
  },

  briefing: {
    causeOfDeath: 'Une fracture du crâne. Elle est tombée contre le coin du coffre.',
    ruling:
      'Enregistré comme une chute. Elle avait soixante et onze ans, le sol de la sacristie est inégal, et elle était seule dans une église fermée à clé.',
    opening:
      'Avril Dacre était marguillière de St Ninian’s depuis vingt-deux ans et en était à trois mois de numérisation de quatre cents ans de registres paroissiaux pour le diocèse, page par page, sur un scanner à plat installé dans la sacristie.\n\nOn l’a retrouvée à neuf heures et demie un mardi soir, avec le registre des mariages de 1974 encore ouvert sur le bureau.\n\nC’est toi qui diriges les archives diocésaines. Elle t’écrivait toutes les semaines depuis mars et tu avais commencé à attendre ses messages.',
  },

  messages: {
    // ---------------------------------------------------------------- t-avril
    a1: 'Question pour les archives. Si une entrée dans un registre est d’une encre différente et d’une main différente de celles qui l’encadrent, est-ce une chose que vous voulez savoir, ou une chose que toutes les paroisses d’Angleterre ont ?',
    a2: 'toutes les paroisses en ont. qu’est-ce qui te gêne dans celle-là',
    a3: 'La numérotation. L’entrée 114 est glissée au-dessus de la 115 et la réglure de la page a été retracée en dessous. Quelqu’un a fait de la place.',
    a4: 'C’est un mariage. Trois août 1974. Hale et Sowerby.',
    a5: 'hale comme pam hale',
    a6: 'Sa mère et le père qu’elle a sur tous les documents qu’elle possède. Pam est née en novembre.',
    a7: 'Et j’ai passé toute ma vie dans cette paroisse et je ne saurais pas te dire ce qui cloche, alors j’ai demandé à Jack Tenby, parce que Jack se souvient de 1974 mieux que 1974 ne s’en souvient.',
    a8: 'Il m’a ri au nez. Il a dit qu’il n’y avait pas de toit sur cette église en août 1974 parce qu’il était dessus. Tous les mariages de cet été-là sont partis à St Cuthbert’s.',
    a9: 'avril. ne le dis à personne au village avant de me le dire',
    a10: 'Je l’ai dit à une personne et je ne le regrette pas. Elle a le droit de l’apprendre d’une amie et pas d’une lettre à en-tête.',
    a11: 'Je numérise ce soir. La page 114 part chez vous lundi avec le reste du lot et ensuite ce n’est plus entre mes mains mais entre les vôtres, Dieu merci.',

    // --------------------------------------------------------------- t-parish
    p1: 'Chers tous. Avril est morte dans la sacristie mardi soir. Je l’ai trouvée à neuf heures et demie en revenant chercher mon téléphone. La police est venue et elle traite ça comme une chute.',
    p2: 'Il n’y aura pas d’office ce dimanche. Je n’en suis pas capable et je ne vais pas prétendre le contraire.',
    p3: 'Vingt-deux ans qu’elle a donnés à cette église et elle est morte toute seule sur ce sol. Je n’ai pas dormi. J’étais chez moi toute la soirée avec la radio et je n’arrête pas de me dire que j’aurais pu descendre.',
    p4: 'J’étais dans le bâtiment. Je veux le dire avant que quelqu’un d’autre le dise à ma place. J’accordais le récit à partir de sept heures et je ne savais pas du tout qu’elle était dans la sacristie.',
    p5: 'Tu étais dans la nef pendant presque toute cette soirée, Denise. Tu as dû passer devant cette porte six fois.',
    p6: 'Ce n’est pas vrai et tu sais que ce n’est pas vrai, et je ne fais pas ça ici.',
    p7: 'Personne ne fait ça ici. Pam, s’il te plaît.',

    // ---------------------------------------------------------------- t-petra
    e1: 'Je suis organiste depuis quatre ans et j’ai trente-six ans et je ne suis pas d’ici, et j’ai compris cette semaine que ces trois faits n’en font qu’un.',
    e2: 'tu étais où',
    e3: 'Dans le clocher. De sept heures à huit heures dix, à accorder, la porte fermée parce que la porte doit être fermée sinon le son te revient dessus.',
    e4: 'Et ensuite je n’ai pas pu sortir. Cette porte coince depuis mars et elle est sur une liste. Jack m’a ouverte à huit heures dix et il s’est moqué de moi pendant quatre minutes d’abord.',
    e5: 'tu t’es disputée avec avril à propos du fonds de l’orgue',
    e6: 'Oui. Devant onze personnes au conseil paroissial en janvier, et j’ai dit quelque chose sur le bois mort que je donnerais beaucoup pour reprendre aujourd’hui.',
    e7: 'Elle m’a appelée le lendemain matin et m’a dit que j’avais eu raison et que j’avais été grossière dans la même phrase, et ensuite elle m’a obtenu deux mille livres sur le fonds d’entretien. Voilà qui elle était.',
    e8: 'Demande à Jack pour la porte. Demande à Jack pour n’importe quoi, franchement. Il a quatre-vingt-quatre ans et c’est la seule personne de ce village qui dit ce qu’elle a vu au lieu de ce que ça veut dire.',

    // ----------------------------------------------------------------- t-jack
    j1: 'J’ai posé ce toit en 1974 avec mon père et mon oncle Ted. Commencé la dernière semaine de juin, fini la deuxième semaine de septembre. Onze semaines et il a plu pendant six.',
    j2: 'Il n’y a pas eu de mariage dans cette église en août 1974. Il n’y a rien eu du tout dans cette église en août 1974. Elle était ouverte au ciel et il y avait des pigeons dans le chœur.',
    j3: 'tu es certain de l’année',
    j4: 'Mon père est mort en février 1975 et ce toit a été le dernier travail qu’on a fait ensemble. Je suis certain de l’année comme on est certain de son propre nom.',
    j5: 'Avril me l’a demandé en mars et je le lui ai dit et j’ai cru que c’était fini, et je suis assis là depuis mardi à regretter de ne pas avoir dit que je ne me souvenais pas.',
    j6: 'tu as fait sortir denise du clocher',
    j7: 'Huit heures dix. Ça faisait un moment qu’elle tapait dessus. Cette porte a besoin d’un loquet neuf et je l’ai sur une liste depuis mars et je vais le faire maintenant, j’imagine, par culpabilité.',
    j8: 'Et je vais te dire l’autre chose, puisque personne ne me l’a demandée et que j’attendais que quelqu’un le fasse.',
    j9: 'Pam Hale est entrée dans cette sacristie vers huit heures moins vingt. J’étais dans la nef à réparer le loquet de la porte du clocher et elle est passée devant moi et elle ne m’a pas vu, parce que personne ne voit un homme à genoux avec un tournevis.',
    j10: 'Je connais cette femme depuis qu’elle est en poussette. Je ne dis pas ce que ça veut dire. Je dis où elle était.',

    // ----------------------------------------------------------------- t-ines
    i1: 'Je suis ici depuis deux ans. C’est Avril qui me disait lequel d’entre eux croire et sur quoi, et maintenant je le fais toute seule et je le fais mal.',
    i2: 'Les registres ne sortent pas du coffre. Ce n’est pas une règle que j’ai inventée, elle est dans le règlement, et il y a un cahier où l’on signe si un registre sort.',
    i3: 'Pam a sorti le volume de 1974 le onze mars, elle a signé pour, et elle l’a gardé quatre jours. Elle est au conseil paroissial et elle faisait l’historique du tour des fleurs et je n’y ai pas pensé une seule seconde.',
    i4: 'Et quand la police lui a demandé mercredi si elle avait déjà manipulé les registres, elle a dit jamais, pas une seule fois, c’est le domaine d’Avril. J’étais debout à côté d’elle.',
    i5: 'sa voiture était là',
    i6: 'Je suis revenue chercher mon téléphone à huit heures vingt et sa voiture était sur le parking sous l’if, là où elle la met toujours, et je me souviens d’avoir été contente parce que je pensais que quelqu’un était avec Avril.',
    i7: 'Je suis entrée, j’ai pris mon téléphone sur le stand, et je suis ressortie. Je ne suis pas allée jusqu’à la sacristie. Je dois vivre avec ça et je préférerais ne pas le faire par écrit.',
    i8: 'Avril était dans cette sacristie à partir de sept heures. Elle avait le scanner et la lampe et un thermos et elle n’aurait pas bougé pour une alarme incendie.',
    i9: 'Pam Hale arrange les fleurs de cette église depuis quarante ans. Elle a une plaque avec le nom de sa mère dans le bas-côté sud. Je la regarde passer devant deux fois par semaine depuis deux ans.',
  },

  claims: {
    'c-avril-nave': 'Avril : dans la nef, 18:00–18:50',
    'c-cordy-home': 'Pam : chez elle, 19:00–21:00',
    'c-petra-nave': 'Denise : dans la nef, 19:30–20:50 (selon Pam)',
    'c-petra-tower': 'Denise : enfermée dans le clocher, 19:00–20:10 (selon Jack)',
    'c-cordy-vestry': 'Pam : dans la sacristie, 19:40–20:00 (selon Jack)',
    'c-jack-nave': 'Jack : dans la nef, 19:00–20:30',
    'c-cordy-signed-out': 'Pam : a sorti le registre de 1974, le 11 mars',
    'c-cordy-never-register': 'Pam : n’a jamais touché aux registres (sa version)',
    'c-cordy-carpark': 'Pam : sur le parking, 20:20–20:30 (selon Grace)',
    'c-ines-carpark': 'Grace : sur le parking, 20:10–20:40',
    'c-avril-vestry': 'Avril : dans la sacristie, 19:00–21:00 (selon Grace)',
  },

  motives: {
    'm-register':
      'L’entrée 114 a été glissée dans le registre des mariages de 1974 d’une autre main, et il n’y avait pas de toit sur l’église cet août-là. Son nom, son père, sa maison et quarante ans de position dans cette paroisse reposent sur quatre lignes que quelqu’un a écrites après coup, et la numérisation partait au diocèse le lundi.',
  },

  contradictions: {
    'x-cordy-vestry':
      'Elle s’est placée chez elle avec la radio de sept heures à neuf heures. Jack Tenby était à genoux dans la nef à réparer le loquet de la porte du clocher et l’a vue entrer dans la sacristie à huit heures moins vingt. Personne ne voit un homme à genoux avec un tournevis.',
    'x-cordy-register':
      'Elle a dit à la police qu’elle n’avait jamais touché aux registres, que c’était le domaine d’Avril, avec la pasteure debout à côté d’elle. Elle a sorti le volume de 1974 de ce coffre le onze mars et l’a gardé quatre jours, et il y a un cahier où l’on signe, parce que les registres ne sortent pas du coffre.',
    'x-cordy-carpark':
      'À huit heures vingt sa voiture était sous l’if là où elle la laisse toujours, et Grace l’a vue et a été contente, parce qu’elle a pensé que ça voulait dire que quelqu’un était assis avec Avril.',
    'x-petra-tower':
      'Pam a mis l’organiste dans la nef à passer devant cette porte six fois. Denise était enfermée dans le clocher à partir de sept heures avec la porte fermée parce que sinon le son revient dessus, et le loquet est cassé depuis mars. Jack l’a fait sortir à huit heures dix et s’est moqué d’elle pendant quatre minutes d’abord.',
  },

  confrontation: {
    opening:
      'Tu es dans ce village depuis neuf jours et tu as parlé à un couvreur et à une fille qui n’est pas d’ici. Je fais les fleurs de cette église depuis 1985. Vas-y.',
    beats: {
      'v-vestry': {
        press:
          'Tu étais chez toi avec la radio. Jack était dans la nef avec un tournevis et t’a vue entrer dans cette sacristie à huit heures moins vingt.',
        rebuttal:
          'Jack Tenby a quatre-vingt-quatre ans et il raconte à ce village ce qu’il a vu depuis soixante ans, et il en a vu la moitié.',
      },
      'v-register': {
        press:
          'Tu as dit à la police que tu n’avais jamais touché aux registres. Tu as sorti le volume de 1974 de ce coffre le onze mars et tu l’as gardé quatre jours, et la pasteure était debout à côté de toi quand tu l’as dit.',
        rebuttal:
          'Le tour des fleurs. Je faisais l’historique du tour des fleurs pour l’anniversaire, ce que n’importe qui de ce conseil te confirmera.',
      },
      'v-carpark': {
        press:
          'Ta voiture était sous l’if à huit heures vingt. Grace l’a vue et elle en a été contente, parce qu’elle a pensé que ça voulait dire qu’Avril n’était pas toute seule.',
      },
      'v-why': {
        press:
          'L’entrée 114 a été écrite après coup, et il n’y avait pas de toit sur cette église en août 1974. La numérisation partait au diocèse le lundi.',
      },
    },
    deflections: [
      'Ce n’est pas une preuve. C’est un village qui parle, ce qu’il fait depuis la Conquête.',
      'Toi, tu travailles sur du papier. Tu n’as aucune idée de ce que tout ça représente.',
      'Apporte-moi autre chose qu’un vieil homme à genoux.',
    ],
    confession:
      'Je l’ai appris à trente ans. Ma mère me l’a dit dans une cuisine à Bicester avec le chauffe-eau allumé, et puis elle est morte onze semaines plus tard et m’a laissée avec ça.\n\nIl n’y a pas eu de mariage. Il y avait un homme à Coventry qui ne voulait pas de moi, et un vicaire ici qui devait quelque chose à ma grand-mère, et quatre lignes écrites dans un livre en 1976 d’une main que personne n’allait jamais vérifier.\n\nEt j’arrange les fleurs de cette église depuis quarante ans, et j’ai lu la lecture à Noël, et il y a une plaque dans le bas-côté sud avec le nom de ma mère dessus, et absolument tout ça tient sur ces quatre lignes.\n\nAvril est venue me le dire elle-même. C’est la partie que je veux qu’on dise. Elle n’est pas allée au diocèse d’abord, elle est venue dans ma cuisine le dimanche et elle s’est assise et elle a dit Pam, j’ai trouvé quelque chose et je vais devoir l’envoyer, et je voulais que tu l’apprennes d’une amie.\n\nEt j’ai dit merci. J’ai vraiment dit merci.\n\nPuis le mardi je suis descendue lui demander de retenir le lot. Juste le lot. Juste jusqu’après l’anniversaire, j’ai dit, et elle a dit Pam, je ne peux pas, et elle s’est retournée vers le scanner.\n\nElle avait soixante et onze ans et j’ai posé la main sur son épaule et je ne sais pas ce que je voulais dire par là. Je me le suis dit quatre cents fois et c’est encore la seule phrase vraie que j’aie.',
  },

  epilogue:
    'Le volume de 1974 est parti aux archives diocésaines dans le lot qu’Avril avait déjà étiqueté, le lundi, parce que personne n’a pensé à l’arrêter.\n\nL’entrée 114 a été examinée en lumière rasante en juin. La réglure de la page avait été retracée au stylo à bille et l’entrée se tient à environ deux millimètres au-dessus de la ligne sur laquelle elle prétend être.\n\nJack Tenby a remplacé le loquet de la porte du clocher le jeudi, puis il a repeint toute la porte, puis il a fait le porche, et sa fille dit qu’il ne s’est pas arrêté depuis.\n\nDenise Voss a joué à l’enterrement. Elle a choisi le Bach dont Avril s’était plainte en janvier, ce que la paroisse a mis un moment à comprendre puis a compris d’un coup.',
};
