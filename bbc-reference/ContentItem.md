---
title: BBC iPlayer — ContentItem
category: Data Display
tags:
  - bbc-reference
  - research
  - complete
---

# BBC iPlayer — ContentItem

**Category:** Data Display
**Why study:** Many props, real fixture data — shows how to handle complex, data-rich components with multiple contextual variants.
**Storybook version:** v5/v6 (Knobs addon)

---

## Sidebar Story Tree

Order (exact):
1. Docs
2. Content Item ← default/baseline
3. Standard Episode
4. Programme
5. All Episodes
6. Promotion
7. Tleo Episode
8. Watching
9. This Episode

**Total: 1 Docs + 8 stories**

---

## Docs Page

### Structure (top to bottom)

| Section | Content |
|---|---|
| Title + owner | "ContentItem" / "Owner: Shared" |
| What problem does it solve? | "Content items provide an image and information about an episode/programme to help the user choose what to watch. They provide onward journeys to the episode page or relevant URL depending on the variant." |
| When & how to use it? | "Used when a preview of content is required for either an episode or programme. Grid view or carousel. Additional links/actions may accompany." |
| Play icon (sub-section) | "The play icon should only show on content items that start playback of content." — prescriptive rule |
| Current usage | TIP Playback (just one entry) |
| Related components | Progress, Icon, Link, LiveLabel, Carousel, ActionableContainer, Confirmation |
| Props | Full props table (see below) |
| Per-variant notes | One block per variant story: "When is this variant used and why?" + "Where is it currently used?" |

### Copy style

**Prescriptive + rule-giving.** Includes a dedicated sub-section ("Play icon") that gives a specific usage rule — not a prop description but a design constraint. Copy explicitly says where on the product each variant appears.

### Props table

| Prop | Required | Type | Description |
|---|---|---|---|
| className | false | string | Class name to add |
| title | **true** | string | Main title, e.g. "Wild Alaska Live" |
| itemsPerRow | **true** | object | Per-breakpoint count, e.g. {xs:2, m:3, xl:4} |
| imageTemplate | **true** | string | iChef recipe URL with `{recipe}` placeholder |
| href | false (true when RouterLink present) | string or To | URL or router To object |
| subtitle | false | string | Episode subtitle |
| synopsis | false | string | Shown on hover |
| primaryLabel | false | string | Label above title, left |
| secondaryLabel | false | string | Label above title, right of primary |
| durationSubLabel | false | string | Below subtitle, e.g. "60 MINS" |
| secondarySubLabel | false | string | Below subtitle, right of duration |
| progressPercent | false | integer | Progress bar width % |
| liveLabel | false | string | Live label — top-left of image + hover |
| liveLabelNoPulse | false | boolean | Suppress pulsing icon |
| showPlayIcon | false | string | "hover", "always", or "never" (default) |
| secondaryCta | false | component | Component under main content |
| background | false | boolean | Show background behind item |
| listWhenSmall | false | boolean | List view at xs/s breakpoints |
| dimmed | false | boolean | Dimmed appearance |
| disableOverlay | false | boolean | Disable hover overlay |
| dataAttributes | false | object | data-* attributes |
| routerLink | false | component | react-router-dom Link |
| onClick | false | function | Click handler |
| setRef | false | function | Forwarded ref |
| openInTopWindow | false | boolean | `target="_top"` for iFrame contexts |
| renderMediumStyle | false | boolean | Force low-breakpoint style |

**3 required props:** title, itemsPerRow, imageTemplate. Everything else optional.

---

## Story Analyses

### Content Item (default)

- **Intent:** Full-configuration kitchen-sink — shows ALL features at once: live label, progress, secondary CTA, all metadata.
- **Canvas:** Bodyguard thumbnail with "LIVE" badge top-left, "Full Series | Drama" labels, "Bodyguard" title, synopsis, "View all episodes" secondary CTA.
- **Controls (23 knobs — all props exposed):**
  - title: "Bodyguard"
  - itemsPerRow: `{"xs":2,"m":3,"xl":4}`
  - imageTemplate: `https://ichef.bbci.co.uk/images/ic/{recipe}/p06j4zb7.jpg`
  - href: full episode URL
  - subtitle: "Box Set. He has to keep her safe..."
  - synopsis: "From the writer of Line of Duty..."
  - primaryLabel: "Full Series"
  - secondaryLabel: "Drama"
  - durationSubLabel: "58 mins"
  - secondarySubLabel: "Available for 30 days"
  - progress: 20 (range slider 0–100)
  - liveLabel: "Live"
  - liveLabelNoPulse: false
  - showPlayIcon: "none" (select: always/hover/none)
  - secondaryCta: "View all episodes"
  - background: false
  - listWhenSmall: true
  - dimmed: false
  - disableOverlay: false
  - dataAttributes: `{"prop":"value"}`
  - className: "some-class"
  - openInTopWindow: false
  - renderMediumStyle: false
