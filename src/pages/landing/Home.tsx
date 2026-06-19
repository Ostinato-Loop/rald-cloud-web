import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, ChevronDown, Globe, Zap, Link2 } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const RED = "#FF2E2E", BG = "#050A0F";

const PRODUCTS = [
  { slug:"alia",     label:"RALD ALIA",      color:"#00E5FF", route:"/alia",     logo:"/alia-wordmark.png",          tagline:"One identity. Every RALD product." },
  { slug:"payrald",  label:"PayRald",         color:"#0066FF", route:"/payrald",  logo:"/payrald-wordmark.png",       tagline:"Payments that work every time." },
  { slug:"loop",     label:"Loop Business",   color:"#00FF88", route:"/loop",     logo:"/loop-business-wordmark.png", tagline:"Sell online. Build community. Grow." },
  { slug:"messenger",label:"Loop Messenger",  color:"#FF7A00", route:"/messenger",logo:"/loop-messenger-wordmark.png",tagline:"Chat and pay in the same message." },
  { slug:"elimu",    label:"RALD Elimu",      color:"#A855F7", route:"/elimu",    logo:"/elimu-wordmark.png",         tagline:"School admin made simple for Africa." },
  { slug:"raldmail", label:"RALD Mail",       color:"#00E5FF", route:"/raldmail", logo:"/raldmail-wordmark.png",      tagline:"Emails that land in the inbox." },
  { slug:"dispatch", label:"Loop Dispatch",   color:"#00BFFF", route:"/dispatch", logo:null,                          tagline:"Smart carrier routing for every order." },
  { slug:"voice",    label:"Loop Voice",      color:"#FF4FAD", route:"/voice",    logo:null,                          tagline:"Voice AI in 24 African languages." },
  { slug:"raldtics", label:"Raldtics",        color:"#FFD400", route:"/raldtics", logo:null,                          tagline:"See how your business is really doing." },
  { slug:"dunarald", label:"DunaRald",        color:"#A855F7", route:"/dunarald", logo:null,                          tagline:"Save your naira. Earn up to 19% APY." },
  { slug:"gitrald",  label:"GitRald",         color:"#FF2E2E", route:"/gitrald",  logo:null,                          tagline:"African code on African servers." },
];

const LAYERS = [
  { name:"Identity",      products:["RALD ALIA"],                              color:"#00E5FF", icon:"🪪" },
  { name:"Money",         products:["PayRald","DunaRald"],                      color:"#0066FF", icon:"💳" },
  { name:"Connect",       products:["Loop Business","Loop Messenger"],           color:"#00FF88", icon:"🔗" },
  { name:"Infrastructure",products:["Loop Voice","RALD Mail","Loop Dispatch"],  color:"#FF4FAD", icon:"⚡" },
  { name:"Intelligence",  products:["Raldtics"],                                color:"#FFD400", icon:"📊" },
  { name:"Developer",     products:["GitRald","RALD Elimu"],                    color:"#FF2E2E", icon:"🛠" },
];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis] as const;
}

function ProductCard({ p, i }: { p: typeof PRODUCTS[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={p.route}>
      <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          position:"relative", borderRadius:18, padding:"24px", cursor:"pointer",
          background: hov ? `${p.color}09` : "rgba(255,255,255,.025)",
          border: `1px solid ${hov ? p.color+"40" : "rgba(255,255,255,.07)"}`,
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hov ? `0 20px 60px ${p.color}12, 0 0 0 1px ${p.color}15` : "none",
          transition:"all .25s cubic-bezier(.4,0,.2,1)",
          animation:`hup .55s ease forwards`,
          animationDelay:`${i * 0.045}s`,
          opacity:0,
        }}>
        {/* Top accent line */}
        <div style={{ position:"absolute", top:0, left:20, right:20, height:1, borderRadius:1,
          background: hov ? `linear-gradient(90deg,transparent,${p.color}60,transparent)` : "transparent",
          transition:"all .3s" }} />
        <div style={{ marginBottom:16, height:36, display:"flex", alignItems:"center" }}>
          {p.logo
            ? <img src={p.logo} alt={p.label} style={{ height:28, width:"auto", maxWidth:160, objectFit:"contain", objectPosition:"left" }} />
            : <span style={{ fontWeight:900, fontSize:16, color:p.color, letterSpacing:"-0.3px" }}>{p.label}</span>}
        </div>
        <p style={{ fontSize:13, lineHeight:1.65, color:"rgba(255,255,255,.4)", marginBottom:16 }}>{p.tagline}</p>
        <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:700, color:p.color,
          opacity: hov ? 1 : 0.7, transition:"all .2s" }}>
          Explore <ArrowRight style={{ width:12, height:12, transform: hov ? "translateX(2px)" : "none", transition:"transform .2s" }} />
        </div>
        <div style={{ position:"absolute", top:18, right:18, width:8, height:8, borderRadius:"50%",
          background:p.color, opacity: hov ? 1 : 0.25, transition:"opacity .25s",
          boxShadow: hov ? `0 0 8px ${p.color}` : "none" }} />
      </article>
    </Link>
  );
}

