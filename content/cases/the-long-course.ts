import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 6 — "The Long Course".
 *
 * Pack 6, and the **second arc connection**. Clue 3 lands in the confession
 * only: the caller talked about a drowning in 2009 as though he had been on the
 * bank for it, including a detail that was never printed anywhere.
 *
 * Shape of the lie, per docs/pack-ledger.md: **identity**. Eight people in one
 * boat in identical kit. Warren photographed the whole race and the photographs
 * prove eight people were in it. They cannot prove which eight.
 *
 * Story Lens: the sport’s own uniformity is the alibi. Nobody had to hide.
 *
 * Race day timeline. Head race starts 11:00 (minute 660), 22 minutes on the
 * water. Hester is found at 12:10.
 */
export const theLongCourseRaw = {
  id: 'the-long-course',
  title: 'The Long Course',
  blurb:
    'Eight people in the same kit, on the water, for twenty-two minutes. The photographs prove eight were in that boat. They cannot prove which eight.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'hester', name: 'Hester', avatarColor: '#8A7B5C' },
    { id: 'saul', name: 'Saul', avatarColor: '#C4483C' },
    { id: 'imo', name: 'Imo', avatarColor: '#6E5AA8' },
    { id: 'warren', name: 'Warren', avatarColor: '#4E8CF0' },
    { id: 'dilys', name: 'Dilys', avatarColor: '#E4B363' },
  ],
  places: [
    { id: 'club', name: 'the club' },
    { id: 'boathouse', name: 'the boathouse', parentId: 'club' },
    { id: 'bank', name: 'the towpath', parentId: 'club' },
    { id: 'slipway', name: 'the slipway', parentId: 'club' },
    { id: 'bar', name: 'the clubhouse bar', parentId: 'club' },
    { id: 'river', name: 'the river' },
  ],
  objects: [],

  briefing: {
    victimId: 'hester',
    foundAt: { placeId: 'boathouse', minutes: 730 },
    causeOfDeath: 'Blunt force. A riggers’ spanner from the rack by the doors.',
    ruling:
      'Open. Nobody has been arrested, because forty-one members were on the towpath and the senior eight were on the water.',
    opening:
      'Hester Vaine had been president of Ravensholt Rowing Club for nineteen years and had signed every set of minutes in the cupboard by hand.\n\nShe was found in the boathouse at ten past twelve on the morning of the autumn head, with the doors open and the racks half empty.\n\nThe senior eight were on the water from eleven until twenty past. Every one of them has the same alibi and every one of them is wearing it.',
  },

  threads: [
    // -------------------------------------------------------------- t-hester
    {
      id: 't-hester',
      title: 'Hester',
      participantIds: ['you', 'hester'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'x1',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 100,
          body: 'You will not remember Dorothy Nance. She came to the club dinner in 2011 and sat through the whole of it and did not eat anything.',
        },
        {
          id: 'x2',
          threadId: 't-hester',
          senderId: 'you',
          sentAt: 108,
          body: 'robbie’s mum',
        },
        {
          id: 'x3',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 116,
          body: 'She died in March and her sister has been clearing the house, and she has sent me a box because my name is on the minutes.',
        },
        {
          id: 'x4',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 124,
          body: 'The launch book for that week is in it. The original, not the one that went to the inquest. They are not the same book and I have had both on this table since Tuesday.',
        },
        {
          id: 'x5',
          threadId: 't-hester',
          senderId: 'you',
          sentAt: 130,
          body: 'different how',
        },
        {
          id: 'x6',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 142,
          body: 'The inquest was told Ken Wardle signed the boats out that morning. Ken had a stroke in 2013 and died in 2016 and could not contradict anybody by then.',
        },
        {
          id: 'x7',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 146,
          body: 'The original has S. Brightwell in the duty column, in his own hand, for the Saturday. He was twenty four and he was the only qualified person on that bank and the river was up two feet.',
        },
        {
          id: 'x8',
          threadId: 't-hester',
          senderId: 'you',
          sentAt: 154,
          body: 'what are you going to do',
        },
        {
          id: 'x9',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 168,
          body: 'Give it to the coroner’s office on the Monday. And tell Saul on the Saturday, before I do, because a man is entitled to hear it from a person and not from a letter.',
        },
        {
          id: 'x10',
          threadId: 't-hester',
          senderId: 'you',
          sentAt: 176,
          body: 'hester do not do that on your own in an empty boathouse',
        },
        {
          id: 'x11',
          threadId: 't-hester',
          senderId: 'hester',
          sentAt: 620,
          body: 'Nine o’clock and the bar is full of parents. I have the book in my bag and I will do it after the senior race when the place is quiet.',
          claims: [
            {
              id: 'c-hester-bar',
              subject: 'hester',
              assertedBy: 'hester',
              predicate: { kind: 'at_place', placeId: 'bar' },
              window: { start: 600, end: 640 },
              sourceMessageId: 'x11',
              label: 'Hester: in the clubhouse bar, 10:00–10:40',
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- t-club
    {
      id: 't-club',
      title: 'Ravensholt RC',
      participantIds: ['you', 'saul', 'warren', 'dilys'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'c1',
          threadId: 't-club',
          senderId: 'dilys',
          sentAt: 1500,
          body: 'Members will by now have heard that Hester was found in the boathouse yesterday afternoon. I am asked to say that the police will want to speak to everybody who was on site and that the club will be closed until further notice. I am sorry to put it so plainly, I do not know a better way.',
        },
        {
          id: 'c2',
          threadId: 't-club',
          senderId: 'warren',
          sentAt: 1512,
          body: 'nineteen years. she taught half of you to feather',
        },
        {
          id: 'c3',
          threadId: 't-club',
          senderId: 'saul',
          sentAt: 1524,
          body: 'For what it is worth to anybody the senior eight were boated at ten fifty and we did not touch the bank again until twenty past eleven. Eight of us. So that is eight people accounted for at least',
          claims: [
            {
              id: 'c-saul-river',
              subject: 'saul',
              assertedBy: 'saul',
              predicate: { kind: 'at_place', placeId: 'river' },
              window: { start: 660, end: 682 },
              sourceMessageId: 'c3',
              label: 'Saul: on the river in the eight, 11:00–11:22',
            },
          ],
        },
        {
          id: 'c4',
          threadId: 't-club',
          senderId: 'warren',
          sentAt: 1530,
          body: 'I filmed the whole race from the bank. bow to stern, both banks, start to finish. police have the card',
        },
        {
          id: 'c5',
          threadId: 't-club',
          senderId: 'saul',
          sentAt: 1538,
          body: 'Then that is that sorted. Warren has eight of us on video for the entire window and Dilys has the towpath',
        },
        {
          id: 'c6',
          threadId: 't-club',
          senderId: 'dilys',
          sentAt: 1550,
          body: 'I was on the towpath from twenty to eleven until nearly midday with the marshalling board, which I am afraid means I saw a great deal of everybody and very little of anything.',
          claims: [
            {
              id: 'c-dilys-bank',
              subject: 'dilys',
              assertedBy: 'dilys',
              predicate: { kind: 'at_place', placeId: 'bank' },
              window: { start: 640, end: 700 },
              sourceMessageId: 'c6',
              label: 'Dilys: on the towpath, 10:40–11:40',
            },
          ],
        },
        {
          id: 'c7',
          threadId: 't-club',
          senderId: 'saul',
          sentAt: 1562,
          body: 'And where was Warren for the middle of it. Because he had a row with Hester at the trestles at half nine that half the club heard',
          claims: [
            {
              id: 'c-warren-boathouse',
              subject: 'warren',
              assertedBy: 'saul',
              predicate: { kind: 'at_place', placeId: 'boathouse' },
              window: { start: 662, end: 678 },
              sourceMessageId: 'c7',
              label: 'Warren: in the boathouse, 11:02–11:18 (per Saul)',
            },
          ],
        },
        {
          id: 'c8',
          threadId: 't-club',
          senderId: 'warren',
          sentAt: 1568,
          body: 'we rowed about a junior trial. that is what we were rowing about. say the rest of it out loud saul',
        },
        {
          id: 'c9',
          threadId: 't-club',
          senderId: 'dilys',
          sentAt: 1580,
          body: 'Not on here. Please.',
        },
      ],
    },

    // --------------------------------------------------------------- t-dilys
    {
      id: 't-dilys',
      title: 'Dilys Prentice',
      participantIds: ['you', 'dilys'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'd1',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1700,
          body: 'You rowed here, did you not. Two seat, and Hester said you had the worst hands she ever bandaged and the best head she ever wasted.',
        },
        {
          id: 'd2',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1712,
          body: 'I stand at the same place every head, at the top of the slipway where the board is, because I cannot manage the walk down to the start any more. It means I see everybody go past twice.',
        },
        {
          id: 'd3',
          threadId: 't-dilys',
          senderId: 'you',
          sentAt: 1720,
          body: 'did you see warren',
        },
        {
          id: 'd4',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1732,
          body: 'Warren Ako was on the towpath the entire race with that camera on a monopod, shouting at a crew who could not hear him, which is the whole of coaching as far as I can tell. He did not move for half an hour.',
          claims: [
            {
              id: 'c-warren-bank',
              subject: 'warren',
              assertedBy: 'dilys',
              predicate: { kind: 'at_place', placeId: 'bank' },
              window: { start: 655, end: 690 },
              sourceMessageId: 'd4',
              label: 'Warren: on the towpath, 10:55–11:30 (per Dilys)',
            },
          ],
        },
        {
          id: 'd5',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1744,
          body: 'And Hester went into the boathouse a little before eleven with her bag, and she did not come out while I was looking, and I was looking at those doors for an hour without once thinking about them.',
          claims: [
            {
              id: 'c-hester-boathouse',
              subject: 'hester',
              assertedBy: 'dilys',
              predicate: { kind: 'at_place', placeId: 'boathouse' },
              window: { start: 650, end: 682 },
              sourceMessageId: 'd5',
              label: 'Hester: in the boathouse, 10:50–11:22 (per Dilys)',
            },
          ],
        },
        {
          id: 'd6',
          threadId: 't-dilys',
          senderId: 'you',
          sentAt: 1750,
          body: 'anyone else go in',
        },
        {
          id: 'd7',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1766,
          body: 'Saul Brightwell, at about three minutes past, in his kit. I remember it because I thought he had gone back for a spanner and I thought no more about it than that, and I have thought about nothing else since.',
          claims: [
            {
              id: 'c-saul-boathouse',
              subject: 'saul',
              assertedBy: 'dilys',
              predicate: { kind: 'at_place', placeId: 'boathouse' },
              window: { start: 663, end: 668 },
              sourceMessageId: 'd7',
              label: 'Saul: in the boathouse, 11:03–11:08 (per Dilys)',
            },
          ],
        },
        {
          id: 'd8',
          threadId: 't-dilys',
          senderId: 'you',
          sentAt: 1772,
          body: 'he says he was in the boat',
        },
        {
          id: 'd9',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1790,
          body: 'Everybody in that crew wears the same suit and the same hat and I am seventy nine. I said as much to the officer and he wrote it down and I could hear him deciding I was no use.',
        },
        {
          id: 'd10',
          threadId: 't-dilys',
          senderId: 'dilys',
          sentAt: 1804,
          body: 'Ask Imogen Kerr. She is a junior and she was in the changing room in senior kit at half past ten, and juniors do not wear senior kit, and she went very red when I said good morning to her.',
        },
      ],
    },

    // -------------------------------------------------- t-imo (discovery)
    {
      id: 't-imo',
      title: 'Imo',
      participantIds: ['you', 'imo'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['d10'],
      messages: [
        {
          id: 'g1',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1900,
          body: 'sorry i didnt reply for ages. sorry. i have been sat looking at this',
        },
        {
          id: 'g2',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1906,
          body: 'i rowed five seat in the senior eight in the head. im nineteen and ive never sat in that boat in my life',
          claims: [
            {
              id: 'c-imo-river',
              subject: 'imo',
              assertedBy: 'imo',
              predicate: { kind: 'at_place', placeId: 'river' },
              window: { start: 660, end: 682 },
              sourceMessageId: 'g2',
              label: 'Imo: on the river in the eight, 11:00–11:22',
            },
          ],
        },
        {
          id: 'g3',
          threadId: 't-imo',
          senderId: 'you',
          sentAt: 1912,
          body: 'who asked you',
        },
        {
          id: 'g4',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1924,
          body: 'saul. at twenty past ten by the trestles. said his back had gone in the warm up and there was no time to scratch the crew and would i just sit in and not make a thing of it',
        },
        {
          id: 'g5',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1928,
          body: 'he gave me his suit and his hat. i said what about the entry and he said dilys does the entries and dilys is seventy nine',
        },
        {
          id: 'g6',
          threadId: 't-imo',
          senderId: 'you',
          sentAt: 1934,
          body: 'and you said yes',
        },
        {
          id: 'g7',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1948,
          body: 'ive wanted to sit in that boat since i was eleven. he knew that. everyone knows that. thats not an excuse im just telling you the actual reason',
        },
        {
          id: 'g8',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1956,
          body: 'and then hester was dead and saul put in the group chat that eight of us were on the water and i realised nobody was going to count us',
        },
        {
          id: 'g9',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1962,
          body: 'he told everyone i was on the bank with the spares. thats the bit that made me sick. hes not just using me hes saying where i was',
          claims: [
            {
              id: 'c-imo-bank',
              subject: 'imo',
              assertedBy: 'saul',
              predicate: { kind: 'at_place', placeId: 'bank' },
              window: { start: 655, end: 685 },
              sourceMessageId: 'g9',
              label: 'Imo: on the towpath with the spares, 10:55–11:25 (per Saul)',
            },
          ],
        },
        {
          id: 'g10',
          threadId: 't-imo',
          senderId: 'imo',
          sentAt: 1974,
          body: 'im going to lose the club arent i. thats the thing i keep getting stuck on and i know how that sounds with her dead',
        },
      ],
    },

    // ------------------------------------------------------ t-warren (gated)
    {
      id: 't-warren',
      title: 'Warren Ako',
      participantIds: ['you', 'warren'],
      requiresContradictionIds: ['x-saul-boathouse', 'x-imo-seat'],
      messages: [
        {
          id: 'w1',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2100,
          body: 'he put me in that boathouse in front of the whole club. forty seconds it took him. i have coached here eleven years',
        },
        {
          id: 'w2',
          threadId: 't-warren',
          senderId: 'you',
          sentAt: 2106,
          body: 'the video',
        },
        {
          id: 'w3',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2118,
          body: 'thirty one minutes continuous. i do not stop it, you cannot stop it, you lose the rate count. and i pan the bank between crews out of habit',
        },
        {
          id: 'w4',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2126,
          body: 'eleven oh eight. i swing off the water for about four seconds and there is a bloke on the slipway in a senior suit with the hat off. its saul. hair, build, the tape on his left wrist he has worn since april',
          claims: [
            {
              id: 'c-saul-slipway',
              subject: 'saul',
              assertedBy: 'warren',
              predicate: { kind: 'at_place', placeId: 'slipway' },
              window: { start: 668, end: 674 },
              sourceMessageId: 'w4',
              label: 'Saul: on the slipway, 11:08–11:14 (on video)',
            },
          ],
        },
        {
          id: 'w5',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2130,
          body: 'four seconds. i have watched it about two hundred times now and the timecode is burned in by the camera, its not something i typed',
        },
        {
          id: 'w6',
          threadId: 't-warren',
          senderId: 'you',
          sentAt: 2138,
          body: 'why did you row with hester',
        },
        {
          id: 'w7',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2152,
          body: 'because i wanted imo in the senior boat for the spring and hester said not while saul is captain of it. i thought she meant imo wasnt ready. she meant something else and she couldnt say it yet',
        },
        {
          id: 'w8',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2164,
          body: 'she asked me in august what year i started. i said 2014. she said good, and she went off, and i thought nothing of it for four months',
        },
        {
          id: 'w9',
          threadId: 't-warren',
          senderId: 'warren',
          sentAt: 2176,
          body: 'i looked up robbie nance last night. fifteen. there is a bench by the start with his name on it and i have been shouting splits over it for eleven years',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-nance',
      characterId: 'saul',
      summary:
        'The original launch book has S. Brightwell in the duty column for the Saturday Robbie Nance drowned in 2009, not the dead coach the inquest was given. Hester had both books on her table and was taking them to the coroner on the Monday.',
      establishedByMessageIds: ['x7', 'w9'],
    },
  ],

  contradictions: [
    {
      id: 'x-saul-boathouse',
      claimIdA: 'c-saul-river',
      claimIdB: 'c-saul-boathouse',
      revelation:
        'He put himself on the water from eleven until twenty past, with seven witnesses in the same boat. Dilys Prentice stood at the top of the slipway for an hour and watched him walk into that boathouse in kit at three minutes past, and thought he had gone back for a spanner.',
    },
    {
      id: 'x-imo-seat',
      claimIdA: 'c-imo-bank',
      claimIdB: 'c-imo-river',
      revelation:
        'He told the club Imogen Kerr was on the towpath with the spares. She was in five seat, in his suit and his hat, because he asked her at twenty past ten by the trestles and she has wanted that seat since she was eleven. Eight people went out in that boat and eight came back. Nobody ever counts which eight.',
    },
    {
      id: 'x-saul-slipway',
      claimIdA: 'c-saul-river',
      claimIdB: 'c-saul-slipway',
      revelation:
        'Warren Ako films the whole thirty one minutes without stopping, because stopping loses the rate count. At 11:08 he swings off the water for four seconds and there is a man on the slipway in a senior suit with the hat off, with tape on his left wrist that has been there since April. The timecode is burned in by the camera.',
    },
    {
      id: 'x-warren-bank',
      claimIdA: 'c-warren-boathouse',
      claimIdB: 'c-warren-bank',
      revelation:
        'Saul put Warren in the boathouse in front of the whole club, in forty seconds, on the strength of a row about a junior trial. Warren did not move off that towpath for half an hour and Dilys watched him not move, and the video he was making is the thing that finishes it.',
    },
  ],

  confrontation: {
    opening:
      'Nineteen years she ran this club and now there is a policeman in her office going through the minute books. Say what you came to say.',
    beats: [
      {
        id: 'l-boathouse',
        evidence: { kind: 'contradiction', id: 'x-saul-boathouse' },
        press:
          'You had yourself on the water from eleven. Dilys watched you walk into that boathouse in kit at three minutes past and thought you had gone back for a spanner.',
        rebuttal:
          'She is seventy nine and every one of us is dressed identically. She has said that herself, to a police officer, in those words.',
      },
      {
        id: 'l-seat',
        evidence: { kind: 'contradiction', id: 'x-imo-seat' },
        press:
          'You told the club Imo was on the bank with the spares. She was in five seat in your suit, because you asked her at the trestles and she has wanted that boat since she was eleven.',
        rebuttal:
          'A junior who sat in a senior crew without an entry and has spent three days working out how not to be thrown out for it. Of course she has a story now.',
      },
      {
        id: 'l-slipway',
        evidence: { kind: 'contradiction', id: 'x-saul-slipway' },
        press:
          'Warren does not stop the camera, because stopping loses the rate count. Eleven oh eight, four seconds, a man on the slipway with the hat off and the tape on his left wrist. The timecode is burned in by the camera.',
        rebuttal: '',
      },
      {
        id: 'l-why',
        evidence: { kind: 'motive', id: 'm-nance' },
        press:
          'And the launch book that came out of Dorothy Nance’s house has your name in the duty column for that Saturday. Not Ken Wardle. Hester had both books on her table and she was going to the coroner on the Monday.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is a club full of people who have known each other thirty years. Everybody has a version.',
      'You have not been down here since you stopped rowing. You do not know what this place is.',
      'Come back when you have something that is not somebody’s eyesight.',
    ],
    confession:
      'The river was up two feet and I sent them out anyway, because we had a trial the following weekend and I was twenty four and I thought a fortnight of not training was the worst thing that could happen to anybody.\n\nRobbie asked me not to go out. On the raft, in front of two other boys. He said the water looks fast and I said the water always looks fast, and he went, because I told him to.\n\nKen Wardle put his name in that column three days later. I did not ask him to. He did it, and he told me he had done it, and I said nothing, and that is my entire defence and it is worth nothing.\n\nShe came into the boathouse to tell me first. She said a man is entitled to hear it from a person. Nineteen years and she still thought that was how you did things.\n\nAnd there is one more thing and I will say it because you will hear it eventually.\n\nA man rang me on the Thursday. He said he was from the coroner’s office, doing a review, and could I confirm some details from 2009. And then he talked about that morning like he had been stood on the bank for it.\n\nHe knew Robbie asked not to go. That was never in the inquest. It was never in the paper. Two boys heard it and neither of them ever said it out loud, I have checked, I checked that year and I have checked since.\n\nHe said it to me like a man reminding me of something we had both been at.\n\nAnd then he asked me what Hester was going to do on Monday. And I told him. I sat in my kitchen and I told a voice on a telephone exactly what she was going to do and exactly when, and he never once told me anything.',
  },

  coda: {
    from: 'Unknown number',
    messages: [
      'Ravensholt. Eight in a boat and nobody counting. That is a good one and I did not see it coming, which does not often happen now.',
      'You were kind to the girl. I noticed that. It cost you two days and I would not have spent them.',
      'Ask yourself how a man reviewing a 2009 inquest knew what was said on a raft by a fifteen year old. Two boys heard it. Neither of them has ever repeated it.',
      'You are getting closer to the wrong question. Keep going anyway.',
    ],
  },

  solution: {
    killerId: 'saul',
    requiredContradictionIds: ['x-saul-boathouse', 'x-imo-seat', 'x-saul-slipway'],
    requiredMotiveIds: ['m-nance'],
    epilogue:
      'The 2009 inquest was reopened in the spring on the strength of a launch book that had spent sixteen years in a box in Dorothy Nance’s spare room.\n\nImogen Kerr was not thrown out. Dilys Prentice went to the committee with a written statement, ran out of it entirely, and finished by saying that the club had asked a nineteen year old to choose between a boat and a man, and that the club could hardly complain about which she chose. Imo rowed five seat for the seniors in the spring, with an entry.\n\nWarren Ako gave the police thirty one unbroken minutes of river and four seconds of slipway.\n\nHester Vaine’s bag was under the trestles the whole time. Both books were still in it. She had put a paper clip on the page and written, in pencil, in the margin: tell Saul first.',
  },
};
