import type { CaseTranslation } from '../caseText';

/**
 * Case 10 — "Open Mic". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The clip is real and it is from the wrong week. There is one clock in this
 *    pack and it is correct, so the lie lives in the calendar rather than the
 *    hour. The three things that date the footage have to stay exact: the trains
 *    bit, the one about his mother, and the callback to Priya's swan — `não tem
 *    cisne na terça` is the sentence that breaks him, and it is the same bird in
 *    f8, in `x-marnie-bar` and in the press.
 *
 * 2. Kit is the only person who writes a clock in digits. `21:30`, `21:55`,
 *    `21:28` — Kit does sound and door and writes the running order in biro, and
 *    everyone else in the pack speaks their times (`nove e meia`, `cinco pras
 *    dez`, `vinte e cinco pras dez`). That split is why a float sheet in a drawer
 *    outranks a man with a camera, so it survives intact.
 *
 * 3. Names and places. People keep their names: Debbie Vaux, Kevin Boyce, Roz
 *    Antrim, Kit Nwachukwu, Priya, and the Hatch with them. Descriptive places
 *    translated, each a phrase the prose says:
 *
 *      you    → Você      club  → o Hatch        greenroom → o camarim
 *      marnie → Debbie    stage → o palco        box       → a cabine de som
 *      gil    → Dave      bar   → o bar          alley     → o beco
 *      roz    → Roz       card  → o cartão da câmera
 *      ferdy  → Kevin
 *      kit    → Kit
 *
 *    Comedy words are the ones a Brazilian circuit uses: `o set`, `os cinco
 *    minutos`, `apresentar` for compering, `a ordem do show` for the running
 *    order, `a folha de caixa` for the float sheet, `no fone` for in the cans.
 *
 * 4. Voice. Six people on three levels.
 *
 *      Debbie and the player type lowercase and never finish a sentence. The one
 *        exception is the player's `DEBBIE` in n2, which is a shout in both
 *        languages.
 *      Dave capitalises and never finishes either — he is always mid-explanation,
 *        and every message he sends is unprompted.
 *      Roz, Kevin and Kit write in full sentences and land the stop, and are
 *        separated by content: Roz runs the room and closes conversations, Kevin
 *        has thirty-one years and a Nokia, and Kit is the only one who deals in
 *        digits.
 *
 * 5. The vocative. Kevin says `Filho` once, in h8, and it is correct there: that
 *    thread has four people in it and he is answering Dave, so it lands on Dave.
 *    It is deliberately nowhere in `t-ferdy`, where the only two participants are
 *    Kevin and the player and the same word would tell the player they are a man.
 *    The test asserts both halves — present in h8, absent from the whole of Kevin's
 *    own thread.
 *
 * Reproduced from the English rather than corrected, and asserted against it: n6
 * says `o set do gil` twice, where `gil` is the id and the man is called Dave.
 * renameLeak.test.ts does not catch it because its pattern is `\bGil\b` and this
 * is lowercase with a possessive s. Flagged rather than fixed here, so the two
 * languages move together when the source does.
 *
 * No arc content. Pack 10 is standalone: no Keeper, no coda.
 */
