---
title: Story Philosophy
tags:
  - guide
---

# 01 — Story Philosophy

**Question answered:** What IS a story, and what purpose does it serve?

---

## The Core Rule

A story = one named, reproducible, intentional state of a component.

Stories serve three purposes simultaneously:
1. **Development sandbox** — isolated component environment during build
2. **QA coverage** — each production configuration has a canonical visual reference
3. **Living documentation** — shows intent, not just API surface

---

## The Two Story Types

| Type | Purpose | Control count | Naming |
|---|---|---|---|
| **Default** | Full config surface — explore all props | All meaningful props | Same as component name |
| **Variant** | One product question answered visually | 1–4 (discriminating props only) | Describes the config ("Disabled", "With Icon") |

The default story is the sandbox. Variant stories are the spec.

---

## Story vs Knob — Decision Table

Create a **new story** when the state has a distinct visual appearance or a distinct product use case.
Use a **control (knob)** when the change is textual or when multiple values are interchangeable.

| Example | Story or control? |
|---|---|
| `disabled: true` — visually distinct dimmed state | Story |
| `tall: true` — taller padding, specific product use | Story |
| `transparent + disabled` — composite production state | Story (composite) |
| `iconPosition: "right"` — distinct layout | Story |
| `fontSize: "large"` — layout/sizing consequence, specific context | Story |
| `children: "Watch Live"` vs `"Play"` | Control |
| `align: "left"` — minor alignment tweak, no distinct use case | Control |

Composite states (two booleans that always appear together in production) get their own story — don't make the consumer figure out the combination.

---

## What Every Component Needs (Minimum)

1. **One default story** — full configuration surface, all meaningful props as controls
2. **One story per distinct visual state** that has a real product context
3. **Real content in defaults** — not placeholder text

For simple components (3 props, 1–2 visual states): 1 default + 1–2 variants is correct.
For complex components (20+ props, many contexts): 1 default + 5–12 variants is expected.

---

## Naming Stories

Use **product language**, not API language:
- ✅ "Watching" (not "With Progress Set")
- ✅ "On Channel Page" (not "With renderOpen True")
- ✅ "Disabled" (not "With disabled Prop")
- ✅ "Transparent And Disabled" — composite, names both props

Names appear verbatim in the sidebar. They should communicate intent at a glance.

---

## Story Ordering

1. `Docs` — always first (auto-generated)
2. Default story — full configuration surface
3. Variant stories: most common use case → less common → edge cases → environment/technical variants

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Placeholder text ("Click me", "Lorem ipsum") | Use realistic product copy |
| One story per prop value (over-storifying) | Ask: "Does this answer a different question?" If no → knob |
| All props as controls on every story | Variant stories get 1–4 controls only |
| Stories named by API (`disabled=true`) | Name by product context ("Disabled — expired content") |
| Missing composite states | Story `transparent + disabled` if that combination appears in production |
| No default story | Default story is mandatory — it's the sandbox |

---

## Two Stories That Look Identical

If two stories look the same visually but answer **different questions**, keep both.

Example: a "pagination link" and a "current page indicator" both render as a number button. Same canvas, different intent — one has an href, one doesn't. The absence IS the difference.

Ask: **"Does this story answer a different question from the consumer's perspective?"** If yes → separate story.
