import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight, Code2, Key, Webhook, Shield, Globe, Zap, BookOpen, Terminal, Layers, CheckCircle } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const BG = "#050A0F", S = "#070D14", RED = "#FF2E2E";

const APIS = [
  { name:"Identity API",    product:"RALD ALIA",       color:"#00E5FF", emoji:"🪪", desc:"Verify users with BVN/NIN, issue ALIA aliases, query trust scores and manage consent in real-time.",
    endpoints:["POST /identity/verify","GET /identity/{alias}","POST /identity/trust","DELETE /identity/session"] },
  { name:"Payments API",    product:"PayRald",          color:"#0066FF", emoji:"💳", desc:"Accept payments, create wallets, split transactions, handle settlements and trigger refunds across 10+ gateways.",
    endpoints:["POST /payments/charge","GET /payments/{id}","POST /payments/refund","POST /wallets/transfer"] },
  { name:"Messaging API",   product:"Loop Messenger",   color:"#FF7A00", emoji:"💬", desc:"Send messages, create group threads, trigger in-chat payment requests and read delivery status.",
    endpoints:["POST /messages/send","GET /threads/{id}","POST /messages/pay","GET /messages/status"] },
  { name:"Mail API",        product:"RALD Mail",        color:"#00E5FF", emoji:"📧", desc:"Send transactional emails, manage templates, track open rates and configure domain authentication.",
    endpoints:["POST /mail/send","GET /mail/status/{id}","POST /mail/templates","GET /mail/analytics"] },
  { name:"Voice API",       product:"Loop Voice",       color:"#FF4FAD", emoji:"🎙", desc:"Synthesise speech in 24 African languages, build IVR trees and transcribe audio from any call.",
    endpoints:["POST /voice/speak","POST /voice/ivr","POST /voice/transcribe","GET /voice/languages"] },
  { name:"Analytics API",   product:"Raldtics",        color:"#FFD400", emoji:"📊", desc:"Track custom events, query funnels, retrieve user segments and export cohort data.",
    endpoints:["POST /analytics/track","POST /analytics/funnel","GET /analytics/cohort","GET /analytics/realtime"] },
  { name:"Logistics API",   product:"Loop Dispatch",   color:"#00BFFF", emoji:"🚚", desc:"Create shipments, get carrier quotes, track deliveries and receive proof-of-delivery webhooks.",
    endpoints:["POST /logistics/ship","GET /logistics/quote","GET /logistics/track/{id}","GET /logistics/proof"] },
  { name:"Education API",   product:"RALD Elimu",      color:"#A855F7", emoji:"🏫", desc:"Manage student records, mark attendance, trigger fee payment requests and sync with parent accounts.",
    endpoints:["POST /elimu/students","POST /elimu/attendance","POST /elimu/fee-request","GET /elimu/school/{id}"] },
];

const SNIPPETS: Record<string, string> = {
  identity: `import { RALDClient } from "@rald/sdk";
const rald = new RALDClient({ apiKey: process.env.RALD_KEY });

// Verify a user's identity
const identity = await rald.identity.verify({
  phone: "+2348012345678",
  bvn:   "12345678901",
  liveness: { selfie: selfieBase64 }
});

// { alias: "@chidi.rald", trustScore: 94, verified: true }
console.log(identity.alias); // @chidi.rald`,

  payments: `import { RALDClient } from "@rald/sdk";
const rald = new RALDClient({ apiKey: process.env.RALD_KEY });

// Charge a customer — auto gateway routing
const charge = await rald.payments.charge({
  amount:   12500,          // ₦125.00
  currency: "NGN",
  customer: { alias: "@chidi.rald" },
  meta:     { orderId: "ORD-9821" }
});

// Routed to Paystack (97.2% success) in 187ms
console.log(charge.status); // "success"`,

  messaging: `import { RALDClient } from "@rald/sdk";
const rald = new RALDClient({ apiKey: process.env.RALD_KEY });

// Send a message with an attached payment
const msg = await rald.messaging.send({
  to:      "@fatima.rald",
  body:    "Here's the ₦15,000 I owe you 🙏",
  payment: { amount: 15000, currency: "NGN" }
});

// Delivered in 840ms. Payment settled instantly.
console.log(msg.delivered); // true`,

  mail: `import { RALDClient } from "@rald/sdk";
const rald = new RALDClient({ apiKey: process.env.RALD_KEY });

// Send a transactional email
await rald.mail.send({
  to:       "customer@example.com",
  template: "payment-receipt",
  data:     { name: "Adaeze", amount: "₦12,500", ref: "TXN-001" }
});

// Delivered in 412ms · 99.7% inbox rate · Lagos relay`,
};

