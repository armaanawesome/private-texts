import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 13 — "The Reunion".
 *
 * Pack 13. Standalone: no Listener, no coda.
 *
 * Shape of the lie, per docs/pack-ledger.md: **a twenty-year-old lie, and this
 * killing exists to keep it**.
 *
 * Axis, corrected in the ledger before writing: **time**, not `with_person`.
 * The engine can never fire a contradiction on `with_person` — being with one
 * person does not exclude being with another (src/engine/contradiction.ts:85) —
 * so a pack that leaned on it would have nothing to prove with.
 *
 * That constraint became the pack. A reunion is a room where every single person
 * can tell you who they were standing with, and the engine refuses all of it. The
 * four `with_person` claims here are deliberate dead ends: pair them and the game
 * says "Those two things can both be true." Co-presence was never proof. That is
 * the emotional content of the setting, enforced by a rule instead of narrated.
 *
 * The time lie is its own thing, distinct from Pack 4 (three clocks), Pack 7
 * (order of arrival) and Pack 10 (a wrong timestamp): **he did not falsify a
 * clock, he became one.** Nobody at a reunion looks at a watch. Everyone dates
 * the evening by the speech. Mark Ellory wrote the running order, moved his own
 * speech forty-five minutes early, and every witness in that hall is now placing
 * the whole night inside a sequence he authored.
 *
 * Story Lens, by inverting the villain: there is no murderer in 2005. Four
 * seventeen-year-olds watched Ashley Crewe go into the Calder and did not ring
 * for help for twenty minutes. The lie was never who. It was how long. And the
 * boy who assembled the story on the bank has spent twenty years being the man
 * everybody checks with.
 *
 * June evening, twenty years on. Nia Boateng is found on the river path at 21:30.
 */
