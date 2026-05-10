---
title: Framework Examples
tags:
  - guide
  - reference
---

# 00 — Framework Examples

**Purpose:** Concrete syntax translations. The other guide files use framework-agnostic pseudocode — use this file to translate patterns to your framework.

---

## Frameworks Covered

- **React CSF3** — `.stories.tsx` with TypeScript
- **Svelte CSF** — `.stories.svelte` with `@storybook/addon-svelte-csf`

Other frameworks (Vue, Angular, Web Components) follow the same CSF3 object structure as React — only the component reference and render function syntax differ.

---

## 1. Meta / Story Definition

### Pseudocode (used in guide files)
```
meta {
  component: Button
  title: "Components/Button"
  tags: ['autodocs']
}

Story: "Default"
  args: { label: "Click me", disabled: false }

Story: "Disabled"
  args: { disabled: true }
```

### React CSF3
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { label: 'Click me', disabled: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};
```

### Svelte CSF
```svelte
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    component: Button,
    title: 'Components/Button',
    tags: ['autodocs'],
  });
</script>

<Story name="Default" args={{ label: 'Click me', disabled: false }} />
<Story name="Disabled" args={{ disabled: true }} />
```

---

## 2. ArgTypes

### Pseudocode
```
argTypes: {
  variant: { control: 'select', options: ['default', 'ghost', 'destructive'] }
  size:    { control: 'select', options: ['sm', 'md', 'lg'] }
  onClick: { table: { disable: true } }
}
```

### React CSF3
```tsx
const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['default', 'ghost', 'destructive'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    onClick: { table: { disable: true } },
  },
};
```

### Svelte CSF
```svelte
<script module lang="ts">
  const { Story } = defineMeta({
    component: Button,
    argTypes: {
      variant: { control: 'select', options: ['default', 'ghost', 'destructive'] },
      size:    { control: 'select', options: ['sm', 'md', 'lg'] },
      onClick: { table: { disable: true } },
    },
  });
</script>
```

ArgTypes config is identical across frameworks — only the wrapping syntax differs.

---

## 3. Shared Template / Render Function

### Pseudocode
```
template(args) {
  render Button with args
}

Story: "Default" uses template
Story: "Disabled" uses template, args: { disabled: true }
```

### React CSF3
```tsx
const Template: Story = {
  render: (args) => <Button {...args} />,
};

export const Default: Story = { ...Template, args: { label: 'Click me' } };
export const Disabled: Story = { ...Template, args: { disabled: true } };
```

### Svelte CSF
```svelte
{#snippet template(args)}
  <Button {...args} />
{/snippet}

<Story name="Default" args={{ label: 'Click me' }} {template} />
<Story name="Disabled" args={{ disabled: true }} {template} />
```

---

## 4. Actions (Callback Wiring)

### Pseudocode
```
args: {
  onClick: action('onClick')
  onChange: action('onChange')
}
```

### React CSF3
```tsx
import { action } from '@storybook/addon-actions';

export const Default: Story = {
  args: {
    onClick: action('onClick'),
    onChange: action('onChange'),
  },
};
```

### Svelte CSF
```svelte
<script module lang="ts">
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    component: Button,
    args: {
      onClick: fn(),
      onChange: fn(),
    },
  });
</script>
```

> Svelte CSF uses `fn()` from `storybook/test` rather than `action()` from `@storybook/addon-actions`. Both log to the Actions panel.

---

## 5. Play Function

The `play()` body is identical across all frameworks. Only the story definition wrapper differs.

### React CSF3
```tsx
import { within, userEvent, expect } from '@storybook/test';

export const OpensOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(canvas.getByRole('dialog')).toBeVisible();
  },
};
```

### Svelte CSF
```svelte
<script module lang="ts">
  import { within, userEvent, expect } from 'storybook/test';
</script>

<Story
  name="Opens on Click"
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(canvas.getByRole('dialog')).toBeVisible();
  }}
/>
```

> Import path: React uses `@storybook/test`, Svelte CSF uses `storybook/test`.

---

## 6. Story-Level Parameters Override

### Pseudocode
```
Story: "Mobile View"
  parameters: {
    viewport: { defaultViewport: 'mobile' }
    layout: 'fullscreen'
  }
```

### React CSF3
```tsx
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
    layout: 'fullscreen',
  },
};
```

### Svelte CSF
```svelte
<Story
  name="Mobile View"
  parameters={{ viewport: { defaultViewport: 'mobile' }, layout: 'fullscreen' }}
/>
```

---

## 7. Docs Description

### React CSF3
```tsx
const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '**When to use:** ...\n\n**Related components:** Badge',
      },
    },
  },
};
```

### Svelte CSF
```svelte
<script module lang="ts">
  const { Story } = defineMeta({
    component: Button,
    parameters: {
      docs: {
        description: {
          component: '**When to use:** ...\n\n**Related components:** Badge',
        },
      },
    },
  });
</script>
```

The `parameters.docs.description.component` value is a markdown string — identical across frameworks.

---

## 8. Accessibility Rule Override

### React CSF3
```tsx
export const DecorativeIcon: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};
```

### Svelte CSF
```svelte
<Story
  name="Decorative Icon"
  parameters={{
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  }}
/>
```
