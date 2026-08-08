/**
 * FIXTURE — not the shipping case.
 *
 * Exists so the routes, board, and accusation loop are exercisable before Task 13
 * writes the real 20-minute case. Deliberately tiny: 3 characters, 2 threads,
 * 1 contradiction. Replace with `the-lighthouse.ts`, do not extend this.
 *
 * Times are minutes since the case epoch, so 1300 = 21:40.
 */
export const fixtureRaw = {
  id: 'fixture',
  title: 'The Ferry (fixture)',
  blurb: 'A placeholder case used to exercise the deduction loop.',
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'nadia', name: 'Nadia', avatarColor: '#C4483C' },
    { id: 'tom', name: 'Tom', avatarColor: '#4E8CF0' },
  ],
  places: [
    { id: 'harbour', name: 'the harbour' },
    { id: 'pier', name: 'the pier', parentId: 'harbour' },
    { id: 'studio', name: 'the studio' },
  ],
  threads: [
    {
      id: 'group',
      title: 'The group chat',
      participantIds: ['you', 'nadia', 'tom'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'g1',
          threadId: 'group',
          senderId: 'tom',
          sentAt: 1300,
          body: 'has anyone actually heard from her today',
        },
        {
          id: 'g2',
          threadId: 'group',
          senderId: 'nadia',
          sentAt: 1304,
          body: "not since this morning. I've been at the studio all evening, no signal in there",
          claims: [
            {
              id: 'c-nadia-studio',
              subject: 'nadia',
              assertedBy: 'nadia',
              predicate: { kind: 'at_place', placeId: 'studio' },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 'g2',
              label: 'Nadia: at the studio, 21:00-23:00',
            },
          ],
        },
        {
          id: 'g3',
          threadId: 'group',
          senderId: 'you',
          sentAt: 1310,
          body: 'the police are asking where everyone was',
        },
        {
          id: 'g4',
          threadId: 'group',
          senderId: 'tom',
          sentAt: 1315,
          body: 'I walked down to the pier around ten. Nadia was there, I saw her by the kiosk',
          claims: [
            {
              id: 'c-nadia-pier',
              subject: 'nadia',
              assertedBy: 'tom',
              predicate: { kind: 'at_place', placeId: 'pier' },
              window: { start: 1315, end: 1330 },
              sourceMessageId: 'g4',
              label: 'Nadia: at the pier, 21:55-22:10 (per Tom)',
            },
          ],
        },
        {
          id: 'g5',
          threadId: 'group',
          senderId: 'nadia',
          sentAt: 1320,
          body: 'you did not see me. you were mistaken',
        },
      ],
    },
    {
      id: 'tom-dm',
      title: 'Tom',
      participantIds: ['you', 'tom'],
      requiresContradictionIds: ['x-nadia-two-places'],
      messages: [
        {
          id: 't1',
          threadId: 'tom-dm',
          senderId: 'tom',
          sentAt: 1400,
          body: "I know what I saw. she had the keys in her hand.",
        },
      ],
    },
  ],
  contradictions: [
    {
      id: 'x-nadia-two-places',
      claimIdA: 'c-nadia-studio',
      claimIdB: 'c-nadia-pier',
      revelation:
        'She cannot have been shut in the studio and standing on the pier at the same time. One of those is a lie, and only she had a reason to tell it.',
    },
  ],
  solution: {
    killerId: 'nadia',
    requiredContradictionIds: ['x-nadia-two-places'],
    epilogue:
      'She stopped answering after that. The keys turned up in the water by the kiosk three days later.',
  },
};
