# Portfolio — Julie Di Gao (Di)

## Project Overview
Personal portfolio site showcasing product strategy, UX research, and AI tooling work.
No build tools or package manager — pure vanilla HTML5, CSS3, and JavaScript.

## Stack
- HTML5 (semantic, ARIA-compliant)
- CSS3 with custom properties (no preprocessors)
- Vanilla JavaScript (no frameworks or libraries)
- Google Fonts: DM Sans + Georgia fallback
- No package.json, no bundler, no build step

## File Structure
- `index.html` — landing page with hero, filter tabs, project grid, footer
- `style.css` — all styles (~750 lines), component-based with CSS variables
- `script.js` — tab filtering, mobile nav, scroll animations, Shanghai clock
- `*.html` — individual case study pages (e.g. `orka-health.html`, `agile-cps.html`)
- `img/` — project thumbnails and case study images

## Conventions

### HTML
- Semantic HTML5 elements
- ARIA attributes for accessibility (roles, aria-selected, aria-controls, tabindex)
- Proper heading hierarchy

### CSS
- CSS variables defined in `:root` for colors, shadows, spacing, fonts
- Kebab-case class names, BEM-adjacent (`.site-nav`, `.card-thumb`, `.cs-header`)
- Fluid sizing with `clamp()` — prefer this over discrete media query breakpoints
- Named shadow scale: `--shadow-sm`, `--shadow-md`, `--shadow-card`, `--shadow-card-hover`
- Color palette: electric blue `#2251FF` + navy `#051C2C`
- Case study pages use `.cs-page` class on `<body>` for white navbar variant

### JavaScript
- Vanilla JS only — no libraries
- Data attributes (`data-role`, `data-group`) for component logic
- Class toggling for state management
- ARIA attribute manipulation for accessibility

## Do Not
- Introduce frameworks (React, Vue, etc.) or build tools unless explicitly asked
- Add external CSS libraries or JS libraries without asking
- Inline styles (use CSS classes)
- Break existing ARIA / keyboard navigation patterns
- Add comments unless the logic is non-obvious

## Case Study Page Structure
Each case study uses:
- `.cs-page` on `<body>`
- `.cs-header`, `.cs-body`, `.cs-metrics`, `.cs-section` for layout
- `.cs-section-label` for eyebrow text above headings
- Metadata sidebar with timeline, company, role, platform fields

## Writing Voice

### Persona
A mix of a Senior female Product Designer and the brand 'Hims'.

### Tone
Honest, witty, and slightly self-aware.

### Rules
1. **No AI-speak.** Avoid: delve, unlock, comprehensive, tapestry. Do not use dashes (-).
2. **Be punchy.** One idea per sentence.
3. **No echoing.** Do not restate the same point using different synonyms. If you said it once, it is done.
4. **Minimalist prose.** Edit ruthlessly. If a word is not doing work, fire it.
5. **Active voice.** Use 'I built this' instead of 'This was built by me.'
6. **No summary sentences.** Do not start paragraphs with "In short," or "Basically," — just get to the point.
