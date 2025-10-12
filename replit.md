# Entrance in Harmony - Beauty & Aesthetics

## Overview

This is a beauty salon website for "Entrance in Harmony" in Burbach, Germany, specializing in facial treatments and aesthetic services. The application is a full-stack web platform that allows customers to learn about services, view pricing, purchase gift vouchers, and book appointments via WhatsApp integration.

The site emphasizes elegant, luxurious design with a mauve and gold color palette inspired by high-end beauty brands like Glossier and Sephora. It features service listings, a gallery, testimonials, and an integrated Stripe-based voucher purchasing system.

## User Preferences

- Preferred communication style: Simple, everyday language.
- Testing: Do not run tests unless explicitly requested by user.

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
- Stripe SDK integration for secure payment processing
- In-memory storage layer with interface for future database migration

**Key Routes:**
- `/api/services` - GET endpoint to retrieve available beauty treatments
- `/api/vouchers` - Voucher CRUD operations (supports both custom-amount and service-based vouchers)
- `/api/create-payment-intent` - Stripe payment intent creation
- `/api/vouchers/:id/payment` - Update voucher payment status
- `/download/elena-portrait.jpg` - Download about page image

**Storage Layer:**
- Abstract IStorage interface defining data access methods
- MemStorage implementation for development (in-memory)
- Designed for easy migration to Drizzle ORM with PostgreSQL
- Support for User, Voucher, and Service entities
- Pre-loaded services: Hydrafacial Deluxe, Klassische Gesichtsbehandlung, Anti-Aging Behandlung, Aqua Facial, Microdermabrasion

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
  - Services table (id, name, shortDescription, durationMinutes, price, stripeProductId, createdAt)
  - Vouchers table (id, orderNumber, purchaseType, amount, serviceId, serviceSnapshotName, serviceSnapshotPrice, deliveryMethod, recipient info, payment status)

**Data Models:**
- User: Authentication and account management
- Service: Beauty treatments/services with pricing and duration information
- Voucher: Gift voucher with two purchase types:
  - Custom: Free-amount vouchers where user chooses any amount
  - Service: Treatment-specific vouchers linked to a service (amount determined by service price)
  - Includes service snapshot fields (serviceSnapshotName, serviceSnapshotPrice) to preserve historical pricing
  - Digital/postal delivery options with Stripe payment integration

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
- Stripe for secure payment processing with automatic payment methods
- Supports credit cards, PayPal, and other payment methods through Stripe
- Environment variables: VITE_STRIPE_PUBLIC_KEY (frontend), STRIPE_SECRET_KEY (backend)
- Payment flow: Create payment intent → Stripe checkout → Confirm payment → Update voucher status

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

## Voucher System Architecture (October 2025)

### Two-Type Voucher System

The application supports two distinct types of gift vouchers, each serving different customer needs:

**1. Custom Amount Vouchers (purchaseType: "custom")**
- Users select or enter any monetary value (€25, €50, €75, €100, or custom)
- Flexible redemption - can be applied to any service or combination of services
- Amount is user-defined and validated on both frontend and backend

**2. Service-Based Vouchers (purchaseType: "service")**
- Vouchers tied to specific beauty treatments
- Amount automatically determined by the selected service's price
- Service details are "snapshotted" at purchase time to preserve historical pricing
- Prevents pricing discrepancies if service prices change after voucher purchase

### Service Snapshot Pattern

When a service-based voucher is created, the system captures and stores:
- `serviceSnapshotName`: The name of the treatment at time of purchase
- `serviceSnapshotPrice`: The exact price at time of purchase
- `serviceId`: Reference to the original service (for tracking/analytics)

This ensures that voucher value remains consistent even if the salon updates their pricing.

### Security Implementation

**Backend Price Enforcement:**
- For service-based vouchers, the backend determines the voucher amount from the service price
- Client-submitted amount is ignored and overridden by backend-fetched service price
- Prevents price manipulation attacks where users could modify the amount before submission

**Validation Flow:**
1. Frontend validates purchaseType and serviceId selection
2. Backend receives voucher creation request
3. If purchaseType is "service", backend fetches service from storage
4. Backend snapshots service name and price
5. Backend overrides any client-submitted amount with service.price
6. Voucher is created with server-determined amount

### Pre-loaded Services

The system comes with 5 realistic beauty treatments pre-loaded in memory:

1. **Hydrafacial Deluxe** - €89, 60 minutes
   - Intensive Tiefenreinigung mit Hyaluronsäure

2. **Klassische Gesichtsbehandlung** - €75, 75 minutes
   - Entspannende Behandlung für jeden Hauttyp

3. **Anti-Aging Behandlung** - €95, 90 minutes
   - Straffende Behandlung gegen Falten

4. **Aqua Facial** - €79, 60 minutes
   - Feuchtigkeitsspendende Intensivpflege

5. **Microdermabrasion** - €65, 45 minutes
   - Sanftes Peeling für glatte Haut

### User Experience Flow

**Voucher Purchase Journey:**
1. User navigates to /gutscheine (vouchers page)
2. User selects voucher type:
   - "Freier Betrag" (Custom Amount) → Shows amount selection with predefined options
   - "Für eine Behandlung" (For a Treatment) → Shows list of available services
3. For service vouchers, each service displays:
   - Treatment name
   - Short description
   - Duration in minutes
   - Price in euros
4. User selects delivery method (digital email or postal)
5. User provides recipient and buyer information
6. System creates voucher with appropriate amount
7. User proceeds to Stripe payment
8. Upon successful payment, voucher is marked as paid

### Frontend Implementation

**Component: client/src/pages/Vouchers.tsx**
- Fetches services from `/api/services` endpoint using TanStack Query
- Conditionally renders form fields based on selected purchaseType
- Form validation ensures serviceId is required when purchaseType is "service"
- Amount field only shown and required for custom vouchers
- Service selection radio group only shown for service-based vouchers

### Backend Implementation

**Storage: server/storage.ts**
- `getServices()`: Returns all available services
- `getService(id)`: Fetches specific service by ID
- `createService(service)`: Adds new service to storage
- Services are seeded on MemStorage initialization

**Routes: server/routes.ts**
- `GET /api/services`: Returns list of all services
- `POST /api/vouchers`: 
  - Validates voucher data with Zod schema
  - For service vouchers: fetches service, snapshots details, overrides amount
  - Creates voucher with appropriate data
  - Returns created voucher for payment processing