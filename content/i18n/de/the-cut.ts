import type { CaseTranslation } from '../caseText';

/**
 * Case 9 — "Der Kanal". German. Third arc connection.
 *
 * Six things this had to get right, in this order.
 *
 * 1. The forty minutes. This case is arithmetic: a narrowboat does three miles
 *    an hour and a lock takes a quarter of an hour, so everybody on the water
 *    can prove where a boat was — and the boat is not what came down the
 *    towpath. The sentence that breaks it therefore reads identically in the
 *    three places a player meets it: Sam says it at b8, `x-nate-bike` proves it,
 *    and `c-bike` presses it. `Sechs Meilen flacher Treidelpfad sind vierzig
 *    Minuten mit dem Rad.` A player who has spent the whole case doing lock sums
 *    gets exactly one chance to notice that a different unit has arrived, and
 *    three slightly different phrasings would spend it.
 *
 *    The German declines around it — `sechs Meilen flachen Treidelpfad` in the
 *    accusative of the press line — so the pinned fragments are the two numbers
 *    themselves, `sechs Meilen` and `vierzig Minuten`, compared lowercased.
 *
 * 2. `the Keeper`, once, in the confession, English article intact. Third arc
 *    pack, and the new fact is that he rings back afterwards to ask how it went.
 *    Bare `der Keeper` is German for a goalkeeper; the article keeps it a name.
 *
 * 3. Digits are years, a bridge number and one key-log timestamp. 2009 is the
 *    call to social services, 2011 the bicycle on the roof, 39 the bridge Moss
 *    turns at, and 20:44 is the wharf gate — the only machine-written time in
 *    the pack and the only one in digits. Everything a person says is spoken:
 *    `halb neun`, `zwanzig vor zehn`, `zwanzig nach zwei`.
 *
 * 4. Names. Julie Cusk, Nate and Effie Ogilvy, Sam Ferreira, Alan Pryce, Tam
 *    Oyelaran, Moss, Norbury, Tyrley, Autherley, Nantwich, Chester and the Dawes
 *    all keep theirs. Places translated and bare so no fused preposition can eat
 *    them — `am Anleger Norbury` still contains `Anleger Norbury`:
 *
 *      cut      → Kanal              tyrley     → Tyrley
 *      norbury  → Norbury            tyrleylocks→ Schleusen von Tyrley
 *      norburywharf → Anleger Norbury  towpath  → Treidelpfad
 *      veritysboat  → Julies Boot      hospital → Royal Shrewsbury
 *      pub      → Junction
 *
 *    `Julies Boot` is named on its own chip rather than left as `ihr Boot`, the
 *    same way `Pams Haus` is in Sunday Service: a place whose name appears in no
 *    sentence is a chip the player cannot match to anything.
 *
 *    `Treidelpfad` is the real German word for a canal towpath, and it is one
 *    word everywhere — Sam walks it, the bicycle comes down it, and the chip
 *    says it. `Schleusenhelfer` for lock-wheeling: the English deliberately
 *    avoids `lock keeper` in this pack because an innocent man described as a
 *    keeper reads as an arc clue and never resolves, and German must not undo
 *    that by reaching for `Schleusenwärter`.
 *
 * 5. Voice. Four of the six write standard prose with full stops, so casing
 *    separates only the player, and the four are told apart by what each is
 *    expert in:
 *
 *      Julie  — the human history. Fifteen years, the letter, both things true
 *               at once. She is the only one who reflects.
 *      Alan   — canal officialdom. `Schleusen`, `Lizenz`, `Papierkram`, the
 *               trust, the key log. He testifies rather than talks.
 *      Sam    — routine and observation. The same walk, the same dog, the exact
 *               minute, and `ich bin dafür vom Weg heruntergetreten`.
 *      Tam    — arithmetic, out loud. `Sechs Meilen. Fünf Schleusen. Drei
 *               Stunden hin und drei zurück.` He is the one who does the sums
 *               the whole canal did and put away again.
 *      Nate   — capitals, and he stops closing his sentences the moment he is
 *               defending himself: k3 lands its full stop, k4, k6 and k7 do not.
 *               The punctuation frays exactly where he starts getting in front
 *               of it, which is the English-s own pattern and worth keeping.
 *      Du     — lowercase including nouns, short, and it lowercases names.
 *
 * 6. Tam types differently in the group than one to one. `k2` and `k8` are all
 *    lowercase in front of the moorings and every message in his own thread is
 *    properly written. That is not sloppiness in the English, it is a man being
 *    guarded in public and careful in private, and German keeps both registers.
 */
