import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, BarChart3, TrendingUp, Users, Zap } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A="#FFD400", BG="#0A0900", S="#0D0B00";

const STORIES=[
  {emoji:"📱",name:"App owner",city:"Lagos",story:"She could see 73% of her users were in Lagos, mostly on Android, between 6pm–9pm. She started sending push notifications at 7pm. Sales doubled."},
  {emoji:"🛒",name:"E-commerce store",city:"Kumasi",story:"Their checkout funnel showed 60% of users dropped off at payment. They added mobile money. Conversion went from 22% to 41% in two weeks."},
  {emoji:"🎓",name:"EdTech startup",city:"Nairobi",story:"Retention was dropping at day 7. Raldtics showed them exactly which course page caused the drop. One redesign later, D7 retention jumped 18 points."},
];

const FEATURES=[
  {icon:BarChart3,label:"See your numbers live",desc:"Revenue, active users, conversions — updating every second. No refreshing, no delays."},
  {icon:Users,label:"Know your users",desc:"Where are they? What device? When do they use your app? All answered clearly."},
  {icon:TrendingUp,label:"Track what matters",desc:"Set up any funnel — signup, payment, checkout. See exactly where people drop off."},
  {icon:Zap,label:"Add it in 3 lines",desc:"Paste our SDK into your app. Your dashboard is live in under 5 minutes."},
];

export default function Raldtics(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
    useSEO({title:"Raldtics — Business Analytics Built for Africa | RALD.cloud",description:"Raldtics gives African product teams real-time dashboards. See who's using your app, where they're from, what's converting, and where users drop off. Add it in 3 lines of code.",url:"https://rald.cloud/raldtics",themeColor:"#FFD400",product:{name:"Raldtics",applicationCategory:"BusinessApplication",operatingSystem:"Web"}});

  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3200);return()=>clearInterval(t);},[]);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:.3});
    obs.observe(el);return()=>obs.disconnect();
  },[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes rup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rp{0%,100%{opacity:.4}50%{opacity:1}}
        .rgrd{background:linear-gradient(135deg,#FFD400,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent}
        .rcard{background:rgba(255,212,0,.04);border:1px solid rgba(255,212,0,.1);border-radius:16px;transition:all .25s}
        .rcard:hover{background:rgba(255,212,0,.07);border-color:rgba(255,212,0,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://console.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Open dashboard →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"rup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"rp 2s ease-in-out infinite"}}/>
          Analytics Layer · RALD OS
        </div>
        <div className="mb-6 text-5xl font-black tracking-tight" style={{background:`linear-gradient(135deg,${A},#FFA500)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Raldtics</div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          See how your business<br/><span className="rgrd">is actually doing.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          A simple dashboard that shows who's using your app, when, and what they're doing. Built for African product teams.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://console.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 28px ${A}40`}}>
            Open free dashboard <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            SDK docs
          </Link>
        </div>
        <a href="#numbers" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Animated metric cards */}
      <section id="numbers" className="py-16 px-5" style={{background:S}}>
        <div ref={ref} className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-8 uppercase tracking-widest" style={{color:A}}>What you'll see on your dashboard</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{v:"2.4M",l:"Monthly users",c:A},{v:"₦4,120",l:"Revenue/user",c:"#00FF88"},{v:"61%",l:"Day-7 retention",c:"#00BFFF"},{v:"34%",l:"Checkout rate",c:"#FF7A00"}].map(m=>(
              <div key={m.l} className="rcard p-5 text-center" style={{borderColor:`${m.c}20`}}>
                <div className="text-2xl md:text-3xl font-black mb-1 transition-all duration-1000" style={{color:m.c,opacity:vis?1:.25}}>{m.v}</div>
                <div className="text-xs" style={{color:"rgba(255,255,255,.4)"}}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real results</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">What teams discovered with Raldtics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="rcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(255,212,0,.03)"}}>
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
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Simple to use. Powerful when you need it.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="rcard p-7 flex gap-4">
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Stop guessing.<br/>Start knowing.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Free to start. Your dashboard is ready in 5 minutes.</p>
          <a href="https://console.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
            Open Raldtics free <ArrowRight className="w-4 h-4"/>
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
