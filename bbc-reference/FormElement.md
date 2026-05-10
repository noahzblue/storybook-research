---
title: BBC iPlayer — FormElement (Dropdown)
category: Form / Input
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — FormElement (Dropdown)

**Category:** Form / Input
**Why study:** Validation states, onChange handling, label/visibility pattern, shrink-to-fit select.
**Storybook version:** v5/v6 (Knobs addon)
**Note:** BBC's "Dropdown" component = native `<select>` wrapper with label, accessible pairing, optional transparency/shrink. Chosen as FormElement representative.

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Dropdown Component ← default
3. Location Switcher Component
4. Language Switcher Component
5. Category Sort Switcher Component

**Total: 1 Docs + 4 stories**

---

## Docs Page

### Structure

| Section | Content |
|---|---|
| Title + owner | "Dropdown" / "Owner: Shared" |
| What problem does it solve? | "The Dropdown allows users to select one out of many options." |
| When & how to use it? | "It is used when multiple options are available to the user." |
| Current usage | Categories, TV Guide |
| Related components | Icon |
| Props | Full props table (see below) |
| Per-variant notes | One block per variant: "When is this variant used and why?" + "Where is it currently used?" |

### Copy style

Terse. No design rules or prescriptive guidance. Pure API + placement docs. Shortest "What problem / When to use" text of all components researched.

### Props table

**Only 1 required prop:** `label: string`

| Prop | Required | Type | Description |
|---|---|---|---|
| id | false | string | Associates `<label>` + `<select>`. Each dropdown needs unique ID. Defaults to slugified label |
| **label** | **true** | string | Label shown next to select |
| hideLabel | false | boolean | Visually hide the label. Defaults to false |
| onChange | false | function | Callback when value changes. Called with currently selected value |
| transparent | false | boolean | Transparent variant (no background). Defaults to false |
| shrinkToFit | false | boolean | Auto-adjust width to match selected option (not widest item). Required: use with `selectedValue` |
| selectedValue | false | string | Pre-selected value. Can update after render to change selection. Required when using `shrinkToFit` |
| statsContainer | false | string | Value for analytics "container" attribute (e.g. "change-sort") |
| className | false | string | Class name to append |
| disableAutoComplete | false | boolean | Prevents browser from overriding selected value on back-button navigation |
| children | false | node | `<option>` elements inside the dropdown |

**Notable prop dependency:** `shrinkToFit` requires `selectedValue` — documented explicitly in description.

---

## Story Analyses

### Dropdown Component (default)

- **Intent:** Full config baseline — standard opaque dropdown with visible label and preset value.
- **Canvas:** "Options: One ▾" — label "Options" left, `<select>` showing "One" right.
- **Controls (7 knobs):**
  - id: `"some-id"` (textarea)
  - className: `"some-class"` (textarea)
  - hideLabel: `false` (checkbox)
  - selectedValue: `"ox"` (textarea)
  - label: `"Options"` (textarea)
  - shrinkToFit: `false` (checkbox)
  - transparent: `false` (checkbox)
- **What's hidden:** onChange, statsContainer, disableAutoComplete, children
- **Actions:** None — onChange not wired.
- **Accessibility:** 0 violations, 11 passes, 0 incomplete.
- **Interactions:** None.

---

### Location Switcher Component

- **Intent:** In-context location selector — shrinks to fit text, transparent (no visible box), label visible.
- **Canvas:** "Change location: Oxfordshire ▾" — transparent style, label visible left.
- **Controls (5 knobs):**
  - hideLabel: `false` (checkbox)
  - selectedValue: `"ox"` (textarea)
  - label: `"Change location"` (textarea)
  - shrinkToFit: `true` (checkbox)
  - transparent: `true` (checkbox)
- **What's hidden vs default:** id, className removed. shrinkToFit+transparent both forced to true as the defining config.
- **KEY FINDING:** shrinkToFit+transparent is the "inline contextual selector" pattern — makes the dropdown look like a link/text, not a form field.
- **Actions:** None.

---

### Language Switcher Component

- **Intent:** Footer language switcher — same transparent+shrinkToFit pattern as Location Switcher.
- **Canvas:** "Change language: English ▾" — same visual pattern.
- **Controls (5 knobs — identical structure to Location Switcher):**
  - hideLabel: `false` (checkbox)
  - selectedValue: `"en"` (textarea)
  - label: `"Change language"` (textarea)
  - shrinkToFit: `true` (checkbox)
  - transparent: `true` (checkbox)
