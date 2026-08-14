import type { CaseTranslation } from '../caseText';

/**
 * Case 2 — "A Suplente". Brazilian Portuguese.
 *
 * Four things this had to get right, in this order.
 *
 * 1. The key. This is a locked room resting on one object, so the object has
 *    exactly one name: `a chave do camarim`, with `a etiqueta vermelha` on it.
 *    Both chips say `a chave do camarim`, both revelations say it, Beatrice is
 *    pressed with it. Where the English shortens to "the key" mid-sentence the
 *    Portuguese shortens to `a chave` the same way — that is a short form of one
 *    name, not a second name. A second name would be a second key, and the locked
 *    room would have a way out of it.
 *
 * 2. Times. The interval is 20:05–20:40 and nearly every time in the prose is
 *    written as words, because the English writes them as words: "ten past",
 *    "twelve past", "twenty to nine". Portuguese cannot leave the hour implicit
 *    the way English can, so `ten past` is `oito e dez` — the same minute, said
 *    fully. Three things stay digits because the English keeps them as digits: the
 *    20:12 train, the 20:51 it actually arrived on (which is the whole of Dev
 *    being innocent), and J14, the seat Beatrice puts herself in.
 *
 * 3. Names. Diane, Beatrice, Dev, Nell, Joel Petrie, Sheffield and the Alhambra
 *    are people and places with names, and they keep them. The descriptive places
 *    are translated, because `the dressing room corridor` sitting untranslated
 *    inside a Portuguese sentence reads as machine output. Full list, so every
 *    decision is visible in review:
 *
 *      you    → Você        theatre   → o Alhambra     stagedoor → a porta de artistas
 *      coral  → Diane       stage     → o palco        station   → a estação de trem
 *      bea    → Beatrice    auditorium→ a sala         key1      → a chave do camarim
 *      dev    → Dev         corridor  → o corredor dos camarins
 *      nell   → Nell        dressing1 → o camarim da Diane
 *
 *    `a sala` is the auditorium as a whole, and that choice is load-bearing.
 *    Beatrice claims the auditorium from J14 and Nell puts her at the back of the
 *    circle; `o balcão` sits inside `a sala` exactly as the circle sits inside the
 *    auditorium. Naming it `a plateia` would have made those two places different
 *    and invented a contradiction the engine does not hold. `plateia` is still used
 *    once, in e8c, but for the audience rather than the room.
 *
 *    Brazilian spelling throughout: `camarim`, plural `camarins`.
 *
 * 4. Voice. Four people type differently and the difference is the character.
 *    Beatrice writes like a woman dictating a letter: capitals, full stops,
 *    subordinate clauses, and the knife inside the good manners. Dev is lowercase
 *    and technical — `contrarregra`, `aviso`, `coxia`, `deixa` — because he has
 *    called the show for twenty two years and types like it. Nell is lowercase and
 *    hedges: `é que`, `sei lá`, `desculpa`, `acho`. Diane is lowercase and clipped
 *    and never explains herself. The player is lowercase and short.
 *
 *    Dev and Nell both open lowercase and both capitalise the names, so the
 *    distance between them is vocabulary rather than casing — the jargon against
 *    the hedging. That is exactly the distinction a translation flattens first,
 *    so the test checks both halves of it.
 *
 * The theatre words are the Brazilian ones rather than the literal ones:
 * `beginners` is `em cena` because that is the call a Brazilian stage manager
 * gives, `the interval` is `o intervalo`, `the prompt corner` is `a contrarregra`,
 * `the wings` are `a coxia`, `press night` is `a noite de imprensa`, `the notices`
 * are `as críticas`.
 *
 * The setting stays British: Sheffield, pounds, a company van, a railway station.
 * Nothing is converted and nothing is relocated.
 *
 * Gender. The player's gender is never stated. One rephrase was forced: b1, where
 * the English "You have been busy." wants `ocupado`/`ocupada` and both agree. It is
 * rebuilt as `Você não parou.`, which keeps Beatrice opening on the accusation
 * that the player has been going round her company without picking a gender.
 *
 * No arc content. Pack 2 is deliberately standalone — no Keeper, no Listener, no
 * coda — and the silence is load-bearing, so the test asserts it stays silent.
 */
