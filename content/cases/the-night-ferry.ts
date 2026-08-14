import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 14 — "The Night Ferry".
 *
 * Pack 14. Standalone: no Listener, no coda. The finale is Pack 15.
 *
 * Shape of the lie, per docs/pack-ledger.md: **a crossing time**.
 *
 * The mechanism: the Tuesday sailing was scheduled to call at Kirkwall and did
 * not. The linkspan was out and the call was dropped at 21:00, announced on the
 * PA and on every passenger screen. Anybody on deck knew. Anybody asleep in a
 * cabin did not, and the timetable was in their pocket saying otherwise.
 *
 * Story Lens: the alibi failure *is* the character. Dougie Yarrow has been
 * telling people on that ship he is a retired master mariner. He was a steward.
 * When he needed an account of two hours he built it the way he has built
 * everything — out of the document that says what should have been true, rather
 * than out of anything that happened. Same disease, twice, in one evening.
 *
 * And the motive is proportionate to nothing, which is the point of it. Hannah
 * Pirie recognised him in the bar and said so warmly, in front of eight people,
 * because she was pleased to see him.
 *
 * The operator and the vessel are invented. The route is not a real timetable
 * and nothing here is a claim about anybody's actual ship.
 *
 * All claim windows sit inside the evening of the sailing, which is a choice
 * about pacing rather than a technical limit. Crossing midnight is safe:
 * `clockOf` wraps modulo 1440 so the labels come out right, and `domainFor`
 * works on raw minutes so the bars stay in order. Pack 3 is a night shift and
 * spans midnight correctly. The real hazard is mixing conventions inside one
 * case — a claim written as 01:00 without its day offset will not overlap one
 * written as 23:00–01:00, and the engine will quietly refuse the pairing.
 */
