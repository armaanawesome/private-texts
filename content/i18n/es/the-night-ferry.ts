import type { CaseTranslation } from '../caseText';

/**
 * Case 14 — «El ferry nocturno». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`. The finale is Pack 15.
 *
 * Seven things this had to get right.
 *
 * 1. The port call that did not happen. `Kirkwall` is a place the ship never
 *    reached, so the words for reaching it have to be unambiguous and constant:
 *    `la escala` is the call, `atracados` is alongside, `la rampa de acceso` is
 *    the linkspan, `largar amarras` is letting go. Dougie says all four as
 *    though he were there. Senga says the call was `anulada` and that no
 *    `pasarela` was rigged because there was nothing to rig one to. If the two
 *    accounts stop using the same vocabulary the player has nothing to lay side
 *    by side.
 *
 * 2. Ship time, which is a voice and not a format. Hannah was a purser for
 *    twenty-six years and writes `1730` and `2106` — four digits, no colon,
 *    the way a deck department writes a time. Nobody else in the pack does it.
 *    Senga writes `21:00`, `21:04`, `22:25`, `23:40`, because she is quoting
 *    logs. Everybody else speaks their times. Three registers, and the middle
 *    one is what convicts him, so none of them may drift into another.
 *
 * 3. Names and places. People, ships and ports stay: Hannah Pirie, Dougie and
 *    Douglas Yarrow, Sheila Kinnaird, Eck Tulloch, Senga Moar, la enfermera
 *    Bhatti, el MV Roost, la Rona, Kirkwall, Lerwick, Aberdeen, Peterhead,
 *    Aliaga, Ewan MacColl, Police Scotland. The victim is `Mamá` in the
 *    character table because that is how the player has her saved, and `Hannah
 *    Pirie` in the briefing and in other people's mouths, exactly as the
 *    English has it.
 *
 *    Places that are descriptions are translated: el bar Magnus, la cubierta de
 *    popa, el pasillo de camarotes de la cubierta 6, el camarote enfermería del
 *    barco, Kirkwall atracados. Spanish `del` would swallow the article on the
 *    two that carry chips, so `el MV Roost` (s3) and `el bar Magnus` (d3) are
 *    each said in full at least once.
 *
 * 4. Merchant-navy register, which is what makes Dougie's lie legible as a lie
 *    to anybody who has been to sea and invisible to everybody else: la
 *    sobrecargo, camarero de comedor, personal de fonda, título de competencia,
 *    capitán de la marina mercante, el diario de cubierta, la megafonía, las
 *    pantallas de información al pasaje, el libro de objetos perdidos, fuerza
 *    seis. `s9` is the sentence the whole pack rests on and it names two of
 *    those in one breath.
 *
 * 5. Voice. Four positions, all present in the English and all kept:
 *
 *    - Hannah writes in capitals and finishes, except n10, which ends on `x`.
 *      It is the last message she sends.
 *    - Dougie writes in capitals and finishes every sentence, and the formality
 *      is the performance.
 *    - Sheila is lowercase and never lands a full stop, with one word shouted
 *      in capitals — `ENCANTADA` in m4, which is the moment the case turns on.
 *    - Senga writes like a deck officer: capitals, full stops, no adjectives she
 *      cannot support.
 *
 *    Eck is the loss. His English is Scots — `Aye`, `she will have wrote it
 *    down`, `kens`, `to no ken` — and Spanish has no register that maps onto it
 *    without turning him into a comic yokel, which would wreck a character
 *    whose whole function is to be wrongly suspected. So the axis moves to
 *    sentence length and a repeated tag: his sentences are the shortest in the
 *    pack and he closes e1 and e8 with a bare `Sí.`, which is where the English
 *    puts `Aye.`
 *
 * 6. The player has no gender. s1 carries a comment in the English recording
 *    that it says `because she was your mother` rather than `because you are
 *    her son`, and the Spanish follows with `porque era tu madre`. The
 *    confrontation opening avoids `ser cuidadoso` by using `Te conviene tener
 *    cuidado`, and the third deflection reaches the player through `tu madre`
 *    rather than through anything agreeing.
 *
 *    A gendered noun is only a defect when it is an address. `mi hermana`,
 *    `mi mujer`, `mi madre` and `tu madre` are facts about the speaker or about
 *    the dead woman, and they stay.
 *
 * 7. Units and ship's numbers stay as the English states them: `fuerza seis`,
 *    `seis millas`, `camarote 6042`, `1730`, `2106`.
 */