export default function Home() {
  const [sc, setSc] = useState(false);
  const [nav, setNav] = useState(false);
  const [ready, setReady] = useState(false);
  const [layerRef, layerVis] = useReveal();
  const [whyRef, whyVis] = useReveal();
  const [ctaRef, ctaVis] = useReveal();
  const [gridRef, gridVis] = useReveal(0.05);

  useSEO({
    title:"RALD.cloud — Africa's Digital Operating System",
    description:"RALD is Africa's integrated digital ecosystem: identity (ALIA), payments (PayRald), messaging (Loop Messenger), commerce (Loop), education (RALD Elimu), logistics (Loop Dispatch), voice AI (Loop Voice), email (RALD Mail), savings (DunaRald), analytics (Raldtics) and developer infra (GitRald).",
    url:"https://rald.cloud",
    themeColor:"#FF2E2E",
  });

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div style={{ background:BG, color:"#E8EDF3", minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <style>{`
        @keyframes hup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes hpulse{0%,100%{opacity:.3}50%{opacity:.9}}
        @keyframes hgr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes forb{from{opacity:0;transform:scale(.97) translateY(8px)}to{opacity:1;transform:none}}
        @keyframes floatA{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-18px) translateX(8px)}}
        @keyframes floatB{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(12px) translateX(-12px)}}
        @keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .hgrd{background:linear-gradient(135deg,#FF2E2E,#FF7A00,#FFD400,#00FF88,#00E5FF,#A855F7);background-size:300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hgr 7s ease infinite}
        .hgrd2{background:linear-gradient(90deg,#FF2E2E,#FF7A00);-webkit-background-clip:text;background-clip:text;color:transparent}
        .navlink{color:rgba(255,255,255,.38);transition:color .18s;text-decoration:none;font-size:13.5px}
        .navlink:hover{color:rgba(255,255,255,.82)}
      `}</style>

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(20px,5vw,48px)",
        background: sc ? `${BG}F0` : "transparent",
        backdropFilter: sc ? "blur(20px) saturate(180%)" : "none",
        borderBottom: sc ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
        transition:"all .3s ease" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:22, filter:"brightness(0) invert(1)" }} /></Link>
        <div style={{ display:"flex", gap:28, alignItems:"center" }} className="hidden md:flex">
          {[["Products","#ecosystem"],["Developers","/developers"],["Status","/status"],["Privacy","/privacy"]].map(([l,h]) => (
            <a key={l} href={h} className="navlink">{l}</a>
          ))}
        </div>
        <button style={{ color:RED, padding:8, background:"none", border:"none", cursor:"pointer", display:"flex" }}
          className="md:hidden" onClick={() => setNav(!nav)}>
          {nav ? <X style={{width:20,height:20}}/> : <Menu style={{width:20,height:20}}/>}
        </button>
      </nav>

      {/* Mobile nav */}
      {nav && (
        <div style={{ position:"fixed", inset:0, zIndex:40, background:BG, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:32 }}>
          {[["Products","#ecosystem"],["Developers","/developers"],["Status","/status"],["Privacy","/privacy"],["Terms","/terms"]].map(([l,h]) => (
            <a key={l} href={h} style={{ color:"rgba(255,255,255,.75)", fontSize:22, fontWeight:900, textDecoration:"none" }}
              onClick={() => setNav(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 20px 60px",
        overflow:"hidden" }}>

        {/* Grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(255,46,46,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,46,46,.03) 1px,transparent 1px)`,
          backgroundSize:"64px 64px" }} />

        {/* Floating ambient orbs */}
        <div style={{ position:"absolute", top:"20%", left:"12%", width:420, height:420, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,229,255,.055) 0%,transparent 65%)",
          animation:"floatA 9s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"45%", right:"8%", width:320, height:320, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,102,255,.05) 0%,transparent 65%)",
          animation:"floatB 11s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"20%", left:"20%", width:280, height:280, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(255,46,46,.045) 0%,transparent 65%)",
          animation:"floatC 8s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:900,
          background:"radial-gradient(circle,rgba(255,46,46,.03) 0%,transparent 60%)", pointerEvents:"none" }} />

        {/* Content */}
        <div style={{ position:"relative", zIndex:10, opacity: ready ? 1 : 0,
          transform: ready ? "none" : "translateY(20px)", transition:"all .8s cubic-bezier(.4,0,.2,1)" }}>

          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px",
            borderRadius:999, marginBottom:36,
            background:"rgba(255,46,46,.1)", border:"1px solid rgba(255,46,46,.28)", color:RED }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:RED, display:"inline-block", animation:"hpulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.02em" }}>Africa's Digital Operating System · LILCKY STUDIO</span>
          </div>

          <div style={{ marginBottom:20 }}>
            <img src="/rald-wordmark.png" alt="RALD" style={{ height:54, filter:"brightness(0) invert(1)", margin:"0 auto" }} />
          </div>

          <h1 style={{ fontSize:"clamp(44px,8vw,96px)", fontWeight:900, lineHeight:1.0,
            letterSpacing:"-0.03em", margin:"0 auto 24px", maxWidth:840 }}>
            <span className="hgrd">One ecosystem.</span><br />
            <span style={{ color:"#fff" }}>Every African need.</span>
          </h1>

          <p style={{ fontSize:"clamp(16px,2vw,20px)", color:"rgba(255,255,255,.45)", maxWidth:540,
            margin:"0 auto 44px", lineHeight:1.72 }}>
            Identity, payments, commerce, messaging, logistics, education — all connected, all built in Africa, for Africa.
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <a href="#ecosystem" style={{ display:"flex", alignItems:"center", gap:8, padding:"14px 28px",
              borderRadius:999, fontWeight:600, fontSize:15,
              border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.7)",
              textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,.7)"; }}>
              Explore 11 products <ChevronDown style={{width:16,height:16}}/>
            </a>
            <Link href="/developers" style={{ display:"flex", alignItems:"center", gap:8, padding:"14px 28px",
              borderRadius:999, fontWeight:600, fontSize:15,
              border:"1px solid rgba(255,255,255,.08)", color:"rgba(255,255,255,.4)",
              textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={(e:any) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e:any) => { e.currentTarget.style.color = "rgba(255,255,255,.4)"; }}>
              Developer API
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#ecosystem" style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:4,
          color:"rgba(255,255,255,.18)", textDecoration:"none" }}>
          <span style={{ fontSize:11 }}>11 products</span>
          <ChevronDown style={{ width:16, height:16, animation:"hup 1.5s ease-in-out infinite alternate" }} />
        </a>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", borderBottom:"1px solid rgba(255,255,255,.05)",
        padding:"28px 20px", background:"rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:0 }}>
          {[
            { v:"11", l:"Products" },
            { v:"54+", l:"African cities served" },
            { v:"24", l:"African languages" },
            { v:"10+", l:"Payment gateways" },
            { v:"1", l:"Unified identity" },
          ].map((s, i) => (
            <div key={s.l} style={{ textAlign:"center", padding:"8px 16px",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
              <div style={{ fontSize:28, fontWeight:900, color:"#fff", letterSpacing:"-0.04em",
                background:"linear-gradient(135deg,#fff 0%,rgba(255,255,255,.55) 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.v}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginTop:2, letterSpacing:"0.05em", textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCT GRID ──────────────────────────────────── */}
      <section id="ecosystem" ref={gridRef as any} style={{ padding:"clamp(60px,8vw,112px) clamp(16px,4vw,40px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56,
            opacity: gridVis ? 1 : 0, transform: gridVis ? "none" : "translateY(20px)",
            transition:"all .6s ease" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:RED, marginBottom:12 }}>The RALD ecosystem</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:"#fff", letterSpacing:"-0.02em", marginBottom:14 }}>
              11 products. One platform.
            </h2>
            <p style={{ fontSize:17, color:"rgba(255,255,255,.38)", maxWidth:480, margin:"0 auto", lineHeight:1.7 }}>
              Every RALD product connects to the others. Your identity, your wallet, your business — one ecosystem.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
            {PRODUCTS.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE LAYERS ───────────────────────────── */}
      <section ref={layerRef as any} style={{ padding:"clamp(48px,7vw,96px) clamp(16px,4vw,40px)",
        background:"#030608", borderTop:"1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48,
            opacity: layerVis ? 1 : 0, transform: layerVis ? "none" : "translateY(20px)",
            transition:"all .6s ease" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:RED, marginBottom:12 }}>Architecture</div>
            <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>7 layers. All connected.</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {LAYERS.map((l, i) => (
              <div key={l.name} style={{
                display:"flex", alignItems:"center", gap:16, borderRadius:14,
                padding:"18px 24px", cursor:"default",
                background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)",
                opacity: layerVis ? 1 : 0, transform: layerVis ? "none" : "translateX(-16px)",
                transition:`all .5s ease ${i * 0.08}s`,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.035)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.02)"; }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{l.icon}</span>
                <div style={{ width:120, fontWeight:900, fontSize:14, color:l.color, flexShrink:0 }}>{l.name}</div>
                <div style={{ width:1, height:24, background:"rgba(255,255,255,.07)", flexShrink:0 }} />
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {l.products.map(p => (
                    <span key={p} style={{ padding:"5px 12px", borderRadius:999, fontSize:12, fontWeight:600,
                      background:"rgba(255,255,255,.05)", color:"rgba(255,255,255,.5)",
                      border:"1px solid rgba(255,255,255,.07)" }}>{p}</span>
                  ))}
                </div>
                <div style={{ marginLeft:"auto", width:8, height:8, borderRadius:"50%", background:l.color,
                  flexShrink:0, boxShadow:`0 0 8px ${l.color}60` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY RALD ──────────────────────────────────────── */}
      <section ref={whyRef as any} style={{ padding:"clamp(60px,8vw,112px) clamp(16px,4vw,40px)" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56,
            opacity: whyVis ? 1 : 0, transform: whyVis ? "none" : "translateY(20px)",
            transition:"all .6s ease" }}>
            <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:"#fff", letterSpacing:"-0.02em", marginBottom:12 }}>
              Built for African reality.
            </h2>
            <p style={{ fontSize:17, color:"rgba(255,255,255,.38)" }}>Not adapted from Silicon Valley. Designed here, for here.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
            {[
              { icon:"📶", color:"#00FF88",  title:"Works on 2G",          desc:"Every RALD product is tested on slow networks. Because that's what most Africans actually have." },
              { icon:"🌍", color:"#FFD400",  title:"24 African languages",  desc:"Yoruba, Hausa, Swahili, Twi, Igbo and 20 more. Loop Voice speaks your customers' language." },
              { icon:"🔗", color:"#00E5FF",  title:"All connected",         desc:"One ALIA identity. One PayRald wallet. Works across all 11 RALD products — no re-signing up." },
              { icon:"💳", color:"#0066FF",  title:"No card? No problem",   desc:"USSD, mobile money and agent banking. Every Nigerian can pay — with or without a debit card." },
              { icon:"🛡️", color:"#A855F7",  title:"Built-in fraud engine", desc:"AI trained on 50M+ African transactions. Fraud is blocked before it reaches your account." },
              { icon:"🏗️", color:"#FF2E2E",  title:"Open APIs",             desc:"Every RALD product has a public API. Build on RALD's identity, payments and messaging layers." },
            ].map((c, i) => (
              <div key={c.title} style={{
                borderRadius:18, padding:"28px",
                background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)",
                transition:"all .25s cubic-bezier(.4,0,.2,1)",
                opacity: whyVis ? 1 : 0, transform: whyVis ? "none" : "translateY(16px)",
                transitionDelay: whyVis ? `${i * 0.07}s` : "0s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${c.color}07`; el.style.borderColor = `${c.color}30`; el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,.025)"; el.style.borderColor = "rgba(255,255,255,.07)"; el.style.transform = "none";
                }}>
                <div style={{ width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:22, marginBottom:20, background:`${c.color}12`, border:`1px solid ${c.color}20` }}>{c.icon}</div>
                <h3 style={{ fontWeight:900, fontSize:16, color:"#fff", marginBottom:8 }}>{c.title}</h3>
                <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,.42)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────── */}
      <section ref={ctaRef as any} style={{ padding:"clamp(60px,8vw,112px) clamp(16px,4vw,40px)", textAlign:"center",
        background:"#030608", borderTop:"1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth:720, margin:"0 auto",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(24px)",
          transition:"all .7s cubic-bezier(.4,0,.2,1)" }}>
          <img src="/rald-icon.png" alt="RALD" style={{ width:72, height:72, objectFit:"contain", margin:"0 auto 28px",
            borderRadius:20, filter:"drop-shadow(0 0 24px rgba(255,46,46,.25))" }} />
          <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:"#fff", letterSpacing:"-0.02em", marginBottom:16, lineHeight:1.1 }}>
            Africa is building.<br /><span className="hgrd2">RALD is the foundation.</span>
          </h2>
          <p style={{ fontSize:17, color:"rgba(255,255,255,.38)", marginBottom:40, lineHeight:1.7 }}>
            One account unlocks all 11 RALD products. Free to start.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <Link href="/developers" style={{ display:"flex", alignItems:"center", gap:8, padding:"14px 28px",
              borderRadius:999, fontWeight:600, fontSize:15,
              border:"1px solid rgba(255,255,255,.12)", color:"rgba(255,255,255,.65)",
              textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={(e:any) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={(e:any) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color="rgba(255,255,255,.65)"; }}>
              Build on RALD
            </Link>
            <Link href="/status" style={{ display:"flex", alignItems:"center", gap:8, padding:"14px 28px",
              borderRadius:999, fontWeight:600, fontSize:15,
              border:"1px solid rgba(255,255,255,.07)", color:"rgba(255,255,255,.35)",
              textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={(e:any) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e:any) => { e.currentTarget.style.color = "rgba(255,255,255,.35)"; }}>
              System status
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ padding:"clamp(40px,6vw,80px) clamp(16px,4vw,40px) 32px",
        background:"#010508", borderTop:"1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:64, flexWrap:"wrap" }}
            className="grid-footer">
            <div>
              <img src="/rald-wordmark.png" alt="RALD" style={{ height:22, filter:"brightness(0) invert(1)", marginBottom:16 }} />
              <p style={{ fontSize:13, color:"rgba(255,255,255,.3)", lineHeight:1.75, maxWidth:260 }}>
                Africa's Digital Operating System. One ecosystem for identity, payments, commerce, education and beyond.
              </p>
              <div style={{ display:"flex", gap:12, marginTop:20 }}>
                {[Globe, Link2, Zap].map((Icon, i) => (
                  <div key={i} style={{ width:34, height:34, borderRadius:8, background:"rgba(255,255,255,.05)",
                    border:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon style={{ width:15, height:15, color:"rgba(255,255,255,.3)" }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:16 }}>Products</p>
              {[["RALD ALIA","/alia"],["PayRald","/payrald"],["Loop Business","/loop"],["Loop Messenger","/messenger"],["RALD Elimu","/elimu"],["RALD Mail","/raldmail"]].map(([l,h]) => (
                <div key={l} style={{ marginBottom:10 }}>
                  <Link href={h} style={{ fontSize:13, color:"rgba(255,255,255,.35)", textDecoration:"none", transition:"color .15s" }}
                    onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"}
                    onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.35)"}>{l}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:16 }}>More</p>
              {[["Loop Dispatch","/dispatch"],["Loop Voice","/voice"],["Raldtics","/raldtics"],["DunaRald","/dunarald"],["GitRald","/gitrald"]].map(([l,h]) => (
                <div key={l} style={{ marginBottom:10 }}>
                  <Link href={h} style={{ fontSize:13, color:"rgba(255,255,255,.35)", textDecoration:"none", transition:"color .15s" }}
                    onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"}
                    onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.35)"}>{l}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:16 }}>Company</p>
              {[["Developers","/developers"],["System Status","/status"],["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([l,h]) => (
                <div key={l} style={{ marginBottom:10 }}>
                  <Link href={h} style={{ fontSize:13, color:"rgba(255,255,255,.35)", textDecoration:"none", transition:"color .15s" }}
                    onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"}
                    onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.35)"}>{l}</Link>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.04)", paddingTop:28,
            display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
            <span style={{ fontSize:12, color:"rgba(255,255,255,.18)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED. All rights reserved.</span>
            <span style={{ fontSize:12, color:"rgba(255,255,255,.18)" }}>Made in Africa 🌍</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media(max-width:768px){
          .grid-footer{grid-template-columns:1fr 1fr!important;gap:32px!important}
        }
        @media(max-width:480px){
          .grid-footer{grid-template-columns:1fr!important;gap:24px!important}
        }
      `}</style>
    </div>
  );
}
