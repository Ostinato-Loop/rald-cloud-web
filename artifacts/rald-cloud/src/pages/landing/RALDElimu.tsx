import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Users, CreditCard, Bell, BarChart3 } from "lucide-react";

const A="#A855F7", BG="#080310", S="#0A0414";

const STORIES=[
  {emoji:"👨‍👩‍👧",name:"Sunshine Primary School",city:"Ibadan",story:"Parents used to queue to pay fees and argue about receipts. Now they pay on the app, get instant receipts, and check their child's attendance — without calling the school."},
  {emoji:"👩‍🏫",name:"Teacher Amaka",city:"Enugu",story:"She takes attendance on her phone each morning. It sends an SMS to parents whose kids are absent. She used to spend 30 minutes on this. Now it's 2 minutes."},
  {emoji:"🏫",name:"Faith Academy",city:"Abuja",story:"The headmaster sees fee collection rates, class sizes and attendance trends on his phone. When arrears pile up, the system automatically sends reminders — no admin needed."},
];

const FEATURES=[
  {icon:Users,label:"Student records, digital",desc:"Each student gets a RALD digital profile — attendance, grades, fees, all in one place."},
  {icon:Bell,label:"Parents get instant updates",desc:"Absent? Parent knows within 5 minutes via SMS and app notification. Works on any phone."},
  {icon:CreditCard,label:"Pay school fees in the app",desc:"Parents pay via PayRald, bank transfer or USSD. Receipts auto-generated. No cashbox needed."},
  {icon:BarChart3,label:"School dashboard for leadership",desc:"See attendance rates, fee collection and class performance at a glance. Every day."},
];

export default function RALDElimu(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3200);return()=>clearInterval(t);},[]);
  /* Dynamic favicon */
  useEffect(()=>{
    const links=document.querySelectorAll<HTMLLinkElement>('link[rel="icon"],link[rel="shortcut icon"]');
    const prev=links[0]?.href??"";
    links.forEach(l=>{l.href="/elimu-icon.png";});
    return()=>links.forEach(l=>{l.href=prev;});
  },[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes eup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ep{0%,100%{opacity:.4}50%{opacity:1}}
        .egrd{background:linear-gradient(135deg,#A855F7,#0066FF);-webkit-background-clip:text;background-clip:text;color:transparent}
        .ecard{background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.1);border-radius:16px;transition:all .25s}
        .ecard:hover{background:rgba(168,85,247,.07);border-color:rgba(168,85,247,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Enrol your school →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"eup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"ep 2s ease-in-out infinite"}}/>
          Education Layer · RALD OS
        </div>
        <img src="/elimu-wordmark.png" alt="RALD Elimu" style={{height:54,width:"auto",maxWidth:280,objectFit:"contain",marginBottom:28,filter:`drop-shadow(0 0 18px ${A}30)`}}/>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Running a school<br/><span className="egrd">just got simpler.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          Attendance on a phone. Fees paid in the app. Parents updated instantly. RALD Elimu makes school admin work for African schools — without paper or spreadsheets.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 28px ${A}40`}}>
            Enrol your school <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/payrald" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            How fees work →
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Simple onboarding steps */}
      <section className="py-16 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-10 uppercase tracking-widest" style={{color:A}}>Getting started</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 relative">
            {[{icon:"🏫",step:"Onboard your school",sub:"Import student list from Excel or CSV"},
              {icon:"📱",step:"Teachers get the app",sub:"Set up in minutes on any smartphone"},
              {icon:"💬",step:"Parents get invited",sub:"SMS link — works on any phone"},
              {icon:"✅",step:"School runs itself",sub:"Fees, attendance and alerts automated"},
            ].map((s,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center text-center px-4 relative">
                {i<3&&<div className="hidden md:block absolute top-5 left-[60%] right-0 h-px" style={{background:`${A}25`}}/>}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 relative z-10" style={{background:`${A}12`,border:`1px solid ${A}25`}}>{s.icon}</div>
                <div className="font-black text-white text-sm mb-1">{s.step}</div>
                <div className="text-xs" style={{color:"rgba(255,255,255,.35)"}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real schools</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Stories from African classrooms</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="ecard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(168,85,247,.03)"}}>
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
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>What it does</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Less paperwork. More teaching.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="ecard p-7 flex gap-4">
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
          <img src="/elimu-wordmark.png" alt="RALD Elimu" style={{height:40,width:"auto",objectFit:"contain",margin:"0 auto 24px"}}/>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Every African school<br/>deserves to run like this.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Free to start. No setup fees. Works from your existing phone.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Enrol your school free <ArrowRight className="w-4 h-4"/>
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
