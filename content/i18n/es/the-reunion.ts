import type { CaseTranslation } from '../caseText';

/**
 * Case 13 — «El reencuentro». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`.
 *
 * `el reencuentro` rather than `la reunión`: a Spanish `reunión` is a meeting,
 * and the twenty-year gathering of a school year is a reencuentro. The word
 * appears in the title, in n3 where Nia says she is organising it, and in the
 * x-tobi-branch revelation where she moved its date to fit Tobi in.
 *
 * Six things this had to get right.
 *
 * 1. The clock nobody looked at. Everyone in that hall dates the night off the
 *    speech, so the two times have to stay exactly where they are and never
 *    blur into each other: `las nueve` is what the programme says and what
 *    everyone believes, `las ocho y cuarto` is when he actually spoke. Michelle
 *    states both in one breath in k6 and the x-rafe-speech revelation states
 *    both again. If either drifts, ninety witnesses stop being wrong in the
 *    specific way the case needs them to be wrong.
 *
 * 2. Who is allowed digits, and here it is the two documents: the caterer's
 *    invoice at `20:55` in k7, and the barrier log at `21:08` and `21:19` in
 *    c6. Every other time in the pack is spoken, including Mr Vale's rounds —
 *    `las nueve` is nine because it has been nine since Mrs Hartley was head,
 *    which is a different kind of certainty from a printout and has to read
 *    like one.
 *
 * 3. The dead ends. Four claims are `with_person` and the engine can never fire
 *    a contradiction on them, because being with one person does not exclude
 *    being with another. They exist to be paired and refused. Their chips are
 *    plain `con Nia`, `con Michelle`, `con Mark` — deliberately the most
 *    ordinary phrasing available, because a player has to be tempted by them.
 *
 * 4. Voice, and it is the whole social content of the pack. Mark is a head
 *    teacher and writes like one: capitals, full stops, subordinate clauses,
 *    every sentence finished. Michelle is lowercase from start to end, never
 *    lands a full stop, and does not capitalise her own `i` — and she is the
 *    one telling the truth. There is no apostrophe axis in this pack, so no
 *    accent substitution was needed; the casing does all of it, exactly as the
 *    English has it. Nia, Tobi and Mr Vale write in sentences. The player is
 *    lowercase and never closes.
 *
 *    One thing Spanish cannot carry: the confession's `She wasn’t going to name
 *    me` is the only contraction Mark uses in the entire pack, at the moment he
 *    stops performing. Spanish has no contraction to drop, so the line is kept
 *    as short as it will go — `No iba a dar mi nombre.` — and the paragraph
 *    stands alone as it does in the English.
 *
 * 5. Names and places. People, schools and rivers stay: Nia Boateng, Mark
 *    Ellory, Michelle Selkirk, Tobi Marchetti, Colin Vale, Mr Vale, Ashley y
 *    Sheila Crewe, Mrs Hartley, Ardenshaw High, St Cuthbert’s, el Calder,
 *    Brantwood Road, Calderside, el Co-op. Places that are descriptions are
 *    translated: el salón de actos, el pabellón de música, el aparcamiento del
 *    personal, el camino del río, la oficina de Calderside.
 *
 *    All four of those are masculine, and Spanish `al` and `del` would swallow
 *    the article, so each appears uncontracted somewhere in the prose — n3, c2,
 *    the confession and the briefing respectively.
 *
 * 6. The player has no gender, and nothing here forced one. `Eras de esa
 *    promoción`, `nunca fuiste de ese grupo`, `me pintaste el estuche`, `lo que
 *    te estás proponiendo desmontar` are agreement-free as written, and the
 *    first deflection — the sharpest thing anybody says to the player in the
 *    pack — carries its contempt through `estabas en el aula` rather than
 *    through an adjective.
 */
