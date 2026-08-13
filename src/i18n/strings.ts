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
 * Every key here is rendered by a screen. When a string leaves the UI, its key
 * leaves this file with it: a catalogue that still carries `signIn.guest` after
 * the guest button became "Keep playing on this phone" costs a translator real
 * work on a string nobody will ever read, and reads as coverage that does not
 * exist.
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
  'common.working': 'Working…',
  /** The player's own seat in a thread. Never followed by a verb — see the note in ContinueCard. */
  'common.you': 'You',
  /** Shown on both the paywall and the settings list, so it belongs to neither. */
  'common.restorePurchases': 'Restore purchases',

  'home.pitch':
    'Someone is dead. All you have is their messages. Find the statement that cannot be true.',
  'home.cases.title': 'All cases',
  'home.tile.sealed': 'Sealed',
  'home.tile.toProve': '{count} to prove',
  /**
   * Singular variants exist because the tutorial hides exactly one
   * contradiction and sits first in the grid, so "1 contradictions" was the
   * first thing a screen reader said about the game.
   */
  'home.tile.lockedLabel': '{title}, sealed. {count} contradictions. Unlock.',
  'home.tile.lockedLabelOne': '{title}, sealed. 1 contradiction. Unlock.',
  'home.tile.openLabel': '{title}. {count} contradictions to prove. Open.',
  'home.tile.openLabelOne': '{title}. 1 contradiction to prove. Open.',

  'home.continue.title': 'Continue',
  'home.continue.unreadOne': '1 unread',
  'home.continue.unreadMany': '{count} unread',
  'home.continue.label': 'Continue {title}.',
  'home.continue.backTo': 'Back to {thread}.',
  'home.continue.proved': '{proved} of {total} proved. Last played {elapsed}.',

  'case.tab.threads': 'Threads',
  'case.tab.board': 'Board',
  'case.tab.accuse': 'Accuse',

  'settings.title': 'Settings',
  'settings.sound.section': 'Sound',
  'settings.sound.label': 'Sound effects',
  'settings.sound.detail': 'Short cues when a message lands and when a contradiction breaks.',
  'settings.volume.label': 'Volume',
  'settings.feel.section': 'Feel',
  'settings.haptics.label': 'Haptics',
  'settings.haptics.detail': 'Taps you can feel when you pin a statement or land a fact.',
  'settings.motion.label': 'Reduce motion',
  'settings.motion.detail': 'Messages appear instantly and decorative sounds stay quiet.',
  'settings.language.section': 'Language',
  'settings.language.label': 'Language',
  'settings.language.hint': 'Opens the list of languages',
  // Was "Case files are written in English and are not translated." That stopped
  // being true the moment cases became translatable, and a settings screen that
  // contradicts the language screen two taps away is worse than saying nothing.
  'settings.language.footnote':
    'Cases are translated separately. Any case that has not been translated yet stays in English.',
  'settings.purchases.section': 'Purchases',
  'settings.restore.detail': 'Already bought the case pack? Get it back on this device.',
  'settings.progress.section': 'Progress',
  'settings.reset.label': 'Reset all progress',
  'settings.reset.detail': 'Erases every case save. Purchases are kept.',
  'settings.reset.confirm': 'Erase all progress?',
  'settings.reset.confirmBody':
    'Every case goes back to unread, and every contradiction you proved is forgotten. Purchases are not affected. This cannot be undone.',
  'settings.reset.keep': 'Keep it',
  'settings.reset.erase': 'Erase',
  'settings.reset.erasedNone': 'There was no saved progress to erase.',
  'settings.reset.erasedOne': 'Erased 1 saved case.',
  'settings.reset.erasedMany': 'Erased {count} saved cases.',
  'settings.reset.failed': 'Could not erase progress. Try again.',
  'settings.about.section': 'About',
  'settings.about.version': 'Version',
  'settings.about.privacy': 'What this app stores',
  'settings.about.licences': 'Open-source licences',

  /**
   * The privacy panel, one key per point. `src/settings/about.ts` owns which
   * points appear and in what order; this owns their wording.
   */
  'settings.privacy.progress': 'Your progress through each case is stored on this device.',
  'settings.privacy.purchases':
    'Purchases are handled by the App Store or Google Play through RevenueCat. This app never sees your payment details.',
  'settings.privacy.noTracking':
    'There are no ads and no analytics or tracking SDKs in this build.',
  'settings.privacy.deletion': 'Deleting the app deletes your progress with it.',

  'language.title': 'Language',
  'language.footnote':
    'Changing this translates the app. Case files are translated separately, and any case that has not been translated yet stays in English.',

  'signIn.title': 'Sign in',
  'signIn.heading': 'Take your case notes with you',
  'signIn.why': 'An account carries your progress to another phone.',
  'signIn.createAccount': 'Create account',
  'signIn.email': 'Email',
  'signIn.password': 'Password',
  'signIn.alreadyRegistered': 'That email already has an account. Sign in instead.',
  'signIn.confirmEmail': 'Check {email} for a confirmation link, then sign in.',
  'signIn.storesNote':
    'An account stores your email address and which messages you have read. Nothing else.',
  'signIn.leave': 'Keep playing on this phone',
  'signIn.leaveLabel': 'Keep playing on this phone, without an account',
  'signIn.off.title': 'Accounts are switched off',
  'signIn.signedIn.title': 'Signed in',
  'signIn.account': 'Your account',
  'signIn.sync': 'Sync now',
  'signIn.syncing': 'Syncing…',
  'signIn.backToCases': 'Back to the cases',
  'signIn.signOut': 'Sign out',
  'signIn.signOutNote': 'Signing out leaves every case save on this phone. Nothing is deleted.',

  'paywall.title': 'More cases',
  'paywall.body':
    'Another death, another phone, another story that does not hold up. Unlock the case pack to keep going.',
  'paywall.bullet.case': 'A second full-length case',
  'paywall.bullet.suspects': 'New suspects, new contradictions',
  'paywall.bullet.permanent': 'Yours permanently — this is not a subscription',
  'paywall.empty': 'The store has nothing to sell right now. Try again in a moment.',
  'paywall.unreachable': 'Could not reach the store.',
  'paywall.failed': 'The purchase did not go through. You have not been charged.',
  /** `{price}` is always the store's own localised price string, never a formatted number. */
  'paywall.unlock': 'Unlock · {price}',
  'paywall.unlockLabel': 'Unlock the case pack for {price}',
  'paywall.notNow': 'Not now',
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
  'common.working': 'Procesando…',
  'common.you': 'Tú',
  'common.restorePurchases': 'Restaurar compras',

  'home.pitch':
    'Alguien ha muerto. Solo tienes sus mensajes. Encuentra la afirmación que no puede ser cierta.',
  'home.cases.title': 'Todos los casos',
  'home.tile.sealed': 'Sellado',
  'home.tile.toProve': '{count} por probar',
  'home.tile.lockedLabel': '{title}, sellado. {count} contradicciones. Desbloquear.',
  'home.tile.lockedLabelOne': '{title}, sellado. 1 contradicción. Desbloquear.',
  'home.tile.openLabel': '{title}. {count} contradicciones por probar. Abrir.',
  'home.tile.openLabelOne': '{title}. 1 contradicción por probar. Abrir.',

  'home.continue.title': 'Continuar',
  'home.continue.unreadOne': '1 sin leer',
  'home.continue.unreadMany': '{count} sin leer',
  'home.continue.label': 'Continuar {title}.',
  'home.continue.backTo': 'Volver a {thread}.',
  'home.continue.proved': '{proved} de {total} probadas. Última partida {elapsed}.',

  'case.tab.threads': 'Mensajes',
  'case.tab.board': 'Tablero',
  'case.tab.accuse': 'Acusar',

  'settings.title': 'Ajustes',
  'settings.sound.section': 'Sonido',
  'settings.sound.label': 'Efectos de sonido',
  'settings.sound.detail':
    'Señales breves cuando llega un mensaje y cuando se rompe una contradicción.',
  'settings.volume.label': 'Volumen',
  'settings.feel.section': 'Sensación',
  'settings.haptics.label': 'Vibración',
  'settings.haptics.detail': 'Toques que se sienten al fijar una declaración o confirmar un dato.',
  'settings.motion.label': 'Reducir movimiento',
  'settings.motion.detail':
    'Los mensajes aparecen al instante y los sonidos decorativos se silencian.',
  'settings.language.section': 'Idioma',
  'settings.language.label': 'Idioma',
  'settings.language.hint': 'Abre la lista de idiomas',
  'settings.language.footnote':
    'Los casos se traducen por separado. Cualquier caso todavía sin traducir permanece en inglés.',
  'settings.purchases.section': 'Compras',
  'settings.restore.detail': '¿Ya compraste el pack de casos? Recupéralo en este dispositivo.',
  'settings.progress.section': 'Progreso',
  'settings.reset.label': 'Borrar todo el progreso',
  'settings.reset.detail': 'Borra todas las partidas guardadas. Las compras se conservan.',
  'settings.reset.confirm': '¿Borrar todo el progreso?',
  'settings.reset.confirmBody':
    'Todos los casos vuelven a estar sin leer y se olvida cada contradicción que probaste. Las compras no se ven afectadas. Esto no se puede deshacer.',
  'settings.reset.keep': 'Conservar',
  'settings.reset.erase': 'Borrar',
  'settings.reset.erasedNone': 'No había progreso guardado que borrar.',
  'settings.reset.erasedOne': 'Se borró 1 caso guardado.',
  'settings.reset.erasedMany': 'Se borraron {count} casos guardados.',
  'settings.reset.failed': 'No se pudo borrar el progreso. Inténtalo de nuevo.',
  'settings.about.section': 'Acerca de',
  'settings.about.version': 'Versión',
  'settings.about.privacy': 'Qué guarda esta aplicación',
  'settings.about.licences': 'Licencias de código abierto',

  'settings.privacy.progress': 'Tu progreso en cada caso se guarda en este dispositivo.',
  'settings.privacy.purchases':
    'Las compras las gestionan la App Store o Google Play a través de RevenueCat. Esta aplicación nunca ve tus datos de pago.',
  'settings.privacy.noTracking':
    'Esta versión no tiene anuncios ni SDK de analítica o seguimiento.',
  'settings.privacy.deletion': 'Si eliminas la aplicación, tu progreso se elimina con ella.',

  'language.title': 'Idioma',
  'language.footnote':
    'Esto traduce la aplicación. Los casos se traducen por separado, y cualquier caso todavía sin traducir permanece en inglés.',

  'signIn.title': 'Iniciar sesión',
  'signIn.heading': 'Lleva tus notas del caso contigo',
  'signIn.why': 'Una cuenta lleva tu progreso a otro teléfono.',
  'signIn.createAccount': 'Crear cuenta',
  'signIn.email': 'Correo electrónico',
  'signIn.password': 'Contraseña',
  'signIn.alreadyRegistered': 'Ese correo ya tiene una cuenta. Inicia sesión.',
  'signIn.confirmEmail': 'Busca en {email} un enlace de confirmación y luego inicia sesión.',
  'signIn.storesNote':
    'Una cuenta guarda tu correo electrónico y qué mensajes has leído. Nada más.',
  'signIn.leave': 'Seguir jugando en este teléfono',
  'signIn.leaveLabel': 'Seguir jugando en este teléfono, sin cuenta',
  'signIn.off.title': 'Las cuentas están desactivadas',
  'signIn.signedIn.title': 'Sesión iniciada',
  'signIn.account': 'Tu cuenta',
  'signIn.sync': 'Sincronizar ahora',
  'signIn.syncing': 'Sincronizando…',
  'signIn.backToCases': 'Volver a los casos',
  'signIn.signOut': 'Cerrar sesión',
  'signIn.signOutNote':
    'Al cerrar sesión, todas las partidas guardadas permanecen en este teléfono. No se borra nada.',

  'paywall.title': 'Más casos',
  'paywall.body':
    'Otra muerte, otro teléfono, otra historia que no se sostiene. Desbloquea el pack de casos para seguir.',
  'paywall.bullet.case': 'Un segundo caso completo',
  'paywall.bullet.suspects': 'Nuevos sospechosos, nuevas contradicciones',
  'paywall.bullet.permanent': 'Tuyo para siempre: esto no es una suscripción',
  'paywall.empty': 'La tienda no tiene nada que vender ahora mismo. Inténtalo de nuevo en un momento.',
  'paywall.unreachable': 'No se pudo conectar con la tienda.',
  'paywall.failed': 'La compra no se completó. No se te ha cobrado.',
  'paywall.unlock': 'Desbloquear · {price}',
  'paywall.unlockLabel': 'Desbloquear el pack de casos por {price}',
  'paywall.notNow': 'Ahora no',
};

