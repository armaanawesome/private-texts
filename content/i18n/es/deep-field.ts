import type { CaseTranslation } from '../caseText';

/**
 * Case 4 — «Campo profundo». Spanish.
 *
 * Standalone pack: no Listener, no coda, and nothing here mentions `el Keeper`.
 * The silence is the point, so nothing was added to fill it.
 *
 * Five things this had to get right.
 *
 * 1. The clocks. The whole case is one record kept in a different clock from
 *    the people reading it, so the three names never vary: `la hora de la
 *    estación`, `UTC`, and `el registro de la plataforma`. Maria says `La hora
 *    de la estación es UTC más tres` in p3 and Erik says `qué reloj lleva` in
 *    n6, and those two sentences are the case. A second word for the log —
 *    `el diario`, `el parte` — would read as a second document and the
 *    deduction stops being available. `el control de acceso` is deliberately a
 *    different record, exactly as the English keeps card access apart, and so
 *    is `la cámara`.
 *
 * 2. Times. Every time survives in the same grammatical position and the same
 *    minute. Mal puts himself on the platform `desde las diez menos cuarto
 *    hasta las once` (w4); Theo puts him in the corridor `a las diez y diez`
 *    (w6) and the camera has a sleeve at `las veintidós once` (v2). The log
 *    reads `21:45` and converts to `la una menos cuarto de la madrugada` (p3),
 *    which is the only arithmetic the player has to trust. Note that the engine
 *    holds that converted window as raw minutes past the case zero — 00:45 is
 *    stored as 24:45 — so the chip test wraps mod 1440.
 *
 * 3. Names. People and ships and stations stay: Laura, Mal, Erik, Maria, Theo,
 *    Byrne, Otxoa, Sandved, Rothera Ridge, el Shackleton, Boulder, Dunfermline,
 *    Cambridge. The places that are descriptions are translated, because `the
 *    cold porch` sitting untranslated inside a Spanish sentence reads as machine
 *    output: la estación, el módulo de dormitorios, el comedor, la consulta, el
 *    vestíbulo frío, fuera, la plataforma de instrumentos, la torre
 *    meteorológica. `el vestíbulo frío` is the unheated airlock between the
 *    station and forty below; `zaguán` was tried and is too domestic for a
 *    building on the ice. Bare `el vestíbulo` and bare `la torre` mirror the
 *    English dropping `cold` and `met` once the thing has been named, and bare
 *    `el módulo` does the same for the block.
 *
 *    Left as the English has it, deliberately: the briefing calls the victim
 *    `Laura Byrne` and the epilogue calls the three of them `Maria Otxoa`, `Rune
 *    Sandved` and `Laura Byrne`, while every message and the character table call
 *    them Maria, Erik and Laura. That is an inconsistency in the source — the
 *    ids are still orla/pilar/rune and the rename did not reach those two
 *    fields — and it is copied rather than repaired, because a translation that
 *    quietly fixes a fact is a translation nobody can diff. Flagged for the
 *    coordinator. If the English is corrected, four strings here follow it:
 *    briefing.opening and epilogue paragraphs two, three and four.
 *
 * 4. Voice. Six people write differently and the difference is the character.
 *    Maria is the station leader writing for the record: capitals, full stops,
 *    finished sentences. Mal writes the same way and it reads as defence rather
 *    than authority. Laura opens lowercase and never lands the final full stop,
 *    typing fast at the end of a shift. Theo is lowercase throughout with no
 *    final stop either, and he capitalises a person when he is talking *about*
 *    them (h5, h7, h8, v3) and not when he is talking *to* them (`mal te vi en
 *    el módulo`) — that distinction is preserved. Erik cannot read well and
 *    sends voice notes, so his lines are transcriptions and are the cleanest
 *    prose in the pack, which is the joke and it survives. The player is
 *    lowercase, short, lowercases other people's names too, and never opens a
 *    question with ¿.
 *
 *    One axis Spanish loses: Laura capitalises `I` mid-line in the English and
 *    Spanish drops the subject pronoun, so her messages now open lowercase
 *    without exception. Nothing was invented to replace it — the axis was
 *    English orthography rather than characterisation, and her real markers
 *    (lowercase opening, no closing full stop, clinical nouns) all carry over.
 *
 * 5. The player has no gender, and two lines in this pack would have forced one.
 *    Both were rebuilt rather than resolved:
 *
 *    - confrontation.opening: `a man in Cambridge` → `alguien en Cambridge`.
 *      The English states the player is a man, which the pack has no business
 *      knowing. playerNeutral.test.ts does not catch it because the rule only
 *      matches a copula — flagged for the coordinator.
 *    - deflection 2: `you are very sure` → `no tienes ninguna duda`. The literal
 *      `muy seguro` picks a gender; the rebuilt line keeps the sarcasm and
 *      marks nobody.
 *
 *    Everything else addressed to the player is already agreement-free:
 *    `te situaste`, `te reconoció`, `la última persona a la que escribió`
 *    (feminine by `persona`, not by the reader), `su contacto en Cambridge`.
 *    Both rephrases are asserted in the test, because nothing else in the build
 *    would notice if they were reverted.
 *
 * Units stay as the English states them — `once mil millas`, `doscientos
 * metros`, `menos cuarenta y uno` — because converting them would change facts
 * rather than translate them.
 */
