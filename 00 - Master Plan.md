---
title: Master Plan
tags:
  - meta
  - active
---

# Storybook Research — Master Plan

## Goal

Reverse-engineer how a production-grade Storybook (BBC iPlayer) is built, then extract the universal patterns into a reusable implementation guide that can be applied to any future project from scratch.

## Research Source

BBC iPlayer Component Library Storybook — a large, mature, production Storybook with 49+ components across multiple categories.

---

## What We Are Building

A set of focused guide files (see `/Guide/`) that answer one question each. Together they form a complete implementation reference. When starting a new project, open the relevant guide file — not one massive wall of text.

```
storybook-research/
  00 - Master Plan.md              <- this file
  Guide/
    01 - Story Philosophy.md
    02 - File & Folder Structure.md
    03 - Docs Page.md
    04 - Controls & Args.md
    05 - Actions.md
    06 - Accessibility.md
    07 - Interactions & Play.md
    08 - Theming & Tokens.md
    09 - Story Count Rules.md
  bbc-reference/
    Button.md                      <- Simple Interactive
    ContentItem.md                 <- Data Display
    Modal.md                       <- Overlay
    Navigation.md                  <- Navigation
    FormElement.md                 <- Form / Input
    Icon.md                        <- Icon / Media
    Layout.md                      <- Layout / Container
    Feedback.md                    <- Feedback / Status
```

---

## Research Method

Use Playwright MCP to navigate BBC iPlayer Storybook directly.

For each component, capture the following in its `bbc-reference/` file:

### Structure
- Full sidebar story tree (every story name, exact order)
- Story groupings and hierarchy

### Per Story
- **Intent** — what use case / question does this story answer?
- **Canvas** — what renders, what makes it distinct from adjacent stories
- **Controls tab** — props shown, control types (text / select / boolean / number / color), props hidden or disabled
- **Actions tab** — callbacks wired, naming patterns
- **Accessibility tab** — violations, disabled rules
- **Interactions tab** — play() steps or absence

### Docs Page
- Headings and sections
- Props table — names, types, defaults, descriptions
- Is copy prescriptive ("use when X") or descriptive ("this prop does Y")?

### Theming / Tokens
- How colors surface in stories
- How spacing / size variants appear
- Dark mode / theme switching behavior

---

## Component Categories

One representative component per category — broad pattern coverage across component types.

| Category | Component | Why |
|---|---|---|
| Simple Interactive | Button | Baseline — states, variants, disabled |
| Data Display | ContentItem | Many props, real fixture data |
| Overlay | Modal | Open/close state without play() |
| Navigation | Navigation | Active/selected state stories |
| Form | FormElement (Input or Checkbox) | Validation states — error/valid/disabled |
| Icon / Media | Icon | Visual-only — what DO you story here? |
| Layout / Container | Layout component | Structural — how stories work without visual output |
| Feedback / Status | Spinner or Badge | Minimal state components |

---

## Key Questions to Answer

These unknowns drive the research. Every guide file should answer at least one of these.

1. **Controls panel** — all props exposed or selective? How do they choose what to hide?
2. **Story-per-state vs prop toggle** — where is the line? Button disabled = story. Icon position = story or knob?
3. **Docs page intent** — prescriptive ("use when X") or descriptive ("this prop does Y")?
4. **Composition stories** — isolated component vs real-page context — when do they show context?
5. **Edge case stories** — long text, empty content, many items — how many, which types?
6. **Naming granularity** — "With Icon On Right" — story or knob combo?
7. **Story count pattern** — why does Button have N stories? Is there a formula?
8. **Theming** — how do tokens appear in stories? Are there theme-switching stories?

---

## Phase Status

| Phase | Status | Description |
|---|---|---|
| Phase 1 | Done (old session) | BBC surface scan — 49 components catalogued |
| Phase 2 | Done (old session) | High-level deep dives on 4 components |
| Phase 3 | Scrapped | Old guide files deleted — starting fresh |
| Phase 4 | **COMPLETE** | Story anatomy research — all 8 components done |
| Phase 5 | **COMPLETE** | Extract patterns → fill Guide/ files |
| Phase 6 | **COMPLETE** | Apply to codec/ui |

---

## Next Session — Start Here

**Phase 6 COMPLETE.**

Workstream 1 — docs copy updated in all 9 existing story files (prescriptive "when/why" format, per-variant notes, related components).

Workstream 2 — 5 new story files created:
- `src/stories/dialog/dialog.stories.svelte` — 5 stories, play() tests for open/close
- `src/stories/progress/progress.stories.svelte` — 7 stories, value range matrix
- `src/stories/avatar/avatar.stories.svelte` — 6 stories, fallback + sizes
- `src/stories/accordion/accordion.stories.svelte` — 10 stories, single/multiple/locked/keyboard
- `src/stories/sheet/sheet.stories.svelte` — 7 stories, all 4 sides + play() tests

---

## Rules for This Vault

- Files stay clean and scannable — use tables and short bullets, not prose walls
- `bbc-reference/` files = raw research, not polished
- `Guide/` files = polished, universal, no BBC-specific language
- No half-finished sections — mark incomplete sections with `> STATUS: PENDING`
- Update phase status table above as work progresses
