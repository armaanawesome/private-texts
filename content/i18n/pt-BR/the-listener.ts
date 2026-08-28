import type { CaseTranslation } from '../caseText';

/**
 * Case 15 — "O Ouvinte". The finale. Brazilian Portuguese.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The alias splits by register, and both halves are load-bearing. `Keeper` is
 *    capitalised twice — Mairi in m9 and the confession — and lowercase twice,
 *    in l6 and m3, because the player always types lowercase. Normalise either
 *    way and `arcAlias.test.ts` fails, because it counts the capitalised form.
 *    Both counts are asserted against the English rather than pinned to a number.
 *
 * 2. r6 is Ruth's last message from Pack 1, word for word. It is copied out of
 *    `pt-BR/the-lighthouse.ts` r12 character for character, not re-translated,
 *    because a player who did Pack 1 has read that sentence before and the whole
 *    point of the archive thread is that they recognise it. The test asserts the
 *    two strings are equal, and that the English pair are equal too, so it is
 *    provably a quotation rather than two similar sentences.
 *
 * 3. Third person, and the player. Two leaks were fixed in the English and must
 *    not be re-gendered by Portuguese agreement: `I have met them` in l3 becomes
 *    `eu já conheci essa versão`, and `they have never once let me down` in the
 *    confession drops the subject entirely. The closing line needs a neuter for
 *    the same reason `o melhor`/`a melhor` both pick a side, so it is built on
 *    `o que há de melhor`, where the article agrees with the relative clause and
 *    not with the person.
 *
 * 4. Names and places. People keep theirs: Ruth Calder, Mairi Bell, Beth (Bethan)
 *    Ivory, John Fettes, DS Nkemdi, and Ardnoe, Kirkcaldy, Kilmorack, Corrieburn,
 *    Gordon and Sime with them. He is `Número desconhecido` on the nameplate for
 *    fifteen packs and is named once, by a police officer, in k7. Descriptive
 *    places translated, and the two that carry over from Pack 1 use Pack 1's
 *    words:
 *
 *      you      → Você                  ardnoe   → Ardnoe
 *      listener → Número desconhecido   tower    → o farol
 *      nkemdi   → DS Nkemdi             cafe     → o café
 *      mairi    → Mairi Bell            callbox  → o orelhão da estrada de Kilmorack
 *      beth     → Beth                  home     → o apartamento dele em Kirkcaldy
 *      ruth     → Ruth Calder           hospital → o Vale of Leven, ala 6
 *
 *    `o orelhão` is what a Brazilian calls a public phone box, and it has to be
 *    one word everywhere because the call box is the last proof.
 *
 * 5. Voice. Ruth is Pack 1's exactly — lowercase, blunt, no full stops — and a
 *    player who did the tutorial hears her before they read her. He writes in
 *    complete sentences and never raises his voice; the one-word `Não.` in l8 is
 *    the only time in fifteen packs he answers without a clause. Mairi, Nkemdi and
 *    Beth all write properly too, so they divide by what they reach for: Nkemdi
 *    reaches for a record, Mairi for the exact words, Beth for the thing she has
 *    never been able to say out loud.
 *
 * The last voice is Mairi Bell rather than him. He does not get the final word,
 * because the finale's promise is that you catch him.
 */
