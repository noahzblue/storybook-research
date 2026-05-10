---
title: BBC iPlayer — Navigation
category: Navigation
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — Navigation

**Category:** Navigation
**Why study:** Active/selected state stories, complex data component, progressive enhancement variants.
**Storybook version:** v5/v6 (Knobs addon)

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Navigation ← default (closed nav, no active item)
3. On Channel Page
4. On Category Page
5. U 13 Childrens Variant
6. U 13 Childrens Variant With Active State
7. Java Script Disabled
8. U 13 Java Script Disabled
9. Low Support I Os 10

**Total: 1 Docs + 8 stories**

---

## Docs Page

### Structure

| Section | Content |
|---|---|
| Title + owner | "Navigation" / "Owner: Shared" |
| What problem does it solve? | "Allows users to navigate iPlayer." |
| When & how to use it? | "It is used across iPlayer." |
| Current usage | Global |
| Related components | ScrollableNav, Button, Link |
| **Technical Usage** | "The items prop array will come from the nav prefetcher which can also have an optional icon, which will render a top level item as an SVG instead of text" |
| Props | Main props table + nested sub-tables (see below) |
| Per-variant notes | Only "Navigation - No tvip-js" variant note present |

### New section: Technical Usage

**First component with a "Technical Usage" section.** Explains the data flow contract, not just the API. Tells developers WHERE the data comes from (nav prefetcher) and mentions an implementation detail (optional icon renders SVG). This appears for complex components that integrate with backend/data systems.

### Props — multiple nested tables

The docs contain 5 prop tables total:
1. **Main props** (items, renderOpen, variant, accessibilityHelpHref)
2. **Item Link Properties** (title, active, ariaLabel, href)
3. **Item Component Properties** (title, active, ariaLabel, id, subItems)
4. **Channels Component Properties** (title, active, ariaLabel, href, icon)
5. **Categories Component Properties** (title, active, ariaLabel, href, kind)

**Only 1 required prop:** `items: (ItemLink | ItemComponent)[]` — a union type array.

The `active` prop appears in every nested item type — the active state lives in the data, not as a top-level prop.

### Copy style

Minimal/terse ("Allows users to navigate iPlayer." / "It is used across iPlayer."). Far less descriptive than Button or ContentItem. Product docs written for engineers already familiar with the component.

---

## Story Analyses

### Navigation (default)

- **Intent:** Baseline — standard nav in closed/default state. No active items.
- **Canvas:** Full nav bar — "iPLAYER" logo left, "Channels ▾", "Categories ▾", "A-Z", "TV Guide", "My Programmes" right. Explanatory text below: "Some text underneath to demonstrate content being pushed down when the navigation is opened."
- **Controls: 0 knobs** — hardcoded fixture data, not configurable.
- **Actions:** None.
- **Accessibility:** 0 violations, 18 passes, 0 incomplete.
- **Interactions:** None.

---

### On Channel Page

- **Intent:** Show nav with Channels sub-nav open and an active channel highlighted.
- **Canvas:** Same nav bar + Channels item highlighted pink. Below nav: scrollable channels row — ONE, TWO, THREE, FOUR, RADIO 1, CBBC, **CBeebies** (highlighted blue/active), SCOTLAND, NEWS, PARLIAMENT, ALBA, S4C.
- **Controls (1 knob):** renderOpen: `true`
- **Active state:** CBeebies is `active: true` in the fixture data — hardcoded, not a knob.
- **KEY FINDING:** The active state lives in the fixture data (items array), not as a separate story prop or knob. You don't toggle active separately — you change the fixture.

---

### On Category Page

- **Intent:** Show nav with Categories sub-nav open and an active category highlighted.
- **Canvas:** Same nav bar + Categories item highlighted pink. Below nav: full grid of categories — Drama & Soaps, Films, Comedy, Documentaries | Sport, Entertainment, **Food** (highlighted pink/active), Lifestyle | Music, Arts, Science & Nature, History | News, From the Archive, Audio Described, Signed | Northern Ireland, Scotland, Wales | CBBC, CBeebies.
- **Controls (1 knob):** renderOpen: `true`
- **Active state:** Food category highlighted — hardcoded in fixture data.

---

### U 13 Childrens Variant

- **Intent:** Show the under-13 children's nav — completely different items and visual style.
- **Canvas:** "iPLAYER" logo, then text links "CBeebies", "CBBC", then icon+text items: "Trending" (flame icon), "Funny" (emoji icon), "Drama" (clapperboard icon), "Cartoons" (cartoon icon), "Watchlist" (bookmark icon).
- **Controls: 0 knobs** — hardcoded, no configurable props.
- **KEY FINDING:** Children's nav has icons in top-level items (the `icon` prop in ItemComponent). Completely different item set from adult nav.

---

### U 13 Childrens Variant With Active State

