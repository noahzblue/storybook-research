---
title: Docs Page
tags:
  - guide
---

# 03 — Docs Page

**Question answered:** What goes in the Docs page and how should it be written?

---

## Standard Sections (in order)

| # | Section | Content |
|---|---|---|
| 1 | **Title + owner** | Component name + which team owns it |
| 2 | **What problem does it solve?** | 1–2 sentences — functional framing, not API description |
| 3 | **When & how to use it?** | Placement rules, usage conditions, design constraints |
| 4 | **Current usage** | Real pages/contexts where this component currently appears |
| 5 | **Related components** | Sibling, alternative, or composed components |
| 6 | **Props table** | All props — name, required flag, type, description |
| 7 | **Per-variant notes** | One block per non-default story: when + where |

---

## Prescriptive vs Descriptive Copy

Write prescriptively — **"When should I use this?"** not **"What does this prop do?"**

**Descriptive (wrong):**
> `disabled` — if true, renders with disabled appearance

**Prescriptive (right):**
> Used when the action is currently unavailable. Appears on: expired content, locked-feature CTAs, parental controls.

---

## "What Problem Does It Solve?" Formula

```
"The [component] is a way of [functional role] for the user [when/where]."
```

One or two sentences. Functional, not technical. No prose.

---

## Per-Variant Notes Format

For each non-default variant story:

```
**[Story Name]**
When is this variant used and why? [1–2 sentences]
Where is it currently used? [page/context list]
```

These anchor every variant to a real use case. They are the most valuable content on the Docs page.

Example:
> **Watching**
> Shows resume progress for in-progress content. Pink progress bar visible at image bottom.
> Currently used: Watching list, Homepage watching module.

---

## Props Table

| Column | What to write |
|---|---|
| **Name** | Exact prop name |
| **Required** | true / false — mark clearly |
| **Type** | Use union syntax for enums: `"default" \| "live" \| "neutral"` — not `"string (options: ...)"` |
| **Description** | What it does + any constraints or prop dependencies |

Rules:
- **Required props at top** — consumers need to know the minimum API immediately
- **Document prop dependencies inline:** `shrinkToFit` — requires `selectedValue` to be set
- **Enum values in the Type column** — they become the documentation, scannable at a glance
- **Nested props tables** for components that accept structured data objects (multiple shapes → multiple tables)

---

## When to Include Usage Examples in Docs

Include a code example in Docs when:
- Prop combinations are non-obvious (e.g. `shrinkToFit` + `selectedValue` + `transparent`)
- The component integrates with an external system and the integration pattern needs illustration
- The minimal viable usage isn't clear from the props table alone

Don't add examples for every prop — story canvases cover that.

---

## Docs Page Template

```mdx
**Owner:** [Team Name]

## What problem does it solve?
[1–2 sentences: functional role]

## When & how to use it?
[Placement rules, conditions, constraints]

## Current usage
- [Page or context 1]
- [Page or context 2]

## Related components
[[ComponentA]], [[ComponentB]]

<Controls />

## Variants

**[Variant Story Name]**
[When is it used and why?]
Currently used: [where]
```

---

## Special Sections

**Technical Usage** — add when the component integrates with an external data system:
> The `items` prop array comes from [system name]. Each item requires [fields]. Optional `icon` renders SVG instead of text.

**Design rules** — add when a prop should only be used under specific conditions:
> **Play icon rule:** Only show the play icon on items that directly start playback. Never on items that link to a programme page.
