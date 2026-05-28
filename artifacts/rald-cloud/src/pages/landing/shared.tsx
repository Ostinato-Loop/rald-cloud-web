import { useState, useEffect } from "react";
import { RaldLogo } from "@/components/RaldLogo";
import { Link } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import SEOMeta, { makeSoftwareLd } from "@/components/SEOMeta";

export interface ProductConfig {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
  features: { icon: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  cta: string;
}

export function LandingNav({ productName, accentColor }: { productName: string; accentColor: string }) {
  const [open, setOpen] = useState(false);
  const products = [
    { slug: "loop", name: "Loop Business" },
    { slug: "payrald", name: "PayRald" },
    { slug: "raldtics", name: "Raldtics" },
    { slug: "dispatch", name: "Loop Dispatch" },
    { slug: "voice", name: "Loop Voice" },
    { slug: "identity", name: "RALD Identity" },
    { slug: "gitrald", name: "GitRald" },
    { slug: "sdk", name: "RALD SDK" },
    { slug: "console", name: "Control Center" },
    { slug: "messenger", name: "Loop Messenger" },
    { slug: "dunarald", name: "DunaRald" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-black/70 backdrop-blur-xl"
      style={{ borderBottom: `1px solid ${accentColor}18` }}
    >
      <Link href="/" data-testid="link-landing-home">
        <span className="flex items-center gap-1">
          <RaldLogo height={26} theme="dark" accentColor={accentColor} />
          <span className="text-sm font-black" style={{ color: accentColor }}>.cloud</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link
          href="/products"
          className="transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          data-testid="link-nav-products"
        >
          Products
        </Link>
        <Link
          href="/referral"
          className="transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          data-testid="link-nav-referral"
        >
          Referrals
        </Link>
        <Link
          href="/control"
          className="transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          data-testid="link-nav-control"
        >
          Control Center
        </Link>
        <a
          href="https://app.rald.cloud"
          className="text-xs font-semibold transition-colors"
          style={{ color: "rgba(255,255,255,0.55)" }}
          onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          data-testid="link-nav-signin"
        >
          Sign In
        </a>
        <a
          href="https://app.rald.cloud"
          className="px-4 py-1.5 rounded-full text-xs font-bold text-black transition-all hover:scale-105 hover:opacity-90 no-underline"
          style={{ background: accentColor, color: "#000", textDecoration: "none" }}
          data-testid="button-nav-cta"
        >
          Get Early Access
        </a>
      </div>

      <button
        className="md:hidden p-2"
        style={{ color: accentColor }}
        onClick={() => setOpen(!open)}
        data-testid="button-mobile-menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div
          className="absolute top-16 left-0 right-0 bg-black/98 backdrop-blur-xl border-b p-6 flex flex-col gap-1 text-sm"
          style={{ borderColor: `${accentColor}20` }}
        >
          {products.map(p => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="py-2 transition-colors text-white/50 hover:text-white rounded-lg px-2"
              style={{}}
              onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
              data-testid={`link-mobile-${p.slug}`}
            >
              {p.name}
            </Link>
          ))}
          <div className="h-px my-2" style={{ background: `${accentColor}20` }} />
          <a
            href="https://app.rald.cloud"
            className="py-2 px-2 transition-colors text-white/50"
            style={{ color: accentColor, fontWeight: 700 }}
            data-testid="link-mobile-signin"
          >
            Sign In →
          </a>
          <Link
            href="/referral"
            className="py-2 px-2 transition-colors text-white/50"
            onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
            onMouseLeave={e => (e.currentTarget.style.color = "")}
            data-testid="link-mobile-referral"
          >
            Referrals
          </Link>
          <Link
            href="/control"
            className="py-2 px-2 transition-colors"
            style={{ color: accentColor, fontWeight: 600 }}
            data-testid="link-mobile-control"
          >
            Control Center →
          </Link>
        </div>
      )}
    </nav>
  );
}

