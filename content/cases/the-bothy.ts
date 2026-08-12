import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 7 — "The Bothy".
 *
 * Pack 7. Standalone: no Listener, no coda.
 *
 * Shape of the lie, per docs/pack-ledger.md: **order**. Who came in before whom.
 *
 * Story Lens, by switching to the building’s own logic: a bothy has no clock, no
 * signal, and no introductions. People arrive out of the dark one at a time and
 * you learn their names by morning. Nobody in that room knows what time anything
 * happened. They only know what happened before what.
 *
 * Which means the sequence can be rewritten by one man who arrived twice. The
 * second arrival is a performance — stamping snow off in the doorway, being
 * handed tea, apologising for the hour. Everyone remembers it. Nobody remembers
 * the first one, because the first one did not ask to be remembered.
 *
 * Red herring is seeded from clue 2 (he had private access): Sandra cleaned
 * Struan’s house for nine years and knows everything about him, and is innocent
 * for a reason the player can prove.
 */
export const theBothyRaw = {
  id: 'the-bothy',
  title: 'The Bothy',
  blurb:
    'Five people walked out of a whiteout into one room, hours apart. They agree on everything except the order.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'struan', name: 'Struan', avatarColor: '#8A7B5C' },
    { id: 'keir', name: 'Iain', avatarColor: '#C4483C' },
    { id: 'morven', name: 'Anne', avatarColor: '#4E8CF0' },
    { id: 'pris', name: 'Sandra', avatarColor: '#E4B363' },
    { id: 'hamish', name: 'Hamish', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'bothy', name: 'the bothy' },
    { id: 'mainroom', name: 'the main room', parentId: 'bothy' },
    { id: 'backroom', name: 'the back room', parentId: 'bothy' },
    { id: 'porch', name: 'the porch', parentId: 'bothy' },
    { id: 'hill', name: 'the hill' },
  ],
  objects: [],

  briefing: {
    victimId: 'struan',
    foundAt: { placeId: 'backroom', minutes: 1500 },
    causeOfDeath: 'A skull fracture. There is a stone hearth in the back room and he had been drinking.',
    ruling:
      'Recorded as a fall. Nobody could get a vehicle up the glen until the Sunday and by then eleven people had walked through that room.',
    opening:
      'Corrie Fhithich bothy has two rooms, a stone hearth, no electricity and no signal. There is a book by the door that people sign because the code says you should.\n\nStruan Baillie was found in the back room on the Saturday morning. Five other people had come in out of the whiteout the night before, one at a time, hours apart, and not one of them owns a watch that agrees with anybody else’s.\n\nYou organised the weekend. You broke an ankle in November and stayed at home.',
  },

  threads: [
    // -------------------------------------------------------------- t-struan
    {
      id: 't-struan',
      title: 'Struan',
      participantIds: ['you', 'struan'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 's1',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 300,
          body: 'Book is at the printers!! Raven’s Line, hardback, February. Twenty two years of getting up things and one of them pays a mortgage',
        },
        {
          id: 's2',
          threadId: 't-struan',
          senderId: 'you',
          sentAt: 312,
          body: 'congratulations. genuinely',
        },
        {
          id: 's3',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 326,
          body: 'Iain is coming this weekend. First time in about four years he has said yes to anything I have organised',
        },
        {
          id: 's4',
          threadId: 't-struan',
          senderId: 'you',
          sentAt: 334,
          body: 'you two alright?',
        },
        {
          id: 's5',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 350,
          body: 'There is a conversation we have never had and I have decided I am going to have it at the bothy with a drink in me, which is how every bad idea I have ever had has started',
        },
        {
          id: 's6',
          threadId: 't-struan',
          senderId: 'you',
          sentAt: 358,
          body: 'about the line',
        },
        {
          id: 's7',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 376,
          body: 'He soloed it in 2016 and he told one person and the one person was me, and I put my name on it in 2018 and I have been dining out on it ever since',
        },
        {
          id: 's8',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 380,
          body: 'I have written him into the acknowledgements. That is not enough and I know it is not enough. I am going to offer him the whole thing, in front of the others, and let him decide what he wants done',
        },
        {
          id: 's9',
          threadId: 't-struan',
          senderId: 'you',
          sentAt: 388,
          body: 'that will end your book',
        },
        {
          id: 's10',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 400,
          body: 'Aye. Well',
        },
        {
          id: 's11',
          threadId: 't-struan',
          senderId: 'struan',
          sentAt: 1030,
          body: 'In first, fire on, absolutely horizontal snow outside. Anne here. Nobody else yet and it is going to be a long night for whoever is still on that path',
          claims: [
            {
              id: 'c-struan-mainroom',
              subject: 'struan',
              assertedBy: 'struan',
              predicate: { kind: 'at_place', placeId: 'mainroom' },
              window: { start: 1020, end: 1080 },
              sourceMessageId: 's11',
              label: 'Struan: in the main room, 17:00–18:00',
            },
          ],
        },
      ],
    },

    // --------------------------------------------------------------- t-group
    {
      id: 't-group',
      title: 'Corrie Fhithich',
      participantIds: ['you', 'keir', 'morven', 'hamish'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'p1',
          threadId: 't-group',
          senderId: 'morven',
          sentAt: 2400,
          body: 'signal at last. I do not know how to write this so I am going to write it badly. Struan died at the bothy on Friday night. we found him Saturday morning in the back room',
        },
        {
          id: 'p2',
          threadId: 't-group',
          senderId: 'hamish',
          sentAt: 2410,
          body: 'Police were up on Sunday once the road went. They took the book and they took statements and they were content it was a fall against the hearth.',
        },
        {
          id: 'p3',
          threadId: 't-group',
          senderId: 'keir',
          sentAt: 2422,
          body: 'I got in last. Twenty to ten, half dead, signed the book at the door because Hamish makes you. Struan was already away through the back by then and I never saw him',
          claims: [
            {
              id: 'c-keir-book-late',
              subject: 'keir',
              assertedBy: 'keir',
              predicate: {
                kind: 'doing',
                actionId: 'signed_the_book_on_arrival_at_2140',
                exclusiveGroup: 'keir-book',
              },
              window: { start: 1200, end: 1320 },
              sourceMessageId: 'p3',
              label: 'Iain: signed the book on arriving at 21:40',
            },
          ],
        },
        {
          id: 'p4',
          threadId: 't-group',
          senderId: 'keir',
          sentAt: 2424,
          body: 'I was on that path from about twenty to seven. Three hours for four miles. That is what that night was',
          claims: [
            {
              id: 'c-keir-hill',
              subject: 'keir',
              assertedBy: 'keir',
              predicate: { kind: 'at_place', placeId: 'hill' },
              window: { start: 1120, end: 1300 },
              sourceMessageId: 'p4',
              label: 'Iain: on the hill path, 18:40–21:40',
            },
          ],
        },
        {
          id: 'p5',
          threadId: 't-group',
          senderId: 'morven',
          sentAt: 2436,
          body: 'I was in that main room from six until we all gave up about eleven. I did not move, I had the stove going and I was not giving that seat up for anybody',
          claims: [
            {
              id: 'c-morven-mainroom',
              subject: 'morven',
              assertedBy: 'morven',
              predicate: { kind: 'at_place', placeId: 'mainroom' },
              window: { start: 1080, end: 1320 },
              sourceMessageId: 'p5',
              label: 'Anne: in the main room, 18:00–22:00',
            },
          ],
        },
        {
          id: 'p6',
          threadId: 't-group',
          senderId: 'keir',
          sentAt: 2448,
          body: 'And the woman who cleans his house was in and out of that back room all evening, which nobody has mentioned to a policeman yet',
          claims: [
            {
              id: 'c-pris-backroom',
              subject: 'pris',
              assertedBy: 'keir',
              predicate: { kind: 'at_place', placeId: 'backroom' },
              window: { start: 1150, end: 1180 },
              sourceMessageId: 'p6',
              label: 'Sandra: in the back room, 19:10–19:40 (per Iain)',
            },
          ],
        },
        {
          id: 'p7',
          threadId: 't-group',
          senderId: 'hamish',
          sentAt: 2460,
          body: 'Mrs Nkemelu walked in with me and she is a member of this club and she has been on that hill longer than you have, Iain.',
        },
        {
          id: 'p8',
          threadId: 't-group',
          senderId: 'morven',
          sentAt: 2470,
          body: 'can we not do this in here',
        },
      ],
    },

    // -------------------------------------------------------------- t-morven
    {
      id: 't-morven',
      title: 'Anne',
      participantIds: ['you', 'morven'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2600,
          body: 'you organised it and you were not there and I keep thinking about how that is going to sit with you, so I am going to tell you everything I actually remember rather than everything I said to a policeman at eight in the morning',
        },
        {
          id: 'm2',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2608,
          body: 'the thing about a bothy is there is no clock. there is no light except head torches and a stove. you do not know what time it is, you know what has happened yet',
        },
        {
          id: 'm3',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2616,
          body: 'Struan first, me second about six. Hamish and Sandra together, and Iain last, coming in stamping and swearing and everyone made a fuss of him because he looked wrecked',
        },
        {
          id: 'm4',
          threadId: 't-morven',
          senderId: 'you',
          sentAt: 2622,
          body: 'was that the first time you saw iain that night',
        },
        {
          id: 'm5',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2646,
          body: 'no. and I have been sat with this for eleven days',
        },
        {
          id: 'm6',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2652,
          body: 'about ten to seven somebody came into the main room, no torch on, did not speak, went straight through to the back. I assumed it was Struan coming back from the peat store. it was not Struan because Struan was already through the back',
          claims: [
            {
              id: 'c-keir-mainroom',
              subject: 'keir',
              assertedBy: 'morven',
              predicate: { kind: 'at_place', placeId: 'mainroom' },
              window: { start: 1130, end: 1150 },
              sourceMessageId: 'm6',
              label: 'Iain: in the main room, 18:50–19:10 (per Anne)',
            },
          ],
        },
        {
          id: 'm7',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2658,
          body: 'it was the jacket. blue, orange shoulder patch, that old Berghaus he has had for years. I did not think a single thing about it until three days later',
        },
        {
          id: 'm8',
          threadId: 't-morven',
          senderId: 'you',
          sentAt: 2664,
          body: 'why did you not say',
        },
        {
          id: 'm9',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2680,
          body: 'because at eight in the morning with him dead in the next room I said what everybody said, which is that Iain came in last at twenty to ten. and he did. that is the whole problem. he did come in at twenty to ten',
        },
        {
          id: 'm10',
          threadId: 't-morven',
          senderId: 'morven',
          sentAt: 2690,
          body: 'Sandra was in the porch the whole of that hour sorting a pack out. talk to her. she has been trying to get somebody to listen since Sunday and everybody has decided she is the cleaner',
          claims: [
            {
              id: 'c-pris-porch',
              subject: 'pris',
              assertedBy: 'morven',
              predicate: { kind: 'at_place', placeId: 'porch' },
              window: { start: 1140, end: 1200 },
              sourceMessageId: 'm10',
              label: 'Sandra: in the porch, 19:00–20:00 (per Anne)',
            },
          ],
        },
      ],
    },

    // -------------------------------------------------- t-pris (discovery)
    {
      id: 't-pris',
      title: 'Sandra',
      participantIds: ['you', 'pris'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['m10'],
      messages: [
        {
          id: 'r1',
          threadId: 't-pris',
          senderId: 'pris',
          sentAt: 2800,
          body: 'Nine years I did that man’s house. Nine years of his post and his bins and his bathroom, so yes, I know things about him. That is not a motive, that is a Tuesday.',
        },
        {
          id: 'r2',
          threadId: 't-pris',
          senderId: 'pris',
          sentAt: 2806,
          body: 'I also walk. I have done the Munros twice and the second time in winter, and I am in the same club as Hamish Dunnet, and I would like one person in this to hold both of those facts at once.',
        },
        {
          id: 'r3',
          threadId: 't-pris',
          senderId: 'you',
          sentAt: 2812,
          body: 'iain put you in the back room',
        },
        {
          id: 'r4',
          threadId: 't-pris',
          senderId: 'pris',
          sentAt: 2824,
          body: 'He did. I was in the porch with my pack open across the whole floor from seven until eight, and Anne watched me do it, and Hamish stepped over me twice.',
        },
        {
          id: 'r5',
          threadId: 't-pris',
          senderId: 'pris',
          sentAt: 2836,
          body: 'And I will tell you the thing I know, since knowing things about him is apparently what I am for.',
        },
        {
          id: 'r6',
          threadId: 't-pris',
          senderId: 'pris',
          sentAt: 2840,
          body: 'There were two letters from a publisher on that kitchen table for a month and I dusted round them for a month. He had written a paragraph on the back of one in pencil. It said: tell them the truth about the Raven and let them cancel it.',
        },
        {
          id: 'r7',
          threadId: 't-pris',
          senderId: 'pris',
          sentAt: 2852,
          body: 'A man does not write that on the back of a publisher’s letter unless he has decided. He had decided. He was going up there to give it away.',
        },
      ],
    },

    // ------------------------------------------------------ t-hamish (gated)
    {
      id: 't-hamish',
      title: 'Hamish Dunnet',
      participantIds: ['you', 'hamish'],
      // Deadlock, found at Pack 14. This also gated on `x-keir-book`, half of
      // which (`c-keir-book-early`) is inside this thread, so opening it required
      // a proof only it could supply. `x-keir-mainroom` is built from t-group and
      // t-morven, so it opens from outside.
      requiresContradictionIds: ['x-keir-mainroom'],
      messages: [
        {
          id: 'h1',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3000,
          body: 'I have been maintenance officer for that bothy since 1998 and I have gone up there four times a year for twenty seven years, and I have never once had to think about the book as a record of anything.',
        },
        {
          id: 'h2',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3008,
          body: 'I check it when I arrive. It is not a rule, it is a habit, and I did it at eight o’clock with a head torch in my teeth like every other time.',
        },
        {
          id: 'h3',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3012,
          body: 'There were five names in it at eight o’clock. Struan, Anne, myself, Mrs Nkemelu, and K. Lamont. His was the last of the five and it was already dry.',
          claims: [
            {
              id: 'c-keir-book-early',
              subject: 'keir',
              assertedBy: 'hamish',
              predicate: {
                kind: 'doing',
                actionId: 'had_already_signed_the_book_by_eight',
                exclusiveGroup: 'keir-book',
              },
              window: { start: 1200, end: 1320 },
              sourceMessageId: 'h3',
              label: 'Iain: had already signed the book by 20:00 (per Hamish)',
            },
          ],
        },
        {
          id: 'h4',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3020,
          body: 'At twenty to ten he came in through that door and signed it again, on the next line, in front of four people. Two K. Lamonts, one under the other. The police took the book away and I do not believe anybody has turned that page.',
        },
        {
          id: 'h5',
          threadId: 't-hamish',
          senderId: 'you',
          sentAt: 3028,
          body: 'the back room',
        },
        {
          id: 'h6',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3040,
          body: 'I went through at about quarter past seven for the spare gas, which lives on the shelf above the hearth. Struan was on the floor with his back against the wall and a man was crouched down in front of him.',
          claims: [
            {
              id: 'c-keir-backroom',
              subject: 'keir',
              assertedBy: 'hamish',
              predicate: { kind: 'at_place', placeId: 'backroom' },
              window: { start: 1155, end: 1170 },
              sourceMessageId: 'h6',
              label: 'Iain: in the back room, 19:15–19:30 (per Hamish)',
            },
          ],
        },
        {
          id: 'h7',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3044,
          body: 'I said sorry, gas, and I took the gas, and I came out. Struan had a drink in him and I have seen that man on a floor at a bothy on four separate occasions and thought nothing of any of them.',
        },
        {
          id: 'h8',
          threadId: 't-hamish',
          senderId: 'you',
          sentAt: 3050,
          body: 'you did not see who it was',
        },
        {
          id: 'h9',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3062,
          body: 'A back and a blue jacket and a head torch that was off. I am sixty eight and it was a stone room lit by a doorway. But there were five people in that building and I have accounted for three of them at that minute, and Struan was the fourth.',
        },
        {
          id: 'h10',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3074,
          body: 'The signing is the part I cannot get past. A man who is cold and beaten and has just walked four miles does not think about the book. A man who needs you to remember him arriving does.',
        },
        {
          id: 'h11',
          threadId: 't-hamish',
          senderId: 'hamish',
          sentAt: 3086,
          body: 'Struan told me in the summer that he had taken something off Iain Lamont that was not his to take, and that he was going to give it back, and that he was frightened of doing it. I thought he meant a debt.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-raven',
      characterId: 'keir',
      summary:
        'Iain soloed the Raven’s Line in 2016 and told one person. Struan claimed it in 2018 and built seven years and a book on it, and had decided to give it back in front of witnesses that weekend.',
      establishedByMessageIds: ['s7', 'r6'],
    },
  ],

  contradictions: [
    {
      id: 'x-keir-mainroom',
      claimIdA: 'c-keir-hill',
      claimIdB: 'c-keir-mainroom',
      revelation:
        'He put himself on the path from twenty to seven until twenty to ten. At about ten to seven somebody walked through the main room with their torch off and did not speak, and Anne assumed it was Struan coming back from the peat store. Struan was already through the back. She knew the jacket and thought nothing of it for three days.',
    },
    {
      id: 'x-keir-book',
      claimIdA: 'c-keir-book-late',
      claimIdB: 'c-keir-book-early',
      revelation:
        'He signed the book at the door at twenty to ten, in front of four people, because Hamish makes you. Hamish had already read that book at eight o’clock with a head torch in his teeth, and K. Lamont was the fifth name in it and the ink was dry. There are two K. Lamonts on that page, one under the other, and nobody has turned it.',
    },
    {
      id: 'x-keir-backroom',
      claimIdA: 'c-keir-hill',
      claimIdB: 'c-keir-backroom',
      revelation:
        'At quarter past seven Hamish went through for the spare gas and there was a man crouched in front of Struan, who was on the floor with his back to the wall. A blue jacket and a head torch that was switched off. Three of the five people in that building are accounted for at that minute and Struan was the fourth.',
    },
    {
      id: 'x-pris-porch',
      claimIdA: 'c-pris-backroom',
      claimIdB: 'c-pris-porch',
      revelation:
        'He put the woman who cleans Struan’s house in and out of the back room all evening. She was in the porch from seven until eight with her pack open across the whole floor, Anne watched her do it and Hamish stepped over her twice. She has been trying to get somebody to listen since Sunday and everybody decided she was the cleaner.',
    },
  ],

  confrontation: {
    opening:
      'You were not there. You broke an ankle and you sat at home and you have read some text messages. Go on then, tell me about that night.',
    beats: [
      {
        id: 'b-mainroom',
        evidence: { kind: 'contradiction', id: 'x-keir-mainroom' },
        press:
          'You had yourself on the path for three hours. At ten to seven somebody crossed that main room with their torch off and went through the back, and Anne knew the jacket.',
        rebuttal:
          'A dark room and a blue jacket. Half the hill wears that jacket. She has had eleven days and a lot of people telling her it matters.',
      },
      {
        id: 'b-book',
        evidence: { kind: 'contradiction', id: 'x-keir-book' },
        press:
          'You signed the book at the door at twenty to ten in front of four people. Hamish read that book at eight and your name was already the fifth in it, and dry. There are two K. Lamonts on that page.',
        rebuttal: 'Then somebody wrote my name in a book. Anybody can write a name in a book.',
      },
      {
        id: 'b-backroom',
        evidence: { kind: 'contradiction', id: 'x-keir-backroom' },
        press:
          'At quarter past seven Hamish came through for the gas. Struan was on the floor with his back to the wall and a man was crouched in front of him with his torch off. Three of the five are accounted for and Struan is the fourth.',
        rebuttal: '',
      },
      {
        id: 'b-why',
        evidence: { kind: 'motive', id: 'm-raven' },
        press:
          'You soloed the Raven’s Line in 2016 and told one person. He put his name on it in 2018 and he was going to give it back to you that weekend, in front of everybody, and end his own book doing it.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is a room with no light in it and five people who had all been walking for hours.',
      'You were not on that hill. You have never been on that hill in February.',
      'Come back with a thing that is not somebody remembering a coat.',
    ],
    confession:
      'He was going to give it back. That is the part nobody is going to be able to hold in their head, so I will say it plainly.\n\nI went up early. I came over the shoulder and dropped in before six because I have done that path forty times and it does not take three hours if you know it. I wanted an hour with him before the others came.\n\nAnd he sat on that floor and he said it. He said Iain, it is yours, I am giving it back on Sunday in front of them all, I have written it in the book already.\n\nAnd I have never in my life felt anything like what I felt then, and it was not gratitude.\n\nSeven years. Seven years of standing at the back of rooms while he told the story of my night. Seven years of deciding every single morning not to say it. And he was going to undo it in one Sunday afternoon and be a good man about it, and everyone would say what an extraordinary thing to do, and it would be his again. Even the giving back would be his.\n\nI did not bring anything with me. There is a hearth in that room and he was already on the floor.\n\nThen I walked back out into it for two and a half hours in the dark, and I came in at twenty to ten and let four people make a fuss of me, and I signed my name under my own name.',
  },

  solution: {
    killerId: 'keir',
    requiredContradictionIds: ['x-keir-mainroom', 'x-keir-book', 'x-keir-backroom'],
    requiredMotiveIds: ['m-raven'],
    epilogue:
      'The book is in a police property store in Aviemore. Page forty one has K. Lamont written twice, four lines apart, in the same pencil.\n\nPriscilla Nkemelu was interviewed properly in the March, four months after she first asked to be. She gave them the letter with the pencil paragraph on the back of it, which she had kept in a drawer because nobody had ever asked her for anything.\n\nThe Raven’s Line was published in the February with the original attribution, because the print run was already bound. The second edition carries a different name and a note of two paragraphs, and Struan Baillie wrote both of them himself in the autumn before he died.\n\nHamish Dunnet still goes up four times a year. He has stopped checking the book.',
  },
};