- **Actions:** None wired.
- **Accessibility:** 0 violations, 14 passes, 1 incomplete.
- **Interactions:** None.

---

### Standard Episode

- **Intent:** Most common use case — episode link in grids and carousels.
- **Canvas:** "People Just Do Nothing" — thumbnail, "Last chance | Comedy", "1/6 Is this the end for Kurupt FM?" subtitle.
- **Controls (11 knobs — data props only):** title, itemsPerRow, imageTemplate, href, subtitle, synopsis, primaryLabel, secondaryLabel, durationSubLabel, secondarySubLabel, liveLabel
- **Default values:** primaryLabel="Last chance", secondaryLabel="Comedy", subtitle="1/6 Is this the end for Kurupt FM?", durationSubLabel="28 mins", secondarySubLabel="Available for 30 days"
- **What's hidden:** All layout/behavioral props (background, dimmed, progress, showPlayIcon, secondaryCta, etc.)
- **Accessibility:** 0 violations, 10 passes, 1 incomplete.

---

### Programme

- **Intent:** Programme-level link (TLEO page) for narrative content where episode is less useful.
- **Canvas:** "Bodyguard" thumbnail, "Drama" label only, programme-level subtitle, no episode numbering.
- **Controls (7 knobs):** title, itemsPerRow, imageTemplate, href, subtitle, synopsis, secondaryLabel
- **Key difference from Standard Episode:** href = `/iplayer/episodes/` (programme page, not episode). No `primaryLabel`, no `durationSubLabel`, no `secondarySubLabel`, no `liveLabel`.
- **What's hidden:** Episode-specific metadata + all layout props.

---

### All Episodes

- **Intent:** Latest episode + accompanying link to programme page. Two destinations.
- **Canvas:** "Bodyguard" thumbnail, "Drama" label, programme-level subtitle, "View all episodes" secondary CTA.
- **Controls (10 knobs):** title, itemsPerRow, imageTemplate, href, secondaryLabel, synopsis, subtitle, durationSubLabel, secondarySubLabel, secondaryCta (text)
- **Key difference:** `secondaryCta` knob present (the "View all episodes" link). No `primaryLabel`.
- **Knob label note:** CTA prop labelled `"secondaryCta (text)"` — suggests the actual prop accepts a component but the knob passes a string.

---

### Promotion

- **Intent:** Custom URL promotion item — links anywhere (not necessarily BBC iPlayer).
- **Canvas:** BSL Zone branded image (logo), "BSL ZONE" primary label, "British Sign Language" title, "Find more programmes in BSL" subtitle. Background box visible.
- **Controls (7 knobs):** title, itemsPerRow, imageTemplate, href, subtitle, synopsis, primaryLabel
- **Key differences:** `href: "#"` (custom/arbitrary URL). Only `primaryLabel` shown (no secondary). `background` prop hardcoded `true` in story (not exposed as knob).
- **Different fixture:** Not a Bodyguard episode — uses BSL Zone branded content, showing this variant handles non-programme promotional content.

---

### Tleo Episode

- **Intent:** Episode shown on TLEO (Top Level Episode Object) page — programme title is already visible in page context, so suppressed in card.
- **Canvas:** Character still (not programme title card), "Series 1: Episode 5" title, subtitle only — no genre/programme label.
- **Controls (8 knobs):** title, itemsPerRow, imageTemplate, href, synopsis, subtitle, durationSubLabel, secondarySubLabel
- **Key difference:** No `primaryLabel`, no `secondaryLabel`, no `liveLabel`. Episode title used in `title` field (not programme name). Context-aware: when TLEO name shown on page, don't repeat it in card.

---

### Watching

