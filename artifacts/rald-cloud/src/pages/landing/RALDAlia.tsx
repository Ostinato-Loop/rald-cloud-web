import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, Shield, CheckCircle, Fingerprint, Globe, Code2, ExternalLink, ChevronDown, Zap } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   RALD ALIA — Digital Identity & Trust for Africa
   Cinematic product landing page
   ══════════════════════════════════════════════════════════════ */

const ACCENT = "#00E5FF";
const ACCENT_DIM = "#00BFDF";
const BG = "#020C10";
const SURFACE = "#050F15";

/* ── Identity creation steps ──────────────────────────────── */
const CREATION_STEPS = [
  { id: 1, label: "Phone number verified",  icon: "📱", detail: "SMS OTP via 12 African carriers" },
  { id: 2, label: "BVN / NIN linked",        icon: "🪪", detail: "Real-time NIBSS lookup < 2s" },
  { id: 3, label: "Face match passed",       icon: "🤳", detail: "ML liveness detection, 99.1% accuracy" },
  { id: 4, label: "RALD ALIA created",       icon: "✨", detail: "Unique alias assigned across ecosystem" },
];

/* ── Trust score components ───────────────────────────────── */
const TRUST_FACTORS = [
  { label: "Phone Ownership",   score: 98, color: ACCENT },
  { label: "Gov ID Verified",   score: 95, color: "#00FF88" },
  { label: "Face Match",        score: 99, color: "#A855F7" },
  { label: "Device History",    score: 87, color: "#FFD400" },
  { label: "Activity Pattern",  score: 92, color: "#FF4FAD" },
];

/* ── Capabilities ─────────────────────────────────────────── */
const CAPABILITIES = [
  {
    icon: Fingerprint,
    title: "Sovereign Identity",
    desc: "One RALD ALIA covers every product in the ecosystem. Loop, PayRald, Messenger, Elimu — one identity, one trust score.",
    color: ACCENT,
  },
  {
    icon: Shield,
    title: "BVN + NIN Verification",
    desc: "Real-time lookup via NIBSS. Sub-2 second verification. Works on 2G. NDPC compliant data handling.",
    color: "#00FF88",
  },
  {
    icon: CheckCircle,
    title: "ML Face Match",
    desc: "Selfie-to-BVN photo comparison with ML-powered liveness detection. Zero passive bypass.",
    color: "#A855F7",
  },
  {
    icon: Globe,
    title: "Alias Resolution",
    desc: "Every ALIA gets a unique alias (e.g. @chidi.rald). Resolves to payments, messages, profiles across the network.",
    color: "#FFD400",
  },
  {
    icon: Zap,
    title: "Fraud Intelligence",
    desc: "Device fingerprinting, velocity checks and real-time risk scoring on every auth attempt.",
    color: "#FF4FAD",
  },
  {
    icon: Code2,
    title: "Developer API",
    desc: "REST + WebSocket. SDKs for React, React Native and Next.js. Verify any user in 3 lines of code.",
    color: "#FF7A00",
  },
];

/* ── API endpoints ────────────────────────────────────────── */
const API_ENDPOINTS = [
  { method: "POST", path: "/v1/alia/create",        desc: "Create a new RALD ALIA" },
  { method: "POST", path: "/v1/alia/verify/bvn",    desc: "Verify BVN via NIBSS" },
  { method: "POST", path: "/v1/alia/verify/face",   desc: "Face match + liveness check" },
  { method: "GET",  path: "/v1/alia/resolve/:alias",desc: "Resolve @alias to identity" },
  { method: "GET",  path: "/v1/alia/trust/:id",     desc: "Get trust score breakdown" },
  { method: "POST", path: "/v1/alia/otp/send",      desc: "Send OTP (SMS / Email / WhatsApp)" },
];

/* ── Use cases ────────────────────────────────────────────── */
const USE_CASES = [
  { label: "Fintech",      icon: "💳", desc: "KYC at onboarding. Fraud prevention on every transaction." },
  { label: "E-commerce",   icon: "🛍", desc: "Trust score replaces manual document uploads." },
  { label: "Education",    icon: "🏫", desc: "Student, teacher and parent identities for RALD Elimu." },
  { label: "Government",   icon: "🏛", desc: "Digital citizen ID layer. Verification for public services." },
  { label: "Healthcare",   icon: "🏥", desc: "Patient identity across clinics. Zero duplicate records." },
  { label: "Logistics",    icon: "🚚", desc: "Verified rider and merchant identities for Loop Dispatch." },
];

