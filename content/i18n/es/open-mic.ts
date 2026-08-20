import type { CaseTranslation } from '../caseText';

/**
 * Case 10 — «Micro abierto». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`. Nothing was added to
 * fill the silence.
 *
 * Seven things this had to get right.
 *
 * 1. The lie the briefing itself tells. The briefing says Debbie did seven
 *    minutes `a las diez menos cinco` and she did not — Kit corrects it to
 *    21:30 in k2, and that correction is the case. So `las diez menos cinco`
 *    has to be the identical phrase in the briefing, in n9 where Debbie says it
 *    herself, and in k2 where Kit refuses it. If any one of the three drifts,
 *    the player has nothing to catch.
 *
 * 2. Who is allowed digits, which is the whole reason a notebook beats a video.
 *    Kit writes times in digits — 21:30, 21:55, 21:28 — because he writes them
 *    in biro on the back of a float sheet at the time. Everybody else in the
 *    building speaks their times: `las nueve y media`, `las diez menos
 *    veinticinco`, `las diez menos diez`. That gap is exactly why a man with a
 *    drawer full of running orders outranks twenty-two unbroken minutes of
 *    footage, and tidying one spoken line into digits would flatten it.
 *
 * 3. The card. One camera, one card, one night — the object is `unique` in the
 *    engine, so two people cannot both have had it, and the Spanish keeps one
 *    name for it throughout: `la tarjeta de la cámara`, and bare `la tarjeta`
 *    once it has been named. `el disco` is where the clip ends up and is
 *    deliberately a different thing, exactly as the English keeps the drive
 *    apart from the card.
 *
 * 4. The comedy register, which is what makes these people a trade rather than
 *    a cast: el micro abierto, el orden de actuación, la lista de micro
 *    abierto, el set, el material, los cinco minutos, el camerino, la cabina de
 *    sonido, los cascos, la hoja de caja, presentar and el presentador for
 *    compering. Two idioms needed real equivalents rather than glosses:
 *    `estrellarse` for dying on stage (h2, and the first deflection), and
 *    `retomar` for calling back to a bit, which is what exposes the swan.
 *
 * 5. Names and places. People and venues stay: Debbie Vaux, Dave Prosser, Roz
 *    Antrim, Kevin Boyce, Kit Nwachukwu, Priya, el Hatch. Places that are
 *    descriptions are translated: el escenario, la barra, el camerino, la
 *    cabina de sonido, el callejón. Spanish `del` and `al` swallow a masculine
 *    article, so `el Hatch`, `el escenario` and `el callejón` each appear
 *    uncontracted in the prose, or their chips would name places no sentence
 *    contains.
 *
 *    The victim is `Debbie` in every field. She was `MARNIE` in two of them
 *    when this pack was first translated — the shout in n2 and the folder name
 *    in the epilogue — and they were copied verbatim rather than repaired, on
 *    the standing rule that a translation which quietly fixes a fact is a
 *    translation nobody can diff.
 *
 *    The diagnosis in that note was exactly right and worth keeping: the reason
 *    `renameLeak.test.ts` did not catch it is that both occurrences are in
 *    capitals rather than title case, and the rule matched case-sensitively.
 *    It is case-insensitive now, and turning the flag on found a third leak
 *    nobody had seen — `gil` for Dave, three times, lowercase every time
 *    because it appears in messages from people who never capitalise. The
 *    characterisation had been hiding the rename from the rule meant to own it.
 *    The English is fixed at source and this file with it.
 *
 * 6. Voice. This pack has a real orthographic field, unlike Packs 8 and 9, and
 *    all four positions survive intact:
 *
 *    - Debbie is lowercase and never lands a full stop.
 *    - Dave is capitalised and never lands one either. That single difference
 *      is all that separates the two people who started the same month, and it
 *      is worth keeping for exactly that reason.
 *    - Roz, Kevin and Kit are capitalised and finish every sentence.
 *    - The player is lowercase and never closes — except n2, which is one word
 *      in capitals. It is the only shout in the pack and it is at good news.
 *
 *    Kevin also has a paternal vocative he uses on people he is putting in
 *    their place, and it is kept where it belongs: `Hijo` to Dave in h8.
 *
 * 7. The player has no gender, and one line would have forced one. In f4 the
 *    English ended `for the whole of that section, son` — addressed to the
 *    player, not to Dave — which states the player is a man. Spanish `hijo`
 *    would do the same, so the vocative is rebuilt as `Mira,` at the front of
 *    the sentence, which carries the identical avuncular condescension and
 *    marks nobody. h8 keeps `Hijo` because Dave is a man and is the addressee
 *    there, and neutralising that one would be the opposite mistake.
 *
 *    Both halves of that were right, and the second half is the one that
 *    mattered. `playerNeutral.test.ts` needed a copula, so it could not see a
 *    post-posed vocative at all; it can now. But the first version of the new
 *    rule read each pack as one flat string, flagged f4 and h8 alike, and the
 *    fix took out h8 — deleting real characterisation to satisfy a rule that
 *    could not tell who was being spoken to. The rule now runs per thread and
 *    only where the player is the sole participant, which is what separates
 *    `t-ferdy` (the player and Kevin) from `t-club` (four people, Kevin
 *    answering Dave). The English f4 has dropped its vocative; h8 keeps `Son`.
 *
 *    Everything else is agreement-free as written: `Haces un podcast`, `Te
 *    mandaba notas de voz`, `Hablas con gente`, `no te has subido a un
 *    escenario en tu vida`.
 */
