import type { CaseTranslation } from '../caseText';

/**
 * Case 8 — "O Culto de Domingo". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The forged entry. The case is a document against a living memory, so the
 *    document has to stay countable: `assento 114` squeezed above `115`, the ink,
 *    the redrawn ruling, and `agosto de 1974`. Those numbers recur in Avril's
 *    question, in the motive, in the press and in the epilogue, and they are what
 *    the player holds against Jack saying the church had no roof that summer.
 *
 * 2. Church words, in the Portuguese a parish actually uses rather than literal
 *    ones: `o livro paroquial` for the register, `a sacristia` for the vestry,
 *    `a nave` for the nave, `o conselho paroquial` for the PCC, `a vigária` for
 *    Grace, `a zeladora da paróquia` for Avril the churchwarden, `o fundo de
 *    obras` for the fabric fund, `o coadjutor` for the curate. `o expressivo` is
 *    the organ division Denise is tuning, which is what a Brazilian organist calls
 *    the swell.
 *
 * 3. Names and places. People keep their names: Avril Dacre, Pam Hale, Jack Tenby,
 *    Grace Fowler, Denise Voss, and St Ninian’s and St Cuthbert’s with them.
 *    Descriptive places are translated, each a phrase the prose says:
 *
 *      you   → Você      church    → St Ninian’s
 *      avril → Avril     nave      → a nave
 *      cordy → Pam       vestry    → a sacristia
 *      ines  → Grace     tower     → a torre
 *      jack  → Jack      carpark   → o estacionamento da igreja
 *      petra → Denise    cordyhome → a casa da Pam
 *
 *    Money stays sterling and the parish stays English: `duas mil libras` out of
 *    the fabric fund, a diocese, a vicar, the Conquest.
 *
 * 4. Voice, and this pack needed a different axis from every other one so far.
 *    Every single non-player character here writes in complete sentences and lands
 *    a full stop — churchwarden, vicar, organist, builder and Pam alike — so
 *    casing and punctuation separate nobody. The axis is what each of them does
 *    with a fact:
 *
 *      Avril asks the archive a procedural question and states evidence without
 *        drawing the conclusion (`Alguém abriu espaço.`).
 *      Grace apologises for her own competence and keeps saying how long she has
 *        been here, because it is two years and everybody knows it.
 *      Pam speaks for the parish and counts years of service at people.
 *      Denise is thirty-six, not from here, and says the quiet thing plainly.
 *      Jack refuses to interpret. `Eu não estou dizendo o que aquilo significa.
 *        Estou dizendo onde ela estava.` is the whole man.
 *
 *    The player is lowercase and short, alone in the pack.
 *
 * 5. Gender. The player is unmarked and no rephrase was forced: every line
 *    addressed to them runs on verbs — `Você dirige`, `Você está nesta vila`,
 *    `Você lida com papel`. Swept in the test so it stays that way.
 *
 * No arc content. Pack 8 is standalone: no Keeper, no coda.
 *
 * On the two register chips: `c-cordy-signed-out` and `c-cordy-never-register` are
 * an exclusive group, so their windows overlap as machinery and each label names
 * what was *asserted* — `11 de março` against `nunca mexeu nos livros`. That pair
 * is the contradiction, and labelling the window instead would make it invisible.
 */
