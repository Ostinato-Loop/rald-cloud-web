import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, Users, Mic, ShoppingBag, TrendingUp, Globe, Code2, ChevronDown } from "lucide-react";

const A="#00FF88",BG="#030F07",S="#050F0A";

const CAPS=[
  {icon:Users,title:"Community Spaces",color:A,desc:"Build private or public communities. Open or invite-only, personal or brand."},
  {icon:Mic,title:"Social Audio & Live",color:"#FFD400",desc:"Clubs, podcasts, listen-parties and live commerce streams all inside Loop."},
  {icon:ShoppingBag,title:"Loop Commerce",color:"#FF7A00",desc:"Sell products directly inside communities. PayRald checkout built in."},
  {icon:TrendingUp,title:"Creator Monetisation",color:"#0066FF",desc:"Subscriptions, tips, event tickets — creators earn from their audiences."},
  {icon:Globe,title:"Africa-first CDN",color:"#00BFFF",desc:"Content from Nairobi, Lagos, Accra, Joburg. No buffering on 2G."},
  {icon:Code2,title:"Loop SDK",color:"#A855F7",desc:"Embed community and live-audio features in your own product."},
];
const STEPS=[
  {icon:"🌍",label:"Create community",detail:"Open or invite-only, org or personal"},
  {icon:"🎙",label:"Go live",detail:"Audio room, video or text broadcast"},
  {icon:"🛍",label:"Commerce enabled",detail:"Products, tickets, digital goods"},
  {icon:"💰",label:"Revenue distributed",detail:"Instant payout via PayRald wallet"},
];

function Orb({on}:{on:boolean}){
  return(
    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",overflow:"visible"}}>
      <defs>
        <radialGradient id="lg"><stop offset="0%" stopColor={A} stopOpacity=".15"/><stop offset="100%" stopColor={A} stopOpacity="0"/></radialGradient>
        <filter id="lf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[50,65,80].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={A} strokeWidth=".5" strokeOpacity={on?.2-i*.05:.06}/>)}
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeWidth="1" strokeDasharray="6 14" strokeOpacity=".3" style={{transformOrigin:"100px 100px",animation:on?"lspin 9s linear infinite":"none"}}/>
      {on&&<circle cx="170" cy="100" r="3.5" fill={A} filter="url(#lf)" style={{transformOrigin:"100px 100px",animation:"lspin 9s linear infinite"}}/>}
      <circle cx="100" cy="100" r="46" fill="url(#lg)"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke={A} strokeWidth="1.5" strokeOpacity={on?.75:.2}/>
      {[[100,78],[122,110],[100,128],[78,110],[82,84],[118,84]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="5" fill={A} stroke={A} strokeWidth="1" fillOpacity={on?.25:0} strokeOpacity={on?.7:.15} filter={on?"url(#lf)":undefined}/>
      ))}
      {on&&[[100,78,122,110],[122,110,100,128],[100,128,78,110],[78,110,100,78]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={A} strokeWidth=".8" strokeOpacity=".2"/>
      ))}
    </svg>
  );
}

export default function LoopBusiness(){
  const [sc,setSc]=useState(false),[on,setOn]=useState(false),[step,setStep]=useState(0),[nav,setNav]=useState(false);
  useEffect(()=>{setTimeout(()=>setOn(true),600);},[]);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setStep(s=>(s+1)%STEPS.length),2100);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes lspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes lfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes lup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lpulse{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes lgr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .lgrd{background:linear-gradient(135deg,#00FF88,#00CC6A,#FFD400);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200%;animation:lgr 5s ease infinite}
        .lgl{background:rgba(0,255,136,.03);border:1px solid rgba(0,255,136,.08);backdrop-filter:blur(12px)}
        .lgl:hover{border-color:rgba(0,255,136,.18);background:rgba(0,255,136,.05)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all" style={{background:sc?`${BG}E8`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:22,width:"auto",filter:"brightness(0) invert(1)"}}/></Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Ecosystem","/#ecosystem"],["Products","/products"],["Developers","/developers"]].map(([l,h])=>(
            <Link key={l} href={h} style={{color:"rgba(255,255,255,.4)"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#fff"}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)"}}>{l}</Link>
          ))}
          <a href="https://app.rald.cloud" className="px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Join Loop</a>
        </div>
        <button className="md:hidden p-2" style={{color:A}} onClick={()=>setNav(!nav)}>{nav?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(${A}04 1px,transparent 1px),linear-gradient(90deg,${A}04 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
        <div className="absolute" style={{top:"50%",left:"55%",width:600,height:600,transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${A}07 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{animation:"lup .8s ease forwards"}}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6" style={{background:`${A}10`,border:`1px solid ${A}30`,color:A}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:A,animation:"lpulse 2s ease-in-out infinite"}}/>Product Layer · RALD OS
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Community</span>
              <span className="block text-white">and commerce</span>
              <span className="lgrd block">at scale.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Loop is Africa's social platform — audio rooms, creator tools, community spaces and built-in commerce. All in one.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}40`}}>
                Join Loop <ArrowRight className="w-4 h-4"/>
              </a>
              <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>
                <Code2 className="w-4 h-4"/> SDK Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{height:320,animation:"lfl 6s ease-in-out infinite"}}>
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
            <h2 className="text-3xl md:text-4xl font-black text-white">From community to revenue in 4 steps</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s,i)=>(
              <div key={i} onClick={()=>setStep(i)} className="lgl rounded-2xl p-6 cursor-pointer transition-all duration-300 relative" style={{borderColor:step===i?`${A}50`:`${A}08`,background:step===i?`${A}06`:"rgba(0,255,136,.01)",transform:step===i?"translateY(-2px)":"none"}}>
                {i<3&&<div className="hidden md:block absolute top-8 -right-2 w-4 h-px z-10" style={{background:step>i?A:`${A}25`}}/>}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4" style={{background:step===i?`${A}15`:`${A}05`,border:`1px solid ${step===i?A+"40":A+"10"}`}}>{s.icon}</div>
                <div className="font-mono text-xs mb-1" style={{color:`${A}60`}}>Step {i+1}</div>
                <div className="font-bold text-white text-sm mb-2">{s.label}</div>
                <div className="text-xs leading-relaxed" style={{color:step===i?"rgba(255,255,255,.6)":"rgba(255,255,255,.25)"}}>{s.detail}</div>
                {step===i&&<div className="mt-3"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:A,animation:"lpulse 1.5s ease-in-out infinite"}}/></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Everything a creator ecosystem needs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPS.map(c=>(
              <div key={c.title} className="lgl rounded-2xl p-7 transition-all duration-300 group hover:scale-[1.02]" style={{borderColor:`${c.color}10`}}>
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
          <div className="text-5xl mb-6">🌍</div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">African voices, amplified.</h2>
          <p className="text-white/45 text-lg mb-10">Join the Loop. Build your community. Earn from your audience.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.rald.cloud" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>Join Loop <ArrowRight className="w-4 h-4"/></a>
            <Link href="/developers" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.12)",color:"#fff"}}><Code2 className="w-4 h-4"/> SDK Docs</Link>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6" style={{background:"#010508",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/rald-wordmark.png" alt="RALD" style={{height:20,width:"auto",filter:"brightness(0) invert(1)"}}/>
          <div className="flex gap-6 text-xs text-white/25">
            {[["Home","/"],["Products","/products"],["ALIA","/alia"],["Developers","/developers"],["Privacy","/privacy"]].map(([l,h])=>(
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="text-xs text-white/20">© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
