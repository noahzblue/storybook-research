---
title: Accessibility
tags:
  - guide
---

# 06 — Accessibility

**Question answered:** How do you handle accessibility in stories?

---

## What the Accessibility Tab Shows

The a11y addon (powered by axe-core) runs on every story and reports:

| Result | Meaning | Action |
|---|---|---|
| ✅ **Pass** | Rule checked, component passes | None |
| ❌ **Violation** | Accessibility failure | Fix the component or story |
| ⚠️ **Incomplete** | axe couldn't determine pass/fail | Review manually |
| — **Disabled** | Rule excluded | Confirm it's intentional and documented |

Target: **0 violations on every story**, especially the default story.

---

## Common Violations and Fixes

| Violation | Common cause | Fix |
|---|---|---|
| Missing accessible name | Icon button with no label | Add `aria-label` or required `label` prop |
| Form input not labelled | `<input>` without associated `<label>` | Wire `htmlFor`/`id` or add `aria-label` |
| Insufficient colour contrast | Light text on light bg, or dark on dark | Fix colour values or use tokens with guaranteed contrast |
| Interactive element not focusable | Custom div with onClick | Use semantic `<button>` or add `tabIndex` + keyboard handlers |
| `<img>` missing alt text | Decorative or content image | Add `alt=""` for decorative, descriptive `alt` for content |
| Dialog missing role | Modal without `role="dialog"` | Add `role="dialog"` + `aria-labelledby` |

---

## When to Disable a Rule

Only disable when:
1. The component is **intentionally inaccessible in isolation** (e.g. a decorative icon story) but accessible in context
2. The story adds **dummy content that can't pass** a specific rule (e.g. colour contrast of a placeholder)

Always document why:

```tsx
parameters: {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: false,
          // Reason: decorative-only element, aria-hidden in production context
        }
      ]
    }
  }
}
```

Never disable rules globally without a documented reason per-rule.

---

## Accessibility Config Per Story

Override a11y config at story level (not globally) when a specific story has known exceptions:

```js
// Story: "Decorative Icon" — see Guide 00 for framework story wrapper syntax
parameters: {
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } }
}
```

---

## WCAG Level Targets

| Level | Standard | When |
|---|---|---|
| **AA** | Minimum acceptable | All production components |
| **AAA** | Enhanced | Where achievable without sacrificing usability |

Storybook a11y addon defaults to checking WCAG 2.x AA rules.

---

## Accessibility by Component Type

| Type | Key requirements |
|---|---|
| Interactive (button, link) | Accessible name, keyboard focusable, visible focus state |
| Form input | Label associated via `htmlFor`/`id`, error states announced via `aria-describedby` |
| Overlay (modal, dialog) | `role="dialog"`, `aria-labelledby`, focus trapped, `Escape` closes |
| Navigation | `<nav>` landmark, `aria-current="page"` on active item |
| Icon (visual-only) | `aria-hidden="true"` if decorative — OR — visible accessible label if meaningful |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Live content | `aria-live` region for dynamic updates |

---

## Baking a11y Into the Component API

If a component is meaningless without an accessible label, make the label prop **required** — not optional:

```tsx
// Required label — component cannot render accessibly without it
type ChevronProps = {
  type: 'previous' | 'next'
  label: string   // required — visually hidden, read by screen readers
  disabled?: boolean
}
```

This turns a11y from a "please remember to add this" into a compile-time contract.

Document it in the props table:
> `label` — **required** — Visually hidden accessible label for screen readers.
