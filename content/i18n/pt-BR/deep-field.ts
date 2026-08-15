import type { CaseTranslation } from '../caseText';

/**
 * Case 4 — "Campo Profundo". Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. Which clock. The whole case is one alibi measured in the wrong one, so the
 *    three clocks have three names that never blur: `hora da estação` (UTC+3, what
 *    the people live in), `UTC` (what the instruments write in), and the watch each
 *    of them still has running from home. p3 is the line the case turns on and it
 *    has to carry both readings in one sentence — the log says `21:45`, which is
 *    `quinze pra uma da manhã` in station time. If those two stop being the same
 *    sentence the player has no way to see that the log is not an alibi.
 *
 *    `c-mal-log` exists to be REJECTED. A player pins it against Theo expecting it
 *    to fire and the engine answers that the two describe different times. The
 *    rejection is the clue, so the chip says `00:45–01:30` and Maria says `quinze
 *    pra uma` in the message beside it, and both must stay.
 *
 * 2. Times. Everything else is spoken, in Brazilian form: `quinze pras dez` for
 *    quarter to ten, `dez pras dez` for ten to ten, `dez e quinze` for quarter past
 *    ten. Those first two are fifteen and five minutes apart and belong to
 *    different men, so they were the easiest pair in the pack to smudge.
 *
 *    The digits that stay digits are the machine ones: `02:10` in Maria’s report,
 *    `21:45` in the log, `22:35` and `22:44` on the card reader, `2007` and `2011`
 *    on Mal, and the duration stamps on Erik’s voice notes.
 *
 * 3. Names. People and places with names keep them: Laura, Mal, Erik, Maria, Theo,
 *    Rothera Ridge, the Shackleton, Cambridge, Boulder, Dunfermline. Descriptive
 *    places are translated:
 *
 *      you   → Você      station   → a estação        outside   → lá fora
 *      orla  → Laura     block     → o bloco de alojamento
 *      mal   → Mal       mess      → o refeitório
 *      rune  → Erik      surgery   → o consultório
 *      pilar → Maria     coldporch → a antecâmara
 *      theo  → Theo      telescope → a plataforma de instrumentos
 *                        metmast   → a torre meteorológica
 *
 *    `a antecâmara` is the vestibule between the outer door and the building,
 *    which is where Laura dies and what the camera watches, and it is the word
 *    Brazilian Antarctic stations use. Units stay as the English has them: metres
 *    where it is metric, `onze mil milhas` where it is not, because converting
 *    changes a fact rather than translating it.
 *
 * 4. Voice. Five people and four registers. Laura writes lowercase and runs her
 *    clauses together, a doctor thinking out loud at midnight. Theo is lowercase
 *    and blunt and capitalises the names. Maria writes for the record and says so.
 *    Mal writes just as correctly as Maria, which is the point — the difference
 *    between them is not the grammar, it is that every one of his messages moves
 *    the question onto somebody else. Erik answers in voice notes, transcribed,
 *    so his messages open with `[áudio, 0:41]` and are the most carefully composed
 *    sentences in the case. He does not read well; the prose never says so except
 *    where he says it himself.
 *
 * 5. Gender. The player is unmarked, per content/cases/playerNeutral.test.ts. Two
 *    lines forced a rephrase, and both are asserted in the test:
 *
 *    - briefing.opening, `You are her desk officer in Cambridge`. Any Portuguese
 *      noun for the job takes an article that agrees, so it is built on `a pessoa
 *      que responde pelo caso dela`, where the agreement lands on `pessoa`.
 *    - deflections[2], `you are very sure`. `seguro`/`segura` both agree, so it
 *      becomes `tem muita certeza`, which inflects for nothing.
 *
 * No arc content. Pack 4 is standalone — no Keeper, no coda — and the test
 * asserts the silence holds.
 */
