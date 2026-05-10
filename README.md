# Storybook Research Vault

Universal implementation guide for production-grade Storybook — extracted from deep-diving a large, mature component library (BBC iPlayer, 49+ components).

## What This Is

A set of focused reference files that answer one question each. Use them when starting a new project, adding stories to an existing one, or reviewing story quality.

## Structure

```
Guide/               ← Universal patterns — no framework-specific language
  00 - Framework Examples.md   ← React CSF3 + Svelte CSF code translations
  01 - Story Philosophy.md     ← What is a story? Story vs knob decision
  02 - File & Folder Structure.md
  03 - Docs Page.md            ← What goes in Docs, how to write it
  04 - Controls & Args.md      ← Which props to expose, control types
  05 - Actions.md              ← When to wire callbacks to Actions panel
  06 - Accessibility.md        ← a11y in stories
  07 - Interactions & Play.md  ← When/how to write play() functions
  08 - Theming & Tokens.md     ← Design tokens and theme switching
  09 - Story Count Rules.md    ← How many stories? What drives the count?

bbc-reference/       ← Raw research notes — component-by-component deep dives
  Button.md          ← Simple Interactive
  ContentItem.md     ← Data Display
  Modal.md           ← Overlay
  Navigation.md      ← Navigation
  FormElement.md     ← Form / Input
  Icon.md            ← Icon / Media
  Layout.md          ← Layout / Container
  Feedback.md        ← Feedback / Status
```

## How to Use

**Starting from scratch:** Read `01` → `02` → `09` in order. Then reference the others as needed.

**Adding stories to an existing component:** Start with `01` (story vs knob decision), then `09` (how many), then `04` (controls).

**Writing Docs copy:** `03`.

**Adding play() tests:** `07`.

**Framework syntax:** All guide files use framework-agnostic pseudocode for story definitions. See `00 - Framework Examples` for React CSF3 and Svelte CSF concrete implementations.

## Key Questions This Answers

1. What is a story, and what should it show?
2. Story vs control — when do I add a new story vs a knob?
3. How many stories should this component have?
4. Which props go in argTypes?
5. How do I write the Docs page?
6. When do I write a play() function?
7. How do I handle accessibility in stories?
8. How do tokens and theming appear in stories?
