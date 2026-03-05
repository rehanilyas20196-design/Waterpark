# WaterPark Website - Architecture & Design

## 🏗️ Component Architecture Diagram

```
App (Router)
│
└─ MainLayout
   ├─ Header (Navigation, Logo)
   │  └─ Mobile Menu (responsive)
   │
   ├─ Pages (Route-based)
   │  ├─ Home
   │  │  ├─ Hero3D (3D animation)
   │  │  ├─ Carousel (Featured)
   │  │  ├─ AttractionCard Grid
   │  │  └─ CTA Sections
   │  │
   │  ├─ Attractions
   │  │  ├─ Filter Buttons
   │  │  └─ AttractionCard Grid
   │  │
   │  ├─ Booking
   │  │  └─ BookingForm (Multi-step)
   │  │     ├─ Step 1: Date & Party
   │  │     ├─ Step 2: Ticket Selection
   │  │     ├─ Step 3: Add-ons
   │  │     └─ Step 4: Confirmation
   │  │
   │  ├─ BookingConfirmation
   │  │  ├─ Success Message
   │  │  ├─ Booking Details
   │  │  └─ Receipt/PDF
   │  │
   │  ├─ About
   │  │  ├─ Mission/Values
   │  │  └─ Statistics
   │  │
   │  └─ Contact
   │     ├─ Contact Form
   │     └─ Hours of Operation
   │
   └─ Footer
      ├─ Quick Links
      ├─ Contact Info
      └─ Social Links
```

---

## 🔄 Data Flow & State Management

### Booking Flow
```
Home (CTA) 
  ↓
Booking Page
  ↓
BookingForm (Step 1-4)
  ↓
useBookingStore (Zustand)
  ├─ date
  ├─ partySize
  ├─ ticketType
  ├─ addOns
  ├─ guestInfo
  └─ total (calculated)
  ↓
localStorage (persist)
  ↓
BookingConfirmation
```

### Component Prop Flow
```
MainLayout
├─ Header
│  └─ navLinks (hardcoded)
│
├─ Page
│  └─ useBookingStore (global state)
│  └─ useParallax (custom hook)
│  └─ useCapacityStatus (custom hook)
│
└─ Footer
   └─ quickLinks (hardcoded)
```

---

## 📊 State Management Architecture

### Zustand Store (`bookingStore.ts`)
```typescript
useBookingStore
├── State
│   ├── date: string
│   ├── partySize: number
│   ├── ticketType: string
│   ├── addOns: string[]
│   ├── firstName: string
│   ├── lastName: string
│   ├── email: string
│   ├── phone: string
│   └── total: number
│
└── Actions
    ├── setDate()
    ├── setPartySize()
    ├── setTicketType()
    ├── toggleAddOn()
    ├── setGuestInfo()
    ├── calculateTotal()
    └── reset()
```

### localStorage Persistence
- Key: `waterpark-booking`
- Updated on every state change
- Survives page refresh

---

## 🎨 Styling Architecture

### Tailwind CSS Strategy
- **Utility-first approach**
- **Custom colors** in `tailwind.config.ts`
- **Responsive prefixes**: `sm:`, `md:`, `lg:`
- **Component classes** for reusable patterns

### Color Variables
```css
--primary: #0066CC
--secondary: #FFB300
--accent: #00B359
--text: #333333
--muted: #666666
--error: #CC0000
```

### Global Styles (`index.css`)
- Tailwind directives
- Accessibility utilities
- Skip link styling
- Focus indicators
- Reduced motion support

---

## ♿ Accessibility Implementation

### WCAG 2.1 AA+ Compliance

#### Semantic HTML
- Proper heading hierarchy (h1-h6)
- `<nav>`, `<header>`, `<main>`, `<footer>`
- `<article>`, `<section>` for content blocks
- `<button>` for interactions (not div)

#### ARIA Attributes
```tsx
<nav aria-label="Main navigation">
<div role="tabpanel" aria-hidden={!active}>
<button aria-expanded={isOpen} aria-label="Menu">
<div role="progressbar" aria-valuenow={50} aria-valuemax={100}>
<input aria-invalid={hasError} aria-describedby="error">
```

#### Keyboard Navigation
- Tab order correct (tab index = -1 for custom)
- Escape to close modals
- Enter to submit forms
- Arrow keys in carousels

#### Focus Management
```css
:focus-visible {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
}
```

#### Color Contrast
- All text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- Icons: Same as adjacent text

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## 🔌 Custom Hooks

### `useParallax(speed)`
- Returns Y offset for parallax effect
- Updates on scroll
- Cleanup on unmount

```tsx
const offset = useParallax(0.5);
<div style={{ transform: `translateY(${offset}px)` }} />
```

### `useCapacityStatus(current, max)`
- Returns percentage, status, color
- Used in capacity indicators

```tsx
const { percentage, status, color } = useCapacityStatus(38, 50);
<div className={color} style={{ width: `${percentage}%` }} />
```

---

## 📦 API Integration Points (Phase 2+)

### Booking API
```
POST /api/bookings
{
  date: string
  partySize: number
  ticketType: string
  addOns: string[]
  guestInfo: {...}
}
```

### Attractions API
```
GET /api/attractions
GET /api/attractions/:id
```

### Availability API
```
GET /api/availability?date=YYYY-MM-DD
```

---

## 🚀 Performance Metrics

### Target Metrics
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3.5s

### Optimization Strategies
1. **Code Splitting**: Route-based chunks
2. **Tree Shaking**: Unused code removal
3. **Image Optimization**: SVG/emoji icons
4. **Cache**: localStorage, HTTP caching
5. **Lazy Loading**: Intersection Observer

---

## 🔐 Security Considerations

### Input Validation
- react-hook-form validation
- HTML5 form validation
- TypeScript type checking

### Data Handling
- No sensitive data in localStorage
- Form data cleared after submission
- HTTPS only (production)

### CSRF Protection
- Implement token-based CSRF (Phase 2)
- SameSite cookie policy

---

## 📈 Scalability Strategy

### Phase 1 (MVP)
- Static attractions data
- Client-side booking form
- localStorage persistence

### Phase 2 (Enhancement)
- Backend API integration
- Database for bookings
- Email notifications
- Payment processing

### Phase 3+ (Scale)
- Admin dashboard
- Real-time availability
- User accounts
- Analytics & reporting

---

## 🧪 Testing Strategy

### Unit Tests (Phase 2)
- Component rendering
- Hook behavior
- Utility functions

### Integration Tests
- Booking flow
- Navigation
- Form submission

### E2E Tests
- Complete user journeys
- Cross-browser testing
- Mobile/responsive

### A11y Testing
- Axe DevTools
- WAVE scanner
- Screen reader testing

---

## 📝 Code Standards

### TypeScript
- Strict mode enabled
- Interfaces for all data
- Type narrowing where needed

### React Patterns
- Functional components
- Custom hooks for logic
- Props drilling minimized

### File Organization
- One component per file
- Consistent naming: `PascalCase` for components
- Descriptive variable names

### Comments
- JSDoc for functions
- Inline comments for complex logic
- README in each directory

---

## 🔄 Git Workflow

```
main (production)
  ↑
release (staging)
  ↑
develop (development)
  ↑
feature/* (feature branches)
```

---

## 📚 Documentation Standards

- README in each directory
- Inline code comments
- TypeScript types as documentation
- Component storybook (Phase 2)

---

## 🎯 Next Steps

1. ✅ Set up project structure
2. ✅ Create components
3. ✅ Implement routing
4. ✅ Add accessibility
5. 📋 Run locally & test
6. 📋 Deploy to hosting
7. 📋 Monitor & improve