export const deepFieldEs: CaseTranslation = {
  title: 'Campo profundo',
  blurb:
    'Seis personas, cuatro meses de oscuridad y nadie puede irse. La coartada es una marca de tiempo, y la marca de tiempo está en el reloj equivocado.',

  characters: {
    you: 'Tú',
    orla: 'Laura',
    mal: 'Mal',
    rune: 'Erik',
    pilar: 'Maria',
    theo: 'Theo',
  },

  places: {
    station: 'la estación',
    block: 'el módulo de dormitorios',
    mess: 'el comedor',
    surgery: 'la consulta',
    coldporch: 'el vestíbulo frío',
    // `fuera`, not `el exterior`. The prose says `estaba fuera` and
    // `fuera en la torre meteorológica`, and the chip for c-rune-outside says
    // `fuera` too — so a place called `el exterior` was the only thing in the
    // case using that word for it, and matching a chip to a sentence is the
    // move the whole game is made of. `exterior` also already appears in this
    // pack meaning outer, in `la capa exterior` and `la puerta exterior`.
    outside: 'fuera',
    telescope: 'la plataforma de instrumentos',
    metmast: 'la torre meteorológica',
  },

  threads: {
    't-orla': 'Laura',
    't-station': 'Rothera Ridge',
    't-theo': 'Theo',
    't-rune': 'Erik',
    't-pilar': 'Maria Otxoa',
    't-porch': 'Cámara del vestíbulo frío',
  },

  briefing: {
    causeOfDeath: 'Hipotermia. Salió del vestíbulo frío sin la capa exterior.',
    ruling:
      'Registrado como muerte accidental. Nadie puede llegar a la estación hasta octubre y nadie lo ha pedido.',
    opening:
      'Rothera Ridge lleva tres relojes. La hora de la estación para las personas, UTC para los instrumentos, y lo que cada uno tenga corriendo en su propia muñeca desde casa.\n\nLaura Byrne era la médica. La encontraron en el vestíbulo frío a las dos de la mañana con la capa exterior todavía en su percha, y los seis acordaron entre ellos que había salido a mirar el cielo y lo había calculado mal. El siguiente avión es en octubre.\n\nEres su contacto en Cambridge y la última persona a la que escribió.',
  },

  messages: {
    // ----------------------------------------------------------------- t-orla
    o1: 'día sesenta y uno sin sol. Theo ha empezado a ponerles nombre a las patatas. te lo cuento para que Cambridge lo tenga en el expediente',
    o2: 'anotado. cómo van los cribados anuales',
    o3: 'por eso mismo estoy despierta. tengo un resultado de cribado que no quiero tener',
    o4: 'fibrilación auricular, y no de las dudosas. En un hombre de sesenta y uno, con diecinueve campañas encima, que no se ha marchado de este continente ni una sola vez que haya podido elegir',
    o5: 'el protocolo es el protocolo. eso es salida en el primer avión',
    o6: 'ya sé lo que es. he escrito la redacción dos veces y la he borrado dos veces y lo voy a presentar por la mañana porque no hay ninguna versión de esto en la que no lo haga',
    o7: 'no va a tener otra campaña. No va a tener otra nada. Vino en 2007 y ha vuelto todos los años y lo he visto bajarse de ese avión en octubre como un hombre que vuelve a casa',
    o8: 'se lo has dicho',
    o9: 'esta noche. no voy a presentar un informe sobre un hombre sin decírselo antes a la cara, en eso consiste el trabajo',
    o10: 'se lo he dicho. estuvo muy tranquilo y muy educado y me dio las gracias, y eso fue peor que si hubiera gritado',
    o11: 'salgo diez minutos. estamos a menos cuarenta y uno y encima de nosotros no hay más que todo eso. hablamos mañana x',

    // -------------------------------------------------------------- t-station
    w1: 'Cambridge. Laura Byrne murió anoche. Erik la encontró en el vestíbulo frío a las 02:10, hora de la estación. Cuarenta minutos de reanimación. Lo registro como muerte accidental y enviaré el informe completo en la comunicación de la mañana.',
    w2: 'Antes de que nadie me lo pregunte: sí, sé lo que seis personas y cuatro meses de oscuridad le hacen a un informe así. Lo he escrito sin torcer nada de todas formas.',
    w3: 'salió sin la capa exterior. me ha reñido por eso exactamente. dos veces. lo escribió en la pizarra del vestíbulo',
    w4: 'Estuve en la plataforma desde las diez menos cuarto hasta las once, haciendo el apagado. No vi nada y no oí nada y lo siento, porque estaba a doscientos metros.',
    w5: 'El registro de la plataforma me tendrá. Anota un operador cada vez que la cúpula se mueve y la cúpula se movió toda la noche.',
    w6: 'mal te vi en el módulo a las diez y diez. viniste por el pasillo y no me dijiste nada',
    w7: 'Viste a alguien con una parka roja en un pasillo a oscuras. En esta estación hay cuatro parkas rojas y una de ellas es la tuya.',
    w8: 'Y ya que estamos, Erik estuvo fuera en la torre la mitad de la noche y nadie le ha hecho ni una sola pregunta, y me gustaría saber por qué.',
    w9: 'Basta. Nadie de esta estación acusa a nadie de esta estación por un enlace de radio con Cambridge escuchando. Traédmelo a mí.',

    // ----------------------------------------------------------------- t-theo
    h1: 'le he cocinado durante seis meses y he hecho cuatrocientas comidas en esa cocina y esta noche no puedo hacer ni una',
    h2: 'estuve en el comedor desde las nueve hasta las once haciendo el pan de mañana. desde el pasaplatos del comedor se ve el pasillo entero, esa es la única razón por la que sé algo',
    h3: 'cuándo viste a laura por última vez',
    h4: 'las diez y cuarto, cruzando el vestíbulo. llevaba las botas de interior. le he dado cien vueltas a eso porque le vi las botas de interior y no dije nada',
    h5: 'y era Mal el que estaba en ese pasillo. sé cómo son las parkas. sé cómo anda. diecinueve campañas de un hombre son una forma que se aprende',
    h6: 'dice que erik estaba fuera',
    h7: 'Erik estuvo a la radio con el Shackleton todo el rato. estuve de pie a su lado diez minutos de ese rato y el barco lo anota por su parte. eso no es una cosa sobre la que se pueda ser vago',
    h8: 'habla con Erik. no te va a escribir, manda las de voz. no le des vueltas a eso, aquí todo el mundo sabe por qué y aquí nadie lo menciona',

    // ----------------------------------------------------------------- t-rune
    n1: '[nota de voz, 0:41] Fui yo quien la encontró. Las dos diez. Había ido al vestíbulo porque la puerta no asienta bien con este frío y la reviso lo último. No voy a describir cómo estaba.',
    n2: '[nota de voz, 0:19] Las hago así porque no leo bien y nunca me he llevado bien con teclear. Maria lo sabe desde hace nueve años. No es un secreto, solo es cansado.',
    n3: 'mal dice que estabas en la torre',
    n4: '[nota de voz, 1:02] Estuve al aparato con el Shackleton desde las diez menos diez hasta las diez y media. Cuarenta minutos sobre un trasvase de combustible que no va a ocurrir hasta diciembre. Su sala de radio anota cada llamada por su parte y Cambridge puede preguntárselo esta noche, así que hazlo, por favor, lo prefiero.',
    n5: '[nota de voz, 0:33] Ha dicho la torre porque la torre es el único sitio de esta estación que no ve nadie. No es tonto. Esa es la cuestión con él, no ha sido tonto ni una sola vez.',
    n6: '[nota de voz, 0:28] Pregúntale a Maria por el registro de la plataforma. Pregúntale qué reloj lleva. Se lo he dicho dos veces y se me ha quedado callada dos veces, y yo soy mecánico, así que qué voy a saber yo.',

    // ---------------------------------------------------------------- t-pilar
    p1: 'Tengo seis personas y ciento once días. Diga lo que te diga ahora, por la mañana sigo teniendo que darles el desayuno a todos juntos. Quiero eso en el acta antes que el resto.',
    p2: 'Erik tiene razón con lo del registro y yo he ido lenta porque no quería que la tuviera. El registro de la plataforma escribe en UTC. Escribe en UTC desde que se montó el instrumento, porque el instrumento es de un consorcio de Boulder y a Boulder le da igual qué hora es aquí.',
    p3: 'La hora de la estación es UTC más tres. Así que la entrada que lo pone en la cúpula desde las 21:45 lo pone allí desde la una menos cuarto de la madrugada, hora de la estación. Tres horas después de que Theo la viera cruzar ese vestíbulo.',
    p4: 'El registro no es su coartada. El registro es la constancia de adónde fue después.',
    p5: 'la consulta',
    p6: 'Control de acceso. Su tarjeta abrió la consulta a las 22:35 y otra vez a las 22:44. Laura ya estaba en ese vestíbulo para entonces. No tenía ningún motivo clínico para estar en esa sala a ninguna hora y no lo ha tenido nunca en diecinueve campañas.',
    p7: 'Su expediente de cribado no está en el sistema. La copia en papel no está en el cajón. He mirado dos veces y he hecho mirar a Theo una vez para que no sea solo yo quien lo diga.',
    p8: 'Me contó el martes lo que había encontrado y lo que iba a tener que hacer con ello. Me preguntó si diecinueve campañas le compraban algo a un hombre. Le dije que no. He pensado en esa respuesta cada hora desde entonces.',
    p9: 'Y yo estuve en el módulo desde las nueve y media hasta medianoche con la puerta abierta, haciendo la hoja de cálculo del reabastecimiento, que es la coartada menos útil que ha tenido nadie nunca.',

    // ---------------------------------------------------------------- t-porch
    v1: 'hay una cámara en el vestíbulo. es para la junta de la puerta, apunta a la bisagra, no es cosa de seguridad y no graba sonido',
    v2: 'las veintidós once. alguien entra en el encuadre por el lado del pasillo, se queda en las perchas once segundos y sale por la puerta exterior detrás de ella. no se ve la cara. se ve una manga',
    v3: 'la manga tiene el roto del puño. Mal se hizo ese puño con el cabrestante en abril y rechazó una parka nueva porque tiene esa desde 2011',
    v4: 'por qué no ha mirado esto nadie antes',
    v5: 'porque es una cámara de junta de puerta y se sobrescribe cada diez días y a ninguno se nos ocurrió que fuera una cosa que mira a la gente. miró a una persona',
  },

  /**
   * Digit for digit identical to the English, because these are the chips the
   * player lays side by side. `c-mal-log` is the one that matters: the engine
   * holds it as 24:45–25:30 and the chip says 00:45–01:30, which is the whole
   * teaching move of the pack rendered in four digits.
   */
  claims: {
    'c-orla-surgery': 'Laura: en la consulta, 21:00–21:40',
    'c-mal-telescope': 'Mal: en la plataforma de instrumentos, 21:45–23:00',
    'c-mal-block': 'Mal: en el módulo de dormitorios, 22:00–22:10 (según Theo)',
    'c-rune-outside': 'Erik: fuera en la torre meteorológica, 22:00–22:20 (según Mal)',
    'c-theo-mess': 'Theo: en el comedor, 21:40–23:00',
    'c-orla-coldporch': 'Laura: en el vestíbulo frío, 21:55–22:10 (según Theo)',
    'c-rune-radio': 'Erik: a la radio con el barco, 21:50–22:30 (según Theo)',
    'c-mal-log': 'Mal: en la cúpula, 00:45–01:30 (registro de la plataforma, convertido)',
    'c-mal-surgery': 'Mal: en la consulta, 22:35–22:50 (control de acceso)',
    'c-pilar-block': 'Maria: en el módulo de dormitorios, 21:30–24:00',
    'c-mal-coldporch': 'Mal: en el vestíbulo frío, 22:10–22:25 (cámara)',
  },

  motives: {
    'm-medevac':
      'Laura le había encontrado fibrilación auricular en su cribado anual. El protocolo es evacuación médica en el primer avión, y a los sesenta y uno y con diecinueve campañas no habría habido una vigésima.',
  },

  contradictions: {
    'x-mal-block':
      'Se situó a doscientos metros, en la plataforma, desde las diez menos cuarto. Theo lo vio cruzar el pasillo de los dormitorios a las diez y diez, desde un pasaplatos del comedor que lo ve entero a lo largo, y lo reconoció por cómo anda.',
    'x-mal-porch':
      'La cámara de la junta de la puerta apunta a una bisagra y a nadie se le ocurrió nunca que fuera una cosa que mira a la gente. A las 22:11 una manga con el puño roto se queda en las perchas once segundos y luego sale por la puerta exterior detrás de ella. Se hizo ese puño con el cabrestante en abril y no quiso una parka nueva.',
    'x-mal-surgery':
      'Su tarjeta abrió la consulta a las 22:35 y otra vez a las 22:44, mientras él dice que seguía en la plataforma y mientras Laura ya estaba en ese vestíbulo. Su expediente de cribado no está en el sistema y la copia en papel no está en el cajón, y en diecinueve campañas no ha tenido nunca un motivo clínico para estar en esa sala.',
    'x-rune-mast':
      'Erik estuvo al aparato con el Shackleton cuarenta minutos por un trasvase de combustible que no va a ocurrir hasta diciembre, y el barco anota su parte de cada llamada. Mal lo puso en la torre meteorológica porque la torre meteorológica es el único sitio de esa estación que no ve nadie, y porque un hombre que contesta con notas de voz es el hombre más fácil de volver raro que hay en el hielo.',
  },

  confrontation: {
    // `a man in Cambridge` in the English. The player has no gender, so this is
    // `alguien en Cambridge` — the contempt is for the distance, not the man.
    opening:
      'Diecinueve campañas. He enterrado a dos personas de esta estación y a una la llevé yo mismo, y ahora es un enlace de radio y alguien en Cambridge. Adelante.',
    beats: {
      'f-block': {
        press:
          'Te situaste en la plataforma desde las diez menos cuarto. Theo te vio bajar por el pasillo de los dormitorios a las diez y diez y te reconoció por cómo andas.',
        rebuttal:
          'Theo lleva sesenta y un días a oscuras y en esta estación hay cuatro parkas rojas. Quiere que sea alguien. Aquí abajo ya todo el mundo quiere que sea alguien.',
      },
      'f-porch': {
        press:
          'La cámara del vestíbulo tiene una manga en las perchas a las 22:11, once segundos, y luego fuera por la puerta exterior detrás de ella. El puño está roto. Te lo hiciste con el cabrestante en abril y no quisiste una parka nueva.',
        rebuttal:
          'Un puño. En un edificio donde todos llevamos lo mismo y nos lo prestamos todos los días del invierno.',
      },
      // f-surgery and f-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'f-surgery': {
        press:
          'Tu tarjeta abrió la consulta a las 22:35 y otra vez a las 22:44. Su expediente de cribado ha desaparecido del sistema y la copia en papel ha desaparecido del cajón, y no has tenido nunca ni una sola razón para estar en esa sala.',
      },
      'f-why': {
        press:
          'Te encontró fibrilación auricular en tu cribado anual y lo iba a presentar por la mañana. Primer avión de vuelta, y ninguna vigésima campaña.',
      },
    },
    deflections: [
      'Eso es Cambridge hablando. Cambridge no ha estado nunca aquí a oscuras.',
      'Tráeme una cosa y no la impresión de una cosa.',
      // `you are very sure` genders the player in Spanish. Rebuilt, not resolved.
      'Estás a once mil millas y no tienes ninguna duda.',
    ],
    confession:
      'Vino y me lo dijo ella misma. No tenía por qué hacerlo. Podía haberlo presentado y dejar que me enterase en octubre, cuando llegara el avión y hubiera un asiento con mi nombre.\n\nLe di las gracias. He vuelto sobre eso y sí le di las gracias, y en ese momento lo sentía de verdad.\n\nLuego estuve sentado en el borde de la litera cerca de una hora y fui sacando lo que era el resto. Un piso en Dunfermline. Un sillón. Una televisión encendida por la tarde. Diecinueve años de lo único para lo que he servido en la vida, terminados, por un ritmo.\n\nSalió a mirar el cielo. Lo hacía casi todas las noches. Fui detrás de ella y no planeé ni una sola cosa, y quiero que eso se entienda porque no es una excusa, es solo lo que pasó.\n\nLlevaba las botas de interior. Yo le volví a colgar la capa exterior en la percha. Esa es la parte que sí decidí, y lo hice en unos cuatro segundos, y son los cuatro segundos los que hacen que sea lo que es.',
  },

  epilogue:
    'La estación terminó el invierno. No había otra opción y no había otro sitio donde meterlo, así que durante ciento once días seis personas desayunaron juntas y cinco de ellas lo sabían.\n\nMaria Otxoa escribió un informe de doce páginas y no suavizó ni una línea, y después cocinó con Theo todas las noches hasta octubre porque Theo ya no podía hacerlo solo.\n\nErik Sandved dio su declaración en once notas de voz. La transcriptora de Cambridge dijo después que era la declaración de testigo más clara que había pasado a máquina nunca, y preguntó si era escritor.\n\nEl expediente de cribado de Laura Byrne no se recuperó nunca. La arritmia se confirmó en Rothera en el reconocimiento médico de octubre, por un médico que había llegado en avión esa mañana y que no había conocido nunca a ninguno de los dos.',
};