export const theListenerPtBr: CaseTranslation = {
  title: 'O Ouvinte',
  blurb:
    'Ele te disse a verdade por quinze casos. Ele mentiu exatamente uma vez, para outra pessoa, e você anotou aquilo sem saber o que era.',

  characters: {
    you: 'Você',
    listener: 'Número desconhecido',
    nkemdi: 'DS Nkemdi',
    mairi: 'Mairi Bell',
    beth: 'Beth',
    ruth: 'Ruth Calder',
  },

  places: {
    ardnoe: 'Ardnoe',
    tower: 'o farol',
    cafe: 'o café',
    callbox: 'o orelhão da estrada de Kilmorack',
    home: 'o apartamento dele em Kirkcaldy',
    hospital: 'o Vale of Leven, ala 6',
  },

  threads: {
    't-listener': 'Número desconhecido',
    't-nkemdi': 'DS Nkemdi',
    't-ruth': 'R. Calder (arquivado)',
    't-mairi': 'Mairi Bell',
    't-beth': 'Beth Ivory',
  },

  briefing: {
    causeOfDeath:
      'Queda da escada da torre. Foi o seu primeiro caso na volta e você fechou em quatro dias.',
    ruling:
      'Encerrado. Mairi Bell se declarou culpada em novembro e está no décimo primeiro ano de uma pena perpétua, e nada neste processo jamais esteve em dúvida.',
    opening:
      'Ruth Calder cuidou da luz da Ponta Ardnoe por quarenta anos depois que a automatizaram, porque ninguém nunca pediu que ela parasse.\n\nEla era sua tia.\n\nVocê chegou na última balsa, e provou o que aconteceu com ela em quatro dias, e Mairi Bell nunca disse o contrário.\n\nO que você não fez foi perguntar por que uma mulher que conhecia Ruth desde os cinco anos não conseguia achar o momento em que decidiu. Ela te disse que tinha havido um telefonema. Você anotou.\n\nVocê anotou mais cinco desde então.',
  },

  messages: {
    // ------------------------------------------------------------- t-listener
    l1: 'O de Ardnoe foi um bom trabalho. Quatro dias. Eu tinha reservado duas semanas e não costumo errar por tanto.',
    l2: 'A casa de repouso foi melhor. Você foi atrás da ronda dos remédios e não da mulher, que é a coisa mais difícil de fazer e quase ninguém faz.',
    l3: 'Achei o caso do ferry menos bom. Você já tinha ele no segundo dia e passou mais quatro se certificando, e eu entendo por quê, mas existe uma versão de você que não precisa dos quatro dias e eu já conheci essa versão.',
    l4: 'Onze agora. Eu guardei todos eles. Eu não esperaria que você acreditasse nisso e não faz diferença se acredita.',
    l5: 'eu vou encerrar ardnoe',
    l6: 'a ligação para o café foi um auxiliar dos auditores. a gordon and sime tinha quatro temporários naquela conta naquele outono e um deles ligou para o número errado com o arquivo errado aberto e nunca soube. foi coincidência. tudo desde então fui eu construindo um homem que eu chamei de keeper a partir de um telefonema ruim',
    l7: 'não existe você. nunca existiu. sinto muito ter levado onze anos',
    l8: 'Não.',
    l9: 'Eu nunca falei com Mairi Bell na minha vida e não falei com ela naquela noite. Eu quero isso registrado entre nós, porque você teve um trabalho enorme ao longo de onze anos e não deveria terminar com uma coisa tão pobre quanto uma temporária com o arquivo errado aberto.',
    l10: 'uma temporária leu uma linha de um arquivo. ela entrou em pânico. é isso a coisa inteira',
    l11: 'Uma temporária teria dito que os papéis tinham sido enviados.',
    l12: 'Enviado é uma coisa que pode ser interrompida. Você pode telefonar para uma firma às nove da manhã e pedir uma carta de volta e as pessoas fazem isso todo dia da semana.\n\nO que disseram a ela foi que os papéis já estavam com os auditores, que não é a mesma frase e nunca foi para ser. Aquilo coloca o papel na mesa de um estranho e tira a manhã dela, e a manhã era a única coisa que ela ainda achava que tinha.\n\nNoventa e quatro segundos. Eu nunca precisei de mais do que dois minutos com ninguém e não precisei de dois minutos com ela.',
    l13: 'você acabou de me dizer que fez a ligação',
    l14: 'Eu te disse que a versão que você está prestes a arquivar está errada. São coisas diferentes e você sabe que são, e um jurado teria a diferença explicada por um homem competente em uns quatro minutos.',
    l15: 'E antes que você vá adiante com isso. Eu estou no mesmo apartamento em Kirkcaldy há dezenove anos e estava nele naquela quinta, como estou toda quinta, e não existe uma fotografia, uma passagem ou uma testemunha que me coloque a menos de cento e quarenta milhas daquele vilarejo naquela noite ou em qualquer outra.',
    l16: 'Eu acompanho todos eles depois. Eu já te disse isso antes e você tomou por vaidade. É o oposto de vaidade. É a única maneira de descobrir, e descobrir é o objetivo inteiro, e eu nunca uma vez pude perguntar a ninguém se eu tinha acertado.',

    // --------------------------------------------------------------- t-nkemdi
    k1: 'Eu estou com o processo de Ardnoe aberto há três semanas e quero dizer logo de início que não há nada errado nele. Mairi Bell matou Ruth Calder e você provou isso e ela nunca disse o contrário.',
    k2: 'O caderno continua no depósito de provas. Ruth escreveu toda a história da Fundação no fim do caderno de campo dela, com a própria letra, com a data em que pretendia ir à polícia, e ele estava lá em cima na torre onde ela deixou. Nada foi para auditor nenhum. Nada nunca foi enviado a lugar nenhum.',
    k3: 'A Gordon and Sime nunca cuidou da conta da Fundação do Farol de Ardnoe. Nem naquele ano, nem nunca. Eu tenho isso por escrito do sócio de compliance deles e tenho a lista de clientes. Não houve auxiliar nenhum e não houve temporário nenhum.',
    k4: 'a linha do café',
    k5: 'Uma ligação recebida naquela noite. 21:31, noventa e quatro segundos, do orelhão da estrada de Kilmorack. Fica a quatro milhas e é o último de pé entre lá e a estrada principal, e é por isso que ninguém num vilarejo de duzentas pessoas viu um estranho.',
    k6: 'A duração nunca foi divulgada. Não está no material do julgamento, não está nos autos do legista e não está em nada que um jornalista tenha tido. Quatro pessoas vivas sabem que são noventa e quatro segundos e até esta semana três delas eram policiais.',
    k7: 'O nome dele é John Fettes. Sessenta e nove anos. Aposentado de um escritório de habitação em 2016, nenhuma ficha de espécie alguma, nenhuma dívida, e uma carteirinha de biblioteca que ele usa a cada quinze dias desde 1991.',
    k8: 'Nove anos numa linha de escuta e mais onze treinando as pessoas que atenderam as ligações depois dele. Ele escreveu o módulo sobre devolução reflexiva que metade dos voluntários deste país ainda aprende. Isso também não é segredo. Ele recebeu um pequeno prêmio por aquilo.',
    k9: 'Dois nomes saem daquele orelhão nas doze semanas em volta. Fettes não é um deles, porque orelhão não registra nome. O outro é uma Bethan Ivory, que morava a uma milha estrada acima e usou o orelhão três vezes naquele mês.',
    k10: 'Ela liga para esta delegacia sobre ele desde 2011 e existem quatro registros disso e ninguém nunca foi até lá. Escreva para ela. Ela está esperando há muito tempo por alguém que não desligasse o telefone.',
    k11: 'E Mairi Bell pediu para falar com você. Ela pede duas vezes por ano há onze anos e esta é a primeira vez que alguém repassou, e eu não tenho orgulho disso.',

    // ----------------------------------------------------------------- t-ruth
    r1: 'O aparelho dela voltou do laboratório há onze anos e está no depósito desde então. Era isto que estava nele. Achei que você devia receber isso em vez de ler num calhamaço.',
    r2: 'as contas da fundação não fecham e eu já passei por elas quatro vezes. não é engano. isso vem acontecendo há um bom tempo',
    r3: 'escrevi tudo no fim do caderno de campo porque eu não confio em mim para falar em voz alta sem amenizar',
    r4: 'segunda. eu vou na segunda e levo o caderno comigo e depois disso eles que façam o que quiserem',
    r5: 'M é minha amiga desde os cinco anos e eu fico voltando nisso e isso continua não mudando nada',
    // Word for word her last message in Pack 1, copied from pt-BR/the-lighthouse.ts r12.
    r6: 'tô subindo na torre, a lâmpada está dando trabalho de novo. quarenta anos automatizada e ainda quer uma pessoa de pé do lado',

    // ---------------------------------------------------------------- t-mairi
    m1: 'Me disseram que estas mensagens são pagas por unidade, então eu não vou gastar nenhuma dizendo como eu estou.',
    m2: 'Eu matei Ruth Calder. Eu nunca disse diferente e não vou começar agora, e se você veio tirar isso de mim pode poupar o seu dinheiro.',
    m3: 'o keeper. o que ele disse. as palavras exatas',
    m4: 'Onze anos eu venho revendo aquilo, então você vai receber certo.\n\nEle disse que era dos auditores. Disse que a Ruth já tinha mandado os papéis e que estavam com eles agora, e que já não estava nas mãos dela, e que o nome do Callum estaria neles até segunda fizesse quem fizesse o que fosse.',
    m5: 'E depois ele não disse mais nada. É essa a parte que ninguém nunca me perguntou. Eu falei e ele deixou e não me interrompeu o tempo todo, e eu contei a um estranho coisas que não contei a padre.',
    m6: 'Quando eu terminei ele disse, então você já sabe. Quatro palavras. E desligou o telefone e eu peguei o meu casaco.',
    m7: 'você nunca disse isso no julgamento',
    m8: 'O meu próprio advogado me disse que aquilo soava como uma mulher construindo uma saída para si mesma. E ele tinha razão, soa mesmo, e eu era culpada e não queria saída. Eu queria que o Callum não tivesse que ficar de pé numa sala.',
    m9: 'Eu não estou pedindo que você diminua o que aquilo é. Eu subi lá. Ninguém me carregou.\n\nMas eu gostaria que uma pessoa antes de eu morrer soubesse que eu estava a três dias de ir até ela e entregar aquilo tudo eu mesma, e que um homem que se dizia o Keeper me ligou nove e meia e tirou os três dias de mim.',

    // ----------------------------------------------------------------- t-beth
    b1: 'Quinze anos. Eu liguei para aquela delegacia quatro vezes e a última foi em 2019 e o rapaz foi muito gentil comigo e não fez absolutamente nada.',
    b2: 'Ele me ligou em março de 2011. Eu estava no ponto mais baixo que uma pessoa chega e tinha chegado ao ponto de já ter resolvido o como, que é o ponto em que aquilo deixa de ser um sentimento.',
    b3: 'Ele nunca me mandou fazer nada. Eu quero deixar isso muito claro porque é o que ninguém acredita. Ele me perguntou o que eu ia fazer e depois me deixou falar aquilo tudo, e eu nunca fui escutada daquele jeito antes nem depois.',
    b4: 'E eu desliguei o telefone e fiquei ali sentada e pensei, aquele homem queria que eu dissesse. Ele nunca me pediu para fazer. Ele queria que eu dissesse em voz alta primeiro. E eu não saberia te dizer até hoje qual é a diferença, só que eu senti.',
    b5: 'eles sabem que você usava aquele orelhão',
    b6: 'Eu usei toda semana durante quatro anos. Não tinha sinal naquela estrada até 2014 e havia umas nove pessoas que usavam aquele orelhão e cada uma delas está naquela lista.',
    b7: 'Na quinta sobre a qual você está perguntando eu estava na ala 6 do Vale of Leven e estava desde a terça. Internada, não em atendimento. Está no meu prontuário e eu nunca uma vez consegui dizer essa frase para alguém sem o meu rosto desmoronar, e estou dizendo para você agora e ele não desmoronou.',
    b8: 'E eu fiz nove anos numa linha eu mesma, depois. De dois mil e treze até o ano passado. Então eu sou a mulher que foi voluntária numa linha de escuta e usava o orelhão e sabia dele e nunca contou a ninguém, e eu sei há quinze anos exatamente com o que isso me faz parecer.',
    b9: 'Ele me ligou de novo em 2013. Dois anos depois. Ele perguntou como eu estava indo e se eu tinha voltado a trabalhar, e ele ficou contente por mim, e eu conseguia ouvir que ele estava contente.\n\nEle estava conferindo. Eu não entendi aquilo na época. Ele ligou para descobrir se tinha se enganado sobre mim.',
    b10: 'É a única coisa que eu tenho que mais ninguém tem. Ele não para no telefonema. Ele volta para ver como aquilo terminou.',
  },

  claims: {
    'c-listener-never': 'Ele: nunca falou com Mairi Bell, 21:00–23:00',
    'c-listener-wording': 'Ele: escolheu as palavras daquela ligação, 21:00–23:00',
    'c-listener-home': 'Ele: no apartamento dele em Kirkcaldy, 21:00–23:00',
    'c-papers-kept':
      'Ruth: guardou os papéis no próprio caderno, 21:00–23:00 (depósito de provas)',
    'c-listener-box':
      'O autor da ligação: no orelhão da estrada de Kilmorack, 21:31–21:33 (registros da linha)',
    'c-beth-box':
      'Beth Ivory: no orelhão da estrada de Kilmorack, 21:31–21:33 (segundo o rastreamento)',
    'c-papers-sent': 'Ruth: já tinha mandado os papéis, 21:00–23:00 (segundo o autor da ligação)',
    'c-beth-hospital': 'Beth: na ala 6 do Vale of Leven, 20:00–23:20',
  },

  motives: {
    'm-finding-out':
      'Ele escuta o momento em que uma pessoa deixa de conseguir não fazer, e ele quer saber se está certo desde 1996. Uma coisa arranjada que passa por acidente não diz nada a ele, então ele acompanha cada uma delas depois — Beth Ivory dois anos depois, para descobrir se tinha se enganado sobre ela. Uma morte só conta depois que alguém prova o que ela foi. É por isso que ele manteve um detetive.',
  },

  contradictions: {
    'x-papers':
      'A primeira pista do jogo, e ela está no processo de Ardnoe há onze anos. Os auditores nunca tiveram aqueles papéis e a Gordon and Sime nunca cuidou da conta. Ruth escreveu tudo no fim do próprio caderno de campo e deixou na torre, e ele está num depósito de provas a quatro milhas de onde você está sentado agora. Tudo que ele já disse a alguém foi verdade ou foi nada. Esta é a única frase em quinze casos que não foi nem uma coisa nem outra.',
    'x-ardnoe':
      'Ele não vai ser arquivado como coincidência. Ao ouvir que uma temporária leu uma linha do arquivo errado, ele explica — porque uma temporária teria dito enviado, e enviado é uma coisa que pode ser interrompida, e o que disseram a ela foi que os papéis já estavam com os auditores, o que coloca o papel na mesa de um estranho e tira a manhã dela. Ele não está confessando. Ele está corrigindo a sua versão do trabalho dele, coisa que ele nunca uma vez conseguiu deixar passar, e é a única vez em quinze casos em que um homem que nunca afirma nada afirmou duas coisas que não podem ser verdade ao mesmo tempo.',
    'x-box':
      'Noventa e quatro segundos. Ele te deu a duração antes de alguém pedir, e ela nunca foi divulgada — nem no material do julgamento, nem nos autos do legista, nem para um único jornalista. O café recebeu uma ligação naquela noite, às 21:31, de noventa e quatro segundos, do orelhão da estrada de Kilmorack. A quatro milhas, e o último de pé entre Ardnoe e a estrada principal, que é como um vilarejo de duzentas pessoas nunca viu um estranho. Ele está no mesmo apartamento há dezenove anos e não estava nele nove e meia.',
    'x-beth':
      'Ela foi voluntária numa linha de escuta por nove anos, usou aquele orelhão toda semana por quatro, sabe dele desde 2011 e nunca contou a ninguém que fosse escutar. Ela é todas as pistas ao mesmo tempo. Ela também estava internada na ala 6 do Vale of Leven desde a terça, e havia nove pessoas naquela estrada que usavam aquele orelhão porque não tinha sinal lá em cima até 2014, e todas as nove estão na mesma lista.',
  },

  confrontation: {
    opening:
      'Eu preferiria que você fizesse isto aqui e não numa sala com um gravador. Você mereceu a sala. Estou apenas te dizendo que assim eu vou aproveitar mais.',
    beats: {
      'z-papers': {
        press:
          'Ruth Calder nunca mandou aqueles papéis a lugar nenhum. Ela escreveu tudo no fim do caderno de campo dela e deixou na torre, e aquilo está num depósito de provas há onze anos. Quem telefonou para aquele café disse uma coisa que não era verdade.',
        rebuttal:
          'Então alguém se enganou ao telefone em 2015. As pessoas se enganam ao telefone o tempo todo. Você provou que uma frase era falsa. Você não a colocou numa boca.',
      },
      'z-ardnoe': {
        press:
          'Você me disse que nunca falou com Mairi Bell. Depois me disse o que escolheu dizer a ela em vez de enviado, e por que enviado não teria funcionado.',
        rebuttal:
          'Eu te disse que a sua versão estava pobre. Eu venho te dizendo que a sua versão está pobre há onze anos e você em geral ficou grato por isso.',
      },
      // z-box and z-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence.
      'z-box': {
        press:
          'Noventa e quatro segundos. Ninguém fora de quatro policiais jamais soube esse número. O café recebeu uma ligação naquela noite, às 21:31, de noventa e quatro segundos, do orelhão da estrada de Kilmorack. Você não estava em Kirkcaldy.',
      },
      'z-why': {
        press:
          'Você ligou de volta para Beth Ivory dois anos depois para perguntar como ela estava indo. Você não estava sendo gentil com ela. Você estava descobrindo se tinha se enganado.',
      },
    },
    deflections: [
      'Você é melhor do que isso e nós dois sabemos. Leve uma hora e volte a mim direito.',
      'Nada do que você tem é uma frase minha. Quinze casos, e nenhum processo tem um nome que um tribunal possa intimar.',
      'Eu nunca uma vez te ameacei e não vou começar porque você teve uma boa tarde.',
    ],
    confession:
      'Noventa e quatro segundos. Você tem toda razão, e fui eu que te dei, e eu sei disso desde o momento em que mandei.\n\nEu gostaria que ficasse entendido que eu não escorreguei. Eu não escorrego há trinta anos. Eu quis que a versão estivesse certa mais do que quis que os onze anos continuassem, e quando você descobre isso sobre si mesmo aos sessenta e nove não há grande coisa a se fazer a respeito.\n\nVocê vai ter ouvido eles me chamarem de Keeper. Fui eu que dei isso a eles, a mesma palavra toda vez, porque uma versão precisa de assinatura e eu nunca ia deixar o meu próprio nome em nada. Não é vaidade. Eu guardei cada um deles, e agora você.\n\nEntão. Ardnoe.\n\nEu quebrei a minha própria regra ali e foi a única vez. Mairi Bell estava a três dias. Ela ia procurar Ruth Calder e entregar aquilo tudo ela mesma e elas teriam sentado naquela cozinha e chorado e aquilo teria acabado, e eu via aquilo chegando desde uns dois minutos de conversa. Então eu disse uma coisa que não era verdade. Uma. É a única frase minha em qualquer processo deste país e você a tem numa gaveta desde a sua primeira semana de volta.\n\nEu pensei muito sobre aquilo.\n\nAgora a outra coisa, e eu vou dizer sem rodeio porque você vai ouvir pior de outra pessoa.\n\nCorrieburn foi meu.\n\nAgosto de 2008. Você tinha vinte e seis anos e era o seu quarto mês e deram aquilo a você porque ninguém graduado queria um acidente de fazenda na chuva. Você levou nove dias e no nono estava certo e desde então não precisou pagar uma bebida naquele condado.\n\nEu arranjei aquilo inteiro e assisti você desmontar, e eu nunca tive mais orgulho de nada que eu tenha feito do que tive de você naquele outono.\n\nVocê quer saber por quê. Eu escuto o momento. É uma coisa real e dura uns quatro segundos e eu consigo escutar desde os trinta e nove anos, e não há ninguém vivo a quem eu pudesse ter contado, e escutar não vale nada se você não descobre depois se estava certo.\n\nUm acidente não te diz nada. Uma mulher cai da própria escada e o processo diz fatalidade e eu não sei mais nada do que sabia na quarta-feira.\n\nTem que ser provado. Alguém tem que desmontar aquilo e escrever exatamente o que aconteceu e por quê, em ordem, num documento, e entregar a um tribunal.\n\nÉ isso que você é. É isso que você tem sido desde os vinte e seis anos.\n\nEu não escolhi você por você ser o que há de melhor. Você é o que há de melhor porque eu escolhi, e eu passei dezoito anos alimentando um detetive excepcional com o único trabalho capaz de me dizer se eu estava certo, e nunca uma vez me decepcionou, e eu nunca uma vez pude contar a uma alma viva.\n\nÉ isso a coisa inteira. Era isso que isto era.',
  },

  coda: {
    from: 'Mairi Bell',
    messages: [
      'Vieram me contar na terça. Uma mulher sentou comigo por uma hora e passou por aquilo tudo e não falou comigo uma vez sequer como se eu fosse boba.',
      'Eu não durmo melhor. Quero ser honesta com você sobre isso, porque eu achei que fosse dormir e não durmo. É igual ao que era. Eu subi aquela escada e ninguém me carregou.',
      'Mas agora eu sei quais foram as quatro palavras. Ele disse, então você já sabe. E ele estava certo, e é essa a coisa que eu não consegui superar por onze anos, que ele estava certo e nunca tinha me conhecido.',
      'Ruth escreveu que eu tinha sido amiga dela desde os cinco anos e que pedissem que fossem gentis comigo. Ela escreveu aquilo no dia em que ia me entregar. Eu tive onze anos com aquela frase e ainda não terminei com ela.',
      'Você voltou e perguntou. É só isso que eu sempre quis que alguém fizesse. Obrigada por perguntar.',
    ],
  },

  epilogue:
    'John Fettes, sessenta e nove anos, de Kirkcaldy. Nenhuma ficha de espécie alguma. Uma carteirinha de biblioteca que ele usava a cada quinze dias desde 1991, e um pequeno prêmio em 2004 por um módulo de treinamento sobre devolução reflexiva que metade dos voluntários do país ainda aprende.\n\nO apartamento tinha onze caixas de arquivo num guarda-roupa, em ordem, cada uma uma pessoa. Recortes de jornal, pautas de tribunal, as datas dos recursos. A de Beth Ivory tinha quatro folhas e a última era uma anotação com a letra dele que dizia: de volta ao trabalho, seis anos, me enganei sobre ela, e ele tinha sublinhado enganei duas vezes.\n\nA Coroa levou Ardnoe e mais dois. Ele nunca contestou uma palavra da acusação de Ardnoe e nunca disse absolutamente nada sobre o resto, e o advogado dele parou de pedir que dissesse.\n\nMairi Bell foi transferida para o regime aberto na primavera. Ela escreveu para o seu pai em março e ele não respondeu, e ela diz que é justo e que vai escrever de novo no Natal mesmo assim.\n\nBeth Ivory depôs por dois dias. Perguntaram a ela por que não tinha procurado a polícia e ela disse que tinha procurado, quatro vezes, e o tribunal mandou colocar os registros na tela enquanto ela ficava ali sentada.\n\nA décima segunda caixa estava vazia e tinha o seu nome.\n\nEle vinha guardando ela desde 2008. Não tem nada dentro. Ele disse a eles no interrogatório que nunca tinha colocado nada dentro porque não tinha terminado com você, e que um arquivo se fecha quando você sabe como aquilo terminou, e depois perguntou ao policial como você estava.',
};
