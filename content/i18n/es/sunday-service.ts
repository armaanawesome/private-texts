import type { CaseTranslation } from '../caseText';

/**
 * Case 8 — «El oficio del domingo». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`. Nothing was added to
 * fill the silence.
 *
 * The title carries a double meaning that survives intact and was the reason
 * for choosing it: `el oficio` is the Sunday service Grace cancels in p2, and
 * it is also a trade — which is what Jack Tenby has, and his trade is the only
 * thing in the county that outranks the register.
 *
 * Six things this had to get right.
 *
 * 1. The record, and the line inside it. The case is one forged entry against
 *    one living memory, so the document vocabulary never varies. `el registro`
 *    is the register, `el tomo de 1974` is the volume Pam signed out, `la
 *    partida 114` is the entry itself. `partida` rather than `asiento`: a
 *    Spanish parish entry is a partida de matrimonio, it is the exact word, and
 *    `asiento` also means a seat, which in a church is a trap. `el rayado de la
 *    página` is the ruling that was redrawn under it, and `la caja fuerte` is
 *    the safe the registers do not leave.
 *
 * 2. Times, and the one date. Everything on the night is spoken and turns on
 *    twenty minutes: `las ocho menos veinte` is Pam going into the vestry,
 *    `las ocho y diez` is Jack letting Denise out of the tower, `las ocho y
 *    veinte` is her car under the yew. The register pair sits on a different
 *    axis entirely — `el once de marzo` — because it is a day in March rather
 *    than a minute of the Tuesday, and its two chips share one window because
 *    an exclusive group needs overlapping windows for the engine to see the
 *    collision. Each of those two labels therefore names what was asserted
 *    rather than the window: `sacó el registro de 1974, 11 de marzo` against
 *    `nunca manejó los registros`. That pair is the contradiction, and forcing
 *    both to state the window would hide it.
 *
 * 3. Names and places. People, churches and towns stay: Avril Dacre, Pam Hale,
 *    Jack Tenby, Grace Fowler, Denise Voss, Ted, Hale y Sowerby, St Ninian’s,
 *    St Cuthbert’s, Bicester, Coventry. Places that are descriptions are
 *    translated: la nave, la sacristía, la torre, el aparcamiento de la
 *    iglesia, la casa de Pam.
 *
 *    `el aparcamiento de la iglesia` is written out with its article intact in
 *    i6, because Spanish `del` would otherwise swallow it and the chip would
 *    name a place no sentence contains.
 *
 *    The south aisle is `el lateral sur` and deliberately not `la nave lateral
 *    sur`: `la nave` is a place name on four chips, and a second room whose
 *    name contains it is two rooms to a player looking for a match.
 *
 *    Church register throughout, in Spanish that a Spanish-speaking parish
 *    would use: `la párroca` for the vicar (Grace is a woman priest), `el
 *    consejo parroquial` for the PCC, `la normativa` for the measure, `el fondo
 *    de fábrica` and `el fondo del órgano`, `un coadjutor` for the curate, `el
 *    presbiterio` for the chancel, `el expresivo` for the organ swell,
 *    `administradora` for churchwarden — which has no Catholic equivalent, so
 *    the office is named by what she actually did for twenty-two years.
 *
 * 4. Voice. This pack has a deliberately flat orthographic field: every single
 *    person except the player writes in capitals and finishes every sentence,
 *    and the English does not vary that once. So unlike Packs 5 and 6 there is
 *    no apostrophe axis to substitute an accent for, and inventing one would
 *    have added a distinction the English does not make. The axis here is
 *    diction, and Spanish carries it without substitution:
 *
 *    - Jack states and refuses to interpret. Short sentences, no abstract
 *      nouns, and `No digo lo que significa. Digo dónde estaba.` He dates by
 *      his father’s death rather than by a calendar.
 *    - Avril has the vocabulary of the archive — `el rayado`, `la partida`, `en
 *      otra tinta y otra letra` — and asks questions in professional form.
 *    - Grace quotes the rule and then accuses herself with it.
 *    - Denise is thirty-six and not from here and says so.
 *    - Pam owns the village and uses the second person to say so.
 *
 *    The player is the only lowercase voice in the pack, never lands a full
 *    stop, lowercases other people’s names and never opens with ¿.
 *
 * 5. The player has no gender, and nothing here forced one — worth recording as
 *    precisely as a rephrase would be. `Tú llevas el archivo diocesano`,
 *    `habías empezado a esperar sus correos`, `Llevas nueve días en este
 *    pueblo`, `has estado hablando`, `no tienes ni idea` are all
 *    agreement-free as written. The one trap is j3, where `estás seguro del
 *    año` agrees with Jack, who is a man and is the person being addressed —
 *    that one is correct and must not be neutralised.
 *
 * 6. `desde la conquista normanda` for `since the Conquest`. Bare `la
 *    Conquista` in Spanish reads as the Reconquista or the conquest of the
 *    Americas; the adjective costs one word and keeps the joke, which is that
 *    the village has been gossiping since 1066.
 */
