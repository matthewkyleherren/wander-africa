# Wander Clone - Build Instructions

You are building a Wander.com clone - a luxury vacation rental platform. This file contains the complete implementation plan. Execute each phase in order, verifying each works before proceeding.

## Current State

The repo already contains starter files:
- `tailwind.config.ts` - Custom design system
- `src/app/globals.css` - Global styles with CSS variables
- `src/app/layout.tsx` - Root layout with fonts
- `src/app/page.tsx` - Basic homepage (needs enhancement)
- `src/lib/utils.ts` - Utility functions
- `src/lib/stores/search-store.ts` - Zustand search state
- `src/types/` - TypeScript interfaces
- `src/components/ui/` - Base UI components
- `src/data/mock-properties.ts` - Mock data

---

## Phase 1: Project Setup

### Step 1.1: Initialize and Install Dependencies

Run these commands:

```bash
npm install
```

If package.json doesn't exist, create it first:

```bash
npm init -y
npm install next@14 react react-dom typescript @types/node @types/react @types/react-dom
npm install lucide-react clsx tailwind-merge class-variance-authority framer-motion date-fns zustand embla-carousel-react
npm install @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 1.2: Create Next.js Config

Create `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

### Step 1.3: Create tsconfig.json

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 1.4: Verify Setup

Run `npm run dev` and confirm the homepage loads at http://localhost:3000.

---

## Phase 2: Layout Components

### Step 2.1: Create Navbar Component

Create `src/components/layout/navbar.tsx`:

Requirements:
- Fixed/sticky header with blur background
- Logo on left (link to home)
- Search bar in center (compact mode, expandable on click)
- Nav links: "Explore", "Concierge" 
- Right side: "Become a host" button, menu icon, user avatar
- Mobile: hamburger menu
- Transparent variant for homepage hero, solid for other pages
- Uses framer-motion for animations

### Step 2.2: Create Footer Component

Create `src/components/layout/footer.tsx`:

Requirements:
- Dark background (bg-foreground)
- 4-column grid: Company, Resources, Hosting, Connect
- Each column has heading + list of links
- Bottom row: logo + copyright
- Social media icons
- Newsletter signup input (optional)
- Responsive: stacks on mobile

### Step 2.3: Create Mobile Navigation

Create `src/components/layout/mobile-nav.tsx`:

Requirements:
- Fixed bottom bar, only visible on mobile (md:hidden)
- 4 items with icons: Explore, Wishlist, Trips, Profile
- Active state indicator
- Glass morphism background
- Hides on scroll down, shows on scroll up (use scroll direction hook)

### Step 2.4: Create Layout Index

Create `src/components/layout/index.ts`:

```typescript
export { Navbar } from "./navbar";
export { Footer } from "./footer";
export { MobileNav } from "./mobile-nav";
```

---

## Phase 3: Search Components

### Step 3.1: Create Location Input

Create `src/components/search/location-input.tsx`:

Requirements:
- Text input with search icon
- Placeholder: "Search destinations"
- Dropdown with recent searches and popular destinations
- Uses Command component pattern (combobox)
- Keyboard navigation support
- Clears on X button click

### Step 3.2: Create Date Picker

Create `src/components/search/date-picker.tsx`:

Requirements:
- Two-month calendar view (side by side on desktop, stacked on mobile)
- Date range selection (check-in and check-out)
- Disabled dates for past
- Selected range highlighting
- Clear dates button
- "Flexible dates" option (weekend, week, month)
- Uses the existing date-fns library

### Step 3.3: Create Guest Selector

Create `src/components/search/guest-selector.tsx`:

Requirements:
- Popover with guest counters
- Uses GuestCounterGroup from ui/counter.tsx
- Adults (min 1), Children, Infants, Pets
- Shows summary like "2 guests, 1 pet"
- Maximum guest limit display
- Integrates with search-store

### Step 3.4: Create Search Widget

Create `src/components/search/search-widget.tsx`:

Requirements:
- Compact mode: horizontal bar with Location | Dates | Guests | Search button
- Expanded mode: full panel with all inputs visible
- Click on section expands that panel
- Search button triggers search and saves to recent
- Mobile: full-screen modal when expanded
- Animates between states with framer-motion
- Uses search-store for state management

### Step 3.5: Create Search Index

Create `src/components/search/index.ts`:

```typescript
export { LocationInput } from "./location-input";
export { DatePicker } from "./date-picker";
export { GuestSelector } from "./guest-selector";
export { SearchWidget } from "./search-widget";
```

---

## Phase 4: Property Components

### Step 4.1: Create Property Card

Create `src/components/property/property-card.tsx`:

Requirements:
- Uses ImageCarousel for images
- Wishlist heart button (top right, stops propagation)
- Badge overlay (New, Popular, etc.)
- Property name with hover color change
- Location (city, state)
- Capacity: X guests · X beds · X baths
- Price per night
- Rating with star icon (if available)
- Entire card is clickable link to /property/[slug]
- Hover: subtle translateY and shadow increase
- Uses PropertyCard type from types/property.ts

