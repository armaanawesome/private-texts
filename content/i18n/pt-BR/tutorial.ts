import type { CaseTranslation } from '../caseText';

/**
 * Tutorial — "Os Fornos". Brazilian Portuguese.
 *
 * Four things this had to get right, in this order.
 *
 * 1. Times. Every time in this case is stated in words, not digits — "ten past
 *    three", not 03:10 — and the whole tutorial is one woman in two places at
 *    one moment. So "ten past three" is `três e dez` in Roza's account of the
 *    smoke break (r6), `três e dez` in the player's question to Ivy (iv5), and
 *    `três e dez` in her confession. Same for `três e vinte` in Ivy's sighting
 *    (iv7), the revelation and the press. A line reading `três e meia` anywhere
 *    in that chain leaves every id, number and paragraph check green and the
 *    case unsolvable by reading, which is the only way anybody solves it. The
 *    durations too: half an hour is `meia hora`, twenty two years `vinte e dois`.
 *
 * 2. Names. Roza, Ivy, Tom Vardy, Peter Osei and Vardy’s are a family, a
 *    teenager and a business, and they stay exactly as they are. The five places
 *    are descriptions rather than names, so they are translated — "the garage on
 *    the bypass" sitting untranslated inside a Portuguese sentence reads as
 *    machine output. `o contorno` is one word doing two jobs on purpose: it is
 *    the road the garage stands on (r4) and the road Peter Osei died on (t4, the
 *    motive, the epilogue). The English rhymes those two facts with one word and
 *    the player is meant to hear it.
 *
 *    The claim chips carry every place name in full — `nos fornos`, `no posto do
 *    contorno`, `no pátio dos fundos`, `na praça do mercado`, `na Vardy’s` — so
 *    the chip and the sentence it came from say the same words. That is the only
 *    reason a player can match one against the other.
 *
 * 3. Register. Brazilian, not European: `você`, `celular`, `tá`, `pra`, `ônibus`,
 *    `freio de mão`, matching the pt-BR UI catalogue in src/i18n/strings.ts. The
 *    setting stays British — a village bakery, tea, a policeman, an island where
 *    Roza had to learn English as an adult. Nothing is converted and nothing is
 *    relocated, because converting a mile into a kilometre changes a fact rather
 *    than translating it.
 *
 * 4. Voice. Four people text differently and the difference is the character.
 *    Tom writes in full sentences with no contractions, like a man of sixty who
 *    learned to write letters. Roza is careful and correct — she learned the
 *    language as an adult and is proud of it, so she gets no slang at all. Ivy is
 *    nineteen: lowercase, accents dropped, `q`, `pq`, `vc`, `tô`/`tava` without
 *    the accent, and a `bjs` on the two messages she is frightened to send. The
 *    player is lowercase and short but spells properly, because they are thumbing
 *    a phone in the dark and are not nineteen.
 *
 * Gender. The player's gender is never stated, and Portuguese fights harder for
 * this than Spanish does. Two places forced a rephrase:
 *
 *   - `kiddo` in t3. Every Portuguese endearment a father has for a grown child
 *     is gendered — filho/filha, querido/querida, meu velho. `meu bem` is the one
 *     that inflects for nothing, and it is what a warm sixty year old actually
 *     says.
 *   - Roza's rebuttal in b-square. The English is "You have not been here in a
 *     long time. You do not know what you are looking at." A literal past
 *     participle there (`você tem estado ausente`) would have to agree, so it is
 *     rebuilt around `não aparece por aqui faz muito tempo` and `não sabe o que
 *     está olhando` — both verbs, neither of which inflects for gender.
 *
 * No arc content. The tutorial carries no Keeper, no Listener and no unknown
 * number, and cases/tutorial.test.ts enforces that on the English; the pt-BR test
 * re-checks it, because a name-drop here would spoil Pack 1 for a player who has
 * not started it.
 */
