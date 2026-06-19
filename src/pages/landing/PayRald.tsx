import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Zap, RefreshCw, ShieldCheck, Smartphone, Menu, X } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#0066FF", BG = "#020510", S = "#030714";

const STORIES = [
  { emoji:"🛒", name:"Online store", city:"Lagos", story:"Her customer's card failed at checkout. PayRald instantly switched to a different gateway. The sale went through. She never even knew there was an issue." },
  { emoji:"🏪", name:"Market seller", city:"Aba", story:"He was unbanked until PayRald. Now he receives ₦40,000 a day in his PayRald wallet. He pays his suppliers from the same wallet. Zero bank fees." },
  { emoji:"🚀", name:"Startup founder", city:"Nairobi", story:"He added PayRald to his app in one afternoon. One API key. The payment page worked in 20 minutes. His first transaction came in an hour later." },
];

const FEATURES = [
  { icon:Zap, label:"Finds the gateway that works", desc:"PayRald checks Paystack, Flutterwave and 8 more gateways in real-time — and picks whichever has the highest success rate. Every transaction." },
  { icon:RefreshCw, label:"Auto-retries on failure", desc:"If a payment fails, we retry with the next best gateway automatically. Your customer doesn't see the failure. They just pay." },
  { icon:ShieldCheck, label:"Fraud caught before it hits you", desc:"AI trained on 50M+ Nigerian transactions. Blocks fraud before it reaches your account. Sub-0.1% fraud rate." },
  { icon:Smartphone, label:"USSD for customers without cards", desc:"Not everyone has a debit card. USSD and mobile money let all Nigerians pay — card or not." },
];

function useReveal(t = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, [t]);
  return [ref, v] as const;
}

const NAV_LINKS = [["Products","/products"],["Developers","/developers"],["Status","/status"]];
const FOOTER_PRODUCTS = [["RALD ALIA","/alia"],["PayRald","/payrald"],["Loop Business","/loop"],["Loop Messenger","/messenger"],["RALD Elimu","/elimu"],["RALD Mail","/raldmail"],["Loop Dispatch","/dispatch"],["Loop Voice","/voice"],["Raldtics","/raldtics"],["DunaRald","/dunarald"],["GitRald","/gitrald"]];

