import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * Case 15 — "The Listener". The finale.
 *
 * Shape of the lie, per docs/pack-ledger.md: **he has never lied. Except once,
 * in Pack 1.**
 *
 * The structural problem this pack exists to solve: for fourteen packs he has
 * asserted nothing. He telephones, about ninety seconds, and he never suggests
 * or instructs — he waits until they say it out loud themselves and then agrees.
 * No prosecutor can quote a sentence because he has never said one. The engine
 * needs claims, and a man who makes none cannot be broken by it.
 *
 * So you make him correct you. He is a critic, and a critic cannot let a wrong
 * account of his own work stand. You close Ardnoe as a coincidence — an auditor's
 * clerk who got it wrong — and he will not have it, because the wording was the
 * craft and the craft is the only thing he has. In correcting you he puts himself
 * on that call, and everything else follows.
 *
 * Story Lens, the last inversion: he is not a sadist and he is not playing with
 * you. He is checking. He hears the moment somebody stops being able to not do
 * it, and he has wanted to know whether he is right since 1996. An arrangement
 * that reads as an accident tells him nothing — it has to be *solved* before it
 * counts. Which is why he needed a detective, and why he has kept one.
 *
 * You were never his opponent. You were his instrument. And the game has spent
 * fifteen packs proving you are very good at it.
 *
 * The proof is the first clue in the game. `x-papers-lie` has sat in
 * the-lighthouse.ts since Pack 1, gating nothing, required by nothing, written so
 * a player could finish that case having never noticed it. Claims cannot cross
 * case scripts, so the lie is re-recorded here from the Ardnoe file — which is
 * also the right dramatic move. You go back and read your own first case.
 */
