import type { CaseTranslation } from '../caseText';

/**
 * Case 6 — «La regata larga». Spanish.
 *
 * Pack 6 carries the second arc connection, and `el Keeper` appears exactly
 * twice in the English — once in the confession, once in coda message three.
 * Both are kept in English, article included, and the count is asserted,
 * because arcAlias.test.ts counts mentions per case and keeping one while
 * paraphrasing the other breaks recognition at the exact moment the arc is
 * being handed over.
 *
 * Six things this had to get right.
 *
 * 1. The sport. This case is solvable only because rowing dresses eight people
 *    identically, so the kit vocabulary has to be the real Spanish of the sport
 *    and has to hold still: `el ocho` is the boat, `el ocho sénior` the crew,
 *    `la equipación` the kit, `el mono` the one-piece suit, `el gorro` the hat,
 *    `el puesto cinco` the seat, `la tripulación` the crew, `los suplentes` the
 *    spares, `la inscripción` the entry, `los caballetes` the trestles, `la
 *    cuenta de paladas` the rate count, `los parciales` the splits, `el
 *    pantalán` the raft. The English distinguishes `kit` from `suit` and so
 *    does this, because Graham hands Em a suit and Em is seen in kit, and the
 *    two words are doing different work.
 *
 * 2. The book. One record, one name: `el libro de salidas`, in x4, x6, x7, x9,
 *    x11, the motive, the l-why press line and the epilogue. `la columna de
 *    responsable` is the column his name is in. A second word for the book
 *    reads as a second document and the motive stops assembling. Note that the
 *    marshalling board was deliberately NOT called `el tablero de salidas` for
 *    this reason — it is `el panel`, so that nothing else in the pack shares a
 *    word with the launch book.
 *
 * 3. Times. Everything turns on a twenty-two minute window and on who was
 *    briefly out of it. `desde las once hasta las once y veinte` is the crew
 *    alibi; `las once y tres` is Carol watching Graham walk into the boathouse;
 *    `las once cero ocho` is Warren reading his own timecode aloud. That last
 *    one stays spelled in words because the English spells it — the digits
 *    11:08 appear once in the whole pack, in the x-saul-slipway revelation, and
 *    the difference between a man saying a time and a camera writing one is the
 *    reason the video is believed. English can say a bare `three minutes past`;
 *    Spanish cannot drop the hour without changing register, so the hour is
 *    restored and no minute moves.
 *
 * 4. Names and places. People, clubs and rivers stay: Pauline Vaine, Graham
 *    Brightwell, S. Brightwell, Warren Ako, Carol Prentice, Emma Kerr, Dorothy
 *    Nance, Robbie Nance, Ken Wardle, Ravensholt. Places that are descriptions
 *    are translated: el club, el hangar, el camino de sirga, la rampa, el bar
 *    del club, el río.
 *
 *    - `el hangar` for `the boathouse`. It is what Spanish rowing clubs
 *      actually call the boat hall, and this is a pack about club interiors and
 *      club jargon. `el cobertizo` is more transparent to a reader with no
 *      rowing and was rejected for that reason: the sport is the alibi here, so
 *      the sport gets its own words.
 *    - `la rampa` for `the slipway`, matching Pack 1, where the same word is
 *      already load-bearing in Spanish.
 *    - `el camino de sirga` for `the towpath`, which is the historical Spanish
 *      term and the only one that is a path rather than a bank. The prose keeps
 *      `la orilla` for the informal mentions exactly where the English keeps
 *      `the bank`, and the chips keep the formal name exactly where the English
 *      chips do. That mismatch is the English’s own and is mirrored rather than
 *      tidied; what makes it navigable in both languages is that `con los
 *      suplentes` is identical on the chip and in g9.
 *
 *    The victim is `Pauline Vaine` and Em is `Emma Kerr` in every field. The
 *    epilogue carried `Hester Vaine` and `Imogen Kerr` when this pack was first
 *    translated — the ids are `hester` and `imo`, and the rename had not
 *    reached that one string — and they were copied verbatim rather than
 *    repaired, on the rule that a translation which quietly fixes a fact is a
 *    translation nobody can diff. The English has since been corrected at
 *    source and this file with it, across thirteen stale names in seven packs.
 *    renameLeak.test.ts catches the class now: an id is the name a character
 *    was written under, so an id appearing capitalised in prose while not being
 *    part of the display name is an old name leaking.
 *
 * 5. Voice, on the accent axis established in Pack 5. In the English, who drops
 *    an apostrophe is characterisation. Em drops every one of them (`didnt`,
 *    `im`, `ive`, `thats`, `hes`, `arent`); Warren drops them in exactly three
 *    messages (`its` in w4 and w5, `wasnt`/`couldnt` in w7) and writes his
 *    negatives out in full everywhere else. Spanish has no apostrophe, so the
 *    written accent takes the job: Em drops every accent in every message,
 *    Warren drops them in w4, w5 and w7 and keeps them in c2, c4, c8, w1, w3,
 *    w8 and w9. Both halves are asserted.
 *
 *    The other axes carry over directly. Pauline and Carol write in capitals
 *    and finish every sentence — a president who signs minutes by hand and a
 *    woman of seventy-nine. Graham writes in capitals and never lands a final
 *    full stop, which is a captain asserting rather than closing, and it is the
 *    only orthographic thing separating him from the two women he is lying to.
 *    Warren and Em are lowercase throughout. The player is lowercase, short,
 *    lowercases other people’s names and never opens with ¿ — Carol does, which
 *    is part of the same distance.
 *
 * 6. The player has no gender. Nothing in this pack forced one, which is worth
 *    recording as much as a rephrase would be: Carol’s `you had the worst hands
 *    she ever bandaged` becomes `tenías las peores manos`, agreeing with
 *    `manos`; `remaste`, `no has bajado`, `no sabes`, `di lo que has venido a
 *    decir` and the Keeper’s `fuiste amable con la chica` are all
 *    agreement-free as written. The one place a translator would reach for an
 *    agreeing adjective is d1, and `si no me falla la memoria` replaces the
 *    English tag question rather than inventing one. Asserted in the test.
 *
 * British units stay as the English states them — `dos pies`, `quince años` —
 * and `el juzgado` carries the coroner’s office throughout, one word, because
 * Pauline is going there on the Monday and it is named four times.
 */
