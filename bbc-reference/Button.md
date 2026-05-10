---
title: BBC iPlayer — Button
category: Simple Interactive
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — Button

**Category:** Simple Interactive
**Why study:** Baseline component — simplest interactive element. Sets the pattern for states, variants, disabled.
**Storybook version:** v5/v6 (Knobs addon, no Controls/Interactions tabs)

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Button ← default/baseline
3. Numeral Button
4. Toggled On
5. Blue Background
6. Custom Font Size
7. With Icon
8. With Icon And No Text
9. With Icon On The Right
10. With No Link Or Action
11. Button Full Width
12. Button Tall
13. Disabled

**Total: 1 Docs + 12 stories**

---

## Docs Page

### Structure (top to bottom)

| Section | Content |
|---|---|
| Title + owner | "Button" / "Owner: Shared" |
| What problem does it solve? | "Gives the user the ability to complete an action or navigate between internal/external pages." |
| When & how to use it? | "See variant for specific use case." |
| Current usage | Bulleted list of real pages: Homepage, Playback, Channel Highlights, Categories, TLEO list, Group Pages, Channel A-Z, Search, Parental Controls, Watchlist (signed out) |
| Related components | Link, Dropdown, Search, Pagination |
| Props | Full props table (see below) |
| Per-variant notes | One block per variant story: "When is this variant used and why?" + "Where is it currently used on the product?" |

### Copy style

**Prescriptive and product-connected.** Not "this prop does X" — instead:
- "What problem does it solve?" → functional framing
- "Current usage" → lists real URLs/pages in production
- Per-variant notes anchor every variant to an actual use case on the product

### Props table

All props are `required: false`.

| Prop | Type | Description |
|---|---|---|
| children | node | Children are displayed inside the button |
| href | string | Passing a value renders as `<a>` tag |
| openInNewWindow | boolean | Opens link in new window/tab when href provided |
| action | string | Passing a value renders as `<button type="submit">` |
| ariaLabel | string | aria-label for screen readers |
| className | array | Classes to append to root element |
| fontSize | string | Named font size token (bullfinch, skylark, etc.) |
| align | string | "left" or empty |
| icon | component | Element to display inside button |
| largeIcon | boolean | Renders icon as 32×32px instead of 16×16px |
| iconPosition | string | "left" or "right" (defaults to left) |
| type | string | type attribute on button/input |
| data | object | data-attributes to attach |
| onClick | function | Click handler |
| primary | boolean | Primary button flag; some icons change colour |
| active | boolean | Show as active |
| numeral | boolean | Style as numeral |
| background | boolean | Turn background colour off |
| setRef | function | Forwarded to child's ref |
| style | object | Custom inline styles |
| routerLink | component | react-router-dom Link for SPA routing |
| selected | boolean | Pink underline; also adds extra side spacing |
| fullWidth | boolean | Button takes full container width |
| tall | boolean | Taller button via additional padding |
| disabled | boolean | Disabled appearance |
| bold | boolean | Bold typography; defaults to true |

---

## Story Analyses

### Button (default)

- **Intent:** Full configuration baseline — shows the canonical iPlayer button and exposes every prop.
- **Canvas:** iPlayer button with play icon + "iPlayer" text on dark background (brand dark theme).
- **Controls (23 knobs — all props exposed):**
  - align: `Left` (select: Left / Empty)
  - ariaLabel: `"Click to visit iPlayer"` (textarea)
  - className: `"some,className"` (textarea)
  - data: `{"attributekey": "attributeValue"}` (textarea/object)
  - fontSize: `"bullfinch"` (textarea)
  - background: `true` (checkbox)
  - href: `"#"` (textarea)
  - icon: `"play"` (textarea)
  - iconPosition: `"left"` (textarea)
  - active: `false` (checkbox)
  - numeral: `false` (checkbox)
  - largeIcon: `false` (checkbox)
  - primary: `true` (checkbox)
  - selected: `false` (checkbox)
  - openInNewWindow: `false` (checkbox)
  - style: `{"borderRadius": 0}` (textarea/object)
  - type: `"text/html"` (textarea)
  - action: `"my-action"` (textarea)
  - fullWidth: `false` (checkbox)
  - tall: `false` (checkbox)
  - disabled: `false` (checkbox)
  - bold: `true` (checkbox)
  - children (Button Text): `"iPlayer"` (textarea)
