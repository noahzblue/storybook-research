---
title: Interactions & Play
tags:
  - guide
---

# 07 — Interactions & Play

**Question answered:** When and how to write `play()` functions for interaction testing?

---

## What play() Is For

`play()` runs after the story renders. It simulates user interactions and can make assertions. Use it to:
- Reach states that **require interaction** to trigger (open overlay, submit form)
- **Verify a flow works** end-to-end (fill → submit → see result)
- **Automate visual regression** checkpoints at a post-interaction state
- **Test that callbacks fire** at the right moment with the right data

---

## When to Write a play() Function

| Use play() | Don't use play() |
|---|---|
| Open/close state of an overlay (test the trigger works) | Visual states reachable via props (`disabled: true`) |
| Form submission and error display | Variants that hardcode the end state via args |
| Multi-step flows (wizard steps, stepper, onboarding) | Simply demonstrating that a prop exists |
| Verifying callback fires with correct arguments | Static components with no interactive state change |
| Hover/focus states that can't be reached via props | Any state you can show via `args` alone |

---

## When NOT to Write play()

If the end state is reachable via `args`, **use args** — not play():

```tsx
// Don't do this:
export const Open: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
  }
}

// Do this instead:
export const Open: Story = {
  args: { open: true }  // if the component has an `open` prop
}
```

play() is for states you **can't reach with props**. If you can show it with args, do that.

---

## play() Anatomy

```tsx
import { within, userEvent, expect } from 'storybook/test';

export const FormSubmission: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);   // scope queries to this story

    await step('Fill the form', async () => {
      await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
      await userEvent.type(canvas.getByLabelText('Password'), 'secret');
    });

    await step('Submit', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Sign In' }));
    });

    await step('Verify success state', async () => {
      await expect(canvas.getByText('Welcome back!')).toBeVisible();
    });
  }
};
```

Key rules:
- Use `within(canvasElement)` — not global `screen` — scope queries to the story canvas
- Use `step()` to label phases — visible in the Interactions panel
- `userEvent` for realistic interactions (fires all browser events)
- `expect` for assertions — story fails in CI if assertions fail

---

## Common Interaction Patterns

### Open/Close Overlay
```tsx
// Option A: Always-open via args (visual doc — simplest)
export const Open: Story = { args: { open: true } }

// Option B: play() test (verifies the trigger mechanism works)
export const OpensOnTriggerClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open Modal' }));
    await expect(canvas.getByRole('dialog')).toBeVisible();
  }
}
```

Use Option A for visual documentation. Use Option B to test the trigger.

### Form Validation Error
```tsx
export const ShowsValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    await expect(canvas.getByText('Email is required')).toBeVisible();
  }
}
```

### Focus State
```tsx
export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByRole('button').focus();
  }
}
```

---

## Naming play() Stories

Name by the flow being tested, not the mechanism:
- ✅ "Submits Form Successfully"
- ✅ "Shows Error on Empty Submit"
- ✅ "Opens and Closes on Escape Key"
- ❌ "Default With Play"
- ❌ "Interaction Test"

---

## BBC iPlayer Usage (or Absence)

BBC's Storybook was v5/v6 — the play() API didn't exist yet. They handled overlay state (Modal) by rendering always-open via a hardcoded open state — **Option A** above. This is still a valid approach for visual documentation.

Modern Storybook (v7+) supports play(). Use it when you need to test interactive flows, not just static states.
