import type { CaseTranslation } from '../caseText';

/**
 * Case 2 — "La suplente". Spanish.
 *
 * Four things this had to get right, in this order.
 *
 * 1. The key. The case is a locked room resting on one object, so the object has
 *    exactly one name: `la llave del camerino`, with `la etiqueta roja` on it.
 *    Both chips say `la llave del camerino`, both revelations say it, Beatrice is
 *    pressed with it. Where the English shortens to "the key" mid-sentence the
 *    Spanish shortens to `la llave` the same way — that is a short form of one
 *    name, not a second name. A second name would be a second key and the locked
 *    room would have a way out of it.
 *
 * 2. Times. The interval is 20:05–20:40 and almost every time in the prose is
 *    written as words, because the English writes them as words: "ten past",
 *    "twelve past", "twenty to nine". Spanish cannot leave the hour implicit the
 *    way English can, so `ten past` is `las ocho y diez` — the same minute, said
 *    fully. The two that stay digits stay digits: the 20:12 train and the 20:51
 *    it actually arrived on, which is the whole of Dev being innocent, and J14,
 *    which is the seat Beatrice puts herself in.
 *
 * 3. Names. Diane, Beatrice, Dev, Nell, Joel Petrie, Sheffield and the Alhambra
 *    are people and places with names, and they keep them. The descriptive places
 *    are translated, because `the dressing room corridor` sitting untranslated
 *    inside a Spanish sentence reads as machine output: `el pasillo de los
 *    camerinos`, `la puerta de artistas`, `la sala`, `el escenario`, `la estación
 *    de tren`, `el camerino de Diane`. `la sala` is the auditorium as a whole,
 *    which matters — Beatrice claims the auditorium and Nell puts her at the back
 *    of the circle, and `el anfiteatro` is inside `la sala` exactly as the circle
 *    is inside the auditorium. Calling it `el patio de butacas` would have made
 *    those two places different and invented a contradiction the engine does not
 *    hold.
 *
 * 4. Voice. Beatrice writes like a woman dictating a letter: capitals, full
 *    stops, subordinate clauses, and the knife inside the good manners. Dev is
 *    lowercase and technical — `regiduría`, `avisos`, `las cajas`, `la puerta de
 *    artistas` — because he has called the show for twenty two years and types
 *    like it. Nell is lowercase and hedges: `es que`, `no sé`, `perdona`. Diane
 *    is lowercase and clipped, and never explains herself. That difference is the
 *    characterisation and it is the first thing a translation flattens.
 *
 * The theatre words are the real ones, not literal ones: `beginners` is `a
 * escena` because that is the call a Spanish stage manager gives, `the interval`
 * is `el entreacto`, `the prompt corner` is `regiduría`, `the wings` are `las
 * cajas`, `press night` is `la noche de prensa`.
 */
