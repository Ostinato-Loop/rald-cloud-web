import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown, PiggyBank, TrendingUp, Wallet, Shield, Menu, X } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#A855F7", BG = "#080310", S = "#0A0414";

const STORIES = [
  { emoji:"💰", name:"Emeka", city:"Port Harcourt", story:"He saves ₦5,000 a week in DunaRald. By month 6, he earned ₦18,000 in interest — enough to pay one month's rent. He never locked his money away." },
  { emoji:"👩‍💼", name:"Fatima", city:"Kano", story:"She moved her business savings from a regular bank (3% APY) to DunaRald (19% APY). Same money. Same access. Just better returns." },
  { emoji:"🎓", name:"Kweku", city:"Accra", story:"He's saving for his Masters degree. Sets a goal in DunaRald. Every month he deposits what he can. He can see exactly when he'll hit his target." },
];

const FEATURES = [
  { icon:PiggyBank, label:"Up to 19% on your naira", desc:"Save your money and earn daily interest. Way more than a regular bank account." },
  { icon:TrendingUp, label:"Invest in Nigerian T-Bills", desc:"Buy government treasury bills directly. Safe, regulated, high yield." },
  { icon:Wallet, label:"Withdraw any time", desc:"It's your money. Take it out whenever you want. No lock-up periods, no penalties." },
  { icon:Shield, label:"NDIC insured", desc:"Your savings are insured by the Nigeria Deposit Insurance Corporation. Fully regulated." },
];

function useReveal(t = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, [t]);
  return [ref, v] as const;
}

const FOOTER_PRODUCTS = [["RALD ALIA","/alia"],["PayRald","/payrald"],["Loop Business","/loop"],["Loop Messenger","/messenger"],["RALD Elimu","/elimu"],["RALD Mail","/raldmail"],["Loop Dispatch","/dispatch"],["Loop Voice","/voice"],["Raldtics","/raldtics"],["DunaRald","/dunarald"],["GitRald","/gitrald"]];

