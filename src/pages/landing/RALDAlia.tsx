import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Fingerprint, Shield, Globe, Zap, Menu, X } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#00E5FF", BG = "#020C10", S = "#050F14";

const STORIES = [
  { emoji:"🪪", name:"Chidi", city:"Abuja", story:"He verified once with his NIN. Now he uses Loop, PayRald and Messenger with the same ALIA — no re-registration, no re-upload. One identity, every RALD product." },
  { emoji:"🔒", name:"Fatima's business", city:"Kano", story:"She uses her ALIA alias (@fatima.rald) to receive payments. Customers send to her alias — they never need her bank details. Safe, fast, professional." },
  { emoji:"🌍", name:"Emeka, UK diaspora", city:"London → Lagos", story:"His RALD ALIA is verified for both Nigeria and UK. He sends money and accesses all RALD services with one login — same identity, wherever he is." },
];

const FEATURES = [
  { icon: Fingerprint, label:"One ID, all products", desc:"Register once. Your ALIA works across Loop, PayRald, Elimu, Messenger — no re-sign-up anywhere." },
  { icon: Shield, label:"BVN + NIN verified", desc:"Real-time government ID check. Your identity is confirmed, so others can trust you instantly." },
  { icon: Globe, label:"Your RALD alias (@you.rald)", desc:"Send to @chidi.rald instead of an account number. Simple. Safe. Works everywhere in RALD." },
  { icon: Zap, label:"Fraud protection built-in", desc:"If someone tries to use your identity, RALD blocks it — and alerts you immediately." },
];

function useReveal(t = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return [ref, v] as const;
}

const NAV_LINKS = [["Products","/products"],["Developers","/developers"],["Status","/status"]];
const FOOTER_PRODUCTS = [["RALD ALIA","/alia"],["PayRald","/payrald"],["Loop Business","/loop"],["Loop Messenger","/messenger"],["RALD Elimu","/elimu"],["RALD Mail","/raldmail"],["Loop Dispatch","/dispatch"],["Loop Voice","/voice"],["Raldtics","/raldtics"],["DunaRald","/dunarald"],["GitRald","/gitrald"]];

