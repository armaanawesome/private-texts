import { Platform } from 'react-native';

/**
 * Design tokens. See design-system/shipaton-detective/MASTER.md for the reasoning.
 *
 * The governing rule: the chat surface must be indistinguishable from a real
 * messaging app, or the fiction collapses. That is why the type scale uses the
 * platform system font rather than anything custom.
 */

/** Platform system UI font — SF Pro on iOS, Roboto on Android. */
const systemFont = Platform.select({ ios: 'System', default: 'sans-serif' });

/** Reads as "transcribed record" rather than "conversation". Board and claims only. */
const monoFont = Platform.select({ ios: 'Menlo', default: 'monospace' });

export const theme = {
  color: {
    bg: '#0E1013',
    surface: '#191C21',
    bubbleThem: '#22262D',
    bubbleYou: '#2F6F4E',
    text: '#E8EAED',
    textDim: '#9AA0A6',
    accent: '#E4B363',
    proof: '#4E8CF0',

    /**
     * NON-TEXT ONLY. 3.1:1 on bg — fails WCAG AA for text.
     * Use for the contradiction connector line, borders, and fills.
     */
    danger: '#C4483C',
    /** Any danger-coloured text. 5.9:1 on bg. */
    dangerText: '#F2695C',
    /**
     * The ONLY danger red you may put type on: a filled destructive button.
     *
     * `danger` is 4.02:1 against `text`, so the accusation sheet's confirm
     * button failed AA the moment it was drawn — the same trap the `danger`
     * note above exists to warn about, sprung by a filled button rather than a
     * label. This is that hue darkened until `text` clears at 5.55:1. Fill
     * only; for danger-coloured type on a dark ground use `dangerText`.
     */
    dangerFill: '#A03A2F',

    /*
     * Structural neutrals for the comparison sheet. Three additions, each with
     * one job — they carry the forensic-timeline surface and nothing else.
     */

    /**
     * A case the player has finished. 6.4:1 on bg, so it carries text as well
     * as the tick fill — the same green family as the player's own bubble
     * (#2F6F4E) lifted until it is legible, rather than a new hue. The grid
     * should not gain a colour just to say "done".
     */
    solved: '#5FBF87',

    /** Hairline separators: the time axis, section rules. Never a fill. */
    rule: '#2A2F36',
    /** The unfilled track a claim bar is drawn along. Reads as "clock not covered". */
    rail: '#23272E',
    /**
     * The stretch of clock two statements both cover. NON-TEXT ONLY — it sits
     * under bars and is bounded by `danger` hairlines, so it must stay quiet
     * enough that the bars still read through it.
     */
    dangerWash: 'rgba(196,72,60,0.20)',
  },

  space: { xs: 4, sm: 8, md: 12, lg: 20, xl: 32 },
  radius: { bubble: 18, chip: 10 },

  font: { system: systemFont, mono: monoFont },

  type: {
    body: { fontSize: 16, lineHeight: 22, fontFamily: systemFont },
    sender: { fontSize: 13, lineHeight: 18, fontWeight: '600' as const, fontFamily: systemFont },
    meta: { fontSize: 12, lineHeight: 16, fontFamily: systemFont },
    claim: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const, fontFamily: monoFont },
    title: { fontSize: 22, lineHeight: 28, fontWeight: '600' as const, fontFamily: systemFont },
  },

  motion: {
    /** UI transitions. Ease-out entering, ease-in exiting — never linear. */
    fast: 150,
    base: 220,
    /** The compare-line draw. Longer on purpose: the player must follow it. */
    compare: 400,
    /**
     * Typing time for an incoming message. Proportional to length, because
     * uniform delays read as machinery and variable ones read as a person.
     */
    typingFor: (body: string) => Math.min(1800, 300 + body.length * 18),
  },

  /** Minimum tap target per platform HIG / Material. */
  hit: { min: 44, slop: { top: 10, bottom: 10, left: 10, right: 10 } },
} as const;