- **Intent:** In-progress episode with resume state — progress bar + time remaining.
- **Canvas:** Bodyguard thumbnail with pink progress bar at image bottom. "Resume | 55 mins Left" labels. "Series 1: Episode 1" subtitle.
- **Controls (11 knobs):** itemsPerRow, href, title, imageTemplate, synopsis, subtitle, durationSubLabel, secondarySubLabel, primaryLabel, secondaryLabel, progress (range 0–100, set to 45)
- **Key difference:** `progress` range knob present. `primaryLabel: "Resume"`, `secondarySubLabel: "55 mins Left"`. This is the only non-default story with `progress` exposed.
- **Knob order:** itemsPerRow first (not title) — different order from other stories. No particular significance.

---

### This Episode

- **Intent:** Currently-playing episode indicator — non-interactive display only (disabled).
- **Canvas:** Bodyguard thumbnail, "This episode" label (pink), "Series 1: Episode 1" title. No link.
- **Controls (4 knobs — most minimal):** itemsPerRow, title, imageTemplate, primaryLabel
- **Key difference:** No `href` knob — item is non-interactive/disabled. `primaryLabel: "This episode"`. Only structural + image + label props exposed.
- **Docs says:** "Currently watching episode. Disabled." — confirmed by absence of href.

---

## Theming / Tokens

- **Background:** All stories render on dark canvas (iPlayer dark theme). The component itself uses a dark card style.
- **Progress bar:** Pink (`progressPercent` prop) — same BBC pink as the toggle underline in Button.
- **Live label:** "LIVE" badge uses a pulse animation (suppressed via `liveLabelNoPulse`). Shown top-left of image.
- **Labels (primaryLabel/secondaryLabel):** Primary label uses pink/accent colour. Secondary label uses muted/grey.
- **Image system:** iChef CDN with `{recipe}` token — responsive image sizes resolved server-side. Pattern: `https://ichef.bbci.co.uk/images/ic/{recipe}/[pid].jpg`.
- **No Design tab content:** No Figma designs linked.

---

## Patterns & Observations

1. **Default story = full knob surface. Variant stories = context-appropriate subset.** Same pattern as Button. Default = 23 knobs. Variants = 4–11 knobs (only content-relevant props). Behavioral/layout props hidden from variants.

2. **Variants teach which metadata belongs in each context.** The knob set IS the specification: if `liveLabel` isn't exposed in Standard Episode, that's intentional design guidance ("standard episodes don't have live labels").

3. **Story-per-variant = one story per destination URL type.** Episode page → Standard Episode. Programme page → Programme. Custom URL → Promotion. Same-page context (TLEO) → Tleo Episode. User state (watching) → Watching. Non-interactive current state → This Episode.

4. **Real fixture data is diverse.** Different programmes per story: Bodyguard (programme/drama), People Just Do Nothing (episode/comedy), BSL Zone (promotional). Not randomised — curated to match variant purpose.

5. **`secondaryCta` is a component prop shown as text knob.** In "All Episodes", the knob is labelled `"secondaryCta (text)"` — suggests the story wraps the text value in a component. This is a common pattern for composition props in Knobs-era Storybook.

6. **Progress is a range slider.** Only variant is "Watching" exposing `progress`. Range min 0, max 100, default 45. Not shown on other stories — keeps irrelevant knobs hidden.

7. **3 required props drive all stories.** title, itemsPerRow, imageTemplate appear in every story. They are the irreducible minimum. All 8 stories expose these same 3 core props.

8. **No actions wired** — `onClick` prop exists but not demonstrated. Same pattern as Button.

---

## Key Findings Summary

- **Story count:** 8 stories
- **How fixture data handled:** Real BBC content (programme IDs, iChef URLs, actual copy). Each variant uses a curated real example that best illustrates the use case. Not lorem ipsum, not generic "My Title".
- **Prop count vs exposed controls:** 26 props in component. Default story: 23 knobs. Variants: 4–11 knobs. 3 props always present (required); behavioral/layout props hidden from variants.
- **Docs style:** Prescriptive + rule-giving. Includes design rules ("play icon only for direct playback"), not just API docs. Same "What problem / When to use / Current usage / Per-variant notes" structure as Button.
- **Variant differentiation:** Stories differ by which props are ABSENT as much as which are present. The absence is meaningful — it's design guidance encoded in the story.
- **Story naming:** Maps directly to product page type (Standard Episode, Watching, etc.) — not component-API language but product-context language.