export const deepFieldPtBr: CaseTranslation = {
  title: 'Campo Profundo',
  blurb:
    'Seis pessoas, quatro meses de escuridão, e ninguém pode ir embora. O álibi é um horário registrado, e o horário está no relógio errado.',

  characters: {
    you: 'Você',
    orla: 'Laura',
    mal: 'Mal',
    rune: 'Erik',
    pilar: 'Maria',
    theo: 'Theo',
  },

  places: {
    station: 'a estação',
    block: 'o bloco de alojamento',
    mess: 'o refeitório',
    surgery: 'o consultório',
    coldporch: 'a antecâmara',
    outside: 'lá fora',
    telescope: 'a plataforma de instrumentos',
    metmast: 'a torre meteorológica',
  },

  threads: {
    't-orla': 'Laura',
    't-station': 'Rothera Ridge',
    't-theo': 'Theo',
    't-rune': 'Erik',
    't-pilar': 'Maria Otxoa',
    't-porch': 'Câmera da antecâmara',
  },

  briefing: {
    causeOfDeath: 'Hipotermia. Ela saiu da antecâmara sem a roupa externa.',
    ruling:
      'Registrado como fatalidade. Ninguém consegue chegar à estação até outubro e ninguém pediu para chegar.',
    opening:
      'Rothera Ridge mantém três relógios. A hora da estação para as pessoas, UTC para os instrumentos, e o que cada um deixou correndo no próprio pulso desde casa.\n\nOrla Byrne era a médica. Foi encontrada na antecâmara às duas da manhã com a roupa externa ainda no gancho, e os seis concordaram entre si que ela tinha saído para olhar o céu e se enganou. A próxima aeronave é em outubro.\n\nVocê é a pessoa que responde pelo caso dela em Cambridge e a última para quem ela escreveu.',
  },

  messages: {
    // ----------------------------------------------------------------- t-orla
    o1: 'dia sessenta e um sem sol. o Theo começou a dar nome às batatas. estou te contando isso para que Cambridge tenha registrado',
    o2: 'anotado. como vão os exames anuais',
    o3: 'é justamente por isso que eu ainda estou acordada. tenho um resultado de exame que eu não queria ter',
    o4: 'fibrilação atrial, e não uma limítrofe. num homem de sessenta e um anos, com dezenove temporadas nas costas, que nunca saiu deste continente quando teve escolha',
    o5: 'protocolo é protocolo. isso é primeiro voo de volta',
    o6: 'eu sei o que é. escrevi o texto duas vezes e apaguei duas vezes e vou protocolar de manhã porque não existe uma versão disso em que eu não protocole',
    o7: 'ele não vai ter outra temporada. ele não vai ter outra coisa nenhuma. ele veio em 2007 e voltou todo ano e eu vi esse homem descer daquele avião em outubro que nem quem está voltando para casa',
    o8: 'você já contou pra ele',
    o9: 'hoje à noite. eu não vou protocolar uma coisa sobre um homem sem falar na cara dele primeiro, o trabalho é esse',
    o10: 'contei. ele foi muito calmo e muito educado e me agradeceu, e isso foi pior do que se tivesse gritado',
    o11: 'vou sair dez minutos. está quarenta e um negativos e não tem nada acima da gente além de tudo. a gente fala amanhã bj',

    // -------------------------------------------------------------- t-station
    w1: 'Cambridge. Laura Byrne morreu ontem à noite. Encontrada na antecâmara às 02:10 na hora da estação, pelo Erik. Reanimação tentada por quarenta minutos. Estou registrando como fatalidade e mando o relatório completo na comunicação da manhã.',
    w2: 'Antes que alguém me pergunte: sim, eu sei o que seis pessoas e quatro meses de escuro fazem com um relatório desses. Escrevi ele reto assim mesmo.',
    w3: 'ela saiu sem a roupa externa. ela já me deu bronca por exatamente isso. duas vezes. ela escreveu isso no quadro da antecâmara',
    w4: 'Eu estava na plataforma das quinze pras dez até as onze, rodando o desligamento. Não vi nada e não ouvi nada e sinto muito por isso, porque eu estava a duzentos metros.',
    w5: 'O registro da plataforma vai me mostrar. Ele registra um operador toda vez que a cúpula se move e a cúpula se moveu a noite inteira.',
    w6: 'mal eu vi você no bloco às dez e dez. você passou pelo corredor e não falou nada comigo',
    w7: 'Você viu alguém de parca vermelha num corredor no escuro. Existem quatro parcas vermelhas nesta estação e uma delas é a sua.',
    w8: 'E já que estamos fazendo isso, o Erik ficou lá fora na torre metade da noite e ninguém fez uma única pergunta a ele, e eu gostaria de saber por quê.',
    w9: 'Chega. Ninguém desta estação acusa ninguém desta estação num link de rádio com Cambridge escutando. Tragam isso para mim.',

    // ----------------------------------------------------------------- t-theo
    h1: 'cozinhei pra ela durante seis meses e já fiz quatrocentas refeições naquela cozinha e hoje eu não consigo fazer uma',
    h2: 'eu fiquei no refeitório das nove até as onze fazendo o pão de amanhã. dá pra ver o corredor inteiro pela janela do refeitório, é só por isso que eu sei de alguma coisa',
    h3: 'quando você viu a laura pela última vez',
    h4: 'dez e quinze, passando pela antecâmara. ela estava de bota de dentro. eu revi isso umas cem vezes porque eu vi a bota de dentro e não falei nada',
    h5: 'e era o Mal naquele corredor. eu sei como são as parcas. eu sei como ele anda. dezenove temporadas de um homem é um formato que a gente aprende',
    h6: 'ele diz que o erik estava lá fora',
    h7: 'o Erik ficou no rádio com o Shackleton o tempo todo. eu fiquei do lado dele dez minutos disso e o navio registra do lado deles. isso não é uma coisa sobre a qual dá pra ser vago',
    h8: 'fala com o Erik. ele não vai digitar pra você, ele manda os áudios. não tira conclusão disso, todo mundo aqui sabe por quê e ninguém aqui comenta',

    // ----------------------------------------------------------------- t-rune
    n1: '[áudio, 0:41] Fui eu que encontrei ela. Duas e dez. Eu tinha ido até a antecâmara porque a porta não encaixa direito neste frio e eu confiro por último. Não vou descrever como ela estava.',
    n2: '[áudio, 0:19] Eu faço assim porque não leio bem e nunca me dei com a digitação. A Maria sabe há nove anos. Não é segredo, é só cansativo.',
    n3: 'o mal diz que você estava na torre',
    n4: '[áudio, 1:02] Eu estava no rádio com o Shackleton das dez pras dez até dez e meia. Quarenta minutos sobre uma transferência de combustível que só vai acontecer em dezembro. A sala de rádio deles registra cada chamada do lado de lá e Cambridge pode perguntar hoje mesmo, então por favor pergunte, eu prefiro que pergunte.',
    n5: '[áudio, 0:33] Ele falou da torre porque a torre é o único lugar desta estação que ninguém enxerga. Ele não é burro. É isso que tem nele, ele nunca foi burro uma vez sequer.',
    n6: '[áudio, 0:28] Pergunta para a Maria sobre o registro da plataforma. Pergunta em que relógio ele escreve. Eu já falei isso com ela duas vezes e ela ficou quieta comigo duas vezes, e eu sou mecânico, então o que é que eu ia saber.',

    // ---------------------------------------------------------------- t-pilar
    p1: 'Eu tenho seis pessoas e cento e onze dias. Seja lá o que eu te disser agora, eu ainda vou ter que dar café da manhã para todos eles juntos amanhã. Quero isso registrado antes do resto.',
    p2: 'O Erik está certo sobre o registro e eu demorei porque eu não queria que ele estivesse. O registro da plataforma escreve em UTC. Ele escreve em UTC desde que o instrumento foi instalado, porque o instrumento pertence a um consórcio em Boulder e Boulder não está preocupado com que horas são aqui.',
    p3: 'A hora da estação é UTC mais três. Então o registro que coloca ele na cúpula a partir das 21:45 coloca ele lá a partir de quinze pra uma da manhã, hora da estação. Três horas depois de o Theo ver ela passar por aquela antecâmara.',
    p4: 'O registro não é o álibi dele. O registro é a prova de onde ele foi depois.',
    p5: 'o consultório',
    p6: 'Acesso por cartão. O cartão dele abriu o consultório às 22:35 e de novo às 22:44. A Laura já estava naquela antecâmara a essa altura. Ele não tinha razão clínica nenhuma para estar naquela sala em hora nenhuma e nunca teve uma em dezenove temporadas.',
    p7: 'O arquivo do exame dela não está no sistema. A cópia em papel não está na gaveta. Eu procurei duas vezes e pedi para o Theo procurar uma vez, para não ser só eu dizendo isso.',
    p8: 'Ela me contou na terça o que tinha encontrado e o que ia ter que fazer a respeito. Ela me perguntou se dezenove temporadas compravam alguma coisa para um homem. Eu disse que não. Eu penso nessa resposta toda hora desde então.',
    p9: 'E eu fiquei no bloco das nove e meia até meia-noite com a porta aberta, fazendo a planilha de reabastecimento, que é o álibi menos útil que alguém já teve.',

    // ---------------------------------------------------------------- t-porch
    v1: 'tem uma câmera na antecâmara. ela é para a vedação da porta, aponta para a dobradiça, não é coisa de segurança e não grava som',
    v2: 'vinte e duas e onze. alguém entra em quadro pelo lado do corredor, fica parado nos ganchos por onze segundos, e sai pela porta externa atrás dela. não dá para ver rosto. dá para ver uma manga',
    v3: 'a manga tem o rasgo no punho. o Mal rasgou aquele punho no guincho em abril e recusou uma parca nova porque tem aquela desde 2011',
    v4: 'por que ninguém olhou isso antes',
    v5: 'porque é uma câmera de vedação de porta e ela grava por cima de si mesma a cada dez dias e nenhum de nós pensou nela como uma coisa que observa gente. ela observou uma pessoa',
  },

  /**
   * The chips are digits in both languages and stay digit for digit identical to
   * the English. `c-mal-log` is the one the player is meant to pin and be refused:
   * the engine holds it as minutes past the case zero, so it reads `00:45–01:30`
   * on the chip while Maria says `quinze pra uma` in p3, and both are the same
   * moment in station time.
   */
  claims: {
    'c-orla-surgery': 'Laura: no consultório, 21:00–21:40',
    'c-mal-telescope': 'Mal: na plataforma de instrumentos, 21:45–23:00',
    'c-mal-block': 'Mal: no bloco de alojamento, 22:00–22:10 (segundo Theo)',
    'c-rune-outside': 'Erik: lá fora na torre meteorológica, 22:00–22:20 (segundo Mal)',
    'c-theo-mess': 'Theo: no refeitório, 21:40–23:00',
    'c-orla-coldporch': 'Laura: na antecâmara, 21:55–22:10 (segundo Theo)',
    'c-rune-radio': 'Erik: no rádio com o navio, 21:50–22:30 (segundo Theo)',
    'c-mal-log': 'Mal: na cúpula, 00:45–01:30 (registro da plataforma, convertido)',
    'c-mal-surgery': 'Mal: no consultório, 22:35–22:50 (acesso por cartão)',
    'c-pilar-block': 'Maria: no bloco de alojamento, 21:30–24:00',
    'c-mal-coldporch': 'Mal: na antecâmara, 22:10–22:25 (câmera)',
  },

  motives: {
    'm-medevac':
      'Laura tinha encontrado fibrilação atrial no exame anual dele. O protocolo é evacuação médica no primeiro voo, e aos sessenta e um anos e dezenove temporadas não haveria uma vigésima.',
  },

  contradictions: {
    'x-mal-block':
      'Ele se colocou a duzentos metros de distância, na plataforma, a partir das quinze pras dez. Theo viu ele passar pelo corredor do alojamento às dez e dez, de uma janela de refeitório que enxerga o corredor inteiro, e reconheceu ele pelo jeito de andar.',
    'x-mal-porch':
      'A câmera de vedação da porta aponta para uma dobradiça e ninguém nunca pensou nela como uma coisa que observa gente. Às 22:11 uma manga com o punho rasgado fica parada nos ganchos por onze segundos e depois sai pela porta externa atrás dela. Ele rasgou aquele punho no guincho em abril e não quis pegar uma parca nova.',
    'x-mal-surgery':
      'O cartão dele abriu o consultório às 22:35 e de novo às 22:44, enquanto ele diz que ainda estava na plataforma e enquanto a Laura já estava naquela antecâmara. O arquivo do exame dela não está no sistema e a cópia em papel não está na gaveta, e em dezenove temporadas ele nunca teve razão clínica para estar naquela sala.',
    'x-rune-mast':
      'Erik ficou no rádio com o Shackleton por quarenta minutos sobre uma transferência de combustível que só acontece em dezembro, e o navio registra o lado deles em cada chamada. Mal colocou ele na torre meteorológica porque a torre meteorológica é o único lugar daquela estação que ninguém enxerga, e porque um homem que responde em áudio é o mais fácil de transformar em estranho no gelo inteiro.',
  },

  confrontation: {
    opening:
      'Dezenove temporadas. Eu já enterrei duas pessoas saídas desta estação e carreguei uma delas nos braços, e agora é um link de rádio e alguém em Cambridge. Pode falar.',
    beats: {
      'f-block': {
        press:
          'Você se colocou na plataforma a partir das quinze pras dez. Theo viu você descer o corredor do alojamento às dez e dez e reconheceu você pelo jeito de andar.',
        rebuttal:
          'O Theo está no escuro há sessenta e um dias e existem quatro parcas vermelhas nesta estação. Ele quer que seja alguém. A esta altura todo mundo aqui embaixo quer que seja alguém.',
      },
      'f-porch': {
        press:
          'A câmera da antecâmara tem uma manga nos ganchos às 22:11, onze segundos, e depois saindo pela porta externa atrás dela. O punho está rasgado. Você rasgou ele no guincho em abril e não quis pegar uma parca nova.',
        rebuttal:
          'Um punho. Num prédio onde todo mundo usa a mesma coisa e empresta um para o outro todo dia do inverno.',
      },
      // f-surgery and f-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing here
      // to translate and a line would break the scene.
      'f-surgery': {
        press:
          'O seu cartão abriu o consultório às 22:35 e de novo às 22:44. O arquivo do exame dela sumiu do sistema e a cópia em papel sumiu da gaveta, e você nunca teve razão nenhuma para estar naquela sala.',
      },
      'f-why': {
        press:
          'Ela encontrou fibrilação atrial no seu exame anual e ia protocolar de manhã. Primeiro voo de volta, e nenhuma vigésima temporada.',
      },
    },
    deflections: [
      'Isso é Cambridge falando. Cambridge nunca esteve aqui no escuro.',
      'Me traga uma coisa e não a impressão de uma coisa.',
      'Você está a onze mil milhas de distância e tem muita certeza.',
    ],
    confession:
      'Ela veio e me contou pessoalmente. Ela não precisava fazer isso. Podia ter protocolado e me deixado descobrir em outubro, quando o avião chegasse e tivesse um assento nele com o meu nome.\n\nEu agradeci. Eu revi isso e eu agradeci mesmo, e na hora eu quis dizer aquilo.\n\nDepois eu fiquei sentado na beirada do beliche por mais ou menos uma hora e fui montando o que era o resto. Um apartamento em Dunfermline. Uma poltrona. Uma televisão ligada à tarde. Dezenove anos da única coisa em que eu já prestei para alguma coisa, encerrados, por causa de um ritmo.\n\nEla saiu para olhar o céu. Ela fazia isso quase toda noite. Eu fui atrás dela e não planejei uma única coisa daquilo, e eu quero que isso fique entendido porque não é desculpa, é só o que aconteceu.\n\nEla estava de bota de dentro. Eu devolvi a roupa externa dela para o gancho. Essa é a parte que eu decidi, e eu decidi em uns quatro segundos, e são os quatro segundos que fazem daquilo o que aquilo é.',
  },

  epilogue:
    'A estação terminou o inverno. Não havia outra opção e não havia outro lugar para colocar ele, então durante cento e onze dias seis pessoas tomaram café da manhã juntas e cinco delas sabiam.\n\nPilar Otxoa escreveu um relatório de doze páginas e não suavizou uma linha, e depois cozinhou com o Theo toda noite até outubro porque o Theo não conseguia mais fazer aquilo sozinho.\n\nRune Sandved prestou depoimento em onze áudios. A funcionária que transcreveu em Cambridge disse depois que era o depoimento de testemunha mais claro que ela já tinha registrado, e perguntou se ele era escritor.\n\nO arquivo do exame de Orla Byrne nunca foi recuperado. A arritmia foi confirmada em Rothera no exame médico de outubro, por um médico que tinha voado para lá naquela manhã e nunca tinha conhecido nenhum dos dois.',
};
