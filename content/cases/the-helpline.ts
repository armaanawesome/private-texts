import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 12 — "The Helpline".
 *
 * Pack 12, and the **fourth arc connection**. Clue 5 lands in the confession
 * only, and it is the one that narrows him to a person: Alun Meredith has been
 * a trained listener for twenty-two years, and he recognised the technique on
 * the phone while it was being used on him.
 *
 * Shape of the lie, per docs/pack-ledger.md: **a call that was never made**.
 *
 * Story Lens, by flipping the cost/benefit: the charity’s greatest virtue is
 * the alibi. Nothing on that line is recorded, nothing is traceable, and every
 * call is written up by hand afterwards by the person who took it. That is
 * exactly what makes it safe to ring, and exactly what makes ninety minutes in
 * a duty book impossible to check.
 *
 * Written with care. Callers stay off the page and unnamed, there is no method
 * detail anywhere, and the breach at the centre of it comes from caring too
 * much rather than too little.
 *
 * Overnight shift. Day 1 23:00 is minute 1380; the death is around 02:40.
 */
export const theHelplineRaw = {
  id: 'the-helpline',
  title: 'The Helpline',
  blurb:
    'Every call is logged by hand and nobody has ever had a reason to check one. His alibi is ninety minutes on a line that was never in use.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'connie', name: 'Connie', avatarColor: '#8A7B5C' },
    { id: 'alun', name: 'Alun', avatarColor: '#C4483C' },
    { id: 'yusuf', name: 'Yusuf', avatarColor: '#4E8CF0' },
    { id: 'sunny', name: 'Sunny', avatarColor: '#6E5AA8' },
    { id: 'prem', name: 'Prem', avatarColor: '#E4B363' },
  ],
  places: [
    { id: 'branch', name: 'the branch' },
    { id: 'callroom', name: 'the call room', parentId: 'branch' },
    { id: 'office', name: 'the office', parentId: 'branch' },
    { id: 'kitchen', name: 'the kitchen', parentId: 'branch' },
    { id: 'backstairs', name: 'the back stairs', parentId: 'branch' },
    { id: 'sunnyhome', name: 'Sunny’s flat' },
  ],
  objects: [],

  briefing: {
    victimId: 'connie',
    foundAt: { placeId: 'office', minutes: 1860 },
    causeOfDeath: 'A head injury. There is a step down into that office and it has been on the risk register since 2019.',
    ruling:
      'Recorded as a fall. Two volunteers were on shift and both were on the phones, which is what the duty book says.',
    opening:
      'Beacon runs a listening line out of two rooms above a carpet shop. Nothing is recorded, nothing is traceable, and every call is written up by hand afterwards by whoever took it, which is the promise the whole thing rests on.\n\nConstance Bawa had been volunteer director for eleven years. She was found in the office at seven in the morning when the day pair came in.\n\nYou did four years on that line before you moved away, and she trained you.',
  },

  threads: [
    // -------------------------------------------------------------- t-connie
    {
      id: 't-connie',
      title: 'Connie',
      participantIds: ['you', 'connie'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'c1',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 200,
          body: 'Are you awake, or are you a person with a normal job now. I have a thing and I would like to say it to somebody who did the training.',
        },
        {
          id: 'c2',
          threadId: 't-connie',
          senderId: 'you',
          sentAt: 208,
          body: 'go on',
        },
        {
          id: 'c3',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 220,
          body: 'A caller rang the office line last week to say thank you. Not the line. The office line, in the daytime, asking for a volunteer by first name.',
        },
        {
          id: 'c4',
          threadId: 't-connie',
          senderId: 'you',
          sentAt: 226,
          body: 'oh no',
        },
        {
          id: 'c5',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 240,
          body: 'She had his mobile number. She has had it for two years. She thought I would be pleased and she could not understand why I had gone quiet.',
        },
        {
          id: 'c6',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 252,
          body: 'It is Alun. Twenty-two years, two overnights a week, the best listener I have ever put on that line, and he has been giving people his number since about 2011 as far as I can work out.',
        },
        {
          id: 'c7',
          threadId: 't-connie',
          senderId: 'you',
          sentAt: 260,
          body: 'why would he',
        },
        {
          id: 'c8',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 276,
          body: 'Because at the end of a call you put the phone down and you do not find out. That is the job and it is the hardest part of the job and everybody who has ever done it has stood in that kitchen at four in the morning wanting to know.',
        },
        {
          id: 'c9',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 284,
          body: 'He wanted to know. So he stopped putting the phone down.',
        },
        {
          id: 'c10',
          threadId: 't-connie',
          senderId: 'you',
          sentAt: 292,
          body: 'you have to take it to the trustees',
        },
        {
          id: 'c11',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 308,
          body: 'I do, and it will finish him, and Prem will have to write to every caller we can identify, and there are people out there who will find out that the person they trusted was not doing it the way it was promised to them. That is the bit that keeps me up.',
        },
        {
          id: 'c12',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 316,
          body: 'I am on the Thursday overnight with him. I am going to say it to his face first, in the office, before I write anything down.',
        },
        {
          id: 'c13',
          threadId: 't-connie',
          senderId: 'connie',
          sentAt: 1385,
          body: 'In. Yusuf is on with us, poor lad, three weeks off his training. I will do it about two when the phones go quiet.',
          claims: [
            {
              id: 'c-connie-kitchen',
              subject: 'connie',
              assertedBy: 'connie',
              predicate: { kind: 'at_place', placeId: 'kitchen' },
              window: { start: 1380, end: 1420 },
              sourceMessageId: 'c13',
              label: 'Connie: in the kitchen, 23:00–23:40',
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------------- t-branch
    {
      id: 't-branch',
      title: 'Beacon volunteers',
      participantIds: ['you', 'prem', 'alun', 'sunny'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'b1',
          threadId: 't-branch',
          senderId: 'prem',
          sentAt: 2400,
          body: 'All volunteers. Connie died at the branch during Thursday night. The day pair found her in the office at seven. The line is suspended until Monday and the trustees are meeting tomorrow.',
        },
        {
          id: 'b2',
          threadId: 't-branch',
          senderId: 'prem',
          sentAt: 2404,
          body: 'Nobody is to speak to anybody about branch business. That is not me being difficult, it is the only rule that has ever mattered here.',
        },
        {
          id: 'b3',
          threadId: 't-branch',
          senderId: 'alun',
          sentAt: 2418,
          body: 'Eleven years she ran this branch and she knew every one of our names and which of us she had to ring on a bad Sunday... I do not have anything better than that to say.',
        },
        {
          id: 'b4',
          threadId: 't-branch',
          senderId: 'alun',
          sentAt: 2426,
          body: 'I was on the phones. Ten past two until twenty to four, one call, and it was not an easy one. It is in the book.',
          claims: [
            {
              id: 'c-alun-oncall',
              subject: 'alun',
              assertedBy: 'alun',
              predicate: {
                kind: 'doing',
                actionId: 'on_a_ninety_minute_call',
                exclusiveGroup: 'alun-shift',
              },
              window: { start: 1570, end: 1660 },
              sourceMessageId: 'b4',
              label: 'Alun: on a call, 02:10–03:40',
            },
          ],
        },
        {
          id: 'b5',
          threadId: 't-branch',
          senderId: 'alun',
          sentAt: 2428,
          body: 'In the call room the whole shift, both of us, headsets on. That is why neither of us heard anything, and I have been sitting with that since Friday.',
          claims: [
            {
              id: 'c-alun-callroom',
              subject: 'alun',
              assertedBy: 'alun',
              predicate: { kind: 'at_place', placeId: 'callroom' },
              window: { start: 1560, end: 1680 },
              sourceMessageId: 'b5',
              label: 'Alun: in the call room, 02:00–04:00',
            },
          ],
        },
        {
          id: 'b6',
          threadId: 't-branch',
          senderId: 'sunny',
          sentAt: 2440,
          body: 'I want to say now, before somebody says it for me, that I have not been in that building since the third and I handed my fob to Prem myself.',
        },
        {
          id: 'b7',
          threadId: 't-branch',
          senderId: 'alun',
          sentAt: 2448,
          body: 'Nobody said anything about you, Sunny... although I did think I heard somebody on the back stairs about half two, and I did wonder.',
          claims: [
            {
              id: 'c-sunny-branch',
              subject: 'sunny',
              assertedBy: 'alun',
              predicate: { kind: 'at_place', placeId: 'branch' },
              window: { start: 1560, end: 1620 },
              sourceMessageId: 'b7',
              label: 'Sunny: at the branch, 02:00–03:00 (per Alun)',
            },
          ],
        },
        {
          id: 'b8',
          threadId: 't-branch',
          senderId: 'sunny',
          sentAt: 2454,
          body: 'Say it properly or do not say it at all. That is the whole training and you have had twenty-two years of it.',
        },
        {
          id: 'b9',
          threadId: 't-branch',
          senderId: 'prem',
          sentAt: 2462,
          body: 'Enough. Both of you. To me, not to forty people.',
        },
      ],
    },

    // --------------------------------------------------------------- t-yusuf
    {
      id: 't-yusuf',
      title: 'Yusuf',
      participantIds: ['you', 'yusuf'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'y1',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2600,
          body: 'It was my fourth shift. I have done four shifts. I keep saying that to people as if it explains something.',
        },
        {
          id: 'y2',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2608,
          body: 'I was in the call room from two until four. I did not take a single call the whole night, which they tell you happens and which nobody prepares you for.',
          claims: [
            {
              id: 'c-yusuf-callroom',
              subject: 'yusuf',
              assertedBy: 'yusuf',
              predicate: { kind: 'at_place', placeId: 'callroom' },
              window: { start: 1560, end: 1680 },
              sourceMessageId: 'y2',
              label: 'Yusuf: in the call room, 02:00–04:00',
            },
          ],
        },
        {
          id: 'y3',
          threadId: 't-yusuf',
          senderId: 'you',
          sentAt: 2614,
          body: 'was alun on a call',
        },
        {
          id: 'y4',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2630,
          body: 'There is a board on the wall with four lamps, one per line. When a line is engaged the lamp is lit. It is from about 1990 and it is the only thing in that room that tells you anything.',
        },
        {
          id: 'y5',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2634,
          body: 'No lamp was lit between about half two and half three. I know because I sat and looked at four unlit lamps for an hour thinking this is what I have joined.',
          claims: [
            {
              id: 'c-alun-offphones',
              subject: 'alun',
              assertedBy: 'yusuf',
              predicate: {
                kind: 'doing',
                actionId: 'off_the_phones',
                exclusiveGroup: 'alun-shift',
              },
              window: { start: 1580, end: 1640 },
              sourceMessageId: 'y5',
              label: 'Alun: off the phones, 02:20–03:20 (per Yusuf)',
            },
          ],
        },
        {
          id: 'y6',
          threadId: 't-yusuf',
          senderId: 'you',
          sentAt: 2642,
          body: 'where was he',
        },
        {
          id: 'y7',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2656,
          body: 'He went through to the office at about half two. I saw him go and I did not see him come back for a while and I did not think anything of it, because he has done this twenty-two years and I have done it four times.',
          claims: [
            {
              id: 'c-alun-office',
              subject: 'alun',
              assertedBy: 'yusuf',
              predicate: { kind: 'at_place', placeId: 'office' },
              window: { start: 1590, end: 1610 },
              sourceMessageId: 'y7',
              label: 'Alun: in the office, 02:30–02:50 (per Yusuf)',
            },
          ],
        },
        {
          id: 'y8',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2664,
          body: 'Connie was in that office from midnight. She does the rota and the returns in there and she had the door open, which she always does so people will come in.',
          claims: [
            {
              id: 'c-connie-office',
              subject: 'connie',
              assertedBy: 'yusuf',
              predicate: { kind: 'at_place', placeId: 'office' },
              window: { start: 1440, end: 1620 },
              sourceMessageId: 'y8',
              label: 'Connie: in the office, 00:00–03:00 (per Yusuf)',
            },
          ],
        },
        {
          id: 'y9',
          threadId: 't-yusuf',
          senderId: 'yusuf',
          sentAt: 2678,
          body: 'Talk to Sunny Halvorsen. Everybody has decided she is difficult and she is the only person at that branch who says the actual thing out loud.',
        },
      ],
    },

    // ------------------------------------------------ t-sunny (discovery)
    {
      id: 't-sunny',
      title: 'Sunny',
      participantIds: ['you', 'sunny'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['y9'],
      messages: [
        {
          id: 's1',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2800,
          body: 'I raised a safeguarding concern in January and I was asked to step back in March, and those two facts have been allowed to sit next to each other for five months without anybody joining them up.',
        },
        {
          id: 's2',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2806,
          body: 'The concern was about a volunteer keeping contact with a caller. I did not have a name. I had a pattern and a bad feeling and no name, so it went nowhere, correctly.',
        },
        {
          id: 's3',
          threadId: 't-sunny',
          senderId: 'you',
          sentAt: 2814,
          body: 'where were you thursday',
        },
        {
          id: 's4',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2822,
          body: 'In my flat, with my dog, watching four episodes of something Danish. Nobody can confirm that and I am not going to pretend somebody can.',
          claims: [
            {
              id: 'c-sunny-home',
              subject: 'sunny',
              assertedBy: 'sunny',
              predicate: { kind: 'at_place', placeId: 'sunnyhome' },
              window: { start: 1500, end: 1680 },
              sourceMessageId: 's4',
              label: 'Sunny: at her flat, 01:00–04:00',
            },
          ],
        },
        {
          id: 's5',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2830,
          body: 'What I can prove is that I gave my fob to Prem on the third of March in front of two people, and that door does not open without one, and the panel writes down every single time it does.',
        },
        {
          id: 's6',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2842,
          body: 'So when Alun Meredith says he heard somebody on the back stairs, he is either wrong or he is telling you where he was, and I would very much like somebody to ask him which.',
        },
        {
          id: 's7',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2856,
          body: 'And I liked him. That is the thing I cannot get anybody to hear. I have sat in that kitchen with that man at four in the morning and he is the kindest person on that rota.',
        },
        {
          id: 's8',
          threadId: 't-sunny',
          senderId: 'sunny',
          sentAt: 2864,
          body: 'Ask Prem for the panel. He has had it since Friday and he is a trustee and he is frightened of what it says.',
        },
      ],
    },

    // -------------------------------------------------------- t-prem (gated)
    {
      id: 't-prem',
      title: 'Prem Chandrasekaran',
      participantIds: ['you', 'prem'],
      requiresContradictionIds: ['x-alun-office', 'x-alun-call'],
      messages: [
        {
          id: 'p1',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3000,
          body: 'I have been a trustee for nine years and my entire job has been to protect the promise that nothing said on that line goes anywhere. I have spent this week doing the opposite and I am aware of it every hour.',
        },
        {
          id: 'p2',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3010,
          body: 'The duty book has one call for Alun on Thursday. 02:10 to 03:40, ninety minutes, written up in his hand with three lines of summary, which is exactly what a long call looks like.',
        },
        {
          id: 'p3',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3016,
          body: 'The telecoms bill came Wednesday. It does not say who rang or what was said, because it cannot. It says how many minutes each line carried, and on Thursday between two and four, all four lines carried nothing at all.',
        },
        {
          id: 'p4',
          threadId: 't-prem',
          senderId: 'you',
          sentAt: 3024,
          body: 'the door panel',
        },
        {
          id: 'p5',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3038,
          body: 'The back stairs door is alarmed between eleven and six and every open is written down with a fob number. There is one open on Thursday night. 02:55, Alun Meredith’s fob, and a close at 03:05.',
          claims: [
            {
              id: 'c-alun-backstairs',
              subject: 'alun',
              assertedBy: 'prem',
              predicate: { kind: 'at_place', placeId: 'backstairs' },
              window: { start: 1615, end: 1625 },
              sourceMessageId: 'p5',
              label: 'Alun: on the back stairs, 02:55–03:05 (alarm panel)',
            },
          ],
        },
        {
          id: 'p6',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3044,
          body: 'Sunniva Halvorsen’s fob was deactivated on the third of March and has not opened anything since. I did it myself and I have the form.',
        },
        {
          id: 'p7',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3058,
          body: 'Connie came to me on the Monday about Alun and the numbers. She had two names and a date going back to 2011 and she was going to bring it to the board on the fourteenth.',
        },
        {
          id: 'p8',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3066,
          body: 'She was not angry with him. I want that recorded somewhere by somebody. She sat where you are sitting and she said, Prem, he did it because he could not bear not knowing, and that is not a defence and I am going to have to do it anyway.',
        },
        {
          id: 'p9',
          threadId: 't-prem',
          senderId: 'prem',
          sentAt: 3080,
          body: 'Twenty-two years. Two overnights a week. Work out what that is in hours some time, and then work out what it would take to lose it.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-numbers',
      characterId: 'alun',
      summary:
        'He had been giving callers his personal number since about 2011, because at the end of a call you put the phone down and never find out. Connie had two names and a date and was taking it to the board on the fourteenth, which would have finished him.',
      establishedByMessageIds: ['c6', 'p7'],
    },
  ],

  contradictions: [
    {
      id: 'x-alun-office',
      claimIdA: 'c-alun-callroom',
      claimIdB: 'c-alun-office',
      revelation:
        'He put both of them in the call room with headsets on for the whole shift, which is why neither of them heard anything. Yusuf Kaya watched him go through to the office at about half two on his fourth ever shift, and did not think anything of it, because Alun has done this twenty-two years and Yusuf had done it four times.',
    },
    {
      id: 'x-alun-call',
      claimIdA: 'c-alun-oncall',
      claimIdB: 'c-alun-offphones',
      revelation:
        'The duty book has ninety minutes in his own hand with three lines of summary, and nothing on that line is recorded or traceable, which is the promise the whole charity rests on. There is a board on the call room wall with four lamps, one per line, and it is from about 1990. Yusuf sat and looked at four unlit lamps for an hour thinking this is what I have joined.',
    },
    {
      id: 'x-alun-stairs',
      claimIdA: 'c-alun-callroom',
      claimIdB: 'c-alun-backstairs',
      revelation:
        'The back stairs door is alarmed from eleven until six and every open is written down against a fob number. There is exactly one open on Thursday night. His fob, 02:55, closed again at 03:05. He told forty volunteers he thought he had heard somebody on those stairs.',
    },
    {
      id: 'x-sunny-fob',
      claimIdA: 'c-sunny-branch',
      claimIdB: 'c-sunny-home',
      revelation:
        'He put Sunniva Halvorsen in the building in a group of forty people, eight minutes after she said she had not been there since March. She handed her fob to Prem on the third in front of two witnesses, it was deactivated the same day, and that door does not open without one. She had liked him. She had sat in that kitchen with him at four in the morning.',
    },
  ],

  confrontation: {
    opening:
      'You did four years on this line. So you already know the first thing I am going to do is let you talk, and you already know that knowing it does not stop it working.',
    beats: [
      {
        id: 'p-office',
        evidence: { kind: 'contradiction', id: 'x-alun-office' },
        press:
          'You said you were both in the call room all night with headsets on. Yusuf watched you go through to the office at half two.',
        rebuttal:
          'A very frightened young man on his fourth shift, who had just found a woman he liked at the bottom of a step... I would be careful what weight you put on him. He will carry it either way.',
      },
      {
        id: 'p-call',
        evidence: { kind: 'contradiction', id: 'x-alun-call' },
        press:
          'Ninety minutes in the book, in your hand. All four lines carried nothing between two and four, and Yusuf sat looking at four unlit lamps for an hour.',
        rebuttal: 'Lamps fail. That board is older than Yusuf.',
      },
      {
        id: 'p-stairs',
        evidence: { kind: 'contradiction', id: 'x-alun-stairs' },
        press:
          'The back stairs door is alarmed from eleven. One open on Thursday night. Your fob, five to three, closed at five past. And you told forty people you thought you had heard somebody on those stairs.',
        rebuttal: '',
      },
      {
        id: 'p-why',
        evidence: { kind: 'motive', id: 'm-numbers' },
        press:
          'She had two names and a date going back to 2011, and the board met on the fourteenth. She was not angry with you. She told Prem you did it because you could not bear not knowing.',
        rebuttal: '',
      },
    ],
    deflections: [
      'Mm. And what would you want to happen, if that were true?',
      'You are working very hard. I recognise it, because I do it for a living, twice a week, for nothing.',
      'Bring me something that is not a young man remembering a bad night.',
    ],
    confession:
      'She had the door open. She always had the door open, because a shut door in that building means something.\n\nAnd she was kind about it. She said Alun, I know why, and she said it the way you are taught to, which is the way I taught half of them to.\n\nI have listened for twenty-two years and I have never once said what I wanted. That is the discipline. You do not put yourself in the room. And I sat down in that office and I heard her being professional at me, and I understood that I was going to be a case, and that people I have talked to at four in the morning for a decade were going to get a letter.\n\nI do not remember standing up.\n\nThere is one more thing and I am going to say it because it has been the worst part of every day since.\n\nA man who called himself the Keeper rang me at home on the Tuesday. Said he was doing a review of volunteer welfare for the umbrella body, and he wanted to hear how the branch was treating me.\n\nAnd he was good. He was so good. He did the pauses. He did the reflecting back, the exact words I use, the small ones you use to open somebody up without them noticing. He asked me what it would be like, afterwards, and he waited, and he did not fill it.\n\nI knew what he was doing. That is the thing. I have taught that. I sat in my own kitchen and I listened to the Keeper use my own training on me and I let him do it, because it was the first time in twenty-two years that anybody had asked me anything and waited for the answer.\n\nHe never said one word about Connie. Not one. He is very careful and he is one of us, or he was.',
  },

  coda: {
    from: 'Unknown number',
    messages: [
      'Beacon. That one will have cost you something and I am sorry for it, which you may believe or not.',
      'He is right, of course. It is where I learned. Nine years of Thursdays in a room like that one, a long time ago, and nobody has ever asked the question because nobody has ever thought to look for the Keeper by his manner.',
      'You have five now. Age, access, decades, the follow-up, and this. That is enough to find me and we both know it.',
      'I am not going to stop. But I would like you to understand that I have never once had to say the thing myself. Not to any of them. Ask yourself whether that makes it better or worse, because I have been asking for thirty years and I have not got anywhere.',
    ],
  },

  solution: {
    killerId: 'alun',
    requiredContradictionIds: ['x-alun-office', 'x-alun-call', 'x-alun-stairs'],
    requiredMotiveIds: ['m-numbers'],
    epilogue:
      'The trustees wrote to eleven people. Prem Chandrasekaran drafted the letter nine times and the ninth one was two paragraphs, and it did not use the word breach.\n\nFour of the eleven wrote back. Three of those said that the man on the other end had kept them alive, and asked whether they were allowed to say so.\n\nSunniva Halvorsen was invited back onto the rota in the September and declined, and then accepted in the January, and now does the Thursday overnight.\n\nYusuf Kaya has done a hundred and forty shifts. The board on the wall was replaced in the spring with one that logs, and he argued against it at the volunteers’ meeting on the grounds that a room where nothing is written down is the entire point, and he lost, and he was right.',
  },
};
