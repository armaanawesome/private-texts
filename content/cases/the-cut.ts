import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 9 — "The Cut".
 *
 * Pack 9, and the **third arc connection**. Clue 4 lands in the confession
 * only: he rang again afterwards, to ask how it had gone. He follows up.
 *
 * Shape of the lie, per docs/pack-ledger.md: **movement**. A narrowboat does
 * three miles an hour and a lock takes a quarter of an hour, so the cut can
 * always tell you where a boat could and could not have been.
 *
 * Story Lens, by inverting the villain: the alibi is not lying. The boat really
 * did sit at Tyrley all evening and forty people can say so. It answers a
 * different question from the one anybody asked, because a community that
 * thinks in miles and locks never thought to ask whether he took the boat.
 *
 * He cycled. Six miles of towpath, forty minutes, in the dark, on a bike he has
 * had strapped to the roof since 2011.
 */
export const theCutRaw = {
  id: 'the-cut',
  title: 'The Cut',
  blurb:
    'A narrowboat does three miles an hour, and everybody on the cut can do that arithmetic. Nobody thought to ask whether he took the boat.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'verity', name: 'Julie', avatarColor: '#8A7B5C' },
    { id: 'nate', name: 'Nate', avatarColor: '#C4483C' },
    { id: 'bo', name: 'Sam', avatarColor: '#4E8CF0' },
    { id: 'gwyn', name: 'Alan', avatarColor: '#E4B363' },
    { id: 'tam', name: 'Tam', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'cut', name: 'the cut' },
    { id: 'norbury', name: 'Norbury', parentId: 'cut' },
    { id: 'norburywharf', name: 'the wharf at Norbury', parentId: 'norbury' },
    { id: 'veritysboat', name: 'Julie’s boat', parentId: 'norbury' },
    { id: 'pub', name: 'the Junction', parentId: 'norbury' },
    { id: 'tyrley', name: 'Tyrley', parentId: 'cut' },
    { id: 'tyrleylocks', name: 'Tyrley locks', parentId: 'tyrley' },
    { id: 'towpath', name: 'the towpath', parentId: 'cut' },
    { id: 'hospital', name: 'the Royal Shrewsbury' },
  ],
  objects: [],

  briefing: {
    victimId: 'verity',
    foundAt: { placeId: 'veritysboat', minutes: 1380 },
    causeOfDeath: 'Drowning. She went in off her own stern deck and the cut is four feet deep there.',
    ruling:
      'Recorded as accidental. She was sixty-four, it was dark, and there had been a bottle of wine on the table.',
    opening:
      'Julie Cusk had lived aboard for nineteen years and knew every liveaboard between Autherley and Nantwich by their boat before their name.\n\nShe was found in the water alongside her own stern on a Friday night in October, with the stove still going and two glasses on the table.\n\nYou gave up your boat and moved ashore four years ago and she texted you every week about it anyway.',
  },

  threads: [
    // -------------------------------------------------------------- t-verity
    {
      id: 't-verity',
      title: 'Julie',
      participantIds: ['you', 'verity'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'v1',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 220,
          body: 'Something has happened and I have been sat on it for four days because I did not know who to say it to first.',
        },
        {
          id: 'v2',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 226,
          body: 'Effie Ogilvy wrote to me. Nate’s girl. She is twenty-four and she is a paediatric nurse in Chester and she found me through the Facebook group.',
        },
        {
          id: 'v3',
          threadId: 't-verity',
          senderId: 'you',
          sentAt: 234,
          body: 'oh',
        },
        {
          id: 'v4',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 248,
          body: 'She thanked me. Four pages of it. She said the day I rang social services was the day her life started and she has been trying to say it since she was eighteen.',
        },
        {
          id: 'v5',
          threadId: 't-verity',
          senderId: 'you',
          sentAt: 256,
          body: 'you cried didnt you',
        },
        {
          id: 'v6',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 264,
          body: 'I sat on the gunwale in the rain like a fool. Fifteen years of being the woman who did that to Nate Ogilvy and it turns out I was the woman who did that for Effie Ogilvy, and both of those have been true the whole time.',
        },
        {
          id: 'v7',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 280,
          body: 'She is coming Saturday. To Norbury, to the moorings, in front of everybody. She wants to say it where the people who watched it happen can hear her say it.',
        },
        {
          id: 'v8',
          threadId: 't-verity',
          senderId: 'you',
          sentAt: 288,
          body: 'does nate know',
        },
        {
          id: 'v9',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 302,
          body: 'I told him myself on Tuesday. I am not having him hear it from Sam at the water point. I owed him that and I have never owed him anything else.',
        },
        {
          id: 'v10',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 310,
          body: 'He was very quiet. He said right. Twice. And then he asked me what time on Saturday.',
        },
        {
          id: 'v11',
          threadId: 't-verity',
          senderId: 'verity',
          sentAt: 1205,
          body: 'Stove on, bottle open, and I am not moving off this boat until Saturday. Come up if you can face the drive.',
          claims: [
            {
              id: 'c-verity-boat',
              subject: 'verity',
              assertedBy: 'verity',
              predicate: { kind: 'at_place', placeId: 'veritysboat' },
              window: { start: 1200, end: 1290 },
              sourceMessageId: 'v11',
              label: 'Julie: on her boat, 20:00–21:30',
            },
          ],
        },
      ],
    },

    // ----------------------------------------------------------------- t-cut
    {
      id: 't-cut',
      title: 'Norbury moorings',
      participantIds: ['you', 'nate', 'tam', 'gwyn'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'k1',
          threadId: 't-cut',
          senderId: 'gwyn',
          sentAt: 2400,
          body: 'For anybody who has not heard it from someone. Julie went in off her own stern on Friday night and Sam found her at eleven. The police came Saturday morning and they are calling it accidental.',
        },
        {
          id: 'k2',
          threadId: 't-cut',
          senderId: 'tam',
          sentAt: 2412,
          body: 'nineteen years on this cut. she pulled my boat off the mud at bridge 39 in the dark in february and would not take a drink for it',
        },
        {
          id: 'k3',
          threadId: 't-cut',
          senderId: 'nate',
          sentAt: 2426,
          body: 'I was at Tyrley all week and I was at Tyrley all Friday night. Six miles and five locks off. Forty boats saw mine sat on the visitor moorings above the top lock from Wednesday.',
          claims: [
            {
              id: 'c-nate-tyrley',
              subject: 'nate',
              assertedBy: 'nate',
              predicate: { kind: 'at_place', placeId: 'tyrley' },
              window: { start: 1140, end: 1320 },
              sourceMessageId: 'k3',
              label: 'Nate: at Tyrley, 19:00–22:00',
            },
          ],
        },
        {
          id: 'k4',
          threadId: 't-cut',
          senderId: 'nate',
          sentAt: 2428,
          body: 'Never moved her. Not an inch, Wednesday to Sunday. Anybody who knows this cut can do the sums on that',
          claims: [
            {
              id: 'c-nate-moored',
              subject: 'nate',
              assertedBy: 'nate',
              predicate: {
                kind: 'doing',
                actionId: 'moored_at_tyrley_all_evening',
                exclusiveGroup: 'nate-evening',
              },
              window: { start: 1140, end: 1320 },
              sourceMessageId: 'k4',
              label: 'Nate: moored at Tyrley all evening',
            },
          ],
        },
        {
          id: 'k5',
          threadId: 't-cut',
          senderId: 'gwyn',
          sentAt: 2436,
          body: 'Nobody has asked you, Nate.',
        },
        {
          id: 'k6',
          threadId: 't-cut',
          senderId: 'nate',
          sentAt: 2442,
          body: 'They will. Fifteen years of this cut deciding what I am. I am getting in front of it',
        },
        {
          id: 'k7',
          threadId: 't-cut',
          senderId: 'nate',
          sentAt: 2450,
          body: 'And Tam was up at Norbury Friday and had a row with her in June about the fourteen day rule that half the moorings heard',
          claims: [
            {
              id: 'c-tam-norbury',
              subject: 'tam',
              assertedBy: 'nate',
              predicate: { kind: 'at_place', placeId: 'norbury' },
              window: { start: 1230, end: 1260 },
              sourceMessageId: 'k7',
              label: 'Tam: at Norbury, 20:30–21:00 (per Nate)',
            },
          ],
        },
        {
          id: 'k8',
          threadId: 't-cut',
          senderId: 'tam',
          sentAt: 2458,
          body: 'I was in A&E in shrewsbury with my mother from eight until two in the morning and I have the discharge letter and I am not putting it in a group chat',
        },
        {
          id: 'k9',
          threadId: 't-cut',
          senderId: 'gwyn',
          sentAt: 2470,
          body: 'Talk to Sam. Sam was on the towpath the whole of that evening walking the dog and Sam does not miss anything, which the rest of you know because it is why you do not moor next to Sam.',
        },
      ],
    },

    // ----------------------------------------------------------------- t-tam
    {
      id: 't-tam',
      title: 'Tam',
      participantIds: ['you', 'tam'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 't-tam',
          senderId: 'tam',
          sentAt: 2600,
          body: 'I rowed with her in June and I have thought about it every day since Friday. It was about the fourteen day rule and it lasted four minutes and she was right.',
        },
        {
          id: 'm2',
          threadId: 't-tam',
          senderId: 'tam',
          sentAt: 2608,
          body: 'My mother fell on the Friday teatime. Ambulance at half seven, A&E at eight, discharged twenty past two. I was in a plastic chair for six hours with my phone at four percent.',
          claims: [
            {
              id: 'c-tam-hospital',
              subject: 'tam',
              assertedBy: 'tam',
              predicate: { kind: 'at_place', placeId: 'hospital' },
              window: { start: 1200, end: 1320 },
              sourceMessageId: 'm2',
              label: 'Tam: at the Royal Shrewsbury, 20:00–22:00',
            },
          ],
        },
        {
          id: 'm3',
          threadId: 't-tam',
          senderId: 'you',
          sentAt: 2616,
          body: 'nate put you at norbury',
        },
        {
          id: 'm4',
          threadId: 't-tam',
          senderId: 'tam',
          sentAt: 2628,
          body: 'He did. In front of the whole cut, forty minutes after Alan told him nobody had asked him anything.',
        },
        {
          id: 'm5',
          threadId: 't-tam',
          senderId: 'tam',
          sentAt: 2640,
          body: 'And I will say the thing I keep not saying. Everybody knows Nate hated her. It is the most known fact on this canal. So when it happened, everybody thought it and then everybody did the sums and put it away again.',
        },
        {
          id: 'm6',
          threadId: 't-tam',
          senderId: 'tam',
          sentAt: 2648,
          body: 'Six miles. Five locks. Three hours up and three back and forty boats watching his roof the whole time. There is no version of that. I have done it in my head twenty times.',
        },
        {
          id: 'm7',
          threadId: 't-tam',
          senderId: 'tam',
          sentAt: 2656,
          body: 'Go and see Sam. Sam walks that towpath at the same time every night and has done for three years, and Sam notices what has moved.',
        },
      ],
    },

    // ------------------------------------------------------ t-bo (discovery)
    {
      id: 't-bo',
      title: 'Sam',
      participantIds: ['you', 'bo'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['m7'],
      messages: [
        {
          id: 'b1',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2800,
          body: 'I found her. I am going to say that once and then I would rather answer questions than tell it.',
        },
        {
          id: 'b2',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2806,
          body: 'I walk Moss from eight to about nine forty every night. Norbury down to bridge 39 and back. Three years, same walk, because he is thirteen and he has his route.',
          claims: [
            {
              id: 'c-bo-towpath',
              subject: 'bo',
              assertedBy: 'bo',
              predicate: { kind: 'at_place', placeId: 'towpath' },
              window: { start: 1200, end: 1300 },
              sourceMessageId: 'b2',
              label: 'Sam: on the towpath, 20:00–21:40',
            },
          ],
        },
        {
          id: 'b3',
          threadId: 't-bo',
          senderId: 'you',
          sentAt: 2814,
          body: 'did you see anyone',
        },
        {
          id: 'b4',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2828,
          body: 'Nate Ogilvy. Half eight, on the offside path past the wharf, in the orange jacket. I said alright Nate and he did not answer and I thought nothing of it because he never does.',
          claims: [
            {
              id: 'c-nate-norbury',
              subject: 'nate',
              assertedBy: 'bo',
              predicate: { kind: 'at_place', placeId: 'norbury' },
              window: { start: 1230, end: 1250 },
              sourceMessageId: 'b4',
              label: 'Nate: at Norbury, 20:30–20:50 (per Sam)',
            },
          ],
        },
        {
          id: 'b5',
          threadId: 't-bo',
          senderId: 'you',
          sentAt: 2836,
          body: 'his boat was at tyrley',
        },
        {
          id: 'b6',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2848,
          body: 'It was. I have said that to three people now and every one of them has explained the locks to me like I have not lived on this water for six years.',
        },
        {
          id: 'b7',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2856,
          body: 'He was on a bike. The Dawes with the drop bars that has been strapped to his roof since I got here. That is not a thing I am guessing at, I stepped off the path for it.',
          claims: [
            {
              id: 'c-nate-bike',
              subject: 'nate',
              assertedBy: 'bo',
              predicate: {
                kind: 'doing',
                actionId: 'came_down_the_towpath_on_a_bicycle',
                exclusiveGroup: 'nate-evening',
              },
              window: { start: 1220, end: 1260 },
              sourceMessageId: 'b7',
              label: 'Nate: on the towpath on a bicycle, 20:20–21:00 (per Sam)',
            },
          ],
        },
        {
          id: 'b8',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2868,
          body: 'Six miles of flat towpath is forty minutes on a bike. Everybody kept saying the boat, the boat, the boat, and the boat never went anywhere and neither did the question.',
        },
        {
          id: 'b9',
          threadId: 't-bo',
          senderId: 'bo',
          sentAt: 2880,
          body: 'Ask Alan about the key. The sanitary station takes a CRT key and the newer ones log. Alan has been on at the trust about that data for a year for the vandalism.',
        },
      ],
    },

    // ------------------------------------------------------- t-gwyn (gated)
    {
      id: 't-gwyn',
      title: 'Alan Pryce',
      participantIds: ['you', 'gwyn'],
      requiresContradictionIds: ['x-nate-norbury', 'x-nate-bike'],
      messages: [
        {
          id: 'g1',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3000,
          // "lock keeper" until Pack 15's alias landed. Pack 9 is an arc pack, so
          // an innocent man described as a keeper reads as a clue and never
          // resolves — which breaks the red-herring rule. Lock-wheeler is the
          // real canal word for it anyway.
          body: 'Eleven years lock-wheeling at Tyrley and I have never once wanted the paperwork until this week.',
        },
        {
          id: 'g2',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3008,
          body: 'His boat did not move. That is true and I will say it in a court. I locked through forty-one boats that week and his was not one of them and I would have known his roof at half a mile.',
          claims: [
            {
              id: 'c-gwyn-locks',
              subject: 'gwyn',
              assertedBy: 'gwyn',
              predicate: { kind: 'at_place', placeId: 'tyrleylocks' },
              window: { start: 1140, end: 1230 },
              sourceMessageId: 'g2',
              label: 'Alan: at Tyrley locks, 19:00–20:30',
            },
          ],
        },
        {
          id: 'g3',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3016,
          body: 'And that is exactly what has been wrong with all of it. Every one of us answered a question about the boat. Nobody asked a question about the man.',
        },
        {
          id: 'g4',
          threadId: 't-gwyn',
          senderId: 'you',
          sentAt: 3024,
          body: 'the key log',
        },
        {
          id: 'g5',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3038,
          body: 'The elsan and the water point at Norbury wharf went over to the logging locks in the spring, because we had a year of somebody leaving the taps running. I have been asking the trust for that data since March about the taps.',
        },
        {
          id: 'g6',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3042,
          body: 'They sent it Tuesday. Nate Ogilvy’s key opened the wharf gate at 20:44 on the Friday. His key. Registered to his licence, on a boat that was six miles away and had not moved since Wednesday.',
          claims: [
            {
              id: 'c-nate-wharf',
              subject: 'nate',
              assertedBy: 'gwyn',
              predicate: { kind: 'at_place', placeId: 'norburywharf' },
              window: { start: 1244, end: 1250 },
              sourceMessageId: 'g6',
              label: 'Nate: at Norbury wharf, 20:44–20:50 (key log)',
            },
          ],
        },
        {
          id: 'g7',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3054,
          body: 'Julie was in the Junction from six until seven with Sam and me and she had one glass and she was happier than I have seen her in fifteen years.',
          claims: [
            {
              id: 'c-verity-pub',
              subject: 'verity',
              assertedBy: 'gwyn',
              predicate: { kind: 'at_place', placeId: 'pub' },
              window: { start: 1080, end: 1140 },
              sourceMessageId: 'g7',
              label: 'Julie: in the Junction, 18:00–19:00 (per Alan)',
            },
          ],
        },
        {
          id: 'g8',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3066,
          body: 'She told the whole snug about the letter. Read some of it out. Effie was coming Saturday at two and Julie had bought a cake from the farm shop and left it on the side.',
        },
        {
          id: 'g9',
          threadId: 't-gwyn',
          senderId: 'gwyn',
          sentAt: 3078,
          body: 'The cake was still there when they took her out of the water. I have not been able to get past that and I am sixty-three and I have got past worse.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-effie',
      characterId: 'nate',
      summary:
        'Julie reported him to social services in 2009 and his daughter went to her aunt. Effie is twenty-four now, a nurse in Chester, and she was coming to Norbury on the Saturday to thank Julie out loud in front of the moorings that watched it happen.',
      establishedByMessageIds: ['v7', 'g8'],
    },
  ],

  contradictions: [
    {
      id: 'x-nate-norbury',
      claimIdA: 'c-nate-tyrley',
      claimIdB: 'c-nate-norbury',
      revelation:
        'He put himself six miles and five locks away all evening, and forty boats will confirm where his roof was. At half eight Sam Ferreira said alright Nate to him on the offside path at Norbury, in the orange jacket, and got no answer, and thought nothing of it because he never answers.',
    },
    {
      id: 'x-nate-bike',
      claimIdA: 'c-nate-moored',
      claimIdB: 'c-nate-bike',
      revelation:
        'Six miles of flat towpath is forty minutes on a bicycle. Everybody on that cut answered a question about the boat, and the boat is not the thing that came down the towpath. The Dawes with the drop bars has been strapped to his roof since 2011.',
    },
    {
      id: 'x-nate-wharf',
      claimIdA: 'c-nate-tyrley',
      claimIdB: 'c-nate-wharf',
      revelation:
        'The wharf gate at Norbury went over to a logging lock in the spring, because somebody had spent a year leaving the taps running. His key opened it at 20:44, registered to his licence, on a boat that had not moved since Wednesday.',
    },
    {
      id: 'x-tam-hospital',
      claimIdA: 'c-tam-norbury',
      claimIdB: 'c-tam-hospital',
      revelation:
        'He put Tam Oyelaran at Norbury forty minutes after being told nobody had asked him anything. Tam was in a plastic chair at the Royal Shrewsbury from eight until twenty past two with his mother and a phone on four percent.',
    },
  ],

  confrontation: {
    opening:
      'Fifteen years this cut has looked at me like that and I have moored where I was told and paid my licence and said nothing. Go on then. Say it properly.',
    beats: [
      {
        id: 'c-norbury',
        evidence: { kind: 'contradiction', id: 'x-nate-norbury' },
        press:
          'You were at Tyrley all night. Sam said alright Nate to you on the offside path at Norbury at half eight and you did not answer.',
        rebuttal:
          'Sam has been here six years and thinks that makes them from here. It was dark and there is one orange jacket on this canal, is there.',
      },
      {
        id: 'c-bike',
        evidence: { kind: 'contradiction', id: 'x-nate-bike' },
        press:
          'Your boat never moved and that is true. You came down six miles of flat towpath on the Dawes off your roof. Forty minutes.',
        rebuttal:
          'So now I am on a bicycle. In the dark. Six miles. You have decided the answer and you are going backwards from it.',
      },
      {
        id: 'c-wharf',
        evidence: { kind: 'contradiction', id: 'x-nate-wharf' },
        press:
          'The wharf gate logs now. It has since the spring, because of the taps. Your key opened it at 20:44, and your boat was six miles up the cut.',
        rebuttal: '',
      },
      {
        id: 'c-why',
        evidence: { kind: 'motive', id: 'm-effie' },
        press:
          'Effie was coming on the Saturday at two. To say thank you to Julie, out loud, on those moorings, in front of everybody who watched it happen.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is this canal talking. It has been talking about me since 2009.',
      'You gave up your boat. You do not get to come back and tell me what happened on it.',
      'Bring me a thing with my name on it.',
    ],
    confession:
      'I could have stood fifteen years of them thinking I was a bad father. I had got good at it. You get up and you do your locks and you nod at people who do not nod back and after a while it is just weather.\n\nWhat I could not do was Saturday.\n\nMy daughter, twenty-four, a nurse, stood on those moorings in front of Alan and Sam and the whole of them, saying out loud that the best thing that ever happened to her was being taken off me. And every one of them nodding. And me on a boat six miles up with my curtains shut, and everybody knowing exactly where I was and why.\n\nShe was on the stern deck when I came round the back. She was pleased to see me. That is the bit. She said Nate, come in, and she had two glasses out because she had been expecting somebody all evening and it was not me.\n\nAnd there is one more thing.\n\nA man who called himself the Keeper rang me on the Wednesday. Said he was from the family court service doing a records review. He knew about 2009. He knew Effie was a nurse in Chester and he knew about the Saturday, which I had told nobody, because who would I tell.\n\nHe asked me how I felt about it and I talked for a long time and he did not say very much at all.\n\nAnd on the Sunday he rang again. Just to ask how it had gone.\n\nThat is what he said. How did it go, Nate. Like a man asking after an interview.',
  },

  coda: {
    from: 'Unknown number',
    messages: [
      'Norbury. You did that in five days and one of them was spent on the wrong man, which I would call fair.',
      'The bicycle was good. Everybody on that canal thinks in miles and locks and it has never let them down before, so it never occurred to any of them to stop.',
      'You have four of these now, if you are counting. I am.',
      'And yes. I did ring him afterwards. I always do. You should be asking yourself why that is worth the risk to me, because it is the only careless thing I do.',
    ],
  },

  solution: {
    killerId: 'nate',
    requiredContradictionIds: ['x-nate-norbury', 'x-nate-bike', 'x-nate-wharf'],
    requiredMotiveIds: ['m-effie'],
    epilogue:
      'The Canal and River Trust supplied eleven months of key data in a single spreadsheet and apologised for the delay.\n\nEffie Ogilvy came to Norbury on the Saturday because nobody had her number to stop her. Alan Pryce met her at the top of the lane and told her in the car park, and then sat with her in the Junction for four hours.\n\nShe read the letter out at the funeral. All four pages. She said afterwards that she had written it to be read to Julie and could not think of a reason to change a word of it now.\n\nBo Ferreira still walks Moss from eight until twenty to ten. The route goes past Julie’s old mooring, and Sam has not changed it, because Moss is thirteen and has his route.',
  },
};
