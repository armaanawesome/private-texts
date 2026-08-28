import type { CaseTranslation } from '../caseText';

/**
 * Case 5 — "O Velório". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The one sentence forty-one people said. The lie is collective, and it works
 *    because everybody repeats it word for word, so the sentence has ONE Portuguese
 *    form and never a paraphrase: `todos nós na sala da frente`. Donal says it in
 *    f4, Maureen says it in f6, Eileen admits saying it in r6 and r8, Maureen
 *    explains it in u2, and it is what the confession says the family built in four
 *    seconds in the hall. If two of those drift apart the player stops hearing one
 *    rehearsed story and starts hearing five people agreeing loosely.
 *
 * 2. Times. Everything in the house is spoken: `quatro e dez` is the minute Donal
 *    goes through the outside door, and it is the same three words in Eileen’s
 *    account (r3), in Cass’s (k5), in both revelations and in both presses. The
 *    chips carry 24-hour digits as the English does.
 *
 *    The prescription chips sit three weeks earlier on the same timeline, so their
 *    windows are stored far above 1440 — 29400 is 10:00 on day 21, not 490:00. The
 *    test helper wraps mod 1440 for exactly that reason.
 *
 * 3. Names and places. People keep their names: Tony (Anthony formally), Donal,
 *    Maureen, Eileen, Cass (Cassie), Gerald Mulvey, Ballybough Road. Descriptive
 *    places are translated, and each was chosen as a word the prose already says:
 *
 *      you    → Você        house      → a casa
 *      tony   → Tony        frontroom  → a sala da frente
 *      donal  → Donal       kitchen    → a cozinha
 *      nuala  → Maureen     gardenroom → a sala do jardim
 *      bridie → Eileen      sidereturn → o corredor lateral
 *      cass   → Cass        chemist    → a farmácia da Ballybough Road
 *
 *    `o corredor lateral` is the narrow passage down the side of a terraced house,
 *    which is where Cass is sick and where Donal takes his call. `corredor` is doing
 *    no other job in this pack — there is no corridor place here — so the chip and
 *    the sentence cannot be read as two different places.
 *
 *    The Irish furniture is translated to what a Brazilian reader actually uses:
 *    `the guards` is `a polícia` throughout, `month’s mind` is `missa de mês`,
 *    `nan` is `a vó`, `grandad` is `o vô`. Money stays sterling — `quatrocentas
 *    libras` — because converting it changes a fact.
 *
 * 4. Voice. Six people, and the axis here is who finishes a sentence. Eileen is
 *    eighty one and lands a full stop on every message she sends, alone in the
 *    pack. Maureen opens like a letter and then trails off without one, every time
 *    but once — `Donal.` in f12 is a single word with a full stop on it, and it is
 *    the hardest thing she says all case. Tony, Donal, Cass and the player type
 *    lowercase and unfinished. Between the three lowercase voices the difference is
 *    content, not casing: Tony is warm and keeps saying he will do things properly,
 *    Donal answers every question with a question about somebody else, Cass is
 *    nineteen and accuses herself before anybody asks.
 *
 * 5. Gender. The player is unmarked, per content/cases/playerNeutral.test.ts. One
 *    rephrase was forced and it is asserted in the test: deflections[1], `You do not
 *    get to arrive and be right`, where `certo`/`certa` both agree. It is rebuilt as
 *    `chegar e ter razão`, which inflects for nothing. `você é a cara dele` in y1
 *    works because the agreement lands on `cara`.
 *
 * No arc content. Pack 5 is standalone — no Keeper, no coda.
 */
