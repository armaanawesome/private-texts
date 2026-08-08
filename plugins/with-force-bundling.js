const { withXcodeProject } = require('expo/config-plugins');
const { patchPhases, PHASE_NAME } = require('./force-bundling-patch');

/**
 * Forces the JS bundle to be embedded in Debug simulator builds.
 *
 * Why this exists rather than `env: { FORCE_BUNDLING: "1" }` in eas.json:
 *
 * Both react-native's and expo's `react-native-xcode.sh` skip bundling for
 * Debug + simulator unless FORCE_BUNDLING is set, because Metro normally serves
 * the bundle. Setting it as an EAS build env var did NOT reach the Xcode build
 * phase — verified by extracting the resulting .app and finding no
 * main.jsbundle. Xcode does not reliably forward the outer shell environment
 * into PhaseScriptExecution.
 *
 * Writing the export into the build phase script itself sidesteps that
 * propagation question entirely.
 *
 * This project needs Debug *and* an embedded bundle at once because the
 * RevenueCat Test Store key is rejected in Release builds (the SDK terminates
 * the app), while a Debug build with no bundle cannot start at all.
 * See docs/BUILDING.md.
 */
module.exports = function withForceBundling(config) {
  return withXcodeProject(config, (cfg) => {
    const phases = cfg.modResults.hash.project.objects.PBXShellScriptBuildPhase || {};

    if (patchPhases(phases) === 0) {
      // Loud rather than silent: an upstream rename would otherwise quietly
      // reintroduce the "No script URL provided" launch failure this exists
      // to prevent, and that only shows up on a device 15 minutes later.
      throw new Error(
        `[with-force-bundling] No build phase named "${PHASE_NAME}" was patched. ` +
          'The JS bundle would not be embedded and the app would fail to launch.',
      );
    }

    return cfg;
  });
};
