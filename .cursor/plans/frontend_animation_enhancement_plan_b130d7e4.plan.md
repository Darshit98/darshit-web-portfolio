---
name: Frontend Animation Enhancement Plan
overview: Enhance the portfolio frontend with modern animations similar to Framer components, using Framer Motion (Motion) library for scroll-triggered animations, parallax effects, hover interactions, and smooth transitions throughout all components.
todos:
  - id: install-framer-motion
    content: Install Framer Motion library and update package.json
    status: completed
  - id: create-animation-utilities
    content: Create animation utilities file (src/lib/animations.ts) with reusable variants and presets
    status: completed
  - id: create-scroll-reveal-component
    content: Create ScrollReveal wrapper component for scroll-triggered animations
    status: completed
  - id: create-parallax-hooks
    content: Create custom hooks for parallax effects (useParallax, useScrollProgress)
    status: completed
  - id: update-header-animations
    content: Add scroll-triggered header animations and navigation hover effects
    status: completed
  - id: enhance-hero-animations
    content: Add parallax background, stagger text animations, and magnetic button effects
    status: completed
  - id: add-about-animations
    content: Implement scroll reveals and image hover effects in About section
    status: completed
  - id: enhance-experience-timeline
    content: Add animated timeline drawing, staggered card reveals, and 3D hover effects
    status: completed
  - id: animate-skills-section
    content: Add staggered card animations and skill tag cascade reveals
    status: completed
  - id: enhance-services-animations
    content: Add 3D tilt hover effects, icon animations, and border morph effects
    status: completed
  - id: improve-projects-carousel
    content: Replace carousel with Framer Motion AnimatePresence and add hover parallax
    status: completed
  - id: add-contact-form-animations
    content: Implement form field focus animations and loading states
    status: completed
  - id: add-footer-animations
    content: Add fade-in animation to Footer component
    status: completed
  - id: add-scroll-progress-bar
    content: Create scroll progress indicator component at top of page
    status: completed
  - id: implement-reduced-motion
    content: Add accessibility support for prefers-reduced-motion
    status: completed
  - id: optimize-performance
    content: Optimize animations for performance and test on various devices
    status: completed
isProject: false
---

# Frontend Animation Enhancement Plan

## Technology Stack Analysis

**Current Stack:**

- React 18.3.1 + TypeScript + Vite
- Tailwind CSS with `tailwindcss-animate` plugin
- Radix UI + Shadcn UI components
- Existing: `typed.js` for text animation, basic CSS animations

**Recommended Animation Library:**

- **Framer Motion (Motion)** - Best compatibility with Tailwind CSS, excellent TypeScript support, 30.7k stars, 3.6M weekly downloads
- Works seamlessly with Tailwind by letting Tailwind handle styling and Motion handle animations
- Supports gestures, springs, layout transitions, and scroll-linked effects

## Component-by-Component Animation Strategy

### 1. Header Component (`src/components/Header.tsx`)

**Current State:** Fixed header with basic hover transitions
**Enhancements:**

