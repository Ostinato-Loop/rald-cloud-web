import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Menu, X, CreditCard, Zap, Globe, Code2,
  Shield, CheckCircle, TrendingUp, ExternalLink, ChevronDown, Repeat2,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   PayRald — Move money at the speed of Africa
   Cinematic product landing page
   ══════════════════════════════════════════════════════════════ */

const ACCENT = "#0066FF";
const ACCENT2 = "#FF2E2E";
const BG = "#03070F";
const SURFACE = "#050C1A";

/* ── Capabilities ─────────────────────────────────────────── */
const CAPABILITIES = [
  { icon: CreditCard, title: "Universal Wallets",       color: ACCENT,   desc: "Personal, merchant, school and enterprise wallets — all RALD ALIA-verified at creation." },
  { icon: Zap,        title: "Instant Transfers",       color: "#00E5FF", desc: "Real-time transfers across RALD users. Settle in milliseconds, not hours. Works offline-first." },
  { icon: Globe,      title: "Multi-Currency",          color: "#00FF88", desc: "NGN, KES, GHS, ZAR and 12 more African currencies. FX at real-time mid-market rates." },
  { icon: Shield,     title: "Fraud Intelligence",      color: "#FFD400", desc: "ML-powered fraud scoring on every transaction, backed by RALD ALIA trust signals." },
  { icon: TrendingUp, title: "Merchant Analytics",      color: "#A855F7", desc: "Real-time revenue dashboards, cohort analysis and payout scheduling." },
  { icon: Code2,      title: "Programmable Payments",   color: "#FF7A00", desc: "Webhooks, virtual accounts, split payments and escrow — via a single unified API." },
];

/* ── Transfer steps ───────────────────────────────────────── */
const TRANSFER_STEPS = [
  { label: "Enter amount",       icon: "✏️",  detail: "NGN, KES, GHS or 12 more African currencies" },
  { label: "Scan QR / enter alias", icon: "📱", detail: "Resolves via RALD ALIA alias network" },
  { label: "Biometric confirm",  icon: "👁",  detail: "Face / fingerprint via ALIA trust layer" },
  { label: "Settled instantly",  icon: "⚡",  detail: "Real-time settlement across RALD network" },
];

/* ── API endpoints ────────────────────────────────────────── */
const ENDPOINTS = [
  { method: "POST", path: "/v1/wallet/create",          desc: "Create a wallet" },
  { method: "POST", path: "/v1/transfer/initiate",      desc: "Send money instantly" },
  { method: "GET",  path: "/v1/wallet/balance/:id",     desc: "Get wallet balance" },
  { method: "POST", path: "/v1/payment/qr",             desc: "Generate payment QR" },
  { method: "GET",  path: "/v1/transaction/:id",        desc: "Get transaction status" },
  { method: "POST", path: "/v1/merchant/payout",        desc: "Trigger merchant payout" },
];

/* ── Transaction simulator ────────────────────────────────── */
const TRANSACTIONS = [
  { from: "@chidi.rald",   to: "@market.rald",  amount: "₦ 4,500",   label: "Market Payment",   time: "just now",  color: ACCENT },
  { from: "@school.rald",  to: "@teacher.rald", amount: "₦ 95,000",  label: "Salary Payout",    time: "2 min ago", color: "#00FF88" },
  { from: "@amara.rald",   to: "@baba.rald",    amount: "KES 1,200", label: "Family Transfer",  time: "3 min ago", color: "#FFD400" },
  { from: "@shop.rald",    to: "@supplier.rald",amount: "₦ 320,000", label: "B2B Settlement",   time: "5 min ago", color: "#A855F7" },
];

