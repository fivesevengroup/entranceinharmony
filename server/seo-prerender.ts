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
  { name: "Burbach", plz: "57299", region: "Siegerland" },
  { name: "Wahlbach", plz: "57299", region: "Siegerland" },
  { name: "Neunkirchen", plz: "57290", region: "Siegerland" },
  { name: "Siegen", plz: "57072", region: "Siegerland" },
  { name: "Kreuztal", plz: "57223", region: "Siegerland" },
  { name: "Netphen", plz: "57250", region: "Siegerland" },
  { name: "Wilnsdorf", plz: "57234", region: "Siegerland" },
  { name: "Freudenberg", plz: "57258", region: "Siegerland" },
  { name: "Hilchenbach", plz: "57271", region: "Siegerland" },
  { name: "Haiger", plz: "35708", region: "Lahn-Dill-Kreis" },
  { name: "Dillenburg", plz: "35683", region: "Lahn-Dill-Kreis" },
  { name: "Herborn", plz: "35745", region: "Lahn-Dill-Kreis" },
  { name: "Eschenburg", plz: "35713", region: "Lahn-Dill-Kreis" },
  { name: "Wetzlar", plz: "35578", region: "Lahn-Dill-Kreis" },
  { name: "Dietzhölztal", plz: "35716", region: "Lahn-Dill-Kreis" },
  { name: "Herdorf", plz: "57562", region: "Westerwald" },
  { name: "Betzdorf", plz: "57518", region: "Westerwald" },
  { name: "Kirchen (Sieg)", plz: "57548", region: "Westerwald" },
  { name: "Daaden", plz: "57567", region: "Westerwald" },
  { name: "Hachenburg", plz: "57627", region: "Westerwald" },
  { name: "Bad Marienberg", plz: "56470", region: "Westerwald" },
  { name: "Rennerod", plz: "56477", region: "Westerwald" },
  { name: "Westerburg", plz: "56457", region: "Westerwald" },
  { name: "Olpe", plz: "57462", region: "Sauerland" },
  { name: "Attendorn", plz: "57439", region: "Sauerland" },
  { name: "Lennestadt", plz: "57368", region: "Sauerland" },
  { name: "Bad Laasphe", plz: "57334", region: "Wittgenstein" },
  { name: "Bad Berleburg", plz: "57319", region: "Wittgenstein" },
  { name: "Erndtebrück", plz: "57339", region: "Wittgenstein" },
  { name: "Driedorf", plz: "35759", region: "Lahn-Dill-Kreis" },
  { name: "Greifenstein", plz: "35753", region: "Lahn-Dill-Kreis" },
];

const areaServedSchema = AREA_SERVED.map(c => ({
  "@type": "Place",
  "name": c.name,
  "address": {
    "@type": "PostalAddress",
    "postalCode": c.plz,
    "addressLocality": c.name,
    "addressCountry": "DE"
  }
}));

function serviceSchema(name: string, desc: string, price: string, url: string, areas?: string[]) {
  const served = (areas || ["Burbach", "Siegen", "Haiger", "Dillenburg", "Kreuztal", "Betzdorf", "Herdorf"]).map(n => ({ "@type": "City", "name": n }));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": desc,
    "url": `${BASE_URL}${url}`,
    "provider": {
      "@type": "BeautySalon",
      "name": "Entrance in Harmony",
      "url": BASE_URL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Höhfeld 5",
        "postalCode": "57299",
        "addressLocality": "Burbach",
        "addressCountry": "DE"
      }
    },
    "areaServed": served
  };
}