export default function DunaRald() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0), [nav, setNav] = useState(false), [vis, setVis] = useState(false);
  const [s1, v1] = useReveal(), [s2, v2] = useReveal(), [s3, v3] = useReveal(), [s4, v4] = useReveal();
  const yieldsRef = useRef<HTMLDivElement>(null);

  useSEO({ title:"DunaRald — Save Your Naira and Earn Up to 19% APY | RALD.cloud", description:"DunaRald is Nigeria's highest-yield savings platform. Save your naira, earn 19% APY, invest in T-Bills, and withdraw any time. NDIC insured. No lock-up periods.", url:"https://rald.cloud/dunarald", themeColor:A, product:{ name:"DunaRald", applicationCategory:"FinanceApplication", operatingSystem:"Web, Android, iOS", offers:{ price:"0", priceCurrency:"NGN" } } });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);
  useEffect(() => {
    const el = yieldsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background:BG, color:"#E8EDF3", minHeight:"100vh" }}>
      <style>{`@keyframes pup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes pp{0%,100%{opacity:.35}50%{opacity:1}}.pgrd{background:linear-gradient(135deg,#A855F7,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent}.pcard{background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.1);border-radius:16px;transition:all .25s}.pcard:hover{background:rgba(168,85,247,.08);border-color:rgba(168,85,247,.28);transform:translateY(-3px);box-shadow:0 12px 40px rgba(168,85,247,.07)}.navlnk{color:rgba(255,255,255,.35);transition:color .18s;text-decoration:none;font-size:13px}.navlnk:hover{color:rgba(255,255,255,.8)}`}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(20px,5vw,40px)", background:sc?`${BG}F2`:"transparent", backdropFilter:sc?"blur(20px)":"none", borderBottom:sc?`1px solid ${A}12`:"1px solid transparent", transition:"all .3s" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:20, filter:"brightness(0) invert(1)" }}/></Link>
        <div className="hidden md:flex" style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:999, background:`${A}10`, border:`1px solid ${A}20` }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"pp 2s ease-in-out infinite" }}/><span style={{ fontSize:12, fontWeight:700, color:A }}>DunaRald</span>
        </div>
        <div className="hidden md:flex" style={{ display:"flex", gap:24 }}>
          {[["Products","/products"],["Developers","/developers"],["Status","/status"]].map(([l,h]) => <Link key={l} href={h} className="navlnk">{l}</Link>)}
        </div>
        <button onClick={() => setNav(!nav)} style={{ background:"none", border:"none", color:A, cursor:"pointer", padding:8 }} className="md:hidden">
          {nav ? <X style={{width:20,height:20}}/> : <Menu style={{width:20,height:20}}/>}
        </button>
      </nav>
      {nav && <div style={{ position:"fixed", inset:0, zIndex:40, background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
        {[["Products","/products"],["Developers","/developers"],["Status","/status"]].map(([l,h]) => <Link key={l} href={h} style={{ color:"rgba(255,255,255,.7)", fontSize:20, fontWeight:900, textDecoration:"none" }} onClick={() => setNav(false)}>{l}</Link>)}
        <Link href="/" style={{ color:"rgba(255,255,255,.4)", fontSize:14, textDecoration:"none" }} onClick={() => setNav(false)}>← All products</Link>
      </div>}

      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 20px 60px", position:"relative", overflow:"hidden", animation:"pup .7s ease forwards" }}>
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:`radial-gradient(circle,${A}07 0%,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, marginBottom:32, background:`${A}12`, border:`1px solid ${A}30`, color:A }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"pp 2s ease-in-out infinite" }}/><span style={{ fontSize:12, fontWeight:700 }}>Financial Layer · RALD OS</span>
        </div>
        <div style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:900, marginBottom:16, color:A }}>DunaRald</div>
        <h1 style={{ fontSize:"clamp(38px,7vw,80px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-0.03em", maxWidth:700, margin:"0 auto 20px" }}>
          Your money, earning<br /><span className="pgrd">while you sleep.</span>
        </h1>
        <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.48)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.72 }}>
          Save your naira and earn up to 19% interest every year. Better than any bank. No lock-up. Your money, available any time.
        </p>
        <Link href="/payrald" style={{ padding:"13px 26px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.7)", textDecoration:"none" }}>See PayRald wallet</Link>
        <a href="#yields" style={{ marginTop:56, display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:"rgba(255,255,255,.2)", textDecoration:"none" }}>
          <span style={{ fontSize:11 }}>scroll</span><ChevronDown style={{ width:16, height:16 }}/>
        </a>
      </section>

      <section ref={s1 as any} id="yields" style={{ padding:"clamp(32px,5vw,60px) 20px", background:S, opacity:v1?1:0, transform:v1?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div ref={yieldsRef} style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:28, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Current yields</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
            {[{icon:"🏦",label:"Naira savings",rate:"19% APY",sub:"Withdraw anytime",c:A},{icon:"📋",label:"Treasury bills",rate:"22% APY",sub:"Government-backed",c:"#00FF88"},{icon:"🪙",label:"Stablecoin",rate:"8% APY",sub:"USDT & USDC",c:"#FFD400"}].map(y => (
              <div key={y.label} className="pcard" style={{ padding:28, textAlign:"center", borderColor:`${y.c}20` }}>
                <div style={{ fontSize:32, marginBottom:14 }}>{y.icon}</div>
                <div style={{ fontSize:28, fontWeight:900, marginBottom:4, color:y.c, opacity:vis?1:.3, transition:"opacity 1s ease" }}>{y.rate}</div>
                <div style={{ fontWeight:700, color:"#fff", marginBottom:4 }}>{y.label}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.35)" }}>{y.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={s2 as any} id="stories" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v2?1:0, transform:v2?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Real stories</p>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Africans growing their savings</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14 }}>
            {STORIES.map((s, i) => (
              <article key={i} className="pcard" style={{ padding:24, cursor:"pointer", borderColor:active===i?`${A}40`:`${A}10`, background:active===i?`${A}07`:"rgba(168,85,247,.02)" }} onClick={() => setActive(i)}>
                <div style={{ fontSize:28, marginBottom:14 }}>{s.emoji}</div>
                <h3 style={{ fontWeight:900, color:"#fff", marginBottom:2 }}>{s.name}</h3>
                <div style={{ fontSize:12, marginBottom:14, color:`${A}80` }}>{s.city}</div>
                <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,.55)" }}>{s.story}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={s3 as any} style={{ padding:"clamp(48px,6vw,80px) 20px", background:S, opacity:v3?1:0, transform:v3?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Features</p>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Everything about growing your money, simply.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:14 }}>
            {FEATURES.map(f => (
              <div key={f.label} className="pcard" style={{ padding:28, display:"flex", gap:16 }}>
                <div style={{ width:40, height:40, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:`${A}12`, border:`1px solid ${A}22` }}>
                  <f.icon style={{ width:18, height:18, color:A }}/>
                </div>
                <div>
                  <h3 style={{ fontWeight:900, color:"#fff", marginBottom:6 }}>{f.label}</h3>
                  <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,.45)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={s4 as any} style={{ padding:"clamp(48px,6vw,80px) 20px", textAlign:"center", borderTop:`1px solid ${A}10`, opacity:v4?1:0, transform:v4?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, color:"#fff", marginBottom:12, lineHeight:1.1 }}>Your naira should work<br/>as hard as you do.</h2>
          <p style={{ color:"rgba(255,255,255,.45)", marginBottom:32 }}>Open DunaRald in minutes. Start earning from your first deposit.</p>
          <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"12px 24px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", textDecoration:"none" }}>← All RALD products</Link>
        </div>
      </section>

      <footer style={{ padding:"clamp(32px,5vw,64px) 20px 24px", background:"#010508", borderTop:"1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:32, marginBottom:40, justifyContent:"space-between" }}>
            <div style={{ minWidth:200 }}>
              <img src="/rald-wordmark.png" alt="RALD" style={{ height:18, filter:"brightness(0) invert(1)", marginBottom:12 }}/>
              <p style={{ fontSize:12, color:"rgba(255,255,255,.28)", lineHeight:1.7 }}>Africa's Digital Operating System</p>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:40 }}>
              <div>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,.22)", marginBottom:12 }}>Products</p>
                {FOOTER_PRODUCTS.slice(0,6).map(([l,h]) => <div key={l} style={{ marginBottom:8 }}><Link href={h} style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}>{l}</Link></div>)}
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,.22)", marginBottom:12 }}>More</p>
                {FOOTER_PRODUCTS.slice(6).map(([l,h]) => <div key={l} style={{ marginBottom:8 }}><Link href={h} style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}>{l}</Link></div>)}
                {[["Developers","/developers"],["Status","/status"],["Privacy","/privacy"]].map(([l,h]) => <div key={l} style={{ marginBottom:8 }}><Link href={h} style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}>{l}</Link></div>)}
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.04)", paddingTop:20, display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:8 }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.18)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.18)" }}>Made in Africa 🌍</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
