import { Children, type ReactNode } from 'react';
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
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {rows.map((row, i) => (
          <View key={i} style={i > 0 ? styles.divided : undefined}>
            {row}
          </View>
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
  section: { gap: theme.space.sm },
  /** Mono and dim: the same "transcribed record" voice the evidence board uses. */
  sectionTitle: {
    ...theme.type.claim,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: theme.color.textDim,
    paddingHorizontal: theme.space.md,
  },
  card: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.rule,
    overflow: 'hidden',
  },
  /** Inset from the left so the rule starts under the label, not under the card edge. */
  divided: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.rule,
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
  value: { ...theme.type.body, color: theme.color.textDim },

  expanded: {
    paddingHorizontal: theme.space.md,
    paddingBottom: theme.space.md,
    gap: theme.space.sm,
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
