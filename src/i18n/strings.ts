import { DEFAULT_LOCALE, type LocaleTag } from './locales';

/**
 * The UI string catalogue.
 *
 * Flat dotted keys rather than nested objects, for one reason: the parity test
 * compares key *sets* across locales, and a flat set is comparable with
 * `Object.keys`. Nested objects would need a recursive walk to compare, and the
 * failure mode of getting that walk subtly wrong is a missing translation that
 * the test says is present.
 *
 * English is the source of truth. Every other catalogue is `Partial`, and
 * anything absent falls back to English rather than rendering a key — a player
 * who sees a half-translated screen can still play; a player who sees
 * `settings.sound.label` cannot.
 *
 * CASE TEXT IS NOT HERE. Briefings, messages, confessions and epilogues live in
 * `content/cases/*.ts` and are translated per case, because a case is prose with
 * a solvability contract attached: a mistranslated time or place makes a case
 * unsolvable in a way no UI string can. See docs/pack-ledger.md.
 */
export const EN = {
  'common.cancel': 'Cancel',
  'common.done': 'Done',
  'common.back': 'Back',
  'common.retry': 'Try again',

  'home.continue.title': 'Continue',
  'home.continue.unreadOne': '1 unread',
  'home.continue.unreadMany': '{count} unread',
  'home.cases.title': 'Cases',

  'settings.title': 'Settings',
  'settings.sound.section': 'Sound & haptics',
  'settings.sound.label': 'Sound effects',
  'settings.sound.detail': 'Quiet cues when a claim pins and when a proof lands.',
  'settings.volume.label': 'Volume',
  'settings.haptics.label': 'Haptics',
  'settings.haptics.detail': 'A short tap when something is confirmed.',
  'settings.motion.section': 'Motion',
  'settings.motion.label': 'Reduce motion',
  'settings.motion.detail': 'Messages appear instantly and decorative sounds stay quiet.',
  'settings.language.section': 'Language',
  'settings.language.label': 'Language',
  'settings.language.hint': 'Opens the list of languages',
  'settings.purchases.section': 'Purchases',
  'settings.restore.label': 'Restore purchases',
  'settings.restore.detail': 'Already bought the case pack? Get it back on this device.',
  'settings.progress.section': 'Progress',
  'settings.reset.label': 'Reset progress',
  'settings.reset.detail': 'Erases every case on this device. It cannot be undone.',
  'settings.reset.confirm': 'Erase all progress?',
  'settings.about.section': 'About',
  'settings.about.version': 'Version',
  'settings.about.privacy': 'Privacy',
  'settings.about.licences': 'Licences',

  'language.title': 'Language',
  'language.footnote':
    'Changing this translates the app. Case files are translated separately, and any case that has not been translated yet stays in English.',

  'signIn.title': 'Sign in',
  'signIn.why': 'So your progress follows you to another phone.',
  'signIn.email': 'Email',
  'signIn.continue': 'Continue',
  'signIn.guest': 'Continue as guest',
  'signIn.signOut': 'Sign out',
  'signIn.unavailable': 'Accounts are unavailable in this build. Your progress is saved on this device.',
} as const;

export type StringKey = keyof typeof EN;

/**
 * Everything except English is partial on purpose. A translator working through
 * a release should be able to ship what they have finished without the build
 * failing on what they have not.
 */
export type Catalogue = Partial<Record<StringKey, string>>;

const ES: Catalogue = {
  'common.cancel': 'Cancelar',
  'common.done': 'Hecho',
  'common.back': 'Atrás',
  'common.retry': 'Reintentar',

  'home.continue.title': 'Continuar',
  'home.continue.unreadOne': '1 sin leer',
  'home.continue.unreadMany': '{count} sin leer',
  'home.cases.title': 'Casos',

  'settings.title': 'Ajustes',
  'settings.sound.section': 'Sonido y vibración',
  'settings.sound.label': 'Efectos de sonido',
  'settings.sound.detail': 'Señales discretas al fijar una afirmación y al confirmar una prueba.',
  'settings.volume.label': 'Volumen',
  'settings.haptics.label': 'Vibración',
  'settings.haptics.detail': 'Un toque breve cuando algo se confirma.',
  'settings.motion.section': 'Movimiento',
  'settings.motion.label': 'Reducir movimiento',
  'settings.motion.detail': 'Los mensajes aparecen al instante y los sonidos decorativos se silencian.',
  'settings.language.section': 'Idioma',
  'settings.language.label': 'Idioma',
  'settings.language.hint': 'Abre la lista de idiomas',
  'settings.purchases.section': 'Compras',
  'settings.restore.label': 'Restaurar compras',
  'settings.restore.detail': '¿Ya compraste el pack de casos? Recupéralo en este dispositivo.',
  'settings.progress.section': 'Progreso',
  'settings.reset.label': 'Borrar progreso',
  'settings.reset.detail': 'Borra todos los casos de este dispositivo. No se puede deshacer.',
  'settings.reset.confirm': '¿Borrar todo el progreso?',
  'settings.about.section': 'Acerca de',
  'settings.about.version': 'Versión',
  'settings.about.privacy': 'Privacidad',
  'settings.about.licences': 'Licencias',

  'language.title': 'Idioma',
  'language.footnote':
    'Esto traduce la aplicación. Los casos se traducen por separado, y cualquier caso todavía sin traducir permanece en inglés.',

  'signIn.title': 'Iniciar sesión',
  'signIn.why': 'Para que tu progreso te siga a otro teléfono.',
  'signIn.email': 'Correo electrónico',
  'signIn.continue': 'Continuar',
  'signIn.guest': 'Continuar como invitado',
  'signIn.signOut': 'Cerrar sesión',
  'signIn.unavailable':
    'Las cuentas no están disponibles en esta versión. Tu progreso se guarda en este dispositivo.',
};

/**
 * Locales with no catalogue yet resolve to an empty one and therefore to
 * English, which is the same path a partially translated locale takes for its
 * missing keys. One code path, not two.
 */
export const CATALOGUES: Readonly<Record<LocaleTag, Catalogue>> = {
  en: EN,
  es: ES,
  fr: {},
  de: {},
  'pt-BR': {},
  ja: {},
};

export const SOURCE_LOCALE: LocaleTag = DEFAULT_LOCALE;
