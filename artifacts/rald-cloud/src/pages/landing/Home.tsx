import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";

const RED = "#FF2E2E";
const BG = "#050A0F";

const PRODUCTS = [
  { slug:"alia",     label:"RALD ALIA",       color:"#00E5FF", route:"/alia",      logo:"/alia-wordmark.png",           icon:"/alia-icon.png",              tagline:"Your identity on RALD. One alias, every product." },
  { slug:"payrald",  label:"PayRald",          color:"#0066FF", route:"/payrald",   logo:"/payrald-wordmark.png",        icon:"/payrald-icon.png",           tagline:"Send and receive money. Instantly. Anywhere." },
  { slug:"loop",     label:"Loop Business",    color:"#00FF88", route:"/loop",      logo:"/loop-business-wordmark.png",  icon:"/loop-icon.png",              tagline:"Sell online. Build community. Grow." },
  { slug:"messenger",label:"Loop Messenger",   color:"#FF7A00", route:"/messenger", logo:"/loop-messenger-wordmark.png", icon:"/loop-messenger-icon.png",    tagline:"Chat and pay in the same message." },
  { slug:"elimu",    label:"RALD Elimu",       color:"#A855F7", route:"/elimu",     logo:"/elimu-wordmark.png",          icon:"/elimu-icon.png",             tagline:"School admin made simple for Africa." },
  { slug:"raldmail", label:"RALD Mail",        color:"#00E5FF", route:"/raldmail",  logo:"/raldmail-wordmark.png",       icon:null,                          tagline:"Emails that land in the inbox, not spam." },
  { slug:"dispatch", label:"Loop Dispatch",    color:"#00BFFF", route:"/dispatch",  logo:null,                           icon:null,                          tagline:"Smart carrier selection for every order." },
  { slug:"voice",    label:"Loop Voice",       color:"#FF4FAD", route:"/voice",     logo:null,                           icon:null,                          tagline:"Voice AI in 24 African languages." },
  { slug:"raldtics", label:"Raldtics",         color:"#FFD400", route:"/raldtics",  logo:null,                           icon:null,                          tagline:"See how your business is really doing." },
  { slug:"dunarald", label:"DunaRald",         color:"#A855F7", route:"/dunarald",  logo:null,                           icon:null,                          tagline:"Save your naira. Earn up to 19% APY." },
  { slug:"gitrald",  label:"GitRald",          color:"#FF2E2E", route:"/gitrald",   logo:null,                           icon:null,                          tagline:"African code on African servers." },
];

const LAYERS = [
  { name:"Identity",     products:["RALD ALIA"],                               color:"#00E5FF" },
  { name:"Money",        products:["PayRald","DunaRald"],                       color:"#0066FF" },
  { name:"Connect",      products:["Loop Business","Loop Messenger"],            color:"#00FF88" },
  { name:"Infrastructure",products:["Loop Voice","RALD Mail","Loop Dispatch"],  color:"#FF4FAD" },
  { name:"Intelligence", products:["Raldtics"],                                 color:"#FFD400" },
  { name:"Developer",    products:["GitRald","RALD Elimu"],                     color:"#FF2E2E" },
];

function ProductCard({ p, i }: { p: typeof PRODUCTS[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={p.route}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300"
        style={{
          background: hov ? `${p.color}08` : "rgba(255,255,255,.025)",
          border: `1px solid ${hov ? p.color + "35" : "rgba(255,255,255,.07)"}`,
          transform: hov ? "translateY(-3px)" : "none",
          boxShadow: hov ? `0 12px 40px ${p.color}12` : "none",
          animation: `hup .5s ease forwards`,
          animationDelay: `${i * 0.05}s`,
          opacity: 0,
        }}
      >
        {/* Logo or fallback name */}
        <div className="mb-5" style={{ height: 36, display: "flex", alignItems: "center" }}>
          {p.logo ? (
            <img src={p.logo} alt={p.label} style={{ height: 32, width: "auto", maxWidth: 180, objectFit: "contain", objectPosition: "left" }} />
          ) : (
            <span className="font-black text-lg" style={{ color: p.color }}>{p.label}</span>
          )}
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,.45)" }}>{p.tagline}</p>
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: p.color }}>
          Learn more <ArrowRight className="w-3 h-3" />
        </div>
        {/* Corner dot */}
        <div className="absolute top-5 right-5 w-2 h-2 rounded-full" style={{ background: p.color, opacity: hov ? 1 : 0.3, transition: "opacity .3s" }} />
      </div>
    </Link>
  );
}

