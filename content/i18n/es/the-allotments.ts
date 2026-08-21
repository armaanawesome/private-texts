import type { CaseTranslation } from '../caseText';

/**
 * Case 11 — «Los huertos». Spanish.
 *
 * Standalone pack: no Listener, no coda, no `el Keeper`. Nothing was added to
 * fill the silence.
 *
 * Six things this had to get right.
 *
 * 1. The fork, which everybody can name and nobody asked about. It is `la horca
 *    de borduras con el mango encintado` as an object and `la horca encintada`
 *    on the chips, which is the same long-name/short-name split the English
 *    makes, and the tape is what carries the identification in both. The point
 *    of the pack is that a thing everybody can identify at forty feet is the
 *    one thing nobody thought to locate, so the identifying detail — `la cinta`
 *    — has to stay attached to it in every mention.
 *
 * 2. The sentence that killed him. `Wilf decide` is what Joyce says in j9, what
 *    Deb repeats in the confession, and what the a-why press line throws back at
 *    her. Three occurrences, one wording, no variation for rhythm — it is a
 *    remembered sentence and a player has to recognise it the third time.
 *
 * 3. Times, and who is allowed digits. Everything is spoken except the
 *    scrapyard camera in j3, which is the only machine in the case and the only
 *    message carrying `19:02` and `19:11`. The a-lane press line deliberately
 *    speaks those same two minutes back as words — `las siete y dos`, `las siete
 *    y once` — exactly as the English does, because the player quoting a camera
 *    is not the camera.
 *
 * 4. Names and places. People and sites stay: Wilf Sankey, Deb and Deborah
 *    Threlfall, Ray Threlfall, Nev Ashworth, Joyce Ubani, Sami Rahimi, Ted
 *    Harrap, Carr Bank. Places that are descriptions are translated: los huertos
 *    de Carr Bank, la parcela 14, la parcela 3, la fila de casetas, el depósito
 *    de agua, el camino de Carr Bank. `la caseta` is the shed throughout, which
 *    matters because Ray’s shed is a character in this case.
 *
 *    Spanish `del` and `al` swallow a masculine article, so `el depósito de
 *    agua` (m2) and `el camino de Carr Bank` (j3) each appear uncontracted in
 *    the prose, or their chips would name places no sentence contains.
 *
 * 5. Voice, on the accent axis. Nev is the only person in this pack who drops
 *    apostrophes in the English — `youre` in v4, `hes` in v7 — so he is the only
 *    one who drops accents in Spanish, in every message. He also lowercases
 *    people and weekdays and keeps `Carr Bank` capitalised, which is the site
 *    being the one thing he is formal about, and that survives intact.
 *
 *    Wilf, Deb, Joyce and Sami write in capitals and finish every sentence. Nev
 *    is lowercase and never closes. The player is lowercase, short, and keeps
 *    accents — including `papá` in w7, which is one word and the only time they
 *    say it.
 *
 * 6. The player has no gender. The confrontation opening carries a comment in
 *    the English recording that this line used to say `You are his daughter` and
 *    was the third place the source told the player what they were, disagreeing
 *    with the other two. It now names the relationship from Wilf’s side and the
 *    Spanish follows: `Era tu padre`. Everything else is agreement-free —
 *    `has subido aquí`, `no has subido por aquí`, `no conoces este sitio` — and
 *    the perfect participle does not inflect, which is what makes them safe.
 */
