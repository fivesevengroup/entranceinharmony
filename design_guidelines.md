# Design Guidelines: Entrance in Harmony - Beauty & Aesthetics

## Design Approach

**Selected Approach:** Reference-Based (Premium Beauty Industry Standards)
Drawing inspiration from high-end beauty and wellness brands like Glossier, Sephora, and boutique spa experiences that emphasize elegance, trust, and sophistication.

**Core Design Principles:**
- Luxurious minimalism with carefully placed golden accents
- Soft, welcoming aesthetics that evoke relaxation and trust
- Clean layouts that let treatments and results speak for themselves
- Feminine elegance without being overly ornate

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- **Mauve Base:** 280 35% 85% (soft, calming background)
- **Deep Mauve:** 280 45% 25% (text, headers)
- **Gold Accent:** 45 85% 75% (#f4d48f - for logo, CTAs, highlights)

**Supporting Colors:**
- **Warm White:** 45 40% 98% (backgrounds, cards)
- **Soft Rose:** 340 60% 92% (subtle highlights)
- **Deep Gold:** 45 75% 55% (hover states, active elements)
- **Success Green:** 150 45% 55% (confirmations)

**Dark Mode (if implemented):**
- Background: 280 25% 15%
- Surface: 280 20% 20%
- Gold remains vibrant: 45 85% 65%

### B. Typography

**Font Families:**
- **Primary (Headings):** 'Cormorant Garamond' or 'Playfair Display' (elegant serif via Google Fonts)
- **Secondary (Body):** 'Inter' or 'Work Sans' (clean sans-serif)
- **Accent (Special CTAs):** Same as primary headings but in gold

**Typography Scale:**
- Hero Headline: text-5xl md:text-7xl font-light tracking-tight
- Section Headers: text-3xl md:text-4xl font-light
- Card Titles: text-xl md:text-2xl font-medium
- Body Text: text-base md:text-lg leading-relaxed
- Small Print: text-sm text-mauve-600

### C. Layout System

**Spacing Primitives:**
Core spacing units: **4, 8, 12, 16, 24** (as in p-4, mb-8, gap-12, py-16, mt-24)

**Container Strategy:**
- Max-width: max-w-7xl for main content
- Section padding: py-16 md:py-24
- Card spacing: p-6 md:p-8
- Grid gaps: gap-6 md:gap-8

**Grid Patterns:**
- Services: 1-column mobile, 2-column tablet, 3-column desktop
- Testimonials: 1-column mobile, 2-column tablet, 3-column desktop
- Gallery: Masonry grid 2-col mobile, 3-col tablet, 4-col desktop

### D. Component Library

**Navigation:**
- Sticky header with subtle backdrop blur
- Logo in gold (left-aligned)
- Main nav links in deep mauve with gold underline on hover
- WhatsApp & Instagram icon buttons in gold with hover lift effect
- Mobile: Elegant slide-in menu with gold dividers

**Hero Section:**
- Large background image (luxury spa/treatment room) with subtle mauve overlay
- Centered content with gold logo prominent
- Headline in elegant serif, subheading in sans-serif
- Dual CTAs: Primary gold button + outline button with blur background
- Height: 85vh to allow scroll preview

**Service Cards:**
- White cards with subtle shadow on hover
- Gold icon at top (32x32px)
- Service name in serif font
- Short description in sans-serif
- Price in gold at bottom
- Hover: Gentle lift (translate-y-1) + enhanced shadow

**Testimonial Cards:**
- Soft mauve background (280 35% 95%)
- 5 gold stars at top
- Quote text in italic serif
- Customer name/initials in small caps
- Subtle gold border on left edge

**Gutschein (Voucher) Cards:**
- Two options displayed side-by-side on desktop
- **Digital:** Email icon, instant delivery badge, PayPal button
- **Physical:** Gift box icon, +2,90€ shipping note, elegant envelope visual
- Gold gradient border on hover
- Amount selector: Chips for 25€, 50€, 100€, custom input

**CTA Buttons:**
- Primary: Solid gold background (45 85% 75%), deep mauve text, rounded-lg
- Secondary: Outline gold border, gold text, blur background when on images
- Hover: Slight scale (1.02) + deeper gold shade
- All buttons: px-8 py-3 text-base font-medium

**Forms:**
- Input fields: White background, mauve border, gold focus ring
- Labels: Small caps in deep mauve
- Submit buttons: Full-width gold CTAs
- Validation: Soft red for errors, success green for confirmations

**Gallery:**
- Before/After sliders with gold divider line
- Lightbox modal with mauve backdrop
- Instagram feed integration in masonry layout
- Lazy loading with elegant fade-in

**Bewertungen (Reviews) Section:**
- Heading: "Was Kundinnen über uns sagen" in elegant serif
- Display 5 reviews in 3-column grid (desktop)
- Gold stars (★★★★★) at top of each card
- Soft mauve card backgrounds with rounded corners
- "Mehr Bewertungen" button linking to Google Reviews
- Subtle fade-in animation on scroll

**Footer:**
- Dark mauve background (280 45% 20%)
- 4-column layout: About, Services, Contact, Social
- Gold accents for links and icons
- Google Maps embedded with mauve-gold custom styling
- Newsletter signup with gold submit button
- Impressum & Datenschutz links in smaller text

### E. Animations

**Subtle Interactions Only:**
- Card hover: translate-y-1 transform with transition-all duration-300
- Button hover: scale-105 with transition-transform
- Page sections: Fade-in on scroll (opacity + translateY)
- Stars in reviews: Staggered fade-in (delay-75, delay-150, etc.)
- Gutschein cards: Gentle shimmer effect on gold border (every 3s)

**Avoid:**
- Parallax scrolling
- Complex animations that distract
- Continuous looping animations

---

## Page-Specific Design Notes

**Startseite (Home):**
- Hero with spa treatment image, centered gold logo, dual CTAs
- Philosophy section: 2-column (image left, text right) with gold accent line
- Services preview: 3-card grid linking to full services page
- Testimonials snippet: 3 best reviews with "Alle Bewertungen" link
- Final CTA section with appointment booking emphasis

**Leistungen (Services):**
- Category tabs/sections (Gesichtsbehandlung, Körperbehandlung, etc.)
- Service cards in 3-column grid
- Each card: Icon, name, description, price, "Termin anfragen" button
- Sticky sidebar with quick links to categories

**Preisliste (Price List):**
- Clean table layout with alternating soft mauve rows
- Category headers in gold
- PDF download button (gold, prominent)
- Mobile: Stacked card layout

**Galerie:**
- Masonry grid (justified layout)
- Before/After comparison sliders
- Instagram feed section (last 9 posts)
- Fullscreen lightbox on click

**Gutschein-Seite:**
- Hero: "Schenke Harmonie" with gift imagery
- Two-column choice: Digital vs Physical
- Modal for purchase flow (PayPal integration)
- Custom amount input with gold border
- Personal message textarea with character count

**Kontakt:**
- Split layout: Form left (60%), info right (40%)
- Google Maps embed with custom mauve-gold markers
- WhatsApp quick action button floating bottom-right
- Opening hours in elegant card format

---

## Images Strategy

**Hero Image:** 
Large, high-quality image of a serene treatment room or relaxing spa environment with soft, natural lighting. Image should be 1920x1080px minimum, with mauve color overlay (opacity 30%) to maintain brand consistency and ensure text readability.

**Service Icons:**
Use line-style icons from Heroicons or Font Awesome in gold color for each treatment category (facial, massage, body treatments, etc.)

**Gallery Images:**
Professional before/after photos of treatments (8-12 images), Instagram feed integration showing lifestyle and result images

**Gutschein Section:**
Elegant gift box or spa product image, physical voucher mockup in gold envelope

**About/Philosophy:**
Warm, inviting image of the practitioner or treatment space emphasizing trust and professionalism

**Testimonials:**
Small circular profile images where available, otherwise use elegant initial badges in gold

All images should maintain the soft, luxurious aesthetic with warm tones that complement the mauve and gold color scheme.