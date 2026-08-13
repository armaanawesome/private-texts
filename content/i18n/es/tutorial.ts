import type { CaseTranslation } from '../caseText';

/**
 * Tutorial — "El obrador". Spanish.
 *
 * Three things this had to get right, in this order.
 *
 * 1. Times. Every clock time in the English survives unchanged, in the same
 *    grammatical position, because the whole case is one person in two places at
 *    one moment. "ten past three" is 03:10 in Roza's account of the smoke break,
 *    03:10 on the claim chip, and 03:10 in her confession — "las tres y diez" in
 *    all three, or the player is comparing two different facts. Same for the
 *    durations: half an hour is media hora, twenty two years is veintidós.
 *
 * 2. Names. Roza, Ivy, Tom Vardy, Peter Osei and Vardy’s stay as they are —
 *    those are people and a business. The places are translated, because they
 *    are descriptions rather than names, and "the garage on the bypass" sitting
 *    untranslated inside a Spanish sentence reads as a machine. Whatever the
 *    choice, the place chip and the sentence use the same words, which is the
 *    only reason a player can match one to the other. `la variante` is the road
 *    Peter Osei died on and the road the garage is on, and it is one word in
 *    both places for exactly that reason.
 *
 * 3. Voice. Four people text differently and the difference is the character.
 *    Tom writes in full sentences with no contractions, like a man of sixty who
 *    learned to write letters. Roza is careful and correct — she learned the
 *    language as an adult and is proud of it. Ivy is nineteen: lowercase, no
 *    opening question marks, accents dropped, `q` and `xq`, and a `un beso` at
 *    the end of the two messages she is frightened to send. The player is
 *    lowercase and short, because they are typing on a phone in the dark.
 *
 * `kiddo` is `cielo`. Every neutral option in Spanish for what a father calls a
 * grown child is either gendered or cold, and the player's gender is never
 * stated in this case.
 */
