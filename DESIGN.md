# Design Brief: Ryzous

**Tone & Purpose:** Authoritative yet approachable cybersecurity startup. Command-line elegance meets modern SaaS polish. Neon accents signal sophistication, not gimmickry.

| Aspect | Definition |
|--------|-----------|
| **Primary Color** | Neon green `oklch(0.68 0.25 140)` — CTA, interactive states, data highlights |
| **Accent Colors** | Cyan `oklch(0.7 0.22 200)` (borders, system info), Purple `oklch(0.5 0.35 300)` (warnings, alerts) |
| **Background** | Near-black `oklch(0.11 0 0)` with dark blue undertone for depth |
| **Surface** | Card layer `oklch(0.16 0.01 265)` with subtle purple tint |
| **Text** | Off-white `oklch(0.95 0.01 265)` for primary, `oklch(0.65 0.01 265)` for secondary |
| **Muted** | Mid-grey `oklch(0.28 0.01 265)` for inactive, disabled, metadata |

**Typography:**
- **Display:** Space Grotesk (headlines, hero, data labels) — geometric, tech-forward
- **Body:** DM Sans (content, UI text) — professional, legible, refined
- **Mono:** JetBrains Mono (code snippets, terminal output, values)

**Shape Language:** Minimal rounding (6px default, 4px compact). Crisp, modern, not playful.

**Structural Zones:**
| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| **Header** | `bg-background` | `border-b border-accent/30` (cyan line) | Navigation, branding anchor |
| **Hero Section** | `bg-background` with gradient accent borders | `border-glow` | Primary CTA area, impact |
| **Content Cards** | `glass-effect` (backdrop-blur, 70% opacity) | `border-glow` or `border-border` | Information hierarchy, data display |
| **Stats/Metrics** | `bg-card` with `glow-neon` on hover | `border-accent/40` | Real-time activity, impact visualization |
| **CTA Buttons** | `bg-primary` | None | Primary: neon green, Secondary: `bg-muted` |
| **Footer** | `bg-card` | `border-t border-accent/20` | Copyright, links |

**Motion Choreography:**
- **Page Load:** Sequential fade-in (0.3s) + slide-up (10px offset)
- **Hover:** Scale 1.05 + shadow elevation + text glow
- **Loading:** Pulse-glow (2s cycle) or scan-line (vertical sweep)
- **Transitions:** All 0.3s cubic-bezier(0.4, 0, 0.2, 1) — smooth, snappy

**Signature Details:**
- Glassmorphism cards: semi-transparent background with backdrop-blur (8px)
- Neon border glow on interactive elements (accent color with 40% opacity)
- Subtle inset glow on cards for depth
- No drop shadows; use border + inset glow for elevation
- Terminal-style monospace for code previews, exploit samples

**Components:**
- Buttons: Primary (neon green, uppercase), Secondary (muted bg, outline style)
- Cards: Glass-effect with border-glow on hover
- Stats: Large numeric display (Space Grotesk) + label (DM Sans) + color-coded background
- Forms: Dark inputs with cyan focus ring, subtle background
- Tags/Badges: Semantic colors (green=secure, purple=warning, cyan=info)

**Constraints:**
- No garish gradients or oversaturated effects
- Glow effects used sparingly (CTAs, hover states, focus rings only)
- No rainbow palettes; stick to 5-color system (green, cyan, purple, grey, black)
- Animations should feel precise and controlled, not playful
- Respect contrast; ensure AA+ WCAG compliance in dark mode
- Mobile-first responsive design with `sm:`, `md:`, `lg:` breakpoints

**Differentiation:** Hacker-aesthetic precision combined with startup professionalism. The UI feels like it's *analyzing* security, not just displaying information. Every visual element supports the thesis: "Think Like a Hacker. Defend Like a Pro."