export const tutorialPtBr: CaseTranslation = {
  title: 'Os Fornos',
  blurb:
    'Comece por aqui. Seu pai morreu no pátio atrás da própria padaria e a culpa ficou com o freio de mão. Três conversas, e uma frase dentro delas que não pode ser verdade.',

  characters: {
    you: 'Você',
    tom: 'Pai',
    roza: 'Roza',
    ivy: 'Ivy',
  },

  places: {
    bakery: 'Vardy’s',
    ovens: 'os fornos',
    yard: 'o pátio dos fundos',
    square: 'a praça do mercado',
    station: 'o posto do contorno',
  },

  threads: {
    't-tom': 'Pai',
    't-roza': 'Roza Bielik',
    't-ivy': 'Ivy',
  },

  briefing: {
    causeOfDeath: 'Atropelado pela van de entregas no pátio dos fundos.',
    ruling: 'O freio de mão. Registrado como acidente, sem mais apuração.',
    opening:
      'Tom Vardy assou pão a noite inteira no alto da praça do mercado durante trinta e um anos. As duas manhãs que ele faltou foram a de depois que a mulher dele morreu e a de depois que você nasceu.\n\nEncontraram ele no pátio dos fundos às quatro e dez, com a van contra a parede e o freio de mão solto. Todo mundo foi muito gentil. Todo mundo também tem uma versão daquela noite, e uma versão não passa da palavra de alguém.',
  },

  messages: {
    // ------------------------------------------------------------------ t-tom
    t1: 'Fornos acesos. Duas horas adiantado. Não consegui dormir de novo.',
    t2: 'são 2 da manhã',
    t3: 'Aqui também são duas da manhã, meu bem. Fico nos fornos até a primeira entrega das três. Fala comigo.',
    t4: 'Passei pela curva do contorno hoje de manhã. Ela ainda deixa flores lá. Na quinta faz três anos e eu não disse uma palavra em nenhum deles.',
    t5: 'pai do que você tá falando',
    t6: 'Falei para ela hoje à noite que na segunda eu vou. Custe o que custar para nós dois.\n\nEla levou melhor do que eu esperava. Essa é a parte que não me deixa em paz.',
    t7: 'Alguém deixou a van na ladeira de novo. Eu tiro ela de lá quando a segunda fornada entrar.',
    t8: 'fico abrindo isso aqui e nunca tem nada novo',

    // ----------------------------------------------------------------- t-roza
    r1: 'Sinto muitíssimo. Eu devia ter ido até você em vez de deixar um policial te dizer isso na porta de casa. Comecei esta mensagem quatro vezes.',
    r2: 'Vinte e dois anos trabalhei ao lado do seu pai. Ele me deu emprego quando eu tinha dezenove anos e mal sabia pedir um em inglês, e nem uma vez ele me fez sentir isso.',
    r3: 'ficam me dizendo que foi o freio de mão',
    r4: 'Saí às duas e vinte para comprar leite, no posto do contorno, porque tinha acabado e ele toma leite no chá. Estava de volta antes das duas e meia.\n\nTe conto isso igual contei para eles, porque você tem que ter o mesmo que eles tiveram.',
    r5: 'Depois disso eu não saí dos fornos. Nem uma vez entre três e quatro. Se tivesse saído, teria visto ele sair.',
    r6: 'Ele saiu nos fundos para fumar por volta das três e dez. Sempre fazia isso, entre a segunda e a terceira. Ficou lá fora meia hora e eu não achei nada de mais, porque por que eu acharia.',
    r7: 'você ouviu alguma coisa',
    r8: 'Nada. O exaustor faz muito barulho e eu estava com a masseira na segunda bacia. Já passei e repassei isso na cabeça.\n\nA Ivy chegou às cinco para abrir a loja e eu mandei ela para casa. Dezenove anos. Ela não devia ter visto o pátio daquele jeito.',

    // ------------------------------------------------------------------ t-ivy
    iv1: 'oi desculpa te mandar msg sou a ivy do balcao da vardys. desculpa sei q e o pior momento possivel bjs',
    iv2: 'tudo bem. a roza disse que você estava lá às cinco',
    iv3: 'estava sim mas nao e por isso q to te escrevendo. naquela noite eu nao conseguia dormir. eu tava sentada na janela do meu quarto com a luz apagada pq tinha brigado com a minha mae e nao queria q ela soubesse q eu tava acordada',
    iv4: 'o exaustor ficou ligado o tempo todo entao eu sabia q o tom tava la dentro. da pra ouvir do outro lado da praca inteira. ficou ligado das tres ate depois das quatro quando a ambulancia chegou',
    iv5: 'a roza diz que ele estava nos fundos fumando desde as três e dez. você diz que ele não saiu da padaria',
    iv6: 'mas o patio e a padaria. vc sai pela porta dos fundos e continua dentro dela. desculpa nao to tirando sarro e q e o mesmo predio',
    iv7: 'essa e a parte q nao sai da minha cabeca. eu vi a roza na praca as tres e vinte. ela saiu pela porta da frente e deu a volta pelo lado. eu vi a cara dela embaixo do poste',
    iv8: 'ela me disse que não saiu dos fornos entre três e quatro',
    iv9: 'eu sei. falei isso pro policial e ele anotou e depois me perguntou se eu tinha bebido. nao tinha. eu tava sentada numa janela no escuro que nem uma esquisita e sei exatamente o que eu vi',
    iv10:
      'tem mais uma coisa e depois eu te deixo em paz. umas duas semanas atras o tom me perguntou como e q voce se entrega por uma coisa q voce nao fez mas que estava bem do lado. achei q ele tava falando de um filme. disse q a roza ia levar pior do que ele bjs',
  },

  /**
   * The clock times here are digits in both languages and must stay digit for
   * digit identical to the English, because these are the six lines the player
   * lays side by side on the board. Each chip also carries its place name in
   * full, so the chip and the message it came from use the same words.
   */
  claims: {
    'c-tom-ovens': 'Pai: nos fornos, 02:05–03:00',
    'c-roza-station': 'Roza: no posto do contorno, 02:20–02:45',
    'c-roza-ovens': 'Roza: nos fornos, 03:00–04:00',
    'c-tom-yard': 'Pai: no pátio dos fundos, 03:10–03:40 (segundo Roza)',
    'c-tom-bakery': 'Pai: na Vardy’s, 03:00–04:00 (segundo Ivy)',
    'c-roza-square': 'Roza: na praça do mercado, 03:15–03:30 (segundo Ivy)',
  },

  motives: {
    'm-bypass':
      'Há três anos a van da padaria atropelou um homem no contorno às quatro da manhã. Roza dirigia, Tom estava dormindo no banco do carona, e entre os dois disseram que tinha sido um cervo. Naquela semana ele disse a ela que na segunda ia à polícia.',
  },

  contradictions: {
    'x-roza-square':
      'Ela não saiu dos fornos entre três e quatro. Disse isso a um policial e depois disse isso a você.\n\nÀs três e vinte uma menina de dezenove anos sentada numa janela escura viu ela sair pela porta da frente e dar a volta pelo lado do prédio. Do lado só tem o pátio.',
  },

  confrontation: {
    opening:
      'Fala, então. Faz três dias que eu espero alguém falar, e prefiro que seja você e não um homem com uma pasta.',
    beats: {
      'b-square': {
        press:
          'Você me disse duas vezes que não saiu dos fornos entre três e quatro. Ivy viu você sair pela porta da frente às três e vinte e dar a volta pelo lado.',
        rebuttal:
          'Uma menina numa janela, no escuro, às três da manhã, que tinha acabado de ser mandada para casa de um pátio. E você põe isso contra vinte e dois anos meus.',
      },
      'b-why': {
        press:
          'Há três anos era você dirigindo aquela van no contorno. Ele estava dormindo do seu lado e vocês dois disseram que tinha sido um cervo. Ele te disse naquela noite que na segunda ele ia.',
      },
    },
    deflections: [
      'Isso não prova absolutamente nada.',
      'Você não aparece por aqui faz muito tempo. Você não sabe o que está olhando.',
      'Me pergunta uma coisa que você consiga segurar na mão.',
    ],
    confession:
      'Ele estava atrás da van com a mão na porta e nem estava com raiva de mim. É isso que eu não consigo superar. Ele se virou e disse vem ver este freio de mão, Roza, um de nós dois vai acabar se machucando.\n\nEu dei a volta pela frente e soltei ele.\n\nFaz três dias que eu digo para mim mesma que não decidi aquilo. É uma mentira do mesmo tamanho que o cervo. Eu decidi às três e dez, na pia, com as mãos dentro da água.\n\nEle me deu emprego quando eu tinha dezenove anos e não sabia pedir um direito. Eu tive uma vida inteira por causa disso. Na segunda ele ia devolver tudo, e eu não conseguia pensar além disso, e continuo não conseguindo.',
  },

  epilogue:
    'Ela contou tudo antes de a gravação começar, e depois contou de novo para a gravação sem mudar uma palavra.\n\nO homem do contorno se chamava Peter Osei. Tinha cinquenta e quatro anos e voltava a pé do turno no depósito porque o último ônibus já tinha passado. A mãe dele ainda deixa flores naquela curva todo ano. Este ano tinha dois buquês, porque o seu pai já tinha estado lá.\n\nA Vardy’s não abriu mais. Ivy arrumou emprego na padaria grande do centro comercial e diz que o pão é bom e que não é a mesma coisa. Ela te manda mensagem todo domingo desde então.',
};
