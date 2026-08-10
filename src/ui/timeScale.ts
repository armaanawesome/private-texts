/**
 * Geometry for the comparison sheet.
 *
 * The board's whole argument is visual: two statements drawn as bars against one
 * shared clock, and the stretch where they overlap lit up. These helpers decide
 * where each bar sits. They are pure so the maths can be tested without a
 * renderer — if a bar and the time printed beneath it disagree, the picture is
 * lying to the player, and that is the one thing this screen cannot do.
 */

export interface Span {
  readonly start: number;
  readonly end: number;
}

/** Breathing room at each end, as a fraction of the total span. */
const PAD_FRACTION = 0.08;

/**
 * Smallest axis width in minutes.
 *
 * A point-in-time claim uses `end = start + 1`. Two of those together would give
 * a one-minute domain, an invisible axis, and — before padding existed — a
 * divide by zero that put every bar at NaN%.
 */
const MIN_SPAN = 10;

/** The clock both bars are drawn against, padded so neither touches the edge. */
export function domainFor(a: Span, b: Span): Span {
  const start = Math.min(a.start, b.start);
  const end = Math.max(a.end, b.end);
  const pad = Math.max(end - start, MIN_SPAN) * PAD_FRACTION;
  return { start: start - pad, end: end + pad };
}

/** Where a moment sits along the axis, as a fraction from 0 to 1. */
export function fractionOf(domain: Span, value: number): number {
  const width = domain.end - domain.start;
  if (width <= 0) return 0;
  return Math.min(1, Math.max(0, (value - domain.start) / width));
}

/**
 * The stretch of clock both statements cover, or null if they never meet.
 *
 * Windows are half-open, matching `windowsOverlap` in the engine: a window
 * ending at 22:00 does not include 22:00. The board must agree with the engine
 * exactly, or it would light up an overlap the rules then refuse to accept.
 */
export function overlapOf(a: Span, b: Span): Span | null {
  const start = Math.max(a.start, b.start);
  const end = Math.min(a.end, b.end);
  return end > start ? { start, end } : null;
}

/** Minutes since the case epoch as a zero-padded 24-hour clock. */
export function clockOf(minutes: number): string {
  const wrapped = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