function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Entrance in Harmony",
  "alternateName": "Entrance in Harmony - Beauty & Aesthetics",
  "description": "Kosmetikstudio in Burbach bei Siegen, spezialisiert auf Gesichtsbehandlungen und Red Touch Pro Laserbehandlungen. Inhaberin Elena Hartstein.",
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
  "paymentAccepted": "Cash, Credit Card, Online Payment",
  "image": OG_IMAGE,
  "founder": {
    "@type": "Person",
    "name": "Elena Hartstein",
    "jobTitle": "Kosmetikerin & Inhaberin"
  },
  "areaServed": areaServedSchema,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Beauty & Laser Behandlungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tiefenreinigung", "description": "Professionelle Tiefenreinigung mit Hautanalyse" }, "price": "85", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BB Glow Skin", "description": "Semi-permanente Foundation für natürlichen Glow" }, "price": "85", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Microneedling", "description": "Kollagenstimulation für Hautstraffung und Narbenreduktion" }, "price": "90", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carboxy Therapie", "description": "CO2-Behandlung zur Hautstraffung" }, "price": "80", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Red Touch Pro Laser Gesicht", "description": "Nicht-invasive Hautverjüngung mit DEKA Lasertechnologie" }, "price": "250", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Red Touch Pro Laser Gesicht + Hals + Dekolleté", "description": "Umfassende Laserbehandlung für Gesicht, Hals und Dekolleté" }, "price": "350", "priceCurrency": "EUR" }
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

const gesichtFAQs = [
  {
    q: "Welche Gesichtsbehandlung passt zu meinem Hauttyp?",
    a: "In einem persönlichen Beratungsgespräch analysieren wir Ihren Hauttyp und erstellen einen individuellen Behandlungsplan. Ob Tiefenreinigung bei unreiner Haut, BB Glow für mehr Strahlkraft oder Microneedling zur Hautverjüngung – wir finden die passende Lösung für Ihre Bedürfnisse."
  },
  {
    q: "Wie oft sollte ich eine Gesichtsbehandlung machen lassen?",
    a: "Für optimale Ergebnisse empfehlen wir eine professionelle Gesichtsbehandlung alle vier bis sechs Wochen. So unterstützen Sie den natürlichen Erneuerungszyklus Ihrer Haut. Bei speziellen Behandlungen wie Microneedling oder Carboxy Therapie besprechen wir den idealen Abstand individuell."
  },
  {
    q: "Ist Microneedling schmerzhaft?",
    a: "Microneedling wird von den meisten Kundinnen als gut verträglich empfunden. Vor der Behandlung tragen wir eine betäubende Creme auf, sodass Sie nur ein leichtes Kribbeln spüren. Die Haut kann danach kurzzeitig gerötet sein, erholt sich aber innerhalb von ein bis zwei Tagen vollständig."
  },
  {
    q: "Was kostet eine Gesichtsbehandlung in Burbach?",
    a: "Unsere Gesichtsbehandlungen beginnen ab 80 Euro für eine Basis-Pflegebehandlung. Tiefenreinigung und BB Glow liegen bei 85 Euro, Microneedling bei 90 Euro. Alle Preise beinhalten eine individuelle Hautanalyse und Beratung. Gutscheine sind ebenfalls verfügbar."
  }
];

const laserFAQs = [
  {
    q: "Was ist der Red Touch Pro Laser?",
    a: "Der Red Touch Pro ist ein professionelles Lasersystem des italienischen Herstellers DEKA. Die 675-nm-Wellenlänge dringt gezielt in tiefere Hautschichten ein und stimuliert dort die natürliche Kollagen- und Elastinproduktion. Das Ergebnis: straffere, glattere und jugendlicher wirkende Haut."
  },
  {
    q: "Ist die Laserbehandlung schmerzhaft?",
    a: "Nein. Dank der integrierten Hautkühlung während der gesamten Behandlung ist der Red Touch Pro besonders sanft und angenehm. Die meisten Kundinnen beschreiben ein leichtes Wärmegefühl. Es gibt keine Ausfallzeit – Sie können direkt nach der Sitzung Ihrem Alltag nachgehen."
  },
  {
    q: "Wie schnell sehe ich Ergebnisse nach der Laserbehandlung?",
    a: "Erste Verbesserungen im Hautbild sind bereits nach der ersten Sitzung sichtbar. Die volle Wirkung entfaltet sich über die folgenden Wochen, da die Kollagenneubildung Zeit benötigt. Für optimale Ergebnisse empfehlen wir je nach Hautzustand eine Serie von drei bis fünf Behandlungen."
  },
  {
    q: "Welche Hautprobleme kann der Red Touch Pro behandeln?",
    a: "Der Red Touch Pro eignet sich hervorragend zur Behandlung von feinen Linien und Falten, erschlaffter Haut, Rosacea, Pigmentflecken, vergrößerten Poren, Aknenarben und Dehnungsstreifen. Die Behandlung ist für alle Hauttypen geeignet und kann an Gesicht, Hals, Dekolleté und Händen eingesetzt werden."
  }
];

