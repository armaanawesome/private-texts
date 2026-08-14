import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import { theme } from './theme';
import { useTranslator } from '@/i18n/useTranslator';
import { CasePoster } from './CasePoster';
import { describeElapsed, type ResumeOffer } from '@/state/resume';
import type { CaseScript } from '@/engine';

const PLAYER_ID = 'you';
const POSTER_WIDTH = 56;

interface Props {
  offer: ResumeOffer;
  script: CaseScript;
  /** Passed in rather than read from the clock, so the elapsed line is testable and stable per render. */
  now: number;
}

/**
 * Continue, as a conversation rather than a button.
 *
 * The card leads with the name of the person the player was talking to and how
 * many messages are still waiting, because that is the thing worth returning
 * to. "Continue" as a bare label tells a player who put the game down three
 * days ago nothing about what they were in the middle of — the whole reason to
 * tap is that Mairi Bell is still mid-sentence.
 *
 * It borrows the inbox row's grammar deliberately (name, preview line, unread
 * count) so the affordance reads as the conversation itself surfacing on the
 * home screen, not as game chrome wrapped around a save slot.
 */
export function ContinueCard({ offer, script, now }: Props) {
  const reduceMotion = useReducedMotion();
  const t = useTranslator();

  const thread = offer.threadId ? script.threads.find((t) => t.id === offer.threadId) : undefined;
  const heading = thread?.title ?? script.title;

  const last = offer.lastMessageId
    ? thread?.messages.find((m) => m.id === offer.lastMessageId)
    : undefined;
  const sender = last ? script.characters.find((c) => c.id === last.senderId) : undefined;
  // Only the player's own seat is translated. Every other name is a character
  // in the case, and those are the other agent's to translate, in content/cases.
  const speaker = last?.senderId === PLAYER_ID ? t('common.you') : sender?.name;
  const preview = last ? `${speaker ? `${speaker}: ` : ''}${last.body}` : script.blurb;

  // describeElapsed returns a key, not a sentence, so the gap is translated by
  // the same catalogue as the line it sits inside. It used to return English
  // prose, which made this card read "3 de 4 probadas. Última partida 2 hours
  // ago." — the surrounding sentence translated, the number not.
  const since = describeElapsed(now, offer.updatedAt);
  const elapsed = t(since.key, since.params);
  // The case name is already the heading when there is no conversation to name.
  const meta = thread ? `${script.title} · ${elapsed}` : elapsed;

  /**
   * Built from whole sentences, not from stitched fragments. Each key carries
   * its own full stop so a translator can move the count inside the sentence
   * where the grammar needs it, rather than being handed a noun to append to.
   */
  const unread =
    offer.unreadInThread === 0
      ? ''
      : `${
          offer.unreadInThread === 1
            ? t('home.continue.unreadOne')
            : t('home.continue.unreadMany', { count: offer.unreadInThread })
        }. `;

  const label =
    `${t('home.continue.label', { title: script.title })} ` +
    (thread ? `${t('home.continue.backTo', { thread: thread.title })} ` : '') +
    unread +
    t('home.continue.proved', {
      proved: offer.provedCount,
      total: offer.totalCount,
      elapsed,
    });

  return (
    <Animated.View entering={reduceMotion ? undefined : FadeIn.duration(theme.motion.base)}>
      <Link
        href={{
          pathname: '/case/[caseId]/threads',
          // `resume` is not a route segment, so it arrives as a query param the
          // inbox reads once and hands off. Passing it as a param rather than
          // building the URL by hand keeps the encoding the router's problem.
          params: offer.threadId
            ? { caseId: offer.caseId, resume: offer.threadId }
            : { caseId: offer.caseId },
        }}
        asChild
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={label}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        >
          <View style={styles.row}>
            <View style={styles.poster}>
              <CasePoster script={script} locked={false} />
            </View>

            <View style={styles.body}>
              <View style={styles.line}>
                <Text style={styles.heading} numberOfLines={1}>
                  {heading}
                </Text>
                {offer.unreadInThread > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{offer.unreadInThread}</Text>
                  </View>
                ) : null}
              </View>

              <Text style={styles.preview} numberOfLines={2}>
                {preview}
              </Text>

              <View style={styles.metaRow}>
                {/* The same one-mark-per-contradiction bar the tiles draw, but
                    filled as the player proves them. */}
                <View style={styles.marks}>
                  {Array.from({ length: offer.totalCount }).map((_, i) => (
                    <View
                      key={i}
                      style={[styles.mark, i < offer.provedCount ? styles.markProved : styles.markOpen]}
                    />
                  ))}
                </View>
                <Text style={styles.meta} numberOfLines={1}>
                  {meta}
                </Text>
              </View>
            </View>
          </View>

          {/* Visual only: the whole card is the control, and a second focusable
              node inside it would make a screen reader announce the action twice. */}
          <View
            style={styles.cta}
            pointerEvents="none"
            importantForAccessibility="no-hide-descendants"
          >
            <Text style={styles.ctaText}>{t('home.continue.title')}</Text>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  /**
   * The only filled surface on the home screen. The case tiles are transparent
   * frames on the background, so a single `surface` panel is enough to make
   * this unmistakably the first thing on the page without inflating the type.
   */
  card: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.rule,
    padding: theme.space.md,
    gap: theme.space.md,
  },
  pressed: { opacity: 0.7 },

  row: { flexDirection: 'row', gap: theme.space.md },
  poster: { width: POSTER_WIDTH },

  body: { flex: 1, gap: theme.space.xs },
  line: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  heading: { ...theme.type.title, color: theme.color.text, flexShrink: 1 },
  preview: { ...theme.type.meta, color: theme.color.textDim },

  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.proof,
  },
  badgeText: { ...theme.type.meta, color: theme.color.bg, fontWeight: '600', fontSize: 11 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm, marginTop: 2 },
  marks: { flexDirection: 'row', gap: 3 },
  mark: { width: 2, height: 12, borderRadius: 1 },
  markProved: { backgroundColor: theme.color.accent },
  markOpen: { backgroundColor: theme.color.rail },
  meta: { ...theme.type.meta, color: theme.color.textDim, fontSize: 11, flexShrink: 1 },

  cta: {
    minHeight: theme.hit.min,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.chip,
  },
  ctaText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },
});
