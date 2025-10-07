# Entrance in Harmony - Beauty & Aesthetics

## Overview

This is a beauty salon website for "Entrance in Harmony" in Burbach, Germany, specializing in facial treatments and aesthetic services. The application is a full-stack web platform that allows customers to learn about services, view pricing, purchase gift vouchers, and book appointments via WhatsApp integration.

The site emphasizes elegant, luxurious design with a mauve and gold color palette inspired by high-end beauty brands like Glossier and Sephora. It features service listings, a gallery, testimonials, and an integrated PayPal-based voucher purchasing system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- React Router (wouter) for client-side routing
- TanStack Query (React Query) for server state management

**UI Component System:**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component-based architecture with reusable UI elements (Header, Footer, ServiceCard, TestimonialCard, etc.)
- Responsive design with mobile-first approach

**Design System:**
- Custom color palette with mauve base (280 35% 85%) and gold accent (#f4d48f)
- Typography using Cormorant Garamond for headings and Inter for body text
- Consistent spacing and elevation system with hover effects
- Dark mode support configured in Tailwind

**State Management:**
- React Hook Form with Zod validation for form handling
- TanStack Query for API data fetching and caching
- Local component state with React hooks

### Backend Architecture

**Server Framework:**
- Express.js as the web server
- TypeScript for type safety across the stack
- ESM module system (type: "module")

**API Design:**
- RESTful API endpoints for voucher management
- PayPal SDK integration for payment processing
- In-memory storage layer with interface for future database migration

**Key Routes:**
- `/api/vouchers` - Voucher CRUD operations
- `/order` - PayPal order creation
- `/order/:orderID/capture` - PayPal payment capture
- `/setup` - PayPal configuration endpoint

**Storage Layer:**
- Abstract IStorage interface defining data access methods
- MemStorage implementation for development (in-memory)
- Designed for easy migration to Drizzle ORM with PostgreSQL
- Support for User and Voucher entities

### Data Storage

**Current Implementation:**
- In-memory storage using Map data structures
- UUID-based entity identification
- Type-safe schema definitions with Drizzle Zod

**Planned Database (Configured but Not Active):**
- PostgreSQL via Neon serverless
- Drizzle ORM for type-safe database queries
- Schema definitions in `shared/schema.ts`:
  - Users table (id, username, password)
  - Vouchers table (id, orderNumber, amount, deliveryMethod, recipient info, payment status)

**Data Models:**
- User: Authentication and account management
- Voucher: Gift voucher with digital/postal delivery options, PayPal integration

### Authentication & Authorization

**Current State:**
- User schema defined but authentication not implemented
- Password field exists for future auth implementation
- No active session management or protected routes

**Planned:**
- Session-based authentication with connect-pg-simple
- User registration and login functionality

### External Dependencies

**Payment Processing:**
- PayPal Server SDK for order creation and payment capture
- Sandbox environment for development, production for live
- Critical payment code marked as "DO NOT MODIFY" to prevent integration failures

**UI Libraries:**
- Radix UI for accessible, unstyled component primitives
- Lucide React for icons
- React Icons for social media icons (WhatsApp, Instagram)
- Date-fns for date manipulation

**Database (Configured):**
- Neon serverless PostgreSQL
- Drizzle ORM with Drizzle Kit for migrations
- Connection via DATABASE_URL environment variable

**Development Tools:**
- TSX for running TypeScript directly in development
- ESBuild for production bundling
- Vite plugins for Replit integration (cartographer, dev-banner, runtime-error-overlay)

**Form Handling:**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for Zod integration

**Third-Party Integrations:**
- WhatsApp Business integration for appointment booking (links to wa.me)
- Instagram integration (referenced but not fully implemented)
- Google Maps for location display (referenced in footer)

### Hero Section Animations (October 2025)

**Dramatic Two-Phase "Gold Dust Entrance" Animation:**

The homepage hero section features a spectacular sequential animation for the slogan "ENTRANCE IN HARMONY" with gold dust particle effects:

**Phase 1: ENTRANCE IN (0-1.3s)**
- 20 gold dust particles animate from random positions toward the text
- Particle specs: 1px size, mix-blend-mode screen for luminosity
- Animation: Duration 1.0s, stagger 0.01s, cubic-bezier easing [0.43, 0.13, 0.23, 0.96]
- Text reveal: Opacity 0→1 over 1.0s with gold gradient (hsl 46 74% 62%)
- CSS class: `.gold-dust-reveal`
- Particles removed from DOM at 1.3s after animation completes (no visual popping)

**Phase 2: HARMONY (1.3s-2.78s) - Dramatic Climax**
- 60 gold dust particles explode outward from center in radial burst pattern
- Radial pattern: 360° circle, radius 150-200px from center
- Particle specs: 1.5px size, mix-blend-mode screen
- Animation: Duration 1.0s, stagger 0.008s, elastic easing [0.34, 1.56, 0.64, 1] for dramatic pop
- HARMONY text scale pop: 0.85→1 with elastic easing for dramatic entrance
- HARMONY styling: Double drop-shadow (30px + 60px), brighter gradient (hsl 46 74% 72%)
- CSS classes: `.gold-dust-reveal-harmony`, `.harmony-dramatic`
- Particles removed from DOM at 3.0s (220ms buffer after animation completes)

**Continuous Effects:**
- 6 sparkle particles loop indefinitely (start after 2.5s)
- Halo glow spotlight rotates around text (8s animation cycle)
- All effects use Framer Motion for precise timing and StrictMode safety

**Implementation Details:**
- Built with Framer Motion (useAnimation hooks)
- State-controlled particle visibility prevents visual "popping"
- Timer cleanup in useEffect ensures StrictMode compatibility
- CSS utilities in `client/src/index.css`: `.gold-dust-reveal`, `.gold-dust-reveal-harmony`, `.harmony-dramatic`
- Component: `client/src/components/Hero.tsx`

**Performance Considerations:**
- Maximum 60 particles at once during harmony burst
- Particles removed after animation completes to prevent DOM bloat
- Mix-blend-mode screen provides luminous effect without heavy compositing
- Mobile-responsive with proper breakpoints