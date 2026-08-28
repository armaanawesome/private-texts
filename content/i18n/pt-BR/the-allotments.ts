import type { CaseTranslation } from '../caseText';

/**
 * Case 11 — "As Hortas". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. Whose fork, and whose shed. Everybody on that site can name the fork at
 *    forty feet, which is exactly why nobody asked where it had been standing.
 *    So the fork keeps one name — `o garfo de jardinagem com fita no cabo`,
 *    shortened to `o garfo enfitado` on both chips the way the English shortens
 *    it — and the ten days it spent inside Wilf's door are stated plainly in v4,
 *    j5 and `x-fork`. It is the optional proof, not a required one, and it
 *    convicts nobody: it only says who was standing close enough to reach it.
 *
 * 2. The fire that was never lit. Deb's alibi is an action, so the words for it
 *    stay fixed: `queimando a poda` on the chip and in her own mouth (s4), and
 *    `a pilha dela nunca foi acesa` in the proof. The only smoke on the site is
 *    Ted Harrap on 40, in Sami's account and in the revelation both.
 *
 * 3. Allotment words, in the Portuguese a Brazilian horta uses: `o lote` for a
 *    plot, `os hortelões` for the plotholders, `o galpão` for a shed, `a fileira
 *    dos galpões` for the shed row, `os regadores` for the cans, `a poda` for the
 *    prunings, `os cadeados` for the padlocks, `o ferro-velho` for the scrapyard,
 *    `o descarte irregular` for fly tipping.
 *
 * 4. Names and places. People keep theirs: Wilf Sankey, Deborah Threlfall, Nev
 *    Ashworth, Joyce Ubani, Sami Rahimi, Ray Threlfall, Ted Harrap. Descriptive
 *    places translated:
 *
 *      you   → Você     site    → as hortas de Carr Bank
 *      wilf  → Wilf     plot14  → o lote 14
 *      deb   → Deb      plot3   → o lote 3
 *      nev   → Nev      shedrow → a fileira dos galpões
 *      joyce → Joyce    tank    → o tanque de água
 *      sami  → Sami     lane    → a viela de Carr Bank
 *
 *    `o tanque de água` rather than `a caixa d’água`, which is the more idiomatic
 *    Brazilian phrase but carries an apostrophe into a single-quoted string for no
 *    gain.
 *
 * 5. Voice. Six people, split by who finishes and who lowercases the names.
 *
 *      Wilf, Joyce, Deb and Sami write in full sentences and land the stop. Deb
 *        is the interesting one there: she has three messages, all in the group,
 *        all polished, because she is building something.
 *      Nev is lowercase throughout and lowercases people too — `deb threlfall`,
 *        `sami` — which is what separates him from the player, who is also
 *        lowercase but has almost nothing to say.
 *
 * The player is unmarked. The English says `He was your father`, not `you are his
 * daughter`, in both the briefing and the confrontation opening, and the
 * Portuguese keeps that shape: the relationship is named from Wilf's side, so
 * nothing agrees with the player.
 *
 * No arc content. Pack 11 is standalone: no Keeper, no coda.
 */
