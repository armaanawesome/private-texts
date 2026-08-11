import { z } from 'zod';
import type { CaseScript } from './types';

const timeWindow = z
  .object({ start: z.number(), end: z.number() })
  .refine((w) => w.end > w.start, { message: 'window end must be after start' });

const predicate = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('at_place'), placeId: z.string() }),
  z.object({ kind: z.literal('with_person'), personId: z.string() }),
  z.object({ kind: z.literal('doing'), actionId: z.string(), exclusiveGroup: z.string() }),
  z.object({ kind: z.literal('has_object'), objectId: z.string() }),
]);

const claim = z.object({
  id: z.string(),
  subject: z.string(),
  assertedBy: z.string(),
  predicate,
  window: timeWindow,
  sourceMessageId: z.string(),
  label: z.string(),
});

const message = z.object({
  id: z.string(),
  threadId: z.string(),
  senderId: z.string(),
  sentAt: z.number(),
  body: z.string(),
  claims: z.array(claim).optional(),
  unlocksThreadIds: z.array(z.string()).optional(),
});

const caseSchema = z.object({
  id: z.string(),
  title: z.string(),
  blurb: z.string(),
  requiredEntitlementId: z.string().optional(),
  characters: z.array(z.object({ id: z.string(), name: z.string(), avatarColor: z.string() })),
  places: z.array(z.object({ id: z.string(), name: z.string(), parentId: z.string().optional() })),
  // Defaulted, so every case written before the object axis existed still loads.
  objects: z
    .array(z.object({ id: z.string(), name: z.string(), unique: z.boolean() }))
    .default([]),
  threads: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      participantIds: z.array(z.string()),
      requiresContradictionIds: z.array(z.string()),
      requiresReadMessageIds: z.array(z.string()).optional(),
      requiresMotiveIds: z.array(z.string()).optional(),
      messages: z.array(message),
    }),
  ),
  contradictions: z.array(
    z.object({
      id: z.string(),
      claimIdA: z.string(),
      claimIdB: z.string(),
      revelation: z.string(),
    }),
  ),
  motives: z
    .array(
      z.object({
        id: z.string(),
        characterId: z.string(),
        summary: z.string(),
        establishedByMessageIds: z.array(z.string()).min(1),
      }),
    )
    .default([]),
  briefing: z
    .object({
      victimId: z.string(),
      foundAt: z.object({ placeId: z.string(), minutes: z.number() }),
      causeOfDeath: z.string(),
      ruling: z.string(),
      opening: z.string(),
      recoveredObjectIds: z.array(z.string()).optional(),
    })
    .optional(),
  confrontation: z
    .object({
      opening: z.string(),
      beats: z
        .array(
          z.object({
            id: z.string(),
            evidence: z.discriminatedUnion('kind', [
              z.object({ kind: z.literal('contradiction'), id: z.string() }),
              z.object({ kind: z.literal('motive'), id: z.string() }),
            ]),
            press: z.string(),
            rebuttal: z.string(),
          }),
        )
        .min(1),
      deflections: z.array(z.string()).min(1),
      confession: z.string(),
    })
    .optional(),
  solution: z.object({
    killerId: z.string(),
    requiredContradictionIds: z.array(z.string()),
    requiredMotiveIds: z.array(z.string()).default([]),
    epilogue: z.string(),
  }),
});

/**
 * Parses and cross-validates a case script.
 *
 * Zod catches shape errors; the manual pass below catches dangling references.
 * That second pass is the one that matters — a claim pointing at a character who
 * does not exist is the bug class that makes a case silently unsolvable, and it
 * must fail loudly at load rather than halfway through a playthrough.
 */