export const theReunionEs: CaseTranslation = {
  title: 'El reencuentro',
  blurb:
    'Noventa personas pueden decirte con quién estaban. Ni una sola puede decirte qué hora era.',

  characters: {
    you: 'Tú',
    nia: 'Nia',
    rafe: 'Mark',
    marika: 'Michelle',
    tobi: 'Tobi',
    corin: 'Mr Vale',
  },

  places: {
    school: 'Ardenshaw High',
    hall: 'el salón de actos',
    musicblock: 'el pabellón de música',
    carpark: 'el aparcamiento del personal',
    riverpath: 'el camino del río',
    branch: 'la oficina de Calderside',
  },

  threads: {
    't-nia': 'Nia',
    't-year': 'Ardenshaw 2005',
    't-marika': 'Michelle',
    't-rafe': 'Mark Ellory',
    't-tobi': 'Tobi',
    't-corin': 'Mr Vale',
  },

  briefing: {
    causeOfDeath:
      'Cayó al Calder desde lo alto del talud. El camino no tiene luz y ahí hay unos veinte pies de caída.',
    ruling:
      'Abierto. Dos personas ya le han dicho a la policía que es el mismo tramo de agua donde se ahogó un chico de su promoción en 2005, y las dos lo dijeron sin que nadie preguntara.',
    opening:
      'Nia Boateng daba clase en 4.º de primaria en un colegio a once millas de aquel al que fue ella, y había organizado el reencuentro de los veinte años porque no lo iba a hacer nadie más.\n\nLa encontraron en el camino del río, debajo de los campos de deporte, a las nueve y media, a treinta metros de donde Ashley Crewe cayó al mismo río en junio de 2005.\n\nTe escribió hace tres semanas. Eras de esa promoción y nunca fuiste de ese grupo, y decía que justo por eso necesitaba hablar contigo.',
  },

  messages: {
    // ------------------------------------------------------------------ t-nia
    n1: 'No te acordarás de mí. Me sentaba detrás de ti en geografía dos años y me pintaste el estuche.',
    n2: 'me acuerdo de ti',
    n3: 'Estoy organizando el reencuentro. Veinte años. Es en el salón de actos y el catering es el mismo que hizo lo de mi tía y he tenido que llamarlos cuatro veces.',
    n4: 'Quería preguntarte una cosa y he empezado este mensaje unas nueve veces.',
    n5: 'La madre de Ashley Crewe sigue viviendo en Brantwood Road. La misma casa. Paso por delante cuando voy a casa de mi madre y llevo veinte años pasando por delante.',
    n6: 'nia',
    n7: 'En ese talud estábamos cuatro y ella se cree que él estaba solo. Lleva veinte años creyéndolo. Le he escrito una carta y son ocho páginas y la voy a echar al correo antes del reencuentro porque si espero a después no lo voy a hacer.',
    n8: 'No he puesto el nombre de nadie. Quiero dejarte eso claro porque no se lo he dejado claro a nadie más. Dice nosotros. Dice nosotros de principio a fin.',
    n9: 'Ella tiene que saber que él no estaba solo a oscuras. Eso es todo. Esa es la única razón por la que lo hago.',
    n10: 'La he echado a las ocho y diez de esta mañana en el buzón de fuera del Co-op y luego me he quedado un rato sentada en el coche. Puertas a las siete por si cambias de idea. Me gustaría que vinieras.',

    // ----------------------------------------------------------------- t-year
    g1: 'A todos. Voy a decir esto una vez y después voy a dejar de usar este grupo, porque no es el sitio para esto.\n\nNia murió el sábado por la noche. La policía ya ha hablado con varios de nosotros y hablará con más. Por favor, contestadles con todo, y por favor no especuléis aquí.',
    g2: 'me llamó el jueves para preguntarme si las mesas tenían que ser redondas o alargadas. redondas. le dije redondas. esa es la última conversación que he tenido con ella en mi vida',
    g3: 'Yo no estaba. Lo digo claramente en vez de dejar que la gente lo deduzca. Estaba de turno y me enteré el domingo por la mañana por mi hermana.',
    g4: 'la policía me preguntó a qué hora pasaron las cosas y no supe decirles ni una. dije que después del discurso. lo dije de unas cuatro cosas distintas y era la única respuesta que tenía',
    g5: 'Eso es lo que ha dicho todo el mundo, y no es un fallo. En una fiesta nadie mira el reloj. Yo le he dado a la policía el orden del acto y les he sugerido que trabajen a partir de ahí.',
    g6: 'mark hay una mujer muerta en el mismo talud que ashley y tú estás hablando de un orden del acto',
    g7: 'Estoy hablando del único documento que tiene nadie. Yo esto aquí no lo hago.',

    // --------------------------------------------------------------- t-marika
    k1: 'estuve con ella desde que sacaron la comida hasta que salió fuera. todo el rato. hicimos eso de decir que vas a por una copa y luego no moverte en una hora',
    k2: 'de qué habló',
    k3: 'de su clase. de un niño que no se sienta. estaba contenta de verdad y no paro de tener que decírselo a la gente porque quieren que hubiera estado asustada y no lo estaba',
    k4: 'estuve en el salón desde las nueve menos cuarto hasta pasada y media. cualquiera te lo dirá y ninguno de ellos te va a saber decir cuándo',
    k5: 'el discurso',
    k6: 'el programa ponía las nueve. lo dio a las ocho y cuarto. lo sé porque se lo dije yo — el catering iba cuarenta minutos por detrás y fui a buscarlo y le dije dalo ahora que la gente todavía está de pie',
    k7: 'tengo la factura en el móvil. servicio caliente 20:55. o sea que cualquiera de esa sala que te haya dicho que algo pasó después del discurso te ha dicho que pasó después de las ocho y cuarto y se cree que te ha dicho después de las nueve',
    k8: 'a ashley no lo empujó nadie. necesito que oigas eso antes de que alguien te lo adorne. se tiró desde arriba por un reto y todos nos quedamos ahí gritando su nombre y nadie se tiró detrás y nadie llamó en veinte minutos. veinte minutos. eso es la cosa. eso es lo único que ha habido nunca',
    k9: 'y mark montó la historia en el talud antes de que llegara la ambulancia. dijimos que habíamos llamado enseguida. él dijo las palabras primero y los otros tres las dijimos detrás de él y yo se las he dicho a un policía, a un juez y a mi propia madre',
    k10: 'tenía diecisiete años. yo también. no voy a fingir que dije que no',

    // ----------------------------------------------------------------- t-rafe
    r1: 'Llevo seis años de director en St Cuthbert’s. Lo menciono solo para que entiendas por qué soy cuidadoso, y no porque crea que me da derecho a nada.',
    r2: 'Estuve en ese salón desde las nueve menos cuarto hasta las nueve y media. Estuve de pie delante de noventa personas buena parte de ese rato. No creo que haya una respuesta mejor disponible para nadie que estuviera allí.',
    r3: 'cuándo fue el discurso',
    r4: 'A las nueve. Está en el programa, hay doscientos impresos, y me asombraría que no pudieras encontrar uno esta tarde en el bolsillo del abrigo de alguien. Duró unos veinte minutos.',
    r5: 'Michelle estuvo a mi lado casi toda la tarde y yo estuve al lado de Nia un rato. Era una sala de noventa personas que no se veían desde los diecisiete años. Nadie estuvo solo ni un momento.',
    r6: 'le escribió a la madre de ashley crewe',
    r7: 'Se lo dijo a varias personas. Yo te pediría que pensaras a quién más asustaba esa carta, y yo empezaría por Tobi Marchetti, que estaba en ese salón el sábado y que lleva dos años en una línea de crisis y sabe perfectamente cómo sentarse con alguien y convencerlo de algo.',
    r8: 'Soy consciente de cómo suena eso. Llevo cuatro días pensando si decirlo y he concluido que callármelo sería peor.',
    r9: 'Lo que pasó en 2005 fue un accidente que presenciaron cuatro niños. No hay ninguna versión en la que nadie le hiciera nada a Ashley Crewe. Se lo he dicho a todas las personas que me lo han preguntado y te lo digo a ti.',

    // ----------------------------------------------------------------- t-tobi
    t1: 'Alguien te ha hablado de la línea de crisis. Se te nota en la pregunta, y prefiero contestarla a hacerte dar rodeos.',
    t2: 'Dos años. Un sábado sí y otro no, de seis a dos, en la oficina de Calderside, que está a cuarenta y una millas de ese salón. Esa noche estaba de turno. Nueve en el cuadrante y un supervisor.',
    t3: 'mark dice que estabas en el salón',
    t4: 'Ah, ¿sí? Le dije a Nia en marzo que no podía ir y ella movió la fecha una vez para intentar encajarme y no pudo, y fue encantadora al respecto.',
    t5: 'Lo hacen miles de personas. Solo en esta región hay cuatrocientas y hay un cartel sobre ello en todas las salas de espera de médico del país. No es una cosa rara de ser. Solo lo parece desde donde estás tú.',
    t6: 'estabas en el talud en 2005',
    t7: 'No. Eran cuatro y yo no era uno de ellos, y llevo veinte años siendo el que no estaba, que es una cosa rara de ser en un pueblo de este tamaño.',
    t8: 'Nia me llamó en abril. Habló cincuenta minutos y yo no dije gran cosa, que es en lo que consiste casi todo el trabajo. Al final me preguntó si era una cosa egoísta, contárselo a su madre, y le dije que eso no se lo podía contestar yo.',
    t9: 'Ve a ver a Colin Vale. Tiene las llaves de ese edificio desde 1989 y estaba cerrando el sábado, y es la única persona de todo esto que no estaba en una fiesta.',

    // ---------------------------------------------------------------- t-corin
    c1: 'Llevo treinta y seis años de conserje aquí. No os he enseñado nada a ninguno y me sé todos vuestros nombres.',
    c2: 'Yo no me guío por la fiesta. Me guío por mi ronda. Hago el pabellón de música a las nueve y la barrera lleva registro.',
    c3: 'El señor Ellory estaba en el pasillo del pabellón de música cuando fui a cerrarlo. Las nueve y dos o tres minutos. Tuve que quedarme esperándolo y no me oyó la primera vez que le hablé.',
    c4: 'estás seguro de la hora',
    c5: 'Estoy seguro de mi ronda. Las nueve son las nueve y son las nueve desde que la señora Hartley era directora. La fiesta que sea a la hora que quiera.',
    c6: 'El registro de la barrera tiene su matrícula saliendo a las 21:08 y volviendo a entrar a las 21:19. Es de llavero y lo imprime. Le di la hoja al agente el domingo y me he quedado una foto.',
    c7: 'La señorita Selkirk estuvo en ese salón todo el rato. Asomé la cabeza dos veces por lo de la puerta de incendios y las dos veces estaba en la misma mesa, y llevaba los zapatos en la mano.',
    c8: 'La señorita Boateng vino a buscarme sobre las ocho y media para darme las gracias. Nadie me ha dado las gracias en una de estas antes. Me preguntó por mi mujer por su nombre y mi mujer lleva cuatro años muerta y eso también lo sabía.',
    c9: 'Después la vi bajar hacia el río. No le di ninguna importancia. Bajan todos. Esa valla lleva caída desde 1991 y he dado parte once veces.',
    c10: 'Yo también estaba aquí en 2005. Le abrí este edificio a la policía a las dos de la mañana y les hice una taza de té a cada uno de los cuatro niños en la sala de profesores y no se la bebió ninguno.',
  },

  /**
   * Digit for digit identical to the English. The four `with_person` chips are
   * the deliberate dead ends — the engine can never fire on them, because being
   * with one person does not exclude being with another — so they are phrased as
   * plainly as possible. A player has to be tempted into pairing them.
   */
  claims: {
    'c-nia-hall': 'Nia: en el salón de actos, 19:00–20:40 (según Michelle)',
    'c-marika-with-nia': 'Michelle: con Nia, 20:45–21:30',
    'c-nia-with-marika': 'Nia: con Michelle, 20:45–21:25',
    'c-marika-hall': 'Michelle: en el salón de actos, 20:45–21:40 (según Mr Vale)',
    'c-rafe-outside': 'Mark: fuera, junto a los contenedores, al teléfono, 20:55–21:15 (según Michelle)',
    'c-rafe-hall': 'Mark: en el salón de actos, 20:45–21:30',
    'c-rafe-speech': 'Mark: dando el discurso, 21:00–21:20',
    'c-marika-with-rafe': 'Michelle: con Mark, 20:50–21:20 (según Mark)',
    'c-nia-with-rafe': 'Nia: con Mark, 20:55–21:15 (según Mark)',
    'c-tobi-hall': 'Tobi: en el salón de actos, 20:45–21:30 (según Mark)',
    'c-tobi-branch': 'Tobi: en la oficina de Calderside, 20:00–22:00',
    'c-rafe-music': 'Mark: en el pabellón de música, 20:58–21:06 (según Mr Vale)',
    'c-rafe-carpark': 'Mark: en el aparcamiento del personal, 21:08–21:20 (registro de la barrera)',
    'c-nia-riverpath': 'Nia: en el camino del río, 21:00–21:30 (según Mr Vale)',
  },

  motives: {
    'm-riverbank':
      'A Ashley Crewe no lo tocó nadie. Cuatro de ellos se quedaron en aquel talud y nadie llamó en veinte minutos, y Mark Ellory montó la historia antes de que llegara la ambulancia e hizo que los otros tres la dijeran detrás de él. Lleva seis años de director. Nia echó al correo una carta de ocho páginas a la madre de Ashley la mañana del reencuentro.',
  },

  contradictions: {
    'x-rafe-speech':
      'El programa pone las nueve y hay doscientos impresos. Habló a las ocho y cuarto, porque el catering iba cuarenta minutos por detrás y Michelle fue a buscarlo y le dijo que lo diera mientras la gente seguía de pie. La factura que ella tiene en el móvil pone servicio caliente a las 20:55. Así que todos los testigos de esa sala que fecharon algo después del discurso creen que te han dicho después de las nueve, y te han dicho después de las ocho y cuarto — y a las nueve, cuando él dice que estaba de pie delante de noventa personas, estaba fuera junto a los contenedores al teléfono.',
    'x-rafe-music':
      'Colin Vale no se guía por la fiesta. Se guía por su ronda, y el pabellón de música se cierra a las nueve y se cierra a las nueve desde que la señora Hartley era directora. Mark Ellory estaba de pie en ese pasillo dos o tres minutos pasadas, y Vale tuvo que esperarlo, y tuvo que hablarle dos veces.',
    'x-rafe-gate':
      'La barrera del aparcamiento del personal es de llavero y lo imprime. Su matrícula sale a las 21:08 y vuelve a entrar a las 21:19. No estuvo en ese salón durante once minutos del tiempo del que ha dado cuenta, y la única persona del edificio que no estaba en una fiesta es la que se quedó la hoja.',
    'x-tobi-branch':
      'Mark Ellory puso a Tobi Marchetti en ese salón. Tobi estaba a cuarenta y una millas, en la oficina de Calderside, de seis a dos, en un cuadrante de nueve con un supervisor, y Nia movió una vez la fecha del reencuentro intentando encajarlo y no pudo. Solo en esta región hay cuatrocientas personas de voluntarias en esa línea. No es una cosa rara de ser. Solo lo parece desde donde estás tú.',
  },

  confrontation: {
    opening:
      'Le he dado treinta y un años a los colegios de este distrito y me gustaría que entendieras lo que te estás proponiendo desmontar.',
    beats: {
      'a-speech': {
        press:
          'Escribiste el orden del acto y luego adelantaste tu propio discurso cuarenta y cinco minutos. Todas las personas de esa sala llevan desde el sábado fechando la noche a partir de él. A las nueve estabas fuera junto a los contenedores.',
        rebuttal:
          'El catering iba con retraso. Michelle Selkirk me pidió que lo adelantara y lo adelanté, delante de noventa personas, que es una forma rara de ocultar algo.',
      },
      'a-music': {
        press:
          'Colin Vale cierra el pabellón de música a las nueve. Te encontró en ese pasillo tres minutos pasadas y tuvo que hablarte dos veces antes de que lo oyeras.',
        rebuttal:
          'Tiene sesenta y un años e iba con un manojo de llaves por un edificio a oscuras. Yo entré y salí de ese pasillo toda la noche. Ha juntado dos tardes distintas.',
      },
      // a-gate and a-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'a-gate': {
        press:
          'La barrera imprime. Tu matrícula sale a las 21:08 y vuelve a entrar a las 21:19. Once minutos, dentro de los cuarenta y cinco de los que has dado cuenta desde el suelo del salón.',
      },
      'a-why': {
        press:
          'A Ashley Crewe no lo empujó nadie. Cuatro de vosotros os quedasteis en aquel talud y nadie llamó en veinte minutos, y tú juntaste las palabras antes de que llegara la ambulancia y los otros tres las dijeron detrás de ti.',
      },
    },
    deflections: [
      'No eras de esa promoción en ningún sentido que cuente. Estabas en el aula y no eras de la promoción.',
      'Un conserje, una barrera y una mujer que lleva contándole a la gente lo que ella cree que pasó en ese talud desde que tenía diecisiete años.',
      'Tráeme a una sola persona que me viera en ese camino.',
    ],
    confession:
      'Bajé a pedirle que no la mandara.\n\nEsa era toda mi intención y soy consciente de que ahora no vale nada. Me dijo que ya había salido, a las ocho y diez de esa mañana, del buzón de fuera del Co-op, y no la creí. Pensé que era lo que se dice.\n\nAsí que la agarré del brazo. Para que se quedara. Para eso y para nada más, y llevo desde el sábado diciéndome esa frase unas cuatro mil veces y cada vez se hace más pequeña.\n\nY se cayó desde lo alto del talud.\n\nA treinta metros de donde cayó él. Los mismos veinte pies. Quiero que alguien escriba eso como es debido porque todavía no me lo ha dicho nadie en voz alta y llevo cuatro días esperando a que alguien lo haga.\n\nMe quedé ahí de pie.\n\nQuiero ser exacto, porque llevo veinte años siendo exacto y es lo único que se me da bien. No me caí y no me entró el pánico y no tenía diecisiete años. Tenía cuarenta y dos y me había tomado dos copas de vino en cuatro horas y me quedé de pie en ese camino y conté, y a los once minutos más o menos subí andando hasta el aparcamiento del personal y saqué el coche por una barrera que imprime.\n\nLo hice dos veces. Con veinte años de diferencia. La segunda vez sabía exactamente lo que estaba haciendo y lo hice igual, y la única diferencia entre el chico de aquel talud y el hombre de aquel camino es que el hombre ya había descubierto que podía vivir con ello.\n\nDijo nosotros. Lo dijo en la carta de principio a fin y me lo dijo a mí en aquel camino, y le he dado más vueltas a esas ocho páginas que nunca leí que a nada que haya leído en mi vida.\n\nNunca le pregunté qué ponía. Ni una vez, en tres semanas.\n\nEso se lo enseñé yo. En el talud, cuando teníamos diecisiete años. Dije de esto no hablamos, y ninguno habló nunca, y me construí una carrera siendo un hombre al que se puede acudir, y no fui capaz de hacerle una sola pregunta directa a una mujer a la que conocía desde los cuatro años.\n\nNo iba a dar mi nombre.\n\nLa maté para parar una carta que llevaba en un buzón desde las ocho y diez de la mañana, y no llevaba mi nombre dentro, y nunca lo iba a llevar.',
  },

  epilogue:
    'La carta llegó a Brantwood Road el martes, en el segundo reparto, cuatro días después de la muerte de Nia Boateng y dos días antes de que saliera en el periódico local.\n\nOcho páginas. Decía nosotros de principio a fin. Decía que en el talud había cuatro y que Ashley no estaba solo a oscuras y que habían gritado su nombre hasta no oírse entre ellos, y decía que nadie se había tirado y que nadie había llamado en veinte minutos, y decía que Nia lo sentía de una manera que no pedía que la perdonaran.\n\nSheila Crewe la tuvo un mes en el cajón de los paños de cocina antes de dársela a nadie.\n\nMichelle Selkirk entró en la comisaría de Ardenshaw el miércoles por la mañana con la factura en el móvil y una declaración que había escrito a mano la noche anterior, corrigiendo una que dio en 2005 cuando tenía diecisiete años. El juez reabrió el expediente apoyándose en ella. No cambió nada sobre cómo murió Ashley Crewe y cambió por completo los últimos veinte minutos de su vida, que es en lo que el expediente estaba equivocado.\n\nTobi Marchetti hizo su turno el sábado. Dijo después que pensó en no ir y luego fue, porque nueve en un cuadrante son nueve en un cuadrante.\n\nColin Vale dio parte de la valla por duodécima vez. La pusieron en noviembre.',
};
