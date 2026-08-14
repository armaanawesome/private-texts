import type { CaseTranslation } from '../caseText';

/**
 * Tutorial — "Le fournil". French.
 *
 * Three things this had to get right, in this order.
 *
 * 1. Times. Every time in the English survives unchanged and in the same
 *    grammatical position, because the whole case is one person in two places at
 *    one moment. "ten past three" is `trois heures dix` in Roza's account of the
 *    smoke break, 03:10 on the claim chip, and `trois heures dix` again in her
 *    confession. If any one of those three drifts, the player is comparing two
 *    different facts and every engine test still passes. Durations too: half an
 *    hour is `une demi-heure`, twenty two years is `vingt-deux ans`.
 *
 *    Note the digits. The English states almost every time in words and puts
 *    digits only on the claim chips, so the French does the same — writing
 *    `03:10` inside a message would add a number the English never had.
 *
 * 2. Names. Roza, Ivy, Tom Vardy, Peter Osei and Vardy’s stay exactly as they
 *    are: those are two people, a family and a business. The places are
 *    translated, because they are descriptions rather than names, and "the garage
 *    on the bypass" sitting untranslated inside a French sentence reads as
 *    machine output. Whichever way each one went, the chip and the sentence use
 *    the same words, which is the only reason a player can match one to the
 *    other. `la rocade` is the road Peter Osei died on and the road the garage is
 *    on, and it is one word in both places for exactly that reason.
 *
 *    The setting stays British, as the Spanish kept it — Vardy’s, the market
 *    square, the bypass. So the language Roza could barely ask for a job in is
 *    still `anglais`, not `français`. Moving her to France would quietly rewrite
 *    who she is.
 *
 * 3. Voice. Four people text differently and the difference is the character.
 *    Tom writes in full sentences and keeps every `ne` of his negations, like a
 *    man of sixty who learned to write letters. Roza is careful and correct — she
 *    learned the language as an adult and is proud of it, so she keeps her `ne`
 *    too, and her sentences are the most fully built in the case. Ivy is
 *    nineteen: lowercase, accents dropped, `ne` dropped, `pcq` for `parce que`,
 *    and a `bisous` at the end of the two messages she is frightened to send. The
 *    player is lowercase and short, because they are typing on a phone in the
 *    dark — but their accents stay on, which is the one thing separating their
 *    lowercase from Ivy's.
 *
 * `kiddo` is `mon trésor`. Almost every French endearment a father has for a
 * grown child picks a gender — `mon grand`, `ma grande`, `mon petit` — and the
 * player's gender is never stated in this case. The same rule quietly shapes
 * deflection 1, which is built around `tu ne mets plus les pieds ici` precisely
 * so that no past participle has to agree with the player.
 */
