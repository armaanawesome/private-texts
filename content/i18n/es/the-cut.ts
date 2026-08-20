import type { CaseTranslation } from '../caseText';

/**
 * Case 9 — «El canal». Spanish.
 *
 * Pack 9 carries the third arc connection. `el Keeper` appears exactly once in
 * the English, in the confession, and stays English with its article. The coda
 * pays off the same clue without naming him — `sí que lo llamé después. Siempre
 * lo hago` — so the count is one and the test pins it, because arcAlias.test.ts
 * counts mentions and a helpful extra is as wrong as a missing one.
 *
 * Seven things this had to get right.
 *
 * 1. The arithmetic everybody does and nobody questions. Three miles an hour, six
 *    miles, five locks, three hours up and three back — those numbers are the
 *    alibi, and they are all correct. The case turns on the one number nobody
 *    says out loud until Sam does: forty minutes on a bicycle. So `tres millas
 *    por hora`, `seis millas`, `cinco esclusas` and `cuarenta minutos` are fixed
 *    where the English fixes them, and `cuarenta minutos` has to read identically
 *    in b8, in the x-nate-bike revelation and in the c-bike press line.
 *
 * 2. The word this locale loses, and what carries it instead. English `the cut`
 *    is boaters’ slang, and using it marks the speaker as one of them — which is
 *    the entire social mechanism of the pack, a community so fluent in its own
 *    arithmetic that it never checks it. Spanish canal usage has no equivalent
 *    slang; `el canal` is simply the word. So the insider register is carried by
 *    the density of the trade vocabulary instead, which this pack has in
 *    quantity: la esclusa, los amarres, la regala, la cubierta de popa, el punto
 *    de agua, el elsan, la licencia, la norma de los catorce días, el camino de
 *    sirga. Said here rather than left implicit, because it is a real loss and
 *    the compensation is deliberate.
 *
 * 3. Alan’s job, and a collision Spanish does not have. The English comment on
 *    g1 records that he was a `lock keeper` until the arc alias landed, and was
 *    changed to `lock-wheeling` so that an innocent man would not read as a
 *    clue. In Spanish that collision does not exist — the alias stays English
 *    and `esclusero` resembles it in no way — but the fix is mirrored anyway
 *    with `abriendo esclusas`, which is what lock-wheeling actually is, because
 *    a red herring that only fails to fire in some languages is not a design.
 *
 * 4. Times, and who is allowed digits. Every time in this pack is spoken except
 *    one: `20:44`, the key log, in g6. That is the only machine record in the
 *    case and the only place digits appear in any message, exactly as in the
 *    English — which is why it lands harder than forty boats and a lock keeper.
 *    `las ocho y media` is Sam speaking to him on the offside path, and it has
 *    to read the same in b4, in the revelation and in the press line.
 *
 * 5. Names and places. People, boats, pubs and hospitals stay: Julie Cusk, Nate
 *    Ogilvy, Effie Ogilvy, Sam Ferreira, Alan Pryce, Tam Oyelaran, Moss, Norbury,
 *    Tyrley, Autherley, Nantwich, el Junction, el Royal Shrewsbury, el Canal and
 *    River Trust, Dawes. Places that are descriptions are translated: el canal,
 *    el muelle de Norbury, el barco de Julie, las esclusas de Tyrley, el camino
 *    de sirga.
 *
 *    `el camino de sirga` is the same choice made in Pack 6 and is kept
 *    deliberately, so a player who has met a towpath once meets the same words
 *    again. `una barcaza` appears only in the blurb, where the English says
 *    `narrowboat` once and then says `boat` for the rest of the case.
 *
 *    Spanish `del` and `al` swallow a masculine article, so `el canal`, `el
 *    muelle de Norbury` and `el camino de sirga` each appear somewhere in the
 *    prose uncontracted, or the chips would name places no sentence contains.
 *
 * 6. Voice, rebuilt on behaviour rather than casing — the same problem Pack 8
 *    had, and the same solution. There is no apostrophe axis worth substituting
 *    an accent for here, so the two real axes are situational and both are
 *    preserved exactly:
 *
 *    - Tam writes differently depending on who is watching. In the group chat
 *      he is lowercase and never closes a sentence, and he does not capitalise
 *      `shrewsbury`. In the private thread he uses capitals and finishes every
 *      sentence. Same man, two rooms, and the difference is that in one of them
 *      forty people are reading.
 *    - Nate loses his composure inside four messages. k3 is a prepared
 *      statement and lands its full stop; k4, k6 and k7 do not land one, and k7
 *      is him naming somebody else. That decay is the character and it is
 *      mirrored message for message.
 *
 *    Julie, Sam and Alan write in capitals and finish. The player is lowercase,
 *    short, lowercases other people’s names, never opens with ¿ and never lands
 *    a full stop.
 *
 * 7. The player has no gender, and nothing here forced one. `Dejaste el barco y
 *    te mudaste a tierra`, `no puedes volver ahora`, `lo has hecho en cinco
 *    días`, `por si llevas la cuenta`, `deberías preguntarte` are all
 *    agreement-free as written, and the Keeper’s coda never describes the player
 *    at all. Asserted in the test.
 *
 * Units stay as the English states them: `tres millas por hora`, `seis millas`,
 * `cuatro pies de profundidad`, `el puente 39`.
 */
