import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '@/ui/theme';
import { useTranslator } from '@/i18n/useTranslator';
import { render, type Message } from '@/i18n/message';
import { EyeGlyph } from '@/ui/EyeGlyph';
import { useAuth, checkPassword, MIN_PASSWORD_LENGTH, RULE_MESSAGE_KEY } from '@/auth';

/**
 * Finish a password reset with the code from the email.
 *
 * ## Why a code and not the emailed link
 *
 * Supabase does **not** host an update-password page. Its recovery link runs
 * `/auth/v1/verify` and then redirects to the project's Site URL carrying the
 * tokens in the fragment — so the page at that URL has to do the work, and this
 * project has no website. A Site URL of `http://localhost:3000`, which is the
 * default, sends every reset email to a dead end on a phone.
 *
 * The alternatives were a deep link back into the app or a code typed in. The
 * code wins on what matters here: no custom scheme to register, no redirect
 * allowlist, no URL-fragment parsing, and it can be exercised in a simulator
 * rather than only on a handset. The email template carries `{{ .Token }}`;
 * `docs/REVENUECAT-SETUP.md` §7 has it.
 *
 * `verifyOtp` opens a real session, so the player is signed in when this
 * finishes. Deliberate — they have just proved they own the address, and asking
 * them to sign in again with the password they typed thirty seconds ago is a
 * step that would exist only because the code did not carry a session.
 */
