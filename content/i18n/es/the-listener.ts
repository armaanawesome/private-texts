import type { CaseTranslation } from '../caseText';

/**
 * Case 15 — «El escuchante». Spanish. The finale.
 *
 * `el escuchante` is the same word Pack 12 uses for a listening-line volunteer,
 * and that is the whole point of the title: he trained them, he wrote the module
 * half of them still learn from, and the word for what he is and the word for
 * what they are is one word.
 *
 * Seven things this had to get right.
 *
 * 1. The alias count, which matters more here than anywhere. `Keeper` appears
 *    with a capital K exactly TWICE in the English — Mairi in m9, and the
 *    confession. It appears twice more in lowercase, in l6 and m3, because the
 *    player types in lowercase and always has. `arcAlias.test.ts` counts the
 *    capitalised string, so capitalising the player's two would make four and
 *    fail, and lowercasing Mairi's would make one and fail. Both registers are
 *    preserved exactly: `el keeper` from the player, `el Keeper` from everybody
 *    else.
 *
 * 2. He has no name and does not get one. The character is `Número desconocido`,
 *    the same string the coda `from` uses in Packs 6, 9 and 12, so fifteen packs
 *    of a new number every time reads as one continuous absence. DS Nkemdi says
 *    `John Fettes` out loud in k7, which is where the name belongs and the only
 *    place it goes.
 *
 * 3. Pack 1, quoted back. This case re-reads the player's first case, so the
 *    Spanish has to match the Spanish already shipped in `es/the-lighthouse.ts`
 *    rather than the English:
 *
 *    - r6 is word for word Ruth's last message in Pack 1 and is copied from
 *      `the-lighthouse.ts` r12 character for character.
 *    - Her voice is Pack 1's: lowercase, never a closing full stop, and she
 *      capitalises people. She keeps her accents — Pack 1 gives her `lámpara`
 *      and `está` — so no dropped-accent axis was applied to her here, even
 *      though her English drops apostrophes. Matching her Pack 1 self beats
 *      applying a locale rule she was never subject to.
 *    - `el faro`, `el café`, `el Patronato` and `los auditores` are Pack 1's
 *      words, kept so the callback lands on a player who did that case.
 *
 * 4. The two sentences the whole arc turns on. `ya los habían mandado a los
 *    auditores` is what Mairi was told; `mandados es una cosa que se puede
 *    parar` is why he did not say it. They have to be the same words in m4, in
 *    l11, in l12 and in the x-ardnoe revelation, because the player is being
 *    asked to notice a difference between two verbs and nothing else.
 *
 * 5. Times and numbers. `21:31` and `noventa y cuatro segundos` are the only
 *    two facts that convict him and neither may drift; the duration stays
 *    spelled out everywhere the English spells it, because it is a thing people
 *    say rather than a thing written in a log. `la planta 6` keeps its digit.
 *    Only k5 carries a digit clock time — DS Nkemdi reading the line records —
 *    exactly as in the English.
 *
 * 6. Places. `el faro`, `el café`, `la cabina de la carretera de Kilmorack`, `su
 *    piso de Kirkcaldy`, `el Vale of Leven, planta 6`. Spanish `al` and `del`
 *    swallow a masculine article, so `el faro` (k2), `el café` (x-box) and `el
 *    Vale of Leven` (b7) each appear uncontracted in the prose.
 *
 * 7. The player has no gender, and this pack is the worst offender in the game
 *    for it — the English calls the player `her` twice, in l3 and in the
 *    confession, which is a third-person leak `playerNeutral.test.ts` cannot
 *    see. Both are rebuilt rather than resolved:
 *
 *    - l3 `and I have met her` → `y yo la he conocido`, where `la` agrees with
 *      `una versión`, not with the reader. The English sentence survives whole.
 *    - The confession's `a very great detective ... and she has never once let
 *      me down` → `la mejor cabeza de detective que me he encontrado nunca ... y
 *      no me ha fallado`, feminine by `cabeza` and silent about the reader.
 *    - `You are the best because I chose you` → `Eres lo mejor que hay`, using
 *      the neuter `lo`, because `la mejor` and `el mejor` both pick a side.
 *
 *    Flagged for the coordinator: the English states the player's gender twice
 *    in the finale, and disagrees with nothing because no other pack says it.
 */
