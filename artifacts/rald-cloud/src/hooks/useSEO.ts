import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  themeColor?: string;
  product?: {
    name: string;
    category: string;
    operatingSystem?: string;
    applicationCategory?: string;
    offers?: { price: string; priceCurrency: string };
  };
}

function setMeta(attr: string, val: string, key = "name") {
  let el = document.querySelector(`meta[${key}="${attr}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, attr);
    document.head.appendChild(el);
  }
  el.setAttribute("content", val);
}

function setLink(rel: string, val: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = val;
}

function setJsonLD(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({ title, description, url, image = "/og-image.png", themeColor = "#FF2E2E", product }: SEOConfig) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    setMeta("description", description);
    setMeta("theme-color", themeColor);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1");

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "RALD.cloud", "property");
    setMeta("og:locale", "en_NG", "property");
    setMeta("og:image", `https://rald.cloud${image}`, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@raldcloud");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", `https://rald.cloud${image}`);

    // Canonical
    setLink("canonical", url);

    // Organization JSON-LD (always present)
    setJsonLD("ld-org", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "RALD",
      legalName: "LILCKY STUDIO LIMITED",
      url: "https://rald.cloud",
      logo: "https://rald.cloud/rald-icon.png",
      foundingDate: "2024",
      description: "Africa's Digital Operating System — identity, payments, messaging, education, logistics, voice and developer infrastructure.",
      contactPoint: { "@type": "ContactPoint", email: "support@rald.cloud", contactType: "customer support", areaServed: "Africa" },
      address: { "@type": "PostalAddress", addressCountry: "NG", addressRegion: "Lagos" },
      sameAs: ["https://twitter.com/raldcloud", "https://linkedin.com/company/rald"],
    });

    // Per-page WebPage JSON-LD
    setJsonLD("ld-page", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      inLanguage: "en-NG",
      publisher: { "@type": "Organization", name: "RALD", url: "https://rald.cloud" },
      isPartOf: { "@type": "WebSite", name: "RALD.cloud", url: "https://rald.cloud" },
    });

    // Per-product SoftwareApplication JSON-LD
    if (product) {
      setJsonLD("ld-product", {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: product.name,
        applicationCategory: product.applicationCategory ?? "BusinessApplication",
        operatingSystem: product.operatingSystem ?? "Web, Android, iOS",
        description,
        url,
        publisher: { "@type": "Organization", name: "RALD", url: "https://rald.cloud" },
        ...(product.offers ? { offers: { "@type": "Offer", ...product.offers } } : {}),
      });
    }

    return () => {
      document.title = prev;
      document.getElementById("ld-page")?.remove();
      document.getElementById("ld-product")?.remove();
    };
  }, [title, description, url, themeColor]);
}
