---
name: interactive-portfolio
description: >
  Use when the user asks to build, redesign, or enhance a personal portfolio,
  project showcase, case study page, or developer/designer landing page.
  Builds high-conversion personal portfolios and project showcases that turn
  visitors into professional opportunities.
---

# Interactive Portfolio Builder

## Goal

Build distinctive, high-conversion interactive portfolios that go far beyond
standard resume sites. Every portfolio should feel like a curated experience —
not a template — and guide visitors toward a clear action (contact, hire,
collaborate).

## Core Principles

### 1. Identity First
- Extract the person's unique professional narrative before writing any code.
- Ask: What is their niche? What makes them different? What do they want
  visitors to *do*?
- The portfolio must feel like an extension of their personal brand, not a
  generic theme.

### 2. Story-Driven Structure
- Organize content as a narrative arc, not a list of sections.
- Typical flow: **Hook** (hero with clear value prop) → **Proof** (work,
  metrics, case studies) → **Depth** (skills, education, process) →
  **Connection** (contact, CTA).
- Every section should answer a question the visitor is silently asking.

### 3. Interaction That Earns Attention
- Use scroll-triggered reveals, counters, hover states, and transitions to
  create a sense of craft.
- Avoid interaction for its own sake — every animation should reinforce
  hierarchy or guide the eye.
- Prefer subtle, purposeful motion (fade-in, slide-up, parallax depth) over
  flashy effects.

### 4. Quantify Everything
- Replace vague claims with numbers: metrics, percentages, counts, timeframes.
- Use animated counters or stat cards for key achievements.
- If the user doesn't have exact numbers, help them estimate credibly.

### 5. Conversion-Focused CTAs
- Every page needs a primary CTA (usually contact or schedule a call).
- CTAs should appear in the hero *and* at the bottom, with a sticky or
  floating option on scroll.
- Use action-oriented copy: "Let's talk" > "Contact me".

## Technical Guidelines

### Stack Awareness
- Adapt to the project's existing stack. This project uses:
  - **TanStack Start** (file-based routing, SSR)
  - **React 19** with TypeScript
  - **Tailwind CSS 4** with custom theme tokens
  - **shadcn/ui** components (Radix primitives)
  - **Framer Motion** available for animations
  - Custom `Reveal` component for scroll-triggered animations
  - Custom `Counter` component for animated number display
- Reuse existing components (`Reveal`, `Counter`, `surface` utility, `Section`)
  before creating new ones.
- Follow the project's design tokens: `font-display` (Instrument Serif),
  `font-sans` (Work Sans), `font-mono` (IBM Plex Mono), brass/green-navy theme.

### Component Patterns
- Use the existing `Section` component with `eyebrow` + `title` for consistent
  section headers.
- Wrap content in `Reveal` for scroll animations — pass `delay` for staggered
  reveals.
- Use the `surface` utility class for card-like containers.
- Use `text-brass` utility for gradient text accents.
- Use `link-underline` for interactive nav links.
- Use `rule-grid` for the page background pattern.

### Layout & Responsiveness
- Max width: `max-w-5xl` for main content.
- Mobile-first responsive design with `md:` breakpoints.
- Sticky header with backdrop blur on scroll.
- Section spacing: `py-20 md:py-28` for sections, `mt-12` for content gaps.
- Grid layouts: `grid gap-5 md:grid-cols-2` or `md:grid-cols-4` for stats.

### Accessibility
- Semantic HTML: `<section>`, `<nav>`, `<header>`, `<main>`, `<footer>`.
- `id` attributes on sections for anchor navigation.
- `IntersectionObserver` for active nav state (already implemented).
- `scroll-mt-24` on sections for sticky header offset.
- All external links use `target="_blank" rel="noreferrer"`.

### Performance
- No heavy client-side libraries for simple effects — use CSS transitions
  and the existing `Reveal` component.
- `IntersectionObserver` for lazy animations (already in place).
- Lazy-load images if added (use `loading="lazy"`).

## Portfolio Sections Template

When building or enhancing a portfolio, include these sections in order:

1. **Hero** — Name, title/role, 1-2 sentence value prop, primary CTA, stat
   highlights.
2. **Experience/Work** — Tabbed or timeline view of roles with bullet-point
   achievements grouped by theme.
3. **Projects/Tools** — Card grid of builds with links, descriptions, and
   tech tags.
4. **Education** — Timeline with notes/badges for achievements.
5. **Skills** — Grouped by category (Business, Technical, etc.) with tag-style
   chips.
6. **Beyond** — Research, leadership, volunteering — shows well-roundedness.
7. **Contact** — Email, phone, LinkedIn with hover-interactive cards.

## Enhancement Checklist

When reviewing or improving an existing portfolio:

- [ ] Hero has a clear, specific value prop (not generic)
- [ ] Stats/metrics are prominent and animated
- [ ] Every section has an eyebrow label + descriptive title
- [ ] Work experience shows quantified achievements
- [ ] Projects link out with clear descriptions
- [ ] Navigation highlights active section
- [ ] CTA appears in hero and contact section
- [ ] Responsive layout works on mobile
- [ ] Animations are subtle and purposeful
- [ ] Typography hierarchy is clear (display → body → mono)
- [ ] Color usage follows the theme consistently
- [ ] Footer includes copyright and location

## Examples

### Good Hero
```
Finance and risk professional with 3.4+ years at Tide and JPMorgan Chase —
mitigating £10M+ in exposure, screening 24,000+ clients, and redesigning the
processes behind 2,000+ CDD/EDD reviews.
```
→ Specific, metric-rich, names employers, shows scope.

### Bad Hero
```
Passionate finance professional looking for new opportunities.
```
→ Generic, no differentiators, no proof.

### Good Stat Card
```
£10M+ risk exposure mitigated
```
→ Concrete, impressive, quantified.

### Bad Skill Display
```
Skills: Finance, Excel, Risk Management
```
→ Flat list, no context, no grouping.