export const theCutDe: CaseTranslation = {
  title: 'Der Kanal',
  blurb:
    'Ein Narrowboat macht drei Meilen in der Stunde, und jeder am Kanal kann diese Rechnung aufstellen. Niemand ist auf die Idee gekommen zu fragen, ob er überhaupt das Boot genommen hat.',

  characters: {
    you: 'Du',
    verity: 'Julie',
    nate: 'Nate',
    bo: 'Sam',
    gwyn: 'Alan',
    tam: 'Tam',
  },

  places: {
    cut: 'Kanal',
    norbury: 'Norbury',
    norburywharf: 'Anleger Norbury',
    veritysboat: 'Julies Boot',
    pub: 'Junction',
    tyrley: 'Tyrley',
    tyrleylocks: 'Schleusen von Tyrley',
    towpath: 'Treidelpfad',
    hospital: 'Royal Shrewsbury',
  },

  threads: {
    't-verity': 'Julie',
    't-cut': 'Liegeplätze Norbury',
    't-tam': 'Tam',
    't-bo': 'Sam',
    't-gwyn': 'Alan Pryce',
  },

  briefing: {
    causeOfDeath: 'Ertrinken. Sie ist von ihrem eigenen Heck gefallen, und der Kanal ist dort vier Fuß tief.',
    ruling:
      'Als Unfall verzeichnet. Sie war vierundsechzig, es war dunkel, und auf dem Tisch hatte eine Flasche Wein gestanden.',
    opening:
      'Julie Cusk hat neunzehn Jahre an Bord gelebt und kannte jeden Dauerlieger zwischen Autherley und Nantwich am Boot, bevor sie den Namen kannte.\n\nGefunden wurde sie an einem Freitagabend im Oktober im Wasser neben ihrem eigenen Heck, der Ofen noch an und zwei Gläser auf dem Tisch.\n\nDu hast dein Boot vor vier Jahren aufgegeben und bist an Land gezogen, und sie hat dir trotzdem jede Woche darüber geschrieben.',
  },

  messages: {
    // --------------------------------------------------------------- t-verity
    v1: 'Es ist etwas passiert, und ich sitze seit vier Tagen darauf, weil ich nicht wusste, wem ich es zuerst sagen soll.',
    v2: 'Effie Ogilvy hat mir geschrieben. Nates Tochter. Sie ist vierundzwanzig und Kinderkrankenschwester in Chester und hat mich über die Facebook-Gruppe gefunden.',
    v3: 'oh',
    v4: 'Sie hat sich bei mir bedankt. Vier Seiten lang. Sie schreibt, der Tag, an dem ich das Jugendamt angerufen habe, war der Tag, an dem ihr Leben angefangen hat, und sie versucht seit ihrem achtzehnten Lebensjahr, das zu sagen.',
    v5: 'du hast geweint oder',
    v6: 'Ich habe wie eine Närrin im Regen auf dem Gangbord gesessen. Fünfzehn Jahre lang war ich die Frau, die Nate Ogilvy das angetan hat, und es stellt sich heraus, ich war die Frau, die das für Effie Ogilvy getan hat, und beides war die ganze Zeit wahr.',
    v7: 'Sie kommt am Samstag. Nach Norbury, an die Liegeplätze, vor allen. Sie will es dort sagen, wo die Leute, die zugesehen haben, sie es sagen hören können.',
    v8: 'weiß nate es',
    v9: 'Ich habe es ihm am Dienstag selbst gesagt. Ich lasse ihn das nicht von Sam an der Wasserstelle hören. Das war ich ihm schuldig, und sonst war ich ihm nie etwas schuldig.',
    v10: 'Er war sehr still. Er hat gut gesagt. Zweimal. Und dann hat er mich gefragt, um welche Uhrzeit am Samstag.',
    v11: 'Ofen an, Flasche auf, und bis Samstag gehe ich von diesem Boot nicht runter. Komm hoch, wenn du die Fahrt aushältst.',

    // ------------------------------------------------------------------ t-cut
    k1: 'Für alle, die es noch von niemandem gehört haben. Julie ist am Freitagabend von ihrem eigenen Heck gefallen, und Sam hat sie um elf gefunden. Die Polizei kam Samstagmorgen und nennt es einen Unfall.',
    k2: 'neunzehn jahre auf diesem kanal. sie hat mein boot im dunkeln im februar an brücke 39 aus dem schlick gezogen und wollte nicht mal ein bier dafür',
    k3: 'Ich war die ganze Woche in Tyrley und ich war den ganzen Freitagabend in Tyrley. Sechs Meilen und fünf Schleusen entfernt. Vierzig Boote haben meines ab Mittwoch an den Gastliegeplätzen über der obersten Schleuse liegen sehen.',
    k4: 'Nie bewegt. Keinen Zentimeter, von Mittwoch bis Sonntag. Jeder, der diesen Kanal kennt, kann die Rechnung dazu aufstellen',
    k5: 'Dich hat niemand gefragt, Nate.',
    k6: 'Werden sie noch. Fünfzehn Jahre lang hat dieser Kanal entschieden, was ich bin. Ich komme dem zuvor',
    k7: 'Und Tam war am Freitag oben in Norbury und hatte im Juni Streit mit ihr wegen der Vierzehn-Tage-Regel, den die halben Liegeplätze gehört haben',
    k8: 'ich war mit meiner mutter von acht bis zwei uhr nachts in der notaufnahme in shrewsbury und ich habe den entlassungsbrief und ich stelle ihn nicht in einen gruppenchat',
    k9: 'Redet mit Sam. Sam war den ganzen Abend mit dem Hund auf dem Treidelpfad, und Sam entgeht nichts, was ihr anderen wisst, denn deswegen legt ihr nicht neben Sam an.',

    // ------------------------------------------------------------------ t-tam
    m1: 'Ich hatte im Juni Streit mit ihr und ich denke seit Freitag jeden Tag daran. Es ging um die Vierzehn-Tage-Regel und es hat vier Minuten gedauert und sie hatte recht.',
    m2: 'Meine Mutter ist am Freitag zur Teezeit gestürzt. Krankenwagen um halb acht, Notaufnahme um acht, entlassen um zwanzig nach zwei. Ich saß sechs Stunden auf einem Plastikstuhl, mit vier Prozent Akku.',
    m3: 'nate hat dich nach norbury gestellt',
    m4: 'Hat er. Vor dem ganzen Kanal, vierzig Minuten nachdem Alan ihm gesagt hat, dass ihn niemand etwas gefragt hat.',
    m5: 'Und ich sage jetzt das, was ich immer nicht sage. Alle wissen, dass Nate sie gehasst hat. Das ist die bekannteste Tatsache auf diesem Kanal. Als es passiert ist, haben es also alle gedacht und dann haben alle die Rechnung aufgestellt und es wieder weggelegt.',
    m6: 'Sechs Meilen. Fünf Schleusen. Drei Stunden hin und drei zurück und vierzig Boote, die die ganze Zeit auf sein Dach geschaut haben. Dafür gibt es keine Version. Ich habe es zwanzigmal im Kopf durchgerechnet.',
    m7: 'Geh zu Sam. Sam läuft diesen Treidelpfad jeden Abend zur selben Zeit und macht das seit drei Jahren, und Sam merkt, was sich bewegt hat.',

    // ------------------------------------------------------------------- t-bo
    b1: 'Ich habe sie gefunden. Das sage ich einmal, und danach beantworte ich lieber Fragen, als es zu erzählen.',
    b2: 'Ich gehe jeden Abend von acht bis ungefähr zwanzig vor zehn mit Moss. Von Norbury runter bis Brücke 39 und zurück. Drei Jahre, derselbe Weg, weil er dreizehn ist und seine Route hat.',
    b3: 'hast du jemanden gesehen',
    b4: 'Nate Ogilvy. Halb neun, auf dem Weg auf der Gegenseite am Anleger Norbury vorbei, in der orangen Jacke. Ich habe alles klar, Nate gesagt, und er hat nicht geantwortet, und ich habe mir nichts dabei gedacht, weil er nie antwortet.',
    b5: 'sein boot war in tyrley',
    b6: 'War es. Ich habe das jetzt drei Leuten gesagt, und jeder Einzelne von ihnen hat mir die Schleusen erklärt, als hätte ich nicht sechs Jahre auf diesem Wasser gelebt.',
    b7: 'Er war auf einem Rad. Das Dawes mit dem Rennlenker, das auf seinem Dach festgezurrt ist, seit ich hier bin. Das ist nichts, was ich vermute, ich bin dafür vom Weg heruntergetreten.',
    b8: 'Sechs Meilen flacher Treidelpfad sind vierzig Minuten mit dem Rad. Alle haben immer nur das Boot gesagt, das Boot, das Boot, und das Boot ist nirgendwo hingefahren und die Frage auch nicht.',
    b9: 'Frag Alan nach dem Schlüssel. Die Sanitärstation braucht einen CRT-Schlüssel, und die neueren protokollieren. Alan liegt dem Trust seit einem Jahr wegen dieser Daten in den Ohren, wegen des Vandalismus.',

    // ----------------------------------------------------------------- t-gwyn
    g1: 'Elf Jahre Schleusenhelfer in Tyrley und ich wollte kein einziges Mal den Papierkram, bis auf diese Woche.',
    g2: 'Sein Boot ist nicht gefahren. Das stimmt, und ich sage es auch vor Gericht. Ich habe in dieser Woche einundvierzig Boote durchgeschleust und seines war nicht dabei, und ich hätte sein Dach auf eine halbe Meile erkannt.',
    g3: 'Und genau das war die ganze Zeit falsch daran. Jeder von uns hat eine Frage über das Boot beantwortet. Niemand hat eine Frage über den Mann gestellt.',
    g4: 'das schlüsselprotokoll',
    g5: 'Die Fäkalienentsorgung und die Wasserstelle am Anleger Norbury sind im Frühjahr auf die protokollierenden Schlösser umgestellt worden, weil wir ein Jahr lang jemanden hatten, der die Hähne laufen ließ. Ich frage den Trust seit März wegen der Hähne nach diesen Daten.',
    g6: 'Sie haben sie am Dienstag geschickt. Nate Ogilvys Schlüssel hat am Freitag um 20:44 das Tor am Anleger geöffnet. Sein Schlüssel. Auf seine Lizenz registriert, auf einem Boot, das sechs Meilen entfernt lag und sich seit Mittwoch nicht bewegt hatte.',
    g7: 'Julie war von sechs bis sieben mit Sam und mir im Junction und hat ein Glas getrunken und war fröhlicher, als ich sie seit fünfzehn Jahren gesehen habe.',
    g8: 'Sie hat der ganzen Stube von dem Brief erzählt. Hat einen Teil davon vorgelesen. Effie sollte am Samstag um zwei kommen, und Julie hatte einen Kuchen vom Hofladen gekauft und ihn auf die Anrichte gestellt.',
    g9: 'Der Kuchen stand noch da, als sie sie aus dem Wasser geholt haben. Darüber komme ich nicht hinweg, und ich bin dreiundsechzig und über Schlimmeres bin ich hinweggekommen.',
  },

  /**
   * `c-nate-moored` carries no clock at all, because what it asserts is a state
   * across the whole evening rather than a moment. It and `c-nate-bike` are the
   * exclusive group: their windows overlap — 20:20–21:00 sits inside
   * 19:00–22:00 — which is what lets the engine see the collision.
   */
  claims: {
    'c-verity-boat': 'Julie: auf Julies Boot, 20:00–21:30',
    'c-nate-tyrley': 'Nate: in Tyrley, 19:00–22:00',
    'c-nate-moored': 'Nate: den ganzen Abend in Tyrley festgemacht',
    'c-tam-norbury': 'Tam: in Norbury, 20:30–21:00 (laut Nate)',
    'c-tam-hospital': 'Tam: im Royal Shrewsbury, 20:00–22:00',
    'c-bo-towpath': 'Sam: auf dem Treidelpfad, 20:00–21:40',
    'c-nate-norbury': 'Nate: in Norbury, 20:30–20:50 (laut Sam)',
    'c-nate-bike': 'Nate: mit dem Rad auf dem Treidelpfad, 20:20–21:00 (laut Sam)',
    'c-gwyn-locks': 'Alan: an den Schleusen von Tyrley, 19:00–20:30',
    'c-nate-wharf': 'Nate: am Anleger Norbury, 20:44–20:50 (Schlüsselprotokoll)',
    'c-verity-pub': 'Julie: im Junction, 18:00–19:00 (laut Alan)',
  },

  motives: {
    'm-effie':
      'Julie hat ihn 2009 beim Jugendamt gemeldet, und seine Tochter kam zu ihrer Tante. Effie ist jetzt vierundzwanzig, Krankenschwester in Chester, und sie wollte am Samstag nach Norbury kommen, um Julie laut zu danken, vor den Liegeplätzen, die zugesehen haben.',
  },

  contradictions: {
    'x-nate-norbury':
      'Er hat sich den ganzen Abend sechs Meilen und fünf Schleusen entfernt verortet, und vierzig Boote bestätigen, wo sein Dach lag. Um halb neun hat Sam Ferreira ihm auf dem Weg auf der Gegenseite in Norbury alles klar, Nate gesagt, in der orangen Jacke, und keine Antwort bekommen, und hat sich nichts dabei gedacht, weil er nie antwortet.',
    'x-nate-bike':
      'Sechs Meilen flacher Treidelpfad sind vierzig Minuten mit dem Rad. Alle auf diesem Kanal haben eine Frage über das Boot beantwortet, und das Boot ist nicht das, was den Treidelpfad heruntergekommen ist. Das Dawes mit dem Rennlenker ist seit 2011 auf seinem Dach festgezurrt.',
    'x-nate-wharf':
      'Das Tor am Anleger Norbury ist im Frühjahr auf ein protokollierendes Schloss umgestellt worden, weil jemand ein Jahr lang die Hähne hatte laufen lassen. Sein Schlüssel hat es um 20:44 geöffnet, auf seine Lizenz registriert, auf einem Boot, das sich seit Mittwoch nicht bewegt hatte.',
    'x-tam-hospital':
      'Er hat Tam Oyelaran nach Norbury gestellt, vierzig Minuten nachdem man ihm gesagt hatte, dass ihn niemand etwas gefragt hat. Tam saß von acht bis zwanzig nach zwei mit seiner Mutter auf einem Plastikstuhl im Royal Shrewsbury, mit vier Prozent Akku.',
  },

  confrontation: {
    opening:
      'Fünfzehn Jahre lang hat dieser Kanal mich so angesehen, und ich habe angelegt, wo man es mir gesagt hat, und meine Lizenz bezahlt und nichts gesagt. Also los. Sag es richtig.',
    beats: {
      'c-norbury': {
        press:
          'Du warst die ganze Nacht in Tyrley. Sam hat dir um halb neun auf dem Weg auf der Gegenseite in Norbury alles klar, Nate gesagt, und du hast nicht geantwortet.',
        rebuttal:
          'Sam ist seit sechs Jahren hier und hält sich deswegen für einen von hier. Es war dunkel, und es gibt genau eine orange Jacke auf diesem Kanal, ja.',
      },
      'c-bike': {
        press:
          'Dein Boot ist nie gefahren, und das stimmt. Du bist sechs Meilen flachen Treidelpfad heruntergekommen, auf dem Dawes von deinem Dach. Vierzig Minuten.',
        rebuttal:
          'Jetzt bin ich also auf einem Fahrrad. Im Dunkeln. Sechs Meilen. Du hast die Antwort schon festgelegt und rechnest von da rückwärts.',
      },
      'c-wharf': {
        press:
          'Das Tor am Anleger protokolliert jetzt. Seit dem Frühjahr, wegen der Hähne. Dein Schlüssel hat es um 20:44 geöffnet, und dein Boot lag sechs Meilen weiter oben am Kanal.',
      },
      'c-why': {
        press:
          'Effie sollte am Samstag um zwei kommen. Um Julie danke zu sagen, laut, an diesen Liegeplätzen, vor allen, die zugesehen haben.',
      },
    },
    deflections: [
      'Das ist dieser Kanal, der da redet. Über mich redet er seit 2009.',
      'Du hast dein Boot aufgegeben. Du kannst nicht zurückkommen und mir erzählen, was darauf passiert ist.',
      'Bring mir etwas, auf dem mein Name steht.',
    ],
    confession:
      'Fünfzehn Jahre lang hätte ich es ausgehalten, dass sie mich für einen schlechten Vater halten. Darin war ich gut geworden. Man steht auf und macht seine Schleusen und nickt Leuten zu, die nicht zurücknicken, und nach einer Weile ist es einfach Wetter.\n\nWas ich nicht aushalten konnte, war der Samstag.\n\nMeine Tochter, vierundzwanzig, Krankenschwester, steht an diesen Liegeplätzen vor Alan und Sam und allen anderen und sagt laut, das Beste, was ihr je passiert ist, war, dass man sie mir weggenommen hat. Und jeder Einzelne von ihnen nickt. Und ich sechs Meilen weiter oben auf einem Boot mit zugezogenen Vorhängen, und alle wissen genau, wo ich bin und warum.\n\nSie stand auf dem Heck, als ich hinten herumkam. Sie hat sich gefreut, mich zu sehen. Das ist der Teil. Sie hat gesagt, Nate, komm rein, und sie hatte zwei Gläser hingestellt, weil sie den ganzen Abend jemanden erwartet hatte, und ich war das nicht.\n\nUnd es gibt noch eine Sache.\n\nEin Mann, der sich the Keeper nannte, hat mich am Mittwoch angerufen. Sagte, er sei vom Familiengerichtsdienst und mache eine Aktenprüfung. Er wusste von 2009. Er wusste, dass Effie Krankenschwester in Chester ist, und er wusste vom Samstag, was ich niemandem erzählt hatte, denn wem sollte ich es erzählen.\n\nEr hat mich gefragt, wie ich mich dabei fühle, und ich habe lange geredet und er hat sehr wenig gesagt.\n\nUnd am Sonntag hat er wieder angerufen. Nur um zu fragen, wie es gelaufen ist.\n\nDas hat er gesagt. Wie ist es gelaufen, Nate. Wie einer, der sich nach einem Vorstellungsgespräch erkundigt.',
  },

  coda: {
    from: 'Unbekannte Nummer',
    messages: [
      'Norbury. Du hast das in fünf Tagen geschafft, und einer davon ging für den falschen Mann drauf, was ich fair nennen würde.',
      'Das Fahrrad war gut. Alle auf diesem Kanal denken in Meilen und Schleusen, und das hat sie vorher nie im Stich gelassen, also ist keiner von ihnen auf die Idee gekommen aufzuhören.',
      'Du hast jetzt vier davon, falls du mitzählst. Ich zähle mit.',
      'Und ja. Ich habe ihn danach angerufen. Das mache ich immer. Du solltest dich fragen, warum mir das das Risiko wert ist, denn es ist das Einzige, was ich unvorsichtig tue.',
    ],
  },

  epilogue:
    'Der Canal and River Trust hat elf Monate Schlüsseldaten in einer einzigen Tabelle geliefert und sich für die Verzögerung entschuldigt.\n\nEffie Ogilvy ist am Samstag nach Norbury gekommen, weil niemand ihre Nummer hatte, um sie aufzuhalten. Alan Pryce hat sie oben am Weg abgefangen und es ihr auf dem Parkplatz gesagt, und dann vier Stunden mit ihr im Junction gesessen.\n\nBei der Beerdigung hat sie den Brief vorgelesen. Alle vier Seiten. Sie hat hinterher gesagt, sie habe ihn geschrieben, damit er Julie vorgelesen wird, und ihr falle kein Grund ein, jetzt ein Wort daran zu ändern.\n\nSam Ferreira geht immer noch von acht bis zwanzig vor zehn mit Moss. Die Route führt an Julies altem Liegeplatz vorbei, und Sam hat sie nicht geändert, weil Moss dreizehn ist und seine Route hat.',
};
