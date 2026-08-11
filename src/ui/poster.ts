/**
 * Cover art for a case, drawn from the case's own testimony.
 *
 * There are no image assets in this project and no SVG library — adding one
 * would mean a native rebuild, which the EAS free tier makes expensive. So each
 * poster is generated: every claim in the case becomes a bar on a shared clock,
 * the same geometry the comparison sheet uses. The cover art is the evidence.
 *
 * That also means a new case gets a distinct poster for free, with nothing to
 * draw and nothing to keep in sync.
 *
 * Pure, and tested without a renderer.
 */

export interface PosterBar {
  /** Left edge as a fraction of the frame, 0 to 1. */
  readonly left: number;
  /** Width as a fraction of the frame. Never zero. */
  readonly width: number;
}

interface HasWindow {
  readonly window: { readonly start: number; readonly end: number };
}

/** Thin enough to read as a mark, wide enough to see. */
const MIN_WIDTH = 0.035;

export function posterBarsFor(claims: readonly HasWindow[], rows: number): PosterBar[] {
  if (claims.length === 0 || rows <= 0) return [];

  // Spread the sample across the whole case rather than taking the first N,
  // so the poster describes the shape of the night, not just its opening.
  const step = Math.max(1, Math.floor(claims.length / rows));
  const sample = claims.filter((_, i) => i % step === 0).slice(0, rows);

  const starts = sample.map((c) => c.window.start);
  const ends = sample.map((c) => c.window.end);
  const min = Math.min(...starts);
  const max = Math.max(...ends);
  const span = max - min;

  return sample.map((c) => {
    // One claim, or several sharing an instant, would otherwise divide by zero.
    if (span <= 0) return { left: 0, width: 1 };

    const left = (c.window.start - min) / span;
    const raw = (c.window.end - c.window.start) / span;
    const width = Math.max(raw, MIN_WIDTH);
    // Keep the bar inside the frame when the minimum width pushes it over.
    return { left: Math.min(left, 1 - width), width };
  });
}
