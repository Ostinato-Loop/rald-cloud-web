import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, GitBranch, Zap, Shield, Globe } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A="#FF2E2E", BG="#0F0202", S="#130303";

const STORIES=[
  {emoji:"⚡",name:"Lagos startup",city:"Lagos",story:"Their team pushes code to GitRald. It deploys to production automatically. From commit to live in 4 minutes — same speed they used to get from GitHub but with Lagos-based servers."},
  {emoji:"🔒",name:"HealthTech team",city:"Nairobi",story:"Patient data stays in Africa. Their code is hosted on GitRald's Nairobi server. NDPR-compliant by default. Their compliance team finally relaxed."},
  {emoji:"👨‍💻",name:"Solo developer",city:"Accra",story:"He works on spotty internet. GitRald's local servers mean his git push goes through even when GitHub times out. 3× faster push speeds from Accra."},
];

const FEATURES=[
  {icon:GitBranch,label:"Full Git support",desc:"Push, pull, fork, branch, PR, merge — everything you know from Git, all here."},
  {icon:Zap,label:"Auto deploy on push",desc:"Every code push can trigger tests and deployment automatically. No manual steps."},
  {icon:Globe,label:"Servers in Africa",desc:"Lagos and Nairobi infrastructure. Your code travels less distance. Faster for African teams."},
  {icon:Shield,label:"Private by default",desc:"Your code is yours. Private repos, deploy keys, team permissions — enterprise-grade security."},
];

export default function GitRald(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
    useSEO({title:"GitRald — Code on African Infrastructure | RALD.cloud",description:"GitRald is a Git platform hosted on servers in Lagos and Nairobi. 3× faster push speeds from Africa. Auto-deploy on push. Private repos. NDPR-compliant. Built for African dev teams.",url:"https://rald.cloud/gitrald",themeColor:"#FF2E2E",product:{name:"GitRald",applicationCategory:"DeveloperApplication",operatingSystem:"Web"}});

  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3200);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes gup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gp{0%,100%{opacity:.4}50%{opacity:1}}
        .ggrd{background:linear-gradient(135deg,#FF2E2E,#FF7A00);-webkit-background-clip:text;background-clip:text;color:transparent}
        .gcard{background:rgba(255,46,46,.04);border:1px solid rgba(255,46,46,.1);border-radius:16px;transition:all .25s}
        .gcard:hover{background:rgba(255,46,46,.07);border-color:rgba(255,46,46,.22);transform:translateY(-2px)}
        .gcode{font-family:ui-monospace,monospace;font-size:12px;line-height:1.8;color:#C8A0A0}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://console.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Open GitRald →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"gup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"gp 2s ease-in-out infinite"}}/>
          Developer Infra · RALD OS
        </div>
        <div className="mb-5 text-3xl font-black" style={{color:A}}>GitRald</div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Build African software<br/>on <span className="ggrd">African servers.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          Store your code, run automated tests and deploy — all from infrastructure based in Lagos and Nairobi. 3× faster git push than international providers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://console.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 28px ${A}40`}}>
            Open GitRald free <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            API docs
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Terminal preview */}
      <section className="py-16 px-5" style={{background:S}}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{border:`1px solid ${A}20`,background:"rgba(0,0,0,.8)"}}>
            <div className="flex items-center gap-2 px-5 py-3" style={{background:"rgba(255,255,255,.04)",borderBottom:`1px solid ${A}10`}}>
              <span className="w-3 h-3 rounded-full" style={{background:"#FF5F57"}}/>
              <span className="w-3 h-3 rounded-full" style={{background:"#FEBC2E"}}/>
              <span className="w-3 h-3 rounded-full" style={{background:"#28C840"}}/>
              <span className="ml-2 text-xs" style={{color:"rgba(255,255,255,.3)"}}>terminal — gitrald.rald.cloud</span>
            </div>
            <pre className="gcode p-6">{`$ git remote add origin git@gitrald.rald.cloud:team/app.git
$ git push origin main

Enumerating objects: 142, done.
Counting objects: 100% (142/142), done.
Writing objects: 100% (89/89), 2.44 MiB | 18.3 MB/s, done.

✅ Push complete in 0.9s
🚀 Deploy triggered → https://app.rald.cloud
✅ Live in 3m 47s`}</pre>
          </div>
          <p className="text-center text-sm mt-5" style={{color:"rgba(255,255,255,.3)"}}>18MB/s push speed from Lagos. GitHub averages 6MB/s from the same location.</p>
        </div>
      </section>

      <section id="stories" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real teams</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Why African devs choose GitRald</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="gcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(255,46,46,.03)"}}>
                <div className="text-3xl mb-4">{s.emoji}</div>
                <div className="font-black text-white mb-0.5">{s.name}</div>
                <div className="text-xs mb-4" style={{color:`${A}80`}}>{s.city}</div>
                <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,.55)"}}>{s.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Features</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Everything a dev team needs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="gcard p-7 flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${A}12`,border:`1px solid ${A}22`}}>
                  <f.icon className="w-5 h-5" style={{color:A}}/>
                </div>
                <div>
                  <div className="font-black text-white mb-1">{f.label}</div>
                  <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,.45)"}}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-5 text-center" style={{borderTop:`1px solid ${A}10`}}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Your code deserves<br/>infrastructure that understands Africa.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Free for individuals and open-source projects. Team plans from ₦0.</p>
          <a href="https://console.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Open GitRald free <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </section>

      <footer className="py-8 px-5" style={{background:"#010508",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <img src="/rald-wordmark.png" alt="RALD" style={{height:18,filter:"brightness(0) invert(1)"}}/>
          <div className="flex gap-5 text-xs" style={{color:"rgba(255,255,255,.25)"}}>
            {[["Home","/"],["Developers","/developers"],["Privacy","/privacy"]].map(([l,h])=>(
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="text-xs" style={{color:"rgba(255,255,255,.2)"}}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