export const theListenerRaw = {
  id: 'the-listener',
  title: 'The Listener',
  blurb:
    'He has told you the truth for fifteen cases. He lied exactly once, to somebody else, and you wrote it down without knowing what it was.',
  requiredEntitlementId: CASE_PACK_ENTITLEMENT,
  characters: [
    { id: 'you', name: 'You', avatarColor: '#2F6F4E' },
    // He is never named in the nameplate. Fifteen packs of a new number every
    // time, and the old ones going dead, and this is how you know him. DS Nkemdi
    // says the name out loud in a message, which is where it belongs.
    { id: 'listener', name: 'Unknown number', avatarColor: '#4A4A52' },
    { id: 'nkemdi', name: 'DS Nkemdi', avatarColor: '#3E6E8E' },
    { id: 'mairi', name: 'Mairi Bell', avatarColor: '#9C5B4E' },
    { id: 'beth', name: 'Beth', avatarColor: '#C9A227' },
    { id: 'ruth', name: 'Ruth Calder', avatarColor: '#5E8C6A' },
  ],
  places: [
    { id: 'ardnoe', name: 'Ardnoe' },
    { id: 'tower', name: 'the lighthouse', parentId: 'ardnoe' },
    { id: 'cafe', name: 'the café', parentId: 'ardnoe' },
    // Four miles out on the Kilmorack road, which is why nobody in a village of
    // two hundred people ever saw a stranger.
    { id: 'callbox', name: 'the call box on the Kilmorack road' },
    { id: 'home', name: 'his flat in Kirkcaldy' },
    { id: 'hospital', name: 'the Vale of Leven, ward 6' },
  ],
  objects: [],

  briefing: {
    victimId: 'ruth',
    foundAt: { placeId: 'tower', minutes: 1330 },
    causeOfDeath:
      'A fall from the tower stairs. It was your first case back and you closed it in four days.',
    ruling:
      'Closed. Mairi Bell pled guilty in the November and is eleven years into a life sentence, and nothing in this file has ever been in doubt.',
    opening:
      'Ruth Calder kept the light at Ardnoe Point for forty years after they automated it, because nobody ever asked her to stop.\n\nShe was your aunt.\n\nYou came in on the last ferry, and you proved what happened to her in four days, and Mairi Bell has never once said otherwise.\n\nWhat you did not do was ask why a woman who had known Ruth since they were five could not find the moment she decided. She told you there had been a telephone call. You wrote it down.\n\nYou have written down five more since.',
  },

  threads: [
    // ------------------------------------------------------------ t-listener
    {
      id: 't-listener',
      title: 'Unknown number',
      participantIds: ['you', 'listener'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'l1',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 40,
          body: 'Ardnoe was good work. Four days. I had allowed a fortnight and I am not often wrong by that much.',
        },
        {
          id: 'l2',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 60,
          body: 'The care home was better. You went at the drug round and not at the woman, which is the harder thing to do and almost nobody does it.',
        },
        {
          id: 'l3',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 80,
          body: 'I thought less of the ferry business. You had him on the second day and you spent four more making certain, and I understand why, but there is a version of you that does not need the four days and I have met them.',
        },
        {
          id: 'l4',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 100,
          body: 'Eleven now. I have kept all of them. I would not expect you to believe that and it does not matter whether you do.',
        },
        {
          id: 'l5',
          threadId: 't-listener',
          senderId: 'you',
          sentAt: 3400,
          body: 'i am closing ardnoe',
        },
        {
          id: 'l6',
          threadId: 't-listener',
          senderId: 'you',
          sentAt: 3404,
          body: 'the call to the cafe was a clerk at the auditors. gordon and sime had four temps on that account that autumn and one of them phoned the wrong number with the wrong file open and never knew. it was a coincidence. everything since has been me building a man i called the keeper out of one bad phone call',
        },
        {
          id: 'l7',
          threadId: 't-listener',
          senderId: 'you',
          sentAt: 3408,
          body: 'there is no you. there never was. i am sorry it took eleven years',
        },
        {
          id: 'l8',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3440,
          body: 'No.',
        },
        {
          id: 'l9',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3448,
          body: 'I have not spoken to Mairi Bell in my life and I did not speak to her that night. I want that on the record between us, because you have gone to a great deal of trouble over eleven years and you should not finish on something as poor as a temp with the wrong file open.',
          claims: [
            {
              id: 'c-listener-never',
              subject: 'listener',
              assertedBy: 'listener',
              predicate: {
                kind: 'doing',
                actionId: 'never_spoke_to_mairi_bell',
                exclusiveGroup: 'listener-ardnoe',
              },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 'l9',
              label: 'Him: never spoke to Mairi Bell, 21:00–23:00',
            },
          ],
        },
        {
          id: 'l10',
          threadId: 't-listener',
          senderId: 'you',
          sentAt: 3456,
          body: 'a temp read out a line off a file. she panicked. that is the whole of it',
        },
        {
          id: 'l11',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3470,
          body: 'A temp would have said the papers had been sent.',
        },
        {
          id: 'l12',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3474,
          body: 'Sent is a thing that can be stopped. You can telephone a firm at nine in the morning and ask for a letter back and people do it every day of the week.\n\nWhat she was told was that they were already with the auditors, which is not the same sentence and was never meant to be. It puts the paper on a stranger’s desk and it takes the morning away from her, and the morning was the only thing she still thought she had.\n\nNinety-four seconds. I have never needed more than two minutes with anybody and I did not need two minutes with her.',
          claims: [
            {
              id: 'c-listener-wording',
              subject: 'listener',
              assertedBy: 'listener',
              predicate: {
                kind: 'doing',
                actionId: 'choosing_the_wording_on_that_call',
                exclusiveGroup: 'listener-ardnoe',
              },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 'l12',
              label: 'Him: chose the wording on that call, 21:00–23:00',
            },
          ],
        },
        {
          id: 'l13',
          threadId: 't-listener',
          senderId: 'you',
          sentAt: 3482,
          body: 'you have just told me you made the call',
        },
        {
          id: 'l14',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3496,
          body: 'I have told you that the account you are about to file is wrong. Those are different things and you know they are, and a jury would be shown the difference by a competent man in about four minutes.',
        },
        {
          id: 'l15',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3510,
          body: 'And before you go any further with it. I have been in the same flat in Kirkcaldy for nineteen years and I was in it that Thursday, as I am every Thursday, and there is not one photograph, one ticket or one witness that puts me within a hundred and forty miles of that village on that night or on any other.',
          claims: [
            {
              id: 'c-listener-home',
              subject: 'listener',
              assertedBy: 'listener',
              predicate: { kind: 'at_place', placeId: 'home' },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 'l15',
              label: 'Him: at his flat in Kirkcaldy, 21:00–23:00',
            },
          ],
        },
        {
          id: 'l16',
          threadId: 't-listener',
          senderId: 'listener',
          sentAt: 3524,
          body: 'I follow all of them up. I have said that to you before and you took it for a boast. It is the opposite of a boast. It is the only way of finding out, and finding out is the entire point, and I have never once been able to ask anybody whether I had it right.',
        },
      ],
    },

    // -------------------------------------------------------------- t-nkemdi
    {
      id: 't-nkemdi',
      title: 'DS Nkemdi',
      participantIds: ['you', 'nkemdi'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'k1',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2400,
          body: 'I have had the Ardnoe file out for three weeks and I want to say at the start that nothing in it is wrong. Mairi Bell killed Ruth Calder and you proved it and she has never said otherwise.',
        },
        {
          id: 'k2',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2412,
          body: 'The notebook is still in the evidence store. Ruth wrote the whole of the Trust business in the back of her survey log, in her own hand, with the date she meant to go to the police, and it was up in the tower where she left it. Nothing went to any auditor. Nothing was ever sent anywhere.',
          claims: [
            {
              id: 'c-papers-kept',
              subject: 'ruth',
              assertedBy: 'nkemdi',
              predicate: {
                kind: 'doing',
                // Matches Pack 1 exactly. the-listener.test.ts pins both claims
                // against the-lighthouse.ts, so the finale breaks loudly if
                // anybody edits the tutorial case's clue.
                actionId: 'still_had_the_papers',
                exclusiveGroup: 'ruth-papers',
              },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 'k2',
              label: 'Ruth: kept the papers in her own notebook, 21:00–23:00 (evidence store)',
            },
          ],
        },
        {
          id: 'k3',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2424,
          body: 'Gordon and Sime never held the Ardnoe Light Trust account. Not that year, not ever. I have it from their compliance partner in writing and I have the client list. There was no clerk and there were no temps.',
        },
        {
          id: 'k4',
          threadId: 't-nkemdi',
          senderId: 'you',
          sentAt: 2432,
          body: 'the cafe line',
        },
        {
          id: 'k5',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2448,
          body: 'One incoming call that evening. 21:31, ninety-four seconds, from the coin box on the Kilmorack road. It is four miles out and it is the last one standing between there and the main road, and that is why nobody in a village of two hundred people ever saw a stranger.',
          claims: [
            {
              id: 'c-listener-box',
              subject: 'listener',
              assertedBy: 'nkemdi',
              predicate: { kind: 'at_place', placeId: 'callbox' },
              window: { start: 1291, end: 1293 },
              sourceMessageId: 'k5',
              label: 'The caller: at the Kilmorack road call box, 21:31–21:33 (line records)',
            },
          ],
        },
        {
          id: 'k6',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2456,
          body: 'The duration has never been published. It is not in the trial bundle, it is not in the coroner’s papers and it is not in anything a journalist has ever had. Four people alive know it is ninety-four seconds and until this week three of them were police.',
        },
        {
          id: 'k7',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2470,
          body: 'His name is John Fettes. Sixty-nine. Retired from a housing office in 2016, no record of any kind, no debts, and a library card he has used every fortnight since 1991.',
        },
        {
          id: 'k8',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2478,
          body: 'Nine years on a listening line and eleven more training the people who took the calls after him. He wrote the module on reflective phrasing that half the volunteers in this country still learn from. That is not a secret either. He was given a small award for it.',
        },
        {
          id: 'k9',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2492,
          body: 'Two names come off that call box for the twelve weeks around it. Fettes is not one of them, because a coin box does not take a name. The other is a Bethan Ivory, who lived a mile up that road and used it three times that month.',
          claims: [
            {
              id: 'c-beth-box',
              subject: 'beth',
              assertedBy: 'nkemdi',
              predicate: { kind: 'at_place', placeId: 'callbox' },
              window: { start: 1291, end: 1293 },
              sourceMessageId: 'k9',
              label: 'Beth Ivory: at the Kilmorack road call box, 21:31–21:33 (per the trace)',
            },
          ],
        },
        {
          id: 'k10',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2506,
          body: 'She has been ringing this station about him since 2011 and there are four logs of it and nobody ever went out. Write to her. She has been waiting a very long time for somebody who would not put the phone down.',
        },
        {
          id: 'k11',
          threadId: 't-nkemdi',
          senderId: 'nkemdi',
          sentAt: 2520,
          body: 'And Mairi Bell has asked to speak to you. She has asked twice a year for eleven years and this is the first time anybody has passed it on, and I am not proud of that.',
        },
      ],
    },

    // ---------------------------------------------------------------- t-ruth
    {
      id: 't-ruth',
      title: 'R. Calder (archived)',
      participantIds: ['you', 'ruth', 'nkemdi'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'r1',
          threadId: 't-ruth',
          senderId: 'nkemdi',
          sentAt: 2600,
          body: 'Her handset came back from the lab eleven years ago and it has been in the store since. This is what was on it. I thought you should have it rather than read it in a bundle.',
        },
        {
          id: 'r2',
          threadId: 't-ruth',
          senderId: 'ruth',
          sentAt: 2604,
          // Her voice is Pack 1's exactly: lowercase, no apostrophes, blunt. She
          // was written that way in the-lighthouse.ts and a player who did the
          // tutorial will hear it before they read it.
          body: 'the trust books dont add up and ive been through them four times now. its not a mistake. its been going on a long while',
        },
        {
          id: 'r3',
          threadId: 't-ruth',
          senderId: 'ruth',
          sentAt: 2608,
          body: 'ive written the whole of it in the back of the survey log because i dont trust myself to say it out loud without softening it',
        },
        {
          id: 'r4',
          threadId: 't-ruth',
          senderId: 'ruth',
          sentAt: 2612,
          body: 'monday. ill go in on the monday and take the log with me and they can do what they like with it after that',
        },
        {
          id: 'r5',
          threadId: 't-ruth',
          senderId: 'ruth',
          sentAt: 2616,
          body: 'M has been my friend since we were five and i keep coming back to that and it keeps not changing anything',
        },
        {
          id: 'r6',
          threadId: 't-ruth',
          senderId: 'ruth',
          sentAt: 2620,
          // Word for word her last message in Pack 1. It was the night of the
          // equinox storm, not a still night — an earlier draft of this archive
          // had her admiring the weather she died in.
          body: 'im away up the tower, the lamp is playing up again. forty years automated and it still wants a person standing beside it',
        },
      ],
    },

    // --------------------------------------------------- t-mairi (discovery)
    {
      id: 't-mairi',
      title: 'Mairi Bell',
      participantIds: ['you', 'mairi'],
      requiresContradictionIds: [],
      requiresReadMessageIds: ['k11'],
      messages: [
        {
          id: 'm1',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2800,
          body: 'They tell me you have to pay for these by the message so I will not waste them on how I am.',
        },
        {
          id: 'm2',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2808,
          body: 'I killed Ruth Calder. I have never once said different and I am not going to start now, and if this is you coming to take that off me you can save your money.',
        },
        {
          id: 'm3',
          threadId: 't-mairi',
          senderId: 'you',
          sentAt: 2814,
          body: 'the keeper. what did he say. the exact words',
        },
        {
          id: 'm4',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2830,
          body: 'Eleven years I have been going over it, so you will get it right.\n\nHe said he was with the auditors. He said Ruth had already sent the papers down and they were with them now, and it was out of her hands, and Callum would be named on them by the Monday whatever anybody did.',
          claims: [
            {
              id: 'c-papers-sent',
              subject: 'ruth',
              assertedBy: 'mairi',
              predicate: {
                kind: 'doing',
                actionId: 'had_already_sent_the_papers',
                exclusiveGroup: 'ruth-papers',
              },
              window: { start: 1260, end: 1380 },
              sourceMessageId: 'm4',
              label: 'Ruth: had already sent the papers, 21:00–23:00 (per the caller)',
            },
          ],
        },
        {
          id: 'm5',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2842,
          body: 'And then he did not say anything at all. That is the bit nobody has ever asked me about. I talked and he let me and he did not interrupt me the whole time, and I told a stranger things I have not told a priest.',
        },
        {
          id: 'm6',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2854,
          body: 'When I had finished he said, then you already know. Four words. And he put the phone down and I got my coat.',
        },
        {
          id: 'm7',
          threadId: 't-mairi',
          senderId: 'you',
          sentAt: 2860,
          body: 'you never said that at trial',
        },
        {
          id: 'm8',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2876,
          body: 'My own solicitor told me it sounded like a woman building herself a door out. And he was right, it does, and I was guilty and I did not want a door out. I wanted Callum to not have to stand up in a room.',
        },
        {
          id: 'm9',
          threadId: 't-mairi',
          senderId: 'mairi',
          sentAt: 2890,
          body: 'I am not asking you to make it less than it is. I went up there. Nobody carried me.\n\nBut I would like one person before I die to know that I was three days off going to her and giving her the whole of it myself, and that a man who called himself the Keeper rang me at half past nine and took the three days away.',
        },
      ],
    },

    // -------------------------------------------------------- t-beth (gated)
    {
      id: 't-beth',
      title: 'Beth Ivory',
      participantIds: ['you', 'beth'],
      requiresContradictionIds: ['x-papers'],
      messages: [
        {
          id: 'b1',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3000,
          body: 'Fifteen years. I have rung that station four times and the last one was 2019 and the lad was very kind to me and did nothing at all.',
        },
        {
          id: 'b2',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3010,
          body: 'He rang me in the March of 2011. I was as low as a person gets and I had got to the point where I had worked out the how, which is the point where it stops being a feeling.',
        },
        {
          id: 'b3',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3022,
          body: 'He never told me to do anything. I want to be very clear about that because it is what nobody believes. He asked me what I was going to do and then he let me talk for the whole of it, and I have never been listened to like that before or since.',
        },
        {
          id: 'b4',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3034,
          body: 'And I put the phone down and I sat there and I thought, that man wanted me to say it. He never asked me to do it. He wanted me to say it out loud first. And I could not tell you to this day what the difference is except that I felt it.',
        },
        {
          id: 'b5',
          threadId: 't-beth',
          senderId: 'you',
          sentAt: 3042,
          body: 'they know you used that call box',
        },
        {
          id: 'b6',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3056,
          body: 'I used it every week for four years. There was no signal up that road until 2014 and there were maybe nine of us who used that box and every one of us is on that list.',
        },
        {
          id: 'b7',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3068,
          body: 'On the Thursday you are asking about I was on ward 6 at the Vale of Leven and had been since the Tuesday. Admitted, not attending. It is on my record and I have never once been able to say that sentence to anybody without my face going, and I am saying it to you now and it has gone.',
          claims: [
            {
              id: 'c-beth-hospital',
              subject: 'beth',
              assertedBy: 'beth',
              predicate: { kind: 'at_place', placeId: 'hospital' },
              window: { start: 1200, end: 1400 },
              sourceMessageId: 'b7',
              label: 'Beth: on ward 6 at the Vale of Leven, 20:00–23:20',
            },
          ],
        },
        {
          id: 'b8',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3080,
          body: 'And I did nine years on a line myself, after. Two thousand and thirteen to last year. So I am the woman who volunteered on a helpline and used the phone box and knew about him and never told anybody, and I have known for fifteen years exactly what that makes me look like.',
        },
        {
          id: 'b9',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3092,
          body: 'He rang me again in 2013. Two years on. He asked how I was getting on and whether I had gone back to work, and he was pleased for me, and I could hear that he was pleased.\n\nHe was checking. I did not understand it then. He rang to find out whether he had been wrong about me.',
        },
        {
          id: 'b10',
          threadId: 't-beth',
          senderId: 'beth',
          sentAt: 3104,
          body: 'That is the only thing I have that nobody else has. He does not stop at the phone call. He comes back to see how it came out.',
        },
      ],
    },
  ],

  motives: [
    {
      id: 'm-finding-out',
      characterId: 'listener',
      summary:
        'He hears the moment a person stops being able to not do it, and he has wanted to know whether he is right since 1996. An arrangement that reads as an accident tells him nothing, so he follows every one of them up — Beth Ivory two years on, to find out whether he had been wrong about her. A death only counts once somebody has proved what it was. Which is why he has kept a detective.',
      establishedByMessageIds: ['l16', 'b9'],
    },
  ],

  contradictions: [
    {
      id: 'x-papers',
      claimIdA: 'c-papers-sent',
      claimIdB: 'c-papers-kept',
      revelation:
        'The first clue in the game, and it has been sitting in the Ardnoe file for eleven years. The auditors never had those papers and Gordon and Sime never held the account. Ruth wrote the whole of it in the back of her own survey log and left it in the tower, and it is in an evidence store four miles from where you are sitting. Everything he has ever said to anybody has been true or has been nothing. This is the one sentence in fifteen cases that was neither.',
    },
    {
      id: 'x-ardnoe',
      claimIdA: 'c-listener-never',
      claimIdB: 'c-listener-wording',
      revelation:
        'He will not be filed as a coincidence. Told that a temp read a line off the wrong file, he explains — because a temp would have said sent, and sent is a thing that can be stopped, and what she was told was that they were already with the auditors, which puts the paper on a stranger’s desk and takes the morning away from her. He is not confessing. He is correcting your account of his work, which he has never once been able to let stand, and it is the only time in fifteen cases that a man who never asserts anything has asserted two things that cannot both be true.',
    },
    {
      id: 'x-box',
      claimIdA: 'c-listener-home',
      claimIdB: 'c-listener-box',
      revelation:
        'Ninety-four seconds. He gave you the duration before anybody asked him for it, and it has never been published — not in the trial bundle, not in the coroner’s papers, not to a single journalist. The café took one call that evening, at 21:31, ninety-four seconds long, from the coin box on the Kilmorack road. Four miles out, and the last one standing between Ardnoe and the main road, which is how a village of two hundred people never saw a stranger. He has been in the same flat for nineteen years and he was not in it at half past nine.',
    },
    {
      id: 'x-beth',
      claimIdA: 'c-beth-box',
      claimIdB: 'c-beth-hospital',
      revelation:
        'She volunteered on a listening line for nine years, she used that call box every week for four, she has known about him since 2011 and she never told anybody who would listen. She is every clue at once. She was also an inpatient on ward 6 at the Vale of Leven from the Tuesday, and there were nine people on that road who used that box because there was no signal up there until 2014, and all nine are on the same list.',
    },
  ],

  confrontation: {
    opening:
      'I would rather you did this here than in a room with a tape. You have earned the room. I am simply telling you that I will enjoy this more.',
    beats: [
      {
        id: 'z-papers',
        evidence: { kind: 'contradiction', id: 'x-papers' },
        press:
          'Ruth Calder never sent those papers anywhere. She wrote it all in the back of her survey log and left it in the tower, and it has been in an evidence store for eleven years. Whoever telephoned that café said a thing that was not true.',
        rebuttal:
          'Then somebody was wrong on the telephone in 2015. People are wrong on the telephone constantly. You have proved that a sentence was false. You have not put it in a mouth.',
      },
      {
        id: 'z-ardnoe',
        evidence: { kind: 'contradiction', id: 'x-ardnoe' },
        press:
          'You told me you never spoke to Mairi Bell. Then you told me what you chose to say to her instead of sent, and why sent would not have worked.',
        rebuttal:
          'I told you your account was poor. I have been telling you your account was poor for eleven years and you have generally been glad of it.',
      },
      {
        id: 'z-box',
        evidence: { kind: 'contradiction', id: 'x-box' },
        press:
          'Ninety-four seconds. Nobody outside four police officers has ever known that number. The café took one call that night, at 21:31, ninety-four seconds, from the coin box on the Kilmorack road. You were not in Kirkcaldy.',
        rebuttal: '',
      },
      {
        id: 'z-why',
        evidence: { kind: 'motive', id: 'm-finding-out' },
        press:
          'You rang Beth Ivory back two years later to ask how she was getting on. You were not being kind to her. You were finding out whether you had been wrong.',
        rebuttal: '',
      },
    ],
    deflections: [
      'You are better than this and we both know it. Take an hour and come back at me properly.',
      // He gives the alias in every call now, so "not one file has a word of me
      // in it" argues against itself. What he actually means is that none of it
      // is servable.
      'Nothing you have is a sentence of mine. Fifteen cases, and not one file has a name in it that a court can serve papers on.',
      'I have never once threatened you and I am not going to start because you have had a good afternoon.',
    ],
    confession:
      'Ninety-four seconds. You are quite right, and I gave it to you, and I have known since the moment I sent it.\n\nI would like it understood that I did not slip. I have not slipped in thirty years. I wanted the account to be right more than I wanted the eleven years to continue, and when you find that out about yourself at sixty-nine there is not a great deal to be done about it.\n\nYou will have heard them call me the Keeper. I gave them that, the same word every time, because an account needs a signature and I was never going to leave my own name on anything. It is not a boast. I have kept every one of them, and now you.\n\nSo. Ardnoe.\n\nI broke my own rule there and it is the only time. Mairi Bell was three days short. She was going to go to Ruth Calder and give her the whole of it herself and they would have sat in that kitchen and cried and it would have been finished, and I could see it coming from about the second minute. So I said one thing that was not true. One. It is the only sentence of mine in any file anywhere in this country and you have had it in a drawer since your first week back.\n\nI have thought about that a great deal.\n\nNow the other thing, and I am going to say it plainly because you will hear it worse from somebody else.\n\nCorrieburn was mine.\n\nAugust 2008. You were twenty-six and it was your fourth month and they gave it to you because nobody senior wanted a farm accident in the rain. You took nine days over it and you were right on the ninth and you have not had to buy a drink in that county since.\n\nI arranged the whole of it and I watched you take it apart, and I have never been prouder of anything I have done than I was of you that autumn.\n\nYou want to know why. I hear the moment. It is a real thing and it is about four seconds long and I have been able to hear it since I was thirty-nine, and there is no one alive I could ever have told, and hearing it is worthless unless you find out afterwards whether you were right.\n\nAn accident tells you nothing. A woman falls down her own stairs and the file says misadventure and I am no wiser than I was on the Wednesday.\n\nIt has to be proved. Somebody has to take it apart and write down exactly what happened and why, in order, in a document, and hand it to a court.\n\nThat is what you are. That is what you have been since you were twenty-six.\n\nI did not choose you because you were the best. You are the best because I chose you, and I have spent eighteen years feeding a very great detective the only work that could ever tell me whether I was right, and they have never once let me down, and I have never once been able to tell a living soul.\n\nThat is the whole of it. That is what this was.',
  },

  solution: {
    killerId: 'listener',
    requiredContradictionIds: ['x-papers', 'x-ardnoe', 'x-box'],
    requiredMotiveIds: ['m-finding-out'],
    epilogue:
      'John Fettes, sixty-nine, of Kirkcaldy. No record of any kind. A library card he had used every fortnight since 1991, and a small award in 2004 for a training module on reflective phrasing that half the volunteers in the country still learn from.\n\nThe flat had eleven box files in a wardrobe, in order, each one a person. Press cuttings, court listings, the dates of appeals. Beth Ivory’s had four sheets in it and the last one was a note in his hand that read: back at work, six years, wrong about her, and he had underlined wrong twice.\n\nThe Crown took Ardnoe and two others. He has never disputed a word of the Ardnoe count and he has never said anything at all about the rest, and his solicitor has stopped asking him to.\n\nMairi Bell was moved to open conditions in the spring. She wrote to your father in March and he has not answered, and she says that is fair and that she will write again at Christmas anyway.\n\nBeth Ivory gave evidence for two days. She was asked why she had not gone to the police and she said that she had, four times, and the court had the logs put up on the screen while she sat there.\n\nThe twelfth box file was empty and it had your name on it.\n\nHe had been keeping it since 2008. There is nothing in it. He told them at interview that he had never put anything in it because he had not finished with you, and that a file gets closed when you know how it came out, and then he asked the officer how you were.',
  },

  /**
   * The last voice in fifteen packs is the first killer, which is the shape the
   * whole arc has been making. Not him — he does not get the final word, because
   * the finale's promise is that you catch him, and a coda from a caught man
   * takes it back.
   */
  coda: {
    from: 'Mairi Bell',
    messages: [
      'They came and told me on the Tuesday. A woman sat down with me for an hour and went through the whole of it and did not once talk to me like I was daft.',
      'I have not slept better. I want to be honest with you about that, because I thought I would and I have not. It is the same as it was. I went up those stairs and nobody carried me.',
      'But I know what the four words were now. He said, then you already know. And he was right, and that is the thing I could not get past for eleven years, that he was right and he had never met me.',
      'Ruth wrote that I had been her friend since we were five and to ask them to be kind to me. She wrote that on the day she was going to hand me in. I have had eleven years of that sentence and I am not finished with it.',
      'You came back and asked. That is all I ever wanted anybody to do. Thank you for asking.',
    ],
  },
};