export const openMicEs: CaseTranslation = {
  title: 'Micro abierto',
  blurb:
    'Su coartada está en vídeo. La misma camisa, los mismos cinco minutos, la misma risa en el mismo sitio. Es del martes anterior.',

  characters: {
    you: 'Tú',
    marnie: 'Debbie',
    gil: 'Dave',
    roz: 'Roz',
    ferdy: 'Kevin',
    kit: 'Kit',
  },

  places: {
    club: 'el Hatch',
    stage: 'el escenario',
    bar: 'la barra',
    greenroom: 'el camerino',
    box: 'la cabina de sonido',
    alley: 'el callejón',
  },

  objects: {
    card: 'la tarjeta de la cámara',
  },

  threads: {
    't-marnie': 'Debbie',
    't-club': 'Martes del Hatch',
    't-kit': 'Kit',
    't-ferdy': 'Kevin',
    't-roz': 'Roz Antrim',
  },

  briefing: {
    causeOfDeath:
      'Traumatismo craneal contra el bordillo. Se cayó una vez y no se levantó.',
    ruling:
      'Registrado como caída. Había estado bebiendo, el callejón está en cuesta, y la sala entera estaba dentro viendo a un hombre hacer cinco minutos sobre trenes.',
    opening:
      'El Hatch hace un micro abierto todos los martes y lo graba para un canal que no ve nadie, que es como once cómicos por semana acaban con algo que mandarle a un promotor.\n\nA Debbie Vaux la encontraron en el callejón de atrás a las once y veinte. Había hecho siete minutos a las diez menos cinco y había salido a tomar el aire.\n\nHaces un podcast sobre el circuito. Te mandaba notas de voz desde marzo.',
  },

  messages: {
    // --------------------------------------------------------------- t-marnie
    n1: 'ha salido lo de la gira de telonera. ocho semanas. no se lo he dicho a nadie y me voy a poner mala',
    n2: 'DEBBIE',
    n3: 'ya lo sé. ya lo sé. tengo que decírselo a gil esta noche y llevo nueve días dándole largas',
    n4: 'por qué es difícil. es tu amigo',
    n5: 'porque empezamos el mismo mes. octubre de 2009, la misma sala, la misma lista de micro abierto. y yo me voy de gira y él sigue programando los martes',
    n6: 'y hace los mismos cinco. los mismos cinco de verdad. yo podría hacer el set de gil. cualquiera de esa sala podría hacer el set de gil',
    n7: 'eso no es culpa tuya',
    n8: 'no pero va a ser mi cara la que vea cuando piense en ello. durante años. llevo en esto lo suficiente para saber exactamente cómo funciona eso',
    n9: 'aquí. salgo a las diez menos cinco. lo voy a hacer después, en el callejón, lejos de la sala, como una cobarde',
    n10: 'pues ha ido bien y todo. venga. me salgo',

    // ----------------------------------------------------------------- t-club
    h1: 'Debbie murió en el callejón el martes por la noche. La policía vino el miércoles, nos tomó declaración a nueve y lo están llamando una caída. El Hatch está cerrado esta semana.',
    h2: 'Llevo once años presentando esa sala y no he tenido que decir una cosa así por ese micrófono ni una vez. La subí por primera vez en 2010 y se estrelló conmigo cuatro minutos y volvió la semana siguiente, que es en lo que consiste el oficio.',
    h3: 'Yo estaba actuando cuando pasó. Estaba literalmente en el escenario. Que ya sé que es una forma horrible de decirlo pero es donde estaba y alguien lo va a preguntar así que prefiero decirlo ya',
    h4: 'Y está grabado, evidentemente. Lo he montado y lo he subido al disco. Veintidós minutos, sin cortes, yo a las nueve y media haciendo lo de los trenes con Debbie de pie en la barra detrás de mí',
    h5: 'Nadie te ha pedido un clip, Dave.',
    h6: 'Estoy intentando ser útil',
    h7: 'Y ya que estamos con dónde estaba cada uno, Kevin estuvo fuera, en la parte de atrás, sus buenos veinte minutos en mitad de ese pase y no creo que lo haya dicho nadie',
    h8: 'Hijo, yo estaba al micrófono.',
    h9: 'Vale, ya está bien. Lo que sea me lo decís a mí y no a veintiocho personas.',

    // ------------------------------------------------------------------ t-kit
    k1: 'Yo llevo sonido y puerta. Escribo el orden de actuación en el dorso de la hoja de caja con bolígrafo y las tengo todas desde que empecé porque no tiro nada.',
    k2: 'El martes. Kevin presentando. Luego Priya, Dave, Debbie, descanso, cuatro más. Debbie salió a las 21:30. No a las 21:55, no a las diez menos cinco. A las 21:30, y se bajó a las diez menos diez.',
    k3: 'gil dice que estaba en la barra a las nueve y media',
    k4: 'Estaba en el escenario a las nueve y media. Yo le tenía el micro abierto. Sé dónde estaba porque estuve veinte minutos escuchándola respirar.',
    k5: 'Y Dave actuó antes que ella. Se bajó a las 21:28 y no volvió a entrar hasta el descanso.',
    k6: 'estás seguro del orden',
    k7: 'Está a bolígrafo en una hoja de caja en un cajón de ese edificio. No estoy seguro de muchas cosas pero de eso sí.',
    k8: 'Habla con Kevin. Estuvo al micrófono toda la parte central y ve esa sala mejor que la cámara, porque la cámara solo apunta hacia un lado.',

    // ---------------------------------------------------------------- t-ferdy
    f1: 'Vas a tener que tener paciencia conmigo con lo de los mensajes. Tengo un Nokia y lo tengo desde que se casó mi hija, y a todo el mundo le hace muchísima gracia hasta que necesitan que alguien siga teniendo un teléfono que funcione a las dos de la mañana.',
    f2: 'Treinta y un años. Glasgow, Leeds, las dos salas de Birmingham, el miércoles de Bristol que ya no existe. He presentado en casi todas las ciudades que puedas nombrar y me han pagado en casi todas.',
    f3: 'gil dijo que estabas en la parte de atrás',
    f4: 'Mira, yo estuve sujetando un micrófono delante de cuarenta personas durante toda esa parte. Hay una grabación mía haciéndolo. Es la misma grabación que él quiere que veas.',
    f5: 'Y te voy a contar lo que sí vi, ya que yo estuve toda la noche mirando hacia el lado contrario que esa cámara.',
    f6: 'Dave salió por la puerta de incendios a eso de las diez menos veinticinco y no volvió hasta el descanso. Yo presenté a Debbie y veía que la puerta se quedaba trabada detrás de ella los siete minutos enteros.',
    f7: 'He visto ese clip que subió al disco unas nueve veces. Es un clip precioso. Él está muy bien en él.',
    f8: 'Hace lo de los trenes, luego lo de su madre, y luego retoma lo del cisne. El martes no hay cisne. El cisne es de Priya y Priya actuó el martes, pero lo del cisne es del martes anterior, porque ella lo quitó.',
    f9: 'Dieciséis años llevo viendo a ese hombre hacer los mismos cinco minutos idénticos con la misma camisa idéntica y no se me había ocurrido nunca que eso le sirviera a nadie para nada.',

    // ------------------------------------------------------------------ t-roz
    r1: 'Llevo catorce años llevando esa sala y no le he dado una respuesta clara a un policía en mi vida, y esta semana les he dado nueve.',
    r2: 'Una cámara, una tarjeta, una noche. Ese es todo el sistema y es todo el sistema desde 2016 porque no pienso gastarme dinero en ello.',
    r3: 'Dave monta el canal. Coge la tarjeta al final, la va cortando durante la semana y sube los clips al disco. Ese es el acuerdo y no ha dado ningún problema nunca.',
    r4: 'Salvo que el martes la saqué a las nueve y volqué la primera mitad en mi portátil en la cabina, porque la gente de la gira quería el set de Debbie para el miércoles y yo no iba a estar esperando a Dave.',
    r5: 'La volví a meter a las nueve y veinte. Así que le diera a quien le diera lo que le diera, y esté lo que esté en ese disco, hay una copia de esa noche en mi portátil que él no ha visto nunca.',
    r6: 'y debbie',
    r7: 'Me contó lo de la gira el lunes y me pidió que no dijera nada hasta que se lo hubiera contado a Dave. Estaba preocupada por él. Preocupada de verdad, como se preocupa una por alguien que le cae bien.',
    r8: 'Empezaron el mismo mes. Quince años. Ella tenía una gira y él tenía un martes, y era ella la que se sentía mal por eso, lo cual te dice todo sobre los dos.',
  },

  /**
   * Digit for digit identical to the English. `c-card-gil` and `c-card-roz` are
   * the same unique object in two pairs of hands, which is why the engine holds
   * them as overlapping windows and why the labels name who had it and when.
   */
  claims: {
    'c-marnie-stage': 'Debbie: en el escenario, 21:30–21:50 (orden de actuación)',
    'c-gil-stage': 'Dave: en el escenario, 21:30–21:50',
    'c-marnie-bar': 'Debbie: en la barra, 21:30–21:50 (según el clip de Dave)',
    'c-ferdy-alley': 'Kevin: en el callejón, 21:30–21:50 (según Dave)',
    'c-ferdy-stage': 'Kevin: en el escenario presentando, 21:25–21:55',
    'c-gil-alley': 'Dave: en el callejón, 21:35–21:45 (según Kevin)',
    'c-card-gil': 'Dave: tenía la tarjeta de la cámara, 21:00–22:30',
    'c-card-roz': 'Roz: tenía la tarjeta de la cámara, 21:00–21:20',
    'c-roz-box': 'Roz: en la cabina de sonido, 21:00–21:20',
  },

  motives: {
    'm-tour':
      'Empezaron el mismo mes de 2009. Ella tenía ocho semanas de telonera y llevaba nueve días sin atreverse a decírselo, y lo sacó al callejón para hacerlo con cariño.',
  },

  contradictions: {
    'x-gil-alley':
      'Se situó en el escenario, y lo dijo el primero, antes de que se lo preguntara nadie. Kevin Boyce tenía el micrófono en la mano y lo vio salir por la puerta de incendios a las diez menos veinticinco, y veía que seguía trabada detrás de Debbie los siete minutos enteros que ella estuvo actuando.',
    'x-marnie-bar':
      'Su clip tiene a Debbie de pie en la barra detrás de él. Ella estaba en el escenario en ese minuto con el micro abierto, y Kit estaba escuchándola respirar. El clip es real y Dave sale en él de verdad. Es del martes anterior, que es la única semana en que Priya hizo lo del cisne.',
    'x-card':
      'Una cámara, una tarjeta, una noche, desde 2016, porque Roz no piensa gastarse dinero en ello. La sacó a las nueve para llevarle el set de Debbie a la gente de la gira y la tuvo en su portátil hasta las nueve y veinte. Hay una copia de esa noche que él no ha visto nunca.',
    'x-ferdy-stage':
      'Puso a un presentador de sesenta y un años en el callejón durante veinte minutos, en un grupo, ocho minutos después de que le dijeran que nadie le había preguntado nada. Kevin estaba al micrófono delante de cuarenta personas, en la misma grabación que Dave quería que viera todo el mundo.',
  },

  confrontation: {
    opening:
      'Haces un podcast. Eso es lo que haces. Hablas con gente que es mejor que yo sobre cómo llegaron a ser mejores que yo. Venga, adelante, esto va a estar muy bien.',
    beats: {
      'o-alley': {
        press:
          'Estabas en el escenario, dijiste, antes de que te lo preguntara nadie. Kevin tenía el micrófono y te vio salir por la puerta de incendios a las diez menos veinticinco.',
        rebuttal:
          'Kevin tiene sesenta y un años y lleva en esto desde antes de que yo naciera y esa noche presentó a once cómicos. No te sabría decir de qué color son las paredes.',
      },
      'o-bar': {
        press:
          'Tu clip tiene a Debbie en la barra detrás de ti. Ella estaba en el escenario con el micro abierto y Kit la tenía en los cascos. Y retomas lo del cisne de Priya, y Priya quitó lo del cisne.',
        rebuttal:
          'O sea que me equivoqué con un orden de actuación. He hecho cuatrocientas salas de estas. Son todas la misma sala.',
      },
      // o-card and o-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'o-card': {
        press:
          'Una cámara, una tarjeta. Roz la sacó a las nueve para llevarle el set de Debbie a la gente de la gira, y la tuvo en su portátil hasta las nueve y veinte. Hay una copia de esa noche que tú no has visto nunca.',
      },
      'o-why': {
        press:
          'Tenía ocho semanas de telonera y llevaba nueve días sentada encima porque no daba con la manera de decírtelo. Te sacó al callejón para hacerlo con cariño.',
      },
    },
    deflections: [
      'Eso es una sala llena de gente que me ha visto estrellarme durante dieciséis años. Claro que tienen una versión.',
      'Tú no te has subido a un escenario en tu vida.',
      'Tráeme algo que no sea alguien acordándose de un martes.',
    ],
    confession:
      'Lo dijo con muchísimo cariño. Eso es lo que no consigo que entienda nadie. Había dado con la manera de decirlo para que no me cayera encima como nada, y llevaba nueve días trabajándoselo, que es más de lo que le dedicaba a casi todo su material.\n\nY yo le dije enhorabuena y lo dije en serio unos cuatro segundos.\n\nLuego dijo la cosa que ella creía que era la parte amable. Dijo Dave, deberías venirte a hacer alguna de las pequeñas, yo te meto.\n\nYo te meto.\n\nEmpezamos el mismo mes. La misma lista, en la misma sala, en octubre de 2009, y ella me iba a meter.\n\nLevanté la mano. No fue más que eso. Hay un bordillo y está en cuesta y se cayó una vez.\n\nY después tenía veinte minutos y una cámara que llevo seis años montando todas las semanas, y me senté en ese camerino y supe exactamente qué hacer, porque tengo los mismos cinco minutos en once martes distintos y son idénticos. La misma camisa. El mismo orden. La misma risa en el mismo sitio.\n\nDieciséis años sin cambiar nunca nada, y la única vez que me sirvió de algo fue para eso.',
  },

  epilogue:
    'El portátil de Roz Antrim tenía encima la primera mitad entera de la noche de verdad, sin cortes, en una carpeta llamada DEBBIE FOR TOUR PPL. Veintidós minutos, un solo ángulo, y una puerta de incendios trabada en el borde del encuadre desde las 21:35.\n\nLas hojas de caja de Kit Nwachukwu entraron como prueba, cuarenta y una, a bolígrafo, en un cajón.\n\nKevin Boyce presentó el homenaje en el Hatch en febrero e hizo diecinueve minutos y no mencionó nada de aquello ni una vez, y luego hizo cuatro homenajes más en cuatro ciudades porque la gente no paraba de pedírselo.\n\nLas ocho semanas se las llevó otra persona. La mánager de la gira le mandó un mensaje a Roz pidiéndole que le trasladara que habían visto el set once veces antes de contratarla y que la habrían contratado con dos minutos.',
};
