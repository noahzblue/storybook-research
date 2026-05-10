---
name: storybook-guide
description: Use when writing Storybook stories, creating story files, deciding story count, setting up argTypes/controls, writing play() interaction tests, or auditing existing stories for quality.
---

# Storybook Guide

## Overview

Reference vault with patterns extracted from production Storybook analysis. Load relevant guides before writing stories — do not rely on training data alone.

**Vault:** `/path/to/your/storybook-research/ ← update this to where you cloned the repo`

---

## Task → Guide Routing

| Task | Load |
|------|------|
| Starting from scratch | 01, 02, 09 |
| Story vs knob decision | 01 |
| How many stories? | 09 |
| argTypes / controls | 04 |
| Docs copy | 03 |
| Actions / callbacks | 05 |
| play() interaction tests | 07 |
| Accessibility | 06 |
| Theming / dark mode | 08 |
| React CSF3 or Svelte CSF syntax | 00 |

---

## Story Creation Checklist

- [ ] Guide 09 — confirm story count for this component type
- [ ] Guide 01 — apply story vs knob decision to every prop
- [ ] argTypes: authored props only — no native HTML attrs (class, id, onclick, etc.)
- [ ] Args: realistic defaults, not placeholder text ("Watch Live" not "Button text")
- [ ] Story names: product language ("Disabled", "With Icon") not API language ("disabled=true")
- [ ] Story order: Playground → most common → less common → edge cases → Mobile View
- [ ] Docs copy: prescriptive ("use when X") not descriptive ("this prop does Y")
- [ ] play() story for every interactive component (open/close, form submit, keyboard nav)
- [ ] Mobile viewport story on all non-trivial components
- [ ] 0 a11y violations on the default story

---

## Key Decisions at a Glance

**Story or control?**
- Distinct visual appearance or product use case → story
- Same structure, different text → control
- Combination that always appears together in production → composite story

**Story count by type**

| Component type | Typical range |
|---|---|
| Simple interactive (button, toggle) | 8–15 |
| Data display (card, list item) | 5–10 |
| Overlay (modal, dialog, sheet) | 1–3 |
| Form element | 3–6 |
| Feedback / status | 2–5 |

Full table + decision rules → Guide 09.

**Framework syntax** → Guide 00 (React CSF3 + Svelte CSF translations for every pattern).
