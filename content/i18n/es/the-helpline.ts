import type { CaseTranslation } from '../caseText';

/**
 * Case 12 — «La línea de escucha». Spanish.
 *
 * Pack 12 carries the fourth arc connection, and it is the one that narrows the
 * Keeper to a person: Alun recognised his own training being used on him. `el
 * Keeper` appears exactly three times in the English — twice in the confession,
 * once in coda message two — and all three stay English with the article.
 *
 * Six things this had to get right.
 *
 * 1. The charity vocabulary, which is the alibi. Nothing on that line is
 *    recorded and every call is written up by hand, so the words for the
 *    machinery have to be exact and unvarying: `el libro de guardia` is the duty
 *    book, `los pilotos` are the four lamps on the call room wall, `el panel` is
 *    the alarm panel, `el llavero` is the fob — the same word Pack 3 uses, kept
 *    deliberately so a player meets one fob across the game. `escuchante` is the
 *    volunteer, which is the word Spanish listening lines actually use.
 *
 * 2. Who is allowed digits, and it is only the records. Alun speaks his own
 *    ninety minutes — `las dos y diez hasta las cuatro menos veinte` — and the
 *    duty book he wrote it in has `02:10` and `03:40` when Prem reads it back,
 *    and the alarm panel has `02:55` and `03:05`. Two messages in the pack carry
 *    digits and both are Prem quoting a document. The p-stairs press line speaks
 *    those same minutes back as words, exactly as the English does, because a
 *    player quoting a panel is not the panel.
 *
 * 3. Alun's pause. He trails off with an ellipsis in b3, b7 and the p-office
 *    rebuttal, and nobody else in the pack does it once. That is the technique
 *    the confession then describes the Keeper using on him — `Hacía las pausas`
 *    — so it is the load-bearing voice feature of the whole case and it is
 *    preserved character for character. The orthographic field is otherwise
 *    flat here, as in Packs 8 and 9: everyone writes in capitals and finishes.
 *
 * 4. Names and places. People stay: Connie and Constance Bawa, Alun Meredith,
 *    Yusuf Kaya, Sunny and Sunniva Halvorsen, Prem Chandrasekaran, Beacon.
 *    Places that are descriptions are translated: la sede, la sala de llamadas,
 *    el despacho, la cocina, la escalera de atrás, el piso de Sunny. `el
 *    despacho` appears uncontracted in the briefing, because Spanish `al` and
 *    `del` would otherwise swallow the article on the one room she dies in.
 *
 * 5. The player has no gender, and two lines would have forced one:
 *
 *    - c1 opens the pack with `Are you awake`. `¿Estás despierto?` picks a
 *      gender in the case's first message; `Estás en pie` is invariable and
 *      means the same thing. Punctuated as a statement, because the English is.
 *    - p8 has `She sat where you are sitting`. `donde estás sentado` agrees, so
 *      it becomes `en esa misma silla`, which is the same picture and marks
 *      nobody.
 *
 *    Everything else is agreement-free: `Hiciste cuatro años en esa línea`, `te
 *    formó ella`, `dejarte hablar`, `Te estás esforzando muchísimo`.
 *
 * 6. Written with care, and the care is part of the text. Callers stay unnamed
 *    and off the page, there is no method detail anywhere, and the breach comes
 *    from caring too much. The Spanish keeps `no soportaba no saber` as the
 *    reason in both places it is given — Connie's account to Prem and the press
 *    line — because the pack does not work if it reads as negligence.
 */