- **Actions:** Empty — onClick not wired as an action callback. (The `action` knob is the HTML form action attribute, not a callback.)
- **Accessibility:** 0 violations, 13 passes, 0 incomplete.
- **Interactions:** None (Storybook v5/v6, no play()).

---

### Numeral Button

- **Intent:** Show pagination numeral style — compact, less padding, square-ish.
- **Canvas:** Small "1" button on dark background.
- **Controls (1 knob):** children: `"1"`
- **Actions:** None.
- **Accessibility:** 0 violations, 2 passes.
- **Interactions:** None.

---

### Toggled On

- **Intent:** Show selected/active toggle state — pink underline beneath button text.
- **Canvas:** "Audio Described" button with visible pink underline.
- **Controls (2 knobs):** selected: `true`, children: `"Audio Described"`
- **Actions:** None.
- **Accessibility:** Not checked (stayed on Knobs tab).
- **Interactions:** None.

---

### Blue Background

- **Intent:** Show BBC ID blue variant (login/personalisation CTAs).
- **Canvas:** "Enable personalisation" button with blue background fill.
- **Controls (2 knobs):** className: `"button--blue"`, children: `"Enable personalisation"`
- **KEY FINDING:** Blue is applied via CSS class (`button--blue`), NOT via a dedicated prop. No `blue` or `variant` prop exists — the className knob is used directly.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### Custom Font Size

- **Intent:** Show named font-size token override (TV licence modal use case).
- **Canvas:** "I have a TV Licence. Watch now." with larger text (skylark size).
- **Controls (2 knobs):** fontSize: `"skylark"`, children: `"I have a TV Licence. Watch now."`
- **KEY FINDING:** fontSize values are named design tokens ("bullfinch", "skylark") — not raw px values.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### With Icon

- **Intent:** Show icon + text layout (default left position).
- **Canvas:** "► Watch Live" — play icon on left, text on right.
- **Controls (2 knobs):** icon: `"play"`, children: `"Watch Live"`
- **KEY FINDING:** Icon passed as string name ("play"), not as SVG/component. Resolves via an internal GEL icon sprite.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### With Icon And No Text

- **Intent:** Icon-only button (search bar close, etc.).
- **Canvas:** "×" (close/X) button — no text.
- **Controls (1 knob):** icon: `"no"` (the X/close icon is named "no")
- **KEY FINDING:** Icon-only achieved by omitting `children` knob entirely — no empty string, just no children prop.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### With Icon On The Right

- **Intent:** Icon after text (skip trailer pattern).
- **Canvas:** "Skip Trailer ►" — text on left, skip icon on right.
- **Controls (2 knobs):** icon: `"skip"`, children: `"Skip Trailer"`
- **KEY FINDING:** `iconPosition: "right"` is hardcoded in the story definition — not exposed as a knob. Position not user-adjustable in this story.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### With No Link Or Action

- **Intent:** Non-interactive current-page indicator in pagination (no href, no onClick).
- **Canvas:** "1" numeral button — visually identical to Numeral Button but no interactivity.
- **Controls (2 knobs):** active: `false`, children: `"1"`
- **KEY FINDING:** Distinct from Numeral Button — the key differentiator is absence of href/action (no link/action props set), making it a display-only element. Represents the "current page" in pagination.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### Button Full Width

- **Intent:** Show full-width layout (modal CTAs).
- **Canvas:** "1" button stretching the full width of the canvas area.
- **Controls (2 knobs):** fullWidth: `true`, children: `"1"`
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### Button Tall

