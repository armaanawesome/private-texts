import type { CaseTranslation } from '../caseText';

/**
 * Case 6 — "A Prova Longa". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. Eight people nobody counted. The lie is identity: everyone in that boat wears
 *    the same thing, so the kit words have to stay one set and stay concrete —
 *    `o macaquinho` is the unisuit a Brazilian rower actually calls a macaquinho,
 *    `a touca` the hat, `o uniforme` the kit as a whole. Graham gives Em his
 *    macaquinho and his touca in g5, Warren sees a man on the ramp with `a touca
 *    fora` in w4, and Carol says everyone wears `o mesmo macaquinho e a mesma
 *    touca` in d9. If those drift the player loses the only reason eight people
 *    can be seven.
 *
 * 2. The two forms of one minute. Warren SPEAKS `onze e oito`; the revelation and
 *    the chip WRITE `11:08`. That split is deliberate in the English and it is the
 *    whole weight of the video: a man saying a time is a memory, a burned-in
 *    timecode is not. Both forms are pinned in the test.
 *
 * 3. Rowing, in the words a Brazilian rowing club uses rather than literal ones:
 *    `a guarnição` for the crew, `o oito` for the boat, `banco cinco` for five
 *    seat, `os cavaletes` for the trestles, `os reservas` for the spares,
 *    `emplumar` for feathering, `a contagem de ritmo` for the rate count, `as
 *    parciais` for splits, `o livro de saída` for the launch book.
 *
 * 4. Names and places. People keep their names: Pauline Vaine, Graham Brightwell,
 *    Warren Ako, Carol Prentice, Emma Kerr (Em), Dorothy and Robbie Nance, Ken
 *    Wardle, and the S. Brightwell in the duty column that undoes him. Descriptive
 *    places are translated, each chosen as a word the prose already says:
 *
 *      you    → Você       club      → o clube
 *      hester → Pauline    boathouse → o galpão dos barcos
 *      saul   → Graham     bank      → a margem
 *      imo    → Em         slipway   → a rampa
 *      warren → Warren     bar       → o bar do clube
 *      dilys  → Carol      river     → o rio
 *
 *    `a margem` is the towpath, and `a rampa` the slipway, and they are two
 *    different places on the same water — Carol stands at the top of one and
 *    watches the other, and Warren is on one while Graham is on the other. Neither
 *    word is doing a second job in this pack.
 *
 *    British units and money stay: `dois pés` of river, not a conversion.
 *
 * 5. Voice. Six people and three axes, because casing alone will not separate
 *    them. Pauline and Carol write in full sentences and finish them. Graham
 *    capitalises like them and never lands a full stop — he is always mid-argument,
 *    and that is the tell. Warren and Em are lowercase and unfinished, and are
 *    separated by content: Warren is technical to the second (`trinta e um minutos
 *    contínuos`, `a contagem de ritmo`, `o timecode`), Em is nineteen and
 *    apologising before she is accused. The player is lowercase and short.
 *
 * The arc. `o Keeper` stays in English and appears exactly twice, as in the
 * English: once in the confession and once in the coda, where he asks the player
 * to notice what he knew. Unlike Pack 3 the coda names him, so the test counts
 * rather than asserting he is absent before the end.
 *
 * Gender. No rephrase was forced in this pack: every player-addressed line runs on
 * verbs or on fixed-gender nouns — `as piores mãos`, `a melhor cabeça`, `gentil`,
 * which is invariable. The sweep is asserted anyway so it stays that way.
 */