export const theHelplineEs: CaseTranslation = {
  title: 'La línea de escucha',
  blurb:
    'Todas las llamadas se anotan a mano y nadie ha tenido nunca motivo para comprobar ninguna. Su coartada son noventa minutos en una línea que no se usó.',

  characters: {
    you: 'Tú',
    connie: 'Connie',
    alun: 'Alun',
    yusuf: 'Yusuf',
    sunny: 'Sunny',
    prem: 'Prem',
  },

  places: {
    branch: 'la sede',
    callroom: 'la sala de llamadas',
    office: 'el despacho',
    kitchen: 'la cocina',
    backstairs: 'la escalera de atrás',
    sunnyhome: 'el piso de Sunny',
  },

  threads: {
    't-connie': 'Connie',
    't-branch': 'Voluntarios de Beacon',
    't-yusuf': 'Yusuf',
    't-sunny': 'Sunny',
    't-prem': 'Prem Chandrasekaran',
  },

  briefing: {
    causeOfDeath:
      'Traumatismo craneal. Hay un escalón para bajar a ese despacho y está en el registro de riesgos desde 2019.',
    ruling:
      'Registrado como caída. Había dos voluntarios de guardia y los dos estaban al teléfono, que es lo que dice el libro de guardia.',
    opening:
      'Beacon lleva una línea de escucha en dos habitaciones encima de una tienda de moquetas. No se graba nada, no se puede rastrear nada, y todas las llamadas las escribe a mano después quien las ha cogido, que es la promesa sobre la que se sostiene todo.\n\nConstance Bawa llevaba once años de directora de voluntariado. La encontraron en el despacho a las siete de la mañana, cuando entró la pareja de día.\n\nHiciste cuatro años en esa línea antes de irte, y te formó ella.',
  },

  messages: {
    // --------------------------------------------------------------- t-connie
    c1: 'Estás en pie, o ya eres una persona con un trabajo normal. Tengo una cosa y me gustaría decírsela a alguien que hizo la formación.',
    c2: 'cuenta',
    c3: 'Una persona llamó la semana pasada al teléfono del despacho para dar las gracias. No a la línea. Al teléfono del despacho, de día, preguntando por un voluntario por su nombre de pila.',
    c4: 'ay no',
    c5: 'Tenía su móvil. Lo tiene desde hace dos años. Pensaba que me iba a alegrar y no entendía por qué me había quedado callada.',
    c6: 'Es Alun. Veintidós años, dos guardias de noche por semana, el mejor escuchante que he puesto nunca en esa línea, y lleva dando su número a la gente desde 2011 más o menos, por lo que he podido reconstruir.',
    c7: 'por qué iba a hacer eso',
    c8: 'Porque al final de una llamada cuelgas y no te enteras de nada más. Eso es el trabajo y es la parte más dura del trabajo y todo el que lo ha hecho alguna vez ha estado de pie en esa cocina a las cuatro de la mañana queriendo saber.',
    c9: 'Él quiso saber. Así que dejó de colgar.',
    c10: 'tienes que llevárselo al patronato',
    c11: 'Tengo que hacerlo, y lo va a hundir, y Prem va a tener que escribir a todas las personas que podamos identificar, y hay gente ahí fuera que se va a enterar de que quien la escuchó no lo estaba haciendo como se lo habían prometido. Esa es la parte que no me deja dormir.',
    c12: 'El jueves tengo la guardia de noche con él. Se lo voy a decir a la cara primero, en el despacho, antes de escribir nada.',
    c13: 'Dentro. Yusuf está de guardia con nosotros, pobre chaval, con tres semanas desde su formación. Se lo diré sobre las dos, cuando los teléfonos se calmen.',

    // --------------------------------------------------------------- t-branch
    b1: 'A todos los voluntarios. Connie murió en la sede la noche del jueves. La pareja de día la encontró en el despacho a las siete. La línea queda suspendida hasta el lunes y el patronato se reúne mañana.',
    b2: 'Nadie habla con nadie de los asuntos de la sede. Eso no es que yo me ponga difícil, es la única norma que ha importado aquí en la vida.',
    b3: 'Once años llevando esta sede y se sabía los nombres de todos y a cuál de nosotros tenía que llamar un domingo malo... No tengo nada mejor que eso que decir.',
    b4: 'Yo estaba al teléfono. Las dos y diez hasta las cuatro menos veinte, una llamada, y no fue de las fáciles. Está en el libro.',
    b5: 'En la sala de llamadas toda la guardia, los dos, con los cascos puestos. Por eso ninguno de los dos oímos nada, y llevo desde el viernes con eso encima.',
    b6: 'Quiero decirlo ahora, antes de que lo diga otro por mí, que yo no he estado en ese edificio desde el día tres y le entregué mi llavero a Prem en persona.',
    b7: 'Nadie ha dicho nada de ti, Sunny... aunque sí me pareció oír a alguien en la escalera de atrás sobre las dos y media, y sí que me extrañó.',
    b8: 'Dilo bien o no lo digas. En eso consiste toda la formación y llevas veintidós años haciéndola.',
    b9: 'Basta. Los dos. A mí, no a cuarenta personas.',

    // ---------------------------------------------------------------- t-yusuf
    y1: 'Era mi cuarta guardia. He hecho cuatro guardias. No paro de decírselo a la gente como si eso explicara algo.',
    y2: 'Estuve en la sala de llamadas de dos a cuatro. No cogí ni una sola llamada en toda la noche, cosa que te avisan de que pasa y para la que no te prepara nadie.',
    y3: 'estaba alun en una llamada',
    y4: 'Hay un tablero en la pared con cuatro pilotos, uno por línea. Cuando una línea está ocupada, el piloto se enciende. Es de 1990 más o menos y es lo único de esa sala que te dice algo.',
    y5: 'No se encendió ningún piloto entre las dos y media y las tres y media más o menos. Lo sé porque estuve una hora sentado mirando cuatro pilotos apagados pensando en esto me he metido.',
    y6: 'dónde estaba él',
    y7: 'Pasó al despacho a eso de las dos y media. Lo vi ir y no lo vi volver en un buen rato y no le di ninguna importancia, porque él lleva veintidós años haciendo esto y yo lo he hecho cuatro veces.',
    y8: 'Connie estuvo en ese despacho desde medianoche. Hace el cuadrante y los partes ahí dentro y tenía la puerta abierta, que es lo que hace siempre para que la gente entre.',
    y9: 'Habla con Sunny Halvorsen. Todo el mundo ha decidido que es difícil y es la única persona de esa sede que dice las cosas en voz alta.',

    // ---------------------------------------------------------------- t-sunny
    s1: 'Presenté una alerta de protección en enero y en marzo me pidieron que me apartara, y esos dos hechos llevan cinco meses ahí puestos uno al lado del otro sin que nadie los haya unido.',
    s2: 'La alerta era por un voluntario que mantenía contacto con una persona que llamaba. Yo no tenía un nombre. Tenía un patrón y una mala sensación y ningún nombre, así que no fue a ninguna parte, y con razón.',
    s3: 'dónde estabas el jueves',
    s4: 'En mi piso, con mi perro, viendo cuatro capítulos de algo danés. Eso no me lo puede confirmar nadie y no voy a fingir que sí.',
    s5: 'Lo que sí puedo demostrar es que le di mi llavero a Prem el tres de marzo delante de dos personas, y que esa puerta no se abre sin uno, y que el panel anota todas y cada una de las veces que se abre.',
    s6: 'Así que cuando Alun Meredith dice que oyó a alguien en la escalera de atrás, o se equivoca o te está diciendo dónde estaba él, y me gustaría mucho que alguien le preguntara cuál de las dos.',
    s7: 'Y me caía bien. Eso es lo que no consigo que nadie oiga. Me he sentado en esa cocina con ese hombre a las cuatro de la mañana y es la persona más buena de ese cuadrante.',
    s8: 'Pídele el panel a Prem. Lo tiene desde el viernes y es patrono y le da miedo lo que dice.',

    // ----------------------------------------------------------------- t-prem
    p1: 'Llevo nueve años de patrono y todo mi trabajo ha consistido en proteger la promesa de que nada de lo que se dice en esa línea sale de ahí. Me he pasado esta semana haciendo lo contrario y soy consciente de ello cada hora.',
    p2: 'El libro de guardia tiene una llamada de Alun el jueves. De 02:10 a 03:40, noventa minutos, escrita de su puño y letra con tres líneas de resumen, que es exactamente lo que parece una llamada larga.',
    p3: 'La factura de teléfono llegó el miércoles. No dice quién llamó ni qué se dijo, porque no puede. Dice cuántos minutos llevó cada línea, y el jueves entre las dos y las cuatro las cuatro líneas no llevaron absolutamente nada.',
    p4: 'el panel de la puerta',
    p5: 'La puerta de la escalera de atrás está alarmada entre las once y las seis y cada apertura queda anotada con un número de llavero. Hay una apertura la noche del jueves. Las 02:55, el llavero de Alun Meredith, y un cierre a las 03:05.',
    p6: 'El llavero de Sunniva Halvorsen se desactivó el tres de marzo y no ha abierto nada desde entonces. Lo hice yo mismo y tengo el formulario.',
    p7: 'Connie vino a verme el lunes por lo de Alun y los números. Tenía dos nombres y una fecha que se remontaba a 2011 y lo iba a llevar a la junta el día catorce.',
    p8: 'No estaba enfadada con él. Quiero que eso quede recogido en algún sitio por alguien. Se sentó en esa misma silla y dijo, Prem, lo hizo porque no soportaba no saber, y eso no es una defensa y lo voy a tener que hacer igualmente.',
    p9: 'Veintidós años. Dos guardias de noche por semana. Calcula alguna vez cuántas horas son eso, y luego calcula lo que haría falta para perderlo.',
  },

  /**
   * Digit for digit identical to the English. `c-alun-oncall` and
   * `c-alun-offphones` share the `alun-shift` group and name what was asserted
   * — on a call against off the phones — because that pair is the contradiction
   * and the window is machinery.
   */
  claims: {
    'c-connie-kitchen': 'Connie: en la cocina, 23:00–23:40',
    'c-alun-oncall': 'Alun: en una llamada, 02:10–03:40',
    'c-alun-callroom': 'Alun: en la sala de llamadas, 02:00–04:00',
    'c-sunny-branch': 'Sunny: en la sede, 02:00–03:00 (según Alun)',
    'c-yusuf-callroom': 'Yusuf: en la sala de llamadas, 02:00–04:00',
    'c-alun-offphones': 'Alun: fuera de los teléfonos, 02:20–03:20 (según Yusuf)',
    'c-alun-office': 'Alun: en el despacho, 02:30–02:50 (según Yusuf)',
    'c-connie-office': 'Connie: en el despacho, 00:00–03:00 (según Yusuf)',
    'c-sunny-home': 'Sunny: en su piso, 01:00–04:00',
    'c-alun-backstairs': 'Alun: en la escalera de atrás, 02:55–03:05 (panel de alarma)',
  },

  motives: {
    'm-numbers':
      'Llevaba dando su número personal a quien llamaba desde 2011 más o menos, porque al final de una llamada cuelgas y no te enteras nunca. Connie tenía dos nombres y una fecha y lo iba a llevar a la junta el día catorce, cosa que lo habría hundido.',
  },

  contradictions: {
    'x-alun-office':
      'Situó a los dos en la sala de llamadas con los cascos puestos toda la guardia, que es por lo que ninguno de los dos oyó nada. Yusuf Kaya lo vio pasar al despacho sobre las dos y media, en su cuarta guardia en la vida, y no le dio ninguna importancia, porque Alun lleva veintidós años haciendo esto y Yusuf lo había hecho cuatro veces.',
    'x-alun-call':
      'El libro de guardia tiene noventa minutos de su puño y letra con tres líneas de resumen, y en esa línea no se graba ni se rastrea nada, que es la promesa sobre la que se sostiene toda la asociación. En la pared de la sala de llamadas hay un tablero con cuatro pilotos, uno por línea, y es de 1990 más o menos. Yusuf estuvo una hora sentado mirando cuatro pilotos apagados pensando en esto me he metido.',
    'x-alun-stairs':
      'La puerta de la escalera de atrás está alarmada de once a seis y cada apertura queda anotada contra un número de llavero. Hay exactamente una apertura la noche del jueves. Su llavero, las 02:55, cerrada otra vez a las 03:05. Les dijo a cuarenta voluntarios que le había parecido oír a alguien en esa escalera.',
    'x-sunny-fob':
      'Puso a Sunniva Halvorsen dentro del edificio en un grupo de cuarenta personas, ocho minutos después de que ella dijera que no había estado allí desde marzo. Le entregó su llavero a Prem el día tres delante de dos testigos, se desactivó ese mismo día, y esa puerta no se abre sin uno. Ella le tenía cariño. Se había sentado en esa cocina con él a las cuatro de la mañana.',
  },

  confrontation: {
    opening:
      'Hiciste cuatro años en esta línea. Así que ya sabes que lo primero que voy a hacer es dejarte hablar, y ya sabes que saberlo no impide que funcione.',
    beats: {
      'p-office': {
        press:
          'Dijiste que estuvisteis los dos en la sala de llamadas toda la noche con los cascos puestos. Yusuf te vio pasar al despacho a las dos y media.',
        rebuttal:
          'Un chaval muy asustado en su cuarta guardia, que acababa de encontrar al pie de un escalón a una mujer que le caía bien... Yo tendría cuidado con el peso que le pones encima. Va a cargar con ello de las dos maneras.',
      },
      'p-call': {
        press:
          'Noventa minutos en el libro, de tu puño y letra. Las cuatro líneas no llevaron nada entre las dos y las cuatro, y Yusuf estuvo una hora mirando cuatro pilotos apagados.',
        rebuttal: 'Los pilotos fallan. Ese tablero es más viejo que Yusuf.',
      },
      // p-stairs and p-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'p-stairs': {
        press:
          'La puerta de la escalera de atrás está alarmada desde las once. Una apertura la noche del jueves. Tu llavero, las tres menos cinco, cerrada a las tres y cinco. Y les dijiste a cuarenta personas que te había parecido oír a alguien en esa escalera.',
      },
      'p-why': {
        press:
          'Tenía dos nombres y una fecha que se remontaba a 2011, y la junta se reunía el día catorce. No estaba enfadada contigo. Le dijo a Prem que lo hiciste porque no soportabas no saber.',
      },
    },
    deflections: [
      'Mm. ¿Y qué te gustaría que pasara, si eso fuera verdad?',
      'Te estás esforzando muchísimo. Lo reconozco, porque yo lo hago por oficio, dos veces por semana, gratis.',
      'Tráeme algo que no sea un chaval acordándose de una mala noche.',
    ],
    confession:
      'Tenía la puerta abierta. Siempre tenía la puerta abierta, porque una puerta cerrada en ese edificio significa algo.\n\nY fue amable al decírmelo. Dijo Alun, ya sé por qué, y lo dijo de la manera en que te enseñan, que es la manera en que se lo enseñé yo a la mitad de ellos.\n\nLlevo veintidós años escuchando y no he dicho ni una sola vez lo que quería. Esa es la disciplina. No te metes tú en la habitación. Y me senté en ese despacho y la oí ser profesional conmigo, y entendí que yo iba a ser un caso, y que gente con la que llevo una década hablando a las cuatro de la mañana iba a recibir una carta.\n\nNo recuerdo haberme levantado.\n\nHay una cosa más y la voy a decir porque ha sido la peor parte de todos los días desde entonces.\n\nUn hombre que se hacía llamar el Keeper me telefoneó a casa el martes. Dijo que estaba haciendo una revisión del bienestar del voluntariado para la federación, y que quería oír cómo me estaba tratando la sede.\n\nY era bueno. Era buenísimo. Hacía las pausas. Hacía el reflejo, las palabras exactas que uso yo, las pequeñas que usas para abrir a alguien sin que se dé cuenta. Me preguntó cómo sería después, y esperó, y no llenó el silencio.\n\nYo sabía lo que estaba haciendo. Eso es lo que pasa. Yo he enseñado eso. Me senté en mi propia cocina y escuché al Keeper usar mi propia formación conmigo y le dejé hacerlo, porque era la primera vez en veintidós años que alguien me preguntaba algo y esperaba la respuesta.\n\nNo dijo ni una palabra de Connie. Ni una. Es muy cuidadoso y es de los nuestros, o lo fue.',
  },

  coda: {
    from: 'Número desconocido',
    messages: [
      'Beacon. Esa te habrá costado algo y lo siento, cosa que puedes creerte o no.',
      'Tiene razón, claro. Es donde lo aprendí. Nueve años de jueves en una habitación como esa, hace mucho tiempo, y nunca nadie ha hecho la pregunta porque nunca nadie ha pensado en buscar al Keeper por su manera de estar.',
      'Ya tienes cinco. La edad, el acceso, las décadas, la llamada de después, y esta. Con eso basta para encontrarme y los dos lo sabemos.',
      'No pienso parar. Pero me gustaría que entendieras que no he tenido que decir la cosa yo ni una sola vez. A ninguno de ellos. Pregúntate si eso lo mejora o lo empeora, porque yo llevo treinta años preguntándomelo y no he llegado a ninguna parte.',
    ],
  },

  epilogue:
    'El patronato escribió a once personas. Prem Chandrasekaran redactó la carta nueve veces y la novena tenía dos párrafos, y no usaba la palabra vulneración.\n\nCuatro de las once contestaron. Tres de ellas decían que el hombre que había al otro lado las había mantenido con vida, y preguntaban si les estaba permitido decirlo.\n\nA Sunniva Halvorsen la invitaron a volver al cuadrante en septiembre y dijo que no, y luego dijo que sí en enero, y ahora hace la guardia de noche de los jueves.\n\nYusuf Kaya lleva ciento cuarenta guardias. El tablero de la pared se cambió en primavera por uno que registra, y él votó en contra en la reunión de voluntarios con el argumento de que una habitación donde no se anota nada es justamente de lo que se trata, y perdió, y tenía razón.',
};