export const theAllotmentsPtBr: CaseTranslation = {
  title: 'As Hortas',
  blurb:
    'Todo mundo naquelas hortas sabe de quem é o garfo. Ninguém perguntou em qual galpão ele estava havia dez dias.',

  characters: {
    you: 'Você',
    wilf: 'Wilf',
    deb: 'Deb',
    nev: 'Nev',
    joyce: 'Joyce',
    sami: 'Sami',
  },

  places: {
    site: 'as hortas de Carr Bank',
    plot14: 'o lote 14',
    plot3: 'o lote 3',
    shedrow: 'a fileira dos galpões',
    tank: 'o tanque de água',
    lane: 'a viela de Carr Bank',
  },

  objects: {
    fork: 'o garfo de jardinagem com fita no cabo',
  },

  threads: {
    't-wilf': 'Pai',
    't-society': 'Hortelões de Carr Bank',
    't-nev': 'Nev',
    't-sami': 'Sami',
    't-joyce': 'Joyce Ubani',
  },

  briefing: {
    causeOfDeath: 'Um único golpe. O garfo ainda estava no caminho ao lado dele.',
    ruling:
      'Em aberto. Existe uma briga de quinze anos naquelas hortas por causa de uma cerca viva, e o garfo pertence ao homem do outro lado dela.',
    opening:
      'Wilf Sankey era secretário das hortas de Carr Bank havia trinta e um anos e tinha escrito a ata de todas as assembleias gerais no mesmo caderno de capa dura.\n\nEle foi encontrado na fileira dos galpões sete e meia de uma noite de outubro, com a temporada de queima aberta havia dois dias e o garfo de alguém ao lado dele.\n\nEle era o seu pai. Ele te ligava todo domingo e falava da pressão da água.',
  },

  messages: {
    // ----------------------------------------------------------------- t-wilf
    w1: 'A prefeitura escreveu de novo sobre os lotes sem cultivo. Quatro nas nossas hortas e eles querem uma decisão até o fim do mês.',
    w2: 'a deb é um deles',
    w3: 'É. Dois terços daquilo é grama-seda e ela não vira uma pá desde que o Ray morreu, e em maio faz três anos.',
    w4: 'então você tem que tirar o lote dela',
    w5: 'Eu tenho que fazer o que o contrato diz ou tenho que escrever pedindo que não me obriguem. Estou sentado com uma folha em branco desde terça.',
    w6: 'Aquele galpão é o galpão do Ray. Ele construiu em 1998 com uma entrega de paletes e metade daquilo não está no esquadro. Ela senta lá dentro no sábado com uma garrafa térmica.',
    w7: 'pai',
    w8: 'Eu fiz. Duas laudas, recomendando uma isenção por motivo humanitário, e eu escrevi lá dentro que um lote não é só um lote, o que eles vão detestar.',
    w9: 'Eu vou contar para ela hoje à noite antes de postar. Ela teve três anos de gente falando do lote dela na frente dela e eu prefiro que ela ouça de pé.',
    w10: 'Estou lá em cima agora fazendo os cadeados antes de escurecer. Me liga amanhã que eu te conto como foi.',

    // -------------------------------------------------------------- t-society
    s1: 'Hortelões. O Wilf foi encontrado na fileira dos galpões na terça à noite e ele morreu. A polícia isolou a ponta de cima e as hortas ficam fechadas até eles liberarem. Eu sou secretária interina a partir desta mensagem e sinto muito por fazer isso assim.',
    s2: 'trinta e um anos ele fez a ata e a água e a caçamba e o pedido de sementes e nenhum de nós nunca pediu. eu briguei com ele durante quinze deles por causa de uma cerca viva e eu daria muita coisa para estar brigando com ele agora',
    s3: 'Eu fiquei no 14 a noite toda. A temporada de queima começou domingo e eu tinha quinze dias de poda acumulada e fiquei lá na ponta de baixo com aquilo das seis até sete e meia.',
    s4: 'Queimando o tempo todo. Qualquer um que estivesse a favor do vento na terça vai te dizer.',
    s5: 'E o garfo é do Nev. Todo mundo naquelas hortas sabe que o garfo é do Nev, ele tem aquela fita no cabo desde o Jubileu.',
    s6: 'deb',
    s7: 'Já chega. Seja lá o que alguém tenha a dizer, diga a um policial e não a sessenta e uma pessoas que dividem um tanque de água.',

    // ------------------------------------------------------------------ t-nev
    v1: 'o seu pai e eu brigamos em 2010 por causa de uma cerca viva e nunca uma vez paramos de conversar. é isso que é uma horta e ninguém de fora nunca entendeu isso',
    v2: 'o garfo é seu',
    v3: 'é. fita no cabo, minhas iniciais queimadas na haste, e eu não ponho a mão nele desde a semana retrasada porque o seu pai pegou emprestado',
    v4: 'ele veio buscar na sexta para as framboeseiras da ponta de cima e eu falei fica com ele até terminar e desde então ele está de pé no galpão dele. a joyce viu ele carregar até lá',
    v5: 'eu fiquei no 3 desde as seis com uma lanterna limpando o resto do feijão. o sami estava dois lotes abaixo o tempo todo e a gente gritava um com o outro sobre futebol',
    v6: 'e eu vou dizer isso uma vez. deb threlfall botou o meu nome num grupo de sessenta e uma pessoas antes de o seu pai estar enterrado. eu conheço ela há vinte anos e não sabia que ela tinha isso dentro dela',
    v7: 'fala com o sami. ele é mais novo de horta e não deve nada a ninguém daquele lugar, o que em Carr Bank faz dele a única testemunha confiável em cento e quarenta lotes',

    // ----------------------------------------------------------------- t-sami
    m1: 'Eu tenho o lote 22 há catorze meses. O seu pai me deu um saco de mudas de cebola no meu primeiro sábado e disse para eu não perder tempo com milho doce e ele estava certo.',
    m2: 'Eu fui muito ao tanque na terça. As caixas de captação do 22 ficam vazias até o telhado subir, então eu encho regadores, e são quatro viagens.',
    m3: 'a deb estava queimando',
    m4: 'Não. E eu revi isso porque eu não queria ser a pessoa que diz isso. A pilha dela estava lá e não estava acesa. Eu passei na ponta do 14 quatro vezes e não havia fumaça nenhuma naquelas hortas a noite inteira além do Ted Harrap no 40.',
    m5: 'Ela esteve no tanque comigo duas vezes. A gente conversou sobre o telhado. Ela estava completamente normal e perguntou da minha mãe.',
    m6: 'você viu ela nos galpões',
    m7: 'Seis e meia, mais ou menos. Ela subiu a fileira dos galpões com um regador vazio em cada mão, o que eu reparei porque ninguém carrega regador vazio para lá, o tanque é para o outro lado.',
    m8: 'Pergunta para a Joyce sobre a viela. Tem uma câmera no portão do ferro-velho que olha direto para cima dela e ela vem tentando conseguir essas imagens por causa do descarte irregular há dois anos.',

    // ---------------------------------------------------------------- t-joyce
    j1: 'Eu sou tesoureira há dezenove anos e eu guardo tudo, o que as pessoas acham engraçado até a semana em que não acham.',
    j2: 'O ferro-velho me deu onze dias de imagem na quinta, depois de me negar por dois anos por causa do descarte irregular. Foi preciso um policial pedir em vez de mim.',
    j3: 'Ela olha direto para cima da viela de Carr Bank. Deborah Threlfall sobe por ela às 19:02 e desce de volta às 19:11, e não há fogo visível naquelas hortas em nenhum momento dos onze dias além do fogo do Ted.',
    j4: 'o garfo',
    j5: 'O Wilf carregou aquele garfo até o próprio galpão na sexta da semana retrasada e eu vi ele fazer isso, porque ele parou e reclamou do ombro o caminho inteiro. Ficou de pé atrás da porta dele daquele dia até terça.',
    j6: 'Então quem pegou aquilo pegou naquela fileira de galpões, de pé onde ele estava de pé. Esquece o Nev. Aquilo diz quem estava perto o bastante para alcançar.',
    j7: 'E o Wilf ficou subindo e descendo aquela fileira desde as cinco com os cadeados. Ele faz isso todo outubro e leva uma hora e meia porque ele conversa com todo mundo.',
    j8: 'A carta da prefeitura sobre os quatro lotes veio para mim também. A Deborah está sentada em cima daquilo desde o dia onze e me ligou duas vezes perguntando se um recurso custa alguma coisa.',
    j9: 'Eu disse a ela que quem decide é o Wilf. Foram essas as minhas palavras. Eu disse por gentileza, porque o Wilf gostava dela, e eu penso no formato daquela frase toda noite desde então.',
  },

  claims: {
    'c-wilf-tank': 'Wilf: no tanque de água, 17:00–17:25',
    'c-deb-plot': 'Deb: no lote 14, 18:00–19:30',
    'c-deb-burning': 'Deb: queimando a poda, 18:00–19:30',
    'c-fork-nev': 'Nev: estava com o garfo enfitado, 18:00–19:30 (segundo Deb)',
    'c-nev-plot3': 'Nev: no lote 3, 18:00–20:00 (segundo Sami)',
    'c-sami-tank': 'Sami: no tanque de água, 18:20–19:20',
    'c-deb-tank': 'Deb: enchendo regadores no tanque, 18:20–19:20 (segundo Sami)',
    'c-deb-shedrow': 'Deb: na fileira dos galpões, 18:30–18:50 (segundo Sami)',
    'c-deb-lane': 'Deb: na viela de Carr Bank, 19:00–19:10 (câmera do ferro-velho)',
    'c-fork-wilf': 'Wilf: estava com o garfo enfitado, 18:00–19:30 (segundo Joyce)',
    'c-wilf-shed': 'Wilf: na fileira dos galpões, 17:30–19:30 (segundo Joyce)',
  },

  motives: {
    'm-plot':
      'A prefeitura queria uma decisão sobre quatro lotes sem cultivo até o fim do mês e o dela era um deles. O lote 14 era o lote do Ray e o galpão é o galpão que ele construiu em 1998, e ela senta lá dentro aos sábados nos três anos desde que ele morreu.',
  },

  contradictions: {
    'x-deb-shedrow':
      'Ela se colocou na ponta de baixo do 14 das seis até sete e meia. Lá pelas seis e meia Sami Rahimi viu ela subir a fileira dos galpões carregando um regador vazio em cada mão, o que ele reparou porque ninguém carrega regador vazio para lá. O tanque é para o outro lado.',
    'x-deb-burning':
      'Ela disse que estava queimando o tempo todo e que qualquer um a favor do vento confirmaria. A pilha dela nunca foi acesa. Sami passou na ponta do 14 quatro vezes e a única fumaça em Carr Bank naquela noite era o Ted Harrap no 40, e ela esteve no tanque enchendo regadores com o Sami duas vezes, conversando sobre o telhado dele, perguntando da mãe dele.',
    'x-deb-lane':
      'A câmera do ferro-velho olha direto para cima da viela de Carr Bank e Joyce Ubani vinha pedindo aquelas imagens havia dois anos por causa do descarte irregular. Foi preciso um policial pedir em vez dela. Deborah Threlfall sobe a viela às 19:02 e desce de volta às 19:11, e em onze dias de imagem não há fogo naquelas hortas além do fogo do Ted.',
    'x-fork':
      'Todo mundo naquelas hortas identifica aquele garfo a quarenta pés, que é exatamente o motivo de ninguém ter perguntado onde ele tinha estado. Wilf pegou emprestado na sexta da semana retrasada para as framboeseiras e carregou até o próprio galpão sozinho, reclamando do ombro o caminho inteiro, e Joyce viu ele fazer isso. Ficou de pé atrás da porta dele desde então. Aquilo não é prova sobre Nev Ashworth. É prova sobre estar de pé onde ele estava de pé.',
  },

  confrontation: {
    opening:
      'Ele era o seu pai e você veio aqui em cima fazer isso nas hortas dele. Eu quero que você saiba que eu acho que ele teria detestado isso.',
    beats: {
      'a-shedrow': {
        press:
          'Você estava no 14 das seis até sete e meia. Seis e meia o Sami viu você subir a fileira dos galpões com um regador vazio em cada mão.',
        rebuttal:
          'Um rapaz que está naquelas hortas há catorze meses, em outubro, no fim da tarde, andando para lá e para cá com regador. Ele não sabe o que viu.',
      },
      'a-burning': {
        press:
          'Você disse que estava queimando o tempo todo. A sua pilha nunca foi acesa. Ele passou na ponta do 14 quatro vezes e você esteve no tanque com ele duas vezes, perguntando da mãe dele.',
        rebuttal:
          'Não pegava fogo. Choveu no domingo. Pergunta a qualquer um que já tenha tentado queimar quinze dias de poda molhada.',
      },
      // a-lane and a-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence.
      'a-lane': {
        press:
          'A câmera do ferro-velho olha direto para cima da viela. Você sobe por ela dois minutos depois das sete e desce de volta onze minutos depois das sete, e não há fogo naquelas hortas em onze dias de imagem.',
      },
      'a-why': {
        press:
          'A prefeitura queria quatro lotes decididos até o fim do mês e o seu era um deles. A Joyce te disse que quem decide é o Wilf.',
      },
    },
    deflections: [
      'Aquilo é cento e quarenta pessoas que passaram três anos falando do meu lote na minha frente.',
      'Você não aparece aqui em cima desde o café do funeral. Você não conhece estas hortas.',
      'Me traz uma coisa que não seja alguém com um regador na mão.',
    ],
    confession:
      'Ele disse Deb, você tem um minuto, e botou a mão no bolso do casaco.\n\nEu já revi aquela mão mil vezes.\n\nPorque a Joyce tinha me dito no domingo. Quem decide é o Wilf, ela disse, e disse por gentileza, e eu fui para casa e não dormi e até terça eu já tinha construído aquilo inteiro. A carta no bolso dele. Ele fazendo aquilo de pé na fileira dos galpões para eu não poder dar escândalo na sede. O galpão do Ray com um adesivo da prefeitura na porta até o Natal.\n\nE o garfo estava de pé atrás da porta dele e eu nem precisei procurar.\n\nEle nunca chegou a terminar a frase. Essa é a coisa que eu quero escrita em algum lugar. Eu nunca ouvi o fim daquilo.\n\nEu tive oito semanas para descobrir o que tinha naquele bolso e eu sei desde mais ou menos a segunda semana, porque é o Wilf, e só existia uma coisa que aquilo ia ser.',
  },

  epilogue:
    'A carta estava no bolso interno do casaco dele, dobrada em três, num envelope endereçado ao setor de parques e áreas verdes e selado, pronto para ir.\n\nDuas laudas. Recomendava uma isenção por motivo humanitário para a titular do lote 14 e expunha o caso com algum detalhe, e o último parágrafo dizia que um lote não é só um lote e que a diretoria saberia o que ele queria dizer mesmo que a prefeitura não soubesse.\n\nA prefeitura concedeu em janeiro, com base numa carta de um homem que estava morto desde outubro, e Joyce Ubani leu a decisão em voz alta na assembleia geral e depois teve que parar e passar o caderno para outra pessoa.\n\nO lote 14 foi assumido pela mãe de Sami Rahimi na primavera. Ela manteve o galpão. A diretoria votou por unanimidade que ele fica, sob o argumento de que ele não está no esquadro e de que Ray Threlfall construiu aquilo com uma entrega de paletes em 1998, o que agora está escrito na ata.',
};
