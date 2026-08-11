import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 8 — "Sunday Service".
 *
 * Pack 8. Standalone: no Listener, no coda.
 *
 * Shape of the lie, per docs/pack-ledger.md: **a forged record against a living
 * memory**. A parish register is the most trusted document an English village
 * has, and it is only ink. Jack Tenby is eighty-four and reroofed that church in
 * 1974, and he is the only thing in the county that outranks it.
 *
 * Story Lens: the motive is not money. Cordelia Hale’s name, her house and every
 * room she has ever been welcome in rest on four lines somebody else wrote in
 * 1974, and she has known since she was thirty.
 *
 * The register contradiction sits on a day in March (minutes 288540+) rather
 * than the night of the death, so the pair stays inside one day and the
 * comparison sheet axis stays honest.
 */
export const sundayServiceRaw = {
  id: 'sunday-service',
  title: 'Sunday Service',
  blurb:
    'The register says there was a wedding that August. The man who reroofed the church says there was no roof on it.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'avril', name: 'Avril', avatarColor: '#8A7B5C' },
    { id: 'cordy', name: 'Cordy', avatarColor: '#C4483C' },
    { id: 'ines', name: 'Inés', avatarColor: '#4E8CF0' },
    { id: 'jack', name: 'Jack', avatarColor: '#E4B363' },
    { id: 'petra', name: 'Petra', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'church', name: 'St Ninian’s' },
    { id: 'nave', name: 'the nave', parentId: 'church' },
    { id: 'vestry', name: 'the vestry', parentId: 'church' },
    { id: 'tower', name: 'the tower', parentId: 'church' },
    { id: 'carpark', name: 'the church car park', parentId: 'church' },
    { id: 'cordyhome', name: 'Cordy’s house' },
  ],
  objects: [],

  briefing: {
    victimId: 'avril',
    foundAt: { placeId: 'vestry', minutes: 1290 },
    causeOfDeath: 'A fractured skull. She went down against the corner of the safe.',
    ruling:
      'Recorded as a fall. She was seventy-one, the vestry floor is uneven, and she was alone in a locked church.',
    opening:
      'Avril Dacre had been churchwarden at St Ninian’s for twenty-two years and was three months into scanning four hundred years of parish registers for the diocese, page by page, on a flatbed scanner in the vestry.\n\nShe was found at half nine on a Tuesday night with the 1974 marriage register still open on the desk.\n\nYou run the diocesan record office. She had been emailing you every week since March and you had started looking forward to it.',
  },

  threads: [
    // --------------------------------------------------------------- t-avril
    {
      id: 't-avril',
      title: 'Avril',
      participantIds: ['you', 'avril'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'a1',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 200,
          body: 'Question for the record office. If an entry in a register is in a different ink and a different hand to the entries either side of it, is that a thing you want to know about, or a thing every parish in England has?',
        },
        {
          id: 'a2',
          threadId: 't-avril',
          senderId: 'you',
          sentAt: 212,
          body: 'every parish has some. what has bothered you about this one',
        },
        {
          id: 'a3',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 226,
          body: 'The numbering. Entry 114 is squeezed in above 115 and the ruling of the page has been redrawn under it. Somebody has made room.',
        },
        {
          id: 'a4',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 232,
          body: 'It is a marriage. Third of August 1974. Hale and Sowerby.',
        },
        {
          id: 'a5',
          threadId: 't-avril',
          senderId: 'you',
          sentAt: 240,
          body: 'hale as in cordelia hale',
        },
        {
          id: 'a6',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 254,
          body: 'Her mother and the father she has on every document she owns. Cordelia was born in the November.',
        },
        {
          id: 'a7',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 268,
          body: 'And I have been in this parish my whole life and I could not tell you what is wrong with it, so I asked Jack Tenby, because Jack remembers 1974 better than 1974 does.',
        },
        {
          id: 'a8',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 276,
          body: 'He laughed at me. He said there was no roof on that church in August 1974 because he was on it. Every wedding that summer went over to St Cuthbert’s.',
        },
        {
          id: 'a9',
          threadId: 't-avril',
          senderId: 'you',
          sentAt: 284,
          body: 'avril. do not tell anyone in the village before you tell me',
        },
        {
          id: 'a10',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 300,
          body: 'I have told one person and I am not sorry about it. She has a right to hear it from a friend and not from a letter with a crest on it.',
        },
        {
          id: 'a11',
          threadId: 't-avril',
          senderId: 'avril',
          sentAt: 1130,
          body: 'Scanning tonight. Page 114 goes to you on Monday with the rest of the batch and then it is out of my hands and into yours, thank God.',
          claims: [
            {
              id: 'c-avril-nave',
              subject: 'avril',
              assertedBy: 'avril',
              predicate: { kind: 'at_place', placeId: 'nave' },
              window: { start: 1080, end: 1130 },
              sourceMessageId: 'a11',
              label: 'Avril: in the nave, 18:00–18:50',
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------------- t-parish
    {
      id: 't-parish',
      title: 'St Ninian’s PCC',
      participantIds: ['you', 'ines', 'cordy', 'petra'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'p1',
          threadId: 't-parish',
          senderId: 'ines',
          sentAt: 2400,
          body: 'Dear all. Avril died in the vestry on Tuesday evening. I found her at half past nine when I came back for my phone. The police have been and they are treating it as a fall.',
        },
        {
          id: 'p2',
          threadId: 't-parish',
          senderId: 'ines',
          sentAt: 2404,
          body: 'There will be no service this Sunday. I am not able to do it and I am not going to pretend otherwise.',
        },
        {
          id: 'p3',
          threadId: 't-parish',
          senderId: 'cordy',
          sentAt: 2418,
          body: 'Twenty-two years she gave this church and she died on her own on that floor. I have not slept. I was at home all evening with the radio on and I keep thinking I could have gone down.',
          claims: [
            {
              id: 'c-cordy-home',
              subject: 'cordy',
              assertedBy: 'cordy',
              predicate: { kind: 'at_place', placeId: 'cordyhome' },
              window: { start: 1140, end: 1260 },
              sourceMessageId: 'p3',
              label: 'Cordy: at home, 19:00–21:00',
            },
          ],
        },
        {
          id: 'p4',
          threadId: 't-parish',
          senderId: 'petra',
          sentAt: 2430,
          body: 'I was in the building. I want to say that before somebody else says it for me. I was tuning the swell from seven and I did not know she was in the vestry at all.',
        },
        {
          id: 'p5',
          threadId: 't-parish',
          senderId: 'cordy',
          sentAt: 2440,
          body: 'You were in the nave for most of that evening, Petra. You must have walked past that door six times.',
          claims: [
            {
              id: 'c-petra-nave',
              subject: 'petra',
              assertedBy: 'cordy',
              predicate: { kind: 'at_place', placeId: 'nave' },
              window: { start: 1170, end: 1250 },
              sourceMessageId: 'p5',
              label: 'Petra: in the nave, 19:30–20:50 (per Cordy)',
            },
          ],
        },
        {
          id: 'p6',
          threadId: 't-parish',
          senderId: 'petra',
          sentAt: 2446,
          body: 'That is not true and you know it is not true, and I am not doing this here.',
        },
        {
          id: 'p7',
          threadId: 't-parish',
          senderId: 'ines',
          sentAt: 2458,
          body: 'Nobody is doing this here. Cordy, please.',
        },
      ],
    },

    // --------------------------------------------------------------- t-petra
    {
      id: 't-petra',
      title: 'Petra',
      participantIds: ['you', 'petra'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'e1',
          threadId: 't-petra',
          senderId: 'petra',
          sentAt: 2600,
          body: 'I have been the organist for four years and I am thirty-six and I am not from here, and I have worked out this week that those three facts are one fact.',
        },
        {
          id: 'e2',
          threadId: 't-petra',
          senderId: 'you',
          sentAt: 2606,
          body: 'where were you',
        },
        {
          id: 'e3',
          threadId: 't-petra',
          senderId: 'petra',
          sentAt: 2618,
          body: 'In the tower. From seven until ten past eight, tuning, with the door shut because the door has to be shut or the sound comes back at you.',
        },
        {
          id: 'e4',
          threadId: 't-petra',
          senderId: 'petra',
          sentAt: 2622,
          body: 'And then I could not get out. That door has stuck since March and it is on a list. Jack let me out at ten past eight and he laughed at me for four minutes first.',
        },
        {
          id: 'e5',
          threadId: 't-petra',
          senderId: 'you',
          sentAt: 2630,
          body: 'did you row with avril about the organ fund',
        },
        {
          id: 'e6',
          threadId: 't-petra',
          senderId: 'petra',
          sentAt: 2644,
          body: 'Yes. In front of eleven people at the PCC in January, and I said something about dead wood that I would give a great deal to take back now.',
        },
        {
          id: 'e7',
          threadId: 't-petra',
          senderId: 'petra',
          sentAt: 2652,
          body: 'She rang me the next morning and told me I had been right and rude in the same sentence, and then she got me two thousand pounds out of the fabric fund. That is who she was.',
        },
        {
          id: 'e8',
          threadId: 't-petra',
          senderId: 'petra',
          sentAt: 2664,
          body: 'Ask Jack about the door. Ask Jack about anything, honestly. He is eighty-four and he is the only person in this village who says what he saw instead of what it means.',
        },
      ],
    },

    // ------------------------------------------------- t-jack (discovery)
    {
      id: 't-jack',
      title: 'Jack Tenby',
      participantIds: ['you', 'jack'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['e8'],
      messages: [
        {
          id: 'j1',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2800,
          body: 'I put that roof on in 1974 with my father and my uncle Ted. Started the last week of June, finished the second week of September. Eleven weeks and it rained for six of them.',
        },
        {
          id: 'j2',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2806,
          body: 'There was no wedding in that church in August 1974. There was no anything in that church in August 1974. It was open to the sky and there were pigeons in the chancel.',
        },
        {
          id: 'j3',
          threadId: 't-jack',
          senderId: 'you',
          sentAt: 2812,
          body: 'you are certain about the year',
        },
        {
          id: 'j4',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2824,
          body: 'My father died in the February of 1975 and that roof was the last job we did together. I am certain about the year the way you are certain what your own name is.',
        },
        {
          id: 'j5',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2836,
          body: 'Avril asked me in the March and I told her and I thought that was the end of it, and I have been sat here since Tuesday wishing I had said I could not remember.',
        },
        {
          id: 'j6',
          threadId: 't-jack',
          senderId: 'you',
          sentAt: 2844,
          body: 'you let petra out of the tower',
        },
        {
          id: 'j7',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2856,
          body: 'Ten past eight. She had been banging on it a while. That door wants a new latch and I have had it on a list since March and I will do it now, I expect, out of guilt.',
          claims: [
            {
              id: 'c-petra-tower',
              subject: 'petra',
              assertedBy: 'jack',
              predicate: { kind: 'at_place', placeId: 'tower' },
              window: { start: 1140, end: 1210 },
              sourceMessageId: 'j7',
              label: 'Petra: shut in the tower, 19:00–20:10 (per Jack)',
            },
          ],
        },
        {
          id: 'j8',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2870,
          body: 'And I will tell you the other thing, since nobody has asked me and I have been waiting for somebody to.',
        },
        {
          id: 'j9',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2874,
          body: 'Cordelia Hale went into that vestry at about twenty to eight. I was in the nave doing the latch on the tower door and she went past me and she did not see me, because nobody sees a man on his knees with a screwdriver.',
          claims: [
            {
              id: 'c-cordy-vestry',
              subject: 'cordy',
              assertedBy: 'jack',
              predicate: { kind: 'at_place', placeId: 'vestry' },
              window: { start: 1180, end: 1200 },
              sourceMessageId: 'j9',
              label: 'Cordy: in the vestry, 19:40–20:00 (per Jack)',
            },
          ],
        },
        {
          id: 'j10',
          threadId: 't-jack',
          senderId: 'jack',
          sentAt: 2882,
          body: 'I have known that woman since she was in a pram. I am not saying what it means. I am saying where she was.',
          claims: [
            {
              id: 'c-jack-nave',
              subject: 'jack',
              assertedBy: 'jack',
              predicate: { kind: 'at_place', placeId: 'nave' },
              window: { start: 1140, end: 1230 },
              sourceMessageId: 'j10',
              label: 'Jack: in the nave, 19:00–20:30',
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------- t-ines (gated)
    {
      id: 't-ines',
      title: 'Inés Barragán',
      participantIds: ['you', 'ines'],
      // Deadlock, found at Pack 14. This also gated on `x-cordy-register`, whose
      // two claims are both inside this thread — so opening it required a proof
      // only it could supply. The vestry contradiction is built from t-parish and
      // t-jack, so it opens from outside.
      requiresContradictionIds: ['x-cordy-vestry'],
      messages: [
        {
          id: 'i1',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3000,
          body: 'I have been here two years. Avril was the one who told me which of them to believe about what, and now I am doing it on my own and doing it badly.',
        },
        {
          id: 'i2',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3010,
          body: 'The registers do not leave the safe. That is not a rule I invented, it is in the measure, and there is a book where you sign if one goes out.',
        },
        {
          id: 'i3',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3016,
          body: 'Cordy took the 1974 volume out on the eleventh of March, signed for it, and had it for four days. She is on the PCC and she was doing the flower rota history and I did not think about it for one second.',
          claims: [
            {
              id: 'c-cordy-signed-out',
              subject: 'cordy',
              assertedBy: 'ines',
              predicate: {
                kind: 'doing',
                actionId: 'signed_the_1974_register_out',
                exclusiveGroup: 'cordy-register',
              },
              window: { start: 288600, end: 288720 },
              sourceMessageId: 'i3',
              label: 'Cordy: signed the 1974 register out, 11 March',
            },
          ],
        },
        {
          id: 'i4',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3022,
          body: 'And when the police asked her on Wednesday whether she had ever handled the registers, she said never, not once, they are Avril’s department. I was stood next to her.',
          claims: [
            {
              id: 'c-cordy-never-register',
              subject: 'cordy',
              assertedBy: 'cordy',
              predicate: {
                kind: 'doing',
                actionId: 'never_handled_the_registers',
                exclusiveGroup: 'cordy-register',
              },
              window: { start: 288540, end: 288780 },
              sourceMessageId: 'i4',
              label: 'Cordy: never handled the registers (her account)',
            },
          ],
        },
        {
          id: 'i5',
          threadId: 't-ines',
          senderId: 'you',
          sentAt: 3030,
          body: 'was her car there',
        },
        {
          id: 'i6',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3042,
          body: 'I came back for my phone at twenty past eight and her car was in the car park under the yew, where she always puts it, and I remember being pleased because I thought somebody was with Avril.',
          claims: [
            {
              id: 'c-cordy-carpark',
              subject: 'cordy',
              assertedBy: 'ines',
              predicate: { kind: 'at_place', placeId: 'carpark' },
              window: { start: 1220, end: 1230 },
              sourceMessageId: 'i6',
              label: 'Cordy: in the car park, 20:20–20:30 (per Inés)',
            },
          ],
        },
        {
          id: 'i7',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3050,
          body: 'I went in, got my phone off the stall, and went out again. I did not go through to the vestry. I have to live with that and I would rather not do it in writing.',
          claims: [
            {
              id: 'c-ines-carpark',
              subject: 'ines',
              assertedBy: 'ines',
              predicate: { kind: 'at_place', placeId: 'carpark' },
              window: { start: 1210, end: 1240 },
              sourceMessageId: 'i7',
              label: 'Inés: in the car park, 20:10–20:40',
            },
          ],
        },
        {
          id: 'i8',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3064,
          body: 'Avril was in that vestry from seven. She had the scanner and the lamp and a flask and she would not have moved for a fire alarm.',
          claims: [
            {
              id: 'c-avril-vestry',
              subject: 'avril',
              assertedBy: 'ines',
              predicate: { kind: 'at_place', placeId: 'vestry' },
              window: { start: 1140, end: 1260 },
              sourceMessageId: 'i8',
              label: 'Avril: in the vestry, 19:00–21:00 (per Inés)',
            },
          ],
        },
        {
          id: 'i9',
          threadId: 't-ines',
          senderId: 'ines',
          sentAt: 3080,
          body: 'Cordelia Hale has arranged the flowers in that church for forty years. She has a plaque with her mother’s name on it in the south aisle. I have watched her walk past it twice a week for two years.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-register',
      characterId: 'cordy',
      summary:
        'Entry 114 was squeezed into the 1974 marriage register in a different hand, and there was no roof on the church that August. Her name, her father, her house and forty years of standing in that parish rest on four lines somebody wrote after the fact, and the scan was going to the diocese on Monday.',
      establishedByMessageIds: ['a8', 'i9'],
    },
  ],

  contradictions: [
    {
      id: 'x-cordy-vestry',
      claimIdA: 'c-cordy-home',
      claimIdB: 'c-cordy-vestry',
      revelation:
        'She put herself at home with the radio on from seven until nine. Jack Tenby was on his knees in the nave doing the latch on the tower door and watched her walk into the vestry at twenty to eight. Nobody sees a man on his knees with a screwdriver.',
    },
    {
      id: 'x-cordy-register',
      claimIdA: 'c-cordy-never-register',
      claimIdB: 'c-cordy-signed-out',
      revelation:
        'She told the police she had never handled the registers, that they were Avril’s department, with the vicar standing next to her. She signed the 1974 volume out of that safe on the eleventh of March and kept it for four days, and there is a book where you sign, because the registers do not leave the safe.',
    },
    {
      id: 'x-cordy-carpark',
      claimIdA: 'c-cordy-home',
      claimIdB: 'c-cordy-carpark',
      revelation:
        'At twenty past eight her car was under the yew where she always leaves it, and Inés saw it and was pleased, because she thought it meant somebody was sitting with Avril.',
    },
    {
      id: 'x-petra-tower',
      claimIdA: 'c-petra-nave',
      claimIdB: 'c-petra-tower',
      revelation:
        'Cordy put the organist in the nave walking past that door six times. Petra was shut in the tower from seven with the door closed because the sound comes back at you otherwise, and the latch has been broken since March. Jack let her out at ten past eight and laughed at her for four minutes first.',
    },
  ],

  confrontation: {
    opening:
      'You have been in this village nine days and you have been talking to a builder and a girl who is not from here. I have done the flowers in that church since 1985. Go on.',
    beats: [
      {
        id: 'v-vestry',
        evidence: { kind: 'contradiction', id: 'x-cordy-vestry' },
        press:
          'You were at home with the radio on. Jack was in the nave with a screwdriver and watched you go into that vestry at twenty to eight.',
        rebuttal:
          'Jack Tenby is eighty-four and he has been telling that village what he has seen for sixty years, and half of it he has seen.',
      },
      {
        id: 'v-register',
        evidence: { kind: 'contradiction', id: 'x-cordy-register' },
        press:
          'You told the police you had never handled the registers. You signed the 1974 volume out of that safe on the eleventh of March and kept it four days, and the vicar was standing beside you when you said it.',
        rebuttal:
          'The flower rota. I was doing the flower rota history for the anniversary, which anybody on that committee will tell you.',
      },
      {
        id: 'v-carpark',
        evidence: { kind: 'contradiction', id: 'x-cordy-carpark' },
        press:
          'Your car was under the yew at twenty past eight. Inés saw it and was glad, because she thought it meant Avril was not on her own.',
        rebuttal: '',
      },
      {
        id: 'v-why',
        evidence: { kind: 'motive', id: 'm-register' },
        press:
          'Entry 114 was written in after the fact, and there was no roof on that church in August 1974. The scan was going to the diocese on Monday.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is not evidence. That is a village talking, which it has done since the Conquest.',
      'You deal in paper. You have no idea what any of this is.',
      'Bring me something that is not an old man on his knees.',
    ],
    confession:
      'I found out when I was thirty. My mother told me in a kitchen in Bicester with the immersion heater on, and then she died eleven weeks later and left me holding it.\n\nThere was no wedding. There was a man in Coventry who did not want me, and a curate here who owed my grandmother something, and four lines written into a book in 1976 in a hand nobody was ever going to check.\n\nAnd I have arranged the flowers in that church for forty years, and I have read the lesson at Christmas, and there is a plaque in the south aisle with my mother’s name on it, and every single bit of that stands on those four lines.\n\nAvril came to tell me herself. That is the part I want said. She did not go to the diocese first, she came to my kitchen on the Sunday and sat down and said Cordy, I have found something and I am going to have to send it, and I wanted you to hear it from a friend.\n\nAnd I said thank you. I did say thank you.\n\nThen on the Tuesday I went down to ask her to hold the batch back. Just the batch. Just until after the anniversary, I said, and she said Cordelia, I cannot, and she turned round to the scanner.\n\nShe was seventy-one and I put my hand on her shoulder and I do not know what I meant by it. I have said that to myself four hundred times and it is still the only true sentence I have got.',
  },

  solution: {
    killerId: 'cordy',
    requiredContradictionIds: ['x-cordy-vestry', 'x-cordy-register', 'x-cordy-carpark'],
    requiredMotiveIds: ['m-register'],
    epilogue:
      'The 1974 volume went to the diocesan record office in the batch Avril had already labelled, on the Monday, because nobody thought to stop it.\n\nEntry 114 was examined under raking light in the June. The ruling of the page had been redrawn in ballpoint and the entry sits about two millimetres proud of the line it pretends to be on.\n\nJack Tenby replaced the latch on the tower door on the Thursday, and then repainted the whole door, and then did the porch, and his daughter says he has not stopped since.\n\nPetra Voss played at the funeral. She chose the Bach that Avril had complained about in January, which the parish took a while to understand and then understood all at once.',
  },
};
