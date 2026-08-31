import { Children, Fragment, type ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, Platform } from 'react-native';
import { theme } from '@/ui/theme';

/**
 * The grouped-list primitives the settings screens are built from.
 *
 * This app has no icon library and no SVG renderer — adding either means a
 * native rebuild — so the two glyphs a settings list cannot do without, the
 * disclosure chevron and the selected tick, are drawn as a single bordered View
 * rotated 45°. That is not a workaround for its own sake: it keeps them on the
 * same hairline weight as the rules and ticks everywhere else in the game, which
 * an imported icon set would not have matched.
 */

/* ---------------------------------------------------------------- glyphs -- */

export function Chevron({ expanded = false }: { expanded?: boolean }) {
  return <View style={[styles.chevron, expanded && styles.chevronExpanded]} />;
}

export function Tick() {
  return <View style={styles.tick} />;
}

/**
 * The settings mark, for the header where the word "Settings" used to sit.
 *
 * Sliders rather than a gear, for two reasons. A gear cannot be drawn from Views
 * at any quality — it needs a real vector path, and `@expo/vector-icons` is not
 * installed here; adding an icon font to draw one glyph is the kind of
 * dependency this repo declines. And sliders are already this app's own
 * language: the volume control on the settings screen is exactly this shape, so
 * the button and the thing it opens are drawn from the same idea.
 *
 * Three rails with their knobs at different positions, on the same hairline
 * weight as the chevron and the tick above.
 */
export function SettingsGlyph() {
  return (
    <View style={styles.glyph}>
      {[0.62, 0.3, 0.78].map((at, i) => (
        <View key={i} style={styles.glyphRow}>
          <View style={styles.glyphRail} />
          <View style={[styles.glyphKnob, { left: `${at * 100}%` }]} />
        </View>
      ))}
    </View>
  );
}

/* --------------------------------------------------------------- section -- */

/**
 * A titled group of rows.
 *
 * Separators are inserted between children rather than drawn by each row, so a
 * row never has to know whether it is last — the case that leaves a stray
 * hairline above the bottom edge of the card.
 */
export function Section({
  title,
  footnote,
  children,
}: {
  title: string;
  footnote?: string;
  children: ReactNode;
}) {
  const rows = Children.toArray(children).filter(Boolean);

  return (
    <View style={styles.section}>
      {/*
        A stamped kicker with a rule running off it, NOT a label above a card.

        The bordered card was the whole reason this screen read as iOS Settings:
        a rounded, hairline-bordered container holding divided rows IS that
        control, and no amount of recolouring changes what it is. Nine reference
        settings screens were pulled for this and they split two ways — cards
        (Grok, Posh, Phantom) and ruled groups (Tesla, Disney+) — so the card is
        a convention rather than a requirement, and this app has a better answer
        of its own.

        The rule is lifted from `SectionHead` on the evidence board, which is
        where this game already says "a section of a record". Settings now speaks
        the same language as the board and the closing screen rather than the
        language of the operating system.
      */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionRule} />
      </View>
      <View>
        {rows.map((row, i) => (
          <Fragment key={i}>
            {/*
              A separator element, not a border on a wrapper.

              The wrapper carried `marginLeft` to inset the rule, which also
              inset everything inside it — so every row after the first sat
              further right than the one above. The bordered card used to hide
              that; without the card it is plainly visible as a ragged left
              edge. Insetting a rule of its own moves the rule and nothing else.
            */}
            {i > 0 ? <View style={styles.divider} /> : null}
            {row}
          </Fragment>
        ))}
      </View>
      {footnote === undefined ? null : <Text style={styles.footnote}>{footnote}</Text>}
    </View>
  );
}

/* ------------------------------------------------------------------ rows -- */

/**
 * Label, one line of explanation, and a switch.
 *
 * The row itself is deliberately not pressable. A tappable row wrapping a
 * tappable switch is two overlapping targets, and the outer one steals presses
 * meant for the inner one near its edges.
 */
export function ToggleRow({
  label,
  detail,
  value,
  onValueChange,
  disabled = false,
}: {
  label: string;
  detail: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityLabel={label}
        accessibilityHint={detail}
        trackColor={{ false: theme.color.rail, true: theme.color.accent }}
        // Android draws its own thumb colour and ignores the iOS default, so the
        // knob would sit near-white on an amber track without this.
        thumbColor={
          Platform.OS === 'android' ? (value ? theme.color.bg : theme.color.textDim) : undefined
        }
        ios_backgroundColor={theme.color.rail}
      />
    </View>
  );
}

