import type { CaseTranslation } from '../caseText';

/**
 * Case 12 — "A Linha de Escuta". Brazilian Portuguese.
 *
 * Register first, because this is the pack where a flippant word does the most
 * damage. Beacon is a listening charity and the Portuguese is the register a
 * Brazilian listening service uses: `o plantão` for a shift, `o posto` for the
 * branch, `a linha de escuta` for the line, `ouvinte treinado` for a trained
 * listener, `a escala` for the rota, `o livro de plantão` for the duty book.
 * Callers stay unnamed and off the page exactly as in the English, there is no
 * method detail anywhere, and nothing anybody says about the work is arch.
 *
 * Five things after that.
 *
 * 1. The call that was never made. The alibi is ninety minutes written by hand,
 *    and the three things that disprove it stay exact: `noventa minutos` in his
 *    own hand (b4, p2), four unlit lamps for an hour (y5), and the phone bill
 *    that says all four lines carried nothing (p3). The charity's greatest virtue
 *    is the alibi — nothing is recorded — so the proof has to come from a lamp
 *    board from 1990, a bill, and a door.
 *
 * 2. Alun does the pause in writing. His tell is the ellipsis: b3 and b7 both
 *    break mid-sentence, and his first deflection is `Mm.` before a question. He
 *    is a trained listener and he listens at people, including at the player.
 *    That is the axis, because every non-player character in this pack writes in
 *    complete sentences and lands a full stop, so casing separates nobody.
 *
 *    The others divide by what they reach for: Connie names the ethical problem
 *    and does not soften it, Sunny says the actual thing out loud, Yusuf keeps
 *    saying it was his fourth shift, and Prem reaches for a document every time.
 *
 * 3. Names and places. People keep theirs: Constance Bawa, Alun Meredith, Yusuf
 *    Kaya, Sunniva Halvorsen, Prem Chandrasekaran, and Beacon with them.
 *    Descriptive places translated, each a phrase the prose says:
 *
 *      you    → Você      branch     → o posto
 *      connie → Connie    callroom   → a sala de atendimento
 *      alun   → Alun      office     → o escritório
 *      yusuf  → Yusuf     kitchen    → a cozinha
 *      sunny  → Sunny     backstairs → a escada dos fundos
 *      prem   → Prem      sunnyhome  → o apartamento da Sunny
 *
 *    Every one of those begins with an article, and Portuguese fuses articles
 *    into no, na, do, da, pelo, pela, ao, à. A chip reading `o escritório` beside
 *    prose that only ever says `no escritório` still contains the full name, but
 *    the test asserts the raw string rather than trusting that.
 *
 * 4. Only Prem writes a clock in digits — `02:10`, `03:40`, `02:55`, `03:05` —
 *    because he is the one holding the duty book and the alarm panel. Everybody
 *    else speaks their times. That split is why a fob log outranks twenty-two
 *    years of trust.
 *
 * 5. The arc. `o Keeper` stays in English and appears exactly as often as the
 *    English says it: twice in the confession and once in the coda. Clue 5 is the
 *    one that narrows him to a person — Alun recognised the technique while it
 *    was being used on him, because he taught it.
 *
 * Gender. The player is unmarked. One rephrase was forced, in c1: `Are you awake`
 * wants `acordado`/`acordada`, so Connie asks `Você ainda está de pé`, which
 * inflects for nothing and keeps her dry opening intact.
 */
