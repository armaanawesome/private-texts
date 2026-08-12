/**
 * Tutorial — "The Bakehouse". Free, and deliberately not one of the fifteen.
 *
 * It teaches the whole loop in about five minutes, in this order: a thread is
 * somebody talking, and what they say is a claim; two claims can be pinned
 * against each other; a contradiction is one person in two places at one moment;
 * some pairs correctly refuse to fire; then you accuse.
 *
 * The fourth of those is the one a tutorial usually skips, and skipping it is
 * why players think the board is broken. So the near-misses here are authored,
 * not incidental:
 *
 *   c-tom-yard  vs c-tom-bakery   — the yard is INSIDE the bakery, so the engine
 *                                   answers "Those two places are the same area."
 *   c-roza-station vs c-roza-ovens — two places, one person, no shared minute, so
 *                                   the engine answers "These describe different
 *                                   times."
 *
 * The first of those is also taught inside the fiction: at iv5 the player puts
 * the pairing to Ivy and at iv6 she gives the same answer the engine gives, in
 * her own words. A player who never pins it still learns it by reading.
 *
 * Exactly ONE pair fires — c-roza-ovens vs c-roza-square. Every window here is
 * load-bearing. Widen Roza at the garage past 03:00 and it collides with her own
 * oven claim; widen Tom on the ovens past 03:10 and it collides with Roza's
 * account of his smoke break. Either one silently gives the tutorial a second
 * contradiction and teaches the wrong lesson.
 *
 * Times are minutes since the case epoch (day 1, 00:00). Tom dies on day 1 at
 * roughly 03:45 = 225. No arc content: no coda, no caller, nothing to carry.
 */