export const theLongCoursePtBr: CaseTranslation = {
  title: 'A Prova Longa',
  blurb:
    'Oito pessoas com o mesmo uniforme, na água, por vinte e dois minutos. As fotos provam que oito estavam naquele barco. Elas não provam quais oito.',

  characters: {
    you: 'Você',
    hester: 'Pauline',
    saul: 'Graham',
    imo: 'Em',
    warren: 'Warren',
    dilys: 'Carol',
  },

  places: {
    club: 'o clube',
    boathouse: 'o galpão dos barcos',
    bank: 'a margem',
    slipway: 'a rampa',
    bar: 'o bar do clube',
    river: 'o rio',
  },

  threads: {
    't-hester': 'Pauline',
    't-club': 'Ravensholt RC',
    't-dilys': 'Carol Prentice',
    't-imo': 'Em',
    't-warren': 'Warren Ako',
  },

  briefing: {
    causeOfDeath: 'Traumatismo. Uma chave de rigger do suporte ao lado das portas.',
    ruling:
      'Em aberto. Ninguém foi preso, porque quarenta e um sócios estavam na margem e o oito sênior estava na água.',
    opening:
      'Pauline Vaine era presidente do Ravensholt Rowing Club havia dezenove anos e tinha assinado à mão cada conjunto de atas que existe naquele armário.\n\nEla foi encontrada no galpão dos barcos ao meio-dia e dez na manhã da regata de outono, com as portas abertas e os suportes pela metade.\n\nO oito sênior esteve na água das onze até onze e vinte. Cada um deles tem o mesmo álibi e cada um deles está vestindo esse álibi.',
  },

  messages: {
    // --------------------------------------------------------------- t-hester
    x1: 'Você não vai lembrar da Dorothy Nance. Ela veio ao jantar do clube em 2011 e ficou sentada a noite inteira e não comeu nada.',
    x2: 'a mãe do robbie',
    x3: 'Ela morreu em março e a irmã dela está esvaziando a casa, e me mandou uma caixa porque o meu nome está nas atas.',
    x4: 'O livro de saída daquela semana está dentro. O original, não o que foi para o inquérito. Não são o mesmo livro e eu estou com os dois nesta mesa desde terça.',
    x5: 'diferente como',
    x6: 'Disseram ao inquérito que foi Ken Wardle quem assinou a saída dos barcos naquela manhã. Ken teve um derrame em 2013 e morreu em 2016 e a essa altura não podia contradizer ninguém.',
    x7: 'O original tem S. Brightwell na coluna do responsável, com a letra dele, para o sábado. Ele tinha vinte e quatro anos e era a única pessoa habilitada naquela margem e o rio estava dois pés acima.',
    x8: 'o que você vai fazer',
    x9: 'Entregar ao gabinete do legista na segunda. E contar ao Graham no sábado, antes disso, porque um homem tem direito de ouvir de uma pessoa e não de uma carta.',
    x10: 'pauline não faz isso sozinha num galpão vazio',
    x11: 'Nove horas e o bar está cheio de pais. Estou com o livro na bolsa e faço isso depois da prova dos sêniores, quando o lugar esvaziar.',

    // ----------------------------------------------------------------- t-club
    c1: 'A esta altura os sócios já devem ter sabido que a Pauline foi encontrada no galpão dos barcos ontem à tarde. Pediram que eu avisasse que a polícia vai querer falar com todo mundo que estava no local e que o clube ficará fechado até segunda ordem. Sinto muito por colocar de forma tão seca, não conheço um jeito melhor.',
    c2: 'dezenove anos. ela ensinou metade de vocês a emplumar',
    c3: 'Se serve de alguma coisa para alguém, o oito sênior botou o barco na água dez e cinquenta e a gente não encostou na margem de novo até onze e vinte. Oito de nós. Então são oito pessoas justificadas pelo menos',
    c4: 'filmei a regata inteira da margem. da proa à popa, as duas margens, do começo ao fim. a polícia está com o cartão',
    c5: 'Então está resolvido. O Warren tem oito de nós em vídeo durante a janela inteira e a Carol tem a margem',
    c6: 'Eu estive na margem das vinte pras onze até quase meio-dia com a prancheta de marcação, o que infelizmente significa que eu vi muita gente e muito pouca coisa.',
    c7: 'E onde estava o Warren no meio disso. Porque ele teve uma discussão com a Pauline nos cavaletes nove e meia que metade do clube ouviu',
    c8: 'a gente discutiu sobre uma seletiva de juniores. era sobre isso que a gente estava discutindo. fala o resto em voz alta graham',
    c9: 'Aqui não. Por favor.',

    // ---------------------------------------------------------------- t-dilys
    d1: 'Você remou aqui, não remou. Banco dois, e a Pauline dizia que você tinha as piores mãos que ela já enfaixou e a melhor cabeça que ela já desperdiçou.',
    d2: 'Eu fico no mesmo lugar em toda regata, no alto da rampa onde fica a prancheta, porque eu não aguento mais a caminhada até a largada. Isso quer dizer que eu vejo todo mundo passar duas vezes.',
    d3: 'você viu o warren',
    d4: 'Warren Ako ficou na margem a regata inteira com aquela câmera num monopé, gritando com uma guarnição que não conseguia ouvir ele, que é o que é treinar pelo que eu entendo. Ele não saiu do lugar por meia hora.',
    d5: 'E a Pauline entrou no galpão dos barcos um pouco antes das onze com a bolsa dela, e não saiu enquanto eu estava olhando, e eu fiquei olhando para aquelas portas por uma hora sem pensar nelas uma única vez.',
    d6: 'mais alguém entrou',
    d7: 'Graham Brightwell, lá pelas onze e três, de uniforme. Eu lembro porque achei que ele tinha voltado para pegar uma chave e não pensei mais nada além disso, e desde então eu não pensei em outra coisa.',
    d8: 'ele diz que estava no barco',
    d9: 'Todo mundo naquela guarnição usa o mesmo macaquinho e a mesma touca e eu tenho setenta e nove anos. Eu falei isso mesmo para o policial e ele anotou e eu conseguia ouvir ele decidindo que eu não servia para nada.',
    d10: 'Pergunta para a Emma Kerr. Ela é júnior e estava no vestiário com uniforme de sênior dez e meia, e júnior não usa uniforme de sênior, e ela ficou muito vermelha quando eu dei bom dia para ela.',

    // ------------------------------------------------------------------ t-imo
    g1: 'desculpa não ter respondido esse tempo todo. desculpa. eu fiquei sentada olhando pra isso',
    g2: 'eu remei no banco cinco do oito sênior na regata. eu tenho dezenove anos e nunca sentei naquele barco na minha vida',
    g3: 'quem pediu pra você',
    g4: 'o graham. dez e vinte, nos cavaletes. disse que as costas dele tinham travado no aquecimento e que não dava tempo de tirar a guarnição da prova e se eu não podia só sentar ali e não fazer disso um assunto',
    g5: 'ele me deu o macaquinho dele e a touca dele. eu perguntei e a inscrição e ele disse que quem faz as inscrições é a carol e a carol tem setenta e nove anos',
    g6: 'e você aceitou',
    g7: 'eu queria sentar naquele barco desde os onze anos. ele sabia disso. todo mundo sabe disso. isso não é desculpa eu só estou te dizendo o motivo de verdade',
    g8: 'e aí a pauline estava morta e o graham escreveu no grupo que oito de nós estavam na água e eu percebi que ninguém ia contar a gente',
    g9: 'ele falou pra todo mundo que eu estava na margem com os reservas. essa é a parte que me deu enjoo. ele não está só me usando ele está dizendo onde eu estava',
    g10: 'eu vou perder o clube né. é nisso que eu fico travada e eu sei como isso soa com ela morta',

    // --------------------------------------------------------------- t-warren
    w1: 'ele me colocou dentro daquele galpão na frente do clube inteiro. quarenta segundos ele levou. eu treino aqui há onze anos',
    w2: 'o vídeo',
    w3: 'trinta e um minutos contínuos. eu não paro, você não pode parar, você perde a contagem de ritmo. e eu passo a câmera pela margem entre as guarnições por hábito',
    w4: 'onze e oito. eu saio da água por uns quatro segundos e tem um cara na rampa de macaquinho de sênior com a touca fora. é o graham. cabelo, corpo, a fita no punho esquerdo que ele usa desde abril',
    w5: 'quatro segundos. eu já assisti isso umas duzentas vezes e o timecode é gravado pela câmera, não é uma coisa que eu digitei',
    w6: 'por que você discutiu com a pauline',
    w7: 'porque eu queria a em no barco sênior para a primavera e a pauline disse que não enquanto o graham for capitão dele. eu achei que ela quis dizer que a em não estava pronta. ela quis dizer outra coisa e ainda não podia falar',
    w8: 'ela me perguntou em agosto em que ano eu comecei. eu falei 2014. ela disse que bom, e foi embora, e eu não pensei nada disso por quatro meses',
    w9: 'eu pesquisei o robbie nance ontem à noite. quinze anos. tem um banco perto da largada com o nome dele e eu venho gritando parciais por cima daquilo há onze anos',
  },

  /**
   * The chips are digits in both languages and stay digit for digit identical to
   * the English. `c-saul-slipway` is the one the video supplies, and it is the only
   * claim in the pack whose time nobody remembered.
   */
  claims: {
    'c-hester-bar': 'Pauline: no bar do clube, 10:00–10:40',
    'c-saul-river': 'Graham: no rio, no oito, 11:00–11:22',
    'c-dilys-bank': 'Carol: na margem, 10:40–11:40',
    'c-warren-boathouse': 'Warren: no galpão dos barcos, 11:02–11:18 (segundo Graham)',
    'c-warren-bank': 'Warren: na margem, 10:55–11:30 (segundo Carol)',
    'c-hester-boathouse': 'Pauline: no galpão dos barcos, 10:50–11:22 (segundo Carol)',
    'c-saul-boathouse': 'Graham: no galpão dos barcos, 11:03–11:08 (segundo Carol)',
    'c-imo-river': 'Em: no rio, no oito, 11:00–11:22',
    'c-imo-bank': 'Em: na margem com os reservas, 10:55–11:25 (segundo Graham)',
    'c-saul-slipway': 'Graham: na rampa, 11:08–11:14 (no vídeo)',
  },

  motives: {
    'm-nance':
      'O livro de saída original tem S. Brightwell na coluna do responsável pelo sábado em que Robbie Nance se afogou, em 2009, e não o treinador morto que apresentaram ao inquérito. Pauline estava com os dois livros na mesa dela e ia levá-los ao legista na segunda.',
  },

  contradictions: {
    'x-saul-boathouse':
      'Ele se colocou na água das onze até onze e vinte, com sete testemunhas dentro do mesmo barco. Carol Prentice ficou de pé no alto da rampa por uma hora e viu ele entrar naquele galpão dos barcos de uniforme onze e três, e achou que ele tinha voltado para pegar uma chave.',
    'x-imo-seat':
      'Ele falou para o clube que Emma Kerr estava na margem com os reservas. Ela estava no banco cinco, com o macaquinho dele e a touca dele, porque ele pediu dez e vinte nos cavaletes e ela queria aquele banco desde os onze anos. Oito pessoas saíram naquele barco e oito voltaram. Ninguém nunca conta quais oito.',
    'x-saul-slipway':
      'Warren Ako filma os trinta e um minutos inteiros sem parar, porque parar perde a contagem de ritmo. Às 11:08 ele sai da água por quatro segundos e tem um homem na rampa de macaquinho de sênior com a touca fora, com uma fita no punho esquerdo que está ali desde abril. O timecode é gravado pela câmera.',
    'x-warren-bank':
      'Graham colocou Warren dentro do galpão dos barcos na frente do clube inteiro, em quarenta segundos, com base numa discussão sobre uma seletiva de juniores. Warren não saiu daquela margem por meia hora e Carol viu ele não sair, e o vídeo que ele estava fazendo é o que encerra a questão.',
  },

  confrontation: {
    opening:
      'Dezenove anos ela dirigiu este clube e agora tem um policial na sala dela vasculhando os livros de atas. Fala o que você veio falar.',
    beats: {
      'l-boathouse': {
        press:
          'Você se colocou na água a partir das onze. A Carol viu você entrar naquele galpão dos barcos de uniforme onze e três e achou que você tinha voltado para pegar uma chave.',
        rebuttal:
          'Ela tem setenta e nove anos e todos nós estamos vestidos de forma idêntica. Ela mesma disse isso, para um policial, com essas palavras.',
      },
      'l-seat': {
        press:
          'Você falou para o clube que a Em estava na margem com os reservas. Ela estava no banco cinco com o seu macaquinho, porque você pediu nos cavaletes e ela queria aquele barco desde os onze anos.',
        rebuttal:
          'Uma júnior que sentou numa guarnição sênior sem inscrição e passou três dias montando como não ser expulsa por isso. Claro que ela tem uma história agora.',
      },
      // l-slipway and l-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing here
      // to translate and a line would break the scene.
      'l-slipway': {
        press:
          'O Warren não para a câmera, porque parar perde a contagem de ritmo. Onze e oito, quatro segundos, um homem na rampa com a touca fora e a fita no punho esquerdo. O timecode é gravado pela câmera.',
      },
      'l-why': {
        press:
          'E o livro de saída que saiu da casa da Dorothy Nance tem o seu nome na coluna do responsável por aquele sábado. Não o de Ken Wardle. A Pauline estava com os dois livros na mesa dela e ia ao legista na segunda.',
      },
    },
    deflections: [
      'Isso é um clube cheio de gente que se conhece há trinta anos. Todo mundo tem uma versão.',
      'Você não aparece aqui desde que parou de remar. Você não sabe o que é este lugar.',
      'Volta quando você tiver alguma coisa que não seja a vista de alguém.',
    ],
    confession:
      'O rio estava dois pés acima e eu mandei eles saírem mesmo assim, porque a gente tinha uma seletiva no fim de semana seguinte e eu tinha vinte e quatro anos e achava que quinze dias sem treinar era a pior coisa que podia acontecer com alguém.\n\nO Robbie me pediu para não sair. Na balsa, na frente de outros dois meninos. Ele disse a água parece rápida e eu disse a água sempre parece rápida, e ele foi, porque eu mandei.\n\nKen Wardle botou o nome dele naquela coluna três dias depois. Eu não pedi para ele fazer isso. Ele fez, e me contou que tinha feito, e eu não falei nada, e essa é a minha defesa inteira e ela não vale nada.\n\nEla entrou no galpão dos barcos para me contar primeiro. Disse que um homem tem direito de ouvir de uma pessoa. Dezenove anos e ela ainda achava que era assim que se fazia.\n\nE tem mais uma coisa e eu vou falar porque uma hora você vai ouvir.\n\nUm homem que se dizia o Keeper me ligou na quinta. Disse que era do gabinete do legista, fazendo uma revisão, e se eu podia confirmar alguns detalhes de 2009. E aí ele falou daquela manhã como se tivesse estado na margem para assistir.\n\nEle sabia que o Robbie pediu para não sair. Isso nunca esteve no inquérito. Nunca esteve no jornal. Dois meninos ouviram e nenhum dos dois nunca falou aquilo em voz alta, eu conferi, eu conferi naquele ano e conferi depois.\n\nEle me disse aquilo como quem lembra o outro de uma coisa em que os dois estiveram juntos.\n\nE aí ele me perguntou o que a Pauline ia fazer na segunda. E eu contei. Eu sentei na minha cozinha e contei para uma voz no telefone exatamente o que ela ia fazer e exatamente quando, e ele nunca me contou nada.',
  },

  coda: {
    from: 'Número desconhecido',
    messages: [
      'Ravensholt. Oito num barco e ninguém contando. Essa é boa e eu não vi vindo, o que hoje em dia não acontece com frequência.',
      'Você foi gentil com a menina. Eu reparei. Isso te custou dois dias e eu não os teria gastado.',
      'Se pergunte como o Keeper, revisando um inquérito de 2009, sabia o que foi dito numa balsa por um menino de quinze anos. Dois meninos ouviram. Nenhum dos dois nunca repetiu.',
      'Você está chegando mais perto da pergunta errada. Continua assim mesmo.',
    ],
  },

  epilogue:
    'O inquérito de 2009 foi reaberto na primavera com base num livro de saída que passou dezesseis anos numa caixa no quarto de hóspedes da Dorothy Nance.\n\nEmma Kerr não foi expulsa. Carol Prentice foi à diretoria com uma declaração escrita, se perdeu completamente no meio dela, e terminou dizendo que o clube tinha pedido a uma menina de dezenove anos que escolhesse entre um barco e um homem, e que o clube dificilmente podia reclamar da escolha dela. Em remou no banco cinco pelos sêniores na primavera, com inscrição.\n\nWarren Ako entregou à polícia trinta e um minutos ininterruptos de rio e quatro segundos de rampa.\n\nA bolsa de Pauline Vaine ficou embaixo dos cavaletes o tempo inteiro. Os dois livros ainda estavam dentro. Ela tinha posto um clipe na página e escrito, a lápis, na lateral da folha: contar ao Graham primeiro.',
};
