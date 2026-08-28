import type { CaseTranslation } from '../caseText';

/**
 * Case 14 — "O Ferry Noturno". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. A port the ship never reached. The alibi is built out of the timetable
 *    rather than out of anything that happened, so `Kirkwall` and the dropped
 *    call have to stay exact: the linkspan failed on the Monday, the call was
 *    dropped `às 21:00`, it went out twice on the PA and sat on every passenger
 *    screen until Lerwick. Eck says it plainly (e8), Senga documents it (s2, s3),
 *    and the revelation puts him aboard for the whole hour he says he spent
 *    smoking on a linkspan he never saw.
 *
 * 2. Hannah writes ship time without a colon — `1730`, `2106` — because she was a
 *    purser for twenty-six years and that is how she has written a time her whole
 *    working life. Nobody else in the pack does it. It survives untouched, and the
 *    test pins it, because it is the only place her profession shows in her voice
 *    rather than in what she says about it.
 *
 * 3. Names and places. People keep theirs: Hannah Pirie, Dougie (Douglas) Yarrow,
 *    Sheila Kinnaird, Eck Tulloch, Senga Moar, Nurse Bhatti, and the Roost, the
 *    Magnus Bar, the Rona and Kirkwall with them. Descriptive places translated:
 *
 *      you    → Você        ship      → o MV Roost
 *      hannah → Mãe         bar       → o Magnus Bar
 *      dougie → Dougie      afterdeck → o convés de ré
 *      marisa → Sheila      cabins    → o corredor de cabines do convés 6
 *      eck    → Eck         hospital  → a enfermaria do navio
 *      senga  → Senga Moar  kirkwall  → Kirkwall, atracado
 *
 *    `Kirkwall, atracado` keeps the comma-form of the English, because the place
 *    is not the town but the state of being alongside it — which is exactly the
 *    thing that never happened.
 *
 *    Units stay as the English has them: `força seis`, `seis milhas`, `quatro
 *    pés`. Converting any of them changes a fact rather than translating it.
 *
 * 4. Voice. Sheila and the player type lowercase and never finish; Hannah, Senga,
 *    Dougie and Eck write in full sentences, so those four divide by what they
 *    reach for. Dougie claims a rank in almost every message. Eck discloses the
 *    worst thing about himself first and closes on `Aye.` twice. Senga reaches for
 *    a log, a book or a time. Hannah is warm and writes her times like a purser.
 *
 * 5. The player is unmarked, and this pack is the one where the English fixed it
 *    at source: Senga says `porque ela era sua mãe`, naming the relationship from
 *    the side of the person who has a gender. The Portuguese keeps that shape, and
 *    every other line addressed to the player runs on verbs.
 *
 * No arc content. Pack 14 is standalone — no Keeper, no coda. The finale is 15.
 */
