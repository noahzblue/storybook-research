---
title: Controls & Args
tags:
  - guide
---

# 04 — Controls & Args

**Question answered:** Which props should become controls, and which should stay hidden?

---

## Which Props to Expose

| Story type | Expose | Hide |
|---|---|---|
| **Default** | All props that change visible output or meaningful behaviour | Callbacks, analytics, browser-quirk, ref-forwarding props |
| **Variant** | The discriminating prop(s) that define the variant + any required structural props | Everything else |

Rule of thumb: default story = all meaningful controls. Variant story = 1–4 controls.

---

## Which Props to Hide

| Category | Examples | Why |
|---|---|---|
| Callback props | `onClick`, `onChange`, `onClose`, `onEscape` | Wire to Actions panel instead |
| Analytics / tracking | `statsContainer`, `dataAttributes`, `tracking` | Internal — not consumer-facing config |
| Browser quirk fixes | `disableAutoComplete`, `openInTopWindow` | Too specific to document as general usage |
| Ref forwarding | `setRef`, `ref`, `forwardRef` | Framework plumbing |
| Style escape hatches | `style` (inline), `className` (in variant stories) | Variants hardcode their class |

---

## Control Types

| Prop type | Control to use | Notes |
|---|---|---|
| `boolean` | Checkbox / toggle | Never use text for booleans |
| `string` | Text input | Textarea for long values (JSON, URLs, paragraphs) |
| `number` | Number input | Range slider for 0–100 values (progress %, opacity) |
| String enum | Select | Options = all valid enum values |
| `object` | JSON textarea | Expose as raw JSON string |
| `function`/callback | — (omit) | Wire to Actions panel instead |
| `node`/`ReactNode` | — (omit) | Hardcode in story template; not configurable via controls |

---

## Arg Defaults

Set realistic defaults — not empty strings, not `undefined`:
- ✅ `children: "Watch Live"` — real product copy
- ✅ `progress: 20` — meaningful non-zero value
- ✅ `itemsPerRow: { xs: 2, m: 3, xl: 4 }` — a real breakpoint config
- ❌ `children: "Button text"` — placeholder
- ❌ `progress: 0` — doesn't demonstrate the component

Defaults in the **default story** should represent the most common production configuration, not the simplest possible input.

---

## argTypes Configuration Patterns

```tsx
// Rename a prop in Controls panel (without changing the actual prop name)
argTypes: {
  children: { name: 'Button Text' },
  progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  indicatorTheme: {
    control: 'select',
    options: ['default', 'live', 'neutral', 'themed'],
  },
  // Hide a prop from controls entirely
  onClick: { table: { disable: true } },
  setRef: { table: { disable: true } },
}
```

---

## Args Across Story Variants

Variant story args inherit from the default story's `args` (via meta-level args). Override only what differs:

```tsx
// meta-level args (shared across all stories)
const meta = {
  args: {
    children: 'iPlayer',
    icon: 'play',
    primary: true,
  }
};

// Variant only needs its discriminating change
export const Disabled: Story = {
  args: { disabled: true }  // inherits icon, primary, children from meta
};
```

---

## The "Absent Prop = Design Guidance" Rule

When a variant story omits a prop from controls, that **absence is intentional**.

Example: a "standard episode" story has no `liveLabel` control.
Reading: "Standard episodes don't have live labels."

The knob set IS the design spec. Absence encodes guidance just as much as presence.

---

## Story-Level Generator Controls

For layout/container components, add a story-level arg that controls how many children are generated — not a component prop:

```tsx
// Story arg — not a component prop
args: { numberOfItems: 8 }

// Story template uses it to generate children
render: (args) => ({
  Component: Grid,
  props: { itemsPerRow: args.itemsPerRow },
  // Generate N ContentItem children from args.numberOfItems
})
```

Name it clearly to distinguish from actual props: `"Number of items"`, not `"items"`.

---

## Content Controls (Rare)

When the story's purpose is to try different text content (not different configurations), expose content as controls:

```tsx
argTypes: {
  'Option 1 Text': { control: 'text', defaultValue: 'Featured' },
  'Option 2 Text': { control: 'text', defaultValue: 'A-Z' },
  'Option 3 Text': { control: 'text', defaultValue: 'Most Recent' },
}
```

This is rare. Use only when the story's explicit purpose is "see this component with different content values."
