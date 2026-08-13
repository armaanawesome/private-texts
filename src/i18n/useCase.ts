import { useMemo } from 'react';
import type { CaseScript } from '@/engine';
import { CASES, getCase } from '@content/cases';
import { localiseCase } from '@content/i18n';
import { useSettingsStore } from '@/settings/settingsStore';

/**
 * Cases in the player's language.
 *
 * `localiseCase` returns the English object *by reference* when there is no
 * translation, so for an English player these hooks hand back exactly the same
 * `CaseScript` instances the module already exported. That matters more than it
 * looks: the case screen decides whether to reload by comparing script identity,
 * and a fresh object every render would reload the case on every render.
 */
export function useLocalisedCase(caseId: string | undefined): CaseScript | undefined {
  const tag = useSettingsStore((s) => s.settings.localeTag);
  return useMemo(() => {
    if (caseId === undefined) return undefined;
    const script = getCase(caseId);
    return script === undefined ? undefined : localiseCase(script, tag);
  }, [caseId, tag]);
}

/** The whole case list, for the grid. */
export function useLocalisedCases(): readonly CaseScript[] {
  const tag = useSettingsStore((s) => s.settings.localeTag);
  return useMemo(() => CASES.map((c) => localiseCase(c, tag)), [tag]);
}
