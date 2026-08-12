/**
 * Case 2 — "The Understudy". Paid.
 *
 * Pack 2 of the campaign, and deliberately **standalone**: no Listener, no arc
 * clue, no coda. Per docs/arc-design.md the silence is load-bearing — if every
 * pack connects, players stop reading cases and start scanning for the arc.
 *
 * Built to use the axes Case 1 does not:
 *  - `has_object` on a unique key, which is the locked room
 *  - thread discovery: Nell only becomes reachable once somebody names her
 *  - a red herring whose innocence is provable with the same tools
 *
 * A different shape of lie from The Lighthouse on purpose. There the victim was
 * about to speak and the killer was protecting someone. Here the victim was the
 * one doing the harm, and the killer had been paying for it for two years.
 *
 * Times are minutes since the case epoch (day 1, 00:00). Curtain up 19:00 =
 * 1140. Diane dies in the interval, between 20:10 and 20:40.
 */
export const theUnderstudyRaw = {
  id: 'the-understudy',
  title: 'The Understudy',
  blurb:
    'A lead actress dies in a locked dressing room on press night. One key exists, and two people say they had it.',
  // Free. Packs 1–3 are the free tier, so the free content ends on Pack 3's
  // first arc connection rather than on a full stop.
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'coral', name: 'Diane', avatarColor: '#8A7B5C' },
    { id: 'bea', name: 'Beatrice', avatarColor: '#C4483C' },
    { id: 'dev', name: 'Dev', avatarColor: '#4E8CF0' },
    { id: 'nell', name: 'Nell', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'theatre', name: 'the Alhambra' },
    { id: 'stage', name: 'the stage', parentId: 'theatre' },
    { id: 'auditorium', name: 'the auditorium', parentId: 'theatre' },
    { id: 'corridor', name: 'the dressing room corridor', parentId: 'theatre' },
    { id: 'dressing1', name: 'Diane’s dressing room', parentId: 'corridor' },
    { id: 'stagedoor', name: 'the stage door', parentId: 'theatre' },
    { id: 'station', name: 'the railway station' },
  ],
  objects: [
    {
      id: 'key1',
      name: 'the dressing room key',
      // The whole case. The spare went missing in Sheffield and was never cut
      // again, so two people holding it at once is impossible.
      unique: true,
    },
  ],

  briefing: {
    victimId: 'coral',
    foundAt: { placeId: 'dressing1', minutes: 1240 },
    causeOfDeath: 'An overdose of her own prescription.',
    ruling: 'Recorded as self-administered. The door was locked from the inside.',
    opening:
      'Diane Vane had been carrying the tour since Sheffield, and everybody said so, usually while she was in the room.\n\nOn press night she came off at the interval, went to her dressing room, and did not come back. The door was locked. The company went on without her, and the understudy got the notice she had been waiting eleven months for.',
    recoveredObjectIds: ['key1'],
  },

  threads: [
    // ------------------------------------------------------------- t-coral
    {
      id: 't-coral',
      title: 'Diane',
      participantIds: ['you', 'coral'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'cl1',
          threadId: 't-coral',
          senderId: 'coral',
          sentAt: 1100,
          body: 'press night. seventeen of them in tonight and two that matter',
        },
        {
          id: 'cl2',
          threadId: 't-coral',
          senderId: 'you',
          sentAt: 1104,
          body: 'you have done this a hundred times',
        },
        {
          id: 'cl3',
          threadId: 't-coral',
          senderId: 'coral',
          sentAt: 1108,
          body: 'not with Bea in the building. she has been in the auditorium every night this week with a notebook and she does not write anything in it',
        },
        {
          id: 'cl4',
          threadId: 't-coral',
          senderId: 'coral',
          sentAt: 1112,
          body: 'she wants me to stop asking. I am not going to stop asking',
        },
        {
          id: 'cl5',
          threadId: 't-coral',
          senderId: 'you',
          sentAt: 1116,
          body: 'diane how much have you taken off her',
        },
        {
          id: 'cl6',
          threadId: 't-coral',
          senderId: 'coral',
          sentAt: 1124,
          body: 'do not say it like that. she was the one driving. two of us knew and one of us has spent eleven years pretending she did not',
        },
        {
          id: 'cl7',
          threadId: 't-coral',
          senderId: 'coral',
          sentAt: 1126,
          body: 'eleven grand this year. she offered it, I did not ask. and she can afford it and Joel Petrie cannot walk',
        },
        {
          id: 'cl8',
          threadId: 't-coral',
          senderId: 'you',
          sentAt: 1130,
          body: 'that is still a thing you are doing to her',
        },
        {
          id: 'cl9',
          threadId: 't-coral',
          senderId: 'coral',
          sentAt: 1136,
          body: 'I know what it is. after tonight I am done with it either way. beginners. talk after',
          claims: [
            {
              id: 'c-coral-stage',
              subject: 'coral',
              assertedBy: 'coral',
              predicate: { kind: 'at_place', placeId: 'stage' },
              window: { start: 1140, end: 1205 },
              sourceMessageId: 'cl9',
              label: 'Diane: on stage, 19:00–20:05',
            },
          ],
        },
        {
          id: 'cl10',
          threadId: 't-coral',
          senderId: 'you',
          sentAt: 1400,
          body: 'diane',
        },
      ],
    },

    // ------------------------------------------------------------ t-company
    {
      id: 't-company',
      title: 'Alhambra company',
      participantIds: ['you', 'bea', 'dev', 'nell'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'q1',
          threadId: 't-company',
          senderId: 'bea',
          sentAt: 1985,
          body: 'Company. Diane died last night in her dressing room. The police have been and gone and they are satisfied it was her own medication.',
        },
        {
          id: 'q2',
          threadId: 't-company',
          senderId: 'bea',
          sentAt: 1987,
          body: 'We play tonight. She would have insisted and I am not going to pretend otherwise. Nell goes on.',
        },
        {
          id: 'q3',
          threadId: 't-company',
          senderId: 'nell',
          sentAt: 1994,
          body: 'I do not want it like this',
        },
        {
          id: 'q4',
          threadId: 't-company',
          senderId: 'bea',
          sentAt: 1997,
          body: 'Nobody wants it like this. You are on at seven thirty.',
        },
        {
          id: 'q5',
          threadId: 't-company',
          senderId: 'dev',
          sentAt: 2006,
          body: 'the door was locked. I want to say that out loud because nobody in that room said it out loud',
        },
        {
          id: 'q6',
          threadId: 't-company',
          senderId: 'dev',
          sentAt: 2008,
          body: 'there is one key. one. the spare went in Sheffield and we never had another cut because it was forty quid and Bea said no',
          claims: [
            {
              id: 'c-key-dev',
              subject: 'dev',
              assertedBy: 'dev',
              predicate: { kind: 'has_object', objectId: 'key1' },
              window: { start: 1190, end: 1240 },
              sourceMessageId: 'q6',
              label: 'Dev: had the dressing room key, 19:50–20:40',
            },
          ],
        },
        {
          id: 'q7',
          threadId: 't-company',
          senderId: 'dev',
          sentAt: 2009,
          body: 'and it was on my belt the whole of the interval, in the prompt corner, where it lives',
        },
        {
          id: 'q8',
          threadId: 't-company',
          senderId: 'bea',
          sentAt: 2015,
          body: 'Dev. Not here.',
        },
        {
          id: 'q9',
          threadId: 't-company',
          senderId: 'bea',
          sentAt: 2018,
          body: 'And you were not in the building for all of it, so please be careful how certain you sound.',
          claims: [
            {
              id: 'c-dev-station',
              subject: 'dev',
              assertedBy: 'bea',
              predicate: { kind: 'at_place', placeId: 'station' },
              window: { start: 1205, end: 1235 },
              sourceMessageId: 'q9',
              label: 'Dev: at the station, 20:05–20:35 (per Beatrice)',
            },
          ],
        },
        {
          id: 'q10',
          threadId: 't-company',
          senderId: 'nell',
          sentAt: 2024,
          body: 'that is not fair and you know it is not',
        },
        {
          id: 'q11',
          threadId: 't-company',
          senderId: 'you',
          sentAt: 2030,
          body: 'she texted me at seven. she said after tonight she was done with it either way',
        },
        {
          id: 'q12',
          threadId: 't-company',
          senderId: 'bea',
          sentAt: 2036,
          body: 'She said a great many things to a great many people. That was rather the difficulty with her.',
        },
        {
          id: 'q13',
          threadId: 't-company',
          senderId: 'nell',
          sentAt: 2042,
          body: 'she was kind to me. she was the only one who was',
        },
        {
          id: 'q14',
          threadId: 't-company',
          senderId: 'dev',
          sentAt: 2050,
          body: 'ask Nell where she was stood at ten past. she saw more than she has said in here',
        },
      ],
    },

    // ---------------------------------------------------------------- t-dev
    {
      id: 't-dev',
      title: 'Dev',
      participantIds: ['you', 'dev'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'd1',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2100,
          body: 'sorry about in there. twenty two years I have called shows and I have never lost anybody in an interval',
        },
        {
          id: 'd2',
          threadId: 't-dev',
          senderId: 'you',
          sentAt: 2106,
          body: 'she said you were not in the building',
        },
        {
          id: 'd3',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2114,
          body: 'I was going to be. our set dresser was coming in on the 20:12 and I said I would walk down and get her, it is four minutes',
        },
        {
          id: 'd4',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2116,
          body: 'the 20:12 was forty minutes down. it came in at 20:51. I never left the stage door, I stood in it and smoked and watched the board on my phone',
          claims: [
            {
              id: 'c-dev-stagedoor',
              subject: 'dev',
              assertedBy: 'dev',
              predicate: { kind: 'at_place', placeId: 'stagedoor' },
              window: { start: 1190, end: 1240 },
              sourceMessageId: 'd4',
              label: 'Dev: at the stage door, 19:50–20:40',
            },
          ],
        },
        {
          id: 'd5',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2122,
          body: 'Nell came past me twice. she will tell you. she was in the corridor at five past waiting to be told she was not needed, like every night',
        },
        {
          id: 'd6',
          threadId: 't-dev',
          senderId: 'you',
          sentAt: 2128,
          body: 'and Beatrice',
        },
        {
          id: 'd7',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2135,
          body: 'Bea came down the corridor about twelve minutes past and went back up about twenty past. I saw her from the door. I did not think anything of it, she goes where she likes',
          claims: [
            {
              id: 'c-bea-corridor',
              subject: 'bea',
              assertedBy: 'dev',
              predicate: { kind: 'at_place', placeId: 'corridor' },
              window: { start: 1212, end: 1222 },
              sourceMessageId: 'd7',
              label: 'Beatrice: in the corridor, 20:12–20:22 (per Dev)',
            },
          ],
        },
        {
          id: 'd8',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2140,
          body: 'Diane went down at ten past and that was the last of her. I called the second half and she did not come and I thought she was being Diane about the notices',
          claims: [
            {
              id: 'c-coral-dressing',
              subject: 'coral',
              assertedBy: 'dev',
              predicate: { kind: 'at_place', placeId: 'dressing1' },
              window: { start: 1210, end: 1240 },
              sourceMessageId: 'd8',
              label: 'Diane: in her dressing room, 20:10–20:40',
            },
          ],
        },
        {
          id: 'd9',
          threadId: 't-dev',
          senderId: 'dev',
          sentAt: 2148,
          body: 'I have thought about it all night. if I had gone down at twenty past instead of standing there like a post',
        },
      ],
    },

    // ------------------------------------------------- t-nell (discovery)
    {
      id: 't-nell',
      title: 'Nell',
      participantIds: ['you', 'nell'],
      // Dev names her twice before she is reachable. Discovery, not escalation:
      // you can only talk to her once somebody has pointed you at her.
      requiresContradictionIds: [],
      requiresReadMessageIds: ['q14', 'd5'],
      messages: [
        {
          id: 'e1',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2200,
          body: 'Dev said you would want to talk to me. everyone thinks it is me. I would think it was me',
        },
        {
          id: 'e2',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2202,
          body: 'eleven months of getting into the frock and taking it off again. you can say it. it is what it looks like',
        },
        {
          id: 'e3',
          threadId: 't-nell',
          senderId: 'you',
          sentAt: 2208,
          body: 'where were you in the interval',
        },
        {
          id: 'e4',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2214,
          body: 'corridor, five past to twelve past, stood outside wardrobe waiting for Dev to tell me I was not on. then up to the wings for the second half because I watch it from there',
          claims: [
            {
              id: 'c-nell-corridor',
              subject: 'nell',
              assertedBy: 'nell',
              predicate: { kind: 'at_place', placeId: 'corridor' },
              window: { start: 1205, end: 1212 },
              sourceMessageId: 'e4',
              label: 'Nell: in the corridor, 20:05–20:12',
            },
          ],
        },
        {
          id: 'e5',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2216,
          body: 'and then I was on stage from twenty to nine in front of four hundred people, which is the only alibi anybody in this company will ever have',
          claims: [
            {
              id: 'c-nell-stage',
              subject: 'nell',
              assertedBy: 'nell',
              predicate: { kind: 'at_place', placeId: 'stage' },
              window: { start: 1240, end: 1320 },
              sourceMessageId: 'e5',
              label: 'Nell: on stage, 20:40–22:00',
            },
          ],
        },
        {
          id: 'e6',
          threadId: 't-nell',
          senderId: 'you',
          sentAt: 2222,
          body: 'Dev says you saw more than you said',
        },
        {
          id: 'e7',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2231,
          body: 'Bea came past me at about ten past. she had the key in her hand. I know the key, it has the red tag on it that Dev put on so it stops going missing',
          claims: [
            {
              id: 'c-key-bea',
              subject: 'bea',
              assertedBy: 'nell',
              predicate: { kind: 'has_object', objectId: 'key1' },
              window: { start: 1210, end: 1220 },
              sourceMessageId: 'e7',
              label: 'Beatrice: had the dressing room key, 20:10–20:20 (per Nell)',
            },
          ],
        },
        {
          id: 'e8',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2234,
          body: 'I did not say it in the group because she gives me my job. she gives me every job I will ever have in this town',
        },
        {
          id: 'e8b',
          threadId: 't-nell',
          senderId: 'you',
          sentAt: 2236,
          body: 'she says she was giving notes in the interval',
        },
        {
          id: 'e8c',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2238,
          body: 'nobody got a note. ask any of them. I go up the back of the circle to get to the wings because they lock the pass door at the interval, and she was stood at the top of the aisle on her phone with her back to the house the whole time I was going past',
          claims: [
            {
              id: 'c-bea-call',
              subject: 'bea',
              assertedBy: 'nell',
              predicate: {
                kind: 'doing',
                actionId: 'alone_on_the_telephone',
                exclusiveGroup: 'bea-interval',
              },
              window: { start: 1210, end: 1220 },
              sourceMessageId: 'e8c',
              label: 'Beatrice: alone on the phone, 20:10–20:20 (per Nell)',
            },
          ],
        },
        {
          id: 'e9',
          threadId: 't-nell',
          senderId: 'you',
          sentAt: 2240,
          body: 'you are saying it now',
        },
        {
          id: 'e10',
          threadId: 't-nell',
          senderId: 'nell',
          sentAt: 2247,
          body: 'because I went on in her frock last night and it fit, and I have been sick about it since. she was kind to me and she was horrible to Bea and both of those were true at once',
        },
      ],
    },

    // ------------------------------------------------------ t-bea (gated)
    {
      id: 't-bea',
      title: 'Beatrice Kyd',
      participantIds: ['you', 'bea'],
      requiresContradictionIds: ['x-key', 'x-bea-corridor'],
      messages: [
        {
          id: 'b1',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2400,
          body: 'You have been busy. Two of my company have stopped meeting my eye and I do not think that is a coincidence.',
        },
        {
          id: 'b2',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2404,
          body: 'I was in the auditorium from five past until the second half went up. I sit in J14 every night of every run and forty people can tell you the shape of the back of my head.',
          claims: [
            {
              id: 'c-bea-auditorium',
              subject: 'bea',
              assertedBy: 'bea',
              predicate: { kind: 'at_place', placeId: 'auditorium' },
              window: { start: 1205, end: 1245 },
              sourceMessageId: 'b2',
              label: 'Beatrice: in the auditorium, 20:05–20:45',
            },
          ],
        },
        {
          id: 'b3',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2408,
          body: 'And I was working. I give interval notes on a press night, always, it is the only twenty minutes anybody listens.',
          claims: [
            {
              id: 'c-bea-notes',
              subject: 'bea',
              assertedBy: 'bea',
              predicate: {
                kind: 'doing',
                actionId: 'giving_interval_notes',
                exclusiveGroup: 'bea-interval',
              },
              window: { start: 1205, end: 1225 },
              sourceMessageId: 'b3',
              label: 'Beatrice: giving interval notes, 20:05–20:25',
            },
          ],
        },
        {
          id: 'b4',
          threadId: 't-bea',
          senderId: 'you',
          sentAt: 2414,
          body: 'she was taking money off you',
        },
        {
          id: 'b5',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2426,
          body: 'She was. Eleven thousand this year and nineteen the year before that, and I paid all of it, and I would have gone on paying it, because the alternative was Joel Petrie reading about me in a newspaper.',
        },
        {
          id: 'b6',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2429,
          body: 'I was driving. That is the whole of it. Eleven years ago on a wet road outside Sheffield with a company van and two people in it, and one of them has not stood up since.',
        },
        {
          id: 'b7',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2433,
          body: 'I have never once said it was not me. I said it was the road. Diane was in the passenger seat and she knew it was not the road.',
        },
        {
          id: 'b8',
          threadId: 't-bea',
          senderId: 'you',
          sentAt: 2440,
          body: 'and she said last week she was done with it either way',
        },
        {
          id: 'b9',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2451,
          body: 'Yes. Done meaning she was going to say it, on a press night, with seventeen of them in. Done is not the word you use when you are letting somebody off.',
        },
        {
          id: 'b10',
          threadId: 't-bea',
          senderId: 'bea',
          sentAt: 2458,
          body: 'None of which puts me in that corridor. Be careful what you think you have.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-sheffield',
      characterId: 'bea',
      summary:
        'Diane had been taking money from her for two years over the Sheffield crash, and had decided to say it out loud on press night.',
      establishedByMessageIds: ['cl7', 'b6'],
    },
  ],

  contradictions: [
    {
      id: 'x-key',
      claimIdA: 'c-key-dev',
      claimIdB: 'c-key-bea',
      revelation:
        'There is one key and there has been one key since Sheffield. Dev says it was on his belt in the prompt corner; Nell watched Beatrice carry it down the corridor by the red tag. Both cannot be true, and only one of them locks a door from the outside and leaves it looking locked from the inside.',
    },
    {
      id: 'x-bea-corridor',
      claimIdA: 'c-bea-auditorium',
      claimIdB: 'c-bea-corridor',
      revelation:
        'She put herself in J14 for the whole interval, where forty people know the back of her head. Dev watched her come down the dressing room corridor at twelve minutes past and go back up at twenty past, from a stage door he never left.',
    },
    {
      id: 'x-bea-notes',
      claimIdA: 'c-bea-notes',
      claimIdB: 'c-bea-call',
      revelation:
        'Interval notes on a press night, she said, because it is the only twenty minutes anybody listens. Nobody in the company was given a note that night. She was on the telephone in the dark at the back of the circle, alone, for the whole of it.',
    },
    {
      id: 'x-dev-train',
      claimIdA: 'c-dev-station',
      claimIdB: 'c-dev-stagedoor',
      revelation:
        'The 20:12 was forty minutes down and did not arrive until 20:51, so there was no train for Dev to meet and he never left the stage door. He was the only person in the building who could see that corridor for the whole interval, and Beatrice was the one who tried to move him out of it.',
    },
  ],

  confrontation: {
    opening:
      'Sit down. I have directed forty-one productions and I have never once been late for a difficult conversation, so say it properly.',
    beats: [
      {
        id: 'u-key',
        evidence: { kind: 'contradiction', id: 'x-key' },
        press:
          'There is one key. Dev had it on his belt all interval, and Nell watched you carry it down the corridor by the red tag.',
        rebuttal:
          'Nell would like my job and has wanted it since March. Put a nineteen year old in front of a policeman and she will remember whatever gets her through the room.',
      },
      {
        id: 'u-corridor',
        evidence: { kind: 'contradiction', id: 'x-bea-corridor' },
        press:
          'You put yourself in J14 for the whole interval. Dev watched you come down that corridor at twelve minutes past and go back up at twenty past.',
        rebuttal:
          'Dev has called shows for twenty two years on four hours of sleep a night. He is a wonderful man and he could not tell you what he had for lunch.',
      },
      {
        id: 'u-notes',
        evidence: { kind: 'contradiction', id: 'x-bea-notes' },
        press:
          'You said you were giving interval notes. Not one person in that company was given a note. You were on the phone at the back of the circle, on your own, in the dark.',
        rebuttal: 'And a woman may make a telephone call.',
      },
      {
        id: 'u-why',
        evidence: { kind: 'motive', id: 'm-sheffield' },
        press:
          'Nineteen thousand one year and eleven the next, for eleven years of it being the road and not you. And she had decided to say it on press night.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is not evidence, that is a mood.',
      'You have been in this building four days. I have been in it since March.',
      'Try again, and this time with something I could not take apart in front of a jury.',
    ],
    confession:
      'She came off at the interval and she was lit up with it. Not cruel. That is what people will not understand about her. She was not being cruel, she was being *free*, finally, after eleven years of carrying it for me.\n\nShe said she had told the two critics she was going to give them something better than the play. She said it the way you tell somebody good news.\n\nI had the key in my hand because I had gone down to ask her not to. That is all I went down for. I want that written somewhere.\n\nShe laughed at me, and I have been laughed at by better, and then she turned round to her mirror and started taking her face off, and she said do not stand in my light.\n\nAnd I put the pills in front of her and I sat down on the other chair and I did not say one word to stop her. That is what I did. I did not make her take them. I just did not say the thing that would have stopped her, and I know exactly how long I did not say it for.',
  },

  solution: {
    killerId: 'bea',
    requiredContradictionIds: ['x-key', 'x-bea-corridor', 'x-bea-notes'],
    requiredMotiveIds: ['m-sheffield'],
    epilogue:
      'They found the second glass in the sink, washed, and the red tag on the key still warm in her coat pocket when the police finally asked her to turn it out.\n\nNell played the run and then the transfer, and was very good in it, and has not spoken to a journalist about any of this once.\n\nJoel Petrie was written to by a solicitor in the spring. He had known about the road for eleven years. He said the only thing he had ever wanted was for somebody to say it out loud without him having to ask.',
  },
};
