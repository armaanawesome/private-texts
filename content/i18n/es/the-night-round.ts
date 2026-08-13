import type { CaseTranslation } from '../caseText';

/**
 * Case 3 — "La ronda de noche". Spanish.
 *
 * Four things this had to get right, in this order.
 *
 * 1. The three records. The case is one paper record disagreeing with one
 *    machine record, so each has exactly one Spanish name and never a second.
 *    `el libro de noche` is the night book in the blurb, in the briefing, in
 *    Margo’s mouth, in Claire’s, in the revelation and in the epilogue. `la
 *    ronda` is the round everywhere — Margo firma la ronda de las once y no la
 *    hace. `el llavero` is the fob, `de proximidad` where the English says
 *    "door fob" in full and bare where it says "fob", which is the same
 *    distinction the English makes. Two names for the night book is two books
 *    and the case stops working. `el libro de medicación` is deliberately a
 *    different book, exactly as the English keeps the medicines book apart.
 *
 * 2. Times. Every time survives in the same grammatical position, because the
 *    player solves this by holding two of them side by side. Ali signs out at
 *    `las diez menos veinte` in the briefing, in g6 and in the revelation. She
 *    is home from `las diez y cuarto`, asleep from `las diez y media`, and
 *    Teddy has her on the corridor at `las once y media` and back down the
 *    stairs at `las doce menos veinte`. Margo sits from `las once menos cinco`
 *    hasta `las once y veinte`, which is the pair that breaks her. 23:47 stays
 *    23:47 in Claire’s account, on the chip, in the revelation and in the
 *    press, because it is the one fact nobody can call a memory.
 *
 * 3. Names. People stay: Ivy, Ali (Alison in prose, as in the English), Margo,
 *    Teddy, Claire, and Lagos and Kilmarnock and Marchbank House with them.
 *    The descriptive places are translated, because "the day room" sitting
 *    untranslated inside a Spanish sentence reads as machine output: la sala de
 *    estar, el puesto de noche, el pasillo de la primera planta, el
 *    aparcamiento, la habitación de Ivy, la casa de Ali. Whichever way each one
 *    went, the chip and the sentence use the same words — that is the only
 *    reason a player can match one to the other.
 *
 * 4. Voice. Five people write differently and the difference is the character.
 *    Ivy is eighty-four, precise and dry, complete sentences, understatement
 *    doing the work ("Ese es precisamente el problema"). Margo is warm, runs on,
 *    exclaims, and leaves the final full stop off nearly every message, which
 *    the English does too. Teddy is clipped and exact and never estimates. Ali
 *    is formal and on the defensive and reaches for the passive when cornered.
 *    Claire writes like someone whose words may be read back to her. The player
 *    is lowercase, short, no opening ¿ or ¡, typing on a phone.
 *
 * Left in English on purpose: `el Keeper`, because it is the name the arc
 * antagonist gives himself across the fifteen packs and a player comparing
 * notes has to meet the same word in every language; and the British units and
 * money (`once millas`, `libras`), because the case is set in a British care
 * home and converting them would change facts rather than translate them.
 *
 * The player is `el ahijado de Ivy` in m1, so unlike the tutorial this case
 * states his gender and the coda can say `más rápido`.
 */
