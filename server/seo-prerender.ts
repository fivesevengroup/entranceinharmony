import fs from "fs";
import path from "path";
import type { Request, Response, NextFunction } from "express";

const BASE_URL = "https://www.entranceinharmony.de";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

interface RouteConfig {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  noscriptContent?: string;
}

const AREA_SERVED = [
  "Burbach", "Siegen", "Neunkirchen (Siegerland)", "Wilnsdorf", "Haiger", "Dillenburg", "Herborn",
  "Netphen", "Kreuztal", "Freudenberg (Siegerland)", "Herdorf", "Betzdorf", "Kirchen (Sieg)", "Daaden",
  "Rennerod", "Hachenburg", "Bad Marienberg", "Westerburg", "Olpe", "Attendorn", "Lennestadt",
  "Hilchenbach", "Bad Laasphe", "Bad Berleburg", "Erndtebrück", "Wetzlar", "Eschenburg",
  "Dietzhölztal", "Driedorf", "Greifenstein"
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Entrance in Harmony",
  "alternateName": "Entrance in Harmony - Beauty & Aesthetics",
  "description": "Professionelles Kosmetikstudio in Burbach im Siegerland, spezialisiert auf Gesichtsbehandlungen, Red Touch Pro Laserbehandlungen und Beauty-Treatments. Für Kunden aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf, Westerwald und Umgebung. Inhaberin Elena Hartstein.",
  "url": BASE_URL,
  "telephone": "+491709287722",
  "email": "info@entranceinharmony.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Höhfeld 5",
    "addressLocality": "Burbach",
    "postalCode": "57299",
    "addressRegion": "NRW",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.7503,
    "longitude": 8.0831
  },
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "image": OG_IMAGE,
  "founder": {
    "@type": "Person",
    "name": "Elena Hartstein"
  },
  "areaServed": AREA_SERVED.map(name => ({ "@type": "City", "name": name })),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Beauty & Laser Behandlungen",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gesichtsbehandlung Tiefenreinigung",
          "description": "Professionelle Tiefenreinigung mit Hautanalyse und individueller Pflege"
        },
        "price": "85",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Red Touch Pro Laserbehandlung Gesicht",
          "description": "Nicht-invasive Kollagenstimulation mit DEKA Lasertechnologie für Hautverjüngung"
        },
        "price": "250",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "BB Glow Behandlung",
          "description": "Semi-permanente Foundation für einen natürlich strahlenden Teint"
        },
        "price": "85",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Microneedling",
          "description": "Kollagenstimulierende Hautbehandlung für Narben, Falten und Hautstraffung"
        },
        "price": "90",
        "priceCurrency": "EUR"
      }
    ]
  }
};

function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
}

