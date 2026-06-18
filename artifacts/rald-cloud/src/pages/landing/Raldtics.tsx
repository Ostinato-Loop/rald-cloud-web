import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, BarChart3, TrendingUp, Users, Zap, Globe, Code2, ChevronDown } from "lucide-react";

const A="#FFD400",BG="#0A0900",S="#0D0B00";

const CAPS=[
  {icon:BarChart3,title:"Real-time Dashboards",color:A,desc:"Live metrics refreshing every second. Revenue, MAU, conversion — all visible now."},
  {icon:TrendingUp,title:"Cohort Analysis",color:"#00FF88",desc:"Track user behaviour from first touch to LTV. Segment by device, location, product."},
  {icon:Users,title:"Retention Curves",color:"#0066FF",desc:"Day-1, Day-7, Day-30 retention by cohort. Know exactly where you're losing users."},
  {icon:Zap,title:"Event Funnels",color:"#FF7A00",desc:"Map any user journey as a funnel. Identify drop-offs in seconds, not days."},
  {icon:Globe,title:"Africa-Market Filters",color:"#00E5FF",desc:"Filter metrics by country, carrier, device tier. Built for African market realities."},
  {icon:Code2,title:"SDK + Webhooks",color:"#A855F7",desc:"3-line integration for React, React Native, Node. Realtime event streaming via webhooks."},
];
const METRICS=[
  {label:"Monthly Active Users",value:"2.4M",delta:"+18%",color:A},
  {label:"Avg Revenue / User",value:"₦4,120",delta:"+7%",color:"#00FF88"},
  {label:"D7 Retention",value:"61%",delta:"+3pp",color:"#0066FF"},
  {label:"Funnel Conversion",value:"34%",delta:"+12%",color:"#FF7A00"},
];

function Orb({on}:{on:boolean}){
  const bars=[[82,120,12,25],[92,110,12,35],[102,100,12,45],[112,115,12,30],[122,105,12,40]];
  return(
    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",overflow:"visible"}}>
      <defs>
        <radialGradient id="rg"><stop offset="0%" stopColor={A} stopOpacity=".15"/><stop offset="100%" stopColor={A} stopOpacity="0"/></radialGradient>
        <filter id="rf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[50,65,80].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={A} strokeWidth=".5" strokeOpacity={on?.2-i*.05:.06}/>)}
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeWidth="1" strokeDasharray="6 14" strokeOpacity=".3" style={{transformOrigin:"100px 100px",animation:on?"rspin 10s linear infinite":"none"}}/>
      {on&&<circle cx="170" cy="100" r="3.5" fill={A} filter="url(#rf)" style={{transformOrigin:"100px 100px",animation:"rspin 10s linear infinite"}}/>}
      <circle cx="100" cy="100" r="46" fill="url(#rg)"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke={A} strokeWidth="1.5" strokeOpacity={on?.75:.2}/>
      {bars.map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y-h} width={w} height={h} rx="2"
          fill={A} fillOpacity={on?.4:0} stroke={A} strokeWidth="1" strokeOpacity={on?.6:.1}
          style={{transition:`all .6s`,transitionDelay:i*.1+"s"}}/>
      ))}
      {on&&<polyline points="82,118 92,108 102,98 112,113 122,103" fill="none" stroke="#00FF88" strokeWidth="1.5" strokeOpacity=".6"/>}
    </svg>
  );
}

export default function Raldtics(){
  const [sc,setSc]=useState(false),[on,setOn]=useState(false);
  const metricsRef=useRef<HTMLDivElement>(null);
  const [mv,setMv]=useState(false);
  useEffect(()=>{setTimeout(()=>setOn(true),600);},[]);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{
    const el=metricsRef.current; if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setMv(true)},{threshold:.3});
    obs.observe(el); return()=>obs.disconnect();
  },[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes rspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes rfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes rup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rp{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes rgr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .rgrd{background:linear-gradient(135deg,#FFD400,#FFA500,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200%;animation:rgr 5s ease infinite}
        .rgl{background:rgba(255,212,0,.03);border:1px solid rgba(255,212,0,.08);backdrop-filter:blur(12px)}
        .rgl:hover{border-color:rgba(255,212,0,.18);background:rgba(255,212,0,.05)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all" style={{background:sc?`${BG}E8`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:22,width:"auto",filter:"brightness(0) invert(1)"}}/></Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Ecosystem","/#ecosystem"],["Products","/products"],["Developers","/developers"]].map(([l,h])=>(
            <Link key={l} href={h} style={{color:"rgba(255,255,255,.4)"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#fff"}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)"}}>{l}</Link>
          ))}
          <a href="https://console.rald.cloud" className="px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Open Raldtics</a>
        </div>
        <button className="md:hidden" style={{color:A}}><Menu className="w-5 h-5"/></button>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(${A}03 1px,transparent 1px),linear-gradient(90deg,${A}03 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
        <div className="absolute" style={{top:"50%",left:"55%",width:600,height:600,transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${A}08 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{animation:"rup .8s ease forwards"}}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6" style={{background:`${A}10`,border:`1px solid ${A}30`,color:A}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:A,animation:"rp 2s ease-in-out infinite"}}/>Analytics Layer · RALD OS
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Data that</span>
              <span className="block text-white">makes you</span>
              <span className="rgrd block">move faster.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Real-time analytics, cohort tracking and revenue intelligence — built for African product teams and African market conditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://console.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}40`}}>
                Open Raldtics <ArrowRight className="w-4 h-4"/>
              </a>
              <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>
                <Code2 className="w-4 h-4"/> SDK Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{height:320,animation:"rfl 6s ease-in-out infinite"}}>
            <div style={{width:280,height:280}}><Orb on={on}/></div>
          </div>
        </div>
        <a href="#metrics" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-xs font-mono">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      <section id="metrics" className="py-28 px-6" style={{background:S}}>
        <div ref={metricsRef} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>LIVE METRICS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Your numbers, always now</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {METRICS.map(m=>(
              <div key={m.label} className="rgl rounded-2xl p-6 text-center" style={{borderColor:`${m.color}15`}}>
                <div className="text-3xl font-black mb-1 transition-all duration-1000" style={{color:m.color,opacity:mv?1:.3}}>{m.value}</div>
                <div className="text-xs font-mono mb-2" style={{color:`${m.color}70`}}>{m.delta}</div>
                <div className="text-xs text-white/40">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">The full analytics stack</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPS.map(c=>(
              <div key={c.title} className="rgl rounded-2xl p-7 transition-all group hover:scale-[1.02]" style={{borderColor:`${c.color}10`}}>
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
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">Decisions driven by data.</h2>
          <p className="text-white/45 text-lg mb-10">Add Raldtics in 3 lines of code. See your first live dashboard in minutes.</p>
          <a href="https://console.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
            Start Free <ArrowRight className="w-4 h-4"/>
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
