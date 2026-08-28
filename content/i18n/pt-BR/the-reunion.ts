import type { CaseTranslation } from '../caseText';

/**
 * Case 13 — "O Reencontro". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. He did not falsify a clock, he became one. The programme said nine; he spoke
 *    at quarter past eight because the caterers were forty minutes behind. Every
 *    witness in that hall now dates the night off a sequence he wrote. So the two
 *    times stay fixed and opposed wherever they appear: `nove horas` on the
 *    programme (r4), `oito e quinze` for what actually happened (k6), and the
 *    sentence in k7 that turns one into the other — anybody who told you something
 *    happened after the speech thinks they said after nine and has said after
 *    quarter past eight.
 *
 * 2. Co-presence is never proof, and the pack says so with a rule rather than a
 *    line of dialogue. The four `with_person` chips are deliberate dead ends: pin
 *    any two and the engine answers that both can be true. They are translated
 *    plainly and consistently — `com Nia`, `com Michelle`, `com Mark` — because a
 *    player has to be able to lay them side by side and watch nothing happen.
 *
 * 3. Names and places. People keep theirs: Nia Boateng, Mark Ellory, Michelle
 *    Selkirk, Tobi Marchetti, Colin Vale, Ashley and Sheila Crewe. Mr Vale is
 *    `Sr. Vale` on screen and Colin Vale in the prose, exactly as the English
 *    splits it, and he calls the others by surname — `a senhorita Selkirk`, `a
 *    senhorita Boateng` — which is the whole of a caretaker who taught none of
 *    them anything and knows all their names. Descriptive places translated:
 *
 *      you    → Você       school     → Ardenshaw High
 *      nia    → Nia        hall       → o salão principal
 *      rafe   → Mark       musicblock → o bloco de música
 *      marika → Michelle   carpark    → o estacionamento dos funcionários
 *      tobi   → Tobi       riverpath  → a trilha do rio
 *      corin  → Sr. Vale   branch     → o posto de Calderside
 *
 *    Each begins with an article and Portuguese fuses articles into no, na, do,
 *    da, pelo, pela, ao, à, so the test asserts the raw string rather than
 *    trusting the contraction to leave it intact.
 *
 * 4. Voice. Michelle is the only adult in the pack who types lowercase and never
 *    finishes a sentence, and that is not carelessness — she is the one who never
 *    got to become careful, and she is also the one holding the invoice that
 *    breaks the case. Everyone else writes in full sentences, so they divide by
 *    what they reach for: Mark states his job before his answer, Tobi deflates his
 *    own significance, Vale goes by his rounds rather than by the party, and Nia
 *    interrupts herself.
 *
 * 5. Only two things in this pack are written in digits, and both are machines:
 *    the caterer's invoice at `20:55` and the barrier log at `21:08` and `21:19`.
 *    Ninety people can date the evening and not one of them can time it, which is
 *    the case in one sentence.
 *
 * Gender. The player is unmarked, and this pack makes it easy: they are placed by
 * year group rather than described — `Você era daquele ano e nunca foi daquele
 * grupo` — so nothing agrees.
 *
 * No arc content. Pack 13 is standalone: no Keeper, no coda.
 */
