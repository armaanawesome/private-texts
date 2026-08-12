import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 11 — "The Allotments".
 *
 * Pack 11. Standalone: no Listener, no coda.
 *
 * Shape of the lie, per docs/pack-ledger.md: **possession** — whose tool, whose
 * key, whose shed. Possession is the theme of the whole feud, but the three
 * required proofs run on action and place, because Pack 10 already leaned on the
 * object axis and the ledger forbids two in a row. The fork appears once, in the
 * optional contradiction, which is the correct weight for it: the thing
 * everybody argues about is not the thing that convicts anybody.
 *
 * Story Lens, by inverting the villain: she was wrong. Wilf Sankey was not going
 * to take her plot. He had written to the council recommending an exemption on
 * compassionate grounds and had it in his pocket when she came up the shed row.
 * The case is a woman who killed a man over a decision he had already made in
 * her favour.
 *
 * October evening. Wilf is found in the shed row at 19:30.
 */
export const theAllotmentsRaw = {
  id: 'the-allotments',
  title: 'The Allotments',
  blurb:
    'Everybody on that site knows whose fork it is. Nobody asked whose shed it had been in for ten days.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'wilf', name: 'Wilf', avatarColor: '#8A7B5C' },
    { id: 'deb', name: 'Deb', avatarColor: '#C4483C' },
    { id: 'nev', name: 'Nev', avatarColor: '#4E8CF0' },
    { id: 'joyce', name: 'Joyce', avatarColor: '#E4B363' },
    { id: 'sami', name: 'Sami', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'site', name: 'Carr Bank allotments' },
    { id: 'plot14', name: 'plot 14', parentId: 'site' },
    { id: 'plot3', name: 'plot 3', parentId: 'site' },
    { id: 'shedrow', name: 'the shed row', parentId: 'site' },
    { id: 'tank', name: 'the water tank', parentId: 'site' },
    { id: 'lane', name: 'Carr Bank lane', parentId: 'site' },
  ],
  objects: [
    {
      id: 'fork',
      name: 'the border fork with the taped handle',
      // Nev’s fork, and everybody on the site can identify it at forty feet.
      // Which is exactly why nobody thought to ask where it had been.
      unique: true,
    },
  ],

  briefing: {
    victimId: 'wilf',
    foundAt: { placeId: 'shedrow', minutes: 1170 },
    causeOfDeath: 'A single blow. The fork was still in the path beside him.',
    ruling:
      'Open. There has been a fifteen-year dispute on that site about a hedge, and the fork belongs to the man on the other end of it.',
    opening:
      'Wilf Sankey had been secretary of Carr Bank allotments for thirty-one years and had written the minutes of every AGM in the same hardback notebook.\n\nHe was found in the shed row at half past seven on an October evening, with the bonfire season two days old and somebody’s fork beside him.\n\nHe was your father. He rang you every Sunday and told you about the water pressure.',
  },

  threads: [
    // ---------------------------------------------------------------- t-wilf
    {
      id: 't-wilf',
      title: 'Dad',
      participantIds: ['you', 'wilf'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'w1',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 200,
          body: 'The council have written again about uncultivated plots. Four on our site and they want a decision by the end of the month.',
        },
        {
          id: 'w2',
          threadId: 't-wilf',
          senderId: 'you',
          sentAt: 210,
          body: 'is deb one of them',
        },
        {
          id: 'w3',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 224,
          body: 'She is. Two thirds of it is couch grass and she has not turned a spade since Ray died, and that is three years in May.',
        },
        {
          id: 'w4',
          threadId: 't-wilf',
          senderId: 'you',
          sentAt: 230,
          body: 'so you have to take it off her',
        },
        {
          id: 'w5',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 248,
          body: 'I have to do what the tenancy says or I have to write and ask them not to make me. I have been sat with a blank sheet since Tuesday.',
        },
        {
          id: 'w6',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 256,
          body: 'That shed is Ray’s shed. He built it in 1998 out of a pallet delivery and half of it is not straight. She sits in it on a Saturday with a flask.',
        },
        {
          id: 'w7',
          threadId: 't-wilf',
          senderId: 'you',
          sentAt: 264,
          body: 'dad',
        },
        {
          id: 'w8',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 280,
          body: 'I have done it. Two sides, recommending an exemption on compassionate grounds, and I have said in it that a plot is not only a plot, which they will hate.',
        },
        {
          id: 'w9',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 288,
          body: 'I am going to tell her tonight before I post it. She has had three years of people talking about her plot in front of her and I would rather she heard it standing up.',
        },
        {
          id: 'w10',
          threadId: 't-wilf',
          senderId: 'wilf',
          sentAt: 1055,
          body: 'Up there now doing the padlocks before the light goes. Ring me tomorrow and I will tell you how it went.',
          claims: [
            {
              id: 'c-wilf-tank',
              subject: 'wilf',
              assertedBy: 'wilf',
              predicate: { kind: 'at_place', placeId: 'tank' },
              window: { start: 1020, end: 1045 },
              sourceMessageId: 'w10',
              label: 'Wilf: at the water tank, 17:00–17:25',
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------- t-society
    {
      id: 't-society',
      title: 'Carr Bank plotholders',
      participantIds: ['you', 'joyce', 'deb', 'nev'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 's1',
          threadId: 't-society',
          senderId: 'joyce',
          sentAt: 2400,
          body: 'Plotholders. Wilf was found in the shed row on Tuesday evening and he has died. The police have taped off the top end and the site is closed until they say otherwise. I am acting secretary as of this message and I am sorry to be doing it this way.',
        },
        {
          id: 's2',
          threadId: 't-society',
          senderId: 'nev',
          sentAt: 2414,
          body: 'thirty one years he did the minutes and the water and the skip and the seed order and not one of us ever asked him to. I rowed with him for fifteen of them about a hedge and I would give a great deal to be rowing with him now',
        },
        {
          id: 's3',
          threadId: 't-society',
          senderId: 'deb',
          sentAt: 2428,
          body: 'I was on 14 all evening. Bonfire season started Sunday and I had a fortnight of prunings and I was down the far end with it from six until half seven.',
          claims: [
            {
              id: 'c-deb-plot',
              subject: 'deb',
              assertedBy: 'deb',
              predicate: { kind: 'at_place', placeId: 'plot14' },
              window: { start: 1080, end: 1170 },
              sourceMessageId: 's3',
              label: 'Deb: on plot 14, 18:00–19:30',
            },
          ],
        },
        {
          id: 's4',
          threadId: 't-society',
          senderId: 'deb',
          sentAt: 2430,
          body: 'Burning the whole time. Anybody downwind of me on Tuesday will tell you.',
          claims: [
            {
              id: 'c-deb-burning',
              subject: 'deb',
              assertedBy: 'deb',
              predicate: {
                kind: 'doing',
                actionId: 'burning_prunings_at_the_far_end',
                exclusiveGroup: 'deb-evening',
              },
              window: { start: 1080, end: 1170 },
              sourceMessageId: 's4',
              label: 'Deb: burning prunings, 18:00–19:30',
            },
          ],
        },
        {
          id: 's5',
          threadId: 't-society',
          senderId: 'deb',
          sentAt: 2440,
          body: 'And it is Nev’s fork. Everybody on that site knows it is Nev’s fork, it has had that tape on it since the Jubilee.',
          claims: [
            {
              id: 'c-fork-nev',
              subject: 'nev',
              assertedBy: 'deb',
              predicate: { kind: 'has_object', objectId: 'fork' },
              window: { start: 1080, end: 1170 },
              sourceMessageId: 's5',
              label: 'Nev: had the taped fork, 18:00–19:30 (per Deb)',
            },
          ],
        },
        {
          id: 's6',
          threadId: 't-society',
          senderId: 'nev',
          sentAt: 2448,
          body: 'deb',
        },
        {
          id: 's7',
          threadId: 't-society',
          senderId: 'joyce',
          sentAt: 2456,
          body: 'That is enough. Whatever anybody has to say, say it to a police officer and not to sixty-one people who share a water tank.',
        },
      ],
    },

    // ----------------------------------------------------------------- t-nev
    {
      id: 't-nev',
      title: 'Nev',
      participantIds: ['you', 'nev'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'v1',
          threadId: 't-nev',
          senderId: 'nev',
          sentAt: 2600,
          body: 'your dad and me fell out in 2010 about a hedge and we never once stopped talking. that is what a site is and nobody outside one has ever understood it',
        },
        {
          id: 'v2',
          threadId: 't-nev',
          senderId: 'you',
          sentAt: 2608,
          body: 'it is your fork',
        },
        {
          id: 'v3',
          threadId: 't-nev',
          senderId: 'nev',
          sentAt: 2620,
          body: 'it is. tape on the handle, my initials burnt in the shaft, and I have not laid a hand on it since the week before last because your dad borrowed it',
        },
        {
          id: 'v4',
          threadId: 't-nev',
          senderId: 'nev',
          sentAt: 2626,
          body: 'he came for it on the friday for the raspberry canes at the top end and I said keep it till youre done and it has been stood in his shed ever since. joyce saw him carry it up',
        },
        {
          id: 'v5',
          threadId: 't-nev',
          senderId: 'nev',
          sentAt: 2638,
          body: 'I was on 3 from six with a torch clearing the last of the beans. sami was two plots down the whole time and we shouted at each other about the football',
          claims: [
            {
              id: 'c-nev-plot3',
              subject: 'nev',
              assertedBy: 'sami',
              predicate: { kind: 'at_place', placeId: 'plot3' },
              window: { start: 1080, end: 1200 },
              sourceMessageId: 'v5',
              label: 'Nev: on plot 3, 18:00–20:00 (per Sami)',
            },
          ],
        },
        {
          id: 'v6',
          threadId: 't-nev',
          senderId: 'nev',
          sentAt: 2650,
          body: 'and I will say this once. deb threlfall put my name in a group chat of sixty one people before your dad was in the ground. I have known her twenty years and I did not know she had that in her',
        },
        {
          id: 'v7',
          threadId: 't-nev',
          senderId: 'nev',
          sentAt: 2662,
          body: 'talk to sami. hes newer and he does not owe anybody on that site anything, which on Carr Bank makes him the only reliable witness in a hundred and forty plots',
        },
      ],
    },

    // ---------------------------------------------- t-sami (discovery)
    {
      id: 't-sami',
      title: 'Sami',
      participantIds: ['you', 'sami'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['v7'],
      messages: [
        {
          id: 'm1',
          threadId: 't-sami',
          senderId: 'sami',
          sentAt: 2800,
          body: 'I have had plot 22 for fourteen months. Your dad gave me a bag of onion sets on my first Saturday and told me not to bother with sweetcorn and he was right.',
        },
        {
          id: 'm2',
          threadId: 't-sami',
          senderId: 'sami',
          sentAt: 2808,
          body: 'I was at the tank a lot on Tuesday. The butts on 22 are empty until the roof goes on so I fill cans, and it is four trips.',
          claims: [
            {
              id: 'c-sami-tank',
              subject: 'sami',
              assertedBy: 'sami',
              predicate: { kind: 'at_place', placeId: 'tank' },
              window: { start: 1100, end: 1160 },
              sourceMessageId: 'm2',
              label: 'Sami: at the water tank, 18:20–19:20',
            },
          ],
        },
        {
          id: 'm3',
          threadId: 't-sami',
          senderId: 'you',
          sentAt: 2816,
          body: 'was deb burning',
        },
        {
          id: 'm4',
          threadId: 't-sami',
          senderId: 'sami',
          sentAt: 2830,
          body: 'No. And I have gone over that because I did not want to be the person who says it. Her heap was there and it was not lit. I passed the end of 14 four times and there was no smoke on that site all evening except Ted Harrap on 40.',
          claims: [
            {
              id: 'c-deb-tank',
              subject: 'deb',
              assertedBy: 'sami',
              predicate: {
                kind: 'doing',
                actionId: 'filling_cans_at_the_tank',
                exclusiveGroup: 'deb-evening',
              },
              window: { start: 1100, end: 1160 },
              sourceMessageId: 'm4',
              label: 'Deb: filling cans at the tank, 18:20–19:20 (per Sami)',
            },
          ],
        },
        {
          id: 'm5',
          threadId: 't-sami',
          senderId: 'sami',
          sentAt: 2836,
          body: 'She was at the tank with me twice. We talked about the roof. She was completely normal and she asked after my mum.',
        },
        {
          id: 'm6',
          threadId: 't-sami',
          senderId: 'you',
          sentAt: 2844,
          body: 'did you see her at the sheds',
        },
        {
          id: 'm7',
          threadId: 't-sami',
          senderId: 'sami',
          sentAt: 2858,
          body: 'Half six, near enough. She went up the shed row with an empty can in each hand, which I noticed because you do not carry empties up there, the tank is the other way.',
          claims: [
            {
              id: 'c-deb-shedrow',
              subject: 'deb',
              assertedBy: 'sami',
              predicate: { kind: 'at_place', placeId: 'shedrow' },
              window: { start: 1110, end: 1130 },
              sourceMessageId: 'm7',
              label: 'Deb: in the shed row, 18:30–18:50 (per Sami)',
            },
          ],
        },
        {
          id: 'm8',
          threadId: 't-sami',
          senderId: 'sami',
          sentAt: 2870,
          body: 'Ask Joyce about the lane. There is a camera on the scrapyard gate that looks straight up it and she has been trying to get them to give her the footage for the fly tipping for two years.',
        },
      ],
    },

    // ------------------------------------------------------ t-joyce (gated)
    {
      id: 't-joyce',
      title: 'Joyce Ubani',
      participantIds: ['you', 'joyce'],
      requiresContradictionIds: ['x-deb-shedrow', 'x-deb-burning'],
      messages: [
        {
          id: 'j1',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3000,
          body: 'I have been treasurer nineteen years and I keep everything, which people find funny until the week they do not.',
        },
        {
          id: 'j2',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3008,
          body: 'The scrapyard gave me eleven days of footage on Thursday, having refused me for two years over the fly tipping. It took a police officer asking instead of me.',
        },
        {
          id: 'j3',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3014,
          body: 'It looks straight up Carr Bank lane. Deborah Threlfall walks up it at 19:02 and back down at 19:11, and there is no fire visible on that site at any point in eleven days of it except Ted’s.',
          claims: [
            {
              id: 'c-deb-lane',
              subject: 'deb',
              assertedBy: 'joyce',
              predicate: { kind: 'at_place', placeId: 'lane' },
              window: { start: 1140, end: 1150 },
              sourceMessageId: 'j3',
              label: 'Deb: in Carr Bank lane, 19:00–19:10 (scrapyard camera)',
            },
          ],
        },
        {
          id: 'j4',
          threadId: 't-joyce',
          senderId: 'you',
          sentAt: 3022,
          body: 'the fork',
        },
        {
          id: 'j5',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3034,
          body: 'Wilf carried that fork up to his own shed on the Friday week and I watched him do it, because he stopped and complained about his shoulder the whole way. It stood inside his door from then until Tuesday.',
          claims: [
            {
              id: 'c-fork-wilf',
              subject: 'wilf',
              assertedBy: 'joyce',
              predicate: { kind: 'has_object', objectId: 'fork' },
              window: { start: 1080, end: 1170 },
              sourceMessageId: 'j5',
              label: 'Wilf: had the taped fork, 18:00–19:30 (per Joyce)',
            },
          ],
        },
        {
          id: 'j6',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3040,
          body: 'So whoever picked it up picked it up in that shed row, stood where he was stood. Forget Nev. It tells you who was close enough to reach it.',
        },
        {
          id: 'j7',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3048,
          body: 'And Wilf was up and down that row from five with the padlocks. He does them every October and it takes him an hour and a half because he talks to everybody.',
          claims: [
            {
              id: 'c-wilf-shed',
              subject: 'wilf',
              assertedBy: 'joyce',
              predicate: { kind: 'at_place', placeId: 'shedrow' },
              window: { start: 1050, end: 1170 },
              sourceMessageId: 'j7',
              label: 'Wilf: in the shed row, 17:30–19:30 (per Joyce)',
            },
          ],
        },
        {
          id: 'j8',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3062,
          body: 'The council letter about the four plots came to me as well. Deborah has been sat on it since the eleventh and she rang me twice about whether an appeal costs anything.',
        },
        {
          id: 'j9',
          threadId: 't-joyce',
          senderId: 'joyce',
          sentAt: 3076,
          body: 'I told her Wilf decides. Those were my words. I said it to be kind, because Wilf was fond of her, and I have thought about the shape of that sentence every night since.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-plot',
      characterId: 'deb',
      summary:
        'The council wanted a decision on four uncultivated plots by the end of the month and hers was one of them. Plot 14 was Ray’s plot and the shed is the shed he built in 1998, and she has sat in it on Saturdays for the three years since he died.',
      establishedByMessageIds: ['w6', 'j8'],
    },
  ],

  contradictions: [
    {
      id: 'x-deb-shedrow',
      claimIdA: 'c-deb-plot',
      claimIdB: 'c-deb-shedrow',
      revelation:
        'She put herself down the far end of 14 from six until half seven. At about half past six Sami Rahimi watched her go up the shed row carrying an empty can in each hand, which he noticed because you do not carry empties up there. The tank is the other way.',
    },
    {
      id: 'x-deb-burning',
      claimIdA: 'c-deb-burning',
      claimIdB: 'c-deb-tank',
      revelation:
        'She said she was burning the whole time and that anybody downwind would say so. Her heap was never lit. Sami passed the end of 14 four times and the only smoke on Carr Bank that evening was Ted Harrap on 40, and she was at the tank filling cans with Sami twice, talking about his roof, asking after his mother.',
    },
    {
      id: 'x-deb-lane',
      claimIdA: 'c-deb-plot',
      claimIdB: 'c-deb-lane',
      revelation:
        'The scrapyard camera looks straight up Carr Bank lane and Joyce Ubani had been asking for that footage for two years about the fly tipping. It took a police officer asking instead of her. Deborah Threlfall walks up the lane at 19:02 and back down at 19:11, and in eleven days of footage there is no fire on that site except Ted’s.',
    },
    {
      id: 'x-fork',
      claimIdA: 'c-fork-nev',
      claimIdB: 'c-fork-wilf',
      revelation:
        'Everybody on that site can identify that fork at forty feet, which is exactly why nobody asked where it had been. Wilf borrowed it on the Friday week for the raspberry canes and carried it up to his own shed himself, complaining about his shoulder the whole way, and Joyce watched him do it. It had stood inside his door ever since. It is not evidence about Nev Ashworth. It is evidence about standing where he was standing.',
    },
  ],

  confrontation: {
    opening:
      'You are his daughter and you have come up here to do this on his site. I want you to know I think he would have hated that.',
    beats: [
      {
        id: 'a-shedrow',
        evidence: { kind: 'contradiction', id: 'x-deb-shedrow' },
        press:
          'You were on 14 from six until half seven. At half six Sami watched you go up the shed row with an empty can in each hand.',
        rebuttal:
          'A lad who has been on that site fourteen months, in October, at dusk, walking backwards and forwards with cans. He does not know what he saw.',
      },
      {
        id: 'a-burning',
        evidence: { kind: 'contradiction', id: 'x-deb-burning' },
        press:
          'You said you were burning the whole time. Your heap was never lit. He passed the end of 14 four times and you were at the tank with him twice, asking after his mum.',
        rebuttal:
          'It would not catch. It rained on the Sunday. Ask anybody who has ever tried to burn a fortnight of wet prunings.',
      },
      {
        id: 'a-lane',
        evidence: { kind: 'contradiction', id: 'x-deb-lane' },
        press:
          'The scrapyard camera looks straight up the lane. You go up it at two minutes past seven and come back down at eleven minutes past, and there is no fire on that site in eleven days of footage.',
        rebuttal: '',
      },
      {
        id: 'a-why',
        evidence: { kind: 'motive', id: 'm-plot' },
        press:
          'The council wanted four plots decided by the end of the month and yours was one of them. Joyce told you Wilf decides.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is a hundred and forty people who have been talking about my plot in front of me for three years.',
      'You have not been up here since the funeral tea. You do not know this site.',
      'Bring me something that is not somebody with a watering can.',
    ],
    confession:
      'He said Deb, have you got a minute, and he put his hand in his coat pocket.\n\nI have gone over that hand a thousand times.\n\nBecause Joyce had told me on the Sunday. Wilf decides, she said, and she said it kindly, and I went home and did not sleep and by Tuesday I had built the whole of it. The letter in his pocket. Him doing it standing up in the shed row so I could not make a scene in the hut. Ray’s shed with a council sticker on the door by Christmas.\n\nAnd the fork was stood inside his door and I did not even have to look for it.\n\nHe never got the sentence out. That is the thing I want written down somewhere. I never heard the end of it.\n\nI have had eight weeks to work out what was in that pocket and I have known since about the second week, because it is Wilf, and there was only ever one thing it was going to be.',
  },

  solution: {
    killerId: 'deb',
    requiredContradictionIds: ['x-deb-shedrow', 'x-deb-burning', 'x-deb-lane'],
    requiredMotiveIds: ['m-plot'],
    epilogue:
      'The letter was in his inside coat pocket, folded in three, in an envelope addressed to the parks and open spaces team and stamped ready to go.\n\nTwo sides. It recommended an exemption on compassionate grounds for the tenant of plot 14 and set out the case at some length, and the last paragraph said that a plot is not only a plot and that the committee would know what he meant even if the council did not.\n\nThe council granted it in the January, on the strength of a letter from a man who had been dead since October, and Joyce Ubani read the decision out at the AGM and then had to stop and hand the notebook to somebody else.\n\nPlot 14 was taken on by Sami Rahimi’s mother in the spring. She kept the shed. The committee voted unanimously that it stays, on the grounds that it is not straight and that Ray Threlfall built it out of a pallet delivery in 1998, which is now written in the minutes.',
  },
};