export const theUnderstudyPtBr: CaseTranslation = {
  title: 'A Suplente',
  blurb:
    'Uma atriz principal morre trancada no camarim na noite de imprensa. Existe uma única chave, e duas pessoas dizem que estavam com ela.',

  characters: {
    you: 'Você',
    coral: 'Diane',
    bea: 'Beatrice',
    dev: 'Dev',
    nell: 'Nell',
  },

  places: {
    theatre: 'o Alhambra',
    stage: 'o palco',
    auditorium: 'a sala',
    corridor: 'o corredor dos camarins',
    dressing1: 'o camarim da Diane',
    stagedoor: 'a porta de artistas',
    station: 'a estação de trem',
  },

  objects: {
    key1: 'a chave do camarim',
  },

  threads: {
    't-coral': 'Diane',
    't-company': 'Companhia do Alhambra',
    't-dev': 'Dev',
    't-nell': 'Nell',
    't-bea': 'Beatrice Kyd',
  },

  briefing: {
    causeOfDeath: 'Uma overdose do próprio remédio dela.',
    ruling: 'Registrada como autoadministrada. A porta estava trancada por dentro.',
    opening:
      'Diane Vane vinha carregando a turnê nas costas desde Sheffield, e todo mundo dizia isso, quase sempre na frente dela.\n\nNa noite de imprensa ela saiu de cena no intervalo, foi para o camarim e não voltou. A porta estava trancada. A companhia seguiu sem ela, e a suplente recebeu o aviso que esperava havia onze meses.',
  },

  messages: {
    // ---------------------------------------------------------------- t-coral
    cl1: 'noite de imprensa. dezessete deles aqui hoje e dois que importam',
    cl2: 'você já fez isso cem vezes',
    cl3: 'não com a Bea no prédio. ela ficou na sala todas as noites desta semana com um caderno e não escreve nada nele',
    cl4: 'ela quer que eu pare de pedir. eu não vou parar de pedir',
    cl5: 'diane quanto você já tirou dela',
    cl6: 'não fala assim. quem estava dirigindo era ela. duas de nós sabiam e uma das duas passou onze anos fingindo que não',
    cl7: 'onze mil este ano. ela ofereceu, eu não pedi. e ela pode pagar e o Joel Petrie não anda',
    cl8: 'ainda assim é uma coisa que você está fazendo com ela',
    cl9: 'sei o que é isso. depois de hoje acabou de um jeito ou de outro. em cena. falamos depois',
    cl10: 'diane',

    // -------------------------------------------------------------- t-company
    q1: 'Companhia. Diane morreu ontem à noite no camarim dela. A polícia veio e foi embora, e está convencida de que foi o remédio dela mesma.',
    q2: 'Hoje tem função. Ela teria feito questão e eu não vou fingir o contrário. Nell entra.',
    q3: 'eu não quero assim',
    q4: 'Ninguém quer assim. Você entra sete e meia.',
    q5: 'a porta estava trancada. eu quero dizer isso em voz alta porque ninguém naquela sala disse isso em voz alta',
    q6: 'tem uma chave. uma. a cópia sumiu em Sheffield e a gente nunca tirou outra porque custava quarenta libras e a Bea disse que não',
    q7: 'e ela ficou no meu cinto o intervalo inteiro, na contrarregra, que é onde ela mora',
    q8: 'Dev. Aqui não.',
    q9: 'E você não esteve no prédio esse tempo todo, então eu peço que meça a certeza com que você fala.',
    q10: 'isso não é justo e você sabe que não é',
    q11: 'ela me mandou mensagem às sete. disse que depois de hoje acabava de um jeito ou de outro',
    q12: 'Ela dizia muita coisa para muita gente. Essa era, em boa medida, a dificuldade com ela.',
    q13: 'ela foi gentil comigo. foi a única que foi',
    q14: 'pergunta pra Nell onde ela estava oito e dez. ela viu mais do que falou aqui',

    // ------------------------------------------------------------------ t-dev
    d1: 'desculpa por aquilo lá dentro. faz vinte e dois anos que eu dou aviso e nunca perdi ninguém num intervalo',
    d2: 'ela disse que você não estava no prédio',
    d3: 'eu ia estar. nossa assistente de cenografia chegava no trem das 20:12 e eu disse que descia para buscar ela, são quatro minutos',
    d4: 'o das 20:12 estava quarenta minutos atrasado. entrou 20:51. eu não saí da porta de artistas, fiquei parado nela fumando e olhando o painel no celular',
    d5: 'a Nell passou por mim duas vezes. ela vai te confirmar. estava no corredor oito e cinco esperando alguém falar que ela não ia entrar, igual todas as noites',
    d6: 'e a Beatrice',
    d7: 'a Bea desceu pelo corredor por volta de oito e doze e voltou a subir por volta de oito e vinte. eu vi ela da porta. não achei nada de mais, ela anda por onde quer',
    d8: 'a Diane desceu oito e dez e foi a última vez que eu vi ela. dei o aviso da segunda parte e ela não veio e eu achei que ela estava sendo a Diane por causa das críticas',
    d9: 'passei a noite inteira pensando nisso. se eu tivesse descido oito e vinte em vez de ficar plantado ali que nem um poste',

    // ----------------------------------------------------------------- t-nell
    e1: 'o Dev disse que você ia querer falar comigo. todo mundo acha que fui eu. eu também acharia que fui eu',
    e2: 'onze meses entrando no vestido e tirando ele de novo. pode falar. é isso mesmo que parece',
    e3: 'onde você estava no intervalo',
    e4: 'no corredor, das oito e cinco às oito e doze, parada na porta do figurino esperando o Dev falar que eu não ia entrar. depois subi pra coxia pra segunda parte porque eu assisto de lá',
    e5: 'e aí eu fiquei no palco a partir das vinte pras nove na frente de quatrocentas pessoas',
    e6: 'o Dev diz que você viu mais do que contou',
    e7: 'a Bea passou por mim mais ou menos oito e dez. ela estava com a chave na mão. eu conheço essa chave, tem a etiqueta vermelha que o Dev botou pra ela parar de sumir',
    e8: 'eu não falei isso no grupo porque é ela que me dá trabalho. ela vai me dar todo trabalho que eu tiver nesta cidade',
    e8b: 'ela diz que estava dando notas no intervalo',
    e8c: 'ninguém recebeu nota nenhuma. pergunta pra qualquer um deles. é que eu subo pelo fundo do balcão pra chegar na coxia porque no intervalo eles trancam a porta de passagem, e ela estava parada lá em cima no corredor da poltrona com o celular, de costas pra plateia, o tempo todo que eu passei',
    e9: 'você está falando agora',
    e10: 'porque ontem eu entrei com o vestido dela e serviu, e desde então eu estou passando mal com isso. ela foi gentil comigo e foi horrível com a Bea. eu não sei o que fazer com isso',

    // ------------------------------------------------------------------ t-bea
    b1: 'Você não parou. Duas pessoas da minha companhia pararam de me olhar nos olhos e eu não acho que seja coincidência.',
    b2: 'Eu estava na sala das oito e cinco até subir a segunda parte. Eu sento na J14 todas as noites de toda temporada e quarenta pessoas saberiam descrever a minha nuca.',
    b3: 'E eu estava trabalhando. Em noite de imprensa eu dou notas no intervalo, sempre, porque são os únicos vinte minutos em que alguém escuta.',
    b4: 'ela estava tirando dinheiro de você',
    b5: 'Estava. Onze mil este ano, dezenove no ano passado. Eu paguei tudo e teria continuado pagando. A alternativa era o Joel Petrie ler sobre mim num jornal.',
    b6: 'Quem estava dirigindo era eu. É isso. Faz onze anos, numa estrada molhada nos arredores de Sheffield, com a van da companhia e duas pessoas dentro, e uma delas não se levantou mais.',
    b7: 'Nunca uma vez sequer eu disse que não fui eu. Eu disse que foi a estrada. Diane ia no banco do carona e sabia que não foi a estrada.',
    b8: 'e semana passada ela disse que acabava de um jeito ou de outro',
    b9: 'Sim. Acabava no sentido de que ela ia falar. Numa noite de imprensa. Com dezessete deles lá dentro.',
    b10: 'Nada disso me coloca naquele corredor. Cuidado com o que você acha que tem.',
  },

  /**
   * Digits here are digits in both languages and stay identical to the English,
   * because these are the twelve lines the player lays side by side on the board.
   * The two that break the locked room are the two `chave do camarim` chips.
   */
  claims: {
    'c-coral-stage': 'Diane: no palco, 19:00–20:05',
    'c-key-dev': 'Dev: estava com a chave do camarim, 19:50–20:40',
    'c-dev-station': 'Dev: na estação, 20:05–20:35 (segundo Beatrice)',
    'c-dev-stagedoor': 'Dev: na porta de artistas, 19:50–20:40',
    'c-bea-corridor': 'Beatrice: no corredor, 20:12–20:22 (segundo Dev)',
    'c-coral-dressing': 'Diane: no camarim dela, 20:10–20:40',
    'c-nell-corridor': 'Nell: no corredor, 20:05–20:12',
    'c-nell-stage': 'Nell: no palco, 20:40–22:00',
    'c-key-bea': 'Beatrice: estava com a chave do camarim, 20:10–20:20 (segundo Nell)',
    'c-bea-call': 'Beatrice: sozinha ao telefone, 20:10–20:20 (segundo Nell)',
    'c-bea-auditorium': 'Beatrice: na sala, 20:05–20:45',
    'c-bea-notes': 'Beatrice: dando notas do intervalo, 20:05–20:25',
  },

  motives: {
    'm-sheffield':
      'Fazia dois anos que Diane tirava dinheiro dela por causa do acidente de Sheffield, e ela tinha decidido dizer aquilo em voz alta na noite de imprensa.',
  },

  contradictions: {
    'x-key':
      'Existe uma chave e existe uma só chave desde Sheffield. Dev diz que ela estava no cinto dele, na contrarregra; Nell viu Beatrice descer o corredor com ela pendurada pela etiqueta vermelha. As duas coisas não podem ser verdade, e só uma delas tranca uma porta por fora e a deixa com cara de trancada por dentro.',
    'x-bea-corridor':
      'Ela se colocou na J14 o intervalo inteiro, onde quarenta pessoas conhecem a nuca dela. Dev viu ela descer pelo corredor dos camarins oito e doze e voltar a subir oito e vinte, de uma porta de artistas da qual ele não saiu.',
    'x-bea-notes':
      'Notas do intervalo numa noite de imprensa, ela disse, porque são os únicos vinte minutos em que alguém escuta. Naquela noite ninguém da companhia recebeu nota nenhuma. Ela ficou ao telefone no escuro no fundo do balcão, sozinha, o tempo todo.',
    'x-dev-train':
      'O das 20:12 estava quarenta minutos atrasado e só chegou 20:51, então não havia trem nenhum para Dev buscar e ele não saiu da porta de artistas. Ele era a única pessoa no prédio que enxergava aquele corredor durante todo o intervalo, e foi Beatrice quem tentou tirar ele de lá.',
  },

  confrontation: {
    opening:
      'Senta. Eu dirigi quarenta e uma montagens e nunca cheguei atrasada a uma conversa difícil, então fala direito.',
    beats: {
      'u-key': {
        press:
          'Existe uma chave só. Dev estava com ela no cinto o intervalo inteiro, e Nell viu você descer o corredor com ela pendurada pela etiqueta vermelha.',
        rebuttal:
          'A Nell gostaria do meu cargo e quer ele desde março. Ponha uma menina de dezenove anos na frente de um policial e ela vai lembrar do que for preciso para sair da sala.',
      },
      'u-corridor': {
        press:
          'Você se colocou na J14 o intervalo inteiro. Dev viu você descer aquele corredor oito e doze e voltar a subir oito e vinte.',
        rebuttal:
          'O Dev dá aviso há vinte e dois anos dormindo quatro horas por noite. É um homem maravilhoso e não saberia te dizer o que almoçou hoje.',
      },
      'u-notes': {
        press:
          'Você disse que estava dando notas do intervalo. Nenhuma pessoa daquela companhia recebeu uma nota. Você estava ao telefone no fundo do balcão, sozinha, no escuro.',
        rebuttal: 'E uma mulher pode dar um telefonema.',
      },
      'u-why': {
        press:
          'Dezenove mil num ano e onze no seguinte, por onze anos de ter sido a estrada e não você. E ela tinha decidido falar na noite de imprensa.',
      },
    },
    deflections: [
      'Isso não é prova, isso é um estado de espírito.',
      'Você está neste prédio há quatro dias. Eu estou nele desde março.',
      'Tenta de novo, e desta vez com algo que eu não conseguisse desmontar na frente de um júri.',
    ],
    confession:
      'Ela saiu de cena no intervalo e vinha acesa com aquilo. Não era crueldade. É isso que as pessoas não vão entender dela. Ela não estava sendo cruel, estava sendo *livre*, finalmente, depois de onze anos carregando aquilo por mim.\n\nDisse que tinha avisado os dois críticos que ia dar a eles uma coisa melhor do que a peça. Falou do jeito que se dá uma boa notícia.\n\nEu estava com a chave na mão porque tinha descido para pedir que ela não fizesse aquilo. Só desci para isso. Quero isso escrito em algum lugar.\n\nEla riu de mim, e gente melhor já riu de mim, e depois virou para o espelho e começou a tirar o rosto, e disse não fica na frente da minha luz.\n\nE eu botei os comprimidos na frente dela e sentei na outra cadeira e não falei uma palavra para impedir. Foi isso que eu fiz. Eu não obriguei ela a tomar. Eu só não falei a coisa que teria impedido, e sei exatamente quanto tempo eu passei sem falar.',
  },

  epilogue:
    'Acharam o segundo copo na pia, lavado, e a chave com a etiqueta vermelha ainda morna no bolso do casaco dela quando a polícia enfim pediu que ela esvaziasse o bolso.\n\nNell fez a temporada inteira e depois foi com a montagem quando ela mudou de teatro, e estava muito bem, e não falou com jornalista nenhum sobre nada disso.\n\nJoel Petrie recebeu a carta de um advogado na primavera. Fazia onze anos que ele sabia da estrada. Disse que a única coisa que ele sempre quis era que alguém falasse aquilo em voz alta sem que ele precisasse pedir.',
};
