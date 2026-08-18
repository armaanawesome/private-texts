import type { CaseTranslation } from '../caseText';

/**
 * Case 7 — «El refugio». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`. Nothing was added to
 * fill the silence.
 *
 * Six things this had to get right.
 *
 * 1. Order, not clock. A bothy has no clock and the players know it — Anne says
 *    so in m2, and that sentence is the instruction manual for the whole pack:
 *    `no sabes qué hora es, sabes qué ha pasado ya`. So every spoken time is
 *    approximate and stays approximate. `sobre las siete menos diez`, `a eso de
 *    las siete y cuarto`, `desde las siete menos veinte más o menos`. A
 *    translator who firms one of those into a bare hour makes five people
 *    sound like they own watches, and the briefing says explicitly that not one
 *    of them owns a watch that agrees with anybody else’s.
 *
 * 2. The book, kept ambiguous on purpose. English calls the bothy log `the
 *    book` and Struan’s climbing book `the book`, and lets context separate
 *    them — which pays off in the confession, where `I have written it in the
 *    book already` is his book and the reader has spent the whole case
 *    signing the other one. Spanish keeps one word, `el libro`, for both. The
 *    verb disambiguates exactly as it does in English: you sign the log and you
 *    send the other to `la imprenta`. Splitting them into `el libro de registro`
 *    and `el libro` would be clearer and would delete the resonance, so it was
 *    rejected.
 *
 * 3. Places, and the contracted preposition. Translated because they are
 *    descriptions: el refugio, la sala principal, la sala de atrás, el zaguán,
 *    el monte. Spanish `al` and `del` swallow the article, so each of these
 *    appears somewhere in the prose with its article intact and not only as
 *    `del refugio` or `al monte` — `en el refugio` (p1, s5), `en el zaguán`
 *    (m10, r4), `por el monte` (r2), `la sala principal` (p5, m6), `la sala de
 *    atrás` (p1, h5). Otherwise the chip names a room no sentence contains.
 *
 *    - `el refugio` for `the bothy`. A Scottish bothy is an unlocked mountain
 *      shelter and `el refugio` is exactly that building in Spanish.
 *    - `el zaguán` for `the porch`. Stone entrance passage where boots and
 *      packs go, which is what Sandra spreads hers across and what Hamish steps
 *      over her in. `el porche` was rejected: a porche is outdoors.
 *    - `el monte` for `the hill`, which is what a Spanish hillwalker calls it.
 *      The chip reads `el camino del monte`, so `por el monte` in r2 carries
 *      the uncontracted form.
 *
 * 4. Names. People, clubs and glens stay: Struan Baillie, Iain Lamont, K.
 *    Lamont, Hamish Dunnet, Anne, Sandra, Mrs Nkemelu, Corrie Fhithich,
 *    Aviemore, Berghaus, los Munros. `Raven’s Line` stays untranslated because
 *    it is the name of a climbing route and then of a book; `la vía` is the
 *    common noun, exactly as English keeps `the line` apart from `Raven’s
 *    Line`. Climbing register throughout: `la hizo en solitario`, `el frontal`
 *    for a head torch, `la chimenea` for the hearth, `la ventisca` for the
 *    whiteout.
 *
 *    One thing left as the English has it, and flagged: the epilogue calls
 *    Sandra `Priscilla Nkemelu`, while p7 and h3 call her `la señora Nkemelu`
 *    and the character table calls her `Sandra`. Her id is `pris`. This looks
 *    like the same stale-rename class the coordinator has just swept, and
 *    renameLeak.test.ts appears not to catch it because `Priscilla` contains
 *    the id only as a prefix rather than as a whole word. Copied verbatim
 *    rather than repaired, on the standing rule that a translation which
 *    quietly fixes a fact is a translation nobody can diff. If the English is
 *    corrected, one string here follows it — epilogue paragraph two.
 *
 * 5. Voice. This pack drops no apostrophes anywhere in the English, so there is
 *    no dropped-accent axis to substitute — unlike Packs 5 and 6. The axes are
 *    capitalisation and whether a person finishes a sentence, and Spanish keeps
 *    both unchanged:
 *
 *    - Hamish and Sandra write in capitals and land every full stop. He is
 *      sixty-eight and the maintenance officer; she has been talked over for a
 *      week and is choosing her words.
 *    - Struan and Iain write in capitals and never land the final full stop.
 *      They are the two men in the argument and they write identically, which
 *      is the English’s own choice and is mirrored. Struan is separated by
 *      exclamation: s1 takes full Spanish `¡¡…!!`, which nobody else in the
 *      pack uses and the player never does.
 *    - Anne is lowercase except when a sentence opens on a name — `Struan` in
 *      m3, `Sandra` in m10 — and never lands a full stop either.
 *    - The player is lowercase, short, lowercases other people’s names, and
 *      keeps the closing `?` in s4 while never opening with `¿`, which is how a
 *      thumb types and is the line between them and everyone else.
 *
 * 6. The player has no gender, and one line would have forced one. The
 *    confrontation opening says `you sat at home`; `te quedaste sentado` picks
 *    a gender, so the participle is dropped for `te quedaste en casa`, which is
 *    what the briefing already says. Everything else addressed to the player is
 *    agreement-free as written: `organizaste`, `no estuviste allí`, `te
 *    rompiste un tobillo`, `te situaste`, `vuelve con algo`. Asserted in the
 *    test, because nothing else in the build would notice.
 *
 * Units stay as the English states them: `cuatro millas`, `los Munros`.
 */
