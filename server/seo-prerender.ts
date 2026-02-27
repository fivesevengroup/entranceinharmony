import fs from "fs";
import path from "path";
import type { Request, Response, NextFunction } from "express";

const BASE_URL = "https://www.entranceinharmony.de";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export interface RouteConfig {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  preRenderHtml: string;
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

const SSR_NAV = `<nav style="display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;padding:1.2rem 1rem;border-bottom:1px solid #e8e0e5;font-family:Inter,sans-serif;font-size:0.95rem"><a href="/" style="color:#5a4a54;text-decoration:none">Startseite</a><a href="/gesichtsbehandlungen" style="color:#5a4a54;text-decoration:none">Gesichtsbehandlungen</a><a href="/laserbehandlungen" style="color:#5a4a54;text-decoration:none">Laserbehandlungen</a><a href="/gutscheine" style="color:#5a4a54;text-decoration:none">Gutscheine</a><a href="/kontakt" style="color:#5a4a54;text-decoration:none">Kontakt</a></nav>`;

const SSR_FOOTER = `<footer style="border-top:1px solid #e8e0e5;padding:2rem 1rem;text-align:center;font-family:Inter,sans-serif;font-size:0.85rem;color:#6b5b65;margin-top:2rem"><p>Entrance in Harmony – Elena Hartstein | Höhfeld 5, 57299 Burbach | Tel: <a href="tel:+491709287722" style="color:#8B7082">+49 170 928 7722</a> | <a href="mailto:info@entranceinharmony.de" style="color:#8B7082">info@entranceinharmony.de</a></p><nav style="margin-top:0.8rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap"><a href="/impressum" style="color:#8B7082;text-decoration:none;font-size:0.8rem">Impressum</a><a href="/datenschutz" style="color:#8B7082;text-decoration:none;font-size:0.8rem">Datenschutz</a><a href="/agb" style="color:#8B7082;text-decoration:none;font-size:0.8rem">AGB</a><a href="/widerruf" style="color:#8B7082;text-decoration:none;font-size:0.8rem">Widerruf</a></nav></footer>`;

function wrapPage(main: string): string {
  return `<div id="ssr-shell" style="font-family:'Cormorant Garamond',Georgia,serif;color:#2a2025;max-width:100%;min-height:100vh;display:flex;flex-direction:column">${SSR_NAV}<main style="flex:1;max-width:860px;margin:0 auto;padding:2rem 1.5rem;line-height:1.75">${main}</main>${SSR_FOOTER}</div>`;
}

export const ROUTES: Record<string, RouteConfig> = {
  "/": {
    title: "Entrance in Harmony – Kosmetikstudio Burbach | Gesichtsbehandlungen & Laser im Siegerland",
    description: "Professionelles Kosmetikstudio in Burbach – Ihr Beauty-Studio im Siegerland. Gesichtsbehandlungen, Red Touch Pro Laserbehandlungen, BB Glow & Microneedling. Für Kunden aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf & Umgebung.",
    ogImage: OG_IMAGE,
    structuredData: [localBusinessSchema],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem;color:#2a2025">Entrance in Harmony – Ihr Kosmetikstudio in Burbach</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Professionelles Kosmetikstudio im Siegerland. Inhaberin Elena Hartstein bietet individuelle Gesichtsbehandlungen, Red Touch Pro Laserbehandlungen, BB Glow und Microneedling für Kunden aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf und dem Westerwald.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Unsere Behandlungen</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0"><a href="/gesichtsbehandlungen" style="color:#8B7082;text-decoration:none"><strong>Gesichtsbehandlungen</strong></a> – Tiefenreinigung, BB Glow, Microneedling, Carboxy Therapie – ab 80 €</li>
        <li style="margin:0.5rem 0"><a href="/laserbehandlungen" style="color:#8B7082;text-decoration:none"><strong>Red Touch Pro Laserbehandlung</strong></a> – Hautverjüngung ohne OP mit DEKA Lasertechnologie – ab 250 €</li>
        <li style="margin:0.5rem 0">Vitalisierende Peelings und Pflegebehandlungen</li>
        <li style="margin:0.5rem 0"><a href="/gutscheine" style="color:#8B7082;text-decoration:none"><strong>Geschenkgutscheine</strong></a> – Online kaufen, deutschlandweit verschicken</li>
      </ul>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Warum Entrance in Harmony?</h2>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Sichtbare Ergebnisse bereits nach der ersten Sitzung. Sanfte Behandlungen ohne Ausfallzeit. Natürliche Kollagenstimulation. Individuelle Beratung und Hautanalyse. Modernste Technologie in entspannter Atmosphäre.</p>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1rem">Gut erreichbar aus dem gesamten Siegerland, Lahn-Dill-Kreis, Westerwald und Sauerland. <a href="/kontakt" style="color:#8B7082">Jetzt Termin vereinbaren</a>.</p>
    `)
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
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Gesichtsbehandlungen im Siegerland</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Erleben Sie professionelle Gesichtsbehandlungen in unserem Kosmetikstudio in Burbach bei Siegen. Wir bieten ein umfassendes Spektrum an Beauty-Treatments für ein gesundes, strahlendes Hautbild.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Unsere Behandlungen</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem"><a href="/laserbehandlungen" style="color:#2a2025;text-decoration:none">Red Touch Pro Laser</a></h3>
          <p style="color:#5a4a54;margin:0">Hautverjüngung, Straffung, Kollagenstimulation mit DEKA Lasertechnologie. <strong>Ab 250 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Tiefenreinigung</h3>
          <p style="color:#5a4a54;margin:0">Professionelle Reinigung mit Hautanalyse und individueller Pflege. <strong>Ab 85 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">BB Glow Skin</h3>
          <p style="color:#5a4a54;margin:0">Semi-permanente Foundation für einen natürlich strahlenden Teint. <strong>Ab 85 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Microneedling</h3>
          <p style="color:#5a4a54;margin:0">Kollagenstimulation für Narben, Falten und Hautstraffung. <strong>Ab 90 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Carboxy Therapie</h3>
          <p style="color:#5a4a54;margin:0">CO₂-Behandlung zur Hautstraffung und Durchblutungsförderung. <strong>Ab 90 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Basis-Pflegebehandlung</h3>
          <p style="color:#5a4a54;margin:0">Klassische Gesichtspflege mit Reinigung und Pflege. <strong>Ab 80 €</strong></p>
        </div>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem">Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal, Netphen, Betzdorf und dem Westerwald. <a href="/kontakt" style="color:#8B7082">Termin vereinbaren</a></p>
    `)
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
              "text": "Red Touch Pro ist ein professionelles Lasersystem von DEKA zur nicht-invasiven Hautverjüngung. Die 675-nm-Wellenlänge stimuliert die natürliche Kollagenproduktion tief in der Haut."
            }
          },
          {
            "@type": "Question",
            "name": "Ist die Laserbehandlung schmerzfrei?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, dank der integrierten Hautkühlung ist die Behandlung sanft und angenehm. Es gibt keine Ausfallzeit."
            }
          },
          {
            "@type": "Question",
            "name": "Wie viele Sitzungen sind notwendig?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sichtbare Ergebnisse sind bereits nach der ersten Sitzung spürbar. Die optimale Behandlungsserie wird individuell im Beratungsgespräch festgelegt."
            }
          },
          {
            "@type": "Question",
            "name": "Für wen ist die Laserbehandlung geeignet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Red Touch Pro Laserbehandlung ist für alle Hauttypen geeignet und kann am Gesicht, Hals, Dekolleté, an den Händen und am Körper eingesetzt werden."
            }
          }
        ]
      }
    ],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Red Touch Pro Laserbehandlung – Hautverjüngung ohne OP</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Die Red Touch Pro Laserbehandlung in unserem Kosmetikstudio in Burbach bei Siegen ist eine sanfte, nicht-invasive Methode zur Hautverjüngung ohne Operation und ohne Ausfallzeit. Modernste DEKA Lasertechnologie mit 675-nm-Wellenlänge.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Was kann der Red Touch Pro Laser?</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0">Hautverjüngung und Straffung</li>
        <li style="margin:0.5rem 0">Faltenreduktion und Anti-Aging</li>
        <li style="margin:0.5rem 0">Behandlung von Rosacea und Rötungen</li>
        <li style="margin:0.5rem 0">Narbenverbesserung (Aknenarben, Dehnungsstreifen)</li>
        <li style="margin:0.5rem 0">Porenverfeinerung und Pigmentflecken reduzieren</li>
        <li style="margin:0.5rem 0">Kollagenstimulation für Gesicht, Hals, Dekolleté und Hände</li>
      </ul>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Preise</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <p style="margin:0.4rem 0"><strong>Gesicht:</strong> 250 €</p>
        <p style="margin:0.4rem 0"><strong>Gesicht + Hals:</strong> 300 €</p>
        <p style="margin:0.4rem 0"><strong>Gesicht + Hals + Dekolleté:</strong> 350 €</p>
        <p style="margin:0.4rem 0"><strong>Hände (Handrücken):</strong> 90 €</p>
        <p style="margin:0.4rem 0"><strong>Hände + Arme bis zum Ellbogen:</strong> 350 €</p>
        <p style="margin:0.4rem 0"><strong>Oberarme (Ellbogen bis Schulter):</strong> 350 €</p>
      </div>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Häufige Fragen</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <p style="margin:0.8rem 0"><strong>Ist die Behandlung schmerzfrei?</strong><br>Ja, dank integrierter Hautkühlung ist die Behandlung sanft und angenehm – ohne Ausfallzeit.</p>
        <p style="margin:0.8rem 0"><strong>Wie viele Sitzungen brauche ich?</strong><br>Sichtbare Ergebnisse bereits nach der ersten Sitzung. Die optimale Serie wird individuell festgelegt.</p>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem">Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal und dem gesamten Siegerland. <a href="/kontakt" style="color:#8B7082">Beratungstermin vereinbaren</a></p>
    `)
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
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Kontakt & Über mich – Elena Hartstein</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Mein Name ist Elena Hartstein und ich bin Inhaberin und Kosmetikerin bei Entrance in Harmony in Burbach im Siegerland. Mit Leidenschaft und Fachkompetenz biete ich individuelle Beauty-Treatments für ein strahlendes Hautbild.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Kontaktdaten</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <p style="margin:0.5rem 0"><strong>Adresse:</strong> Höhfeld 5, 57299 Burbach</p>
        <p style="margin:0.5rem 0"><strong>Telefon & WhatsApp:</strong> <a href="tel:+491709287722" style="color:#8B7082">+49 170 928 7722</a></p>
        <p style="margin:0.5rem 0"><strong>E-Mail:</strong> <a href="mailto:info@entranceinharmony.de" style="color:#8B7082">info@entranceinharmony.de</a></p>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1rem">Terminvereinbarung am besten per WhatsApp oder E-Mail. Gut erreichbar aus Siegen, Haiger, Dillenburg, Kreuztal, Betzdorf und dem Westerwald.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Unsere Leistungen</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.4rem 0"><a href="/gesichtsbehandlungen" style="color:#8B7082">Gesichtsbehandlungen</a> – Tiefenreinigung, BB Glow, Microneedling</li>
        <li style="margin:0.4rem 0"><a href="/laserbehandlungen" style="color:#8B7082">Red Touch Pro Laserbehandlung</a> – Hautverjüngung ohne OP</li>
        <li style="margin:0.4rem 0"><a href="/gutscheine" style="color:#8B7082">Geschenkgutscheine</a> – Online kaufen</li>
      </ul>
    `)
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
        "description": "Geschenkgutschein für Gesichtsbehandlungen und Laserbehandlungen bei Entrance in Harmony in Burbach im Siegerland.",
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
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Beauty-Geschenkgutschein kaufen</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Schenken Sie Ihren Liebsten unvergessliche Beauty-Momente. Unsere Geschenkgutscheine sind das perfekte Geschenk für Geburtstag, Muttertag, Hochzeit oder einfach so.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Ihre Vorteile</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0">Für alle <a href="/gesichtsbehandlungen" style="color:#8B7082">Gesichtsbehandlungen</a> und <a href="/laserbehandlungen" style="color:#8B7082">Laserbehandlungen</a> einlösbar</li>
        <li style="margin:0.5rem 0">Wunschbetrag ab 30 € frei wählbar</li>
        <li style="margin:0.5rem 0">1 Jahr gültig</li>
        <li style="margin:0.5rem 0">Persönliche Widmung möglich</li>
        <li style="margin:0.5rem 0">Digital per E-Mail oder per Post als hochwertiger Ausdruck</li>
      </ul>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">So funktioniert es</h2>
      <ol style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0">Betrag wählen oder Behandlung aussuchen</li>
        <li style="margin:0.5rem 0">Persönliche Widmung eingeben</li>
        <li style="margin:0.5rem 0">Sicher online bezahlen</li>
        <li style="margin:0.5rem 0">Gutschein per E-Mail oder Post erhalten</li>
      </ol>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem">Einlösbar bei Entrance in Harmony, Höhfeld 5, 57299 Burbach. <a href="/kontakt" style="color:#8B7082">Fragen? Kontaktieren Sie uns</a>.</p>
    `)
  },
  "/impressum": {
    title: "Impressum | Entrance in Harmony – Kosmetikstudio Burbach",
    description: "Impressum von Entrance in Harmony. Angaben gemäß § 5 TMG. Elena Hartstein, Höhfeld 5, 57299 Burbach.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Impressum", url: "/impressum" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Impressum</h1>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <h2 style="font-size:1.2rem;font-weight:600;margin:1rem 0 0.5rem">Angaben gemäß § 5 TMG</h2>
        <p>Elena Hartstein<br>Entrance in Harmony<br>Höhfeld 5<br>57299 Burbach</p>
        <h2 style="font-size:1.2rem;font-weight:600;margin:1.5rem 0 0.5rem">Kontakt</h2>
        <p>Telefon: <a href="tel:+491709287722" style="color:#8B7082">+49 170 928 7722</a><br>E-Mail: <a href="mailto:info@entranceinharmony.de" style="color:#8B7082">info@entranceinharmony.de</a></p>
      </div>
    `)
  },
  "/datenschutz": {
    title: "Datenschutzerklärung | Entrance in Harmony – DSGVO-konform",
    description: "Datenschutzerklärung von Entrance in Harmony. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Datenschutz", url: "/datenschutz" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Datenschutzerklärung</h1>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO. Verantwortlich: Elena Hartstein, Entrance in Harmony, Höhfeld 5, 57299 Burbach.</p>
    `)
  },
  "/agb": {
    title: "AGB – Allgemeine Geschäftsbedingungen | Entrance in Harmony",
    description: "Allgemeine Geschäftsbedingungen für Behandlungen, Gutscheine und Produkte von Entrance in Harmony in Burbach.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "AGB", url: "/agb" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Allgemeine Geschäftsbedingungen</h1>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">AGB für Behandlungen, Gutscheine und Produkte von Entrance in Harmony. Elena Hartstein, Höhfeld 5, 57299 Burbach.</p>
    `)
  },
  "/widerruf": {
    title: "Widerruf & Rückgabe | Entrance in Harmony – Kosmetikstudio Burbach",
    description: "Widerrufsinformationen für Gutscheine, Produkte und Behandlungen von Entrance in Harmony gemäß gesetzlichen Anforderungen.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Widerruf", url: "/widerruf" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Widerruf & Rückgabe</h1>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Informationen zu Ihrem Widerrufsrecht bei Gutscheinen, Produkten und Behandlungen von Entrance in Harmony.</p>
    `)
  }
};

export function stripExistingSeoTags(html: string): string {
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

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildSeoHead(config: RouteConfig, routePath: string): string {
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

export function injectSEO(html: string, config: RouteConfig, routePath: string): string {
  let result = stripExistingSeoTags(html);
  const seoHead = buildSeoHead(config, routePath);
  result = result.replace("</head>", `${seoHead}\n</head>`);
  result = result.replace(
    '<div id="root"></div>',
    `<div id="root">${config.preRenderHtml}</div>`
  );
  return result;
}

let cachedTemplate: string | null = null;

export function generateStaticFiles() {
  if (process.env.NODE_ENV !== "production") return;

  try {
    const distPath = path.resolve(import.meta.dirname, "public");
    const templatePath = path.resolve(distPath, "index.html");

    if (!fs.existsSync(templatePath)) return;

    const template = fs.readFileSync(templatePath, "utf-8");
    cachedTemplate = template;

    const routes = Object.entries(ROUTES);
    let count = 0;

    for (const [routePath, config] of routes) {
      if (routePath === "/") {
        count++;
        continue;
      }
      const html = injectSEO(template, config, routePath);
      const slug = routePath.slice(1);
      const dir = path.resolve(distPath, slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.resolve(dir, "index.html"), html, "utf-8");
      count++;
    }

    console.log(`Pre-rendered ${count} HTML pages with SEO content`);
  } catch (err) {
    console.error("Pre-rendering failed:", err);
  }
}

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