export const theUnderstudyEs: CaseTranslation = {
  title: 'La suplente',
  blurb:
    'Una primera actriz muere encerrada en su camerino la noche de prensa. Solo hay una llave, y dos personas dicen que la tenían.',

  characters: {
    you: 'Tú',
    coral: 'Diane',
    bea: 'Beatrice',
    dev: 'Dev',
    nell: 'Nell',
  },

  places: {
    theatre: 'el Alhambra',
    stage: 'el escenario',
    auditorium: 'la sala',
    corridor: 'el pasillo de los camerinos',
    dressing1: 'el camerino de Diane',
    stagedoor: 'la puerta de artistas',
    station: 'la estación de tren',
  },

  objects: {
    key1: 'la llave del camerino',
  },

  threads: {
    't-coral': 'Diane',
    't-company': 'Compañía del Alhambra',
    't-dev': 'Dev',
    't-nell': 'Nell',
    't-bea': 'Beatrice Kyd',
  },

  briefing: {
    causeOfDeath: 'Una sobredosis de su propia medicación.',
    ruling: 'Registrada como autoadministrada. La puerta estaba cerrada por dentro.',
    opening:
      'Diane Vane llevaba la gira a hombros desde Sheffield, y todo el mundo lo decía, casi siempre delante de ella.\n\nLa noche de prensa salió de escena en el entreacto, fue a su camerino y no volvió. La puerta estaba cerrada. La compañía siguió sin ella, y la suplente recibió el aviso que llevaba once meses esperando.',
  },

  messages: {
    // ---------------------------------------------------------------- t-coral
    cl1: 'noche de prensa. diecisiete de ellos esta noche y dos que importan',
    cl2: 'has hecho esto cien veces',
    cl3: 'no con Bea en el edificio. ha estado en la sala todas las noches de esta semana con un cuaderno y no escribe nada en él',
    cl4: 'quiere que deje de pedir. no voy a dejar de pedir',
    cl5: 'diane cuánto le has sacado',
    cl6: 'no lo digas así. la que conducía era ella. lo sabíamos dos y una de las dos lleva once años fingiendo que no',
    cl7: 'once mil este año. me lo ofreció ella, yo no lo pedí. y ella puede permitírselo y Joel Petrie no puede andar',
    cl8: 'sigue siendo algo que le estás haciendo',
    cl9: 'sé lo que es. después de esta noche se acabó de una manera o de otra. a escena. hablamos luego',
    cl10: 'diane',

    // -------------------------------------------------------------- t-company
    q1: 'Compañía. Diane murió anoche en su camerino. La policía ha venido y se ha marchado, y está conforme con que fue su propia medicación.',
    q2: 'Esta noche hay función. Ella habría insistido y no voy a fingir lo contrario. Nell sale a escena.',
    q3: 'yo no lo quiero así',
    q4: 'Nadie lo quiere así. Sales a las siete y media.',
    q5: 'la puerta estaba cerrada con llave. quiero decirlo en voz alta porque ahí dentro nadie lo dijo en voz alta',
    q6: 'hay una llave. una. la copia se perdió en Sheffield y nunca sacamos otra porque costaba cuarenta libras y Bea dijo que no',
    q7: 'y la llevé en el cinturón todo el entreacto, en regiduría, que es donde vive',
    q8: 'Dev. Aquí no.',
    q9: 'Y tú no estuviste en el edificio todo ese rato, así que te ruego que midas la seguridad con la que hablas.',
    q10: 'eso no es justo y sabes que no lo es',
    q11: 'me escribió a las siete. dijo que después de esta noche se acababa de una manera o de otra',
    q12: 'Decía muchas cosas a mucha gente. Esa era, en buena medida, la dificultad con ella.',
    q13: 'fue amable conmigo. fue la única que lo fue',
    q14: 'pregúntale a Nell dónde estaba a las ocho y diez. vio más de lo que ha dicho aquí',

    // ------------------------------------------------------------------ t-dev
    d1: 'perdona por lo de ahí dentro. llevo veintidós años dando avisos y nunca he perdido a nadie en un entreacto',
    d2: 'dijo que no estabas en el edificio',
    d3: 'iba a estarlo. nuestra ambientadora llegaba en el tren de las 20:12 y dije que bajaba a buscarla, son cuatro minutos',
    d4: 'el de las 20:12 llevaba cuarenta minutos de retraso. entró a las 20:51. no me moví de la puerta de artistas, me quedé en ella fumando y mirando el panel en el móvil',
    d5: 'Nell pasó por delante dos veces. ella te lo dirá. estaba en el pasillo a las ocho y cinco esperando a que le dijeran que no hacía falta, como todas las noches',
    d6: 'y Beatrice',
    d7: 'Bea bajó por el pasillo sobre las ocho y doce y volvió a subir sobre las ocho y veinte. la vi desde la puerta. no le di importancia, va donde quiere',
    d8: 'Diane bajó a las ocho y diez y ya no la vi más. di el aviso de la segunda parte y no vino y pensé que estaba haciendo la Diane con lo de las críticas',
    d9: 'llevo toda la noche dándole vueltas. si hubiera bajado a las ocho y veinte en vez de quedarme allí plantado como un poste',

    // ----------------------------------------------------------------- t-nell
    e1: 'Dev dijo que querrías hablar conmigo. todo el mundo piensa que fui yo. yo también pensaría que fui yo',
    e2: 'once meses de meterme en el vestido y volver a quitármelo. puedes decirlo. es lo que parece',
    e3: 'dónde estabas en el entreacto',
    e4: 'en el pasillo, de las ocho y cinco a las ocho y doce, de pie en la puerta de vestuario esperando a que Dev me dijera que no salía. luego arriba a las cajas para la segunda parte porque la veo desde ahí',
    e5: 'y después estuve en el escenario desde las nueve menos veinte delante de cuatrocientas personas',
    e6: 'Dev dice que viste más de lo que contaste',
    e7: 'Bea pasó por mi lado sobre las ocho y diez. llevaba la llave en la mano. yo conozco esa llave, tiene la etiqueta roja que le puso Dev para que dejara de perderse',
    e8: 'no lo dije en el grupo porque ella me da el trabajo. ella me va a dar todos los trabajos que tenga en esta ciudad',
    e8b: 'dice que estuvo dando notas en el entreacto',
    e8c: 'nadie recibió ninguna nota. pregúntale a cualquiera. es que yo subo por el fondo del anfiteatro para llegar a las cajas porque en el entreacto cierran la puerta de paso, y ella estaba de pie arriba del todo con el móvil, de espaldas a la sala, todo el rato que estuve pasando',
    e9: 'ahora lo estás diciendo',
    e10: 'porque anoche salí con su vestido y me quedaba bien, y desde entonces me da asco pensarlo. fue amable conmigo y fue horrible con Bea. no sé qué hacer con eso',

    // ------------------------------------------------------------------ t-bea
    b1: 'No has parado. Dos personas de mi compañía han dejado de mirarme a los ojos y no creo que sea casualidad.',
    b2: 'Estuve en la sala desde las ocho y cinco hasta que subió el telón de la segunda parte. Me siento en la J14 todas las noches de todas las temporadas y cuarenta personas podrían describirte la nuca.',
    b3: 'Y estaba trabajando. En una noche de prensa doy notas en el entreacto, siempre, porque son los únicos veinte minutos en los que alguien escucha.',
    b4: 'te estaba sacando dinero',
    b5: 'Lo estaba. Once mil este año, diecinueve el anterior. Lo pagué todo y habría seguido pagándolo. La alternativa era que Joel Petrie leyera sobre mí en un periódico.',
    b6: 'Conducía yo. Eso es todo. Hace once años, en una carretera mojada a las afueras de Sheffield, con la furgoneta de la compañía y dos personas dentro, y una de ellas no ha vuelto a ponerse de pie.',
    b7: 'Ni una sola vez he dicho que no fuera yo. Dije que fue la carretera. Diane iba en el asiento del copiloto y sabía que no fue la carretera.',
    b8: 'y la semana pasada dijo que se acababa de una manera o de otra',
    b9: 'Sí. Se acababa en el sentido de que iba a decirlo. En una noche de prensa. Con diecisiete de ellos dentro.',
    b10: 'Nada de eso me pone en ese pasillo. Ten cuidado con lo que crees que tienes.',
  },

  /**
   * Digits here are digits in both languages and stay identical to the English,
   * because these are the twelve lines the player lays side by side on the board.
   * The two that break the locked room are the two llave chips.
   */
  claims: {
    'c-coral-stage': 'Diane: en el escenario, 19:00–20:05',
    'c-key-dev': 'Dev: tenía la llave del camerino, 19:50–20:40',
    'c-dev-station': 'Dev: en la estación, 20:05–20:35 (según Beatrice)',
    'c-dev-stagedoor': 'Dev: en la puerta de artistas, 19:50–20:40',
    'c-bea-corridor': 'Beatrice: en el pasillo, 20:12–20:22 (según Dev)',
    'c-coral-dressing': 'Diane: en su camerino, 20:10–20:40',
    'c-nell-corridor': 'Nell: en el pasillo, 20:05–20:12',
    'c-nell-stage': 'Nell: en el escenario, 20:40–22:00',
    'c-key-bea': 'Beatrice: tenía la llave del camerino, 20:10–20:20 (según Nell)',
    'c-bea-call': 'Beatrice: sola al teléfono, 20:10–20:20 (según Nell)',
    'c-bea-auditorium': 'Beatrice: en la sala, 20:05–20:45',
    'c-bea-notes': 'Beatrice: dando notas del entreacto, 20:05–20:25',
  },

  motives: {
    'm-sheffield':
      'Diane llevaba dos años sacándole dinero por el accidente de Sheffield, y había decidido decirlo en voz alta la noche de prensa.',
  },

  contradictions: {
    'x-key':
      'Hay una llave y hay una sola llave desde Sheffield. Dev dice que la llevaba en el cinturón, en regiduría; Nell vio a Beatrice bajar por el pasillo con ella cogida por la etiqueta roja. No pueden ser verdad las dos, y solo una de ellas cierra una puerta desde fuera y la deja con aspecto de estar cerrada por dentro.',
    'x-bea-corridor':
      'Se colocó en la J14 durante todo el entreacto, donde cuarenta personas le conocen la nuca. Dev la vio bajar por el pasillo de los camerinos a las ocho y doce y volver a subir a las ocho y veinte, desde una puerta de artistas de la que no se movió.',
    'x-bea-notes':
      'Notas del entreacto en una noche de prensa, dijo, porque son los únicos veinte minutos en los que alguien escucha. Aquella noche nadie de la compañía recibió ninguna nota. Estuvo al teléfono a oscuras al fondo del anfiteatro, sola, todo el rato.',
    'x-dev-train':
      'El de las 20:12 llevaba cuarenta minutos de retraso y no llegó hasta las 20:51, así que Dev no tenía ningún tren al que bajar y no se movió de la puerta de artistas. Era la única persona del edificio que veía ese pasillo durante todo el entreacto, y fue Beatrice quien intentó sacarlo de ahí.',
  },

  confrontation: {
    opening:
      'Siéntate. He dirigido cuarenta y un montajes y no he llegado tarde ni una sola vez a una conversación difícil, así que dilo bien.',
    beats: {
      'u-key': {
        press:
          'Hay una sola llave. Dev la llevaba en el cinturón todo el entreacto, y Nell te vio bajar por el pasillo con ella cogida por la etiqueta roja.',
        rebuttal:
          'A Nell le gustaría mi puesto y lo quiere desde marzo. Pon a una chica de diecinueve años delante de un policía y recordará lo que haga falta para salir de la habitación.',
      },
      'u-corridor': {
        press:
          'Te colocaste en la J14 durante todo el entreacto. Dev te vio bajar por ese pasillo a las ocho y doce y volver a subir a las ocho y veinte.',
        rebuttal:
          'Dev lleva veintidós años dando avisos durmiendo cuatro horas por noche. Es un hombre maravilloso y no sabría decirte qué ha comido hoy.',
      },
      'u-notes': {
        press:
          'Dijiste que estabas dando notas del entreacto. Ni una sola persona de esa compañía recibió una nota. Estabas al teléfono al fondo del anfiteatro, sola, a oscuras.',
        rebuttal: 'Y una mujer puede hacer una llamada de teléfono.',
      },
      'u-why': {
        press:
          'Diecinueve mil un año y once mil al siguiente, por once años de que fuera la carretera y no tú. Y había decidido decirlo la noche de prensa.',
      },
    },
    deflections: [
      'Eso no es una prueba, eso es un estado de ánimo.',
      'Llevas cuatro días en este edificio. Yo llevo en él desde marzo.',
      'Inténtalo otra vez, y esta vez con algo que yo no pudiera desmontar delante de un jurado.',
    ],
    confession:
      'Salió de escena en el entreacto y venía encendida. No era crueldad. Eso es lo que la gente no va a entender de ella. No estaba siendo cruel, estaba siendo *libre*, por fin, después de once años cargando con ello por mí.\n\nDijo que les había dicho a los dos críticos que iba a darles algo mejor que la función. Lo dijo como se da una buena noticia.\n\nTenía la llave en la mano porque había bajado a pedirle que no lo hiciera. Solo bajé para eso. Quiero que eso quede escrito en alguna parte.\n\nSe rio de mí, y se han reído de mí personas mejores, y luego se dio la vuelta hacia el espejo y empezó a quitarse la cara, y dijo no me tapes la luz.\n\nY le puse las pastillas delante y me senté en la otra silla y no dije una sola palabra para detenerla. Eso es lo que hice. No la obligué a tomárselas. Simplemente no dije lo que la habría detenido, y sé exactamente cuánto tiempo estuve sin decirlo.',
  },

  epilogue:
    'Encontraron el segundo vaso en el fregadero, fregado, y la llave con la etiqueta roja todavía tibia en el bolsillo de su abrigo cuando la policía por fin le pidió que lo vaciara.\n\nNell hizo toda la temporada y siguió con el montaje cuando cambió de teatro, y estuvo muy bien, y no ha hablado ni una sola vez con un periodista de nada de esto.\n\nA Joel Petrie le escribió un abogado en primavera. Llevaba once años sabiendo lo de la carretera. Dijo que lo único que había querido siempre era que alguien lo dijera en voz alta sin que él tuviera que pedirlo.',
};
