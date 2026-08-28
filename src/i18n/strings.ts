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
  'home.storeUnreachable':
    'Could not check your purchases. Cases you own will unlock when you are back online.',
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

  /* The conversation screen. Reading is paced by the player: a tap delivers
     the next message, and the button skips the rest of the thread. */

  /* The walkthrough shown once on first launch, and repeatable from Settings.
     Teaches the controls; the tutorial CASE teaches the reasoning. */
  'settings.help.section': 'Help',
  'howToPlay.title': 'How to play',
  'howToPlay.step': 'Step {n} of {total}',
  'howToPlay.skip': 'Skip',
  'howToPlay.next': 'Next',
  'howToPlay.start': 'Start playing',
  'howToPlay.1.title': 'The ruling is wrong',
  'howToPlay.1.body':
    'Someone is dead and the file is closed. Everything you get is in their messages. One statement in them cannot be true.',
  'howToPlay.2.title': 'Tap to read on',
  'howToPlay.2.body':
    'Messages arrive one at a time. Tap anywhere to bring in the next. Skip all jumps to the end of a conversation.',
  'howToPlay.3.title': 'Hold a message to pin it',
  'howToPlay.3.body':
    'Press and hold any message. If it claims someone was somewhere at a certain time, you can put that claim on the record.',
  'howToPlay.4.title': 'Two claims, one impossibility',
  'howToPlay.4.body':
    'Compare two pinned claims on the board. If they put one person in two places over the same minute, that is a contradiction. Most pairs will not fire, and that is the game.',
  'howToPlay.5.title': 'Name them',
  'howToPlay.5.body':
    'When a contradiction shows who lied about where they were, accuse them. You get one accusation per case, and it is final.',
  'thread.conversation': 'Conversation',
  'thread.tapToContinue': 'Tap to continue',
  'thread.skipAll': 'Skip all',
  'home.continue.proved': '{proved} of {total} proved. Last played {elapsed}.',

  /*
   * How long ago the player last put the phone down.
   *
   * Split into keys rather than built from a number and a unit, because
   * assembling "{count} {unit} ago" in code assumes every language agrees on
   * that order and on there being exactly two plural forms. These are whole
   * phrases, so a translator can reorder them or collapse the singular into the
   * plural without touching src/state.
   */
  'elapsed.justNow': 'just now',
  'elapsed.minuteOne': '1 minute ago',
  'elapsed.minuteMany': '{count} minutes ago',
  'elapsed.hourOne': '1 hour ago',
  'elapsed.hourMany': '{count} hours ago',
  'elapsed.yesterday': 'yesterday',
  'elapsed.dayMany': '{count} days ago',
  'elapsed.lastWeek': 'last week',
  'elapsed.weekMany': '{count} weeks ago',
  'elapsed.aWhile': 'a while ago',

  /*
   * Sign-in errors and sync results.
   *
   * Whole sentences, including the sync counts. `sync.both` could have been
   * assembled from two fragments and a separator, and was — the code built
   * "Case notes synced — 2 brought back, 1 backed up." by joining an array,
   * which hands a translator two noun phrases and assumes their language
   * chains clauses in that order with that punctuation.
   */
  'auth.error.generic': 'Something went wrong. Try again in a moment.',
  'auth.error.badCredentials':
    'That email and password do not match an account. Check both, or create an account instead.',
  'auth.error.emailUnconfirmed':
    'Confirm your email first — the link is in your inbox. Check spam if it is not there.',
  'auth.error.alreadyRegistered': 'That email already has an account. Sign in instead.',
  'auth.error.passwordShort': 'That password is too short. Use at least 6 characters.',
  'auth.error.rateLimit': 'Too many attempts. Wait a minute and try again.',
  'auth.error.network':
    'Could not reach the server. Check your connection and try again — your progress is safe on this device.',
  'auth.error.badEmail': 'That does not look like an email address. Check it and try again.',
  'sync.notSignedIn': 'Not signed in. Your progress is saved on this device.',
  'sync.upToDate': 'Everything was already in sync.',
  'sync.downloaded': 'Case notes synced. {count} brought back from your account.',
  'sync.uploaded': 'Case notes synced. {count} backed up to your account.',
  'sync.both': 'Case notes synced. {downloaded} brought back, {uploaded} backed up.',

  'restore.working': 'Checking with the store…',
  'restore.none': 'No purchases found for this store account.',
  'restore.oneRestored': 'Restored 1 purchase. Your case pack is unlocked.',
  'restore.manyRestored': 'Restored {count} purchases. Your case pack is unlocked.',
  'restore.unreachable': 'Could not reach the store. Check your connection and try again.',

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
  'home.storeUnreachable':
    'No se pudieron comprobar tus compras. Los casos que ya tienes se desbloquearán cuando vuelvas a estar en línea.',
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

  /* The conversation screen. Reading is paced by the player: a tap delivers
     the next message, and the button skips the rest of the thread. */

  /* The walkthrough shown once on first launch, and repeatable from Settings.
     Teaches the controls; the tutorial CASE teaches the reasoning. */
  'settings.help.section': 'Ayuda',
  'howToPlay.title': 'Cómo jugar',
  'howToPlay.step': 'Paso {n} de {total}',
  'howToPlay.skip': 'Saltar',
  'howToPlay.next': 'Siguiente',
  'howToPlay.start': 'Empezar a jugar',
  'howToPlay.1.title': 'El dictamen es falso',
  'howToPlay.1.body':
    'Alguien ha muerto y el caso está cerrado. Todo lo que tienes está en sus mensajes. Una de esas frases no puede ser cierta.',
  'howToPlay.2.title': 'Toca para seguir leyendo',
  'howToPlay.2.body':
    'Los mensajes llegan de uno en uno. Toca en cualquier parte para traer el siguiente. Saltar todo va al final de la conversación.',
  'howToPlay.3.title': 'Mantén pulsado para fijar',
  'howToPlay.3.body':
    'Mantén pulsado cualquier mensaje. Si afirma que alguien estuvo en un lugar a una hora, puedes dejar constancia de esa afirmación.',
  'howToPlay.4.title': 'Dos afirmaciones, una imposibilidad',
  'howToPlay.4.body':
    'Compara dos afirmaciones fijadas en el tablero. Si sitúan a una persona en dos lugares durante el mismo minuto, hay contradicción. La mayoría de los pares no saltará, y de eso va el juego.',
  'howToPlay.5.title': 'Di su nombre',
  'howToPlay.5.body':
    'Cuando una contradicción demuestre quién mintió sobre dónde estaba, acúsalo. Tienes una sola acusación por caso y es definitiva.',
  'thread.conversation': 'Conversación',
  'thread.tapToContinue': 'Toca para continuar',
  'thread.skipAll': 'Saltar todo',
  'home.continue.proved': '{proved} de {total} probadas. Última partida {elapsed}.',

  'elapsed.justNow': 'ahora mismo',
  'elapsed.minuteOne': 'hace 1 minuto',
  'elapsed.minuteMany': 'hace {count} minutos',
  'elapsed.hourOne': 'hace 1 hora',
  'elapsed.hourMany': 'hace {count} horas',
  'elapsed.yesterday': 'ayer',
  'elapsed.dayMany': 'hace {count} días',
  'elapsed.lastWeek': 'la semana pasada',
  'elapsed.weekMany': 'hace {count} semanas',
  'elapsed.aWhile': 'hace tiempo',

  'auth.error.generic': 'Algo ha salido mal. Inténtalo de nuevo en un momento.',
  'auth.error.badCredentials':
    'Ese correo y esa contraseña no coinciden con ninguna cuenta. Revisa los dos, o crea una cuenta.',
  'auth.error.emailUnconfirmed':
    'Confirma tu correo primero — el enlace está en tu bandeja de entrada. Mira en spam si no aparece.',
  'auth.error.alreadyRegistered': 'Ese correo ya tiene una cuenta. Inicia sesión.',
  'auth.error.passwordShort': 'Esa contraseña es demasiado corta. Usa al menos 6 caracteres.',
  'auth.error.rateLimit': 'Demasiados intentos. Espera un minuto y vuelve a probar.',
  'auth.error.network':
    'No se ha podido conectar con el servidor. Revisa tu conexión y vuelve a probar — tu progreso está a salvo en este dispositivo.',
  'auth.error.badEmail': 'Eso no parece una dirección de correo. Revísala y vuelve a probar.',
  'sync.notSignedIn': 'No has iniciado sesión. Tu progreso se guarda en este dispositivo.',
  'sync.upToDate': 'Ya estaba todo sincronizado.',
  'sync.downloaded': 'Notas del caso sincronizadas. {count} recuperadas de tu cuenta.',
  'sync.uploaded': 'Notas del caso sincronizadas. {count} guardadas en tu cuenta.',
  'sync.both':
    'Notas del caso sincronizadas. {downloaded} recuperadas, {uploaded} guardadas.',

  'restore.working': 'Consultando con la tienda…',
  'restore.none': 'No se han encontrado compras en esta cuenta de la tienda.',
  'restore.oneRestored': 'Restaurada 1 compra. Tu pack de casos está desbloqueado.',
  'restore.manyRestored': 'Restauradas {count} compras. Tu pack de casos está desbloqueado.',
  'restore.unreachable': 'No se ha podido conectar con la tienda. Revisa tu conexión y vuelve a probar.',

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
  'home.storeUnreachable':
    'Impossible de vérifier vos achats. Les affaires que vous possédez se déverrouilleront dès le retour de la connexion.',
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

  /* The conversation screen. Reading is paced by the player: a tap delivers
     the next message, and the button skips the rest of the thread. */

  /* The walkthrough shown once on first launch, and repeatable from Settings.
     Teaches the controls; the tutorial CASE teaches the reasoning. */
  'settings.help.section': 'Aide',
  'howToPlay.title': 'Comment jouer',
  'howToPlay.step': 'Étape {n} sur {total}',
  'howToPlay.skip': 'Passer',
  'howToPlay.next': 'Suivant',
  'howToPlay.start': 'Commencer',
  'howToPlay.1.title': 'La conclusion est fausse',
  'howToPlay.1.body':
    'Quelqu’un est mort et le dossier est clos. Tout ce que vous avez tient dans ses messages. Une de ces phrases ne peut pas être vraie.',
  'howToPlay.2.title': 'Appuyez pour lire la suite',
  'howToPlay.2.body':
    'Les messages arrivent un par un. Appuyez n’importe où pour faire venir le suivant. Tout passer va à la fin de la conversation.',
  'howToPlay.3.title': 'Maintenez pour épingler',
  'howToPlay.3.body':
    'Maintenez un message enfoncé. S’il affirme que quelqu’un se trouvait quelque part à une heure donnée, vous pouvez consigner cette affirmation.',
  'howToPlay.4.title': 'Deux affirmations, une impossibilité',
  'howToPlay.4.body':
    'Comparez deux affirmations sur le tableau. Si elles placent une personne à deux endroits sur la même minute, c’est une contradiction. La plupart des paires ne donneront rien, et c’est le jeu.',
  'howToPlay.5.title': 'Nommez-le',
  'howToPlay.5.body':
    'Quand une contradiction montre qui a menti sur l’endroit où il se trouvait, accusez-le. Une seule accusation par affaire, et elle est définitive.',
  'thread.conversation': 'Conversation',
  'thread.tapToContinue': 'Appuyez pour continuer',
  'thread.skipAll': 'Tout passer',
  'home.continue.proved': '{proved} sur {total} prouvées. Dernière session {elapsed}.',

  'elapsed.justNow': "à l'instant",
  'elapsed.minuteOne': 'il y a 1 minute',
  'elapsed.minuteMany': 'il y a {count} minutes',
  'elapsed.hourOne': 'il y a 1 heure',
  'elapsed.hourMany': 'il y a {count} heures',
  'elapsed.yesterday': 'hier',
  'elapsed.dayMany': 'il y a {count} jours',
  'elapsed.lastWeek': 'la semaine dernière',
  'elapsed.weekMany': 'il y a {count} semaines',
  'elapsed.aWhile': 'il y a un moment',

  'auth.error.generic': 'Quelque chose a mal tourné. Réessaie dans un instant.',
  'auth.error.badCredentials':
    'Cet e-mail et ce mot de passe ne correspondent à aucun compte. Vérifie les deux, ou crée un compte.',
  'auth.error.emailUnconfirmed':
    'Confirme d’abord ton e-mail — le lien est dans ta boîte de réception. Regarde dans les spams s’il n’y est pas.',
  'auth.error.alreadyRegistered': 'Cet e-mail a déjà un compte. Connecte-toi.',
  'auth.error.passwordShort': 'Ce mot de passe est trop court. Utilise au moins 6 caractères.',
  'auth.error.rateLimit': 'Trop de tentatives. Attends une minute et réessaie.',
  'auth.error.network':
    'Impossible de joindre le serveur. Vérifie ta connexion et réessaie — ta progression est en sécurité sur cet appareil.',
  'auth.error.badEmail': 'Cela ne ressemble pas à une adresse e-mail. Vérifie-la et réessaie.',
  // "Aucun compte connecté", not "Tu n'es pas connecté" — the participle would
  // agree with the player, who has no gender. Same rule as the case packs.
  'sync.notSignedIn': 'Aucun compte connecté. Ta progression est enregistrée sur cet appareil.',
  'sync.upToDate': 'Tout était déjà synchronisé.',
  'sync.downloaded': 'Notes d’enquête synchronisées. {count} récupérées depuis ton compte.',
  'sync.uploaded': 'Notes d’enquête synchronisées. {count} sauvegardées sur ton compte.',
  'sync.both':
    'Notes d’enquête synchronisées. {downloaded} récupérées, {uploaded} sauvegardées.',

  'restore.working': 'Vérification auprès de la boutique…',
  'restore.none': 'Aucun achat trouvé pour ce compte de boutique.',
  'restore.oneRestored': '1 achat restauré. Ton pack d’enquêtes est débloqué.',
  'restore.manyRestored': '{count} achats restaurés. Ton pack d’enquêtes est débloqué.',
  'restore.unreachable': 'Impossible de joindre la boutique. Vérifie ta connexion et réessaie.',

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

