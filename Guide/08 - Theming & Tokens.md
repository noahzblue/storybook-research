---
title: Theming & Tokens
tags:
  - guide
---

# 08 — Theming & Tokens

**Question answered:** How should design tokens and themes appear in Storybook stories?

---

## How Tokens Show Up in Stories

Tokens appear in stories as **named values** — never raw hex/px values. This makes the story's intent legible and ties the visual output to the design system.

| Pattern | Example | When to use |
|---|---|---|
| Named string enum | `indicatorTheme: "live"` | Semantic variants with distinct meanings |
| Named scale token | `size: "lg"`, `fontSize: "large"` | Size/type scale with named steps |
| Boolean modifier | `tall: true`, `transparent: true` | Single-axis visual modification |
| CSS class modifier | `className: "component--variant"` | Legacy CSS-class-based theming |

---

## Theme Switching

Set up a global theme switcher in `.storybook/preview.ts`:

```tsx
parameters: {
  themes: {
    list: [
      { name: 'Light', class: 'theme-light', color: '#ffffff' },
      { name: 'Dark', class: 'theme-dark', color: '#0d0d0d' },
    ],
    default: 'Light',
  }
}
```

Story-level override for components that only make sense on a specific background:
```js
// Story: "On Dark Background" — see Guide 00 for framework story wrapper syntax
parameters: { themes: { default: 'Dark' } }
```

---

## Color Stories

Don't create a separate "colors" story on every component. Color comes from tokens — demonstrate it via the variant that uses that token:
- `indicatorTheme: "live"` → "Live" story shows the live colour
- `transparent: true` → "Transparent" story shows no-fill state

When a component has multiple colour modes with distinct product contexts, each gets its own story. When colour is just an enum value with no distinct use case, expose it as a control on the default story only.

---

## Dark Mode / Light Mode Pattern

All stories for a themed product should render on the **same background as production**. Don't mix dark/light backgrounds across stories for the same component — it creates false visual inconsistency.

For dual-theme components:
1. Set the project's primary theme as the global default
2. Use story-level theme override for stories demonstrating the alternate theme
3. Or: create paired stories ("Default", "Default (Light)") if both modes are equally common

---

## Token Documentation in Storybook

Document valid token values in the **Type column** of the props table — not in the description:

```
| indicatorTheme | false | "default" | "live" | "neutral" | "themed" | Changes bar colour |
| size           | false | "sm" | "md" | "lg"                         | Component size     |
```

This makes valid values visible at a glance. Union type syntax: `"value1" | "value2" | "value3"`.

---

## Hardcoded Token Values in Variant Stories

When a variant story demonstrates a specific token, hardcode it in the story args — don't expose it as a control:

```js
// Story: "Live" — hardcoded theme, no control
// See Guide 00 for framework story wrapper syntax
args: {
  progress: 20,
  indicatorTheme: 'live',   // ← hardcoded, not in argTypes
}
```

The token control belongs in the **default story** for exploration. Variant stories lock it down to show one intentional configuration.

---

## Story Background Consistency

Set a consistent canvas background matching your production theme:

```tsx
// .storybook/preview.ts
parameters: {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0d0d0d' },
      { name: 'light', value: '#ffffff' },
    ],
  }
}
```

Components designed for dark backgrounds that render on white look broken — always match production context.
