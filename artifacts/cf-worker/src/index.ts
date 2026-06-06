import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import healthRoutes from "./routes/health";
import referralRoutes from "./routes/referrals";
import ecosystemRoutes from "./routes/ecosystem";
import agentRoutes from "./routes/agents";
import authRoutes from "./routes/auth";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_ANON_KEY: string;
  ENVIRONMENT: string;
  APP_VERSION: string;
  ISSUER_URL?: string;
  CLIENT_ID?: string;
  CLIENT_SECRET?: string;
}

/* ── Product metadata for per-subdomain SEO ─────────────────────────────── */
const PRODUCTS: Record<string, { name: string; tagline: string; description: string; color: string; path: string }> = {
  payrald:   { name: "PayRald",       tagline: "Move money at the speed of Africa",         description: "Enterprise payment infrastructure for African businesses — intelligent multi-gateway routing, real-time settlements, and fraud detection from one API.", color: "#0066FF", path: "/payrald" },
  raldtics:  { name: "Raldtics",      tagline: "Data that moves markets",                   description: "Real-time analytics and AI expansion scoring across 12 African regions. Built for operators who move fast.", color: "#FFD400", path: "/raldtics" },
  dunarald:  { name: "DunaRald",      tagline: "Africa's entertainment layer",              description: "Stream, share, and monetize African content. The digital entertainment platform built for Africa's 1.4B consumers.", color: "#A855F7", path: "/dunarald" },
  loop:      { name: "Loop Business", tagline: "Africa's Commerce OS",                      description: "Sell online, manage inventory, accept payments — the complete commerce operating system for African merchants.", color: "#FF6A00", path: "/loop" },
  business:  { name: "Loop Business", tagline: "Africa's Commerce OS",                      description: "Sell online, manage inventory, accept payments — the complete commerce operating system for African merchants.", color: "#FF6A00", path: "/loop" },
  dispatch:  { name: "Loop Dispatch", tagline: "Last-mile, first class",                    description: "Smart carrier selection across GIG, Sendbox, Kwik, and 7 more African logistics providers.", color: "#3B82F6", path: "/dispatch" },
  voice:     { name: "Loop Voice",    tagline: "Voice infrastructure for builders",         description: "SIP trunking, IVR, and WebRTC calls with Nigerian language TTS — Africa's voice API.", color: "#FF4FAD", path: "/voice" },
  messenger: { name: "Loop Messenger",tagline: "Business messaging for Africa",             description: "Secure, fast, end-to-end encrypted messaging platform — built for African teams and merchants.", color: "#FF7A00", path: "/messenger" },
  silicon:   { name: "RALD Console",  tagline: "Developer infrastructure for Africa",       description: "Manage RALD services, deployments, and infrastructure from one unified developer console.", color: "#00E5FF", path: "/console" },
  console:   { name: "RALD Console",  tagline: "Developer infrastructure for Africa",       description: "Manage RALD services, deployments, and infrastructure from one unified developer console.", color: "#00E5FF", path: "/console" },
  manilla:   { name: "Manilla",       tagline: "Your RALD digital hub",                     description: "Manilla is your all-in-one RALD digital services hub — manage your account, subscriptions, and connected RALD products from one place.", color: "#FF6A00", path: "/products/manilla" },
};

function productHtml(sub: string, canonical: string): string {
  const p = PRODUCTS[sub];
  if (!p) return "";
  const title = `${p.name} — ${p.tagline} | RALD.cloud`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org", "@type": "SoftwareApplication",
    "name": p.name, "description": p.description,
    "url": canonical, "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NGN" },
    "publisher": { "@type": "Organization", "name": "LILCKY STUDIO LIMITED", "url": "https://rald.cloud" }
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1">
<title>${title}</title>
<meta name="description" content="${p.description}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta name="theme-color" content="${p.color}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${p.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${p.name} · RALD.cloud">
<meta property="og:image" content="https://rald.cloud/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${p.description}">
<link rel="canonical" href="${canonical}">
<script type="application/ld+json">${jsonLd}</script>
<link rel="icon" type="image/svg+xml" href="https://rald.cloud/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<script>
// Redirect to rald.cloud SPA with the correct product route
(function(){var p=${JSON.stringify(p.path)};if(window.location.pathname==="/")window.location.replace("https://rald.cloud"+p);})();
</script>
</head>
<body style="margin:0;background:#040C18;color:#fff;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
<div style="text-align:center;padding:40px 20px;">
  <div style="font-size:36px;font-weight:900;letter-spacing:-1px;color:#fff;margin-bottom:8px;">RALD</div>
  <div style="font-size:20px;font-weight:700;color:${p.color};margin-bottom:12px;">${p.name}</div>
  <div style="color:rgba(255,255,255,0.5);font-size:15px;max-width:480px;">${p.tagline}</div>
  <a href="https://rald.cloud${p.path}" style="display:inline-block;margin-top:24px;padding:12px 28px;background:${p.color};color:#000;font-weight:700;border-radius:8px;text-decoration:none;">Open ${p.name} →</a>
</div>
</body>
</html>`;
}

const app = new Hono<{ Bindings: Env }>();

/* ── GLOBAL MIDDLEWARE ─────────────────────────────────────────────────── */
app.use("*", logger());
app.use("*", secureHeaders());
app.use("*", cors({
  origin: [
    "https://rald.cloud", "https://admin.rald.cloud", "https://control.rald.cloud",
    "https://sdk.rald.cloud", "http://localhost:5173", "http://localhost:24793",
  ],
  allowHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  maxAge: 600,
}));

/* ── PER-SUBDOMAIN SEO PRERENDERING ──────────────────────────────────────
   Intercepts GET / on product subdomains and returns server-rendered HTML
   with correct title, meta, canonical, and JSON-LD for Googlebot.
   JS clients get redirected immediately by the inline script.            */
app.get("/", (c) => {
  const host = c.req.header("host") ?? "";
  const sub = host.split(".")[0].toLowerCase();
  if (PRODUCTS[sub]) {
    const canonical = `https://${host}/`;
    const html = productHtml(sub, canonical);
    if (html) {
      return new Response(html, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "Cache-Control": "public,max-age=300,s-maxage=300",
          "X-Robots-Tag": "index,follow",
        },
      });
    }
  }
  return c.json({
    service: "RALD Edge", version: c.env.APP_VERSION ?? "1.1.0",
    environment: c.env.ENVIRONMENT ?? "production",
    timestamp: new Date().toISOString(),
  });
});

/* ── API ROUTES ──────────────────────────────────────────────────────────*/
app.route("/health", healthRoutes);
app.route("/ready", healthRoutes);
app.route("/api/health", healthRoutes);
app.route("/api/auth", authRoutes);
app.route("/api/referrals", referralRoutes);
app.route("/api/ecosystem", ecosystemRoutes);
app.route("/api/agents", agentRoutes);

app.get("/version", (c) => c.json({
  version: c.env.APP_VERSION ?? "1.1.0",
  environment: c.env.ENVIRONMENT ?? "production",
  built: "RALD.cloud · Operated by LILCKY STUDIO LIMITED",
}));

app.notFound((c) => c.json({ error: "not_found", path: c.req.path }, 404));
app.onError((err, c) => {
  console.error("[RALD Edge Error]", err);
  return c.json({ error: "internal_error", message: "Something went wrong" }, 500);
});

export default app;
