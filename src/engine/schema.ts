import { z } from 'zod';
import type { CaseScript } from './types';

const timeWindow = z
  .object({ start: z.number(), end: z.number() })
  .refine((w) => w.end > w.start, { message: 'window end must be after start' });

const predicate = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('at_place'), placeId: z.string() }),
  z.object({ kind: z.literal('with_person'), personId: z.string() }),
  z.object({ kind: z.literal('doing'), actionId: z.string(), exclusiveGroup: z.string() }),
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
  threads: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      participantIds: z.array(z.string()),
      requiresContradictionIds: z.array(z.string()),
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
  solution: z.object({
    killerId: z.string(),
    requiredContradictionIds: z.array(z.string()),
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