export const sundayServiceEs: CaseTranslation = {
  title: 'El oficio del domingo',
  blurb:
    'El registro dice que aquel agosto hubo una boda. El hombre que rehízo el tejado de la iglesia dice que no había tejado.',

  characters: {
    you: 'Tú',
    avril: 'Avril',
    cordy: 'Pam',
    ines: 'Grace',
    jack: 'Jack',
    petra: 'Denise',
  },

  places: {
    church: 'St Ninian’s',
    nave: 'la nave',
    vestry: 'la sacristía',
    tower: 'la torre',
    carpark: 'el aparcamiento de la iglesia',
    cordyhome: 'la casa de Pam',
  },

  threads: {
    't-avril': 'Avril',
    't-parish': 'Consejo parroquial de St Ninian’s',
    't-petra': 'Denise',
    't-jack': 'Jack Tenby',
    't-ines': 'Grace Fowler',
  },

  briefing: {
    causeOfDeath: 'Fractura de cráneo. Se cayó contra la esquina de la caja fuerte.',
    ruling:
      'Registrado como caída. Tenía setenta y un años, el suelo de la sacristía está desigual y estaba sola en una iglesia cerrada con llave.',
    opening:
      'Avril Dacre llevaba veintidós años de administradora de St Ninian’s y estaba en el tercer mes de escanear cuatrocientos años de registros parroquiales para la diócesis, página a página, con un escáner de sobremesa en la sacristía.\n\nLa encontraron a las nueve y media de un martes por la noche con el registro de matrimonios de 1974 todavía abierto encima de la mesa.\n\nTú llevas el archivo diocesano. Te escribía todas las semanas desde marzo y habías empezado a esperar sus correos.',
  },

  messages: {
    // ---------------------------------------------------------------- t-avril
    a1: 'Pregunta para el archivo. Si una anotación de un registro está en otra tinta y otra letra que las de arriba y abajo, ¿es una cosa que queréis saber o una cosa que tienen todas las parroquias de Inglaterra?',
    a2: 'todas las parroquias tienen alguna. qué te ha escamado de esta',
    a3: 'La numeración. La partida 114 está metida a la fuerza encima de la 115 y han vuelto a trazar el rayado de la página por debajo. Alguien ha hecho sitio.',
    a4: 'Es un matrimonio. Tres de agosto de 1974. Hale y Sowerby.',
    a5: 'hale de pam hale',
    a6: 'Su madre y el padre que figura en todos los documentos que tiene. Pam nació en noviembre.',
    a7: 'Y llevo toda la vida en esta parroquia y no sabría decirte qué tiene de raro, así que se lo pregunté a Jack Tenby, porque Jack se acuerda de 1974 mejor que 1974.',
    a8: 'Se rió de mí. Dijo que en agosto de 1974 esa iglesia no tenía tejado porque él estaba encima. Todas las bodas de aquel verano se fueron a St Cuthbert’s.',
    a9: 'avril. no se lo digas a nadie del pueblo antes que a mí',
    a10: 'Se lo he contado a una persona y no me arrepiento. Tiene derecho a oírlo de una amiga y no de una carta con un escudo en el membrete.',
    a11: 'Esta noche escaneo. La página 114 te llega el lunes con el resto del lote y a partir de ahí sale de mis manos y entra en las tuyas, gracias a Dios.',

    // --------------------------------------------------------------- t-parish
    p1: 'Queridos todos. Avril murió en la sacristía el martes por la tarde. La encontré yo a las nueve y media, cuando volví a por el móvil. La policía ha venido y lo está tratando como una caída.',
    p2: 'Este domingo no habrá oficio. No soy capaz de hacerlo y no voy a fingir lo contrario.',
    p3: 'Veintidós años le dio a esta iglesia y se murió sola en ese suelo. No he pegado ojo. Yo estuve en casa toda la tarde con la radio puesta y no dejo de pensar que podría haber bajado.',
    p4: 'Yo estaba en el edificio. Quiero decirlo antes de que lo diga otro por mí. Estuve afinando el expresivo desde las siete y no sabía que ella estuviera en la sacristía.',
    p5: 'Tú estuviste en la nave casi toda esa tarde, Denise. Habrás pasado por delante de esa puerta seis veces.',
    p6: 'Eso no es verdad y tú sabes que no es verdad, y yo esto aquí no lo hago.',
    p7: 'Aquí no lo hace nadie. Pam, por favor.',

    // ---------------------------------------------------------------- t-petra
    e1: 'Llevo cuatro años de organista y tengo treinta y seis y no soy de aquí, y esta semana me he dado cuenta de que esos tres datos son uno solo.',
    e2: 'dónde estabas',
    e3: 'En la torre. Desde las siete hasta las ocho y diez, afinando, con la puerta cerrada porque la puerta tiene que estar cerrada o el sonido se te viene encima.',
    e4: 'Y luego no pude salir. Esa puerta se atranca desde marzo y está en una lista. Jack me sacó a las ocho y diez y antes se rió de mí durante cuatro minutos.',
    e5: 'discutiste con avril por el fondo del órgano',
    e6: 'Sí. Delante de once personas en el consejo parroquial de enero, y dije algo sobre el lastre que ahora daría muchísimo por retirar.',
    e7: 'Me llamó a la mañana siguiente y me dijo que había tenido razón y había sido grosera en la misma frase, y luego me sacó dos mil libras del fondo de fábrica. Así era ella.',
    e8: 'Pregúntale a Jack por la puerta. Pregúntale a Jack por lo que sea, de verdad. Tiene ochenta y cuatro años y es la única persona de este pueblo que dice lo que vio en vez de lo que significa.',

    // ----------------------------------------------------------------- t-jack
    j1: 'Ese tejado lo puse yo en 1974 con mi padre y con mi tío Ted. Empezamos la última semana de junio y terminamos la segunda de septiembre. Once semanas y llovió seis.',
    j2: 'En esa iglesia no hubo boda ninguna en agosto de 1974. En esa iglesia no hubo nada en agosto de 1974. Estaba abierta al cielo y había palomas en el presbiterio.',
    j3: 'estás seguro del año',
    j4: 'Mi padre murió en febrero de 1975 y aquel tejado fue el último trabajo que hicimos juntos. Estoy seguro del año como tú estás seguro de cómo te llamas.',
    j5: 'Avril me lo preguntó en marzo y se lo dije y pensé que ahí se acababa, y llevo desde el martes aquí sentado deseando haberle dicho que no me acordaba.',
    j6: 'sacaste a denise de la torre',
    j7: 'Las ocho y diez. Llevaba un rato aporreándola. Esa puerta quiere un pestillo nuevo y lo tengo en una lista desde marzo y ahora lo haré, me imagino, por culpa.',
    j8: 'Y te voy a contar la otra cosa, ya que no me la ha preguntado nadie y llevo esperando a que alguien lo haga.',
    j9: 'Pam Hale entró en esa sacristía a eso de las ocho menos veinte. Yo estaba en la nave con el pestillo de la puerta de la torre y pasó por delante de mí y no me vio, porque a un hombre de rodillas con un destornillador no lo ve nadie.',
    j10: 'Conozco a esa mujer desde que iba en carrito. No digo lo que significa. Digo dónde estaba.',

    // ----------------------------------------------------------------- t-ines
    i1: 'Llevo aquí dos años. Avril era la que me decía a cuál de ellos creer y sobre qué, y ahora lo hago sola y lo hago mal.',
    i2: 'Los registros no salen de la caja fuerte. Esa no es una norma que me haya inventado yo, está en la normativa, y hay un libro donde se firma si sale alguno.',
    i3: 'Pam sacó el tomo de 1974 el once de marzo, firmó por él y lo tuvo cuatro días. Está en el consejo parroquial y estaba haciendo la historia del turno de flores y no le di ni una vuelta.',
    i4: 'Y cuando la policía le preguntó el miércoles si había manejado alguna vez los registros, dijo que nunca, ni una sola vez, que eso era cosa de Avril. Yo estaba de pie a su lado.',
    i5: 'estaba su coche',
    i6: 'Volví a por el móvil a las ocho y veinte y su coche estaba en el aparcamiento de la iglesia, debajo del tejo, donde lo pone siempre, y me acuerdo de que me alegré porque pensé que había alguien con Avril.',
    i7: 'Entré, cogí el móvil del banco del coro y volví a salir. No pasé a la sacristía. Con eso tengo que vivir y prefiero no hacerlo por escrito.',
    i8: 'Avril estuvo en esa sacristía desde las siete. Tenía el escáner y el flexo y un termo y no se habría movido ni por una alarma de incendios.',
    i9: 'Pam Hale lleva cuarenta años poniendo las flores en esa iglesia. Tiene una placa con el nombre de su madre en el lateral sur. Llevo dos años viéndola pasar por delante dos veces por semana.',
  },

  /**
   * Digit for digit identical to the English. The two register chips share one
   * window because they are an exclusive group, so each names what was asserted
   * instead of the window it sits in — `11 de marzo` against `nunca` — and that
   * pair of assertions is the contradiction the player is meant to see.
   */
  claims: {
    'c-avril-nave': 'Avril: en la nave, 18:00–18:50',
    'c-cordy-home': 'Pam: en casa, 19:00–21:00',
    'c-petra-nave': 'Denise: en la nave, 19:30–20:50 (según Pam)',
    'c-petra-tower': 'Denise: encerrada en la torre, 19:00–20:10 (según Jack)',
    'c-cordy-vestry': 'Pam: en la sacristía, 19:40–20:00 (según Jack)',
    'c-jack-nave': 'Jack: en la nave, 19:00–20:30',
    'c-cordy-signed-out': 'Pam: sacó el registro de 1974, 11 de marzo',
    'c-cordy-never-register': 'Pam: nunca manejó los registros (su versión)',
    'c-cordy-carpark': 'Pam: en el aparcamiento, 20:20–20:30 (según Grace)',
    'c-ines-carpark': 'Grace: en el aparcamiento, 20:10–20:40',
    'c-avril-vestry': 'Avril: en la sacristía, 19:00–21:00 (según Grace)',
  },

  motives: {
    'm-register':
      'La partida 114 se metió a la fuerza en el registro de matrimonios de 1974 con otra letra, y aquel agosto la iglesia no tenía tejado. Su nombre, su padre, su casa y cuarenta años de posición en esa parroquia se apoyan en cuatro líneas que escribió alguien después, y el escaneo salía para la diócesis el lunes.',
  },

  contradictions: {
    'x-cordy-vestry':
      'Se situó en casa con la radio puesta de siete a nueve. Jack Tenby estaba de rodillas en la nave con el pestillo de la puerta de la torre y la vio entrar en la sacristía a las ocho menos veinte. A un hombre de rodillas con un destornillador no lo ve nadie.',
    'x-cordy-register':
      'Le dijo a la policía que nunca había manejado los registros, que eso era cosa de Avril, con la párroca de pie a su lado. Sacó el tomo de 1974 de esa caja fuerte el once de marzo y lo tuvo cuatro días, y hay un libro donde se firma, porque los registros no salen de la caja fuerte.',
    'x-cordy-carpark':
      'A las ocho y veinte su coche estaba debajo del tejo, donde lo deja siempre, y Grace lo vio y se alegró, porque pensó que significaba que había alguien sentado con Avril.',
    'x-petra-tower':
      'Pam puso a la organista en la nave pasando por delante de esa puerta seis veces. Denise estuvo encerrada en la torre desde las siete con la puerta cerrada porque si no el sonido se te viene encima, y el pestillo está roto desde marzo. Jack la sacó a las ocho y diez y antes se rió de ella durante cuatro minutos.',
  },

  confrontation: {
    opening:
      'Llevas nueve días en este pueblo y has estado hablando con un albañil y con una chica que no es de aquí. Yo llevo poniendo las flores en esa iglesia desde 1985. Adelante.',
    beats: {
      'v-vestry': {
        press:
          'Estabas en casa con la radio puesta. Jack estaba en la nave con un destornillador y te vio entrar en esa sacristía a las ocho menos veinte.',
        rebuttal:
          'Jack Tenby tiene ochenta y cuatro años y lleva sesenta contándole a ese pueblo lo que ha visto, y la mitad lo ha visto.',
      },
      'v-register': {
        press:
          'Le dijiste a la policía que nunca habías manejado los registros. Sacaste el tomo de 1974 de esa caja fuerte el once de marzo y lo tuviste cuatro días, y la párroca estaba a tu lado cuando lo dijiste.',
        rebuttal:
          'El turno de flores. Estaba haciendo la historia del turno de flores para el aniversario, cosa que te dirá cualquiera de ese comité.',
      },
      // v-carpark and v-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'v-carpark': {
        press:
          'Tu coche estaba debajo del tejo a las ocho y veinte. Grace lo vio y se alegró, porque pensó que significaba que Avril no estaba sola.',
      },
      'v-why': {
        press:
          'La partida 114 se escribió después, y en agosto de 1974 esa iglesia no tenía tejado. El escaneo salía para la diócesis el lunes.',
      },
    },
    deflections: [
      'Eso no son pruebas. Eso es un pueblo hablando, que lleva haciéndolo desde la conquista normanda.',
      'Tú trabajas con papel. No tienes ni idea de lo que es nada de esto.',
      'Tráeme algo que no sea un viejo de rodillas.',
    ],
    confession:
      'Me enteré cuando tenía treinta años. Me lo contó mi madre en una cocina de Bicester con el termo eléctrico puesto, y luego se murió once semanas después y me dejó a mí con ello.\n\nNo hubo boda. Hubo un hombre en Coventry que no me quería, y un coadjutor de aquí que le debía algo a mi abuela, y cuatro líneas escritas en un libro en 1976 con una letra que nadie iba a comprobar nunca.\n\nY llevo cuarenta años poniendo las flores en esa iglesia, y he leído la lectura en Navidad, y hay una placa en el lateral sur con el nombre de mi madre, y absolutamente todo eso se apoya en esas cuatro líneas.\n\nAvril vino a decírmelo ella misma. Esa es la parte que quiero que quede dicha. No fue primero a la diócesis, vino a mi cocina el domingo y se sentó y dijo Pam, he encontrado una cosa y la voy a tener que mandar, y quería que lo oyeras de una amiga.\n\nY yo le di las gracias. Se las di de verdad.\n\nLuego el martes bajé a pedirle que retuviera el lote. Solo el lote. Solo hasta después del aniversario, le dije, y ella dijo Pam, no puedo, y se dio la vuelta hacia el escáner.\n\nTenía setenta y un años y le puse la mano en el hombro y no sé qué quería decir con eso. Me lo he dicho a mí misma cuatrocientas veces y sigue siendo la única frase verdadera que tengo.',
  },

  epilogue:
    'El tomo de 1974 llegó al archivo diocesano en el lote que Avril ya había etiquetado, el lunes, porque a nadie se le ocurrió pararlo.\n\nLa partida 114 se examinó con luz rasante en junio. El rayado de la página se había vuelto a trazar con bolígrafo y la anotación queda unos dos milímetros por encima de la línea sobre la que pretende estar.\n\nJack Tenby cambió el pestillo de la puerta de la torre el jueves, y después repintó la puerta entera, y después hizo el pórtico, y su hija dice que no ha parado desde entonces.\n\nDenise Voss tocó en el funeral. Eligió el Bach del que Avril se había quejado en enero, cosa que a la parroquia le costó un rato entender y luego entendió de golpe.',
};