/* ── SVG Shield Orb ───────────────────────────────────────── */
function IdentityOrb({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="orb-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.25" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
        <filter id="orb-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer pulse rings */}
      {[60, 75, 90].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke={ACCENT}
          strokeWidth="0.5"
          strokeOpacity={active ? 0.3 - i * 0.08 : 0.1}
          style={{ transition: "stroke-opacity 0.8s ease" }}
        />
      ))}

      {/* Rotating orbit */}
      <circle
        cx="100" cy="100" r="70"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1"
        strokeDasharray="8 16"
        strokeOpacity="0.4"
        style={{ transformOrigin: "100px 100px", animation: active ? "spin-orbit 8s linear infinite" : "none" }}
      />

      {/* Orbit dot */}
      {active && (
        <circle
          cx="170" cy="100" r="4"
          fill={ACCENT}
          filter="url(#orb-glow)"
          style={{ transformOrigin: "100px 100px", animation: "spin-orbit 8s linear infinite" }}
        />
      )}

      {/* Core */}
      <circle cx="100" cy="100" r="48" fill="url(#orb-grad)" />
      <circle
        cx="100" cy="100" r="48"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeOpacity={active ? 0.8 : 0.3}
        style={{ transition: "stroke-opacity 0.8s ease" }}
      />

      {/* Shield icon */}
      <path
        d="M100 64 L124 74 L124 96 Q124 116 100 126 Q76 116 76 96 L76 74 Z"
        fill={ACCENT}
        fillOpacity={active ? 0.2 : 0.05}
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeOpacity={active ? 0.9 : 0.3}
        style={{ transition: "all 0.8s ease" }}
      />
      {/* Check mark inside shield */}
      {active && (
        <path
          d="M91 95 L97 101 L111 87"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />
      )}
    </svg>
  );
}

