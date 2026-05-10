---
title: File & Folder Structure
tags:
  - guide
---

# 02 — File & Folder Structure

**Question answered:** How should Storybook files and folders be organised?

---

## Folder Structure

```
# Co-located (recommended)
src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx    ← next to component

# Centralised (alternative)
src/
  stories/
    Button/
      button.stories.tsx
```

Choose one pattern and be consistent across the project.

---

## File Naming

- Match the component name exactly: `Button.stories.tsx`, `ContentItem.stories.tsx`
- One stories file per component — never split one component's stories across multiple files
- Extension: `.stories.tsx` / `.stories.ts` / `.stories.svelte` — match your project framework

---

## Sidebar Grouping

The `title` field controls sidebar hierarchy:

| `title` value | Sidebar placement |
|---|---|
| `"Button"` | Top-level |
| `"Components/Button"` | Under "Components" group |
| `"Components/Form/Dropdown"` | Nested two levels deep |

Recommended category structure:

```
Components/
  Interactive/    ← buttons, toggles, chips
  Form/           ← inputs, selects, checkboxes, radio
  Navigation/     ← nav bars, breadcrumbs, tabs, pagination
  Feedback/       ← spinners, progress, badges, alerts
  Layout/         ← grid, stack, container, divider
  Overlay/        ← modal, dialog, drawer, tooltip, popover
  Icon/           ← icons, avatars, media
  Data/           ← cards, tables, list items
```

---

## Story Title Patterns

| Pattern | Use when |
|---|---|
| `"ComponentName"` | Small project, flat structure fine |
| `"Category/ComponentName"` | Multiple components — group by type |
| `"Category/Subcategory/ComponentName"` | Large library with sub-groupings |

Keep depth to 2–3 levels max. Deeper nesting makes the sidebar unwieldy.

---

## Story Ordering Within a File

Stories render in export order:
1. **Docs** — auto-generated first via `tags: ['autodocs']`
2. **Default** — baseline story, full configuration surface
3. **Variant stories** — ordered: most common use case → less common → edge cases → technical/environment

---

## MDX vs CSF — When to Use Which

| Format | Use when |
|---|---|
| **CSF** (`.stories.ts/tsx/svelte`) | Standard — component stories with auto-generated Docs |
| **MDX** (`.mdx`) | Custom Docs pages needing prose, diagrams, or code examples beyond what autodocs generates |

Default to CSF + `tags: ['autodocs']`. Only reach for MDX when you need things autodocs can't provide.

---

## Owner Annotation

Document component ownership in story metadata:

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '**Owner:** Platform Team\n\nWhat this component does.',
      },
    },
  },
};
```

Ownership tells consumers who to contact for changes.
