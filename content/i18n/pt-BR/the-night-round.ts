import type { CaseTranslation } from '../caseText';

/**
 * Case 3 — "A Ronda da Noite". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The three records. The case is one paper record disagreeing with one machine
 *    record, so each has exactly one Portuguese name and never a second. `o livro
 *    da noite` is the night book in the blurb, in the briefing, in Margo’s mouth,
 *    in Claire’s, in the revelation and in the epilogue. `a ronda` is the round
 *    everywhere — Margo assina a ronda das onze e não faz a ronda. `o crachá` is
 *    the fob, `de acesso` where the English says "door fob" in full, `de
 *    visitante` where it says "visitor fob", and bare where it says "fob", which
 *    is the same distinction the English makes. Two names for the night book is
 *    two books and the case stops working. `o livro de medicação` is deliberately
 *    a different book, exactly as the English keeps the medicines book apart.
 *
 * 2. Times. Every one survives in the same grammatical position, because the
 *    player solves this by holding two of them side by side. Ali signs out at
 *    `vinte pras dez` in the briefing, in g6 and in the revelation. She is home
 *    from `dez e quinze`, asleep from `dez e meia`, and Teddy has her on the
 *    corridor at `onze e meia` and back down the stairs at `vinte pras doze`.
 *    Margo sits from `cinco pras onze` until `onze e vinte`, which is the pair
 *    that breaks her. 23:47 stays 23:47 in Claire’s account, on the chip, in the
 *    revelation and in the press, because it is the one fact nobody can call a
 *    memory.
 *
 *    The epilogue keeps `7` rather than becoming `19h`. Ivy wrote `7pm` in her own
 *    ledger and the entry is quoted, so `7 da noite` keeps both the digit and the
 *    fact that an eighty four year old wrote it by hand.
 *
 * 3. Names. People stay: Ivy, Ali (Alison in prose, exactly as in the English),
 *    Margo, Teddy, Claire, and Lagos, Kilmarnock and Marchbank House with them.
 *    The descriptive places are translated:
 *
 *      you       → Você            marchbank → Marchbank House
 *      ivy       → Ivy             ivyroom   → o quarto da Ivy
 *      fen       → Ali             corridor  → o corredor do primeiro andar
 *      margo     → Margo           dayroom   → a sala de convivência
 *      teddy     → Teddy           desk      → o posto de enfermagem
 *      saoirse   → Claire          carpark   → o estacionamento
 *                                  fenhouse  → a casa da Ali
 *
 *    `a sala de convivência` and `o posto de enfermagem` are what a Brazilian care
 *    home actually calls those two rooms, and Teddy can see one from the other,
 *    which is the whole of his testimony.
 *
 *    The setting stays British: pounds, miles, a GP, a care home registration.
 *    Nothing is converted, because converting `eleven miles` into kilometres
 *    changes a fact rather than translating it.
 *
 * 4. Voice. Six people write differently. Ivy is eighty four, precise and dry,
 *    complete sentences, understatement doing the work (`É justamente esse o
 *    problema.`). Margo is warm, runs on, exclaims, and leaves the final full stop
 *    off nearly every message, which the English does too. Teddy is clipped and
 *    exact and never estimates a time. Ali is formal and defensive and reaches for
 *    distance when cornered. Claire writes like someone whose words may be read
 *    back to her. The player is lowercase and short.
 *
 * 5. `the Keeper` stays in English, once, in the confession and nowhere else.
 *
 *    This is the first arc connection, and per docs/arc-design.md the reveal
 *    happens only after the case is already solved: the caller knew Ivy’s
 *    September prognosis, which was in no record Ali could reach. So the name must
 *    not appear in any message, revelation, coda or epilogue — a player who meets
 *    it early meets it as a clue instead of as the floor moving. The test asserts
 *    both halves: exactly one mention, and nothing before the confession.
 *
 *    He is the same man a player met in Pack 1, and the recognition is the entire
 *    payoff, so the word is identical to the one in `the-lighthouse.ts`. Never `o
 *    Guardião`: he is not the keeper of a light, he is the keeper of records, and
 *    a translated alias would read as a different man in each pack.
 *
 * Gender. This case used to be the exception, and the reasoning was sound: the
 * English stated the player was male — m1 had Margo call them `Ivy's godson` —
 * so `o afilhado da Ivy`, with `querido` and `mais rápido` agreeing rather than
 * dodging, because neutralising it would have deleted a fact the English stated
 * outright. Spanish reached the same conclusion independently.
 *
 * Flagging it got the English changed instead, which is the better fix. That
 * was the only line in fifteen packs that said what the player is, and it
 * forced Portuguese, Spanish and French into a choice the game makes nowhere
 * else. Margo now names the relationship from Ivy's side — `A Ivy era sua
 * madrinha` — carrying the identical fact, since Ivy is dead, female and known,
 * while leaving the player unmarked.
 *
 * So nothing addressed to the player agrees now: `meu bem` from Ivy, whose own
 * gender is fixed and says nothing about the addressee, and the coda rebuilt as
 * `você levou menos tempo`.
 */
