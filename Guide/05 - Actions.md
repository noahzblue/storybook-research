---
title: Actions
tags:
  - guide
---

# 05 — Actions

**Question answered:** When should event callbacks be wired to the Actions panel?

---

## What Goes in Actions

Wire a callback to Actions when the component fires an event that **consumers are expected to handle**.

The Actions panel logs these calls, making the component's event contract visible and testable in isolation — without needing a parent component to observe them.

---

## When to Wire Actions vs Ignore Callbacks

| Wire to Actions | Don't wire |
|---|---|
| User-initiated events consumers must handle (`onClick`, `onChange`, `onSubmit`) | Internal lifecycle events not part of the public API |
| Events that return meaningful data (selected value, index, form data) | Callbacks that are only relevant inside a specific parent component |
| Events documented in the props table | Browser events the component merely passes through transparently |

---

## Naming Conventions for Action Handlers

Name the action the same as the prop — no prefixes, no renaming:

```tsx
args: {
  onClick: action('onClick'),
  onChange: action('onChange'),
  onClose: action('onClose'),
  onEscapeKeyPress: action('onEscapeKeyPress'),
}
```

This makes the Actions panel immediately readable: "onClick fired" — not "handleClick fired" or "on-click fired."

---

## Which Story to Wire Actions In

Wire actions in the **default story** (full configuration surface). Variant stories generally omit action wiring — their purpose is visual demonstration.

Exception: if a variant story exists specifically to demonstrate an interaction (e.g. "Form Validates on Submit"), wire the relevant action in that story too.

---

## Actions Configuration Patterns

```tsx
// Option A: Per-story args (explicit)
export const Default: Story = {
  args: {
    onClick: action('onClick'),
    onChange: action('onChange'),
  }
}

// Option B: Auto-detect from argTypes (cleaner for many callbacks)
const meta: Meta = {
  argTypes: {
    onClick: { action: 'onClick' },
    onChange: { action: 'onChange' },
  }
}

// Option C: Auto-wire all on* props (Storybook global config)
// In .storybook/preview.ts:
// parameters: { actions: { argTypesRegex: '^on[A-Z].*' } }
```

Option C is the most convenient but can wire internal props you don't want logged. Option A is the most explicit.

---

## Actions vs Interactions (play())

| Actions panel | Interactions (play()) |
|---|---|
| Shows that a callback **fires** | Shows that a **flow works** end-to-end |
| Manual testing — user clicks, panel logs | Automated — play() simulates the user |
| No assertions | Assertions via `expect()` |
| Always useful for interactive components | Use when the interaction is complex or must be verified automatically |

Use both on the same story when appropriate: Actions logs the event, play() verifies the outcome.
