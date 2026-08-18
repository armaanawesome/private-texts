import type { CaseTranslation } from '../caseText';

/**
 * Case 7 — "O Refúgio". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. Order, not clock. Nobody in that building knows what time anything happened;
 *    they know what happened before what. So the sequence words carry the case and
 *    they stay plain and countable: `primeiro`, `segunda`, `por último`. Anne lists
 *    the arrivals in m3 and the whole pack is the player noticing that one of them
 *    happened twice.
 *
 * 2. Two times ten minutes apart, belonging to two different men. `vinte pras
 *    sete` is when Iain says he started walking; `dez pras sete` is when somebody
 *    crossed the main room with the torch off. Ten minutes and one of them is a
 *    lie. They are the easiest pair in the pack to smudge into each other, so both
 *    are pinned in the test, in the messages, the revelation and the press.
 *
 * 3. Names and places. People keep their names: Struan Baillie, Iain Lamont, Anne,
 *    Sandra, Hamish Dunnet, Mrs Nkemelu, and Corrie Fhithich with them. `Raven’s
 *    Line` stays untranslated: it is a published book title and a named route, and
 *    the bothy it echoes is Gaelic already. Descriptive places are translated, each
 *    a phrase the prose actually says:
 *
 *      you    → Você      bothy    → o refúgio
 *      struan → Struan    mainroom → a sala principal
 *      keir   → Iain      backroom → o quarto dos fundos
 *      morven → Anne      porch    → o vestíbulo
 *      pris   → Sandra    hill     → a montanha
 *      hamish → Hamish
 *
 *    Distances stay imperial — `quatro milhas` — because converting changes a fact.
 *
 * 4. Voice. Six people, and casing alone will not separate them, so the axis is
 *    who finishes. Sandra and Hamish land a full stop on every message: she has
 *    been trying to get somebody to listen since Sunday and he has been maintenance
 *    officer since 1998, and both of them are being careful for the record. Struan
 *    and Iain both capitalise and neither ever finishes — the tell between those
 *    two is content, because Struan talks himself towards the thing he is dreading
 *    and Iain moves every question onto somebody else. Anne is lowercase
 *    throughout, capitalising only the names, which is what a person types when
 *    they have been sitting with something for eleven days.
 *
 * 5. Gender. The player is unmarked. No rephrase was forced here: every line
 *    addressed to them runs on a verb — `Você organizou`, `Você quebrou o
 *    tornozelo`, `Você não estava lá` — so nothing agrees. Swept in the test so it
 *    stays that way.
 *
 * No arc content. Pack 7 is standalone: no Keeper, no coda.
 *
 * Two things reproduced from the English rather than quietly corrected, both
 * flagged, both asserted against the English so a source fix forces this file to
 * move in the same commit:
 *
 *   - The epilogue calls Sandra `Priscilla Nkemelu`. Her id is `pris`, so this is
 *     the rename-leak class, and renameLeak.test.ts does not catch it because its
 *     pattern is `\bPris\b` and `Priscilla` continues past the boundary.
 *   - The bothy book is signed `K. Lamont`, five times, while the man is called
 *     Iain Lamont. `K` is the id `keir`. This one is load-bearing rather than
 *     cosmetic: the entire book contradiction is the player matching a signature
 *     to a man, and an initial that belongs to neither of his names breaks that.
 */
