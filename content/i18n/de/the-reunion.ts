import type { CaseTranslation } from '../caseText';

/**
 * Case 13 — "Das Klassentreffen". German.
 *
 * Six things this had to get right, in this order.
 *
 * 1. The four `with_person` claims are deliberate dead ends and German must not
 *    make them sound like proof. The engine can never fire on co-presence —
 *    being with one person does not exclude being with another — so a room where
 *    everybody can tell you who they were standing with is a room full of
 *    answers that prove nothing. The chips read plainly, `Michelle: bei Nia`,
 *    `Nia: bei Mark`, with no word suggesting exclusivity.
 *
 * 2. He did not falsify a clock, he became one. The programme says nine and he
 *    spoke at quarter past eight, so every witness dating the evening off the
 *    speech is inside a sequence he authored. The two halves have to stay
 *    exactly as far apart in German as in English: `im Programm stand neun`
 *    against `er hat sie um viertel nach acht gehalten`, and the invoice that
 *    settles it — `warme Ausgabe 20:55` — is the one number Michelle has.
 *
 * 3. Digits are years, the invoice and the barrier log. 2005, 1989, 1991, plus
 *    `20:55`, `21:08` and `21:19`. `Klasse 4` keeps its digit: the English says
 *    `Year 4` and spelling it out as a word is the edit the numbers rule
 *    catches. Everything a person says is spoken — `viertel vor neun`, `halb
 *    zehn`, `zehn nach acht`.
 *
 * 4. Names and places. Nia Boateng, Mark Ellory, Michelle Selkirk, Tobi
 *    Marchetti, Colin Vale, Ashley and Sheila Crewe, Ardenshaw and Calderside
 *    keep theirs. Places bare, so no fused preposition can eat them — `in der
 *    Aula` still contains `Aula`:
 *
 *      school   → Ardenshaw High     riverpath → Flussweg
 *      hall     → Aula               carpark   → Lehrerparkplatz
 *      musicblock → Musiktrakt       branch    → Zweigstelle Calderside
 *
 * 5. Voice. Four of the six write standard prose and close every sentence, and
 *    the separation is what each of them does with a fact:
 *
 *      Nia    — warm and self-doubting, and she counts her own attempts.
 *      Mark   — careful, institutional, and he mentions his position before he
 *               answers anything. Every message manages the reader.
 *      Tobi   — plain, and he keeps making himself ordinary: four hundred
 *               people do this, it only looks rare from where you are standing.
 *      Vale   — the caretaker, and the only person who uses titles. `Herr
 *               Ellory`, `Frau Selkirk`, `Frau Boateng`. He goes by his round
 *               and not by the party, and that is exactly why he can date the
 *               evening when ninety guests cannot.
 *      Michelle — all lowercase, no full stops, running on. She is the one who
 *               has the invoice and does not know it matters.
 *      Du     — lowercase too, and separated from Michelle by length.
 *
 * 6. `Sie wollte mich nicht nennen.` The confession turns on the letter never
 *    having carried his name, and the last line has to land as flatly in German
 *    as it does in English. No softening, no explanatory clause.
 */
