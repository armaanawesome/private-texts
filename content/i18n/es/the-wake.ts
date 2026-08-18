import type { CaseTranslation } from '../caseText';

/**
 * Case 5 — «El velatorio». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`. Nothing was added to
 * fill the silence.
 *
 * Six things this had to get right.
 *
 * 1. The formula. The case is forty-one people telling the same sentence word
 *    for word, so that sentence has exactly one Spanish form and never a
 *    second: `estábamos todos en el salón`. It is Donal in f4, Maureen in f6
 *    and u2, Eileen reporting it in r8, the player quoting it back in r5, the
 *    press line in w-garden, and the confession in the paragraph where he says
 *    he did not build it. Rewording any one of them turns a rehearsed
 *    collective alibi into six people who happen to agree, and the blurb’s
 *    `palabra por palabra` stops being true on the page.
 *
 * 2. Times. Everything happens inside half an hour and the whole case is which
 *    ten minutes. `desde las cuatro` is the alibi (f4, k4, w-garden press);
 *    `las cuatro y diez` is when it comes apart, and it has to read identically
 *    in Eileen’s kitchen (r3), in Cass’s account (k5), in both revelations and
 *    in both press lines. English can say a bare `at ten past`; Spanish cannot
 *    drop the hour without sounding like a different register, so the hour is
 *    restored in w-glasses and no minute moves. The chemist counter-time, `las
 *    once y diez` in u4, is three weeks earlier and is the one time in the pack
 *    that is not funeral day.
 *
 * 3. Names. People, families and streets stay: Tony, Donal, Maureen, Eileen,
 *    Cass, Cassie, Gerald Mulvey, Donal Fahey, Ballybough Road, los Mulvey. The
 *    briefing calls Tony `Anthony`, which is the funeral-notice version of his
 *    name and is kept for the same reason the English keeps it. Places that are
 *    descriptions are translated: la casa, el salón, la cocina, la sala del
 *    jardín, el patio lateral, la farmacia de Ballybough Road.
 *
 *    - `el salón` for `the front room`. `la sala de delante` is what it says
 *      and reads as furniture-catalogue Spanish across the eight repetitions
 *      this pack needs; `el salón` is what a Spanish speaker calls the room the
 *      speeches happen in. The front/back geography it drops is carried by the
 *      prose instead — Cass is `en la parte de atrás`, Tony dies `al fondo`.
 *    - `la sala del jardín` for `the garden room`. `la galería` is the exact
 *      architectural word and was rejected: it also means an art gallery, and
 *      this is the room three chips point at.
 *    - `el patio lateral` for `the side return`. A Dublin side return has no
 *      Spanish name. It has to be outdoors, hold a wheelie bin, hide a
 *      nineteen year old and be visible from a kitchen window, and `el patio
 *      lateral` is the only candidate that does all four. Bare `el patio`
 *      mirrors the English dropping `side` once it has been named.
 *
 *    The grandmother is `Eileen` in every field. She was `Bridie` in the
 *    epilogue when this pack was first translated — her id is still `bridie`
 *    and the rename had not reached that one string — and it was copied
 *    verbatim rather than repaired, on the rule that a translation which
 *    quietly fixes a fact is a translation nobody can diff. The English has
 *    since been corrected at source and this file with it. renameLeak.test.ts
 *    catches the class now.
 *
 * 4. Voice, and the one axis Spanish had to replace. In the English, who drops
 *    an apostrophe is characterisation: Cass never writes one (`im`, `didnt`,
 *    `grandads`), Donal drops them in exactly two messages (`thats` in f8,
 *    `dont`/`its` in f10), Tony once (`youre` in y10), and Maureen and Eileen
 *    never do. Spanish has no apostrophe to drop, so the axis moves to the
 *    accent — which is the same gesture, because dropping accents is what
 *    Spanish speakers actually do typing fast on a phone. Cass drops every
 *    accent in every message. Donal drops them in f8 and f10 and keeps them in
 *    f3, f4, f5 and f11. Tony drops one in y10 (`alla`). Maureen and Eileen
 *    keep every accent they are owed. The test asserts both halves, because an
 *    axis that only says who is sloppy is not an axis.
 *
 *    The rest carries over directly. Cass is lowercase throughout and never
 *    lands a full stop. Donal is lowercase and never lands one either, so the
 *    accents are what separate them. Maureen writes in capitals and trails off
 *    without terminal punctuation — every message except f12, which is one word
 *    and a full stop, and is her stopping her husband talking. Eileen is
 *    eighty-one and finishes every sentence she starts. The player is
 *    lowercase, short, lowercases other people’s names and never opens with ¿.
 *
 *    Irish `ye` in f1 maps onto Spanish `vosotros`, which is the one place this
 *    translation gains a distinction the English has to work for.
 *
 * 5. The player has no gender, and one line would have forced one. `you are the
 *    image of him` (y1) becomes `eres su vivo retrato` — the idiom agrees with
 *    `retrato`, not with the reader, where the literal `clavado` would have
 *    picked a gender in the pack’s first message. `alguien que no esté en esta
 *    familia hasta el cuello` (y3) drops a participle that would have agreed.
 *    Everything else addressed to the player was already safe: `no habías
 *    estado`, `viniste`, `nueve años fuera`, `no puedes llegar y tener razón`.
 *    Asserted in the test, because nothing else in the build would notice.
 *
 * 6. Units and institutions stay as the English states them. `cuatrocientas
 *    libras`, `veinte pies`, `ciento ochenta mililitros`, `5mg`. `los guardias`
 *    for the Garda throughout — one word, never `la policía`, because the
 *    family says it eleven times and two words would read as two forces.
 *    `la misa del mes` is the month’s mind, which Spanish Catholic practice has
 *    a name for.
 */