export const theNightRoundPtBr: CaseTranslation = {
  title: 'A Ronda da Noite',
  blurb:
    'Uma assinatura no livro da noite diz que alguém entrou para ver ela às onze. Ninguém entrou.',

  characters: {
    you: 'Você',
    ivy: 'Ivy',
    fen: 'Ali',
    margo: 'Margo',
    teddy: 'Teddy',
    saoirse: 'Claire',
  },

  places: {
    marchbank: 'Marchbank House',
    ivyroom: 'o quarto da Ivy',
    corridor: 'o corredor do primeiro andar',
    dayroom: 'a sala de convivência',
    desk: 'o posto de enfermagem',
    carpark: 'o estacionamento',
    fenhouse: 'a casa da Ali',
  },

  threads: {
    't-ivy': 'Ivy',
    't-marchbank': 'Famílias de Marchbank',
    't-margo': 'Margo',
    't-teddy': 'Teddy',
    't-saoirse': 'Claire Nolan',
  },

  briefing: {
    causeOfDeath: 'Parada cardíaca. Ela tinha oitenta e quatro anos e tinha um coração.',
    ruling: 'Registrada como morte natural. A família não pediu necropsia.',
    opening:
      'Ivy Rennick estava em Marchbank House havia três anos e reclamava disso por escrito, todo dia, para qualquer um que lhe desse um número.\n\nA filha dela visitou na terça à noite e assinou a saída vinte pras dez. O livro da noite diz que alguém entrou para ver a Ivy às onze e de novo às duas. Ela foi encontrada às sete da manhã, fria, e a família não pediu necropsia.',
  },

  messages: {
    // ------------------------------------------------------------------ t-ivy
    i1: 'A sopa era a mesma sopa, meu bem. Eu anotei. Quinta e terça, a mesma sopa, e uma delas eles chamam de caldo.',
    i2: 'você é a única pessoa que eu conheço que tem um caderno de sopas',
    i3: 'Eu tenho um caderno de tudo. Isso irrita eles.',
    i4: 'A Alison vem às sete. Ela está com aquela voz no telefone que quer dizer que ela quer que eu assine alguma coisa.',
    i5: 'não assina nada',
    i6: 'Eu não assino nada desde março e ela sabe disso. É justamente esse o problema.',
    i7: 'Estou na sala de convivência com o Teddy. Ele está sendo maldoso com as palavras cruzadas e eu estou deixando.',
    i8: 'Ela já foi. Ficou aqui cinquenta minutos e quarenta deles foram sobre as mensalidades.',
    i9: 'Me liga amanhã que eu te conto o que ela me pediu. Quero dizer isso em voz alta para alguém que não é pago para estar aqui.',
    i10: 'logo cedo. vai dormir',

    // ------------------------------------------------------------ t-marchbank
    g1: 'Escrevo para avisar às famílias que perdemos Ivy Rennick na madrugada de quarta. A filha dela já foi informada e está conosco. Diremos mais quando houver mais a dizer.',
    g2: 'Sinto muitíssimo. Ela ficou dois anos no meu corredor e nunca me deixou escapar de nada!! Vou sentir muita falta dela',
    g3: 'Obrigada a todos. É claro que na idade dela não era algo inesperado. Preferimos que não haja necropsia e já falei isso com o clínico geral, então por favor não me sugiram isso de novo.',
    g4: 'ela me mandou mensagem dez e dez. ela estava bem dez e dez',
    g5: 'Ela tinha oitenta e quatro anos. Estar bem às dez e ter partido à meia-noite é exatamente o que acontece, e eu peço que você tome cuidado com a impressão que está passando.',
    g6: 'Eu saí vinte pras dez. Assinei a saída vinte pras dez. Em casa dez e quinze, na cama dez e meia. Como sempre.',
    g7: 'Dormindo desde as dez e meia. Meu celular fica no patamar da escada, ele carrega no patamar, perguntem a qualquer um que me conheça.',
    g8: 'Ninguém está insinuando nada. Eu peço que a gente dê uma semana à família.',
    g9: 'O Teddy anda perguntando por você. Comigo ele não fala do assunto, diz que eu sou funcionária. Ele fica na sala de convivência desde as seis toda manhã se você quiser falar com ele',

    // ---------------------------------------------------------------- t-margo
    m1: 'A Ivy era sua madrinha, né. Ela me mostrou sua foto umas quatrocentas vezes, não estou exagerando!',
    m2: 'quem entrou pra ver ela naquela noite',
    m3: 'Eu. Eu faço a das onze e a das duas naquele corredor, está no livro da noite com as minhas iniciais. Onze e duas, toda noite, faz quatorze anos que eu faço',
    m4: 'Ela estava dormindo. Foi isso que eu escrevi. Dormindo, tranquila, sem intercorrências',
    m5: 'você viu mais alguém no corredor',
    m6: 'Eu ouvi um carro sair do estacionamento bem tarde. Tarde o bastante pra eu levantar a cabeça. Táxi aparece, mas não àquela hora e não com aquele motor, era um diesel e virou à esquerda',
    m7: 'como você sabe que era o carro dela',
    m8: 'Porque ela vem faz três anos e eu ouço aquele motor faz três anos. No grupo eu não vou falar isso e por favor não me obrigue. Eu preciso deste emprego, tenho dois em casa',
    m9: 'De todo jeito eu fiquei na sala com o livro de medicação da uma até a passagem de plantão, então eu teria ouvido qualquer outra coisa',

    // ---------------------------------------------------------------- t-teddy
    t1: 'Você demorou.',
    t2: 'Quarenta e um anos de orçamentista de obra. Eu não durmo e não chuto horário. Se eu te dou uma hora, é uma hora.',
    t3: 'A Ivy ficou comigo na sala de convivência até dez pras dez. A filha dela veio, buscou ela e levou ela para cima. Foi a última vez que eu a vi.',
    t4: 'e depois disso',
    t5: 'À noite eu sento na porta da sala de convivência porque a minha poltrona fica ali e o meu quadril é o que é. Eu enxergo o posto de enfermagem e o pé da escada. Eu vi tudo.',
    t6: 'A Margo não subiu às onze. Ela ficou sentada naquele posto das cinco pras onze até onze e vinte com o telefone grudado na orelha e não levantou uma vez sequer.',
    t7: 'Não estou te contando isso para que ela seja demitida. Ela fala com a mãe dela em Lagos na terça por causa do fuso. Todo mundo aqui sabe e todo mundo aqui deixa.',
    t8: 'A filha desceu a escada vinte pras doze. Onze e meia ela estava naquele corredor, porque eu ouvi a porta da Ivy, e a porta da Ivy está precisando de conserto faz um ano.',
    t9: 'Ela não me viu. As pessoas não me veem. Isso tem suas vantagens.',
    t10: 'A Ivy me disse em setembro que tinham dado um número a ela. Não quis me dizer qual. Disse que não tinha contado para a filha e que não ia contar, por causa do que a filha faria com aquilo.',

    // -------------------------------------------------------------- t-saoirse
    s1: 'Eu vou te contar algumas coisas e vou ter cuidado, porque eu tenho vinte e nove residentes e um alvará para manter.',
    s2: 'O livro da noite está assinado. Esse é um registro. Os crachás de acesso são outro registro e os dois não batem, e eu não sabia disso até você me fazer ir olhar.',
    s3: 'O crachá de visitante de Alison Reid abriu a porta do estacionamento de dentro para fora às 23:47. Antes disso não há leitura nenhuma de entrada, porque a porta de entrada ficou escorada a noite toda por causa da lavanderia, o que é outra conversa que eu estou tendo com outra pessoa.',
    s4: 'as mensalidades',
    s5: 'Três meses sem pagar. Alison tem a procuração e tem desde 2021. Eu tinha escrito para ela duas vezes e a segunda carta dizia que se chegasse a quatro meses eu era obrigada a fazer uma notificação ao serviço de proteção ao idoso sobre as contas.',
    s6: 'Aquela carta saiu na sexta. Ela teria recebido na segunda. Ivy morreu na noite de terça.',
    s7: 'Uma notificação significa que alguém de fora deste prédio olha três anos daquela conta. Quero deixar claro que eu não pensei nisso como um motivo. Pensei nisso como uma carta.',
  },

  /**
   * The clock times here are digits in both languages and stay digit for digit
   * identical to the English, because these are the chips the player lays side by
   * side. The `11` in the Margo round chip is the hour she signed for rather than a
   * clock time, and it stays a bare 11 for the same reason.
   */
  claims: {
    'c-ivy-dayroom': 'Ivy: na sala de convivência, 21:00–21:50',
    'c-fen-home': 'Ali: em casa, 22:15–24:00',
    'c-fen-asleep': 'Ali: dormindo em casa, 22:30–24:00',
    'c-margo-round': 'Margo: fez a ronda das 11 da noite, 23:00–23:20',
    'c-ivy-room': 'Ivy: no quarto dela, 22:00–24:00 (segundo Margo)',
    'c-fen-driving': 'Ali: saindo de Marchbank de carro, 23:25–23:45 (segundo Margo)',
    'c-margo-office': 'Margo: no posto de enfermagem, 01:00–02:00',
    'c-teddy-dayroom': 'Teddy: na porta da sala de convivência, 23:00–00:30',
    'c-margo-desk': 'Margo: sentada no posto de enfermagem, 23:00–23:15 (segundo Teddy)',
    'c-fen-corridor': 'Ali: no corredor do primeiro andar, 23:30–23:40 (segundo Teddy)',
    'c-fen-carpark': 'Ali: no estacionamento, 23:47–23:57 (registro do crachá)',
  },

  motives: {
    'm-attorney':
      'Ela tem a procuração desde 2021, as mensalidades estavam três meses sem pagar, e uma notificação ao serviço de proteção ao idoso aos quatro meses teria colocado três anos daquela conta na frente de alguém de fora do prédio.',
  },

  contradictions: {
    'x-fen-corridor':
      'Ela assinou a saída vinte pras dez e se colocou em casa a partir das dez e quinze. Teddy Balfour ficou sentado na porta da sala de convivência com a escada à vista e ouviu a porta da Ivy onze e meia, e aquela porta está precisando de conserto faz um ano.',
    'x-fen-asleep':
      'Dormindo desde as dez e meia, ela disse, com o celular carregando no patamar da escada. Margo ouviu um motor diesel sair do estacionamento àquela hora e virar à esquerda, e ela vem ouvindo aquele motor chegar três anos seguidos.',
    'x-fen-carpark':
      'O livro da noite é uma assinatura. O crachá de acesso é uma máquina. O dela abriu a porta do estacionamento de dentro para fora às 23:47, duas horas depois do horário em que ela diz que estava na cama e a onze milhas de onde ela diz que estava.',
    'x-margo-round':
      'Margo assinou a ronda das onze e não fez a ronda. Ficou sentada no posto de enfermagem com o telefone grudado na orelha, falando com a mãe dela em Lagos, do jeito que ela faz toda terça por causa do fuso. É por isso que ninguém entrou para ver a Ivy durante dez horas. É motivo de demissão e não é assassinato, e todas as pessoas daquele prédio sabiam das ligações de terça e deixavam ela ter aquilo.',
  },

  confrontation: {
    opening:
      'Você andou conversando com um homem de noventa anos que passa a noite sentado numa porta e com uma cuidadora que falsificou um registro. Claro que eu vou escutar, mas eu quero que você ouça como isso soa.',
    beats: {
      'r-corridor': {
        press:
          'Você assinou a saída vinte pras dez e se colocou em casa a partir das dez e quinze. Teddy ouviu a porta da sua mãe onze e meia, e aquela porta se anuncia sozinha.',
        rebuttal:
          'Ele tem noventa e um anos e fica sentado no escuro. Metade do tempo ele não sabe nem que dia é, e você montou tudo isso em cima dele.',
      },
      'r-asleep': {
        press:
          'Você disse dormindo desde as dez e meia. Margo ouviu o seu carro sair daquele estacionamento e virar à esquerda, e ela escuta ele chegar toda semana faz três anos.',
        rebuttal: 'Um diesel. Numa cidade cheia deles. É isso que você tem.',
      },
      // r-carpark and r-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence, so there is nothing here
      // to translate and a line would break the scene.
      'r-carpark': {
        press:
          'Então toma uma que não é uma pessoa. O seu crachá abriu a porta do estacionamento de dentro para fora às 23:47. A máquina não fica sentada numa porta e a máquina não precisa do emprego.',
      },
      'r-why': {
        press:
          'Três meses sem pagar, e a carta da Claire dizia que quatro meses significavam uma notificação ao serviço de proteção ao idoso. Aquela carta chegou até você na segunda. A sua mãe morreu na terça.',
      },
    },
    deflections: [
      'Isso não é um fato, isso é algo que alguém sentiu.',
      'Você não esteve aqui em nenhum dos três anos. Você vinha visitar.',
      'Me traga alguma coisa que não dependa da memória de alguém.',
    ],
    confession:
      'Ela estava acordada quando eu subi de novo. Ela sempre estava. Disse não acende a luz, e depois disse eu sei o que você anda fazendo, Alison, e disse isso com carinho, que foi a pior parte.\n\nEu segurei o travesseiro e contei e ela não resistiu por muito tempo. Não vou descrever isso melhor do que assim. Tive onze semanas para achar um jeito de dizer que deixasse isso menor e não existe um.\n\nE eu quero contar a outra coisa, porque no fim você vai descobrir e eu prefiro que venha de mim.\n\nUm homem que se dizia o Keeper me ligou na segunda à noite. Disse que era da equipe de cuidados continuados. Sabia o que a carta dizia. Sabia da notificação, que fora daquela sala ninguém sabia, e aí me disse que tinham dado de oito a quatorze meses para a minha mãe em setembro e que ela tinha pedido para não contarem à família.\n\nEu não sabia disso. Ela nunca me contou. Ele sabia e eu não, e ele disse aquilo do jeito que se diz a hora para alguém.\n\nAí ele disse: então o dinheiro tem que durar mais do que ela, e a carta vem primeiro. E eu disse o que é que eu devo fazer. E ele não respondeu por um tempo. Ele me deixou ali dentro daquilo.\n\nE aí ele disse, bom. Você já pensou nisso, senão não teria me perguntado.\n\nEle nunca me mandou fazer nada. Eu revi isso mil vezes. Nenhuma vez sequer ele me mandou fazer nada.',
  },

  coda: {
    from: 'Número desconhecido',
    messages: [
      'Marchbank, então. Desta vez você levou menos tempo. Seis dias.',
      'O velho orçamentista foi sorte e você não deveria se parabenizar por ele. Ele ia contar para alguém. A cuidadora você conduziu direito, e eu reparei.',
      'Você vai querer saber como eu tinha o número de setembro. Fica com essa. É a pergunta interessante e você ainda não fez ela.',
      'Número diferente na próxima vez. Como sempre.',
    ],
  },

  epilogue:
    'No fim a conta foi olhada. Quarenta e uma mil libras em três anos, e um débito automático para um depósito em Kilmarnock que ninguém nunca conseguiu explicar.\n\nMargo Adeyemi foi suspensa por onze dias por causa do livro da noite e depois readmitida sem alarde, porque Marchbank não conseguia cobrir o corredor sem ela e porque vinte e nove famílias escreveram. Ela ainda faz a das onze e a das duas. Agora ela faz andando.\n\nTeddy Balfour prestou depoimento de uma sentada só, com horários, e o policial que o tomou disse depois que era o relato mais limpo que ele já tinha recebido de alguém, de qualquer idade.\n\nO caderno da Ivy estava na gaveta. Três anos dele. A última anotação é a de terça, e diz: Alison, 7 da noite, quer que eu assine. Não assinei.',
};
