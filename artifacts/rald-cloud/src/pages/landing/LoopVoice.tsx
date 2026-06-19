import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Mic, Globe, Shield, Cpu } from "lucide-react";

const A="#FF4FAD", BG="#0F0008", S="#130009";

const STORIES=[
  {emoji:"🌾",name:"Agricultural helpline",city:"Kano",story:"Farmers call in Hausa to check crop prices and get advice. The IVR system speaks Hausa back to them. No reading required. No smartphone needed."},
  {emoji:"🏦",name:"MFB customer service",city:"Lagos",story:"A microfinance bank handles 10,000 loan balance inquiries daily through automated voice in Yoruba and English. Their agents now focus on complex cases only."},
  {emoji:"🛵",name:"Rider app",city:"Nairobi",story:"Turn-by-turn directions spoken in Swahili for motorbike riders who can't read a map while driving. Loop Voice built in 3 days."},
];

const FEATURES=[
  {icon:Globe,label:"24 African languages",desc:"Yoruba, Hausa, Igbo, Swahili, Zulu, Twi, Amharic and more. Real speakers, real accents."},
  {icon:Mic,label:"Voice to text and back",desc:"Your app can listen to speech and speak back. Both directions, any language."},
  {icon:Cpu,label:"Build phone menus (IVR)",desc:"Create automated phone systems without writing complex code. Drag-and-drop builder."},
  {icon:Shield,label:"Works on 2G calls",desc:"Voice quality optimised for Africa's network reality. Sub-200ms response time."},
];

export default function LoopVoice(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3200);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes vup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes vp{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes vwave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1.6)}}
        .vgrd{background:linear-gradient(135deg,#FF4FAD,#A855F7);-webkit-background-clip:text;background-clip:text;color:transparent}
        .vcard{background:rgba(255,79,173,.04);border:1px solid rgba(255,79,173,.1);border-radius:16px;transition:all .25s}
        .vcard:hover{background:rgba(255,79,173,.07);border-color:rgba(255,79,173,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Get Voice API →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"vup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"vp 2s ease-in-out infinite"}}/>
          Infrastructure Layer · RALD OS
        </div>

        {/* Waveform visual */}
        <div className="flex items-center gap-1 mb-8" style={{height:40}}>
          {[6,12,20,28,22,16,26,30,24,18,14,8].map((h,i)=>(
            <div key={i} style={{width:4,height:h,borderRadius:2,background:A,opacity:.7,animation:`vwave 1.4s ease-in-out infinite`,animationDelay:i*.1+"s"}}/>
          ))}
        </div>

        <div className="mb-5 text-3xl font-black" style={{color:A}}>Loop Voice</div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Your app speaks<br/><span className="vgrd">African languages.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          Add voice in Yoruba, Hausa, Igbo, Swahili and 20 more languages to any app or phone system. Works on 2G. Built for Africa's reality.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 28px ${A}40`}}>
            Get Voice API <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            Read the docs
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Language pills */}
      <section className="py-14 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold mb-6 uppercase tracking-widest" style={{color:A}}>Supported languages</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Yoruba","Hausa","Igbo","Swahili","Zulu","Twi","Amharic","Somali","Wolof","Xhosa","Shona","Luganda","Kinyarwanda","Tigrinya","Fulani","Lingala","Malagasy","Chichewa","Tswana","Sotho","English","French","Arabic","Portuguese"].map(l=>(
              <span key={l} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{background:`${A}10`,border:`1px solid ${A}20`,color:"rgba(255,255,255,.65)"}}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real deployments</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">What Loop Voice powers today</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="vcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(255,79,173,.03)"}}>
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
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Voice built for Africa</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="vcard p-7 flex gap-4">
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
          <div className="flex items-center gap-1 justify-center mb-6" style={{height:30}}>
            {[5,9,15,20,16,12,18,22,17,13,10,6].map((h,i)=>(
              <div key={i} style={{width:3,height:h,borderRadius:2,background:A,opacity:.6,animation:`vwave 1.4s ease-in-out infinite`,animationDelay:i*.1+"s"}}/>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Let Africa hear itself<br/>in its own words.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>License once. Works everywhere. Pay only for what you use.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Get Voice API <ArrowRight className="w-4 h-4"/>
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