const ROUTES: Record<string, RouteConfig> = {
  "/": {
    title: "Entrance in Harmony – Kosmetikstudio Burbach | Gesichtsbehandlungen & Laser im Siegerland",
    description: "Professionelles Kosmetikstudio in Burbach – Ihr Beauty-Studio im Siegerland. Gesichtsbehandlungen, Red Touch Pro Laserbehandlungen, BB Glow & Microneedling. Für Kunden aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf & Umgebung.",
    ogImage: OG_IMAGE,
    structuredData: [localBusinessSchema],
    noscriptContent: `
      <h1>Entrance in Harmony – Kosmetikstudio Burbach im Siegerland</h1>
      <p>Professionelles Kosmetikstudio in Burbach (NRW), spezialisiert auf Gesichtsbehandlungen, Red Touch Pro Laserbehandlungen, BB Glow und Microneedling. Inhaberin Elena Hartstein bietet individuelle Beauty-Treatments für Kunden aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf und dem Westerwald.</p>
      <h2>Unsere Behandlungen</h2>
      <ul>
        <li>Gesichtsbehandlungen (Tiefenreinigung, BB Glow, Microneedling) – ab 80 €</li>
        <li>Red Touch Pro Laserbehandlung – ab 250 €</li>
        <li>Carboxy Therapie, Peelings und Pflegebehandlungen</li>
        <li>Geschenkgutscheine online kaufen</li>
      </ul>
      <p><strong>Adresse:</strong> Höhfeld 5, 57299 Burbach | <strong>Tel:</strong> +49 170 928 7722 | <strong>E-Mail:</strong> info@entranceinharmony.de</p>
    `
  },
  "/gesichtsbehandlungen": {
    title: "Gesichtsbehandlungen Siegerland – Tiefenreinigung, BB Glow, Microneedling | Entrance in Harmony Burbach",
    description: "Professionelle Gesichtsbehandlungen in Burbach bei Siegen: Tiefenreinigung, Carboxy Therapie, BB Glow, Microneedling & Peelings. Auch für Kunden aus Haiger, Dillenburg, Kreuztal, Netphen & Westerwald. Ab 80 €.",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Gesichtsbehandlungen", url: "/gesichtsbehandlungen" }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Professionelle Gesichtsbehandlungen im Siegerland",
        "description": "Gesichtsbehandlungen in Burbach bei Siegen: Tiefenreinigung, Carboxy Therapie, BB Glow, Microneedling und Peelings für ein strahlendes Hautbild.",
        "provider": { "@type": "BeautySalon", "name": "Entrance in Harmony", "url": BASE_URL },
        "areaServed": [
          { "@type": "City", "name": "Siegen" },
          { "@type": "City", "name": "Burbach" },
          { "@type": "City", "name": "Haiger" },
          { "@type": "City", "name": "Dillenburg" },
          { "@type": "City", "name": "Kreuztal" }
        ],
        "offers": [
          { "@type": "Offer", "name": "Basis-Pflegebehandlung", "price": "80", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Tiefenreinigung", "price": "85", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "BB Glow", "price": "85", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Microneedling", "price": "90", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Carboxy Therapie", "price": "90", "priceCurrency": "EUR" }
        ]
      }
    ],
    noscriptContent: `
      <h1>Gesichtsbehandlungen im Siegerland – Burbach bei Siegen</h1>
      <p>Erleben Sie professionelle Gesichtsbehandlungen in unserem Kosmetikstudio in Burbach. Wir bieten ein umfassendes Spektrum an Beauty-Treatments für ein gesundes und strahlendes Hautbild.</p>
      <h2>Unsere Gesichtsbehandlungen im Überblick</h2>
      <ul>
        <li><strong>Basis-Pflegebehandlung</strong> – Klassische Gesichtspflege. Ab 80 €</li>
        <li><strong>Tiefenreinigung</strong> – Professionelle Reinigung mit Hautanalyse. Ab 85 €</li>
        <li><strong>BB Glow</strong> – Semi-permanente Foundation für strahlende Haut. Ab 85 €</li>
        <li><strong>Microneedling</strong> – Kollagenstimulation für Narben und Falten. Ab 90 €</li>
        <li><strong>Carboxy Therapie</strong> – CO₂-Behandlung für Hautstraffung. Ab 90 €</li>
        <li><strong>Red Touch Pro Laser</strong> – Hautverjüngung mit Lasertechnologie. Ab 250 €</li>
      </ul>
      <p>Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal, Netphen, Betzdorf und dem Westerwald.</p>
    `
  },
  "/laserbehandlungen": {
    title: "Red Touch Pro Laser Siegerland – Hautverjüngung ohne OP in Burbach | Entrance in Harmony",
    description: "Sanfte Laser-Hautverjüngung mit Red Touch Pro in Burbach bei Siegen. Sichtbare Straffung & mehr Glow – ohne OP. Für Kunden aus dem Siegerland, Lahn-Dill-Kreis, Westerwald & Olpe. Jetzt Beratung vereinbaren.",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Laserbehandlungen", url: "/laserbehandlungen" }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Red Touch Pro Laserbehandlung – Hautverjüngung im Siegerland",
        "description": "Nicht-invasive Laserbehandlung mit Red Touch Pro (DEKA) zur Hautverjüngung, Kollagenstimulation, Faltenreduktion und Verbesserung des Hautbildes. Sanft, ohne OP, ohne Ausfallzeit.",
        "provider": { "@type": "BeautySalon", "name": "Entrance in Harmony", "url": BASE_URL },
        "areaServed": [
          { "@type": "City", "name": "Siegen" },
          { "@type": "City", "name": "Burbach" },
          { "@type": "City", "name": "Haiger" },
          { "@type": "City", "name": "Dillenburg" }
        ],
        "offers": [
          { "@type": "Offer", "name": "Laser Gesicht", "price": "250", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Laser Gesicht + Hals", "price": "300", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Laser Gesicht + Hals + Dekolleté", "price": "350", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Laser Hände", "price": "90", "priceCurrency": "EUR" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Was ist Red Touch Pro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Red Touch Pro ist ein professionelles Lasersystem von DEKA zur nicht-invasiven Hautverjüngung. Die 675-nm-Wellenlänge stimuliert die natürliche Kollagenproduktion tief in der Haut und verbessert Falten, Hautstraffung, Narben und Dehnungsstreifen."
            }
          },
          {
            "@type": "Question",
            "name": "Ist die Laserbehandlung schmerzfrei?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, die Red Touch Pro Behandlung wird von den meisten Kunden als sehr angenehm empfunden. Dank der integrierten Hautkühlung ist die Behandlung sanft und ohne Ausfallzeit."
            }
          },
          {
            "@type": "Question",
            "name": "Wie viele Sitzungen sind notwendig?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sichtbare Ergebnisse sind bereits nach der ersten Sitzung spürbar. Für optimale Ergebnisse empfehlen wir eine individuelle Behandlungsserie, die im persönlichen Beratungsgespräch festgelegt wird."
            }
          },
          {
            "@type": "Question",
            "name": "Für wen ist die Laserbehandlung geeignet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Red Touch Pro Laserbehandlung ist für alle Hauttypen geeignet und kann am Gesicht, Hals, Dekolleté, an den Händen und am Körper eingesetzt werden. Eine individuelle Beratung durch Elena Hartstein klärt, ob die Behandlung für Sie geeignet ist."
            }
          }
        ]
      }
    ],
    noscriptContent: `
      <h1>Red Touch Pro Laserbehandlung im Siegerland – Hautverjüngung ohne OP</h1>
      <p>Die Red Touch Pro Laserbehandlung in unserem Kosmetikstudio in Burbach bei Siegen ist eine sanfte, nicht-invasive Methode zur Hautverjüngung ohne Operation und ohne Ausfallzeit.</p>
      <h2>Was kann der Red Touch Pro Laser?</h2>
      <ul>
        <li>Hautverjüngung und Straffung</li>
        <li>Faltenreduktion und Anti-Aging</li>
        <li>Behandlung von Rosacea und Rötungen</li>
        <li>Narbenverbesserung (Aknenarben, Dehnungsstreifen)</li>
        <li>Porenverfeinerung</li>
        <li>Pigmentflecken reduzieren</li>
      </ul>
      <h2>Preise</h2>
      <ul>
        <li>Gesicht: 250 €</li>
        <li>Gesicht + Hals: 300 €</li>
        <li>Gesicht + Hals + Dekolleté: 350 €</li>
        <li>Hände (Handrücken): 90 €</li>
      </ul>
      <p>Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal und dem gesamten Siegerland.</p>
    `
  },
  "/kontakt": {
    title: "Kontakt & Über mich – Elena Hartstein | Kosmetikstudio Burbach im Siegerland",
    description: "Lernen Sie Elena Hartstein kennen. Kontaktieren Sie Entrance in Harmony in Burbach für Termine & Beratung. Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf & dem Westerwald.",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Kontakt & Über mich", url: "/kontakt" }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Elena Hartstein",
        "jobTitle": "Kosmetikerin & Inhaberin",
        "worksFor": {
          "@type": "BeautySalon",
          "name": "Entrance in Harmony",
          "url": BASE_URL
        },
        "telephone": "+491709287722",
        "email": "info@entranceinharmony.de"
      }
    ],
    noscriptContent: `
      <h1>Kontakt & Über mich – Elena Hartstein</h1>
      <p>Mein Name ist Elena Hartstein und ich bin Inhaberin und Kosmetikerin bei Entrance in Harmony in Burbach im Siegerland. Mit Leidenschaft und Fachkompetenz biete ich individuelle Beauty-Treatments für ein strahlendes Hautbild.</p>
      <h2>Kontaktdaten</h2>
      <ul>
        <li><strong>Adresse:</strong> Höhfeld 5, 57299 Burbach</li>
        <li><strong>Telefon und WhatsApp:</strong> +49 170 928 7722</li>
        <li><strong>E-Mail:</strong> info@entranceinharmony.de</li>
      </ul>
      <p>Terminvereinbarung am besten per WhatsApp oder E-Mail. Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf und dem Westerwald.</p>
    `
  },
  "/gutscheine": {
    title: "Geschenkgutschein kaufen – Beauty Gutschein Siegerland | Entrance in Harmony Burbach",
    description: "Schenken Sie Entspannung und Schönheit. Geschenkgutscheine für Gesichtsbehandlungen und Laserbehandlungen – einlösbar in Burbach bei Siegen. Online kaufen, deutschlandweit verschicken.",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Gutscheine", url: "/gutscheine" }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Beauty-Geschenkgutschein",
        "description": "Geschenkgutschein für Gesichtsbehandlungen und Laserbehandlungen bei Entrance in Harmony in Burbach im Siegerland. 1 Jahr gültig, personalisierbar, online kaufen.",
        "brand": { "@type": "Brand", "name": "Entrance in Harmony" },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "30",
          "highPrice": "350",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "BeautySalon", "name": "Entrance in Harmony", "url": BASE_URL }
        }
      }
    ],
    noscriptContent: `
      <h1>Beauty-Geschenkgutschein kaufen – Siegerland</h1>
      <p>Schenken Sie Ihren Liebsten unvergessliche Beauty-Momente. Unsere Geschenkgutscheine sind das perfekte Geschenk für Geburtstag, Muttertag, Hochzeit oder einfach so.</p>
      <h2>Ihre Vorteile</h2>
      <ul>
        <li>Für alle Gesichtsbehandlungen und Laserbehandlungen einlösbar</li>
        <li>Wunschbetrag ab 30 € frei wählbar</li>
        <li>1 Jahr gültig</li>
        <li>Persönliche Widmung möglich</li>
        <li>Digital per E-Mail oder per Post als hochwertiger Ausdruck erhältlich</li>
      </ul>
      <p>Sicherer Online-Kauf mit Kreditkarte oder Lastschrift. Einlösbar bei Entrance in Harmony, Höhfeld 5, 57299 Burbach.</p>
    `
  },
  "/impressum": {
    title: "Impressum | Entrance in Harmony – Kosmetikstudio Burbach",
    description: "Impressum von Entrance in Harmony. Angaben gemäß § 5 TMG. Elena Hartstein, Höhfeld 5, 57299 Burbach.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Impressum", url: "/impressum" }])],
    noscriptContent: `<h1>Impressum</h1><p>Elena Hartstein – Entrance in Harmony, Höhfeld 5, 57299 Burbach.</p>`
  },
  "/datenschutz": {
    title: "Datenschutzerklärung | Entrance in Harmony – DSGVO-konform",
    description: "Datenschutzerklärung von Entrance in Harmony. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Datenschutz", url: "/datenschutz" }])],
    noscriptContent: `<h1>Datenschutzerklärung</h1><p>Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.</p>`
  },
  "/agb": {
    title: "AGB – Allgemeine Geschäftsbedingungen | Entrance in Harmony",
    description: "Allgemeine Geschäftsbedingungen für Behandlungen, Gutscheine und Produkte von Entrance in Harmony in Burbach.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "AGB", url: "/agb" }])],
    noscriptContent: `<h1>Allgemeine Geschäftsbedingungen</h1><p>AGB für Behandlungen, Gutscheine und Produkte von Entrance in Harmony.</p>`
  },
  "/widerruf": {
    title: "Widerruf & Rückgabe | Entrance in Harmony – Kosmetikstudio Burbach",
    description: "Widerrufsinformationen für Gutscheine, Produkte und Behandlungen von Entrance in Harmony gemäß gesetzlichen Anforderungen.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Widerruf", url: "/widerruf" }])],
    noscriptContent: `<h1>Widerruf & Rückgabe</h1><p>Informationen zu Ihrem Widerrufsrecht bei Gutscheinen, Produkten und Behandlungen.</p>`
  }
};