export const theNightFerryEs: CaseTranslation = {
  title: 'El ferry nocturno',
  blurb:
    'Puede contarte exactamente qué hizo mientras el barco estaba atracado en Kirkwall. El barco no hizo escala en Kirkwall.',

  characters: {
    you: 'Tú',
    hannah: 'Mamá',
    dougie: 'Dougie',
    marisa: 'Sheila',
    eck: 'Eck',
    senga: 'Senga Moar',
  },

  places: {
    ship: 'el MV Roost',
    bar: 'el bar Magnus',
    afterdeck: 'la cubierta de popa',
    cabins: 'el pasillo de camarotes de la cubierta 6',
    hospital: 'el camarote enfermería del barco',
    kirkwall: 'Kirkwall, atracados',
  },

  objects: {
    phone: 'el móvil de Hannah, con funda verde y un pájaro',
  },

  threads: {
    't-hannah': 'Mamá',
    't-crossing': 'Roost, travesía del martes',
    't-dougie': 'Dougie Yarrow',
    't-marisa': 'Sheila',
    't-eck': 'Eck',
    't-senga': 'Senga Moar',
  },

  briefing: {
    causeOfDeath:
      'Caída contra un herraje de cubierta. La encontró un tripulante en la ronda, en la cubierta de popa, a las 23:10.',
    ruling:
      'Abierto. Había fuerza seis y la cubierta de popa estaba mojada, y las cuatro primeras personas a las que se preguntó dijeron todas la misma palabra, que fue accidente.',
    opening:
      'Hannah Pirie fue sobrecargo durante veintiséis años, en cuatro barcos, y llevaba seis jubilada.\n\nIba en el barco del martes rumbo al norte porque ahora vives en Lerwick y llevaba una bolsa con tu regalo de cumpleaños dentro. La encontraron en la cubierta de popa a las once y diez.\n\nSe sabía todas las cubiertas de todos los barcos en los que navegó y no era una mujer que se cayera.',
  },

  messages: {
    // --------------------------------------------------------------- t-hannah
    n1: 'Reservado. El martes, camarote y no butaca, tengo sesenta y un años y me he ganado una puerta.',
    n2: 'no traigas nada',
    n3: 'He traído algo. Déjalo ya.',
    n4: 'Salida a las 1730 clavadas. Sigue siendo la única compañía del norte que sale cuando dice que va a salir.',
    n5: 'La cena bien. Hay marejada y medio bar se ha quedado muy callado y yo me lo estoy pasando enormemente bien.',
    n6: 'No te vas a creer quién está sentado a un metro de mí. Dougie Yarrow. Estuvo conmigo en la Rona en 2003 y no le echaba la vista encima desde hace veintidós años.',
    n7: 'quién',
    n8: 'Camarero de comedor. Cantaba precioso. Se marcó un Ewan MacColl en la fiesta de Navidad que dejó hechos polvo a cuatro hombretones.',
    n9: 'Se ha puesto un poco raro conmigo. Creo que lo he avergonzado y no era mi intención, yo solo me alegraba.',
    n10: 'Salgo atrás cinco minutos. Ahí fuera está bravo. 2106. Buenas noches, cariño x',

    // ------------------------------------------------------------- t-crossing
    g1: 'Este grupo es para el pasaje de la travesía del martes rumbo al norte que ha pedido que se le mantenga informado. Soy la segunda oficial y lo he creado porque cuarenta de ustedes llamaron a la oficina en una sola mañana.\n\nUna pasajera falleció a bordo el martes por la tarde. Police Scotland tiene los registros del buque y está hablando con la gente individualmente.',
    g2: 'estuvo dos horas en mi bar y era la mejor compañía de ese barco. eso es todo lo que quiero decir aquí',
    g3: 'Una tragedia, y mi pésame a la familia. Yo le diría a todo el mundo que la cubierta de maniobra de popa no debería ser accesible al pasaje con fuerza seis y así se lo he dicho al capitán. Treinta y un años en la mar y no he visto nunca esa puerta trincada abierta.',
    g4: 'La cubierta de popa es cubierta de pasaje y está abierta con cualquier tiempo por debajo de fuerza ocho. La puerta no estaba trincada abierta.',
    g5: 'dougie tú estuviste en el bar hasta las nueve y media no te acercaste a esa puerta con fuerza seis',
    g6: 'Por favor, esto aquí no. Lo que tenga cualquiera, que se lo dé al oficial que lleva el caso, y yo le paso un número a quien lo quiera.',

    // --------------------------------------------------------------- t-dougie
    d1: 'Siento mucho tu pérdida. Tu madre y yo servimos juntos en la Rona y era una sobrecargo de primera, y eso se lo digo a quien me lo pregunte.',
    d2: 'estabas en el bar con ella',
    d3: 'Me tomé una copa en el bar Magnus desde las ocho y media más o menos. Hablamos un momento. Estaba de buen humor y no hubo absolutamente nada entre nosotros, insinúe lo que insinúe quien sea en un grupo de mensajes.',
    d4: 'y después',
    d5: 'Subí arriba para la escala de Kirkwall. Siempre lo hago. A las nueve y media atracados, y estuve en el extremo de la rampa de acceso fumándome un cigarro al abrigo de la terminal hasta que largamos amarras a las once menos cuarto. Cualquiera que haga esta ruta a menudo te dirá que esa es la mejor hora de la travesía.',
    d6: 'Treinta y un años en la mar, casi todos en el puente, y esa aproximación la he hecho con peor tiempo que el del martes.',
    d7: 'su móvil estaba detrás de la barra',
    d8: 'Porque lo puse yo ahí. Volví a pasar por el Magnus sobre las diez y diez y estaba encima de una mesa junto a la puerta de popa, con funda verde, y se lo di a la chica que estaba de servicio. Eso lo habría hecho por cualquiera.',
    d9: 'Yo miraría más cerca de casa. En esa cubierta había el martes un hombre con unos antecedentes así de largos y todo el barco se sabe su nombre, y me llama la atención que nadie ponga eso en un grupo.',

    // --------------------------------------------------------------- t-marisa
    m1: 'hago cuatro noches por semana detrás de esa barra y acabas siendo muy buena distinguiendo a quien se lo está pasando bien. tu madre se lo estaba pasando bien',
    m2: 'entró sobre las ocho y media después de cenar y se sentó en la punta donde está la repisa. se tomó una ginebra en toda la noche y la hizo durar como una profesional',
    m3: 'y dougie yarrow llevaba dando la charla en esa barra desde aberdeen. capitán de la marina mercante. treinta y un años. primer oficial en los petroleros. me ha contado las mismas cuatro historias en seis travesías y me he reído con todas porque el trabajo es ese',
    m4: 'ella va y dice dougie yarrow. tú estuviste conmigo en la rona, tú llevabas el comedor. y estaba ENCANTADA. le hizo muchísima ilusión verlo. dijo algo de que cantaba en una fiesta de navidad',
    m5: 'habría unas ocho personas en esa punta de la barra. nadie se rió de él. quiero dejarlo claro porque le he dado vueltas. no se rió nadie',
    m6: 'se puso del color de la moqueta y se sentó y no volvió a decir ni una palabra. ella salió por la puerta de popa sobre las nueve y cinco a tomar el aire y se dejó el móvil en mi mostrador, y yo lo puse en la estantería de debajo de la caja',
    m7: 'él salió detrás sobre las nueve y veinte. lo vi cruzar la puerta de popa porque estaba recogiendo la repisa y hay que asomarse por delante de ella. no estuvo fuera dos minutos y no estuvo fuera una hora, no te lo sabría decir, aquello estaba petado',
    m8: 'dice que entregó el móvil a las diez y diez',
    m9: 'a mí no me entregó nada. pregúntale a senga, ella tiene el libro de objetos perdidos y tiene la caja del bar y tiene todas las puertas de ese barco en un registro. senga moar no adivina nada',
    m10: 'y antes de que nadie empiece con eck tulloch. todo el mundo empieza con eck tulloch. está en ese barco dos veces al mes y ha estado en la cárcel y te lo dirá él mismo en los diez primeros minutos',

    // ------------------------------------------------------------------ t-eck
    e1: 'Hice cuatro años en Peterhead entre 1979 y 1983 por una cosa que sí hice. Lo digo lo primero para que nadie tenga que ir acercándose. Sí.',
    e2: 'Hago esa travesía dos veces al mes para ver a mi hermana. Cuarenta años. Ese barco lo recorro con los ojos cerrados.',
    e3: 'estabas en la cubierta de popa',
    e4: 'Antes sí. Antes de la cena. Salgo a fumar y me pongo siempre en la misma esquina y la tripulación lo sabe.',
    e5: 'Desde las nueve y cinco estuve en el camarote enfermería con la enfermera, tomándome la tensión. Es una cosa que tengo que hacer y ella firma el libro. Estuve ahí hasta las diez y veinticinco porque me hizo sentarme hasta que bajó.',
    e6: 'Se apellida Bhatti. Lo habrá apuntado. En un barco se apunta todo, eso es lo único que tiene un barco.',
    e7: 'hicimos escala en kirkwall',
    e8: 'No. Salió por megafonía a las nueve y estuvo en las pantallas toda la noche. La rampa de acceso, averiada. Pasamos de largo y llegamos temprano a Lerwick y yo estaba en el muelle a las seis y media sin nada abierto. Sí.',
    e9: 'Cualquiera que fuera en ese barco y estuviera despierto sabe que no entramos. Habrías tenido que estar dormido en uno de los camarotes con la puerta cerrada para no enterarte.',

    // ---------------------------------------------------------------- t-senga
    s1: 'Segunda oficial, once años en la compañía. Todo esto se lo he dado a Police Scotland y te lo doy a ti porque era tu madre y porque me has hecho una pregunta directa.',
    s2: 'La escala de Kirkwall se anuló a las 21:00. La rampa de acceso de allí tuvo una avería hidráulica el lunes. Salió dos veces por megafonía, estuvo en las pantallas de información al pasaje de todas las cubiertas desde las 21:00 hasta que atracamos, y consta en el diario de cubierta de puño y letra del capitán.',
    s3: 'No paramos. No se armó ninguna pasarela porque no había nada a lo que armarla. No bajó nadie a tierra, no subió nadie a bordo, y el MV Roost no alteró el rumbo en seis millas a la redonda de Kirkwall.',
    s4: 'el móvil',
    s5: 'Entró en el libro de objetos perdidos a las 21:04 con la letra de Sheila Kinnaird, funda verde, encontrado en el mostrador del bar. Estuvo en la estantería de debajo de la caja desde entonces hasta que se lo cogí a ella a las 23:40 y lo metí en la caja fuerte. No hubo nadie entregándole nada a nadie a las diez y diez.',
    s6: 'Te voy a decir lo que no te ha dicho nadie, que es que lo primero que pensó la tripulación fue Eck Tulloch. Estuvo en la cubierta de popa antes de la cena, tiene una condena de 1979, y es el nombre que sale en ese barco cada vez que pasa cualquier cosa.',
    s7: 'Estuvo en el camarote enfermería con la enfermera Bhatti de 21:05 a 22:25 y ella lo firmó a la entrada y a la salida. Te doy las dos mitades porque prefiero que oigas la acusación de mi boca con la respuesta pegada.',
    s8: 'y yarrow',
    s9: 'Douglas Yarrow navegó con esta compañía nueve años como personal de fonda y se fue en 2011. No ha tenido nunca un título de competencia. Eso no es un secreto, está en una lista de tripulación, y ni una sola persona de ese bar tenía motivo para ir a mirarlo.',
    s10: 'Llevo en barcos desde los diecinueve años y he conocido a muchos hombres que se han subido un grado contándolo. Suele ser inofensivo y suele ser triste. No supe qué hacer con ello y sigo sin saberlo.',
  },

  /**
   * Digit for digit identical to the English. `c-phone-dougie` and
   * `c-phone-marisa` are the same unique object in two pairs of hands, which is
   * the whole force of `x-phone` — he needed a reason to have been aft and
   * picked the one object in the bar that was already written down.
   */
  claims: {
    'c-dougie-bar': 'Dougie: en el bar Magnus, 20:30–21:05 (según Sheila)',
    'c-dougie-kirkwall': 'Dougie: en tierra en Kirkwall, 21:30–22:45',
    'c-phone-dougie': 'Dougie: tenía el móvil de Hannah, 22:10–22:25',
    'c-hannah-bar': 'Hannah: en el bar Magnus, 20:30–21:00 (según Sheila)',
    'c-hannah-afterdeck': 'Hannah: en la cubierta de popa, 21:05–22:10 (según Sheila)',
    'c-dougie-afterdeck': 'Dougie: en la cubierta de popa, 21:35–22:00 (según Sheila)',
    'c-eck-hospital': 'Eck: en el camarote enfermería del barco, 21:05–22:25',
    'c-dougie-aboard': 'Dougie: a bordo del MV Roost, 21:00–23:00 (según el diario de cubierta)',
    'c-phone-marisa': 'Sheila: tenía el móvil de Hannah, 21:04–23:00 (libro de objetos perdidos)',
    'c-marisa-bar': 'Sheila: detrás del bar Magnus, 20:00–23:00 (según Senga)',
    'c-eck-afterdeck': 'Eck: en la cubierta de popa, 21:30–22:00 (versión de la tripulación)',
  },

  motives: {
    'm-messroom':
      'Llevaba seis travesías contándole al bar Magnus que era capitán de la marina mercante, treinta y un años, primer oficial en los petroleros. Hannah Pirie navegó con él en la Rona en 2003 y lo reconoció, y lo dijo delante de ocho personas, y le hizo ilusión verlo. No estaba siendo cruel. Se alegraba.',
  },

  contradictions: {
    'x-dougie-deck':
      'Se sitúa en tierra en Kirkwall desde las nueve y media. Sheila Kinnaird lo vio cruzar la puerta de popa sobre las nueve y veinte, porque estaba recogiendo la repisa y hay que asomarse por delante de esa puerta para hacerlo. No te sabría decir cuánto tiempo estuvo fuera. Sí te sabe decir que salió.',
    'x-dougie-kirkwall':
      'No hubo escala en Kirkwall. La rampa de acceso se averió el lunes y la escala se anuló a las 21:00, anunciada dos veces por megafonía y puesta en las pantallas del pasaje de todas las cubiertas hasta Lerwick. No se armó ninguna pasarela porque no había nada a lo que armarla, y el buque no alteró el rumbo en seis millas a la redonda del sitio. Estuvo a bordo toda la hora que dice que pasó fumando en el extremo de la rampa, al abrigo de una terminal que no llegó a ver.',
    'x-phone':
      'Necesitaba un motivo para haber estado a popa, así que se lo inventó, y eligió el objeto equivocado. Hannah dejó el móvil en el mostrador del bar cuando salió a tomar el aire. Entró en el libro de objetos perdidos a las 21:04 con la letra de Sheila Kinnaird, funda verde, y se quedó en la estantería de debajo de la caja hasta que la segunda oficial lo metió en la caja fuerte a las 23:40. No le entregó nada a nadie a las diez y diez.',
    'x-eck':
      'Lo primero que pensó la tripulación fue Eck Tulloch, porque estuvo ahí fuera antes de la cena, por cuatro años en Peterhead en 1979, y porque el suyo es el nombre que sale en ese barco cada vez que pasa cualquier cosa. Estuvo en el camarote enfermería con la enfermera Bhatti de 21:05 a 22:25, firmado a la entrada y a la salida, sentado quieto hasta que le bajó la tensión.',
  },

  confrontation: {
    opening:
      'Te conviene tener cuidado. Tengo treinta y un años en la mar y una reputación en esta costa, y he sido muy paciente con una familia que está pasándolo mal.',
    beats: {
      'a-deck': {
        press:
          'Te sitúas en tierra desde las nueve y media. Sheila Kinnaird te vio salir por la puerta de popa veinte minutos antes de eso.',
        rebuttal:
          'Una chica de treinta y cuatro años, con la gente de cuatro en fondo en la barra, con fuerza seis, atendiendo una caja. Yo no condenaría ni a un perro con eso y tú tampoco.',
      },
      'a-phone': {
        press:
          'Dijiste que encontraste su móvil junto a la puerta de popa a las diez y diez y que lo entregaste. Se registró en objetos perdidos a las nueve y cuatro minutos y no se movió de la estantería de debajo de la caja.',
        rebuttal:
          'Pues el libro está mal, o la chica lo escribió al final de su turno, que es lo que hacen todas. Tú no has trabajado nunca en una barra.',
      },
      // a-kirkwall and a-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'a-kirkwall': {
        press:
          'Te pasaste una hora fumando en la rampa de acceso de Kirkwall. La rampa se averió el lunes, la escala se anuló a las nueve, y el barco no se acercó a menos de seis millas.',
      },
      'a-why': {
        press:
          'Dijo que estuviste con ella en la Rona y que llevabas el comedor. Le hizo ilusión verte. En esa barra no se rió nadie.',
      },
    },
    deflections: [
      'Pregunta por Dougie Yarrow a cualquiera de esta costa. Venga. Pregúntales.',
      'Le estás dando crédito a una camarera y a un hombre que hizo cuatro años en Peterhead.',
      'Tu madre se avergonzaría de lo que le estás haciendo a un hombre que navegó con ella.',
    ],
    confession:
      'Yo oí el aviso. Esa es la parte que me gustaría corregir, porque ya van dos veces que me la plantean como si me lo hubiera dormido.\n\nLo oí en el bar a las nueve en punto y lo oí entero.\n\nY cuatro días después, cuando el oficial me pidió que diera cuenta de mi tarde, abrí el horario en el móvil y leí en voz alta lo que tendría que haber pasado, y lo hice sin pestañear, porque esa es la versión en la que vivo desde 2011 y ahí dentro se está más cómodo.\n\nLo dijo con cariño. Quiero que eso quede escrito. Dijo Dougie Yarrow, tú estuviste conmigo en la Rona, tú llevabas el comedor, y estaba encantada, y lo decía de corazón, y me preguntó por mi madre.\n\nOcho personas. No se rió nadie. He repasado ese bar cara por cara y no se rió ni uno, y quiero que entiendas que eso lo empeoró y no te sé explicar por qué.\n\nSalí detrás de ella a pedirle que no lo volviera a decir. A eso salí y a nada más. Le dije Hannah, hazme un favor, y me miró — y me iba a tratar con cariño. La vi prepararse para tratarme con cariño.\n\nLevanté la mano y ella se fue hacia atrás contra el herraje.\n\nY me quedé de pie en esa cubierta bajo la lluvia y no hice ni una sola de las cosas que habría hecho un capitán de la marina mercante, porque no lo soy y no lo he sido nunca, y no queda nadie vivo a quien le sorprendiera oírlo salvo a mí.\n\nYo llevaba el comedor.\n\nLo llevé nueve años y se me daba bien y ella se acordaba de cómo cantaba veintidós años después, y la maté por decirlo.',
  },

  epilogue:
    'La bolsa con tu regalo dentro estaba en el camarote 6042, con el abrigo doblado a los pies de la litera, como doblaba ella un abrigo en todos los barcos en los que trabajó.\n\nSenga Moar declaró día y medio. Le preguntaron once veces si un pasajero podía haberse confundido sobre una escala, y once veces contestó que las pantallas pasaron el aviso en bucle de noventa segundos en todas las cubiertas durante diez horas.\n\nSheila Kinnaird sigue haciendo cuatro noches por semana en esa ruta. No ha escrito nada distinto en el libro de objetos perdidos, porque nunca hubo nada mal en cómo lo escribió.\n\nA Eck Tulloch le pidieron una declaración sobre sus movimientos y la dio, y luego le pidió al oficial que hiciera constar que la enfermera lo había tenido sentado ochenta minutos y que se había perdido el fútbol. Hace la travesía dos veces al mes para ver a su hermana. Sigue poniéndose en la misma esquina.\n\nLa Rona se desguazó en Aliaga en 2009. Hay una foto de su tripulación en la fiesta de Navidad de 2003 en la oficina de Aberdeen, cuarenta y tantas personas con gorros de papel, y tu madre está en la segunda fila.\n\nÉl también sale. Al fondo a la izquierda, cantando, y todas las caras que tiene delante están vueltas hacia él escuchando.',
};
