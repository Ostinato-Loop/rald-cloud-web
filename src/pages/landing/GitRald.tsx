import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown, GitBranch, Zap, Globe, Shield, Menu, X } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#FF2E2E", BG = "#0F0202", S = "#130303";

const STORIES = [
  { emoji:"⚡", name:"Lagos startup", city:"Lagos", story:"Their team pushes code to GitRald. It deploys to production automatically. From commit to live in 4 minutes — same speed they used to get from GitHub but with Lagos-based servers." },
  { emoji:"🔒", name:"HealthTech team", city:"Nairobi", story:"Patient data stays in Africa. Their code is hosted on GitRald's Nairobi server. NDPR-compliant by default. Their compliance team finally relaxed." },
  { emoji:"👨‍💻", name:"Solo developer", city:"Accra", story:"He works on spotty internet. GitRald's local servers mean his git push goes through even when GitHub times out. 3× faster push speeds from Accra." },
];

const FEATURES = [
  { icon:GitBranch, label:"Full Git support", desc:"Push, pull, fork, branch, PR, merge — everything you know from Git, all here." },
  { icon:Zap, label:"Auto deploy on push", desc:"Every code push can trigger tests and deployment automatically. No manual steps." },
  { icon:Globe, label:"Servers in Africa", desc:"Lagos and Nairobi infrastructure. Your code travels less distance. Faster for African teams." },
  { icon:Shield, label:"Private by default", desc:"Your code is yours. Private repos, deploy keys, team permissions — enterprise-grade security." },
];

function useReveal(t = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, [t]);
  return [ref, v] as const;
}

const FOOTER_PRODUCTS = [["RALD ALIA","/alia"],["PayRald","/payrald"],["Loop Business","/loop"],["Loop Messenger","/messenger"],["RALD Elimu","/elimu"],["RALD Mail","/raldmail"],["Loop Dispatch","/dispatch"],["Loop Voice","/voice"],["Raldtics","/raldtics"],["DunaRald","/dunarald"],["GitRald","/gitrald"]];

