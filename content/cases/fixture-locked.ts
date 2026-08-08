import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * FIXTURE — not the shipping case. Task 16 replaces this with `the-understudy`.
 *
 * Exists so the paywall has something to gate: without a locked case there is
 * no route to /paywall and the purchase path cannot be tested.
 *
 * Note what is sold — a whole additional case, never the answer to the free one.
 * A paywall over a mystery's ending dies to one YouTube upload.
 */
export const lockedFixtureRaw = {
  id: 'fixture-locked',
  title: 'The Understudy (fixture)',
  blurb: 'A second body, a smaller cast, and an alibi that depends on a train time.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'priya', name: 'Priya', avatarColor: '#E4B363' },
    { id: 'sam', name: 'Sam', avatarColor: '#4E8CF0' },
  ],
  places: [
    { id: 'theatre', name: 'the theatre' },
    { id: 'station', name: 'the station' },
  ],
  threads: [
    {
      id: 'cast',
      title: 'Cast chat',
      participantIds: ['you', 'priya', 'sam'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'u1',
          threadId: 'cast',
          senderId: 'sam',
          sentAt: 1140,
          body: 'curtain was 7. she never showed.',
        },
        {
          id: 'u2',
          threadId: 'cast',
          senderId: 'priya',
          sentAt: 1145,
          body: 'I was on the 7:05 out of the station, I couldn’t have been there',
          claims: [
            {
              id: 'u-priya-station',
              subject: 'priya',
              assertedBy: 'priya',
              predicate: { kind: 'at_place', placeId: 'station' },
              window: { start: 1140, end: 1160 },
              sourceMessageId: 'u2',
              label: 'Priya: at the station, 19:00-19:20',
            },
          ],
        },
        {
          id: 'u3',
          threadId: 'cast',
          senderId: 'sam',
          sentAt: 1150,
          body: 'you handed me the spare key backstage at ten past. I still have it.',
          claims: [
            {
              id: 'u-priya-theatre',
              subject: 'priya',
              assertedBy: 'sam',
              predicate: { kind: 'at_place', placeId: 'theatre' },
              window: { start: 1150, end: 1155 },
              sourceMessageId: 'u3',
              label: 'Priya: backstage at the theatre, 19:10 (per Sam)',
            },
          ],
        },
      ],
    },
  ],
  contradictions: [
    {
      id: 'u-priya-two-places',
      claimIdA: 'u-priya-station',
      claimIdB: 'u-priya-theatre',
      revelation:
        'The 7:05 does not stop backstage. She was holding the key ten minutes after she says she left.',
    },
  ],
  solution: {
    killerId: 'priya',
    requiredContradictionIds: ['u-priya-two-places'],
    epilogue: 'The spare key was never returned to the board. Sam kept it, and then kept quiet.',
  },
};
