# Cover art still owed — two regenerations, blocked on quota

Both covers below **shipped** and are live in `assets/cases/`. Neither is broken;
both miss their own brief in a way worth one more call each. Written 2026-09-03,
when Canva returned `quota limit` and the Gamma image MCP returned
`402 Insufficient credits` within a minute of each other.

Paste the prompt, take the four candidates, let the owner pick by number, then
`get-export-formats` → `export-design` with `{"type": "png"}` **and nothing else**
(passing `width`, `height` or `lossless` fails with "Not allowed to access
design"), then overwrite `assets/cases/<caseId>.png`. The `require` lines in
`src/ui/caseArtAssets.ts` already exist — this replaces files, it does not add
map entries.

One `generate-design` call returns **four** candidates. Brief for four.

---

## sunday-service

**Why it is being redone:** the case's whole lie is a roof that was not there —
*"The register says there was a wedding that August. The man who reroofed the
church says there was no roof on it."* The shipped cover has a roof and a spire,
so the one object the story removes is present.

**The trap:** "a church with no roof" gets normalised straight back into a
church. Brief a **ruin**, which is a shape the model already holds, and describe
the sky pouring in as a positive feature rather than the roof as an absence.

```text
A fine-art poster illustration for a murder-mystery case called "Sunday Service".
House style: one ordinary object with something taken out of it, as a flat gouache
screenprint with heavy paper grain.

Subject: a small English village parish church standing as a ROOFLESS SHELL — an
open ruin. The four stone walls are up and solid, the pointed gothic window arches
are empty holes with no glass, and where the roof should be there is NOTHING AT
ALL: pale open sky pours straight down into the interior, and from outside you can
see the bare inner faces of the far walls. The top edge of the building is a
ragged, uneven line of raw stone meeting sky. Absolutely NO roof, NO tiles, NO
slates, NO thatch, NO spire, NO steeple, NO belfry, NO bell tower, NO weathervane,
NO cross on top. A few thin scaffolding poles lean against one wall. Long grass and
leaning headstones at the base.

Flat gouache and screenprint style, limited palette: bone-white sky, warm sandstone
walls, deep charcoal shadow, one accent of dried-blood rust red. Heavy grain,
halftone speckle, visible paper texture. Still, quiet, ominous English summer light.
NO people, NO faces, NO figures, NO text, NO lettering, NO title, no words or
letters anywhere. An illustration, not a photograph.
```

---

## the-reunion

**Why it is being redone:** the shipped cover renders its crowd as faces. No other
cover in the set of sixteen contains a face, so it breaks the wall. Its blank
clock also reads as a moon.

**The trap:** a handless dial with no context is a moon or a plain disc. Every
detail that makes it a *wall clock* — bezel, tick marks, mounting bracket, cast
shadow — is doing load-bearing work, so keep them all. The case's axis is time
(*"Ninety people can tell you who they were standing with. Not one of them can
tell you what time it was."*), which is why the hands are the thing removed.

```text
A fine-art poster illustration for a murder-mystery case called "The Reunion".
House style: one ordinary object with something taken out of it, as a flat gouache
screenprint with heavy paper grain.

Subject: a large round institutional wall clock — the kind bolted high on the wall
of a school assembly hall — WITH ITS HANDS REMOVED. It must read unmistakably as a
clock mounted on a wall, never as a moon or a plain disc: a thick dark metal bezel
ring around the outside, a cream dial face, clear black minute ticks and bold hour
markers stepping all the way around the rim, a visible wall mounting bracket, and a
hard shadow cast onto the wall behind it so it clearly sits proud of the surface.
The centre of the dial is completely EMPTY — no hour hand, no minute hand, no second
hand, no centre spindle, just a small bare hole where the hands were removed.
Chipped paint on the bezel.

Behind and below it, softly out of focus, the upper corner of a shabby school hall:
varnished wooden wall panelling, a sagging strip of faded paper bunting, the top of
a stacked plastic chair.

Flat gouache and screenprint style, limited palette: cold institutional green, cream,
deep charcoal, one accent of rust red. Heavy grain, halftone speckle, visible paper
texture. Still, ominous, evening light. NO people, NO faces, NO figures, NO crowd,
NO silhouettes of people, NO text, NO lettering, NO title, no words or letters
anywhere. An illustration, not a photograph.
```

---

## Not on this list: the app icon

**The icon is settled — do not regenerate it.** Alternates carrying a detective
element (a chalk outline and a fingerprint inside the cream bubble) were drawn on
2026-09-03 and rejected; the owner prefers the original Canva mark. It is not
waiting on quota and it is not an open task.
