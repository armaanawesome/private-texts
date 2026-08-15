import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 5 — "The Wake".
 *
 * Pack 5. Standalone: no Listener, no coda.
 *
 * Shape of the lie, per docs/pack-ledger.md: **collective alibi**. Everyone in
 * the house tells the same story, word for word, and every one of them believes
 * they are being decent.
 *
 * Story Lens (pushed past the obvious, per the storytelling skill): the family
 * is NOT protecting the killer. The shield was built for a nineteen year old
 * over four hundred pounds taken from a handbag, on the day of her
 * grandfather’s funeral, and the family decided that was not the day. Donal
 * simply stepped inside it. Their decency is the weapon.
 *
 * The other inversion: the wake is for the first victim. Gerald Mulvey’s death
 * three weeks earlier was recorded as natural, and Tony had the prescription
 * records in his bag when he died.
 *
 * Epoch is the start of Gerald’s last month, so the script-collection
 * contradiction can sit weeks before the funeral on the same timeline. Funeral
 * day is day 43; 16:00 that day is minute 61440.
 */
export const theWakeRaw = {
  id: 'the-wake',
  title: 'The Wake',
  blurb:
    'Forty-one people were in the house and they all tell the same story, word for word. It was built to protect somebody who did not do it.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'tony', name: 'Tony', avatarColor: '#8A7B5C' },
    { id: 'donal', name: 'Donal', avatarColor: '#C4483C' },
    { id: 'nuala', name: 'Maureen', avatarColor: '#4E8CF0' },
    { id: 'bridie', name: 'Eileen', avatarColor: '#E4B363' },
    { id: 'cass', name: 'Cass', avatarColor: '#6E5AA8' },
  ],
  places: [
    { id: 'house', name: 'the house' },
    { id: 'frontroom', name: 'the front room', parentId: 'house' },
    { id: 'kitchen', name: 'the kitchen', parentId: 'house' },
    { id: 'gardenroom', name: 'the garden room', parentId: 'house' },
    { id: 'sidereturn', name: 'the side return', parentId: 'house' },
    { id: 'chemist', name: 'the chemist on Ballybough Road' },
  ],
  objects: [],

  briefing: {
    victimId: 'tony',
    foundAt: { placeId: 'gardenroom', minutes: 61500 },
    causeOfDeath: 'A single blow to the back of the head against the step.',
    ruling:
      'Recorded as a fall. He had been drinking since eleven and the step into the garden room is a bad one.',
    opening:
      'Gerald Mulvey was buried on the Thursday and forty-one people came back to the house.\n\nHis eldest son Anthony was found at five o’clock at the bottom of the step into the garden room, with a glass still in his hand and his father’s prescription records in the bag beside him.\n\nYou had not been in that house for nine years. Tony was the one who asked you to come.',
  },

  threads: [
    // ---------------------------------------------------------------- t-tony
    {
      id: 't-tony',
      title: 'Tony',
      participantIds: ['you', 'tony'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'y1',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 58000,
          body: 'nine years. nobody will say anything about it on the day, they will all just look at you and say god you are the image of him',
        },
        {
          id: 'y2',
          threadId: 't-tony',
          senderId: 'you',
          sentAt: 58010,
          body: 'i am not coming for them',
        },
        {
          id: 'y3',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 58022,
          body: 'good. because there is a thing I want to show somebody who is not in this family up to their neck',
        },
        {
          id: 'y4',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 58030,
          body: 'da was on 5mg of the liquid morphine at the end and the chemist has him down for a hundred and eighty mils across three weeks. that is not a mistake, that is somebody collecting',
        },
        {
          id: 'y5',
          threadId: 't-tony',
          senderId: 'you',
          sentAt: 58038,
          body: 'who collected',
        },
        {
          id: 'y6',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 58050,
          body: 'that is the bit I have and I am not putting it in a text. I have the printout. I am bringing it Thursday in the bag with the readings for the mass',
        },
        {
          id: 'y7',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 58058,
          body: 'I asked him straight out on Sunday, no messing, and he laughed at me and said mind yourself Tony. that is the exact phrase. mind yourself',
        },
        {
          id: 'y8',
          threadId: 't-tony',
          senderId: 'you',
          sentAt: 58066,
          body: 'tony go to the guards',
        },
        {
          id: 'y9',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 58080,
          body: 'with my mother in the house. after the funeral. I am not doing that to her on the week she buries him, I will do it on the Friday and I will do it properly',
        },
        {
          id: 'y10',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 61330,
          body: 'youre here. I saw you at the back of the church and I nearly went over',
        },
        {
          id: 'y11',
          threadId: 't-tony',
          senderId: 'tony',
          sentAt: 61390,
          body: 'kitchen with the sandwiches like an eejit. find me before the speeches, I have the bag with me',
          claims: [
            {
              id: 'c-tony-kitchen',
              subject: 'tony',
              assertedBy: 'tony',
              predicate: { kind: 'at_place', placeId: 'kitchen' },
              window: { start: 61380, end: 61435 },
              sourceMessageId: 'y11',
              label: 'Tony: in the kitchen, 15:00–15:55',
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------------- t-family
    {
      id: 't-family',
      title: 'Mulveys',
      participantIds: ['you', 'nuala', 'donal', 'bridie'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'f1',
          threadId: 't-family',
          senderId: 'nuala',
          sentAt: 62400,
          body: 'For anyone who has not been told properly and not through somebody else, Tony died yesterday at the house. He fell at the step into the garden room. Mammy is being seen to and please do not ring her today, ring me, anyway I will let ye all know about arrangements when there are any',
        },
        {
          id: 'f2',
          threadId: 't-family',
          senderId: 'bridie',
          sentAt: 62412,
          body: 'I buried a husband on Thursday and a son on Thursday night. I have nothing to say to any of you except that God has a very poor sense of when a thing is enough.',
        },
        {
          id: 'f3',
          threadId: 't-family',
          senderId: 'donal',
          sentAt: 62424,
          body: 'the guards were fine about it. they were in and out in an hour and they said what everyone in that house already knew. bad step, drink since eleven, no more to it',
        },
        {
          id: 'f4',
          threadId: 't-family',
          senderId: 'donal',
          sentAt: 62426,
          body: 'and we were all in the front room from four for the speeches. all of us. that is what I told them and that is what everybody told them',
          claims: [
            {
              id: 'c-donal-front',
              subject: 'donal',
              assertedBy: 'donal',
              predicate: { kind: 'at_place', placeId: 'frontroom' },
              window: { start: 61440, end: 61470 },
              sourceMessageId: 'f4',
              label: 'Donal: in the front room, 16:00–16:30',
            },
          ],
        },
        {
          id: 'f5',
          threadId: 't-family',
          senderId: 'donal',
          sentAt: 62428,
          body: 'I was handing the glasses round the whole way through. ask any of them',
          claims: [
            {
              id: 'c-donal-toast',
              subject: 'donal',
              assertedBy: 'donal',
              predicate: {
                kind: 'doing',
                actionId: 'handing_round_the_glasses',
                exclusiveGroup: 'donal-speeches',
              },
              window: { start: 61440, end: 61470 },
              sourceMessageId: 'f5',
              label: 'Donal: handing round the glasses, 16:00–16:30',
            },
          ],
        },
        {
          id: 'f6',
          threadId: 't-family',
          senderId: 'nuala',
          sentAt: 62440,
          body: 'We were all in the front room. Every one of us. I want that said clearly because there is talk already and I know where it is coming from',
          claims: [
            {
              id: 'c-nuala-front',
              subject: 'nuala',
              assertedBy: 'nuala',
              predicate: { kind: 'at_place', placeId: 'frontroom' },
              window: { start: 61440, end: 61470 },
              sourceMessageId: 'f6',
              label: 'Maureen: in the front room, 16:00–16:30',
            },
          ],
        },
        {
          id: 'f7',
          threadId: 't-family',
          senderId: 'you',
          sentAt: 62450,
          body: 'he had a bag with him. where is the bag',
        },
        {
          id: 'f8',
          threadId: 't-family',
          senderId: 'donal',
          sentAt: 62458,
          body: 'nine years and thats your first question. right',
        },
        {
          id: 'f9',
          threadId: 't-family',
          senderId: 'bridie',
          sentAt: 62470,
          body: 'Answer him, Donal.',
        },
        {
          id: 'f10',
          threadId: 't-family',
          senderId: 'donal',
          sentAt: 62480,
          body: 'I dont know where his bag is. its a house with forty people in it and a man dead in the back of it',
        },
        {
          id: 'f11',
          threadId: 't-family',
          senderId: 'donal',
          sentAt: 62490,
          body: 'and if we are doing questions, Cass was out the back the whole of it and nobody has said a word about that either',
          claims: [
            {
              id: 'c-cass-gardenroom',
              subject: 'cass',
              assertedBy: 'donal',
              predicate: { kind: 'at_place', placeId: 'gardenroom' },
              window: { start: 61445, end: 61465 },
              sourceMessageId: 'f11',
              label: 'Cass: in the garden room, 16:05–16:25 (per Donal)',
            },
          ],
        },
        {
          id: 'f12',
          threadId: 't-family',
          senderId: 'nuala',
          sentAt: 62496,
          body: 'Donal.',
        },
        {
          id: 'f13',
          threadId: 't-family',
          senderId: 'bridie',
          sentAt: 62510,
          body: 'That child was with me. I will say that to you and to a guard and to a judge and I will not be asked twice.',
        },
      ],
    },

    // -------------------------------------------------------------- t-bridie
    {
      id: 't-bridie',
      title: 'Eileen',
      participantIds: ['you', 'bridie'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'r1',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62600,
          body: 'You came. Nine years and you came, and he was the one that asked you. There is a lesson in that somewhere and I am too tired to go looking for it.',
        },
        {
          id: 'r2',
          threadId: 't-bridie',
          senderId: 'you',
          sentAt: 62608,
          body: 'were you in the front room',
        },
        {
          id: 'r3',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62620,
          body: 'I was in my kitchen at ten past four looking for glasses, because nobody had handed a glass to anybody and the speeches were going on without them.',
          claims: [
            {
              id: 'c-bridie-kitchen',
              subject: 'bridie',
              assertedBy: 'bridie',
              predicate: { kind: 'at_place', placeId: 'kitchen' },
              window: { start: 61445, end: 61455 },
              sourceMessageId: 'r3',
              label: 'Eileen: in the kitchen, 16:05–16:15',
            },
          ],
        },
        {
          id: 'r4',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62624,
          body: 'And from my kitchen window I can see the side return, and Donal Fahey was stood in it on his telephone with his back to the house.',
          claims: [
            {
              id: 'c-donal-outside',
              subject: 'donal',
              assertedBy: 'bridie',
              predicate: {
                kind: 'doing',
                actionId: 'stood_on_his_phone_in_the_return',
                exclusiveGroup: 'donal-speeches',
              },
              window: { start: 61445, end: 61465 },
              sourceMessageId: 'r4',
              label: 'Donal: on his phone in the side return, 16:05–16:25 (per Eileen)',
            },
          ],
        },
        {
          id: 'r5',
          threadId: 't-bridie',
          senderId: 'you',
          sentAt: 62630,
          body: 'you told the guards everyone was in the front room',
        },
        {
          id: 'r6',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62644,
          body: 'I did. And I would do it again, and I will tell you exactly why, and then you can think of me what you like.',
        },
        {
          id: 'r7',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62650,
          body: 'Cassie took four hundred pounds out of my handbag on Wednesday. Maureen caught her at it and I caught the pair of them at it, and we agreed the three of us that the day we buried her grandfather was not the day.',
        },
        {
          id: 'r8',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62654,
          body: 'So when the guard asked where everybody was, we said the front room, all of us, together. It was for her. It was not for anybody else and I did not think for one second it could be for anybody else.',
        },
        {
          id: 'r9',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62662,
          body: 'That child was in the side return being sick with the shame of it, and my son was dying twenty feet from her, and I sent her out there.',
          claims: [
            {
              id: 'c-cass-return',
              subject: 'cass',
              assertedBy: 'bridie',
              predicate: { kind: 'at_place', placeId: 'sidereturn' },
              window: { start: 61440, end: 61470 },
              sourceMessageId: 'r9',
              label: 'Cass: in the side return, 16:00–16:30 (per Eileen)',
            },
          ],
        },
        {
          id: 'r10',
          threadId: 't-bridie',
          senderId: 'bridie',
          sentAt: 62676,
          body: 'Talk to her. She will not talk to me and I do not blame her for it.',
        },
      ],
    },

    // ------------------------------------------------- t-cass (discovery)
    {
      id: 't-cass',
      title: 'Cass',
      participantIds: ['you', 'cass'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['r10'],
      messages: [
        {
          id: 'k1',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62700,
          body: 'nan said youd message',
        },
        {
          id: 'k2',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62704,
          body: 'i took the money. im not going to sit here and do the thing where i work up to saying it',
        },
        {
          id: 'k3',
          threadId: 't-cass',
          senderId: 'you',
          sentAt: 62710,
          body: 'i did not ask about the money',
        },
        {
          id: 'k4',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62718,
          body: 'everyone asks about the money eventually. i was out the side the whole time. from four til nan came out and got me',
        },
        {
          id: 'k5',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62726,
          body: 'donal came out at about ten past. he didnt see me, im small and there is a wheelie bin, that is the entire reason i know anything',
        },
        {
          id: 'k6',
          threadId: 't-cass',
          senderId: 'you',
          sentAt: 62732,
          body: 'what did he do',
        },
        {
          id: 'k7',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62744,
          body: 'went in the garden room door. the outside one. he was in there a bit and then he came back out and he was different. not upset. sort of tidy. he straightened his tie in the window',
          claims: [
            {
              id: 'c-donal-garden',
              subject: 'donal',
              assertedBy: 'cass',
              predicate: { kind: 'at_place', placeId: 'gardenroom' },
              window: { start: 61450, end: 61460 },
              sourceMessageId: 'k7',
              label: 'Donal: in the garden room, 16:10–16:20 (per Cass)',
            },
          ],
        },
        {
          id: 'k8',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62750,
          body: 'and he had uncle tonys bag. i didnt know it was uncle tonys then. i know it now',
        },
        {
          id: 'k9',
          threadId: 't-cass',
          senderId: 'you',
          sentAt: 62756,
          body: 'why did you not say',
        },
        {
          id: 'k10',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62770,
          body: 'because to say where he was i have to say where i was. and where i was is the side return being sick because i robbed my nan on the day of grandads funeral',
        },
        {
          id: 'k11',
          threadId: 't-cass',
          senderId: 'cass',
          sentAt: 62776,
          body: 'they all covered for me. all of them, straight away, no one even discussed it. and i have been lying in bed working out that the reason he got away with it is that they were being nice to me',
        },
      ],
    },

    // ------------------------------------------------------ t-nuala (gated)
    {
      id: 't-nuala',
      title: 'Maureen',
      participantIds: ['you', 'nuala'],
      requiresContradictionIds: ['x-donal-garden', 'x-donal-glasses'],
      messages: [
        {
          id: 'u1',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62900,
          body: 'I have been married to him for twenty six years and I have known for about nine hours, so you will have to give me a minute with how I am saying things',
        },
        {
          id: 'u2',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62910,
          body: 'I told the guards we were all in the front room because Mammy said it first and I was not going to leave her standing there on her own having said it. That is the whole of my reasoning and it is not much of one',
        },
        {
          id: 'u3',
          threadId: 't-nuala',
          senderId: 'you',
          sentAt: 62918,
          body: 'the prescriptions',
        },
        {
          id: 'u4',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62932,
          body: 'Donal did the chemist. The last one was the Tuesday, ten past eleven, and his name is on the register because they make you sign for the liquid. He did every one of them that month, because I could not walk in there and say Daddy’s name to the girl behind the counter without going',
          claims: [
            {
              id: 'c-donal-collected',
              subject: 'donal',
              assertedBy: 'nuala',
              predicate: {
                kind: 'doing',
                actionId: 'collected_the_prescriptions',
                exclusiveGroup: 'donal-scripts',
              },
              // Day 21, the last collection. Deliberately a single morning
              // rather than a three week span: clockOf wraps at 24 hours, so a
              // multi-day window renders an axis that lies.
              window: { start: 29400, end: 29520 },
              sourceMessageId: 'u4',
              label: 'Donal: signed for the last prescription, 10:00–12:00',
            },
          ],
        },
        {
          id: 'u5',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62940,
          body: 'And he told the guards he never once collected them. He said it in front of me and I heard him say it and I said nothing, because at the time I thought he was only being lazy about the paperwork',
          claims: [
            {
              id: 'c-donal-scripts',
              subject: 'donal',
              assertedBy: 'donal',
              predicate: {
                kind: 'doing',
                actionId: 'never_collected_the_prescriptions',
                exclusiveGroup: 'donal-scripts',
              },
              window: { start: 29340, end: 29580 },
              sourceMessageId: 'u5',
              label: 'Donal: never collected a prescription, 09:00–13:00 (his account)',
            },
          ],
        },
        {
          id: 'u6',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62952,
          body: 'A hundred and eighty mils. Tony said it to me on the Sunday and I told him he was making a show of himself at his own father’s month’s mind',
        },
        {
          id: 'u7',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62960,
          body: 'Daddy had money. Not a lot. Enough that four more years of a nursing home would have taken all of it and three years would have left some',
        },
        {
          id: 'u8',
          threadId: 't-nuala',
          senderId: 'nuala',
          sentAt: 62974,
          body: 'I keep going back to the front room and counting heads. I have counted that room forty times since yesterday and he is not in it, and I said he was, and I would have gone on saying it',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-morphine',
      characterId: 'donal',
      summary:
        'He collected Gerald’s prescriptions every week of the last month and a hundred and eighty mils went out on a five mil dose. Tony had the chemist’s printout in his bag and was going to the guards on the Friday.',
      establishedByMessageIds: ['y4', 'u7'],
    },
  ],

  contradictions: [
    {
      id: 'x-donal-garden',
      claimIdA: 'c-donal-front',
      claimIdB: 'c-donal-garden',
      revelation:
        'Every adult in that house told the guards the same sentence, and it was true of almost all of them. At ten past four Donal Fahey went in the outside door of the garden room, and a nineteen year old behind a wheelie bin watched him come back out and straighten his tie in the window.',
    },
    {
      id: 'x-donal-glasses',
      claimIdA: 'c-donal-toast',
      claimIdB: 'c-donal-outside',
      revelation:
        'He said he was handing the glasses round the whole way through. Eileen Mulvey went to her own kitchen at ten past four looking for glasses, because nobody had handed one to anybody, and from that window she watched him standing in the side return with his back to the house.',
    },
    {
      id: 'x-donal-scripts',
      claimIdA: 'c-donal-scripts',
      claimIdB: 'c-donal-collected',
      revelation:
        'He told the guards he never once collected Gerald’s prescriptions. His wife did them for a month and knows exactly why she could not: she could not say her father’s name to the girl behind the counter. A hundred and eighty mils of liquid morphine went out against a five mil dose, and the printout was in Tony’s bag.',
    },
    {
      id: 'x-cass-return',
      claimIdA: 'c-cass-gardenroom',
      claimIdB: 'c-cass-return',
      revelation:
        'He put the child in the garden room, which is the only accusation anybody in that family made out loud. She was in the side return for the whole half hour, being sick with the shame of four hundred pounds, and her grandmother sent her out there and can say so.',
    },
  ],

  confrontation: {
    opening:
      'Nine years you were gone. You come back for one afternoon and now you know this family, do you. Go on then.',
    beats: [
      {
        id: 'w-garden',
        evidence: { kind: 'contradiction', id: 'x-donal-garden' },
        press:
          'You told the guards everybody was in the front room from four. At ten past you went in the outside door of the garden room, and Cass watched you come back out and straighten your tie in the window.',
        rebuttal:
          'A child who robbed her grandmother on the day of a funeral. That is your witness. She has every reason in the world to put somebody else out the back with her.',
      },
      {
        id: 'w-glasses',
        evidence: { kind: 'contradiction', id: 'x-donal-glasses' },
        press:
          'You said you were handing round the glasses the whole way through. Eileen went to the kitchen at ten past looking for glasses, because nobody had handed one to anybody, and she watched you from the window.',
        rebuttal: 'She is eighty one and she buried a husband that morning.',
      },
      {
        id: 'w-scripts',
        evidence: { kind: 'contradiction', id: 'x-donal-scripts' },
        press:
          'And you told them you never collected Gerald’s prescriptions. Maureen did them for a month, and she can tell you exactly why she could not.',
        rebuttal: '',
      },
      {
        id: 'w-why',
        evidence: { kind: 'motive', id: 'm-morphine' },
        press:
          'A hundred and eighty mils against a five mil dose. Tony had the printout in that bag and he was going to the guards on the Friday. You are the one who told him to mind himself.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That is a house full of grief and you are reading it like a ledger.',
      'You were not here for nine years. You do not get to arrive and be right.',
      'Bring me a thing. Not a feeling somebody had at a funeral.',
    ],
    confession:
      'He came out to the return to tell me. Not to threaten me. That was the thing about Tony, he could not do a threat, he came out to tell me what he was going to do on the Friday so that I would not hear it from a guard.\n\nHe was being decent about it. He had the bag under his arm and he was being decent about it.\n\nAnd I said come inside a minute, and he went in ahead of me, and the step into that garden room has been a bad step since 1994.\n\nI want to say the other part because you will not believe the first part without it.\n\nI did not build any of it. The front room. All of us together. I did not say one word to make that happen. They did it themselves, in about four seconds, in the hall, because Cassie was crying and Eileen said we were all in the front room and Maureen said yes we were, and they looked at each other and it was done.\n\nAnd I stood there and I let it close over me like water.\n\nThat is what I did. I stole a thing that was meant for a child.',
  },

  solution: {
    killerId: 'donal',
    requiredContradictionIds: ['x-donal-garden', 'x-donal-glasses', 'x-donal-scripts'],
    requiredMotiveIds: ['m-morphine'],
    epilogue:
      'Gerald Mulvey was exhumed in the February. The report used the word consistent four times and would not go further than that, and it did not have to, because by then there was the chemist’s log and there was Maureen.\n\nShe gave her statement over two days and did not once ask what it would do to her. When they asked her why she had said the front room, she said: because my mother said it first.\n\nEileen Mulvey did not attend the trial. She sent a letter to be read, of one line, asking that the court be told her granddaughter had been in the side return the whole time and had nothing to do with any of it.\n\nCass paid the four hundred pounds back in instalments to a woman who never once asked for it.',
  },
};
