import type { TimeWindow } from './types';

/** True when two half-open windows share at least one minute. */
export function windowsOverlap(a: TimeWindow, b: TimeWindow): boolean {
  return a.start < b.end && b.start < a.end;
}