/** Label on the left, current value and a chevron on the right. Opens another screen. */
export function DisclosureRow({
  label,
  value,
  onPress,
  accessibilityHint,
}: {
  label: string;
  value: string;
  onPress: () => void;
  accessibilityHint?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${value}`}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Text style={[styles.label, styles.grow]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Chevron />
    </Pressable>
  );
}

/**
 * A row that reads as a fact, not a control.
 *
 * No chevron and no press target, because there is nowhere for it to go — the
 * version number is the whole content.
 */
export function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}, ${value}`}>
      <Text style={[styles.label, styles.grow]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

/** A row that does something in place. Destructive rows are the only red text here. */
export function ActionRow({
  label,
  detail,
  onPress,
  destructive = false,
  disabled = false,
  busy = false,
}: {
  label: string;
  detail?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || busy}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={detail}
      accessibilityState={{ disabled: disabled || busy, busy }}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.rowText}>
        <Text
          style={[
            styles.label,
            // dangerText, never danger: #C4483C is 3.1:1 and fails AA for text.
            destructive && styles.labelDestructive,
            (disabled || busy) && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
        {detail === undefined ? null : <Text style={styles.detail}>{detail}</Text>}
      </View>
    </Pressable>
  );
}

/** A row that opens and closes a block of text below it, inside the same card. */
export function ExpandableRow({
  label,
  expanded,
  onPress,
  children,
}: {
  label: string;
  expanded: boolean;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded }}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <Text style={[styles.label, styles.grow]}>{label}</Text>
        <Chevron expanded={expanded} />
      </Pressable>
      {expanded ? <View style={styles.expanded}>{children}</View> : null}
    </View>
  );
}

/** A row whose right-hand side is a control of its own, like the volume rail. */
export function CustomRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.customRow}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  /**
   * No bottom margin. Both settings screens already put `gap: theme.space.xl`
   * between sections, and adding to it here stacked two spacings into a gulf
   * wide enough that the groups stopped reading as one screen.
   */
  section: { gap: theme.space.sm },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.sm,
    paddingHorizontal: theme.space.md,
  },
  /** Mono and dim: the same "transcribed record" voice the evidence board uses. */
  sectionTitle: {
    ...theme.type.claim,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: theme.color.textDim,
  },
  /** Runs off the kicker to the right margin. The board's SectionHead, exactly. */
  sectionRule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: theme.color.rule },
  /** Inset from the left so the rule starts under the label, not at the screen edge. */
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.color.rule,
    marginLeft: theme.space.md,
  },
  footnote: {
    ...theme.type.meta,
    color: theme.color.textDim,
    paddingHorizontal: theme.space.md,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    minHeight: theme.hit.min,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
  },
  customRow: {
    gap: theme.space.sm,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.md,
  },
  rowDisabled: { opacity: 0.45 },
  rowText: { flex: 1, gap: 2 },
  grow: { flex: 1 },
  /** Opacity only — a pressed state that changed size would shift the rows below it. */
  pressed: { opacity: 0.6 },

  label: { ...theme.type.body, color: theme.color.text },
  labelDestructive: { color: theme.color.dangerText },
  labelDisabled: { color: theme.color.textDim },
  detail: { ...theme.type.meta, color: theme.color.textDim },
  /**
   * Mono, where the label beside it is not.
   *
   * The right-hand value is a stored fact — a language, a version, a count — and
   * the mono face is this app's voice for exactly that everywhere else it
   * appears. It also does the work the vanished card border used to do: it makes
   * the two halves of a row read as different kinds of thing at a glance,
   * without a box around them.
   */
  value: { ...theme.type.claim, color: theme.color.accent },

  expanded: {
    paddingHorizontal: theme.space.md,
    paddingBottom: theme.space.md,
    gap: theme.space.sm,
  },

  /** 22pt: an optical match for the header word it replaces, inside a 44pt target. */
  glyph: { width: 22, height: 16, justifyContent: 'space-between' },
  glyphRow: { height: 2, justifyContent: 'center' },
  glyphRail: { height: StyleSheet.hairlineWidth, backgroundColor: theme.color.accent },
  glyphKnob: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: -2,
    backgroundColor: theme.color.accent,
  },

  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: theme.color.textDim,
    transform: [{ rotate: '45deg' }],
  },
  /** Points down when open. Same glyph, so nothing about its weight changes. */
  chevronExpanded: { transform: [{ rotate: '135deg' }], marginBottom: 4 },

  tick: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.color.accent,
    transform: [{ rotate: '-45deg' }],
    marginBottom: 4,
  },
});
