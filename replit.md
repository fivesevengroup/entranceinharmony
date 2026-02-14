# Entrance in Harmony - Beauty & Aesthetics

## Overview

"Entrance in Harmony" is a full-stack web application for a beauty salon in Burbach, Germany, specializing in facial treatments and aesthetic services. The platform enables customers to explore services, view pricing, purchase gift vouchers, and book appointments via WhatsApp. It features an elegant, luxurious design inspired by high-end beauty brands, a gallery, testimonials, and an integrated Stripe-based voucher purchasing system. The project aims to provide a comprehensive online presence, enhancing customer engagement and streamlining business operations.

## User Preferences

- Preferred communication style: Simple, everyday language.
- Testing: Do not run tests unless explicitly requested by user.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Vite for development and bundling. It employs React Router (wouter) for navigation and TanStack Query for server state management. The UI utilizes Shadcn/ui components based on Radix UI primitives, styled with Tailwind CSS for a responsive, mobile-first design. A custom design system defines the mauve and gold color palette, typography (Cormorant Garamond and Inter), and consistent spacing. Form handling is managed with React Hook Form and Zod validation.

### Backend Architecture

The backend is developed with Express.js and TypeScript, designed as a RESTful API. It integrates the Stripe SDK for secure payment processing and uses an in-memory storage layer for development, with an interface designed for future migration to Drizzle ORM and PostgreSQL. Key routes support service retrieval, voucher management (CRUD operations for custom and service-based vouchers), and Stripe payment intent creation.

### Data Storage

Currently, data is stored in-memory using Map data structures with UUID-based entity identification. A PostgreSQL database with Neon serverless and Drizzle ORM is configured for future persistence. Data models include Users (for future authentication), Services (treatments with pricing), and Vouchers. Vouchers support two types: custom amount and service-based, with a "service snapshot" pattern to preserve historical pricing for service-based vouchers.

### Authentication & Authorization

While a User schema exists with a password field, authentication and authorization are not yet implemented. Future plans include session-based authentication and user management.

### UI/UX Design

The application features a sophisticated visual design with a mauve and gold color scheme. Typography combines Cormorant Garamond for headings and Inter for body text. The homepage hero section includes a dramatic two-phase "Gold Dust Entrance" animation for the slogan "ENTRANCE IN HARMONY," utilizing Framer Motion for particle effects and text reveals, along with continuous sparkle and halo glow animations. The design is fully responsive.

### SEO Optimization

Comprehensive SEO is implemented via a reusable `SEOHead` component (`client/src/components/SEOHead.tsx`):
- **Per-page meta tags**: Every page has a unique title, meta description, canonical URL, and robots directive
- **Open Graph**: Full og:title, og:description, og:image, og:url, og:type, og:locale for social sharing (WhatsApp, Facebook)
- **Twitter Cards**: summary_large_image with title, description, image
- **Schema.org Structured Data**: LocalBusiness schema on homepage (with services, address, geo coords, areaServed), BreadcrumbList on all pages, FAQPage on LaserBehandlungen
- **Sitemap & Robots**: `client/public/sitemap.xml` and `client/public/robots.txt`
- **Local SEO**: geo.region, geo.placename, geo.position, ICBM tags in index.html
- **Legal pages**: Marked as `noindex` and excluded from sitemap
- **Keywords**: German-language, optimized for großzügiges Einzugsgebiet rund um Burbach: Siegerland (Siegen, Kreuztal, Netphen, Freudenberg, Hilchenbach, Neunkirchen, Wilnsdorf), Lahn-Dill-Kreis (Haiger, Dillenburg, Herborn, Wetzlar, Eschenburg), Westerwald (Betzdorf, Herdorf, Kirchen, Daaden, Rennerod, Hachenburg, Bad Marienberg, Westerburg), Sauerland/Olpe (Olpe, Attendorn, Lennestadt), Wittgenstein (Bad Laasphe, Bad Berleburg, Erndtebrück)
- **areaServed (Schema.org)**: 30 Städte/Gemeinden im Umkreis von ca. 40-50km um Burbach

### Legal Compliance

The application includes comprehensive legal pages (Impressum, Datenschutz, AGB, Widerruf) covering vouchers, treatments, and product sales. These pages are updated to comply with German legal requirements, including data protection regulations (DSGVO), terms and conditions for treatment bookings and product sales, and specific provisions for hygiene products and early service performance. A mandatory checkbox for AGB acceptance is integrated into the voucher purchase form.

### Voucher System

The voucher system supports two types:
1.  **Custom Amount Vouchers:** Users select or enter a monetary value, applicable to any service.
2.  **Service-Based Vouchers:** Tied to specific treatments, with the amount determined by the service's price. A "service snapshot" feature captures service name and price at purchase to prevent historical pricing discrepancies. Backend price enforcement ensures secure and accurate voucher values.

## External Dependencies

-   **Payment Processing:** Stripe Elements (embedded payment processing, supports various methods), Stripe SDK.
-   **UI Libraries:** Radix UI (accessible components), Lucide React (icons), React Icons (social media icons).
-   **Date Manipulation:** Date-fns.
-   **Database (Configured):** Neon serverless PostgreSQL, Drizzle ORM, Drizzle Kit.
-   **Form Handling:** React Hook Form, Zod, @hookform/resolvers.
-   **Third-Party Integrations:** WhatsApp Business (for appointment booking), Google Maps (for location display).