export const theCutEs: CaseTranslation = {
  title: 'El canal',
  blurb:
    'Una barcaza hace tres millas por hora, y todo el mundo del canal sabe hacer esa cuenta. A nadie se le ocurrió preguntar si cogió el barco.',

  characters: {
    you: 'Tú',
    verity: 'Julie',
    nate: 'Nate',
    bo: 'Sam',
    gwyn: 'Alan',
    tam: 'Tam',
  },

  places: {
    cut: 'el canal',
    norbury: 'Norbury',
    norburywharf: 'el muelle de Norbury',
    veritysboat: 'el barco de Julie',
    pub: 'el Junction',
    tyrley: 'Tyrley',
    tyrleylocks: 'las esclusas de Tyrley',
    towpath: 'el camino de sirga',
    hospital: 'el Royal Shrewsbury',
  },

  threads: {
    't-verity': 'Julie',
    't-cut': 'Amarres de Norbury',
    't-tam': 'Tam',
    't-bo': 'Sam',
    't-gwyn': 'Alan Pryce',
  },

  briefing: {
    causeOfDeath:
      'Ahogamiento. Se cayó desde su propia cubierta de popa y ahí el canal tiene cuatro pies de profundidad.',
    ruling:
      'Registrado como accidental. Tenía sesenta y cuatro años, era de noche y había una botella de vino encima de la mesa.',
    opening:
      'Julie Cusk llevaba diecinueve años viviendo a bordo y conocía a todos los que viven a bordo entre Autherley y Nantwich por su barco antes que por su nombre.\n\nLa encontraron en el agua, al costado de su propia popa, un viernes por la noche de octubre, con la estufa todavía encendida y dos vasos en la mesa.\n\nDejaste el barco y te mudaste a tierra hace cuatro años y ella te escribía todas las semanas del tema igualmente.',
  },

  messages: {
    // --------------------------------------------------------------- t-verity
    v1: 'Ha pasado una cosa y llevo cuatro días sentada encima de ella porque no sabía a quién decírselo primero.',
    v2: 'Me ha escrito Effie Ogilvy. La hija de Nate. Tiene veinticuatro años y es enfermera de pediatría en Chester y me ha encontrado por el grupo de Facebook.',
    v3: 'ah',
    v4: 'Me daba las gracias. Cuatro páginas. Decía que el día que llamé a servicios sociales fue el día en que empezó su vida y que lleva intentando decírmelo desde los dieciocho.',
    v5: 'lloraste verdad',
    v6: 'Me senté en la regala bajo la lluvia como una tonta. Quince años siendo la mujer que le hizo eso a Nate Ogilvy y resulta que era la mujer que hizo eso por Effie Ogilvy, y las dos cosas han sido verdad todo el tiempo.',
    v7: 'Viene el sábado. A Norbury, a los amarres, delante de todo el mundo. Quiere decirlo donde puedan oírla los que lo vieron pasar.',
    v8: 'lo sabe nate',
    v9: 'Se lo dije yo misma el martes. No pienso dejar que se entere por Sam en el punto de agua. Eso se lo debía y nunca le he debido otra cosa.',
    v10: 'Se quedó muy callado. Dijo ya. Dos veces. Y luego me preguntó a qué hora el sábado.',
    v11: 'Estufa encendida, botella abierta, y de este barco no me muevo hasta el sábado. Súbete si te ves con ánimo para el viaje.',

    // ------------------------------------------------------------------ t-cut
    k1: 'Para quien no lo haya oído de alguien. Julie se cayó desde su propia popa el viernes por la noche y Sam la encontró a las once. La policía vino el sábado por la mañana y lo están llamando accidental.',
    k2: 'diecinueve años en este canal. me sacó el barco del fango en el puente 39 a oscuras en febrero y no quiso ni que le pagara una copa',
    k3: 'Estuve en Tyrley toda la semana y estuve en Tyrley todo el viernes por la noche. A seis millas y cinco esclusas. Cuarenta barcos vieron el mío parado en los amarres de visitantes por encima de la esclusa de arriba desde el miércoles.',
    k4: 'No lo moví. Ni un palmo, de miércoles a domingo. Cualquiera que conozca este canal sabe hacer esas cuentas',
    k5: 'Nadie te ha preguntado, Nate.',
    k6: 'Ya preguntarán. Quince años de este canal decidiendo lo que soy. Me estoy adelantando',
    k7: 'Y Tam estuvo en Norbury el viernes y discutió con ella en junio por la norma de los catorce días y lo oyeron la mitad de los amarres',
    k8: 'estuve en urgencias en shrewsbury con mi madre desde las ocho hasta las dos de la mañana y tengo el informe de alta y no lo voy a poner en un grupo',
    k9: 'Habla con Sam. Sam estuvo en el camino de sirga toda esa tarde paseando al perro y a Sam no se le escapa nada, cosa que el resto ya sabéis porque es la razón por la que no amarráis al lado de Sam.',

    // ------------------------------------------------------------------ t-tam
    m1: 'Discutí con ella en junio y he pensado en eso todos los días desde el viernes. Fue por la norma de los catorce días y duró cuatro minutos y ella tenía razón.',
    m2: 'Mi madre se cayó el viernes a la hora de merendar. La ambulancia a las siete y media, urgencias a las ocho, el alta a las dos y veinte. Estuve seis horas en una silla de plástico con el móvil al cuatro por ciento.',
    m3: 'nate te ha puesto en norbury',
    m4: 'Sí. Delante de todo el canal, cuarenta minutos después de que Alan le dijera que nadie le había preguntado nada.',
    m5: 'Y voy a decir la cosa que no paro de no decir. Todo el mundo sabe que Nate la odiaba. Es el dato más conocido que hay en el canal. Así que cuando pasó, todo el mundo lo pensó y luego todo el mundo hizo las cuentas y lo volvió a guardar.',
    m6: 'Seis millas. Cinco esclusas. Tres horas de subida y tres de bajada y cuarenta barcos mirándole el techo todo el rato. No hay ninguna versión de eso. Lo he hecho de cabeza veinte veces.',
    m7: 'Ve a ver a Sam. Sam recorre el camino de sirga a la misma hora todas las noches y lleva tres años haciéndolo, y Sam se fija en lo que se ha movido.',

    // ------------------------------------------------------------------- t-bo
    b1: 'La encontré yo. Lo digo una vez y a partir de ahí prefiero contestar preguntas antes que contarlo.',
    b2: 'Saco a Moss de ocho a las diez menos veinte más o menos todas las noches. De Norbury hasta el puente 39 y vuelta. Tres años, el mismo paseo, porque tiene trece y tiene su ruta.',
    b3: 'viste a alguien',
    b4: 'A Nate Ogilvy. Las ocho y media, en el camino de la otra orilla pasado el muelle, con la chaqueta naranja. Le dije qué tal Nate y no me contestó y no le di importancia porque nunca contesta.',
    b5: 'su barco estaba en tyrley',
    b6: 'Sí que estaba. Ya se lo he dicho a tres personas y cada una de ellas me ha explicado las esclusas como si yo no llevara seis años viviendo en esta agua.',
    b7: 'Iba en bici. La Dawes con el manillar de carretera que lleva atada al techo desde que yo llegué. Eso no es algo que esté suponiendo, me aparté del camino para dejarlo pasar.',
    b8: 'Seis millas de camino de sirga llano son cuarenta minutos en bici. Todo el mundo venga a decir el barco, el barco, el barco, y el barco no fue a ninguna parte y la pregunta tampoco.',
    b9: 'Pregúntale a Alan por la llave. El punto sanitario va con llave del CRT y las nuevas registran. Alan lleva un año detrás del Trust por esos datos, por lo del vandalismo.',

    // ----------------------------------------------------------------- t-gwyn
    g1: 'Once años abriendo esclusas en Tyrley y no había querido el papeleo ni una sola vez hasta esta semana.',
    g2: 'Su barco no se movió. Eso es verdad y lo diré en un juzgado. Esa semana pasé cuarenta y un barcos por las esclusas y el suyo no fue uno de ellos y yo le habría reconocido el techo a media milla.',
    g3: 'Y eso es exactamente lo que ha fallado en todo esto. Todos hemos contestado a una pregunta sobre el barco. Nadie ha hecho una pregunta sobre el hombre.',
    g4: 'el registro de la llave',
    g5: 'El elsan y el punto de agua que hay en el muelle de Norbury pasaron a cerraduras con registro en primavera, porque tuvimos un año entero de alguien dejando los grifos abiertos. Llevo desde marzo pidiéndole esos datos al Trust, por lo de los grifos.',
    g6: 'Los mandaron el martes. La llave de Nate Ogilvy abrió la cancela del muelle a las 20:44 del viernes. Su llave. Registrada a su licencia, en un barco que estaba a seis millas y que no se movía desde el miércoles.',
    g7: 'Julie estuvo en el Junction de seis a siete con Sam y conmigo y se tomó un vaso y estaba más contenta de lo que la he visto en quince años.',
    g8: 'Le contó lo de la carta a todo el reservado. Leyó un trozo en voz alta. Effie venía el sábado a las dos y Julie había comprado una tarta en la tienda de la granja y la había dejado en la encimera.',
    g9: 'La tarta seguía ahí cuando la sacaron del agua. No he conseguido pasar de eso y tengo sesenta y tres años y he pasado cosas peores.',
  },

  /**
   * Digit for digit identical to the English. `c-nate-moored` names an
   * assertion rather than a window — moored all evening — because it shares the
   * `nate-evening` group with `c-nate-bike`, and the pair is the contradiction:
   * the boat never moved and the man still came down the towpath.
   */
  claims: {
    'c-verity-boat': 'Julie: en su barco, 20:00–21:30',
    'c-nate-tyrley': 'Nate: en Tyrley, 19:00–22:00',
    'c-nate-moored': 'Nate: amarrado en Tyrley toda la tarde',
    'c-tam-norbury': 'Tam: en Norbury, 20:30–21:00 (según Nate)',
    'c-tam-hospital': 'Tam: en el Royal Shrewsbury, 20:00–22:00',
    'c-bo-towpath': 'Sam: en el camino de sirga, 20:00–21:40',
    'c-nate-norbury': 'Nate: en Norbury, 20:30–20:50 (según Sam)',
    'c-nate-bike': 'Nate: en el camino de sirga en bici, 20:20–21:00 (según Sam)',
    'c-gwyn-locks': 'Alan: en las esclusas de Tyrley, 19:00–20:30',
    'c-nate-wharf': 'Nate: en el muelle de Norbury, 20:44–20:50 (registro de la llave)',
    'c-verity-pub': 'Julie: en el Junction, 18:00–19:00 (según Alan)',
  },

  motives: {
    'm-effie':
      'Julie lo denunció a servicios sociales en 2009 y su hija se fue con su tía. Effie tiene ahora veinticuatro años, es enfermera en Chester, y venía a Norbury el sábado a darle las gracias a Julie en voz alta delante de los amarres que lo vieron pasar.',
  },

  contradictions: {
    'x-nate-norbury':
      'Se situó a seis millas y cinco esclusas toda la tarde, y cuarenta barcos confirmarán dónde estaba su techo. A las ocho y media Sam Ferreira le dijo qué tal Nate en el camino de la otra orilla, en Norbury, con la chaqueta naranja, y no obtuvo respuesta, y no le dio importancia porque él nunca contesta.',
    'x-nate-bike':
      'Seis millas de camino de sirga llano son cuarenta minutos en bicicleta. Todo el mundo de ese canal contestó a una pregunta sobre el barco, y el barco no es lo que bajó por el camino de sirga. La Dawes con el manillar de carretera lleva atada a su techo desde 2011.',
    'x-nate-wharf':
      'La cancela del muelle de Norbury pasó a cerradura con registro en primavera, porque alguien se había pasado un año dejando los grifos abiertos. Su llave la abrió a las 20:44, registrada a su licencia, en un barco que no se movía desde el miércoles.',
    'x-tam-hospital':
      'Puso a Tam Oyelaran en Norbury cuarenta minutos después de que le dijeran que nadie le había preguntado nada. Tam estuvo en una silla de plástico del Royal Shrewsbury desde las ocho hasta las dos y veinte con su madre y el móvil al cuatro por ciento.',
  },

  confrontation: {
    opening:
      'Quince años lleva este canal mirándome así y yo he amarrado donde me han dicho y he pagado mi licencia y no he dicho nada. Venga, adelante. Dilo bien.',
    beats: {
      'c-norbury': {
        press:
          'Estuviste en Tyrley toda la noche. Sam te dijo qué tal Nate en el camino de la otra orilla, en Norbury, a las ocho y media, y no contestaste.',
        rebuttal:
          'Sam lleva aquí seis años y se cree que eso le hace de aquí. Era de noche y en este canal hay una sola chaqueta naranja, claro.',
      },
      'c-bike': {
        press:
          'Tu barco no se movió y eso es verdad. Bajaste seis millas de camino de sirga llano con la Dawes que llevas en el techo. Cuarenta minutos.',
        rebuttal:
          'O sea que ahora voy en bicicleta. De noche. Seis millas. Has decidido la respuesta y vas hacia atrás desde ella.',
      },
      // c-wharf and c-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'c-wharf': {
        press:
          'La cancela del muelle ahora registra. Lo hace desde la primavera, por lo de los grifos. Tu llave la abrió a las 20:44, y tu barco estaba a seis millas canal arriba.',
      },
      'c-why': {
        press:
          'Effie venía el sábado a las dos. A darle las gracias a Julie, en voz alta, en esos amarres, delante de todos los que lo vieron pasar.',
      },
    },
    deflections: [
      'Eso es este canal hablando. Lleva hablando de mí desde 2009.',
      'Tú dejaste el barco. No puedes volver ahora y contarme lo que pasó en él.',
      'Tráeme una cosa que lleve mi nombre.',
    ],
    confession:
      'Podía aguantar quince años de que me creyeran un mal padre. Se me había dado bien. Te levantas y haces tus esclusas y saludas a gente que no te devuelve el saludo y al cabo de un tiempo es como el tiempo que hace.\n\nLo que no podía aguantar era el sábado.\n\nMi hija, veinticuatro años, enfermera, de pie en esos amarres delante de Alan y de Sam y de todos ellos, diciendo en voz alta que lo mejor que le había pasado en la vida fue que me la quitaran. Y todos ellos asintiendo. Y yo en un barco a seis millas con las cortinas echadas, y todo el mundo sabiendo exactamente dónde estaba y por qué.\n\nEstaba en la cubierta de popa cuando aparecí por detrás. Se alegró de verme. Esa es la parte. Dijo Nate, pasa, y tenía dos vasos fuera porque llevaba toda la tarde esperando a alguien y no era a mí.\n\nY hay una cosa más.\n\nUn hombre que se hacía llamar el Keeper me telefoneó el miércoles. Dijo que era del servicio de los juzgados de familia, que estaban revisando expedientes. Sabía lo de 2009. Sabía que Effie era enfermera en Chester y sabía lo del sábado, que no se lo había contado a nadie, porque a quién se lo iba a contar.\n\nMe preguntó cómo me sentía con aquello y estuve hablando un buen rato y él no dijo gran cosa.\n\nY el domingo volvió a llamar. Solo para preguntar qué tal había ido.\n\nEso fue lo que dijo. Qué tal ha ido, Nate. Como quien te pregunta por una entrevista.',
  },

  coda: {
    from: 'Número desconocido',
    messages: [
      'Norbury. Lo has hecho en cinco días y uno lo has gastado en el hombre equivocado, cosa que me parece justa.',
      'Lo de la bicicleta estuvo bien. Todo el mundo en ese canal piensa en millas y esclusas y nunca les ha fallado, así que a ninguno se le ocurrió parar.',
      'Ya tienes cuatro de estos, por si llevas la cuenta. Yo la llevo.',
      'Y sí. Sí que lo llamé después. Siempre lo hago. Deberías preguntarte por qué me merece la pena ese riesgo, porque es lo único descuidado que hago.',
    ],
  },

  epilogue:
    'El Canal and River Trust entregó once meses de datos de llaves en una sola hoja de cálculo y pidió disculpas por la demora.\n\nEffie Ogilvy llegó a Norbury el sábado porque nadie tenía su número para pararla. Alan Pryce la esperó arriba del camino y se lo dijo en el aparcamiento, y luego estuvo cuatro horas sentado con ella en el Junction.\n\nLeyó la carta en voz alta en el funeral. Las cuatro páginas. Dijo después que la había escrito para leérsela a Julie y que no se le ocurría ninguna razón para cambiarle una palabra ahora.\n\nSam Ferreira sigue sacando a Moss de ocho a las diez menos veinte. La ruta pasa por delante del viejo amarre de Julie, y Sam no la ha cambiado, porque Moss tiene trece años y tiene su ruta.',
};
