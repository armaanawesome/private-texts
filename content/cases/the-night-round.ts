/**
 * Case 3 — "The Night Round".
 *
 * Pack 3, and the **first arc connection**. Per docs/arc-design.md the reveal
 * happens only in the confrontation, after the case is already solved: the
 * caller knew Ivy’s prognosis, which was in no record Ali could reach.
 *
 * Shape of the lie, per docs/pack-ledger.md: **routine**. A round signed for and
 * never walked, which is why nobody looked in on Ivy for ten hours. Axis is
 * action plus discovery, deliberately not the object axis Pack 2 leaned on.
 *
 * The red herring is Margo, who is genuinely guilty of something. Falsifying a
 * night round is a sackable offence and she did it, and it is not murder, and
 * the player can prove both.
 *
 * Times are minutes since the case epoch. Ivy dies between 23:00 and midnight.
 */
export const theNightRoundRaw = {
  id: 'the-night-round',
  title: 'The Night Round',
  blurb:
    'A signature in the night book says somebody looked in on her at eleven. Nobody did.',
  // Free, and the last free case. It carries the first arc connection, so the
  // paywall lands the moment the floor moves rather than after a full stop.
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'ivy', name: 'Ivy', avatarColor: '#8A7B5C' },
    { id: 'fen', name: 'Ali', avatarColor: '#C4483C' },
    { id: 'margo', name: 'Margo', avatarColor: '#4E8CF0' },
    { id: 'teddy', name: 'Teddy', avatarColor: '#6E5AA8' },
    { id: 'saoirse', name: 'Claire', avatarColor: '#E4B363' },
  ],
  places: [
    { id: 'marchbank', name: 'Marchbank House' },
    { id: 'ivyroom', name: 'Ivy’s room', parentId: 'marchbank' },
    { id: 'corridor', name: 'the first floor corridor', parentId: 'marchbank' },
    { id: 'dayroom', name: 'the day room', parentId: 'marchbank' },
    { id: 'desk', name: 'the night desk', parentId: 'marchbank' },
    { id: 'carpark', name: 'the car park', parentId: 'marchbank' },
    { id: 'fenhouse', name: 'Ali’s house' },
  ],
  objects: [],

  briefing: {
    victimId: 'ivy',
    foundAt: { placeId: 'ivyroom', minutes: 1860 },
    causeOfDeath: 'Heart failure. She was eighty-four and had a heart.',
    ruling: 'Recorded as natural causes. No post-mortem requested by the family.',
    opening:
      'Ivy Rennick had been at Marchbank House for three years and complained about it in writing, daily, to anybody who would give her a number.\n\nHer daughter visited on the Tuesday evening and signed out at twenty to ten. The night book says somebody looked in on Ivy at eleven and again at two. She was found at seven in the morning, cold, and the family did not ask for a post-mortem.',
  },

  threads: [
    // ----------------------------------------------------------------- t-ivy
    {
      id: 't-ivy',
      title: 'Ivy',
      participantIds: ['you', 'ivy'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'i1',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1180,
          body: 'The soup was the same soup, dear. I have written it down. Thursday and Tuesday, the same soup, and they call one of them broth.',
        },
        {
          id: 'i2',
          threadId: 't-ivy',
          senderId: 'you',
          sentAt: 1188,
          body: 'you are the only person I know who keeps a soup ledger',
        },
        {
          id: 'i3',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1196,
          body: 'I keep a ledger of everything. It is the only thing left that is mine to keep.',
        },
        {
          id: 'i4',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1244,
          body: 'Alison is coming at seven. She has that voice on the telephone that means she wants me to sign something.',
        },
        {
          id: 'i5',
          threadId: 't-ivy',
          senderId: 'you',
          sentAt: 1250,
          body: 'sign nothing',
        },
        {
          id: 'i6',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1258,
          body: 'I have not signed anything since March and she knows it. That is rather the trouble.',
        },
        {
          id: 'i7',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1262,
          body: 'I am in the day room with Teddy. He is being unkind about the crossword and I am letting him.',
          claims: [
            {
              id: 'c-ivy-dayroom',
              subject: 'ivy',
              assertedBy: 'ivy',
              predicate: { kind: 'at_place', placeId: 'dayroom' },
              window: { start: 1260, end: 1310 },
              sourceMessageId: 'i7',
              label: 'Ivy: in the day room, 21:00–21:50',
            },
          ],
        },
        {
          id: 'i8',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1306,
          body: 'She has gone. She was here fifty minutes and forty of them were about the fees.',
        },
        {
          id: 'i9',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1312,
          body: 'Ring me tomorrow and I will tell you what she asked me for. I want to say it out loud to somebody who is not paid to be here.',
        },
        {
          id: 'i10',
          threadId: 't-ivy',
          senderId: 'you',
          sentAt: 1318,
          body: 'first thing. go to sleep',
        },
      ],
    },

    // ----------------------------------------------------------- t-marchbank
    {
      id: 't-marchbank',
      title: 'Marchbank families',
      participantIds: ['you', 'fen', 'saoirse', 'margo'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'g1',
          threadId: 't-marchbank',
          senderId: 'saoirse',
          sentAt: 2400,
          body: 'This is to let families know that we lost Ivy Rennick in the early hours of Wednesday. Her daughter has been informed and is with us. We will say more when there is more to say.',
        },
        {
          id: 'g2',
          threadId: 't-marchbank',
          senderId: 'margo',
          sentAt: 2412,
          body: 'I am so sorry. She was on my corridor for two years and she never once let me get away with anything!! I will miss her very much',
        },
        {
          id: 'g3',
          threadId: 't-marchbank',
          senderId: 'fen',
          sentAt: 2426,
          body: 'Thank you all. Obviously it was not unexpected at her age. We would rather not have a post mortem and I have said so to the GP, so please nobody suggest it to me again.',
        },
        {
          id: 'g4',
          threadId: 't-marchbank',
          senderId: 'you',
          sentAt: 2434,
          body: 'she texted me at ten past ten. she was fine at ten past ten',
        },
        {
          id: 'g5',
          threadId: 't-marchbank',
          senderId: 'fen',
          sentAt: 2440,
          body: 'She was eighty four. Fine at ten and gone at midnight is exactly what happens, and I would ask you to be careful about the impression you are giving.',
        },
        {
          id: 'g6',
          threadId: 't-marchbank',
          senderId: 'fen',
          sentAt: 2444,
          body: 'I left at twenty to ten. I signed out at twenty to ten. I was home by quarter past and in bed by half ten like every other night of my life.',
          claims: [
            {
              id: 'c-fen-home',
              subject: 'fen',
              assertedBy: 'fen',
              predicate: { kind: 'at_place', placeId: 'fenhouse' },
              window: { start: 1335, end: 1440 },
              sourceMessageId: 'g6',
              label: 'Ali: at home, 22:15–24:00',
            },
          ],
        },
        {
          id: 'g7',
          threadId: 't-marchbank',
          senderId: 'fen',
          sentAt: 2446,
          body: 'Asleep from half ten. My phone is on the landing, it charges on the landing, ask anybody who knows me.',
          claims: [
            {
              id: 'c-fen-asleep',
              subject: 'fen',
              assertedBy: 'fen',
              predicate: {
                kind: 'doing',
                actionId: 'asleep_at_home',
                exclusiveGroup: 'fen-night',
              },
              window: { start: 1350, end: 1440 },
              sourceMessageId: 'g7',
              label: 'Ali: asleep at home, 22:30–24:00',
            },
          ],
        },
        {
          id: 'g8',
          threadId: 't-marchbank',
          senderId: 'saoirse',
          sentAt: 2455,
          body: 'Nobody is suggesting anything. I would ask that we let the family have a week.',
        },
        {
          id: 'g9',
          threadId: 't-marchbank',
          senderId: 'margo',
          sentAt: 2470,
          body: 'Teddy has been asking for you. He will not talk to me about it, he says I am staff. He is in the day room from six every morning if you want him',
        },
      ],
    },

    // --------------------------------------------------------------- t-margo
    {
      id: 't-margo',
      title: 'Margo',
      participantIds: ['you', 'margo'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 't-margo',
          senderId: 'margo',
          sentAt: 2500,
          body: 'You are Ivy’s godson aren’t you. She showed me your photograph about four hundred times, I am not exaggerating!',
        },
        {
          id: 'm2',
          threadId: 't-margo',
          senderId: 'you',
          sentAt: 2506,
          body: 'who checked on her that night',
        },
        {
          id: 'm3',
          threadId: 't-margo',
          senderId: 'margo',
          sentAt: 2514,
          body: 'Me. I do eleven and two on that corridor, it is in the night book with my initials. Eleven and two, every night, fourteen years I have done it',
          claims: [
            {
              id: 'c-margo-round',
              subject: 'margo',
              assertedBy: 'margo',
              predicate: {
                kind: 'doing',
                actionId: 'walked_the_eleven_round',
                exclusiveGroup: 'margo-eleven',
              },
              window: { start: 1380, end: 1400 },
              sourceMessageId: 'm3',
              label: 'Margo: walked the 11pm round, 23:00–23:20',
            },
          ],
        },
        {
          id: 'm4',
          threadId: 't-margo',
          senderId: 'margo',
          sentAt: 2517,
          body: 'She was asleep. That is what I wrote. Asleep, settled, no concerns',
          claims: [
            {
              id: 'c-ivy-room',
              subject: 'ivy',
              assertedBy: 'margo',
              predicate: { kind: 'at_place', placeId: 'ivyroom' },
              window: { start: 1320, end: 1440 },
              sourceMessageId: 'm4',
              label: 'Ivy: in her room, 22:00–24:00 (per Margo)',
            },
          ],
        },
        {
          id: 'm5',
          threadId: 't-margo',
          senderId: 'you',
          sentAt: 2524,
          body: 'did you see anyone else on the corridor',
        },
        {
          id: 'm6',
          threadId: 't-margo',
          senderId: 'margo',
          sentAt: 2540,
          body: 'I heard a car go out of the car park very late. Late enough that I looked up. We get taxis but not at that hour and not that engine, it was a diesel and it turned left',
          claims: [
            {
              id: 'c-fen-driving',
              subject: 'fen',
              assertedBy: 'margo',
              predicate: {
                kind: 'doing',
                actionId: 'driving_away_from_marchbank',
                exclusiveGroup: 'fen-night',
              },
              window: { start: 1405, end: 1425 },
              sourceMessageId: 'm6',
              label: 'Ali: driving away from Marchbank, 23:25–23:45 (per Margo)',
            },
          ],
        },
        {
          id: 'm7',
          threadId: 't-margo',
          senderId: 'you',
          sentAt: 2546,
          body: 'how do you know it was her car',
        },
        {
          id: 'm8',
          threadId: 't-margo',
          senderId: 'margo',
          sentAt: 2554,
          body: 'Because she has been coming three years and I have heard that engine three years. I am not saying it in the group chat and please do not make me. I need this job, I have two at home',
        },
        {
          id: 'm9',
          threadId: 't-margo',
          senderId: 'margo',
          sentAt: 2600,
          body: 'I was in the office doing the medicines book from one until the handover anyway, so I would have heard anything else',
          claims: [
            {
              id: 'c-margo-office',
              subject: 'margo',
              assertedBy: 'margo',
              predicate: { kind: 'at_place', placeId: 'desk' },
              window: { start: 1500, end: 1560 },
              sourceMessageId: 'm9',
              label: 'Margo: at the night desk, 01:00–02:00',
            },
          ],
        },
      ],
    },

    // ------------------------------------------------- t-teddy (discovery)
    {
      id: 't-teddy',
      title: 'Teddy',
      participantIds: ['you', 'teddy'],
      requiresContradictionIds: [],
      // Margo points you at him before he is reachable.
      requiresReadMessageIds: ['g9'],
      messages: [
        {
          id: 't1',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2620,
          body: 'You took your time.',
        },
        {
          id: 't2',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2622,
          body: 'Forty one years a quantity surveyor. I do not sleep and I do not guess at times. If I give you a time it is a time.',
        },
        {
          id: 't3',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2626,
          body: 'Ivy was with me in the day room until ten to ten. Her daughter came and got her and took her up. That is the last of her I saw.',
        },
        {
          id: 't4',
          threadId: 't-teddy',
          senderId: 'you',
          sentAt: 2632,
          body: 'and after that',
        },
        {
          id: 't5',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2640,
          body: 'I sit in the day room doorway at night because my chair is there and my hip is what it is. I can see the desk and the bottom of the stairs. I saw the whole of it.',
          claims: [
            {
              id: 'c-teddy-dayroom',
              subject: 'teddy',
              assertedBy: 'teddy',
              predicate: { kind: 'at_place', placeId: 'dayroom' },
              window: { start: 1380, end: 1470 },
              sourceMessageId: 't5',
              label: 'Teddy: in the day room doorway, 23:00–00:30',
            },
          ],
        },
        {
          id: 't6',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2648,
          body: 'Margo did not go up at eleven. She sat at that desk from five to eleven until twenty past with her phone against her ear and she did not stand up once.',
          claims: [
            {
              id: 'c-margo-desk',
              subject: 'margo',
              assertedBy: 'teddy',
              predicate: {
                kind: 'doing',
                actionId: 'sat_at_the_night_desk',
                exclusiveGroup: 'margo-eleven',
              },
              window: { start: 1380, end: 1395 },
              sourceMessageId: 't6',
              label: 'Margo: sat at the night desk, 23:00–23:15 (per Teddy)',
            },
          ],
        },
        {
          id: 't7',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2652,
          body: 'I am not telling you that to get her sacked. She talks to her mother in Lagos on a Tuesday because of the hours. Everybody here knows it and everybody here lets her.',
        },
        {
          id: 't8',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2660,
          body: 'The daughter came back down the stairs at twenty to twelve. Half eleven she was on that corridor, because I heard Ivy’s door, and Ivy’s door has needed doing for a year.',
          claims: [
            {
              id: 'c-fen-corridor',
              subject: 'fen',
              assertedBy: 'teddy',
              predicate: { kind: 'at_place', placeId: 'corridor' },
              window: { start: 1410, end: 1420 },
              sourceMessageId: 't8',
              label: 'Ali: on the first floor corridor, 23:30–23:40 (per Teddy)',
            },
          ],
        },
        {
          id: 't9',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2668,
          body: 'She did not see me. People do not see me. It is the one advantage of the whole business.',
        },
        {
          id: 't10',
          threadId: 't-teddy',
          senderId: 'teddy',
          sentAt: 2680,
          body: 'Ivy told me in September that they had given her a number. She would not tell me what it was. She said she had not told her daughter and she was not going to, because of what her daughter would do with it.',
        },
      ],
    },

    // ------------------------------------------------- t-saoirse (gated)
    {
      id: 't-saoirse',
      title: 'Claire Nolan',
      participantIds: ['you', 'saoirse'],
      requiresContradictionIds: ['x-fen-corridor', 'x-fen-asleep'],
      messages: [
        {
          id: 's1',
          threadId: 't-saoirse',
          senderId: 'saoirse',
          sentAt: 2800,
          body: 'I am going to tell you some things and I am going to be careful, because I have twenty nine residents and a registration to keep.',
        },
        {
          id: 's2',
          threadId: 't-saoirse',
          senderId: 'saoirse',
          sentAt: 2806,
          body: 'The night book is signed. That is one record. The door fobs are another record and they do not agree, and I did not know that until you made me go and look.',
        },
        {
          id: 's3',
          threadId: 't-saoirse',
          senderId: 'saoirse',
          sentAt: 2810,
          body: 'Alison Reid’s visitor fob opened the car park door outward at 23:47. There is no reading for it before that going in, because the inward door was propped for the laundry all evening, which is a separate conversation I am having with somebody else.',
          claims: [
            {
              id: 'c-fen-carpark',
              subject: 'fen',
              assertedBy: 'saoirse',
              predicate: { kind: 'at_place', placeId: 'carpark' },
              window: { start: 1427, end: 1437 },
              sourceMessageId: 's3',
              label: 'Ali: in the car park, 23:47–23:57 (fob record)',
            },
          ],
        },
        {
          id: 's4',
          threadId: 't-saoirse',
          senderId: 'you',
          sentAt: 2818,
          body: 'the fees',
        },
        {
          id: 's5',
          threadId: 't-saoirse',
          senderId: 'saoirse',
          sentAt: 2830,
          body: 'Three months unpaid. Alison holds power of attorney and has done since 2021. I had written to her twice and the second letter said that if it went to four months I was required to make a safeguarding referral about the finances.',
        },
        {
          id: 's6',
          threadId: 't-saoirse',
          senderId: 'saoirse',
          sentAt: 2834,
          body: 'That letter went out on the Friday. She would have had it on the Monday. Ivy died on the Tuesday night.',
        },
        {
          id: 's7',
          threadId: 't-saoirse',
          senderId: 'saoirse',
          sentAt: 2846,
          body: 'A referral means somebody outside this building looks at three years of that account. I want to be plain that I did not think of it as a motive. I thought of it as a letter.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-attorney',
      characterId: 'fen',
      summary:
        'She has held power of attorney since 2021, the fees were three months unpaid, and a safeguarding referral at four months would have put three years of that account in front of somebody outside the building.',
      establishedByMessageIds: ['i6', 's5'],
    },
  ],

  contradictions: [
    {
      id: 'x-fen-corridor',
      claimIdA: 'c-fen-home',
      claimIdB: 'c-fen-corridor',
      revelation:
        'She signed out at twenty to ten and put herself at home from quarter past. Teddy Balfour sat in the day room doorway with a clear view of the stairs and heard Ivy’s door at half eleven, and that door has needed doing for a year.',
    },
    {
      id: 'x-fen-asleep',
      claimIdA: 'c-fen-asleep',
      claimIdB: 'c-fen-driving',
      revelation:
        'Asleep from half ten, she said, with her phone charging on the landing. Margo heard a diesel engine leave the car park at that hour and turn left, and she has been listening to that engine arrive three years running.',
    },
    {
      id: 'x-fen-carpark',
      claimIdA: 'c-fen-home',
      claimIdB: 'c-fen-carpark',
      revelation:
        'The night book is a signature. The door fob is a machine. Hers opened the car park door outward at 23:47, two hours after she says she was in bed and eleven miles from where she says she was.',
    },
    {
      id: 'x-margo-round',
      claimIdA: 'c-margo-round',
      claimIdB: 'c-margo-desk',
      revelation:
        'Margo signed the eleven o’clock round and did not walk it. She sat at the desk with her phone against her ear, talking to her mother in Lagos, the way she does every Tuesday because of the hours. It is why nobody looked in on Ivy for ten hours. It is a sackable offence and it is not a murder, and every person in that building knew about the Tuesday calls and let her have them.',
    },
  ],

  confrontation: {
    opening:
      'You have been talking to a ninety year old man who sits in a doorway all night and a carer who falsified a record. Obviously I am going to listen, but I want you to hear how it sounds.',
    beats: [
      {
        id: 'r-corridor',
        evidence: { kind: 'contradiction', id: 'x-fen-corridor' },
        press:
          'You signed out at twenty to ten and put yourself at home from quarter past. Teddy heard your mother’s door at half eleven, and that door announces itself.',
        rebuttal:
          'He is ninety one and he sits in the dark. Half the time he is not sure which day it is, and you have built this on him.',
      },
      {
        id: 'r-asleep',
        evidence: { kind: 'contradiction', id: 'x-fen-asleep' },
        press:
          'You said asleep from half ten. Margo heard your car leave that car park and turn left, and she has listened to it arrive every week for three years.',
        rebuttal: 'A diesel. In a town full of them. That is what you have.',
      },
      {
        id: 'r-carpark',
        evidence: { kind: 'contradiction', id: 'x-fen-carpark' },
        press:
          'Then here is one that is not a person. Your fob opened the car park door outward at 23:47. The machine does not sit in a doorway and the machine does not need the job.',
        rebuttal: '',
      },
      {
        id: 'r-why',
        evidence: { kind: 'motive', id: 'm-attorney' },
        press:
          'Three months unpaid, and Claire’s letter said four months meant a safeguarding referral. That letter reached you on the Monday. Your mother died on the Tuesday.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is not a fact, that is a feeling somebody had.',
      'You were not here for any of the three years. You visited.',
      'Bring me something that does not depend on somebody’s memory.',
    ],
    confession:
      'She was awake when I went back up. She always was. She said do not put the light on, and then she said I know what you have been doing, Alison, and she said it kindly, which was the worst of it.\n\nI held the pillow and I counted and she did not fight me for very long. I am not going to describe it better than that. I have had eleven weeks to find a way of saying it that makes it smaller and there is not one.\n\nAnd I want to say the other thing, because you will find it eventually and I would rather it came from me.\n\nA man who called himself the Keeper telephoned me on the Monday night. He said he was from the continuing care team. He knew what the letter said. He knew about the referral, which nobody outside that office knew, and then he told me that my mother had been given eight to fourteen months in September and that she had asked them not to tell the family.\n\nI did not know that. She never told me. He knew it and I did not, and he said it the way you would tell somebody the time.\n\nThen he said: so the money has to last longer than she does, and the letter comes first. And I said what am I supposed to do. And he did not answer for a while. He let me sit in it.\n\nAnd then he said, well. You have thought about it, or you would not have asked me.\n\nHe never told me to do anything. I have gone over it and over it. He never once told me to do anything.',
  },

  coda: {
    from: 'Unknown number',
    messages: [
      'Marchbank, then. You were quicker this time. Six days.',
      'The old surveyor was a piece of luck and you should not congratulate yourself for him. He was going to say it to somebody. The carer you handled properly, and I noticed.',
      'You will want to know how I had the September number. Sit with that one. It is the interesting question and you have not asked it yet.',
      'Different number next time. As ever.',
    ],
  },

  solution: {
    killerId: 'fen',
    requiredContradictionIds: ['x-fen-corridor', 'x-fen-asleep', 'x-fen-carpark'],
    requiredMotiveIds: ['m-attorney'],
    epilogue:
      'The account was looked at in the end. Forty one thousand pounds over three years, and a standing order to a storage unit in Kilmarnock that nobody has ever been able to explain.\n\nMargo Adeyemi was suspended for eleven days over the night book and then quietly reinstated, because Marchbank could not staff the corridor without her and because twenty nine families wrote in. She still does eleven and two. She walks them now.\n\nTeddy Balfour gave his statement in a single sitting, with times, and the officer taking it said afterwards that it was the cleanest account he had ever been given by anybody, of any age.\n\nIvy’s ledger was in the drawer. Three years of it. The last entry was the Tuesday, and it says: Alison, 7pm, wants me to sign. Did not sign.',
  },
};