export const theReunionPtBr: CaseTranslation = {
  title: 'O Reencontro',
  blurb:
    'Noventa pessoas podem te dizer com quem estavam. Nenhuma delas pode te dizer que horas eram.',

  characters: {
    you: 'Você',
    nia: 'Nia',
    rafe: 'Mark',
    marika: 'Michelle',
    tobi: 'Tobi',
    corin: 'Sr. Vale',
  },

  places: {
    school: 'Ardenshaw High',
    hall: 'o salão principal',
    musicblock: 'o bloco de música',
    carpark: 'o estacionamento dos funcionários',
    riverpath: 'a trilha do rio',
    branch: 'o posto de Calderside',
  },

  threads: {
    't-nia': 'Nia',
    't-year': 'Ardenshaw 2005',
    't-marika': 'Michelle',
    't-rafe': 'Mark Ellory',
    't-tobi': 'Tobi',
    't-corin': 'Sr. Vale',
  },

  briefing: {
    causeOfDeath:
      'Ela caiu no Calder do alto da barranca. A trilha não tem iluminação e a queda ali é de uns vinte pés.',
    ruling:
      'Em aberto. Duas pessoas já disseram à polícia que é o mesmo trecho de água onde um menino da turma dela se afogou em 2005, e as duas disseram isso sem serem perguntadas.',
    opening:
      'Nia Boateng dava aula para o 4º ano numa escola a onze milhas daquela em que estudou, e tinha organizado o reencontro de vinte anos porque ninguém mais organizaria.\n\nEla foi encontrada na trilha do rio abaixo dos campos às nove e meia, a trinta metros de onde Ashley Crewe caiu no mesmo rio em junho de 2005.\n\nEla te mandou mensagem três semanas atrás. Você era daquele ano e nunca foi daquele grupo, e ela disse que era exatamente por isso que precisava falar com você.',
  },

  messages: {
    // ------------------------------------------------------------------ t-nia
    n1: 'Você não vai lembrar de mim. Eu sentava atrás de você em geografia por dois anos e você desenhou no meu estojo.',
    n2: 'eu lembro de você',
    n3: 'Eu estou fazendo o reencontro. Vinte anos. É no salão e o bufê é o mesmo que fez o da minha tia e eu já tive que ligar quatro vezes para eles.',
    n4: 'Eu queria te perguntar uma coisa e já comecei esta mensagem umas nove vezes.',
    n5: 'A mãe do Ashley Crewe ainda mora na Brantwood Road. Mesma casa. Eu passo na frente indo para a casa da minha mãe e passo na frente há vinte anos.',
    n6: 'nia',
    n7: 'A gente era quatro naquela barranca e ela acha que ele estava sozinho. Ela pensa isso há vinte anos. Eu escrevi uma carta para ela e são oito páginas e eu vou postar antes do reencontro porque se eu esperar até depois eu não vou fazer.',
    n8: 'Eu não botei o nome de ninguém nela. Eu quero deixar isso claro com você porque não deixei claro com mais ninguém. Está escrito nós. Está escrito nós o tempo inteiro.',
    n9: 'Ela devia saber que ele não estava sozinho no escuro. É isso a coisa inteira. É o único motivo de eu estar fazendo isso.',
    n10: 'Postei oito e dez da manhã de hoje na caixa em frente ao mercado e depois fiquei sentada no carro um tempo. Portas às sete se você mudar de ideia. Eu ia gostar se você viesse.',

    // ----------------------------------------------------------------- t-year
    g1: 'Pessoal. Eu vou dizer isto uma vez e depois vou parar de usar este grupo, porque não é o lugar para isso.\n\nA Nia morreu no sábado à noite. A polícia já falou com vários de nós e vai falar com mais. Por favor respondam a eles por completo e por favor não especulem aqui.',
    g2: 'ela me ligou na quinta pra perguntar se as mesas deviam ser redondas ou compridas. redondas. eu disse redondas. essa foi a última conversa que eu tive com ela na vida',
    g3: 'Eu não estava lá. Quero dizer isso claramente em vez de deixar as pessoas deduzirem. Eu estava de plantão e fiquei sabendo no domingo de manhã pela minha irmã.',
    g4: 'a polícia me perguntou que horas as coisas aconteceram e eu não consegui dizer uma única. eu disse depois do discurso. eu disse isso sobre umas quatro coisas diferentes e era a única resposta que eu tinha',
    g5: 'Foi o que todo mundo disse, e não é uma falha. Ninguém olha para o relógio numa festa. Eu dei a ordem do evento à polícia e sugeri que eles trabalhassem a partir dela.',
    g6: 'mark tem uma mulher morta na mesma barranca do ashley e você está falando de ordem do evento',
    g7: 'Eu estou falando do único documento que alguém tem. Eu não vou fazer isso aqui.',

    // --------------------------------------------------------------- t-marika
    k1: 'eu fiquei com ela desde que a comida saiu até ela sair lá pra fora. o tempo todo. a gente fez aquela coisa de dizer que vai pegar uma bebida e aí não sair do lugar por uma hora',
    k2: 'do que ela falou',
    k3: 'da turma dela. de um menino que não senta. ela estava genuinamente feliz e eu fico tendo que dizer isso pras pessoas porque elas querem que ela estivesse assustada e ela não estava',
    k4: 'eu fiquei no salão das quinze pras nove até passar da meia. qualquer um vai te confirmar isso e nenhum deles vai saber te dizer quando',
    k5: 'o discurso',
    k6: 'o programa dizia nove horas. ele fez oito e quinze. eu sei porque fui eu que mandei — o bufê estava quarenta minutos atrasado e eu fui atrás dele e falei faz agora enquanto as pessoas ainda estão de pé',
    k7: 'eu tenho a nota no celular. serviço quente 20:55. então qualquer pessoa naquela sala que te disse que alguma coisa aconteceu depois do discurso te disse que aconteceu depois das oito e quinze e acha que te disse depois das nove',
    k8: 'ninguém empurrou o ashley. eu preciso que você ouça isso antes que alguém enfeite para você. ele caiu do alto num desafio e a gente ficou lá parado gritando o nome dele e ninguém entrou atrás dele e ninguém ligou por vinte minutos. vinte minutos. é isso a coisa. é a única coisa que sempre houve',
    k9: 'e o mark montou a história na barranca antes de a ambulância chegar. a gente disse que ligou na hora. ele falou as palavras primeiro e nós três repetimos depois dele e eu já disse aquelas palavras para um policial, para um legista e para a minha própria mãe',
    k10: 'ele tinha dezessete anos. eu também. eu não estou fingindo que eu disse não',

    // ----------------------------------------------------------------- t-rafe
    r1: 'Eu sou diretor do St Cuthbert’s há seis anos. Menciono isso apenas para que você entenda por que eu sou cuidadoso, e não porque eu ache que isso me dê direito a alguma coisa.',
    r2: 'Eu estive naquele salão das quinze pras nove até nove e meia. Fiquei de pé na frente de noventa pessoas durante boa parte disso. Eu não acho que exista resposta melhor disponível para quem estava lá.',
    r3: 'que horas foi o discurso',
    r4: 'Nove horas. Está no programa, foram impressos duzentos deles, e eu ficaria espantado se você não achasse um no bolso do casaco de alguém esta tarde. Durou uns vinte minutos.',
    r5: 'A Michelle esteve do meu lado a maior parte da noite e eu estive do lado da Nia por um trecho. Era uma sala com noventa pessoas que não se viam desde os dezessete anos. Ninguém ficou sozinho um instante.',
    r6: 'ela escreveu pra mãe do ashley crewe',
    r7: 'Ela disse a várias pessoas que pretendia. Eu pediria que você considerasse quem mais aquela carta assustou, e eu começaria por Tobi Marchetti, que estava naquele salão no sábado e que passou dois anos numa linha de escuta e sabe exatamente como sentar com alguém e conduzir a pessoa a alguma coisa.',
    r8: 'Eu tenho consciência de como isso soa. Eu passei quatro dias pensando se devia dizer e concluí que omitir seria pior.',
    r9: 'O que aconteceu em 2005 foi um acidente que quatro crianças presenciaram. Não existe versão daquilo em que alguém tenha feito alguma coisa com Ashley Crewe. Eu já disse isso a toda pessoa que me perguntou e eu digo a você.',

    // ----------------------------------------------------------------- t-tobi
    t1: 'Alguém te falou da linha de escuta. Dá para ouvir isso na pergunta, e eu prefiro só responder a fazer você dar voltas.',
    t2: 'Dois anos. Sábado sim, sábado não, das seis às duas, no posto de Calderside, que fica a quarenta e uma milhas daquele salão. Eu estava de plantão naquela noite. Nove de nós na escala e um supervisor.',
    t3: 'o mark diz que você estava no salão',
    t4: 'Ah é. Eu falei para a Nia em março que não conseguiria ir e ela mudou a data uma vez para tentar me encaixar e não deu, e ela foi um amor a respeito.',
    t5: 'Milhares de pessoas fazem isso. São quatrocentas só nesta região e tem um cartaz sobre isso em toda sala de espera de médico do país. Não é uma coisa rara de se ser. Só parece rara de onde você está olhando.',
    t6: 'você estava na barranca em 2005',
    t7: 'Não. Eram quatro deles e eu não era um, e eu passei vinte anos sendo o que não estava lá, o que é uma coisa estranha de se ser numa cidade deste tamanho.',
    t8: 'A Nia me ligou em abril. Ela falou por cinquenta minutos e eu não disse quase nada, que é a maior parte do trabalho. Ela me perguntou no fim se era uma coisa egoísta de se fazer, contar para a mãe dele, e eu disse que não podia responder isso por ela.',
    t9: 'Vai falar com o Colin Vale. Ele tem as chaves daquele prédio desde 1989 e estava fechando tudo no sábado, e ele é a única pessoa nesta história inteira que não estava numa festa.',

    // ---------------------------------------------------------------- t-corin
    c1: 'Eu sou zelador aqui há trinta e seis anos. Eu não ensinei nada a nenhum de vocês e eu sei o nome de todos vocês.',
    c2: 'Eu não me guio pela festa. Eu me guio pela minha ronda. Eu faço o bloco de música às nove e a cancela do estacionamento tem registro.',
    c3: 'O senhor Ellory estava no corredor do bloco de música quando eu vim trancar. Nove e dois ou nove e três. Eu tive que ficar esperando por ele e ele não me ouviu da primeira vez que eu falei.',
    c4: 'você tem certeza da hora',
    c5: 'Eu tenho certeza da minha ronda. Nove é nove e é nove desde que a senhora Hartley era diretora. A festa pode ser na hora que ela quiser.',
    c6: 'O registro da cancela tem a placa dele saindo às 21:08 e voltando às 21:19. É um crachá e ele imprime. Eu entreguei a folha ao policial no domingo e guardei uma foto dela.',
    c7: 'A senhorita Selkirk ficou naquele salão o tempo inteiro. Eu botei a cabeça na porta duas vezes por causa da porta de emergência e ela estava na mesma mesa nas duas, e estava com os sapatos na mão.',
    c8: 'A senhorita Boateng veio me procurar lá pelas oito e meia para agradecer. Ninguém nunca me agradeceu num desses antes. Ela perguntou da minha esposa pelo nome e a minha esposa morreu há quatro anos e ela sabia disso também.',
    c9: 'Eu vi ela descer na direção do rio depois daquilo. Eu não achei nada de mais. Todos eles descem para lá. Aquela cerca está caída desde 1991 e eu já pedi conserto onze vezes.',
    c10: 'Eu estava aqui em 2005 também. Eu abri este prédio para a polícia às duas da manhã e fiz uma xícara de chá para cada uma das quatro crianças na sala dos professores e nenhuma delas bebeu.',
  },

  /**
   * The four `with_person` chips are the dead ends. Pin any two and the engine
   * answers that both can be true, which is the point: at a reunion everybody can
   * tell you who they were standing with, and none of it proves anything. They are
   * worded plainly so a player can lay them side by side and watch nothing happen.
   */
  claims: {
    'c-nia-hall': 'Nia: no salão principal, 19:00–20:40 (segundo Michelle)',
    'c-marika-with-nia': 'Michelle: com Nia, 20:45–21:30',
    'c-nia-with-marika': 'Nia: com Michelle, 20:45–21:25',
    'c-marika-hall': 'Michelle: no salão principal, 20:45–21:40 (segundo Sr. Vale)',
    'c-rafe-outside': 'Mark: lá fora perto das lixeiras no celular, 20:55–21:15 (segundo Michelle)',
    'c-rafe-hall': 'Mark: no salão principal, 20:45–21:30',
    'c-rafe-speech': 'Mark: fazendo o discurso, 21:00–21:20',
    'c-marika-with-rafe': 'Michelle: com Mark, 20:50–21:20 (segundo Mark)',
    'c-nia-with-rafe': 'Nia: com Mark, 20:55–21:15 (segundo Mark)',
    'c-tobi-hall': 'Tobi: no salão principal, 20:45–21:30 (segundo Mark)',
    'c-tobi-branch': 'Tobi: no posto de Calderside, 20:00–22:00',
    'c-rafe-music': 'Mark: no bloco de música, 20:58–21:06 (segundo Sr. Vale)',
    'c-rafe-carpark': 'Mark: no estacionamento dos funcionários, 21:08–21:20 (registro da cancela)',
    'c-nia-riverpath': 'Nia: na trilha do rio, 21:00–21:30 (segundo Sr. Vale)',
  },

  motives: {
    'm-riverbank':
      'Ninguém encostou em Ashley Crewe. Quatro deles ficaram parados naquela barranca e ninguém ligou por vinte minutos, e Mark Ellory montou a história antes de a ambulância chegar e fez os outros três repetirem depois dele. Ele é diretor de escola há seis anos. Nia postou uma carta de oito páginas para a mãe do Ashley na manhã do reencontro.',
  },

  contradictions: {
    'x-rafe-speech':
      'O programa diz nove horas e foram impressos duzentos deles. Ele falou oito e quinze, porque o bufê estava quarenta minutos atrasado e Michelle foi atrás dele e mandou fazer enquanto as pessoas ainda estavam de pé. A nota no celular dela tem serviço quente às 20:55. Então toda testemunha naquele salão que datou alguma coisa como depois do discurso acredita que te disse depois das nove, e te disse depois das oito e quinze — e às nove, quando ele diz que estava de pé na frente de noventa pessoas, ele estava lá fora perto das lixeiras no celular.',
    'x-rafe-music':
      'Colin Vale não se guia pela festa. Ele se guia pela ronda dele, e o bloco de música é trancado às nove e é assim desde que a senhora Hartley era diretora. Mark Ellory estava de pé naquele corredor dois ou três minutos depois, e Vale teve que esperar por ele, e teve que falar com ele duas vezes.',
    'x-rafe-gate':
      'A cancela do estacionamento dos funcionários é um crachá e ela imprime. A placa dele sai às 21:08 e volta às 21:19. Ele não esteve naquele salão durante onze minutos do tempo de que prestou contas, e a única pessoa do prédio que não estava numa festa é a que guardou a folha.',
    'x-tobi-branch':
      'Mark Ellory colocou Tobi Marchetti naquele salão. Tobi estava a quarenta e uma milhas de distância, no posto de Calderside, das seis às duas, numa escala de nove pessoas com um supervisor, e Nia mudou a data do reencontro uma vez tentando encaixar ele e não deu. Quatrocentas pessoas são voluntárias naquela linha só nesta região. Não é uma coisa rara de se ser. Só parece rara de onde você está olhando.',
  },

  confrontation: {
    opening:
      'Eu dei trinta e um anos às escolas deste município e eu gostaria que você entendesse o que está se propondo a desmontar.',
    beats: {
      'a-speech': {
        press:
          'Você escreveu a ordem do evento e depois adiantou o seu próprio discurso em quarenta e cinco minutos. Todo mundo naquela sala vem datando a noite a partir dele desde sábado. Às nove você estava lá fora perto das lixeiras.',
        rebuttal:
          'O bufê estava atrasado. Michelle Selkirk me pediu para adiantar e eu adiantei, na frente de noventa pessoas, o que é uma forma estranha de esconder alguma coisa.',
      },
      'a-music': {
        press:
          'Colin Vale tranca o bloco de música às nove. Ele te encontrou naquele corredor três minutos depois e teve que falar com você duas vezes antes de você ouvir.',
        rebuttal:
          'Ele tem sessenta e um anos e estava andando por um prédio no escuro com um molho de chaves. Eu entrei e saí daquele corredor a noite inteira. Ele juntou duas noites diferentes.',
      },
      // a-gate and a-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence.
      'a-gate': {
        press:
          'A cancela imprime. A sua placa sai às 21:08 e volta às 21:19. Onze minutos, dentro dos quarenta e cinco de que você prestou contas do chão daquele salão.',
      },
      'a-why': {
        press:
          'Ninguém empurrou Ashley Crewe. Quatro de vocês ficaram parados naquela barranca e ninguém ligou por vinte minutos, e você montou as palavras antes de a ambulância chegar e os outros três repetiram depois de você.',
      },
    },
    deflections: [
      'Você não era daquele ano de nenhuma forma que conte. Você estava na sala e você não era da turma.',
      'Um zelador, uma cancela e uma mulher que vem dizendo às pessoas o que ela acha que aconteceu naquela barranca desde os dezessete anos.',
      'Me traga uma pessoa que tenha me visto naquela trilha.',
    ],
    confession:
      'Eu desci para pedir que ela não mandasse.\n\nÉ essa a minha intenção inteira e eu tenho consciência de que agora não vale nada. Ela me disse que a carta tinha saído às oito e dez daquela manhã, da caixa em frente ao mercado, e eu não acreditei nela. Achei que era a coisa que a gente diz.\n\nEntão eu segurei o braço dela. Para mantê-la ali. Foi só para isso e eu já disse essa frase na minha cabeça umas quatro mil vezes desde sábado e ela fica menor a cada vez.\n\nE ela caiu do alto da barranca.\n\nA trinta metros de onde ele caiu. Os mesmos vinte pés. Eu quero que alguém escreva isso direito porque ninguém ainda disse isso em voz alta para mim e eu passei quatro dias esperando que alguém dissesse.\n\nEu fiquei parado ali.\n\nEu quero ser exato, porque eu passei vinte anos sendo exato e é a única coisa em que eu presto. Eu não caí e não entrei em pânico e eu não tinha dezessete anos. Eu tinha quarenta e dois anos e tinha tomado duas taças de vinho ao longo de quatro horas e fiquei de pé naquela trilha e contei, e por volta de onze minutos eu subi de volta até o estacionamento e passei com o meu carro por uma cancela que imprime.\n\nEu fiz aquilo duas vezes. Com vinte anos de diferença. Da segunda vez eu sabia exatamente o que estava fazendo e fiz assim mesmo, e a única diferença entre o menino daquela barranca e o homem daquela trilha é que o homem já tinha descoberto que conseguia conviver com aquilo.\n\nEla escreveu nós. Ela escreveu isso na carta o tempo inteiro e disse isso para mim naquela trilha, e eu revi as oito páginas que eu nunca li com mais cuidado do que qualquer coisa que eu já li na vida.\n\nEu nunca perguntei a ela o que tinha na carta. Nenhuma vez, em três semanas.\n\nFui eu que ensinei aquilo a eles. Na barranca, quando a gente tinha dezessete anos. Eu disse a gente não fala sobre isso, e nenhum de nós falou nunca, e eu construí uma carreira sendo um homem a quem se pode recorrer, e eu não consegui fazer uma pergunta direta a uma mulher que eu conhecia desde os quatro anos de idade.\n\nEla não ia me denunciar.\n\nEu matei ela para impedir uma carta que estava numa caixa de correio desde as oito e dez da manhã, e a carta não tinha o meu nome, e nunca ia ter.',
  },

  epilogue:
    'A carta chegou à Brantwood Road na terça, na segunda entrega, quatro dias depois de Nia Boateng morrer e dois dias antes de aquilo sair no jornal local.\n\nOito páginas. Estava escrito nós o tempo inteiro. Dizia que eram quatro deles na barranca e que Ashley não estava sozinho no escuro e que eles gritaram o nome dele até não conseguirem mais ouvir uns aos outros, e dizia que ninguém entrou atrás dele e que ninguém ligou por vinte minutos, e dizia que a Nia sentia muito de um jeito que não pedia perdão.\n\nSheila Crewe guardou a carta na gaveta dos panos de prato por um mês antes de entregar a alguém.\n\nMichelle Selkirk entrou na delegacia de Ardenshaw na quarta de manhã com a nota no celular e um depoimento que tinha escrito à mão na noite anterior, corrigindo um que ela deu em 2005 quando tinha dezessete anos. O legista reabriu o registro com base naquilo. Não mudou nada sobre como Ashley Crewe morreu e mudou tudo sobre os últimos vinte minutos da vida dele, que era o que estava errado no processo.\n\nTobi Marchetti fez o plantão dele no sábado. Disse depois que pensou em não ir e aí foi, porque nove numa escala é nove numa escala.\n\nColin Vale pediu o conserto da cerca pela décima segunda vez. Ela foi levantada em novembro.',
};