const LAYERS = [
  { name: "Identity",      desc: "RALD ALIA trust network",                   color: "#00E5FF", icon: "🪪" },
  { name: "Auth",          desc: "API keys, OAuth 2.0, PKCE flows",           color: "#A855F7", icon: "🔑" },
  { name: "Gateway",       desc: "Request routing, rate-limiting, versioning", color: "#00FF88", icon: "🔀" },
  { name: "Products",      desc: "8 API surfaces across the RALD OS",         color: "#FFD400", icon: "⚡" },
  { name: "Events",        desc: "Webhooks, event bus, real-time streams",     color: "#FF7A00", icon: "📡" },
  { name: "Infrastructure",desc: "Lagos + Nairobi servers, Cloudflare edge",  color: "#00BFFF", icon: "🌍" },
];

const SDKS = [
  { lang:"Node.js",  install:"npm install @rald/sdk",       badge:"#339933" },
  { lang:"Python",   install:"pip install rald-sdk",         badge:"#3776AB" },
  { lang:"PHP",      install:"composer require rald/sdk",    badge:"#777BB4" },
  { lang:"Go",       install:"go get github.com/rald/sdk",   badge:"#00ADD8" },
];

export default function Developers() {
  const [sc, setSc] = useState(false);
  const [activeApi, setActiveApi] = useState(0);
  const [activeTab, setActiveTab] = useState<keyof typeof SNIPPETS>("identity");
  const [visLayer, setVisLayer] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Developer Portal — Build on RALD OS | RALD.cloud",
    description: "RALD provides 8 API surfaces across identity, payments, messaging, email, voice, analytics, logistics and education. One SDK, one key, all of Africa's infrastructure.",
    url: "https://rald.cloud/developers",
    themeColor: "#00FF88",
    product: { name: "RALD Developer Platform", applicationCategory: "DeveloperApplication", operatingSystem: "Web" },
  });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => {
    const el = layerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisLayer(true); }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const api = APIS[activeApi];

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <style>{`
        @keyframes dup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dp{0%,100%{opacity:.35}50%{opacity:1}}
        @keyframes cursor{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        .devcode{font-family:ui-monospace,"Cascadia Code",monospace;font-size:12.5px;line-height:1.85;white-space:pre}
        .devcard{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;transition:all .22s}
        .devcard:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.13);transform:translateY(-2px)}
        .apicard{border-radius:14px;transition:all .22s;cursor:pointer}
        .snippet-enter{animation:slideIn .25s ease forwards}
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 h-16 transition-all"
        style={{ background: sc ? `${BG}F2` : "transparent", backdropFilter: sc ? "blur(16px)" : "none", borderBottom: sc ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height: 20, filter: "brightness(0) invert(1)" }} /></Link>
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "rgba(255,255,255,.4)" }}>
          {[["Products", "/products"], ["ALIA", "/alia"], ["PayRald", "/payrald"], ["Privacy", "/privacy"]].map(([l, h]) => (
            <Link key={l} href={h} className="hover:text-white/70 transition-colors">{l}</Link>
          ))}
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section aria-label="Hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-16 overflow-hidden" style={{ animation: "dup .7s ease forwards" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,136,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,.025) 1px,transparent 1px)`, backgroundSize: "52px 52px" }} />
          <div className="absolute pointer-events-none" style={{ top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(0,255,136,.05) 0%,transparent 65%)" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: "rgba(0,255,136,.1)", border: "1px solid rgba(0,255,136,.28)", color: "#00FF88" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF88", display: "inline-block", animation: "dp 2s ease-in-out infinite" }} />
              RALD Developer Platform · 8 API surfaces
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6" style={{ maxWidth: 780, margin: "0 auto 24px" }}>
              Build on Africa's<br />
              <span style={{ background: "linear-gradient(135deg,#00FF88,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>digital infrastructure.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10" style={{ color: "rgba(255,255,255,.5)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
              One SDK. One API key. Access identity, payments, messaging, voice, email, analytics, logistics and education — for every African market.
            </p>

            {/* Terminal preview */}
            <div className="rounded-2xl overflow-hidden mx-auto max-w-xl text-left" style={{ border: "1px solid rgba(0,255,136,.2)", background: "rgba(0,0,0,.7)" }}>
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-3 text-xs" style={{ color: "rgba(255,255,255,.3)" }}>npm · @rald/sdk</span>
              </div>
              <pre className="devcode p-5 text-sm" style={{ color: "#9DC8B0" }}>{`npm install @rald/sdk

import { RALDClient } from "@rald/sdk";
const rald = new RALDClient({ apiKey: "rk_live_..." });

const identity = await rald.identity.verify({ ... });
const charge   = await rald.payments.charge({ ... });
const msg      = await rald.messaging.send({ ... });

// ✅ Africa's infrastructure. One import.`}</pre>
            </div>
          </div>

          <a href="#apis" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20">
            <span className="text-xs">explore the APIs</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </section>

        {/* ── API SURFACES ─────────────────────────────────────── */}
        <section id="apis" aria-label="API surfaces" className="py-28 px-5" style={{ background: S }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#00FF88" }}>8 API surfaces</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Every RALD product.<br />One unified API.</h2>
              <p className="text-lg" style={{ color: "rgba(255,255,255,.4)", maxWidth: 520, margin: "0 auto" }}>
                Each API follows the same authentication, error format and versioning pattern. Learn once, use everywhere.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-3 mb-12">
              {APIS.map((a, i) => (
                <div key={a.name} className="apicard p-5" onClick={() => setActiveApi(i)}
                  style={{
                    background: activeApi === i ? `${a.color}10` : "rgba(255,255,255,.03)",
                    border: `1px solid ${activeApi === i ? a.color + "35" : "rgba(255,255,255,.07)"}`,
                    boxShadow: activeApi === i ? `0 0 24px ${a.color}10` : "none",
                  }}>
                  <div className="text-2xl mb-3">{a.emoji}</div>
                  <div className="font-black text-white text-sm mb-0.5">{a.name}</div>
                  <div className="text-xs" style={{ color: a.color }}>{a.product}</div>
                </div>
              ))}
            </div>

            {/* Expanded API detail */}
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${api.color}20`, background: `${api.color}06` }}>
              <div className="flex items-center gap-4 px-7 py-5 border-b" style={{ borderColor: `${api.color}15` }}>
                <span className="text-3xl">{api.emoji}</span>
                <div>
                  <h3 className="font-black text-white text-lg">{api.name}</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,.45)" }}>{api.desc}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-7 border-r" style={{ borderColor: `${api.color}10` }}>
                  <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: api.color }}>Endpoints</p>
                  <div className="flex flex-col gap-2">
                    {api.endpoints.map(ep => {
                      const [method, ...rest] = ep.split(' ');
                      const methodColors: Record<string,string> = { POST: "#00FF88", GET: "#00E5FF", DELETE: "#FF4FAD", PUT: "#FFD400", PATCH: "#FF7A00" };
                      return (
                        <div key={ep} className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: "rgba(255,255,255,.04)", fontFamily: "ui-monospace,monospace", fontSize: 12 }}>
                          <span className="font-black w-12 text-xs" style={{ color: methodColors[method] ?? "#00FF88" }}>{method}</span>
                          <span style={{ color: "rgba(255,255,255,.65)" }}>{rest.join(' ')}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: api.color }}>Common patterns</p>
                  {["RESTful JSON · application/json", "Bearer token auth: Authorization: Bearer rk_live_...", "Rate limits: 1,000 req/min (dev) · 10,000 req/min (prod)", "Webhooks available for all async events"].map(p => (
                    <div key={p} className="flex items-start gap-2.5 mb-3 text-sm" style={{ color: "rgba(255,255,255,.45)" }}>
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: api.color }} />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CODE EXAMPLES ────────────────────────────────────── */}
        <section aria-label="Code examples" className="py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#00FF88" }}>Real code</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Same pattern. Every API.</h2>
              <p className="text-lg" style={{ color: "rgba(255,255,255,.4)" }}>Once you understand one call, you understand all of them.</p>
            </div>

            {/* Tab bar */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {(Object.keys(SNIPPETS) as (keyof typeof SNIPPETS)[]).map(k => (
                <button key={k} onClick={() => setActiveTab(k)}
                  className="px-5 py-2 rounded-full text-xs font-bold capitalize transition-all"
                  style={{
                    background: activeTab === k ? "#00FF88" : "rgba(255,255,255,.06)",
                    color: activeTab === k ? "#000" : "rgba(255,255,255,.45)",
                    border: activeTab === k ? "none" : "1px solid rgba(255,255,255,.1)",
                  }}>
                  {k === "identity" ? "Identity" : k === "payments" ? "Payments" : k === "messaging" ? "Messaging" : "Mail"}
                </button>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,136,.15)", background: "rgba(0,0,0,.7)" }}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,.3)" }}>Node.js · TypeScript</span>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(0,255,136,.1)", color: "#00FF88" }}>v1.0</span>
              </div>
              <pre key={activeTab} className="devcode snippet-enter p-7 overflow-x-auto" style={{ color: "#8FC8A0" }}>
                {SNIPPETS[activeTab]}
              </pre>
            </div>
          </div>
        </section>

        {/* ── SDKs ─────────────────────────────────────────────── */}
        <section aria-label="SDKs" className="py-20 px-5" style={{ background: S }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#00FF88" }}>Official SDKs</p>
              <h2 className="text-2xl md:text-3xl font-black text-white">Your language. Our infrastructure.</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SDKS.map(s => (
                <div key={s.lang} className="devcard p-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: s.badge + "20" }}>
                    <Code2 className="w-4 h-4" style={{ color: s.badge }} />
                  </div>
                  <div className="font-black text-white mb-3">{s.lang}</div>
                  <div className="px-3 py-2 rounded-lg text-xs" style={{ fontFamily: "ui-monospace,monospace", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.5)" }}>
                    {s.install}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE LAYERS ──────────────────────────────── */}
        <section ref={layerRef} aria-label="Architecture" className="py-28 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#00FF88" }}>Infrastructure</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How RALD is built</h2>
              <p style={{ color: "rgba(255,255,255,.4)", maxWidth: 480, margin: "0 auto" }}>
                Every API call flows through 6 layers — identity at the top, African servers at the bottom.
              </p>
            </div>

            <div className="relative">
              {/* Vertical connector */}
              <div className="absolute left-8 top-6 bottom-6 w-px" style={{ background: "linear-gradient(to bottom,#00FF88,#00E5FF,#A855F7,#FFD400,#FF7A00,#00BFFF)", opacity: .3 }} />

              <div className="flex flex-col gap-3">
                {LAYERS.map((l, i) => (
                  <div key={l.name} className="flex items-center gap-5 pl-16 pr-7 py-5 rounded-2xl transition-all hover:bg-white/3 relative"
                    style={{
                      background: "rgba(255,255,255,.025)",
                      border: "1px solid rgba(255,255,255,.06)",
                      opacity: visLayer ? 1 : 0,
                      transform: visLayer ? "none" : "translateX(-12px)",
                      transition: `all .4s ease ${i * 0.08}s`,
                    }}>
                    {/* Node on timeline */}
                    <div className="absolute left-6 w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ background: BG, borderColor: l.color, boxShadow: `0 0 8px ${l.color}50` }} />
                    <div className="text-xl mr-1">{l.icon}</div>
                    <div className="flex-1">
                      <div className="font-black text-white">{l.name}</div>
                      <div className="text-sm" style={{ color: "rgba(255,255,255,.4)" }}>{l.desc}</div>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${l.color}12`, color: l.color }}>
                      Layer {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AUTH OVERVIEW ────────────────────────────────────── */}
        <section aria-label="Authentication" className="py-20 px-5" style={{ background: S }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#00FF88" }}>Authentication</p>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">One key. All products.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Key,      label:"Master API Key",   desc:"Your root credential (`rk_live_...`). Scoped at the account level. Rotate any time.", color:"#00FF88" },
                { icon: Shield,   label:"Product Keys",     desc:"Scoped to one product — PayRald, Mail, etc. Limit blast radius of a leaked key.", color:"#00E5FF" },
                { icon: Webhook,  label:"Webhook Secrets",  desc:"Every webhook comes with a signature header. Verify with HMAC-SHA256 in 2 lines.", color:"#FFD400" },
              ].map(c => (
                <div key={c.label} className="devcard p-7">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${c.color}12`, border: `1px solid ${c.color}22` }}>
                    <c.icon className="w-5 h-5" style={{ color: c.color }} />
                  </div>
                  <h3 className="font-black text-white mb-2">{c.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Auth code snippet */}
            <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,136,.12)", background: "rgba(0,0,0,.6)" }}>
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-3 text-xs" style={{ color: "rgba(255,255,255,.3)" }}>Authorization header</span>
              </div>
              <pre className="devcode p-6 text-sm" style={{ color: "#8FC8A0" }}>{`// Every request
Authorization: Bearer rk_live_raldXXXXXXXXXXXXXXXX

// Verify an incoming webhook (Node.js)
import { verifyWebhook } from "@rald/sdk";
const event = verifyWebhook(req.body, req.headers["rald-signature"]);
// { type: "payment.completed", data: { ... } }`}</pre>
            </div>
          </div>
        </section>

        {/* ── UPCOMING FEATURES ────────────────────────────────── */}
        <section aria-label="Roadmap" className="py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#00FF88" }}>On the roadmap</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">What's coming next</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon:"🏪", label:"API Marketplace",      eta:"2026", desc:"Sell API capabilities to other RALD developers. Billing, metering and revenue split handled by RALD." },
                { icon:"🤖", label:"AI Agent SDK",         eta:"2026", desc:"Give AI agents a RALD identity and wallet. Let them pay, verify users and send messages autonomously." },
                { icon:"📜", label:"API Changelog",        eta:"2025", desc:"Every breaking change notified via webhook, email and in-console banner. Never surprised by a migration." },
                { icon:"🌍", label:"Multi-country keys",   eta:"2026", desc:"One key that unlocks APIs across Nigeria, Kenya, Ghana and South Africa — governed by country activation rules." },
                { icon:"🔍", label:"Request Inspector",    eta:"2026", desc:"See every API call you've made in real-time — payload, response, latency and gateway used." },
                { icon:"📊", label:"Usage dashboard",      eta:"2025", desc:"Know exactly which APIs you're using, what your costs are, and where your rate limits sit — today." },
              ].map(c => (
                <div key={c.label} className="devcard p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl">{c.icon}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(0,255,136,.1)", color: "#00FF88" }}>{c.eta}</span>
                  </div>
                  <h3 className="font-black text-white mb-2">{c.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.4)" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING ──────────────────────────────────────────── */}
        <section aria-label="About the platform" className="py-24 px-5 text-center" style={{ background: S, borderTop: "1px solid rgba(255,255,255,.05)" }}>
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ background: "rgba(0,255,136,.08)", border: "1px solid rgba(0,255,136,.2)" }}>
              <Layers className="w-8 h-8" style={{ color: "#00FF88" }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
              Africa's infrastructure.<br />
              <span style={{ background: "linear-gradient(135deg,#00FF88,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One unified platform.</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,.4)" }}>
              RALD is built by Africans, hosted in Africa, and designed for the realities of building here — slow networks, multiple languages, fragmented payment rails, and millions of unbanked users.
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {[
                { icon: Globe, label: "Lagos + Nairobi infra" },
                { icon: Zap,   label: "<200ms API response" },
                { icon: Shield,label: "NDPR compliant" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,.5)" }}>
                  <f.icon className="w-4 h-4" style={{ color: "#00FF88" }} />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-5" style={{ background: "#010508", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 20, filter: "brightness(0) invert(1)" }} />
          <nav className="flex flex-wrap justify-center gap-5 text-xs" style={{ color: "rgba(255,255,255,.25)" }} aria-label="Footer navigation">
            {[["Home", "/"], ["Products", "/products"], ["ALIA", "/alia"], ["PayRald", "/payrald"], ["Privacy", "/privacy"], ["Terms", "/terms"]].map(([l, h]) => (
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </nav>
          <div className="text-xs" style={{ color: "rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