export function loadCase(raw: unknown): CaseScript {
  const parsed = caseSchema.parse(raw);

  const characterIds = new Set(parsed.characters.map((c) => c.id));
  const placeIds = new Set(parsed.places.map((p) => p.id));
  const objectIds = new Set(parsed.objects.map((o) => o.id));
  const motiveIds = new Set(parsed.motives.map((m) => m.id));
  const messageIds = new Set(parsed.threads.flatMap((t) => t.messages.map((m) => m.id)));
  const claimIds = new Set<string>();

  const requireCharacter = (id: string, where: string) => {
    if (!characterIds.has(id)) throw new Error(`${where} references unknown character "${id}"`);
  };

  for (const place of parsed.places) {
    if (place.parentId && !placeIds.has(place.parentId)) {
      throw new Error(`Place "${place.id}" references unknown parent place "${place.parentId}"`);
    }
  }

  for (const thread of parsed.threads) {
    for (const id of thread.participantIds) requireCharacter(id, `Thread "${thread.id}"`);

    for (const msg of thread.messages) {
      requireCharacter(msg.senderId, `Message "${msg.id}"`);

      for (const c of msg.claims ?? []) {
        if (claimIds.has(c.id)) throw new Error(`Duplicate claim id "${c.id}"`);
        claimIds.add(c.id);

        requireCharacter(c.subject, `Claim "${c.id}"`);
        requireCharacter(c.assertedBy, `Claim "${c.id}"`);

        if (c.predicate.kind === 'at_place' && !placeIds.has(c.predicate.placeId)) {
          throw new Error(`Claim "${c.id}" references unknown place "${c.predicate.placeId}"`);
        }
        if (c.predicate.kind === 'with_person') {
          requireCharacter(c.predicate.personId, `Claim "${c.id}"`);
        }
        if (c.predicate.kind === 'has_object' && !objectIds.has(c.predicate.objectId)) {
          throw new Error(`Claim "${c.id}" references unknown object "${c.predicate.objectId}"`);
        }
      }
    }
  }

  for (const t of parsed.threads) {
    for (const id of t.requiresReadMessageIds ?? []) {
      if (!messageIds.has(id)) {
        throw new Error(`Thread "${t.id}" is gated on unknown message "${id}"`);
      }
    }
    for (const id of t.requiresMotiveIds ?? []) {
      if (!motiveIds.has(id)) throw new Error(`Thread "${t.id}" is gated on unknown motive "${id}"`);
    }
  }

  for (const m of parsed.motives) {
    requireCharacter(m.characterId, `Motive "${m.id}"`);
    for (const id of m.establishedByMessageIds) {
      if (!messageIds.has(id)) {
        // A motive that can never be established makes the case unwinnable, and
        // it would only surface when a player had done everything else right.
        throw new Error(`Motive "${m.id}" is established by unknown message "${id}"`);
      }
    }
  }

  for (const id of parsed.solution.requiredMotiveIds) {
    if (!motiveIds.has(id)) throw new Error(`Solution requires unknown motive "${id}"`);
  }

  if (parsed.briefing) {
    requireCharacter(parsed.briefing.victimId, 'Briefing');
    if (!placeIds.has(parsed.briefing.foundAt.placeId)) {
      throw new Error(`Briefing references unknown place "${parsed.briefing.foundAt.placeId}"`);
    }
    for (const id of parsed.briefing.recoveredObjectIds ?? []) {
      if (!objectIds.has(id)) throw new Error(`Briefing recovered unknown object "${id}"`);
    }
  }

  if (parsed.confrontation) {
    const contradictionIdSet = new Set(parsed.contradictions.map((c) => c.id));
    const beatIds = new Set<string>();
    for (const beat of parsed.confrontation.beats) {
      if (beatIds.has(beat.id)) throw new Error(`Duplicate confrontation beat "${beat.id}"`);
      beatIds.add(beat.id);

      // A beat pointing at evidence the player can never hold would make the
      // confession unreachable, and only after they had solved everything else.
      const known =
        beat.evidence.kind === 'contradiction'
          ? contradictionIdSet.has(beat.evidence.id)
          : motiveIds.has(beat.evidence.id);
      if (!known) {
        throw new Error(
          `Confrontation beat "${beat.id}" references unknown ${beat.evidence.kind} "${beat.evidence.id}"`,
        );
      }
    }
  }

  for (const con of parsed.contradictions) {
    for (const cid of [con.claimIdA, con.claimIdB]) {
      if (!claimIds.has(cid)) {
        throw new Error(`Contradiction "${con.id}" references unknown claim "${cid}"`);
      }
    }
  }

  requireCharacter(parsed.solution.killerId, 'Solution');

  const contradictionIds = new Set(parsed.contradictions.map((c) => c.id));
  for (const id of parsed.solution.requiredContradictionIds) {
    if (!contradictionIds.has(id)) {
      throw new Error(`Solution requires unknown contradiction "${id}"`);
    }
  }

  return parsed as CaseScript;
}
