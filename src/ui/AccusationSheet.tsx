import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { theme } from './theme';
import { useTranslator } from '@/i18n/useTranslator';
import type { Character, Motive } from '@/engine';

interface Props {
  /** The person being accused. Null closes the sheet. */
  readonly person: Character | null;
  /** Proven contradictions naming them. */
  readonly proofCount: number;
  /** Their established motives — the other half of what the player is staking. */
  readonly motives: readonly Motive[];
  readonly reduceMotion: boolean;
  readonly onConfirm: () => void;
  readonly onDismiss: () => void;
}

/**
 * The commit moment, in the game's own hands.
 *
 * This was `Alert.alert`. The single most dramatic decision in the product —
 * naming a killer — was drawn by the operating system in its own chrome, on a
 * screen whose entire premise is that you are holding a real phone. Every other
 * surface in the app is built; this one was borrowed, and it announced itself
 * as a game the moment it appeared.
 *
 * It also could not show the one thing that matters. The thesis is *proof, not
 * intuition*, so the sheet leads with what the player actually has on this
 * person. When that is nothing, it says so before they commit — the refusal
 * arriving early enough to teach instead of punish. Wise's "Close this group"
 * is the structure: who, then the substance, then two unambiguous choices.
 *
 * The copy stays non-threatening on purpose. Naming the wrong person returns a
 * refusal and drops straight back here with every proof intact; copy that
 * threatens a consequence the game does not impose teaches people to stop
 * playing.
 */
export function AccusationSheet({
  person,
  proofCount,
  motives,
  reduceMotion,
  onConfirm,
  onDismiss,
}: Props) {
  const t = useTranslator();
  if (!person) return null;

  return (
    <Modal
      visible
      transparent
      // `slide` is the platform's own sheet motion — free, and the one users
      // already know. Reduced motion gets no transition rather than a different one.
      animationType={reduceMotion ? 'none' : 'slide'}
      // Android's hardware back. Without it this sheet is a trap on that platform.
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.scrim} onPress={onDismiss} accessibilityElementsHidden />
      <View style={styles.sheet}>
        <View style={styles.grabber} />

        <ScrollView contentContainerStyle={styles.body} bounces={false}>
          <View style={styles.head}>
            <View style={[styles.avatar, { backgroundColor: person.avatarColor }]}>
              <Text style={styles.initial}>{person.name.slice(0, 1)}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {t('accuse.sheet.title', { name: person.name })}
            </Text>
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.section}>{t('accuse.sheet.have')}</Text>
            <View style={styles.sectionRule} />
          </View>

          {proofCount === 0 && motives.length === 0 ? (
            /* The thesis, delivered before the tap rather than after it. */
            <Text style={styles.nothing}>{t('accuse.sheet.none')}</Text>
          ) : (
            <View style={styles.evidence}>
              {proofCount > 0 ? (
                <View style={styles.proofRow}>
                  <View style={styles.marks}>
                    {Array.from({ length: proofCount }).map((_, i) => (
                      <View key={i} style={styles.mark} />
                    ))}
                  </View>
                  <Text style={styles.proofText}>
                    {proofCount === 1
                      ? t('accuse.sheet.proofOne')
                      : t('accuse.sheet.proof', { n: proofCount })}
                  </Text>
                </View>
              ) : null}
              {motives.map((m) => (
                <View key={m.id} style={styles.motiveRow}>
                  <View style={styles.motiveMark} />
                  <Text style={styles.motive}>{m.summary}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.reassure}>{t('accuse.sheet.reassure')}</Text>
        </ScrollView>

        <View style={styles.actions}>
          <Pressable
            onPress={onConfirm}
            accessibilityRole="button"
            accessibilityLabel={t('accuse.sheet.title', { name: person.name })}
            style={({ pressed }) => [styles.confirm, pressed && styles.pressed]}
          >
            <Text style={styles.confirmText}>{t('accuse.sheet.confirm')}</Text>
          </Pressable>
          <Pressable
            onPress={onDismiss}
            accessibilityRole="button"
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}
          >
            <Text style={styles.backText}>{t('common.back')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    marginTop: 'auto',
    backgroundColor: theme.color.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: theme.space.xl,
    maxHeight: '86%',
  },
  grabber: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.color.rule,
    marginTop: theme.space.sm,
  },

  body: { padding: theme.space.lg, gap: theme.space.lg },

  head: { flexDirection: 'row', alignItems: 'center', gap: theme.space.md },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  initial: { ...theme.type.sender, color: theme.color.bg, fontSize: 20 },
  title: { ...theme.type.title, color: theme.color.text, flexShrink: 1 },

  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  section: { ...theme.type.sender, color: theme.color.textDim },
  sectionRule: { flex: 1, height: 1, backgroundColor: theme.color.rule },

  nothing: { ...theme.type.body, color: theme.color.textDim },
  evidence: { gap: theme.space.md },
  proofRow: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  /** The same marks the suspect card draws, so the two read as one measure. */
  marks: { flexDirection: 'row', gap: 3, alignItems: 'center' },
  mark: { width: 3, height: 18, borderRadius: 1.5, backgroundColor: theme.color.danger },
  proofText: { ...theme.type.body, color: theme.color.text, flexShrink: 1 },
  motiveRow: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.space.sm },
  /** Hairline, matching the board's proof mark rather than a coloured side bar. */
  motiveMark: { width: 14, height: 1, backgroundColor: theme.color.accent, marginTop: 10 },
  motive: { ...theme.type.body, color: theme.color.accent, flexShrink: 1 },

  reassure: { ...theme.type.meta, color: theme.color.textDim },

  actions: { paddingHorizontal: theme.space.lg, gap: theme.space.sm },
  confirm: {
    minHeight: theme.hit.min,
    justifyContent: 'center',
    alignItems: 'center',
    // dangerFill, not danger: `danger` is 4.02:1 against this label.
    backgroundColor: theme.color.dangerFill,
    borderRadius: theme.radius.chip,
  },
  confirmText: { ...theme.type.body, color: theme.color.text, fontWeight: '600' },
  back: { minHeight: theme.hit.min, justifyContent: 'center', alignItems: 'center' },
  backText: { ...theme.type.body, color: theme.color.textDim },
  pressed: { opacity: 0.7 },
});