const gutscheineFAQs = [
  {
    q: "Wie erhalte ich meinen Gutschein nach dem Kauf?",
    a: "Nach Zahlungseingang erhalten Sie Ihren personalisierten Gutschein als hochwertiges PDF per E-Mail. Sie können ihn selbst ausdrucken oder digital weiterleiten. Auf Wunsch senden wir den Gutschein auch als gedruckte Version per Post an eine Adresse Ihrer Wahl."
  },
  {
    q: "Wie lange ist der Gutschein gültig und wofür kann ich ihn einlösen?",
    a: "Jeder Gutschein ist ab Kaufdatum ein Jahr lang gültig und kann für alle Behandlungen in unserem Studio eingelöst werden – von Gesichtsbehandlungen über Laserbehandlungen bis hin zu Peelings und Pflegeprodukten. Der Restbetrag bleibt bis zum Ablaufdatum erhalten."
  }
];

export const ROUTES: Record<string, RouteConfig> = {
  "/": {
    title: "Kosmetikstudio Burbach bei Siegen | Entrance in Harmony",
    description: "Kosmetikstudio in Burbach bei Siegen. Gesichtsbehandlungen, Laser-Hautverjüngung & BB Glow – sichtbare Ergebnisse ab der 1. Sitzung. Jetzt Termin buchen!",
    ogImage: OG_IMAGE,
    structuredData: [localBusinessSchema, breadcrumb([{ name: "Startseite", url: "/" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem;color:#2a2025">Kosmetikstudio in Burbach bei Siegen</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Willkommen bei Entrance in Harmony – Ihrem Kosmetikstudio in Burbach im Siegerland. Inhaberin Elena Hartstein bietet Ihnen professionelle Gesichtsbehandlungen und moderne Laser-Hautverjüngung mit sichtbaren Ergebnissen bereits nach der ersten Sitzung.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Unsere Behandlungen</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0"><a href="/gesichtsbehandlungen" style="color:#8B7082;text-decoration:none"><strong>Gesichtsbehandlungen</strong></a> – Tiefenreinigung, BB Glow, Microneedling, Carboxy Therapie ab 80 €</li>
        <li style="margin:0.5rem 0"><a href="/laserbehandlungen" style="color:#8B7082;text-decoration:none"><strong>Laser-Hautverjüngung</strong></a> – Red Touch Pro von DEKA, sanft und ohne Ausfallzeit ab 90 €</li>
        <li style="margin:0.5rem 0">Vitalisierende Peelings und individuelle Pflegeprogramme</li>
        <li style="margin:0.5rem 0"><a href="/gutscheine" style="color:#8B7082;text-decoration:none"><strong>Beauty-Gutscheine</strong></a> – Das perfekte Geschenk, online kaufen ab 30 €</li>
      </ul>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Ihr Studio im Herzen des Siegerlands</h2>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Unser Studio in Burbach (57299) liegt zentral zwischen Siegen und Haiger und ist aus der gesamten Region bequem erreichbar. Kundinnen aus Siegen (57072), Kreuztal (57223), Netphen (57250) und Neunkirchen (57290) sind in wenigen Minuten bei uns. Auch aus dem Lahn-Dill-Kreis – Haiger (35708), Dillenburg (35683) und Herborn (35745) – sowie dem Westerwald mit Betzdorf (57518), Herdorf (57562) und Hachenburg (57627) erreichen Sie uns schnell über die A45 und B54.</p>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1rem"><a href="/kontakt" style="color:#8B7082">Jetzt Termin vereinbaren</a> – per WhatsApp oder E-Mail.</p>
    `)
  },

  "/gesichtsbehandlungen": {
    title: "Gesichtsbehandlung Burbach – BB Glow & Microneedling ab 80 €",
    description: "Gesichtsbehandlungen in Burbach bei Siegen: Tiefenreinigung, BB Glow, Microneedling & Carboxy Therapie. Individuelle Beratung. Jetzt Termin buchen!",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Gesichtsbehandlungen", url: "/gesichtsbehandlungen" }
      ]),
      serviceSchema(
        "Professionelle Gesichtsbehandlungen in Burbach",
        "Tiefenreinigung, BB Glow, Microneedling, Carboxy Therapie und Peelings im Kosmetikstudio Entrance in Harmony in Burbach bei Siegen.",
        "80",
        "/gesichtsbehandlungen",
        ["Burbach", "Siegen", "Kreuztal", "Netphen", "Haiger", "Dillenburg", "Neunkirchen", "Herdorf", "Betzdorf"]
      ),
      faqSchema(gesichtFAQs)
    ],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Gesichtsbehandlungen in Burbach bei Siegen</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Professionelle Gesichtsbehandlungen mit individueller Hautanalyse in unserem Kosmetikstudio in Burbach. Von der gründlichen Tiefenreinigung bis zur innovativen Kollagenstimulation – wir finden die passende Behandlung für Ihre Haut.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Unsere Behandlungen im Überblick</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Tiefenreinigung</h3>
          <p style="color:#5a4a54;margin:0">Gründliche Hautreinigung mit professioneller Analyse und individueller Pflege. Ideal als Basis für ein klares Hautbild. <strong>85 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">BB Glow Skin</h3>
          <p style="color:#5a4a54;margin:0">Semi-permanente Foundation per Microneedling – für einen natürlich ebenmäßigen Teint, der mehrere Wochen anhält. <strong>85 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Microneedling</h3>
          <p style="color:#5a4a54;margin:0">Stimuliert die hauteigene Kollagenproduktion und verbessert Narben, Falten und Hautstruktur nachhaltig. <strong>90 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Carboxy Therapie</h3>
          <p style="color:#5a4a54;margin:0">CO₂-basierte Behandlung zur Durchblutungsförderung und Hautstraffung – spürbar festere Haut nach jeder Sitzung. <strong>80 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">B-Tox-Peel</h3>
          <p style="color:#5a4a54;margin:0">Intensivbehandlung mit botulinum-ähnlichem Effekt – glättet die Haut sichtbar und verfeinert das Hautbild. <strong>85 €</strong></p>
        </div>
        <div style="padding:1rem 0;border-bottom:1px solid #f0e8ed">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.3rem">Vitalisierende Peelings</h3>
          <p style="color:#5a4a54;margin:0">Sanftes Peeling zur Erneuerung der Hautoberfläche – für einen frischen, strahlenden Teint. <strong>80 €</strong></p>
        </div>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem">Sie interessieren sich auch für <a href="/laserbehandlungen" style="color:#8B7082">Laser-Hautverjüngung mit Red Touch Pro</a>? Oder verschenken Sie einen <a href="/gutscheine" style="color:#8B7082">Beauty-Gutschein</a> an Ihre Liebsten.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Gut erreichbar aus dem Siegerland und Lahn-Dill-Kreis</h2>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Unser Kosmetikstudio in Burbach (57299) ist ideal gelegen für Kundinnen aus Siegen (57072), Kreuztal (57223), Netphen (57250), Neunkirchen (57290) und Wilnsdorf (57234). Aus dem Lahn-Dill-Kreis erreichen Sie uns ebenfalls schnell: Haiger (35708), Dillenburg (35683), Herborn (35745) und Eschenburg (35713) liegen nur wenige Fahrminuten entfernt.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Häufige Fragen zu Gesichtsbehandlungen</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Welche Gesichtsbehandlung passt zu meinem Hauttyp?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">In einem persönlichen Beratungsgespräch analysieren wir Ihren Hauttyp und erstellen einen individuellen Behandlungsplan. Ob Tiefenreinigung bei unreiner Haut, BB Glow für mehr Strahlkraft oder Microneedling zur Hautverjüngung – wir finden die passende Lösung.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Wie oft sollte ich eine Gesichtsbehandlung machen lassen?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Für optimale Ergebnisse empfehlen wir eine professionelle Behandlung alle vier bis sechs Wochen. So unterstützen Sie den natürlichen Erneuerungszyklus Ihrer Haut.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Ist Microneedling schmerzhaft?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Microneedling wird als gut verträglich empfunden. Vor der Behandlung tragen wir eine betäubende Creme auf, sodass Sie nur ein leichtes Kribbeln spüren. Die Rötung klingt innerhalb von ein bis zwei Tagen ab.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Was kostet eine Gesichtsbehandlung in Burbach?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Unsere Gesichtsbehandlungen beginnen ab 80 Euro. Tiefenreinigung und BB Glow liegen bei 85 Euro, Microneedling bei 90 Euro. Alle Preise beinhalten Hautanalyse und persönliche Beratung.</p>
        </details>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem"><a href="/kontakt" style="color:#8B7082">Jetzt Beratungstermin vereinbaren</a> – per WhatsApp oder E-Mail.</p>
    `)
  },

  "/laserbehandlungen": {
    title: "Laser-Hautverjüngung Burbach – Red Touch Pro ab 250 €",
    description: "Red Touch Pro Laserbehandlung in Burbach bei Siegen. Hautverjüngung ohne OP – sanft, ohne Ausfallzeit. Sichtbare Straffung. Jetzt beraten lassen!",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Laserbehandlungen", url: "/laserbehandlungen" }
      ]),
      serviceSchema(
        "Red Touch Pro Laserbehandlung in Burbach",
        "Nicht-invasive Hautverjüngung mit Red Touch Pro (DEKA) – Kollagenstimulation, Faltenreduktion und Hautstraffung ohne OP und ohne Ausfallzeit.",
        "250",
        "/laserbehandlungen",
        ["Burbach", "Siegen", "Haiger", "Dillenburg", "Betzdorf", "Herdorf", "Hachenburg", "Bad Marienberg", "Olpe"]
      ),
      faqSchema(laserFAQs)
    ],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Laser-Hautverjüngung in Burbach – Red Touch Pro</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Erleben Sie sanfte Hautverjüngung ohne Operation in unserem Kosmetikstudio in Burbach bei Siegen. Der Red Touch Pro von DEKA stimuliert mit einer speziellen 675-nm-Wellenlänge die natürliche Kollagenproduktion – für straffere, glattere Haut ohne Ausfallzeit.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Was behandelt der Red Touch Pro?</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0">Hautverjüngung und sichtbare Straffung</li>
        <li style="margin:0.5rem 0">Faltenreduktion und Anti-Aging</li>
        <li style="margin:0.5rem 0">Rosacea und Rötungen mildern</li>
        <li style="margin:0.5rem 0">Aknenarben und Dehnungsstreifen verbessern</li>
        <li style="margin:0.5rem 0">Porenverfeinerung und Pigmentflecken reduzieren</li>
        <li style="margin:0.5rem 0">Kollagenstimulation an Gesicht, Hals, Dekolleté und Händen</li>
      </ul>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Preise Laserbehandlung</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <p style="margin:0.4rem 0"><strong>Gesicht:</strong> 250 €</p>
        <p style="margin:0.4rem 0"><strong>Gesicht + Hals:</strong> 300 €</p>
        <p style="margin:0.4rem 0"><strong>Gesicht + Hals + Dekolleté:</strong> 350 €</p>
        <p style="margin:0.4rem 0"><strong>Hände (Handrücken):</strong> 90 €</p>
        <p style="margin:0.4rem 0"><strong>Hände + Arme bis zum Ellbogen:</strong> 350 €</p>
        <p style="margin:0.4rem 0"><strong>Oberarme (Ellbogen bis Schulter):</strong> 350 €</p>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1rem">Auch als <a href="/gutscheine" style="color:#8B7082">Geschenkgutschein</a> verfügbar. Oder kombinieren Sie Ihre Laserbehandlung mit einer <a href="/gesichtsbehandlungen" style="color:#8B7082">Gesichtsbehandlung</a> für optimale Ergebnisse.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Gut erreichbar aus Westerwald und Sauerland</h2>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Unser Studio in Burbach (57299) ist ideal gelegen für Kundinnen aus dem Westerwald: Betzdorf (57518), Herdorf (57562), Kirchen (57548), Daaden (57567), Hachenburg (57627) und Bad Marienberg (56470). Auch aus Olpe (57462), Attendorn (57439) und dem Raum Wittgenstein – Bad Laasphe (57334), Bad Berleburg (57319) und Erndtebrück (57339) – sind wir gut erreichbar.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Häufige Fragen zur Laserbehandlung</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Was ist der Red Touch Pro Laser?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Der Red Touch Pro ist ein professionelles Lasersystem des italienischen Herstellers DEKA. Die 675-nm-Wellenlänge stimuliert gezielt die natürliche Kollagen- und Elastinproduktion in tieferen Hautschichten.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Ist die Laserbehandlung schmerzhaft?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Nein. Dank integrierter Hautkühlung ist die Behandlung sanft und angenehm. Die meisten Kundinnen beschreiben ein leichtes Wärmegefühl. Sie können direkt nach der Sitzung Ihrem Alltag nachgehen.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Wie schnell sehe ich Ergebnisse?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Erste Verbesserungen sind bereits nach der ersten Sitzung sichtbar. Die volle Wirkung entfaltet sich über die folgenden Wochen durch die Kollagenneubildung. Wir empfehlen je nach Hautzustand drei bis fünf Behandlungen.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Welche Hautprobleme kann der Red Touch Pro behandeln?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Der Red Touch Pro eignet sich zur Behandlung von Falten, erschlaffter Haut, Rosacea, Pigmentflecken, vergrößerten Poren, Aknenarben und Dehnungsstreifen. Er ist für alle Hauttypen geeignet.</p>
        </details>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem"><a href="/kontakt" style="color:#8B7082">Beratungstermin vereinbaren</a> – wir beraten Sie gerne persönlich.</p>
    `)
  },

  "/kontakt": {
    title: "Kontakt & Anfahrt – Kosmetikstudio Burbach bei Siegen",
    description: "Termin bei Entrance in Harmony in Burbach vereinbaren. Per WhatsApp, Telefon oder E-Mail. Gut erreichbar aus Siegen, Haiger, Dillenburg & dem Westerwald.",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Kontakt & Anfahrt", url: "/kontakt" }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Elena Hartstein",
        "jobTitle": "Kosmetikerin & Inhaberin",
        "worksFor": {
          "@type": "BeautySalon",
          "name": "Entrance in Harmony",
          "url": BASE_URL,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Höhfeld 5",
            "postalCode": "57299",
            "addressLocality": "Burbach",
            "addressCountry": "DE"
          }
        },
        "telephone": "+491709287722",
        "email": "info@entranceinharmony.de"
      }
    ],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Kontakt und Anfahrt zu Entrance in Harmony</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Sie möchten einen Termin vereinbaren oder haben Fragen zu unseren Behandlungen? Wir freuen uns auf Ihre Nachricht.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Kontaktdaten</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <p style="margin:0.5rem 0"><strong>Elena Hartstein – Inhaberin & Kosmetikerin</strong></p>
        <p style="margin:0.5rem 0"><strong>Adresse:</strong> Höhfeld 5, 57299 Burbach</p>
        <p style="margin:0.5rem 0"><strong>Telefon & WhatsApp:</strong> <a href="tel:+491709287722" style="color:#8B7082">+49 170 928 7722</a></p>
        <p style="margin:0.5rem 0"><strong>E-Mail:</strong> <a href="mailto:info@entranceinharmony.de" style="color:#8B7082">info@entranceinharmony.de</a></p>
      </div>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Anfahrt aus der Region</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">
        <p style="margin:0.5rem 0"><strong>Aus dem Siegerland:</strong> Siegen (57072), Kreuztal (57223), Netphen (57250), Freudenberg (57258), Hilchenbach (57271), Neunkirchen (57290), Wilnsdorf (57234) – ca. 10–25 Min. über A45/B54</p>
        <p style="margin:0.5rem 0"><strong>Aus dem Lahn-Dill-Kreis:</strong> Haiger (35708), Dillenburg (35683), Herborn (35745), Eschenburg (35713), Wetzlar (35578) – ca. 10–35 Min. über A45</p>
        <p style="margin:0.5rem 0"><strong>Aus dem Westerwald:</strong> Betzdorf (57518), Herdorf (57562), Kirchen (57548), Daaden (57567), Hachenburg (57627), Bad Marienberg (56470), Rennerod (56477) – ca. 15–35 Min. über B54/B62</p>
        <p style="margin:0.5rem 0"><strong>Aus dem Sauerland:</strong> Olpe (57462), Attendorn (57439), Lennestadt (57368) – ca. 30–40 Min.</p>
        <p style="margin:0.5rem 0"><strong>Aus Wittgenstein:</strong> Bad Laasphe (57334), Bad Berleburg (57319), Erndtebrück (57339) – ca. 25–40 Min.</p>
      </div>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Unsere Behandlungen</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.4rem 0"><a href="/gesichtsbehandlungen" style="color:#8B7082">Gesichtsbehandlungen in Burbach</a> – Tiefenreinigung, BB Glow, Microneedling ab 80 €</li>
        <li style="margin:0.4rem 0"><a href="/laserbehandlungen" style="color:#8B7082">Laser-Hautverjüngung mit Red Touch Pro</a> – sanft und ohne Ausfallzeit ab 90 €</li>
        <li style="margin:0.4rem 0"><a href="/gutscheine" style="color:#8B7082">Beauty-Gutschein verschenken</a> – Online kaufen, sofort erhalten</li>
      </ul>
    `)
  },

  "/gutscheine": {
    title: "Beauty-Gutschein kaufen | Kosmetikstudio Burbach ab 30 €",
    description: "Verschenken Sie Schönheit! Beauty-Gutschein online kaufen – für Gesichtsbehandlungen & Laser. Ab 30 €, 1 Jahr gültig. Sofort per E-Mail erhalten.",
    ogImage: OG_IMAGE,
    structuredData: [
      breadcrumb([
        { name: "Startseite", url: "/" },
        { name: "Gutscheine", url: "/gutscheine" }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Beauty-Geschenkgutschein – Entrance in Harmony",
        "description": "Geschenkgutschein für Gesichtsbehandlungen und Laserbehandlungen im Kosmetikstudio Entrance in Harmony in Burbach bei Siegen.",
        "brand": { "@type": "Brand", "name": "Entrance in Harmony" },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "30",
          "highPrice": "350",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "BeautySalon", "name": "Entrance in Harmony", "url": BASE_URL }
        }
      },
      faqSchema(gutscheineFAQs)
    ],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Beauty-Gutschein online kaufen</h1>
      <p style="font-size:1.1rem;color:#5a4a54;margin-bottom:1.5rem">Schenken Sie Ihren Liebsten unvergessliche Beauty-Momente bei Entrance in Harmony in Burbach. Unsere Geschenkgutscheine sind das perfekte Geschenk für Geburtstag, Muttertag, Hochzeit oder einfach zwischendurch.</p>
      <h2 style="font-size:1.5rem;font-weight:400;margin:1.5rem 0 0.8rem">Ihre Vorteile</h2>
      <ul style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0">Einlösbar für alle <a href="/gesichtsbehandlungen" style="color:#8B7082">Gesichtsbehandlungen</a> und <a href="/laserbehandlungen" style="color:#8B7082">Laserbehandlungen</a></li>
        <li style="margin:0.5rem 0">Wunschbetrag ab 30 € frei wählbar</li>
        <li style="margin:0.5rem 0">1 Jahr gültig ab Kaufdatum</li>
        <li style="margin:0.5rem 0">Persönliche Widmung möglich</li>
        <li style="margin:0.5rem 0">Sofort per E-Mail oder als Postversand</li>
      </ul>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">So funktioniert es</h2>
      <ol style="padding-left:1.2rem;font-family:Inter,sans-serif;font-size:0.95rem">
        <li style="margin:0.5rem 0">Wunschbetrag oder Behandlung auswählen</li>
        <li style="margin:0.5rem 0">Persönliche Widmung eingeben</li>
        <li style="margin:0.5rem 0">Sicher online bezahlen</li>
        <li style="margin:0.5rem 0">Gutschein sofort per E-Mail erhalten</li>
      </ol>
      <h2 style="font-size:1.5rem;font-weight:400;margin:2rem 0 0.8rem">Häufige Fragen zum Gutschein</h2>
      <div style="font-family:Inter,sans-serif;font-size:0.95rem">
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Wie erhalte ich meinen Gutschein nach dem Kauf?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Nach Zahlungseingang erhalten Sie Ihren personalisierten Gutschein als hochwertiges PDF per E-Mail. Sie können ihn selbst ausdrucken oder digital weiterleiten.</p>
        </details>
        <details style="margin:0.8rem 0;padding:0.5rem 0;border-bottom:1px solid #f0e8ed">
          <summary style="cursor:pointer;font-weight:600;color:#2a2025">Wie lange ist der Gutschein gültig?</summary>
          <p style="color:#5a4a54;margin:0.5rem 0 0">Jeder Gutschein ist ab Kaufdatum ein Jahr lang gültig und kann für alle Behandlungen eingelöst werden – von Gesichtsbehandlungen bis Laserbehandlungen. Der Restbetrag bleibt erhalten.</p>
        </details>
      </div>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54;margin-top:1.5rem">Einlösbar bei Entrance in Harmony, Höhfeld 5, 57299 Burbach. <a href="/kontakt" style="color:#8B7082">Fragen? Kontaktieren Sie uns</a>.</p>
    `)
  },

  "/impressum": {
    title: "Impressum | Entrance in Harmony Burbach",
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
    title: "Datenschutz | Entrance in Harmony Burbach",
    description: "Datenschutzerklärung von Entrance in Harmony. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Datenschutz", url: "/datenschutz" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Datenschutzerklärung</h1>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO. Verantwortlich: Elena Hartstein, Entrance in Harmony, Höhfeld 5, 57299 Burbach.</p>
    `)
  },

  "/agb": {
    title: "AGB | Entrance in Harmony Burbach",
    description: "Allgemeine Geschäftsbedingungen für Behandlungen, Gutscheine und Produkte von Entrance in Harmony in Burbach.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "AGB", url: "/agb" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Allgemeine Geschäftsbedingungen</h1>
      <p style="font-family:Inter,sans-serif;font-size:0.95rem;color:#5a4a54">AGB für Behandlungen, Gutscheine und Produkte von Entrance in Harmony. Elena Hartstein, Höhfeld 5, 57299 Burbach.</p>
    `)
  },

  "/widerruf": {
    title: "Widerruf | Entrance in Harmony Burbach",
    description: "Widerrufsinformationen für Gutscheine, Produkte und Behandlungen von Entrance in Harmony gemäß gesetzlichen Anforderungen.",
    noindex: true,
    structuredData: [breadcrumb([{ name: "Startseite", url: "/" }, { name: "Widerruf", url: "/widerruf" }])],
    preRenderHtml: wrapPage(`
      <h1 style="font-size:2.2rem;font-weight:300;margin-bottom:1rem">Widerruf und Rückgabe</h1>
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
