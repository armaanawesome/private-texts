import type { CaseTranslation } from '../caseText';

/**
 * Case 1 — "O Farol". Brazilian Portuguese.
 *
 * Four things this had to get right, in this order.
 *
 * 1. Times, and the *form* the English chose for each one. Where the English
 *    writes digits it stays digits; where it writes words it stays words. That
 *    split is the case. Fiona is the only person in Ardnoe who writes a clock
 *    down — `21:40`, `22:00`, `21:47`, straight out of a survey log — and that is
 *    the entire reason she is believed over a woman with forty years of goodwill.
 *    Callum says `dez e dez`, never 22:10. A translation that tidies the village
 *    up into digits makes everybody equally precise and hands the player the
 *    answer on the first read.
 *
 *    The chips stay 24-hour and the prose stays spoken, exactly as the English
 *    does: `dez e dez` from Callum, `22:05–22:15` on his chip. The player takes
 *    the same small step to match them that an English player takes.
 *
 *    Brazilian speech does the "to the hour" form as `vinte pras dez`, so that is
 *    what Callum and Mairi say — `twenty to ten` at the slipway, `twenty to
 *    eleven` at the till.
 *
 * 2. Names. People and businesses stay: Ruth Calder, Mairi Bell, Callum, Fiona
 *    Trian, and Ardnoe itself. Places that are descriptions are translated,
 *    because `the cliff path` sitting untranslated inside a Portuguese sentence
 *    is the sound of a machine. Full list, so every decision is visible in review
 *    rather than looking like an oversight:
 *
 *      you        → Você            point     → Ponta Ardnoe
 *      ruth       → Ruth            lighthouse→ o farol
 *      mairi      → Mairi           path      → a trilha do penhasco
 *      callum     → Callum          harbour   → o porto
 *      esme       → Fiona           cafe      → o café
 *                                   slip      → a rampa
 *                                   cottage   → a casinha
 *                                   ferry     → a balsa
 *
 *    `Ponta Ardnoe` keeps the toponym and translates the feature, the way
 *    Portuguese writes any headland. `Ardnoe` surviving intact matters twice over:
 *    it is the group thread title, and it is the first word the Listener says in
 *    the coda. `a rampa` is where Callum mends the stern line and it is one word
 *    everywhere — chip, message, revelation and confrontation — because that chip
 *    against the café chip is the first contradiction the player proves.
 *
 *    `the Trust` is `a Fundação`. Brazilian Portuguese has no live sense of
 *    `patronato` for a charity that runs a lighthouse, and a word the reader has
 *    to decode is a word that stops being furniture.
 *
 *    The setting stays British throughout: an island, a village café, pounds
 *    sterling, a policeman, a ferry. Nothing is converted and nothing is
 *    relocated, because converting a pound into a real changes a fact rather than
 *    translating it.
 *
 * 3. Voice. Five people type differently and the difference is the character.
 *    Ruth is lowercase and never lands a full stop at the end of a message, but
 *    she capitalises Callum and Mairi, because she is sixty one and they are
 *    people. Callum is lowercase too and capitalises nobody — `ruth`, `mairi`,
 *    `minha mãe` — and that gap is the whole distance between him and the woman
 *    who taught him to text. Mairi writes like someone who has filled in forms:
 *    capitals, full sentences, and never a quotable line. Fiona writes properly
 *    and gives you a number. The player is lowercase and short, thumbing a phone
 *    in a house they grew up in.
 *
 * 4. `the Keeper` stays in English, and appears exactly twice, as it does in the
 *    English — once in n9 and once in the revelation of `x-papers-lie`.
 *    `arcAlias.test.ts` counts them.
 *
 *    He is not the keeper of a light. He gives himself this name in six packs —
 *    a care home, a rowing club, a canal, a crisis line, the finale — and there is
 *    no lighthouse in any of them; the finale pays it off as eleven box files in
 *    a wardrobe, one per person. So `o Guardião` would be wrong even if it were
 *    safe, and it is not safe: it is a name a man gave himself, which is exactly
 *    the kind of thing that survives untranslated, and the whole arc is carried by
 *    a player recognising it in Pack 3 as the words they read in Pack 1. Spanish
 *    broke this inside a day with two agents producing two different words for one
 *    man. `um homem que se dizia o Keeper` keeps the alias intact and lets the
 *    Portuguese carry the rest of the sentence.
 *
 * Gender. The player's gender is never stated, and Portuguese fights harder for
 * this than Spanish does, because its participles and predicate adjectives agree
 * where Spanish sometimes lets a verb carry the weight. Two rephrases:
 *
 *   - m11. The English is "You came in that night yourself." The intensifier has
 *     to agree in Portuguese — `você mesmo` or `você mesma` — so it is dropped and
 *     the line rebuilt as `Você apareceu lá naquela noite.`, which keeps Mairi
 *     placing the player in the café at quarter past nine without picking a
 *     gender for them.
 *   - confrontation.opening. "be very sure before you do" wants `esteja
 *     seguro/segura`. Rebuilt around the noun instead: `tenha muita certeza antes
 *     de falar`, which inflects for nothing.
 *
 * Everywhere else the neutrality is bought by preferring a verb to a participle —
 * `Você passou seis anos fora` rather than `esteve ausente`, `Não comece a se
 * culpar` rather than a predicate adjective.
 */