export const theWakePtBr: CaseTranslation = {
  title: 'O Velório',
  blurb:
    'Quarenta e uma pessoas estavam na casa e todas contam a mesma história, palavra por palavra. Ela foi construída para proteger alguém que não fez nada.',

  characters: {
    you: 'Você',
    tony: 'Tony',
    donal: 'Donal',
    nuala: 'Maureen',
    bridie: 'Eileen',
    cass: 'Cass',
  },

  places: {
    house: 'a casa',
    frontroom: 'a sala da frente',
    kitchen: 'a cozinha',
    gardenroom: 'a sala do jardim',
    sidereturn: 'o corredor lateral',
    chemist: 'a farmácia da Ballybough Road',
  },

  threads: {
    't-tony': 'Tony',
    't-family': 'Os Mulvey',
    't-bridie': 'Eileen',
    't-cass': 'Cass',
    't-nuala': 'Maureen',
  },

  briefing: {
    causeOfDeath: 'Uma única pancada na nuca contra o degrau.',
    ruling:
      'Registrado como queda. Ele estava bebendo desde as onze e o degrau para a sala do jardim é ruim.',
    opening:
      'Gerald Mulvey foi enterrado na quinta e quarenta e uma pessoas voltaram para a casa.\n\nO filho mais velho dele, Anthony, foi encontrado às cinco da tarde no pé do degrau da sala do jardim, com um copo ainda na mão e o histórico de receitas do pai na bolsa ao lado dele.\n\nVocê não pisava naquela casa fazia nove anos. Foi o Tony quem pediu para você vir.',
  },

  messages: {
    // ----------------------------------------------------------------- t-tony
    y1: 'nove anos. ninguém vai falar nada sobre isso no dia, todos eles vão só olhar pra você e dizer meu deus você é a cara dele',
    y2: 'eu não vou por causa deles',
    y3: 'ainda bem. porque tem uma coisa que eu quero mostrar para alguém que não esteja nesta família até o pescoço',
    y4: 'o pai estava com 5mg da morfina líquida no fim e a farmácia tem ele registrado com cento e oitenta ml em três semanas. isso não é engano, isso é alguém retirando',
    y5: 'quem retirou',
    y6: 'essa é a parte que eu tenho e eu não vou botar num texto. eu estou com o extrato impresso. levo na quinta na bolsa junto com as leituras da missa',
    y7: 'eu perguntei na lata pra ele no domingo, sem rodeio, e ele riu de mim e disse se cuida, Tony. é essa a frase exata. se cuida',
    y8: 'tony vai na polícia',
    y9: 'com a minha mãe dentro de casa. depois do enterro. eu não vou fazer isso com ela na semana em que ela enterra ele, eu faço na sexta e faço direito',
    y10: 'você veio. eu te vi no fundo da igreja e quase fui até lá',
    y11: 'cozinha com os sanduíches feito um bobo. me acha antes dos discursos, estou com a bolsa comigo',

    // --------------------------------------------------------------- t-family
    f1: 'Para quem não foi avisado direito e não por terceiros, o Tony morreu ontem na casa. Ele caiu no degrau da sala do jardim. A mãe está sendo cuidada e por favor não liguem para ela hoje, liguem para mim, enfim eu aviso vocês sobre os preparativos quando houver algum',
    f2: 'Eu enterrei um marido na quinta e um filho na quinta à noite. Não tenho nada a dizer a nenhum de vocês além de que Deus tem um senso muito ruim de quando uma coisa já basta.',
    f3: 'a polícia foi tranquila com isso. eles entraram e saíram em uma hora e disseram o que todo mundo naquela casa já sabia. degrau ruim, bebida desde as onze, nada além disso',
    f4: 'e nós estávamos todos na sala da frente desde as quatro para os discursos. todos nós. foi isso que eu falei pra eles e foi isso que todo mundo falou',
    f5: 'eu fiquei servindo os copos o tempo todo. pergunta pra qualquer um deles',
    f6: 'Estávamos todos nós na sala da frente. Cada um de nós. Eu quero isso dito com clareza porque já tem conversa e eu sei de onde ela está vindo',
    f7: 'ele estava com uma bolsa. onde está a bolsa',
    f8: 'nove anos e essa é a sua primeira pergunta. tá',
    f9: 'Responde à pergunta, Donal.',
    f10: 'eu não sei onde está a bolsa dele. é uma casa com quarenta pessoas dentro e um homem morto no fundo dela',
    f11: 'e já que a gente está fazendo perguntas, a Cass ficou lá nos fundos o tempo todo e ninguém falou uma palavra sobre isso também',
    f12: 'Donal.',
    f13: 'Aquela menina estava comigo. Eu digo isso para você e para um policial e para um juiz e não vou ser perguntada duas vezes.',

    // --------------------------------------------------------------- t-bridie
    r1: 'Você veio. Nove anos e você veio, e foi ele quem pediu. Tem uma lição nisso em algum lugar e eu estou cansada demais para ir procurar.',
    r2: 'você estava na sala da frente',
    r3: 'Eu estava na minha cozinha quatro e dez procurando copos, porque ninguém tinha entregado copo nenhum a ninguém e os discursos estavam acontecendo sem eles.',
    r4: 'E da janela da minha cozinha eu enxergo o corredor lateral, e Donal Fahey estava parado nele no telefone de costas para a casa.',
    r5: 'você disse pra polícia que estava todo mundo na sala da frente',
    r6: 'Disse. E diria de novo, e vou te contar exatamente por quê, e depois você pensa de mim o que quiser.',
    r7: 'A Cassie tirou quatrocentas libras da minha bolsa na quarta. A Maureen pegou ela fazendo isso e eu peguei as duas nisso, e nós três combinamos que o dia em que a gente enterrava o avô dela não era o dia.',
    r8: 'Então quando o policial perguntou onde cada um estava, a gente disse a sala da frente, todos nós, juntos. Foi por ela. Não foi por mais ninguém e eu não pensei um segundo que pudesse ser por mais alguém.',
    r9: 'Aquela menina estava no corredor lateral passando mal de vergonha, e o meu filho estava morrendo a vinte pés dela, e fui eu que mandei ela para lá.',
    r10: 'Fala com ela. Ela não fala comigo e eu não culpo ela por isso.',

    // ----------------------------------------------------------------- t-cass
    k1: 'a vó disse que você ia mandar mensagem',
    k2: 'eu peguei o dinheiro. não vou ficar aqui fazendo aquela coisa de ir enrolando até falar',
    k3: 'eu não perguntei do dinheiro',
    k4: 'todo mundo pergunta do dinheiro uma hora. eu fiquei do lado de fora o tempo todo. desde as quatro até a vó sair e me buscar',
    k5: 'o donal saiu mais ou menos quatro e dez. ele não me viu, eu sou pequena e tem uma lixeira ali, é só por isso que eu sei de alguma coisa',
    k6: 'o que ele fez',
    k7: 'entrou pela porta da sala do jardim. a de fora. ficou lá dentro um pouco e depois saiu e estava diferente. não abalado. meio arrumadinho. ele ajeitou a gravata no reflexo da janela',
    k8: 'e ele estava com a bolsa do tio tony. eu não sabia que era do tio tony na hora. eu sei agora',
    k9: 'por que você não falou',
    k10: 'porque pra dizer onde ele estava eu tenho que dizer onde eu estava. e onde eu estava é o corredor lateral passando mal porque eu roubei a minha vó no dia do enterro do vô',
    k11: 'todos eles me acobertaram. todos, na hora, ninguém nem discutiu. e eu fico deitada na cama montando que o motivo de ele ter escapado é que eles estavam sendo bonzinhos comigo',

    // ---------------------------------------------------------------- t-nuala
    u1: 'Sou casada com ele há vinte e seis anos e eu sei disso há uma nove horas, então você vai ter que me dar um minuto com o jeito que eu digo as coisas',
    u2: 'Eu falei para a polícia que estávamos todos nós na sala da frente porque a mãe falou primeiro e eu não ia deixar ela ali sozinha depois de ter falado. É esse o meu raciocínio inteiro e ele não é grande coisa',
    u3: 'as receitas',
    u4: 'Quem ia na farmácia era o Donal. A última foi na terça, onze e dez, e o nome dele está no registro porque eles obrigam a assinar pelo líquido. Ele fez todas elas naquele mês, porque eu não conseguia entrar lá e dizer o nome do meu pai para a moça do balcão sem desabar',
    u5: 'E ele falou para a polícia que nunca uma vez sequer retirou. Ele disse isso na minha frente e eu ouvi ele dizer e não falei nada, porque na hora eu achei que ele só estava com preguiça do papel',
    u6: 'Cento e oitenta ml. O Tony me disse isso no domingo e eu falei que ele estava dando vexame na missa de mês do próprio pai',
    u7: 'O pai tinha dinheiro. Não muito. O suficiente para que mais quatro anos de casa de repouso levassem tudo e três anos deixassem alguma coisa',
    u8: 'Eu fico voltando para a sala da frente e contando cabeças. Eu contei aquela sala quarenta vezes desde ontem e ele não está nela, e eu disse que estava, e eu teria continuado dizendo',
  },

  /**
   * The chips are digits in both languages and stay digit for digit identical to
   * the English. The two prescription chips sit three weeks before the funeral on
   * the same timeline, so their windows are stored far above 1440 and only render
   * correctly through a helper that wraps.
   */
  claims: {
    'c-tony-kitchen': 'Tony: na cozinha, 15:00–15:55',
    'c-donal-front': 'Donal: na sala da frente, 16:00–16:30',
    'c-donal-toast': 'Donal: servindo os copos, 16:00–16:30',
    'c-nuala-front': 'Maureen: na sala da frente, 16:00–16:30',
    'c-cass-gardenroom': 'Cass: na sala do jardim, 16:05–16:25 (segundo Donal)',
    'c-bridie-kitchen': 'Eileen: na cozinha, 16:05–16:15',
    'c-donal-outside': 'Donal: no telefone no corredor lateral, 16:05–16:25 (segundo Eileen)',
    'c-cass-return': 'Cass: no corredor lateral, 16:00–16:30 (segundo Eileen)',
    'c-donal-garden': 'Donal: na sala do jardim, 16:10–16:20 (segundo Cass)',
    'c-donal-collected': 'Donal: assinou pela última receita, 10:00–12:00',
    'c-donal-scripts': 'Donal: nunca retirou receita nenhuma, 09:00–13:00 (versão dele)',
  },

  motives: {
    'm-morphine':
      'Ele retirou as receitas de Gerald toda semana do último mês e saíram cento e oitenta ml contra uma dose de cinco ml. Tony estava com o extrato da farmácia na bolsa e ia à polícia na sexta.',
  },

  contradictions: {
    'x-donal-garden':
      'Todo adulto daquela casa disse a mesma frase à polícia, e ela era verdadeira para quase todos eles. Às quatro e dez Donal Fahey entrou pela porta de fora da sala do jardim, e uma menina de dezenove anos atrás de uma lixeira viu ele sair de novo e ajeitar a gravata no reflexo da janela.',
    'x-donal-glasses':
      'Ele disse que ficou servindo os copos o tempo todo. Eileen Mulvey foi até a própria cozinha quatro e dez procurar copos, porque ninguém tinha entregado copo nenhum a ninguém, e daquela janela ela viu ele parado no corredor lateral de costas para a casa.',
    'x-donal-scripts':
      'Ele falou para a polícia que nunca uma vez sequer retirou as receitas de Gerald. A mulher dele fez isso durante um mês e sabe exatamente por que ela não conseguia: não conseguia dizer o nome do próprio pai para a moça do balcão. Saíram cento e oitenta ml de morfina líquida contra uma dose de cinco ml, e o extrato estava na bolsa do Tony.',
    'x-cass-return':
      'Ele colocou a menina na sala do jardim, que é a única acusação que alguém daquela família fez em voz alta. Ela ficou no corredor lateral a meia hora inteira, passando mal de vergonha por quatrocentas libras, e a avó dela mandou ela para lá e pode dizer isso.',
  },

  confrontation: {
    opening:
      'Nove anos fora. Você volta por uma tarde e agora conhece esta família, é? Pode falar então.',
    beats: {
      'w-garden': {
        press:
          'Você falou para a polícia que estava todo mundo na sala da frente desde as quatro. Quatro e dez você entrou pela porta de fora da sala do jardim, e a Cass viu você sair de novo e ajeitar a gravata no reflexo da janela.',
        rebuttal:
          'Uma menina que roubou a própria avó no dia de um enterro. Essa é a sua testemunha. Ela tem todos os motivos do mundo para colocar outra pessoa lá fora junto com ela.',
      },
      'w-glasses': {
        press:
          'Você disse que ficou servindo os copos o tempo todo. A Eileen foi até a cozinha quatro e dez procurar copos, porque ninguém tinha entregado copo nenhum a ninguém, e ela viu você da janela.',
        rebuttal: 'Ela tem oitenta e um anos e enterrou um marido naquela manhã.',
      },
      // w-scripts and w-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing here
      // to translate and a line would break the scene.
      'w-scripts': {
        press:
          'E você falou para eles que nunca retirou as receitas de Gerald. A Maureen fez isso durante um mês, e ela pode te dizer exatamente por que ela não conseguia.',
      },
      'w-why': {
        press:
          'Cento e oitenta ml contra uma dose de cinco ml. O Tony estava com o extrato naquela bolsa e ia à polícia na sexta. Foi você que mandou ele se cuidar.',
      },
    },
    deflections: [
      'Isso é uma casa cheia de luto e você está lendo aquilo como se fosse um livro-caixa.',
      'Você não esteve aqui por nove anos. Você não tem o direito de chegar e ter razão.',
      'Me traz uma coisa. Não um sentimento que alguém teve num enterro.',
    ],
    confession:
      'Ele saiu até o corredor para me contar. Não para me ameaçar. Era isso que tinha no Tony, ele não sabia fazer ameaça, ele saiu para me contar o que ia fazer na sexta para eu não ficar sabendo por um policial.\n\nEle estava sendo decente comigo. Estava com a bolsa embaixo do braço e estava sendo decente comigo.\n\nE eu disse entra aqui um minuto, e ele entrou na minha frente, e o degrau daquela sala do jardim é um degrau ruim desde 1994.\n\nEu quero dizer a outra parte porque você não vai acreditar na primeira sem ela.\n\nEu não construí nada daquilo. A sala da frente. Todos nós juntos. Eu não falei uma palavra para aquilo acontecer. Eles fizeram sozinhos, em uns quatro segundos, no corredor de entrada, porque a Cassie estava chorando e a Eileen disse que estávamos todos nós na sala da frente e a Maureen disse que sim, estávamos, e elas se olharam e estava feito.\n\nE eu fiquei ali parado e deixei aquilo se fechar por cima de mim que nem água.\n\nFoi isso que eu fiz. Eu roubei uma coisa que tinha sido feita para uma menina.',
  },

  epilogue:
    'Gerald Mulvey foi exumado em fevereiro. O laudo usou a palavra compatível quatro vezes e não foi além disso, e não precisou, porque a essa altura existia o registro da farmácia e existia a Maureen.\n\nEla prestou depoimento ao longo de dois dias e não perguntou uma vez sequer o que aquilo faria com ela. Quando perguntaram por que ela tinha dito a sala da frente, ela disse: porque a minha mãe disse primeiro.\n\nEileen Mulvey não foi ao julgamento. Mandou uma carta para ser lida, de uma linha, pedindo que informassem ao tribunal que a neta dela tinha ficado no corredor lateral o tempo inteiro e não teve nada a ver com nada daquilo.\n\nCass devolveu as quatrocentas libras em parcelas para uma mulher que nunca pediu por elas.',
};