export const theReunionDe: CaseTranslation = {
  title: 'Das Klassentreffen',
  blurb:
    'Neunzig Menschen können dir sagen, neben wem sie standen. Nicht ein Einziger kann dir sagen, wie spät es war.',

  characters: {
    you: 'Du',
    nia: 'Nia',
    rafe: 'Mark',
    marika: 'Michelle',
    tobi: 'Tobi',
    corin: 'Herr Vale',
  },

  places: {
    school: 'Ardenshaw High',
    hall: 'Aula',
    musicblock: 'Musiktrakt',
    carpark: 'Lehrerparkplatz',
    riverpath: 'Flussweg',
    branch: 'Zweigstelle Calderside',
  },

  threads: {
    't-nia': 'Nia',
    't-year': 'Ardenshaw 2005',
    't-marika': 'Michelle',
    't-rafe': 'Mark Ellory',
    't-tobi': 'Tobi',
    't-corin': 'Herr Vale',
  },

  briefing: {
    causeOfDeath:
      'Sie ist von oben an der Böschung in den Calder gestürzt. Der Weg ist unbeleuchtet und der Absturz beträgt dort etwa zwanzig Fuß.',
    ruling:
      'Offen. Zwei Menschen haben der Polizei bereits gesagt, es sei derselbe Abschnitt Wasser, in dem 2005 ein Junge aus ihrem Jahrgang ertrunken ist, und beide haben es ungefragt gesagt.',
    opening:
      'Nia Boateng unterrichtete die Klasse 4 an einer Schule elf Meilen von der entfernt, auf die sie selbst gegangen war, und sie hatte das Klassentreffen nach zwanzig Jahren organisiert, weil es sonst niemand tun wollte.\n\nGefunden wurde sie um halb zehn auf dem Flussweg unterhalb der Sportplätze, dreißig Meter von der Stelle, an der Ashley Crewe im Juni 2005 in denselben Fluss gegangen ist.\n\nSie hat dir vor drei Wochen geschrieben. Du warst in diesem Jahrgang und du warst nie in dieser Gruppe, und sie sagte, genau deswegen müsse sie mit dir reden.',
  },

  messages: {
    // ------------------------------------------------------------------ t-nia
    n1: 'Du wirst dich nicht an mich erinnern. Ich saß zwei Jahre lang in Erdkunde hinter dir und du hast auf meinem Federmäppchen gemalt.',
    n2: 'ich erinnere mich an dich',
    n3: 'Ich mache das Klassentreffen. Zwanzig Jahre. Es ist in der Aula und der Caterer ist derselbe, der die Feier für meine Tante gemacht hat, und ich musste ihn viermal anrufen.',
    n4: 'Ich wollte dich etwas fragen und ich habe diese Nachricht ungefähr neunmal angefangen.',
    n5: 'Ashley Crewes Mutter wohnt immer noch in der Brantwood Road. Dasselbe Haus. Ich gehe auf dem Weg zu meiner Mutter daran vorbei und ich gehe seit zwanzig Jahren daran vorbei.',
    n6: 'nia',
    n7: 'Wir waren zu viert an dieser Böschung und sie denkt, er war allein. Das denkt sie seit zwanzig Jahren. Ich habe ihr einen Brief geschrieben und er hat acht Seiten und ich schicke ihn vor dem Klassentreffen ab, denn wenn ich bis danach warte, tue ich es nicht mehr.',
    n8: 'Ich habe keinen Namen hineingeschrieben. Das will ich dir gegenüber klarstellen, weil ich es sonst niemandem gegenüber klargestellt habe. Da steht wir. Da steht die ganze Zeit wir.',
    n9: 'Sie sollte wissen, dass er im Dunkeln nicht allein war. Das ist die ganze Sache. Das ist der einzige Grund, warum ich es tue.',
    n10: 'Heute Morgen um zehn nach acht am Kasten vor dem Co-op eingeworfen und dann saß ich noch eine Weile im Auto. Einlass um sieben, falls du es dir anders überlegst. Ich fände es schön, wenn du kämst.',

    // ----------------------------------------------------------------- t-year
    g1: 'Alle zusammen. Ich sage das einmal und dann höre ich auf, diese Gruppe zu benutzen, weil sie nicht der Ort dafür ist.\n\nNia ist am Samstagabend gestorben. Die Polizei hat mit einigen von uns bereits gesprochen und sie wird mit weiteren sprechen. Bitte antwortet ihnen vollständig und bitte spekuliert hier nicht.',
    g2: 'sie hat mich am donnerstag angerufen, um zu fragen, ob die tische rund oder lang sein sollen. rund. ich habe rund gesagt. das ist das letzte gespräch, das ich in meinem leben mit ihr geführt habe',
    g3: 'Ich war nicht da. Das sage ich lieber deutlich, als dass die Leute es sich zusammenreimen. Ich hatte Dienst und ich habe es am Sonntagmorgen von meiner Schwester erfahren.',
    g4: 'die polizei hat mich gefragt, wann was passiert ist, und ich konnte ihnen kein einziges davon sagen. ich habe gesagt, nach der rede. ich habe es bei ungefähr vier verschiedenen dingen gesagt und es war die einzige antwort, die ich hatte',
    g5: 'Das haben alle gesagt, und es ist kein Versagen. Niemand schaut auf einer Feier auf die Uhr. Ich habe der Polizei den Ablaufplan gegeben und ihnen vorgeschlagen, damit zu arbeiten.',
    g6: 'mark da liegt eine tote frau an derselben böschung wie ashley und du redest über einen ablaufplan',
    g7: 'Ich rede über das einzige Dokument, das irgendjemand hat. Ich mache das hier nicht.',

    // --------------------------------------------------------------- t-marika
    k1: 'ich stand mit ihr da, von als das essen rauskam bis sie rausgegangen ist. die ganze zeit. wir haben das gemacht, wo man sagt, man holt was zu trinken, und sich dann eine stunde nicht bewegt',
    k2: 'worüber hat sie geredet',
    k3: 'ihre klasse. einen jungen darin, der nicht sitzen bleibt. sie war richtig glücklich und ich muss das den leuten immer wieder sagen, weil sie wollen, dass sie ängstlich war, und das war sie nicht',
    k4: 'ich war ab viertel vor neun bis nach halb zehn in der aula. das wird dir jeder bestätigen und keiner von ihnen wird dir sagen können, wann',
    k5: 'die rede',
    k6: 'im programm stand neun. er hat sie um viertel nach acht gehalten. ich weiß es, weil ich es ihm gesagt habe — der caterer war vierzig minuten hinterher und ich bin hin und habe ihn gesucht und gesagt, mach es jetzt, solange die leute noch stehen',
    k7: 'ich habe die rechnung auf dem handy. warme ausgabe 20:55. jeder in diesem raum, der dir also gesagt hat, etwas sei nach der rede passiert, hat dir gesagt, es sei nach viertel nach acht passiert, und glaubt, er hätte dir nach neun gesagt',
    k8: 'niemand hat ashley gestoßen. das musst du hören, bevor es dir jemand ausschmückt. er ist auf eine mutprobe hin von oben rein und wir standen alle da und haben seinen namen gerufen und keiner ist ihm nach und keiner hat zwanzig minuten lang angerufen. zwanzig minuten. das ist die sache. das ist das einzige, was es je gegeben hat',
    k9: 'und mark hat die geschichte an der böschung zusammengesetzt, bevor der krankenwagen da war. wir haben gesagt, wir hätten sofort angerufen. er hat die worte zuerst gesagt und wir drei haben sie ihm nachgesprochen und ich habe sie einem polizisten, einem gerichtsmediziner und meiner eigenen mutter gesagt',
    k10: 'er war siebzehn. ich auch. ich tue nicht so, als hätte ich nein gesagt',

    // ----------------------------------------------------------------- t-rafe
    r1: 'Ich bin seit sechs Jahren Schulleiter an der St Cuthbert’s. Ich erwähne es nur, damit du verstehst, warum ich vorsichtig bin, und nicht, weil ich denke, dass es mich zu irgendetwas berechtigt.',
    r2: 'Ich war von viertel vor neun bis halb zehn in dieser Aula. Einen guten Teil davon stand ich vor neunzig Leuten auf den Beinen. Ich glaube nicht, dass irgendjemand, der dabei war, eine bessere Antwort geben kann.',
    r3: 'wann war die rede',
    r4: 'Neun Uhr. Es steht im Programm, davon sind zweihundert gedruckt worden, und ich wäre erstaunt, wenn du nicht heute Nachmittag eines in irgendeiner Manteltasche finden könntest. Sie hat ungefähr zwanzig Minuten gedauert.',
    r5: 'Michelle war den größten Teil des Abends neben mir und ich war ein Stück weit neben Nia. Es war ein Raum mit neunzig Menschen, die sich seit ihrem siebzehnten Lebensjahr nicht gesehen hatten. Niemand war auch nur einen Moment allein.',
    r6: 'sie hat ashley crewes mutter geschrieben',
    r7: 'Sie hat mehreren Leuten gesagt, dass sie das vorhabe. Ich würde dich bitten, zu überlegen, wen dieser Brief sonst noch erschreckt hat, und ich würde bei Tobi Marchetti anfangen, der am Samstag in dieser Aula war und der zwei Jahre an einer Krisenhotline verbracht hat und genau weiß, wie man sich zu jemandem setzt und ihn zu etwas überredet.',
    r8: 'Mir ist bewusst, wie das klingt. Ich habe vier Tage darüber nachgedacht, ob ich es sagen soll, und bin zu dem Schluss gekommen, dass es schlimmer wäre, es zurückzuhalten.',
    r9: 'Was 2005 passiert ist, war ein Unfall, den vier Kinder mit angesehen haben. Es gibt keine Version davon, in der irgendjemand Ashley Crewe etwas angetan hat. Das habe ich jedem gesagt, der mich je gefragt hat, und ich sage es auch dir.',

    // ----------------------------------------------------------------- t-tobi
    t1: 'Jemand hat dir von der Krisenhotline erzählt. Ich höre es an der Frage, und ich beantworte sie lieber, als dich drumherum reden zu lassen.',
    t2: 'Zwei Jahre. Jeden zweiten Samstag, von sechs bis zwei, in der Zweigstelle Calderside, die einundvierzig Meilen von dieser Aula entfernt ist. Ich hatte an dem Abend Dienst. Neun von uns auf dem Plan und ein Supervisor.',
    t3: 'mark sagt du warst in der aula',
    t4: 'Ach ja. Ich habe Nia im März gesagt, dass ich nicht kommen kann, und sie hat das Datum einmal verschoben, um mich unterzubringen, und es ging nicht, und sie war sehr nett deswegen.',
    t5: 'Tausende Menschen machen das. Allein in dieser Region sind es vierhundert und in jedem Wartezimmer im Land hängt ein Plakat darüber. Es ist nichts Seltenes. Es sieht nur von dort selten aus, wo du stehst.',
    t6: 'warst du 2005 an der böschung',
    t7: 'Nein. Es waren vier von ihnen und ich war keiner davon, und ich habe zwanzig Jahre damit verbracht, derjenige zu sein, der nicht dabei war, was in einer Stadt dieser Größe eine eigene seltsame Sache ist.',
    t8: 'Nia hat mich im April angerufen. Sie hat fünfzig Minuten geredet und ich habe sehr wenig gesagt, was der größte Teil der Arbeit ist. Am Ende hat sie mich gefragt, ob es egoistisch sei, es seiner Mutter zu sagen, und ich habe gesagt, das könne ich für sie nicht beantworten.',
    t9: 'Geh zu Colin Vale. Er hat die Schlüssel zu diesem Gebäude seit 1989 und er hat am Samstag abgeschlossen, und er ist der einzige Mensch in dieser ganzen Sache, der nicht auf einer Feier war.',

    // ---------------------------------------------------------------- t-corin
    c1: 'Ich bin hier seit sechsunddreißig Jahren Hausmeister. Ich habe keinem von euch etwas beigebracht und ich kenne alle eure Namen.',
    c2: 'Ich richte mich nicht nach der Feier. Ich richte mich nach meinem Rundgang. Den Musiktrakt mache ich um neun und die Schranke am Lehrerparkplatz läuft über ein Protokoll.',
    c3: 'Herr Ellory stand im Gang des Musiktrakts, als ich zum Abschließen kam. Zwei oder drei Minuten nach neun. Ich musste dastehen und auf ihn warten und er hat mich beim ersten Mal nicht gehört.',
    c4: 'bist du dir bei der zeit sicher',
    c5: 'Ich bin mir bei meinem Rundgang sicher. Neun ist neun und das ist neun, seit Frau Hartley Schulleiterin war. Die Feier kann sein, wann sie will.',
    c6: 'Im Schrankenprotokoll steht sein Kennzeichen um 21:08 raus und um 21:19 wieder rein. Das ist ein Chip und der druckt. Ich habe das Blatt am Sonntag dem Beamten gegeben und ich habe ein Foto davon behalten.',
    c7: 'Frau Selkirk war die ganze Zeit in dieser Aula. Ich habe wegen der Brandschutztür zweimal den Kopf hineingesteckt und sie saß beide Male am selben Tisch, und sie hatte ihre Schuhe in der Hand.',
    c8: 'Frau Boateng ist gegen halb neun zu mir gekommen, um sich zu bedanken. Bei einer von diesen Feiern hat sich noch nie jemand bei mir bedankt. Sie hat nach meiner Frau mit Namen gefragt und meine Frau ist seit vier Jahren tot und das wusste sie auch.',
    c9: 'Ich habe gesehen, wie sie danach zum Fluss hinuntergegangen ist. Ich habe mir nichts dabei gedacht. Die gehen alle da runter. Dieser Zaun ist seit 1991 kaputt und ich habe ihn elfmal beantragt.',
    c10: 'Ich war 2005 auch hier. Ich habe dieses Gebäude um zwei Uhr nachts für die Polizei aufgeschlossen und ich habe vier Kindern im Lehrerzimmer je eine Tasse Tee gemacht und keines davon hat sie getrunken.',
  },

  /**
   * Four of these are `with_person` and every one of them is a dead end: the
   * engine cannot fire on co-presence, because being with one person does not
   * exclude being with another. They read plainly for that reason. The pair
   * that does fire is `rafe-evening`, and its two windows overlap only
   * partially — 20:55–21:15 against 21:00–21:20 — which is a third shape again.
   */
  claims: {
    'c-nia-hall': 'Nia: in der Aula, 19:00–20:40 (laut Michelle)',
    'c-marika-with-nia': 'Michelle: bei Nia, 20:45–21:30',
    'c-nia-with-marika': 'Nia: bei Michelle, 20:45–21:25',
    'c-marika-hall': 'Michelle: in der Aula, 20:45–21:40 (laut Herrn Vale)',
    'c-rafe-outside': 'Mark: draußen bei den Tonnen am Telefon, 20:55–21:15 (laut Michelle)',
    'c-rafe-hall': 'Mark: in der Aula, 20:45–21:30',
    'c-rafe-speech': 'Mark: hält die Rede, 21:00–21:20',
    'c-marika-with-rafe': 'Michelle: bei Mark, 20:50–21:20 (laut Mark)',
    'c-nia-with-rafe': 'Nia: bei Mark, 20:55–21:15 (laut Mark)',
    'c-tobi-hall': 'Tobi: in der Aula, 20:45–21:30 (laut Mark)',
    'c-tobi-branch': 'Tobi: in der Zweigstelle Calderside, 20:00–22:00',
    'c-rafe-music': 'Mark: im Musiktrakt, 20:58–21:06 (laut Herrn Vale)',
    'c-rafe-carpark': 'Mark: auf dem Lehrerparkplatz, 21:08–21:20 (Schrankenprotokoll)',
    'c-nia-riverpath': 'Nia: auf dem Flussweg, 21:00–21:30 (laut Herrn Vale)',
  },

  motives: {
    'm-riverbank':
      'Niemand hat Ashley Crewe angefasst. Vier von ihnen standen an dieser Böschung und niemand hat zwanzig Minuten lang angerufen, und Mark Ellory hat die Geschichte zusammengesetzt, bevor der Krankenwagen kam, und die anderen drei sie ihm nachsprechen lassen. Er ist seit sechs Jahren Schulleiter. Nia hat am Morgen des Klassentreffens einen achtseitigen Brief an Ashleys Mutter abgeschickt.',
  },

  contradictions: {
    'x-rafe-speech':
      'Im Programm steht neun Uhr, und davon sind zweihundert gedruckt worden. Er hat um viertel nach acht gesprochen, weil der Caterer vierzig Minuten hinterher war und Michelle ihn gesucht und ihm gesagt hat, er solle es tun, solange die Leute noch stehen. Auf der Rechnung auf ihrem Handy steht warme Ausgabe 20:55. Jeder Zeuge in dieser Aula, der etwas auf nach der Rede datiert hat, glaubt also, er habe dir nach neun gesagt, und hat dir nach viertel nach acht gesagt — und um neun, als er nach eigener Aussage vor neunzig Leuten auf den Beinen stand, war er draußen bei den Tonnen am Telefon.',
    'x-rafe-music':
      'Colin Vale richtet sich nicht nach der Feier. Er richtet sich nach seinem Rundgang, und der Musiktrakt wird um neun abgeschlossen, und das seit Frau Hartley Schulleiterin war. Mark Ellory stand zwei oder drei Minuten nach neun in diesem Gang, und Vale musste auf ihn warten und ihn zweimal ansprechen.',
    'x-rafe-gate':
      'Die Schranke am Lehrerparkplatz ist ein Chip und sie druckt. Sein Kennzeichen ist um 21:08 raus und um 21:19 wieder rein. Elf Minuten der Zeit, die er von der Fläche der Aula aus erklärt hat, war er nicht darin, und der Einzige im Gebäude, der nicht auf einer Feier war, ist der, der das Blatt aufgehoben hat.',
    'x-tobi-branch':
      'Mark Ellory hat Tobi Marchetti in diese Aula gestellt. Tobi war einundvierzig Meilen entfernt, von sechs bis zwei in der Zweigstelle Calderside, auf einem Plan mit neun Leuten und einem Supervisor, und Nia hatte das Datum des Klassentreffens einmal verschoben, um ihn unterzubringen, und es ging nicht. Allein in dieser Region machen vierhundert Menschen diesen Dienst. Es ist nichts Seltenes. Es sieht nur von dort selten aus, wo du stehst.',
  },

  confrontation: {
    opening:
      'Ich habe einunddreißig Jahre an Schulen in diesem Bezirk gegeben und ich möchte, dass du verstehst, was du hier auseinanderzunehmen vorhast.',
    beats: {
      'a-speech': {
        press:
          'Du hast den Ablaufplan geschrieben und dann deine eigene Rede fünfundvierzig Minuten vorgezogen. Jeder in diesem Raum datiert den Abend seit Samstag danach. Um neun warst du draußen bei den Tonnen.',
        rebuttal:
          'Der Caterer war hinterher. Michelle Selkirk hat mich gebeten, sie vorzuziehen, und ich habe sie vorgezogen, vor neunzig Leuten, was eine seltsame Art ist, etwas zu verbergen.',
      },
      'a-music': {
        press:
          'Colin Vale schließt den Musiktrakt um neun ab. Er hat dich drei Minuten nach neun in diesem Gang gefunden und musste dich zweimal ansprechen, bevor du ihn gehört hast.',
        rebuttal:
          'Er ist einundsechzig und ist mit einem Schlüsselbund im Dunkeln durch ein Gebäude gelaufen. Ich war den ganzen Abend in diesem Gang rein und raus. Er hat zwei Abende zusammengelegt.',
      },
      'a-gate': {
        press:
          'Die Schranke druckt. Dein Kennzeichen ist um 21:08 raus und um 21:19 wieder rein. Elf Minuten, innerhalb der fünfundvierzig, die du von der Fläche der Aula aus erklärt hast.',
      },
      'a-why': {
        press:
          'Niemand hat Ashley Crewe gestoßen. Vier von euch standen an dieser Böschung und niemand hat zwanzig Minuten lang angerufen, und du hast die Worte zusammengesetzt, bevor der Krankenwagen kam, und die anderen drei haben sie dir nachgesprochen.',
      },
    },
    deflections: [
      'Du warst in diesem Jahrgang nicht auf eine Art, die zählt. Du warst im Raum und du warst nicht im Jahrgang.',
      'Ein Hausmeister, eine Schranke und eine Frau, die den Leuten seit ihrem siebzehnten Lebensjahr erzählt, was ihrer Meinung nach an dieser Böschung passiert ist.',
      'Bring mir einen einzigen Menschen, der mich auf diesem Weg gesehen hat.',
    ],
    confession:
      'Ich bin runtergegangen, um sie zu bitten, ihn nicht abzuschicken.\n\nDas ist meine ganze Absicht und mir ist klar, dass sie jetzt nichts mehr wert ist. Sie hat mir gesagt, er sei an dem Morgen um zehn nach acht rausgegangen, vom Kasten vor dem Co-op, und ich habe ihr nicht geglaubt. Ich dachte, das sagt man so.\n\nAlso habe ich sie am Arm festgehalten. Damit sie dableibt. Mehr sollte es nicht sein, und ich habe diesen Satz seit Samstag ungefähr viertausendmal im Kopf gesagt und er wird jedes Mal kleiner.\n\nUnd sie ist oben über die Böschung gegangen.\n\nDreißig Meter von der Stelle, an der er reingegangen ist. Dieselben zwanzig Fuß. Ich möchte, dass das jemand ordentlich aufschreibt, weil es mir noch niemand laut gesagt hat und ich seit vier Tagen darauf warte, dass es jemand tut.\n\nIch stand da.\n\nIch will genau sein, weil ich zwanzig Jahre damit verbracht habe, genau zu sein, und es das Einzige ist, worin ich gut bin. Ich bin nicht gestürzt und ich bin nicht in Panik geraten und ich war nicht siebzehn. Ich war zweiundvierzig und hatte in vier Stunden zwei Gläser Wein getrunken und ich stand auf diesem Weg und habe gezählt, und nach ungefähr elf Minuten bin ich zum Lehrerparkplatz hochgegangen und habe mein Auto durch eine Schranke gefahren, die druckt.\n\nIch habe es zweimal getan. Zwanzig Jahre auseinander. Beim zweiten Mal wusste ich genau, was ich tat, und ich habe es trotzdem getan, und der einzige Unterschied zwischen dem Jungen an der Böschung und dem Mann auf dem Weg ist, dass der Mann schon herausgefunden hatte, dass er damit leben kann.\n\nSie hat wir gesagt. Sie hat es im Brief die ganze Zeit gesagt und sie hat es auf diesem Weg zu mir gesagt, und ich bin die acht Seiten, die ich nie gelesen habe, sorgfältiger durchgegangen als alles, was ich je gelesen habe.\n\nIch habe sie nie gefragt, was darin stand. Kein einziges Mal, in drei Wochen.\n\nDas habe ich ihnen beigebracht. An der Böschung, als wir siebzehn waren. Ich habe gesagt, wir reden nicht darüber, und keiner von uns hat es je getan, und ich habe eine Laufbahn darauf aufgebaut, ein Mann zu sein, zu dem man gehen kann, und ich konnte einer Frau, die ich kannte, seit ich vier war, keine einzige direkte Frage stellen.\n\nSie wollte mich nicht nennen.\n\nIch habe sie getötet, um einen Brief aufzuhalten, der seit zehn nach acht am Morgen in einem Briefkasten lag, und mein Name stand nicht darin, und er würde auch nie darin stehen.',
  },

  epilogue:
    'Der Brief kam am Dienstag mit der zweiten Post in der Brantwood Road an, vier Tage nachdem Nia Boateng gestorben war und zwei Tage bevor es in der Lokalzeitung stand.\n\nAcht Seiten. Da stand die ganze Zeit wir. Da stand, dass sie zu viert an der Böschung waren und dass Ashley im Dunkeln nicht allein war und dass sie seinen Namen gerufen hatten, bis sie einander nicht mehr hören konnten, und da stand, dass niemand hineingegangen war und dass niemand zwanzig Minuten lang angerufen hatte, und da stand, dass es Nia leidtat, auf eine Art, die nicht um Vergebung bat.\n\nSheila Crewe hat ihn einen Monat lang in der Schublade mit den Geschirrtüchern aufbewahrt, bevor sie ihn jemandem gegeben hat.\n\nMichelle Selkirk ist am Mittwochmorgen mit der Rechnung auf dem Handy und einer Aussage, die sie am Abend zuvor mit der Hand aufgeschrieben hatte, auf die Wache in Ardenshaw gegangen und hat damit eine Aussage von 2005 berichtigt, die sie mit siebzehn gemacht hatte. Der Gerichtsmediziner hat den Vorgang daraufhin wieder aufgenommen. Es hat nichts daran geändert, wie Ashley Crewe gestorben ist, und es hat die ganzen letzten zwanzig Minuten seines Lebens geändert, und darin hatte die Akte sich geirrt.\n\nTobi Marchetti hat am Samstag seinen Dienst gemacht. Er hat hinterher gesagt, er habe überlegt, nicht hinzugehen, und sei dann doch gegangen, weil neun auf einem Dienstplan neun auf einem Dienstplan sind.\n\nColin Vale hat den Zaun ein zwölftes Mal beantragt. Er stand im November.',
};
