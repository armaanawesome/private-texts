import type { StringKey } from './strings';
import type { Params, Translator } from './translate';

/**
 * A line of text that has not been turned into words yet.
 *
 * Anything below the UI that needs to say something to the player returns one
 * of these instead of a sentence. The words are chosen at render time, by the
 * screen, in the player's language — which is the only place that knows what
 * the player's language is.
 *
 * The alternative is what this codebase had: helpers returning English prose,
 * dropped into translated sentences. That produced
 * "3 de 4 probadas. Última partida 2 hours ago." on the home screen, and the
 * same shape of bug was waiting in the sign-in and settings screens.
 *
 * `raw` is the deliberate escape hatch, not an oversight. A server can send an
 * error nobody has classified, and an unfamiliar message the player can
 * screenshot is worth more than a polished one that says nothing. Making it a
 * separate variant means passing text through is a visible decision at the call
 * site rather than something that happens by default.
 */
export interface KeyedMessage {
  readonly key: StringKey;
  readonly params?: Params;
  readonly raw?: undefined;
}

export interface RawMessage {
  readonly raw: string;
  readonly key?: undefined;
}

/**
 * Both members carry the other's field as `undefined` so this is a discriminated
 * union rather than two unrelated shapes. Without that, narrowing by `'raw' in m`
 * leaves the other branch un-narrowed and every read of `.key` is an error.
 */
export type Message = KeyedMessage | RawMessage;

/** True when this message is untranslated server text rather than a catalogue key. */
export function isRaw(m: Message): m is RawMessage {
  return m.raw !== undefined;
}

/** Turn a message into words. The one place a `Message` becomes a string. */
export function render(m: Message, t: Translator): string {
  return isRaw(m) ? m.raw : t(m.key, m.params);
}