/**
 * German uses "du" throughout, not "Sie". Games in German are informal almost
 * without exception, and a murder mystery that addresses the player formally
 * sounds like a bank.
 */
const DE: Catalogue = {
  'common.cancel': 'Abbrechen',
  'common.done': 'Fertig',
  'common.back': 'Zurück',
  'common.retry': 'Erneut versuchen',
  'common.working': 'Wird ausgeführt…',
  'common.you': 'Ich',
  'common.restorePurchases': 'Käufe wiederherstellen',

  'home.pitch':
    'Jemand ist tot. Alles, was du hast, sind die Nachrichten. Finde die Aussage, die nicht wahr sein kann.',
  'home.cases.title': 'Alle Fälle',
  'home.storeUnreachable':
    'Deine Käufe konnten nicht geprüft werden. Fälle, die dir gehören, werden freigeschaltet, sobald du wieder online bist.',
  'home.tile.sealed': 'Versiegelt',
  'home.tile.toProve': '{count} zu beweisen',
  'home.tile.lockedLabel': '{title}, versiegelt. {count} Widersprüche. Freischalten.',
  'home.tile.lockedLabelOne': '{title}, versiegelt. 1 Widerspruch. Freischalten.',
  'home.tile.openLabel': '{title}. {count} Widersprüche zu beweisen. Öffnen.',
  'home.tile.openLabelOne': '{title}. 1 Widerspruch zu beweisen. Öffnen.',

  'home.continue.title': 'Fortsetzen',
  'home.continue.unreadOne': '1 ungelesen',
  'home.continue.unreadMany': '{count} ungelesen',
  'home.continue.label': '{title} fortsetzen.',
  'home.continue.backTo': 'Zurück zu {thread}.',

  /* The conversation screen. Reading is paced by the player: a tap delivers
     the next message, and the button skips the rest of the thread. */

  /* The walkthrough shown once on first launch, and repeatable from Settings.
     Teaches the controls; the tutorial CASE teaches the reasoning. */
  'settings.help.section': 'Hilfe',
  'howToPlay.title': 'So wird gespielt',
  'howToPlay.step': 'Schritt {n} von {total}',
  'howToPlay.skip': 'Überspringen',
  'howToPlay.next': 'Weiter',
  'howToPlay.start': 'Losspielen',
  'howToPlay.1.title': 'Das Urteil stimmt nicht',
  'howToPlay.1.body':
    'Jemand ist tot und die Akte ist geschlossen. Alles, was du hast, steht in den Nachrichten. Einer dieser Sätze kann nicht wahr sein.',
  'howToPlay.2.title': 'Zum Weiterlesen tippen',
  'howToPlay.2.body':
    'Nachrichten kommen einzeln an. Tippe irgendwo hin, um die nächste zu holen. Alles überspringen springt ans Ende des Gesprächs.',
  'howToPlay.3.title': 'Halten, um festzuhalten',
  'howToPlay.3.body':
    'Halte eine Nachricht gedrückt. Behauptet sie, jemand sei zu einer bestimmten Zeit an einem Ort gewesen, kannst du diese Aussage zu den Akten nehmen.',
  'howToPlay.4.title': 'Zwei Aussagen, eine Unmöglichkeit',
  'howToPlay.4.body':
    'Vergleiche zwei Aussagen auf der Tafel. Setzen sie eine Person in derselben Minute an zwei Orte, ist das ein Widerspruch. Die meisten Paare ergeben nichts, und genau das ist das Spiel.',
  'howToPlay.5.title': 'Nenne den Namen',
  'howToPlay.5.body':
    'Wenn ein Widerspruch zeigt, wer über seinen Aufenthaltsort gelogen hat, klage ihn an. Eine Anklage pro Fall, und sie ist endgültig.',
  'thread.conversation': 'Unterhaltung',
  'thread.tapToContinue': 'Zum Fortfahren tippen',
  'thread.skipAll': 'Alles überspringen',
  'home.continue.proved': '{proved} von {total} bewiesen. Zuletzt gespielt {elapsed}.',

  'elapsed.justNow': 'gerade eben',
  'elapsed.minuteOne': 'vor 1 Minute',
  'elapsed.minuteMany': 'vor {count} Minuten',
  'elapsed.hourOne': 'vor 1 Stunde',
  'elapsed.hourMany': 'vor {count} Stunden',
  'elapsed.yesterday': 'gestern',
  'elapsed.dayMany': 'vor {count} Tagen',
  'elapsed.lastWeek': 'letzte Woche',
  'elapsed.weekMany': 'vor {count} Wochen',
  'elapsed.aWhile': 'vor längerer Zeit',

  'auth.error.generic': 'Etwas ist schiefgelaufen. Versuch es gleich noch einmal.',
  'auth.error.badCredentials':
    'Diese E-Mail und dieses Passwort passen zu keinem Konto. Prüf beides, oder leg ein Konto an.',
  'auth.error.emailUnconfirmed':
    'Bestätige zuerst deine E-Mail — der Link liegt in deinem Postfach. Sieh im Spam nach, falls er nicht da ist.',
  'auth.error.alreadyRegistered': 'Für diese E-Mail gibt es schon ein Konto. Melde dich an.',
  'auth.error.passwordShort': 'Dieses Passwort ist zu kurz. Nimm mindestens 6 Zeichen.',
  'auth.error.rateLimit': 'Zu viele Versuche. Warte eine Minute und versuch es noch einmal.',
  'auth.error.network':
    'Der Server war nicht erreichbar. Prüf deine Verbindung und versuch es noch einmal — dein Fortschritt ist auf diesem Gerät sicher.',
  'auth.error.badEmail': 'Das sieht nicht nach einer E-Mail-Adresse aus. Prüf sie und versuch es noch einmal.',
  'sync.notSignedIn': 'Kein Konto angemeldet. Dein Fortschritt wird auf diesem Gerät gespeichert.',
  'sync.upToDate': 'Es war schon alles synchron.',
  'sync.downloaded': 'Fallnotizen synchronisiert. {count} aus deinem Konto zurückgeholt.',
  'sync.uploaded': 'Fallnotizen synchronisiert. {count} in deinem Konto gesichert.',
  'sync.both': 'Fallnotizen synchronisiert. {downloaded} zurückgeholt, {uploaded} gesichert.',

  'restore.working': 'Wird im Store geprüft…',
  'restore.none': 'Für dieses Store-Konto wurden keine Käufe gefunden.',
  'restore.oneRestored': '1 Kauf wiederhergestellt. Dein Fallpaket ist freigeschaltet.',
  'restore.manyRestored': '{count} Käufe wiederhergestellt. Dein Fallpaket ist freigeschaltet.',
  'restore.unreachable': 'Der Store war nicht erreichbar. Prüf deine Verbindung und versuch es noch einmal.',

  'case.tab.threads': 'Nachrichten',
  'case.tab.board': 'Tafel',
  'case.tab.accuse': 'Anklagen',

  'settings.title': 'Einstellungen',
  'settings.sound.section': 'Ton',
  'settings.sound.label': 'Soundeffekte',
  'settings.sound.detail':
    'Kurze Signale, wenn eine Nachricht eintrifft und wenn ein Widerspruch bricht.',
  'settings.volume.label': 'Lautstärke',
  'settings.feel.section': 'Haptik',
  'settings.haptics.label': 'Vibration',
  'settings.haptics.detail':
    'Spürbare Impulse, wenn du eine Aussage anheftest oder einen Fakt bestätigst.',
  'settings.motion.label': 'Bewegung reduzieren',
  'settings.motion.detail':
    'Nachrichten erscheinen sofort und dekorative Töne bleiben stumm.',
  'settings.language.section': 'Sprache',
  'settings.language.label': 'Sprache',
  'settings.language.hint': 'Öffnet die Liste der Sprachen',
  'settings.language.footnote':
    'Fälle werden separat übersetzt. Jeder noch nicht übersetzte Fall bleibt auf Englisch.',
  'settings.purchases.section': 'Käufe',
  'settings.restore.detail': 'Das Fallpaket schon gekauft? Hol es dir auf dieses Gerät zurück.',
  'settings.progress.section': 'Fortschritt',
  'settings.reset.label': 'Gesamten Fortschritt löschen',
  'settings.reset.detail': 'Löscht jeden gespeicherten Fall. Käufe bleiben erhalten.',
  'settings.reset.confirm': 'Gesamten Fortschritt löschen?',
  'settings.reset.confirmBody':
    'Jeder Fall gilt wieder als ungelesen, und jeder bewiesene Widerspruch ist vergessen. Käufe sind nicht betroffen. Das lässt sich nicht rückgängig machen.',
  'settings.reset.keep': 'Behalten',
  'settings.reset.erase': 'Löschen',
  'settings.reset.erasedNone': 'Es gab keinen gespeicherten Fortschritt zum Löschen.',
  'settings.reset.erasedOne': '1 gespeicherter Fall gelöscht.',
  'settings.reset.erasedMany': '{count} gespeicherte Fälle gelöscht.',
  'settings.reset.failed': 'Fortschritt konnte nicht gelöscht werden. Versuch es erneut.',
  'settings.about.section': 'Über',
  'settings.about.version': 'Version',
  'settings.about.privacy': 'Was diese App speichert',
  'settings.about.licences': 'Open-Source-Lizenzen',

  'settings.privacy.progress': 'Dein Fortschritt in jedem Fall wird auf diesem Gerät gespeichert.',
  'settings.privacy.purchases':
    'Käufe werden vom App Store oder von Google Play über RevenueCat abgewickelt. Diese App sieht deine Zahlungsdaten nie.',
  'settings.privacy.noTracking':
    'In dieser Version gibt es keine Werbung und keine Analyse- oder Tracking-SDKs.',
  'settings.privacy.deletion': 'Die App zu löschen löscht deinen Fortschritt mit.',

  'language.title': 'Sprache',
  'language.footnote':
    'Das übersetzt die App. Fälle werden separat übersetzt, und jeder noch nicht übersetzte Fall bleibt auf Englisch.',

  'signIn.title': 'Anmelden',
  'signIn.heading': 'Nimm deine Ermittlungsnotizen mit',
  'signIn.why': 'Ein Konto überträgt deinen Fortschritt auf ein anderes Telefon.',
  'signIn.createAccount': 'Konto erstellen',
  'signIn.email': 'E-Mail',
  'signIn.password': 'Passwort',
  'signIn.alreadyRegistered':
    'Für diese E-Mail gibt es bereits ein Konto. Melde dich stattdessen an.',
  'signIn.confirmEmail': 'Sieh in {email} nach dem Bestätigungslink und melde dich dann an.',
  'signIn.storesNote':
    'Ein Konto speichert deine E-Mail-Adresse und welche Nachrichten du gelesen hast. Sonst nichts.',
  'signIn.leave': 'Auf diesem Telefon weiterspielen',
  'signIn.leaveLabel': 'Auf diesem Telefon weiterspielen, ohne Konto',
  'signIn.off.title': 'Konten sind deaktiviert',
  'signIn.signedIn.title': 'Angemeldet',
  'signIn.account': 'Dein Konto',
  'signIn.sync': 'Jetzt synchronisieren',
  'signIn.syncing': 'Wird synchronisiert…',
  'signIn.backToCases': 'Zurück zu den Fällen',
  'signIn.signOut': 'Abmelden',
  'signIn.signOutNote':
    'Beim Abmelden bleibt jeder gespeicherte Fall auf diesem Telefon. Nichts wird gelöscht.',

  'paywall.title': 'Mehr Fälle',
  'paywall.body':
    'Ein weiterer Tod, ein weiteres Telefon, eine weitere Geschichte, die nicht standhält. Schalte das Fallpaket frei, um weiterzumachen.',
  'paywall.bullet.case': 'Ein zweiter Fall in voller Länge',
  'paywall.bullet.suspects': 'Neue Verdächtige, neue Widersprüche',
  'paywall.bullet.permanent': 'Dauerhaft deins — kein Abo',
  'paywall.empty': 'Der Store hat gerade nichts anzubieten. Versuch es gleich noch einmal.',
  'paywall.unreachable': 'Der Store war nicht erreichbar.',
  'paywall.failed': 'Der Kauf ist nicht durchgegangen. Dir wurde nichts berechnet.',
  'paywall.unlock': 'Freischalten · {price}',
  'paywall.unlockLabel': 'Das Fallpaket für {price} freischalten',
  'paywall.notNow': 'Später',
};