export default function ResetPasswordScreen() {
  const router = useRouter();
  const t = useTranslator();
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const { verifyRecoveryCode, updatePassword, resetPassword } = useAuth();

  const email = emailParam ?? '';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [problem, setProblem] = useState<Message | null>(null);
  const [notice, setNotice] = useState<Message | null>(null);
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState<'code' | 'password' | null>(null);
  const passwordRef = useRef<TextInput>(null);

  const report = checkPassword(password);

  const submit = useCallback(async () => {
    if (busy) return;
    setProblem(null);
    setNotice(null);

    if (code.trim() === '') {
      setProblem({ key: 'reset.needCode' });
      return;
    }
    if (report.firstUnmet !== null) {
      setProblem({ key: RULE_MESSAGE_KEY[report.firstUnmet] });
      passwordRef.current?.focus();
      return;
    }

    setBusy(true);
    /*
     * The code first, then the password. `updateUser` acts on the current
     * session, so without a verified recovery session there is nothing to
     * update — and a wrong code must not be reported as a password problem.
     */
    const verified = await verifyRecoveryCode(email, code);
    if (!verified.ok) {
      setBusy(false);
      setProblem(verified.message);
      return;
    }
    const saved = await updatePassword(password);
    setBusy(false);
    if (!saved.ok) {
      // Most likely the leaked-password check, which the client cannot predict.
      setProblem(saved.message);
      return;
    }
    // Signed in already, so there is nowhere to send them but back into the game.
    router.replace('/');
  }, [busy, code, email, password, report.firstUnmet, verifyRecoveryCode, updatePassword, router]);

  const resend = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setProblem(null);
    const attempt = await resetPassword(email);
    setBusy(false);
    if (attempt.ok) setNotice({ key: 'signIn.reset.sent' });
    else setProblem(attempt.message);
  }, [busy, email, resetPassword]);

  /**
   * Send on arrival, once.
   *
   * The ref is not defensive tidiness: without it React's strict double-invoke
   * in development sends two codes, the second invalidates the first, and the
   * one in the player's inbox is already dead by the time they type it.
   */
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current || email === '') return;
    sent.current = true;
    void resend();
    // `resend` is recreated whenever `busy` changes, so it is deliberately not a
    // dependency — including it would re-run this effect mid-send.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={styles.title}>{t('reset.title')}</Text>
        <Text style={styles.body}>{t('reset.body', { email })}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>{t('reset.code')}</Text>
          <View style={[styles.inputRow, focused === 'code' && styles.inputFocused]}>
            <TextInput
              value={code}
              onChangeText={setCode}
              accessibilityLabel={t('reset.code')}
              editable={!busy}
              // The code is digits, so the number pad is the right keyboard, and
              // one-time-code autofill can lift it straight out of the mail app.
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocused('code')}
              onBlur={() => setFocused(null)}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              style={[styles.input, styles.code]}
              placeholderTextColor={theme.color.textDim}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t('reset.newPassword')}</Text>
          <View style={[styles.inputRow, focused === 'password' && styles.inputFocused]}>
            <TextInput
              ref={passwordRef}
              value={password}
              onChangeText={setPassword}
              accessibilityLabel={t('reset.newPassword')}
              editable={!busy}
              secureTextEntry={!revealed}
              textContentType="newPassword"
              autoComplete="new-password"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              returnKeyType="go"
              onSubmitEditing={() => void submit()}
              style={styles.input}
              placeholderTextColor={theme.color.textDim}
            />
            <Pressable
              onPress={() => setRevealed((on) => !on)}
              accessibilityRole="button"
              accessibilityLabel={t(revealed ? 'signIn.hidePassword' : 'signIn.showPassword')}
              accessibilityState={{ selected: revealed }}
              hitSlop={theme.hit.slop}
              style={({ pressed }) => [styles.reveal, pressed && styles.pressed]}
            >
              {/* Struck when the password is visible: the slash reads as
                  "hide this", which is what tapping it does next. */}
              <EyeGlyph struck={revealed} />
            </Pressable>
          </View>
        </View>

        {/* The same rules the sign-up form draws, from the same function. A
            reset that accepted a weaker password than sign-up would be a hole in
            the policy rather than a convenience. */}
        <View style={styles.rules}>
          <Text style={styles.rulesLabel}>{t('signIn.rulesLabel')}</Text>
          {report.rules.map((rule) => (
            <View key={rule.id} style={styles.ruleRow}>
              <View style={[styles.ruleMark, rule.met && styles.ruleMarkOn]}>
                {rule.met ? <Text style={styles.ruleTick}>✓</Text> : null}
              </View>
              <Text style={[styles.ruleText, rule.met && styles.ruleTextOn]}>
                {t(RULE_MESSAGE_KEY[rule.id], { count: MIN_PASSWORD_LENGTH })}
              </Text>
            </View>
          ))}
        </View>

        {problem ? (
          <View style={styles.problemBlock} accessibilityRole="alert">
            <Text style={styles.problemText}>{render(problem, t)}</Text>
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
          <Text style={styles.ctaText}>{busy ? t('common.working') : t('reset.submit')}</Text>
        </Pressable>

        <Pressable
          onPress={() => void resend()}
          disabled={busy}
          accessibilityRole="button"
          hitSlop={theme.hit.slop}
        >
          <Text style={styles.quiet}>{t('reset.resend')}</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} accessibilityRole="button" hitSlop={theme.hit.slop}>
          <Text style={styles.quiet}>{t('common.back')}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.md, flexGrow: 1 },
  title: { ...theme.type.title, color: theme.color.text },
  body: { ...theme.type.body, color: theme.color.textDim },

  field: { gap: theme.space.xs },
  label: { ...theme.type.sender, color: theme.color.textDim },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.rule,
    paddingRight: theme.space.xs,
  },
  input: {
    ...theme.type.body,
    flex: 1,
    color: theme.color.text,
    paddingHorizontal: theme.space.md,
    minHeight: theme.hit.min + 4,
  },
  /** Monospaced and spaced out, so eight digits can be checked at a glance. */
  code: { fontFamily: theme.font.mono, letterSpacing: 4 },
  inputFocused: { borderColor: theme.color.proof },

  reveal: {
    width: theme.hit.min,
    minHeight: theme.hit.min,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rules: { gap: theme.space.xs },
  rulesLabel: { ...theme.type.meta, color: theme.color.textDim },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  ruleMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.rule,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleMarkOn: { borderColor: theme.color.solved, backgroundColor: theme.color.solved },
  ruleTick: { fontSize: 10, lineHeight: 14, color: theme.color.bg, fontWeight: '700' },
  ruleText: { ...theme.type.meta, color: theme.color.textDim },
  ruleTextOn: { color: theme.color.text },

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
  ctaText: { ...theme.type.body, color: theme.color.bg, fontWeight: '700' },
  quiet: {
    ...theme.type.meta,
    color: theme.color.textDim,
    textAlign: 'center',
    paddingVertical: theme.space.sm,
  },
  pressed: { opacity: 0.7 },
});
