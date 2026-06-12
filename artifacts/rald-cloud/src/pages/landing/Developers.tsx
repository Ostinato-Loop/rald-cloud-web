import { useState, useEffect } from "react";
import { LandingNav, GradientBlob, FeatureCard, StatBadge } from "./shared";
import { ArrowRight, Lock, Code2, Key, Webhook, BarChart3, Shield, Globe, Zap } from "lucide-react";
import SEOMeta from "@/components/SEOMeta";

const ACCENT = "#00FF88";
const GLOW = "#00FF88";
const GRADIENT = "linear-gradient(135deg, #00FF88 0%, #00cc6a 50%, #00994f 100%)";

const FEATURES = [
  {
    icon: "🪪",
    title: "Developer Identity",
    desc: "Every RALD account becomes a developer account. One identity across the ecosystem. No separate registration — your RALD ID is your developer ID.",
  },
  {
    icon: "🔑",
    title: "Master API Key",
    desc: "Every verified developer receives a RALD Master API Key (rk_live_...). Your root credential for identity access, authentication, and session validation.",
  },
  {
    icon: "⚡",
    title: "4 Key Types",
    desc: "Create MASTER, PRODUCT, WORKSPACE, and SERVICE keys. Each scoped to the right level — from personal access to machine-to-machine integrations and AI agents.",
  },
  {
    icon: "🏗️",
    title: "Application Registry",
    desc: "Register your apps with callback URLs, environment configs, and lifecycle management. Separate credentials and limits for Development, Test, and Production.",
  },
  {
    icon: "🔔",
    title: "Webhook System",
    desc: "Subscribe to ecosystem events: user.created, session.started, trust.changed, business.created, room.created, and future events from every RALD product.",
  },
  {
    icon: "📋",
    title: "Audit Logs",
    desc: "Full audit trail of every API call, key creation, rotation, revocation, and permission change. Webhook delivery logs. Export for compliance.",
  },
  {
    icon: "🛡️",
    title: "Trust Level System",
    desc: "5 trust levels from Personal Developer to RALD Certified Partner. Trust determines rate limits, product access, advanced APIs, and production approval.",
  },
  {
    icon: "🌍",
    title: "Country Framework",
    desc: "API access follows the RALD country activation framework. When your country activates, your developer access expands automatically — no reapplication.",
  },
  {
    icon: "🤝",
    title: "Partner Ecosystem",
    desc: "Build on Loop, Messenger, RALD Mail, PayRald, GitRald, Raldtics, RALD AI and every future product from day one. One account. One ecosystem.",
  },
];

const STATS = [
  { value: "1", label: "Identity for everything" },
  { value: "4", label: "API key types" },
  { value: "5", label: "Trust levels" },
  { value: "∞", label: "Products to build on" },
];