export function WaitlistForm({
  productSlug,
  accentColor,
  ctaText,
}: {
  productSlug: string;
  accentColor: string;
  ctaText: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get("ref") ?? undefined;
      // Call api.rald.cloud directly — reliable across all product subdomains
      const res = await fetch("https://api.rald.cloud/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, product: productSlug, referralCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setRefCode(data.myReferralCode ?? data.entry?.referral_code ?? "");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${refCode}`;
    return (
      <div
        className="rounded-2xl border p-6 text-center max-w-md mx-auto"
        style={{ background: `${accentColor}08`, borderColor: `${accentColor}30` }}
        data-testid="waitlist-success"
      >
        <div className="text-2xl font-black mb-2" style={{ color: accentColor }}>
          You&apos;re in. 🎉
        </div>
        <p className="text-white/60 text-sm mb-4">
          Share your link to move up the waitlist:
        </p>
        <div
          className="flex items-center gap-2 border rounded-xl px-3 py-2 mb-3"
          style={{ background: "rgba(255,255,255,0.04)", borderColor: `${accentColor}25` }}
        >
          <span className="text-xs text-white/60 flex-1 truncate font-mono">{shareUrl}</span>
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="text-xs px-2.5 py-1 rounded-lg text-black font-bold shrink-0"
            style={{ background: accentColor }}
            data-testid="button-copy-referral"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-white/30">
          Your code: <span className="font-mono" style={{ color: accentColor }}>{refCode}</span>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      data-testid="waitlist-form"
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none w-full sm:w-32 transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid rgba(255,255,255,0.08)`,
        }}
        onFocus={e => (e.currentTarget.style.borderColor = `${accentColor}60`)}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        data-testid="input-waitlist-name"
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none flex-1 transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid rgba(255,255,255,0.08)`,
        }}
        onFocus={e => (e.currentTarget.style.borderColor = `${accentColor}60`)}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        required
        data-testid="input-waitlist-email"
      />
      <button
        type="submit"
        disabled={loading || !email}
        className="px-5 py-3 rounded-xl text-sm font-bold text-black flex items-center gap-2 shrink-0 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
        style={{ background: accentColor }}
        data-testid="button-waitlist-submit"
      >
        {loading ? "..." : ctaText}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
      {error && <p className="text-xs text-red-400 mt-1 w-full">{error}</p>}
    </form>
  );
}

