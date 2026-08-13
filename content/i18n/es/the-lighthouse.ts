import type { CaseTranslation } from '../caseText';

/**
 * Case 1 — "El faro". Spanish.
 *
 * Three things this had to get right, in this order.
 *
 * 1. Times. Every time in the English survives in the same grammatical position,
 *    and in the same *form* the English chose. Where the English writes digits
 *    it stays digits (Fiona logs `21:40`, `22:00`, `21:47`, because a survey log
 *    is the one voice in this case that writes a clock down); where the English
 *    writes words it stays words (`twenty to ten` is `las diez menos veinte`,
 *    never 21:40). That split is the case. Fiona beats Mairi because Fiona has a
 *    number and everyone else has a memory, and a translation that tidies the
 *    village up into digits hands the player the answer on the first read.
 *
 *    The village clock is also the English clock: the chips carry 24-hour times
 *    and the prose carries the 12-hour spoken form, exactly as the English does.
 *    `ten past ten` on Callum, `22:05–22:15` on his chip. The player matches
 *    `las diez y diez` to `22:05–22:15` by the same small step they take in
 *    English, and neither half was allowed to drift.
 *
 * 2. Names. People and businesses stay: Ruth Calder, Mairi Bell, Callum, Fiona
 *    Trian, and Ardnoe itself. Places that are descriptions are translated,
 *    because `the cliff path` sitting untranslated inside a Spanish sentence is
 *    the sound of a machine. Full list, so every decision is visible in review:
 *
 *      you        → Tú              point     → Punta Ardnoe
 *      ruth       → Ruth            lighthouse→ el faro
 *      mairi      → Mairi           path      → el camino del acantilado
 *      callum     → Callum          harbour   → el puerto
 *      esme       → Fiona           cafe      → el café
 *                                   slip      → la rampa
 *                                   cottage   → la casita
 *                                   ferry     → el ferry
 *
 *    `Punta Ardnoe` keeps the toponym and translates the feature, the way
 *    Spanish writes any headland. It matters that `Ardnoe` survives intact: it
 *    is the thread title, and it is the first word the Listener says in the
 *    coda. `la rampa` is where Callum mends the stern line and it is one word
 *    everywhere — chip, message and confrontation — because that chip against
 *    the café chip is the first contradiction the player proves.
 *
 * 3. Voice. Five people type differently and the difference is the character.
 *    Ruth is lowercase and never lands a full stop at the end of a message, but
 *    she capitalises Callum and Mairi, because she is sixty one and they are
 *    people. Callum is lowercase too and does not capitalise anybody — `ruth`,
 *    `mairi`, `mi madre` — which is the line between the two of them. Mairi
 *    writes like a woman who has filled in forms: capitals, full sentences, no
 *    contractions, and no quotable line ever. Fiona writes properly and gives
 *    you a number. The player is lowercase and short and never types an opening
 *    `¿`, because they are typing on a phone in a room they grew up in.
 *
 * `the Keeper` stays `el Keeper`, untranslated.
 *
 * This was `el Farero` first, and the argument for it was good: the English
 * rhymes the alias against the woman who `kept the light`, and `Ruth cuidó la
 * luz / el Farero` makes that rhyme exact. It was still wrong, for two reasons
 * that only show up outside this case.
 *
 * `Farero` means lighthouse keeper specifically. He uses this name in six packs
 * — a care home, a rowing club, a canal, a crisis line, and the finale — and in
 * none of those is there a lighthouse. Worse, it kills the meaning the finale
 * actually pays off: eleven box files in a wardrobe, one per person, and `I have
 * kept all of them`. He is not the keeper of a light. He is the keeper of
 * *records*, and Pack 1 only looks like it is about a lighthouse.
 *
 * The alias is also the one thing the player has to recognise across fifteen
 * packs. Leaving it in English keeps it identical in every locale, so no later
 * translator has to re-derive the choice and accidentally break the through
 * line. `arcAlias.test.ts` now enforces that across every registered
 * translation.
 */