export const theWakeEs: CaseTranslation = {
  title: 'El velatorio',
  blurb:
    'Había cuarenta y una personas en la casa y todas cuentan la misma historia, palabra por palabra. Se montó para proteger a alguien que no lo hizo.',

  characters: {
    you: 'Tú',
    tony: 'Tony',
    donal: 'Donal',
    nuala: 'Maureen',
    bridie: 'Eileen',
    cass: 'Cass',
  },

  places: {
    house: 'la casa',
    frontroom: 'el salón',
    kitchen: 'la cocina',
    gardenroom: 'la sala del jardín',
    sidereturn: 'el patio lateral',
    chemist: 'la farmacia de Ballybough Road',
  },

  threads: {
    't-tony': 'Tony',
    't-family': 'Los Mulvey',
    't-bridie': 'Eileen',
    't-cass': 'Cass',
    't-nuala': 'Maureen',
  },

  briefing: {
    causeOfDeath: 'Un solo golpe en la nuca contra el escalón.',
    ruling:
      'Registrado como caída. Llevaba bebiendo desde las once y el escalón que baja a la sala del jardín es malo.',
    opening:
      'A Gerald Mulvey lo enterraron el jueves y cuarenta y una personas volvieron a la casa.\n\nA su hijo mayor, Anthony, lo encontraron a las cinco al pie del escalón que baja a la sala del jardín, con un vaso todavía en la mano y el historial de recetas de su padre en la bolsa que tenía al lado.\n\nNo habías estado en esa casa desde hacía nueve años. Tony fue quien te pidió que vinieras.',
  },

  messages: {
    // ----------------------------------------------------------------- t-tony
    y1: 'nueve años. nadie va a decir nada del tema el jueves, todos te van a mirar y te van a decir ay eres su vivo retrato',
    y2: 'no voy por ellos',
    y3: 'bien. porque hay una cosa que le quiero enseñar a alguien que no esté en esta familia hasta el cuello',
    y4: 'papá estaba con 5mg de la morfina líquida al final y la farmacia lo tiene apuntado con ciento ochenta mililitros en tres semanas. eso no es un error, eso es alguien recogiendo',
    y5: 'quién recogió',
    y6: 'esa es la parte que tengo y no la voy a poner en un mensaje. tengo el listado. lo llevo el jueves en la bolsa con las lecturas de la misa',
    y7: 'se lo pregunté a la cara el domingo, sin rodeos, y se rió de mí y me dijo tú cuídate, Tony. esa es la frase exacta. tú cuídate',
    y8: 'tony ve a los guardias',
    y9: 'con mi madre en la casa. después del funeral. no le voy a hacer eso a ella la semana que lo entierra, lo haré el viernes y lo haré como se debe',
    y10: 'has venido. te vi al fondo de la iglesia y casi voy para alla',
    y11: 'en la cocina con los sándwiches como un pasmado. búscame antes de los discursos, llevo la bolsa encima',

    // --------------------------------------------------------------- t-family
    f1: 'Para quien no se lo hayan dicho como se debe y no por terceros, Tony murió ayer en la casa. Se cayó en el escalón que baja a la sala del jardín. A Mamá la están atendiendo y por favor no la llaméis hoy, llamadme a mí, en fin, ya os iré diciendo lo de los preparativos cuando haya algo',
    f2: 'Enterré a un marido el jueves y a un hijo el jueves por la noche. No tengo nada que deciros a ninguno salvo que Dios tiene muy poco sentido de cuándo una cosa ya es suficiente.',
    f3: 'los guardias se portaron bien. entraron y salieron en una hora y dijeron lo que ya sabía todo el mundo en esa casa. mal escalón, bebiendo desde las once, nada más',
    f4: 'y estábamos todos en el salón desde las cuatro para los discursos. todos. eso es lo que les dije yo y eso es lo que les dijo todo el mundo',
    f5: 'yo estuve repartiendo los vasos todo el rato. pregúntale a cualquiera',
    f6: 'Estábamos todos en el salón. Todos y cada uno de nosotros. Quiero que quede dicho claramente porque ya hay comentarios y sé de dónde vienen',
    f7: 'llevaba una bolsa encima. dónde está la bolsa',
    f8: 'nueve años y esa es tu primera pregunta. asi que nada',
    f9: 'Contéstale, Donal.',
    f10: 'no se donde esta su bolsa. es una casa con cuarenta personas dentro y un hombre muerto al fondo',
    f11: 'y ya que estamos con las preguntas, Cass estuvo en la parte de atrás todo el rato y de eso tampoco ha dicho nadie ni una palabra',
    f12: 'Donal.',
    f13: 'Esa cría estaba conmigo. Se lo diré a ti y a un guardia y a un juez y no me lo van a preguntar dos veces.',

    // --------------------------------------------------------------- t-bridie
    r1: 'Viniste. Nueve años y viniste, y fue él quien te lo pidió. Ahí hay una lección en alguna parte y estoy demasiado cansada para ir a buscarla.',
    r2: 'estabas en el salón',
    r3: 'Yo estaba en mi cocina a las cuatro y diez buscando vasos, porque nadie le había dado un vaso a nadie y los discursos seguían sin ellos.',
    r4: 'Y desde la ventana de mi cocina se ve el patio lateral, y Donal Fahey estaba plantado ahí al teléfono de espaldas a la casa.',
    r5: 'les dijiste a los guardias que estaban todos en el salón',
    r6: 'Sí. Y lo volvería a hacer, y te voy a decir exactamente por qué, y luego piensa de mí lo que quieras.',
    r7: 'Cassie sacó cuatrocientas libras de mi bolso el miércoles. Maureen la pilló haciéndolo y yo las pillé a las dos, y acordamos entre las tres que el día que enterrábamos a su abuelo no era el día.',
    r8: 'Así que cuando el guardia preguntó dónde estaba cada uno, dijimos el salón, todos, juntos. Fue por ella. No fue por nadie más y no se me pasó por la cabeza ni un segundo que pudiera ser por nadie más.',
    r9: 'Esa cría estaba en el patio lateral vomitando de la vergüenza, y mi hijo se estaba muriendo a veinte pies de ella, y fui yo quien la mandó ahí fuera.',
    r10: 'Habla con ella. A mí no me habla y no se lo reprocho.',

    // ----------------------------------------------------------------- t-cass
    k1: 'la abuela dijo que escribirias',
    k2: 'cogi el dinero. no me voy a sentar aqui a hacer eso de ir acercandome a decirlo',
    k3: 'no te he preguntado por el dinero',
    k4: 'todo el mundo acaba preguntando por el dinero. estuve en el patio todo el rato. desde las cuatro hasta que salio la abuela a buscarme',
    k5: 'donal salio a eso de las cuatro y diez. no me vio, soy pequeña y hay un contenedor, esa es toda la razon por la que se algo',
    k6: 'qué hizo',
    k7: 'entro por la puerta de la sala del jardin. la de fuera. estuvo dentro un rato y luego volvio a salir y estaba distinto. no disgustado. como arreglado. se estiro la corbata en el cristal',
    k8: 'y llevaba la bolsa del tio tony. entonces no sabia que era la del tio tony. ahora lo se',
    k9: 'por qué no lo dijiste',
    k10: 'porque para decir donde estaba el tengo que decir donde estaba yo. y donde estaba yo es el patio lateral vomitando porque le habia robado a mi abuela el dia del funeral del abuelo',
    k11: 'me taparon todos. todos, sin pensarlo, nadie lo discutio siquiera. y llevo en la cama dandole vueltas a que la razon por la que el se ha librado es que estaban siendo buenos conmigo',

    // ---------------------------------------------------------------- t-nuala
    u1: 'Llevo veintiséis años casada con él y lo sé desde hace unas nueve horas, así que vas a tener que darme un minuto con la forma en que digo las cosas',
    u2: 'Les dije a los guardias que estábamos todos en el salón porque Mamá lo dijo primero y no la iba a dejar ahí plantada sola habiéndolo dicho. Ese es todo mi razonamiento y no es gran cosa',
    u3: 'las recetas',
    u4: 'Donal se encargaba de la farmacia. La última fue el martes, a las once y diez, y su nombre está en el registro porque te hacen firmar por la líquida. Las recogió todas ese mes, porque yo no podía entrar ahí y decirle el nombre de Papá a la chica del mostrador sin romperme',
    u5: 'Y les dijo a los guardias que él no había recogido ninguna nunca. Lo dijo delante de mí y yo le oí decirlo y no dije nada, porque en ese momento pensé que solo estaba siendo vago con el papeleo',
    u6: 'Ciento ochenta mililitros. Tony me lo dijo el domingo y yo le contesté que estaba dando el espectáculo en la misa del mes de su propio padre',
    u7: 'Papá tenía dinero. No mucho. El suficiente para que cuatro años más de residencia se lo llevaran todo y tres años dejaran algo',
    u8: 'No paro de volver al salón y de contar cabezas. He contado esa habitación cuarenta veces desde ayer y él no está, y yo dije que sí estaba, y habría seguido diciéndolo',
  },

  /**
   * Digit for digit identical to the English. The two prescription chips sit
   * three weeks before the funeral on the same timeline, which is why they read
   * as a morning rather than a span — a multi-day window renders an axis that
   * lies, and the English window comment says so.
   */
  claims: {
    'c-tony-kitchen': 'Tony: en la cocina, 15:00–15:55',
    'c-donal-front': 'Donal: en el salón, 16:00–16:30',
    'c-donal-toast': 'Donal: repartiendo los vasos, 16:00–16:30',
    'c-nuala-front': 'Maureen: en el salón, 16:00–16:30',
    'c-cass-gardenroom': 'Cass: en la sala del jardín, 16:05–16:25 (según Donal)',
    'c-bridie-kitchen': 'Eileen: en la cocina, 16:05–16:15',
    'c-donal-outside': 'Donal: al teléfono en el patio lateral, 16:05–16:25 (según Eileen)',
    'c-cass-return': 'Cass: en el patio lateral, 16:00–16:30 (según Eileen)',
    'c-donal-garden': 'Donal: en la sala del jardín, 16:10–16:20 (según Cass)',
    'c-donal-collected': 'Donal: firmó la última receta, 10:00–12:00',
    'c-donal-scripts': 'Donal: nunca recogió una receta, 09:00–13:00 (su versión)',
  },

  motives: {
    'm-morphine':
      'Recogió las recetas de Gerald todas las semanas del último mes y salieron ciento ochenta mililitros con una dosis de cinco mililitros. Tony tenía el listado de la farmacia en la bolsa e iba a ir a los guardias el viernes.',
  },

  contradictions: {
    'x-donal-garden':
      'Todos los adultos de esa casa les dijeron a los guardias la misma frase, y en casi todos era verdad. A las cuatro y diez Donal Fahey entró por la puerta de fuera de la sala del jardín, y una cría de diecinueve años escondida detrás de un contenedor lo vio volver a salir y estirarse la corbata en el cristal.',
    'x-donal-glasses':
      'Dijo que estuvo repartiendo los vasos todo el rato. Eileen Mulvey fue a su propia cocina a las cuatro y diez a buscar vasos, porque nadie le había dado uno a nadie, y desde esa ventana lo vio plantado en el patio lateral de espaldas a la casa.',
    'x-donal-scripts':
      'Les dijo a los guardias que él no había recogido nunca ninguna receta de Gerald. Su mujer las recogió durante un mes y sabe exactamente por qué ella no podía: no era capaz de decirle el nombre de su padre a la chica del mostrador. Salieron ciento ochenta mililitros de morfina líquida contra una dosis de cinco mililitros, y el listado estaba en la bolsa de Tony.',
    'x-cass-return':
      'Puso a la cría en la sala del jardín, que es la única acusación que alguien de esa familia hizo en voz alta. Ella estuvo en el patio lateral la media hora entera, vomitando de la vergüenza de cuatrocientas libras, y su abuela la mandó ahí fuera y puede decirlo.',
  },

  confrontation: {
    opening:
      'Nueve años fuera. Vuelves una tarde y ya conoces a esta familia, claro. Venga, adelante.',
    beats: {
      'w-garden': {
        press:
          'Les dijiste a los guardias que estaban todos en el salón desde las cuatro. A las cuatro y diez entraste por la puerta de fuera de la sala del jardín, y Cass te vio volver a salir y estirarte la corbata en el cristal.',
        rebuttal:
          'Una cría que le robó a su abuela el día de un funeral. Esa es tu testigo. Tiene todas las razones del mundo para poner a otro ahí fuera con ella.',
      },
      'w-glasses': {
        press:
          'Dijiste que estuviste repartiendo los vasos todo el rato. Eileen fue a la cocina a las cuatro y diez a buscar vasos, porque nadie le había dado uno a nadie, y te vio desde la ventana.',
        rebuttal: 'Tiene ochenta y un años y esa mañana había enterrado a un marido.',
      },
      // w-scripts and w-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'w-scripts': {
        press:
          'Y les dijiste que no habías recogido nunca las recetas de Gerald. Maureen las recogió durante un mes, y ella te puede decir exactamente por qué no podía.',
      },
      'w-why': {
        press:
          'Ciento ochenta mililitros contra una dosis de cinco mililitros. Tony tenía el listado en esa bolsa e iba a ir a los guardias el viernes. Tú eres el que le dijo que se cuidara.',
      },
    },
    deflections: [
      'Eso es una casa llena de duelo y la estás leyendo como un libro de cuentas.',
      'No estuviste aquí en nueve años. No puedes llegar y tener razón.',
      'Tráeme una cosa. No lo que alguien sintió en un funeral.',
    ],
    confession:
      'Salió al patio a decírmelo. No a amenazarme. Eso era lo de Tony, no sabía amenazar, salió a decirme lo que iba a hacer el viernes para que yo no me enterase por un guardia.\n\nEstaba siendo decente. Llevaba la bolsa bajo el brazo y estaba siendo decente.\n\nY le dije entra un momento, y entró él delante de mí, y el escalón que baja a esa sala del jardín es un mal escalón desde 1994.\n\nQuiero contar la otra parte porque sin ella no te vas a creer la primera.\n\nYo no monté nada de aquello. El salón. Todos juntos. No dije ni una palabra para que pasara eso. Lo hicieron ellas solas, en unos cuatro segundos, en el recibidor, porque Cassie estaba llorando y Eileen dijo que estábamos todos en el salón y Maureen dijo sí, estábamos, y se miraron y ya estaba hecho.\n\nY yo me quedé ahí de pie y dejé que se me cerrara por encima como el agua.\n\nEso es lo que hice. Robé una cosa que era para una cría.',
  },

  epilogue:
    'A Gerald Mulvey lo exhumaron en febrero. El informe usó la palabra compatible cuatro veces y no quiso ir más allá, y no le hizo falta, porque para entonces estaba el libro de la farmacia y estaba Maureen.\n\nDeclaró durante dos días y no preguntó ni una vez qué le iba a costar a ella. Cuando le preguntaron por qué había dicho lo del salón, contestó: porque lo dijo mi madre primero.\n\nEileen Mulvey no fue al juicio. Mandó una carta para que la leyeran, de una línea, pidiendo que se le dijera al tribunal que su nieta había estado en el patio lateral todo el rato y no había tenido nada que ver con nada de aquello.\n\nCass devolvió las cuatrocientas libras a plazos a una mujer que no se las pidió ni una sola vez.',
};