export const theLongCourseEs: CaseTranslation = {
  title: 'La regata larga',
  blurb:
    'Ocho personas con la misma equipación, en el agua, veintidós minutos. Las fotografías demuestran que había ocho en ese barco. No pueden demostrar qué ocho.',

  characters: {
    you: 'Tú',
    hester: 'Pauline',
    saul: 'Graham',
    imo: 'Em',
    warren: 'Warren',
    dilys: 'Carol',
  },

  places: {
    club: 'el club',
    boathouse: 'el hangar',
    bank: 'el camino de sirga',
    slipway: 'la rampa',
    bar: 'el bar del club',
    river: 'el río',
  },

  threads: {
    't-hester': 'Pauline',
    't-club': 'Ravensholt RC',
    't-dilys': 'Carol Prentice',
    't-imo': 'Em',
    't-warren': 'Warren Ako',
  },

  briefing: {
    causeOfDeath: 'Traumatismo. Una llave de portantes del soporte que hay junto a las puertas.',
    ruling:
      'Abierto. No hay ningún detenido, porque cuarenta y un socios estaban en el camino de sirga y el ocho sénior estaba en el agua.',
    opening:
      'Pauline Vaine llevaba diecinueve años de presidenta del Club de Remo Ravensholt y había firmado a mano todas las actas que hay en el armario.\n\nLa encontraron en el hangar a las doce y diez la mañana de la regata de fondo de otoño, con las puertas abiertas y los soportes medio vacíos.\n\nEl ocho sénior estuvo en el agua desde las once hasta las once y veinte. Todos tienen la misma coartada y todos la llevan puesta.',
  },

  messages: {
    // --------------------------------------------------------------- t-hester
    x1: 'No te acordarás de Dorothy Nance. Vino a la cena del club en 2011 y aguantó toda la cena sin comer nada.',
    x2: 'la madre de robbie',
    x3: 'Murió en marzo y su hermana ha estado vaciando la casa, y me ha mandado una caja porque mi nombre está en las actas.',
    x4: 'Dentro está el libro de salidas de aquella semana. El original, no el que llegó a la investigación judicial. No son el mismo libro y llevo desde el martes con los dos encima de esta mesa.',
    x5: 'distinto en qué',
    x6: 'A la investigación judicial le dijeron que Ken Wardle firmó la salida de los barcos aquella mañana. A Ken le dio un ictus en 2013 y murió en 2016 y para entonces no podía contradecir a nadie.',
    x7: 'El original pone S. Brightwell en la columna de responsable, de su puño y letra, para el sábado. Tenía veinticuatro años y era la única persona titulada que había en esa orilla y el río venía dos pies crecido.',
    x8: 'qué vas a hacer',
    x9: 'Llevarlo al juzgado el lunes. Y decírselo a Graham el sábado, antes que a ellos, porque un hombre tiene derecho a oírlo de una persona y no de una carta.',
    x10: 'pauline no hagas eso tú sola en un hangar vacío',
    x11: 'Las nueve y el bar está lleno de padres. Llevo el libro en el bolso y lo haré después de la carrera sénior, cuando esto se quede tranquilo.',

    // ----------------------------------------------------------------- t-club
    c1: 'A estas alturas los socios ya sabrán que ayer por la tarde encontraron a Pauline en el hangar. Me piden que diga que la policía querrá hablar con todo el que estuviera en las instalaciones y que el club permanecerá cerrado hasta nuevo aviso. Siento decirlo tan a las claras, no sé decirlo de mejor manera.',
    c2: 'diecinueve años. le enseñó a voltear la pala a la mitad de los que estáis aquí',
    c3: 'Por si le sirve a alguien, el ocho sénior embarcó a las once menos diez y no volvimos a tocar la orilla hasta las once y veinte. Ocho. Así que ya hay ocho personas localizadas por lo menos',
    c4: 'grabé la regata entera desde la orilla. de proa a popa, las dos orillas, de principio a fin. la policía tiene la tarjeta',
    c5: 'Pues asunto resuelto. Warren tiene a ocho de nosotros en vídeo durante toda la ventana y Carol tiene el camino de sirga',
    c6: 'Yo estuve en el camino de sirga desde las once menos veinte hasta casi mediodía con el panel, lo que me temo que significa que vi muchísimo de todo el mundo y muy poco de nada.',
    c7: 'Y dónde estaba Warren en mitad de todo eso. Porque tuvo una bronca con Pauline en los caballetes a las nueve y media que oyó medio club',
    c8: 'discutimos por una prueba de juveniles. por eso discutíamos. di el resto en voz alta graham',
    c9: 'Aquí no. Por favor.',

    // ---------------------------------------------------------------- t-dilys
    d1: 'Tú remaste aquí, si no me falla la memoria. Puesto dos, y Pauline decía que tenías las peores manos que había vendado y la mejor cabeza que había desperdiciado.',
    d2: 'Yo me pongo en el mismo sitio en todas las regatas de fondo, arriba del todo de la rampa, donde está el panel, porque ya no puedo con la caminata hasta la salida. Eso quiere decir que veo pasar a todo el mundo dos veces.',
    d3: 'viste a warren',
    d4: 'Warren Ako estuvo en el camino de sirga toda la regata con esa cámara en un monopié, gritándole a una tripulación que no podía oírlo, que es en lo que consiste entrenar por lo que a mí se me alcanza. No se movió en media hora.',
    d5: 'Y Pauline entró en el hangar un poco antes de las once con su bolso, y no salió mientras yo miraba, y estuve una hora mirando esas puertas sin pensar ni una vez en ellas.',
    d6: 'entró alguien más',
    d7: 'Graham Brightwell, a eso de las once y tres, con la equipación. Me acuerdo porque pensé que había vuelto a por una llave y no le di más vueltas que esa, y desde entonces no le he dado vueltas a otra cosa.',
    d8: 'él dice que estaba en el barco',
    d9: 'Todos los de esa tripulación llevan el mismo mono y el mismo gorro y yo tengo setenta y nueve. Se lo dije tal cual al agente y él lo apuntó y yo le oí decidir que yo no servía.',
    d10: 'Pregúntale a Emma Kerr. Es juvenil y estaba en el vestuario con equipación sénior a las diez y media, y los juveniles no llevan equipación sénior, y se puso coloradísima cuando le di los buenos días.',

    // ------------------------------------------------------------------ t-imo
    g1: 'perdon por no contestar en tanto tiempo. perdon. he estado sentada mirando esto',
    g2: 'reme en el puesto cinco del ocho senior en la regata. tengo diecinueve y no me he sentado en ese barco en mi vida',
    g3: 'quién te lo pidió',
    g4: 'graham. a las diez y veinte en los caballetes. dijo que se le habia ido la espalda en el calentamiento y que no habia tiempo de retirar la tripulacion y que si me sentaba y ya esta, sin montar un numero',
    g5: 'me dio su mono y su gorro. le dije y la inscripcion y me dijo que de las inscripciones se encarga carol y que carol tiene setenta y nueve',
    g6: 'y dijiste que sí',
    g7: 'llevo queriendo sentarme en ese barco desde los once. el lo sabia. lo sabe todo el mundo. eso no es una excusa solo te estoy diciendo la razon de verdad',
    g8: 'y luego pauline estaba muerta y graham puso en el grupo que eramos ocho en el agua y me di cuenta de que nadie nos iba a contar',
    g9: 'le dijo a todo el mundo que yo estaba en la orilla con los suplentes. esa es la parte que me puso mala. no solo me esta usando, esta diciendo donde estaba yo',
    g10: 'voy a perder el club, no. eso es en lo que me quedo atascada y se como suena eso con ella muerta',

    // --------------------------------------------------------------- t-warren
    w1: 'me metió en ese hangar delante de todo el club. cuarenta segundos tardó. llevo once años entrenando aquí',
    w2: 'el vídeo',
    w3: 'treinta y un minutos seguidos. no lo paro, no lo puedes parar, pierdes la cuenta de paladas. y hago una panorámica de la orilla entre tripulación y tripulación por costumbre',
    w4: 'las once cero ocho. me salgo del agua unos cuatro segundos y hay un tio en la rampa con un mono senior y el gorro quitado. es graham. el pelo, la constitucion, la cinta de la muñeca izquierda que lleva desde abril',
    w5: 'cuatro segundos. lo habre visto ya unas doscientas veces y el codigo de tiempo lo graba la camara, no es algo que yo haya escrito',
    w6: 'por qué discutiste con pauline',
    w7: 'porque yo queria a em en el ocho senior para la primavera y pauline dijo que no mientras graham fuera el capitan. pense que queria decir que em no estaba lista. queria decir otra cosa y todavia no lo podia decir',
    w8: 'me preguntó en agosto en qué año empecé. le dije que en 2014. dijo bien, y se fue, y no le di importancia durante cuatro meses',
    w9: 'anoche busqué a robbie nance. quince años. hay un banco junto a la salida con su nombre y llevo once años gritando parciales encima de él',
  },

  /**
   * Digit for digit identical to the English. `c-imo-bank` and `c-imo-river`
   * are the pair the case is named for — the same person in two places at once,
   * and the only reason a player can hold them side by side is that `con los
   * suplentes` reads the same on the chip as it does in g9.
   */
  claims: {
    'c-hester-bar': 'Pauline: en el bar del club, 10:00–10:40',
    'c-saul-river': 'Graham: en el río, en el ocho, 11:00–11:22',
    'c-dilys-bank': 'Carol: en el camino de sirga, 10:40–11:40',
    'c-warren-boathouse': 'Warren: en el hangar, 11:02–11:18 (según Graham)',
    'c-warren-bank': 'Warren: en el camino de sirga, 10:55–11:30 (según Carol)',
    'c-hester-boathouse': 'Pauline: en el hangar, 10:50–11:22 (según Carol)',
    'c-saul-boathouse': 'Graham: en el hangar, 11:03–11:08 (según Carol)',
    'c-imo-river': 'Em: en el río, en el ocho, 11:00–11:22',
    'c-imo-bank': 'Em: en el camino de sirga con los suplentes, 10:55–11:25 (según Graham)',
    'c-saul-slipway': 'Graham: en la rampa, 11:08–11:14 (en vídeo)',
  },

  motives: {
    'm-nance':
      'El libro de salidas original pone S. Brightwell en la columna de responsable para el sábado en que se ahogó Robbie Nance en 2009, y no al entrenador muerto que le dieron a la investigación judicial. Pauline tenía los dos libros encima de la mesa y los iba a llevar al juzgado el lunes.',
  },

  contradictions: {
    'x-saul-boathouse':
      'Se situó en el agua desde las once hasta las once y veinte, con siete testigos en el mismo barco. Carol Prentice estuvo una hora arriba del todo de la rampa y lo vio entrar en ese hangar con la equipación puesta a las once y tres, y pensó que había vuelto a por una llave.',
    'x-imo-seat':
      'Le dijo al club que Emma Kerr estaba en el camino de sirga con los suplentes. Estaba en el puesto cinco, con su mono y su gorro, porque se lo pidió a las diez y veinte en los caballetes y ella lleva queriendo ese puesto desde los once años. Salieron ocho en ese barco y volvieron ocho. Nadie cuenta nunca qué ocho.',
    'x-saul-slipway':
      'Warren Ako graba los treinta y un minutos enteros sin parar, porque parar hace perder la cuenta de paladas. A las 11:08 se sale del agua cuatro segundos y hay un hombre en la rampa con un mono sénior y el gorro quitado, con una cinta en la muñeca izquierda que lleva ahí desde abril. El código de tiempo lo graba la cámara.',
    'x-warren-bank':
      'Graham metió a Warren en el hangar delante de todo el club, en cuarenta segundos, apoyándose en una bronca por una prueba de juveniles. Warren no se movió de ese camino de sirga en media hora y Carol lo vio no moverse, y el vídeo que estaba haciendo es lo que lo remata.',
  },

  confrontation: {
    opening:
      'Diecinueve años llevando este club y ahora hay un policía en su despacho revisando los libros de actas. Di lo que has venido a decir.',
    beats: {
      'l-boathouse': {
        press:
          'Te situaste en el agua desde las once. Carol te vio entrar en ese hangar con la equipación puesta a las once y tres y pensó que habías vuelto a por una llave.',
        rebuttal:
          'Tiene setenta y nueve años y vamos todos vestidos igual. Lo ha dicho ella misma, a un agente de policía, con esas palabras.',
      },
      'l-seat': {
        press:
          'Le dijiste al club que Em estaba en la orilla con los suplentes. Estaba en el puesto cinco con tu mono, porque se lo pediste en los caballetes y ella lleva queriendo ese barco desde los once años.',
        rebuttal:
          'Una juvenil que se sentó en una tripulación sénior sin inscripción y que lleva tres días calculando cómo no acabar expulsada por ello. Cómo no va a tener una versión ahora.',
      },
      // l-slipway and l-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'l-slipway': {
        press:
          'Warren no para la cámara, porque parar hace perder la cuenta de paladas. Las once cero ocho, cuatro segundos, un hombre en la rampa con el gorro quitado y la cinta en la muñeca izquierda. El código de tiempo lo graba la cámara.',
      },
      'l-why': {
        press:
          'Y el libro de salidas que salió de casa de Dorothy Nance tiene tu nombre en la columna de responsable para ese sábado. No el de Ken Wardle. Pauline tenía los dos libros encima de la mesa e iba a ir al juzgado el lunes.',
      },
    },
    deflections: [
      'Eso es un club lleno de gente que se conoce desde hace treinta años. Cada uno tiene su versión.',
      'No has bajado por aquí desde que dejaste de remar. No sabes lo que es este sitio.',
      'Vuelve cuando tengas algo que no sea la vista de alguien.',
    ],
    confession:
      'El río venía dos pies crecido y los mandé salir igualmente, porque teníamos una prueba el fin de semana siguiente y yo tenía veinticuatro años y pensaba que quince días sin entrenar era lo peor que le podía pasar a nadie.\n\nRobbie me pidió que no saliéramos. En el pantalán, delante de otros dos chavales. Dijo que el agua se veía rápida y yo le dije que el agua siempre se ve rápida, y salió, porque se lo mandé yo.\n\nKen Wardle puso su nombre en esa columna tres días después. Yo no se lo pedí. Lo hizo él, y me dijo que lo había hecho, y yo no dije nada, y esa es toda mi defensa y no vale nada.\n\nEntró en el hangar a decírmelo a mí primero. Dijo que un hombre tiene derecho a oírlo de una persona. Diecinueve años y todavía pensaba que las cosas se hacían así.\n\nY hay una cosa más y la voy a decir porque acabarás enterándote.\n\nUn hombre que se hacía llamar el Keeper me telefoneó el jueves. Dijo que era del juzgado, que estaban haciendo una revisión, y que si podía confirmarle algunos detalles de 2009. Y luego habló de aquella mañana como si hubiera estado en la orilla.\n\nSabía que Robbie pidió no salir. Eso no salió nunca en la investigación judicial. No salió nunca en el periódico. Lo oyeron dos chavales y ninguno de los dos lo ha dicho nunca en voz alta, lo he comprobado, lo comprobé aquel año y lo he comprobado después.\n\nMe lo dijo como quien te recuerda una cosa en la que estuvimos los dos.\n\nY entonces me preguntó qué iba a hacer Pauline el lunes. Y se lo dije. Me senté en mi cocina y le conté a una voz por teléfono exactamente lo que iba a hacer ella y exactamente cuándo, y él no me contó nunca nada.',
  },

  coda: {
    from: 'Número desconocido',
    messages: [
      'Ravensholt. Ocho en un barco y nadie contando. Esa es buena y no la vi venir, cosa que ya no me pasa a menudo.',
      'Fuiste amable con la chica. Me di cuenta. Te costó dos días y yo no los habría gastado.',
      'Pregúntate cómo el Keeper, revisando una investigación judicial de 2009, sabía lo que se dijo en un pantalán delante de un chaval de quince años. Lo oyeron dos chavales. Ninguno de los dos lo ha repetido nunca.',
      'Te estás acercando a la pregunta equivocada. Sigue igualmente.',
    ],
  },

  epilogue:
    'La investigación judicial de 2009 se reabrió en primavera apoyándose en un libro de salidas que había pasado dieciséis años en una caja en el cuarto de invitados de Dorothy Nance.\n\nA Emma Kerr no la expulsaron. Carol Prentice se presentó ante la junta con una declaración escrita, se salió de ella por completo y terminó diciendo que el club le había pedido a una chica de diecinueve años que eligiera entre un barco y un hombre, y que mal podía luego quejarse el club de lo que eligió. Em remó en el puesto cinco con los sénior en primavera, con inscripción.\n\nWarren Ako le dio a la policía treinta y un minutos de río sin cortar y cuatro segundos de rampa.\n\nEl bolso de Pauline Vaine estuvo debajo de los caballetes todo el tiempo. Los dos libros seguían dentro. Había puesto un clip en la página y había escrito, a lápiz, en el margen: decírselo a Graham primero.',
};
