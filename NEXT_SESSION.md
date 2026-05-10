# Next Session — Storybook Phase 10

## Context

codec/ui Storybook at `http://localhost:6006`. Run with `bun run storybook`.
Branch: `fix/link-page-ui`. Working dir: `/Users/mj/work/codec/ui`.

Phase 9 committed (`89a8eb7`): 13 new stories added, sidebar hover fixed.

---

## Priority fixes (all reviewed + approved by user)

### 1. argTypes — show only custom props (ALL stories)

**Problem:** Docs pages too long because argTypes exposes all native HTML props automatically.
**Rule:** Only declare props the component author added. Exclude or omit native HTML props.
**Fix pattern:**
- Audit every story file
- Remove argType declarations for native HTML props (e.g. `class`, `id`, `style`, `onclick`, `onchange`, etc.)
- If a native prop bleeds through automatically, add it to argTypes with `table: { disable: true }` to hide it
- **Only show: authored props + event callbacks the story actually uses**

### 2. Dialog story — trigger button, not pre-opened

**File:** `src/stories/dialog/dialog.stories.svelte`
**Problem:** Playground story shows dialog already open. Should show a trigger button.
**Fix:** Default `open={false}`, show a `<Dialog.Trigger>` button as the primary interaction. Dev sees: button → click → modal opens.

### 3. Badge default color

**File:** `src/stories/badge/badge.stories.svelte` + `src/lib/components/ui/badge/badge.svelte`
**Problem:** Default variant uses primary bg (lime green) — white text on lime is hard to read.
**Fix:** Change default variant to a more neutral color (e.g. zinc/dark). Primary/lime color can still be used when explicitly passed from parent (e.g. CardBanner uses it that way).

### 4. Toast scroll shake

**File:** `src/stories/sonner/sonner.stories.svelte`
**Problem:** When toast appears, scrollbar pops in causing layout shift (UI shake).
**Fix:** Add `overflow: hidden` or `overflow-y: scroll` on the story wrapper to prevent reflow.

### 5. Show code — no wrapper divs

**Problem:** "View Code" in Storybook shows the story template including wrapper `<div>` containers that are story scaffolding, not real usage.
**Fix:** Use `asChild` stories where possible. For stories with wrapper divs, move the demo wrapper OUT of the template and into the story decorator or use `parameters.docs.source.code` to override the shown code snippet with clean usage example.

### 6. Sidebar hover — verify fix

The `colorPrimary`/`colorSecondary` change in `manager.ts` should fix white-on-white hover.
**First action:** Open Storybook and hover sidebar items to confirm readable contrast.

### 7. Breadcrumb story — restructure

**File:** `src/stories/bread_crumb/bread-crumb-container.stories.svelte`
**Problem:** Too many substories, not well thought out.
**Action:** Read the file first, then simplify to: Playground + key variant stories only.

### 8. CodeBlock — extend language syntax highlighting

**File:** `src/lib/components/codeblock/codeblock.svelte`
**Problem:** Only a few languages have syntax highlighting. Python and others show plain text.
**Action:** User will provide library docs. Wait for user to share before implementing.

---

## Workstream 3 — Prop API fixes (still pending user approval)

Say **"implement WS3 fixes"** to apply:
1. `CardBanner` — add `src?: string` prop, fall back to `moonBanner`
2. `CardPreset` — derive `showFooter` from `price || rating`, drop boolean
3. `SheetContainer` — remove dead `brandHeader` prop
4. `CodeBlock` — change `w-[35rem]` to `w-full`
5. `VariantTableSecondary` — add `fallbackContent?: Snippet`

## Workstream 4 — Story logic fixes (still pending user approval)

Say **"implement WS4 fixes"** to apply:
1. `RadioGroup` stories — add `aria-label` to each `RadioGroupItem`
2. `Sheet` story — add `Playground` story as first story

---

## WS2 — Remaining (low priority)

| Component | Notes |
|---|---|
| Chart | Complex — uses `layerchart` or `chartjs`. Read source first. |
| Menubar | Large compound component. Low priority. |
| NavigationMenu | Partially covered by Navbar. Low priority. |

---

## Reference

- STORYBOOK_GUIDE.md at repo root
- Existing stories: `src/stories/` — templates
- CSS vars: `src/app.css`
- Storybook config: `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/manager.ts`