export default function RALDAlia() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0), [nav, setNav] = useState(false);
  const [s1, v1] = useReveal(), [s2, v2] = useReveal(), [s3, v3] = useReveal(), [s4, v4] = useReveal();

  useSEO({ title:"RALD ALIA — Your Digital Identity for Africa | RALD.cloud", description:"RALD ALIA is your single verified identity across every RALD product. Verify once with BVN or NIN. Use everywhere — PayRald, Loop, Messenger, Elimu — with one login and one alias.", url:"https://rald.cloud/alia", themeColor:A, product:{ name:"RALD ALIA", applicationCategory:"IdentityApplication", operatingSystem:"Web, Android, iOS" } });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);

  const navStyle = (sc: boolean) => ({ position:"fixed" as const, top:0, left:0, right:0, zIndex:50, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(20px,5vw,40px)", background: sc ? `${BG}F2` : "transparent", backdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? `1px solid ${A}12` : "1px solid transparent", transition:"all .3s" });

  return (
    <div style={{ background:BG, color:"#E8EDF3", minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <style>{`@keyframes aup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes ap{0%,100%{opacity:.35}50%{opacity:1}}.agrd{background:linear-gradient(135deg,#00E5FF,#A855F7);-webkit-background-clip:text;background-clip:text;color:transparent}.acard{background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.1);border-radius:16px;transition:all .25s}.acard:hover{background:rgba(0,229,255,.08);border-color:rgba(0,229,255,.28);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,229,255,.08)}.navlnk{color:rgba(255,255,255,.35);transition:color .18s;text-decoration:none;font-size:13px}.navlnk:hover{color:rgba(255,255,255,.8)}`}</style>

      <nav style={navStyle(sc)}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:20, filter:"brightness(0) invert(1)" }}/></Link>
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:999, background:`${A}10`, border:`1px solid ${A}20` }} className="hidden md:flex">
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"ap 2s ease-in-out infinite" }}/>
          <span style={{ fontSize:12, fontWeight:700, color:A }}>RALD ALIA</span>
        </div>
        <div className="hidden md:flex" style={{ display:"flex", gap:24, alignItems:"center" }}>
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
        <section aria-label="Hero" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 20px 60px", position:"relative", overflow:"hidden", animation:"aup .7s ease forwards" }}>
          <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:`radial-gradient(circle,${A}07 0%,transparent 65%)`, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:"20%", right:"15%", width:300, height:300, background:`radial-gradient(circle,rgba(168,85,247,.06) 0%,transparent 65%)`, pointerEvents:"none" }}/>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, marginBottom:32, background:`${A}12`, border:`1px solid ${A}30`, color:A }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:A, display:"inline-block", animation:"ap 2s ease-in-out infinite" }}/>
            <span style={{ fontSize:12, fontWeight:700 }}>Identity Layer · RALD OS</span>
          </div>
          <img src="/alia-wordmark.png" alt="RALD ALIA" style={{ height:52, width:"auto", maxWidth:240, objectFit:"contain", marginBottom:28, filter:`drop-shadow(0 0 24px ${A}35)` }}/>
          <h1 style={{ fontSize:"clamp(38px,7vw,80px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-0.03em", maxWidth:680, margin:"0 auto 20px" }}>
            One identity.<br /><span className="agrd">Every RALD product.</span>
          </h1>
          <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.48)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.72 }}>
            Verify once with your BVN or NIN. Get a RALD alias — like @chidi.rald. Use it to pay, chat, learn and sell across the whole RALD ecosystem.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <Link href="/payrald" style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 26px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.7)", textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={(e:any) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={(e:any) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color="rgba(255,255,255,.7)"; }}>
              See PayRald <ArrowRight style={{width:14,height:14}}/>
            </Link>
          </div>
          <a href="#how" style={{ marginTop:56, display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:"rgba(255,255,255,.2)", textDecoration:"none" }}>
            <span style={{ fontSize:11 }}>scroll</span><ChevronDown style={{ width:16, height:16, animation:"aup 1.5s ease-in-out infinite alternate" }}/>
          </a>
        </section>

        <section ref={s1 as any} id="how" aria-label="How RALD ALIA works" style={{ padding:"clamp(48px,6vw,80px) 20px", background:S, opacity:v1?1:0, transform:v1?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:40, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>How it works</p>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:8 }}>
              {[{icon:"📱",step:"Enter your phone",sub:"Verified via SMS"},{icon:"🪪",step:"Link BVN or NIN",sub:"Real-time gov ID check"},{icon:"🤳",step:"Face match",sub:"Selfie vs ID photo"},{icon:"✨",step:"ALIA created",sub:"Live across RALD"}].map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", width:120 }}>
                    <div style={{ width:48, height:48, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:10, background:`${A}12`, border:`1px solid ${A}25` }}>{s.icon}</div>
                    <div style={{ fontWeight:900, color:"#fff", fontSize:13, marginBottom:4 }}>{s.step}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,.35)" }}>{s.sub}</div>
                  </div>
                  {i < 3 && <div style={{ width:32, height:1, background:`${A}25`, flexShrink:0 }}/>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={s2 as any} aria-label="Alias demonstration" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v2?1:0, transform:v2?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:48, alignItems:"center" }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Your RALD alias</p>
              <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", marginBottom:16, lineHeight:1.2 }}>No more sharing bank account numbers</h2>
              <p style={{ lineHeight:1.75, color:"rgba(255,255,255,.45)", marginBottom:24 }}>Your RALD alias is like an email address — but for money, identity and everything in RALD.</p>
              {["Pay someone without asking for account number","Receive money from anyone on RALD","Works for chat, payments, commerce — all in one"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"rgba(255,255,255,.6)", marginBottom:10 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", flexShrink:0, background:A }}/>{t}
                </div>
              ))}
            </div>
            <div style={{ borderRadius:20, padding:28, background:`${A}08`, border:`1px solid ${A}20`, maxWidth:300, margin:"0 auto", width:"100%" }}>
              <div style={{ fontSize:11, marginBottom:20, fontWeight:700, color:`${A}70` }}>Your RALD identity card</div>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                <div style={{ width:52, height:52, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, background:`${A}15`, border:`1px solid ${A}25` }}>🤳</div>
                <div>
                  <div style={{ fontWeight:900, color:"#fff", fontSize:17 }}>@chidi.rald</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.4)" }}>Chidi Okafor · Lagos NG</div>
                </div>
              </div>
              {[{label:"Identity verified",val:"✅ BVN + NIN",c:"#00FF88"},{label:"Trust score",val:"94 / 100",c:A},{label:"Products active",val:"6 / 11",c:"#FFD400"}].map(r => (
                <div key={r.label} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", fontSize:13, borderTop:"1px solid rgba(255,255,255,.06)" }}>
                  <span style={{ color:"rgba(255,255,255,.4)" }}>{r.label}</span>
                  <span style={{ fontWeight:700, color:r.c }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={s3 as any} aria-label="User stories" style={{ padding:"clamp(48px,6vw,80px) 20px", background:S, opacity:v3?1:0, transform:v3?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Real people</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>How Africans use RALD ALIA</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14 }}>
              {STORIES.map((s, i) => (
                <article key={i} className="acard" style={{ padding:24, cursor:"pointer", borderColor:active===i?`${A}40`:`${A}10`, background:active===i?`${A}07`:"rgba(0,229,255,.02)" }} onClick={() => setActive(i)}>
                  <div style={{ fontSize:28, marginBottom:14 }}>{s.emoji}</div>
                  <h3 style={{ fontWeight:900, color:"#fff", marginBottom:2 }}>{s.name}</h3>
                  <div style={{ fontSize:12, marginBottom:14, color:`${A}80` }}>{s.city}</div>
                  <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,.55)" }}>{s.story}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={s4 as any} aria-label="Features" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v4?1:0, transform:v4?"none":"translateY(20px)", transition:"all .6s ease" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>What RALD ALIA does</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Your identity, protecting you everywhere</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:14 }}>
              {FEATURES.map(f => (
                <div key={f.label} className="acard" style={{ padding:28, display:"flex", gap:16 }}>
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

        <section aria-label="CTA" style={{ padding:"clamp(48px,6vw,80px) 20px", textAlign:"center", background:S, borderTop:`1px solid ${A}10` }}>
          <div style={{ maxWidth:480, margin:"0 auto" }}>
            <img src="/alia-wordmark.png" alt="RALD ALIA" style={{ height:36, objectFit:"contain", margin:"0 auto 24px" }}/>
            <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, color:"#fff", marginBottom:12, lineHeight:1.1 }}>One identity.<br />Endless possibilities.</h2>
            <p style={{ color:"rgba(255,255,255,.45)", marginBottom:32 }}>Free to create. Works everywhere in RALD. Takes 2 minutes.</p>
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
                <div style={{ marginBottom:8 }}><Link href="/developers" style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}
                  onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>Developers</Link></div>
                <div style={{ marginBottom:8 }}><Link href="/status" style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}
                  onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>Status</Link></div>
                <div style={{ marginBottom:8 }}><Link href="/privacy" style={{ fontSize:12, color:"rgba(255,255,255,.32)", textDecoration:"none" }}
                  onMouseEnter={(e:any)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e:any)=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>Privacy</Link></div>
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