export const theBothyPtBr: CaseTranslation = {
  title: 'O Refúgio',
  blurb:
    'Cinco pessoas saíram de uma nevasca para dentro de uma sala, com horas de diferença. Elas concordam em tudo, menos na ordem.',

  characters: {
    you: 'Você',
    struan: 'Struan',
    keir: 'Iain',
    morven: 'Anne',
    pris: 'Sandra',
    hamish: 'Hamish',
  },

  places: {
    bothy: 'o refúgio',
    mainroom: 'a sala principal',
    backroom: 'o quarto dos fundos',
    porch: 'o vestíbulo',
    hill: 'a montanha',
  },

  threads: {
    't-struan': 'Struan',
    't-group': 'Corrie Fhithich',
    't-morven': 'Anne',
    't-pris': 'Sandra',
    't-hamish': 'Hamish Dunnet',
  },

  briefing: {
    causeOfDeath:
      'Fratura de crânio. Existe uma lareira de pedra no quarto dos fundos e ele tinha bebido.',
    ruling:
      'Registrado como queda. Ninguém conseguiu subir o vale de carro até domingo e a essa altura onze pessoas já tinham passado por aquela sala.',
    opening:
      'O refúgio de Corrie Fhithich tem duas salas, uma lareira de pedra, nenhuma eletricidade e nenhum sinal. Existe um livro ao lado da porta que as pessoas assinam porque as regras dizem que se deve assinar.\n\nStruan Baillie foi encontrado no quarto dos fundos na manhã de sábado. Outras cinco pessoas tinham entrado ali fugindo da nevasca na noite anterior, uma de cada vez, com horas de diferença, e nenhuma delas tem um relógio que concorde com o de qualquer outra.\n\nVocê organizou o fim de semana. Você quebrou o tornozelo em novembro e ficou em casa.',
  },

  messages: {
    // --------------------------------------------------------------- t-struan
    s1: 'O livro está na gráfica!! Raven’s Line, capa dura, fevereiro. Vinte e dois anos subindo coisas e uma delas paga uma hipoteca',
    s2: 'parabéns. sério',
    s3: 'O Iain vem neste fim de semana. Primeira vez em uns quatro anos que ele diz sim a alguma coisa que eu organizo',
    s4: 'vocês dois estão bem?',
    s5: 'Existe uma conversa que a gente nunca teve e eu decidi que vou ter essa conversa no refúgio com uma bebida dentro de mim, que é como começou toda má ideia que eu já tive',
    s6: 'sobre a linha',
    s7: 'Ele escalou aquilo solo em 2016 e contou para uma pessoa e a pessoa era eu, e eu botei o meu nome naquilo em 2018 e venho comendo à custa disso desde então',
    s8: 'Eu escrevi o nome dele nos agradecimentos. Isso não basta e eu sei que não basta. Eu vou oferecer a coisa inteira a ele, na frente dos outros, e deixar que ele decida o que quer que seja feito',
    s9: 'isso vai acabar com o seu livro',
    s10: 'Pois é. Enfim',
    s11: 'Cheguei primeiro, fogo aceso, neve absolutamente horizontal lá fora. A Anne está aqui. Mais ninguém ainda e vai ser uma noite longa para quem estiver naquela trilha',

    // ---------------------------------------------------------------- t-group
    p1: 'sinal, enfim. eu não sei como escrever isso então vou escrever mal. o Struan morreu no refúgio na sexta à noite. a gente encontrou ele no sábado de manhã no quarto dos fundos',
    p2: 'A polícia subiu no domingo assim que a estrada abriu. Levaram o livro e tomaram os depoimentos e ficaram satisfeitos de que tinha sido uma queda contra a lareira.',
    p3: 'Eu cheguei por último. Vinte pras dez, meio morto, assinei o livro na porta porque o Hamish obriga. O Struan já tinha ido para os fundos a essa altura e eu nunca cheguei a ver ele',
    p4: 'Eu estava naquela trilha desde umas vinte pras sete. Três horas para quatro milhas. Era isso que aquela noite era',
    p5: 'eu fiquei naquela sala principal das seis até a gente desistir lá pelas onze. eu não saí do lugar, eu estava com o fogão aceso e não ia largar aquele lugar por ninguém',
    p6: 'E a mulher que limpa a casa dele ficou entrando e saindo daquele quarto dos fundos a noite toda, o que ninguém mencionou para nenhum policial até agora',
    p7: 'A senhora Nkemelu entrou junto comigo e ela é sócia deste clube e está naquela montanha há mais tempo que você, Iain.',
    p8: 'a gente não pode fazer isso aqui não',

    // --------------------------------------------------------------- t-morven
    m1: 'você organizou isso e você não estava lá e eu fico pensando em como isso vai ficar com você, então eu vou te contar tudo que eu lembro de verdade em vez de tudo que eu falei para um policial às oito da manhã',
    m2: 'a questão de um refúgio é que não tem relógio. não tem luz nenhuma além de lanterna de cabeça e de um fogão. você não sabe que horas são, você sabe o que já aconteceu',
    m3: 'o Struan primeiro, eu segunda lá pelas seis. o Hamish e a Sandra juntos, e o Iain por último, entrando batendo o pé e xingando e todo mundo fazendo festa porque ele parecia arrasado',
    m4: 'essa foi a primeira vez que você viu o iain naquela noite',
    m5: 'não. e eu estou sentada com isso há onze dias',
    m6: 'lá pelas dez pras sete alguém entrou na sala principal, sem lanterna acesa, não falou, foi direto para os fundos. eu presumi que era o Struan voltando do depósito de turfa. não era o Struan porque o Struan já estava lá nos fundos',
    m7: 'foi a jaqueta. azul, remendo laranja no ombro, aquela Berghaus velha que ele tem há anos. eu não pensei uma única coisa sobre aquilo até três dias depois',
    m8: 'por que você não falou',
    m9: 'porque às oito da manhã com ele morto na sala ao lado eu falei o que todo mundo falou, que é que o Iain chegou por último vinte pras dez. e ele chegou. esse é o problema inteiro. ele chegou mesmo vinte pras dez',
    m10: 'a Sandra ficou no vestíbulo aquela hora inteira arrumando uma mochila. fala com ela. ela está tentando fazer alguém escutar desde domingo e todo mundo decidiu que ela é a faxineira',

    // ----------------------------------------------------------------- t-pris
    r1: 'Nove anos eu cuidei da casa daquele homem. Nove anos da correspondência dele e do lixo dele e do banheiro dele, então sim, eu sei coisas sobre ele. Isso não é motivo, isso é uma terça-feira.',
    r2: 'Eu também caminho. Eu fiz os Munros duas vezes e a segunda vez no inverno, e eu sou do mesmo clube que o Hamish Dunnet, e eu gostaria que uma pessoa nisso tudo segurasse esses dois fatos ao mesmo tempo.',
    r3: 'o iain colocou você no quarto dos fundos',
    r4: 'Colocou. Eu estava no vestíbulo com a minha mochila aberta ocupando o chão inteiro das sete até as oito, e a Anne me viu fazendo isso, e o Hamish passou por cima de mim duas vezes.',
    r5: 'E eu vou te contar a coisa que eu sei, já que saber coisas sobre ele é aparentemente para o que eu sirvo.',
    r6: 'Ficaram duas cartas de uma editora naquela mesa da cozinha durante um mês e eu tirei pó em volta delas durante um mês. Ele tinha escrito um parágrafo no verso de uma delas, a lápis. Dizia: contar a verdade sobre a Raven e deixar que cancelem.',
    r7: 'Um homem não escreve isso no verso da carta de uma editora se não tiver decidido. Ele tinha decidido. Ele ia lá para cima para entregar aquilo de volta.',

    // --------------------------------------------------------------- t-hamish
    h1: 'Eu sou responsável pela manutenção daquele refúgio desde 1998 e subo lá quatro vezes por ano há vinte e sete anos, e nunca uma vez sequer precisei pensar no livro como registro de coisa nenhuma.',
    h2: 'Eu confiro o livro quando chego. Não é regra, é hábito, e eu fiz isso oito horas com uma lanterna de cabeça entre os dentes que nem em toda outra vez.',
    h3: 'Havia cinco nomes nele oito horas. Struan, Anne, eu mesmo, a senhora Nkemelu, e K. Lamont. O dele era o último dos cinco e já estava seco.',
    h4: 'Vinte pras dez ele entrou por aquela porta e assinou de novo, na linha seguinte, na frente de quatro pessoas. Dois K. Lamont, um embaixo do outro. A polícia levou o livro e eu não acredito que alguém tenha virado aquela página.',
    h5: 'o quarto dos fundos',
    h6: 'Eu passei para lá lá pelas sete e quinze para pegar o gás reserva, que fica na prateleira acima da lareira. O Struan estava no chão com as costas contra a parede e tinha um homem agachado na frente dele.',
    h7: 'Eu falei desculpa, gás, e peguei o gás, e saí. O Struan tinha bebido e eu já vi aquele homem no chão de um refúgio em quatro ocasiões distintas e não pensei nada sobre nenhuma delas.',
    h8: 'você não viu quem era',
    h9: 'Umas costas e uma jaqueta azul e uma lanterna de cabeça que estava apagada. Eu tenho sessenta e oito anos e era uma sala de pedra iluminada por uma porta. Mas havia cinco pessoas naquele prédio e eu localizei três delas naquele minuto, e o Struan era a quarta.',
    h10: 'A assinatura é a parte que eu não consigo superar. Um homem que está com frio e acabado e acabou de andar quatro milhas não pensa no livro. Um homem que precisa que você lembre da chegada dele pensa.',
    h11: 'O Struan me disse no verão que tinha tirado do Iain Lamont uma coisa que não era dele para tirar, e que ia devolver, e que estava com medo de fazer isso. Eu achei que ele falava de uma dívida.',
  },

  /**
   * The chips are digits in both languages and stay digit for digit identical to
   * the English.
   *
   * `c-keir-book-late` is reproduced exactly as the English has it — the label says
   * 21:40 while the engine holds 20:00–22:00 — because the numbers rule requires the
   * same digits and because changing it would be inventing a fact. It is flagged in
   * the report: the generic chip rule reads that as a mismatch, and it will read the
   * English the same way the moment this pack is registered.
   */
  claims: {
    'c-struan-mainroom': 'Struan: na sala principal, 17:00–18:00',
    'c-keir-book-late': 'Iain: assinou o livro ao chegar, 21:40',
    'c-keir-hill': 'Iain: na trilha da montanha, 18:40–21:40',
    'c-morven-mainroom': 'Anne: na sala principal, 18:00–22:00',
    'c-pris-backroom': 'Sandra: no quarto dos fundos, 19:10–19:40 (segundo Iain)',
    'c-keir-mainroom': 'Iain: na sala principal, 18:50–19:10 (segundo Anne)',
    'c-pris-porch': 'Sandra: no vestíbulo, 19:00–20:00 (segundo Anne)',
    'c-keir-book-early': 'Iain: já tinha assinado o livro às 20:00 (segundo Hamish)',
    'c-keir-backroom': 'Iain: no quarto dos fundos, 19:15–19:30 (segundo Hamish)',
  },

  motives: {
    'm-raven':
      'Iain escalou solo a Raven’s Line em 2016 e contou para uma pessoa. Struan reivindicou aquilo em 2018 e construiu sete anos e um livro em cima daquilo, e tinha decidido devolver na frente de testemunhas naquele fim de semana.',
  },

  contradictions: {
    'x-keir-mainroom':
      'Ele se colocou na trilha das vinte pras sete até vinte pras dez. Lá pelas dez pras sete alguém atravessou a sala principal com a lanterna apagada e não falou, e Anne presumiu que era Struan voltando do depósito de turfa. Struan já estava lá nos fundos. Ela reconheceu a jaqueta e não pensou nada sobre aquilo por três dias.',
    'x-keir-book':
      'Ele assinou o livro na porta vinte pras dez, na frente de quatro pessoas, porque o Hamish obriga. Hamish já tinha lido aquele livro oito horas com uma lanterna de cabeça entre os dentes, e K. Lamont era o quinto nome nele e a tinta estava seca. Existem dois K. Lamont naquela página, um embaixo do outro, e ninguém virou a página.',
    'x-keir-backroom':
      'Sete e quinze Hamish passou para os fundos para pegar o gás reserva e tinha um homem agachado na frente de Struan, que estava no chão com as costas contra a parede. Uma jaqueta azul e uma lanterna de cabeça que estava apagada. Três das cinco pessoas daquele prédio estão localizadas naquele minuto e Struan era a quarta.',
    'x-pris-porch':
      'Ele colocou a mulher que limpa a casa de Struan entrando e saindo do quarto dos fundos a noite toda. Ela estava no vestíbulo das sete até as oito com a mochila aberta ocupando o chão inteiro, Anne viu ela fazendo isso e Hamish passou por cima dela duas vezes. Ela está tentando fazer alguém escutar desde domingo e todo mundo decidiu que ela era a faxineira.',
  },

  confrontation: {
    opening:
      'Você não estava lá. Você quebrou o tornozelo e ficou em casa e leu umas mensagens de texto. Pode falar então, me conta sobre aquela noite.',
    beats: {
      'b-mainroom': {
        press:
          'Você se colocou naquela trilha por três horas. Dez pras sete alguém atravessou aquela sala principal com a lanterna apagada e foi para os fundos, e a Anne reconheceu a jaqueta.',
        rebuttal:
          'Uma sala escura e uma jaqueta azul. Metade da montanha usa aquela jaqueta. Ela teve onze dias e muita gente dizendo a ela que aquilo importa.',
      },
      'b-book': {
        press:
          'Você assinou o livro na porta vinte pras dez na frente de quatro pessoas. O Hamish leu aquele livro às oito e o seu nome já era o quinto nele, e estava seco. Existem dois K. Lamont naquela página.',
        rebuttal: 'Então alguém escreveu o meu nome num livro. Qualquer um escreve um nome num livro.',
      },
      // b-backroom and b-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing here
      // to translate and a line would break the scene.
      'b-backroom': {
        press:
          'Sete e quinze o Hamish passou para pegar o gás. O Struan estava no chão com as costas contra a parede e tinha um homem agachado na frente dele com a lanterna apagada. Três das cinco estão localizadas e o Struan é a quarta.',
      },
      'b-why': {
        press:
          'Você escalou solo a Raven’s Line em 2016 e contou para uma pessoa. Ele botou o nome dele naquilo em 2018 e ia devolver para você naquele fim de semana, na frente de todo mundo, e acabar com o próprio livro fazendo isso.',
      },
    },
    deflections: [
      'Aquilo é uma sala sem luz nenhuma dentro e cinco pessoas que tinham andado por horas.',
      'Você não estava naquela montanha. Você nunca esteve naquela montanha em fevereiro.',
      'Volta com uma coisa que não seja alguém lembrando de um casaco.',
    ],
    confession:
      'Ele ia devolver. Essa é a parte que ninguém vai conseguir segurar na cabeça, então eu vou falar sem rodeio.\n\nEu subi cedo. Vim pelo ombro da montanha e desci antes das seis porque eu já fiz aquela trilha quarenta vezes e ela não leva três horas se você conhece. Eu queria uma hora com ele antes dos outros chegarem.\n\nE ele sentou naquele chão e falou. Falou Iain, é seu, eu vou devolver no domingo na frente de todos eles, eu já deixei escrito no livro.\n\nE eu nunca na minha vida senti nada parecido com o que eu senti ali, e não era gratidão.\n\nSete anos. Sete anos de ficar no fundo das salas enquanto ele contava a história da minha noite. Sete anos de decidir toda manhã não falar. E ele ia desfazer aquilo numa tarde de domingo e ser um homem bom a respeito, e todo mundo ia dizer que coisa extraordinária de se fazer, e aquilo voltava a ser dele. Até a devolução ia ser dele.\n\nEu não levei nada comigo. Tem uma lareira naquela sala e ele já estava no chão.\n\nDepois eu voltei para dentro daquilo por duas horas e meia no escuro, e cheguei vinte pras dez e deixei quatro pessoas fazerem festa para mim, e assinei o meu nome embaixo do meu próprio nome.',
  },

  epilogue:
    'O livro está num depósito de provas da polícia em Aviemore. A página quarenta e um tem K. Lamont escrito duas vezes, com quatro linhas de diferença, no mesmo lápis.\n\nPriscilla Nkemelu foi ouvida como se deve em março, quatro meses depois de ter pedido pela primeira vez. Ela entregou a eles a carta com o parágrafo a lápis no verso, que ela tinha guardado numa gaveta porque ninguém nunca tinha pedido nada a ela.\n\nA Raven’s Line foi publicada em fevereiro com a atribuição original, porque a tiragem já estava encadernada. A segunda edição leva um nome diferente e uma nota de dois parágrafos, e Struan Baillie escreveu as duas coisas ele mesmo no outono antes de morrer.\n\nHamish Dunnet continua subindo quatro vezes por ano. Ele parou de conferir o livro.',
};