export const theBothyEs: CaseTranslation = {
  title: 'El refugio',
  blurb:
    'Cinco personas salieron de una ventisca y entraron en la misma habitación, con horas de diferencia. Están de acuerdo en todo menos en el orden.',

  characters: {
    you: 'Tú',
    struan: 'Struan',
    keir: 'Iain',
    morven: 'Anne',
    pris: 'Sandra',
    hamish: 'Hamish',
  },

  places: {
    bothy: 'el refugio',
    mainroom: 'la sala principal',
    backroom: 'la sala de atrás',
    porch: 'el zaguán',
    hill: 'el monte',
  },

  threads: {
    't-struan': 'Struan',
    't-group': 'Corrie Fhithich',
    't-morven': 'Anne',
    't-pris': 'Sandra',
    't-hamish': 'Hamish Dunnet',
  },

  briefing: {
    causeOfDeath:
      'Fractura de cráneo. En la sala de atrás hay una chimenea de piedra y había estado bebiendo.',
    ruling:
      'Registrado como caída. No se pudo subir un vehículo por el valle hasta el domingo y para entonces habían pasado once personas por esa sala.',
    opening:
      'El refugio de Corrie Fhithich tiene dos salas, una chimenea de piedra, ni electricidad ni cobertura. Junto a la puerta hay un libro que la gente firma porque el código dice que hay que firmarlo.\n\nA Struan Baillie lo encontraron en la sala de atrás el sábado por la mañana. Otras cinco personas habían entrado desde la ventisca la noche anterior, de una en una, con horas de diferencia, y ninguna de ellas tiene un reloj que coincida con el de nadie.\n\nTú organizaste el fin de semana. Te rompiste un tobillo en noviembre y te quedaste en casa.',
  },

  messages: {
    // --------------------------------------------------------------- t-struan
    s1: '¡¡El libro está en la imprenta!! Raven’s Line, tapa dura, febrero. Veintidós años subiendo cosas y una de ellas paga una hipoteca',
    s2: 'enhorabuena. de verdad',
    s3: 'Iain viene este fin de semana. Es la primera vez en unos cuatro años que dice que sí a algo que organice yo',
    s4: 'estáis bien vosotros dos?',
    s5: 'Hay una conversación que no hemos tenido nunca y he decidido que la voy a tener en el refugio con una copa de más, que es como han empezado todas las malas ideas que he tenido en mi vida',
    s6: 'lo de la vía',
    s7: 'La hizo en solitario en 2016 y se lo contó a una sola persona y esa persona fui yo, y yo le puse mi nombre en 2018 y llevo desde entonces viviendo de ello',
    s8: 'Lo he metido en los agradecimientos. No es suficiente y sé que no es suficiente. Le voy a ofrecer la cosa entera, delante de los demás, y que decida él qué quiere que se haga',
    s9: 'eso te acaba el libro',
    s10: 'Ya. En fin',
    s11: 'El primero en llegar, fuego encendido, la nieve completamente horizontal ahí fuera. Anne está aquí. Nadie más todavía y le va a tocar una noche larga a quien siga en ese camino',

    // ---------------------------------------------------------------- t-group
    p1: 'por fin hay cobertura. no sé cómo escribir esto así que lo voy a escribir mal. Struan murió en el refugio el viernes por la noche. lo encontramos el sábado por la mañana en la sala de atrás',
    p2: 'La policía subió el domingo, en cuanto se pudo pasar. Se llevaron el libro y tomaron declaración y se quedaron conformes con que fue una caída contra la chimenea.',
    p3: 'Yo llegué el último. Las diez menos veinte, medio muerto, firmé el libro en la puerta porque Hamish te obliga. Para entonces Struan ya se había ido al fondo y yo no llegué a verlo',
    p4: 'Estuve en ese camino desde las siete menos veinte más o menos. Tres horas para cuatro millas. Así fue esa noche',
    p5: 'yo estuve en esa sala principal desde las seis hasta que nos rendimos todos sobre las once. no me moví, tenía la estufa encendida y no le dejaba ese sitio a nadie',
    p6: 'Y la mujer que le limpia la casa estuvo entrando y saliendo de esa sala de atrás toda la noche, cosa que todavía no le ha mencionado nadie a ningún policía',
    p7: 'La señora Nkemelu entró conmigo y es socia de este club y lleva más años en ese monte que tú, Iain.',
    p8: 'podemos no hacer esto aquí dentro',

    // --------------------------------------------------------------- t-morven
    m1: 'tú lo organizaste y no estuviste allí y no dejo de pensar en cómo te va a sentar eso, así que te voy a contar todo lo que recuerdo de verdad y no todo lo que le dije a un policía a las ocho de la mañana',
    m2: 'lo que tiene un refugio es que no hay reloj. no hay más luz que los frontales y una estufa. no sabes qué hora es, sabes qué ha pasado ya',
    m3: 'Struan el primero, yo la segunda sobre las seis. Hamish y Sandra juntos, y Iain el último, entrando dando patadas y soltando tacos y todo el mundo se volcó con él porque venía destrozado',
    m4: 'fue esa la primera vez que viste a iain esa noche',
    m5: 'no. y llevo once días sentada con esto',
    m6: 'sobre las siete menos diez alguien entró en la sala principal, sin frontal encendido, sin hablar, y se fue derecho al fondo. di por hecho que era Struan que volvía del almacén de turba. no era Struan porque Struan ya estaba al fondo',
    m7: 'fue la chaqueta. azul, con el refuerzo naranja en el hombro, ese Berghaus viejo que lleva años teniendo. no le di ni una vuelta hasta tres días después',
    m8: 'por qué no lo dijiste',
    m9: 'porque a las ocho de la mañana con él muerto en la sala de al lado dije lo que dijo todo el mundo, que Iain entró el último a las diez menos veinte. y entró. ese es todo el problema. sí que entró a las diez menos veinte',
    m10: 'Sandra estuvo en el zaguán toda esa hora ordenando una mochila. habla con ella. lleva desde el domingo intentando que alguien la escuche y todo el mundo ha decidido que es la limpiadora',

    // ----------------------------------------------------------------- t-pris
    r1: 'Nueve años limpiándole la casa a ese hombre. Nueve años de su correo y su basura y su cuarto de baño, así que sí, sé cosas de él. Eso no es un móvil, eso es un martes cualquiera.',
    r2: 'Yo también ando por el monte. He hecho los Munros dos veces y la segunda en invierno, y soy del mismo club que Hamish Dunnet, y me gustaría que alguien en todo esto sostuviera las dos cosas a la vez.',
    r3: 'iain te ha puesto en la sala de atrás',
    r4: 'Sí. Yo estuve en el zaguán con la mochila abierta ocupando todo el suelo de siete a ocho, y Anne me vio hacerlo, y Hamish me pasó por encima dos veces.',
    r5: 'Y te voy a contar lo que sé, ya que por lo visto para lo que sirvo es para saber cosas de él.',
    r6: 'Hubo dos cartas de una editorial encima de esa mesa de la cocina durante un mes y estuve un mes quitando el polvo alrededor de ellas. Había escrito un párrafo a lápiz en el dorso de una. Decía: cuéntales la verdad sobre la Raven y que la cancelen.',
    r7: 'Un hombre no escribe eso en el dorso de la carta de una editorial si no lo ha decidido. Lo había decidido. Subía allí a regalarla.',

    // --------------------------------------------------------------- t-hamish
    h1: 'Soy el encargado de mantenimiento de ese refugio desde 1998 y llevo veintisiete años subiendo cuatro veces al año, y no he tenido que pensar ni una sola vez en el libro como registro de nada.',
    h2: 'Lo miro cuando llego. No es una norma, es una costumbre, y lo hice a las ocho con el frontal entre los dientes como todas las demás veces.',
    h3: 'A las ocho había cinco nombres. Struan, Anne, yo, la señora Nkemelu y K. Lamont. El suyo era el último de los cinco y ya estaba seco.',
    h4: 'A las diez menos veinte entró por esa puerta y lo firmó otra vez, en el renglón siguiente, delante de cuatro personas. Dos K. Lamont, uno debajo del otro. La policía se llevó el libro y no creo que nadie haya pasado esa página.',
    h5: 'la sala de atrás',
    h6: 'Pasé al fondo a eso de las siete y cuarto a por el gas de repuesto, que vive en la balda de encima de la chimenea. Struan estaba en el suelo con la espalda apoyada en la pared y había un hombre agachado delante de él.',
    h7: 'Dije perdón, el gas, y cogí el gas, y salí. Struan llevaba una copa de más y he visto a ese hombre tirado en el suelo de un refugio en cuatro ocasiones distintas y ninguna de ellas me hizo pensar nada.',
    h8: 'no viste quién era',
    h9: 'Una espalda y una chaqueta azul y un frontal apagado. Tengo sesenta y ocho años y era una sala de piedra iluminada por el vano de una puerta. Pero en ese edificio había cinco personas y de tres de ellas doy cuenta en ese minuto, y Struan era la cuarta.',
    h10: 'Lo de la firma es la parte que no consigo pasar. Un hombre que viene helado y hecho polvo y que acaba de andar cuatro millas no piensa en el libro. Un hombre que necesita que te acuerdes de verlo llegar, sí.',
    h11: 'Struan me dijo en verano que le había quitado a Iain Lamont una cosa que no le correspondía quitar, y que se la iba a devolver, y que le daba miedo hacerlo. Pensé que hablaba de una deuda.',
  },

  /**
   * Digit for digit identical to the English. `c-keir-book-late` states a point
   * inside its window rather than the window bounds — he signed at 21:40 and
   * the engine holds 20:00–22:00 — which is correct for an event time under
   * uncertainty, and is why the chip test here accepts a single time that falls
   * within the window.
   */
  claims: {
    'c-struan-mainroom': 'Struan: en la sala principal, 17:00–18:00',
    'c-keir-book-late': 'Iain: firmó el libro al llegar, a las 21:40',
    'c-keir-hill': 'Iain: en el camino del monte, 18:40–21:40',
    'c-morven-mainroom': 'Anne: en la sala principal, 18:00–22:00',
    'c-pris-backroom': 'Sandra: en la sala de atrás, 19:10–19:40 (según Iain)',
    'c-keir-mainroom': 'Iain: en la sala principal, 18:50–19:10 (según Anne)',
    'c-pris-porch': 'Sandra: en el zaguán, 19:00–20:00 (según Anne)',
    'c-keir-book-early': 'Iain: ya había firmado el libro a las 20:00 (según Hamish)',
    'c-keir-backroom': 'Iain: en la sala de atrás, 19:15–19:30 (según Hamish)',
  },

  motives: {
    'm-raven':
      'Iain hizo la Raven’s Line en solitario en 2016 y se lo contó a una sola persona. Struan se la atribuyó en 2018 y construyó siete años y un libro encima, y había decidido devolvérsela delante de testigos ese fin de semana.',
  },

  contradictions: {
    'x-keir-mainroom':
      'Se situó en el camino desde las siete menos veinte hasta las diez menos veinte. Sobre las siete menos diez alguien cruzó la sala principal con el frontal apagado y sin hablar, y Anne dio por hecho que era Struan que volvía del almacén de turba. Struan ya estaba al fondo. Ella reconoció la chaqueta y no le dio ninguna importancia durante tres días.',
    'x-keir-book':
      'Firmó el libro en la puerta a las diez menos veinte, delante de cuatro personas, porque Hamish te obliga. Hamish ya había leído ese libro a las ocho con el frontal entre los dientes, y K. Lamont era el quinto nombre y la tinta estaba seca. Hay dos K. Lamont en esa página, uno debajo del otro, y nadie la ha pasado.',
    'x-keir-backroom':
      'A las siete y cuarto Hamish pasó al fondo a por el gas de repuesto y había un hombre agachado delante de Struan, que estaba en el suelo con la espalda contra la pared. Una chaqueta azul y un frontal apagado. De las cinco personas de ese edificio hay tres de las que se da cuenta en ese minuto y Struan era la cuarta.',
    'x-pris-porch':
      'Puso a la mujer que le limpia la casa a Struan entrando y saliendo de la sala de atrás toda la noche. Ella estuvo en el zaguán de siete a ocho con la mochila abierta ocupando todo el suelo, Anne la vio hacerlo y Hamish le pasó por encima dos veces. Lleva desde el domingo intentando que alguien la escuche y todo el mundo decidió que era la limpiadora.',
  },

  confrontation: {
    // `you sat at home` in the English. `te quedaste sentado` picks a gender, so
    // the participle goes and the briefing's own wording stands in.
    opening:
      'No estuviste allí. Te rompiste un tobillo y te quedaste en casa y has leído unos cuantos mensajes. Venga, cuéntame tú esa noche.',
    beats: {
      'b-mainroom': {
        press:
          'Te situaste en el camino tres horas. A las siete menos diez alguien cruzó esa sala principal con el frontal apagado y se fue al fondo, y Anne reconoció la chaqueta.',
        rebuttal:
          'Una sala a oscuras y una chaqueta azul. Media montaña lleva esa chaqueta. Ha tenido once días y a mucha gente diciéndole que eso importa.',
      },
      'b-book': {
        press:
          'Firmaste el libro en la puerta a las diez menos veinte delante de cuatro personas. Hamish leyó ese libro a las ocho y tu nombre ya era el quinto, y estaba seco. Hay dos K. Lamont en esa página.',
        rebuttal: 'Pues alguien escribió mi nombre en un libro. Cualquiera puede escribir un nombre en un libro.',
      },
      // b-backroom and b-why carry no rebuttal in the English. He has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'b-backroom': {
        press:
          'A las siete y cuarto Hamish pasó a por el gas. Struan estaba en el suelo con la espalda contra la pared y había un hombre agachado delante de él con el frontal apagado. De los cinco se da cuenta de tres y Struan es el cuarto.',
      },
      'b-why': {
        press:
          'Hiciste la Raven’s Line en solitario en 2016 y se lo contaste a una sola persona. Él le puso su nombre en 2018 y te la iba a devolver ese fin de semana, delante de todos, y con eso se acababa su propio libro.',
      },
    },
    deflections: [
      'Eso es una sala sin luz dentro y cinco personas que llevaban horas andando.',
      'No estuviste en ese monte. No has estado nunca en ese monte en febrero.',
      'Vuelve con algo que no sea alguien acordándose de un abrigo.',
    ],
    confession:
      'Se la iba a devolver. Esa es la parte que nadie va a ser capaz de sostener en la cabeza, así que la digo con todas las letras.\n\nSubí temprano. Crucé por el collado y bajé antes de las seis porque he hecho ese camino cuarenta veces y no se tardan tres horas si te lo conoces. Quería una hora con él antes de que llegaran los demás.\n\nY se sentó en ese suelo y lo dijo. Dijo Iain, es tuya, la devuelvo el domingo delante de todos, ya lo he dejado escrito en el libro.\n\nY en mi vida he sentido nada parecido a lo que sentí entonces, y no era gratitud.\n\nSiete años. Siete años de estar al fondo de las salas mientras él contaba la historia de mi noche. Siete años de decidir cada mañana no decirlo. Y lo iba a deshacer en una tarde de domingo y encima quedando como un buen hombre, y todos dirían qué cosa más extraordinaria, y volvería a ser suya. Hasta la devolución iba a ser suya.\n\nYo no llevaba nada encima. En esa sala hay una chimenea y él ya estaba en el suelo.\n\nLuego volví a salir ahí fuera dos horas y media a oscuras, y entré a las diez menos veinte y dejé que cuatro personas se volcaran conmigo, y firmé mi nombre debajo de mi propio nombre.',
  },

  epilogue:
    'El libro está en un depósito de efectos de la policía en Aviemore. En la página cuarenta y uno pone K. Lamont dos veces, con cuatro renglones de diferencia, con el mismo lápiz.\n\nA Priscilla Nkemelu la interrogaron como es debido en marzo, cuatro meses después de haberlo pedido ella por primera vez. Les dio la carta con el párrafo a lápiz en el dorso, que había guardado en un cajón porque nunca nadie le había pedido nada.\n\nRaven’s Line se publicó en febrero con la atribución original, porque la tirada ya estaba encuadernada. La segunda edición lleva otro nombre y una nota de dos párrafos, y Struan Baillie escribió los dos él mismo el otoño anterior a su muerte.\n\nHamish Dunnet sigue subiendo cuatro veces al año. Ha dejado de mirar el libro.',
};