export const tutorialFr: CaseTranslation = {
  title: 'Le fournil',
  blurb:
    'Commence ici. Ton père est mort dans la cour derrière sa propre boulangerie et on a tout mis sur le dos du frein à main. Trois conversations, et une phrase dedans qui ne peut pas être vraie.',

  characters: {
    you: 'Toi',
    tom: 'Papa',
    roza: 'Roza',
    ivy: 'Ivy',
  },

  places: {
    bakery: 'Vardy’s',
    ovens: 'le fournil',
    yard: 'la cour de derrière',
    square: 'la place du marché',
    station: 'la station-service de la rocade',
  },

  threads: {
    't-tom': 'Papa',
    't-roza': 'Roza Bielik',
    't-ivy': 'Ivy',
  },

  briefing: {
    causeOfDeath: 'Renversé par la camionnette de livraison dans la cour de derrière.',
    ruling: 'Le frein à main. Classé en accident, sans autre enquête.',
    opening:
      'Tom Vardy a fait le pain toute la nuit en haut de la place du marché pendant trente et un ans. Les deux seuls matins qu’il a manqués sont celui d’après la mort de sa femme et celui d’après ta naissance.\n\nOn l’a retrouvé dans la cour de derrière à quatre heures dix, la camionnette contre le mur et le frein à main desserré. Tout le monde a été très gentil. Tout le monde a aussi sa version de cette nuit-là, et une version n’est jamais que la parole de quelqu’un.',
  },

  messages: {
    // ------------------------------------------------------------------ t-tom
    t1: 'Les fours sont allumés. J’ai deux heures d’avance sur moi-même. Encore une nuit sans dormir.',
    t2: 'il est 2h du matin',
    t3: 'Il est deux heures du matin ici aussi, mon trésor. Je suis au fournil jusqu’à la première livraison de trois heures. Parle-moi.',
    t4: 'Ce matin je suis passé devant le virage de la rocade. Elle y dépose toujours des fleurs. Jeudi, cela fera trois ans, et je n’ai pas dit un mot, pas une seule fois, pendant tout ce temps.',
    t5: 'papa de quoi tu parles',
    t6: 'Je lui ai dit ce soir que j’y vais lundi. Quoi que cela nous coûte à tous les deux.\n\nElle l’a pris mieux que je ne pensais. C’est cette partie-là qui ne me laisse pas tranquille.',
    t7: 'Quelqu’un a encore laissé la camionnette dans la pente. Je la déplacerai quand la deuxième fournée sera au four.',
    t8: 'je continue à ouvrir cette conversation et il n’y a jamais rien de nouveau',

    // ----------------------------------------------------------------- t-roza
    r1: 'Je suis vraiment désolée. J’aurais dû venir te le dire moi-même au lieu de laisser un policier te l’annoncer sur le pas de ta porte. J’ai recommencé ce message quatre fois.',
    r2: 'Vingt-deux ans que je travaille aux côtés de ton père. Il m’a donné du travail quand j’avais dix-neuf ans et que je savais à peine le demander en anglais, et pas une seule fois il ne me l’a fait sentir.',
    r3: 'tout le monde me répète que c’était le frein à main',
    r4: 'Je suis sortie à deux heures vingt chercher du lait, à la station-service de la rocade, parce qu’il n’y en avait plus et qu’il en met dans son thé. J’étais rentrée avant deux heures et demie.\n\nJe te le raconte comme je le leur ai raconté, parce que tu dois l’avoir comme eux l’ont eu.',
    r5: 'Après ça, je n’ai pas quitté le fournil. Pas une seule fois entre trois heures et quatre heures. Si je l’avais fait, je l’aurais vu sortir.',
    r6: 'Il est sorti derrière fumer sa cigarette vers trois heures dix. Il le faisait toujours, entre la deuxième et la troisième fournée. Il est resté dehors une demi-heure et je n’y ai pas prêté attention, parce que pourquoi l’aurais-je fait.',
    r7: 'tu as entendu quelque chose',
    r8: 'Rien. La hotte fait énormément de bruit et j’avais le pétrin sur le deuxième bac. J’y ai repensé et repensé.\n\nIvy est arrivée à cinq heures pour ouvrir la boutique et je l’ai renvoyée chez elle. Dix-neuf ans. Elle n’aurait pas dû voir la cour comme ça.',

    // ------------------------------------------------------------------ t-ivy
    iv1: 'salut desolee de t’ecrire comme ca je suis ivy celle du comptoir chez vardys. desolee je sais que c’est vraiment le pire moment bisous',
    iv2: 'pas de souci. roza m’a dit que tu étais là à cinq heures',
    iv3: 'oui mais c’est pas pour ca que je t’ecris. cette nuit la je dormais pas. j’etais assise a ma fenetre lumiere eteinte pcq je m’etais engueulee avec ma mere et je voulais pas qu’elle sache que j’etais debout',
    iv4: 'la hotte a tourne tout le temps donc je savais que tom etait dedans. on l’entend de l’autre bout de la place. ca a tourne de trois heures jusqu’a apres quatre heures quand l’ambulance est arrivee',
    iv5: 'roza dit qu’il était derrière en train de fumer à partir de trois heures dix. toi tu dis qu’il n’a jamais quitté la boulangerie',
    iv6: 'mais la cour c’est la boulangerie. tu sors par la porte de derriere et t’es toujours dedans. desolee je dis pas ca pour etre penible c’est juste le meme batiment',
    iv7: 'c’est ce truc la qui me sort pas de la tete. j’ai vu roza sur la place a trois heures vingt. elle est sortie par la porte de devant et elle a fait le tour par le cote. j’ai vu son visage sous le lampadaire',
    iv8: 'elle m’a dit qu’elle n’a pas quitté le fournil entre trois heures et quatre heures',
    iv9: 'je sais. je l’ai dit au policier, il l’a note et apres il m’a demande si j’avais bu. j’avais pas bu. j’etais assise a une fenetre dans le noir comme une taree et je sais exactement ce que j’ai vu',
    iv10:
      'y a encore un truc et apres je te laisse tranquille. il y a deux semaines tom m’a demande comment on se livre a la police pour un truc qu’on a pas fait mais qu’on avait juste a cote de soi. je croyais qu’il parlait d’un film. il a dit que roza le prendrait plus mal que lui bisous',
  },

  /**
   * The clock times here are digits in both languages and must stay digit for
   * digit identical to the English, because these are the six lines the player
   * lays side by side on the board.
   */
  claims: {
    'c-tom-ovens': 'Papa : au fournil, 02:05–03:00',
    'c-roza-station': 'Roza : à la station-service de la rocade, 02:20–02:45',
    'c-roza-ovens': 'Roza : au fournil, 03:00–04:00',
    'c-tom-yard': 'Papa : dehors dans la cour de derrière, 03:10–03:40 (selon Roza)',
    'c-tom-bakery': 'Papa : chez Vardy’s, 03:00–04:00 (selon Ivy)',
    'c-roza-square': 'Roza : sur la place du marché, 03:15–03:30 (selon Ivy)',
  },

  motives: {
    'm-bypass':
      'Il y a trois ans, la camionnette de la boulangerie a renversé un homme sur la rocade à quatre heures du matin. C’est Roza qui conduisait, Tom dormait sur le siège passager, et à eux deux ils ont dit que c’était un cerf. Cette semaine-là, il lui a annoncé qu’il irait à la police le lundi.',
  },

  contradictions: {
    'x-roza-square':
      'Elle n’a pas quitté le fournil entre trois heures et quatre heures. Elle l’a dit à un policier, puis elle te l’a dit à toi.\n\nÀ trois heures vingt, une fille de dix-neuf ans assise à une fenêtre sombre l’a vue sortir par la porte de devant et faire le tour du bâtiment par le côté. Par le côté, il n’y a que la cour.',
  },

  confrontation: {
    opening:
      'Dis-le, alors. Ça fait trois jours que j’attends que quelqu’un le dise, et je préfère que ce soit toi plutôt qu’un homme avec un dossier.',
    beats: {
      'b-square': {
        press:
          'Tu m’as dit deux fois que tu n’avais pas quitté le fournil entre trois heures et quatre heures. Ivy t’a vue sortir par la porte de devant à trois heures vingt et faire le tour par le côté.',
        rebuttal:
          'Une gamine à une fenêtre, dans le noir, à trois heures du matin, qu’on venait de renvoyer d’une cour. Et tu mettrais ça dans la balance contre vingt-deux ans de ma vie.',
      },
      'b-why': {
        press:
          'Il y a trois ans, c’est toi qui conduisais cette camionnette sur la rocade. Il dormait à côté de toi et tous les deux vous avez dit que c’était un cerf. Cette nuit-là, il t’a dit qu’il irait lundi.',
      },
    },
    deflections: [
      'Ça ne prouve absolument rien.',
      'Ça fait très longtemps que tu ne mets plus les pieds ici. Tu ne sais pas ce que tu regardes.',
      'Demande-moi quelque chose que tu peux tenir dans la main.',
    ],
    confession:
      'Il était derrière la camionnette, la main sur la portière, et il n’était même pas en colère contre moi. C’est ça que je n’arrive pas à dépasser. Il s’est retourné et il a dit viens voir ce frein à main, Roza, l’un de nous deux va finir par se faire mal.\n\nJ’ai fait le tour par devant et je l’ai desserré.\n\nÇa fait trois jours que je me répète que je ne l’ai pas décidé. C’est un mensonge de la même taille que le cerf. Je l’ai décidé à trois heures dix, devant l’évier, les mains dans l’eau.\n\nIl m’a donné du travail quand j’avais dix-neuf ans et que je ne savais pas le demander correctement. J’ai eu une vie entière grâce à ça. Lundi, il allait tout rendre, et je n’arrivais pas à penser plus loin que ça, et je n’y arrive toujours pas.',
  },

  epilogue:
    'Elle a tout raconté avant que le magnétophone soit en marche, puis elle a tout raconté à nouveau pour le magnétophone sans changer un mot.\n\nL’homme de la rocade s’appelait Peter Osei. Il avait cinquante-quatre ans et il rentrait chez lui à pied après son poste à l’entrepôt parce que le dernier bus était passé. Sa mère dépose encore des fleurs à ce virage tous les ans. Cette année il y en avait deux bouquets, parce que ton père était déjà venu.\n\nVardy’s n’a jamais rouvert. Ivy a pris un travail à la grande boulangerie de la zone commerciale et dit que le pain est bon et que ce n’est pas pareil. Elle t’écrit tous les dimanches depuis.',
};
