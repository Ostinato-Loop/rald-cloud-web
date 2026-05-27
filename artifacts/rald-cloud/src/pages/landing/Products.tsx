import { Link } from "wouter";
import { ArrowRight, Zap, Activity } from "lucide-react";
import { LandingNav } from "./shared";
import SEOMeta from "@/components/SEOMeta";

/* ── BRAND COLORS (canonical per-product palette) ────────────────────────
 * Loop Business      #00C97C  emerald    — growth, commerce, Africa green
 * PayRald            #38bdf8  sky blue   — trust, finance, clarity
 * Raldtics           #a78bfa  violet     — intelligence, AI, analytics
 * Loop Dispatch      #fb923c  orange     — energy, logistics, motion
 * Loop Voice         #f472b6  pink       — voice, human, warmth
 * RALD Identity      #22d3ee  cyan       — identity, security, precision
 * GitRald            #818cf8  indigo     — devtools, code, build
 * RALD SDK           #fbbf24  amber      — developer, API, integration
 * Control Center     #e2e8f0  slate      — platform, governance, control
 * Loop Messenger     #34d399  teal       — messaging, connection, speed
 * DunaRald           #f97316  orange     — discovery, commerce, vibrancy
 * ─────────────────────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    slug: "loop",        name: "Loop Business",   tagline: "Africa's Commerce OS",
    desc: "Sell online, manage inventory, accept payments — built for African merchants.",
    accent: "#00C97C", cat: "Commerce",
  },
  {
    slug: "payrald",     name: "PayRald",          tagline: "Move money at the speed of Africa",
    desc: "Intelligent multi-gateway routing across 10 Nigerian payment providers.",
    accent: "#38bdf8", cat: "Payments",
  },
  {
    slug: "raldtics",    name: "Raldtics",         tagline: "Data that moves markets",
    desc: "Real-time analytics and AI expansion scoring across 12 African regions.",
    accent: "#a78bfa", cat: "Analytics",
  },
  {
    slug: "dispatch",    name: "Loop Dispatch",    tagline: "Last-mile, first class",
    desc: "Smart carrier selection across GIG, Sendbox, Kwik, and 7 more providers.",
    accent: "#fb923c", cat: "Logistics",
  },
  {
    slug: "voice",       name: "Loop Voice",       tagline: "Voice infrastructure for builders",
    desc: "SIP trunking, IVR, and WebRTC calls with Nigerian language TTS.",
    accent: "#f472b6", cat: "Voice",
  },
  {
    slug: "identity",    name: "RALD Identity",    tagline: "One identity. Every surface.",
    desc: "BVN/NIN verification, face match, and SSO — NDPC compliant.",
    accent: "#22d3ee", cat: "Identity",
  },
  {
    slug: "gitrald",     name: "GitRald",          tagline: "Where Africa ships",
    desc: "CI/CD and repo orchestration for 77+ Ostinato-Loop repositories.",
    accent: "#818cf8", cat: "DevTools",
  },
  {
    slug: "sdk",         name: "RALD SDK",         tagline: "Build anything. Ship everywhere.",
    desc: "TypeScript-first SDKs for every RALD service — one import, all services.",
    accent: "#fbbf24", cat: "SDK",
  },
  {
    slug: "console",     name: "Control Center",   tagline: "The bridge between vision and execution",
    desc: "Govern 12 services, 7 AI agents, and all deployments from one dashboard.",
    accent: "#e2e8f0", cat: "Platform",
  },
  {
    slug: "messenger",   name: "Loop Messenger",   tagline: "Team messaging built for African bandwidth",
    desc: "Offline-first E2E encrypted messaging, voice notes, and threads — works at 2G.",
    accent: "#34d399", cat: "Messaging",
  },
  {
    slug: "dunarald",    name: "DunaRald",         tagline: "Africa's discovery commerce platform",
    desc: "Where African creators, brands, and communities meet buyers. Shop drops, go viral.",
    accent: "#f97316", cat: "Discovery",
  },
];

const AI_AGENTS = [
  {
    id: "atlas",   name: "Atlas",    role: "Expansion Intelligence",
    desc: "Analyses 12 African markets in real time. Identifies growth opportunities before they peak.",
    color: "#00C97C", status: "active", pulseMs: 2000, tasks: "3 market scans/min",
  },
  {
    id: "sentinel", name: "Sentinel", role: "Security & Compliance",
    desc: "NDPC watchdog and fraud detection. Monitors 10K+ transactions per second.",
    color: "#22d3ee", status: "active", pulseMs: 1400, tasks: "0 threats today",
  },
  {
    id: "nova",    name: "Nova",     role: "Payment Routing",
    desc: "Selects the optimal gateway on every transaction. Learns from every failure.",
    color: "#38bdf8", status: "active", pulseMs: 900, tasks: "12 routes optimised",
  },
  {
    id: "forge",   name: "Forge",    role: "DevOps Automation",
    desc: "Owns CI/CD across 77 repos. Pushes green builds, flags regressions, deploys to CF.",
    color: "#818cf8", status: "active", pulseMs: 3000, tasks: "77 repos monitored",
  },
  {
    id: "echo",    name: "Echo",     role: "Communications Layer",
    desc: "Orchestrates Loop Voice + Messenger. Handles NLP routing and smart transcription.",
    color: "#f472b6", status: "idle",   pulseMs: 4000, tasks: "Standby",
  },
  {
    id: "pulse",   name: "Pulse",    role: "Logistics Optimisation",
    desc: "Selects carriers, predicts delays, reroutes shipments — all before customers notice.",
    color: "#fb923c", status: "active", pulseMs: 1800, tasks: "24 routes active",
  },
  {
    id: "lee",     name: "Lee",      role: "AI Orchestrator",
    desc: "Meta-agent that coordinates Atlas, Sentinel, Nova, Forge, Echo, and Pulse.",
    color: "#fbbf24", status: "active", pulseMs: 2500, tasks: "6 agents managed",
  },
];

function AgentOrb({ agent }: { agent: typeof AI_AGENTS[0] }) {
  return (
    <div className="relative group p-5 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-500 cursor-default" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${agent.color}0a, transparent 70%)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="relative flex items-center justify-center w-10 h-10">
          {agent.status === "active" && (
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: `${agent.color}30`, animationDuration: `${agent.pulseMs}ms` }} />
          )}
          <div className="relative w-6 h-6 rounded-full" style={{ background: agent.color, boxShadow: `0 0 16px ${agent.color}80` }} />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/8 text-[10px] font-mono">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: agent.status === "active" ? agent.color : "#ffffff40" }} />
          <span className="text-white/40">{agent.status}</span>
        </div>
      </div>
      <h3 className="font-black text-base text-white mb-0.5">{agent.name}</h3>
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: agent.color }}>{agent.role}</p>
      <p className="text-white/40 text-xs leading-relaxed mb-4">{agent.desc}</p>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: `${agent.color}0d`, border: `1px solid ${agent.color}20` }}>
        <Activity className="h-3 w-3" style={{ color: agent.color }} />
        <span style={{ color: agent.color }}>{agent.tasks}</span>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <SEOMeta
        title="RALD.cloud — Pan-African Enterprise Infrastructure"
        description="11 enterprise products. Payments, logistics, analytics, DevOps, voice, identity, discovery commerce and more — built for Africa, scaling globally."
        keywords="African cloud infrastructure, payments Africa, logistics Africa, DevOps Africa, RALD cloud"
        canonicalPath="/products"
      />
      <LandingNav productName="" accentColor="#00C97C" />

      <div className="relative pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #00C97C 0%, transparent 70%)" }} />

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/60 mb-6">
            <Zap className="h-3 w-3 text-[#00C97C]" /> 11 products. One ecosystem.
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            <span className="text-white">RALD</span><span className="text-[#00C97C]">.cloud</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">The unified African infrastructure platform. Pick the products you need, or use them all.</p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} data-testid={`card-product-${p.slug}`}>
              <div className="group relative p-6 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer h-full" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at top left, ${p.accent}08, transparent 60%)` }} />
                {/* Colored top accent bar */}
                <div className="absolute top-0 left-6 right-6 h-px rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)` }} />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border" style={{ borderColor: `${p.accent}30`, color: p.accent, background: `${p.accent}10` }}>
                    {p.cat}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-black text-lg text-white mb-1">{p.name}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: p.accent }}>{p.tagline}</p>
                <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── AI AGENTS ── */}
        <div className="mt-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00C97C]/20 text-xs font-medium text-[#00C97C]/80 mb-6 bg-[#00C97C]/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C97C] animate-pulse" />
              7 autonomous AI agents · live
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              The <span className="text-[#00C97C]">intelligence</span> layer
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              RALD.cloud doesn't just run infrastructure — it thinks. Seven specialized AI agents work 24/7 to optimize, protect, and scale every part of the ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {AI_AGENTS.slice(0, 6).map((a) => <AgentOrb key={a.id} agent={a} />)}
          </div>
          <div className="max-w-sm mx-auto">
            <AgentOrb agent={AI_AGENTS[6]} />
          </div>
          <div className="mt-10 p-4 rounded-2xl border border-white/8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/30" style={{ background: "rgba(255,255,255,0.015)" }}>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00C97C] animate-pulse" />6 agents active</span>
            <span>·</span><span>1 on standby</span><span>·</span><span>0 alerts</span><span>·</span>
            <span className="text-[#00C97C]">all systems nominal</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-white/60 text-sm">Want early access to all 11 products?</p>
            <Link href="/referral">
              <button className="px-6 py-2.5 rounded-full text-sm font-bold text-black bg-[#00C97C] hover:scale-105 transition-transform" data-testid="button-products-referral-cta">
                Join with a Referral Code
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/30">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-black text-base text-white/70">RALD<span className="text-[#00C97C]">.cloud</span></span>
              <span>Operated by <strong className="text-white/50">LILCKY STUDIO LIMITED</strong></span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/products" className="hover:text-white/60 transition-colors">Products</Link>
              <Link href="/referral" className="hover:text-white/60 transition-colors">Referrals</Link>
              <Link href="/control" className="hover:text-white/60 transition-colors">Dashboard</Link>
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            </div>
            <span>© 2026 RALD.cloud · Pan-African Infrastructure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
