import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 4 — "Deep Field".
 *
 * Pack 4. Standalone: no Listener, no coda. Per docs/pack-ledger.md the shape of
 * the lie is **which clock** — the station keeps three at once, and the alibi
 * that looks strongest is the one measured in the wrong one.
 *
 * The teaching move: `c-mal-log` exists to be REJECTED. A player pins the log
 * against a witness expecting it to fire, and the engine answers "These describe
 * different times." That rejection is the clue. The log is in UTC and the
 * station runs UTC+3, so the entry everybody treated as his alibi covers three
 * hours after Laura was already dead.
 *
 * Red herring is Erik, and he is the first one seeded from a clue the player
 * already has: he never writes, only voice notes. After Ardnoe and Marchbank
 * that should land badly. He cannot read well, Maria has quietly accommodated it
 * for nine years, and his innocence is provable.
 *
 * Times are station time (UTC+3), minutes since the case epoch.
 */
export const deepFieldRaw = {
  id: 'deep-field',
  title: 'Deep Field',
  blurb:
    'Six people, four months of darkness, and nobody can leave. The alibi is a timestamp, and the timestamp is in the wrong clock.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'orla', name: 'Laura', avatarColor: '#8A7B5C' },
    { id: 'mal', name: 'Mal', avatarColor: '#C4483C' },
    { id: 'rune', name: 'Erik', avatarColor: '#4E8CF0' },
    { id: 'pilar', name: 'Maria', avatarColor: '#E4B363' },
    { id: 'theo', name: 'Theo', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'station', name: 'the station' },
    { id: 'block', name: 'the accommodation block', parentId: 'station' },
    { id: 'mess', name: 'the mess', parentId: 'station' },
    { id: 'surgery', name: 'the surgery', parentId: 'station' },
    { id: 'coldporch', name: 'the cold porch', parentId: 'station' },
    { id: 'outside', name: 'outside' },
    { id: 'telescope', name: 'the instrument platform', parentId: 'outside' },
    { id: 'metmast', name: 'the met mast', parentId: 'outside' },
  ],
  objects: [],

  briefing: {
    victimId: 'orla',
    foundAt: { placeId: 'coldporch', minutes: 1740 },
    causeOfDeath: 'Hypothermia. She went out of the cold porch without her outer layer.',
    ruling:
      'Recorded as misadventure. Nobody can reach the station until October and nobody has asked to.',
    opening:
      'Rothera Ridge keeps three clocks. Station time for the people, UTC for the instruments, and whatever each of them has left running on their own wrist from home.\n\nLaura Byrne was the doctor. She was found in the cold porch at two in the morning with her outer layer still on its hook, and the six of them agreed among themselves that she had gone out to look at the sky and misjudged it. The next aircraft is in October.\n\nYou are her desk officer in Cambridge and the last person she wrote to.',
  },

  threads: [
    // ---------------------------------------------------------------- t-orla
    {
      id: 't-orla',
      title: 'Laura',
      participantIds: ['you', 'orla'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'o1',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1050,
          body: 'day sixty one of no sun. Theo has started giving the potatoes names. I am telling you this so Cambridge has it on file',
        },
        {
          id: 'o2',
          threadId: 't-orla',
          senderId: 'you',
          sentAt: 1058,
          body: 'noted. how are the annuals going',
        },
        {
          id: 'o3',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1066,
          body: 'that is actually why I am up. I have a screen result I do not want to have',
        },
        {
          id: 'o4',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1072,
          body: 'atrial fibrillation, and not a borderline one. On a man who is sixty one and nineteen seasons deep and who has never once been off this continent when he had a choice about it',
          claims: [
            {
              id: 'c-orla-surgery',
              subject: 'orla',
              assertedBy: 'orla',
              predicate: { kind: 'at_place', placeId: 'surgery' },
              window: { start: 1260, end: 1300 },
              sourceMessageId: 'o4',
              label: 'Laura: in the surgery, 21:00–21:40',
            },
          ],
        },
        {
          id: 'o5',
          threadId: 't-orla',
          senderId: 'you',
          sentAt: 1080,
          body: 'protocol is protocol. that is a first flight out',
        },
        {
          id: 'o6',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1090,
          body: 'I know what it is. I wrote the wording twice and deleted it twice and I am going to file it in the morning because there is no version of this where I do not',
        },
        {
          id: 'o7',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1096,
          body: 'he will not get another season. He will not get another anything. He came out in 2007 and he has been back every year and I have watched him get off that plane in October like a man coming home',
        },
        {
          id: 'o8',
          threadId: 't-orla',
          senderId: 'you',
          sentAt: 1102,
          body: 'have you told him',
        },
        {
          id: 'o9',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1110,
          body: 'tonight. I am not going to file something about a man without saying it to his face first, that is the whole job',
        },
        {
          id: 'o10',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1298,
          body: 'told him. he was very calm and very polite and he thanked me, and that was worse than if he had shouted',
        },
        {
          id: 'o11',
          threadId: 't-orla',
          senderId: 'orla',
          sentAt: 1310,
          body: 'going out for ten minutes. it is minus forty one and there is nothing above us but the whole of it. talk tomorrow x',
        },
      ],
    },

    // ------------------------------------------------------------- t-station
    {
      id: 't-station',
      title: 'Rothera Ridge',
      participantIds: ['you', 'pilar', 'mal', 'theo'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'w1',
          threadId: 't-station',
          senderId: 'pilar',
          sentAt: 2000,
          body: 'Cambridge. Laura Byrne died last night. Found in the cold porch at 02:10 station time by Erik. Attempted resuscitation for forty minutes. I am recording it as misadventure and I will send the full report on the morning sked.',
        },
        {
          id: 'w2',
          threadId: 't-station',
          senderId: 'pilar',
          sentAt: 2004,
          body: 'Before anybody asks me: yes I know what six people and four months of dark does to a report like that. I have written it straight anyway.',
        },
        {
          id: 'w3',
          threadId: 't-station',
          senderId: 'theo',
          sentAt: 2016,
          body: 'she went out without her outer. she has told me off for that exact thing. twice. she wrote it on the board in the porch',
        },
        {
          id: 'w4',
          threadId: 't-station',
          senderId: 'mal',
          sentAt: 2030,
          body: 'I was on the platform from quarter to ten until eleven, running the shutdown. I saw nothing and I heard nothing and I am sorry about it, because I was two hundred metres away.',
          claims: [
            {
              id: 'c-mal-telescope',
              subject: 'mal',
              assertedBy: 'mal',
              predicate: { kind: 'at_place', placeId: 'telescope' },
              window: { start: 1305, end: 1380 },
              sourceMessageId: 'w4',
              label: 'Mal: on the instrument platform, 21:45–23:00',
            },
          ],
        },
        {
          id: 'w5',
          threadId: 't-station',
          senderId: 'mal',
          sentAt: 2032,
          body: 'The platform log will have me. It logs an operator every time the dome moves and the dome moved all evening.',
        },
        {
          id: 'w6',
          threadId: 't-station',
          senderId: 'theo',
          sentAt: 2044,
          body: 'mal I saw you in the block at ten past. you came through the corridor and you did not say anything to me',
          claims: [
            {
              id: 'c-mal-block',
              subject: 'mal',
              assertedBy: 'theo',
              predicate: { kind: 'at_place', placeId: 'block' },
              window: { start: 1320, end: 1330 },
              sourceMessageId: 'w6',
              label: 'Mal: in the accommodation block, 22:00–22:10 (per Theo)',
            },
          ],
        },
        {
          id: 'w7',
          threadId: 't-station',
          senderId: 'mal',
          sentAt: 2050,
          body: 'You saw somebody in a red parka in a corridor in the dark. There are four red parkas on this station and one of them is yours.',
        },
        {
          id: 'w8',
          threadId: 't-station',
          senderId: 'mal',
          sentAt: 2058,
          body: 'And while we are doing this, Erik was out at the mast half the evening and nobody has asked him a single question, and I would like to know why that is.',
          claims: [
            {
              id: 'c-rune-outside',
              subject: 'rune',
              assertedBy: 'mal',
              predicate: {
                kind: 'doing',
                actionId: 'out_at_the_met_mast',
                exclusiveGroup: 'rune-evening',
              },
              window: { start: 1320, end: 1340 },
              sourceMessageId: 'w8',
              label: 'Erik: out at the met mast, 22:00–22:20 (per Mal)',
            },
          ],
        },
        {
          id: 'w9',
          threadId: 't-station',
          senderId: 'pilar',
          sentAt: 2066,
          body: 'Enough. Nobody on this station accuses anybody on this station over a radio link with Cambridge listening. Take it to me.',
        },
      ],
    },

    // ---------------------------------------------------------------- t-theo
    {
      id: 't-theo',
      title: 'Theo',
      participantIds: ['you', 'theo'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'h1',
          threadId: 't-theo',
          senderId: 'theo',
          sentAt: 2100,
          body: 'I cooked for her for six months and I have made four hundred meals in that galley and I cannot make one tonight',
        },
        {
          id: 'h2',
          threadId: 't-theo',
          senderId: 'theo',
          sentAt: 2108,
          body: 'I was in the mess from nine until eleven doing the bread for tomorrow. you can see the whole corridor from the mess hatch, that is the only reason I know anything',
          claims: [
            {
              id: 'c-theo-mess',
              subject: 'theo',
              assertedBy: 'theo',
              predicate: { kind: 'at_place', placeId: 'mess' },
              window: { start: 1300, end: 1380 },
              sourceMessageId: 'h2',
              label: 'Theo: in the mess, 21:40–23:00',
            },
          ],
        },
        {
          id: 'h3',
          threadId: 't-theo',
          senderId: 'you',
          sentAt: 2114,
          body: 'when did you last see laura',
        },
        {
          id: 'h4',
          threadId: 't-theo',
          senderId: 'theo',
          sentAt: 2120,
          body: 'quarter past ten, going through the porch. she had her indoor boots on. I have gone over that a hundred times because I saw her indoor boots and I said nothing',
          claims: [
            {
              id: 'c-orla-coldporch',
              subject: 'orla',
              assertedBy: 'theo',
              predicate: { kind: 'at_place', placeId: 'coldporch' },
              window: { start: 1315, end: 1330 },
              sourceMessageId: 'h4',
              label: 'Laura: in the cold porch, 21:55–22:10 (per Theo)',
            },
          ],
        },
        {
          id: 'h5',
          threadId: 't-theo',
          senderId: 'theo',
          sentAt: 2130,
          body: 'and it was Mal in that corridor. I know what the parkas look like. I know what he walks like. nineteen seasons of a man is a shape you learn',
        },
        {
          id: 'h6',
          threadId: 't-theo',
          senderId: 'you',
          sentAt: 2136,
          body: 'he says erik was outside',
        },
        {
          id: 'h7',
          threadId: 't-theo',
          senderId: 'theo',
          sentAt: 2146,
          body: 'Erik was on the radio to the Shackleton for the whole of it. I was stood next to him for ten minutes of it and the ship logs their end. that is not a thing you can be vague about',
          claims: [
            {
              id: 'c-rune-radio',
              subject: 'rune',
              assertedBy: 'theo',
              predicate: {
                kind: 'doing',
                actionId: 'on_the_radio_to_the_ship',
                exclusiveGroup: 'rune-evening',
              },
              window: { start: 1310, end: 1350 },
              sourceMessageId: 'h7',
              label: 'Erik: on the radio to the ship, 21:50–22:30 (per Theo)',
            },
          ],
        },
        {
          id: 'h8',
          threadId: 't-theo',
          senderId: 'theo',
          sentAt: 2154,
          body: 'talk to Erik. he will not type at you, he sends the voice ones. do not make anything of that, everybody here knows why and nobody here mentions it',
        },
      ],
    },

    // -------------------------------------------------- t-rune (discovery)
    {
      id: 't-rune',
      title: 'Erik',
      participantIds: ['you', 'rune'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['h8'],
      messages: [
        {
          id: 'n1',
          threadId: 't-rune',
          senderId: 'rune',
          sentAt: 2200,
          body: '[voice note, 0:41] It was me that found her. Two ten. I had gone for the porch because the door does not seat right in this cold and I check it last thing. I am not going to describe how she was.',
        },
        {
          id: 'n2',
          threadId: 't-rune',
          senderId: 'rune',
          sentAt: 2206,
          body: '[voice note, 0:19] I do these because I do not read well and I have never got on with the typing. Maria has known nine years. It is not a secret, it is only tiring.',
        },
        {
          id: 'n3',
          threadId: 't-rune',
          senderId: 'you',
          sentAt: 2212,
          body: 'mal says you were at the mast',
        },
        {
          id: 'n4',
          threadId: 't-rune',
          senderId: 'rune',
          sentAt: 2224,
          body: '[voice note, 1:02] I was on the set to the Shackleton from ten to ten until half past. Forty minutes about a fuel transfer that is not going to happen until December. Their radio room logs every call at their end and Cambridge can ask them tonight, so please do ask them, I would rather you did.',
        },
        {
          id: 'n5',
          threadId: 't-rune',
          senderId: 'rune',
          sentAt: 2232,
          body: '[voice note, 0:33] He has said the mast because the mast is the only place on this station nobody can see. He is not stupid. That is the thing about him, he has never once been stupid.',
        },
        {
          id: 'n6',
          threadId: 't-rune',
          senderId: 'rune',
          sentAt: 2244,
          body: '[voice note, 0:28] Ask Maria about the platform log. Ask her which clock it keeps. I have said it to her twice and she has gone quiet at me twice, and I am a mechanic, so what would I know.',
        },
      ],
    },

    // ------------------------------------------------------ t-pilar (gated)
    {
      id: 't-pilar',
      title: 'Maria Otxoa',
      participantIds: ['you', 'pilar'],
      requiresContradictionIds: ['x-mal-block', 'x-mal-porch'],
      messages: [
        {
          id: 'p1',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2400,
          body: 'I have six people and one hundred and eleven days. Whatever I say to you now, I still have to feed them all breakfast together in the morning. I want that on the record before the rest of it.',
        },
        {
          id: 'p2',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2406,
          body: 'Erik is right about the log and I have been slow because I did not want him to be. The platform log writes in UTC. It has written in UTC since the instrument went in, because the instrument belongs to a consortium in Boulder and Boulder does not care what time it is here.',
        },
        {
          id: 'p3',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2408,
          body: 'Station time is UTC plus three. So the entry that has him at the dome from 21:45 has him there from a quarter to one in the morning, station. Three hours after Theo watched her go through that porch.',
          claims: [
            {
              id: 'c-mal-log',
              subject: 'mal',
              assertedBy: 'pilar',
              predicate: { kind: 'at_place', placeId: 'telescope' },
              window: { start: 1485, end: 1530 },
              sourceMessageId: 'p3',
              label: 'Mal: at the dome, 00:45–01:30 (platform log, converted)',
            },
          ],
        },
        {
          id: 'p4',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2412,
          body: 'The log is not his alibi. The log is a record of where he went afterwards.',
        },
        {
          id: 'p5',
          threadId: 't-pilar',
          senderId: 'you',
          sentAt: 2420,
          body: 'the surgery',
        },
        {
          id: 'p6',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2430,
          body: 'Card access. His card opened the surgery at 22:35 and again at 22:44. Laura was already in that porch by then. He had no clinical reason to be in that room at any hour and he has never had one in nineteen seasons.',
          claims: [
            {
              id: 'c-mal-surgery',
              subject: 'mal',
              assertedBy: 'pilar',
              predicate: { kind: 'at_place', placeId: 'surgery' },
              window: { start: 1355, end: 1370 },
              sourceMessageId: 'p6',
              label: 'Mal: in the surgery, 22:35–22:50 (card access)',
            },
          ],
        },
        {
          id: 'p7',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2438,
          body: 'Her screen file is not on the system. The paper copy is not in the drawer. I have looked twice and I have had Theo look once so that it is not only me saying it.',
        },
        {
          id: 'p8',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2450,
          body: 'She told me on the Tuesday what she had found and what she was going to have to do about it. She asked me whether nineteen seasons bought a man anything. I said no. I have thought about that answer every hour since.',
        },
        {
          id: 'p9',
          threadId: 't-pilar',
          senderId: 'pilar',
          sentAt: 2458,
          body: 'And I was in the block from half nine to midnight with my door open, doing the resupply spreadsheet, which is the least useful alibi anybody has ever had.',
          claims: [
            {
              id: 'c-pilar-block',
              subject: 'pilar',
              assertedBy: 'pilar',
              predicate: { kind: 'at_place', placeId: 'block' },
              window: { start: 1290, end: 1440 },
              sourceMessageId: 'p9',
              label: 'Maria: in the accommodation block, 21:30–24:00',
            },
          ],
        },
      ],
    },

    // ----------------------------------------------------------- t-porch
    {
      id: 't-porch',
      title: 'Cold porch camera',
      participantIds: ['you', 'theo'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['h4'],
      messages: [
        {
          id: 'v1',
          threadId: 't-porch',
          senderId: 'theo',
          sentAt: 2300,
          body: 'there is a camera in the porch. it is for the door seal, it points at the hinge, it is not a security thing and it does not record sound',
        },
        {
          id: 'v2',
          threadId: 't-porch',
          senderId: 'theo',
          sentAt: 2306,
          body: 'twenty two eleven. someone comes into frame from the corridor side, stands at the hooks for eleven seconds, and goes out through the outer door after her. you cannot see a face. you can see a sleeve',
          claims: [
            {
              id: 'c-mal-coldporch',
              subject: 'mal',
              assertedBy: 'theo',
              predicate: { kind: 'at_place', placeId: 'coldporch' },
              window: { start: 1330, end: 1345 },
              sourceMessageId: 'v2',
              label: 'Mal: in the cold porch, 22:10–22:25 (camera)',
            },
          ],
        },
        {
          id: 'v3',
          threadId: 't-porch',
          senderId: 'theo',
          sentAt: 2312,
          body: 'the sleeve has the cuff tear. Mal did that cuff on the winch in April and refused a new parka because he has had that one since 2011',
        },
        {
          id: 'v4',
          threadId: 't-porch',
          senderId: 'you',
          sentAt: 2320,
          body: 'why has nobody looked at this before',
        },
        {
          id: 'v5',
          threadId: 't-porch',
          senderId: 'theo',
          sentAt: 2328,
          body: 'because it is a door seal camera and it writes over itself every ten days and none of us thought of it as a thing that watches people. it watched a person',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-medevac',
      characterId: 'mal',
      summary:
        'Laura had found atrial fibrillation on his annual screen. Protocol is medical evacuation on the first flight, and at sixty one and nineteen seasons there would not have been a twentieth.',
      establishedByMessageIds: ['o4', 'p8'],
    },
  ],

  contradictions: [
    {
      id: 'x-mal-block',
      claimIdA: 'c-mal-telescope',
      claimIdB: 'c-mal-block',
      revelation:
        'He put himself two hundred metres away on the platform from quarter to ten. Theo watched him come through the accommodation corridor at ten past, from a mess hatch that sees the whole length of it, and knew him by how he walks.',
    },
    {
      id: 'x-mal-porch',
      claimIdA: 'c-mal-telescope',
      claimIdB: 'c-mal-coldporch',
      revelation:
        'The door seal camera points at a hinge and nobody ever thought of it as a thing that watches people. At 22:11 a sleeve with a torn cuff stands at the hooks for eleven seconds and then goes out through the outer door after her. He did that cuff on the winch in April and would not take a new parka.',
    },
    {
      id: 'x-mal-surgery',
      claimIdA: 'c-mal-telescope',
      claimIdB: 'c-mal-surgery',
      revelation:
        'His card opened the surgery at 22:35 and again at 22:44, while he says he was still on the platform and while Laura was already in that porch. Her screen file is not on the system and the paper copy is not in the drawer, and in nineteen seasons he has never had a clinical reason to be in that room.',
    },
    {
      id: 'x-rune-mast',
      claimIdA: 'c-rune-outside',
      claimIdB: 'c-rune-radio',
      revelation:
        'Erik was on the set to the Shackleton for forty minutes about a fuel transfer that will not happen until December, and the ship logs their end of every call. Mal put him at the met mast because the met mast is the only place on that station nobody can see, and because a man who answers in voice notes is the easiest man on the ice to make strange.',
    },
  ],

  confrontation: {
    opening:
      'Nineteen seasons. I have buried two people off this station and carried one of them myself, and now it is a radio link and somebody in Cambridge. Go on.',
    beats: [
      {
        id: 'f-block',
        evidence: { kind: 'contradiction', id: 'x-mal-block' },
        press:
          'You put yourself on the platform from quarter to ten. Theo watched you come down the accommodation corridor at ten past and knew you by how you walk.',
        rebuttal:
          'Theo has been in the dark for sixty one days and there are four red parkas on this station. He wants it to be somebody. Everybody down here wants it to be somebody by now.',
      },
      {
        id: 'f-porch',
        evidence: { kind: 'contradiction', id: 'x-mal-porch' },
        press:
          'The porch camera has a sleeve at the hooks at 22:11, eleven seconds, and then out through the outer door after her. The cuff is torn. You did that on the winch in April and you would not take a new parka.',
        rebuttal:
          'A cuff. In a building where we all wear the same thing and lend it to each other every day of the winter.',
      },
      {
        id: 'f-surgery',
        evidence: { kind: 'contradiction', id: 'x-mal-surgery' },
        press:
          'Your card opened the surgery at 22:35 and again at 22:44. Her screen file is gone from the system and the paper copy is gone from the drawer, and you have never once had a reason to be in that room.',
        rebuttal: '',
      },
      {
        id: 'f-why',
        evidence: { kind: 'motive', id: 'm-medevac' },
        press:
          'She found atrial fibrillation on your annual and she was going to file it in the morning. First flight out, and no twentieth season.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is Cambridge talking. Cambridge has never been here in the dark.',
      'Bring me a thing and not an impression of a thing.',
      'You are eleven thousand miles away and you are very sure.',
    ],
    confession:
      'She came and told me herself. She did not have to do that. She could have filed it and let me find out in October when the plane came and there was a seat on it with my name.\n\nI thanked her. I have gone back over that and I did thank her, and I meant it at the time.\n\nThen I sat on the edge of the bunk for about an hour and worked out what the rest of it was. A flat in Dunfermline. A chair. A television that is on in the afternoon. Nineteen years of the only thing I have ever been any use at, finished, because of a rhythm.\n\nShe went out to look at the sky. She did that most nights. I went after her and I did not plan one thing about it, and I want that understood because it is not an excuse, it is only what happened.\n\nShe had her indoor boots on. I put her outer layer back on the hook. That is the part I did decide, and I did it in about four seconds, and it is the four seconds that make it what it is.',
  },

  solution: {
    killerId: 'mal',
    requiredContradictionIds: ['x-mal-block', 'x-mal-porch', 'x-mal-surgery'],
    requiredMotiveIds: ['m-medevac'],
    epilogue:
      'The station finished the winter. There was no other option and there was no other place to put him, so for one hundred and eleven days six people ate breakfast together and five of them knew.\n\nMaria Otxoa wrote a twelve page report and did not soften a line of it, and then cooked with Theo every night until October because Theo could not do it alone any more.\n\nErik Sandved gave his account in eleven voice notes. The transcription clerk in Cambridge said afterwards it was the clearest witness statement she had ever taken down, and asked whether he was a writer.\n\nLaura Byrne’s screen file was never recovered. The arrhythmia was confirmed at Rothera in the October medical, by a doctor who had flown in that morning and had never met either of them.',
  },
};