function stripExistingSeoTags(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*\/?>/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*\/?>/gi, "")
    .replace(/<meta\s+name="author"[^>]*\/?>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*\/?>/gi, "")
    .replace(/<meta\s+name="geo\.[^"]*"[^>]*\/?>/gi, "")
    .replace(/<meta\s+name="ICBM"[^>]*\/?>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*\/?>/gi, "")
    .replace(/<link\s+rel="alternate"\s+hreflang[^>]*\/?>/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/gi, "")
    .replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, "");
}

function buildSeoHead(config: RouteConfig, routePath: string): string {
  const canonicalPath = routePath === "/" ? "" : routePath;
  const canonical = `${BASE_URL}${canonicalPath}`;
  const image = config.ogImage ?? OG_IMAGE;
  const robots = config.noindex ? "noindex, nofollow" : "index, follow";

  const schemas = Array.isArray(config.structuredData)
    ? config.structuredData
    : config.structuredData
    ? [config.structuredData]
    : [];

  const jsonLdTags = schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n  ");

  return `
  <title>${config.title}</title>
  <meta name="description" content="${escapeAttr(config.description)}">
  <meta name="robots" content="${robots}">
  <meta name="author" content="Elena Hartstein – Entrance in Harmony">
  <meta name="geo.region" content="DE-NW">
  <meta name="geo.placename" content="Burbach">
  <meta name="geo.position" content="50.7503;8.0831">
  <meta name="ICBM" content="50.7503, 8.0831">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="de" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <meta property="og:title" content="${escapeAttr(config.title)}">
  <meta property="og:description" content="${escapeAttr(config.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Entrance in Harmony">
  <meta property="og:locale" content="de_DE">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(config.title)}">
  <meta name="twitter:description" content="${escapeAttr(config.description)}">
  <meta name="twitter:image" content="${image}">
  ${jsonLdTags}`;
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildNoscript(content: string): string {
  return `<noscript><style>#noscript-content{max-width:800px;margin:2rem auto;font-family:Georgia,serif;padding:1rem 2rem;line-height:1.7;color:#222}#noscript-content h1{font-size:1.8rem;margin-bottom:1rem;color:#1a1a1a}#noscript-content h2{font-size:1.3rem;margin:1.2rem 0 0.5rem;color:#333}#noscript-content ul{padding-left:1.5rem}#noscript-content li{margin:0.4rem 0}#noscript-content p{margin:0.8rem 0}#noscript-notice{background:#f5f0f5;border-left:4px solid #8B7082;padding:0.6rem 1rem;border-radius:0 4px 4px 0;font-size:0.9rem;margin-bottom:1.5rem}</style><div id="noscript-content"><p id="noscript-notice">Diese Website ist interaktiv. Bitte aktivieren Sie JavaScript in Ihrem Browser für das vollständige Erlebnis.</p>${content}</div></noscript>`;
}

function injectSEO(html: string, config: RouteConfig, routePath: string): string {
  let result = stripExistingSeoTags(html);
  const seoHead = buildSeoHead(config, routePath);
  result = result.replace("</head>", `${seoHead}\n</head>`);
  if (config.noscriptContent) {
    const noscript = buildNoscript(config.noscriptContent);
    result = result.replace('<div id="root"></div>', `<div id="root"></div>\n  ${noscript}`);
  }
  return result;
}

let cachedTemplate: string | null = null;

export function seoPreRenderMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== "production") return next();
  if (req.method !== "GET" && req.method !== "HEAD") return next();

  const reqPath = req.path;
  if (reqPath.startsWith("/api/") || reqPath.includes(".")) return next();

  const config = ROUTES[reqPath];
  if (!config) return next();

  try {
    if (!cachedTemplate) {
      const templatePath = path.resolve(import.meta.dirname, "public", "index.html");
      cachedTemplate = fs.readFileSync(templatePath, "utf-8");
    }

    const html = injectSEO(cachedTemplate, config, reqPath);

    res.status(200).set({
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN"
    }).end(html);
  } catch {
    next();
  }
}
