---
title: Story Count Rules
tags:
  - guide
---

# 09 — Story Count Rules

**Question answered:** How many stories should a component have? What drives that number?

---

## Story Count by Component Type

| Component type | Typical count | What determines count |
|---|---|---|
| Simple interactive (button, toggle) | 8–15 | 1 per visual state + 1 per production variant |
| Data display (card, list item) | 5–10 | 1 per destination/context type + 1 per user state |
| Overlay (modal, dialog) | 1–3 | Usually 1 (always-open) + type variants if API diverges |
| Navigation | 5–10 | Default + active states + environment states (no-JS, etc.) |
| Form element | 3–6 | Default + validation states + distinct context modes |
| Icon / visual-only | 2–5 | 1 per production configuration |
| Layout / container | 1–3 | Default + 1 per meaningful layout behaviour |
| Feedback / status | 2–5 | 1 per status/severity variant with real product context |

These are guidelines, not hard limits. The right count = the number of questions a consumer or QA engineer would ask about this component.

---

## What Makes You Add Another Story

Add a story when:
- The configuration has a **distinct visual appearance**
- The configuration represents a **distinct product use case** (different page type, user state, or context)
- The configuration is a **production combination** of props that always appear together
- The state is an **environment variant** (no-JS fallback, legacy browser, unauthenticated user)
- Two configurations **look identical** but answer **different questions** (different intent, different interactivity)

---

## What Does NOT Need Its Own Story

Don't add a story when:
- The only change is **text content** — use a control instead
- The visual change is **minor with no distinct use case** (alignment, minor padding tweak)
- The prop combination **never appears in production**
- An existing story already demonstrates the behaviour via a control
- It's an **enum value with no distinct product context** (document it in the Type column, story the ones that matter)

---

## The "New Story vs Knob" Decision

| Scenario | Decision | Why |
|---|---|---|
| `disabled: true` — distinct dimmed appearance | Story | Different visual state, specific use case |
| `tall: true` — taller button | Story | Specific modal use case, not a general option |
| `transparent + disabled` — composite production state | Story | Always appear together in production |
| `iconPosition: "right"` — distinct layout | Story | Different visual structure |
| `children: "Watch Live"` vs `"Play"` | Control | Same structure, different text |
| `align: "left"` — minor alignment | Control | No distinct use case |
| `indicatorTheme: "neutral"` — has no product context | Control only | Storying it would be misleading |
| `largeProgressBar: true` — specific legacy context | Story | Has its own use case, distinct height |

---

## Variant Components vs Variant Stories

Create a **separate component** (not a story) when:
- The variant has a substantially different prop API
- The variant renders meaningfully different DOM structure
- The functional difference is large enough to warrant its own Docs page
- The variant is owned by a different team or domain

Keep as a **story** when:
- The variant is achieved by a single prop or enum value
- The component API is shared across all variants

Examples:
- `Modal` → `MsiModal`, `TvlModal` → separate components (different enough APIs)
- Adult nav, Children's nav → separate stories are fine; separate components if APIs diverge

---

## Single-Story Components

Some components legitimately have only 1 story — this is correct, not under-documented:
- **Always-open overlay:** Modal with no open/close prop — rendering it IS the open state
- **Purely structural wrapper:** Container with no visual states of its own
- **Delegated types:** Variants are separate components, each with their own stories

A component with 1 story is not sparse. It may be correctly minimal.

---

## The "Why Does This Story Exist?" Test

Before adding a story, complete this sentence:
> "This story shows a consumer what [component] looks like when [condition], which matters because [product context]."

If you can't complete it with a **real product context** → it's a control, not a story.

Examples:
- ✅ "This story shows the button when **disabled**, which matters because **expired content needs a non-interactive CTA**."
- ✅ "This story shows the progress bar when **live**, which matters because **live content uses a different colour scheme**."
- ❌ "This story shows the button with **bold: false**, which matters because... you might want to try it."