export default function GitRald() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0), [nav, setNav] = useState(false);
  const [s1, v1] = useReveal(), [s2, v2] = useReveal(), [s3, v3] = useReveal(), [s4, v4] = useReveal();

  useSEO({ title:"GitRald — Code on African Infrastructure | RALD.cloud", description:"GitRald is a Git platform hosted on servers in Lagos and Nairobi. 3× faster push speeds from Africa. Auto-deploy on push. Private repos. NDPR-compliant. Built for African dev teams.", url:"https://rald.cloud/gitrald", themeColor:A, product:{ name:"GitRald", applicationCategory:"DeveloperApplication", operatingSystem:"Web" } });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);

  return (
    <div style={{ background:BG, color:"#E8EDF3", minHeight:"100vh" }}>
      <style>{`@keyframes gup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes gp{0%,100%{opacity:.35}50%{opacity:1}}.ggrd{background:linear-gradient(135deg,#FF2E2E,#FF7A00);-webkit-background-clip:text;background-clip:text;color:transparent}.gcard{background:rgba(255,46,46,.04);border:1px solid rgba(255,46,46,.1);border-radius:16px;transition:all .25s}.gcard:hover{background:rgba(255,46,46,.08);border-color:rgba(255,46,46,.28);transform:translateY(-3px);box-shadow:0 12px 40px rgba(255,46,46,.07)}.gcode{font-family:ui-monospace,monospace;font-size:12px;line-height:1.8;color:#C8A0A0;white-space:pre}.navlnk{color:rgba(255,255,255,.35);transition:color .18s;text-decoration:none;font-size:13px}.navlnk:hover{color:rgba(255,255,255,.8)}`}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(20px,5vw,40px)", background:sc?`${BG}F2`:"transparent", backdropFilter:sc?"blur(20px)":"none", borderBottom:sc?`1px solid ${A}12`:"1px solid transparent", transition:"all .3s" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:20, filter:"brightness(0) invert(1)" }}/></Link>
        <div className="hidden md:flex" style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:999, background:`${A}10`, border:`1px solid ${A}20` }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"gp 2s ease-in-out infinite" }}/><span style={{ fontSize:12, fontWeight:700, color:A }}>GitRald</span>
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

      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 20px 60px", position:"relative", overflow:"hidden", animation:"gup .7s ease forwards" }}>
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:`radial-gradient(circle,${A}06 0%,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, marginBottom:32, background:`${A}12`, border:`1px solid ${A}30`, color:A }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:A, animation:"gp 2s ease-in-out infinite" }}/><span style={{ fontSize:12, fontWeight:700 }}>Developer Infra · RALD OS</span>
        </div>
        <div style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:900, marginBottom:16, color:A }}>GitRald</div>
        <h1 style={{ fontSize:"clamp(38px,7vw,80px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-0.03em", maxWidth:700, margin:"0 auto 20px" }}>
          Build African software<br/>on <span className="ggrd">African servers.</span>
        </h1>
        <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.48)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.72 }}>
          Store your code, run automated tests and deploy — all from infrastructure based in Lagos and Nairobi. 3× faster git push than international providers.
        </p>
        <Link href="/developers" style={{ padding:"13px 26px", borderRadius:999, fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.7)", textDecoration:"none" }}>API docs</Link>
        <a href="#terminal" style={{ marginTop:56, display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:"rgba(255,255,255,.2)", textDecoration:"none" }}>
          <span style={{ fontSize:11 }}>scroll</span><ChevronDown style={{ width:16, height:16 }}/>
        </a>
      </section>

      <section ref={s1 as any} id="terminal" style={{ padding:"clamp(32px,5vw,56px) 20px", background:S, opacity:v1?1:0, transform:v1?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ borderRadius:18, overflow:"hidden", border:`1px solid ${A}20`, background:"rgba(0,0,0,.8)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 20px", background:"rgba(255,255,255,.04)", borderBottom:`1px solid ${A}10` }}>
              <span style={{ width:12, height:12, borderRadius:"50%", background:"#FF5F57" }}/><span style={{ width:12, height:12, borderRadius:"50%", background:"#FEBC2E" }}/><span style={{ width:12, height:12, borderRadius:"50%", background:"#28C840" }}/>
              <span style={{ marginLeft:8, fontSize:11, color:"rgba(255,255,255,.3)" }}>terminal — gitrald.rald.cloud</span>
            </div>
            <pre className="gcode" style={{ padding:24 }}>{`$ git remote add origin git@gitrald.rald.cloud:team/app.git
$ git push origin main

Enumerating objects: 142, done.
Counting objects: 100% (142/142), done.
Writing objects: 100% (89/89), 2.44 MiB | 18.3 MB/s, done.

✅ Push complete in 0.9s
🚀 Deploy triggered
✅ Live in 3m 47s`}</pre>
          </div>
          <p style={{ textAlign:"center", fontSize:13, marginTop:16, color:"rgba(255,255,255,.3)" }}>18MB/s push speed from Lagos. GitHub averages 6MB/s from the same location.</p>
        </div>
      </section>

      <section ref={s2 as any} id="stories" style={{ padding:"clamp(48px,6vw,80px) 20px", opacity:v2?1:0, transform:v2?"none":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, textAlign:"center", marginBottom:8, letterSpacing:"0.14em", textTransform:"uppercase", color:A }}>Real teams</p>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Why African devs choose GitRald</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14 }}>
            {STORIES.map((s, i) => (
              <article key={i} className="gcard" style={{ padding:24, cursor:"pointer", borderColor:active===i?`${A}40`:`${A}10`, background:active===i?`${A}07`:"rgba(255,46,46,.02)" }} onClick={() => setActive(i)}>
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
          <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:40 }}>Everything a dev team needs</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:14 }}>
            {FEATURES.map(f => (
              <div key={f.label} className="gcard" style={{ padding:28, display:"flex", gap:16 }}>
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
          <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, color:"#fff", marginBottom:12, lineHeight:1.1 }}>Your code deserves<br/>infrastructure that understands Africa.</h2>
          <p style={{ color:"rgba(255,255,255,.45)", marginBottom:32 }}>Free for individuals and open-source. Team plans from ₦0.</p>
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