/* ── Bar icon SVG (PayRald brand) ─────────────────────────── */
function PayRaldOrb({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="pr-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
        <filter id="pr-glow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {[55, 70, 85].map((r, i) => (
        <circle key={r} cx="110" cy="110" r={r} fill="none"
          stroke={ACCENT} strokeWidth="0.6"
          strokeOpacity={active ? 0.25 - i * 0.06 : 0.08}
          style={{ transition: "stroke-opacity 0.8s" }}
        />
      ))}

      <circle cx="110" cy="110" r="75" fill="none"
        stroke={ACCENT} strokeWidth="1.2" strokeDasharray="10 18" strokeOpacity="0.35"
        style={{ transformOrigin: "110px 110px", animation: active ? "spin-orb 10s linear infinite" : "none" }}
      />

      {active && (
        <circle cx="185" cy="110" r="4" fill={ACCENT} filter="url(#pr-glow)"
          style={{ transformOrigin: "110px 110px", animation: "spin-orb 10s linear infinite" }}
        />
      )}

      <circle cx="110" cy="110" r="52" fill="url(#pr-grad)" />
      <circle cx="110" cy="110" r="52" fill="none" stroke={ACCENT} strokeWidth="1.5"
        strokeOpacity={active ? 0.7 : 0.2}
        style={{ transition: "stroke-opacity 0.8s" }}
      />

      {/* Three bars — PayRald icon */}
      {[
        { x: 86,  color: ACCENT2,    h: 44 },
        { x: 103, color: "#1A3A6E",  h: 56 },
        { x: 120, color: "#C17A00",  h: 38 },
      ].map((bar) => (
        <rect key={bar.x}
          x={bar.x} y={110 - bar.h / 2} width="12" rx="6" height={bar.h}
          fill={bar.color}
          fillOpacity={active ? 0.9 : 0.4}
          style={{ transition: "fill-opacity 0.8s" }}
          filter="url(#pr-glow)"
        />
      ))}

      {/* Connecting arc */}
      {active && (
        <path
          d="M 88 92 Q 109 82 128 96"
          fill="none" stroke="#1A3A6E" strokeWidth="2.5"
          strokeLinecap="round" strokeOpacity="0.7"
        />
      )}
    </svg>
  );
}

