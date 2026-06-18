import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, TrendingUp, Shield, Wallet, Globe, Code2, ChevronDown, PiggyBank } from "lucide-react";

const A="#A855F7",BG="#080310",S="#0A0414";

const CAPS=[
  {icon:PiggyBank,title:"High-yield Savings",color:A,desc:"Up to 19% APY on NGN savings. NDIC insured, instant withdrawal, no lock-up periods."},
  {icon:TrendingUp,title:"Investment Portfolios",color:"#00FF88",desc:"Treasury bills, money market funds and African equity — curated by local fund managers."},
  {icon:Wallet,title:"Crypto Yields",color:"#FFD400",desc:"BTC, ETH and stablecoin staking via regulated custodians. Earn on idle assets."},
  {icon:Shield,title:"Emergency Fund",color:"#00E5FF",desc:"Auto-set savings goals. Emergency fund calculated from your income and spending patterns."},
  {icon:Globe,title:"Cross-border FX",color:"#FF7A00",desc:"Hold NGN, KES, GHS and USD simultaneously. Convert at real-time mid-market rates."},
  {icon:Code2,title:"DunaRald API",color:"#0066FF",desc:"Embed savings and investment features in your product. Webhooks for yield events."},
];
const STEPS=[
  {icon:"🏦",label:"Open DunaRald",detail:"ALIA-verified in seconds"},
  {icon:"💰",label:"Deposit funds",detail:"From PayRald wallet or bank"},
  {icon:"📈",label:"Choose yield",detail:"Savings, T-bills or staking"},
  {icon:"💎",label:"Earn daily",detail:"Returns credited every 24h"},
];

function Orb({on}:{on:boolean}){
  const coins=[[100,78,8],[88,100,7],[112,100,7],[100,122,8]];
  return(
    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",overflow:"visible"}}>
      <defs>
        <radialGradient id="png"><stop offset="0%" stopColor={A} stopOpacity=".15"/><stop offset="100%" stopColor={A} stopOpacity="0"/></radialGradient>
        <filter id="pnf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[50,65,80].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={A} strokeWidth=".5" strokeOpacity={on?.2-i*.05:.06}/>)}
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeWidth="1" strokeDasharray="6 14" strokeOpacity=".3" style={{transformOrigin:"100px 100px",animation:on?"pnspin 10s linear infinite":"none"}}/>
      {on&&<circle cx="170" cy="100" r="3.5" fill={A} filter="url(#pnf)" style={{transformOrigin:"100px 100px",animation:"pnspin 10s linear infinite"}}/>}
      <circle cx="100" cy="100" r="46" fill="url(#png)"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke={A} strokeWidth="1.5" strokeOpacity={on?.75:.2}/>
      {coins.map(([cx,cy,r],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r*.45}
          fill={A} fillOpacity={on?.25:0} stroke={A} strokeWidth="1" strokeOpacity={on?.6:.1}
          style={{transition:`all .5s`,transitionDelay:i*.12+"s"}} filter={on?"url(#pnf)":undefined}/>
      ))}
      {on&&<polyline points="88,108 93,104 98,107 103,98 108,101 113,95" fill="none" stroke="#00FF88" strokeWidth="1.5" strokeOpacity=".6"/>}
    </svg>
  );
}

