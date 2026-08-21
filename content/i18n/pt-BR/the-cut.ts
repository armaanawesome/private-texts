import type { CaseTranslation } from '../caseText';

/**
 * Case 9 — "O Canal". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The forty minutes on a bicycle. The whole case is a community that thinks in
 *    miles and locks never asking whether he took the boat, so the arithmetic that
 *    breaks it has to read identically in all three places it appears: Sam says it
 *    (b8), the proof states it (x-nate-bike), and the press line throws it at him
 *    (c-bike). `seis milhas de caminho de sirga plano` and `quarenta minutos` are
 *    the same words in all three; only the verb moves, because two identical
 *    strings would trip the duplicate-prose rule — which is exactly why the
 *    English says `bike` in one and `bicycle` in the other.
 *
 * 2. Sam has no gender, on purpose, and Portuguese fights this harder than any
 *    other language here. The English never assigns one: it repeats the name where
 *    a pronoun would go (`Sam does not miss anything ... you do not moor next to
 *    Sam`) and uses `them` once, in Nate's rebuttal. Portuguese wants an article
 *    before a first name — `o Sam` / `a Sam` — and either one picks a side. So Sam
 *    takes no article anywhere in this pack, and Nate's rebuttal is rebuilt from
 *    `thinks that makes them from here` into `acha que isso já é ser daqui`, which
 *    drops the pronoun instead of choosing one. No adjective agrees with Sam
 *    anywhere. The test sweeps for both.
 *
 * 3. Canal words, in the Portuguese the waterway actually uses: `o caminho de
 *    sirga` for the towpath, `as eclusas` for the locks, `o cais` for the wharf,
 *    `atracado` for moored, `o convés de popa` for the stern deck, `a borda` for
 *    the gunwale, `operando as eclusas` for lock-wheeling. Distances stay imperial
 *    — `seis milhas`, `meia milha` — because converting changes a fact.
 *
 * 4. Names and places. People keep their names: Julie Cusk, Nate and Effie
 *    Ogilvy, Sam Ferreira, Alan Pryce, Tam Oyelaran, and Norbury, Tyrley, the
 *    Junction and the Royal Shrewsbury with them. Descriptive places translated:
 *
 *      you    → Você     cut          → o canal        towpath  → o caminho de sirga
 *      verity → Julie    norbury      → Norbury        tyrley   → Tyrley
 *      nate   → Nate     norburywharf → o cais de Norbury
 *      bo     → Sam      veritysboat  → o barco da Julie
 *      gwyn   → Alan     pub          → o Junction
 *      tam    → Tam      tyrleylocks  → as eclusas de Tyrley
 *                        hospital     → o Royal Shrewsbury
 *
 * 5. Voice. Six people, and the axis here is not casing alone — it is where each
 *    of them is standing when they type.
 *
 *      Tam is the interesting one: lowercase and unfinished in the group thread
 *        (k2, k8), capitalised and complete in his own (m1–m7). Guarded in public,
 *        careful in private, and the pack states it without comment.
 *      Nate capitalises and then trails off, three messages out of four. The one
 *        he finishes is the alibi he came to deliver.
 *      Julie, Sam and Alan write in full sentences and land the full stop.
 *      The player is lowercase and never finishes.
 *
 * The arc. `o Keeper` stays in English, once, in the confession — clue 4, where he
 * rings back afterwards to ask how it went. The coda is him and does not name him.
 *
 * Gender. The player is unmarked: every line addressed to them runs on verbs —
 * `Você largou o seu barco`, `Você não tem o direito de voltar`.
 */