- **Intent:** Show taller variant with extra vertical padding (continuous play modal).
- **Canvas:** "Watch now" button — visibly taller than default.
- **Controls (2 knobs):** tall: `true`, children: `"Watch now"`
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

### Disabled

- **Intent:** Show disabled appearance for inaccessible playback controls.
- **Canvas:** "► iPlayer" button visually identical to default but disabled appearance.
- **Controls (4 knobs):** icon: `"play"`, primary: `true`, disabled: `true`, children: `"iPlayer"`
- **NOTE:** Only variant story with 4 knobs. Shows both `primary` and `disabled` together — more context than other variants.
- **Actions:** None.
- **Accessibility:** Not checked.
- **Interactions:** None.

---

## Theming / Tokens

- **Background:** All stories render on dark/black canvas — this is the default iPlayer dark theme. No light/dark toggle visible.
- **Colours:** Not via props. Applied via `className` (e.g. `"button--blue"`). No colour prop or theme-switching mechanism exposed.
- **Font sizes:** Named tokens, not px. Confirmed names: `bullfinch` (default, small), `skylark` (larger). Pattern implies a bird-named scale (GEL typography system).
- **Icons:** Referenced by string name via a GEL icon sprite system. Known names from stories: `play`, `no` (X/close), `skip`, `add`. Component resolves strings to SVG `<use>` references.
- **Icon sizes:** `largeIcon: true` = 32×32px, default = 16×16px. Binary, not a scale.
- **Design tab:** "No designs found" — no Figma specs linked to any Button story.

---

## Patterns & Observations

1. **Default story = full config surface.** The "Button" story exposes ALL 23 props as knobs. Every other story exposes only 1–4 key props. This is intentional: one story to explore, many stories to demonstrate.

2. **Variant stories isolate a single boolean/class.** Each variant story hardcodes everything except the one distinguishing prop + children. Pattern: `{discriminatingProp: true, children: "real example text"}`.

3. **Story names match the discriminating prop.** "Button Tall" → `tall: true`. "Button Full Width" → `fullWidth: true`. "Toggled On" → `selected: true`. Naming is self-documenting.

4. **Real product text as defaults.** Every story uses actual iPlayer copy ("Watch Live", "Skip Trailer", "Enable personalisation", "I have a TV Licence. Watch now.") — not placeholder text like "Click me".

5. **Story count formula:** 1 story per meaningful visual state. States that look identical aren't split (no separate "primary" vs "not primary" story — primary is a knob on the default). States with a distinct visual change or distinct use case get their own story.

6. **No onClick/callback wiring.** None of the stories wire `onClick` to the Actions panel. The component's `action` knob is HTML form action, not a JS callback. BBC chose not to demonstrate event handling via stories.

7. **Colour via className, not variant prop.** No `variant="blue"` or `color="blue"` prop. Blue is `className="button--blue"`. This pattern (CSS-class-based theming via the `className` knob) is a legacy CSS approach — tells you the component predates design-token props.

8. **Numeral Button vs With No Link Or Action:** Two stories look identical ("1" button) but answer different questions. Numeral = "what does a pagination link look like?". No Link Or Action = "what does the current/non-interactive page indicator look like?" BBC keeps these separate despite visual similarity.

---

## Key Findings Summary

- **Story count:** 12 stories
- **Story-per-state rule:** YES — each visual state / meaningful use case gets its own story. Same component, different props = different story.
- **Knob vs story line:** Knobs used for textual variation (children, fontSize, icon name). A distinct visual state or use case = separate story (toggled, blue, tall, disabled).
- **Docs style:** PRESCRIPTIVE — "what problem does it solve?", "where is it currently used?" — product-connected, not API-documentation style.
- **Actions wired:** NO — onClick not demonstrated in any story.
- **Interactions (play()):** NONE — Storybook v5/v6 era.
- **Colour/theming:** CSS class-based, no token props, no theme switcher.
- **Storybook version:** v5/v6 with Knobs addon (not modern Controls).