/* ── Live transaction feed ────────────────────────────────── */
function TransactionFeed({ visible }: { visible: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setIdx(i => (i + 1) % TRANSACTIONS.length), 2200);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <div className="space-y-2">
      {TRANSACTIONS.map((tx, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500"
          style={{
            background: i === idx && visible ? `${tx.color}08` : "rgba(255,255,255,0.02)",
            border: `1px solid ${i === idx && visible ? tx.color + "30" : "rgba(255,255,255,0.04)"}`,
            transform: i === idx && visible ? "translateX(2px)" : "translateX(0)",
          }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0"
            style={{ background: `${tx.color}15`, border: `1px solid ${tx.color}30` }}>
            <Repeat2 className="w-3.5 h-3.5" style={{ color: tx.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-white/70 font-mono truncate">{tx.from} → {tx.to}</div>
            <div className="text-xs text-white/35">{tx.label}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-sm font-black" style={{ color: tx.color }}>{tx.amount}</div>
            <div className="text-xs text-white/25 font-mono">{tx.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function PayRaldPage() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [orbActive, setOrbActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [feedVisible, setFeedVisible] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  /* Dynamic favicon */
  useEffect(() => {
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]');
    const prev = links[0]?.href || "";
    links.forEach(l => { l.href = "/payrald-icon.png"; });
    return () => { links.forEach(l => { l.href = prev; }); };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setOrbActive(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % TRANSFER_STEPS.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFeedVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh" }}>
      <style>{`
        @keyframes spin-orb {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pr-gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        .pr-gradient {
          background: linear-gradient(135deg, #0066FF 0%, #0044CC 45%, #FF2E2E 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          background-size: 200% 200%; animation: pr-gradient 6s ease infinite;
        }
        .glass {
          background: rgba(0,102,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,102,255,0.08);
        }
        .glass:hover { border-color: rgba(0,102,255,0.18); background: rgba(0,102,255,0.06); }
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
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)" }} />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {[
            { label: "Ecosystem", href: "/#ecosystem" },
            { label: "Products",  href: "/products" },
            { label: "Developers",href: "/developers" },
          ].map(l => (
            <Link key={l.label} href={l.href}
              className="transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
            >
              {l.label}
            </Link>
          ))}
          <a href="https://app.rald.cloud"
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{ background: ACCENT, color: "#fff" }}
          >
            Open PayRald
          </a>
        </div>

        <button className="md:hidden p-2" style={{ color: ACCENT }} onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {navOpen && (
          <div className="absolute top-16 left-0 right-0 p-4 md:hidden"
            style={{ background: `${BG}F5`, borderBottom: `1px solid ${ACCENT}20` }}>
            {["Ecosystem", "Products", "Developers"].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`}
                className="block py-3 text-sm border-b"
                style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.05)" }}
                onClick={() => setNavOpen(false)}>{l}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${ACCENT}05 1px, transparent 1px),
              linear-gradient(90deg, ${ACCENT}05 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute pointer-events-none"
          style={{
            top: "50%", left: "52%", width: 680, height: 680,
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle, ${ACCENT}09 0%, transparent 65%)`,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{ animation: "slide-up 0.8s ease forwards" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, color: ACCENT }}>
              <span className="w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT, animation: "pulse-dot 2s ease-in-out infinite" }} />
              Financial Layer · RALD OS
            </div>

            {/* Real PayRald logo in hero */}
            <div className="mb-6">
              <img
                src="/payrald-wordmark.png"
                alt="PayRald"
                style={{ height: 44, width: "auto", maxWidth: 260, objectFit: "contain" }}
              />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Move money</span>
              <span className="block text-white">at the speed</span>
              <span className="pr-gradient block">of Africa.</span>
            </h1>

            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Wallets, transfers, merchant payments and settlement infrastructure
              — built for African bandwidth, currencies and people.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://app.rald.cloud"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 30px ${ACCENT}40` }}>
                Open Wallet <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/developers"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                <Code2 className="w-4 h-4" /> API Docs
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center"
            style={{ height: 340, animation: "float-y 6s ease-in-out infinite" }}>
            <div style={{ width: 300, height: 300 }}>
              <PayRaldOrb active={orbActive} />
            </div>
          </div>
        </div>

        <a href="#flow" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: SURFACE, borderTop: `1px solid ${ACCENT}10` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "<500ms", label: "Transfer time",      sub: "on RALD network" },
            { value: "15+",    label: "African currencies", sub: "NGN, KES, GHS & more" },
            { value: "99.97%", label: "Uptime SLA",         sub: "enterprise grade" },
            { value: "0.5%",   label: "Transaction fee",    sub: "flat, no hidden cost" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black mb-1" style={{ color: ACCENT }}>{s.value}</div>
              <div className="text-sm font-bold text-white">{s.label}</div>
              <div className="text-xs text-white/35 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRANSFER FLOW ────────────────────────────────── */}
      <section id="flow" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>HOW IT WORKS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Money moves in 4 steps</h2>
            <p className="text-white/40 mt-3 text-sm max-w-md mx-auto">Send to any @alias on the RALD network. Real-time settlement every time.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {TRANSFER_STEPS.map((step, i) => (
              <div key={i} onClick={() => setActiveStep(i)}
                className="relative glass rounded-2xl p-6 cursor-pointer transition-all duration-400"
                style={{
                  borderColor: activeStep === i ? `${ACCENT}50` : `${ACCENT}08`,
                  background: activeStep === i ? `${ACCENT}06` : "rgba(0,102,255,0.01)",
                  boxShadow: activeStep === i ? `0 0 30px ${ACCENT}10` : "none",
                  transform: activeStep === i ? "translateY(-2px)" : "translateY(0)",
                }}>
                {i < TRANSFER_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-2 w-4 h-px z-10"
                    style={{ background: activeStep > i ? ACCENT : `${ACCENT}25` }} />
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{
                    background: activeStep === i ? `${ACCENT}15` : `${ACCENT}05`,
                    border: `1px solid ${activeStep === i ? ACCENT + "40" : ACCENT + "10"}`,
                  }}>
                  {step.icon}
                </div>
                <div className="font-mono text-xs mb-1.5" style={{ color: `${ACCENT}60` }}>Step {i + 1}</div>
                <div className="font-bold text-white text-sm mb-2">{step.label}</div>
                <div className="text-xs leading-relaxed transition-colors"
                  style={{ color: activeStep === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}>
                  {step.detail}
                </div>
                {activeStep === i && (
                  <div className="mt-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: ACCENT, animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TRANSACTION FEED ────────────────────────── */}
      <section className="py-28 px-6" style={{ background: SURFACE }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>LIVE NETWORK</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                Money moving across Africa — right now
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Every transaction is ALIA-verified, fraud-scored and settled instantly.
                No waiting, no batching, no excuses.
              </p>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: "#00FF88", animation: "pulse-dot 2s ease-in-out infinite" }} />
                <div>
                  <div className="text-sm font-bold text-white">Live settlement</div>
                  <div className="text-xs text-white/40">Transactions settle across the network in real-time</div>
                </div>
              </div>
            </div>
            <div ref={feedRef}>
              <TransactionFeed visible={feedVisible} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{ color: ACCENT }}>CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">The full payments stack</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPABILITIES.map(cap => (
              <div key={cap.title}
                className="glass rounded-2xl p-7 transition-all duration-300 group hover:scale-[1.02]"
                style={{ borderColor: `${cap.color}10` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                  style={{ background: `${cap.color}10`, border: `1px solid ${cap.color}25` }}>
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
                Payments in 3 lines of code
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Unified REST API with real-time webhooks. React, React Native and Node.js SDKs.
                Sandbox mode for testing before going live.
              </p>
              <div className="rounded-xl p-4 mb-6 font-mono text-xs leading-relaxed"
                style={{ background: "#000", border: `1px solid ${ACCENT}20` }}>
                <div className="text-white/30 mb-2">// Send money to any RALD alias</div>
                <div><span style={{ color: "#C084FC" }}>import</span> <span className="text-white">{`{ payrald }`}</span> <span style={{ color: "#C084FC" }}>from</span> <span style={{ color: "#00FF88" }}>'@rald/sdk'</span></div>
                <div className="mt-2">
                  <span style={{ color: "#C084FC" }}>const</span>{" "}
                  <span className="text-white">tx</span>{" "}
                  <span style={{ color: ACCENT }}>=</span>{" "}
                  <span style={{ color: "#C084FC" }}>await</span>{" "}
                  <span className="text-white">payrald</span>
                  <span style={{ color: ACCENT }}>.</span>
                  <span style={{ color: "#FFD400" }}>transfer</span>
                  <span className="text-white">{"({"}</span>
                </div>
                <div className="pl-4"><span style={{ color: ACCENT }}>to</span><span className="text-white">: </span><span style={{ color: "#00FF88" }}>'@amara.rald'</span><span className="text-white">,</span></div>
                <div className="pl-4"><span style={{ color: ACCENT }}>amount</span><span className="text-white">: </span><span style={{ color: "#FFD400" }}>4500</span><span className="text-white">,</span></div>
                <div className="pl-4"><span style={{ color: ACCENT }}>currency</span><span className="text-white">: </span><span style={{ color: "#00FF88" }}>'NGN'</span></div>
                <div><span className="text-white">{"});"}</span></div>
                <div className="mt-2 text-white/30">{"// → { id: 'txn_...', status: 'settled', ms: 312 }"}</div>
              </div>
              <div className="flex gap-4">
                <Link href="/developers"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: ACCENT, color: "#fff" }}>
                  API Docs <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://console.rald.cloud" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/5 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}>
                  Console <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-2">
              {ENDPOINTS.map(ep => (
                <div key={ep.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass transition-all hover:scale-[1.01]"
                  style={{ borderColor: `${ACCENT}10` }}>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded w-12 text-center flex-shrink-0"
                    style={{
                      background: ep.method === "GET" ? "rgba(0,255,136,0.1)" : `${ACCENT}12`,
                      color: ep.method === "GET" ? "#00FF88" : ACCENT,
                    }}>
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

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-28 px-6 text-center"
        style={{ background: BG, borderTop: `1px solid ${ACCENT}10` }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <img src="/payrald-wordmark.png" alt="PayRald"
              style={{ height: 50, width: "auto", maxWidth: 280, objectFit: "contain" }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
            Money should move as fast<br />as a conversation.
          </h2>
          <p className="text-white/45 text-lg mb-10">
            Open your PayRald wallet. Start sending in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.rald.cloud"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 30px ${ACCENT}35` }}>
              Open Wallet <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/developers"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}>
              <Code2 className="w-4 h-4" /> Developer Docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="py-10 px-6"
        style={{ background: "#010508", borderTop: `1px solid rgba(255,255,255,0.04)` }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <img src="/rald-wordmark.png" alt="RALD"
              style={{ height: 20, width: "auto", filter: "brightness(0) invert(1)" }} />
          </div>
          <div className="flex gap-6 text-xs text-white/25">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-white/60 transition-colors">Products</Link>
            <Link href="/alia" className="hover:text-white/60 transition-colors">RALD ALIA</Link>
            <Link href="/developers" className="hover:text-white/60 transition-colors">Developers</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
          </div>
          <div className="text-xs text-white/20">© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
