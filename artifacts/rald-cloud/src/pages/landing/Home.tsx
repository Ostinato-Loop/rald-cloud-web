import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import raldWordmark from "/rald-wordmark.png";
import raldIcon from "/rald-icon.png";
import {
  ArrowRight, Menu, X, ChevronDown, Globe,
  Zap, Shield, Code2, Building2, GraduationCap,
  Truck, Mic, Mail, CreditCard, Users,
  ExternalLink, Play, TrendingUp, Lock, Cpu,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   RALD Corporate Homepage — Africa's Digital Operating System
   ───────────────────────────────────────────────────────────── */

const ACCENT = "#FF2E2E";   // RALD neon red as primary
const NAV_LINKS = [
  { label: "Ecosystem",   href: "#ecosystem" },
  { label: "Products",    href: "#products" },
  { label: "Developers",  href: "/developers" },
  { label: "For Business",href: "#business" },
  { label: "Africa First",href: "#africa" },
];

const PRODUCTS = [
  {
    id: "alia",
    name: "RALD ALIA",
    tagline: "Digital identity and trust for Africa.",
    accent: "#00E5FF",
    glow: "rgba(0,229,255,0.25)",
    icon: Shield,
    layer: "Identity Layer",
    demo: [
      { step: "Identity created", icon: "🪪", color: "#00E5FF" },
      { step: "Trust score assigned", icon: "⭐", color: "#FFD400" },
      { step: "Verification complete", icon: "✅", color: "#00FF88" },
      { step: "Alias resolved", icon: "🔗", color: "#00E5FF" },
    ],
    desc: "Universal identity, trust verification and alias resolution — every African deserves a trusted digital identity.",
  },
  {
    id: "payrald",
    name: "PayRald",
    tagline: "Africa's programmable payment layer.",
    accent: "#0066FF",
    glow: "rgba(0,102,255,0.25)",
    icon: CreditCard,
    layer: "Financial Layer",
    demo: [
      { step: "Customer scans QR", icon: "📱", color: "#0066FF" },
      { step: "Transfer settles", icon: "⚡", color: "#FFD400" },
      { step: "Wallet updates", icon: "💳", color: "#00FF88" },
      { step: "Analytics appear", icon: "📊", color: "#0066FF" },
    ],
    desc: "Wallets, payments, merchants, transfers and settlement — money should move as freely as a conversation.",
  },
  {
    id: "loop",
    name: "Loop",
    tagline: "Community and commerce at scale.",
    accent: "#00FF88",
    glow: "rgba(0,255,136,0.25)",
    icon: Users,
    layer: "Product Layer",
    demo: [
      { step: "Community created", icon: "🌍", color: "#00FF88" },
      { step: "Creator goes live", icon: "🎙", color: "#FF7A00" },
      { step: "Commerce enabled", icon: "🛍", color: "#00FF88" },
      { step: "Revenue distributed", icon: "💰", color: "#FFD400" },
    ],
    desc: "African voices, amplified — social audio, community building and commerce in one platform.",
  },
  {
    id: "messenger",
    name: "Loop Messenger",
    tagline: "Communication connected to payments.",
    accent: "#FF7A00",
    glow: "rgba(255,122,0,0.25)",
    icon: Mail,
    layer: "Product Layer",
    demo: [
      { step: "Message sent", icon: "💬", color: "#FF7A00" },
      { step: "Payment bubble", icon: "💸", color: "#FFD400" },
      { step: "File shared", icon: "📎", color: "#FF7A00" },
      { step: "Business support", icon: "🤝", color: "#00FF88" },
    ],
    desc: "Offline-first encrypted messaging with embedded payments — built for African bandwidth realities.",
  },
  {
    id: "elimu",
    name: "RALD Elimu",
    tagline: "Operating system for schools.",
    accent: "#A855F7",
    glow: "rgba(168,85,247,0.25)",
    icon: GraduationCap,
    layer: "Product Layer",
    demo: [
      { step: "Student enrolled", icon: "👨‍🎓", color: "#A855F7" },
      { step: "Attendance tracked", icon: "✅", color: "#00FF88" },
      { step: "Parent notified", icon: "📱", color: "#A855F7" },
      { step: "Fee processed", icon: "💳", color: "#0066FF" },
    ],
    desc: "Student, teacher, parent, school and wallet — world-class school infrastructure for every African school.",
  },
  {
    id: "loopvoice",
    name: "Loop Voice",
    tagline: "Voice Infrastructure for Africa.",
    accent: "#FF4FAD",
    glow: "rgba(255,79,173,0.25)",
    icon: Mic,
    layer: "Infrastructure Layer",
    demo: [
      { step: "Voice licensed once", icon: "🎙", color: "#FF4FAD" },
      { step: "Deployed everywhere", icon: "🌐", color: "#00E5FF" },
      { step: "African languages", icon: "🗣", color: "#FF4FAD" },
      { step: "Enterprise scale", icon: "🏢", color: "#FFD400" },
    ],
    desc: "License once. Deploy everywhere. The trusted voice layer for phones, vehicles, assistants, enterprise systems and public services.",
  },
  {
    id: "dispatch",
    name: "Loop Dispatch",
    tagline: "Last-mile, first class.",
    accent: "#00BFFF",
    glow: "rgba(0,191,255,0.25)",
    icon: Truck,
    layer: "Infrastructure Layer",
    demo: [
      { step: "Order placed", icon: "📦", color: "#00BFFF" },
      { step: "Carrier selected", icon: "🚚", color: "#00BFFF" },
      { step: "Route optimised", icon: "🗺", color: "#FFD400" },
      { step: "Delivered", icon: "✅", color: "#00FF88" },
    ],
    desc: "Smart carrier selection across GIG, Sendbox, Kwik and 7 more Nigerian logistics providers.",
  },
  {
    id: "raldmail",
    name: "RALD Mail",
    tagline: "Email infrastructure integrated with trust and identity.",
    accent: "#FFD400",
    glow: "rgba(255,212,0,0.25)",
    icon: Mail,
    layer: "Infrastructure Layer",
    demo: [
      { step: "Business inbox", icon: "📧", color: "#FFD400" },
      { step: "Identity verified", icon: "🔐", color: "#00E5FF" },
      { step: "Merchant notified", icon: "🔔", color: "#FFD400" },
      { step: "Communications unified", icon: "🔗", color: "#00FF88" },
    ],
    desc: "Business inbox, identity verification and unified communications — the trusted email layer for African enterprises.",
  },
];

const LAYERS = [
  {
    num: "01",
    name: "Identity",
    product: "RALD ALIA",
    accent: "#00E5FF",
    items: ["Universal identity", "Trust scoring", "Authentication", "Verification"],
    icon: Shield,
  },
  {
    num: "02",
    name: "Transactions",
    product: "PayRald",
    accent: "#0066FF",
    items: ["Wallets", "Payments", "Merchants", "Settlement"],
    icon: CreditCard,
  },
  {
    num: "03",
    name: "Applications",
    product: "Loop · Messenger · Elimu · RALD Mail · Loop Voice",
    accent: "#00FF88",
    items: ["Social audio", "Messaging", "Education", "Voice infra"],
    icon: Zap,
  },
];

const NUMBERS = [
  { value: "95+",  label: "Repositories",    sub: "in the ecosystem",     color: "#00FF88" },
  { value: "7",    label: "Infra Layers",     sub: "from OS to products",  color: "#0066FF" },
  { value: "12+",  label: "African Regions",  sub: "served and expanding", color: "#FF4FAD" },
  { value: "10+",  label: "Payment Providers",sub: "Nigerian gateways",    color: "#FFD400" },
  { value: "54",   label: "Countries",        sub: "future expansion",     color: "#A855F7" },
  { value: "1",    label: "Trust Network",    sub: "connecting everything", color: ACCENT },
];

const BUSINESS_SEGMENTS = [
  { label: "Merchant",   icon: Building2,    color: "#FF7A00", desc: "Accept payments, manage inventory, ship with Loop Dispatch" },
  { label: "School",     icon: GraduationCap,color: "#A855F7", desc: "Full school OS — attendance, fees, comms, analytics" },
  { label: "Enterprise", icon: Building2,    color: "#0066FF", desc: "Identity APIs, voice infra, analytics and full SDK access" },
  { label: "Government", icon: Globe,        color: "#00E5FF", desc: "Sovereign digital services, identity verification, payments" },
  { label: "Developer",  icon: Code2,        color: "#00FF88", desc: "APIs, SDKs, GitRald CI/CD, full developer console" },
  { label: "Creator",    icon: Mic,          color: "#FF4FAD", desc: "Monetise your audience with Loop and Loop Messenger" },
];

const DEV_TOOLS = [
  { name: "Identity APIs",  color: "#00E5FF", code: "POST /v1/alia/verify" },
  { name: "Payment APIs",   color: "#0066FF", code: "POST /v1/pay/transfer" },
  { name: "Voice APIs",     color: "#FF4FAD", code: "POST /v1/voice/call" },
  { name: "Analytics APIs", color: "#FFD400", code: "GET  /v1/raldtics/metrics" },
  { name: "Webhooks",       color: "#00FF88", code: "ws://events.rald.cloud" },
  { name: "GitRald",        color: ACCENT,    code: "push → auto-deploy" },
];

/* ── Animated counter hook ─────────────────────────────────── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Intersection observer hook ────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Ecosystem network canvas ──────────────────────────────── */
function EcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const NODES = [
      { label: "People",    color: "#00E5FF", x: 0.15, y: 0.25 },
      { label: "Business",  color: "#0066FF", x: 0.80, y: 0.20 },
      { label: "Schools",   color: "#A855F7", x: 0.85, y: 0.65 },
      { label: "Payments",  color: "#FFD400", x: 0.50, y: 0.80 },
      { label: "Messages",  color: "#FF7A00", x: 0.12, y: 0.70 },
      { label: "Logistics", color: "#00BFFF", x: 0.70, y: 0.88 },
      { label: "Voice",     color: "#FF4FAD", x: 0.20, y: 0.50 },
      { label: "AI",        color: "#00FF88", x: 0.78, y: 0.44 },
      { label: "RALD",      color: ACCENT,    x: 0.50, y: 0.44 },
    ];

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      const cx = W() / 2, cy = H() / 2;

      // Draw connections
      NODES.forEach((n, i) => {
        if (i === NODES.length - 1) return;
        const center = NODES[NODES.length - 1];
        const x1 = n.x * W(), y1 = n.y * H();
        const x2 = center.x * W(), y2 = center.y * H();
        const pulse = 0.3 + 0.2 * Math.sin(t * 0.02 + i * 0.7);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = n.color + Math.round(pulse * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling dot
        const progress = ((t * 0.005 + i * 0.15) % 1);
        const dx = x1 + (x2 - x1) * progress;
        const dy = y1 + (y2 - y1) * progress;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      // Draw nodes
      NODES.forEach((n, i) => {
        const x = n.x * W(), y = n.y * H();
        const isCenter = i === NODES.length - 1;
        const pulse = 1 + 0.08 * Math.sin(t * 0.04 + i);
        const r = isCenter ? 22 * pulse : 8 * pulse;

        if (isCenter) {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 20;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isCenter ? n.color : n.color + "33";
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isCenter ? 2 : 1;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isCenter ? "#000" : "#fff";
        ctx.font = `${isCenter ? "bold " : ""}${isCenter ? 11 : 9}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, x, isCenter ? y : y + r + 12);
      });

      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

/* ── Africa map (simplified SVG) ───────────────────────────── */
function AfricaMap() {
  const countries = [
    "Nigeria", "Ghana", "Kenya", "South Africa", "Ethiopia",
    "Egypt", "Tanzania", "Uganda", "Senegal", "Côte d'Ivoire",
    "Cameroon", "Angola", "Mozambique", "Zimbabwe", "Rwanda",
  ];
  const [lit, setLit] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < countries.length) {
        setLit(prev => [...prev, countries[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {countries.map((c) => (
          <div
            key={c}
            className="relative px-3 py-2 rounded text-xs font-medium text-center transition-all duration-700"
            style={{
              background: lit.includes(c) ? "rgba(255,46,46,0.15)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${lit.includes(c) ? ACCENT + "60" : "rgba(255,255,255,0.06)"}`,
              color: lit.includes(c) ? "#fff" : "rgba(255,255,255,0.3)",
              boxShadow: lit.includes(c) ? `0 0 12px ${ACCENT}30` : "none",
            }}
          >
            {lit.includes(c) && (
              <span
                className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
              />
            )}
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Product Demo Panel ─────────────────────────────────────── */
function ProductPanel({ product, onClose }: { product: typeof PRODUCTS[0]; onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % product.demo.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [product]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0C1520 0%, #080D14 100%)",
          border: `1px solid ${product.accent}30`,
          boxShadow: `0 0 60px ${product.glow}, 0 0 120px ${product.glow}`,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs font-mono mb-1" style={{ color: product.accent + "80" }}>{product.layer}</div>
              <h3 className="text-2xl font-black text-white">{product.name}</h3>
              <p className="text-sm mt-1" style={{ color: product.accent }}>{product.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {product.demo.map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500"
                style={{
                  background: i === step ? `${d.color}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${i === step ? d.color + "40" : "rgba(255,255,255,0.05)"}`,
                  opacity: i <= step ? 1 : 0.35,
                  transform: i === step ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span className="text-lg">{d.icon}</span>
                <span className="text-sm font-medium" style={{ color: i === step ? d.color : "rgba(255,255,255,0.7)" }}>
                  {d.step}
                </span>
                {i < step && (
                  <span className="ml-auto text-xs" style={{ color: "#00FF88" }}>✓</span>
                )}
                {i === step && (
                  <span className="ml-auto">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: d.color, animation: "pulse-dot 1s ease-in-out infinite", boxShadow: `0 0 6px ${d.color}` }}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-white/60 leading-relaxed">{product.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [activeSegment, setActiveSegment] = useState(0);

  const { ref: numbersRef, inView: numbersVisible } = useInView(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050A0F", color: "#E8EDF3" }}>
      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes scan-line {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes gradient-flow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes node-appear {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .rald-gradient-text {
          background: linear-gradient(135deg, #00FF88 0%, #0066FF 18%, #A855F7 36%, #FF2E2E 52%, #FFD400 68%, #00BFFF 84%, #FF7A00 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          background-size: 300% 300%; animation: gradient-flow 8s ease infinite;
        }
        .glass-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .glass-card:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,10,15,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${ACCENT}15` : "1px solid transparent",
        }}
      >
        <Link href="/" className="flex items-center gap-1">
          <img src={raldWordmark} alt="RALD" style={{ height: 26, width: "auto", filter: "brightness(0) invert(1)" }} />
          <span className="text-sm font-black" style={{ color: ACCENT }}>.cloud</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://app.rald.cloud"
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{ background: ACCENT, color: "#fff" }}
          >
            Get Early Access
          </a>
        </div>

        <button
          className="md:hidden p-2"
          style={{ color: ACCENT }}
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {navOpen && (
          <div
            className="absolute top-16 left-0 right-0 p-4 md:hidden"
            style={{ background: "rgba(5,10,15,0.97)", borderBottom: `1px solid ${ACCENT}20` }}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="block py-3 text-sm border-b transition-colors"
                style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.05)" }}
                onClick={() => setNavOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${ACCENT}05 50%, transparent 100%)`,
            animation: "scan-line 8s ease-in-out infinite",
          }}
        />

        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,46,46,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,46,46,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "800px", height: "800px",
            background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto pt-24">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-8"
            style={{
              background: "rgba(255,46,46,0.08)",
              border: `1px solid ${ACCENT}30`,
              color: ACCENT,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: ACCENT, animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            Africa's Digital Operating System
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
            <span className="text-white block">Africa's Digital</span>
            <span className="rald-gradient-text block">Operating System</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Identity, payments, communications, education, logistics, voice infrastructure,
            AI and developer platforms — connected through one trust network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ecosystem"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 30px ${ACCENT}40` }}
            >
              Explore the Ecosystem
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#business"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
            >
              For Businesses
            </a>
          </div>

          <div className="mt-20 h-64 md:h-80 w-full max-w-2xl mx-auto rounded-2xl overflow-hidden glass-card">
            <EcosystemCanvas />
          </div>

          <a
            href="#problem"
            className="flex flex-col items-center gap-2 mt-12 text-white/30 hover:text-white/60 transition-colors"
          >
            <span className="text-xs font-mono">scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────── */}
      <section id="problem" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>THE PROBLEM</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">A fragmented Africa</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Disconnected systems. Siloed identities. Separate infrastructure for every service.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {[
              { label: "Separate Wallets",    color: "#0066FF", icon: "💳" },
              { label: "Separate IDs",        color: "#00E5FF", icon: "🪪" },
              { label: "Separate Comms",      color: "#FF7A00", icon: "💬" },
              { label: "Separate Schools",    color: "#A855F7", icon: "🏫" },
              { label: "Separate Logistics",  color: "#00BFFF", icon: "🚚" },
              { label: "Separate Stacks",     color: "#FFD400", icon: "⚙️"  },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card rounded-xl p-4 text-center transition-all duration-300"
                style={{ borderColor: `${item.color}20` }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-white/50 leading-tight">{item.label}</div>
                <div
                  className="mt-3 h-px w-8 mx-auto"
                  style={{ background: `${item.color}40` }}
                />
                <div className="text-xs mt-2 font-mono" style={{ color: item.color + "80" }}>
                  disconnected
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-white/40 font-mono">
            <span className="line-through">6 apps. 6 accounts. 6 identities.</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} />
            <span className="font-bold text-white">One RALD network.</span>
          </div>
        </div>
      </section>

      {/* ── HOW RALD WORKS ──────────────────────────────────── */}
      <section id="ecosystem" className="py-32 px-6" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>ARCHITECTURE</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">How RALD Works</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Three interconnected layers, one unified operating system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {LAYERS.map((layer, i) => (
              <div
                key={layer.num}
                className="relative glass-card rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: `${layer.accent}20` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${layer.accent}, transparent)` }}
                />
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
                  style={{ background: `${layer.accent}10`, border: `1px solid ${layer.accent}30` }}
                >
                  <layer.icon className="w-6 h-6" style={{ color: layer.accent }} />
                </div>
                <div className="font-mono text-xs mb-1" style={{ color: layer.accent + "80" }}>
                  Layer {layer.num}
                </div>
                <h3 className="text-xl font-black text-white mb-2">{layer.name}</h3>
                <div className="text-sm font-mono mb-4" style={{ color: layer.accent }}>
                  {layer.product}
                </div>
                <ul className="space-y-2">
                  {layer.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: layer.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-mono text-sm"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${ACCENT}30`,
                color: ACCENT,
              }}
            >
              <Zap className="w-4 h-4" />
              Everything powered by RALD OS
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ECOSYSTEM SHOWCASE ──────────────────── */}
      <section id="products" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>ECOSYSTEM</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">The Ecosystem</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Click any product to see it in action.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProduct(p)}
                className="group relative glass-card rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03]"
                style={{ borderColor: `${p.accent}20`, cursor: "pointer" }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `${p.accent}05`, boxShadow: `inset 0 0 30px ${p.glow}` }}
                />
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.accent}10`, border: `1px solid ${p.accent}30` }}
                >
                  <p.icon className="w-5 h-5" style={{ color: p.accent }} />
                </div>
                <div className="relative">
                  <div className="font-mono text-xs mb-1" style={{ color: `${p.accent}70` }}>
                    {p.layer}
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{p.name}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{p.tagline}</div>
                </div>
                <div
                  className="relative mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: p.accent }}
                >
                  <Play className="w-3 h-3" />
                  See demo
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPER PLATFORM ──────────────────────────────── */}
      <section id="developers" className="py-32 px-6" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#00FF88" }}>DEVELOPER PLATFORM</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Build on RALD
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                APIs, SDKs, GitRald CI/CD, webhooks and the full developer console.
                Everything you need to build on Africa's digital infrastructure.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/developers"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: "#00FF88", color: "#000" }}
                >
                  Developer Docs
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://console.rald.cloud"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                  target="_blank" rel="noreferrer"
                >
                  RALD Console
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {DEV_TOOLS.map(tool => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between px-5 py-4 rounded-xl glass-card transition-all duration-200 hover:scale-[1.01]"
                  style={{ borderColor: `${tool.color}15` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: tool.color, boxShadow: `0 0 8px ${tool.color}60` }} />
                    <span className="text-sm font-medium text-white">{tool.name}</span>
                  </div>
                  <code className="text-xs font-mono" style={{ color: tool.color + "90" }}>
                    {tool.code}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR BUSINESSES ──────────────────────────────────── */}
      <section id="business" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>FOR BUSINESSES</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Every business has its own journey</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {BUSINESS_SEGMENTS.map((seg, i) => (
              <button
                key={seg.label}
                onClick={() => setActiveSegment(i)}
                className="group glass-card rounded-2xl p-6 text-left transition-all duration-300"
                style={{
                  borderColor: activeSegment === i ? `${seg.color}40` : `${seg.color}10`,
                  background: activeSegment === i ? `${seg.color}05` : "rgba(255,255,255,0.02)",
                  boxShadow: activeSegment === i ? `0 0 30px ${seg.color}15` : "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all"
                  style={{
                    background: `${seg.color}10`,
                    border: `1px solid ${seg.color}30`,
                  }}
                >
                  <seg.icon className="w-5 h-5" style={{ color: seg.color }} />
                </div>
                <div className="font-bold text-white text-sm mb-2">{seg.label}</div>
                <div
                  className="text-xs leading-relaxed transition-colors"
                  style={{ color: activeSegment === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}
                >
                  {seg.desc}
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://app.rald.cloud"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 30px ${ACCENT}30` }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── AFRICA FIRST ────────────────────────────────────── */}
      <section id="africa" className="py-32 px-6" style={{ background: "rgba(255,46,46,0.02)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>AFRICA FIRST</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Built for Africa, scaling across the continent</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Countries lighting up across the continent as the RALD network grows.
            </p>
          </div>
          <AfricaMap />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Users", icon: "👤", color: "#00FF88" },
              { label: "Businesses", icon: "🏢", color: "#0066FF" },
              { label: "Schools", icon: "🏫", color: "#A855F7" },
              { label: "Developers", icon: "💻", color: "#FFD400" },
            ].map(item => (
              <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium" style={{ color: item.color }}>{item.label}</div>
                <div className="text-xs text-white/40 mt-1">Growing</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUMBERS ─────────────────────────────────────────── */}
      <section
        ref={numbersRef as React.RefObject<HTMLElement>}
        className="py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>BY THE NUMBERS</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">The scale of RALD</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {NUMBERS.map(n => (
              <div
                key={n.label}
                className="glass-card rounded-2xl p-8 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: `${n.color}20` }}
              >
                <div
                  className="text-5xl md:text-6xl font-black mb-2 tabular-nums"
                  style={{ color: n.color, textShadow: `0 0 30px ${n.color}40` }}
                >
                  {n.value}
                </div>
                <div className="text-white font-bold text-sm mb-1">{n.label}</div>
                <div className="text-white/40 text-xs">{n.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        className="py-20 px-6"
        style={{ background: "#020508", borderTop: `1px solid rgba(255,255,255,0.05)` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
            {[
              { heading: "Identity",      links: ["RALD ALIA", "RALD Auth", "Trust Network", "RALD SDK Auth"] },
              { heading: "Payments",      links: ["PayRald", "Wallets", "Merchants", "Settlement"] },
              { heading: "Communications",links: ["Loop Messenger", "Loop Voice", "RALD Mail", "Notifications"] },
              { heading: "Education",     links: ["RALD Elimu", "Schools", "Students", "Attendance"] },
              { heading: "Infrastructure",links: ["RALD OS", "Event Bus", "GitRald", "Raldtics"] },
              { heading: "AI",            links: ["SEKANI", "WIZMAC", "BBC", "RALD AI"] },
            ].map(col => (
              <div key={col.heading}>
                <div className="text-xs font-mono mb-4" style={{ color: ACCENT }}>{col.heading}</div>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <span className="text-xs text-white/40 hover:text-white/70 cursor-pointer transition-colors">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 grid md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="flex items-center gap-1 mb-3">
                <img src={raldWordmark} alt="RALD" style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)" }} />
                <span className="text-sm font-black" style={{ color: ACCENT }}>.cloud</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {["About", "Governance", "Security", "Investors", "Developers", "Careers"].map(l => (
                  <span key={l} className="text-xs text-white/30 hover:text-white/60 cursor-pointer transition-colors">{l}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <Link href="/privacy" className="text-xs text-white/20 hover:text-white/50 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-xs text-white/20 hover:text-white/50 transition-colors">Terms of Service</Link>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-white/30 leading-relaxed max-w-sm ml-auto">
                RALD is building the digital operating system for Africa.
              </p>
              <p className="text-sm text-white/50 mt-2 font-medium">
                Every service. Every business. Every identity.
              </p>
              <p className="text-sm font-bold mt-1" style={{ color: ACCENT }}>
                One network.
              </p>
              <p className="text-xs text-white/20 mt-4">
                © {new Date().getFullYear()} LILCKY STUDIO LIMITED. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── PRODUCT DEMO PANEL ──────────────────────────────── */}
      {activeProduct && (
        <ProductPanel
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
