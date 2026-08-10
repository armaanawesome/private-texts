import { describe, it, expect } from 'vitest';
import { decidePurchasesMode } from './keyPolicy';

/**
 * These tests guard a launch crash that reached a real device.
 *
 * A RevenueCat Test Store key (`test_` prefix) is rejected by the native SDK in
 * a Release build: it shows a "Wrong API Key" alert and terminates the process
 * at configure() time. The old code logged a warning and then called configure()
 * anyway, so every Release build died on the splash screen before a single
 * screen rendered.
 *
 * The fix is a policy decision made BEFORE the SDK is touched: if the key on
 * hand cannot legally run in this build, do not configure at all and let the app
 * run with purchases switched off. A playable app without a store beats an app
 * that closes itself.
 */
describe('decidePurchasesMode', () => {
  it('runs live in a debug build with a Test Store key', () => {
    const mode = decidePurchasesMode({ key: 'test_abc123', isDev: true });
    expect(mode).toEqual({ kind: 'live', apiKey: 'test_abc123' });
  });

  it('REFUSES to configure a Test Store key in a release build', () => {
    // The whole point. Returning `live` here reintroduces the crash.
    const mode = decidePurchasesMode({ key: 'test_abc123', isDev: false });
    expect(mode.kind).toBe('disabled');
  });

  it('explains how to get purchases back when it disables them', () => {
    const mode = decidePurchasesMode({ key: 'test_abc123', isDev: false });
    if (mode.kind !== 'disabled') throw new Error('expected disabled');
    // A bare "purchases unavailable" would send the next person hunting through
    // native logs, which is exactly what cost four builds.
    expect(mode.reason).toMatch(/test store/i);
    expect(mode.reason).toMatch(/release/i);
  });

  it('runs live in a release build with a real store key', () => {
    const mode = decidePurchasesMode({ key: 'appl_realkey', isDev: false });
    expect(mode).toEqual({ kind: 'live', apiKey: 'appl_realkey' });
  });

  it('disables purchases when no key is configured at all', () => {
    const mode = decidePurchasesMode({ key: undefined, isDev: true });
    expect(mode.kind).toBe('disabled');
  });

  it('treats a whitespace-only key as missing', () => {
    // EAS environment variables come back as empty strings rather than undefined
    // when registered but left blank, which previously read as "present".
    const mode = decidePurchasesMode({ key: '   ', isDev: true });
    expect(mode.kind).toBe('disabled');
  });

  it('trims a padded key rather than rejecting it', () => {
    const mode = decidePurchasesMode({ key: '  test_abc123\n', isDev: true });
    expect(mode).toEqual({ kind: 'live', apiKey: 'test_abc123' });
  });
});