export const theLighthouseEs: CaseTranslation = {
  title: 'El faro',
  blurb:
    'Tu tía cuidaba la luz de Punta Ardnoe. Lo están llamando una caída. Tienes su teléfono, y todo el mundo sigue teniendo su versión bien atada.',

  characters: {
    you: 'Tú',
    ruth: 'Ruth',
    mairi: 'Mairi',
    callum: 'Callum',
    esme: 'Fiona',
  },

  places: {
    point: 'Punta Ardnoe',
    lighthouse: 'el faro',
    path: 'el camino del acantilado',
    harbour: 'el puerto',
    cafe: 'el café',
    slip: 'la rampa',
    cottage: 'la casita',
    ferry: 'el ferry',
  },

  threads: {
    't-ruth': 'Ruth',
    't-group': 'Ardnoe',
    't-mairi': 'Mairi Bell',
    't-esme': 'Fiona Trian',
    't-callum-truth': 'Callum',
    't-mairi-again': 'Mairi Bell',
  },

  briefing: {
    causeOfDeath: 'Una caída por las escaleras de la torre.',
    ruling: 'Registrada como accidental. Sin más diligencias.',
    opening:
      'Ruth Calder cuidó la luz de Punta Ardnoe durante cuarenta años después de que la automatizaran, porque nadie le pidió nunca que lo dejara. La encontraron al pie de las escaleras de la torre la noche del temporal del equinoccio.\n\nTú llegaste en el último ferry. Tienes su teléfono, y todo el mundo sigue teniendo su versión bien atada.',
  },

  messages: {
    // ----------------------------------------------------------------- t-ruth
    r1: 'así que al final sí que te has subido',
    r2: 'el último ferry. seis años y el mismo hombre picando los billetes',
    r3: 'ese será el pequeño Callum ahora. el hijo de Mairi. tenía nueve años cuando te fuiste',
    r4: 'no subas esta noche. aquí fuera está soplando de lo lindo y el camino es una pura placa de hielo',
    r5: 'mañana entonces. te noto rara',
    r6: 'estoy bien. hay un asunto con el patronato que te cuento mañana cuando lo haya consultado con la almohada',
    r7: 'dos años de cuentas y un agujero en medio del tamaño de un barco',
    r8: 'ruth. qué significa eso',
    r9: 'significa que tengo que decirle una cosa a alguien a quien conozco desde hace cuarenta años y preferiría meterme andando en el mar',
    r10: 'ya se lo he dicho. eso ya está. va a venir a verme esta noche y por la mañana voy a la policía diga lo que diga',
    r11: 'se lo has dicho a QUIÉN',
    r12: 'me subo a la torre, la lámpara está dando guerra otra vez. cuarenta años automatizada y sigue queriendo a alguien de pie al lado',
    r13: 'no te preocupes por mí. preocúpate por cómo está el cuarto de invitados',
    r14: 'ruth?',
    r15: 'ruth por favor',

    // ---------------------------------------------------------------- t-group
    g1: 'Para quien no se haya enterado todavía. Ruth ha aparecido esta mañana al pie de las escaleras de la torre. Ya no está, y siento tener que ponerlo en un grupo.',
    g2: 'El café abre hoy. No se cobra nada. Venid si preferís no quedaros solos en casa.',
    g3: 'dios',
    g4: 'Lo siento muchísimo. La vi tres veces y me dio una llave de la torre para que pudiera contar desde la galería.',
    g5: 'yo venía en el barco. me dijo que no subiera por lo del camino',
    g6: 'me dijo que no subiera',
    g7: 'E hizo bien. Ese camino con ese viento te habría tirado a ti también. No empieces a culparte.',
    g8: 'la policía ha estado esta mañana en la rampa preguntando a todo el mundo dónde estaba. raro para ser una caída',
    g9: 'Tienen que hacerlo. Muerte súbita, es el procedimiento y ya está. A mí también me preguntaron.',
    g10: 'pues yo se lo dije claro. yo metí el último barco a las ocho con tu tía dentro',
    g11: 'es verdad. me subiste la bolsa por las escaleras y no te di las gracias',
    g12: 'y luego estuve en la rampa desde las diez menos veinte hasta las diez y cuarto. se le había soltado el cabo de popa y no lo iba a dejar así con esa marejada',
    g13: 'acabé calado hasta los huesos',
    g14: 'Callum. Nadie necesita el minuto a minuto.',
    g15: 'solo estoy diciendo lo que les dije',
    g16: 'Ya lo sé, cariño. Pero aquí no.',
    g17: 'Quien se esté ocupando del Patronato. Su cuaderno de registro sigue arriba en la torre, donde ella lo dejó. No me corresponde a mí cogerlo. Alguien debería decírselo a la familia.',
    g18: 'Las cuentas del Patronato las llevo yo. Yo me encargo.',
    g19: 'ella dijo que había un asunto con el patronato. la noche que murió. dijo que había un agujero',
    g20: 'Estaba cansada. Tenía sesenta y un años y esa lámpara llevaba fallando desde julio. Déjalo.',

    // ---------------------------------------------------------------- t-mairi
    m1: 'No tendrías que haberte enterado en un grupo. Fue cosa mía y lo siento.',
    m2: 'dijo que se lo había contado a alguien lo de las cuentas. dijo que va a venir a verme esta noche',
    m3: 'ella. tú llevas las cuentas',
    m4: 'Llevo las cuentas porque nadie más iba a hacerlo gratis.\n\nY sí, me llamó por una columna que no cuadraba. Le dije que le subiría la carpeta el fin de semana.',
    m5: 'Yo no subí allí. Estaba en el café.',
    m6: 'Desde las ocho y media hasta que cerré a las once. En el café. Igual que todas las noches.',
    m7: 'sola?',
    m8: 'Callum estaba conmigo. En el café desde las nueve hasta que cerramos.\n\nAsí que somos dos diciéndolo, si lo que buscas es un testigo.',
    m9: 'yo no buscaba un testigo',
    m10: 'No. Ya lo sé. No me hagas caso, no he dormido.',
    m11: 'Tú entraste esa noche. Te acuerdas. Las nueve y cuarto, antes de subir a su casa. Te puse el té y no lo llegaste a tocar.',
    m12: 'me acuerdo',
    m13: 'Hice la caja a las once menos veinte, como siempre. Faltaban once libras y la conté tres veces.',
    m14: 'Once libras. Y ella estaba tirada al pie de esas escaleras todo el rato que yo estuve contando.',
    m15: 'La chica de la casita tenía la luz encendida cuando volví a casa pasadas las once. Me acuerdo de pensar que había alguien más despierto.',
    m16: 'Vente mañana al café. Te voy a dar de comer y me vas a dejar.',

    // ----------------------------------------------------------------- t-esme
    e1: 'Perdona que te escriba directamente. Dijiste en el grupo que ella te había dicho que no subieras. A mí me dijo lo mismo esa semana.',
    e2: 'Era muy tajante con ese camino cuando hacía mal tiempo. Por eso me chirría la resolución.',
    e3: 'te chirría en qué sentido',
    e4: 'Llevo un cuaderno de campo. Horas, posiciones, condiciones, todas las noches.\n\nEs costumbre. Y es también por lo que puedo darte esto al minuto.',
    e5: 'Estuve en la casita desde las siete hasta las nueve y media pasando a limpio el censo de la tarde.',
    e6: 'Luego el viento amainó durante una media hora. Lo hace antes de rolar. Salí al camino del acantilado a escuchar por última vez a las crías.',
    e7: 'Su lámpara estuvo encendida todo el rato que estuve fuera. Lo anoté a las 21:40 y otra vez a las 22:00. El haz es mi marca horaria.',
    e8: 'estabas en el camino a la vez que ella estaba allí arriba',
    e9: 'Sí. Y no era la única que estaba en él.',
    e10: 'Me crucé con Mairi Bell, que venía en sentido contrario, a las 21:47. Lo anoté porque lo anoto todo, y porque me sorprendió: llevaba un abrigo por encima de la cabeza y pasó a mi lado sin decir una palabra.',
    e11: 'le está diciendo a todo el mundo que estuvo en el café toda la noche',
    e12: 'Entonces una de las dos se equivoca, y yo lo tengo anotado en el momento con una velocidad de viento al lado. No estoy diciendo lo que eso significa. Estoy diciendo que no lo voy a tachar.',
    e13: 'Se lo dije al agente. Lo escribió al final de su libreta, después de la parte donde ya había escrito «caída».',
    e14: 'Me quedo seis semanas más. Si quieres el cuaderno, es tuyo.',

    // --------------------------------------------------------- t-callum-truth
    k1: 'lo sabes verdad',
    k2: 'le dijo a todo el mundo que yo estaba en el café. yo no estaba en el café. puedes preguntarle a cualquiera que estuviera en la rampa esa noche',
    k3: 'por qué iba a decir eso',
    k4: 'porque si estoy en el café con ella nadie me pregunta nada. esa es toda la razón. no me estaba cubriendo a mí. se estaba cubriendo ella y me usaba a mí para hacerlo',
    k5: 'terminé con el cabo sobre las diez y cuarto y subí por detrás pasando por la punta porque es más corto',
    k6: 'estaba en la puerta del faro. las diez y diez, un minuto arriba o abajo. la vi en el haz cuando dio la vuelta',
    k7: 'no grité. no sé por qué. estaba ahí quieta del todo',
    k8: 'callum',
    k9: 'llegó pasadas las once empapada y metió el abrigo en la lavadora. mi madre no ha lavado un abrigo de noche en su vida',
    k10: 'y llevo dos días tragándome eso y dejando que le diga a la gente que yo estaba a su lado',
    k11: 'el dinero era mío. el agujero en las cuentas de ruth. era para mí. no sabía de dónde salía y no pregunté y eso es lo mismo que saberlo no',
    k12: 'haz lo que tengas que hacer. no voy a decir que no es verdad una segunda vez',

    // ---------------------------------------------------------- t-mairi-again
    n1: 'Ha hablado contigo. Lo noto en lo que llevas sin contestarme.',
    n2: 'Está bien. Salí andando hasta la Punta. He dicho el café porque el café es más fácil y porque una vez que le has dicho una cosa a un policía tienes que seguir diciéndola.',
    n3: 'Llegué hasta la verja y me di la vuelta. No fui capaz. Volví a casa por el camino largo para que nadie me viera la cara.',
    n4: 'la verja',
    n5: 'La verja. No la puerta. No me acerqué a la puerta en ningún momento.',
    n6: 'Me lo iba a quitar. No el dinero: el dinero podría habérselo quedado, yo habría vendido el café. Iba a poner su nombre ahí dentro.',
    n7: 'Cuarenta años conociéndola y no fue capaz de darme una sola mañana.',
    n8: 'Diga lo que diga mi hijo, estaba en la rampa a oscuras y el haz juega malas pasadas ahí fuera. Pregunta a quien quieras. Vuelve a preguntárselo mañana.',
    n9: 'Y hay una cosa que no le he contado a nadie, porque suena a que me estoy fabricando una excusa. Un hombre que se hacía llamar el Keeper llamó por teléfono al café esa noche. Las nueve y media, más o menos.',
    n10: 'Dijo que era de los auditores. Dijo que Ruth ya les había mandado los papeles, que la cosa ya no estaba en su mano, y que el lunes el nombre de Callum figuraría en ellos hiciera lo que hiciera quien fuera.',
    n11: 'No le pregunté el nombre. No le pregunté cómo tenía el número del café. No me empujó a hacer nada, apenas dijo una palabra, y yo colgué y cogí mi abrigo. Haz con eso lo que quieras. Yo he dejado de intentarlo.',
  },

  /**
   * The chips are 24-hour digits in both languages and must stay digit for digit
   * identical to the English: this is the board the player lays the village out
   * on, and `la rampa` against `el café` at overlapping minutes is the first
   * thing they prove.
   */
  claims: {
    'c-ruth-tower': 'Ruth: arriba en la torre, 20:45–22:30',
    'c-callum-ferry': 'Callum: en el ferry, 19:00–20:00',
    'c-you-ferry': 'Tú: en el último ferry, 19:00–20:00',
    'c-callum-slip': 'Callum: en la rampa, 21:40–22:15',
    'c-papers-kept': 'Ruth: seguía teniendo los papeles del Patronato, desde las 20:45',
    'c-mairi-cafe': 'Mairi: en el café, 20:30–23:00',
    'c-callum-cafe': 'Callum: en el café, 21:00–23:00 (según Mairi)',
    'c-you-cafe': 'Tú: en el café, 21:05–21:30 (según Mairi)',
    'c-mairi-cashing': 'Mairi: haciendo la caja, 22:35–23:00',
    'c-esme-cottage-late': 'Fiona: en la casita, 23:00–24:00 (según Mairi)',
    'c-esme-cottage': 'Fiona: en la casita, 19:00–21:30',
    'c-esme-path': 'Fiona: en el camino del acantilado, 21:40–22:10',
    'c-ruth-lamp': 'Ruth: arriba en la torre, 21:40–22:00 (según Fiona)',
    'c-mairi-path': 'Mairi: en el camino del acantilado, 21:45–22:00 (según Fiona)',
    'c-papers-sent': 'Ruth: ya había mandado los papeles, 20:00–23:00 (según una llamada)',
    'c-mairi-door': 'Mairi: en la puerta del faro, 22:05–22:15 (según Callum)',
  },

  motives: {
    'm-trust':
      'Llevaba dos años sacando dinero del Patronato del Faro de Ardnoe para tapar las deudas de Callum, y Ruth había encontrado el agujero en las cuentas esa misma semana.',
  },

  contradictions: {
    'x-callum-alibi':
      'Callum no podía estar arreglando un cabo en la rampa y sentado en el café de su madre al mismo tiempo. Él se puso en la rampa por su cuenta, delante de todo el pueblo, antes de que ella dijera otra cosa: la mitad falsa es la de ella. Le dio a su hijo una coartada que él no había pedido, y eso significa que necesitaba que a él no le preguntaran.',
    'x-mairi-path':
      'Ella se puso detrás del mostrador desde las ocho y media hasta las once. A las 21:47 una mujer con un cuaderno de campo y nada que ganar aquí se cruzó con ella en el camino del acantilado, en sentido contrario, con un abrigo por encima de la cabeza. El café no era una coartada. Era un sitio donde ponerse.',
    'x-papers-lie':
      'Los auditores nunca tuvieron esos papeles. Ruth lo escribió todo al final de su cuaderno de registro, y el cuaderno seguía arriba en la torre, donde ella lo dejó. Así que el hombre que se hacía llamar el Keeper, el que llamó al café a las nueve y media, no era del Patronato, no tenía por qué saber nada del Patronato, y lo que le dijo a Mairi Bell no fue una equivocación. Sabía lo que haría con eso una mujer a la que le quedaba una noche.',
    'x-mairi-door':
      'El camino todavía podía ser un paseo para despejarse. La puerta no. A las diez y diez estaba de pie al pie de la torre, iluminada por la lámpara de su propia amiga, en el minuto en que Ruth dejó de contestar, y una hora antes de volver a casa y lavar un abrigo que no había lavado de noche en su vida.',
  },

  confrontation: {
    opening:
      'Me preguntaba cuánto ibas a tardar. Siéntate, entonces. Dilo bien, a la cara, y piénsatelo mucho antes.',
    beats: {
      'b-alibi': {
        press:
          'Le dijiste a todo el mundo que Callum estaba en el café contigo. Estaba en la rampa, y lo dijo él primero, delante de todo el pueblo.',
        rebuttal:
          'Una mujer se confunde con una noche después de un disgusto así. Eso no es un delito, y sabes que no lo es.',
      },
      'b-path': {
        press:
          'Tú te pusiste detrás de ese mostrador desde las ocho y media hasta las once. Fiona Trian se cruzó contigo en el camino del acantilado a las 21:47 y apuntó la hora.',
        rebuttal:
          'Pues salí a andar. La gente anda. Era la primera media hora de calma en una semana y quería aire.',
      },
      'b-door': {
        press:
          'Dijiste que te diste la vuelta en la verja. Callum te vio en la puerta del faro a las diez y diez. Te vio en el haz de ella.',
        rebuttal: 'Estaba empapado y era de noche y esa luz engaña. Pregúntaselo a quien quieras.',
      },
      'b-why': {
        press:
          'Encontró el agujero en las cuentas del Patronato esa semana. Dos años de agujero. Y tenía a tu hijo dentro.',
      },
    },
    deflections: [
      'Eso no demuestra nada de nada.',
      'Llevas seis años fuera. No sabes lo que estás mirando.',
      'Di algo que signifique algo.',
    ],
    confession:
      'Estaba arriba del todo de las escaleras con la carpeta en la mano y no la soltaba.\n\nYo solo quería la mañana. Una mañana, para sacar el dinero de algún sitio, para que su nombre no llegara a entrar ahí. Me dijo que ya lo había dejado escrito.\n\nYo no decidí nada. Le he dado vueltas cada hora desde entonces y no encuentro el momento en que lo decidí.\n\nEse hombre del teléfono. Ni una sola vez dijo su nombre y ni una sola vez dijo nada de hacerle daño. Me preguntó qué iba a hacer yo al respecto, y se lo conté, todo, en voz alta, como se hace a las nueve y media de la noche con alguien a quien no vas a conocer nunca.\n\nY me dejó terminar. No me interrumpió en ningún momento.\n\nEntonces dijo: entonces ya lo sabes.\n\nY colgó, y yo cogí mi abrigo.',
  },

  coda: {
    from: 'Número desconocido',
    messages: [
      'Lo de Ardnoe ha estado bien hecho. Cuatro días. Yo había contado con quince y no suelo equivocarme por tanto.',
      'Tardaste con el hijo. Iba a contártelo de todas formas. Llevaba desde el martes esperando a que alguien se lo preguntara como es debido.',
      'No volveré a usar este número. Enhorabuena. Lo digo en serio.',
    ],
  },

  epilogue:
    'No lo negó cuando vinieron. Preguntó si Callum iba a tener que ponerse de pie en una sala y decirlo en voz alta, y cuando le dijeron que sí, lo contó ella entero para que él no tuviera que hacerlo.\n\nAl Patronato le faltaban once mil libras. Ruth lo había dejado escrito todo al final del cuaderno de registro, de su puño y letra, con la fecha en que pensaba ir a la policía. Debajo había escrito además: «M. es mi amiga desde que teníamos cinco años. Pedidles que sean amables con ella».\n\nEse invierno quitaron la lámpara. Llevaba cuarenta años sin que le pidieran a nadie que se pusiera de pie a su lado.',
};
