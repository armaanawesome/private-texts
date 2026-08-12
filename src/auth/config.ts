/**
 * Decides whether a Supabase client may be constructed at all.
 *
 * Pure and free of react-native, expo and @supabase imports so it can be unit
 * tested in the Node suite — the same reason keyPolicy.ts exists separately
 * from revenuecat.ts, and for the same underlying reason: this project has
 * already shipped one launch crash caused by handing a client a bad key. A
 * missing or malformed config must degrade to a reported "auth unavailable",
 * never to an app that closes on the splash screen.
 */

/** The two variables the owner sets. Exported so error copy cannot misspell them. */
export const SUPABASE_URL_VAR = 'EXPO_PUBLIC_SUPABASE_URL';
export const SUPABASE_ANON_KEY_VAR = 'EXPO_PUBLIC_SUPABASE_ANON_KEY';

export type SupabaseConfig =
  | { kind: 'configured'; url: string; anonKey: string }
  | { kind: 'unavailable'; reason: string };

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * Enough base64url to read a JWT payload, hand-rolled on purpose.
 *
 * `atob` is present in Hermes and in Node, but not in every JS environment this
 * file might be imported from, and a config module that throws on import would
 * defeat the entire point of the module. Returns null rather than throwing on
 * anything it cannot decode.
 */
function decodeBase64Url(segment: string): string | null {
  let bits = 0;
  let acc = 0;
  let out = '';
  for (const raw of segment) {
    if (raw === '=') break;
    const ch = raw === '-' ? '+' : raw === '_' ? '/' : raw;
    const value = B64.indexOf(ch);
    if (value < 0) return null;
    acc = (acc << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out += String.fromCharCode((acc >> bits) & 0xff);
    }
  }
  return out;
}

/**
 * Whether this key is a SERVER key that must never reach a client bundle.
 *
 * `EXPO_PUBLIC_*` values are inlined into the JavaScript bundle at build time
 * and are trivially extractable from any shipped build. A service-role key
 * bypasses row-level security entirely, so one pasted into the wrong variable
 * would hand every player read and write access to every other player's rows —
 * and it would work perfectly in testing, which is exactly why it needs a
 * mechanical check rather than a warning comment.
 *
 * Two key formats are in circulation:
 *   - current: `sb_publishable_…` (client-safe) and `sb_secret_…` (server only)
 *   - legacy:  a JWT whose payload carries `"role":"anon"` or `"role":"service_role"`
 */
function isServerOnlyKey(key: string): boolean {
  if (key.startsWith('sb_secret_')) return true;

  const parts = key.split('.');
  if (parts.length !== 3) return false;
  const payload = decodeBase64Url(parts[1] ?? '');
  if (payload === null) return false;
  // Positive evidence only. A key whose payload cannot be read is left alone:
  // wrongly disabling auth for an unfamiliar-but-valid key would be its own bug.
  return /"role"\s*:\s*"service_role"/.test(payload);
}

export function decideSupabaseConfig(input: {
  url: string | undefined;
  anonKey: string | undefined;
}): SupabaseConfig {
  const url = input.url?.trim() ?? '';
  const anonKey = input.anonKey?.trim() ?? '';

  // EAS environment variables come back as empty strings rather than undefined
  // when they are registered but left blank, which otherwise reads as "present".
  const missing = [
    url === '' ? SUPABASE_URL_VAR : null,
    anonKey === '' ? SUPABASE_ANON_KEY_VAR : null,
  ].filter((name): name is string => name !== null);

  if (missing.length > 0) {
    return {
      kind: 'unavailable',
      reason:
        `Accounts are switched off: ${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} not set. ` +
        'Add it to .env for local runs, or register it as an EAS environment variable for cloud ' +
        'builds. The game plays normally without it — saves stay on this device.',
    };
  }

  if (!/^https?:\/\/[^/\s]+/.test(url)) {
    return {
      kind: 'unavailable',
      reason:
        `Accounts are switched off: ${SUPABASE_URL_VAR} is not a URL. ` +
        'It should look like https://your-project.supabase.co — copy it from the Supabase ' +
        'dashboard under Project Settings, Data API.',
    };
  }

  if (isServerOnlyKey(anonKey)) {
    return {
      kind: 'unavailable',
      reason:
        `Accounts are switched off: ${SUPABASE_ANON_KEY_VAR} holds a SERVICE ROLE key. ` +
        'That key bypasses row-level security and every EXPO_PUBLIC_ value is extractable ' +
        'from a shipped bundle, so it must never ship in the app. Replace it with the anon ' +
        '(publishable) key and rotate the one that was pasted here.',
    };
  }

  // Trailing slashes are harmless to a person reading the dashboard and produce
  // doubled slashes in every request path, so normalise rather than reject.
  return { kind: 'configured', url: url.replace(/\/+$/, ''), anonKey };
}