/* ── Circular trust gauge ─────────────────────────────────── */
function TrustGauge({ score, animate }: { score: number; animate: boolean }) {
  const [displayScore, setDisplayScore] = useState(0);
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const progress = (displayScore / 100) * circumference;

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const end = score;
    const duration = 1800;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(ease * end));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, score]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="80" cy="80" r={r} fill="none" stroke={`${ACCENT}15`} strokeWidth="8" />
        <circle
          cx="80" cy="80" r={r}
          fill="none"
          stroke={ACCENT}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.05s linear", filter: `drop-shadow(0 0 8px ${ACCENT}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-black tabular-nums" style={{ color: ACCENT }}>{displayScore}</div>
        <div className="text-xs text-white/50 font-mono mt-0.5">TRUST</div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function RALDAlia() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [orbActive, setOrbActive] = useState(false);
  const [trustVisible, setTrustVisible] = useState(false);
  const [aliasResolved, setAliasResolved] = useState(false);
  const [aliasInput, setAliasInput] = useState("");
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState<string | null>(null);

  /* Swap favicon to ALIA icon on this page */
  useEffect(() => {
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]');
    const prev = links[0]?.href ?? "";
    links.forEach(l => { l.href = "/alia-icon.png"; });
    return () => { links.forEach(l => { l.href = prev; }); };
  }, []);

  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOrbActive(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = trustRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTrustVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-advance steps */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % CREATION_STEPS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleResolveAlias = () => {
    if (!aliasInput.trim()) return;
    setResolving(true);
    setResolved(null);
    setTimeout(() => {
      setResolving(false);
      setResolved(`@${aliasInput.replace("@", "").toLowerCase()}.rald`);
    }, 1400);
  };

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh" }}>
      <style>{`
        @keyframes spin-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes gradient-flow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan-pulse {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .alia-gradient {
          background: linear-gradient(135deg, #00E5FF 0%, #00BFDF 50%, #0066FF 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          background-size: 200% 200%; animation: gradient-flow 6s ease infinite;
        }
        .glass {
          background: rgba(0,229,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,229,255,0.08);
        }
        .glass:hover { border-color: rgba(0,229,255,0.18); background: rgba(0,229,255,0.05); }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300"
        style={{
          background: scrolled ? `${BG}E6` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${ACCENT}15` : "1px solid transparent",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 24, width: "auto", filter: "brightness(0) invert(1)" }} />
          <span className="text-sm font-black" style={{ color: ACCENT }}>.cloud</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {[
            { label: "Ecosystem", href: "/#ecosystem" },
            { label: "Products",  href: "/products" },
            { label: "Developers",href: "/developers" },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              className="transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://app.rald.cloud"
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{ background: ACCENT, color: "#000" }}
          >
            Get ALIA
          </a>
        </div>

        <button className="md:hidden p-2" style={{ color: ACCENT }} onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {navOpen && (
          <div
            className="absolute top-16 left-0 right-0 p-4 md:hidden"
            style={{ background: `${BG}F5`, borderBottom: `1px solid ${ACCENT}20` }}
          >
            {["Ecosystem", "Products", "Developers"].map(l => (
              <Link
                key={l}
                href={`/${l.toLowerCase()}`}
                className="block py-3 text-sm border-b"
                style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.05)" }}
                onClick={() => setNavOpen(false)}
              >
                {l}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${ACCENT}06 1px, transparent 1px),
              linear-gradient(90deg, ${ACCENT}06 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "55%",
            width: 700, height: 700,
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle, ${ACCENT}0A 0%, transparent 65%)`,
          }}
        />
        {/* Scan line */}
        <div
          className="absolute inset-x-0 h-px pointer-events-none"
          style={{
            top: "60%",
            background: `linear-gradient(90deg, transparent 0%, ${ACCENT}30 50%, transparent 100%)`,
            animation: "scan-pulse 6s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{ animation: "slide-up 0.8s ease forwards" }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, color: ACCENT }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, animation: "pulse-glow 2s ease-in-out infinite" }} />
              Identity Layer · RALD OS
            </div>

            {/* Real ALIA logo */}
            <div className="mb-7">
              <img
                src="/alia-wordmark.png"
                alt="RALD ALIA"
                style={{ height: 42, width: "auto", maxWidth: 260, objectFit: "contain" }}
              />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Digital identity</span>
              <span className="block text-white">and trust</span>
              <span className="alia-gradient block">for Africa.</span>
            </h1>

            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Every African deserves a trusted digital identity.
              RALD ALIA is one sovereign identity that works across
              payments, communication, education and every RALD surface.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://app.rald.cloud"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: ACCENT, color: "#000", boxShadow: `0 0 30px ${ACCENT}40` }}
              >
                Create your ALIA
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/developers"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
              >
                <Code2 className="w-4 h-4" />
                API Docs
              </Link>
            </div>
          </div>

          {/* Identity Orb */}
          <div
            className="flex items-center justify-center"
            style={{ height: 340, animation: "float-y 6s ease-in-out infinite" }}
          >
            <div style={{ width: 300, height: 300 }}>
              <IdentityOrb active={orbActive} />
            </div>
          </div>
        </div>

        <a href="#create" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* ── IDENTITY CREATION FLOW ───────────────────────── */}
      <section id="create" className="py-28 px-6" style={{ background: `${SURFACE}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>HOW IT WORKS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Identity creation in seconds</h2>
            <p className="text-white/40 mt-3 max-w-md mx-auto text-sm">Four steps. One permanent, verifiable identity across all of RALD.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {CREATION_STEPS.map((step, i) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(i)}
                className="relative glass rounded-2xl p-6 cursor-pointer transition-all duration-400"
                style={{
                  borderColor: activeStep === i ? `${ACCENT}50` : `${ACCENT}08`,
                  background: activeStep === i ? `${ACCENT}06` : "rgba(0,229,255,0.01)",
                  boxShadow: activeStep === i ? `0 0 30px ${ACCENT}10` : "none",
                  transform: activeStep === i ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {/* Step connector */}
                {i < CREATION_STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 -right-2 w-4 h-px z-10"
                    style={{ background: activeStep > i ? ACCENT : `${ACCENT}25` }}
                  />
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{
                    background: activeStep === i ? `${ACCENT}15` : `${ACCENT}05`,
                    border: `1px solid ${activeStep === i ? ACCENT + "40" : ACCENT + "10"}`,
                  }}
                >
                  {step.icon}
                </div>
                <div className="font-mono text-xs mb-1.5" style={{ color: `${ACCENT}60` }}>Step {step.id}</div>
                <div className="font-bold text-white text-sm mb-2">{step.label}</div>
                <div
                  className="text-xs leading-relaxed transition-colors"
                  style={{ color: activeStep === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}
                >
                  {step.detail}
                </div>
                {activeStep === i && (
                  <div className="mt-3">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: ACCENT, animation: "pulse-glow 1.5s ease-in-out infinite" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SCORE ──────────────────────────────────── */}
      <section className="py-28 px-6">
        <div ref={trustRef} className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>TRUST NETWORK</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                A trust score Africa can rely on
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Your RALD ALIA carries a live trust score built from verified identity signals —
                not credit history, not social media. Real verification. Real trust.
              </p>
              <div className="space-y-4">
                {TRUST_FACTORS.map((f) => (
                  <div key={f.label} className="flex items-center gap-4">
                    <div className="text-xs text-white/40 w-32 flex-shrink-0 font-mono">{f.label}</div>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: trustVisible ? `${f.score}%` : "0%",
                          background: `linear-gradient(90deg, ${f.color}80, ${f.color})`,
                          boxShadow: `0 0 8px ${f.color}40`,
                          transitionDelay: "0.2s",
                        }}
                      />
                    </div>
                    <div className="text-xs font-mono w-8 text-right" style={{ color: f.color }}>{f.score}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              <TrustGauge score={95} animate={trustVisible} />
              <div className="glass rounded-2xl p-5 w-full max-w-xs text-center" style={{ borderColor: `${ACCENT}20` }}>
                <div className="text-xs font-mono mb-2" style={{ color: `${ACCENT}70` }}>TRUST RATING</div>
                <div className="text-xl font-black text-white mb-1">Highly Verified</div>
                <div className="text-xs text-white/40">BVN ✓  NIN ✓  Face ✓  Device ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALIAS RESOLUTION ─────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: SURFACE }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>ALIAS RESOLUTION</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Your name across every RALD surface
            </h2>
            <p className="text-white/40 mt-3 text-sm max-w-md mx-auto">
              One @alias resolves to payments, messages, profiles and business identity across the network.
            </p>
          </div>

          {/* Interactive alias resolver */}
          <div
            className="glass rounded-2xl p-8 max-w-xl mx-auto mb-10"
            style={{ borderColor: `${ACCENT}20` }}
          >
            <div className="text-xs font-mono mb-4" style={{ color: `${ACCENT}60` }}>LIVE ALIAS RESOLVER</div>
            <div className="flex gap-3 mb-5">
              <div
                className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-mono"
                style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${ACCENT}20` }}
              >
                <span style={{ color: `${ACCENT}60` }}>@</span>
                <input
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20"
                  placeholder="yourname"
                  value={aliasInput}
                  onChange={e => setAliasInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleResolveAlias()}
                  maxLength={30}
                />
              </div>
              <button
                onClick={handleResolveAlias}
                disabled={resolving || !aliasInput.trim()}
                className="px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-40"
                style={{ background: ACCENT, color: "#000" }}
              >
                {resolving ? "..." : "Resolve"}
              </button>
            </div>

            {resolved && (
              <div
                className="rounded-xl p-4 text-sm"
                style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}25`, animation: "slide-up 0.3s ease" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold" style={{ color: ACCENT }}>{resolved}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#00FF8820", color: "#00FF88" }}>✓ Verified</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
                  {[
                    { k: "Payments", v: `${resolved} → PayRald wallet` },
                    { k: "Messaging", v: `${resolved} → Loop Messenger` },
                    { k: "Profile",  v: `${resolved} → Loop social` },
                    { k: "Business", v: `${resolved} → Loop Business` },
                  ].map(item => (
                    <div key={item.k} className="glass rounded-lg px-3 py-2" style={{ borderColor: `${ACCENT}10` }}>
                      <div style={{ color: ACCENT }} className="font-mono text-xs mb-0.5">{item.k}</div>
                      <div className="text-white/30 text-xs leading-tight">{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
            {[
              { label: "Payments",  icon: "💳", color: "#0066FF" },
              { label: "Messages",  icon: "💬", color: "#FF7A00" },
              { label: "Profiles",  icon: "👤", color: ACCENT },
            ].map(item => (
              <div key={item.label} className="glass rounded-xl p-4" style={{ borderColor: `${item.color}15` }}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs font-medium" style={{ color: item.color }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Everything identity requires</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="glass rounded-2xl p-7 transition-all duration-300 group hover:scale-[1.02]"
                style={{ borderColor: `${cap.color}10` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                  style={{ background: `${cap.color}10`, border: `1px solid ${cap.color}25` }}
                >
                  <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
                </div>
                <h3 className="font-black text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPER API ────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: SURFACE }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>DEVELOPER API</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                Verify any user in 3 lines of code
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                REST API, webhooks and SDK. React, React Native and Next.js packages.
                Built for Africa, works on 2G.
              </p>

              <div
                className="rounded-xl p-4 mb-6 font-mono text-xs leading-relaxed"
                style={{ background: "#000", border: `1px solid ${ACCENT}20` }}
              >
                <div className="text-white/30 mb-2">// Verify identity in seconds</div>
                <div><span style={{ color: "#C084FC" }}>import</span> <span className="text-white">{`{ alia }`}</span> <span style={{ color: "#C084FC" }}>from</span> <span style={{ color: "#00FF88" }}>'@rald/sdk'</span></div>
                <div className="mt-2">
                  <span style={{ color: "#C084FC" }}>const</span>{" "}
                  <span className="text-white">result</span>{" "}
                  <span style={{ color: ACCENT }}>=</span>{" "}
                  <span style={{ color: "#C084FC" }}>await</span>{" "}
                  <span className="text-white">alia</span>
                  <span style={{ color: ACCENT }}>.</span>
                  <span style={{ color: "#FFD400" }}>verify</span>
                  <span className="text-white">{"({"}</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: ACCENT }}>bvn</span>
                  <span className="text-white">: </span>
                  <span style={{ color: "#00FF88" }}>'22312345678'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: ACCENT }}>selfie</span>
                  <span className="text-white">: imageBlob</span>
                </div>
                <div><span className="text-white">{"});"}</span></div>
                <div className="mt-2 text-white/30">{"// → { verified: true, trustScore: 95, alias: '@chidi.rald' }"}</div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/developers"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: ACCENT, color: "#000" }}
                >
                  Full API Docs
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://console.rald.cloud"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/5 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                  target="_blank" rel="noreferrer"
                >
                  RALD Console <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-2">
              {API_ENDPOINTS.map(ep => (
                <div
                  key={ep.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass transition-all hover:scale-[1.01]"
                  style={{ borderColor: `${ACCENT}10` }}
                >
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded w-12 text-center flex-shrink-0"
                    style={{
                      background: ep.method === "GET" ? "rgba(0,255,136,0.1)" : `${ACCENT}10`,
                      color: ep.method === "GET" ? "#00FF88" : ACCENT,
                    }}
                  >
                    {ep.method}
                  </span>
                  <code className="text-xs font-mono text-white/70 flex-1">{ep.path}</code>
                  <span className="text-xs text-white/25 hidden md:block">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>USE CASES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Built for every African sector</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => (
              <div
                key={uc.label}
                className="glass rounded-2xl p-6 transition-all hover:scale-[1.02] duration-300"
                style={{ borderColor: `${ACCENT}08` }}
              >
                <div className="text-2xl mb-3">{uc.icon}</div>
                <div className="font-bold text-white text-sm mb-2">{uc.label}</div>
                <div className="text-xs text-white/40 leading-relaxed">{uc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="py-28 px-6 text-center"
        style={{ background: SURFACE, borderTop: `1px solid ${ACCENT}10` }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-block w-16 h-16 rounded-2xl flex items-center justify-center mb-8 mx-auto"
            style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}25`, boxShadow: `0 0 40px ${ACCENT}20` }}
          >
            <Shield className="w-8 h-8" style={{ color: ACCENT }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
            Every African deserves<br />a trusted digital identity.
          </h2>
          <p className="text-white/45 text-lg mb-10">
            Join the network. Create your RALD ALIA today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.rald.cloud"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              style={{ background: ACCENT, color: "#000", boxShadow: `0 0 30px ${ACCENT}35` }}
            >
              Create your ALIA <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/developers"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
            >
              <Code2 className="w-4 h-4" /> Developer Docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer
        className="py-10 px-6"
        style={{ background: "#010508", borderTop: `1px solid rgba(255,255,255,0.04)` }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <img src="/rald-wordmark.png" alt="RALD" style={{ height: 20, width: "auto", filter: "brightness(0) invert(1)" }} />
            <span className="text-sm font-black" style={{ color: ACCENT }}>.cloud</span>
          </div>
          <div className="flex gap-6 text-xs text-white/25">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-white/60 transition-colors">Products</Link>
            <Link href="/developers" className="hover:text-white/60 transition-colors">Developers</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
          <div className="text-xs text-white/20">© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
