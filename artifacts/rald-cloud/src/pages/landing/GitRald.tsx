import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, GitBranch, Cpu, Shield, Zap, Globe, Code2, ChevronDown } from "lucide-react";

const A="#FF2E2E",BG="#0F0202",S="#130303";

const CAPS=[
  {icon:GitBranch,title:"Git Hosting",color:A,desc:"Unlimited private and public repos. Full Git support — push, pull, fork, PR, review."},
  {icon:Zap,title:"CI/CD Pipelines",color:"#FFD400",desc:"Run tests, build and deploy on every push. YAML-based pipelines, parallel jobs, caching."},
  {icon:Shield,title:"Code Review",color:"#00FF88",desc:"PR reviews, inline comments, approval gates and protected branches — team-grade workflow."},
  {icon:Cpu,title:"GitRald Actions",color:"#00BFFF",desc:"Run custom automation — serverless jobs triggered by any repo event."},
  {icon:Globe,title:"African Infra",color:"#A855F7",desc:"Git servers hosted in Lagos and Nairobi. Push speeds 3× faster from Africa than GitHub."},
  {icon:Code2,title:"GitRald API",color:"#FF7A00",desc:"REST and GraphQL. Webhooks, deploy keys, OAuth apps and full automation support."},
];
const STEPS=[
  {icon:"📁",label:"Create repo",detail:"Public or private, org or personal"},
  {icon:"🔀",label:"Push & branch",detail:"Full Git workflow, offline-first"},
  {icon:"⚡",label:"CI/CD runs",detail:"Parallel jobs, 4× faster builds"},
  {icon:"🚀",label:"Auto-deploy",detail:"To RALD cloud or any target"},
];

function Orb({on}:{on:boolean}){
  return(
    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",overflow:"visible"}}>
      <defs>
        <radialGradient id="gg"><stop offset="0%" stopColor={A} stopOpacity=".15"/><stop offset="100%" stopColor={A} stopOpacity="0"/></radialGradient>
        <filter id="gf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[50,65,80].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={A} strokeWidth=".5" strokeOpacity={on?.2-i*.05:.06}/>)}
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeWidth="1" strokeDasharray="6 14" strokeOpacity=".3" style={{transformOrigin:"100px 100px",animation:on?"gspin 10s linear infinite":"none"}}/>
      {on&&<circle cx="170" cy="100" r="3.5" fill={A} filter="url(#gf)" style={{transformOrigin:"100px 100px",animation:"gspin 10s linear infinite"}}/>}
      <circle cx="100" cy="100" r="46" fill="url(#gg)"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke={A} strokeWidth="1.5" strokeOpacity={on?.75:.2}/>
      {/* Git graph nodes */}
      {[[100,80],[100,100],[100,120],[84,100],[116,90]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="5" fill={A} fillOpacity={on?.2:0} stroke={A} strokeWidth="1.2" strokeOpacity={on?.7:.15} filter={on?"url(#gf)":undefined} style={{transition:`all .5s`,transitionDelay:i*.1+"s"}}/>
      ))}
      {on&&<>
        <line x1="100" y1="80" x2="100" y2="120" stroke={A} strokeWidth="1" strokeOpacity=".3"/>
        <line x1="100" y1="100" x2="84" y2="100" stroke={A} strokeWidth="1" strokeOpacity=".3"/>
        <line x1="100" y1="88" x2="116" y2="90" stroke={A} strokeWidth="1" strokeOpacity=".3"/>
      </>}
    </svg>
  );
}

