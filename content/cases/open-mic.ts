import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 10 — "Open Mic".
 *
 * Pack 10. Standalone: no Listener, no coda.
 *
 * Shape of the lie, per docs/pack-ledger.md: **the alibi is on video, and the
 * footage is from the wrong week**. Distinct from Pack 4, where three clocks
 * coexisted deliberately; here there is one clock and it is correct, and the
 * file is simply not from that night.
 *
 * Story Lens, by finding the asset in the failure: an open mic act does the
 * identical five minutes every week. Same shirt, same order, same laugh in the
 * same place. Sixteen years of never changing anything is the saddest fact
 * about Dave Prosser, and it is the only reason the alibi works at all.
 *
 * The other variation: the killing is trivial and the lie is virtuoso. He did
 * not plan it. He had twenty minutes, a camera he edits every week, and a room
 * full of people who were not looking at him.
 *
 * Red herring is seeded from clue 3 — he has been at it for decades. Kevin
 * Boyce is sixty-one, has worked the same rooms since 1994, knows everybody,
 * talks to everybody, and carries a Nokia. He fits everything the player has
 * built, and he is compering on the real footage for the whole window.
 */
export const openMicRaw = {
  id: 'open-mic',
  title: 'Open Mic',
  blurb:
    'His alibi is on video. Same shirt, same five minutes, same laugh in the same place. It is from the Tuesday before.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'marnie', name: 'Debbie', avatarColor: '#8A7B5C' },
    { id: 'gil', name: 'Dave', avatarColor: '#C4483C' },
    { id: 'roz', name: 'Roz', avatarColor: '#4E8CF0' },
    { id: 'ferdy', name: 'Kevin', avatarColor: '#E4B363' },
    { id: 'kit', name: 'Kit', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'club', name: 'the Hatch' },
    { id: 'stage', name: 'the stage', parentId: 'club' },
    { id: 'bar', name: 'the bar', parentId: 'club' },
    { id: 'greenroom', name: 'the green room', parentId: 'club' },
    { id: 'box', name: 'the sound box', parentId: 'club' },
    { id: 'alley', name: 'the alley', parentId: 'club' },
  ],
  objects: [
    {
      id: 'card',
      name: 'the camera card',
      // One card, one camera, one night. Two people cannot both have had it.
      unique: true,
    },
  ],

  briefing: {
    victimId: 'marnie',
    foundAt: { placeId: 'alley', minutes: 1400 },
    causeOfDeath: 'A head injury against the kerb. She went down once and did not get up.',
    ruling:
      'Recorded as a fall. She had been drinking, the alley slopes, and the whole room was inside watching a man do five minutes about trains.',
    opening:
      'The Hatch runs an open mic every Tuesday and films it for a channel nobody watches, which is how eleven acts a week end up with something to send a promoter.\n\nMarnie Vaux was found in the alley behind it at twenty past eleven. She had done seven minutes at five to ten and gone out for air.\n\nYou make a podcast about the circuit. She had been sending you voice notes since March.',
  },

  threads: [
    // -------------------------------------------------------------- t-marnie
    {
      id: 't-marnie',
      title: 'Debbie',
      participantIds: ['you', 'marnie'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'n1',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 200,
          body: 'the tour support came through. eight weeks. i have not told anyone and i am going to be sick',
        },
        {
          id: 'n2',
          threadId: 't-marnie',
          senderId: 'you',
          sentAt: 208,
          body: 'MARNIE',
        },
        {
          id: 'n3',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 216,
          body: 'i know. i know. i have to tell gil tonight and i have been putting it off for nine days',
        },
        {
          id: 'n4',
          threadId: 't-marnie',
          senderId: 'you',
          sentAt: 222,
          body: 'why is that hard. hes your mate',
        },
        {
          id: 'n5',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 238,
          body: 'because we started the same month. october 2009, the same room, the same open spot list. and i am going on tour and he is still booking the tuesday',
        },
        {
          id: 'n6',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 244,
          body: 'and he does the same five. genuinely the same five. i could do gils set. everyone in that room could do gils set',
        },
        {
          id: 'n7',
          threadId: 't-marnie',
          senderId: 'you',
          sentAt: 252,
          body: 'that is not your fault',
        },
        {
          id: 'n8',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 266,
          body: 'no but it is going to be my face he sees when he thinks about it. for years. i have done this long enough to know exactly how that works',
        },
        {
          id: 'n9',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 1215,
          body: 'here. on at five to ten. going to do it after, in the alley, away from the room, like a coward',
        },
        {
          id: 'n10',
          threadId: 't-marnie',
          senderId: 'marnie',
          sentAt: 1288,
          body: 'that went ok actually. right. going out',
          claims: [
            {
              id: 'c-marnie-stage',
              subject: 'marnie',
              assertedBy: 'kit',
              predicate: { kind: 'at_place', placeId: 'stage' },
              window: { start: 1290, end: 1310 },
              sourceMessageId: 'n10',
              label: 'Debbie: on stage, 21:30–21:50 (running order)',
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- t-club
    {
      id: 't-club',
      title: 'Hatch Tuesdays',
      participantIds: ['you', 'gil', 'roz', 'ferdy'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'h1',
          threadId: 't-club',
          senderId: 'roz',
          sentAt: 2400,
          body: 'Debbie died in the alley on Tuesday night. Police came Wednesday, took statements off nine of us, and are calling it a fall. The Hatch is shut this week.',
        },
        {
          id: 'h2',
          threadId: 't-club',
          senderId: 'ferdy',
          sentAt: 2412,
          body: 'I have compered that room for eleven years and I have never once had to say a thing like this into it. I put her on for the first time in 2010 and she died at me for four minutes and came back the week after, which is the whole job.',
        },
        {
          id: 'h3',
          threadId: 't-club',
          senderId: 'gil',
          sentAt: 2424,
          body: 'I was on when it happened. I was literally on the stage. Which I know is a horrible way to say it but it is where I was and somebody is going to ask so I would rather say it now',
          claims: [
            {
              id: 'c-gil-stage',
              subject: 'gil',
              assertedBy: 'gil',
              predicate: { kind: 'at_place', placeId: 'stage' },
              window: { start: 1290, end: 1310 },
              sourceMessageId: 'h3',
              label: 'Dave: on stage, 21:30–21:50',
            },
          ],
        },
        {
          id: 'h4',
          threadId: 't-club',
          senderId: 'gil',
          sentAt: 2428,
          body: 'And it is filmed, obviously. I have cut it and put it on the drive. Twenty two minutes, unbroken, me at half nine doing the trains bit with Debbie stood at the bar behind me',
          claims: [
            {
              id: 'c-marnie-bar',
              subject: 'marnie',
              assertedBy: 'gil',
              predicate: { kind: 'at_place', placeId: 'bar' },
              window: { start: 1290, end: 1310 },
              sourceMessageId: 'h4',
              label: 'Debbie: at the bar, 21:30–21:50 (per Dave’s clip)',
            },
          ],
        },
        {
          id: 'h5',
          threadId: 't-club',
          senderId: 'roz',
          sentAt: 2436,
          body: 'Nobody asked you for a clip, Dave.',
        },
        {
          id: 'h6',
          threadId: 't-club',
          senderId: 'gil',
          sentAt: 2442,
          body: 'I am trying to be useful',
        },
        {
          id: 'h7',
          threadId: 't-club',
          senderId: 'gil',
          sentAt: 2450,
          body: 'And if we are doing where everyone was, Kevin was out the back for a good twenty minutes in the middle of that show and I do not think anybody has said so',
          claims: [
            {
              id: 'c-ferdy-alley',
              subject: 'ferdy',
              assertedBy: 'gil',
              predicate: { kind: 'at_place', placeId: 'alley' },
              window: { start: 1290, end: 1310 },
              sourceMessageId: 'h7',
              label: 'Kevin: in the alley, 21:30–21:50 (per Dave)',
            },
          ],
        },
        {
          id: 'h8',
          threadId: 't-club',
          senderId: 'ferdy',
          sentAt: 2458,
          body: 'Son, I was on the microphone.',
        },
        {
          id: 'h9',
          threadId: 't-club',
          senderId: 'roz',
          sentAt: 2466,
          body: 'Right, that is enough of that. Anything else goes to me and not to twenty-eight people.',
        },
      ],
    },

    // ----------------------------------------------------------------- t-kit
    {
      id: 't-kit',
      title: 'Kit',
      participantIds: ['you', 'kit'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'k1',
          threadId: 't-kit',
          senderId: 'kit',
          sentAt: 2600,
          body: 'I do sound and door. I write the running order on the back of the float sheet in biro and I have every one of them since I started because I never throw anything out.',
        },
        {
          id: 'k2',
          threadId: 't-kit',
          senderId: 'kit',
          sentAt: 2606,
          body: 'Tuesday. Kevin compering. Then Priya, Dave, Debbie, break, four more. Debbie was on at 21:30. Not 21:55, not five to ten. 21:30, and she came off at ten to.',
        },
        {
          id: 'k3',
          threadId: 't-kit',
          senderId: 'you',
          sentAt: 2614,
          body: 'gil says she was at the bar at half nine',
        },
        {
          id: 'k4',
          threadId: 't-kit',
          senderId: 'kit',
          sentAt: 2622,
          body: 'She was on the stage at half nine. I had her mic up. I know where she was because I was listening to her breathe for twenty minutes.',
        },
        {
          id: 'k5',
          threadId: 't-kit',
          senderId: 'kit',
          sentAt: 2634,
          body: 'And Dave was on before her. He came off at 21:28 and he did not come back in until the break.',
        },
        {
          id: 'k6',
          threadId: 't-kit',
          senderId: 'you',
          sentAt: 2640,
          body: 'you are sure about the order',
        },
        {
          id: 'k7',
          threadId: 't-kit',
          senderId: 'kit',
          sentAt: 2652,
          body: 'It is in biro on a float sheet in a drawer in that building. I am not sure about much but I am sure about that.',
        },
        {
          id: 'k8',
          threadId: 't-kit',
          senderId: 'kit',
          sentAt: 2664,
          body: 'Talk to Kevin. He was on the mic the whole of the middle section and he sees that room better than the camera does, because the camera only points one way.',
        },
      ],
    },

    // ---------------------------------------------- t-ferdy (discovery)
    {
      id: 't-ferdy',
      title: 'Kevin',
      participantIds: ['you', 'ferdy'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['k8'],
      messages: [
        {
          id: 'f1',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2800,
          body: 'You will have to bear with me on the texting. I have a Nokia and I have had it since my daughter got married, and everybody finds that hilarious until they need somebody to still have a working phone at two in the morning.',
        },
        {
          id: 'f2',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2812,
          body: 'Thirty-one years. Glasgow, Leeds, the two rooms in Birmingham, the Wednesday in Bristol that is not there any more. I have compered in most towns you can name and I have been paid in most of them.',
        },
        {
          id: 'f3',
          threadId: 't-ferdy',
          senderId: 'you',
          sentAt: 2820,
          body: 'gil said you were out the back',
        },
        {
          id: 'f4',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2834,
          body: 'I was holding a microphone in front of forty people for the whole of that section, son. There is a recording of me doing it. It is the same recording he wants you to watch.',
          claims: [
            {
              id: 'c-ferdy-stage',
              subject: 'ferdy',
              assertedBy: 'roz',
              predicate: { kind: 'at_place', placeId: 'stage' },
              window: { start: 1285, end: 1315 },
              sourceMessageId: 'f4',
              label: 'Kevin: on stage compering, 21:25–21:55',
            },
          ],
        },
        {
          id: 'f5',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2846,
          body: 'And I will tell you what I did see, since I was pointing the other way from that camera all night.',
        },
        {
          id: 'f6',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2850,
          body: 'Dave went out the fire door at about twenty-five to ten and he was not back for the break. I brought Debbie on and I could see the door was on the latch behind her the whole seven minutes.',
          claims: [
            {
              id: 'c-gil-alley',
              subject: 'gil',
              assertedBy: 'ferdy',
              predicate: { kind: 'at_place', placeId: 'alley' },
              window: { start: 1295, end: 1305 },
              sourceMessageId: 'f6',
              label: 'Dave: in the alley, 21:35–21:45 (per Kevin)',
            },
          ],
        },
        {
          id: 'f7',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2862,
          body: 'I have watched that clip he put on the drive about nine times. It is a lovely clip. He is very good in it.',
        },
        {
          id: 'f8',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2868,
          body: 'He does the trains, then the one about his mother, then he calls back to the swan. There is no swan on Tuesday. The swan is Priya and Priya was on Tuesday, but the swan bit is from the Tuesday before, because she dropped it.',
        },
        {
          id: 'f9',
          threadId: 't-ferdy',
          senderId: 'ferdy',
          sentAt: 2880,
          body: 'Sixteen years I have watched that man do the identical five minutes in the identical shirt and I have never once thought of it as useful to anybody.',
        },
      ],
    },

    // -------------------------------------------------------- t-roz (gated)
    {
      id: 't-roz',
      title: 'Roz Antrim',
      participantIds: ['you', 'roz'],
      requiresContradictionIds: ['x-gil-alley', 'x-marnie-bar'],
      messages: [
        {
          id: 'r1',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3000,
          body: 'I have run that room for fourteen years and I have never given a police officer a straight answer about anything, and this week I have given them nine.',
        },
        {
          id: 'r2',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3010,
          body: 'One camera, one card, one night. That is the whole system and it has been the whole system since 2016 because I will not spend money on it.',
        },
        {
          id: 'r3',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3016,
          body: 'Dave edits the channel. He takes the card at the end, cuts it up over the week, puts the clips on the drive. That is the arrangement and it has never once been a problem.',
          claims: [
            {
              id: 'c-card-gil',
              subject: 'gil',
              assertedBy: 'gil',
              predicate: { kind: 'has_object', objectId: 'card' },
              window: { start: 1260, end: 1350 },
              sourceMessageId: 'r3',
              label: 'Dave: had the camera card, 21:00–22:30',
            },
          ],
        },
        {
          id: 'r4',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3024,
          body: 'Except Tuesday I took it out at nine and dumped the first half onto my laptop in the box, because the tour people wanted Debbie’s set by the Wednesday and I was not waiting on Dave for it.',
          claims: [
            {
              id: 'c-card-roz',
              subject: 'roz',
              assertedBy: 'roz',
              predicate: { kind: 'has_object', objectId: 'card' },
              window: { start: 1260, end: 1280 },
              sourceMessageId: 'r4',
              label: 'Roz: had the camera card, 21:00–21:20',
            },
          ],
        },
        {
          id: 'r5',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3030,
          body: 'I put it back in at twenty past. So whatever he handed anybody, and whatever is on that drive, there is a copy of that night on my laptop that he has never seen.',
          claims: [
            {
              id: 'c-roz-box',
              subject: 'roz',
              assertedBy: 'roz',
              predicate: { kind: 'at_place', placeId: 'box' },
              window: { start: 1260, end: 1280 },
              sourceMessageId: 'r5',
              label: 'Roz: in the sound box, 21:00–21:20',
            },
          ],
        },
        {
          id: 'r6',
          threadId: 't-roz',
          senderId: 'you',
          sentAt: 3038,
          body: 'and debbie',
        },
        {
          id: 'r7',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3050,
          body: 'Told me about the tour on the Monday and asked me not to say anything until she had told Dave. She was worried about him. Actually worried, the way you are about somebody you like.',
        },
        {
          id: 'r8',
          threadId: 't-roz',
          senderId: 'roz',
          sentAt: 3062,
          body: 'They started the same month. Fifteen years. She had a tour and he had a Tuesday, and she was the one who felt bad about it, which tells you everything about the pair of them.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-tour',
      characterId: 'gil',
      summary:
        'They started the same month in 2009. She had eight weeks of tour support and had been putting off telling him for nine days, and she took him out to the alley to do it kindly.',
      establishedByMessageIds: ['n5', 'r8'],
    },
  ],

  contradictions: [
    {
      id: 'x-gil-alley',
      claimIdA: 'c-gil-stage',
      claimIdB: 'c-gil-alley',
      revelation:
        'He put himself on the stage, and said so first, before anybody asked him. Kevin Boyce was holding the microphone and watched him go out of the fire door at twenty-five to ten, and could see it was still on the latch behind Debbie for the whole seven minutes she was on.',
    },
    {
      id: 'x-marnie-bar',
      claimIdA: 'c-marnie-bar',
      claimIdB: 'c-marnie-stage',
      revelation:
        'His clip has Debbie stood at the bar behind him. She was on the stage at that minute with her microphone up, and Kit was listening to her breathe. The clip is real and Dave is really in it. It is from the Tuesday before, which is the only week Priya did the swan.',
    },
    {
      id: 'x-card',
      claimIdA: 'c-card-gil',
      claimIdB: 'c-card-roz',
      revelation:
        'One camera, one card, one night, since 2016, because Roz will not spend money on it. She took it out at nine to get Debbie’s set to the tour people and had it in her laptop until twenty past. There is a copy of that night he has never seen.',
    },
    {
      id: 'x-ferdy-stage',
      claimIdA: 'c-ferdy-alley',
      claimIdB: 'c-ferdy-stage',
      revelation:
        'He put a sixty-one year old compere in the alley for twenty minutes, in a group chat, eight minutes after being told nobody had asked him anything. Kevin was on the microphone in front of forty people, on the same recording Dave wanted everybody to watch.',
    },
  ],

  confrontation: {
    opening:
      'You do a podcast. That is what you do. You talk to people who are better than me about how they got better than me. Go on then, this will be great.',
    beats: [
      {
        id: 'o-alley',
        evidence: { kind: 'contradiction', id: 'x-gil-alley' },
        press:
          'You were on the stage, you said, before anybody asked. Kevin had the microphone and watched you go out of the fire door at twenty-five to ten.',
        rebuttal:
          'Kevin is sixty-one and has been doing this since before I was born and he compered eleven acts that night. He could not tell you what colour the walls are.',
      },
      {
        id: 'o-bar',
        evidence: { kind: 'contradiction', id: 'x-marnie-bar' },
        press:
          'Your clip has Debbie at the bar behind you. She was on stage with her mic up and Kit had her in the cans. And you call back to Priya’s swan, and Priya dropped the swan.',
        rebuttal:
          'So I misremembered a running order. I have done four hundred of these rooms. They are all the same room.',
      },
      {
        id: 'o-card',
        evidence: { kind: 'contradiction', id: 'x-card' },
        press:
          'One camera, one card. Roz pulled it at nine to get Debbie’s set to the tour people, and it was in her laptop until twenty past. There is a copy of that night you have never seen.',
        rebuttal: '',
      },
      {
        id: 'o-why',
        evidence: { kind: 'motive', id: 'm-tour' },
        press:
          'She had eight weeks of support and she had been sitting on it for nine days because she could not work out how to tell you. She took you out to the alley to do it kindly.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is a room full of people who have watched me die on my arse for sixteen years. Of course they have a version.',
      'You have never stood on a stage in your life.',
      'Bring me something that is not somebody remembering a Tuesday.',
    ],
    confession:
      'She said it really nicely. That is what I cannot get anybody to understand. She had worked out how to say it so that it would not land on me as anything, and she had been working on it for nine days, which is longer than she spent on most of her material.\n\nAnd I said congratulations and I meant it for about four seconds.\n\nThen she said the thing she thought was the kind bit. She said Dave, you should come and do a couple of the smaller ones, I will get you on.\n\nI will get you on.\n\nWe started the same month. The same list, in the same room, in October 2009, and she was going to get me on.\n\nI put my hand out. That is all it was. There is a kerb and it slopes and she went down once.\n\nAnd then I had twenty minutes and a camera I have cut every week for six years, and I sat in that green room and I knew exactly what to do, because I have got the same five minutes on eleven different Tuesdays and they are identical. Same shirt. Same order. Same laugh in the same place.\n\nSixteen years of never once changing anything, and the one time it was ever any use to me it was to do that.',
  },

  solution: {
    killerId: 'gil',
    requiredContradictionIds: ['x-gil-alley', 'x-marnie-bar', 'x-card'],
    requiredMotiveIds: ['m-tour'],
    epilogue:
      'Roz Antrim’s laptop had the unbroken first half of the actual night on it, in a folder called MARNIE FOR TOUR PPL. Twenty-two minutes, one angle, and a fire door on the latch at the edge of frame from 21:35.\n\nKit Nwachukwu’s float sheets went in as evidence, forty-one of them, in biro, in a drawer.\n\nFerdy Boyce compered the benefit at the Hatch in the February and did nineteen minutes and did not mention any of it once, and then did four more benefits in four cities because people kept asking him.\n\nThe eight weeks went to somebody else. The tour manager sent Roz a message asking her to pass on that they had watched the set eleven times before they booked her and would have booked her off two minutes of it.',
  },
};
