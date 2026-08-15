import type { CaseTranslation } from '../caseText';

/**
 * Case 5 — "Die Totenwache". German.
 *
 * Five things this had to get right, in this order.
 *
 * 1. The collective alibi is one sentence, repeated. Four people tell the guards
 *    the same thing, and the horror of the case is that it is *almost* true and
 *    that all of them meant well. So the sentence has to be the same sentence
 *    every time it appears in German: `wir waren alle im Vorderzimmer`. Donal
 *    says it at f4, Maureen says it at f6 and again at u2, Eileen says it at r8,
 *    and Donal says it back to himself in the confession. A translation that
 *    varied the phrasing for elegance would turn one shield into five opinions,
 *    and the player would never see that it was rehearsed.
 *
 * 2. Times. The wake runs 16:00–16:30 and every time in the prose is spoken:
 *    `um zehn nach vier` is the minute Eileen goes for glasses, the minute Donal
 *    goes through the outside door, and the minute Cass watches him. German
 *    cannot leave the hour implicit, so `ten past` becomes `zehn nach vier` in
 *    full where the English can shorten it — but never a digit, because the only
 *    digits this case owns are the `5mg` on Gerald-s prescription and the 1994
 *    the step has been bad since.
 *
 *    The chips run on an epoch weeks long (funeral day is day 43, so 16:00 is
 *    minute 61440) and two of them sit three weeks earlier, at the chemist. Any
 *    reader of these chips has to wrap at 1440 or every one of them is wrong.
 *
 * 3. Names. Tony, Donal, Maureen, Eileen, Cass, Gerald Mulvey, Donal Fahey,
 *    Joel-less this time but Ballybough Road all keep theirs. Places translated
 *    and bare:
 *
 *      house     → Haus            sidereturn → Seitengang
 *      frontroom → Vorderzimmer    gardenroom → Gartenzimmer
 *      kitchen   → Küche           chemist    → Apotheke an der Ballybough Road
 *
 *    `Seitengang` for the side return: the Dublin thing has no German name, and
 *    what the case needs from it is that it is outside, narrow, at the side, and
 *    visible from the kitchen window. `Vorderzimmer` rather than `gute Stube`,
 *    which is the closer cultural match but drags a German rural register into
 *    a Dublin terrace.
 *
 *    `the guards` is `die Polizei`. Keeping `Garda` would be more accurate and
 *    would cost the player a beat every time, and this case says it eleven
 *    times.
 *
 * 4. Voice. Six people, and the axis is punctuation rather than capitals,
 *    because German capitalises the nouns for everybody:
 *
 *      Eileen — capitals AND a full stop at the end of every message. Eighty
 *               one, buried a husband that morning, and still finishing her
 *               sentences. She is the only voice in the case that closes.
 *      Maureen — capitals and no full stop, ever. Same generation, same manners,
 *               and she is coming apart. The difference between her and her
 *               mother is one character wide and it is the whole of it.
 *      Tony   — lowercase sentence starts, nouns capitalised, no full stop.
 *      Donal  — the same, and separated from Tony by what he does with it: Tony
 *               explains himself, Donal closes things down. His messages end on
 *               a full stop of meaning without one of punctuation.
 *      Cass   — lowercase including her nouns, spoken clipping (`hab`, `is`,
 *               `ne`, `voll`), and the family words nobody else uses: `oma`,
 *               `onkel tony`, `opa`.
 *      Du     — lowercase including nouns as well, and separated from Cass by
 *               having no clipping at all and no family words. Plain, short,
 *               standard vocabulary. Cass at k1 is four words long, so length
 *               alone would not have done it here.
 *
 * 5. `Antworte auf die Frage, Donal.` at f9. The English is `Answer him, Donal`,
 *    and `him` is the player — the same class of leak as `Ivy-s godson` was in
 *    Pack 3 and `a man in Cambridge` is in Deep Field, and third person again,
 *    so playerNeutral.test.ts does not see it. German drops the pronoun and
 *    keeps the directedness. Flagged for the English.
 *
 * Two names in the epilogue are stale in the source and are translated as they
 * stand rather than quietly corrected: it says `Eileen Mulvey` where the
 * character is called Eileen, the same way Deep Field says `Orla`, `Pilar` and
 * `Rune` for Laura, Maria and Erik. Flagged rather than fixed, because the fix
 * belongs in the English where every language gets it at once.
 */