export const theNightRoundEs: CaseTranslation = {
  title: 'La ronda de noche',
  blurb:
    'Una firma en el libro de noche dice que alguien entró a verla a las once. No entró nadie.',

  characters: {
    you: 'Tú',
    ivy: 'Ivy',
    fen: 'Ali',
    margo: 'Margo',
    teddy: 'Teddy',
    saoirse: 'Claire',
  },

  places: {
    marchbank: 'Marchbank House',
    ivyroom: 'la habitación de Ivy',
    corridor: 'el pasillo de la primera planta',
    dayroom: 'la sala de estar',
    desk: 'el puesto de noche',
    carpark: 'el aparcamiento',
    fenhouse: 'la casa de Ali',
  },

  threads: {
    't-ivy': 'Ivy',
    't-marchbank': 'Familias de Marchbank',
    't-margo': 'Margo',
    't-teddy': 'Teddy',
    't-saoirse': 'Claire Nolan',
  },

  briefing: {
    causeOfDeath: 'Fallo cardíaco. Tenía ochenta y cuatro años y tenía corazón.',
    ruling: 'Registrado como muerte natural. La familia no pidió autopsia.',
    opening:
      'Ivy Rennick llevaba tres años en Marchbank House y se quejaba de ello por escrito, a diario, a quien le diera un número.\n\nSu hija la visitó el martes por la tarde y firmó la salida a las diez menos veinte. El libro de noche dice que alguien entró a verla a las once y otra vez a las dos. La encontraron a las siete de la mañana, fría, y la familia no pidió autopsia.',
  },

  messages: {
    // ------------------------------------------------------------------ t-ivy
    i1: 'La sopa era la misma sopa, querido. Lo tengo apuntado. El jueves y el martes, la misma sopa, y a una de las dos la llaman caldo.',
    i2: 'eres la única persona que conozco que lleva un cuaderno de sopas',
    i3: 'Llevo un cuaderno de todo. Les molesta.',
    i4: 'Alison viene a las siete. Ha puesto al teléfono esa voz suya que significa que quiere que firme algo.',
    i5: 'no firmes nada',
    i6: 'No he firmado nada desde marzo y ella lo sabe. Ese es precisamente el problema.',
    i7: 'Estoy en la sala de estar con Teddy. Está siendo poco amable con lo del crucigrama y se lo estoy consintiendo.',
    i8: 'Ya se ha ido. Estuvo aquí cincuenta minutos y cuarenta fueron sobre las cuotas.',
    i9: 'Llámame mañana y te cuento lo que me ha pedido. Quiero decirlo en voz alta a alguien que no cobre por estar aquí.',
    i10: 'a primera hora. a dormir',

    // ------------------------------------------------------------ t-marchbank
    g1: 'Escribo para informar a las familias de que hemos perdido a Ivy Rennick en la madrugada del miércoles. Su hija ya lo sabe y está con nosotros. Diremos más cuando haya más que decir.',
    g2: 'Lo siento muchísimo. Estuvo dos años en mi pasillo y ¡no me dejó pasar ni una sola!! La voy a echar muchísimo de menos',
    g3: 'Gracias a todos. Es evidente que a su edad no era algo inesperado. Preferimos que no haya autopsia y así se lo he dicho al médico de cabecera, así que os pido que nadie vuelva a proponérmelo.',
    g4: 'me escribió a las diez y diez. estaba bien a las diez y diez',
    g5: 'Tenía ochenta y cuatro años. Estar bien a las diez y haberse ido a medianoche es exactamente lo que pasa, y te pediría que tuvieras cuidado con la impresión que estás dando.',
    g6: 'Me fui a las diez menos veinte. Firmé la salida a las diez menos veinte. En casa a las diez y cuarto, en la cama a las diez y media. Como siempre.',
    g7: 'Dormida desde las diez y media. El móvil lo tengo en el rellano, se carga en el rellano, preguntad a cualquiera que me conozca.',
    g8: 'Nadie está insinuando nada. Pido que le demos una semana a la familia.',
    g9: 'Teddy ha estado preguntando por ti. A mí no me habla del tema, dice que soy personal. Está en la sala de estar desde las seis todas las mañanas por si quieres verle',

    // ---------------------------------------------------------------- t-margo
    m1: 'Tú eres el ahijado de Ivy, ¿verdad? Me enseñó tu foto unas cuatrocientas veces, ¡y no exagero!',
    m2: 'quién entró a verla esa noche',
    m3: 'Yo. Hago la ronda de las once y la de las dos en ese pasillo, está en el libro de noche con mis iniciales. Las once y las dos, todas las noches, catorce años llevo haciéndolo',
    m4: 'Estaba dormida. Eso es lo que escribí. Dormida, tranquila, sin incidencias',
    m5: 'viste a alguien más en el pasillo',
    m6: 'Oí un coche salir del aparcamiento muy tarde. Lo bastante tarde como para levantar la cabeza. Taxis tenemos, pero no a esa hora y no con ese motor, era un diésel y giró a la izquierda',
    m7: 'cómo sabes que era su coche',
    m8: 'Porque lleva tres años viniendo y llevo tres años oyendo ese motor. En el grupo no lo pienso decir y por favor no me obligues. Necesito este trabajo, tengo dos en casa',
    m9: 'Además yo estuve en el despacho con el libro de medicación desde la una hasta el relevo, así que habría oído cualquier otra cosa',

    // ---------------------------------------------------------------- t-teddy
    t1: 'Has tardado lo tuyo.',
    t2: 'Cuarenta y un años de aparejador. No duermo y no calculo las horas a ojo. Si te doy una hora, es una hora.',
    t3: 'Ivy estuvo conmigo en la sala de estar hasta las diez menos diez. Vino su hija, la recogió y se la llevó arriba. Es lo último que vi de ella.',
    t4: 'y después de eso',
    t5: 'Por la noche me siento en la puerta de la sala de estar porque mi sillón está ahí y mi cadera es la que es. Veo el puesto de noche y el pie de la escalera. Lo vi todo.',
    t6: 'Margo no subió a las once. Estuvo sentada en ese puesto desde las once menos cinco hasta las once y veinte con el teléfono pegado a la oreja y no se levantó ni una vez.',
    t7: 'No te lo cuento para que la echen. Habla con su madre en Lagos los martes por la diferencia horaria. Aquí lo sabe todo el mundo y aquí todo el mundo se lo deja pasar.',
    t8: 'La hija bajó la escalera a las doce menos veinte. A las once y media estaba en ese pasillo, porque oí la puerta de Ivy, y la puerta de Ivy lleva un año pidiendo un arreglo.',
    t9: 'No me vio. A mí la gente no me ve. Tiene sus ventajas.',
    t10: 'Ivy me dijo en septiembre que le habían dado un número. No quiso decirme cuál. Dijo que no se lo había contado a su hija y que no pensaba hacerlo, por lo que su hija haría con ello.',

    // -------------------------------------------------------------- t-saoirse
    s1: 'Te voy a contar algunas cosas y voy a ir con cuidado, porque tengo veintinueve residentes y una autorización que conservar.',
    s2: 'El libro de noche está firmado. Ese es un registro. Los llaveros de proximidad son otro registro y no coinciden, y yo no lo sabía hasta que me hiciste ir a mirar.',
    s3: 'El llavero de visita de Alison Reid abrió la puerta del aparcamiento hacia fuera a las 23:47. Antes de eso no hay ninguna lectura de entrada, porque la puerta de entrada estuvo toda la tarde calzada por la lavandería, que es otra conversación que estoy teniendo con otra persona.',
    s4: 'las cuotas',
    s5: 'Tres meses sin pagar. Alison tiene el poder notarial y lo tiene desde 2021. Le había escrito dos veces y la segunda carta decía que si llegaba a cuatro meses yo estaba obligada a dar parte a servicios sociales por las cuentas.',
    s6: 'Esa carta salió el viernes. La habría recibido el lunes. Ivy murió la noche del martes.',
    s7: 'Un parte significa que alguien de fuera de este edificio mira tres años de esa cuenta. Quiero decirlo con claridad: yo no pensé en ello como un móvil. Pensé en ello como una carta.',
  },

  /**
   * The clock times here are digits in both languages and stay digit for digit
   * identical to the English, because these are the chips the player lays side
   * by side. `11` in the Margo round chip is the hour she signed for, not a
   * clock time, and it stays a bare 11 for the same reason.
   */
  claims: {
    'c-ivy-dayroom': 'Ivy: en la sala de estar, 21:00–21:50',
    'c-fen-home': 'Ali: en casa, 22:15–24:00',
    'c-fen-asleep': 'Ali: dormida en casa, 22:30–24:00',
    'c-margo-round': 'Margo: hizo la ronda de las 11 de la noche, 23:00–23:20',
    'c-ivy-room': 'Ivy: en su habitación, 22:00–24:00 (según Margo)',
    'c-fen-driving': 'Ali: saliendo de Marchbank en coche, 23:25–23:45 (según Margo)',
    'c-margo-office': 'Margo: en el puesto de noche, 01:00–02:00',
    'c-teddy-dayroom': 'Teddy: en la puerta de la sala de estar, 23:00–00:30',
    'c-margo-desk': 'Margo: sentada en el puesto de noche, 23:00–23:15 (según Teddy)',
    'c-fen-corridor': 'Ali: en el pasillo de la primera planta, 23:30–23:40 (según Teddy)',
    'c-fen-carpark': 'Ali: en el aparcamiento, 23:47–23:57 (registro del llavero)',
  },

  motives: {
    'm-attorney':
      'Tiene el poder notarial desde 2021, las cuotas llevaban tres meses sin pagar, y un parte a servicios sociales a los cuatro meses habría puesto tres años de esa cuenta delante de alguien de fuera del edificio.',
  },

  contradictions: {
    'x-fen-corridor':
      'Firmó la salida a las diez menos veinte y se situó en casa desde las diez y cuarto. Teddy Balfour estuvo sentado en la puerta de la sala de estar con la escalera a la vista y oyó la puerta de Ivy a las once y media, y esa puerta lleva un año pidiendo un arreglo.',
    'x-fen-asleep':
      'Dormida desde las diez y media, dijo, con el móvil cargando en el rellano. Margo oyó un motor diésel salir del aparcamiento a esa hora y girar a la izquierda, y lleva tres años seguidos oyendo llegar ese motor.',
    'x-fen-carpark':
      'El libro de noche es una firma. El llavero de proximidad es una máquina. El suyo abrió la puerta del aparcamiento hacia fuera a las 23:47, dos horas después de la hora a la que dice que estaba en la cama y a once millas de donde dice que estaba.',
    'x-margo-round':
      'Margo firmó la ronda de las once y no la hizo. Estuvo sentada en el puesto con el teléfono pegado a la oreja, hablando con su madre en Lagos, como hace todos los martes por la diferencia horaria. Por eso nadie entró a ver a Ivy durante diez horas. Es motivo de despido y no es un asesinato, y todas las personas de ese edificio sabían lo de las llamadas del martes y se las dejaban tener.',
  },

  confrontation: {
    opening:
      'Has estado hablando con un hombre de noventa años que se pasa la noche sentado en una puerta y con una cuidadora que falsificó un registro. Por supuesto que te voy a escuchar, pero quiero que oigas cómo suena.',
    beats: {
      'r-corridor': {
        press:
          'Firmaste la salida a las diez menos veinte y te situaste en casa desde las diez y cuarto. Teddy oyó la puerta de tu madre a las once y media, y esa puerta se anuncia sola.',
        rebuttal:
          'Tiene noventa y un años y se sienta a oscuras. La mitad del tiempo no sabe ni qué día es, y tú has montado todo esto sobre él.',
      },
      'r-asleep': {
        press:
          'Dijiste dormida desde las diez y media. Margo oyó tu coche salir de ese aparcamiento y girar a la izquierda, y lleva tres años oyéndolo llegar todas las semanas.',
        rebuttal: 'Un diésel. En un pueblo lleno de diésel. Eso es lo que tienes.',
      },
      // r-carpark and r-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'r-carpark': {
        press:
          'Pues aquí tienes una que no es una persona. Tu llavero abrió la puerta del aparcamiento hacia fuera a las 23:47. La máquina no se sienta en una puerta y la máquina no necesita el trabajo.',
      },
      'r-why': {
        press:
          'Tres meses sin pagar, y la carta de Claire decía que a los cuatro meses había que dar parte a servicios sociales. Esa carta te llegó el lunes. Tu madre murió el martes.',
      },
    },
    deflections: [
      'Eso no es un hecho, eso es algo que alguien sintió.',
      'Tú no estuviste aquí en ninguno de los tres años. Venías de visita.',
      'Tráeme algo que no dependa de la memoria de nadie.',
    ],
    confession:
      'Estaba despierta cuando volví a subir. Siempre lo estaba. Dijo no enciendas la luz, y luego dijo ya sé lo que has estado haciendo, Alison, y lo dijo con cariño, que fue lo peor de todo.\n\nSujeté la almohada y conté y no se resistió mucho tiempo. No lo voy a describir mejor que eso. He tenido once semanas para encontrar una manera de decirlo que lo haga más pequeño y no la hay.\n\nY quiero contar lo otro, porque al final lo vas a encontrar y prefiero que salga de mí.\n\nUn hombre que se hacía llamar el Keeper me telefoneó el lunes por la noche. Dijo que era del equipo de cuidados continuados. Sabía lo que decía la carta. Sabía lo del parte, que fuera de ese despacho no lo sabía nadie, y entonces me dijo que a mi madre le habían dado de ocho a catorce meses en septiembre y que ella había pedido que no se lo dijeran a la familia.\n\nYo no lo sabía. Nunca me lo dijo. Él lo sabía y yo no, y lo dijo como se le dice la hora a alguien.\n\nLuego dijo: entonces el dinero tiene que durar más que ella, y la carta va primero. Y yo dije qué se supone que tengo que hacer. Y él no contestó durante un rato. Me dejó ahí, dentro de eso.\n\nY entonces dijo, en fin. Ya lo has pensado, o no me lo habrías preguntado.\n\nNunca me dijo que hiciera nada. Le he dado vueltas y más vueltas. Ni una sola vez me dijo que hiciera nada.',
  },

  coda: {
    from: 'Número desconocido',
    messages: [
      'Marchbank, entonces. Esta vez fuiste más rápido. Seis días.',
      'El viejo aparejador fue un golpe de suerte y no deberías felicitarte por él. Se lo iba a contar a alguien. A la cuidadora la manejaste bien, y me di cuenta.',
      'Querrás saber cómo tenía yo el número de septiembre. Quédate con esa. Es la pregunta interesante y todavía no la has hecho.',
      'Otro número la próxima vez. Como siempre.',
    ],
  },

  epilogue:
    'Al final la cuenta se miró. Cuarenta y un mil libras en tres años, y una domiciliación a un guardamuebles de Kilmarnock que nadie ha sido capaz de explicar nunca.\n\nA Margo Adeyemi la suspendieron once días por el libro de noche y luego la readmitieron sin ruido, porque Marchbank no podía cubrir el pasillo sin ella y porque escribieron veintinueve familias. Sigue teniendo la de las once y la de las dos. Ahora las hace.\n\nTeddy Balfour prestó declaración de una sentada, con horas, y el agente que se la tomó dijo después que era el relato más limpio que le habían dado nunca, de nadie de ninguna edad.\n\nEl cuaderno de Ivy estaba en el cajón. Tres años de anotaciones. La última entrada es la del martes, y dice: Alison, 7 de la tarde, quiere que firme. No firmé.',
};