### Step 4.2: Create Property Grid

Create `src/components/property/property-grid.tsx`:

Requirements:
- Responsive grid: 1 col mobile, 2 tablet, 3 laptop, 4 desktop
- Accepts properties array
- Loading state shows PropertyGridSkeleton
- Empty state with message and CTA
- Optional "Load more" button with callback
- Gap of 24px (gap-6)

### Step 4.3: Create Property Hero

Create `src/components/property/property-hero.tsx`:

Requirements:
- Bento grid layout: 1 large image (left), 4 small images (right 2x2)
- Mobile: single image carousel
- "View all X photos" button overlay
- Opens lightbox modal on click
- Breadcrumb navigation above
- Property title (font-display)
- Quick stats row with icons
- Share and Wishlist buttons

### Step 4.4: Create Property Amenities

Create `src/components/property/property-amenities.tsx`:

Requirements:
- Section heading "What this place offers"
- Amenities grouped by category
- Each amenity: icon + name
- Grid layout (2 columns)
- "Show all X amenities" button
- Modal with full categorized list

### Step 4.5: Create Property Reviews

Create `src/components/property/property-reviews.tsx`:

Requirements:
- Overall rating display (large number + stars)
- "X reviews" count
- AI summary paragraph (if available)
- Rating breakdown bars (cleanliness, location, etc.)
- Review cards list (limit 6, then "Show all")
- Each review: avatar, name, date, rating, content
- Uses Rating and RatingBar components

### Step 4.6: Create Booking Sidebar

Create `src/components/property/booking-sidebar.tsx`:

Requirements:
- Sticky on desktop (top-24)
- Card with shadow
- Price display: $X / night
- Date selector (compact, opens DatePicker)
- Guest selector (compact, opens popover)
- When dates selected: show price breakdown
  - $X x N nights
  - Cleaning fee
  - Service fee
  - Total before taxes
- Reserve button (primary, full width)
- "You won't be charged yet" text below button
- When no dates: show "Select dates" message instead of breakdown

### Step 4.7: Create Property Index

Create `src/components/property/index.ts`:

```typescript
export { PropertyCard } from "./property-card";
export { PropertyGrid } from "./property-grid";
export { PropertyHero } from "./property-hero";
export { PropertyAmenities } from "./property-amenities";
export { PropertyReviews } from "./property-reviews";
export { BookingSidebar } from "./booking-sidebar";
```

---

## Phase 5: Homepage Components

### Step 5.1: Create Hero Section

Create `src/components/home/hero.tsx`:

Requirements:
- Full viewport height (h-screen or min-h-[600px])
- Background image with gradient overlay
- Centered content
- Large headline: "Find your happy place" (font-display)
- Subheadline paragraph
- SearchWidget component
- Optional: scroll indicator at bottom
- Uses next/image for optimized background

### Step 5.2: Create Category Tabs

Create `src/components/home/category-tabs.tsx`:

Requirements:
- Horizontal scrollable row of chips
- Uses Chip component
- Categories from mock-properties.ts
- Selected state for active category
- onClick updates filter/URL
- Scroll arrows on desktop when overflow
- Sticky below navbar on scroll

### Step 5.3: Create Value Proposition

Create `src/components/home/value-proposition.tsx`:

Requirements:
- Section title: "The Wander Difference"
- Subtitle paragraph
- 6 feature cards in grid (2x3 on desktop, 1 col mobile)
- Each card: icon, title, description
- Uses FeatureCard from ui/card.tsx
- Subtle entrance animations on scroll (intersection observer)

### Step 5.4: Create Home Index

Create `src/components/home/index.ts`:

```typescript
export { Hero } from "./hero";
export { CategoryTabs } from "./category-tabs";
export { ValueProposition } from "./value-proposition";
```

---

## Phase 6: Page Assembly

### Step 6.1: Update Homepage

Update `src/app/page.tsx`:

Structure:
```
<Navbar variant="transparent" />
<Hero />
<CategoryTabs /> (sticky)
<section>
  <PropertyGrid properties={mockPropertyCards} />
  <Button>Show more homes</Button>
</section>
<ValueProposition />
<Footer />
<MobileNav />
```

### Step 6.2: Create Property Detail Page

Create `src/app/property/[slug]/page.tsx`:

Requirements:
- Server component that fetches property by slug
- Falls back to mock data for now
- Uses getPropertyBySlug from mock-properties.ts