export default function Home() {
  const [sc, setSc] = useState(false);
  const [nav, setNav] = useState(false);
  const [ready, setReady] = useState(false);
  const ecosRef = useRef<HTMLElement>(null);

  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh" }}>
      <style>{`
        @keyframes hup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes hpulse{0%,100%{opacity:.3}50%{opacity:.9}}
        @keyframes hgr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .hgrd{background:linear-gradient(135deg,#FF2E2E,#FF7A00,#FFD400,#00FF88,#00E5FF,#A855F7);background-size:300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hgr 8s ease infinite}
        .hgrd2{background:linear-gradient(90deg,#FF2E2E,#FF7A00);-webkit-background-clip:text;background-clip:text;color:transparent}
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 h-16 transition-all"
        style={{ background: sc ? `${BG}F2` : "transparent", backdropFilter: sc ? "blur(16px)" : "none", borderBottom: sc ? `1px solid rgba(255,255,255,.06)` : "1px solid transparent" }}>
        <Link href="/">
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)" }} />
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm">
          {[["Products", "#ecosystem"], ["Developers", "/developers"], ["Privacy", "/privacy"]].map(([l, h]) => (
            <a key={l} href={h} style={{ color: "rgba(255,255,255,.4)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)"; }}>{l}</a>
          ))}
          <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{ background: RED, color: "#fff" }}>
            Get started
          </a>
        </div>
        <button className="md:hidden p-2" style={{ color: RED }} onClick={() => setNav(!nav)}>
          {nav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {nav && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 text-xl font-black" style={{ background: BG }}>
          {[["Products", "#ecosystem"], ["Developers", "/developers"], ["Privacy", "/privacy"]].map(([l, h]) => (
            <a key={l} href={h} style={{ color: "rgba(255,255,255,.7)" }} onClick={() => setNav(false)}>{l}</a>
          ))}
          <a href="https://app.rald.cloud" className="px-8 py-3 rounded-full text-base" style={{ background: RED, color: "#fff" }}>Get started</a>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,46,46,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,46,46,.04) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
        {/* Glow */}
        <div className="absolute pointer-events-none" style={{ top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle,rgba(255,46,46,.06) 0%,transparent 65%)" }} />

        <div className="relative z-10" style={{ animation: ready ? "hup .8s ease forwards" : "none", opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-10" style={{ background: "rgba(255,46,46,.1)", border: "1px solid rgba(255,46,46,.3)", color: RED }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: RED, display: "inline-block", animation: "hpulse 2s ease-in-out infinite" }} />
            Africa's Digital Operating System · Built by LILCKY STUDIO
          </div>

          <div className="mb-6">
            <img src="/rald-wordmark.png" alt="RALD" style={{ height: 50, width: "auto", filter: "brightness(0) invert(1)", margin: "0 auto 16px" }} />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6" style={{ maxWidth: 800, margin: "0 auto 24px" }}>
            <span className="hgrd">One ecosystem.</span><br />
            <span style={{ color: "#fff" }}>Every African need.</span>
          </h1>
          <p className="text-lg md:text-xl mb-12" style={{ color: "rgba(255,255,255,.45)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Identity, payments, commerce, messaging, logistics, education — all connected. Built in Africa. For Africa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://app.rald.cloud" className="flex items-center gap-2 px-8 py-4 rounded-full font-black text-base hover:scale-105 transition-all" style={{ background: RED, color: "#fff", boxShadow: `0 0 40px ${RED}40` }}>
              Get started free <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#ecosystem" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(255,255,255,.14)", color: "rgba(255,255,255,.7)" }}>
              Explore products
            </a>
          </div>
        </div>

        <a href="#ecosystem" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20">
          <span className="text-xs">11 products</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* PRODUCT GRID */}
      <section id="ecosystem" ref={ecosRef} className="py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: RED }}>The RALD ecosystem</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">11 products. One platform.</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,.4)", maxWidth: 500, margin: "0 auto" }}>
              Every RALD product connects to the others. Your identity, your wallet, your business — all in one ecosystem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE LAYERS */}
      <section className="py-24 px-5" style={{ background: "#030608", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: RED }}>Architecture</div>
            <h2 className="text-2xl md:text-4xl font-black text-white">7 layers. All connected.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {LAYERS.map(l => (
              <div key={l.name} className="flex items-center gap-5 rounded-xl px-6 py-4 transition-all hover:bg-white/3" style={{ border: "1px solid rgba(255,255,255,.05)" }}>
                <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ background: l.color }} />
                <div className="w-28 font-black text-sm" style={{ color: l.color }}>{l.name}</div>
                <div className="flex flex-wrap gap-2">
                  {l.products.map(p => (
                    <span key={p} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.08)" }}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY RALD */}
      <section className="py-28 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Built for African reality.</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,.4)" }}>Not adapted from Silicon Valley. Designed here, for here.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "📶", title: "Works on 2G", desc: "Every RALD product is tested on slow networks. Because that's what most Africans have." },
              { icon: "🌍", title: "African languages", desc: "Yoruba, Hausa, Swahili, Twi, Igbo and 20 more. We speak your language — literally." },
              { icon: "🔗", title: "All connected", desc: "One ALIA identity. One PayRald wallet. Works across every RALD product — no re-signing up." },
            ].map(c => (
              <div key={c.title} className="rounded-2xl p-7 transition-all hover:bg-white/3" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="text-3xl mb-5">{c.icon}</div>
                <h3 className="font-black text-white mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-5 text-center" style={{ background: "#030608", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div className="max-w-2xl mx-auto">
          <img src="/rald-icon.png" alt="RALD" style={{ height: 56, width: 56, objectFit: "contain", margin: "0 auto 24px", borderRadius: 16 }} />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
            Africa is building.<br /><span className="hgrd2">RALD is the foundation.</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,.4)" }}>
            One account unlocks all 11 RALD products. Free to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.rald.cloud" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{ background: RED, color: "#fff", boxShadow: `0 0 40px ${RED}35` }}>
              Create your RALD account <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/developers" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.7)" }}>
              Build on RALD
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-10 px-5" style={{ background: "#010508", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 20, filter: "brightness(0) invert(1)" }} />
          <div className="flex flex-wrap justify-center gap-5 text-xs" style={{ color: "rgba(255,255,255,.25)" }}>
            {[["Products", "#ecosystem"], ["ALIA", "/alia"], ["PayRald", "/payrald"], ["Developers", "/developers"], ["Privacy", "/privacy"], ["Terms", "/terms"]].map(([l, h]) => (
              <a key={l} href={h} className="hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
