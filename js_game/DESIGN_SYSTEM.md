# CodeRecall Design System

## Underground Tech Aesthetic

This design system creates a cohesive "underground hardcore rock cool" aesthetic for CodeRecall, integrating CodeSpinner and TrueCoders branding.

---

## Color Palette

### Brand Colors
- **CodeSpinner Purple**: `#818CF8` / `var(--color-codespinner-purple)`
- **TrueCoders Blue**: `#0093C7` / `var(--color-truecoders-blue)`
- **Accent Cyan**: `#00D9FF` / `var(--color-accent-cyan)`

### Backgrounds
- **Darkest**: `#1a1a2e` / `var(--color-bg-darkest)` - Base background
- **Dark**: `#2a2a3e` / `var(--color-bg-dark)` - Secondary surfaces
- **Overlay**: `rgba(0, 0, 0, 0.3)` / `var(--color-bg-overlay)` - Transparent overlays
- **Overlay Heavy**: `rgba(0, 0, 0, 0.7)` / `var(--color-bg-overlay-heavy)` - Solid overlays

### Text
- **Primary**: `#b8d4f5` / `var(--color-text-primary)` - Main readable text
- **Secondary**: `#a5a8c4` / `var(--color-text-secondary)` - Subtitles
- **Muted**: `#7a8db8` / `var(--color-text-muted)` - Less emphasis
- **Bright**: `#e8ecff` / `var(--color-text-bright)` - Highlights

---

## Typography System

### HeadingGroup Component

Use the `<HeadingGroup>` component for consistent heading hierarchy:

```jsx
import HeadingGroup from './components/ui/HeadingGroup';

// Brand variant - For "CodeRecall" with animated glint
<HeadingGroup 
  title="CodeRecall" 
  subtitle="Test your knowledge"
  variant="brand"
  align="center"
/>

// Primary variant - For main page headings
<HeadingGroup 
  title="Choose Your Challenge" 
  subtitle="Select a topic to start matching!"
  variant="primary"
  align="center"
/>

// Secondary variant - For section headings
<HeadingGroup 
  title="Web Development" 
  subtitle="Master the fundamentals"
  variant="secondary"
  align="left"
/>
```

### Typography Hierarchy
1. **Brand** (CodeRecall): 2.5rem - 4rem with metallic animation
2. **Primary Headings**: 2.8rem - 4.5rem, static color
3. **Secondary Headings**: 2rem - 2.4rem, uses brand purple
4. **Subtitles**: 0.9rem - 1.8rem, muted

---

## Animation

### Brand Glint
The CodeRecall logo uses a slow metallic sweep animation that flows between:
- CodeSpinner Purple (#818CF8)
- TrueCoders Blue (#0093C7)

**Duration**: 6 seconds  
**Easing**: ease-in-out  
**Direction**: alternating (left-right-left)

```css
animation: brandGlint 6s ease-in-out infinite alternate;
```

---

## Design Principles

1. **Dark Foundation**: Use `--color-bg-darkest` as the base
2. **Subtle Overlays**: Cards and surfaces use `rgba(0, 0, 0, 0.3)`
3. **Brand Integration**: Use purple and blue from brand colors
4. **Consistent Spacing**: Use multiples of 8px (8, 16, 24, 32, etc.)
5. **Typography Hierarchy**: Always maintain clear size differences
6. **Minimal Animation**: Only animate the brand name, keep other elements static
7. **Underground Cool**: Dark, edgy, but professional for a coding school

---

## Component Guidelines

### Buttons
- Background: `var(--color-bg-overlay)`
- Border: Brand colors or success green
- Text: Colored to match border on hover
- Hover: Slight glow with matching color

### Cards
- Background: `rgba(0, 0, 0, 0.3)` with `backdrop-filter: blur(10px)`
- Border: Dynamic based on topic color
- Text: `var(--color-text-primary)`

### Footer
- Uses CodeSpinner branding with gradient animation
- Includes TrueCoders affiliation
- Dark overlay background

---

## Usage

All colors are available as CSS variables. Import `colors.css` to use them:

```css
.my-component {
  background: var(--color-bg-dark);
  color: var(--color-text-primary);
  border: 2px solid var(--color-codespinner-purple);
}
```

