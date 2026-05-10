---
title: BBC iPlayer — Feedback (Progress)
category: Feedback / Status
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — Feedback (Progress)

**Category:** Feedback / Status
**Why study:** Minimal-state component — is a progress bar really just one story? What makes BBC add more?
**Storybook version:** v5/v6 (Knobs addon)
**Note:** `Progress` chosen as Feedback representative — clear state variants (default/large/live), minimal prop surface, owner is "Browse" (not "Shared" — first team-owned component in research).

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Default ← baseline
3. Large
4. Live

**Total: 1 Docs + 3 stories**

---

## Docs Page

### Structure

| Section | Content |
|---|---|
| Title + owner | "Progress" / **"Owner: Browse"** (first non-Shared owner in research) |
| What problem does it solve? | "Indicates progress, for example how far through an episode the user has watched" |
| When & how to use it? | (absent — no "When & how to use it" section) |
| Current usage | Watching List, Homepage Watching Module, ContentRotator |
| Related components | Content Item, ListContentItem |
| Props | Full props table |
| Per-variant notes | 2 blocks: Large progress bar variant, Live variant |

**Structural anomaly:** No "When & how to use it?" section — every other component has this. Progress docs skip it.

### Props table

**1 required prop:** `progress: number`

| Prop | Required | Type | Description |
|---|---|---|---|
| **progress** | **true** | number | Percentage complete |
| largeProgressBar | false | boolean | Increases progress bar height (for legacy content items) |
| indicatorTheme | false | `default \| live \| neutral \| themed` | Changes colour of progress bar |

**KEY FINDING:** `indicatorTheme` uses a union type in the Type column — BBC documents string enums directly in the type field, not as "string (options: ...)" in the description. The type field IS the documentation for allowed values.

---

## Story Analyses

### Default

- **Intent:** Baseline — standard progress bar at a set completion point.
- **Canvas:** Pink/accent progress bar, partially filled. No text output.
- **Controls (1 knob):**
  - progress: `20` (range slider, min=0, max=100, step=1)
- **What's hidden:** largeProgressBar, indicatorTheme
- **KEY FINDING:** Default story exposes ONLY the required prop. This is the most minimal default story in all BBC research — 1 knob (the required number prop), nothing else.
- **Actions:** None.
- **Accessibility:** 0 violations.
- **Interactions:** None.

---

### Large

- **Intent:** Legacy content item progress bar — taller height for older-style content items.
- **Canvas:** Taller progress bar (increased height vs default).
- **Controls (1 knob):**
  - progress: `20` (range slider, identical to Default)
- **`largeProgressBar`:** hardcoded `true` in story definition — NOT a knob.
- **Per-variant note:** "Used on legacy content items. Increases the height of the progress bar." Used: ContentItem, ListContentItem.
- **KEY FINDING:** All 3 stories have identical knobs (1 range slider). Variant stories don't add or change knobs at all — the discriminating prop is completely hidden. You can only tell them apart by the visual appearance.
- **Actions:** None.

---

### Live

- **Intent:** Currently-live progress indicator — different colour scheme for live/broadcasting content.
- **Canvas:** Progress bar in live/accent colour (different from default pink).
- **Controls (1 knob):**
  - progress: `20` (range slider, identical to Default and Large)
- **`indicatorTheme`:** hardcoded `"live"` in story definition — NOT a knob.
- **Per-variant note:** "Used in list content item within the guide app when the item is currently live." Used: ContentItem, ListContentItem.
- **Actions:** None.

---

## Theming / Tokens

- **Default colour:** Pink/accent — same BBC brand pink as Button selected state and ContentItem primaryLabel.
- **Live colour:** Different accent colour for live/broadcasting state (green or red variant — exact colour not captured).
- **Bar height:** Default = thin. Large = taller (CSS modifier for legacy compatibility).
- **Canvas output:** Always empty text — just a CSS/SVG progress bar. Same as Chevron: visual-only component = sparse canvas.
- **No Design tab content:** No Figma designs linked.
- **Owner: Browse** — not Shared. First team-specific component in research. Browse team owns playback/watching functionality.

---

## Patterns & Observations

1. **Minimal component = minimal stories = minimal knobs.** Progress has 3 props, 3 stories, 1 knob each. The prop count directly maps to story count (1 story per prop variant). No combination stories (no Large+Live).

2. **Default story exposes ONLY the required prop.** Other components expose most props in the default story. Progress inverts this: only `progress` (the required number) is a knob. `largeProgressBar` and `indicatorTheme` are never exposed as knobs anywhere.

3. **All stories have identical knobs.** Default, Large, and Live all show the same 1 knob (progress range slider). The only differentiation between stories is the hardcoded variant prop. You can only tell them apart visually. This is the extreme end of the "variant stories = minimum knobs" pattern.

4. **`indicatorTheme` is a string enum documented in the Type column.** BBC puts "default | live | neutral | themed" in the Type field rather than the Description. No story exposes the full enum as a select knob — you'd have to know the values from the docs. `neutral` and `themed` values are documented but never storied.

5. **No "When & how to use it?" in docs.** Only component without this section. Possible reason: Progress is always used inside ContentItem/ListContentItem context — it's never placed independently. BBC may have decided the "when to use" is self-evident from the current usage list.

6. **Owner: Browse, not Shared.** First non-Shared owner in all research. Signals that components tied to a specific feature domain (watching/playback) are team-owned even if used in multiple shared components.

7. **`neutral` and `themed` indicatorTheme values not storied.** The docs list 4 possible `indicatorTheme` values (default, live, neutral, themed) but only `live` gets its own story. BBC doesn't story all enum values — only the ones with distinct product contexts.

8. **Progress as a composed child, not standalone.** Related components are ContentItem and ListContentItem — Progress is always embedded in these. Yet BBC stories it standalone. This allows isolated visual testing and documents its independent API without needing to load its parent context.

---

## Key Findings Summary

- **Story count:** 3 stories
- **How minimal components expanded:** One story per variant prop (largeProgressBar, indicatorTheme=live). Not all enum values get stories — only distinct product contexts.
- **Status/severity variants:** `indicatorTheme` enum — only "live" storied. "neutral" and "themed" exist in docs but no stories.
- **Knob count:** 1 knob in ALL stories (just `progress` range slider). Most minimal knob surface in all BBC research.
- **Variant props in stories:** NEVER exposed as knobs. Hardcoded in story definition. All stories visually different but have identical controls.
- **Owner:** Browse (not Shared) — first team-owned component in research.
- **Docs anomaly:** Missing "When & how to use it?" section. Only component without it.
- **`indicatorTheme` type documentation:** String union in Type column — BBC uses the type field to document enums.