export const theListenerEs: CaseTranslation = {
  title: 'El escuchante',
  blurb:
    'Lleva quince casos diciéndote la verdad. Mintió exactamente una vez, a otra persona, y tú lo anotaste sin saber lo que era.',

  characters: {
    you: 'Tú',
    listener: 'Número desconocido',
    nkemdi: 'DS Nkemdi',
    mairi: 'Mairi Bell',
    beth: 'Beth',
    ruth: 'Ruth Calder',
  },

  places: {
    ardnoe: 'Ardnoe',
    tower: 'el faro',
    cafe: 'el café',
    callbox: 'la cabina de la carretera de Kilmorack',
    home: 'su piso de Kirkcaldy',
    hospital: 'el Vale of Leven, planta 6',
  },

  threads: {
    't-listener': 'Número desconocido',
    't-nkemdi': 'DS Nkemdi',
    't-ruth': 'R. Calder (archivado)',
    't-mairi': 'Mairi Bell',
    't-beth': 'Beth Ivory',
  },

  briefing: {
    causeOfDeath:
      'Caída por las escaleras de la torre. Fue tu primer caso a la vuelta y lo cerraste en cuatro días.',
    ruling:
      'Cerrado. Mairi Bell se declaró culpable en noviembre y lleva once años de cadena perpetua, y nada de este expediente se ha puesto nunca en duda.',
    opening:
      'Ruth Calder cuidó la luz de Punta Ardnoe durante cuarenta años después de que la automatizaran, porque nadie le pidió nunca que lo dejara.\n\nEra tu tía.\n\nLlegaste en el último ferry, y demostraste lo que le había pasado en cuatro días, y Mairi Bell no ha dicho nunca lo contrario.\n\nLo que no hiciste fue preguntarte por qué una mujer que conocía a Ruth desde los cinco años no era capaz de encontrar el momento en que lo decidió. Te dijo que había habido una llamada de teléfono. Lo anotaste.\n\nDesde entonces has anotado cinco más.',
  },

  messages: {
    // -------------------------------------------------------------- t-listener
    l1: 'Ardnoe fue un buen trabajo. Cuatro días. Yo había calculado quince y no suelo equivocarme por tanto.',
    l2: 'La residencia fue mejor. Fuiste a por la ronda de medicación y no a por la mujer, que es lo difícil y no lo hace casi nadie.',
    l3: 'Lo del ferry me gustó menos. Lo tenías el segundo día y te pasaste cuatro más asegurándote, y entiendo por qué, pero hay una versión de ti que no necesita los cuatro días y yo la he conocido.',
    l4: 'Once ya. Los he guardado todos. No espero que te lo creas y da igual que te lo creas o no.',
    l5: 'estoy cerrando ardnoe',
    l6: 'la llamada al café fue un administrativo de los auditores. gordon y sime tenían cuatro eventuales en esa cuenta aquel otoño y uno de ellos marcó el número equivocado con el expediente equivocado abierto y no se enteró nunca. fue una casualidad. todo lo demás he sido yo construyendo un hombre al que llamé el keeper a partir de una sola llamada mal hecha',
    l7: 'no existes. nunca existió nadie. siento que me haya llevado once años',
    l8: 'No.',
    l9: 'No he hablado con Mairi Bell en mi vida y no hablé con ella esa noche. Quiero que eso conste entre nosotros, porque te has tomado muchísimas molestias durante once años y no deberías terminar con algo tan pobre como un eventual con el expediente equivocado abierto.',
    l10: 'una eventual leyó una línea de un expediente. le entró el pánico. eso es todo',
    l11: 'Una eventual habría dicho que los papeles estaban mandados.',
    l12: 'Mandados es una cosa que se puede parar. Puedes telefonear a un despacho a las nueve de la mañana y pedir que te devuelvan una carta y la gente lo hace todos los días de la semana.\n\nLo que le dijeron fue que ya los tenían los auditores, que no es la misma frase y nunca se pretendió que lo fuera. Pone el papel en la mesa de un desconocido y le quita la mañana, y la mañana era lo único que ella creía que le quedaba.\n\nNoventa y cuatro segundos. Nunca he necesitado más de dos minutos con nadie y con ella no necesité dos minutos.',
    l13: 'acabas de decirme que hiciste la llamada',
    l14: 'Te he dicho que el relato que estás a punto de presentar es falso. Son cosas distintas y sabes que lo son, y a un jurado se lo enseñaría un hombre competente en unos cuatro minutos.',
    l15: 'Y antes de que sigas con esto. Llevo diecinueve años en el mismo piso de Kirkcaldy y estaba en él aquel jueves, como todos los jueves, y no hay ni una fotografía, ni un billete ni un testigo que me ponga a menos de ciento cuarenta millas de ese pueblo esa noche ni ninguna otra.',
    l16: 'Los sigo todos. Te lo he dicho antes y lo tomaste por una fanfarronada. Es lo contrario de una fanfarronada. Es la única manera de averiguarlo, y averiguarlo es la razón de todo, y no he podido preguntarle nunca a nadie si acerté.',

    // ---------------------------------------------------------------- t-nkemdi
    k1: 'Llevo tres semanas con el expediente de Ardnoe encima de la mesa y quiero decir de entrada que no hay nada mal en él. Mairi Bell mató a Ruth Calder y tú lo demostraste y ella no ha dicho nunca lo contrario.',
    k2: 'El cuaderno sigue en el depósito de pruebas. Ruth escribió todo lo del Patronato al final de su cuaderno de registro, de su puño y letra, con la fecha en que pensaba ir a la policía, y estaba arriba en el faro donde lo dejó. No se le mandó nada a ningún auditor. No se mandó nunca nada a ninguna parte.',
    k3: 'Gordon y Sime no llevaron nunca la cuenta del Patronato del Faro de Ardnoe. Ni ese año ni ninguno. Lo tengo por escrito de su socio de cumplimiento y tengo la lista de clientes. No hubo ningún administrativo y no hubo eventuales.',
    k4: 'la línea del café',
    k5: 'Una sola llamada entrante esa tarde. 21:31, noventa y cuatro segundos, desde la cabina de monedas de la carretera de Kilmorack. Está a cuatro millas y es la última que queda en pie entre allí y la carretera general, y por eso nadie en un pueblo de doscientas personas vio nunca a un desconocido.',
    k6: 'La duración no se ha publicado nunca. No está en el sumario, no está en las diligencias del juez y no está en nada que haya tenido nunca un periodista. Cuatro personas vivas saben que son noventa y cuatro segundos y hasta esta semana tres de ellas eran policías.',
    k7: 'Se llama John Fettes. Sesenta y nueve años. Jubilado de una oficina de vivienda en 2016, sin antecedentes de ningún tipo, sin deudas, y un carné de biblioteca que ha usado cada quince días desde 1991.',
    k8: 'Nueve años en una línea de escucha y otros once formando a los que cogían las llamadas después de él. Escribió el módulo sobre formulación reflexiva del que todavía aprende la mitad de los voluntarios de este país. Eso tampoco es un secreto. Le dieron un pequeño premio por ello.',
    k9: 'De esa cabina salen dos nombres en las doce semanas de alrededor. Fettes no es uno de ellos, porque una cabina de monedas no pide nombre. El otro es una tal Bethan Ivory, que vivía a una milla carretera arriba y la usó tres veces aquel mes.',
    k10: 'Lleva llamando a esta comisaría por él desde 2011 y hay cuatro registros de ello y nunca salió nadie. Escríbele. Lleva muchísimo tiempo esperando a alguien que no le colgara el teléfono.',
    k11: 'Y Mairi Bell ha pedido hablar contigo. Lo ha pedido dos veces al año durante once años y esta es la primera vez que alguien lo transmite, y no estoy orgullosa de eso.',

    // ------------------------------------------------------------------ t-ruth
    r1: 'Su teléfono volvió del laboratorio hace once años y desde entonces está en el depósito. Esto es lo que había dentro. He pensado que era mejor que lo tuvieras tú a que lo leyeras en un sumario.',
    r2: 'las cuentas del patronato no cuadran y ya he pasado por ellas cuatro veces. no es un error. lleva pasando mucho tiempo',
    r3: 'lo he escrito todo al final del cuaderno de registro porque no me fío de mí misma para decirlo en voz alta sin suavizarlo',
    r4: 'el lunes. voy el lunes y me llevo el cuaderno y luego que hagan con él lo que quieran',
    r5: 'M es mi amiga desde que teníamos cinco años y no paro de volver a eso y eso sigue sin cambiar nada',
    // Word for word Ruth's last message in Pack 1 (es/the-lighthouse.ts r12).
    r6: 'me subo a la torre, la lámpara está dando guerra otra vez. cuarenta años automatizada y sigue queriendo a alguien de pie al lado',

    // ----------------------------------------------------------------- t-mairi
    m1: 'Me dicen que estos hay que pagarlos por mensaje, así que no los voy a gastar en contarte cómo estoy.',
    m2: 'Yo maté a Ruth Calder. No he dicho nunca otra cosa y no voy a empezar ahora, y si vienes a quitarme eso puedes ahorrarte el dinero.',
    m3: 'el keeper. qué dijo. las palabras exactas',
    m4: 'Once años llevo dándole vueltas, así que te las vas a llevar bien.\n\nDijo que era de los auditores. Dijo que Ruth ya les había mandado los papeles y que ya los tenían ellos, y que se le había ido de las manos, y que a Callum lo iban a nombrar en ellos para el lunes hiciera nadie lo que hiciera.',
    m5: 'Y luego no dijo absolutamente nada. Esa es la parte por la que no me ha preguntado nunca nadie. Yo hablé y él me dejó y no me interrumpió en todo el rato, y le conté a un desconocido cosas que no le he contado a un cura.',
    m6: 'Cuando terminé dijo, entonces ya lo sabes. Cuatro palabras. Y colgó el teléfono y yo cogí el abrigo.',
    m7: 'eso no lo dijiste en el juicio',
    m8: 'Mi propio abogado me dijo que sonaba a mujer construyéndose una puerta de salida. Y tenía razón, lo suena, y yo era culpable y no quería ninguna puerta de salida. Quería que Callum no tuviera que ponerse de pie en una sala.',
    m9: 'No te estoy pidiendo que lo hagas más pequeño de lo que es. Subí yo. No me llevó nadie.\n\nPero me gustaría que una persona supiera antes de que me muera que me faltaban tres días para ir a verla y contárselo yo entera, y que un hombre que se hacía llamar el Keeper me telefoneó a las nueve y media y me quitó los tres días.',

    // ------------------------------------------------------------------ t-beth
    b1: 'Quince años. He llamado a esa comisaría cuatro veces y la última fue en 2019 y el chico fue muy amable conmigo y no hizo absolutamente nada.',
    b2: 'Me llamó en marzo de 2011. Yo estaba todo lo baja que puede estar una persona y había llegado al punto de tener resuelto el cómo, que es el punto en que deja de ser un sentimiento.',
    b3: 'Él no me dijo que hiciera nada. Quiero dejar eso muy claro porque es lo que no se cree nadie. Me preguntó qué iba a hacer y luego me dejó hablar todo el rato, y a mí no me habían escuchado así ni antes ni después.',
    b4: 'Y colgué el teléfono y me quedé ahí sentada y pensé, ese hombre quería que lo dijera. No me pidió que lo hiciera. Quería que lo dijera yo primero en voz alta. Y a día de hoy no te sabría decir cuál es la diferencia salvo que la noté.',
    b5: 'saben que usabas esa cabina',
    b6: 'La usé todas las semanas durante cuatro años. En esa carretera no hubo cobertura hasta 2014 y seríamos unos nueve los que usábamos esa cabina y todos estamos en esa lista.',
    b7: 'El jueves por el que preguntas yo estaba en la planta 6, en el Vale of Leven, y llevaba allí desde el martes. Ingresada, no de visita. Está en mi historial y no he sido capaz de decir esa frase en voz alta a nadie sin que se me descomponga la cara, y te la estoy diciendo a ti y no se me ha descompuesto.',
    b8: 'Y yo hice nueve años en una línea, después. De dos mil trece al año pasado. Así que soy la mujer que fue voluntaria en un teléfono de ayuda y usaba la cabina y sabía lo de él y no se lo contó nunca a nadie, y llevo quince años sabiendo exactamente la pinta que tiene eso.',
    b9: 'Me volvió a llamar en 2013. Dos años después. Me preguntó qué tal me iba y si había vuelto al trabajo, y se alegraba por mí, y yo le oía que se alegraba.\n\nEstaba comprobando. Entonces no lo entendí. Llamó para averiguar si se había equivocado conmigo.',
    b10: 'Eso es lo único que tengo yo que no tiene nadie más. No se para en la llamada. Vuelve para ver cómo salió.',
  },

  /**
   * Digit for digit identical to the English. `c-papers-sent` and
   * `c-papers-kept` are the pair the entire game has been waiting for: the first
   * clue, recorded in Pack 1, re-recorded here because claims cannot cross case
   * scripts. Their exclusive group is `ruth-papers` and the difference between
   * them is one verb.
   */
  claims: {
    'c-listener-never': 'Él: nunca habló con Mairi Bell, 21:00–23:00',
    'c-listener-wording': 'Él: eligió las palabras de esa llamada, 21:00–23:00',
    'c-listener-home': 'Él: en su piso de Kirkcaldy, 21:00–23:00',
    'c-papers-kept':
      'Ruth: guardó los papeles en su propio cuaderno, 21:00–23:00 (depósito de pruebas)',
    'c-listener-box':
      'El que llamó: en la cabina de la carretera de Kilmorack, 21:31–21:33 (registros de la línea)',
    'c-beth-box':
      'Beth Ivory: en la cabina de la carretera de Kilmorack, 21:31–21:33 (según el rastreo)',
    'c-papers-sent': 'Ruth: ya había mandado los papeles, 21:00–23:00 (según el que llamó)',
    'c-beth-hospital': 'Beth: en la planta 6 del Vale of Leven, 20:00–23:20',
  },

  motives: {
    'm-finding-out':
      'Oye el momento en que una persona deja de poder no hacerlo, y lleva queriendo saber si acierta desde 1996. Un montaje que se lee como un accidente no le dice nada, así que los sigue todos: a Beth Ivory dos años después, para averiguar si se había equivocado con ella. Una muerte solo cuenta cuando alguien ha demostrado lo que fue. Por eso ha tenido guardado a un detective.',
  },

  contradictions: {
    'x-papers':
      'La primera pista del juego, y lleva once años en el expediente de Ardnoe. Los auditores no tuvieron nunca esos papeles y Gordon y Sime no llevaron nunca la cuenta. Ruth lo escribió todo al final de su propio cuaderno de registro y lo dejó en el faro, y está en un depósito de pruebas a cuatro millas de donde estás sentado ahora. Todo lo que él le ha dicho a alguien alguna vez ha sido verdad o no ha sido nada. Esta es la única frase en quince casos que no fue ni una cosa ni la otra.',
    'x-ardnoe':
      'No va a dejar que lo archiven como una casualidad. Cuando le dicen que una eventual leyó una línea del expediente equivocado, lo explica: porque una eventual habría dicho mandados, y mandados es una cosa que se puede parar, y lo que le dijeron fue que ya los tenían los auditores, que pone el papel en la mesa de un desconocido y le quita la mañana. No está confesando. Está corrigiendo tu relato de su trabajo, cosa que no ha sido capaz de dejar pasar ni una sola vez, y es la única vez en quince casos en que un hombre que no afirma nunca nada ha afirmado dos cosas que no pueden ser verdad las dos.',
    'x-box':
      'Noventa y cuatro segundos. Te dio la duración antes de que nadie se la pidiera, y no se ha publicado nunca: ni en el sumario, ni en las diligencias del juez, ni a un solo periodista. El café recibió una sola llamada esa tarde, a las 21:31, de noventa y cuatro segundos, desde la cabina de monedas de la carretera de Kilmorack. A cuatro millas, y la última que queda en pie entre Ardnoe y la carretera general, que es como un pueblo de doscientas personas no vio nunca a un desconocido. Lleva diecinueve años en el mismo piso y a las nueve y media no estaba en él.',
    'x-beth':
      'Fue voluntaria nueve años en una línea de escucha, usó esa cabina todas las semanas durante cuatro años, sabe lo de él desde 2011 y no se lo contó nunca a nadie que la escuchara. Es todas las pistas a la vez. También estuvo ingresada en la planta 6 del Vale of Leven desde el martes, y en esa carretera había nueve personas que usaban esa cabina porque no hubo cobertura hasta 2014, y las nueve están en la misma lista.',
  },

  confrontation: {
    opening:
      'Prefiero que hagas esto aquí y no en una sala con una grabadora. Te has ganado la sala. Simplemente te digo que así lo voy a disfrutar más.',
    beats: {
      'z-papers': {
        press:
          'Ruth Calder no mandó esos papeles a ninguna parte. Lo escribió todo al final de su cuaderno de registro y lo dejó en el faro, y lleva once años en un depósito de pruebas. Quien telefoneó a ese café dijo una cosa que no era verdad.',
        rebuttal:
          'Entonces alguien se equivocó por teléfono en 2015. La gente se equivoca por teléfono constantemente. Has demostrado que una frase era falsa. No la has puesto en ninguna boca.',
      },
      'z-ardnoe': {
        press:
          'Me has dicho que no hablaste nunca con Mairi Bell. Y después me has dicho qué elegiste decirle en lugar de mandados, y por qué mandados no habría funcionado.',
        rebuttal:
          'Te he dicho que tu relato era pobre. Llevo once años diciéndote que tu relato era pobre y en general lo has agradecido.',
      },
      // z-box and z-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'z-box': {
        press:
          'Noventa y cuatro segundos. Ese número no lo ha sabido nunca nadie fuera de cuatro policías. El café recibió una sola llamada esa noche, a las 21:31, de noventa y cuatro segundos, desde la cabina de monedas de la carretera de Kilmorack. No estabas en Kirkcaldy.',
      },
      'z-why': {
        press:
          'Llamaste a Beth Ivory dos años después para preguntarle qué tal le iba. No estabas siendo amable con ella. Estabas averiguando si te habías equivocado.',
      },
    },
    deflections: [
      'Eres mejor que esto y los dos lo sabemos. Tómate una hora y vuelve a venir a por mí como es debido.',
      'Nada de lo que tienes es una frase mía. Quince casos, y ni un solo expediente con un nombre al que un juzgado pueda notificar nada.',
      'No te he amenazado ni una vez y no voy a empezar porque hayas tenido una buena tarde.',
    ],
    confession:
      'Noventa y cuatro segundos. Tienes toda la razón, y te lo di yo, y lo sé desde el momento en que lo mandé.\n\nQuiero que quede entendido que no se me escapó. No se me escapa nada desde hace treinta años. Quise más que el relato fuera correcto de lo que quise que los once años siguieran, y cuando descubres eso de ti mismo a los sesenta y nueve no hay gran cosa que hacer al respecto.\n\nHabrás oído que me llaman el Keeper. Eso se lo di yo, la misma palabra siempre, porque un relato necesita una firma y yo no iba a dejar mi propio nombre en nada. No es una fanfarronada. Los he guardado a todos, y ahora a ti.\n\nBueno. Ardnoe.\n\nAhí rompí mi propia regla y es la única vez. A Mairi Bell le faltaban tres días. Iba a ir a ver a Ruth Calder y a contárselo ella entera y se habrían sentado en esa cocina a llorar y se habría acabado, y yo lo veía venir desde el segundo minuto más o menos. Así que dije una cosa que no era verdad. Una. Es la única frase mía que hay en ningún expediente de este país y la has tenido en un cajón desde tu primera semana de vuelta.\n\nLe he dado muchísimas vueltas a eso.\n\nY ahora la otra cosa, y la voy a decir con todas las letras porque se la vas a oír peor a otro.\n\nCorrieburn fue mío.\n\nAgosto de 2008. Tenías veintiséis años y era tu cuarto mes y te lo dieron porque ningún mando quería un accidente de granja bajo la lluvia. Tardaste nueve días y acertaste el noveno y desde entonces no has tenido que pagarte una copa en ese condado.\n\nLo monté yo entero y te vi desmontarlo, y no he estado más orgulloso de nada de lo que hice que de ti aquel otoño.\n\nQuieres saber por qué. Yo oigo el momento. Es una cosa real y dura unos cuatro segundos y soy capaz de oírlo desde los treinta y nueve años, y no hay nadie vivo a quien se lo hubiera podido contar nunca, y oírlo no vale nada si después no averiguas si acertaste.\n\nUn accidente no te dice nada. Una mujer se cae por su propia escalera y el expediente dice muerte accidental y yo no sé más que el miércoles.\n\nHay que demostrarlo. Alguien tiene que desmontarlo y escribir exactamente qué pasó y por qué, en orden, en un documento, y entregárselo a un juzgado.\n\nEso es lo que eres tú. Eso es lo que has sido desde los veintiséis años.\n\nNo te elegí porque fueras lo mejor que había. Eres lo mejor que hay porque te elegí yo, y he pasado dieciocho años dándole el único trabajo que podía decirme si acertaba a la mejor cabeza de detective que me he encontrado nunca, y no me ha fallado ni una sola vez, y no se lo he podido contar nunca a nadie vivo.\n\nEso es todo. Esto es lo que era esto.',
  },

  epilogue:
    'John Fettes, sesenta y nueve años, de Kirkcaldy. Sin antecedentes de ningún tipo. Un carné de biblioteca que había usado cada quince días desde 1991, y un pequeño premio en 2004 por un módulo de formación sobre formulación reflexiva del que todavía aprende la mitad de los voluntarios del país.\n\nEn el piso había once cajas archivadoras en un armario, en orden, cada una una persona. Recortes de prensa, señalamientos, las fechas de los recursos. La de Beth Ivory tenía cuatro hojas dentro y la última era una nota de su puño y letra que decía: de vuelta al trabajo, seis años, me equivoqué con ella, y había subrayado dos veces me equivoqué.\n\nLa fiscalía se quedó con Ardnoe y dos más. No ha discutido ni una palabra del cargo de Ardnoe y no ha dicho absolutamente nada del resto, y su abogado ha dejado de pedírselo.\n\nA Mairi Bell la pasaron a régimen abierto en primavera. Le escribió a tu padre en marzo y él no ha contestado, y ella dice que le parece justo y que va a volver a escribir en Navidad de todas formas.\n\nBeth Ivory declaró durante dos días. Le preguntaron por qué no había ido a la policía y dijo que sí había ido, cuatro veces, y el tribunal hizo poner los registros en la pantalla mientras ella estaba allí sentada.\n\nLa duodécima caja archivadora estaba vacía y llevaba tu nombre.\n\nLa tenía guardada desde 2008. No hay nada dentro. Dijo en el interrogatorio que no había metido nunca nada porque no había terminado contigo, y que un expediente se cierra cuando sabes cómo salió, y luego preguntó al agente qué tal estabas.',

  coda: {
    from: 'Mairi Bell',
    messages: [
      'Vinieron a decírmelo el martes. Una mujer se sentó conmigo una hora y me lo explicó todo entero y no me habló ni una vez como si yo fuera tonta.',
      'No duermo mejor. Quiero ser honesta contigo con eso, porque pensaba que dormiría y no. Está igual que estaba. Subí yo esas escaleras y no me llevó nadie.',
      'Pero ahora sé cuáles eran las cuatro palabras. Dijo, entonces ya lo sabes. Y tenía razón, y eso es lo que no he conseguido superar en once años, que tenía razón y no me había visto en su vida.',
      'Ruth escribió que yo había sido su amiga desde que teníamos cinco años y que les pidieran que fueran amables conmigo. Escribió eso el día que iba a entregarme. Llevo once años con esa frase y no he terminado con ella.',
      'Volviste y preguntaste. Es lo único que quise nunca que hiciera alguien. Gracias por preguntar.',
    ],
  },
};
