import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ShoppingBag, Users, Mic, TrendingUp, X, Menu } from "lucide-react";

const A="#00FF88", BG="#030F07", S="#050F0A";

const STORIES=[
  {emoji:"👗",name:"Chioma",city:"Onitsha",story:"She posts her ankara fabric on Loop. A customer in Abuja sees it, chats her, pays — and gets delivery arranged. All from her phone."},
  {emoji:"🍔",name:"Kemi's Kitchen",city:"Lagos Island",story:"She runs her food business on Loop. Daily orders come in via her page. She broadcasts new menus to 400 followers as voice notes."},
  {emoji:"💈",name:"Barber King",city:"Accra",story:"He books appointments through Loop. Customers pay upfront to secure their slot. No more no-shows."},
];

const FEATURES=[
  {icon:ShoppingBag,label:"Sell anything",desc:"List your products, set prices, collect payment — from your phone."},
  {icon:Users,label:"Build your community",desc:"Your customers become your followers. Message them anytime."},
  {icon:Mic,label:"Go live",desc:"Broadcast to your audience. Show new stock, do a demo, host a giveaway."},
  {icon:TrendingUp,label:"See your sales",desc:"Know what's selling, when, and to who. Simple numbers, clear picture."},
];

export default function LoopBusiness(){
  const [sc,setSc]=useState(false),[nav,setNav]=useState(false),[active,setActive]=useState(0);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3000);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <style>{`
        @keyframes bup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bpulse{0%,100%{opacity:.4}50%{opacity:1}}
        .bgrd{background:linear-gradient(135deg,#00FF88,#FFD400);-webkit-background-clip:text;background-clip:text;color:transparent}
        .bcard{background:rgba(0,255,136,.04);border:1px solid rgba(0,255,136,.1);border-radius:16px;transition:all .25s}
        .bcard:hover{background:rgba(0,255,136,.07);border-color:rgba(0,255,136,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}12`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Open Loop →</a>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"bup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"bpulse 2s ease-in-out infinite"}}/>
          Part of RALD OS · Africa's digital backbone
        </div>
        <img src="/loop-business-wordmark.png" alt="Loop Business" style={{height:52,width:"auto",maxWidth:300,objectFit:"contain",marginBottom:32,filter:"drop-shadow(0 0 20px rgba(0,255,136,.25))"}}/>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Your African business,<br/><span className="bgrd">fully online.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:500,lineHeight:1.65}}>
          Sell products, collect payments and talk to customers — all in one place. Works from Lagos market to Nairobi CBD.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 28px ${A}40`}}>
            Start selling free <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            See all RALD products
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* STORIES */}
      <section id="stories" className="py-24 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real people, real results</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">See how Africans use Loop</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="bcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(0,255,136,.03)"}}>
                <div className="text-3xl mb-4">{s.emoji}</div>
                <div className="font-black text-white mb-0.5">{s.name}</div>
                <div className="text-xs mb-4" style={{color:`${A}80`}}>{s.city}</div>
                <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,.55)"}}>{s.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>What Loop does</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Everything your business needs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="bcard p-7 flex gap-4">
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

      {/* CTA */}
      <section className="py-24 px-5 text-center" style={{background:S,borderTop:`1px solid ${A}10`}}>
        <div className="max-w-xl mx-auto">
          <img src="/loop-business-wordmark.png" alt="Loop" style={{height:36,width:"auto",objectFit:"contain",margin:"0 auto 24px"}}/>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Your business deserves<br/>to be found online.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Free to start. No technical skill needed. Just your phone.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
            Open Loop free <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </section>

      <footer className="py-8 px-5" style={{background:"#010508",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <img src="/rald-wordmark.png" alt="RALD" style={{height:18,filter:"brightness(0) invert(1)"}}/>
          <div className="flex gap-5 text-xs" style={{color:"rgba(255,255,255,.25)"}}>
            {[["Home","/"],["PayRald","/payrald"],["ALIA","/alia"],["Privacy","/privacy"]].map(([l,h])=>(
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="text-xs" style={{color:"rgba(255,255,255,.2)"}}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
