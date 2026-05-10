---
title: BBC iPlayer — Icon (Chevron)
category: Icon / Media
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — Icon (Chevron)

**Category:** Icon / Media
**Why study:** Visual-only component — what DO you story for something with no interaction?
**Storybook version:** v5/v6 (Knobs addon)
**Note:** No standalone "Icon" component in BBC iPlayer Storybook. `Chevron` chosen as representative — simplest directional icon with clear visual states and production use cases.

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Chevron ← default
3. Disabled
4. Transparent Background
5. Transparent And Disabled

**Total: 1 Docs + 4 stories**

---

## Docs Page

### Structure

| Section | Content |
|---|---|
| Title + owner | "Chevron" / "Owner: Shared" |
| What problem does it solve? | "The chevron is a way of indicating to the user that navigable elements or content currently out of view can scroll in the direction indicated." |
| When & how to use it? | "It is used when navigable elements are hidden 'off screen'. It can be used as part of the 'ScrollableNav' component and 'Carrousel'." |
| Current usage | Carousel (Home, Categories, Channels, Episode), Scrollable Nav (TV Guide, A-Z) |
| Related components | Arrows, Carousel, Scrollable Nav |
| Props | Full props table |
| Per-variant notes | One block per variant: "When is this variant used and why?" + "Where is it currently used?" |

### Props table

**2 required props:** `type` and `label`

| Prop | Required | Type | Description |
|---|---|---|---|
| **type** | **true** | string | Left or right chevron ("previous" or "next") |
| size | false | string | Adds `--[size]` modifier. Options: "small" |
| onClick | false | function | Click handler |
| disabled | false | boolean | Disable the chevron |
| **label** | **true** | string | Visually hidden label on the chevron |
| transparent | false | boolean | Sets transparency of chevron |
| className | false | string | Class name on root element |
| dataAttributes | false | object | data-* attributes as key-value pairs |

**KEY FINDING:** `label` is a required prop even though it's visually hidden — BBC treats accessible labelling as a hard requirement, not optional.

---

## Story Analyses

### Chevron (default)

- **Intent:** Baseline — standard opaque chevron with all configurable states exposed.
- **Canvas:** SVG chevron icon. No visible text (label is visually hidden). Canvas appears almost empty.
- **Controls (4 knobs):**
  - disabled: `false` (checkbox)
  - label: `"left"` (textarea)
  - transparent: `false` (checkbox)
  - type: `"previous"` (textarea)
- **What's hidden:** size, onClick, className, dataAttributes
- **Actions:** None — onClick not wired.
- **Accessibility:** 0 violations, 7 passes, 0 incomplete.
- **Interactions:** None.
- **KEY FINDING:** Canvas is nearly empty — just an SVG. No text output. Visual-only components produce sparse canvas snapshots.

---

### Disabled

- **Intent:** End-of-list state — chevron present but not interactive (no more items to scroll to).
- **Canvas:** Disabled/dimmed SVG chevron.
- **Controls (2 knobs):**
  - disabled: `true` (checkbox)
  - type: `"next"` (textarea)
- **What's dropped vs default:** label, transparent removed. Only the discriminating prop (disabled) + direction.
- **Per-variant note:** "Represents end of list." Used: Carousel.
- **Actions:** None.

---

### Transparent Background

- **Intent:** ScrollableNav chevron — no background fill, sits on top of content.
- **Canvas:** SVG chevron without background fill.
- **Controls (2 knobs):**
  - transparent: `true` (checkbox)
  - type: `"next"` (textarea)
- **What's dropped vs default:** label, disabled removed.
- **Per-variant note:** "Triggers scroll, left or right." Used: ScrollableNav.
- **Actions:** None.

---

### Transparent And Disabled

- **Intent:** ScrollableNav end-of-list state — transparent AND disabled simultaneously.
- **Canvas:** Transparent + dimmed SVG chevron.
- **Controls (3 knobs):**
  - disabled: `true` (checkbox)
  - transparent: `true` (checkbox)
  - type: `"previous"` (textarea)
- **What's dropped vs default:** label removed. Both booleans exposed together.
- **Per-variant note:** "Represents end of list." Used: ScrollableNav.
- **KEY FINDING:** BBC creates a story for multi-boolean combinations that occur together in production (transparent+disabled). Not just individual booleans — real composite states get their own story.
- **Actions:** None.

---

## Theming / Tokens

- **Default style:** Chevron with solid background fill (dark theme). Arrow SVG in light colour.
- **Transparent style:** No background — arrow SVG only, overlaid on content.
- **Disabled style:** Reduced opacity/dimmed appearance — visually inactive.
- **Canvas:** Near-empty — just SVG on dark background. No labels visible.
- **Direction:** `type="previous"` = left-pointing. `type="next"` = right-pointing. Binary, no rotation CSS trick.
- **Size:** `size="small"` adds CSS modifier. Not exposed in any story knob.
- **No Design tab content:** No Figma designs linked.

---

## Patterns & Observations

1. **Visual-only canvas = sparse stories.** Chevron is an icon. Canvas shows just an SVG. Stories look nearly identical. Differentiation is entirely in the knob values and the disabled/transparent visual states — not in rich canvas content.

2. **Required `label` prop = accessibility enforcement.** `label` is required (not optional) despite being visually hidden. BBC bakes a11y into the component contract — you cannot render a Chevron without providing an accessible name.

3. **Default story exposes label knob — variants don't.** Label only appears in the default story's 4 knobs. Variant stories (2–3 knobs each) drop it. Assumption: if you need to test label text, use the default story. Variants focus on visual state only.

4. **Variant stories = minimal knobs around discriminating boolean.** Each variant: the defining boolean(s) set to true + `type` (so you can test both directions). Nothing else. Maximum signal, minimum noise.

5. **Composite state = separate story.** transparent+disabled is a real production combination (ScrollableNav end-of-list). BBC stories it explicitly — not just "try turning on both knobs." The combination has its own story with its own per-variant note and product placement.

6. **onClick never wired.** Consistent with all BBC components. No Actions demonstrated.

7. **Size modifier hidden from all stories.** `size="small"` exists as a prop but never exposed as a knob in any story. Not storied at all. Possible reason: size is always determined by context (parent component sets it), not by the Chevron story consumer.

8. **type always exposed as knob.** Every story (default + 3 variants) exposes `type`. Direction is always user-testable — you can always flip between "previous"/"next" in any story.

9. **Story count answers "which states matter for QA."** 4 stories = 4 production configurations: enabled, disabled (Carousel), transparent (ScrollableNav), transparent+disabled (ScrollableNav end). Not exhaustive (no size variants) — only the states that appear on real pages.

---

## Key Findings Summary

- **Story count:** 4 stories
- **How icon catalogue shown:** Not shown — no gallery/catalogue story. Each story = one icon configuration. No "all icons" grid.
- **Size/color props:** `size` prop exists but NOT storied. Colour comes from CSS (not a prop). Only visual state (disabled=dimmed, transparent=no-bg) storied.
- **Canvas output:** Near-empty — icon SVG only. No text. Visual-only components have sparse canvases.
- **Required `label`:** Accessibility label required at component level — not optional. This is unique among all researched components (most treat labels as optional).
- **Composite state story:** transparent+disabled = separate story (Transparent And Disabled). BBC stories multi-boolean combinations when they occur together in production.
- **Docs style:** Same prescriptive structure. Per-variant notes explain use case + product placement for each visual state.
- **onClick:** Not wired in any story. Consistent with all BBC components.
