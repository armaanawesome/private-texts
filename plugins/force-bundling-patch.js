const PHASE_NAME = 'Bundle React Native code and images';

/**
 * Injects `export FORCE_BUNDLING=1` into the React Native bundling build phase.
 *
 * Split out from the plugin itself so the transformation is unit-testable
 * without an Xcode project — iOS prebuild only runs on macOS, so this is the
 * only part that can be verified from a Windows dev machine.
 *
 * Mutates `phases` in place (matching how xcode's pbxproj object works) and
 * returns the number of phases patched.
 */
function patchPhases(phases) {
  let patched = 0;
  for (const key of Object.keys(phases || {})) {
    const phase = phases[key];
    if (!phase || typeof phase !== 'object' || typeof phase.shellScript !== 'string') continue;

    const name = String(phase.name || '').replace(/"/g, '');
    if (!name.includes(PHASE_NAME)) continue;
    if (phase.shellScript.includes('FORCE_BUNDLING')) continue;

    // shellScript is stored as one quoted string with escaped newlines.
    // Insert the export immediately after the opening quote.
    phase.shellScript = phase.shellScript.replace(/^"/, '"export FORCE_BUNDLING=1\\n');
    patched += 1;
  }
  return patched;
}

module.exports = { patchPhases, PHASE_NAME };