export const tutorialEs: CaseTranslation = {
  title: 'El obrador',
  blurb:
    'Empieza por aquí. Tu padre murió en el patio de atrás de su propia panadería y la culpa se la llevó el freno de mano. Tres conversaciones, y una frase dentro de ellas que no puede ser verdad.',

  characters: {
    you: 'Tú',
    tom: 'Papá',
    roza: 'Roza',
    ivy: 'Ivy',
  },

  places: {
    bakery: 'Vardy’s',
    ovens: 'el obrador',
    yard: 'el patio de atrás',
    square: 'la plaza del mercado',
    station: 'la gasolinera de la variante',
  },

  threads: {
    't-tom': 'Papá',
    't-roza': 'Roza Bielik',
    't-ivy': 'Ivy',
  },

  briefing: {
    causeOfDeath: 'Atropellado por la furgoneta de reparto en el patio de atrás.',
    ruling: 'El freno de mano. Registrado como accidente, sin más diligencias.',
    opening:
      'Tom Vardy amasó de noche en lo alto de la plaza del mercado durante treinta y un años. Las dos mañanas que faltó fueron la de después de morir su mujer y la de después de nacer tú.\n\nLo encontraron en el patio de atrás a las cuatro y diez, con la furgoneta contra la pared y el freno de mano quitado. Todo el mundo ha sido muy amable. Todo el mundo tiene además su versión de esa noche, y una versión no es más que la palabra de alguien.',
  },

  messages: {
    // ------------------------------------------------------------------ t-tom
    t1: 'Hornos encendidos. Voy dos horas adelantado. Otra vez sin poder dormir.',
    t2: 'son las 2 de la mañana',
    t3: 'Aquí también son las dos de la mañana, cielo. Estoy en el obrador hasta el primer reparto de las tres. Háblame.',
    t4: 'Esta mañana he pasado por la curva de la variante. Ella sigue dejando flores. El jueves hace tres años y no he dicho ni una palabra en ninguno de ellos.',
    t5: 'papá de qué estás hablando',
    t6: 'Esta noche le he dicho que el lunes voy. Cueste lo que nos cueste a los dos.\n\nSe lo ha tomado mejor de lo que esperaba. Esa es la parte que no me deja tranquilo.',
    t7: 'Alguien ha vuelto a dejar la furgoneta en la cuesta. La muevo cuando meta la segunda hornada.',
    t8: 'sigo abriendo esto y no hay nada nuevo',

    // ----------------------------------------------------------------- t-roza
    r1: 'Lo siento muchísimo. Tendría que haber ido yo a decírtelo en vez de dejar que te lo dijera un policía en la puerta de casa. He empezado este mensaje cuatro veces.',
    r2: 'Veintidós años he trabajado al lado de tu padre. Me dio trabajo cuando tenía diecinueve y apenas sabía pedirlo en inglés, y ni una sola vez me lo hizo notar.',
    r3: 'no paran de decirme que fue el freno de mano',
    r4: 'Salí a las dos y veinte a por leche, a la gasolinera de la variante, porque nos habíamos quedado sin y él la toma en el té. Estaba de vuelta antes de las dos y media.\n\nTe lo cuento igual que se lo conté a ellos, porque tú tienes que tenerlo igual que lo tuvieron ellos.',
    r5: 'Después de eso no me moví del obrador. Ni una sola vez entre las tres y las cuatro. Si me hubiera movido, lo habría visto salir.',
    r6: 'Salió atrás a fumar sobre las tres y diez. Siempre lo hacía, entre la segunda y la tercera. Estuvo ahí fuera media hora y no le di importancia, porque por qué iba a dársela.',
    r7: 'oíste algo',
    r8: 'Nada. El extractor hace muchísimo ruido y tenía la amasadora con el segundo bol. Le he dado vueltas y más vueltas.\n\nIvy llegó a las cinco a abrir la tienda y la mandé a casa. Diecinueve años. No tendría que haber visto el patio así.',

    // ------------------------------------------------------------------ t-ivy
    iv1: 'hola perdona q te escriba soy ivy la del mostrador de vardys. perdona ya se q es el peor momento posible un beso',
    iv2: 'tranquila. roza me dijo que estuviste allí a las cinco',
    iv3: 'si pero no te escribo por eso. esa noche no podia dormir. estaba sentada en mi ventana con la luz apagada xq me habia peleado con mi madre y no queria q supiera que estaba despierta',
    iv4: 'el extractor estuvo puesto todo el rato asi q sabia que tom estaba dentro. se oye desde el otro lado de la plaza. estuvo desde las tres hasta pasadas las cuatro cuando llego la ambulancia',
    iv5: 'roza dice que estuvo fuera atrás fumando desde las tres y diez. tú dices que no salió de la panadería',
    iv6: 'pero es q el patio es la panadería. sales por la puerta de atrás y sigues estando dentro. perdona no lo digo con retintín es q es el mismo edificio',
    iv7: 'esto es lo q no se me va de la cabeza. vi a roza en la plaza a las tres y veinte. salio por la puerta de delante y dio la vuelta por el lateral. le vi la cara debajo de la farola',
    iv8: 'me ha dicho que no se movió del obrador entre las tres y las cuatro',
    iv9: 'ya. se lo dije al policia y lo apunto y luego me pregunto si habia bebido. no habia bebido. estaba sentada en una ventana a oscuras como una rara y se perfectamente lo que vi',
    iv10:
      'hay una cosa mas y ya te dejo en paz. hace un par de semanas tom me pregunto como te entregas por algo que no hiciste pero que tenias justo al lado. pense q hablaba de una peli. dijo que roza se lo tomaria peor que él. un beso',
  },

  /**
   * The clock times here are digits in both languages and must stay digit for
   * digit identical to the English, because these are the six lines the player
   * lays side by side on the board.
   */
  claims: {
    'c-tom-ovens': 'Papá: en el obrador, 02:05–03:00',
    'c-roza-station': 'Roza: en la gasolinera de la variante, 02:20–02:45',
    'c-roza-ovens': 'Roza: en el obrador, 03:00–04:00',
    'c-tom-yard': 'Papá: en el patio de atrás, 03:10–03:40 (según Roza)',
    'c-tom-bakery': 'Papá: en Vardy’s, 03:00–04:00 (según Ivy)',
    'c-roza-square': 'Roza: en la plaza del mercado, 03:15–03:30 (según Ivy)',
  },

  motives: {
    'm-bypass':
      'Hace tres años la furgoneta de la panadería atropelló a un hombre en la variante a las cuatro de la mañana. Conducía Roza, Tom iba dormido en el asiento de al lado, y entre los dos dijeron que había sido un ciervo. Esa semana él le dijo que el lunes iba a ir a la policía.',
  },

  contradictions: {
    'x-roza-square':
      'No se movió del obrador entre las tres y las cuatro. Se lo dijo a un policía y después te lo dijo a ti.\n\nA las tres y veinte una chica de diecinueve años sentada en una ventana a oscuras la vio salir por la puerta de delante y dar la vuelta por el lateral. Por el lateral no hay más que el patio.',
  },

  confrontation: {
    opening:
      'Dilo, entonces. Llevo tres días esperando a que alguien lo diga, y prefiero que seas tú y no un hombre con una carpeta.',
    beats: {
      'b-square': {
        press:
          'Me dijiste dos veces que no te moviste del obrador entre las tres y las cuatro. Ivy te vio salir por la puerta de delante a las tres y veinte y dar la vuelta por el lateral.',
        rebuttal:
          'Una cría en una ventana, a oscuras, a las tres de la mañana, a la que acababan de mandar a casa desde un patio. Y eso lo pondrías por encima de veintidós años míos.',
      },
      'b-why': {
        press:
          'Hace tres años conducías tú esa furgoneta por la variante. Él iba dormido a tu lado y entre los dos dijisteis que había sido un ciervo. Esa noche te dijo que el lunes iba a ir.',
      },
    },
    deflections: [
      'Eso no demuestra absolutamente nada.',
      'Llevas mucho tiempo sin venir por aquí. No sabes lo que estás mirando.',
      'Pregúntame algo que puedas sostener en la mano.',
    ],
    confession:
      'Estaba detrás de ella con la mano en la puerta y ni siquiera estaba enfadado conmigo. Eso es lo que no consigo superar. Se dio la vuelta y dijo ven a ver este freno de mano, Roza, uno de los dos va a acabar mal.\n\nDi la vuelta por delante y lo quité.\n\nLlevo tres días diciéndome que no lo decidí. Es una mentira del mismo tamaño que el ciervo. Lo decidí a las tres y diez, en el fregadero, con las manos metidas en el agua.\n\nMe dio trabajo cuando tenía diecinueve y no sabía pedirlo bien. He tenido una vida entera gracias a eso. El lunes iba a devolverlo todo, y no podía pensar más allá de eso, y sigo sin poder.',
  },

  epilogue:
    'Lo contó entero antes de que la grabadora estuviera puesta, y después lo volvió a contar para la grabadora sin cambiar una palabra.\n\nEl hombre de la variante se llamaba Peter Osei. Tenía cincuenta y cuatro años y volvía a casa andando después de un turno en el almacén porque el último autobús ya había pasado. Su madre sigue dejando flores en esa curva todos los años. Este año había dos ramos, porque tu padre ya había estado.\n\nVardy’s no volvió a abrir. Ivy cogió trabajo en la panadería grande del polígono y dice que el pan está bien y que no es lo mismo. Te escribe todos los domingos desde entonces.',
};