- **Per-variant note in docs:** "Has an onChange callback for changing the language. Uses shrinkToFit to resize based on text size. Also uses transparent prop to remove background."
- **KEY FINDING:** Docs explicitly call out WHY the variant uses these props — combining technical explanation with use-case context.
- **Actions:** None.

---

### Category Sort Switcher Component

- **Intent:** Category sort options — different knob surface from all other stories (exposes option text, not config props).
- **Canvas:** ": Featured / A-Z / Most Recent" — label hidden (no visible label text), three options in `<select>`.
- **Controls (4 knobs — UNIQUE PATTERN):**
  - hideLabel: `true` (checkbox)
  - Option 1 Text: `"Featured"` (textarea)
  - Option 2 Text: `"A-Z"` (textarea)
  - Option 3 Text: `"Most Recent"` (textarea)
- **What's absent:** No selectedValue, no label, no transparent, no shrinkToFit.
- **KEY FINDING:** Only story in all BBC research where knobs expose **content** (option text) not component **config** props. Lets you change what options say, not how dropdown is styled.
- **KEY FINDING:** hideLabel=true — sort dropdown has no visible label. Context is implied by page position.
- **Actions:** None.

---

## Theming / Tokens

- **Default style:** Dark background, visible border, full-width form field layout.
- **Transparent variant:** No background, no border — looks like inline text with chevron. Used for Location/Language switchers.
- **shrinkToFit:** Width hugs selected text — used wherever dropdown is inline content, not a standalone form field.
- **Label accessibility:** `label` prop always renders a `<label>` element paired to `<select>` via `id`. `hideLabel=true` = visually hidden but present for screen readers.
- **No Design tab content:** No Figma designs linked.

---

## Patterns & Observations

1. **Two visual modes: form field vs inline selector.** transparent=false+shrinkToFit=false = opaque form field (default). transparent=true+shrinkToFit=true = contextual inline selector (Location/Language). BBC stories both — they are distinct use cases, not style tweaks.

2. **Only 1 required prop: label.** Despite `children` being needed for actual options, `label` is the only required prop. Story fixtures supply options.

3. **onChange never wired.** Consistent with all BBC components — callbacks not demonstrated. Docs acknowledge it ("Has an onChange callback") but nothing connects to Actions tab.

4. **Analytics + browser-quirk props hidden from all stories.** `statsContainer` (analytics) and `disableAutoComplete` (back-button bug fix) never appear in knobs. Internal/technical props not exposed.

5. **Category Sort Switcher knob surface is unique across all BBC research.** Other stories expose config props. This story exposes content (option text). Only instance where what's INSIDE the component is knob-controlled.

6. **Prop dependency documented inline.** `shrinkToFit` requires `selectedValue` — stated in the `selectedValue` prop description. BBC documents inter-prop constraints in the prop table itself, not in a separate note.

7. **Per-variant notes cite specific prop combinations.** Language Switcher note: "Uses shrinkToFit to resize based on text size. Also uses transparent prop to remove background." — explains WHICH props combine to create variant effect. Unique to Dropdown; other components' variant notes only say WHERE it's used.

8. **hideLabel always exposed.** All 4 stories include `hideLabel`. Most consistently exposed prop — label visibility always user-adjustable.

9. **No validation state stories.** No error/invalid/required/valid stories. BBC does not story form validation states for Dropdown.

---

## Key Findings Summary

- **Story count:** 4 stories
- **Required props:** 1 (`label`) — all other props optional
- **Validation state stories:** NONE — BBC does not story form validation for Dropdown
- **onChange handling:** Not demonstrated in any story. Docs acknowledge it exists.
- **Two distinct visual modes:** Opaque form field (default) vs transparent inline selector — separate stories for each
- **Category Sort anomaly:** Only BBC story where option content (not structural props) is knob-controlled
- **Docs style:** Same prescriptive structure. Per-variant notes uniquely explain which prop combinations create each variant
- **Knob count:** 7 (default) → 5 (context variants) → 4 (content variant). Narrowing pattern consistent with Button/ContentItem
- **Docs bug:** Location Switcher per-variant note missing — docs show Language Switcher twice instead