Structure:
```
<Navbar variant="solid" />
<main className="container-wide pt-20">
  <div className="grid lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">
      <PropertyHero />
      <section>Description</section>
      <PropertyAmenities />
      <section>Bedrooms carousel</section>
      <section>Location with map placeholder</section>
      <section>Calendar for dates</section>
      <PropertyReviews />
      <section>House rules accordion</section>
    </div>
    <div className="lg:col-span-1">
      <BookingSidebar /> (sticky)
    </div>
  </div>
</main>
<Footer />
```

### Step 6.3: Create Search Results Page

Create `src/app/search/page.tsx`:

Requirements:
- Reads search params from URL
- Filters mock properties based on params
- Shows result count
- PropertyGrid with filtered results
- Filter sidebar on desktop
- Map toggle button (placeholder)

---

## Phase 7: Custom Hooks

### Step 7.1: Create useMediaQuery Hook

Create `src/lib/hooks/use-media-query.ts`:

```typescript
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
```

### Step 7.2: Create useScrollDirection Hook

Create `src/lib/hooks/use-scroll-direction.ts`:

```typescript
import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.scrollY;
      setScrollDirection(currentOffset > prevOffset ? "down" : "up");
      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevOffset]);

  return scrollDirection;
}
```

### Step 7.3: Create Hooks Index

Create `src/lib/hooks/index.ts`:

```typescript
export { useMediaQuery, useIsMobile, useIsDesktop } from "./use-media-query";
export { useScrollDirection } from "./use-scroll-direction";
```

---

## Phase 8: Polish & Refinement

### Step 8.1: Add Loading States

- Add loading.tsx files for route segments
- Use Suspense boundaries with skeleton fallbacks
- Ensure all async components have loading states

### Step 8.2: Add Error Handling

- Create error.tsx for route error boundaries
- Create not-found.tsx for 404 pages
- Add try/catch to data fetching

### Step 8.3: Accessibility Audit

- Ensure all interactive elements are keyboard accessible
- Add proper ARIA labels to icon buttons
- Test with screen reader
- Verify color contrast meets WCAG AA
- Add skip-to-content link

### Step 8.4: Animation Polish

- Add page transition animations
- Stagger animations for grid items
- Smooth scroll behavior
- Reduced motion media query support

---

## Design Tokens Reference

### Colors
- Primary background: `bg-background` (#FAFAF9)
- Primary text: `text-foreground` (#1C1917)
- Accent: `bg-accent` / `text-accent` (#C2410C)
- Muted text: `text-foreground-muted` (#78716C)
- Borders: `border-border` (#E7E5E4)

### Typography
- Display headings: `font-display` (Playfair Display)
- Body text: `font-sans` (DM Sans)
- Large display: `text-display-lg` or `text-display-xl`
- Headings: `text-heading-lg`, `text-heading-md`
- Body: `text-body-md`, `text-body-sm`

### Spacing
- Container: `container-wide` (max-w-1440, responsive padding)
- Sections: `section` (responsive vertical padding)
- Card padding: `p-6`
- Grid gaps: `gap-6` (24px)

### Effects
- Shadows: `shadow-soft-sm`, `shadow-soft-md`, `shadow-soft-lg`
- Rounded corners: `rounded-xl` (cards), `rounded-full` (buttons/chips)
- Hover card effect: `card-hover` class
- Glass effect: `glass` class

---

## Verification Checklist

After completing each phase, verify:

- [ ] `npm run dev` works without errors
- [ ] No TypeScript errors
- [ ] Components render correctly
- [ ] Responsive design works (test mobile/tablet/desktop)
- [ ] Dark mode not broken (if applicable)
- [ ] All links navigate correctly
- [ ] Images load properly
- [ ] Animations are smooth

---

## File Structure Summary

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── property/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   └── search/
│       ├── page.tsx
│       └── loading.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── chip.tsx
│   │   ├── counter.tsx
│   │   ├── rating.tsx
│   │   ├── skeleton.tsx
│   │   ├── image-carousel.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── index.ts
│   ├── search/
│   │   ├── search-widget.tsx
│   │   ├── location-input.tsx
│   │   ├── date-picker.tsx
│   │   ├── guest-selector.tsx
│   │   └── index.ts
│   ├── property/
│   │   ├── property-card.tsx
│   │   ├── property-grid.tsx
│   │   ├── property-hero.tsx
│   │   ├── property-amenities.tsx
│   │   ├── property-reviews.tsx
│   │   ├── booking-sidebar.tsx
│   │   └── index.ts
│   └── home/
│       ├── hero.tsx
│       ├── category-tabs.tsx
│       ├── value-proposition.tsx
│       └── index.ts
├── lib/
│   ├── utils.ts
│   ├── stores/
│   │   └── search-store.ts
│   └── hooks/
│       ├── use-media-query.ts
│       ├── use-scroll-direction.ts
│       └── index.ts
├── types/
│   ├── property.ts
│   ├── search.ts
│   └── booking.ts
└── data/
    └── mock-properties.ts
```

---

Begin execution with Phase 1. After each phase, confirm completion before proceeding.
