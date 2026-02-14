import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

const BASE_URL = "https://www.entranceinharmony.de";

export default function SEOHead({
  title,
  description,
  path,
  ogType = "website",
  ogImage,
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", `${BASE_URL}${path}`);
    setMeta("property", "og:site_name", "Entrance in Harmony");
    setMeta("property", "og:locale", "de_DE");
    const imageUrl = ogImage
      ? (ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`)
      : `${BASE_URL}/og-image.png`;
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:image", imageUrl);
    setMeta("name", "twitter:description", description);

    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow");
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);

    let ldScript: HTMLScriptElement | null = null;
    if (structuredData) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(ldScript);
    }

    return () => {
      document.title = "Entrance in Harmony - Beauty & Aesthetics";
      if (ldScript) {
        ldScript.remove();
      }
    };
  }, [title, description, path, ogType, ogImage, noindex, structuredData]);

  return null;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Entrance in Harmony",
  "alternateName": "Entrance in Harmony - Beauty & Aesthetics",
  "description": "Professionelles Kosmetikstudio in Burbach, spezialisiert auf Gesichtsbehandlungen, Red Touch Pro Laserbehandlungen und Beauty-Treatments. Inhaberin Elena Hartstein.",
  "url": "https://www.entranceinharmony.de",
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
  "paymentAccepted": "Cash, Credit Card, PayPal",
  "image": "https://www.entranceinharmony.de/og-image.png",
  "founder": {
    "@type": "Person",
    "name": "Elena Hartstein"
  },
  "areaServed": [
    { "@type": "City", "name": "Burbach" },
    { "@type": "City", "name": "Siegen" },
    { "@type": "City", "name": "Neunkirchen" },
    { "@type": "City", "name": "Wilnsdorf" },
    { "@type": "City", "name": "Haiger" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Beauty & Laser Behandlungen",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gesichtsbehandlung Tiefenreinigung",
          "description": "Professionelle Tiefenreinigung mit Hautanalyse und individueller Pflege",
          "provider": { "@type": "BeautySalon", "name": "Entrance in Harmony" }
        },
        "price": "85",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Red Touch Pro Laserbehandlung Gesicht",
          "description": "Nicht-invasive Kollagenstimulation mit DEKA Lasertechnologie für Hautverjüngung",
          "provider": { "@type": "BeautySalon", "name": "Entrance in Harmony" }
        },
        "price": "250",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "BB Glow Behandlung",
          "description": "Semi-permanente Foundation für einen natürlich strahlenden Teint",
          "provider": { "@type": "BeautySalon", "name": "Entrance in Harmony" }
        },
        "price": "85",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Microneedling",
          "description": "Kollagenstimulierende Hautbehandlung für Narben, Falten und Hautstraffung",
          "provider": { "@type": "BeautySalon", "name": "Entrance in Harmony" }
        },
        "price": "90",
        "priceCurrency": "EUR"
      }
    ]
  },
  "sameAs": []
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://www.entranceinharmony.de${item.url}`
  }))
});