export const theNightFerryPtBr: CaseTranslation = {
  title: 'O Ferry Noturno',
  blurb:
    'Ele sabe te dizer exatamente o que fez enquanto o navio estava atracado em Kirkwall. O navio nunca atracou em Kirkwall.',

  characters: {
    you: 'Você',
    hannah: 'Mãe',
    dougie: 'Dougie',
    marisa: 'Sheila',
    eck: 'Eck',
    senga: 'Senga Moar',
  },

  places: {
    ship: 'o MV Roost',
    bar: 'o Magnus Bar',
    afterdeck: 'o convés de ré',
    cabins: 'o corredor de cabines do convés 6',
    hospital: 'a enfermaria do navio',
    kirkwall: 'Kirkwall, atracado',
  },

  objects: {
    phone: 'o celular da Hannah, numa capa verde com um passarinho',
  },

  threads: {
    't-hannah': 'Mãe',
    't-crossing': 'Roost, travessia de terça',
    't-dougie': 'Dougie Yarrow',
    't-marisa': 'Sheila',
    't-eck': 'Eck',
    't-senga': 'Senga Moar',
  },

  briefing: {
    causeOfDeath:
      'Queda contra uma peça do convés. Ela foi encontrada no convés de ré às 23:10 por um tripulante em ronda.',
    ruling:
      'Em aberto. Era força seis e o convés de ré estava molhado, e as quatro primeiras pessoas consultadas disseram todas a mesma palavra, que foi acidente.',
    opening:
      'Hannah Pirie foi comissária de bordo por vinte e seis anos, em quatro navios, e estava aposentada havia seis.\n\nEla estava na travessia de terça rumo ao norte porque você mora em Lerwick agora e ela levava uma sacola com o seu presente de aniversário dentro. Foi encontrada no convés de ré às onze e dez.\n\nEla conhecia todos os conveses de todos os barcos em que já navegou e não era uma mulher que caía.',
  },

  messages: {
    // --------------------------------------------------------------- t-hannah
    n1: 'Reservado. Terça, cabine e não poltrona, eu tenho sessenta e um anos e já mereci uma porta.',
    n2: 'não traz nada',
    n3: 'Eu trouxe uma coisa. Para com isso.',
    n4: 'Saímos 1730 em ponto. Ainda é a única companhia do norte que sai na hora que diz que sai.',
    n5: 'O jantar estava bom. O mar está grosso e metade do bar ficou bem quieta e eu estou me divertindo enormemente.',
    n6: 'Você não vai acreditar em quem está sentado a quatro pés de mim. Dougie Yarrow. Ele estava no Rona comigo em 2003 e eu não punha os olhos nele havia vinte e dois anos.',
    n7: 'quem',
    n8: 'Camareiro do refeitório. Cantava lindamente. Ele fez um Ewan MacColl na festa de Natal que deixou quatro homens feitos em pedaços.',
    n9: 'Ele ficou meio esquisito comigo. Acho que eu envergonhei ele e não era a minha intenção, eu só estava contente.',
    n10: 'Vou lá fora atrás cinco minutos. Está uivando lá fora. 2106. Boa noite meu amor bj',

    // ------------------------------------------------------------- t-crossing
    g1: 'Este grupo é para passageiros da travessia de terça rumo ao norte que pediram para ser informados. Eu sou a segunda oficial e criei o grupo porque quarenta de vocês ligaram para o escritório numa manhã só.\n\nUma passageira morreu a bordo na terça à noite. A Police Scotland está com os registros da embarcação e está falando com as pessoas individualmente.',
    g2: 'ela ficou duas horas no meu bar e era a melhor companhia daquele barco. é só isso que eu quero dizer aqui',
    g3: 'Uma tragédia, e os meus pêsames à família. Eu diria a todos que o convés de amarração de ré não deveria estar acessível a passageiros com força seis e já disse isso ao comandante. Trinta e um anos no mar e eu nunca vi aquela porta deixada no gancho.',
    g4: 'O convés de ré é um convés de passageiros e fica aberto em qualquer tempo abaixo de força oito. A porta não estava no gancho.',
    g5: 'dougie você ficou no bar até nove e meia você não chegou nem perto daquela porta com força seis',
    g6: 'Por favor não façam isso aqui. O que qualquer um tiver, entregue ao oficial responsável, e eu passo um número para quem quiser.',

    // --------------------------------------------------------------- t-dougie
    d1: 'Sinto muito pela sua perda. A sua mãe e eu servimos juntos no Rona e ela era uma comissária de primeira, e eu digo isso a quem perguntar.',
    d2: 'você estava no bar com ela',
    d3: 'Eu tomei um drinque no Magnus a partir de umas oito e meia. Conversamos brevemente. Ela estava em boa forma e não havia absolutamente nada entre nós, seja lá o que alguém num grupo de mensagens queira insinuar.',
    d4: 'e depois',
    d5: 'Eu subi para a escala de Kirkwall. Eu sempre subo. Atracados nove e meia, e eu fiquei na ponta da rampa fumando ao abrigo do terminal até a gente largar quinze pras onze. Qualquer um que faça esta rota com frequência vai te dizer que aquela é a melhor hora da travessia.',
    d6: 'Trinta e um anos no mar, a maior parte na ponte de comando, e eu já fiz aquela aproximação em coisa pior do que terça.',
    d7: 'o celular dela estava atrás do bar',
    d8: 'Porque fui eu que botei ali. Eu voltei passando pelo Magnus umas dez e dez e ele estava numa mesa perto da porta de ré numa capa verde, e eu entreguei à moça de plantão. Eu faria o mesmo por qualquer pessoa.',
    d9: 'Eu olharia mais perto de casa. Havia um homem naquele convés na terça com uma ficha do tamanho do seu braço e todo mundo a bordo sabe o nome dele, e eu reparo que ninguém está botando isso num grupo de mensagens.',

    // --------------------------------------------------------------- t-marisa
    m1: 'eu faço quatro noites por semana atrás daquele bar e a gente fica muito boa em saber quem está se divertindo. a sua mãe estava se divertindo',
    m2: 'ela chegou umas oito e meia depois do jantar dela e sentou na ponta onde fica o parapeito. tomou um gim a noite inteira e fez durar feito profissional',
    m3: 'e o dougie yarrow estava dando as cartas naquele bar desde aberdeen. capitão de longo curso. trinta e um anos. imediato nos petroleiros. ele já me contou as mesmas quatro histórias em seis travessias e eu ri de todas porque o trabalho é esse',
    m4: 'ela falou dougie yarrow. você estava no rona comigo, você era do refeitório. e ela ficou ENCANTADA. ela ficou tão contente de ver ele. falou alguma coisa sobre ele cantar numa festa de natal',
    m5: 'tinha umas oito pessoas naquela ponta do bar. ninguém riu dele. eu quero deixar isso claro porque eu já revi aquilo. ninguém riu',
    m6: 'ele ficou da cor do carpete e sentou e não falou mais nenhuma palavra. ela saiu pela porta de ré umas nove e cinco para tomar ar, e deixou o celular no meu balcão, e eu botei na prateleira embaixo da registradora',
    m7: 'ele foi atrás dela umas nove e vinte. eu vi ele passar pela porta de ré porque eu estava limpando o parapeito e você tem que se inclinar por cima dela. ele não ficou fora dois minutos e não ficou fora uma hora, eu não saberia te dizer, estava lotado',
    m8: 'ele diz que entregou o celular dez e dez',
    m9: 'ele não me entregou nada. pergunta pra senga, ela tem o livro de achados e perdidos e tem a registradora do bar e tem todas as portas daquele navio num log. senga moar não chuta nada',
    m10: 'e antes que alguém comece com o eck tulloch. todo mundo começa com o eck tulloch. ele está naquele barco duas vezes por mês e já esteve preso e ele mesmo vai te contar nos primeiros dez minutos',

    // ------------------------------------------------------------------ t-eck
    e1: 'Eu peguei quatro anos em Peterhead entre 1979 e 1983 por uma coisa que eu fiz mesmo. Falo logo para ninguém ter que criar coragem. Pois é.',
    e2: 'Eu faço aquela travessia duas vezes por mês para ver a minha irmã. Quarenta anos. Eu andava naquele barco de olhos fechados.',
    e3: 'você estava no convés de ré',
    e4: 'Mais cedo, estava. Antes do jantar. Eu saio para fumar e fico sempre no mesmo canto e a tripulação toda sabe disso.',
    e5: 'Das nove e cinco eu fiquei na enfermaria do navio com a enfermeira medindo a minha pressão. É uma coisa que eu tenho que fazer e ela assina o livro. Fiquei lá até dez e vinte e cinco porque ela me obrigou a sentar e esperar baixar.',
    e6: 'O nome dela é Bhatti. Ela vai ter anotado. Tudo num barco fica anotado, é a única coisa sobre um barco.',
    e7: 'a gente atracou em kirkwall',
    e8: 'Não. Saiu no alto-falante às nove e ficou nas telas a noite inteira. Rampa quebrada. A gente passou direto e chegou cedo em Lerwick e eu estava no cais seis e meia sem nada aberto. Pois é.',
    e9: 'Qualquer um que estivesse naquele barco e acordado sabe que a gente não entrou. Você teria que estar dormindo numa cabine de porta fechada para não saber.',

    // ---------------------------------------------------------------- t-senga
    s1: 'Segunda oficial, onze anos de companhia. Eu já entreguei tudo isso à Police Scotland e estou entregando a você porque ela era sua mãe e porque você me fez uma pergunta direta.',
    s2: 'A escala de Kirkwall foi cancelada às 21:00. A rampa de lá teve uma falha hidráulica na segunda. Saiu duas vezes no alto-falante, ficou nas telas de informação ao passageiro em todos os conveses das 21:00 até a gente atracar, e está no diário de bordo com a letra do comandante.',
    s3: 'A gente não parou. Não houve passarela armada porque não havia nada para armar. Ninguém desembarcou, ninguém embarcou, e a embarcação não alterou o rumo a menos de seis milhas de Kirkwall.',
    s4: 'o celular',
    s5: 'Entrou no livro de achados e perdidos às 21:04 com a letra de Sheila Kinnaird, capa verde, encontrado no balcão do bar. Ficou na prateleira embaixo da registradora desde então até eu retirar com ela às 23:40 e guardar no cofre. Ninguém entregou nada a ninguém dez e dez.',
    s6: 'Eu vou te contar a coisa que ninguém te contou, que é que o primeiro pensamento da tripulação foi Eck Tulloch. Ele esteve no convés de ré antes do jantar, ele tem uma condenação de 1979, e o nome dele é o que aparece naquele navio toda vez que acontece qualquer coisa.',
    s7: 'Ele ficou na enfermaria com a enfermeira Bhatti das 21:05 às 22:25 e ela assinou a entrada e a saída dele. Eu estou te dando as duas metades disso porque eu preferia que você ouvisse a acusação de mim com a resposta junto.',
    s8: 'e o yarrow',
    s9: 'Douglas Yarrow navegou nesta companhia por nove anos como auxiliar de hotelaria e saiu em 2011. Ele nunca teve uma carta de competência. Isso não é segredo, está numa lista de tripulação, e nenhuma pessoa daquele bar tinha motivo para ir conferir.',
    s10: 'Eu estou em navio desde os dezenove anos e já conheci muito homem que ganhou uma patente no contar. Costuma ser inofensivo e costuma ser triste. Eu não soube o que fazer com aquilo e continuo sem saber.',
  },

  claims: {
    'c-dougie-bar': 'Dougie: no Magnus Bar, 20:30–21:05 (segundo Sheila)',
    'c-dougie-kirkwall': 'Dougie: em terra em Kirkwall, 21:30–22:45',
    'c-phone-dougie': 'Dougie: estava com o celular da Hannah, 22:10–22:25',
    'c-hannah-bar': 'Hannah: no Magnus Bar, 20:30–21:00 (segundo Sheila)',
    'c-hannah-afterdeck': 'Hannah: no convés de ré, 21:05–22:10 (segundo Sheila)',
    'c-dougie-afterdeck': 'Dougie: no convés de ré, 21:35–22:00 (segundo Sheila)',
    'c-eck-hospital': 'Eck: na enfermaria do navio, 21:05–22:25',
    'c-dougie-aboard': 'Dougie: a bordo do Roost, 21:00–23:00 (segundo o diário de bordo)',
    'c-phone-marisa': 'Sheila: estava com o celular da Hannah, 21:04–23:00 (livro de achados e perdidos)',
    'c-marisa-bar': 'Sheila: atrás do Magnus Bar, 20:00–23:00 (segundo Senga)',
    'c-eck-afterdeck': 'Eck: no convés de ré, 21:30–22:00 (relato da tripulação)',
  },

  motives: {
    'm-messroom':
      'Ele vinha dizendo ao Magnus Bar que era capitão de longo curso, trinta e um anos, imediato nos petroleiros, ao longo de seis travessias. Hannah Pirie navegou com ele no Rona em 2003 e reconheceu ele, e disse isso na frente de oito pessoas, e ficou encantada de ver ele. Ela não estava sendo cruel. Ela estava contente.',
  },

  contradictions: {
    'x-dougie-deck':
      'Ele se coloca em terra em Kirkwall a partir de nove e meia. Sheila Kinnaird viu ele passar pela porta de ré umas nove e vinte, porque ela estava limpando o parapeito e você tem que se inclinar por cima daquela porta para fazer isso. Ela não saberia te dizer quanto tempo ele ficou fora. Ela saberia te dizer que ele foi.',
    'x-dougie-kirkwall':
      'Não houve escala em Kirkwall. A rampa falhou na segunda e a escala foi cancelada às 21:00, anunciada duas vezes no alto-falante e mostrada nas telas dos passageiros em todos os conveses até Lerwick. Não houve passarela armada porque não havia nada para armar, e a embarcação não alterou o rumo a menos de seis milhas do lugar. Ele esteve a bordo durante a hora inteira que diz ter passado fumando na ponta da rampa, ao abrigo de um terminal que ele nunca viu.',
    'x-phone':
      'Ele precisava de um motivo para ter estado à ré, então inventou um, e escolheu o objeto errado. Hannah deixou o celular no balcão do bar quando saiu para tomar ar. Entrou no livro de achados e perdidos às 21:04 com a letra de Sheila Kinnaird, capa verde, e ficou na prateleira embaixo da registradora até a segunda oficial guardar no cofre às 23:40. Ele não entregou nada a ninguém dez e dez.',
    'x-eck':
      'O primeiro pensamento da tripulação foi Eck Tulloch, porque ele esteve lá fora antes do jantar, por causa de quatro anos em Peterhead em 1979, e porque o nome dele é o que aparece naquele navio sempre que acontece qualquer coisa. Ele ficou na enfermaria com a enfermeira Bhatti das 21:05 até as 22:25, com entrada e saída assinadas, sentado quieto até a pressão baixar.',
  },

  confrontation: {
    opening:
      'Você vai querer ter cuidado. Eu tenho trinta e um anos de mar e uma reputação nesta costa, e eu venho sendo muito paciente com uma família em sofrimento.',
    beats: {
      'a-deck': {
        press:
          'Você se coloca em terra a partir de nove e meia. Sheila Kinnaird viu você sair pela porta de ré vinte minutos antes disso.',
        rebuttal:
          'Uma moça de trinta e quatro anos, com o bar quatro fileiras de gente à frente, com força seis, operando uma registradora. Eu não condenaria um cachorro com base nisso e você também não.',
      },
      'a-phone': {
        press:
          'Você disse que achou o celular dela perto da porta de ré dez e dez e entregou. Ele foi registrado nos achados e perdidos às nove e quatro e nunca saiu da prateleira embaixo da registradora.',
        rebuttal:
          'Então o livro está errado, ou a moça preencheu no fim do turno dela, que é o que todas fazem. Você nunca trabalhou num bar.',
      },
      // a-kirkwall and a-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence.
      'a-kirkwall': {
        press:
          'Você passou uma hora fumando na rampa de Kirkwall. A rampa falhou na segunda, a escala foi cancelada às nove, e o navio não chegou a menos de seis milhas dela.',
      },
      'a-why': {
        press:
          'Ela disse que você estava no Rona com ela e que você era do refeitório. Ela ficou contente de ver você. Ninguém naquele bar riu.',
      },
    },
    deflections: [
      'Pergunta a qualquer um nesta costa sobre o Dougie Yarrow. Vai. Pergunta.',
      'Você está acreditando na palavra de uma garçonete e de um homem que pegou quatro anos em Peterhead.',
      'A sua mãe teria vergonha do que você está fazendo com um homem que navegou com ela.',
    ],
    confession:
      'Eu ouvi o anúncio. Essa é a parte que eu gostaria de corrigir, porque já me colocaram isso duas vezes como se eu tivesse dormido durante aquilo.\n\nEu ouvi no bar às nove horas e ouvi aquilo inteiro.\n\nE quatro dias depois, quando o oficial me pediu para prestar contas da minha noite, eu abri o horário no meu celular e li em voz alta o que deveria ter acontecido, e fiz isso sem piscar, porque é essa a versão em que eu venho morando desde 2011 e lá dentro é mais confortável.\n\nEla falou com gentileza. Eu quero isso por escrito. Ela disse Dougie Yarrow, você estava no Rona comigo, você era do refeitório, e ela ficou encantada, e ela falava cada palavra a sério, e me perguntou da minha mãe.\n\nOito pessoas. Ninguém riu. Eu revi aquele bar rosto por rosto e nenhum deles riu, e eu quero que você entenda que aquilo tornou tudo pior e eu não consigo te explicar por quê.\n\nEu fui atrás dela para pedir que ela não dissesse aquilo de novo. Foi só para isso que eu saí. Eu disse Hannah, me faz um favor, e ela olhou para mim — e ela ia ser gentil a respeito. Eu vi ela se preparando para ser gentil a respeito.\n\nEu estiquei a mão e ela caiu para trás contra a peça do convés.\n\nE eu fiquei parado naquele convés na chuva e não fiz uma única coisa que um capitão de longo curso teria feito, porque eu não sou um e nunca fui, e não há mais ninguém vivo que se surpreenderia em ouvir isso além de mim.\n\nEu era do refeitório.\n\nEu fiz aquilo por nove anos e eu era bom naquilo e ela lembrou do meu canto depois de vinte e dois anos, e eu matei ela por ter dito isso.',
  },

  epilogue:
    'A sacola com o seu presente dentro estava na cabine 6042 com o casaco dela dobrado na ponta do beliche, do jeito que ela dobrava um casaco em todo navio em que já trabalhou.\n\nSenga Moar depôs por um dia e meio. Perguntaram a ela onze vezes se um passageiro poderia ter se enganado sobre uma escala, e onze vezes ela disse que as telas rodaram o aviso num loop de noventa segundos em todos os conveses durante dez horas.\n\nSheila Kinnaird continua fazendo quatro noites por semana naquela rota. Ela não escreveu nada diferente no livro de achados e perdidos, porque nunca houve nada de errado com o jeito como ela preencheu.\n\nEck Tulloch foi chamado a prestar depoimento sobre onde esteve e prestou, e depois pediu ao oficial que constasse que a enfermeira tinha obrigado ele a ficar sentado por oitenta minutos e que ele tinha perdido o futebol. Ele faz a travessia duas vezes por mês para ver a irmã. Ele continua no mesmo canto.\n\nO Rona foi desmontado em Aliaga em 2009. Existe uma foto da tripulação dele na festa de Natal de 2003 no escritório de Aberdeen, umas quarenta pessoas de chapéu de papel, e a sua mãe está na segunda fila.\n\nEle está nela também. Ao fundo à esquerda, no meio de uma canção, e cada rosto na frente dele está virado para escutar.',
};