export default function PayRald() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0), [nav, setNav] = useState(false);
  const [s1, v1] = useReveal(), [s2, v2] = useReveal(), [s3, v3] = useReveal(), [s4, v4] = useReveal();

  useSEO({ title:"PayRald — Payments That Work Every Time | RALD.cloud", description:"PayRald is Africa's smartest payment infrastructure. Send, receive, and process money instantly — with automatic gateway switching, fraud detection, and USSD support for every Nigerian.", url:"https://rald.cloud/payrald", themeColor:A, product:{ name:"PayRald", applicationCategory:"FinanceApplication", operatingSystem:"Web, Android, iOS", offers:{ price:"0", priceCurrency:"NGN" } } });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);

  return (
    <div style={{ background:BG, color:"#E8EDF3", minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <style>{`@keyframes pup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes pp{0%,100%{opacity:.35}50%{opacity:1}}.pgrd{background:linear-gradient(135deg,#0066FF,#00E5FF);-webkit-background-clip:text;background-clip:text;color:transparent}.pcard{background:rgba(0,102,255,.04);border:1px solid rgba(0,102,255,.1);border-radius:16px;transition:all .25s}.pcard:hover{background:rgba(0,102,255,.08);border-color:rgba(0,102,255,.28);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,102,255,.08)}.pcode{font-family:ui-monospace,monospace;font-size:12px;line-height:1.8;color:#8EB4FF;white-space:pre}.navlnk{color:rgba(255,255,255,.35);transition:color .18s;text-decoration:none;font-size:13px}.navlnk:hover{color:rgba(255,255,255,.8)}`}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(20px,5vw,40px)", background:sc?`${BG}F2`:"transparent", backdropFilter:sc?"blur(20px)":"none", borderBottom:sc?`1px solid ${A}12`:"1px solid transparent", transition:"all .3s" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:20, filter:"brightness(0) invert(1)" }}/></Link>
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:999, background:`${A}10`, border:`1px solid ${A}20` }} className="hidden md:flex">
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"pp 2s ease-in-out infinite" }}/>
          <span style={{ fontSize:12, fontWeight:700, color:A }}>PayRald</span>
        </div>
        <div className="hidden md:flex" style={{ display:"flex", gap:24 }}>
          {NAV_LINKS.map(([l,h]) => <Link key={l} href={h} className="navlnk">{l}</Link>)}
        </div>
        <button onClick={() => setNav(!nav)} style={{ background:"none", border:"none", color:A, cursor:"pointer", padding:8 }} className="md:hidden">
          {nav ? <X style={{width:20,height:20}}/> : <Menu style={{width:20,height:20}}/>}
        </button>
      </nav>
      {nav && <div style={{ position:"fixed", inset:0, zIndex:40, background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
        {NAV_LINKS.map(([l,h]) => <Link key={l} href={h} style={{ color:"rgba(255,255,255,.7)", fontSize:20, fontWeight:900, textDecoration:"none" }} onClick={() => setNav(false)}>{l}</Link>)}
        <Link href="/" style={{ color:"rgba(255,255,255,.4)", fontSize:14, textDecoration:"none" }} onClick={() => setNav(false)}>← All products</Link>
      </div>}

      <main>
        <section aria-label="Hero" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 20px 60px", position:"relative", overflow:"hidden", animation:"pup .7s ease forwards" }}>
          <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:`radial-gradient(circle,${A}06 0%,transparent 65%)`, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:"20%", right:"10%", width:280, height:280, background:`radial-gradient(circle,rgba(0,229,255,.05) 0%,transparent 65%)`, pointerEvents:"none" }}/>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, marginBottom:32, background:`${A}12`, border:`1px solid ${A}30`, color:A }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:A, display:"inline-block", animation:"pp 2s ease-in-out infinite" }}/>
            <span style={{ fontSize:12, fontWeight:700 }}>Payments Layer · RALD OS</span>
          </div>
          <img src="/payrald-wordmark.png" alt="PayRald" style={{ height:52, width:"auto", maxWidth:240, objectFit:"contain", marginBottom:28, filter:`drop-shadow(0 0 24px ${A}35)` }}/>
          <h1 style={{ fontSize:"clamp(38px,7vw,80px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-0.03em", maxWidth:700, margin:"0 auto 20px" }}>
            Payments that work<br /><span className="pgrd">every single time.</span>
          </h1>
          <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.48)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.72 }}>
            Stop losing sales to failed payments. PayRald automatically picks whichever gateway has the best success rate — and switches instantly if it fails.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <Link href="/developers" style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 26px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.7)", textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={(e:any) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={(e:any) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color="rgba(255,255,255,.7)"; }}>
              Read the docs <ArrowRight style={{width:14,height:14}}/>
            </Link>
          </div>
          <a href="#numbers" style={{ marginTop:56, display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:"rgba(255,255,255,.2)", textDecoration:"none" }}>
            <span style={{ fontSize:11 }}>scroll</span><ChevronDown style={{ width:16, height:16, animation:"pup 1.5s ease-in-out infinite alternate" }}/>
          </a>
        </section>

        <section ref={s1 as any} id="numbers" aria-label="Statistics" style={{ padding:"clamp(32px,5vw,64px) 20px", background:S, opacity:v1?1:0, transform:v1?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 }}>
            {[{v:"97.2%",l:"Payment success rate"},{v:"<200ms",l:"Gateway decision"},{v:"10+",l:"Gateway integrations"},{v:"₦0 setup",l:"Free to start"}].map(m => (
              <div key={m.l} className="pcard" style={{ padding:"20px", textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:900, marginBottom:4, color:A }}>{m.v}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.4)" }}>{m.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section ref={s2 as any} aria-label="How PayRald works" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v2?1:0, transform:v2?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:48, alignItems:"center" }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>How it works</p>
              <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", marginBottom:16, lineHeight:1.2 }}>Smart routing that saves every sale</h2>
              <p style={{ lineHeight:1.75, color:"rgba(255,255,255,.45)", marginBottom:20 }}>Before each payment, PayRald checks which gateway has the highest real-time success rate. It routes there — invisible to your customer.</p>
              {["Paystack, Flutterwave, Interswitch + 7 more","Real-time success-rate scoring per transaction","Auto-retry before showing any error to customer"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"rgba(255,255,255,.6)", marginBottom:10 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", flexShrink:0, background:A }}/>{t}
                </div>
              ))}
            </div>
            <div style={{ borderRadius:18, padding:24, background:`rgba(0,102,255,.06)`, border:`1px solid ${A}20` }}>
              <div style={{ fontSize:11, fontWeight:700, marginBottom:16, color:`${A}80` }}>Routing decision — live</div>
              {[{name:"Paystack",score:97,active:true},{name:"Flutterwave",score:91,active:false},{name:"Interswitch",score:88,active:false}].map(g => (
                <div key={g.name} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6, color:"rgba(255,255,255,.5)" }}>
                    <span style={{ fontWeight:700, color:g.active?A:"inherit" }}>{g.name}{g.active?" ← selected":""}</span>
                    <span style={{ color:g.active?A:"inherit" }}>{g.score}%</span>
                  </div>
                  <div style={{ height:6, borderRadius:3, background:"rgba(255,255,255,.06)" }}>
                    <div style={{ height:"100%", borderRadius:3, width:`${g.score}%`, background:g.active?A:"rgba(255,255,255,.15)", transition:"width 1s ease" }}/>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:16, paddingTop:12, textAlign:"center", fontSize:12, fontWeight:700, color:"#00FF88", borderTop:`1px solid ${A}15` }}>✅ Transaction routed in 187ms</div>
            </div>
          </div>
        </section>

        <section ref={s3 as any} aria-label="Code example" style={{ padding:"clamp(48px,6vw,80px) 20px", background:S, opacity:v3?1:0, transform:v3?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
            <p style={{ fontSize:11, fontWeight:700, marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>For developers</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", marginBottom:32, lineHeight:1.2 }}>Add payments in one afternoon</h2>
            <div style={{ borderRadius:18, overflow:"hidden", textAlign:"left", border:`1px solid ${A}20`, background:"rgba(0,0,0,.7)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 20px", background:"rgba(255,255,255,.04)", borderBottom:`1px solid ${A}15` }}>
                <span style={{ width:12, height:12, borderRadius:"50%", background:"#FF5F57" }}/><span style={{ width:12, height:12, borderRadius:"50%", background:"#FEBC2E" }}/><span style={{ width:12, height:12, borderRadius:"50%", background:"#28C840" }}/>
                <span style={{ marginLeft:8, fontSize:11, color:"rgba(255,255,255,.3)" }}>Node.js · payrald</span>
              </div>
              <pre className="pcode" style={{ padding:24 }}>{`import PayRald from "@rald/payrald";
const pay = new PayRald({ apiKey: process.env.PAYRALD_KEY });

const charge = await pay.charge({
  amount:   12500,         // ₦125.00
  currency: "NGN",
  customer: { email: "adaeze@example.com" },
  meta:     { orderId: "ORD-001" }
});

// ✅ Routed to Paystack (97% success) in 187ms
// ✅ Charged successfully`}</pre>
            </div>
          </div>
        </section>

        <section ref={s4 as any} aria-label="Stories and features" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v4?1:0, transform:v4?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Real businesses</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>How Africans use PayRald</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14, marginBottom:56 }}>
              {STORIES.map((s, i) => (
                <article key={i} className="pcard" style={{ padding:24, cursor:"pointer", borderColor:active===i?`${A}40`:`${A}10`, background:active===i?`${A}07`:"rgba(0,102,255,.02)" }} onClick={() => setActive(i)}>
                  <div style={{ fontSize:28, marginBottom:14 }}>{s.emoji}</div>
                  <h3 style={{ fontWeight:900, color:"#fff", marginBottom:2 }}>{s.name}</h3>
                  <div style={{ fontSize:12, marginBottom:14, color:`${A}80` }}>{s.city}</div>
                  <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,.55)" }}>{s.story}</p>
                </article>
              ))}
            </div>
            <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Why PayRald</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Built for how Africa pays</h2>
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

        <section style={{ padding:"clamp(48px,6vw,80px) 20px", textAlign:"center", borderTop:`1px solid ${A}10` }}>
          <div style={{ maxWidth:480, margin:"0 auto" }}>
            <img src="/payrald-wordmark.png" alt="PayRald" style={{ height:38, objectFit:"contain", margin:"0 auto 24px" }}/>
            <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, color:"#fff", marginBottom:12, lineHeight:1.1 }}>Stop losing sales<br />to failed payments.</h2>
            <p style={{ color:"rgba(255,255,255,.45)", marginBottom:32 }}>Free API key. No credit card. Your first payment in under an hour.</p>
            <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"12px 24px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", textDecoration:"none" }}>← All RALD products</Link>
          </div>
        </section>
      </main>

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
                {FOOTER_PRODUCTS.slice(0,6).map(([l,h]) => (
                  <div key={l} style={{ marginBottom:8 }}><Link href={h} style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}
                    onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>{l}</Link></div>
                ))}
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,.22)", marginBottom:12 }}>More</p>
                {FOOTER_PRODUCTS.slice(6).map(([l,h]) => (
                  <div key={l} style={{ marginBottom:8 }}><Link href={h} style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}
                    onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>{l}</Link></div>
                ))}
                {[["Developers","/developers"],["Status","/status"],["Privacy","/privacy"]].map(([l,h]) => (
                  <div key={l} style={{ marginBottom:8 }}><Link href={h} style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}
                    onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>{l}</Link></div>
                ))}
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