const PT_BR: Catalogue = {
  'common.cancel': 'Cancelar',
  'common.done': 'Concluído',
  'common.back': 'Voltar',
  'common.retry': 'Tentar de novo',
  'common.working': 'Processando…',
  'common.you': 'Eu',
  'common.restorePurchases': 'Restaurar compras',

  'home.pitch':
    'Alguém morreu. Tudo o que você tem são as mensagens. Encontre a afirmação que não pode ser verdade.',
  'home.cases.title': 'Todos os casos',
  'home.storeUnreachable':
    'Não foi possível verificar suas compras. Os casos que você já tem serão desbloqueados quando você voltar a ficar online.',
  'home.tile.sealed': 'Lacrado',
  'home.tile.toProve': '{count} a provar',
  'home.tile.lockedLabel': '{title}, lacrado. {count} contradições. Desbloquear.',
  'home.tile.lockedLabelOne': '{title}, lacrado. 1 contradição. Desbloquear.',
  'home.tile.openLabel': '{title}. {count} contradições a provar. Abrir.',
  'home.tile.openLabelOne': '{title}. 1 contradição a provar. Abrir.',

  'home.continue.title': 'Continuar',
  'home.continue.unreadOne': '1 não lida',
  'home.continue.unreadMany': '{count} não lidas',
  'home.continue.label': 'Continuar {title}.',
  'home.continue.backTo': 'Voltar para {thread}.',

  /* The conversation screen. Reading is paced by the player: a tap delivers
     the next message, and the button skips the rest of the thread. */

  /* The walkthrough shown once on first launch, and repeatable from Settings.
     Teaches the controls; the tutorial CASE teaches the reasoning. */
  'settings.help.section': 'Ajuda',
  'howToPlay.title': 'Como jogar',
  'howToPlay.step': 'Passo {n} de {total}',
  'howToPlay.skip': 'Pular',
  'howToPlay.next': 'Avançar',
  'howToPlay.start': 'Começar a jogar',
  'howToPlay.1.title': 'O laudo está errado',
  'howToPlay.1.body':
    'Alguém morreu e o caso foi encerrado. Tudo o que você tem está nas mensagens. Uma dessas frases não pode ser verdade.',
  'howToPlay.2.title': 'Toque para continuar lendo',
  'howToPlay.2.body':
    'As mensagens chegam uma de cada vez. Toque em qualquer lugar para trazer a próxima. Pular tudo vai até o fim da conversa.',
  'howToPlay.3.title': 'Segure para fixar',
  'howToPlay.3.body':
    'Segure qualquer mensagem. Se ela afirma que alguém estava em algum lugar a certa hora, você pode registrar essa afirmação.',
  'howToPlay.4.title': 'Duas afirmações, uma impossibilidade',
  'howToPlay.4.body':
    'Compare duas afirmações no quadro. Se elas colocam uma pessoa em dois lugares no mesmo minuto, isso é uma contradição. A maioria dos pares não vai fechar, e esse é o jogo.',
  'howToPlay.5.title': 'Diga o nome',
  'howToPlay.5.body':
    'Quando uma contradição mostrar quem mentiu sobre onde estava, acuse. É uma acusação por caso, e ela é definitiva.',
  'thread.conversation': 'Conversa',
  'thread.tapToContinue': 'Toque para continuar',
  'thread.skipAll': 'Pular tudo',
  'home.continue.proved': '{proved} de {total} provadas. Jogado por último {elapsed}.',

  'elapsed.justNow': 'agora mesmo',
  'elapsed.minuteOne': 'há 1 minuto',
  'elapsed.minuteMany': 'há {count} minutos',
  'elapsed.hourOne': 'há 1 hora',
  'elapsed.hourMany': 'há {count} horas',
  'elapsed.yesterday': 'ontem',
  'elapsed.dayMany': 'há {count} dias',
  'elapsed.lastWeek': 'semana passada',
  'elapsed.weekMany': 'há {count} semanas',
  'elapsed.aWhile': 'faz um tempo',

  'auth.error.generic': 'Alguma coisa deu errado. Tente de novo daqui a pouco.',
  'auth.error.badCredentials':
    'Esse e-mail e essa senha não batem com nenhuma conta. Confira os dois, ou crie uma conta.',
  'auth.error.emailUnconfirmed':
    'Confirme seu e-mail primeiro — o link está na sua caixa de entrada. Veja no spam se não estiver lá.',
  'auth.error.alreadyRegistered': 'Esse e-mail já tem uma conta. Entre nela.',
  'auth.error.passwordShort': 'Essa senha é curta demais. Use pelo menos 6 caracteres.',
  'auth.error.rateLimit': 'Tentativas demais. Espere um minuto e tente de novo.',
  'auth.error.network':
    'Não deu para falar com o servidor. Confira sua conexão e tente de novo — seu progresso está seguro neste aparelho.',
  'auth.error.badEmail': 'Isso não parece um endereço de e-mail. Confira e tente de novo.',
  // "Nenhuma conta conectada", not "Você não está conectado" — the participle
  // would agree with the player, who has no gender.
  'sync.notSignedIn': 'Nenhuma conta conectada. Seu progresso fica salvo neste aparelho.',
  'sync.upToDate': 'Já estava tudo sincronizado.',
  'sync.downloaded': 'Anotações do caso sincronizadas. {count} recuperadas da sua conta.',
  'sync.uploaded': 'Anotações do caso sincronizadas. {count} salvas na sua conta.',
  'sync.both': 'Anotações do caso sincronizadas. {downloaded} recuperadas, {uploaded} salvas.',

  'restore.working': 'Verificando com a loja…',
  'restore.none': 'Nenhuma compra encontrada nesta conta da loja.',
  'restore.oneRestored': '1 compra restaurada. Seu pacote de casos está liberado.',
  'restore.manyRestored': '{count} compras restauradas. Seu pacote de casos está liberado.',
  'restore.unreachable': 'Não deu para falar com a loja. Confira sua conexão e tente de novo.',

  'case.tab.threads': 'Mensagens',
  'case.tab.board': 'Quadro',
  'case.tab.accuse': 'Acusar',

  'settings.title': 'Ajustes',
  'settings.sound.section': 'Som',
  'settings.sound.label': 'Efeitos sonoros',
  'settings.sound.detail':
    'Sinais curtos quando uma mensagem chega e quando uma contradição se quebra.',
  'settings.volume.label': 'Volume',
  'settings.feel.section': 'Resposta tátil',
  'settings.haptics.label': 'Vibração',
  'settings.haptics.detail':
    'Toques que você sente ao fixar uma declaração ou confirmar um fato.',
  'settings.motion.label': 'Reduzir animações',
  'settings.motion.detail':
    'As mensagens aparecem na hora e os sons decorativos ficam em silêncio.',
  'settings.language.section': 'Idioma',
  'settings.language.label': 'Idioma',
  'settings.language.hint': 'Abre a lista de idiomas',
  'settings.language.footnote':
    'Os casos são traduzidos separadamente. Qualquer caso ainda não traduzido permanece em inglês.',
  'settings.purchases.section': 'Compras',
  'settings.restore.detail': 'Já comprou o pacote de casos? Recupere-o neste aparelho.',
  'settings.progress.section': 'Progresso',
  'settings.reset.label': 'Apagar todo o progresso',
  'settings.reset.detail': 'Apaga todos os casos salvos. As compras são mantidas.',
  'settings.reset.confirm': 'Apagar todo o progresso?',
  'settings.reset.confirmBody':
    'Cada caso volta a ficar não lido, e cada contradição que você provou é esquecida. As compras não são afetadas. Isso não pode ser desfeito.',
  'settings.reset.keep': 'Manter',
  'settings.reset.erase': 'Apagar',
  'settings.reset.erasedNone': 'Não havia progresso salvo para apagar.',
  'settings.reset.erasedOne': '1 caso salvo apagado.',
  'settings.reset.erasedMany': '{count} casos salvos apagados.',
  'settings.reset.failed': 'Não foi possível apagar o progresso. Tente de novo.',
  'settings.about.section': 'Sobre',
  'settings.about.version': 'Versão',
  'settings.about.privacy': 'O que este app guarda',
  'settings.about.licences': 'Licenças de código aberto',

  'settings.privacy.progress': 'Seu progresso em cada caso fica guardado neste aparelho.',
  'settings.privacy.purchases':
    'As compras são feitas pela App Store ou Google Play através da RevenueCat. Este app nunca vê seus dados de pagamento.',
  'settings.privacy.noTracking':
    'Nesta versão não há anúncios nem SDKs de análise ou rastreamento.',
  'settings.privacy.deletion': 'Apagar o app apaga seu progresso junto.',

  'language.title': 'Idioma',
  'language.footnote':
    'Isto traduz o aplicativo. Os casos são traduzidos separadamente, e qualquer caso ainda não traduzido permanece em inglês.',

  'signIn.title': 'Entrar',
  'signIn.heading': 'Leve suas anotações com você',
  'signIn.why': 'Uma conta leva seu progresso para outro celular.',
  'signIn.createAccount': 'Criar conta',
  'signIn.email': 'E-mail',
  'signIn.password': 'Senha',
  'signIn.alreadyRegistered': 'Esse e-mail já tem uma conta. Entre em vez de criar.',
  'signIn.confirmEmail': 'Procure o link de confirmação em {email} e depois entre.',
  'signIn.storesNote': 'Uma conta guarda seu e-mail e quais mensagens você leu. Nada mais.',
  'signIn.leave': 'Continuar neste celular',
  'signIn.leaveLabel': 'Continuar neste celular, sem conta',
  'signIn.off.title': 'As contas estão desativadas',
  'signIn.signedIn.title': 'Conectado',
  'signIn.account': 'Sua conta',
  'signIn.sync': 'Sincronizar agora',
  'signIn.syncing': 'Sincronizando…',
  'signIn.backToCases': 'Voltar aos casos',
  'signIn.signOut': 'Sair',
  'signIn.signOutNote': 'Sair mantém todos os casos salvos neste celular. Nada é apagado.',

  'paywall.title': 'Mais casos',
  'paywall.body':
    'Outra morte, outro celular, outra história que não se sustenta. Desbloqueie o pacote de casos para continuar.',
  'paywall.bullet.case': 'Um segundo caso completo',
  'paywall.bullet.suspects': 'Novos suspeitos, novas contradições',
  'paywall.bullet.permanent': 'Seu para sempre — não é assinatura',
  'paywall.empty': 'A loja não tem nada para vender agora. Tente daqui a pouco.',
  'paywall.unreachable': 'Não foi possível acessar a loja.',
  'paywall.failed': 'A compra não foi concluída. Você não foi cobrado.',
  'paywall.unlock': 'Desbloquear · {price}',
  'paywall.unlockLabel': 'Desbloquear o pacote de casos por {price}',
  'paywall.notNow': 'Agora não',
};

export const CATALOGUES: Readonly<Record<LocaleTag, Catalogue>> = {
  en: EN,
  es: ES,
  fr: FR,
  de: DE,
  'pt-BR': PT_BR,
  // Japanese is deliberately last and deliberately empty. It needs a translator
  // who can make the register decisions — politeness level, which loanwords stay
  // katakana — that this catalogue cannot fake. It also keeps one genuinely
  // untranslated locale in the build, which is the only thing that proves the
  // English fallback still works.
};

export const SOURCE_LOCALE: LocaleTag = DEFAULT_LOCALE;