const KEY_TYPES = [
  {
    type: "MASTER",
    prefix: "rk_live_",
    color: "#00FF88",
    desc: "Ecosystem root. Acts as identity anchor. Generates product keys.",
    capabilities: ["Identity Lookup", "Authentication", "User Verification", "Username Resolution", "Session Validation", "Trust Validation"],
  },
  {
    type: "PRODUCT",
    prefix: "rp_live_",
    color: "#60a5fa",
    desc: "Product-scoped. Loop, Messenger, Mail, PayRald, GitRald, and more.",
    capabilities: ["Product API Access", "User Context", "Event Streams", "Webhooks"],
  },
  {
    type: "WORKSPACE",
    prefix: "rw_live_",
    color: "#a78bfa",
    desc: "Organization-scoped. Isolated API assets per business entity.",
    capabilities: ["Team Access", "Org Billing", "Shared Resources", "Member Management"],
  },
  {
    type: "SERVICE",
    prefix: "rs_live_",
    color: "#f59e0b",
    desc: "Machine-to-machine. Background jobs, server integrations, AI agents.",
    capabilities: ["Server Auth", "Background Jobs", "AI Agent Auth", "Cron Integrations"],
  },
];

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.rald.cloud/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, product: "developer-beta" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border p-8 text-center max-w-md mx-auto"
        style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}30` }}
      >
        <div className="text-3xl font-black mb-2" style={{ color: ACCENT }}>
          Application received.
        </div>
        <p className="text-white/50 text-sm">
          Developer beta is invite-only. We'll reach out when your slot opens. Follow{" "}
          <span style={{ color: ACCENT }}>@rald_cloud</span> for updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none w-full sm:w-36 transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = `${ACCENT}60`)}
          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none flex-1 transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = `${ACCENT}60`)}
          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || !email}
        className="w-full px-6 py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
        style={{ background: ACCENT }}
      >
        {loading ? "Submitting…" : "Apply for Developer Beta"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
      <p className="text-xs text-white/25 text-center">
        Invite-only · Admin approval required · No auto-provisioning during closed beta
      </p>
    </form>
  );
}

export default function Developers() {
  useEffect(() => {
    document.title = "RALD Developer Platform — Build on Africa's Identity Layer";
  }, []);

  return (
    <>
      <SEOMeta
        title="RALD Developer Platform — Build on Africa's Identity Layer"
        description="The master identity layer for users, businesses, developers, partners, and AI agents across Africa. One RALD account. One developer profile. One ecosystem."
        keywords="RALD developer, API, African developer platform, identity API, developer beta"
        canonicalPath="/developers"
        productColor={ACCENT}
        productName="RALD Developer Platform"
      />
      <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
        <LandingNav productName="Developer Platform" accentColor={ACCENT} />

        {/* ── HERO ── */}
        <section className="relative pt-40 pb-24 px-6 md:px-12 text-center max-w-5xl mx-auto">
          <GradientBlob color={GLOW} className="w-[700px] h-[700px] -top-60 left-1/2 -translate-x-1/2" />

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-8"
            style={{ borderColor: `${ACCENT}40`, color: ACCENT, background: `${ACCENT}10` }}
          >
            <Lock className="h-3 w-3" />
            Closed Beta — Invite Only
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
            <span className="text-white">Build on</span>
            <br />
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              RALD Identity.
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold mb-4 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            The master identity layer for users, businesses, developers, and AI agents across Africa.
          </p>
          <p className="text-white/30 text-sm mb-12 max-w-xl mx-auto leading-relaxed">
            One RALD account becomes your developer profile. One API key unlocks the entire ecosystem.
            Developers build once. Integrate everywhere.
          </p>

          <WaitlistForm />
        </section>

        {/* ── STATS ── */}
        <section
          className="relative py-16 px-6 md:px-12"
          style={{ borderTop: `1px solid ${ACCENT}15`, borderBottom: `1px solid ${ACCENT}15` }}
        >
          <div className="relative max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-0 gap-y-6">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center">
                <StatBadge value={s.value} label={s.label} accentColor={ACCENT} />
                {i < STATS.length - 1 && (
                  <div className="hidden sm:block h-10 w-px mx-2" style={{ background: `${ACCENT}20` }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── API KEY TYPES ── */}
        <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              <span className="text-white">The </span>
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Key System.
              </span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto">
              Four key types. Every access pattern covered.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEY_TYPES.map((k) => (
              <div
                key={k.type}
                className="relative p-6 rounded-2xl border transition-all duration-300 group overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${k.color}40`; e.currentTarget.style.background = `${k.color}06`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(to right, ${k.color}, transparent)` }}
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{ background: `${k.color}15`, color: k.color, border: `1px solid ${k.color}30` }}
                  >
                    <Key className="h-3 w-3" />
                    {k.type}
                  </div>
                  <code className="text-xs text-white/30 font-mono">{k.prefix}•••</code>
                </div>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">{k.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {k.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${k.color}10`, color: `${k.color}cc`, border: `1px solid ${k.color}20` }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          className="py-24 px-6 md:px-12 max-w-5xl mx-auto"
          style={{ borderTop: `1px solid ${ACCENT}10` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              <span className="text-white">Everything you need </span>
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                to build.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} accentColor={ACCENT} />
            ))}
          </div>
        </section>

        {/* ── TRUST LEVELS ── */}
        <section
          className="py-24 px-6 md:px-12 max-w-5xl mx-auto"
          style={{ borderTop: `1px solid ${ACCENT}10` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Trust Levels.
              </span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto">
              Trust determines rate limits, product access, advanced APIs, and production approval.
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { level: 1, name: "Personal Developer", perks: "Basic rate limits · Core identity APIs · Development access" },
              { level: 2, name: "Verified Developer", perks: "Higher limits · Email verified · Product API access" },
              { level: 3, name: "Verified Organization", perks: "Team access · Business APIs · Workspace isolation" },
              { level: 4, name: "Strategic Partner", perks: "Advanced APIs · Priority support · Custom limits" },
              { level: 5, name: "RALD Certified Partner", perks: "Full ecosystem access · SLA · White-label options" },
            ].map((t) => {
              const pct = (t.level / 5) * 100;
              return (
                <div
                  key={t.level}
                  className="flex items-center gap-4 p-4 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                    style={{ background: `${ACCENT}${Math.round(pct * 0.4).toString(16).padStart(2, "0")}`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
                  >
                    {t.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-white mb-0.5">{t.name}</div>
                    <div className="text-xs text-white/35 truncate">{t.perks}</div>
                  </div>
                  <div className="w-20 h-1.5 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GRADIENT }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CLOSED BETA NOTICE ── */}
        <section className="relative py-24 px-6 md:px-12 text-center max-w-3xl mx-auto">
          <GradientBlob color={GLOW} className="w-[600px] h-[600px] -bottom-40 left-1/2 -translate-x-1/2" />
          <div
            className="relative inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-sm font-semibold"
            style={{ borderColor: `${ACCENT}40`, color: ACCENT, background: `${ACCENT}10` }}
          >
            <Shield className="h-4 w-4" />
            Closed Beta Rules
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12 text-left">
            {[
              "Invite-only",
              "Admin approval",
              "Manual provisioning",
              "No public registrations",
              "No production financial APIs",
              "No unrestricted AI APIs",
            ].map((rule) => (
              <div
                key={rule}
                className="flex items-center gap-2 text-xs text-white/50 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: ACCENT }}>→</span>
                {rule}
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Ready to build?
            </span>
          </h2>
          <p className="text-white/35 text-sm mb-10">
            Apply for the developer closed beta. We review every application manually.
          </p>
          <WaitlistForm />
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-8 px-6 md:px-12" style={{ borderTop: `1px solid ${ACCENT}20` }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <span className="font-black text-base">
              <span className="text-white/70">RALD</span>
              <span style={{ color: ACCENT }}>.cloud</span>
            </span>
            <span>© 2026 RALD.cloud · Developer Platform · Pan-African Infrastructure</span>
            <span style={{ color: ACCENT }}>LILCKY STUDIO LIMITED</span>
          </div>
        </footer>
      </div>
    </>
  );
}
