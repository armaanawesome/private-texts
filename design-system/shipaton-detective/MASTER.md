# Shipaton Detective — Design System (MASTER)

Hand-authored 2026-08-09. The `ui-ux-pro-max --design-system` generator was run first and
its output was **rejected**: it returned a scroll-triggered landing-page pattern, a white
background for an explicitly dark brief, and Orbitron as the display face. Its
`--stack react-native` and `--domain ux` rules *were* kept and appear below.

---

## 1. The thesis

**This app's aesthetic goal is invisibility.**

The player is reading a dead person's group chat. The moment the UI announces itself as a
game — a display font, a HUD, a menu chrome — the fiction dies and the player is looking at
an app instead of evidence. Every pixel in the chat surface should be indistinguishable
from a real messaging client.

The game gets exactly one place to have its own visual identity: **the evidence board.**
That contrast is the design. Chat is mundane; the board is where the player's mind works.

**Consequences that follow, non-negotiable:**
- **No display typeface anywhere in the chat surface.** System UI font only.
- No custom chrome, no game-styled buttons, no glow, no neon in threads.
- The board may be expressive: it is diegetically the player's own workspace.

---

## 2. Type

Use the **platform system font** (`System` on iOS → SF Pro, Roboto on Android). This is the
single highest-leverage decision in the whole design: it is what real messaging apps use, so
it is what makes the illusion hold. A custom font is instantly legible as "a game".

| Role | Size / line-height | Weight |
|---|---|---|
| Message body | 16 / 22 | 400 |
| Sender name | 13 / 18 | 600 |
| Timestamp, meta | 12 / 16 | 400 |
| Claim label | 14 / 20 | 500 |
| Screen title | 22 / 28 | 600 |

Body text never below 16px — messages are the entire product.

**One exception:** claim labels and the evidence board may use the platform monospace face
(`ui-monospace`). Monospace reads as *transcribed record* rather than *conversation*, which
is exactly the shift the board represents.

---

## 3. Color

Dark-only. This is a game played at night, and a light theme would fight the mood for no gain.

| Token | Hex | Contrast on `bg` | Use |
|---|---|---|---|
| `bg` | `#0E1013` | — | App background |
| `surface` | `#191C21` | — | Sheets, cards, board |
| `bubbleThem` | `#22262D` | — | Incoming bubble |
| `bubbleYou` | `#2F6F4E` | — | Outgoing bubble |
| `text` | `#E8EAED` | 15.8:1 | Primary text |
| `textDim` | `#9AA0A6` | 7.1:1 | Timestamps, meta |
| `accent` | `#E4B363` | 9.6:1 | Highlight, confirmed proof |
| `proof` | `#4E8CF0` | 5.5:1 | Claim markers, pins |
| `danger` | `#C4483C` | **3.1:1** | **Non-text only** — lines, borders, fills |
| `dangerText` | `#F2695C` | 5.9:1 | Any danger-colored **text** |

**The `danger` / `dangerText` split is deliberate.** `#C4483C` reads well as the contradiction
connector line but fails WCAG AA for text at 3.1:1. Using one token for both would have
shipped unreadable failure copy on the exact screen where the player most needs to understand
what went wrong. Never put `danger` on text.

---

## 4. Motion

Motion here is not decoration — it is the mechanism. Typing rhythm conveys character;
the compare animation conveys causation.

- **Duration 150–300ms** for UI transitions. The compare-line draw is the one licensed
  exception at ~400ms, because the player must be able to follow it.
- **Ease-out entering, ease-in exiting.** Never linear.
- **Typing indicator duration must be proportional to the incoming message's length** —
  `min(1800, 300 + body.length * 18)` ms. Uniform delays read as machinery; variable ones
  read as a person, and that is the whole trick.
- **Respect reduced motion.** Check `AccessibilityInfo.isReduceMotionEnabled()` and collapse
  playback to instant. A player who needs this must still be able to finish the case.
- **Tap-to-skip is mandatory** on message playback. Without it the game is unplayable on a
  replay and impossible to film for the demo video.
- Animate `transform` and `opacity` only — these run on the UI thread via Reanimated
  worklets. Never animate layout properties during playback.

---

## 5. React Native rules (kept from `--stack react-native`)

- **`Pressable`, never `TouchableOpacity`** for new code.
- **Every press needs visible feedback** — opacity change or `android_ripple`.
- **`hitSlop` on every small target.** Claim chips and pin slots are visually compact
  but must be comfortably tappable.
- Minimum touch target **44×44**, with **8px+** spacing between adjacent targets.
- **`accessibilityLabel` on every icon-only control.** A pin button with no label is
  invisible to a screen reader.
- Respect **safe areas** on both platforms via `react-native-safe-area-context`.
- **No emoji as icons.** Use a real icon set.

---

## 6. Anti-patterns for this project specifically

| Never | Why |
|---|---|
| A display/gaming font in chat | Destroys the "this is a real phone" illusion |
| Light theme | Fights the mood; adds a whole second palette to maintain |
| `danger` on text | 3.1:1, fails WCAG AA |
| Uniform typing delays | Reads as machinery, not a person |
| Blocking playback with no skip | Unplayable on replay, unfilmable for the demo |
| Animating width/height | Drops frames; use transform |
| Game chrome around the chat | Same reason as the font |