- Add scroll-triggered navigation bar animation (shrink/grow on scroll)
- Animate navigation links with underline hover effect (similar to Framer's SVG Underline Navigation)
- Smooth backdrop blur transitions
- Active section indicator animation
- Mobile menu slide-in animation

**Implementation:**

- Use `useScroll` hook to detect scroll position
- Animate header height/opacity based on scroll
- Add motion variants for navigation link hover states
- Implement active section tracking with animated underline

### 2. Hero Section (`src/components/Hero.tsx`)

**Current State:** Basic fade-in animations, Typed.js for text
**Enhancements:**

- Parallax background effect (background moves slower than content)
- Stagger animation for text elements
- Enhanced button hover effects (magnetic/glow effects)
- Floating animation for social icons
- Scroll indicator animation
- Text reveal animations with gradient effects

**Implementation:**

- Use `useScroll` and `useTransform` for parallax background
- Add `motion` variants for staggered children animations
- Implement magnetic hover effect using `whileHover` and `whileTap`
- Add scroll progress indicator at bottom

### 3. About Section (`src/components/About.tsx`)

**Current State:** Static layout with basic card
**Enhancements:**

- Scroll-triggered reveal animation (fade + slide)
- Image hover effect (scale + glow)
- Text reveal with typewriter effect option
- Card entrance animation with blur backdrop

**Implementation:**

- Use `whileInView` for scroll-triggered animations
- Add image parallax on hover
- Stagger text paragraph animations

### 4. Experience Timeline (`src/components/Experience.tsx`)

**Current State:** Tree-like timeline with basic hover effects
**Enhancements:**

- Animated timeline drawing effect (tree trunk and branches appear on scroll)
- Staggered card entrance animations
- Enhanced hover effects with 3D tilt
- Leaf icons animation (pulse/rotate on hover)
- Scroll progress indicator along timeline
- Card flip/reveal animations

**Implementation:**

- Use `useScroll` to animate timeline drawing
- Implement stagger children for cards
- Add `whileHover` with 3D transforms
- Animate branch paths using SVG path animations

### 5. Skills Section (`src/components/Skills.tsx`)

**Current State:** Grid layout with basic hover transitions
**Enhancements:**

- Staggered card entrance animations
- Skill tags reveal animation (cascade effect)
- Hover effects with scale and glow
- Icon animations (rotate/scale on hover)
- Category cards with magnetic hover effect

**Implementation:**

- Use `motion` variants with stagger children
- Animate skill tags with delay based on index
- Add spring animations for hover states

### 6. Services Section (`src/components/Services.tsx`)

**Current State:** Grid with basic hover transitions
**Enhancements:**

- Card hover effects with 3D tilt and parallax
- Icon animations (rotate/scale/pulse)
- Border morph animation on hover
- Staggered entrance animations
- Glow effect on hover (similar to Framer's glowing components)

**Implementation:**

- Use `whileHover` with 3D transforms
- Add border animation using `motion.div` with clip-path
- Implement icon rotation/scale animations
- Add glow effect using box-shadow animations

### 7. Projects Section (`src/components/Projects.tsx`)

**Current State:** Carousel with basic transitions
**Enhancements:**

- Smooth carousel transitions with spring physics
- Project card hover effects (lift + shadow)
- Image parallax on hover
- Button animations (magnetic effect)
- Scroll-triggered card reveals
- 3D card flip on hover option

**Implementation:**

- Replace manual carousel with Framer Motion's `AnimatePresence`
- Use `layout` prop for smooth transitions
- Add image parallax using mouse position tracking
- Implement magnetic button effect

### 8. Contact Section (`src/components/Contact.tsx`)

**Current State:** Static form with basic validation
**Enhancements:**

- Form field focus animations (label lift effect)
- Input field glow on focus
- Button loading animation
- Success/error message animations
- Staggered form field entrance
- Social icon hover animations

**Implementation:**

- Add motion variants for form fields
- Implement label animation on focus/blur
- Add loading spinner animation
- Animate toast notifications with slide-in effect

### 9. Footer (`src/components/Footer.tsx`)

**Current State:** Minimal footer
**Enhancements:**

- Fade-in animation on scroll
- Optional: animated background pattern
- Copyright text reveal animation

### 10. Global Enhancements

**Page Transitions:**

- Smooth scroll behavior
- Section transition animations
- Scroll progress bar at top

**Performance Optimizations:**

- Use `will-change` CSS property strategically
- Implement `useReducedMotion` hook for accessibility
- Lazy load animations for below-fold content
- Use `layoutId` for shared element transitions

## Implementation Steps

### Phase 1: Setup & Dependencies

1. Install Framer Motion: `npm install framer-motion`
2. Create animation utilities file: `src/lib/animations.ts`
3. Create reusable animation components: `src/components/animations/`
4. Update Tailwind config if needed for animation utilities

### Phase 2: Core Animations

1. Implement scroll progress bar component
2. Create reusable scroll reveal wrapper component
3. Add parallax hook utilities
4. Create magnetic hover effect utilities

### Phase 3: Component Updates

1. Update Header with scroll animations
2. Enhance Hero with parallax and stagger effects
3. Add scroll reveals to About, Skills, Services
4. Enhance Experience timeline animations
5. Improve Projects carousel with smooth transitions
6. Add form animations to Contact

### Phase 4: Polish & Optimization

1. Add reduced motion support
2. Optimize animation performance
3. Test on various devices and browsers
4. Fine-tune animation timings and easing

## Animation Utilities to Create

`**src/lib/animations.ts`:**

- Reusable animation variants
- Stagger configurations
- Easing functions
- Animation presets

`**src/components/animations/ScrollReveal.tsx`:**

- Wrapper component for scroll-triggered animations
- Configurable animation types

`**src/components/animations/ParallaxSection.tsx`:**

- Parallax wrapper component
- Configurable speed and direction

`**src/hooks/useScrollProgress.ts`:**

- Custom hook for scroll progress tracking

`**src/hooks/useParallax.ts`:**

- Custom hook for parallax effects

## Key Animation Patterns from Framer Resources

1. **Scroll Highlight Animation** - Active section indicator in navigation
2. **Parallax Image Scroll** - Background parallax in Hero
3. **Hover Image Reveal** - Project card hover effects
4. **Text Mask Animation** - Text reveal effects
5. **Magnetic Hover** - Button and card interactions
6. **Stagger Animations** - Sequential card/item reveals
7. **3D Transform Effects** - Card tilt on hover
8. **Border Morph** - Animated borders on hover

## Accessibility Considerations

- Implement `prefers-reduced-motion` media query support
- Ensure animations don't interfere with keyboard navigation
- Maintain focus indicators during animations
- Test with screen readers

## Performance Targets

- Maintain 60 FPS during animations
- Keep bundle size impact minimal (~32KB gzipped for Framer Motion)
- Use `will-change` strategically
- Implement intersection observer for scroll animations
- Lazy load animation code where possible

