import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown, Store, Users, BarChart3, Wallet, Menu, X } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#00FF88", BG = "#030F07", S = "#040F08";

const STORIES = [
  { emoji:"🛍️", name:"Bimpe's boutique", city:"Lagos", story:"She ran her boutique from WhatsApp. Tracking orders in a notebook. After Loop Business, she has a real storefront, auto receipts, and a dashboard showing her best sellers every week." },
  { emoji:"🏗️", name:"Chukwuma's hardware store", city:"Onitsha", story:"He added 400 SKUs to Loop Business in one afternoon using his existing spreadsheet. Customers scan QR to pay. He knows his stock level and revenue in real time." },
  { emoji:"🍕", name:"Amaka's restaurant", city:"Abuja", story:"She takes orders on Loop, customers pay with PayRald. Every night she sees exactly which dishes sold, total revenue, and outstanding orders — on her phone, from home." },
];

const FEATURES = [
  { icon:Store, label:"Online store in 10 minutes", desc:"Add your products, set prices, share your link. Your store is live before your customers finish their tea." },
  { icon:Wallet, label:"Payments through PayRald", desc:"Every payment goes through PayRald's smart routing. Your money arrives in your Loop wallet instantly." },
  { icon:Users, label:"Know your best customers", desc:"See who buys most, who hasn't ordered in a while, who spends the most. Built-in CRM, zero setup." },
  { icon:BarChart3, label:"Daily dashboard on your phone", desc:"Revenue today, this week, this month. Top products. Pending orders. All on one screen, always updated." },
];

function useReveal(t = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, [t]);
  return [ref, v] as const;
}

const FOOTER_PRODUCTS = [["RALD ALIA","/alia"],["PayRald","/payrald"],["Loop Business","/loop"],["Loop Messenger","/messenger"],["RALD Elimu","/elimu"],["RALD Mail","/raldmail"],["Loop Dispatch","/dispatch"],["Loop Voice","/voice"],["Raldtics","/raldtics"],["DunaRald","/dunarald"],["GitRald","/gitrald"]];

export default function LoopBusiness() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0), [nav, setNav] = useState(false);
  const [s1, v1] = useReveal(), [s2, v2] = useReveal(), [s3, v3] = useReveal(), [s4, v4] = useReveal();

  useSEO({ title:"Loop Business — Sell Online, Get Paid, Know Your Numbers | RALD.cloud", description:"Loop Business gives African entrepreneurs a complete business platform — online store, smart payments, customer CRM and daily revenue dashboards. Works on any phone. Start in 10 minutes.", url:"https://rald.cloud/loop", themeColor:A, product:{ name:"Loop Business", applicationCategory:"BusinessApplication", operatingSystem:"Web, Android, iOS" } });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);

  return (
    <div style={{ background:BG, color:"#E8EDF3", minHeight:"100vh" }}>
      <style>{`@keyframes lup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes lp{0%,100%{opacity:.35}50%{opacity:1}}.lgrd{background:linear-gradient(135deg,#00FF88,#0066FF);-webkit-background-clip:text;background-clip:text;color:transparent}.lcard{background:rgba(0,255,136,.04);border:1px solid rgba(0,255,136,.1);border-radius:16px;transition:all .25s}.lcard:hover{background:rgba(0,255,136,.08);border-color:rgba(0,255,136,.28);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,255,136,.07)}.navlnk{color:rgba(255,255,255,.35);transition:color .18s;text-decoration:none;font-size:13px}.navlnk:hover{color:rgba(255,255,255,.8)}`}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(20px,5vw,40px)", background:sc?`${BG}F2`:"transparent", backdropFilter:sc?"blur(20px)":"none", borderBottom:sc?`1px solid ${A}12`:"1px solid transparent", transition:"all .3s" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:20, filter:"brightness(0) invert(1)" }}/></Link>
        <div className="hidden md:flex" style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:999, background:`${A}10`, border:`1px solid ${A}20` }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"lp 2s ease-in-out infinite" }}/><span style={{ fontSize:12, fontWeight:700, color:A }}>Loop Business</span>
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

      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 20px 60px", position:"relative", overflow:"hidden", animation:"lup .7s ease forwards" }}>
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:`radial-gradient(circle,${A}06 0%,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, marginBottom:32, background:`${A}12`, border:`1px solid ${A}30`, color:A }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"lp 2s ease-in-out infinite" }}/><span style={{ fontSize:12, fontWeight:700 }}>Commerce Layer · RALD OS</span>
        </div>
        <img src="/loop-business-wordmark.png" alt="Loop Business" style={{ height:52, maxWidth:240, objectFit:"contain", marginBottom:28, filter:`drop-shadow(0 0 24px ${A}35)` }}/>
        <h1 style={{ fontSize:"clamp(38px,7vw,80px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-0.03em", maxWidth:700, margin:"0 auto 20px" }}>
          Run your business<br /><span className="lgrd">from your phone.</span>
        </h1>
        <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.48)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.72 }}>
          Online store. Smart payments. Customer tracking. Daily dashboards. Everything an African entrepreneur needs — in one app, ready in 10 minutes.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
          <Link href="/payrald" style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 26px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.7)", textDecoration:"none" }}>How payments work</Link>
        </div>
        <a href="#stories" style={{ marginTop:56, display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:"rgba(255,255,255,.2)", textDecoration:"none" }}>
          <span style={{ fontSize:11 }}>scroll</span><ChevronDown style={{ width:16, height:16 }}/>
        </a>
      </section>

      <section ref={s1 as any} style={{ padding:"clamp(32px,5vw,60px) 20px", background:S, opacity:v1?1:0, transform:v1?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:12 }}>
          {[{v:"10 min",l:"Setup to first sale"},{v:"400+",l:"SKUs supported"},{v:"₦0",l:"Monthly fee to start"},{v:"7 days",l:"Money settlement"}].map(m => (
            <div key={m.l} className="lcard" style={{ padding:20, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:900, marginBottom:4, color:A }}>{m.v}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.4)" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={s2 as any} id="stories" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v2?1:0, transform:v2?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Real businesses</p>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>African entrepreneurs who made the switch</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14 }}>
            {STORIES.map((s, i) => (
              <article key={i} className="lcard" style={{ padding:24, cursor:"pointer", borderColor:active===i?`${A}40`:`${A}10`, background:active===i?`${A}07`:"rgba(0,255,136,.02)" }} onClick={() => setActive(i)}>
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
          <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Everything in one place</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:14 }}>
            {FEATURES.map(f => (
              <div key={f.label} className="lcard" style={{ padding:28, display:"flex", gap:16 }}>
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
          <img src="/loop-business-wordmark.png" alt="Loop Business" style={{ height:38, objectFit:"contain", margin:"0 auto 24px" }}/>
          <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, color:"#fff", marginBottom:12, lineHeight:1.1 }}>Your business. Your phone.<br/>Your control.</h2>
          <p style={{ color:"rgba(255,255,255,.45)", marginBottom:32 }}>Free to start. First sale takes less than 10 minutes.</p>
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