export default function DunaRald(){
  const [sc,setSc]=useState(false),[on,setOn]=useState(false),[step,setStep]=useState(0);
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setOn(true),600);},[]);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setStep(s=>(s+1)%STEPS.length),2100);return()=>clearInterval(t);},[]);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:.3});
    obs.observe(el);return()=>obs.disconnect();
  },[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes pnspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pnfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes pnup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pnp{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes pngr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .pngrd{background:linear-gradient(135deg,#A855F7,#7C3AED,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200%;animation:pngr 5s ease infinite}
        .pngl{background:rgba(168,85,247,.03);border:1px solid rgba(168,85,247,.08);backdrop-filter:blur(12px)}
        .pngl:hover{border-color:rgba(168,85,247,.18);background:rgba(168,85,247,.05)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all" style={{background:sc?`${BG}E8`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:22,width:"auto",filter:"brightness(0) invert(1)"}}/></Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Ecosystem","/#ecosystem"],["Products","/products"],["Developers","/developers"]].map(([l,h])=>(
            <Link key={l} href={h} style={{color:"rgba(255,255,255,.4)"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#fff"}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)"}}>{l}</Link>
          ))}
          <a href="https://app.rald.cloud" className="px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Start Saving</a>
        </div>
        <button className="md:hidden" style={{color:A}}><Menu className="w-5 h-5"/></button>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(${A}04 1px,transparent 1px),linear-gradient(90deg,${A}04 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
        <div className="absolute" style={{top:"50%",left:"55%",width:600,height:600,transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${A}08 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{animation:"pnup .8s ease forwards"}}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6" style={{background:`${A}10`,border:`1px solid ${A}30`,color:A}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:A,animation:"pnp 2s ease-in-out infinite"}}/>Financial Layer · RALD OS
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Your money,</span>
              <span className="block text-white">always</span>
              <span className="pngrd block">working harder.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Savings, investments and staking — all in one place. Up to 19% APY. NDIC insured. Built on RALD infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}40`}}>
                Start Saving <ArrowRight className="w-4 h-4"/>
              </a>
              <Link href="/payrald" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>
                <Wallet className="w-4 h-4"/> PayRald Wallet
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{height:320,animation:"pnfl 6s ease-in-out infinite"}}>
            <div style={{width:280,height:280}}><Orb on={on}/></div>
          </div>
        </div>
        <a href="#how" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-xs font-mono">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      <section id="how" className="py-20 px-6" style={{background:S}}>
        <div ref={ref} className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-mono mb-3" style={{color:A}}>YIELDS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Your money earns while you sleep</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[{label:"NGN Savings",rate:"19% APY",icon:"🏦",c:A},{label:"T-Bills",rate:"22% APY",icon:"📋",c:"#00FF88"},{label:"Stablecoin Yield",rate:"8% APY",icon:"🪙",c:"#FFD400"}].map(y=>(
              <div key={y.label} className="pngl rounded-2xl p-6 text-center" style={{borderColor:`${y.c}15`}}>
                <div className="text-3xl mb-3">{y.icon}</div>
                <div className="text-2xl font-black mb-1 transition-all duration-700" style={{color:y.c,opacity:vis?1:.3}}>{y.rate}</div>
                <div className="text-sm text-white/50">{y.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mb-12"><div className="text-xs font-mono mb-3" style={{color:A}}>HOW IT WORKS</div></div>
          <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s,i)=>(
              <div key={i} onClick={()=>setStep(i)} className="pngl rounded-2xl p-6 cursor-pointer transition-all relative" style={{borderColor:step===i?`${A}50`:`${A}08`,transform:step===i?"translateY(-2px)":"none"}}>
                {i<3&&<div className="hidden md:block absolute top-8 -right-2 w-4 h-px" style={{background:step>i?A:`${A}25`}}/>}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4" style={{background:step===i?`${A}15`:`${A}05`,border:`1px solid ${step===i?A+"40":A+"10"}`}}>{s.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{s.label}</div>
                <div className="text-xs" style={{color:"rgba(255,255,255,.3)"}}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><div className="text-xs font-mono mb-3" style={{color:A}}>CAPABILITIES</div><h2 className="text-3xl md:text-4xl font-black text-white">The full savings stack</h2></div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPS.map(c=>(
              <div key={c.title} className="pngl rounded-2xl p-7 transition-all group hover:scale-[1.02]" style={{borderColor:`${c.color}10`}}>
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
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">Wealth shouldn't be for the few.</h2>
          <p className="text-white/45 text-lg mb-10">Open DunaRald. Start earning on every naira you save — from day one.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Start Saving <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </section>

      <footer className="py-10 px-6" style={{background:"#010508",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/rald-wordmark.png" alt="RALD" style={{height:20,width:"auto",filter:"brightness(0) invert(1)"}}/>
          <div className="flex gap-6 text-xs text-white/25">
            {[["Home","/"],["PayRald","/payrald"],["Products","/products"],["Privacy","/privacy"]].map(([l,h])=>(
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="text-xs text-white/20">© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