export const theHelplinePtBr: CaseTranslation = {
  title: 'A Linha de Escuta',
  blurb:
    'Toda ligação é registrada à mão e ninguém nunca teve motivo para conferir nenhuma. O álibi dele são noventa minutos numa linha que não estava em uso.',

  characters: {
    you: 'Você',
    connie: 'Connie',
    alun: 'Alun',
    yusuf: 'Yusuf',
    sunny: 'Sunny',
    prem: 'Prem',
  },

  places: {
    branch: 'o posto',
    callroom: 'a sala de atendimento',
    office: 'o escritório',
    kitchen: 'a cozinha',
    backstairs: 'a escada dos fundos',
    sunnyhome: 'o apartamento da Sunny',
  },

  threads: {
    't-connie': 'Connie',
    't-branch': 'Voluntários do Beacon',
    't-yusuf': 'Yusuf',
    't-sunny': 'Sunny',
    't-prem': 'Prem Chandrasekaran',
  },

  briefing: {
    causeOfDeath:
      'Traumatismo craniano. Existe um degrau para descer até aquele escritório e ele está no mapa de riscos desde 2019.',
    ruling:
      'Registrado como queda. Dois voluntários estavam de plantão e os dois estavam nos telefones, que é o que o livro de plantão diz.',
    opening:
      'O Beacon mantém uma linha de escuta em duas salas acima de uma loja de carpetes. Nada é gravado, nada é rastreável, e toda ligação é registrada à mão depois por quem atendeu, que é a promessa em que a coisa inteira se apoia.\n\nConstance Bawa era diretora de voluntários havia onze anos. Foi encontrada no escritório às sete da manhã, quando a dupla do dia chegou.\n\nVocê fez quatro anos naquela linha antes de se mudar, e foi ela que te treinou.',
  },

  messages: {
    // --------------------------------------------------------------- t-connie
    c1: 'Você ainda está de pé, ou agora você é uma pessoa com emprego normal. Eu tenho uma coisa e queria falar com alguém que fez o treinamento.',
    c2: 'pode falar',
    c3: 'Uma pessoa ligou para a linha do escritório semana passada para agradecer. Não para a linha de escuta. Para a linha do escritório, de dia, pedindo por um voluntário pelo primeiro nome.',
    c4: 'ai não',
    c5: 'Ela tinha o número de celular dele. Tem esse número há dois anos. Ela achou que eu ia ficar contente e não conseguiu entender por que eu fiquei calada.',
    c6: 'É o Alun. Vinte e dois anos, dois plantões de madrugada por semana, o melhor ouvinte que eu já coloquei naquela linha, e ele vem dando o número dele para as pessoas desde mais ou menos 2011, pelo que eu consigo apurar.',
    c7: 'por que ele faria isso',
    c8: 'Porque no fim de uma ligação você desliga o telefone e não fica sabendo. É esse o trabalho e é a parte mais difícil do trabalho e todo mundo que já fez isso já ficou de pé naquela cozinha às quatro da manhã querendo saber.',
    c9: 'Ele quis saber. Então parou de desligar o telefone.',
    c10: 'você tem que levar isso ao conselho',
    c11: 'Eu tenho, e isso vai acabar com ele, e o Prem vai ter que escrever para cada pessoa que a gente conseguir identificar, e existem pessoas por aí que vão descobrir que quem elas confiaram não estava fazendo do jeito que foi prometido a elas. É essa a parte que me tira o sono.',
    c12: 'Eu estou no plantão de quinta de madrugada com ele. Eu vou dizer na cara dele primeiro, no escritório, antes de escrever qualquer coisa.',
    c13: 'Cheguei. O Yusuf está com a gente, coitado, três semanas depois do treinamento. Vou falar lá pelas duas, quando os telefones sossegarem.',

    // --------------------------------------------------------------- t-branch
    b1: 'A todos os voluntários. A Connie morreu no posto durante a noite de quinta. A dupla do dia encontrou ela no escritório às sete. A linha está suspensa até segunda e o conselho se reúne amanhã.',
    b2: 'Ninguém deve falar com ninguém sobre assuntos do posto. Isso não é implicância minha, é a única regra que sempre importou aqui.',
    b3: 'Onze anos ela dirigiu este posto e sabia o nome de cada um de nós e para qual de nós ela tinha que ligar num domingo ruim... Eu não tenho nada melhor do que isso para dizer.',
    b4: 'Eu estava nos telefones. Duas e dez até vinte pras quatro, uma ligação, e não foi uma ligação fácil. Está no livro.',
    b5: 'Na sala de atendimento o plantão inteiro, nós dois, de headset. É por isso que nenhum de nós ouviu nada, e eu estou sentado com isso desde sexta.',
    b6: 'Eu quero dizer agora, antes que alguém diga por mim, que eu não entro naquele prédio desde o dia três e entreguei o meu crachá ao Prem em mãos.',
    b7: 'Ninguém falou nada de você, Sunny... embora eu tenha achado que ouvi alguém na escada dos fundos lá pelas duas e meia, e eu fiquei em dúvida.',
    b8: 'Diga direito ou não diga nada. É esse o treinamento inteiro e você teve vinte e dois anos dele.',
    b9: 'Chega. Vocês dois. Para mim, não para quarenta pessoas.',

    // ---------------------------------------------------------------- t-yusuf
    y1: 'Era o meu quarto plantão. Eu fiz quatro plantões. Eu fico dizendo isso para as pessoas como se aquilo explicasse alguma coisa.',
    y2: 'Eu fiquei na sala de atendimento das duas até as quatro. Eu não atendi uma única ligação a noite inteira, o que eles avisam que acontece e para o que ninguém prepara você.',
    y3: 'o alun estava numa ligação',
    y4: 'Tem um painel na parede com quatro lâmpadas, uma por linha. Quando uma linha está ocupada a lâmpada acende. É de mais ou menos 1990 e é a única coisa naquela sala que te diz alguma coisa.',
    y5: 'Nenhuma lâmpada acendeu entre umas duas e meia e três e meia. Eu sei porque eu fiquei sentado olhando para quatro lâmpadas apagadas por uma hora pensando foi nisso que eu entrei.',
    y6: 'onde ele estava',
    y7: 'Ele passou para o escritório lá pelas duas e meia. Eu vi ele ir e não vi ele voltar por um tempo e não achei nada de mais, porque ele faz isso há vinte e dois anos e eu fiz quatro vezes.',
    y8: 'A Connie ficou naquele escritório desde a meia-noite. Ela faz a escala e os relatórios lá dentro e estava com a porta aberta, o que ela sempre faz para que as pessoas entrem.',
    y9: 'Fala com a Sunny Halvorsen. Todo mundo decidiu que ela é difícil e ela é a única pessoa daquele posto que diz a coisa de verdade em voz alta.',

    // ---------------------------------------------------------------- t-sunny
    s1: 'Eu abri um alerta de proteção em janeiro e me pediram para me afastar em março, e esses dois fatos ficaram sentados um do lado do outro por cinco meses sem ninguém ligar um ao outro.',
    s2: 'O alerta era sobre um voluntário mantendo contato com uma pessoa que ligou. Eu não tinha um nome. Eu tinha um padrão e uma sensação ruim e nenhum nome, então não deu em nada, corretamente.',
    s3: 'onde você estava na quinta',
    s4: 'No meu apartamento, com a minha cachorra, assistindo quatro episódios de alguma coisa dinamarquesa. Ninguém pode confirmar isso e eu não vou fingir que alguém pode.',
    s5: 'O que eu posso provar é que entreguei o meu crachá ao Prem no dia três de março na frente de duas pessoas, e aquela porta não abre sem um, e o painel anota toda vez que ela abre.',
    s6: 'Então quando Alun Meredith diz que ouviu alguém na escada dos fundos, ou ele está enganado ou ele está te dizendo onde ele estava, e eu gostaria muito que alguém perguntasse a ele qual das duas.',
    s7: 'E eu gostava dele. É essa a coisa que eu não consigo fazer ninguém escutar. Eu já sentei naquela cozinha com aquele homem às quatro da manhã e ele é a pessoa mais gentil daquela escala.',
    s8: 'Peça o painel ao Prem. Ele está com aquilo desde sexta e é conselheiro e está com medo do que aquilo diz.',

    // ----------------------------------------------------------------- t-prem
    p1: 'Eu sou conselheiro há nove anos e o meu trabalho inteiro foi proteger a promessa de que nada dito naquela linha sai dali. Eu passei esta semana fazendo o contrário e tenho consciência disso a cada hora.',
    p2: 'O livro de plantão tem uma ligação do Alun na quinta. 02:10 às 03:40, noventa minutos, escrito com a letra dele com três linhas de resumo, que é exatamente com o que uma ligação longa se parece.',
    p3: 'A conta de telefone chegou na quarta. Ela não diz quem ligou nem o que foi dito, porque não pode. Ela diz quantos minutos cada linha carregou, e na quinta entre duas e quatro, as quatro linhas não carregaram absolutamente nada.',
    p4: 'o painel da porta',
    p5: 'A porta da escada dos fundos fica com alarme entre as onze e as seis e toda abertura é anotada com um número de crachá. Existe uma abertura na noite de quinta. 02:55, crachá de Alun Meredith, e um fechamento às 03:05.',
    p6: 'O crachá de Sunniva Halvorsen foi desativado no dia três de março e não abriu nada desde então. Fui eu mesmo que desativei e eu tenho o formulário.',
    p7: 'A Connie veio falar comigo na segunda sobre o Alun e os números. Ela tinha dois nomes e uma data que remontava a 2011 e ia levar aquilo ao conselho no dia catorze.',
    p8: 'Ela não estava com raiva dele. Eu quero isso registrado em algum lugar por alguém. Ela sentou onde você está sentado e disse, Prem, ele fez isso porque não aguentava não saber, e isso não é defesa e eu vou ter que fazer assim mesmo.',
    p9: 'Vinte e dois anos. Dois plantões de madrugada por semana. Calcule quanto isso dá em horas uma hora dessas, e depois calcule o que seria preciso para perder aquilo.',
  },

  claims: {
    'c-connie-kitchen': 'Connie: na cozinha, 23:00–23:40',
    'c-alun-oncall': 'Alun: numa ligação, 02:10–03:40',
    'c-alun-callroom': 'Alun: na sala de atendimento, 02:00–04:00',
    'c-sunny-branch': 'Sunny: no posto, 02:00–03:00 (segundo Alun)',
    'c-yusuf-callroom': 'Yusuf: na sala de atendimento, 02:00–04:00',
    'c-alun-offphones': 'Alun: fora dos telefones, 02:20–03:20 (segundo Yusuf)',
    'c-alun-office': 'Alun: no escritório, 02:30–02:50 (segundo Yusuf)',
    'c-connie-office': 'Connie: no escritório, 00:00–03:00 (segundo Yusuf)',
    'c-sunny-home': 'Sunny: no apartamento dela, 01:00–04:00',
    'c-alun-backstairs': 'Alun: na escada dos fundos, 02:55–03:05 (painel do alarme)',
  },

  motives: {
    'm-numbers':
      'Ele vinha dando o número pessoal dele para quem ligava desde mais ou menos 2011, porque no fim de uma ligação você desliga o telefone e nunca fica sabendo. Connie tinha dois nomes e uma data e ia levar aquilo ao conselho no dia catorze, o que teria acabado com ele.',
  },

  contradictions: {
    'x-alun-office':
      'Ele colocou os dois na sala de atendimento de headset o plantão inteiro, que é por isso que nenhum dos dois ouviu nada. Yusuf Kaya viu ele passar para o escritório lá pelas duas e meia no quarto plantão da vida dele, e não achou nada de mais, porque o Alun faz isso há vinte e dois anos e o Yusuf tinha feito quatro vezes.',
    'x-alun-call':
      'O livro de plantão tem noventa minutos com a letra dele e três linhas de resumo, e nada naquela linha é gravado ou rastreável, que é a promessa em que a instituição inteira se apoia. Existe um painel na parede da sala de atendimento com quatro lâmpadas, uma por linha, e ele é de mais ou menos 1990. Yusuf ficou sentado olhando para quatro lâmpadas apagadas por uma hora pensando foi nisso que eu entrei.',
    'x-alun-stairs':
      'A porta da escada dos fundos fica com alarme das onze até as seis e toda abertura é anotada contra um número de crachá. Existe exatamente uma abertura na noite de quinta. O crachá dele, 02:55, fechada de novo às 03:05. Ele disse a quarenta voluntários que achou ter ouvido alguém naquela escada.',
    'x-sunny-fob':
      'Ele colocou Sunniva Halvorsen dentro do prédio num grupo de quarenta pessoas, oito minutos depois de ela dizer que não estava lá desde março. Ela entregou o crachá ao Prem no dia três na frente de duas testemunhas, ele foi desativado no mesmo dia, e aquela porta não abre sem um. Ela gostava dele. Ela já tinha sentado naquela cozinha com ele às quatro da manhã.',
  },

  confrontation: {
    opening:
      'Você fez quatro anos nesta linha. Então você já sabe que a primeira coisa que eu vou fazer é deixar você falar, e você já sabe que saber disso não impede que funcione.',
    beats: {
      'p-office': {
        press:
          'Você disse que os dois ficaram na sala de atendimento a noite toda de headset. O Yusuf viu você passar para o escritório duas e meia.',
        rebuttal:
          'Um rapaz muito assustado no quarto plantão dele, que tinha acabado de encontrar uma mulher de quem ele gostava no pé de um degrau... Eu teria cuidado com o peso que você põe nele. Ele vai carregar aquilo de um jeito ou de outro.',
      },
      'p-call': {
        press:
          'Noventa minutos no livro, com a sua letra. As quatro linhas não carregaram nada entre duas e quatro, e o Yusuf ficou uma hora olhando para quatro lâmpadas apagadas.',
        rebuttal: 'Lâmpada queima. Aquele painel é mais velho que o Yusuf.',
      },
      // p-stairs and p-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence.
      'p-stairs': {
        press:
          'A porta da escada dos fundos fica com alarme desde as onze. Uma abertura na noite de quinta. O seu crachá, cinco pras três, fechada cinco depois. E você disse a quarenta pessoas que achou ter ouvido alguém naquela escada.',
      },
      'p-why': {
        press:
          'Ela tinha dois nomes e uma data que remontava a 2011, e o conselho se reunia no dia catorze. Ela não estava com raiva de você. Ela disse ao Prem que você fez aquilo porque não aguentava não saber.',
      },
    },
    deflections: [
      'Mm. E o que você gostaria que acontecesse, se aquilo fosse verdade?',
      'Você está se esforçando muito. Eu reconheço, porque eu faço isso de profissão, duas vezes por semana, de graça.',
      'Me traga alguma coisa que não seja um rapaz lembrando de uma noite ruim.',
    ],
    confession:
      'Ela estava com a porta aberta. Ela sempre estava com a porta aberta, porque uma porta fechada naquele prédio significa alguma coisa.\n\nE ela foi gentil a respeito. Ela disse Alun, eu sei por quê, e disse do jeito que a gente é ensinado a dizer, que é o jeito como eu ensinei metade deles.\n\nEu escuto há vinte e dois anos e nunca uma vez disse o que eu queria. É essa a disciplina. Você não se coloca dentro da sala. E eu sentei naquele escritório e ouvi ela sendo profissional comigo, e entendi que eu ia virar um caso, e que pessoas com quem eu conversei às quatro da manhã durante uma década iam receber uma carta.\n\nEu não lembro de ter me levantado.\n\nTem mais uma coisa e eu vou dizer porque tem sido a pior parte de cada dia desde então.\n\nUm homem que se dizia o Keeper me ligou em casa na terça. Disse que estava fazendo uma revisão de bem-estar dos voluntários para a entidade nacional, e que queria ouvir como o posto estava me tratando.\n\nE ele era bom. Ele era tão bom. Ele fazia as pausas. Ele fazia a devolução, as palavras exatas que eu uso, as pequenas que a gente usa para abrir uma pessoa sem que ela perceba. Ele me perguntou como seria, depois, e esperou, e não preencheu o silêncio.\n\nEu sabia o que ele estava fazendo. É essa a questão. Eu ensinei aquilo. Eu sentei na minha própria cozinha e escutei o Keeper usar o meu próprio treinamento em mim e deixei ele fazer, porque foi a primeira vez em vinte e dois anos que alguém me perguntou alguma coisa e esperou a resposta.\n\nEle não disse uma palavra sobre a Connie. Nenhuma. Ele é muito cuidadoso e ele é um dos nossos, ou foi.',
  },

  coda: {
    from: 'Número desconhecido',
    messages: [
      'Beacon. Esse vai ter te custado alguma coisa e eu sinto muito por isso, no que você pode acreditar ou não.',
      'Ele tem razão, claro. É ali que eu aprendi. Nove anos de quintas numa sala como aquela, muito tempo atrás, e ninguém nunca fez a pergunta porque nunca ocorreu a ninguém procurar o Keeper pelo jeito dele.',
      'Você tem cinco agora. Idade, acesso, décadas, o retorno da ligação, e este. Isso basta para me achar e nós dois sabemos disso.',
      'Eu não vou parar. Mas eu gostaria que você entendesse que eu nunca uma vez precisei dizer a coisa em si. Para nenhum deles. Se pergunte se isso torna aquilo melhor ou pior, porque eu venho me perguntando há trinta anos e não cheguei a lugar nenhum.',
    ],
  },

  epilogue:
    'O conselho escreveu para onze pessoas. Prem Chandrasekaran redigiu a carta nove vezes e a nona tinha dois parágrafos, e não usava a palavra violação.\n\nQuatro das onze responderam. Três delas disseram que o homem do outro lado da linha tinha mantido elas vivas, e perguntaram se podiam dizer isso.\n\nSunniva Halvorsen foi convidada a voltar para a escala em setembro e recusou, e depois aceitou em janeiro, e agora faz o plantão de quinta de madrugada.\n\nYusuf Kaya já fez cento e quarenta plantões. O painel da parede foi trocado na primavera por um que registra, e ele foi contra na reunião de voluntários sob o argumento de que uma sala onde nada é anotado é o objetivo inteiro, e ele perdeu, e ele estava certo.',
};
