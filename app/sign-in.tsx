import { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/ui/theme';
import { useTranslator } from '@/i18n/useTranslator';
import { render, type Message } from '@/i18n/message';
import {
  useAuth,
  validateCredentials,
  syncProgress,
  describeSyncResult,
  type CredentialField,
  type CredentialProblem,
} from '@/auth';

/**
 * Accounts are OPTIONAL, and this screen has to look optional.
 *
 * Every case is playable signed out on local saves alone — nothing is gated
 * behind having an account, and nothing here is a wall. An account does exactly
 * one thing: it carries progress to another phone. So the screen states that
 * one reason, and keeps the way past it visible without scrolling rather than
 * parked below the fold where a "maybe later" link usually goes.
 *
 * The chrome is the paywall's, deliberately. This is the second screen in the
 * app that is openly an app rather than a phone someone left unlocked, and the
 * two should look like they came from the same place.
 */
export default function SignInScreen() {
  const router = useRouter();
  const t = useTranslator();
  const { status, signIn, signUp, signOut } = useAuth();

  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [problem, setProblem] = useState<CredentialProblem | null>(null);
  // A Message for the same reason `notice` is: rendered at display time, so it
  // is in the language the player is reading now, not the one they were in when
  // the request failed.
  const [formError, setFormError] = useState<Message | null>(null);
  /**
   * Held as a Message, not a string, and rendered at the bottom of this file.
   *
   * Storing the rendered sentence would freeze it in whatever language was
   * active when the sync finished, so a player who changed language with a
   * notice on screen would keep reading the old one.
   */
  const [notice, setNotice] = useState<Message | null>(null);
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState<CredentialField | null>(null);

  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  /**
   * The way out, from anywhere.
   *
   * `back()` when there is somewhere to go back to, and a replace otherwise —
   * a deep link straight to /sign-in has no history, and a dead "keep playing"
   * button on the one screen that promises the game is optional would be the
   * worst possible place for one.
   */
  const leave = useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }, [router]);

  const runSync = useCallback(async () => {
    setBusy(true);
    setNotice(describeSyncResult(await syncProgress()));
    setBusy(false);
  }, []);

  const submit = useCallback(async () => {
    if (busy) return;

    const found = validateCredentials({ email, password, mode });
    if (found) {
      setProblem(found);
      // Send focus to the field that is actually wrong, rather than making the
      // player work out which of the two the message belongs to.
      (found.field === 'email' ? emailRef : passwordRef).current?.focus();
      return;
    }

    setProblem(null);
    setFormError(null);
    setNotice(null);
    setBusy(true);

    if (mode === 'signIn') {
      const attempt = await signIn(email, password);
      if (!attempt.ok) setFormError(attempt.message);
      else setNotice(describeSyncResult(await syncProgress()));
    } else {
      const attempt = await signUp(email, password);
      if (!attempt.ok) {
        setFormError(attempt.message);
      } else if (attempt.outcome === 'alreadyRegistered') {
        // Supabase reports this as a success with no identities, so without
        // this branch the player waits for a mail that was never sent.
        setMode('signIn');
        setFormError({ key: 'signIn.alreadyRegistered' });
      } else if (attempt.outcome === 'confirmEmail') {
        setNotice({ key: 'signIn.confirmEmail', params: { email: email.trim() } });
      } else {
        setNotice(describeSyncResult(await syncProgress()));
      }
    }

    setBusy(false);
  }, [busy, email, password, mode, signIn, signUp, t]);

  const leaveButton = (
    <Pressable
      onPress={leave}
      accessibilityRole="button"
      accessibilityLabel={t('signIn.leaveLabel')}
      hitSlop={theme.hit.slop}
      style={({ pressed }) => [styles.guest, pressed && styles.pressed]}
    >
      <Text style={styles.guestText}>{t('signIn.leave')}</Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* No <Stack.Screen options={{...}} /> here. An inline object literal is a
          fresh reference every render, so setOptions re-renders the navigator
          forever — the exact loop the paywall hit. Options live in _layout.tsx. */}
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {status.kind === 'restoring' ? (
          <View style={styles.centred}>
            <ActivityIndicator color={theme.color.accent} />
          </View>
        ) : null}

        {status.kind === 'unavailable' ? (
          <>
            <Text style={styles.title}>{t('signIn.off.title')}</Text>
            <View style={styles.problemBlock}>
              <Text style={styles.problemText}>{status.reason}</Text>
            </View>
            {/* No form and no retry. The config cannot change while the app is
                running, so a button that can never work is worse than none. */}
            {leaveButton}
          </>
        ) : null}

        {status.kind === 'signedIn' ? (
          <>
            <Text style={styles.title}>{t('signIn.signedIn.title')}</Text>
            <Text style={styles.reason}>{status.user.email ?? t('signIn.account')}</Text>

            {notice ? (
              <View style={styles.noticeBlock} accessibilityLiveRegion="polite">
                <Text style={styles.noticeText}>{render(notice, t)}</Text>
              </View>
            ) : null}

            <Pressable
              onPress={runSync}
              disabled={busy}
              accessibilityRole="button"
              accessibilityState={{ disabled: busy }}
              style={({ pressed }) => [styles.cta, busy && styles.ctaBusy, pressed && styles.pressed]}
            >
              <Text style={styles.ctaText}>{busy ? t('signIn.syncing') : t('signIn.sync')}</Text>
            </Pressable>

            <Pressable
              onPress={leave}
              accessibilityRole="button"
              hitSlop={theme.hit.slop}
              style={({ pressed }) => [styles.guest, pressed && styles.pressed]}
            >
              <Text style={styles.guestText}>{t('signIn.backToCases')}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setNotice(null);
                void signOut();
              }}
              disabled={busy}
              accessibilityRole="button"
              hitSlop={theme.hit.slop}
              style={styles.quiet}
            >
              <Text style={styles.quietText}>{t('signIn.signOut')}</Text>
            </Pressable>

            <Text style={styles.microcopy}>{t('signIn.signOutNote')}</Text>
          </>
        ) : null}

        {status.kind === 'signedOut' ? (
          <>
            <Text style={styles.title}>{t('signIn.heading')}</Text>
            {/* One reason, stated once. Anything more reads as a pitch for
                something the player does not need in order to play. */}
            <Text style={styles.reason}>{t('signIn.why')}</Text>

            <View style={styles.toggle} accessibilityRole="tablist">
              {(['signIn', 'signUp'] as const).map((option) => {
                const selected = mode === option;
                return (
                  <Pressable
                    key={option}
                    onPress={() => {
                      setMode(option);
                      setProblem(null);
                      setFormError(null);
                    }}
                    accessibilityRole="tab"
                    accessibilityState={{ selected }}
                    style={({ pressed }) => [
                      styles.toggleOption,
                      selected && styles.toggleOptionOn,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={[styles.toggleText, selected && styles.toggleTextOn]}>
                      {option === 'signIn' ? t('signIn.title') : t('signIn.createAccount')}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Field
              label={t('signIn.email')}
              inputRef={emailRef}
              value={email}
              onChangeText={(next) => {
                setEmail(next);
                if (problem?.field === 'email') setProblem(null);
              }}
              problem={problem?.field === 'email' ? problem.message : null}
              focused={focused === 'email'}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              editable={!busy}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <Field
              label={t('signIn.password')}
              inputRef={passwordRef}
              value={password}
              onChangeText={(next) => {
                setPassword(next);
                if (problem?.field === 'password') setProblem(null);
              }}
              problem={problem?.field === 'password' ? problem.message : null}
              focused={focused === 'password'}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              editable={!busy}
              secureTextEntry
              textContentType={mode === 'signUp' ? 'newPassword' : 'password'}
              autoComplete={mode === 'signUp' ? 'new-password' : 'current-password'}
              returnKeyType="go"
              onSubmitEditing={() => void submit()}
            />

            {formError ? (
              <View
                style={styles.problemBlock}
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
              >
                <Text style={styles.problemText}>{render(formError, t)}</Text>
              </View>
            ) : null}

            {notice ? (
              <View style={styles.noticeBlock} accessibilityLiveRegion="polite">
                <Text style={styles.noticeText}>{render(notice, t)}</Text>
              </View>
            ) : null}

            <Pressable
              onPress={() => void submit()}
              disabled={busy}
              accessibilityRole="button"
              accessibilityState={{ disabled: busy }}
              style={({ pressed }) => [styles.cta, busy && styles.ctaBusy, pressed && styles.pressed]}
            >
              <Text style={styles.ctaText}>
                {busy
                  ? t('common.working')
                  : mode === 'signIn'
                    ? t('signIn.title')
                    : t('signIn.createAccount')}
              </Text>
            </Pressable>

            {leaveButton}

            <Text style={styles.microcopy}>{t('signIn.storesNote')}</Text>
          </>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * A labelled input.
 *
 * The label is a real visible one rather than a placeholder: placeholder-only
 * fields lose their label the moment typing starts, which is precisely when
 * someone glancing back needs it. The error sits directly under its own field
 * for the same reason.
 */
function Field({
  label,
  inputRef,
  problem,
  focused,
  ...input
}: {
  label: string;
  inputRef: React.RefObject<TextInput | null>;
  problem: string | null;
  focused: boolean;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={inputRef}
        accessibilityLabel={label}
        placeholderTextColor={theme.color.textDim}
        // Autocapitalising an email address is the single most common cause of
        // a login that "should work" — iOS capitalises the first letter and the
        // address no longer matches what was registered.
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, focused && styles.inputFocused, problem !== null && styles.inputBad]}
        {...input}
      />
      {problem !== null ? (
        <Text style={styles.fieldError} accessibilityRole="alert" accessibilityLiveRegion="polite">
          {problem}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  /* Top-aligned, not centred: centring pushes the guest control off a small
     screen the moment the keyboard opens, and that control has to stay visible. */
  content: { padding: theme.space.lg, gap: theme.space.md, flexGrow: 1 },
  centred: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  title: { ...theme.type.title, color: theme.color.text },
  reason: { ...theme.type.body, color: theme.color.textDim, marginBottom: theme.space.sm },

  toggle: {
    flexDirection: 'row',
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: 3,
    gap: 3,
  },
  toggleOption: {
    flex: 1,
    minHeight: theme.hit.min,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.chip - 3,
  },
  toggleOptionOn: { backgroundColor: theme.color.bubbleThem },
  toggleText: { ...theme.type.body, color: theme.color.textDim },
  toggleTextOn: { color: theme.color.text, fontWeight: '600' },

  field: { gap: theme.space.xs },
  label: { ...theme.type.sender, color: theme.color.textDim },
  input: {
    ...theme.type.body,
    color: theme.color.text,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.rule,
    paddingHorizontal: theme.space.md,
    minHeight: theme.hit.min + 4,
  },
  /* React Native draws no focus ring of its own, so the focused field has to
     say so itself — otherwise a keyboard or switch-control user cannot tell
     where their typing is going. */
  inputFocused: { borderColor: theme.color.proof },
  /* `danger` is the non-text token; it is a border here, never the message. */
  inputBad: { borderColor: theme.color.danger },
  fieldError: { ...theme.type.meta, color: theme.color.dangerText },

  problemBlock: {
    backgroundColor: theme.color.surface,
    borderLeftWidth: 2,
    borderLeftColor: theme.color.danger,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  problemText: { ...theme.type.body, color: theme.color.dangerText },

  noticeBlock: {
    backgroundColor: theme.color.surface,
    borderLeftWidth: 2,
    borderLeftColor: theme.color.accent,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  noticeText: { ...theme.type.body, color: theme.color.text },

  cta: {
    minHeight: theme.hit.min + 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.chip,
    marginTop: theme.space.sm,
  },
  ctaBusy: { opacity: 0.5 },
  ctaText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },

  /* Plain text, full width, real 44pt target. Not a button, because the choice
     it offers is not a lesser one — but not styled to compete with the CTA
     either, because most people opening this screen came here to sign in. */
  guest: { minHeight: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
  guestText: { ...theme.type.body, color: theme.color.text, textDecorationLine: 'underline' },

  quiet: { minHeight: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
  quietText: { ...theme.type.body, color: theme.color.textDim },

  microcopy: {
    ...theme.type.meta,
    color: theme.color.textDim,
    textAlign: 'center',
    marginTop: theme.space.xs,
  },

  pressed: { opacity: 0.7 },
});