export const tutorialRaw = {
  id: 'tutorial',
  title: 'The Bakehouse',
  blurb:
    'Start here. Your father died in the yard behind his own bakery and the handbrake took the blame. Three conversations, and one sentence in them that cannot be true.',
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    { id: 'tom', name: 'Dad', avatarColor: '#8A6D3B' },
    { id: 'roza', name: 'Roza', avatarColor: '#B4442F' },
    { id: 'ivy', name: 'Ivy', avatarColor: '#4E7FA8' },
  ],
  /**
   * The nesting is the lesson. `yard` and `ovens` both sit inside `bakery`, so
   * "he was in the yard" and "he was at the bakery" cannot conflict — which is
   * the near-miss the player is meant to walk into.
   */
  places: [
    { id: 'bakery', name: 'Vardy’s' },
    { id: 'ovens', name: 'the bakehouse', parentId: 'bakery' },
    { id: 'yard', name: 'the back yard', parentId: 'bakery' },
    { id: 'square', name: 'the market square' },
    { id: 'station', name: 'the garage on the bypass' },
  ],
  briefing: {
    victimId: 'tom',
    foundAt: { placeId: 'yard', minutes: 250 },
    causeOfDeath: 'Struck by the delivery van in the yard.',
    ruling: 'The handbrake. Recorded as accidental, no further enquiry.',
    opening:
      'Tom Vardy baked through the night at the top of the market square for thirty one years. The two mornings he missed were the one after his wife died and the one after you were born.\n\nThey found him in the back yard at ten past four with the van against the wall and the handbrake off. Everybody has been very kind. Everybody also has an account of that night, and an account is only somebody’s word for it.',
  },

  threads: [
    // ----------------------------------------------------------------- t-tom
    // Open from the start. The player meets him alive, and his own message is a
    // claim like anybody else's — the first thing the tutorial has to land.
    {
      id: 't-tom',
      title: 'Dad',
      participantIds: ['you', 'tom'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 't1',
          threadId: 't-tom',
          senderId: 'tom',
          sentAt: 120,
          body: 'Ovens on. Two hours ahead of myself. Could not sleep again.',
        },
        {
          id: 't2',
          threadId: 't-tom',
          senderId: 'you',
          sentAt: 123,
          body: 'its 2am',
        },
        {
          id: 't3',
          threadId: 't-tom',
          senderId: 'tom',
          sentAt: 125,
          body: 'It is two in the morning here as well, kiddo. I am on the ovens until the first drop at three. Talk to me.',
          claims: [
            {
              id: 'c-tom-ovens',
              subject: 'tom',
              assertedBy: 'tom',
              predicate: { kind: 'at_place', placeId: 'ovens' },
              window: { start: 125, end: 180 },
              sourceMessageId: 't3',
              label: 'Dad: on the ovens, 02:05–03:00',
            },
          ],
        },
        {
          id: 't4',
          threadId: 't-tom',
          senderId: 'tom',
          sentAt: 134,
          body: 'I went past the corner on the bypass this morning. She still puts flowers out. Three years on Thursday and I have not said a word in any of them.',
        },
        {
          id: 't5',
          threadId: 't-tom',
          senderId: 'you',
          sentAt: 139,
          body: 'dad what are you talking about',
        },
        {
          id: 't6',
          threadId: 't-tom',
          senderId: 'tom',
          sentAt: 146,
          body: 'I told her tonight that I am going in on Monday. Whatever it costs the pair of us.\n\nShe took it better than I expected. That is the part I cannot settle.',
        },
        {
          id: 't7',
          threadId: 't-tom',
          senderId: 'tom',
          sentAt: 218,
          body: 'Somebody has left the van on the slope again. I will shift it when the second lot is in.',
        },
        {
          id: 't8',
          threadId: 't-tom',
          senderId: 'you',
          sentAt: 1466,
          body: 'i keep opening this and there is nothing new in it',
        },
      ],
    },

    // ---------------------------------------------------------------- t-roza
    // Open from the start. She is asked one question and answers four, with
    // times nobody requested. Two of the three claims she volunteers are true.
    {
      id: 't-roza',
      title: 'Roza Bielik',
      participantIds: ['you', 'roza'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'r1',
          threadId: 't-roza',
          senderId: 'roza',
          sentAt: 1500,
          body: 'I am so sorry. I should have come to you myself instead of letting a policeman say it to you on a doorstep. I have started this message four times.',
        },
        {
          id: 'r2',
          threadId: 't-roza',
          senderId: 'roza',
          sentAt: 1504,
          body: 'Twenty two years I have worked beside your father. He gave me a job when I was nineteen and could barely ask for one in English, and he never once made me feel it.',
        },
        {
          id: 'r3',
          threadId: 't-roza',
          senderId: 'you',
          sentAt: 1512,
          body: 'they keep telling me it was the handbrake',
        },
        {
          id: 'r4',
          threadId: 't-roza',
          senderId: 'roza',
          sentAt: 1518,
          body: 'I went out at twenty past two for milk, the garage on the bypass, because we were short and he takes it in his tea. I was back before half two.\n\nI tell you this the same as I told them, because you should have it the same as they did.',
          claims: [
            {
              id: 'c-roza-station',
              subject: 'roza',
              assertedBy: 'roza',
              predicate: { kind: 'at_place', placeId: 'station' },
              window: { start: 140, end: 165 },
              sourceMessageId: 'r4',
              label: 'Roza: at the garage on the bypass, 02:20–02:45',
            },
          ],
        },
        {
          id: 'r5',
          threadId: 't-roza',
          senderId: 'roza',
          sentAt: 1521,
          body: 'After that I did not come off the ovens. Not once between three and four. If I had, I would have seen him go out.',
          claims: [
            {
              id: 'c-roza-ovens',
              subject: 'roza',
              assertedBy: 'roza',
              predicate: { kind: 'at_place', placeId: 'ovens' },
              window: { start: 180, end: 240 },
              sourceMessageId: 'r5',
              label: 'Roza: on the ovens, 03:00–04:00',
            },
          ],
        },
        {
          id: 'r6',
          threadId: 't-roza',
          senderId: 'roza',
          sentAt: 1526,
          body: 'He went out the back for his smoke about ten past three. He always did, between the second and the third. He was out there half an hour and I thought nothing of it, because why would I.',
          claims: [
            {
              id: 'c-tom-yard',
              subject: 'tom',
              assertedBy: 'roza',
              predicate: { kind: 'at_place', placeId: 'yard' },
              window: { start: 190, end: 220 },
              sourceMessageId: 'r6',
              label: 'Dad: out in the back yard, 03:10–03:40 (per Roza)',
            },
          ],
        },
        {
          id: 'r7',
          threadId: 't-roza',
          senderId: 'you',
          sentAt: 1533,
          body: 'did you hear anything',
        },
        {
          id: 'r8',
          threadId: 't-roza',
          senderId: 'roza',
          sentAt: 1541,
          body: 'Nothing. The extractor is very loud and I had the mixer on the second bowl. I have gone over it and over it.\n\nIvy came at five to open the shop and I sent her home. Nineteen years old. She should not have had to see the yard like that.',
        },
      ],
    },

    // ----------------------------------------------------------------- t-ivy
    // Found, not unlocked. Roza names her at r8 and she becomes reachable — the
    // discovery gate, which is also the gentlest one to teach on.
    {
      id: 't-ivy',
      title: 'Ivy',
      participantIds: ['you', 'ivy'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['r8'],
      messages: [
        {
          id: 'iv1',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1610,
          body: 'hi im so sorry to message you im ivy from the counter at vardys. sorry i know this is the worst possible time x',
        },
        {
          id: 'iv2',
          threadId: 't-ivy',
          senderId: 'you',
          sentAt: 1618,
          body: 'its ok. roza said you were there at five',
        },
        {
          id: 'iv3',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1624,
          body: 'i was but thats not why im messaging. i couldnt sleep that night. i was sat at my window with the light off because id had a row with my mum and i didnt want her knowing i was up',
        },
        {
          id: 'iv4',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1627,
          body: 'the extractor fan was going the whole time so i knew tom was in. you can hear it right across the square. it went from three o clock till after four when the ambulance come',
          claims: [
            {
              id: 'c-tom-bakery',
              subject: 'tom',
              assertedBy: 'ivy',
              predicate: { kind: 'at_place', placeId: 'bakery' },
              window: { start: 180, end: 240 },
              sourceMessageId: 'iv4',
              label: 'Dad: at Vardy’s, 03:00–04:00 (per Ivy)',
            },
          ],
        },
        // The near-miss, put to a witness in the player's own voice, so that a
        // player who never touches the board still meets the rule.
        {
          id: 'iv5',
          threadId: 't-ivy',
          senderId: 'you',
          sentAt: 1630,
          body: 'roza says he was out the back for a smoke from ten past three. you say he never left the bakery',
        },
        {
          id: 'iv6',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1633,
          body: 'the yard is the bakery though. you go out the back door and youre still stood in it. sorry thats not me being funny its just the same building',
        },
        {
          id: 'iv7',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1638,
          body: 'this is the bit i keep thinking about. i saw roza on the square at twenty past three. she come out the front door and went round the side. i seen her face under the lamp',
          claims: [
            {
              id: 'c-roza-square',
              subject: 'roza',
              assertedBy: 'ivy',
              predicate: { kind: 'at_place', placeId: 'square' },
              window: { start: 195, end: 210 },
              sourceMessageId: 'iv7',
              label: 'Roza: on the market square, 03:15–03:30 (per Ivy)',
            },
          ],
        },
        {
          id: 'iv8',
          threadId: 't-ivy',
          senderId: 'you',
          sentAt: 1644,
          body: 'shes told me she never came off the ovens between three and four',
        },
        {
          id: 'iv9',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1650,
          body: 'i know. i said it to the policeman and he wrote it down and then he asked me if id been drinking. i hadnt. i was sat at a window in the dark like a weirdo and i know exactly what i saw',
        },
        {
          id: 'iv10',
          threadId: 't-ivy',
          senderId: 'ivy',
          sentAt: 1662,
          body: 'theres one more thing and then ill leave you alone. couple of weeks back tom asked me how you hand yourself in for something you never did but you were sat right next to. i thought he was on about a film. he said roza would take it worse than him x',
        },
      ],
    },
  ],

  /**
   * One motive, and neither half of it is a confession.
   *
   * Tom names the corner and the three years of silence; Ivy repeats a question
   * he asked her that she did not understand. Separately they are two sad
   * fragments. Read together they are the reason, which is the point — the
   * player assembles it, nobody hands it over.
   */
  motives: [
    {
      id: 'm-bypass',
      characterId: 'roza',
      summary:
        'Three years ago the bakery van hit a man on the bypass at four in the morning. Roza was driving, Tom was asleep in the passenger seat, and between them they called it a deer. That week he told her he was going to the police on Monday.',
      establishedByMessageIds: ['t4', 'iv10'],
    },
  ],

  contradictions: [
    {
      id: 'x-roza-square',
      claimIdA: 'c-roza-ovens',
      claimIdB: 'c-roza-square',
      revelation:
        'She never came off the ovens between three and four. She said so to a policeman and then she said so to you.\n\nAt twenty past three a nineteen year old sitting at a dark window watched her come out of the front door and go round the side of the building. The yard is the only thing round the side.',
    },
  ],

  confrontation: {
    opening:
      'Say it, then. I have been waiting three days for somebody to say it, and I would rather it was you than a man with a folder.',
    beats: [
      {
        id: 'b-square',
        evidence: { kind: 'contradiction', id: 'x-roza-square' },
        press:
          'You told me twice you never came off the ovens between three and four. Ivy watched you come out of the front door at twenty past three and go round the side.',
        rebuttal:
          'A girl at a window, in the dark, at three in the morning, who had just been sent home from a yard. And you would put that against twenty two years of me.',
      },
      {
        id: 'b-why',
        evidence: { kind: 'motive', id: 'm-bypass' },
        press:
          'Three years ago you were driving that van on the bypass. He was asleep beside you and the pair of you called it a deer. He told you that night he was going in on Monday.',
        rebuttal: '',
      },
    ],
    deflections: [
      'That proves nothing at all.',
      'You have not been here in a long time. You do not know what you are looking at.',
      'Ask me something you can actually hold.',
    ],
    confession:
      'He was stood at the back of it with his hand on the door and he was not even angry with me. That is the thing I cannot get past. He turned round and he said come and look at this handbrake, Roza, one of us is going to get hurt.\n\nI went round the front and I let it off.\n\nI have told myself for three days that I did not decide it. That is a lie the same size as the deer. I decided it at ten past three, at the sink, with my hands in the water.\n\nHe gave me a job when I was nineteen and could not ask for one properly. I have had a whole life out of that. On Monday he was going to hand it all back, and I could not think past that, and I still cannot.',
  },

  solution: {
    killerId: 'roza',
    requiredContradictionIds: ['x-roza-square'],
    // Breaking the alibi is not enough here either. You have to be able to say why.
    requiredMotiveIds: ['m-bypass'],
    epilogue:
      'She said the whole of it before the tape was running, and then said it again for the tape without changing a word.\n\nThe man on the bypass was called Peter Osei. He was fifty four and he was walking home from a shift at the depot because the last bus had gone. His mother still puts flowers on that corner every year. This year there were two lots, because your father had already been.\n\nVardy’s did not open again. Ivy took a job at the big bakery on the retail park and says the bread is fine and it is not the same. She has messaged you every Sunday since.',
  },
};
