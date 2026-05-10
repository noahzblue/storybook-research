---
title: BBC iPlayer — Modal
category: Overlay
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — Modal

**Category:** Overlay
**Why study:** Open/close state — shows how overlay components handle visibility without play().
**Storybook version:** v5/v6 (Knobs addon)

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Modal

**Total: 1 Docs + 1 story**

Note: BBC has *separate top-level components* for modal variants: `MsiModal` and `TvlModal` appear in the sidebar as sibling components, not as stories within Modal. Different modal types = different components, not different stories.

---

## Docs Page

### Structure

| Section | Content |
|---|---|
| Title + owner | "Modal" / "Owner: Shared" |
| What problem does it solve? | "The modal is a way of directly addressing the user when specific information or an action from the user is required." |
| When & how to use it? | "It can be used when information or an action from the user is critical for continuing the current process." |
| Current usage | TV Licence pop-up, Sign in pop-up, Safeguarding modal, Error modal, TIP still watching overlay, Continuous Play modal, Cookie error modal |
| Related components | Button, Icon |
| Props | Full props table (see below) |
| Per-variant notes | None — single story, no variant notes section |

### Copy style

Same prescriptive structure as Button/ContentItem. No per-variant notes since only one story.

### Props table

All props are `required: false`.

| Prop | Type | Description |
|---|---|---|
| children | node | Rendered below title/text |
| title | string | Modal title |
| text | array | Array of paragraphs |
| onCloseButtonClick | function | Called when user tries to close |
| type | string | Component type. Currently supports only "msi" |
| footerComponents | array | Components at bottom of modal |
| className | array | Classes to append |
| data | object | data-attributes on element |
| closeButtonData | object | data-attributes on close button |
| onEscapeKeyPress | function | Called when escape key pressed while modal is active |

---

## Story Analyses

### Modal

- **Intent:** Show the modal in its open/rendered state with full content — title, paragraphs, CTA.
- **Canvas:** Full modal occupying the canvas: large centred box with "Modal Title", two lorem ipsum paragraphs, "Okay" full-width button, X close button top-right. Dark background fill behind modal (the overlay).
- **Controls (4 knobs):**
  - title: `"Modal Title"` (textarea)
  - text: `"Interdum et malesuada fames ac...., Integer accumsan diam eu..."` (textarea — comma-separated array of paragraph strings)
  - type: `"default"` (select: default / msi / tvl)
  - className: `""` (textarea, empty)
- **What's hidden:** onCloseButtonClick, onEscapeKeyPress, footerComponents, data, closeButtonData, children
- **CRITICAL OBSERVATION — open/close state:** Modal is **always rendered open** in the story. There is no `isOpen` / `show` / `visible` prop and no toggle mechanism. The component represents only the open state — open/close state management is handled by the consuming parent, not the component itself.
- **Actions:** None wired — onCloseButtonClick not demonstrated. The X button exists in canvas but clicking it does nothing in the story.
- **Accessibility:** 0 violations, 18 passes, 1 incomplete.
- **Interactions:** None — no play() steps.

---

## Theming / Tokens

- **Background:** Modal renders on dark canvas (iPlayer dark theme). Modal itself has a dark overlay/backdrop.
- **Close button:** X icon top-right — uses the "no" icon (same as Button icon-only close pattern).
- **CTA:** "Okay" button appears to use `fullWidth: true` style — spans full modal width.
- **No Design tab content:** No Figma designs linked.

---

## Patterns & Observations

1. **Single story for an overlay component.** No "open" vs "closed" stories, no "loading" state. BBC's answer to overlay state: just show it open. One story = the open state.

2. **Open/close not a component concern.** Modal has no `isOpen` or visibility prop. Open/close is managed externally (parent component owns state). The story bypasses this by rendering the modal unconditionally.

3. **Type variants via separate components, not stories.** `MsiModal` and `TvlModal` are separate sidebar entries (full components), not variant stories within `Modal`. This is a decomposition choice: meaningful enough variation = new component, not new story.

4. **`type` prop exposed as knob but separate components exist.** The `type: "msi"/"tvl"` knob lets you switch variants inline — but there are ALSO separate MsiModal/TvlModal components. Suggests the type variants are composed differently enough to warrant their own components, but `type` prop kept for backwards compat.

5. **Callback props hidden from knobs.** `onCloseButtonClick`, `onEscapeKeyPress` not wired. BBC doesn't demonstrate interaction callbacks in modal stories. Consistent with Button approach.

6. **`text` prop is array but knob is textarea string.** The text knob shows a comma-separated single string. Storybook Knobs v5 doesn't handle array props natively — BBC encodes the array as a comma-delimited string and presumably parses it in the story.

7. **footerComponents hidden.** Despite being a prop that accepts button array, `footerComponents` is not exposed. The "Okay" button visible in canvas is likely hardcoded in the story definition, not via this prop.

8. **Highest a11y pass count of all components.** 18 passes — modal has rich semantic structure (dialog role, labelling, keyboard handling).

---

## Key Findings Summary

- **Story count:** 1 story
- **Open/close state handling:** NOT a component prop. Modal is always-open in story. External state management assumed.
- **Backdrop/overlay patterns:** Backdrop rendered as part of the component itself (dark fill behind modal in canvas).
- **Type variants:** Separate top-level components (MsiModal, TvlModal), not stories. Also a `type` knob on the default story.
- **Docs style:** Same prescriptive structure — "What problem / When to use / Current usage". No per-variant notes (single story).
- **Knob count:** 4 (minimal) despite 10 props. Only content-shaping props exposed.