export default function GitRald(){
  const [sc,setSc]=useState(false),[on,setOn]=useState(false),[step,setStep]=useState(0);
  useEffect(()=>{setTimeout(()=>setOn(true),600);},[]);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setStep(s=>(s+1)%STEPS.length),2100);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes gspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes gfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes gup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gp{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes ggr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .ggrd{background:linear-gradient(135deg,#FF2E2E,#CC0000,#FF7A00);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200%;animation:ggr 5s ease infinite}
        .ggl{background:rgba(255,46,46,.03);border:1px solid rgba(255,46,46,.08);backdrop-filter:blur(12px)}
        .ggl:hover{border-color:rgba(255,46,46,.18);background:rgba(255,46,46,.05)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all" style={{background:sc?`${BG}E8`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:22,width:"auto",filter:"brightness(0) invert(1)"}}/></Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Ecosystem","/#ecosystem"],["Products","/products"],["Developers","/developers"]].map(([l,h])=>(
            <Link key={l} href={h} style={{color:"rgba(255,255,255,.4)"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#fff"}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)"}}>{l}</Link>
          ))}
          <a href="https://console.rald.cloud" className="px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Open GitRald</a>
        </div>
        <button className="md:hidden" style={{color:A}}><Menu className="w-5 h-5"/></button>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(${A}04 1px,transparent 1px),linear-gradient(90deg,${A}04 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
        <div className="absolute" style={{top:"50%",left:"55%",width:600,height:600,transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${A}08 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{animation:"gup .8s ease forwards"}}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6" style={{background:`${A}10`,border:`1px solid ${A}30`,color:A}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:A,animation:"gp 2s ease-in-out infinite"}}/>Developer Infra · RALD OS
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Code faster.</span>
              <span className="block text-white">Deploy smarter.</span>
              <span className="ggrd block">Stay in Africa.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Git hosting, CI/CD and code review — built for African dev teams. Servers in Lagos and Nairobi. 3× faster pushes from Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://console.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}40`}}>
                Open GitRald <ArrowRight className="w-4 h-4"/>
              </a>
              <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>
                <Code2 className="w-4 h-4"/> API Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{height:320,animation:"gfl 6s ease-in-out infinite"}}>
            <div style={{width:280,height:280}}><Orb on={on}/></div>
          </div>
        </div>
        <a href="#how" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-xs font-mono">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      <section id="how" className="py-28 px-6" style={{background:S}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>HOW IT WORKS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Push to production in 4 steps</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s,i)=>(
              <div key={i} onClick={()=>setStep(i)} className="ggl rounded-2xl p-6 cursor-pointer transition-all relative" style={{borderColor:step===i?`${A}50`:`${A}08`,background:step===i?`${A}06`:"rgba(255,46,46,.01)",transform:step===i?"translateY(-2px)":"none"}}>
                {i<3&&<div className="hidden md:block absolute top-8 -right-2 w-4 h-px" style={{background:step>i?A:`${A}25`}}/>}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4" style={{background:step===i?`${A}15`:`${A}05`,border:`1px solid ${step===i?A+"40":A+"10"}`}}>{s.icon}</div>
                <div className="font-mono text-xs mb-1" style={{color:`${A}60`}}>Step {i+1}</div>
                <div className="font-bold text-white text-sm mb-2">{s.label}</div>
                <div className="text-xs" style={{color:step===i?"rgba(255,255,255,.6)":"rgba(255,255,255,.25)"}}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">The developer stack Africa deserves</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPS.map(c=>(
              <div key={c.title} className="ggl rounded-2xl p-7 transition-all group hover:scale-[1.02]" style={{borderColor:`${c.color}10`}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all" style={{background:`${c.color}10`,border:`1px solid ${c.color}25`}}>
                  <c.icon className="w-5 h-5" style={{color:c.color}}/>
                </div>
                <h3 className="font-black text-white mb-2">{c.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 text-center" style={{background:S,borderTop:`1px solid ${A}10`}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">Build African software on African infra.</h2>
          <p className="text-white/45 text-lg mb-10">Your code deserves infrastructure that understands where it's running.</p>
          <a href="https://console.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Open GitRald <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </section>

      <footer className="py-10 px-6" style={{background:"#010508",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/rald-wordmark.png" alt="RALD" style={{height:20,width:"auto",filter:"brightness(0) invert(1)"}}/>
          <div className="flex gap-6 text-xs text-white/25">
            {[["Home","/"],["Products","/products"],["Developers","/developers"],["Privacy","/privacy"]].map(([l,h])=>(
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="text-xs text-white/20">© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