export const theCutPtBr: CaseTranslation = {
  title: 'O Canal',
  blurb:
    'Um barco de canal faz três milhas por hora, e todo mundo no canal sabe fazer essa conta. Ninguém pensou em perguntar se ele foi de barco.',

  characters: {
    you: 'Você',
    verity: 'Julie',
    nate: 'Nate',
    bo: 'Sam',
    gwyn: 'Alan',
    tam: 'Tam',
  },

  places: {
    cut: 'o canal',
    norbury: 'Norbury',
    norburywharf: 'o cais de Norbury',
    veritysboat: 'o barco da Julie',
    pub: 'o Junction',
    tyrley: 'Tyrley',
    tyrleylocks: 'as eclusas de Tyrley',
    towpath: 'o caminho de sirga',
    hospital: 'o Royal Shrewsbury',
  },

  threads: {
    't-verity': 'Julie',
    't-cut': 'Atracadouro de Norbury',
    't-tam': 'Tam',
    't-bo': 'Sam',
    't-gwyn': 'Alan Pryce',
  },

  briefing: {
    causeOfDeath:
      'Afogamento. Ela caiu do próprio convés de popa e o canal tem um metro e vinte ali.',
    ruling:
      'Registrado como acidental. Ela tinha sessenta e quatro anos, estava escuro, e havia uma garrafa de vinho na mesa.',
    opening:
      'Julie Cusk morava em barco havia dezenove anos e conhecia todo mundo que morava no canal entre Autherley e Nantwich pelo barco antes de conhecer pelo nome.\n\nEla foi encontrada na água ao lado da própria popa numa sexta à noite de outubro, com o fogão ainda aceso e dois copos na mesa.\n\nVocê largou o seu barco e foi morar em terra firme quatro anos atrás e ela te mandava mensagem toda semana sobre isso mesmo assim.',
  },

  messages: {
    // --------------------------------------------------------------- t-verity
    v1: 'Aconteceu uma coisa e eu estou sentada em cima disso há quatro dias porque não sabia para quem contar primeiro.',
    v2: 'A Effie Ogilvy me escreveu. A filha do Nate. Ela tem vinte e quatro anos e é enfermeira pediátrica em Chester e me achou pelo grupo do Facebook.',
    v3: 'nossa',
    v4: 'Ela me agradeceu. Quatro páginas de agradecimento. Disse que o dia em que eu liguei para o conselho tutelar foi o dia em que a vida dela começou e que ela vem tentando dizer isso desde os dezoito anos.',
    v5: 'você chorou né',
    v6: 'Eu sentei na borda do barco na chuva feito uma boba. Quinze anos sendo a mulher que fez aquilo com o Nate Ogilvy e acontece que eu era a mulher que fez aquilo pela Effie Ogilvy, e as duas coisas foram verdade esse tempo todo.',
    v7: 'Ela vem no sábado. Para Norbury, para o atracadouro, na frente de todo mundo. Ela quer dizer isso onde as pessoas que assistiram àquilo possam ouvir.',
    v8: 'o nate sabe',
    v9: 'Eu contei a ele pessoalmente na terça. Não ia deixar ele ouvir isso de Sam no ponto de água. Eu devia isso a ele e nunca devi mais nada.',
    v10: 'Ele ficou muito quieto. Disse certo. Duas vezes. E depois me perguntou que horas de sábado.',
    v11: 'Fogão aceso, garrafa aberta, e eu não saio deste barco até sábado. Sobe aqui se você tiver coragem de encarar a estrada.',

    // ------------------------------------------------------------------ t-cut
    k1: 'Para quem ainda não ouviu de alguém. A Julie caiu da própria popa na sexta à noite e Sam encontrou ela onze horas. A polícia veio no sábado de manhã e está chamando de acidente.',
    k2: 'dezenove anos neste canal. ela tirou o meu barco do lodo na ponte 39 no escuro em fevereiro e não quis aceitar nem uma bebida por isso',
    k3: 'Eu estava em Tyrley a semana inteira e estava em Tyrley a sexta inteira à noite. Seis milhas e cinco eclusas de distância. Quarenta barcos viram o meu parado no atracadouro de visitantes acima da eclusa de cima desde quarta.',
    k4: 'Nunca saí do lugar. Nem um centímetro, de quarta a domingo. Qualquer um que conhece este canal sabe fazer essa conta',
    k5: 'Ninguém te perguntou nada, Nate.',
    k6: 'Vão perguntar. Quinze anos deste canal decidindo o que eu sou. Eu vou na frente disso',
    k7: 'E o Tam estava lá em cima em Norbury na sexta e teve uma discussão com ela em junho sobre a regra dos catorze dias que metade do atracadouro ouviu',
    k8: 'eu estava no pronto-socorro em shrewsbury com a minha mãe das oito até as duas da manhã e eu tenho a alta por escrito e não vou botar isso num grupo',
    k9: 'Fala com Sam. Sam ficou no caminho de sirga a noite inteira passeando com o cachorro e Sam não deixa passar nada, o que o resto de vocês sabe porque é por isso que vocês não atracam do lado de Sam.',

    // ------------------------------------------------------------------ t-tam
    m1: 'Eu discuti com ela em junho e penso nisso todo dia desde sexta. Era sobre a regra dos catorze dias e durou quatro minutos e ela tinha razão.',
    m2: 'A minha mãe caiu na sexta na hora do lanche. Ambulância sete e meia, pronto-socorro oito horas, alta duas e vinte. Eu fiquei numa cadeira de plástico por seis horas com o celular em quatro por cento.',
    m3: 'o nate colocou você em norbury',
    m4: 'Colocou. Na frente do canal inteiro, quarenta minutos depois de o Alan dizer a ele que ninguém tinha perguntado nada.',
    m5: 'E eu vou dizer a coisa que eu fico não dizendo. Todo mundo sabe que o Nate odiava ela. É o fato mais conhecido deste canal. Então quando aconteceu, todo mundo pensou nisso e aí todo mundo fez as contas e guardou de volta.',
    m6: 'Seis milhas. Cinco eclusas. Três horas para subir e três para voltar e quarenta barcos olhando o teto dele o tempo todo. Não existe versão disso. Eu já fiz essa conta de cabeça umas vinte vezes.',
    m7: 'Vai falar com Sam. Sam anda naquele caminho de sirga no mesmo horário toda noite há três anos, e Sam repara no que mudou de lugar.',

    // ------------------------------------------------------------------- t-bo
    b1: 'Fui eu que encontrei ela. Vou dizer isso uma vez e depois prefiro responder perguntas a contar a história.',
    b2: 'Eu passeio com o Moss das oito até umas nove e quarenta toda noite. De Norbury até a ponte 39 e volta. Três anos, sempre o mesmo trajeto, porque ele tem treze anos e tem a rota dele.',
    b3: 'você viu alguém',
    b4: 'Nate Ogilvy. Oito e meia, no caminho do outro lado passando pelo cais, de jaqueta laranja. Eu falei e aí Nate e ele não respondeu e eu não achei nada demais porque ele nunca responde.',
    b5: 'o barco dele estava em tyrley',
    b6: 'Estava. Eu já falei isso para três pessoas e cada uma delas me explicou as eclusas como se eu não morasse nesta água há seis anos.',
    b7: 'Ele estava de bicicleta. A Dawes de guidão de corrida que está amarrada no teto dele desde que eu cheguei aqui. Isso não é uma coisa que eu estou chutando, eu saí do caminho para ele passar.',
    b8: 'Seis milhas de caminho de sirga plano dão quarenta minutos de bicicleta. Todo mundo ficou dizendo o barco, o barco, o barco, e o barco não foi a lugar nenhum e a pergunta também não.',
    b9: 'Pergunta ao Alan sobre a chave. A estação sanitária usa chave do CRT e as mais novas registram. O Alan está em cima do CRT atrás desses dados há um ano por causa do vandalismo.',

    // ----------------------------------------------------------------- t-gwyn
    g1: 'Onze anos operando as eclusas em Tyrley e eu nunca quis a papelada até esta semana.',
    g2: 'O barco dele não se mexeu. Isso é verdade e eu digo isso num tribunal. Eu passei quarenta e um barcos pelas eclusas naquela semana e o dele não era um deles e eu reconheceria o teto dele a meia milha.',
    g3: 'E é exatamente isso que esteve errado em tudo. Cada um de nós respondeu uma pergunta sobre o barco. Ninguém fez uma pergunta sobre o homem.',
    g4: 'o registro da chave',
    g5: 'O descarte químico e o ponto de água do cais de Norbury passaram para as fechaduras com registro na primavera, porque a gente teve um ano de alguém deixando as torneiras abertas. Eu venho pedindo esses dados ao CRT desde março por causa das torneiras.',
    g6: 'Mandaram na terça. A chave de Nate Ogilvy abriu o portão do cais às 20:44 na sexta. A chave dele. Registrada na licença dele, num barco que estava a seis milhas de distância e não saía do lugar desde quarta.',
    g7: 'A Julie ficou no Junction das seis até as sete comigo e com Sam e ela tomou um copo só e estava mais feliz do que eu vi essa mulher em quinze anos.',
    g8: 'Ela contou da carta para a saleta inteira. Leu alguns trechos em voz alta. A Effie vinha no sábado às duas e a Julie tinha comprado um bolo na loja da fazenda e deixado em cima do balcão.',
    g9: 'O bolo ainda estava lá quando tiraram ela da água. Eu não consegui superar isso e eu tenho sessenta e três anos e já superei coisa pior.',
  },

  claims: {
    'c-verity-boat': 'Julie: no barco dela, 20:00–21:30',
    'c-nate-tyrley': 'Nate: em Tyrley, 19:00–22:00',
    'c-nate-moored': 'Nate: atracado em Tyrley a noite toda',
    'c-tam-norbury': 'Tam: em Norbury, 20:30–21:00 (segundo Nate)',
    'c-tam-hospital': 'Tam: no Royal Shrewsbury, 20:00–22:00',
    'c-bo-towpath': 'Sam: no caminho de sirga, 20:00–21:40',
    'c-nate-norbury': 'Nate: em Norbury, 20:30–20:50 (segundo Sam)',
    'c-nate-bike': 'Nate: no caminho de sirga de bicicleta, 20:20–21:00 (segundo Sam)',
    'c-gwyn-locks': 'Alan: nas eclusas de Tyrley, 19:00–20:30',
    'c-nate-wharf': 'Nate: no cais de Norbury, 20:44–20:50 (registro da chave)',
    'c-verity-pub': 'Julie: no Junction, 18:00–19:00 (segundo Alan)',
  },

  motives: {
    'm-effie':
      'Julie denunciou ele ao conselho tutelar em 2009 e a filha dele foi morar com a tia. Effie tem vinte e quatro anos agora, é enfermeira em Chester, e vinha a Norbury no sábado para agradecer à Julie em voz alta na frente do atracadouro que assistiu àquilo acontecer.',
  },

  contradictions: {
    'x-nate-norbury':
      'Ele se colocou a seis milhas e cinco eclusas de distância a noite inteira, e quarenta barcos confirmam onde estava o teto dele. Oito e meia Sam Ferreira falou e aí Nate para ele no caminho do outro lado em Norbury, de jaqueta laranja, e não recebeu resposta, e não achou nada demais porque ele nunca responde.',
    'x-nate-bike':
      'Seis milhas de caminho de sirga plano são quarenta minutos de bicicleta. Todo mundo naquele canal respondeu uma pergunta sobre o barco, e o barco não é a coisa que desceu o caminho de sirga. A Dawes de guidão de corrida está amarrada no teto dele desde 2011.',
    'x-nate-wharf':
      'O portão do cais de Norbury passou para uma fechadura com registro na primavera, porque alguém tinha passado um ano deixando as torneiras abertas. A chave dele abriu o portão às 20:44, registrada na licença dele, num barco que não saía do lugar desde quarta.',
    'x-tam-hospital':
      'Ele colocou Tam Oyelaran em Norbury quarenta minutos depois de ouvir que ninguém tinha perguntado nada a ele. Tam estava numa cadeira de plástico no Royal Shrewsbury das oito até as duas e vinte com a mãe dele e um celular em quatro por cento.',
  },

  confrontation: {
    opening:
      'Quinze anos este canal olhando para mim daquele jeito e eu atracando onde mandaram e pagando a minha licença e não dizendo nada. Fala então. Fala direito.',
    beats: {
      'c-norbury': {
        press:
          'Você estava em Tyrley a noite inteira. Sam falou e aí Nate para você no caminho do outro lado em Norbury oito e meia e você não respondeu.',
        rebuttal:
          'Sam está aqui há seis anos e acha que isso já é ser daqui. Estava escuro e só existe uma jaqueta laranja neste canal, né.',
      },
      'c-bike': {
        press:
          'O seu barco nunca saiu do lugar e isso é verdade. Você desceu seis milhas de caminho de sirga plano na Dawes que estava no seu teto. Quarenta minutos.',
        rebuttal:
          'Então agora eu estou de bicicleta. No escuro. Seis milhas. Você já decidiu a resposta e está indo de trás para frente a partir dela.',
      },
      // c-wharf and c-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence.
      'c-wharf': {
        press:
          'O portão do cais registra agora. Registra desde a primavera, por causa das torneiras. A sua chave abriu ele às 20:44, e o seu barco estava a seis milhas canal acima.',
      },
      'c-why': {
        press:
          'A Effie vinha no sábado às duas. Para agradecer à Julie, em voz alta, naquele atracadouro, na frente de todo mundo que assistiu àquilo acontecer.',
      },
    },
    deflections: [
      'Isso é este canal falando. Ele fala de mim desde 2009.',
      'Você largou o seu barco. Você não tem o direito de voltar e me dizer o que aconteceu nele.',
      'Me traz uma coisa com o meu nome nela.',
    ],
    confession:
      'Eu aguentaria quinze anos deles me achando um pai ruim. Eu tinha ficado bom nisso. Você levanta e faz as suas eclusas e cumprimenta gente que não te cumprimenta de volta e depois de um tempo aquilo é só o tempo lá fora.\n\nO que eu não conseguia aguentar era o sábado.\n\nA minha filha, vinte e quatro anos, enfermeira, de pé naquele atracadouro na frente do Alan e de Sam e de todos eles, dizendo em voz alta que a melhor coisa que já aconteceu com ela foi ser tirada de mim. E cada um deles concordando com a cabeça. E eu num barco a seis milhas dali com as cortinas fechadas, e todo mundo sabendo exatamente onde eu estava e por quê.\n\nEla estava no convés de popa quando eu dei a volta por trás. Ficou contente de me ver. É essa a parte. Ela disse Nate, entra, e tinha dois copos na mesa porque ela estava esperando alguém a noite inteira e não era eu.\n\nE tem mais uma coisa.\n\nUm homem que se dizia o Keeper me ligou na quarta. Disse que era do serviço da vara de família, fazendo uma revisão de registros. Ele sabia de 2009. Sabia que a Effie era enfermeira em Chester e sabia do sábado, que eu não tinha contado para ninguém, porque para quem eu ia contar.\n\nEle me perguntou como eu me sentia sobre aquilo e eu falei por muito tempo e ele não disse quase nada.\n\nE no domingo ele ligou de novo. Só para perguntar como tinha sido.\n\nFoi isso que ele disse. Como foi, Nate. Feito um homem perguntando como foi uma entrevista.',
  },

  coda: {
    from: 'Número desconhecido',
    messages: [
      'Norbury. Você fez isso em cinco dias e um deles foi gasto no homem errado, o que eu acho justo.',
      'A bicicleta foi boa. Todo mundo naquele canal pensa em milhas e eclusas e isso nunca falhou com eles antes, então nunca ocorreu a nenhum deles parar.',
      'Você já tem quatro destes, se estiver contando. Eu estou.',
      'E sim. Eu liguei para ele depois. Eu sempre ligo. Você devia se perguntar por que isso vale o risco para mim, porque é a única coisa descuidada que eu faço.',
    ],
  },

  epilogue:
    'O Canal and River Trust entregou onze meses de dados de chave numa única planilha e pediu desculpas pela demora.\n\nEffie Ogilvy foi a Norbury no sábado porque ninguém tinha o telefone dela para avisar. Alan Pryce encontrou ela no alto da ruela e contou a ela no estacionamento, e depois sentou com ela no Junction por quatro horas.\n\nEla leu a carta em voz alta no funeral. As quatro páginas. Disse depois que tinha escrito aquilo para ser lido para a Julie e não conseguia pensar num motivo para mudar uma palavra agora.\n\nSam Ferreira continua passeando com o Moss das oito até vinte pras dez. O trajeto passa pelo antigo atracadouro da Julie, e Sam não mudou o trajeto, porque o Moss tem treze anos e tem a rota dele.',
};