export const theWakeDe: CaseTranslation = {
  title: 'Die Totenwache',
  blurb:
    'Einundvierzig Menschen waren im Haus und alle erzählen dieselbe Geschichte, Wort für Wort. Gebaut wurde sie, um jemanden zu schützen, der es nicht getan hat.',

  characters: {
    you: 'Du',
    tony: 'Tony',
    donal: 'Donal',
    nuala: 'Maureen',
    bridie: 'Eileen',
    cass: 'Cass',
  },

  places: {
    house: 'Haus',
    frontroom: 'Vorderzimmer',
    kitchen: 'Küche',
    gardenroom: 'Gartenzimmer',
    sidereturn: 'Seitengang',
    chemist: 'Apotheke an der Ballybough Road',
  },

  threads: {
    't-tony': 'Tony',
    't-family': 'Mulveys',
    't-bridie': 'Eileen',
    't-cass': 'Cass',
    't-nuala': 'Maureen',
  },

  briefing: {
    causeOfDeath: 'Ein einzelner Schlag auf den Hinterkopf gegen die Stufe.',
    ruling:
      'Als Sturz verzeichnet. Er hatte seit elf getrunken, und die Stufe ins Gartenzimmer ist eine schlechte.',
    opening:
      'Gerald Mulvey wurde am Donnerstag beerdigt, und einundvierzig Menschen kamen mit zurück ins Haus.\n\nSein ältester Sohn Anthony wurde um fünf Uhr am Fuß der Stufe ins Gartenzimmer gefunden, ein Glas noch in der Hand und die Rezeptunterlagen seines Vaters in der Tasche neben ihm.\n\nDu warst neun Jahre nicht in diesem Haus. Tony war derjenige, der dich gebeten hat zu kommen.',
  },

  messages: {
    // ----------------------------------------------------------------- t-tony
    y1: 'neun Jahre. an dem Tag wird keiner etwas dazu sagen, sie werden dich alle nur ansehen und sagen, Gott, du bist ihm wie aus dem Gesicht geschnitten',
    y2: 'ich komme nicht wegen ihnen',
    y3: 'gut. weil ich jemandem etwas zeigen will, der nicht bis zum Hals in dieser Familie steckt',
    y4: 'papa hatte am Ende 5mg von dem flüssigen Morphium und die Apotheke führt ihn mit hundertachtzig Millilitern über drei Wochen. das ist kein Fehler, das ist jemand, der abholt',
    y5: 'wer hat abgeholt',
    y6: 'das ist der Teil, den ich habe, und ich schreibe ihn nicht in eine Nachricht. ich habe den Ausdruck. ich bringe ihn Donnerstag in der Tasche mit den Lesungen für die Messe',
    y7: 'ich habe ihn Sonntag geradeheraus gefragt, ohne Umschweife, und er hat mich ausgelacht und gesagt, pass auf dich auf, Tony. das ist der genaue Wortlaut. pass auf dich auf',
    y8: 'tony geh zur polizei',
    y9: 'mit meiner Mutter im Haus. nach der Beerdigung. das tue ich ihr nicht an in der Woche, in der sie ihn begräbt, ich mache es am Freitag und ich mache es richtig',
    y10: 'du bist da. ich habe dich hinten in der Kirche gesehen und wäre fast rübergegangen',
    y11: 'küche, bei den Broten, wie ein Idiot. finde mich vor den Reden, ich habe die Tasche dabei',

    // --------------------------------------------------------------- t-family
    f1: 'Für alle, denen es noch niemand richtig gesagt hat und nicht über Dritte, Tony ist gestern im Haus gestorben. Er ist an der Stufe ins Gartenzimmer gestürzt. Um Mammy wird sich gekümmert, und ruft sie heute bitte nicht an, ruft mich an, ich sage euch allen sowieso Bescheid wegen der Termine, sobald es welche gibt',
    f2: 'Ich habe am Donnerstag einen Mann begraben und am Donnerstagabend einen Sohn. Ich habe keinem von euch etwas zu sagen, außer dass Gott ein sehr schlechtes Gefühl dafür hat, wann etwas genug ist.',
    f3: 'die Polizei war in Ordnung damit. sie waren in einer Stunde rein und raus und haben gesagt, was in dem Haus sowieso alle wussten. schlechte Stufe, seit elf getrunken, mehr ist da nicht',
    f4: 'und wir waren ab vier alle im Vorderzimmer wegen der Reden. wir alle. das habe ich ihnen gesagt und das haben ihnen alle gesagt',
    f5: 'ich habe die ganze Zeit die Gläser herumgereicht. fragt irgendeinen von ihnen',
    f6: 'Wir waren alle im Vorderzimmer. Jeder Einzelne von uns. Ich will das deutlich gesagt haben, weil schon geredet wird und ich weiß, woher das kommt',
    f7: 'er hatte eine tasche dabei. wo ist die tasche',
    f8: 'neun Jahre und das ist deine erste Frage. na gut',
    f9: 'Antworte auf die Frage, Donal.',
    f10: 'ich weiß nicht, wo seine Tasche ist. das ist ein Haus mit vierzig Leuten drin und einem toten Mann hinten drin',
    f11: 'und wenn wir schon Fragen stellen, Cass war die ganze Zeit hinten draußen und darüber hat auch keiner ein Wort gesagt',
    f12: 'Donal.',
    f13: 'Das Kind war bei mir. Das sage ich dir und einem Polizisten und einem Richter, und ich lasse mich nicht zweimal fragen.',

    // --------------------------------------------------------------- t-bridie
    r1: 'Du bist gekommen. Neun Jahre, und du bist gekommen, und er war derjenige, der dich gefragt hat. Darin steckt irgendwo eine Lehre, und ich bin zu müde, um sie zu suchen.',
    r2: 'warst du im vorderzimmer',
    r3: 'Ich war um zehn nach vier in meiner Küche und habe Gläser gesucht, weil niemand irgendjemandem ein Glas gereicht hatte und die Reden ohne sie liefen.',
    r4: 'Und von meinem Küchenfenster aus sehe ich den Seitengang, und Donal Fahey stand darin am Telefon, mit dem Rücken zum Haus.',
    r5: 'du hast der polizei gesagt alle waren im vorderzimmer',
    r6: 'Habe ich. Und ich würde es wieder tun, und ich sage dir genau, warum, und danach kannst du von mir denken, was du willst.',
    r7: 'Cassie hat am Mittwoch vierhundert Pfund aus meiner Handtasche genommen. Maureen hat sie dabei erwischt und ich habe die beiden dabei erwischt, und wir haben zu dritt beschlossen, dass der Tag, an dem wir ihren Großvater beerdigt haben, nicht der Tag dafür war.',
    r8: 'Als der Polizist also gefragt hat, wo alle waren, haben wir gesagt, im Vorderzimmer, wir alle, zusammen. Es war für sie. Es war für niemanden sonst, und ich habe keine Sekunde lang gedacht, dass es für jemand anderen sein könnte.',
    r9: 'Das Kind war im Seitengang und hat sich vor Scham übergeben, und mein Sohn lag zwanzig Fuß von ihr entfernt im Sterben, und ich habe sie hinausgeschickt.',
    r10: 'Rede mit ihr. Mit mir redet sie nicht, und ich nehme es ihr nicht übel.',

    // ----------------------------------------------------------------- t-cass
    k1: 'oma hat gesagt du schreibst',
    k2: 'ich hab das geld genommen. ich mach hier nicht das ding, wo ich mich erst langsam dazu durchringe',
    k3: 'ich habe nicht nach dem geld gefragt',
    k4: 'alle fragen irgendwann nach dem geld. ich war die ganze zeit draußen im seitengang. ab vier bis oma rausgekommen ist und mich geholt hat',
    k5: 'donal kam so gegen zehn nach raus. er hat mich nicht gesehen, ich bin klein und da steht ne mülltonne, nur deswegen weiß ich überhaupt was',
    k6: 'was hat er gemacht',
    k7: 'ist durch die gartenzimmertür rein. die von außen. er war ne weile drin und dann kam er wieder raus und war anders. nicht aufgelöst. eher ordentlich. er hat sich im fenster die krawatte gerichtet',
    k8: 'und er hatte onkel tonys tasche. damals wusste ich nicht dass es onkel tonys war. jetzt weiß ich es',
    k9: 'warum hast du nichts gesagt',
    k10: 'weil ich, um zu sagen wo er war, sagen muss wo ich war. und wo ich war ist der seitengang und mir war schlecht weil ich meine oma beklaut hab am tag von opas beerdigung',
    k11: 'sie haben mich alle gedeckt. alle, sofort, keiner hat auch nur drüber geredet. und ich lieg im bett und begreife, dass er nur damit durchkommt weil sie nett zu mir waren',

    // ---------------------------------------------------------------- t-nuala
    u1: 'Ich bin seit sechsundzwanzig Jahren mit ihm verheiratet und ich weiß es seit ungefähr neun Stunden, also musst du mir einen Moment lassen, wie ich die Dinge sage',
    u2: 'Ich habe der Polizei gesagt, wir waren alle im Vorderzimmer, weil Mammy es zuerst gesagt hat und ich sie damit nicht allein dastehen lassen wollte. Das ist meine ganze Begründung und viel ist es nicht',
    u3: 'die rezepte',
    u4: 'Donal hat die Apotheke gemacht. Das letzte Mal war der Dienstag, zehn nach elf, und sein Name steht im Register, weil man für das flüssige unterschreiben muss. Er hat in dem Monat jedes einzelne gemacht, weil ich da nicht reingehen und dem Mädchen hinter dem Tresen Daddys Namen sagen konnte, ohne loszuheulen',
    u5: 'Und er hat der Polizei gesagt, er hätte sie kein einziges Mal abgeholt. Er hat es vor mir gesagt und ich habe ihn es sagen hören und ich habe nichts gesagt, weil ich damals dachte, er wäre nur faul mit dem Papierkram',
    u6: 'Hundertachtzig Milliliter. Tony hat es mir am Sonntag gesagt und ich habe ihm gesagt, er macht sich zum Gespött beim Monatsgedächtnis seines eigenen Vaters',
    u7: 'Daddy hatte Geld. Nicht viel. Genug, dass vier weitere Jahre Pflegeheim alles aufgebraucht hätten und drei Jahre etwas übrig gelassen hätten',
    u8: 'Ich gehe immer wieder ins Vorderzimmer zurück und zähle Köpfe. Ich habe diesen Raum seit gestern vierzigmal gezählt und er ist nicht darin, und ich habe gesagt, er war es, und ich hätte weiter so gesagt',
  },

  /**
   * The chips sit on an epoch weeks long — the two chemist claims are three
   * weeks before the funeral — so anything reading them has to wrap at 1440.
   */
  claims: {
    'c-tony-kitchen': 'Tony: in der Küche, 15:00–15:55',
    'c-donal-front': 'Donal: im Vorderzimmer, 16:00–16:30',
    'c-donal-toast': 'Donal: reicht die Gläser herum, 16:00–16:30',
    'c-nuala-front': 'Maureen: im Vorderzimmer, 16:00–16:30',
    'c-cass-gardenroom': 'Cass: im Gartenzimmer, 16:05–16:25 (laut Donal)',
    'c-bridie-kitchen': 'Eileen: in der Küche, 16:05–16:15',
    'c-donal-outside': 'Donal: am Telefon im Seitengang, 16:05–16:25 (laut Eileen)',
    'c-cass-return': 'Cass: im Seitengang, 16:00–16:30 (laut Eileen)',
    'c-donal-garden': 'Donal: im Gartenzimmer, 16:10–16:20 (laut Cass)',
    'c-donal-collected': 'Donal: hat das letzte Rezept unterschrieben, 10:00–12:00',
    'c-donal-scripts': 'Donal: hat nie ein Rezept abgeholt, 09:00–13:00 (seine Aussage)',
  },

  motives: {
    'm-morphine':
      'Er hat Geralds Rezepte in jeder Woche des letzten Monats abgeholt, und auf eine Dosis von fünf Millilitern gingen hundertachtzig Milliliter raus. Tony hatte den Ausdruck der Apotheke in seiner Tasche und wollte am Freitag zur Polizei.',
  },

  contradictions: {
    'x-donal-garden':
      'Jeder Erwachsene in diesem Haus hat der Polizei denselben Satz gesagt, und bei fast allen stimmte er. Um zehn nach vier ging Donal Fahey durch die Außentür ins Gartenzimmer, und eine Neunzehnjährige hinter einer Mülltonne sah ihn wieder herauskommen und sich im Fenster die Krawatte richten.',
    'x-donal-glasses':
      'Er hat gesagt, er habe die ganze Zeit die Gläser herumgereicht. Eileen Mulvey ging um zehn nach vier in ihre eigene Küche und suchte Gläser, weil niemand irgendjemandem eines gereicht hatte, und von diesem Fenster aus sah sie ihn im Seitengang stehen, mit dem Rücken zum Haus.',
    'x-donal-scripts':
      'Er hat der Polizei gesagt, er habe Geralds Rezepte kein einziges Mal abgeholt. Seine Frau hat sie einen Monat lang gemacht und weiß genau, warum sie es nicht konnte: Sie konnte dem Mädchen hinter dem Tresen den Namen ihres Vaters nicht sagen. Gegen eine Dosis von fünf Millilitern gingen hundertachtzig Milliliter flüssiges Morphium raus, und der Ausdruck lag in Tonys Tasche.',
    'x-cass-return':
      'Er hat das Kind ins Gartenzimmer gestellt, und das ist die einzige Beschuldigung, die in dieser Familie jemand laut ausgesprochen hat. Sie war die ganze halbe Stunde im Seitengang und hat sich vor Scham über vierhundert Pfund übergeben, und ihre Großmutter hat sie hinausgeschickt und kann das sagen.',
  },

  confrontation: {
    opening:
      'Neun Jahre warst du weg. Du kommst für einen Nachmittag zurück und kennst jetzt diese Familie, ja. Also los.',
    beats: {
      'w-garden': {
        press:
          'Du hast der Polizei gesagt, ab vier waren alle im Vorderzimmer. Um zehn nach bist du durch die Außentür ins Gartenzimmer gegangen, und Cass hat dich wieder herauskommen und dir im Fenster die Krawatte richten sehen.',
        rebuttal:
          'Ein Kind, das seine Großmutter am Tag einer Beerdigung bestohlen hat. Das ist deine Zeugin. Sie hat allen Grund der Welt, jemand anderen mit sich nach hinten zu stellen.',
      },
      'w-glasses': {
        press:
          'Du hast gesagt, du hättest die ganze Zeit die Gläser herumgereicht. Eileen ist um zehn nach in die Küche gegangen und hat Gläser gesucht, weil niemand irgendjemandem eines gereicht hatte, und sie hat dich vom Fenster aus gesehen.',
        rebuttal: 'Sie ist einundachtzig und hat an dem Morgen ihren Mann begraben.',
      },
      'w-scripts': {
        press:
          'Und du hast ihnen gesagt, du hättest Geralds Rezepte nie abgeholt. Maureen hat sie einen Monat lang gemacht, und sie kann dir genau sagen, warum sie es nicht konnte.',
      },
      'w-why': {
        press:
          'Hundertachtzig Milliliter gegen eine Dosis von fünf Millilitern. Tony hatte den Ausdruck in dieser Tasche und wollte am Freitag zur Polizei. Du bist derjenige, der ihm gesagt hat, er soll auf sich aufpassen.',
      },
    },
    deflections: [
      'Das ist ein Haus voller Trauer, und du liest es wie ein Kassenbuch.',
      'Du warst neun Jahre nicht hier. Du kannst nicht ankommen und recht haben.',
      'Bring mir eine Sache. Nicht ein Gefühl, das jemand bei einer Beerdigung hatte.',
    ],
    confession:
      'Er kam in den Seitengang heraus, um es mir zu sagen. Nicht um mir zu drohen. Das war die Sache mit Tony, er konnte nicht drohen, er kam heraus, um mir zu sagen, was er am Freitag tun würde, damit ich es nicht von einem Polizisten höre.\n\nEr war anständig dabei. Er hatte die Tasche unter dem Arm und war anständig dabei.\n\nUnd ich sagte, komm eine Minute rein, und er ging vor mir hinein, und die Stufe in dieses Gartenzimmer ist seit 1994 eine schlechte Stufe.\n\nIch will den anderen Teil sagen, weil du den ersten Teil ohne ihn nicht glauben wirst.\n\nIch habe nichts davon gebaut. Das Vorderzimmer. Wir alle zusammen. Ich habe kein einziges Wort gesagt, damit das passiert. Sie haben es selbst getan, in ungefähr vier Sekunden, im Flur, weil Cassie geweint hat und Eileen gesagt hat, wir waren alle im Vorderzimmer, und Maureen gesagt hat, ja, waren wir, und sie haben einander angesehen und es war erledigt.\n\nUnd ich stand da und habe es sich über mir schließen lassen wie Wasser.\n\nDas ist, was ich getan habe. Ich habe etwas gestohlen, das für ein Kind gedacht war.',
  },

  epilogue:
    'Gerald Mulvey wurde im Februar exhumiert. Der Bericht benutzte das Wort vereinbar viermal und ging nicht weiter als das, und er musste es auch nicht, weil es da schon das Register der Apotheke gab und weil es Maureen gab.\n\nSie hat ihre Aussage über zwei Tage gemacht und kein einziges Mal gefragt, was das mit ihr machen würde. Als sie gefragt wurde, warum sie das Vorderzimmer gesagt hatte, sagte sie: weil meine Mutter es zuerst gesagt hat.\n\nEileen Mulvey ist nicht zum Prozess gegangen. Sie hat einen Brief geschickt, der verlesen werden sollte, eine Zeile lang, mit der Bitte, dem Gericht zu sagen, dass ihre Enkelin die ganze Zeit im Seitengang gewesen war und mit alldem nichts zu tun hatte.\n\nCass hat die vierhundert Pfund in Raten an eine Frau zurückgezahlt, die kein einziges Mal danach gefragt hat.',
};