export const theNightFerryRaw = {
  id: 'the-night-ferry',
  title: 'The Night Ferry',
  blurb:
    'He can tell you exactly what he did while the ship was alongside at Kirkwall. The ship never called at Kirkwall.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'hannah', name: 'Mum', avatarColor: '#C97C5D' },
    { id: 'dougie', name: 'Dougie', avatarColor: '#2E5E6E' },
    { id: 'marisa', name: 'Sheila', avatarColor: '#D2635E' },
    { id: 'eck', name: 'Eck', avatarColor: '#8A7B5C' },
    { id: 'senga', name: 'Senga Moar', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'ship', name: 'the MV Roost' },
    { id: 'bar', name: 'the Magnus Bar', parentId: 'ship' },
    { id: 'afterdeck', name: 'the after deck', parentId: 'ship' },
    { id: 'cabins', name: 'the cabin corridor on deck 6', parentId: 'ship' },
    { id: 'hospital', name: 'the ship’s hospital cabin', parentId: 'ship' },
    // The crux. A place the ship never reached, so it shares no ancestry with
    // anywhere aboard — which is exactly what makes the alibi fall over.
    { id: 'kirkwall', name: 'Kirkwall, alongside' },
  ],
  objects: [
    {
      id: 'phone',
      name: 'Hannah’s phone, in a green case with a bird on it',
      unique: true,
    },
  ],

  briefing: {
    victimId: 'hannah',
    foundAt: { placeId: 'afterdeck', minutes: 1390 },
    causeOfDeath:
      'A fall against a deck fitting. She was found on the after deck at 23:10 by a crew member on rounds.',
    ruling:
      'Open. It was a force six and the after deck was wet, and the first four people asked all said the same word, which was accident.',
    opening:
      'Hannah Pirie was a purser for twenty-six years, on four ships, and had been retired for six.\n\nShe was on the Tuesday sailing north because you live in Lerwick now and she had a bag with your birthday present in it. She was found on the after deck at ten past eleven.\n\nShe knew every deck of every boat she ever sailed on and she was not a woman who fell over.',
  },

  threads: [
    // -------------------------------------------------------------- t-hannah
    {
      id: 't-hannah',
      title: 'Mum',
      participantIds: ['you', 'hannah'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'n1',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 100,
          body: 'Booked. Tuesday, cabin not a pod, I am sixty-one and I have earned a door.',
        },
        {
          id: 'n2',
          threadId: 't-hannah',
          senderId: 'you',
          sentAt: 108,
          body: 'dont bring anything',
        },
        {
          id: 'n3',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 120,
          body: 'I have brought something. Stop it.',
        },
        {
          id: 'n4',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 1055,
          body: 'Away at 1730 on the dot. Still the only company in the north that goes when it says it will.',
        },
        {
          id: 'n5',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 1210,
          body: 'Dinner was fine. The swell is up and half the bar has gone very quiet and I am enjoying myself enormously.',
        },
        {
          id: 'n6',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 1242,
          body: 'You will not believe who is sat four feet away from me. Dougie Yarrow. He was on the Rona with me in 2003 and I have not clapped eyes on him in twenty-two years.',
        },
        {
          id: 'n7',
          threadId: 't-hannah',
          senderId: 'you',
          sentAt: 1248,
          body: 'who',
        },
        {
          id: 'n8',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 1256,
          body: 'Messroom steward. Lovely singer. He did a Ewan MacColl at the Christmas do that had four grown men in bits.',
        },
        {
          id: 'n9',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 1262,
          body: 'He has gone a bit odd with me. I think I have embarrassed him and I did not mean to, I was only pleased.',
        },
        {
          id: 'n10',
          threadId: 't-hannah',
          senderId: 'hannah',
          sentAt: 1266,
          body: 'Going out the back for five minutes. It is honking out there. 2106. Night love x',
        },
      ],
    },

    // ------------------------------------------------------------ t-crossing
    {
      id: 't-crossing',
      title: 'Roost, Tuesday sailing',
      participantIds: ['you', 'senga', 'marisa', 'dougie'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'g1',
          threadId: 't-crossing',
          senderId: 'senga',
          sentAt: 2400,
          body: 'This group is for passengers from Tuesday’s northbound sailing who have asked to be kept informed. I am the second officer and I set it up because forty of you rang the office in one morning.\n\nA passenger died aboard on Tuesday evening. Police Scotland have the vessel’s records and are speaking to people individually.',
        },
        {
          id: 'g2',
          threadId: 't-crossing',
          senderId: 'marisa',
          sentAt: 2412,
          body: 'she was in my bar for two hours and she was the best company on that boat. that is all i want to say in here',
        },
        {
          id: 'g3',
          threadId: 't-crossing',
          senderId: 'dougie',
          sentAt: 2424,
          body: 'A tragedy, and my condolences to the family. I would say to everyone that the after mooring deck should not be accessible to passengers in a force six and I have said as much to the master. Thirty-one years at sea and I have never seen that door left on the hook.',
        },
        {
          id: 'g4',
          threadId: 't-crossing',
          senderId: 'senga',
          sentAt: 2436,
          body: 'The after deck is a passenger deck and it is open in all weathers below force eight. The door was not on the hook.',
        },
        {
          id: 'g5',
          threadId: 't-crossing',
          senderId: 'marisa',
          sentAt: 2444,
          body: 'dougie you were in the bar til half nine you didnt go anywhere near that door in a force six',
        },
        {
          id: 'g6',
          threadId: 't-crossing',
          senderId: 'senga',
          sentAt: 2456,
          body: 'Please do not do this here. Anything anybody has, give it to the officer dealing, and I will pass on a number to anybody who wants one.',
        },
      ],
    },

    // -------------------------------------------------------------- t-dougie
    {
      id: 't-dougie',
      title: 'Dougie Yarrow',
      participantIds: ['you', 'dougie'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'd1',
          threadId: 't-dougie',
          senderId: 'dougie',
          sentAt: 2600,
          body: 'I am very sorry for your loss. Your mother and I served together on the Rona and she was a first-class purser, and I will say that to anybody who asks.',
        },
        {
          id: 'd2',
          threadId: 't-dougie',
          senderId: 'you',
          sentAt: 2608,
          body: 'you were in the bar with her',
        },
        {
          id: 'd3',
          threadId: 't-dougie',
          senderId: 'dougie',
          sentAt: 2622,
          body: 'I took a drink in the Magnus from about half eight. We spoke briefly. She was in good form and there was nothing whatever between us, whatever anybody in a group chat wants to imply.',
          claims: [
            {
              id: 'c-dougie-bar',
              subject: 'dougie',
              assertedBy: 'marisa',
              predicate: { kind: 'at_place', placeId: 'bar' },
              window: { start: 1230, end: 1265 },
              sourceMessageId: 'd3',
              label: 'Dougie: in the Magnus Bar, 20:30–21:05 (per Sheila)',
            },
          ],
        },
        {
          id: 'd4',
          threadId: 't-dougie',
          senderId: 'you',
          sentAt: 2630,
          body: 'and after',
        },
        {
          id: 'd5',
          threadId: 't-dougie',
          senderId: 'dougie',
          sentAt: 2648,
          body: 'I went up top for the Kirkwall call. I always do. Half nine alongside, and I was out on the linkspan end having a smoke in the lee of the terminal until we let go at a quarter to eleven. Anybody who does this run regularly will tell you that is the best hour of the crossing.',
          claims: [
            {
              id: 'c-dougie-kirkwall',
              subject: 'dougie',
              assertedBy: 'dougie',
              predicate: { kind: 'at_place', placeId: 'kirkwall' },
              window: { start: 1290, end: 1365 },
              sourceMessageId: 'd5',
              label: 'Dougie: ashore at Kirkwall, 21:30–22:45',
            },
          ],
        },
        {
          id: 'd6',
          threadId: 't-dougie',
          senderId: 'dougie',
          sentAt: 2660,
          body: 'Thirty-one years at sea, most of it on the bridge, and I have made that approach in worse than Tuesday.',
        },
        {
          id: 'd7',
          threadId: 't-dougie',
          senderId: 'you',
          sentAt: 2668,
          body: 'her phone was behind the bar',
        },
        {
          id: 'd8',
          threadId: 't-dougie',
          senderId: 'dougie',
          sentAt: 2686,
          body: 'Because I put it there. I came back through the Magnus about ten past ten and it was sat on a table by the after door in a green case, and I handed it to the girl on duty. I would do the same for anybody.',
          claims: [
            {
              id: 'c-phone-dougie',
              subject: 'dougie',
              assertedBy: 'dougie',
              predicate: { kind: 'has_object', objectId: 'phone' },
              window: { start: 1330, end: 1345 },
              sourceMessageId: 'd8',
              label: 'Dougie: had Hannah’s phone, 22:10–22:25',
            },
          ],
        },
        {
          id: 'd9',
          threadId: 't-dougie',
          senderId: 'dougie',
          sentAt: 2700,
          body: 'I would look closer to home. There was a man on that deck on Tuesday with a record as long as your arm and everybody aboard knows his name, and I notice nobody is putting that in a group chat.',
        },
      ],
    },

    // -------------------------------------------------------------- t-marisa
    {
      id: 't-marisa',
      title: 'Sheila',
      participantIds: ['you', 'marisa'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2800,
          body: 'i do four nights a week behind that bar and you get very good at knowing who is having a nice time. your mum was having a nice time',
        },
        {
          id: 'm2',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2810,
          body: 'she came in about half eight after her dinner and sat at the end where the rail is. she had one gin the whole night and she made it last like a professional',
          claims: [
            {
              id: 'c-hannah-bar',
              subject: 'hannah',
              assertedBy: 'marisa',
              predicate: { kind: 'at_place', placeId: 'bar' },
              window: { start: 1230, end: 1260 },
              sourceMessageId: 'm2',
              label: 'Hannah: in the Magnus Bar, 20:30–21:00 (per Sheila)',
            },
          ],
        },
        {
          id: 'm3',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2822,
          body: 'and dougie yarrow had been holding court at that bar since aberdeen. master mariner. thirty one years. chief officer on the tankers. he has told me the same four stories on six crossings and i have laughed at all of them because that is the job',
        },
        {
          id: 'm4',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2834,
          body: 'she went dougie yarrow. you were on the rona with me, you did the messroom. and she was DELIGHTED. she was so pleased to see him. she said something about him singing at a christmas do',
        },
        {
          id: 'm5',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2840,
          body: 'there were maybe eight folk at that end of the bar. nobody laughed at him. i want to be clear about that because i have gone over it. nobody laughed',
        },
        {
          id: 'm6',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2852,
          body: 'he went the colour of the carpet and he sat down and he did not say another word. she went out the after door about five past nine for air and she left her phone on my counter, and i put it on the shelf under the till',
          claims: [
            {
              id: 'c-hannah-afterdeck',
              subject: 'hannah',
              assertedBy: 'marisa',
              predicate: { kind: 'at_place', placeId: 'afterdeck' },
              window: { start: 1265, end: 1330 },
              sourceMessageId: 'm6',
              label: 'Hannah: on the after deck, 21:05–22:10 (per Sheila)',
            },
          ],
        },
        {
          id: 'm7',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2864,
          body: 'he followed her out about twenty past. i saw him go through the after door because i was clearing the rail and you have to lean past it. he was not gone two minutes and he was not gone an hour, i could not tell you, it was mobbed',
          claims: [
            {
              id: 'c-dougie-afterdeck',
              subject: 'dougie',
              assertedBy: 'marisa',
              predicate: { kind: 'at_place', placeId: 'afterdeck' },
              window: { start: 1295, end: 1320 },
              sourceMessageId: 'm7',
              label: 'Dougie: on the after deck, 21:35–22:00 (per Sheila)',
            },
          ],
        },
        {
          id: 'm8',
          threadId: 't-marisa',
          senderId: 'you',
          sentAt: 2872,
          body: 'he says he handed the phone in at ten past ten',
        },
        {
          id: 'm9',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2886,
          body: 'he did not hand me anything. ask senga, she has the lost property book and she has the bar till and she has every door on that ship on a log. senga moar does not guess about anything',
        },
        {
          id: 'm10',
          threadId: 't-marisa',
          senderId: 'marisa',
          sentAt: 2898,
          body: 'and before anybody starts on eck tulloch. everybody starts on eck tulloch. he is on that boat twice a month and he has been in the jail and he will tell you so himself in the first ten minutes',
        },
      ],
    },

    // ------------------------------------------------------ t-eck (discovery)
    {
      id: 't-eck',
      title: 'Eck',
      participantIds: ['you', 'eck'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['m10'],
      messages: [
        {
          id: 'e1',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3000,
          body: 'I did four years in Peterhead between 1979 and 1983 for something I did do. I say it first so that nobody has to work up to it. Aye.',
        },
        {
          id: 'e2',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3010,
          body: 'I do that crossing twice a month to see my sister. Forty years. I could walk that boat blindfold.',
        },
        {
          id: 'e3',
          threadId: 't-eck',
          senderId: 'you',
          sentAt: 3018,
          body: 'were you on the after deck',
        },
        {
          id: 'e4',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3030,
          body: 'Earlier on, aye. Before the dinner. I go out for a smoke and I stand in the same corner every time and the crew all know it.',
        },
        {
          id: 'e5',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3042,
          body: 'From five past nine I was in the hospital cabin with the nurse getting my blood pressure done. It is a thing I have to do and she signs the book. I was in there till twenty-five past ten because she made me sit and it come down.',
          claims: [
            {
              id: 'c-eck-hospital',
              subject: 'eck',
              assertedBy: 'eck',
              predicate: { kind: 'at_place', placeId: 'hospital' },
              window: { start: 1265, end: 1345 },
              sourceMessageId: 'e5',
              label: 'Eck: in the ship’s hospital cabin, 21:05–22:25',
            },
          ],
        },
        {
          id: 'e6',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3054,
          body: 'Her name is Bhatti. She will have wrote it down. Everything on a boat gets wrote down, that is the one thing about a boat.',
        },
        {
          id: 'e7',
          threadId: 't-eck',
          senderId: 'you',
          sentAt: 3062,
          body: 'did we call at kirkwall',
        },
        {
          id: 'e8',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3076,
          body: 'No. It come over the tannoy at nine and it was up on the screens all night. Linkspan out. We ran by and we were early into Lerwick and I was on the pier at half six with nothing open. Aye.',
        },
        {
          id: 'e9',
          threadId: 't-eck',
          senderId: 'eck',
          sentAt: 3088,
          body: 'Anybody that was on that boat and awake kens we never went in. You would have to have been asleep in a cabin with the door shut to no ken.',
        },
      ],
    },

    // -------------------------------------------------------- t-senga (gated)
    {
      id: 't-senga',
      title: 'Senga Moar',
      participantIds: ['you', 'senga'],
      requiresContradictionIds: ['x-dougie-deck'],
      messages: [
        {
          id: 's1',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3200,
          // "because she was your mother", not "because you are her son" — same
          // relationship, named from the side of the person who has a gender.
          body: 'Second officer, eleven years with the company. I have given all of this to Police Scotland and I am giving it to you because she was your mother and because you have asked me a straight question.',
        },
        {
          id: 's2',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3212,
          body: 'The Kirkwall call was dropped at 21:00. The linkspan there had a hydraulic failure on the Monday. It went out on the PA twice, it was on the passenger information screens on every deck from 21:00 until we berthed, and it is in the deck log in the master’s hand.',
        },
        {
          id: 's3',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3220,
          body: 'We did not stop. There was no gangway rigged because there was nothing to rig one to. Nobody went ashore, nobody came aboard, and the vessel did not alter course within six miles of Kirkwall.',
          claims: [
            {
              id: 'c-dougie-aboard',
              subject: 'dougie',
              assertedBy: 'senga',
              predicate: { kind: 'at_place', placeId: 'ship' },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 's3',
              label: 'Dougie: aboard the Roost, 21:00–23:00 (per the deck log)',
            },
          ],
        },
        {
          id: 's4',
          threadId: 't-senga',
          senderId: 'you',
          sentAt: 3228,
          body: 'the phone',
        },
        {
          id: 's5',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3242,
          body: 'It went in the lost property book at 21:04 in Sheila Kinnaird’s writing, green case, found on the bar counter. It was on the shelf under the till from then until I took it off her at 23:40 and put it in the safe. Nobody handed anybody anything at ten past ten.',
          claims: [
            {
              id: 'c-phone-marisa',
              subject: 'marisa',
              assertedBy: 'senga',
              predicate: { kind: 'has_object', objectId: 'phone' },
              window: { start: 1264, end: 1380 },
              sourceMessageId: 's5',
              label: 'Sheila: had Hannah’s phone, 21:04–23:00 (lost property book)',
            },
            {
              id: 'c-marisa-bar',
              subject: 'marisa',
              assertedBy: 'senga',
              predicate: { kind: 'at_place', placeId: 'bar' },
              window: { start: 1200, end: 1380 },
              sourceMessageId: 's5',
              label: 'Sheila: behind the Magnus Bar, 20:00–23:00 (per Senga)',
            },
          ],
        },
        {
          id: 's6',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3256,
          body: 'I will tell you the thing nobody has told you, which is that the crew’s first thought was Eck Tulloch. He was on the after deck before dinner, he has a conviction from 1979, and he is the name that comes up on that ship every time anything happens.',
          claims: [
            {
              id: 'c-eck-afterdeck',
              subject: 'eck',
              assertedBy: 'senga',
              predicate: { kind: 'at_place', placeId: 'afterdeck' },
              window: { start: 1290, end: 1320 },
              sourceMessageId: 's6',
              label: 'Eck: on the after deck, 21:30–22:00 (crew account)',
            },
          ],
        },
        {
          id: 's7',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3268,
          body: 'He was in the hospital cabin with Nurse Bhatti from 21:05 to 22:25 and she signed him in and out. I am telling you both halves of that because I would rather you heard the accusation from me with the answer attached to it.',
        },
        {
          id: 's8',
          threadId: 't-senga',
          senderId: 'you',
          sentAt: 3276,
          body: 'and yarrow',
        },
        {
          id: 's9',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3290,
          body: 'Douglas Yarrow sailed with this company for nine years as a catering rating and left in 2011. He has never held a certificate of competency. That is not a secret, it is on a crew list, and not one person in that bar had any reason to look it up.',
        },
        {
          id: 's10',
          threadId: 't-senga',
          senderId: 'senga',
          sentAt: 3304,
          body: 'I have been on ships since I was nineteen and I have met a lot of men who grew a rank in the telling. It is usually harmless and it is usually sad. I did not know what to do with it and I still do not.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-messroom',
      characterId: 'dougie',
      summary:
        'He had been telling the Magnus Bar he was a master mariner, thirty-one years, chief officer on the tankers, across six crossings. Hannah Pirie sailed with him on the Rona in 2003 and recognised him, and said so in front of eight people, and was delighted to see him. She was not being cruel. She was pleased.',
      establishedByMessageIds: ['n8', 'm3'],
    },
  ],

  contradictions: [
    {
      id: 'x-dougie-deck',
      claimIdA: 'c-dougie-kirkwall',
      claimIdB: 'c-dougie-afterdeck',
      revelation:
        'He puts himself ashore at Kirkwall from half nine. Sheila Kinnaird watched him go through the after door about twenty past nine, because she was clearing the rail and you have to lean past that door to do it. She could not tell you how long he was gone. She could tell you he went.',
    },
    {
      id: 'x-dougie-kirkwall',
      claimIdA: 'c-dougie-kirkwall',
      claimIdB: 'c-dougie-aboard',
      revelation:
        'There was no Kirkwall call. The linkspan failed on the Monday and the call was dropped at 21:00, announced twice on the PA and shown on the passenger screens on every deck until Lerwick. No gangway was rigged because there was nothing to rig one to, and the vessel did not alter course within six miles of the place. He was aboard for the whole of the hour he spent smoking on the linkspan end, in the lee of a terminal he never saw.',
    },
    {
      id: 'x-phone',
      claimIdA: 'c-phone-dougie',
      claimIdB: 'c-phone-marisa',
      revelation:
        'He needed a reason to have been aft, so he invented one, and picked the wrong object. Hannah left her phone on the bar counter when she went out for air. It went into the lost property book at 21:04 in Sheila Kinnaird’s writing, green case, and it sat on the shelf under the till until the second officer put it in the safe at 23:40. He handed nobody anything at ten past ten.',
    },
    {
      id: 'x-eck',
      claimIdA: 'c-eck-afterdeck',
      claimIdB: 'c-eck-hospital',
      revelation:
        'The crew’s first thought was Eck Tulloch, because he was out there before dinner, because of four years in Peterhead in 1979, and because his is the name that comes up on that ship whenever anything happens. He was in the hospital cabin with Nurse Bhatti from 21:05 until 22:25, signed in and signed out, sitting still until his blood pressure came down.',
    },
  ],

  confrontation: {
    opening:
      'You will want to be careful. I have thirty-one years at sea and a reputation on this coast, and I have been very patient with a family in distress.',
    beats: [
      {
        id: 'a-deck',
        evidence: { kind: 'contradiction', id: 'x-dougie-deck' },
        press:
          'You have yourself ashore from half nine. Sheila Kinnaird watched you go out through the after door twenty minutes before that.',
        rebuttal:
          'A girl of thirty-four, four deep at a bar, in a force six, working a till. I would not convict a dog on that and neither would you.',
      },
      {
        id: 'a-phone',
        evidence: { kind: 'contradiction', id: 'x-phone' },
        press:
          'You said you found her phone by the after door at ten past ten and handed it in. It was booked into lost property at four minutes past nine and it never left the shelf under the till.',
        rebuttal:
          'Then the book is wrong, or the girl wrote it up at the end of her shift, which is what they all do. You have never worked a bar.',
      },
      {
        id: 'a-kirkwall',
        evidence: { kind: 'contradiction', id: 'x-dougie-kirkwall' },
        press:
          'You spent an hour smoking on the linkspan at Kirkwall. The linkspan failed on the Monday, the call was dropped at nine, and the ship never came within six miles of it.',
        rebuttal: '',
      },
      {
        id: 'a-why',
        evidence: { kind: 'motive', id: 'm-messroom' },
        press:
          'She said you were on the Rona with her and you did the messroom. She was pleased to see you. Nobody at that bar laughed.',
        rebuttal: '',
      },
    ],
    deflections: [
      'Ask anybody on this coast about Dougie Yarrow. Go on. Ask them.',
      'You are taking the word of a barmaid and a man who did four years in Peterhead.',
      'Your mother would be ashamed of what you are doing to a man who sailed with her.',
    ],
    confession:
      'I heard the announcement. That is the part I would like corrected, because it has been put to me twice now as though I slept through it.\n\nI heard it in the bar at nine o’clock and I heard the whole of it.\n\nAnd four days later, when the officer asked me to account for my evening, I opened the timetable on my phone and I read out what should have happened, and I did it without a flicker, because that is the version I have been living in since 2011 and it is more comfortable in there.\n\nShe said it kindly. I want that written down. She said Dougie Yarrow, you were on the Rona with me, you did the messroom, and she was delighted, and she meant every word of it, and she asked me about my mother.\n\nEight people. Nobody laughed. I have gone through that bar face by face and not one of them laughed, and I want you to understand that it made it worse and I cannot explain to you why.\n\nI followed her out to ask her not to say it again. That is all I went out for. I said Hannah, do us a favour, and she looked at me — and she was going to be kind about it. I could see her getting ready to be kind about it.\n\nI put my hand out and she went back against the fitting.\n\nAnd I stood on that deck in the rain and I did not do one single thing that a master mariner would have done, because I am not one and I have never been one, and there is nobody left alive who would be surprised to hear it except me.\n\nI did the messroom.\n\nI did it for nine years and I was good at it and she remembered my singing after twenty-two years, and I killed her for saying so.',
  },

  solution: {
    killerId: 'dougie',
    requiredContradictionIds: ['x-dougie-deck', 'x-phone', 'x-dougie-kirkwall'],
    requiredMotiveIds: ['m-messroom'],
    epilogue:
      'The bag with your present in it was in cabin 6042 with her coat folded over the end of the bunk, the way she folded a coat on every ship she ever worked.\n\nSenga Moar gave evidence for a day and a half. She was asked eleven times whether a passenger could have been mistaken about a port call, and eleven times she said that the screens ran the notice on a ninety-second loop on every deck for ten hours.\n\nMarisa Kinnaird still does four nights a week on that run. She has not written anything different in the lost property book, because there was never anything wrong with how she wrote it up.\n\nEck Tulloch was asked to give a statement about his movements and gave one, and then asked the officer to put in it that the nurse had made him sit down for eighty minutes and that he had missed the football. He does the crossing twice a month to see his sister. He still stands in the same corner.\n\nThe Rona was broken up at Aliaga in 2009. There is a photograph of her crew at the 2003 Christmas do in the Aberdeen office, forty-odd people in paper hats, and your mother is in the second row.\n\nHe is in it too. Back left, mid-song, and every face in front of him is turned round to listen.',
  },
};