- **Intent:** Same as U 13 Childrens Variant but with one item in the active state.
- **Canvas:** Visually similar to U 13 Childrens Variant. Active item highlighted (hardcoded in fixture).
- **Controls: 0 knobs.**
- **KEY FINDING:** Active state = separate story. BBC creates a distinct story to show "what it looks like when an item is active" — even when the only difference is `active: true` in one fixture item.

---

### Java Script Disabled

- **Intent:** Show the no-JS / pre-JS loading fallback rendering.
- **Canvas:** Completely different layout — nav rendered as expanded flat list. "Channels ▾" text, then ALL channels visible horizontally (ONE, TWO, THREE, FOUR, RADIO 1, CBBC, CBeebies, SCOTLAND, NEWS, PARLIAMENT, ALBA, S4C). Then "Categories ▾" with ALL categories expanded in a multi-column grid. Then "A-Z", "TV Guide", "My Programmes" as plain text links.
- **Controls: 0 knobs.**
- **KEY FINDING:** BBC explicitly stories their progressive enhancement / no-JS state. This is a technical/QA story — confirms the fallback renders all links accessible without JavaScript. The "tvip-js" prefetcher is referenced in docs.

---

### U 13 Java Script Disabled

- **Intent:** Children's nav no-JS fallback.
- **Canvas:** Children's nav items rendered expanded without JS drawer.
- **Controls: 0 knobs.**

---

### Low Support I Os 10

- **Intent:** Legacy CSS rendering for iOS 10 (limited CSS feature support).
- **Canvas:** Visually identical to default Navigation (closed nav). Difference is internal — CSS fallbacks applied for old iOS browser compatibility.
- **Controls: 0 knobs.**
- **KEY FINDING:** BBC stories legacy browser compatibility explicitly. "Low support" = reduced CSS features for old browsers, not a visual change.

---

## Theming / Tokens

- **Active item colour:** Pink highlight on top-level nav items when active. Blue highlight for channel items in sub-nav.
- **Children's nav:** Uses same pink brand colour. Has icon SVGs with the navigation items.
- **No Design tab content:** No Figma designs linked.
- **Context text in canvas:** Every story includes "Some text underneath to demonstrate content being pushed down when the navigation is opened" — explicitly shows the layout impact of the drawer/sub-nav expanding.

---

## Patterns & Observations

1. **Complex data components = mostly no-knob stories.** Navigation has 6/8 stories with 0 knobs. When the component takes a structured data array (not simple string/boolean props), BBC doesn't try to make it configurable via knobs — they use hardcoded fixtures instead.

2. **Active state in fixture, not as a top-level knob.** The `active` state is in the items data array. No "activeItem" prop on the component. Stories that show active state are separate fixtures with `active: true` in the relevant item — not toggling a knob.

3. **Stories cover environmental/technical variants, not just visual ones.** JavaScript Disabled, Low Support iOS 10, U 13 variants — these aren't about "what does button look like when disabled" but "what does this component render in a specific technical context." BBC uses Storybook as QA coverage for progressive enhancement and legacy browser support.

4. **Audience segments = separate stories.** Under-13 and 14+ have separate story sets (U 13 Childrens Variant, U 13 Java Script Disabled). Not a `variant="children"` knob — completely separate fixture+story set. This makes the variants explicit and reviewable side-by-side.

5. **"Technical Usage" in docs for data-driven components.** When a component's data comes from an external system (nav prefetcher), BBC documents the data flow contract explicitly. Not just "this prop accepts an array" but "this array comes from the nav prefetcher."

6. **`renderOpen` as knob = toggle sub-nav visibility.** The only user-facing knob. Confirms the sub-nav open/closed state IS a component prop (unlike Modal's open/close state which is external).

7. **Context annotation in canvas.** Text label in canvas ("Some text underneath to demonstrate content being pushed down...") is documentary text added specifically for the story — not real product content. BBC uses it to show side-effects of the component (layout push).

8. **Variant prop exists but not exposed as knob.** The `variant` prop (from docs) is how the children's nav vs adult nav is distinguished. Not exposed as a knob — children's stories have it hardcoded.

---

## Key Findings Summary

- **Story count:** 8 stories
- **How active/current state is shown:** Hardcoded in fixture data (`active: true` in items array). No knob.
- **Responsive behavior stories:** Not shown directly — `renderOpen: true` shows expanded sub-nav.
- **Progressive enhancement:** Explicitly storied — JavaScript Disabled and Low Support iOS 10 stories.
- **Knob count:** 0 knobs for 6/8 stories. Only `renderOpen` (boolean) for 2 stories. Complex data = hardcoded fixtures.
- **Docs style:** Minimal/terse — "Allows users to navigate iPlayer." Least descriptive of all components studied. Has unique "Technical Usage" section for data flow contract.
- **Audience segmentation:** U-13 children's nav = separate stories, not a knob variant.