export const sundayServicePtBr: CaseTranslation = {
  title: 'O Culto de Domingo',
  blurb:
    'O livro paroquial diz que houve um casamento naquele agosto. O homem que refez o telhado da igreja diz que não havia telhado nenhum nela.',

  characters: {
    you: 'Você',
    avril: 'Avril',
    cordy: 'Pam',
    ines: 'Grace',
    jack: 'Jack',
    petra: 'Denise',
  },

  places: {
    church: 'St Ninian’s',
    nave: 'a nave',
    vestry: 'a sacristia',
    tower: 'a torre',
    carpark: 'o estacionamento da igreja',
    cordyhome: 'a casa da Pam',
  },

  threads: {
    't-avril': 'Avril',
    't-parish': 'Conselho paroquial de St Ninian’s',
    't-petra': 'Denise',
    't-jack': 'Jack Tenby',
    't-ines': 'Grace Fowler',
  },

  briefing: {
    causeOfDeath: 'Fratura de crânio. Ela caiu contra a quina do cofre.',
    ruling:
      'Registrado como queda. Ela tinha setenta e um anos, o piso da sacristia é irregular, e ela estava sozinha numa igreja trancada.',
    opening:
      'Avril Dacre era zeladora da paróquia de St Ninian’s havia vinte e dois anos e estava no terceiro mês de digitalização de quatrocentos anos de livros paroquiais para a diocese, página por página, num escâner de mesa na sacristia.\n\nEla foi encontrada nove e meia de uma terça à noite, com o livro de casamentos de 1974 ainda aberto na mesa.\n\nVocê dirige o arquivo diocesano. Ela mandava e-mail para você toda semana desde março e você tinha começado a esperar por eles.',
  },

  messages: {
    // ---------------------------------------------------------------- t-avril
    a1: 'Pergunta para o arquivo diocesano. Se um assento num livro está numa tinta diferente e numa letra diferente dos assentos de cima e de baixo, isso é uma coisa que vocês querem saber, ou uma coisa que toda paróquia da Inglaterra tem?',
    a2: 'toda paróquia tem alguma. o que te incomodou nesse aí',
    a3: 'A numeração. O assento 114 está espremido acima do 115 e o pautado da página foi redesenhado embaixo dele. Alguém abriu espaço.',
    a4: 'É um casamento. Três de agosto de 1974. Hale e Sowerby.',
    a5: 'hale de pam hale',
    a6: 'A mãe dela e o pai que ela tem em todo documento que possui. A Pam nasceu em novembro.',
    a7: 'E eu vivi nesta paróquia a vida inteira e não saberia te dizer o que há de errado com aquilo, então perguntei ao Jack Tenby, porque o Jack lembra de 1974 melhor do que 1974 lembra.',
    a8: 'Ele riu de mim. Disse que não havia telhado naquela igreja em agosto de 1974 porque ele estava em cima dela. Todo casamento daquele verão foi para St Cuthbert’s.',
    a9: 'avril. não conta pra ninguém da vila antes de contar pra mim',
    a10: 'Eu contei para uma pessoa e não me arrependo. Ela tem o direito de ouvir isso de uma amiga e não de uma carta com brasão em cima.',
    a11: 'Digitalizando hoje à noite. A página 114 vai para você na segunda com o resto do lote e aí sai das minhas mãos e vai para as suas, graças a Deus.',

    // --------------------------------------------------------------- t-parish
    p1: 'Prezados. A Avril morreu na sacristia na terça à noite. Eu a encontrei nove e meia quando voltei para pegar meu celular. A polícia já esteve aqui e está tratando como queda.',
    p2: 'Não haverá culto neste domingo. Eu não tenho condição de conduzir e não vou fingir o contrário.',
    p3: 'Vinte e dois anos ela deu a esta igreja e morreu sozinha naquele chão. Eu não dormi. Fiquei em casa a noite inteira com o rádio ligado e fico pensando que eu podia ter descido até lá.',
    p4: 'Eu estava dentro do prédio. Quero dizer isso antes que outra pessoa diga por mim. Eu estava afinando o expressivo desde as sete e não sabia que ela estava na sacristia.',
    p5: 'Você ficou na nave a maior parte daquela noite, Denise. Você deve ter passado por aquela porta umas seis vezes.',
    p6: 'Isso não é verdade e você sabe que não é verdade, e eu não vou fazer isso aqui.',
    p7: 'Ninguém vai fazer isso aqui. Pam, por favor.',

    // ---------------------------------------------------------------- t-petra
    e1: 'Eu sou organista há quatro anos e tenho trinta e seis anos e não sou daqui, e esta semana eu descobri que esses três fatos são um fato só.',
    e2: 'onde você estava',
    e3: 'Na torre. Das sete até oito e dez, afinando, com a porta fechada porque a porta tem que estar fechada senão o som volta na sua cara.',
    e4: 'E aí eu não consegui sair. Aquela porta emperra desde março e está numa lista. O Jack me tirou de lá oito e dez e riu de mim por quatro minutos antes.',
    e5: 'você discutiu com a avril por causa do fundo do órgão',
    e6: 'Discuti. Na frente de onze pessoas no conselho paroquial em janeiro, e eu falei uma coisa sobre madeira podre que eu daria muito para poder retirar agora.',
    e7: 'Ela me ligou na manhã seguinte e disse que eu tinha razão e tinha sido grosseira na mesma frase, e depois conseguiu duas mil libras do fundo de obras para mim. Ela era assim.',
    e8: 'Pergunta ao Jack sobre a porta. Pergunta ao Jack sobre qualquer coisa, sinceramente. Ele tem oitenta e quatro anos e é a única pessoa desta vila que diz o que viu em vez de dizer o que aquilo significa.',

    // ----------------------------------------------------------------- t-jack
    j1: 'Eu botei aquele telhado em 1974 com o meu pai e o meu tio Ted. Começamos na última semana de junho, terminamos na segunda semana de setembro. Onze semanas e choveu em seis delas.',
    j2: 'Não houve casamento nenhum naquela igreja em agosto de 1974. Não houve nada nenhum naquela igreja em agosto de 1974. Ela estava aberta para o céu e tinha pombo no presbitério.',
    j3: 'você tem certeza do ano',
    j4: 'O meu pai morreu em fevereiro de 1975 e aquele telhado foi o último serviço que a gente fez junto. Eu tenho certeza do ano do mesmo jeito que você tem certeza de qual é o seu nome.',
    j5: 'A Avril me perguntou em março e eu contei e achei que aquilo tinha acabado ali, e estou sentado aqui desde terça desejando ter dito que não lembrava.',
    j6: 'você tirou a denise da torre',
    j7: 'Oito e dez. Ela estava batendo naquela porta havia um tempo. Aquela porta quer um trinco novo e eu tenho isso numa lista desde março e agora eu vou fazer, imagino, por culpa.',
    j8: 'E eu vou te contar a outra coisa, já que ninguém me perguntou e eu venho esperando que alguém pergunte.',
    j9: 'A Pam Hale entrou naquela sacristia lá pelas vinte pras oito. Eu estava na nave mexendo no trinco da porta da torre e ela passou por mim e não me viu, porque ninguém enxerga um homem de joelhos com uma chave de fenda.',
    j10: 'Eu conheço aquela mulher desde que ela estava no carrinho de bebê. Eu não estou dizendo o que aquilo significa. Estou dizendo onde ela estava.',

    // ----------------------------------------------------------------- t-ines
    i1: 'Estou aqui há dois anos. A Avril era quem me dizia em qual deles acreditar sobre o quê, e agora eu estou fazendo isso sozinha e fazendo mal.',
    i2: 'Os livros não saem do cofre. Isso não é uma regra que eu inventei, está no regimento, e existe um caderno onde você assina se algum sai.',
    i3: 'A Pam retirou o volume de 1974 no dia onze de março, assinou por ele, e ficou com ele quatro dias. Ela é do conselho paroquial e estava fazendo o histórico da escala das flores e eu não pensei nisso um segundo sequer.',
    i4: 'E quando a polícia perguntou a ela na quarta se ela já tinha mexido nos livros alguma vez, ela disse nunca, nenhuma vez, aquilo é área da Avril. Eu estava de pé do lado dela.',
    i5: 'o carro dela estava lá',
    i6: 'Eu voltei para pegar o celular oito e vinte e o carro dela estava no estacionamento da igreja, embaixo do teixo, onde ela sempre deixa, e eu lembro de ter ficado contente porque achei que tinha alguém com a Avril.',
    i7: 'Eu entrei, peguei o celular na banca, e saí de novo. Eu não fui até a sacristia. Eu tenho que viver com isso e prefiro não fazer isso por escrito.',
    i8: 'A Avril ficou naquela sacristia desde as sete. Ela estava com o escâner e a luminária e uma garrafa térmica e não teria saído nem por alarme de incêndio.',
    i9: 'A Pam Hale arruma as flores daquela igreja há quarenta anos. Ela tem uma placa com o nome da mãe dela na nave lateral sul. Eu vi essa mulher passar na frente daquela placa duas vezes por semana durante dois anos.',
  },

  /**
   * The chips are digits in both languages and stay digit for digit identical to
   * the English. The two register chips are an exclusive group sharing overlapping
   * windows, so each names the assertion rather than the window — `11 de março`
   * against `nunca mexeu nos livros`, which is the contradiction itself.
   */
  claims: {
    'c-avril-nave': 'Avril: na nave, 18:00–18:50',
    'c-cordy-home': 'Pam: em casa, 19:00–21:00',
    'c-petra-nave': 'Denise: na nave, 19:30–20:50 (segundo Pam)',
    'c-petra-tower': 'Denise: trancada na torre, 19:00–20:10 (segundo Jack)',
    'c-cordy-vestry': 'Pam: na sacristia, 19:40–20:00 (segundo Jack)',
    'c-jack-nave': 'Jack: na nave, 19:00–20:30',
    'c-cordy-signed-out': 'Pam: retirou o livro de 1974, 11 de março',
    'c-cordy-never-register': 'Pam: nunca mexeu nos livros (versão dela)',
    'c-cordy-carpark': 'Pam: no estacionamento, 20:20–20:30 (segundo Grace)',
    'c-ines-carpark': 'Grace: no estacionamento, 20:10–20:40',
    'c-avril-vestry': 'Avril: na sacristia, 19:00–21:00 (segundo Grace)',
  },

  motives: {
    'm-register':
      'O assento 114 foi espremido no livro de casamentos de 1974 numa letra diferente, e não havia telhado naquela igreja naquele agosto. O nome dela, o pai dela, a casa dela e quarenta anos de posição naquela paróquia se apoiam em quatro linhas que alguém escreveu depois do fato, e a digitalização ia para a diocese na segunda.',
  },

  contradictions: {
    'x-cordy-vestry':
      'Ela se colocou em casa com o rádio ligado das sete até as nove. Jack Tenby estava de joelhos na nave mexendo no trinco da porta da torre e viu ela entrar na sacristia vinte pras oito. Ninguém enxerga um homem de joelhos com uma chave de fenda.',
    'x-cordy-register':
      'Ela disse à polícia que nunca tinha mexido nos livros, que aquilo era área da Avril, com a vigária de pé do lado dela. Ela retirou o volume de 1974 daquele cofre no dia onze de março e ficou com ele quatro dias, e existe um caderno onde você assina, porque os livros não saem do cofre.',
    'x-cordy-carpark':
      'Oito e vinte o carro dela estava embaixo do teixo onde ela sempre deixa, e Grace viu e ficou contente, porque achou que aquilo significava que tinha alguém sentado com a Avril.',
    'x-petra-tower':
      'Pam colocou a organista na nave passando por aquela porta seis vezes. Denise ficou trancada na torre desde as sete com a porta fechada porque senão o som volta na sua cara, e o trinco está quebrado desde março. Jack tirou ela de lá oito e dez e riu dela por quatro minutos antes.',
  },

  confrontation: {
    opening:
      'Você está nesta vila há nove dias e andou conversando com um pedreiro e com uma moça que não é daqui. Eu arrumo as flores daquela igreja desde 1985. Pode falar.',
    beats: {
      'v-vestry': {
        press:
          'Você estava em casa com o rádio ligado. O Jack estava na nave com uma chave de fenda e viu você entrar naquela sacristia vinte pras oito.',
        rebuttal:
          'Jack Tenby tem oitenta e quatro anos e vem contando àquela vila o que ele viu há sessenta anos, e metade daquilo ele viu mesmo.',
      },
      'v-register': {
        press:
          'Você disse à polícia que nunca tinha mexido nos livros. Você retirou o volume de 1974 daquele cofre no dia onze de março e ficou com ele quatro dias, e a vigária estava de pé do seu lado quando você disse aquilo.',
        rebuttal:
          'A escala das flores. Eu estava fazendo o histórico da escala das flores para o aniversário, o que qualquer pessoa daquele conselho vai te confirmar.',
      },
      // v-carpark and v-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence, so there is nothing here
      // to translate and a line would break the scene.
      'v-carpark': {
        press:
          'O seu carro estava embaixo do teixo oito e vinte. A Grace viu e ficou aliviada, porque achou que significava que a Avril não estava sozinha.',
      },
      'v-why': {
        press:
          'O assento 114 foi escrito depois do fato, e não havia telhado naquela igreja em agosto de 1974. A digitalização ia para a diocese na segunda.',
      },
    },
    deflections: [
      'Isso não é prova. Isso é uma vila falando, coisa que ela faz desde a Conquista.',
      'Você lida com papel. Você não faz ideia do que é nada disso.',
      'Me traga alguma coisa que não seja um velho de joelhos.',
    ],
    confession:
      'Eu descobri quando tinha trinta anos. A minha mãe me contou numa cozinha em Bicester com o aquecedor ligado, e depois morreu onze semanas mais tarde e me deixou segurando aquilo.\n\nNão houve casamento. Houve um homem em Coventry que não me queria, e um coadjutor daqui que devia alguma coisa à minha avó, e quatro linhas escritas dentro de um livro em 1976 numa letra que ninguém ia conferir nunca.\n\nE eu arrumo as flores daquela igreja há quarenta anos, e eu li a leitura no Natal, e tem uma placa na nave lateral sul com o nome da minha mãe, e cada pedacinho disso se apoia naquelas quatro linhas.\n\nA Avril veio me contar pessoalmente. Essa é a parte que eu quero dita. Ela não foi à diocese primeiro, ela veio na minha cozinha no domingo e sentou e disse Pam, eu encontrei uma coisa e vou ter que mandar, e eu queria que você ouvisse de uma amiga.\n\nE eu disse obrigada. Eu disse obrigada mesmo.\n\nAí na terça eu desci para pedir que ela segurasse o lote. Só o lote. Só até depois do aniversário, eu disse, e ela disse Pam, eu não posso, e se virou para o escâner.\n\nEla tinha setenta e um anos e eu botei a mão no ombro dela e eu não sei o que eu queria dizer com aquilo. Eu já disse isso para mim mesma quatrocentas vezes e continua sendo a única frase verdadeira que eu tenho.',
  },

  epilogue:
    'O volume de 1974 foi para o arquivo diocesano no lote que a Avril já tinha etiquetado, na segunda, porque ninguém pensou em segurar.\n\nO assento 114 foi examinado sob luz rasante em junho. O pautado da página tinha sido redesenhado a caneta esferográfica e o assento fica uns dois milímetros acima da linha em que finge estar.\n\nJack Tenby trocou o trinco da porta da torre na quinta, e depois repintou a porta inteira, e depois fez o alpendre, e a filha dele diz que ele não parou mais.\n\nDenise Voss tocou no funeral. Ela escolheu o Bach de que a Avril tinha reclamado em janeiro, o que a paróquia levou um tempo para entender e depois entendeu de uma vez.',
};