export function GradientBlob({ color, className }: { color: string; className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className ?? ""}`}
      style={{ background: color }}
    />
  );
}

export function FeatureCard({
  icon,
  title,
  desc,
  accentColor,
}: {
  icon: string;
  title: string;
  desc: string;
  accentColor: string;
}) {
  return (
    <div
      className="relative p-5 rounded-2xl border transition-all duration-300 group overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accentColor}40`;
        e.currentTarget.style.background = `${accentColor}06`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
      />
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 text-xl"
        style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-sm mb-1.5" style={{ color: accentColor }}>
        {title}
      </h3>
      <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export function StatBadge({
  value,
  label,
  accentColor,
}: {
  value: string;
  label: string;
  accentColor: string;
}) {
  return (
    <div className="text-center px-6 py-2">
      <div
        className="text-3xl md:text-4xl font-black mb-1 tabular-nums"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, #ffffff 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      <div className="text-white/35 text-[10px] uppercase tracking-[0.2em] font-semibold">{label}</div>
    </div>
  );
}

export function ProductLandingPage({ config }: { config: ProductConfig }) {
  const words = config.name.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  useEffect(() => {
    const title = `${config.name} — ${config.tagline.replace(/\.$/, "")} | RALD.cloud`;
    document.title = title;
    const setMeta = (attr: string, val: string, isProp = false) => {
      const selector = isProp ? `meta[property="${attr}"]` : `meta[name="${attr}"]`;
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) { el = document.createElement("meta"); el.setAttribute(isProp ? "property" : "name", attr); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("description", config.description);
    setMeta("og:title", title, true);
    setMeta("og:description", config.description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "RALD.cloud", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", config.description);
  }, [config]);

  const productJsonLd = makeSoftwareLd(
    config.name,
    config.description,
    `https://${config.slug}.rald.cloud`,
  );

  return (
    <>
      <SEOMeta
        title={`${config.name} — ${config.tagline.replace(/\.$/, "")} | RALD.cloud`}
        description={config.description}
        keywords={`${config.name}, RALD, African commerce, ${config.slug}`}
        canonicalPath={`/${config.slug}`}
        productColor={config.accentColor}
        productName={config.name}
        jsonLd={productJsonLd}
      />
      <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <LandingNav productName={config.name} accentColor={config.accentColor} />

      <div className="relative">
        <GradientBlob color={config.glowColor} className="w-[700px] h-[700px] -top-60 -left-60" />
        <GradientBlob color={config.glowColor} className="w-[500px] h-[500px] top-40 -right-40" />

        {/* ── HERO ── */}
        <section
          className="relative pt-40 pb-24 px-6 md:px-12 text-center max-w-5xl mx-auto"
          data-testid="hero-section"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-8"
            style={{
              borderColor: `${config.accentColor}40`,
              color: config.accentColor,
              background: `${config.accentColor}10`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: config.accentColor }}
            />
            Now accepting early access
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
            {restWords ? (
              <>
                <span className="text-white">{firstWord}</span>
                <br />
                <span
                  style={{
                    background: config.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {restWords}
                </span>
              </>
            ) : (
              <span
                style={{
                  background: config.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {firstWord}
              </span>
            )}
          </h1>

          <p className="text-xl md:text-2xl font-semibold mb-4 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            {config.tagline}
          </p>
          <p className="text-white/30 text-sm mb-12 max-w-xl mx-auto leading-relaxed">
            {config.description}
          </p>

          <WaitlistForm
            productSlug={config.slug}
            accentColor={config.accentColor}
            ctaText="Join Waitlist"
          />

          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            <span>Free early access</span>
            <span style={{ color: `${config.accentColor}60` }}>•</span>
            <span>No credit card</span>
            <span style={{ color: `${config.accentColor}60` }}>•</span>
            <span>Invite your team</span>
          </div>
        </section>

        {/* ── STATS ── */}
        <section
          className="relative py-16 px-6 md:px-12"
          style={{ borderTop: `1px solid ${config.accentColor}15`, borderBottom: `1px solid ${config.accentColor}15` }}
          data-testid="stats-section"
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${config.accentColor} 0%, transparent 70%)` }}
          />
          <div className="relative max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-0 gap-y-6">
            {config.stats.map((s, i) => (
              <div key={i} className="flex items-center">
                <StatBadge value={s.value} label={s.label} accentColor={config.accentColor} />
                {i < config.stats.length - 1 && (
                  <div className="hidden sm:block h-10 w-px mx-2" style={{ background: `${config.accentColor}20` }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          className="py-24 px-6 md:px-12 max-w-5xl mx-auto"
          data-testid="features-section"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              <span className="text-white">Built </span>
              <span
                style={{
                  background: config.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                different.
              </span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto">
              Everything you need. Nothing you don&apos;t.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.features.map((f, i) => (
              <FeatureCard
                key={i}
                icon={f.icon}
                title={f.title}
                desc={f.desc}
                accentColor={config.accentColor}
              />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="relative py-24 px-6 md:px-12 text-center max-w-3xl mx-auto"
          data-testid="cta-section"
        >
          <GradientBlob
            color={config.glowColor}
            className="w-[600px] h-[600px] -bottom-40 left-1/2 -translate-x-1/2"
          />
          <div
            className="relative inline-block mb-6 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${config.accentColor}15`, color: config.accentColor }}
          >
            Limited spots available
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span
              style={{
                background: config.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {config.cta}
            </span>
          </h2>
          <p className="text-white/35 text-sm mb-10">
            Join thousands of businesses already on the waitlist.
          </p>
          <WaitlistForm
            productSlug={config.slug}
            accentColor={config.accentColor}
            ctaText="Get Early Access"
          />
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-6 md:px-12"
        style={{ borderTop: `1px solid ${config.accentColor}20` }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <Link href="/" className="font-black text-base" data-testid="link-footer-brand">
            <span className="text-white/70">RALD</span>
            <span style={{ color: config.accentColor }}>.cloud</span>
          </Link>
          <div className="flex gap-6">
            <Link
              href="/products"
              className="hover:text-white/60 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = config.accentColor)}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
            >
              All Products
            </Link>
            <Link
              href="/referral"
              className="hover:text-white/60 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = config.accentColor)}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
            >
              Referrals
            </Link>
            <Link
              href="/control"
              className="hover:text-white/60 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = config.accentColor)}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
            >
              Dashboard
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1 text-right">
            <span>© 2026 RALD.cloud · Pan-African Infrastructure</span>
            <span>Operated by <strong className="text-white/50">LILCKY STUDIO LIMITED</strong></span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-4 justify-center text-xs text-white/20">
          <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
    </>
  );
}