export const theAllotmentsEs: CaseTranslation = {
  title: 'Los huertos',
  blurb:
    'Todo el mundo de ese sitio sabe de quién es la horca. Nadie preguntó en la caseta de quién llevaba diez días.',

  characters: {
    you: 'Tú',
    wilf: 'Wilf',
    deb: 'Deb',
    nev: 'Nev',
    joyce: 'Joyce',
    sami: 'Sami',
  },

  places: {
    site: 'los huertos de Carr Bank',
    plot14: 'la parcela 14',
    plot3: 'la parcela 3',
    shedrow: 'la fila de casetas',
    tank: 'el depósito de agua',
    lane: 'el camino de Carr Bank',
  },

  objects: {
    fork: 'la horca de borduras con el mango encintado',
  },

  threads: {
    't-wilf': 'Papá',
    't-society': 'Parcelistas de Carr Bank',
    't-nev': 'Nev',
    't-sami': 'Sami',
    't-joyce': 'Joyce Ubani',
  },

  briefing: {
    causeOfDeath: 'Un solo golpe. La horca seguía en el camino, a su lado.',
    ruling:
      'Abierto. En ese sitio hay una disputa de quince años por un seto, y la horca es del hombre que está en el otro extremo de ella.',
    opening:
      'Wilf Sankey llevaba treinta y un años de secretario de los huertos de Carr Bank y había escrito las actas de todas las asambleas en el mismo cuaderno de tapa dura.\n\nLo encontraron en la fila de casetas a las siete y media de una tarde de octubre, con la temporada de hogueras recién empezada y la horca de alguien al lado.\n\nEra tu padre. Te llamaba todos los domingos y te contaba lo de la presión del agua.',
  },

  messages: {
    // ----------------------------------------------------------------- t-wilf
    w1: 'El ayuntamiento ha vuelto a escribir por lo de las parcelas sin cultivar. Cuatro en nuestro sitio y quieren una decisión para final de mes.',
    w2: 'es deb una de ellas',
    w3: 'Lo es. Dos tercios son grama y no ha metido una azada desde que murió Ray, y eso son tres años en mayo.',
    w4: 'o sea que tienes que quitársela',
    w5: 'Tengo que hacer lo que dice el contrato o tengo que escribirles y pedirles que no me obliguen. Llevo desde el martes sentado delante de un folio en blanco.',
    w6: 'Esa caseta es la caseta de Ray. La construyó en 1998 con una entrega de palés y la mitad está torcida. Ella se sienta dentro los sábados con un termo.',
    w7: 'papá',
    w8: 'Ya está hecho. Dos caras, recomendando una exención por motivos humanitarios, y he puesto dentro que una parcela no es solo una parcela, cosa que les va a horrorizar.',
    w9: 'Se lo voy a decir esta noche antes de echarla al correo. Lleva tres años oyendo a la gente hablar de su parcela delante de ella y prefiero que lo oiga de pie.',
    w10: 'Estoy arriba ahora con los candados, antes de que se vaya la luz. Llámame mañana y te cuento cómo ha ido.',

    // -------------------------------------------------------------- t-society
    s1: 'Parcelistas. A Wilf lo encontraron en la fila de casetas el martes por la tarde y ha muerto. La policía ha precintado la parte de arriba y el sitio está cerrado hasta que ellos digan. Soy secretaria en funciones desde este mensaje y siento estar haciéndolo así.',
    s2: 'treinta y un años hizo las actas y el agua y el contenedor y el pedido de semillas y ninguno de nosotros se lo pidio nunca. me pele con el quince de esos años por un seto y daria cualquier cosa por estar pelandome con el ahora',
    s3: 'Yo estuve en la 14 toda la tarde. La temporada de hogueras empezó el domingo y tenía quince días de poda y estuve con ella en el extremo de abajo de seis a siete y media.',
    s4: 'Quemando todo el rato. Cualquiera que estuviera a favor de viento el martes os lo dirá.',
    s5: 'Y es la horca de Nev. Todo el mundo de ese sitio sabe que es la horca de Nev, lleva esa cinta puesta desde el Jubileo.',
    s6: 'deb',
    s7: 'Ya está bien. Lo que tenga que decir cualquiera, que se lo diga a un policía y no a sesenta y una personas que comparten un depósito de agua.',

    // ------------------------------------------------------------------ t-nev
    v1: 'tu padre y yo nos peleamos en 2010 por un seto y no dejamos de hablarnos ni una vez. eso es lo que es un sitio como este y nadie de fuera lo ha entendido nunca',
    v2: 'la horca es tuya',
    v3: 'lo es. cinta en el mango, mis iniciales quemadas en el astil, y no le he puesto la mano encima desde la semana pasada porque se la presto tu padre',
    v4: 'vino a por ella el viernes para las cañas de frambuesa del extremo de arriba y le dije quedatela hasta que acabes y desde entonces ha estado apoyada en su caseta. joyce lo vio subirla',
    v5: 'estuve en la 3 desde las seis con una linterna acabando de limpiar las judias. sami estuvo dos parcelas mas abajo todo el rato y nos gritabamos cosas del futbol',
    v6: 'y esto lo digo una vez. deb threlfall puso mi nombre en un grupo de sesenta y una personas antes de que tu padre estuviera enterrado. la conozco desde hace veinte años y no sabia que tuviera eso dentro',
    v7: 'habla con sami. es mas nuevo y no le debe nada a nadie de ese sitio, que en Carr Bank lo convierte en el unico testigo fiable de ciento cuarenta parcelas',

    // ----------------------------------------------------------------- t-sami
    m1: 'Llevo catorce meses con la parcela 22. Tu padre me dio una bolsa de cebollas de plantar mi primer sábado y me dijo que no me molestara con el maíz, y tenía razón.',
    m2: 'El martes estuve mucho rato en el depósito de agua. Los bidones de la 22 están vacíos hasta que le pongan el tejado, así que lleno regaderas, y son cuatro viajes.',
    m3: 'estaba deb quemando',
    m4: 'No. Y le he dado vueltas porque no quería ser el que lo dice. Su montón estaba allí y no estaba encendido. Pasé por el final de la 14 cuatro veces y no hubo humo en ese sitio en toda la tarde salvo el de Ted Harrap en la 40.',
    m5: 'Estuvo conmigo en el depósito dos veces. Hablamos del tejado. Estaba completamente normal y me preguntó por mi madre.',
    m6: 'la viste en las casetas',
    m7: 'Las seis y media, más o menos. Subió por la fila de casetas con una regadera vacía en cada mano, cosa en la que me fijé porque ahí arriba no se suben regaderas vacías, el depósito está para el otro lado.',
    m8: 'Pregúntale a Joyce por el camino. Hay una cámara en la puerta del desguace que da justo hacia arriba y lleva dos años intentando que le den las imágenes por lo de los vertidos.',

    // ---------------------------------------------------------------- t-joyce
    j1: 'Llevo diecinueve años de tesorera y lo guardo todo, cosa que a la gente le hace gracia hasta la semana en que deja de hacérsela.',
    j2: 'El desguace me dio once días de imágenes el jueves, después de habérmelas negado dos años por lo de los vertidos. Hizo falta que lo pidiera un policía en vez de yo.',
    j3: 'Enfoca justo el camino de Carr Bank. Deborah Threlfall lo sube a las 19:02 y lo vuelve a bajar a las 19:11, y en once días de grabación no se ve fuego en ese sitio en ningún momento salvo el de Ted.',
    j4: 'la horca',
    j5: 'Wilf subió esa horca a su propia caseta el viernes de la otra semana y yo lo vi hacerlo, porque se paró a quejarse del hombro todo el camino. Estuvo apoyada dentro de su puerta desde entonces hasta el martes.',
    j6: 'Así que quien la cogió la cogió en esa fila de casetas, de pie donde estaba él. Olvídate de Nev. Lo que te dice es quién estaba lo bastante cerca para alcanzarla.',
    j7: 'Y Wilf estuvo subiendo y bajando esa fila desde las cinco con los candados. Los hace todos los octubres y le lleva hora y media porque habla con todo el mundo.',
    j8: 'La carta del ayuntamiento sobre las cuatro parcelas me llegó a mí también. Deborah lleva sentada encima de ella desde el día once y me llamó dos veces para preguntar si un recurso cuesta algo.',
    j9: 'Le dije que Wilf decide. Esas fueron mis palabras. Lo dije por ser amable, porque Wilf la apreciaba, y he pensado en la forma de esa frase todas las noches desde entonces.',
  },

  /**
   * Digit for digit identical to the English. `c-deb-burning` and `c-deb-tank`
   * share the `deb-evening` group and name what was asserted rather than the
   * window, because the pair — burning at the far end against filling cans at
   * the tank — is the contradiction.
   */
  claims: {
    'c-wilf-tank': 'Wilf: en el depósito de agua, 17:00–17:25',
    'c-deb-plot': 'Deb: en la parcela 14, 18:00–19:30',
    'c-deb-burning': 'Deb: quemando poda, 18:00–19:30',
    'c-fork-nev': 'Nev: tenía la horca encintada, 18:00–19:30 (según Deb)',
    'c-nev-plot3': 'Nev: en la parcela 3, 18:00–20:00 (según Sami)',
    'c-sami-tank': 'Sami: en el depósito de agua, 18:20–19:20',
    'c-deb-tank': 'Deb: llenando regaderas en el depósito, 18:20–19:20 (según Sami)',
    'c-deb-shedrow': 'Deb: en la fila de casetas, 18:30–18:50 (según Sami)',
    'c-deb-lane': 'Deb: en el camino de Carr Bank, 19:00–19:10 (cámara del desguace)',
    'c-fork-wilf': 'Wilf: tenía la horca encintada, 18:00–19:30 (según Joyce)',
    'c-wilf-shed': 'Wilf: en la fila de casetas, 17:30–19:30 (según Joyce)',
  },

  motives: {
    'm-plot':
      'El ayuntamiento quería una decisión sobre cuatro parcelas sin cultivar para final de mes y la suya era una de ellas. La parcela 14 era la parcela de Ray y la caseta es la caseta que él construyó en 1998, y ella lleva los tres años desde que murió sentándose dentro los sábados.',
  },

  contradictions: {
    'x-deb-shedrow':
      'Se situó en el extremo de abajo de la 14 de seis a siete y media. Sobre las seis y media Sami Rahimi la vio subir por la fila de casetas con una regadera vacía en cada mano, cosa en la que se fijó porque ahí arriba no se suben regaderas vacías. El depósito está para el otro lado.',
    'x-deb-burning':
      'Dijo que estuvo quemando todo el rato y que cualquiera a favor de viento lo diría. Su montón no llegó a encenderse. Sami pasó por el final de la 14 cuatro veces y el único humo que hubo en Carr Bank esa tarde fue el de Ted Harrap en la 40, y ella estuvo dos veces en el depósito llenando regaderas con Sami, hablando de su tejado, preguntándole por su madre.',
    'x-deb-lane':
      'La cámara del desguace enfoca justo el camino de Carr Bank y Joyce Ubani llevaba dos años pidiendo esas imágenes por lo de los vertidos. Hizo falta que lo pidiera un policía en vez de ella. Deborah Threlfall sube el camino a las 19:02 y lo vuelve a bajar a las 19:11, y en once días de grabación no hay fuego en ese sitio salvo el de Ted.',
    'x-fork':
      'Todo el mundo de ese sitio puede identificar esa horca a doce metros, que es exactamente por lo que nadie preguntó dónde había estado. Wilf se la pidió prestada el viernes de la otra semana para las cañas de frambuesa y la subió él mismo a su propia caseta, quejándose del hombro todo el camino, y Joyce lo vio hacerlo. Estuvo apoyada dentro de su puerta desde entonces. No es una prueba sobre Nev Ashworth. Es una prueba sobre estar de pie donde él estaba de pie.',
  },

  confrontation: {
    opening:
      'Era tu padre y has subido aquí a hacer esto en su sitio. Quiero que sepas que creo que a él le habría parecido fatal.',
    beats: {
      'a-shedrow': {
        press:
          'Estuviste en la 14 de seis a siete y media. A las seis y media Sami te vio subir por la fila de casetas con una regadera vacía en cada mano.',
        rebuttal:
          'Un chaval que lleva catorce meses en ese sitio, en octubre, al anochecer, andando para arriba y para abajo con regaderas. No sabe lo que vio.',
      },
      'a-burning': {
        press:
          'Dijiste que estuviste quemando todo el rato. Tu montón no llegó a encenderse. Él pasó por el final de la 14 cuatro veces y estuviste dos veces con él en el depósito, preguntándole por su madre.',
        rebuttal:
          'No prendía. Llovió el domingo. Pregúntale a cualquiera que haya intentado quemar quince días de poda mojada.',
      },
      // a-lane and a-why carry no rebuttal in the English. She has stopped
      // answering and the confession follows the silence, so there is nothing
      // here to translate and a line would break the scene.
      'a-lane': {
        press:
          'La cámara del desguace da justo al camino. Lo subes a las siete y dos y lo vuelves a bajar a las siete y once, y en once días de grabación no hay fuego en ese sitio.',
      },
      'a-why': {
        press:
          'El ayuntamiento quería cuatro parcelas decididas para final de mes y la tuya era una de ellas. Joyce te dijo que Wilf decide.',
      },
    },
    deflections: [
      'Eso son ciento cuarenta personas que llevan tres años hablando de mi parcela delante de mí.',
      'No has subido por aquí desde la comida del funeral. No conoces este sitio.',
      'Tráeme algo que no sea alguien con una regadera.',
    ],
    confession:
      'Dijo Deb, tienes un momento, y se metió la mano en el bolsillo del abrigo.\n\nLe he dado mil vueltas a esa mano.\n\nPorque Joyce me lo había dicho el domingo. Wilf decide, dijo, y lo dijo con cariño, y me fui a casa y no dormí y para el martes ya me lo había montado entero. La carta en el bolsillo. Él haciéndolo de pie en la fila de casetas para que yo no montara una escena en la caseta común. La caseta de Ray con una pegatina del ayuntamiento en la puerta para Navidad.\n\nY la horca estaba apoyada dentro de su puerta y no tuve ni que buscarla.\n\nNo llegó a terminar la frase. Eso es lo que quiero que quede escrito en alguna parte. Nunca oí cómo acababa.\n\nHe tenido ocho semanas para averiguar qué había en ese bolsillo y lo sé desde la segunda semana más o menos, porque es Wilf, y solo había una cosa que podía ser.',
  },

  epilogue:
    'La carta estaba en el bolsillo interior del abrigo, doblada en tres, en un sobre dirigido al servicio de parques y zonas verdes y franqueado listo para salir.\n\nDos caras. Recomendaba una exención por motivos humanitarios para la titular de la parcela 14 y exponía el caso con cierta extensión, y el último párrafo decía que una parcela no es solo una parcela y que la junta sabría lo que quería decir aunque el ayuntamiento no.\n\nEl ayuntamiento la concedió en enero, apoyándose en la carta de un hombre que llevaba muerto desde octubre, y Joyce Ubani leyó la resolución en voz alta en la asamblea y luego tuvo que parar y pasarle el cuaderno a otra persona.\n\nLa parcela 14 la cogió la madre de Sami Rahimi en primavera. Se quedó con la caseta. La junta votó por unanimidad que se queda, con el argumento de que está torcida y de que Ray Threlfall la construyó con una entrega de palés en 1998, cosa que ahora consta en las actas.',
};
