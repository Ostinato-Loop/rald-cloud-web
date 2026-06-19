import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, TrendingUp, Shield, Wallet, PiggyBank } from "lucide-react";

const A="#A855F7", BG="#080310", S="#0A0414";

const STORIES=[
  {emoji:"💰",name:"Emeka",city:"Port Harcourt",story:"He saves ₦5,000 a week in DunaRald. By month 6, he earned ₦18,000 in interest — enough to pay one month's rent. He never locked his money away."},
  {emoji:"👩‍💼",name:"Fatima",city:"Kano",story:"She moved her business savings from a regular bank (3% APY) to DunaRald (19% APY). Same money. Same access. Just better returns."},
  {emoji:"🎓",name:"Kweku",city:"Accra",story:"He's saving for his Masters degree. Sets a goal in DunaRald. Every month he deposits what he can. He can see exactly when he'll hit his target."},
];

const FEATURES=[
  {icon:PiggyBank,label:"Up to 19% on your naira",desc:"Save your money and earn daily interest. Way more than a regular bank account."},
  {icon:TrendingUp,label:"Invest in Nigerian T-Bills",desc:"Buy government treasury bills directly. Safe, regulated, high yield."},
  {icon:Wallet,label:"Withdraw any time",desc:"It's your money. Take it out whenever you want. No lock-up periods, no penalties."},
  {icon:Shield,label:"NDIC insured",desc:"Your savings are insured by the Nigeria Deposit Insurance Corporation. Fully regulated."},
];

export default function DunaRald(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
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
        @keyframes pup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pp{0%,100%{opacity:.4}50%{opacity:1}}
        .pgrd{background:linear-gradient(135deg,#A855F7,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent}
        .pcard{background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.1);border-radius:16px;transition:all .25s}
        .pcard:hover{background:rgba(168,85,247,.07);border-color:rgba(168,85,247,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Start saving →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"pup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"pp 2s ease-in-out infinite"}}/>
          Financial Layer · RALD OS
        </div>
        <div className="mb-5 text-3xl font-black" style={{color:A}}>DunaRald</div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Your money, earning<br/><span className="pgrd">while you sleep.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          Save your naira and earn up to 19% interest every year. Better than any bank. No lock-up. Your money, available any time.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 28px ${A}40`}}>
            Start saving free <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/payrald" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            See PayRald wallet
          </Link>
        </div>
        <a href="#yields" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Yield cards */}
      <section id="yields" className="py-16 px-5" style={{background:S}}>
        <div ref={ref} className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-8 uppercase tracking-widest" style={{color:A}}>Current yields</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{icon:"🏦",label:"Naira savings",rate:"19% APY",sub:"Withdraw anytime",c:A},
              {icon:"📋",label:"Treasury bills",rate:"22% APY",sub:"Government-backed",c:"#00FF88"},
              {icon:"🪙",label:"Stablecoin",rate:"8% APY",sub:"USDT & USDC",c:"#FFD400"}].map(y=>(
              <div key={y.label} className="pcard p-7 text-center" style={{borderColor:`${y.c}20`}}>
                <div className="text-3xl mb-4">{y.icon}</div>
                <div className="text-3xl font-black mb-1 transition-all duration-1000" style={{color:y.c,opacity:vis?1:.3}}>{y.rate}</div>
                <div className="font-bold text-white mb-1">{y.label}</div>
                <div className="text-xs" style={{color:"rgba(255,255,255,.35)"}}>{y.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real stories</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Africans growing their savings</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="pcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(168,85,247,.03)"}}>
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
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Everything about growing your money, simply.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="pcard p-7 flex gap-4">
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Your naira should work<br/>as hard as you do.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Open DunaRald in minutes. Start earning from your first deposit.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Start saving free <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </section>

      <footer className="py-8 px-5" style={{background:"#010508",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <img src="/rald-wordmark.png" alt="RALD" style={{height:18,filter:"brightness(0) invert(1)"}}/>
          <div className="flex gap-5 text-xs" style={{color:"rgba(255,255,255,.25)"}}>
            {[["Home","/"],["PayRald","/payrald"],["Privacy","/privacy"]].map(([l,h])=>(
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="text-xs" style={{color:"rgba(255,255,255,.2)"}}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