/**
 * Locales with no catalogue yet resolve to an empty one and therefore to
 * English, which is the same path a partially translated locale takes for its
 * missing keys. One code path, not two.
 */
const FR: Catalogue = {
  'common.cancel': 'Annuler',
  'common.done': 'Terminé',
  'common.back': 'Retour',
  'common.retry': 'Réessayer',
  'common.working': 'En cours…',
  // "Moi", not "Vous". This labels the player's own message bubble, and every
  // messaging app in French names that seat from the sender's side.
  'common.you': 'Moi',
  'common.restorePurchases': 'Restaurer les achats',

  'home.pitch':
    'Quelqu’un est mort. Vous n’avez que ses messages. Trouvez la déclaration qui ne peut pas être vraie.',
  'home.cases.title': 'Toutes les affaires',
  'home.tile.sealed': 'Scellée',
  'home.tile.toProve': '{count} à prouver',
  'home.tile.lockedLabel': '{title}, scellée. {count} contradictions. Déverrouiller.',
  'home.tile.lockedLabelOne': '{title}, scellée. 1 contradiction. Déverrouiller.',
  'home.tile.openLabel': '{title}. {count} contradictions à prouver. Ouvrir.',
  'home.tile.openLabelOne': '{title}. 1 contradiction à prouver. Ouvrir.',

  'home.continue.title': 'Continuer',
  'home.continue.unreadOne': '1 non lu',
  'home.continue.unreadMany': '{count} non lus',
  'home.continue.label': 'Continuer {title}.',
  'home.continue.backTo': 'Retour à {thread}.',
  'home.continue.proved': '{proved} sur {total} prouvées. Dernière session {elapsed}.',

  'case.tab.threads': 'Messages',
  'case.tab.board': 'Tableau',
  'case.tab.accuse': 'Accuser',

  'settings.title': 'Réglages',
  'settings.sound.section': 'Son',
  'settings.sound.label': 'Effets sonores',
  'settings.sound.detail':
    'De brefs signaux quand un message arrive et quand une contradiction cède.',
  'settings.volume.label': 'Volume',
  'settings.feel.section': 'Ressenti',
  'settings.haptics.label': 'Retour haptique',
  'settings.haptics.detail':
    'Des vibrations quand vous épinglez une déclaration ou confirmez un fait.',
  'settings.motion.label': 'Réduire les animations',
  'settings.motion.detail':
    'Les messages apparaissent instantanément et les sons décoratifs restent silencieux.',
  'settings.language.section': 'Langue',
  'settings.language.label': 'Langue',
  'settings.language.hint': 'Ouvre la liste des langues',
  'settings.language.footnote':
    'Les affaires sont traduites séparément. Toute affaire qui n’a pas encore été traduite reste en anglais.',
  'settings.purchases.section': 'Achats',
  'settings.restore.detail':
    'Vous avez déjà acheté le pack d’affaires ? Récupérez-le sur cet appareil.',
  'settings.progress.section': 'Progression',
  'settings.reset.label': 'Effacer toute la progression',
  'settings.reset.detail': 'Efface toutes les sauvegardes. Les achats sont conservés.',
  'settings.reset.confirm': 'Effacer toute la progression ?',
  'settings.reset.confirmBody':
    'Chaque affaire redevient non lue, et chaque contradiction que vous avez prouvée est oubliée. Les achats ne sont pas touchés. C’est irréversible.',
  'settings.reset.keep': 'Garder',
  'settings.reset.erase': 'Effacer',
  'settings.reset.erasedNone': 'Il n’y avait aucune progression à effacer.',
  'settings.reset.erasedOne': '1 affaire sauvegardée effacée.',
  'settings.reset.erasedMany': '{count} affaires sauvegardées effacées.',
  'settings.reset.failed': 'Impossible d’effacer la progression. Réessayez.',
  'settings.about.section': 'À propos',
  'settings.about.version': 'Version',
  'settings.about.privacy': 'Ce que cette app conserve',
  'settings.about.licences': 'Licences open source',

  'settings.privacy.progress':
    'Votre progression dans chaque affaire est conservée sur cet appareil.',
  'settings.privacy.purchases':
    'Les achats sont gérés par l’App Store ou Google Play via RevenueCat. Cette app ne voit jamais vos informations de paiement.',
  'settings.privacy.noTracking':
    'Cette version ne contient ni publicité, ni outil d’analyse ou de suivi.',
  'settings.privacy.deletion': 'Supprimer l’app supprime votre progression avec elle.',

  'language.title': 'Langue',
  'language.footnote':
    'Ceci traduit l’application. Les affaires sont traduites séparément, et toute affaire qui n’a pas encore été traduite reste en anglais.',

  'signIn.title': 'Connexion',
  'signIn.heading': 'Emportez vos notes d’enquête',
  'signIn.why': 'Un compte transfère votre progression sur un autre téléphone.',
  'signIn.createAccount': 'Créer un compte',
  'signIn.email': 'E-mail',
  'signIn.password': 'Mot de passe',
  'signIn.alreadyRegistered': 'Cette adresse a déjà un compte. Connectez-vous.',
  'signIn.confirmEmail': 'Consultez {email} pour le lien de confirmation, puis connectez-vous.',
  'signIn.storesNote':
    'Un compte conserve votre adresse e-mail et les messages que vous avez lus. Rien d’autre.',
  'signIn.leave': 'Continuer sur ce téléphone',
  'signIn.leaveLabel': 'Continuer sur ce téléphone, sans compte',
  'signIn.off.title': 'Les comptes sont désactivés',
  'signIn.signedIn.title': 'Connecté',
  'signIn.account': 'Votre compte',
  'signIn.sync': 'Synchroniser',
  'signIn.syncing': 'Synchronisation…',
  'signIn.backToCases': 'Retour aux affaires',
  'signIn.signOut': 'Se déconnecter',
  'signIn.signOutNote':
    'La déconnexion laisse toutes les sauvegardes sur ce téléphone. Rien n’est supprimé.',

  'paywall.title': 'Plus d’affaires',
  'paywall.body':
    'Une autre mort, un autre téléphone, une autre histoire qui ne tient pas. Déverrouillez le pack pour continuer.',
  'paywall.bullet.case': 'Une deuxième affaire complète',
  'paywall.bullet.suspects': 'De nouveaux suspects, de nouvelles contradictions',
  'paywall.bullet.permanent': 'À vous définitivement — ce n’est pas un abonnement',
  'paywall.empty': 'La boutique n’a rien à proposer pour le moment. Réessayez dans un instant.',
  'paywall.unreachable': 'Impossible de joindre la boutique.',
  'paywall.failed': 'L’achat n’a pas abouti. Vous n’avez pas été débité.',
  'paywall.unlock': 'Déverrouiller · {price}',
  'paywall.unlockLabel': 'Déverrouiller le pack d’affaires pour {price}',
  'paywall.notNow': 'Plus tard',
};

export const CATALOGUES: Readonly<Record<LocaleTag, Catalogue>> = {
  en: EN,
  es: ES,
  fr: FR,
  de: {},
  'pt-BR': {},
  ja: {},
};

export const SOURCE_LOCALE: LocaleTag = DEFAULT_LOCALE;