export const theLighthousePtBr: CaseTranslation = {
  title: 'O Farol',
  blurb:
    'Sua tia cuidou da luz da Ponta Ardnoe. Estão chamando isso de queda. Você está com o celular dela, e todo mundo continua com a história bem alinhada.',

  characters: {
    you: 'Você',
    ruth: 'Ruth',
    mairi: 'Mairi',
    callum: 'Callum',
    esme: 'Fiona',
  },

  places: {
    point: 'Ponta Ardnoe',
    lighthouse: 'o farol',
    path: 'a trilha do penhasco',
    harbour: 'o porto',
    cafe: 'o café',
    slip: 'a rampa',
    cottage: 'a casinha',
    ferry: 'a balsa',
  },

  threads: {
    't-ruth': 'Ruth',
    't-group': 'Ardnoe',
    't-mairi': 'Mairi Bell',
    't-esme': 'Fiona Trian',
    't-callum-truth': 'Callum',
    't-mairi-again': 'Mairi Bell',
  },

  briefing: {
    causeOfDeath: 'Uma queda da escada da torre.',
    ruling: 'Registrada como acidental. Sem mais apuração.',
    opening:
      'Ruth Calder cuidou da luz da Ponta Ardnoe por quarenta anos depois que a automatizaram, porque ninguém nunca pediu que ela parasse. Ela foi encontrada ao pé da escada da torre na noite do temporal do equinócio.\n\nVocê chegou na última balsa. Você está com o celular dela, e todo mundo continua com a história bem alinhada.',
  },

  messages: {
    // ----------------------------------------------------------------- t-ruth
    r1: 'então você embarcou mesmo',
    r2: 'última balsa. seis anos e o mesmo homem pegando as passagens',
    r3: 'esse deve ser o pequeno Callum agora. o filho da Mairi. ele tinha nove anos quando você foi embora',
    r4: 'não sobe hoje à noite. aqui fora tá ventando que é uma loucura e a trilha virou puro gelo',
    r5: 'amanhã então. você parece estranha',
    r6: 'tô bem. tem uma coisa da fundação que eu te conto amanhã depois que eu dormir em cima do assunto',
    r7: 'dois anos de contas e um buraco no meio delas do tamanho de um barco',
    r8: 'ruth. o que isso quer dizer',
    r9: 'quer dizer que eu tenho que falar uma coisa pra alguém que eu conheço há quarenta anos e eu preferia entrar no mar andando',
    r10: 'já contei pra ela. isso está feito. ela vem me ver hoje à noite e de manhã eu vou na polícia diga ela o que disser',
    r11: 'contou pra QUEM',
    r12: 'tô subindo na torre, a lâmpada está dando trabalho de novo. quarenta anos automatizada e ainda quer uma pessoa de pé do lado',
    r13: 'não se preocupa comigo. se preocupa com o estado do meu quarto de hóspedes',
    r14: 'ruth?',
    r15: 'ruth por favor',

    // ---------------------------------------------------------------- t-group
    g1: 'Para quem ainda não soube. A Ruth foi encontrada hoje de manhã no pé da escada da torre. Ela se foi, e me desculpem por colocar isso num grupo.',
    g2: 'O café abre hoje. Não se cobra nada. Venham se preferirem não ficar sozinhos em casa.',
    g3: 'meu deus',
    g4: 'Sinto muitíssimo. Eu a encontrei três vezes e ela me deu uma chave da torre para eu poder contar da galeria.',
    g5: 'eu tava no barco vindo pra cá. ela me disse pra não subir por causa da trilha',
    g6: 'ela me disse pra não subir',
    g7: 'E ela tinha razão. Aquela trilha com aquele vento teria derrubado você também. Não comece a se culpar.',
    g8: 'a polícia esteve na rampa hoje de manhã perguntando pra todo mundo onde cada um estava. esquisito pra uma queda',
    g9: 'Eles têm que fazer isso. Morte súbita, é só procedimento. Perguntaram a mim também.',
    g10: 'pois é eu falei na lata. eu trouxe o último barco às oito com a sua tia dentro',
    g11: 'trouxe sim. você carregou minha mala escada acima e eu não agradeci',
    g12: 'e depois eu fiquei na rampa das vinte pras dez até dez e quinze. o cabo de popa dela tinha soltado e eu não ia deixar assim naquele mar',
    g13: 'encharcado até o osso no fim',
    g14: 'Callum. Ninguém precisa do minuto a minuto.',
    g15: 'só tô dizendo o que eu falei pra eles',
    g16: 'Eu sei, meu amor. Mas aqui não.',
    g17: 'Quem estiver cuidando da Fundação. O caderno de campo dela ainda está lá em cima na torre, onde ela deixou. Não cabe a mim pegar. Alguém devia avisar a família.',
    g18: 'Quem cuida das contas da Fundação sou eu. Eu resolvo isso.',
    g19: 'ela disse que tinha uma coisa com a fundação. na noite que ela morreu. disse que tinha um buraco',
    g20: 'Ela estava cansada. Tinha sessenta e um anos e aquela lâmpada vinha falhando desde julho. Deixa isso pra lá.',

    // ---------------------------------------------------------------- t-mairi
    m1: 'Você não devia ter descoberto num grupo de mensagens. Isso foi culpa minha e eu sinto muito.',
    m2: 'ela disse que contou pra alguém sobre as contas. disse que ela vem me ver hoje à noite',
    m3: 'ela. você cuida das contas',
    m4: 'Eu cuido das contas porque ninguém mais faria isso de graça.\n\nE sim, ela me ligou por causa de uma coluna que não fechava. Eu disse que levaria a pasta lá em cima no fim de semana.',
    m5: 'Eu não subi lá. Eu estava no café.',
    m6: 'Das oito e meia até eu fechar às onze. No café. Igual todas as outras noites.',
    m7: 'sozinha?',
    m8: 'Callum estava comigo. No café das nove até a gente fechar.\n\nEntão somos dois dizendo isso, se é uma testemunha que você quer.',
    m9: 'eu não queria uma testemunha',
    m10: 'Não. Eu sei. Não me leve a sério, eu não dormi.',
    m11: 'Você apareceu lá naquela noite. Você lembra. Nove e quinze, antes de subir para a casa dela. Eu te servi o chá e você não encostou nele.',
    m12: 'eu lembro',
    m13: 'Fiz o caixa vinte pras onze, como sempre. Faltavam onze libras no fundo e eu contei três vezes.',
    m14: 'Onze libras. E ela estava caída no pé daquela escada o tempo todo que eu passei contando.',
    m15: 'A moça da casinha estava com a luz acesa quando eu voltei para casa depois das onze. Lembro de pensar que tinha mais alguém acordado.',
    m16: 'Venha ao café amanhã. Eu vou te dar de comer e você vai deixar.',

    // ----------------------------------------------------------------- t-esme
    e1: 'Desculpe escrever direto para você. Você disse no grupo que ela mandou você não subir. Ela me disse a mesma coisa naquela semana.',
    e2: 'Ela era muito firme quanto àquela trilha com mau tempo. É por isso que a conclusão me incomoda.',
    e3: 'incomoda como',
    e4: 'Eu mantenho um diário de campo. Horários, posições, condições, todas as noites.\n\nÉ hábito. E é também por isso que posso te dar isto com precisão de minuto.',
    e5: 'Estive na casinha das sete até nove e meia passando a limpo a contagem da tarde.',
    e6: 'Depois o vento caiu por mais ou menos meia hora. Ele faz isso antes de virar. Saí para a trilha do penhasco para ouvir os filhotes uma última vez.',
    e7: 'A lâmpada dela ficou acesa o tempo todo em que estive lá fora. Anotei 21:40 e de novo 22:00. O facho é a minha marca de tempo.',
    e8: 'você estava na trilha na mesma hora que ela estava lá em cima',
    e9: 'Sim. E eu não era a única que estava nela.',
    e10: 'Cruzei com Mairi Bell vindo no sentido contrário às 21:47. Anotei porque eu anoto tudo, e porque me surpreendeu: ela estava com um casaco por cima da cabeça e passou por mim sem dizer uma palavra.',
    e11: 'ela tá dizendo pra todo mundo que ficou no café a noite toda',
    e12: 'Então uma de nós duas está errada, e eu tenho isso anotado na hora com uma velocidade de vento do lado. Não estou dizendo o que isso significa. Estou dizendo que não vou apagar.',
    e13: 'Eu contei ao policial. Ele escreveu no fim do caderno, depois da parte onde ele já tinha escrito “queda”.',
    e14: 'Eu fico mais seis semanas. Se você quiser o diário, ele é seu.',

    // --------------------------------------------------------- t-callum-truth
    k1: 'você sabe né',
    k2: 'ela falou pra todo mundo que eu tava no café. eu não tava no café. pode perguntar pra qualquer um que estava na rampa naquela noite',
    k3: 'por que ela diria isso',
    k4: 'porque se eu tô no café com ela ninguém me pergunta nada. é essa a razão inteira. ela não tava me acobertando. ela tava se acobertando e me usando pra isso',
    k5: 'terminei o cabo por volta de dez e quinze e subi pelos fundos passando pela ponta porque é mais curto',
    k6: 'ela tava na porta do farol. dez e dez, talvez um minuto pra mais ou pra menos. eu vi ela no facho quando ele deu a volta',
    k7: 'eu não gritei. não sei por quê. ela tava parada daquele jeito',
    k8: 'callum',
    k9: 'ela chegou depois das onze encharcada e botou o casaco na máquina. minha mãe nunca lavou um casaco de noite na vida',
    k10: 'e eu fiquei dois dias engolindo isso e deixando ela falar pras pessoas que eu tava do lado dela',
    k11: 'o dinheiro era meu. o buraco nas contas da ruth. era pra mim. eu não sabia de onde vinha e não perguntei e isso é a mesma coisa que saber né',
    k12: 'faz o que você tem que fazer. eu não vou dizer que não é verdade uma segunda vez',

    // ---------------------------------------------------------- t-mairi-again
    n1: 'Ele falou com você. Dá para perceber pelo tempo que você está sem me responder.',
    n2: 'Está bem. Eu fui a pé até a Ponta. Eu disse o café porque o café é mais fácil e porque depois que você diz uma coisa para um policial você tem que continuar dizendo.',
    n3: 'Cheguei até o portão e voltei. Eu não consegui. Vim para casa pelo caminho mais longo para ninguém ver a minha cara.',
    n4: 'o portão',
    n5: 'O portão. Não a porta. Eu não cheguei nem perto da porta.',
    n6: 'Ela ia tirar ele de mim. Não o dinheiro: ela podia ficar com o dinheiro, eu teria vendido o café. Ela ia colocar o nome dele ali dentro.',
    n7: 'Quarenta anos conhecendo ela e ela não foi capaz de me dar uma única manhã.',
    n8: 'Seja lá o que meu filho tenha te contado, ele estava na rampa no escuro e o facho prega peças lá fora. Pergunte a quem quiser. Pergunte a ele de novo amanhã.',
    n9: 'E tem uma coisa que eu não contei para ninguém, porque soa como se eu estivesse inventando uma desculpa para mim mesma. Um homem que se dizia o Keeper ligou para o café naquela noite. Nove e meia, mais ou menos.',
    n10: 'Ele disse que era dos auditores. Disse que a Ruth já tinha mandado os papéis para eles, que já não estava mais nas mãos dela, e que o nome de Callum estaria neles até segunda-feira fizesse quem fizesse o que fosse.',
    n11: 'Eu não perguntei o nome dele. Não perguntei como ele tinha o número do café. Ele não me empurrou para fazer nada, mal disse uma palavra, e eu desliguei o telefone e peguei meu casaco. Faça disso o que quiser. Eu já desisti de tentar.',
  },

  /**
   * The chips are 24-hour digits in both languages and must stay digit for digit
   * identical to the English: this is the board the player lays the village out
   * on, and `a rampa` against `o café` at overlapping minutes is the first thing
   * they prove.
   */
  claims: {
    'c-ruth-tower': 'Ruth: em cima na torre, 20:45–22:30',
    'c-callum-ferry': 'Callum: na balsa, 19:00–20:00',
    'c-you-ferry': 'Você: na última balsa, 19:00–20:00',
    'c-callum-slip': 'Callum: na rampa, 21:40–22:15',
    'c-papers-kept': 'Ruth: ainda estava com os papéis da Fundação, a partir das 20:45',
    'c-mairi-cafe': 'Mairi: no café, 20:30–23:00',
    'c-callum-cafe': 'Callum: no café, 21:00–23:00 (segundo Mairi)',
    'c-you-cafe': 'Você: no café, 21:05–21:30 (segundo Mairi)',
    'c-mairi-cashing': 'Mairi: fazendo o caixa, 22:35–23:00',
    'c-esme-cottage-late': 'Fiona: na casinha, 23:00–24:00 (segundo Mairi)',
    'c-esme-cottage': 'Fiona: na casinha, 19:00–21:30',
    'c-esme-path': 'Fiona: na trilha do penhasco, 21:40–22:10',
    'c-ruth-lamp': 'Ruth: em cima na torre, 21:40–22:00 (segundo Fiona)',
    'c-mairi-path': 'Mairi: na trilha do penhasco, 21:45–22:00 (segundo Fiona)',
    'c-papers-sent': 'Ruth: já tinha mandado os papéis, 20:00–23:00 (segundo uma ligação)',
    'c-mairi-door': 'Mairi: na porta do farol, 22:05–22:15 (segundo Callum)',
  },

  motives: {
    'm-trust':
      'Fazia dois anos que ela tirava dinheiro da Fundação do Farol de Ardnoe para cobrir as dívidas de Callum, e Ruth tinha encontrado o buraco nas contas naquela mesma semana.',
  },

  contradictions: {
    'x-callum-alibi':
      'Callum não podia estar consertando um cabo na rampa e sentado no café da mãe dele ao mesmo tempo. Ele se colocou na rampa por conta própria, na frente do vilarejo inteiro, antes de ela dizer o contrário: a metade falsa é a dela. Ela deu ao filho um álibi que ele nunca pediu, o que significa que ela precisava que ninguém perguntasse nada a ele.',
    'x-mairi-path':
      'Ela se colocou atrás do balcão das oito e meia até as onze. Às 21:47 uma mulher com um diário de campo e nada a ganhar com isso cruzou com ela na trilha do penhasco, no sentido contrário, com um casaco por cima da cabeça. O café não era um álibi. Era um lugar onde se colocar.',
    'x-papers-lie':
      'Os auditores nunca tiveram esses papéis. Ruth escreveu tudo no fim do caderno de campo dela, e o caderno continuava lá em cima na torre, onde ela deixou. Então o homem que se dizia o Keeper, que ligou para o café às nove e meia, não era da Fundação, não tinha por que saber nada sobre a Fundação, e o que ele disse a Mairi Bell não foi um engano. Ele sabia o que uma mulher com uma noite de vida pela frente faria com aquilo.',
    'x-mairi-door':
      'A trilha ainda podia ser uma caminhada para clarear a cabeça. A porta não. Às dez e dez ela estava parada ao pé da torre, iluminada pela lâmpada da própria amiga, no minuto em que Ruth parou de responder, e uma hora antes de voltar para casa e lavar um casaco que ela nunca tinha lavado de noite na vida.',
  },

  confrontation: {
    opening:
      'Eu me perguntava quanto tempo você ia levar. Senta, então. Fala direito, na minha cara, e tenha muita certeza antes de falar.',
    beats: {
      'b-alibi': {
        press:
          'Você falou para todo mundo que Callum estava no café com você. Ele estava na rampa, e foi ele quem disse primeiro, na frente do vilarejo inteiro.',
        rebuttal:
          'Uma mulher se confunde com uma noite depois de um choque desses. Isso não é crime, e você sabe que não é.',
      },
      'b-path': {
        press:
          'Você se colocou atrás daquele balcão das oito e meia até as onze. Fiona Trian cruzou com você na trilha do penhasco às 21:47 e anotou a hora.',
        rebuttal:
          'Então eu andei. As pessoas andam. Era a primeira meia hora de calmaria em uma semana e eu queria ar.',
      },
      'b-door': {
        press:
          'Você disse que voltou no portão. Callum viu você na porta do farol às dez e dez. Viu você no facho dela.',
        rebuttal: 'Ele estava encharcado e estava escuro e aquela luz prega peças. Pergunte a quem quiser.',
      },
      'b-why': {
        press:
          'Ela encontrou o buraco nas contas da Fundação naquela semana. Dois anos disso. E tinha o seu filho dentro dele.',
      },
    },
    deflections: [
      'Isso não prova nada de nada.',
      'Você passou seis anos fora. Você não sabe o que está olhando.',
      'Diga alguma coisa que signifique alguma coisa.',
    ],
    confession:
      'Ela estava no alto da escada com a pasta na mão e não largava.\n\nEu só queria a manhã. Uma manhã, para achar o dinheiro em algum lugar, para o nome dele nunca entrar ali. Ela disse que já tinha deixado escrito.\n\nEu não decidi nada. Eu revi isso a cada hora desde então e não consigo achar o momento em que eu decidi.\n\nAquele homem no telefone. Nenhuma vez ele disse o nome dela e nenhuma vez ele falou nada sobre machucar ela. Ele me perguntou o que eu ia fazer a respeito, e eu contei, tudo, em voz alta, do jeito que a gente faz nove e meia da noite com alguém que você nunca vai conhecer.\n\nE ele me deixou terminar. Ele não me interrompeu nenhuma vez.\n\nAí ele disse: então você já sabe.\n\nE desligou o telefone, e eu peguei meu casaco.',
  },

  coda: {
    from: 'Número desconhecido',
    messages: [
      'O de Ardnoe foi um bom trabalho. Quatro dias. Eu tinha reservado duas semanas e não costumo errar por tanto.',
      'Você demorou com o filho. Ele ia te contar de qualquer jeito. Estava esperando desde terça que alguém perguntasse direito a ele.',
      'Não vou usar este número de novo. Parabéns. Falo sério.',
    ],
  },

  epilogue:
    'Ela não negou quando eles vieram. Perguntou se Callum ia ter que ficar de pé numa sala e dizer aquilo em voz alta, e quando disseram que sim, ela contou tudo sozinha para que ele não precisasse.\n\nFaltavam onze mil libras à Fundação. Ruth tinha deixado tudo escrito no fim do caderno de campo, do próprio punho, com a data em que pretendia ir à polícia. Embaixo ela também tinha escrito: “M. é minha amiga desde os cinco anos. Peçam a eles que sejam gentis com ela.”\n\nNaquele inverno tiraram a lâmpada. Fazia quarenta anos que ninguém era chamado para ficar de pé ao lado dela.',
};