export const openMicPtBr: CaseTranslation = {
  title: 'Open Mic',
  blurb:
    'O álibi dele está em vídeo. Mesma camisa, mesmos cinco minutos, mesma risada no mesmo lugar. É da terça anterior.',

  characters: {
    you: 'Você',
    marnie: 'Debbie',
    gil: 'Dave',
    roz: 'Roz',
    ferdy: 'Kevin',
    kit: 'Kit',
  },

  places: {
    club: 'o Hatch',
    stage: 'o palco',
    bar: 'o bar',
    greenroom: 'o camarim',
    box: 'a cabine de som',
    alley: 'o beco',
  },

  objects: {
    card: 'o cartão da câmera',
  },

  threads: {
    't-marnie': 'Debbie',
    't-club': 'Terças do Hatch',
    't-kit': 'Kit',
    't-ferdy': 'Kevin',
    't-roz': 'Roz Antrim',
  },

  briefing: {
    causeOfDeath: 'Traumatismo craniano contra o meio-fio. Ela caiu uma vez e não levantou.',
    ruling:
      'Registrado como queda. Ela tinha bebido, o beco é inclinado, e a sala inteira estava lá dentro assistindo a um homem fazer cinco minutos sobre trens.',
    opening:
      'O Hatch faz um open mic toda terça e filma para um canal que ninguém assiste, que é como onze comediantes por semana acabam com alguma coisa para mandar para um produtor.\n\nDebbie Vaux foi encontrada no beco atrás do clube onze e vinte. Ela tinha feito sete minutos cinco pras dez e saído para tomar ar.\n\nVocê faz um podcast sobre o circuito. Ela mandava áudios para você desde março.',
  },

  messages: {
    // --------------------------------------------------------------- t-marnie
    n1: 'saiu a abertura da turnê. oito semanas. não contei pra ninguém e eu vou passar mal',
    n2: 'DEBBIE',
    n3: 'eu sei. eu sei. tenho que contar pro dave hoje à noite e venho empurrando isso com a barriga há nove dias',
    n4: 'por que isso é difícil. ele é seu amigo',
    n5: 'porque a gente começou no mesmo mês. outubro de 2009, a mesma sala, a mesma lista de novatos. e eu vou fazer turnê e ele continua marcando a terça',
    n6: 'e ele faz os mesmos cinco. sinceramente os mesmos cinco. eu conseguiria fazer o set do gil. todo mundo naquela sala conseguiria fazer o set do gil',
    n7: 'isso não é culpa sua',
    n8: 'não mas vai ser a minha cara que ele vai ver quando pensar nisso. por anos. eu faço isso há tempo suficiente pra saber exatamente como funciona',
    n9: 'cheguei. subo cinco pras dez. vou contar depois, no beco, longe da sala, feito uma covarde',
    n10: 'até que foi bem na verdade. pronto. vou lá fora',

    // ----------------------------------------------------------------- t-club
    h1: 'A Debbie morreu no beco na terça à noite. A polícia veio na quarta, tomou depoimento de nove de nós, e está chamando de queda. O Hatch fica fechado esta semana.',
    h2: 'Eu apresento aquela sala há onze anos e nunca precisei dizer uma coisa dessas lá dentro. Eu botei ela no palco pela primeira vez em 2010 e ela morreu na minha frente por quatro minutos e voltou na semana seguinte, que é o trabalho inteiro.',
    h3: 'Eu estava no palco quando aconteceu. Eu estava literalmente no palco. O que eu sei que é uma forma horrível de dizer mas é onde eu estava e alguém vai perguntar então eu prefiro dizer agora',
    h4: 'E é filmado, obviamente. Eu já cortei e botei no drive. Vinte e dois minutos, sem corte, eu nove e meia fazendo a parte dos trens com a Debbie em pé no bar atrás de mim',
    h5: 'Ninguém te pediu clipe nenhum, Dave.',
    h6: 'Eu estou tentando ser útil',
    h7: 'E já que a gente está falando de onde cada um estava, o Kevin ficou lá fora uns bons vinte minutos no meio daquele show e eu acho que ninguém falou isso',
    h8: 'Filho, eu estava com o microfone na mão.',
    h9: 'Certo, chega disso. Qualquer outra coisa vem para mim e não para vinte e oito pessoas.',

    // ------------------------------------------------------------------ t-kit
    k1: 'Eu faço som e porta. Eu escrevo a ordem do show no verso da folha de caixa a caneta e eu tenho todas elas desde que comecei porque eu não jogo nada fora.',
    k2: 'Terça. Kevin apresentando. Depois Priya, Dave, Debbie, intervalo, mais quatro. A Debbie subiu 21:30. Não 21:55, não cinco pras dez. 21:30, e ela desceu dez pras dez.',
    k3: 'o dave diz que ela estava no bar nove e meia',
    k4: 'Ela estava no palco nove e meia. Eu tinha subido o microfone dela. Eu sei onde ela estava porque eu passei vinte minutos ouvindo ela respirar.',
    k5: 'E o Dave estava antes dela. Ele desceu 21:28 e não voltou para dentro até o intervalo.',
    k6: 'você tem certeza da ordem',
    k7: 'Está a caneta numa folha de caixa numa gaveta daquele prédio. Eu não tenho certeza de muita coisa mas tenho certeza disso.',
    k8: 'Fala com o Kevin. Ele ficou com o microfone o meio do show inteiro e ele enxerga aquela sala melhor do que a câmera, porque a câmera só aponta para um lado.',

    // ---------------------------------------------------------------- t-ferdy
    f1: 'Você vai ter que ter paciência comigo na digitação. Eu tenho um Nokia e tenho ele desde que a minha filha casou, e todo mundo acha isso engraçadíssimo até precisarem de alguém que ainda tenha telefone funcionando às duas da manhã.',
    f2: 'Trinta e um anos. Glasgow, Leeds, as duas salas de Birmingham, a quarta-feira de Bristol que não existe mais. Eu já apresentei na maioria das cidades que você souber citar e já fui pago na maioria delas.',
    f3: 'o dave disse que você estava lá fora',
    f4: 'Eu estava com um microfone na mão na frente de quarenta pessoas durante aquela parte inteira. Existe uma gravação de mim fazendo isso. É a mesma gravação que ele quer que você assista.',
    f5: 'E eu vou te contar o que eu vi, já que eu passei a noite inteira apontado para o lado contrário daquela câmera.',
    f6: 'O Dave saiu pela porta de emergência umas vinte e cinco pras dez e não voltou até o intervalo. Eu anunciei a Debbie e dava para ver que a porta ficou encostada atrás dela os sete minutos inteiros.',
    f7: 'Eu já assisti aquele clipe que ele botou no drive umas nove vezes. É um clipe adorável. Ele está muito bem nele.',
    f8: 'Ele faz os trens, depois a da mãe dele, depois faz o callback do cisne. Não tem cisne na terça. O cisne é da Priya e a Priya estava na terça, mas a parte do cisne é da terça anterior, porque ela cortou.',
    f9: 'Dezesseis anos eu vi aquele homem fazer os cinco minutos idênticos com a camisa idêntica e nunca uma vez me ocorreu que aquilo fosse útil para alguém.',

    // ------------------------------------------------------------------ t-roz
    r1: 'Eu toco aquela sala há catorze anos e nunca dei uma resposta direta a um policial sobre coisa nenhuma, e esta semana eu dei nove.',
    r2: 'Uma câmera, um cartão, uma noite. É esse o sistema inteiro e é esse o sistema desde 2016 porque eu não gasto dinheiro com isso.',
    r3: 'O Dave edita o canal. Ele pega o cartão no fim, corta ao longo da semana, bota os clipes no drive. É esse o combinado e nunca uma vez foi problema.',
    r4: 'Só que na terça eu tirei o cartão às nove e joguei a primeira metade no meu notebook na cabine, porque o pessoal da turnê queria o set da Debbie até a quarta e eu não ia ficar esperando o Dave.',
    r5: 'Eu botei de volta nove e vinte. Então seja lá o que ele entregou para quem for, e seja lá o que está naquele drive, existe uma cópia daquela noite no meu notebook que ele nunca viu.',
    r6: 'e a debbie',
    r7: 'Me contou da turnê na segunda e me pediu para não falar nada até ela contar para o Dave. Ela estava preocupada com ele. Preocupada de verdade, do jeito que a gente fica com quem a gente gosta.',
    r8: 'Eles começaram no mesmo mês. Quinze anos. Ela tinha uma turnê e ele tinha uma terça, e era ela que se sentia mal com isso, o que diz tudo sobre os dois.',
  },

  claims: {
    'c-marnie-stage': 'Debbie: no palco, 21:30–21:50 (ordem do show)',
    'c-gil-stage': 'Dave: no palco, 21:30–21:50',
    'c-marnie-bar': 'Debbie: no bar, 21:30–21:50 (segundo o clipe do Dave)',
    'c-ferdy-alley': 'Kevin: no beco, 21:30–21:50 (segundo Dave)',
    'c-ferdy-stage': 'Kevin: no palco apresentando, 21:25–21:55',
    'c-gil-alley': 'Dave: no beco, 21:35–21:45 (segundo Kevin)',
    'c-card-gil': 'Dave: estava com o cartão da câmera, 21:00–22:30',
    'c-card-roz': 'Roz: estava com o cartão da câmera, 21:00–21:20',
    'c-roz-box': 'Roz: na cabine de som, 21:00–21:20',
  },

  motives: {
    'm-tour':
      'Eles começaram no mesmo mês, em 2009. Ela tinha oito semanas abrindo uma turnê e vinha empurrando com a barriga havia nove dias, e levou ele para o beco para contar com jeito.',
  },

  contradictions: {
    'x-gil-alley':
      'Ele se colocou no palco, e disse isso primeiro, antes de alguém perguntar. Kevin Boyce estava com o microfone na mão e viu ele sair pela porta de emergência vinte e cinco pras dez, e dava para ver que ela ficou encostada atrás da Debbie os sete minutos inteiros em que ela esteve no palco.',
    'x-marnie-bar':
      'O clipe dele tem a Debbie em pé no bar atrás dele. Ela estava no palco naquele minuto com o microfone aberto, e Kit estava ouvindo ela respirar. O clipe é real e o Dave está mesmo nele. É da terça anterior, que é a única semana em que a Priya fez o cisne.',
    'x-card':
      'Uma câmera, um cartão, uma noite, desde 2016, porque a Roz não gasta dinheiro com isso. Ela tirou o cartão às nove para mandar o set da Debbie para o pessoal da turnê e ficou com ele no notebook até nove e vinte. Existe uma cópia daquela noite que ele nunca viu.',
    'x-ferdy-stage':
      'Ele colocou um apresentador de sessenta e um anos no beco por vinte minutos, num grupo, oito minutos depois de ouvir que ninguém tinha perguntado nada a ele. Kevin estava com o microfone na frente de quarenta pessoas, na mesma gravação que o Dave queria que todo mundo assistisse.',
  },

  confrontation: {
    opening:
      'Você faz um podcast. É isso que você faz. Você conversa com gente melhor do que eu sobre como eles ficaram melhores do que eu. Pode falar então, isso vai ser ótimo.',
    beats: {
      'o-alley': {
        press:
          'Você estava no palco, você disse, antes de alguém perguntar. O Kevin estava com o microfone e viu você sair pela porta de emergência vinte e cinco pras dez.',
        rebuttal:
          'O Kevin tem sessenta e um anos e faz isso desde antes de eu nascer e apresentou onze comediantes naquela noite. Ele não saberia te dizer de que cor são as paredes.',
      },
      'o-bar': {
        press:
          'O seu clipe tem a Debbie no bar atrás de você. Ela estava no palco com o microfone aberto e o Kit estava com ela no fone. E você faz o callback do cisne da Priya, e a Priya cortou o cisne.',
        rebuttal:
          'Então eu confundi uma ordem do show. Eu já fiz quatrocentas dessas salas. É tudo a mesma sala.',
      },
      // o-card and o-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence.
      'o-card': {
        press:
          'Uma câmera, um cartão. A Roz tirou às nove para mandar o set da Debbie para o pessoal da turnê, e ficou no notebook dela até nove e vinte. Existe uma cópia daquela noite que você nunca viu.',
      },
      'o-why': {
        press:
          'Ela tinha oito semanas de abertura e estava sentada em cima disso havia nove dias porque não conseguia achar um jeito de te contar. Ela te levou para o beco para contar com jeito.',
      },
    },
    deflections: [
      'Aquilo é uma sala cheia de gente que me viu morrer no palco por dezesseis anos. Claro que eles têm uma versão.',
      'Você nunca subiu num palco na vida.',
      'Me traz uma coisa que não seja alguém lembrando de uma terça.',
    ],
    confession:
      'Ela falou de um jeito muito gentil. É isso que eu não consigo fazer ninguém entender. Ela tinha achado um jeito de dizer que não caísse em cima de mim como nada, e vinha trabalhando nisso havia nove dias, que é mais tempo do que ela passava na maior parte do material dela.\n\nE eu disse parabéns e eu quis dizer aquilo por uns quatro segundos.\n\nAí ela disse a coisa que ela achava que era a parte gentil. Ela disse Dave, você tinha que ir fazer umas menores comigo, eu te coloco no show.\n\nEu te coloco no show.\n\nA gente começou no mesmo mês. A mesma lista, na mesma sala, em outubro de 2009, e ela ia me colocar no show.\n\nEu estiquei a mão. Foi só isso. Tem um meio-fio e ele é inclinado e ela caiu uma vez.\n\nE aí eu tinha vinte minutos e uma câmera que eu corto toda semana há seis anos, e eu sentei naquele camarim e sabia exatamente o que fazer, porque eu tenho os mesmos cinco minutos em onze terças diferentes e eles são idênticos. Mesma camisa. Mesma ordem. Mesma risada no mesmo lugar.\n\nDezesseis anos sem nunca mudar nada, e a única vez em que aquilo me serviu para alguma coisa foi para fazer isso.',
  },

  epilogue:
    'O notebook de Roz Antrim tinha a primeira metade da noite de verdade, sem corte, numa pasta chamada DEBBIE PRO PESSOAL DA TURNE. Vinte e dois minutos, um ângulo, e uma porta de emergência encostada no canto do quadro a partir das 21:35.\n\nAs folhas de caixa de Kit Nwachukwu entraram como prova, quarenta e uma delas, a caneta, numa gaveta.\n\nKevin Boyce apresentou o show beneficente no Hatch em fevereiro e fez dezenove minutos e não mencionou nada daquilo uma vez sequer, e depois fez mais quatro beneficentes em quatro cidades porque as pessoas não paravam de pedir.\n\nAs oito semanas foram para outra pessoa. A produtora da turnê mandou uma mensagem para a Roz pedindo que avisasse que eles tinham assistido ao set onze vezes antes de contratar a Debbie e que teriam contratado por dois minutos dele.',
};