export const theReunionRaw = {
  id: 'the-reunion',
  title: 'The Reunion',
  blurb:
    'Ninety people can tell you who they were standing with. Not one of them can tell you what time it was.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'nia', name: 'Nia', avatarColor: '#C97C5D' },
    { id: 'rafe', name: 'Mark', avatarColor: '#3E4E88' },
    { id: 'marika', name: 'Michelle', avatarColor: '#B8443F' },
    { id: 'tobi', name: 'Tobi', avatarColor: '#4E8CF0' },
    { id: 'corin', name: 'Mr Vale', avatarColor: '#7A6A55' },
  ],
  places: [
    { id: 'school', name: 'Ardenshaw High' },
    { id: 'hall', name: 'the main hall', parentId: 'school' },
    { id: 'musicblock', name: 'the music block', parentId: 'school' },
    { id: 'carpark', name: 'the staff car park', parentId: 'school' },
    // Deliberately not a child of the school. The path runs below the playing
    // fields and the fence has been down since before any of them were born,
    // which is the whole reason five of them were on it in 2005.
    { id: 'riverpath', name: 'the river path' },
    { id: 'branch', name: 'the Calderside branch office' },
  ],
  objects: [],

  briefing: {
    victimId: 'nia',
    foundAt: { placeId: 'riverpath', minutes: 1290 },
    causeOfDeath:
      'She went into the Calder from the top of the bank. The path is unlit and the drop there is about twenty feet.',
    ruling:
      'Open. Two people have already told the police it is the same stretch of water where a boy from her year drowned in 2005, and both of them said it unprompted.',
    opening:
      'Nia Boateng taught Year 4 at a school eleven miles from the one she went to, and she had organised the twenty-year reunion because nobody else would.\n\nShe was found on the river path below the playing fields at half past nine, thirty metres from where Ashley Crewe went into the same river in June 2005.\n\nShe messaged you three weeks ago. You were in that year and you were never in that group, and she said that was exactly why she needed to talk to you.',
  },

  threads: [
    // ----------------------------------------------------------------- t-nia
    {
      id: 't-nia',
      title: 'Nia',
      participantIds: ['you', 'nia'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'n1',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 100,
          body: 'You will not remember me. I sat behind you in geography for two years and you drew on my pencil case.',
        },
        {
          id: 'n2',
          threadId: 't-nia',
          senderId: 'you',
          sentAt: 108,
          body: 'i remember you',
        },
        {
          id: 'n3',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 122,
          body: 'I am doing the reunion. Twenty years. It is in the hall and the caterers are the ones who did my auntie and I have had to ring them four times.',
        },
        {
          id: 'n4',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 130,
          body: 'I wanted to ask you something and I have started this message about nine times.',
        },
        {
          id: 'n5',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 144,
          body: 'Ashley Crewe’s mum still lives on Brantwood Road. Same house. I walk past it going to my mum’s and I have walked past it for twenty years.',
        },
        {
          id: 'n6',
          threadId: 't-nia',
          senderId: 'you',
          sentAt: 152,
          body: 'nia',
        },
        {
          id: 'n7',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 170,
          body: 'There were four of us on that bank and she thinks he was on his own. She has thought that for twenty years. I have written her a letter and it is eight pages and I am going to post it before the reunion because if I wait until after I will not do it.',
        },
        {
          id: 'n8',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 178,
          body: 'I have not put anybody’s name in it. I want to be clear about that with you because I have been clear about it with nobody else. It says we. It says we the whole way through.',
        },
        {
          id: 'n9',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 186,
          body: 'She should know he was not on his own in the dark. That is the entire thing. That is the only reason I am doing it.',
        },
        {
          id: 'n10',
          threadId: 't-nia',
          senderId: 'nia',
          sentAt: 1085,
          body: 'Posted it at ten past eight this morning at the box outside the Co-op and then I sat in my car for a bit. Doors at seven if you change your mind. I would like it if you came.',
        },
      ],
    },

    // ---------------------------------------------------------------- t-year
    {
      id: 't-year',
      title: 'Ardenshaw 2005',
      participantIds: ['you', 'marika', 'rafe', 'tobi'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'g1',
          threadId: 't-year',
          senderId: 'rafe',
          sentAt: 2400,
          body: 'Everyone. I am going to say this once and then I am going to stop using this group, because it is not the place for it.\n\nNia died on Saturday night. The police have spoken to a number of us already and they will speak to more. Please answer them fully and please do not speculate here.',
        },
        {
          id: 'g2',
          threadId: 't-year',
          senderId: 'marika',
          sentAt: 2412,
          body: 'she rang me on the thursday to ask if the tables should be rounds or long. rounds. i said rounds. that is the last conversation i had with her in my life',
        },
        {
          id: 'g3',
          threadId: 't-year',
          senderId: 'tobi',
          sentAt: 2424,
          body: 'I was not there. I want to say that plainly rather than have people work it out. I was on shift and I found out on Sunday morning from my sister.',
        },
        {
          id: 'g4',
          threadId: 't-year',
          senderId: 'marika',
          sentAt: 2436,
          body: 'the police asked me what time things happened and i could not tell them a single one. i said after the speech. i said it about four different things and it was the only answer i had',
          claims: [
            {
              id: 'c-nia-hall',
              subject: 'nia',
              assertedBy: 'marika',
              predicate: { kind: 'at_place', placeId: 'hall' },
              window: { start: 1140, end: 1240 },
              sourceMessageId: 'g4',
              label: 'Nia: in the main hall, 19:00–20:40 (per Michelle)',
            },
          ],
        },
        {
          id: 'g5',
          threadId: 't-year',
          senderId: 'rafe',
          sentAt: 2448,
          body: 'That is what everybody has said, and it is not a failing. Nobody looks at a watch at a party. I gave the police the running order and I have suggested they work from that.',
        },
        {
          id: 'g6',
          threadId: 't-year',
          senderId: 'marika',
          sentAt: 2460,
          body: 'mark there is a woman dead on the same bank as ashley and you are talking about a running order',
        },
        {
          id: 'g7',
          threadId: 't-year',
          senderId: 'rafe',
          sentAt: 2470,
          body: 'I am talking about the only document anybody has. I will not do this here.',
        },
      ],
    },

    // -------------------------------------------------------------- t-marika
    {
      id: 't-marika',
      title: 'Michelle',
      participantIds: ['you', 'marika'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'k1',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2600,
          body: 'i stood with her from when the food went out until she went outside. whole time. we did the thing where you say you will get a drink and then you do not move for an hour',
          claims: [
            {
              id: 'c-marika-with-nia',
              subject: 'marika',
              assertedBy: 'marika',
              predicate: { kind: 'with_person', personId: 'nia' },
              window: { start: 1245, end: 1290 },
              sourceMessageId: 'k1',
              label: 'Michelle: with Nia, 20:45–21:30',
            },
            {
              id: 'c-nia-with-marika',
              subject: 'nia',
              assertedBy: 'marika',
              predicate: { kind: 'with_person', personId: 'marika' },
              window: { start: 1245, end: 1285 },
              sourceMessageId: 'k1',
              label: 'Nia: with Michelle, 20:45–21:25',
            },
          ],
        },
        {
          id: 'k2',
          threadId: 't-marika',
          senderId: 'you',
          sentAt: 2608,
          body: 'what did she talk about',
        },
        {
          id: 'k3',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2620,
          body: 'her class. a boy in it who will not sit down. she was properly happy and i keep having to say that to people because they want her to have been frightened and she was not',
        },
        {
          id: 'k4',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2632,
          body: 'i was in the hall from quarter to nine till gone half past. anybody will tell you that and none of them will be able to tell you when',
          claims: [
            {
              id: 'c-marika-hall',
              subject: 'marika',
              assertedBy: 'corin',
              predicate: { kind: 'at_place', placeId: 'hall' },
              window: { start: 1245, end: 1300 },
              sourceMessageId: 'k4',
              label: 'Michelle: in the main hall, 20:45–21:40 (per Mr Vale)',
            },
          ],
        },
        {
          id: 'k5',
          threadId: 't-marika',
          senderId: 'you',
          sentAt: 2640,
          body: 'the speech',
        },
        {
          id: 'k6',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2654,
          body: 'programme said nine. he did it at quarter past eight. i know because i told him to — the caterers were forty minutes behind and i went and found him and said do it now while people are still standing up',
        },
        {
          id: 'k7',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2662,
          body: 'i have the invoice on my phone. hot service 20:55. so anybody in that room who has told you something happened after the speech has told you it happened after quarter past eight and they think they have told you after nine',
          claims: [
            {
              id: 'c-rafe-outside',
              subject: 'rafe',
              assertedBy: 'marika',
              predicate: {
                kind: 'doing',
                actionId: 'out_by_the_bins_on_his_phone',
                exclusiveGroup: 'rafe-evening',
              },
              window: { start: 1255, end: 1275 },
              sourceMessageId: 'k7',
              label: 'Mark: outside by the bins on his phone, 20:55–21:15 (per Michelle)',
            },
          ],
        },
        {
          id: 'k8',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2678,
          body: 'nobody pushed ashley. i need you to hear that before anybody dresses it up for you. he went in off the top on a dare and we all stood there and shouted his name and nobody went in after him and nobody rang for twenty minutes. twenty minutes. that is the thing. that is the only thing there has ever been',
        },
        {
          id: 'k9',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2690,
          body: 'and mark put the story together on the bank before the ambulance got there. we said we rang straight away. he said the words first and the three of us said them after him and i have said them to a police officer, a coroner and my own mother',
        },
        {
          id: 'k10',
          threadId: 't-marika',
          senderId: 'marika',
          sentAt: 2702,
          body: 'he was seventeen. so was i. i am not pretending i said no',
        },
      ],
    },

    // ---------------------------------------------------------------- t-rafe
    {
      id: 't-rafe',
      title: 'Mark Ellory',
      participantIds: ['you', 'rafe'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'r1',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2800,
          body: 'I have been head at St Cuthbert’s for six years. I mention it only so that you understand why I am careful, and not because I think it entitles me to anything.',
        },
        {
          id: 'r2',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2812,
          body: 'I was in that hall from quarter to nine until half past nine. I was on my feet in front of ninety people for a good part of it. I do not think there is a better answer available to anybody who was there.',
          claims: [
            {
              id: 'c-rafe-hall',
              subject: 'rafe',
              assertedBy: 'rafe',
              predicate: { kind: 'at_place', placeId: 'hall' },
              window: { start: 1245, end: 1290 },
              sourceMessageId: 'r2',
              label: 'Mark: in the main hall, 20:45–21:30',
            },
          ],
        },
        {
          id: 'r3',
          threadId: 't-rafe',
          senderId: 'you',
          sentAt: 2820,
          body: 'when was the speech',
        },
        {
          id: 'r4',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2834,
          body: 'Nine o’clock. It is on the programme, there are two hundred of them printed, and I would be astonished if you could not find one in somebody’s coat pocket this afternoon. It ran about twenty minutes.',
          claims: [
            {
              id: 'c-rafe-speech',
              subject: 'rafe',
              assertedBy: 'rafe',
              predicate: {
                kind: 'doing',
                actionId: 'giving_the_speech',
                exclusiveGroup: 'rafe-evening',
              },
              window: { start: 1260, end: 1280 },
              sourceMessageId: 'r4',
              label: 'Mark: giving the speech, 21:00–21:20',
            },
          ],
        },
        {
          id: 'r5',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2846,
          body: 'Michelle was beside me for most of the evening and I was beside Nia for a stretch of it. It was a room of ninety people who have not seen each other since they were seventeen. Nobody was on their own for a moment.',
          claims: [
            {
              id: 'c-marika-with-rafe',
              subject: 'marika',
              assertedBy: 'rafe',
              predicate: { kind: 'with_person', personId: 'rafe' },
              window: { start: 1250, end: 1280 },
              sourceMessageId: 'r5',
              label: 'Michelle: with Mark, 20:50–21:20 (per Mark)',
            },
            {
              id: 'c-nia-with-rafe',
              subject: 'nia',
              assertedBy: 'rafe',
              predicate: { kind: 'with_person', personId: 'rafe' },
              window: { start: 1255, end: 1275 },
              sourceMessageId: 'r5',
              label: 'Nia: with Mark, 20:55–21:15 (per Mark)',
            },
          ],
        },
        {
          id: 'r6',
          threadId: 't-rafe',
          senderId: 'you',
          sentAt: 2854,
          body: 'she wrote to ashley crewe’s mum',
        },
        {
          id: 'r7',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2870,
          body: 'She told several people she intended to. I would ask you to consider who else that letter frightened, and I would start with Tobi Marchetti, who was in that hall on Saturday and who has spent two years on a crisis line and knows exactly how to sit with somebody and talk them into something.',
          claims: [
            {
              id: 'c-tobi-hall',
              subject: 'tobi',
              assertedBy: 'rafe',
              predicate: { kind: 'at_place', placeId: 'hall' },
              window: { start: 1245, end: 1290 },
              sourceMessageId: 'r7',
              label: 'Tobi: in the main hall, 20:45–21:30 (per Mark)',
            },
          ],
        },
        {
          id: 'r8',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2882,
          body: 'I am aware of how that reads. I have thought about whether to say it for four days and I have concluded that withholding it would be worse.',
        },
        {
          id: 'r9',
          threadId: 't-rafe',
          senderId: 'rafe',
          sentAt: 2894,
          body: 'What happened in 2005 was an accident that four children witnessed. There is no version of it in which anybody did anything to Ashley Crewe. I have said that to every person who has ever asked me and I will say it to you.',
        },
      ],
    },

    // ------------------------------------------------ t-tobi (discovery)
    {
      id: 't-tobi',
      title: 'Tobi',
      participantIds: ['you', 'tobi'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['r7'],
      messages: [
        {
          id: 't1',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3000,
          body: 'Somebody has told you about the crisis line. I can hear it in the question, and I would rather just answer it than make you go round the houses.',
        },
        {
          id: 't2',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3010,
          body: 'Two years. Every other Saturday, six until two, at the branch office in Calderside, which is forty-one miles from that hall. I was on it that night. Nine of us on the rota and a supervisor.',
          claims: [
            {
              id: 'c-tobi-branch',
              subject: 'tobi',
              assertedBy: 'tobi',
              predicate: { kind: 'at_place', placeId: 'branch' },
              window: { start: 1200, end: 1320 },
              sourceMessageId: 't2',
              label: 'Tobi: at the Calderside branch office, 20:00–22:00',
            },
          ],
        },
        {
          id: 't3',
          threadId: 't-tobi',
          senderId: 'you',
          sentAt: 3018,
          body: 'mark says you were in the hall',
        },
        {
          id: 't4',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3032,
          body: 'Does he. I told Nia in March that I could not come and she moved the date once to try and fit me in and could not, and she was lovely about it.',
        },
        {
          id: 't5',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3044,
          body: 'Thousands of people do it. There are four hundred in this region alone and there is a poster about it in every doctor’s waiting room in the country. It is not a rare thing to be. It only looks rare from where you are standing.',
        },
        {
          id: 't6',
          threadId: 't-tobi',
          senderId: 'you',
          sentAt: 3052,
          body: 'were you on the bank in 2005',
        },
        {
          id: 't7',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3066,
          body: 'No. There were four of them and I was not one, and I have spent twenty years being the one who was not there, which is its own strange thing to be in a town this size.',
        },
        {
          id: 't8',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3078,
          body: 'Nia rang me in April. She talked for fifty minutes and I did not say very much, which is most of the job. She asked me at the end whether it was a selfish thing to do, telling his mum, and I said I could not answer that for her.',
        },
        {
          id: 't9',
          threadId: 't-tobi',
          senderId: 'tobi',
          sentAt: 3090,
          body: 'Go and see Colin Vale. He has had the keys to that building since 1989 and he was locking up on Saturday, and he is the only person in this whole thing who was not at a party.',
        },
      ],
    },

    // ----------------------------------------------------- t-corin (gated)
    {
      id: 't-corin',
      title: 'Mr Vale',
      participantIds: ['you', 'corin'],
      requiresContradictionIds: ['x-rafe-speech'],
      messages: [
        {
          id: 'c1',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3200,
          body: 'I have been caretaker here thirty-six years. I taught none of you anything and I know all of your names.',
        },
        {
          id: 'c2',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3208,
          body: 'I do not go by the party. I go by my rounds. I do the music block at nine and the car park barrier is on a log.',
        },
        {
          id: 'c3',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3220,
          body: 'Mr Ellory was in the music block corridor when I came to lock it. Two or three minutes past nine. I had to stand and wait for him and he did not hear me the first time I spoke.',
          claims: [
            {
              id: 'c-rafe-music',
              subject: 'rafe',
              assertedBy: 'corin',
              predicate: { kind: 'at_place', placeId: 'musicblock' },
              window: { start: 1258, end: 1266 },
              sourceMessageId: 'c3',
              label: 'Mark: in the music block, 20:58–21:06 (per Mr Vale)',
            },
          ],
        },
        {
          id: 'c4',
          threadId: 't-corin',
          senderId: 'you',
          sentAt: 3228,
          body: 'you are sure of the time',
        },
        {
          id: 'c5',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3242,
          body: 'I am sure of my round. Nine is nine and it has been nine since Mrs Hartley was head. The party can be whenever it likes.',
        },
        {
          id: 'c6',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3254,
          body: 'The barrier log has his registration out at 21:08 and back in at 21:19. It is a fob and it prints. I gave the sheet to the officer on Sunday and I have kept a photograph of it.',
          claims: [
            {
              id: 'c-rafe-carpark',
              subject: 'rafe',
              assertedBy: 'corin',
              predicate: { kind: 'at_place', placeId: 'carpark' },
              window: { start: 1268, end: 1280 },
              sourceMessageId: 'c6',
              label: 'Mark: in the staff car park, 21:08–21:20 (barrier log)',
            },
          ],
        },
        {
          id: 'c7',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3266,
          body: 'Miss Selkirk was in that hall the whole while. I put my head in twice for the fire door and she was on the same table both times, and she had her shoes in her hand.',
        },
        {
          id: 'c8',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3280,
          body: 'Miss Boateng came and found me at about half eight to say thank you. Nobody has said thank you to me at one of these before. She asked after my wife by name and my wife has been dead four years and she knew that as well.',
          claims: [
            {
              id: 'c-nia-riverpath',
              subject: 'nia',
              assertedBy: 'corin',
              predicate: { kind: 'at_place', placeId: 'riverpath' },
              window: { start: 1260, end: 1290 },
              sourceMessageId: 'c8',
              label: 'Nia: on the river path, 21:00–21:30 (per Mr Vale)',
            },
          ],
        },
        {
          id: 'c9',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3292,
          body: 'I saw her go down towards the river after that. I did not think anything of it. They all go down there. That fence has been down since 1991 and I have put in for it eleven times.',
        },
        {
          id: 'c10',
          threadId: 't-corin',
          senderId: 'corin',
          sentAt: 3306,
          body: 'I was here in 2005 as well. I unlocked this building for the police at two in the morning and I made four children a cup of tea each in the staff room and not one of them drank it.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-riverbank',
      characterId: 'rafe',
      summary:
        'Nobody touched Ashley Crewe. Four of them stood on that bank and nobody rang for twenty minutes, and Mark Ellory assembled the story before the ambulance arrived and made the other three say it after him. He has been a head teacher for six years. Nia posted an eight-page letter to Ashley’s mother the morning of the reunion.',
      establishedByMessageIds: ['n7', 'k9'],
    },
  ],

  contradictions: [
    {
      id: 'x-rafe-speech',
      claimIdA: 'c-rafe-speech',
      claimIdB: 'c-rafe-outside',
      revelation:
        'The programme says nine o’clock and there are two hundred of them printed. He spoke at quarter past eight, because the caterers were forty minutes behind and Michelle went and found him and told him to do it while people were still standing up. The invoice on her phone has hot service at 20:55. So every witness in that hall who dated something to after the speech believes they have told you after nine, and has told you after quarter past eight — and at nine, when he says he was on his feet in front of ninety people, he was outside by the bins on his phone.',
    },
    {
      id: 'x-rafe-music',
      claimIdA: 'c-rafe-hall',
      claimIdB: 'c-rafe-music',
      revelation:
        'Colin Vale does not go by the party. He goes by his rounds, and the music block is locked at nine and has been since Mrs Hartley was head. Mark Ellory was standing in that corridor at two or three minutes past, and Vale had to wait for him, and had to speak to him twice.',
    },
    {
      id: 'x-rafe-gate',
      claimIdA: 'c-rafe-hall',
      claimIdB: 'c-rafe-carpark',
      revelation:
        'The staff car park barrier is a fob and it prints. His registration is out at 21:08 and back in at 21:19. He was not in that hall for eleven minutes of the time he has accounted for, and the only person in the building who was not at a party is the one who kept the sheet.',
    },
    {
      id: 'x-tobi-branch',
      claimIdA: 'c-tobi-hall',
      claimIdB: 'c-tobi-branch',
      revelation:
        'Mark Ellory put Tobi Marchetti in that hall. Tobi was forty-one miles away at the Calderside branch office from six until two, on a rota of nine with a supervisor, and Nia moved the date of the reunion once trying to fit him in and could not. Four hundred people volunteer on that line in this region alone. It is not a rare thing to be. It only looks rare from where you are standing.',
    },
  ],

  confrontation: {
    opening:
      'I have given thirty-one years to schools in this borough and I would like you to understand what you are proposing to take apart.',
    beats: [
      {
        id: 'a-speech',
        evidence: { kind: 'contradiction', id: 'x-rafe-speech' },
        press:
          'You wrote the running order and then you moved your own speech forty-five minutes early. Every person in that room has been dating the evening off it since Saturday. At nine you were outside by the bins.',
        rebuttal:
          'The caterers were behind. Michelle Selkirk asked me to bring it forward and I brought it forward, in front of ninety people, which is a strange way to conceal something.',
      },
      {
        id: 'a-music',
        evidence: { kind: 'contradiction', id: 'x-rafe-music' },
        press:
          'Colin Vale locks the music block at nine. He found you in that corridor at three minutes past and had to speak to you twice before you heard him.',
        rebuttal:
          'He is sixty-one and he was carrying a bunch of keys round a building in the dark. I was in and out of that corridor all night. He has put two evenings together.',
      },
      {
        id: 'a-gate',
        evidence: { kind: 'contradiction', id: 'x-rafe-gate' },
        press:
          'The barrier prints. Your registration is out at 21:08 and back in at 21:19. Eleven minutes, inside the forty-five you have accounted for from the floor of the hall.',
        rebuttal: '',
      },
      {
        id: 'a-why',
        evidence: { kind: 'motive', id: 'm-riverbank' },
        press:
          'Nobody pushed Ashley Crewe. Four of you stood on that bank and nobody rang for twenty minutes, and you put the words together before the ambulance came and the other three said them after you.',
        rebuttal: '',
      },
    ],
    deflections: [
      'You were not in that year in any way that counts. You were in the room and you were not in the year.',
      'A caretaker, a barrier and a woman who has been telling people what she thinks happened on that bank since she was seventeen.',
      'Bring me one person who saw me on that path.',
    ],
    confession:
      'I went down to ask her not to send it.\n\nThat is the whole of my intention and I am aware it is worth nothing now. She told me it had gone at ten past eight that morning, from the box outside the Co-op, and I did not believe her. I thought it was the thing you say.\n\nSo I took hold of her arm. To keep her there. That is all it was for and I have said that sentence in my head about four thousand times since Saturday and it gets smaller every time.\n\nAnd she went off the top of the bank.\n\nThirty metres from where he went in. The same twenty feet. I want somebody to write that down properly because nobody has said it out loud to me yet and I have been waiting four days for somebody to.\n\nI stood there.\n\nI want to be exact, because I have spent twenty years being exact and it is the only thing I am any good at. I did not fall and I did not panic and I was not seventeen. I was forty-two and I had had two glasses of wine across four hours and I stood on that path and I counted, and at about eleven minutes I walked back up to the car park and I drove my car through a barrier that prints.\n\nI did it twice. Twenty years apart. The second time I knew exactly what I was doing and I did it anyway, and the only difference between the boy on that bank and the man on that path is that the man had already found out he could live with it.\n\nShe said we. She said it in the letter the whole way through and she said it to me on that path, and I have gone over the eight pages I never read more carefully than anything I have read in my life.\n\nI never asked her what was in it. Not once, in three weeks.\n\nI taught them that. On the bank, when we were seventeen. I said we do not talk about it, and none of us ever did, and I built a career on being a man you could go to, and I could not ask one direct question of a woman I had known since I was four.\n\nShe wasn’t going to name me.\n\nI killed her to stop a letter that had been in a postbox since ten past eight in the morning, and it did not have my name in it, and it was never going to.',
  },

  solution: {
    killerId: 'rafe',
    requiredContradictionIds: ['x-rafe-speech', 'x-rafe-music', 'x-rafe-gate'],
    requiredMotiveIds: ['m-riverbank'],
    epilogue:
      'The letter reached Brantwood Road on the Tuesday, second post, four days after Nia Boateng died and two days before it was in the local paper.\n\nEight pages. It said we the whole way through. It said there were four of them on the bank and that Ashley was not on his own in the dark and that they had shouted his name until they could not hear each other, and it said that nobody had gone in and that nobody had rung for twenty minutes, and it said Nia was sorry in a way that did not ask to be forgiven.\n\nSheila Crewe kept it in the drawer with the tea towels for a month before she gave it to anybody.\n\nMichelle Selkirk went into Ardenshaw police station on the Wednesday morning with the invoice on her phone and a statement she had written out longhand the night before, correcting one she gave in 2005 when she was seventeen. The coroner reopened the record on the strength of it. It changed nothing about how Ashley Crewe died and it changed the whole of the last twenty minutes of his life, which is what the file had been wrong about.\n\nTobi Marchetti did his shift on the Saturday. He said afterwards that he thought about not going and then went, because nine on a rota is nine on a rota.\n\nColin Vale put in for the fence a twelfth time. It went up in the November.',
  },
};
