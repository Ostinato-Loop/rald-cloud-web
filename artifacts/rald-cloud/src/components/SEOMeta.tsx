import { useEffect } from "react";

export interface JsonLdOrg {
  "@type": "Organization";
}
export interface JsonLdSoftware {
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: { "@type": "Offer"; price: string; priceCurrency: string };
}
export type JsonLd = JsonLdOrg | JsonLdSoftware | Record<string, unknown>;

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalPath?: string;
  productColor?: string;
  productName?: string;
  jsonLd?: JsonLd | JsonLd[];
  noIndex?: boolean;
}

const RALD_ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RALD",
  legalName: "LILCKY STUDIO LIMITED",
  url: "https://rald.cloud",
  logo: "https://rald.cloud/og-image.png",
  foundingDate: "2024",
  description: "Africa's complete digital commerce ecosystem — payments, social commerce, analytics, entertainment and more.",
  contactPoint: { "@type": "ContactPoint", email: "support@rald.cloud", contactType: "customer support" },
  sameAs: ["https://twitter.com/raldcloud", "https://linkedin.com/company/rald"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
    addressRegion: "Lagos"
  }
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RALD.cloud",
  url: "https://rald.cloud",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://rald.cloud/?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
};

function injectJsonLd(id: string, data: unknown): void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string): void {
  document.getElementById(id)?.remove();
}

export default function SEOMeta({
  title, description, keywords, ogImage, canonicalPath,
  productColor, productName, jsonLd, noIndex,
}: SEOMetaProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const removeMeta = (name: string, property = false) => {
      const attr = property ? "property" : "name";
      document.querySelector(`meta[${attr}="${name}"]`)?.remove();
    };

    // Core meta
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    else removeMeta("keywords");

    if (noIndex) setMeta("robots", "noindex,nofollow");
    else setMeta("robots", "index,follow,max-image-preview:large");

    // Theme color for product branding
    if (productColor) setMeta("theme-color", productColor);

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", productName ? `${productName} — RALD.cloud` : "RALD.cloud", true);
    setMeta("og:locale", "en_NG", true);
    const imgUrl = ogImage ?? "https://rald.cloud/og-image.png";
    setMeta("og:image", imgUrl, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    if (canonicalPath) {
      setMeta("og:url", `https://rald.cloud${canonicalPath}`, true);
      // Canonical link
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `https://rald.cloud${canonicalPath}`;
    }

    // Twitter / X Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@raldcloud");
    setMeta("twitter:creator", "@raldcloud");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imgUrl);
    setMeta("twitter:image:alt", title);

    // JSON-LD — always inject org + website schemas
    injectJsonLd("ld-org", RALD_ORG_LD);
    injectJsonLd("ld-website", WEBSITE_LD);

    // Product/page-specific JSON-LD
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        injectJsonLd(`ld-page-${i}`, { "@context": "https://schema.org", ...schema });
      });
    } else {
      // Clean up old page-specific LD
      [0, 1, 2].forEach(i => removeJsonLd(`ld-page-${i}`));
    }

    return () => {
      removeJsonLd("ld-org");
      removeJsonLd("ld-website");
      [0, 1, 2].forEach(i => removeJsonLd(`ld-page-${i}`));
    };
  }, [title, description, keywords, ogImage, canonicalPath, productColor, productName, jsonLd, noIndex]);

  return null;
}

// ─── Pre-built JSON-LD schemas for each RALD product ───────────────────────

export function makeSoftwareLd(name: string, description: string, url: string, category = "BusinessApplication"): JsonLd {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
    publisher: { "@type": "Organization", name: "LILCKY STUDIO LIMITED", url: "https://rald.cloud" },
  };
}

export function makeProductLd(name: string, description: string, image: string, url: string): JsonLd {
  return {
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: { "@type": "Brand", name: "RALD" },
    manufacturer: { "@type": "Organization", name: "LILCKY STUDIO LIMITED" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "NGN", availability: "https://schema.org/InStock" },
  };
}

export const PRODUCT_SCHEMAS: Record<string, JsonLd> = {
  loop: makeSoftwareLd("Loop", "Social commerce platform connecting African buyers and sellers", "https://loop.rald.cloud", "ShoppingApplication"),
  payrald: makeSoftwareLd("PayRald", "Digital payments, wallets, and settlements for Africa", "https://payrald.rald.cloud", "FinanceApplication"),
  raldtics: makeSoftwareLd("Raldtics", "Real-time business analytics and intelligence", "https://raldtics.rald.cloud", "BusinessApplication"),
  dunarald: makeSoftwareLd("DunaRald", "African entertainment and digital content streaming", "https://dunarald.rald.cloud", "EntertainmentApplication"),
  dispatch: makeSoftwareLd("Loop Dispatch", "Last-mile delivery and logistics management", "https://dispatch.rald.cloud", "BusinessApplication"),
  messenger: makeSoftwareLd("Loop Messenger", "Business communications and messaging platform", "https://messenger.rald.cloud", "CommunicationApplication"),
  voice: makeSoftwareLd("Loop Voice", "Voice and audio communication services", "https://voice.rald.cloud", "CommunicationApplication"),
  gitrald: makeSoftwareLd("GitRald", "Deployment governance and CI/CD management", "https://admin.rald.cloud", "DeveloperApplication"),
};
