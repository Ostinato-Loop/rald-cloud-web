import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, GraduationCap, Users, CreditCard, BarChart3, Bell, Code2, ChevronDown } from "lucide-react";

const A="#A855F7",BG="#080310",S="#0A0414";

const CAPS=[
  {icon:GraduationCap,title:"Student Management",color:A,desc:"Enrolment, classes, grades, attendance — one digital record per student across their entire school life."},
  {icon:Users,title:"Teacher Portal",color:"#00FF88",desc:"Lesson planning, gradebook, attendance tracking and parent communication — all in one app."},
  {icon:Bell,title:"Parent Notifications",color:"#FFD400",desc:"Real-time SMS + app push for attendance, grades and school events. Works on 2G."},
  {icon:CreditCard,title:"School Fees via PayRald",color:"#0066FF",desc:"Parents pay fees directly in the app. Receipts auto-generated, arrears tracked, reminders automated."},
  {icon:BarChart3,title:"School Analytics",color:"#FF7A00",desc:"Attendance trends, class performance, fee collection rates — headmaster dashboard in real-time."},
  {icon:Code2,title:"Elimu API",color:"#00E5FF",desc:"Integrate with existing school systems. RESTful API for student data, payments and comms."},
];
const STEPS=[
  {icon:"🏫",label:"School onboarded",detail:"Import existing student records in CSV"},
  {icon:"👨‍🎓",label:"Students enrolled",detail:"ALIA digital ID created per student"},
  {icon:"📲",label:"Parents connected",detail:"App installed, notifications activated"},
  {icon:"📊",label:"School runs itself",detail:"Fees, comms, attendance automated"},
];

function Orb({on}:{on:boolean}){
  return(
    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",overflow:"visible"}}>
      <defs>
        <radialGradient id="elg"><stop offset="0%" stopColor={A} stopOpacity=".15"/><stop offset="100%" stopColor={A} stopOpacity="0"/></radialGradient>
        <filter id="elf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[50,65,80].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={A} strokeWidth=".5" strokeOpacity={on?.2-i*.05:.06}/>)}
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeWidth="1" strokeDasharray="6 14" strokeOpacity=".3" style={{transformOrigin:"100px 100px",animation:on?"elspin 10s linear infinite":"none"}}/>
      {on&&<circle cx="170" cy="100" r="3.5" fill={A} filter="url(#elf)" style={{transformOrigin:"100px 100px",animation:"elspin 10s linear infinite"}}/>}
      <circle cx="100" cy="100" r="46" fill="url(#elg)"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke={A} strokeWidth="1.5" strokeOpacity={on?.75:.2}/>
      {/* Graduation cap */}
      <rect x="85" y="98" width="30" height="14" rx="2" fill={A} fillOpacity={on?.2:0} stroke={A} strokeWidth="1" strokeOpacity={on?.5:.1} style={{transition:"all .6s"}}/>
      <polygon points="100,84 85,94 100,98 115,94" fill={A} fillOpacity={on?.25:0} stroke={A} strokeWidth="1" strokeOpacity={on?.6:.1} style={{transition:"all .6s",transitionDelay:".1s"}}/>
      <line x1="115" y1="94" x2="115" y2="104" stroke={A} strokeWidth="1.5" strokeOpacity={on?.5:.1} style={{transition:"opacity .6s",transitionDelay:".2s"}}/>
    </svg>
  );
}

export default function RALDElimu(){
  const [sc,setSc]=useState(false),[on,setOn]=useState(false),[step,setStep]=useState(0);
  useEffect(()=>{setTimeout(()=>setOn(true),600);},[]);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setStep(s=>(s+1)%STEPS.length),2100);return()=>clearInterval(t);},[]);
  /* Swap favicon */
  useEffect(()=>{
    const links=document.querySelectorAll<HTMLLinkElement>('link[rel="icon"],link[rel="shortcut icon"]');
    const prev=links[0]?.href??"";
    links.forEach(l=>{l.href="/elimu-icon.png";});
    return()=>{links.forEach(l=>{l.href=prev;});};
  },[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes elspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes elfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes elup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes elp{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes elgr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .elgrd{background:linear-gradient(135deg,#A855F7,#7C3AED,#0066FF);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200%;animation:elgr 5s ease infinite}
        .elgl{background:rgba(168,85,247,.03);border:1px solid rgba(168,85,247,.08);backdrop-filter:blur(12px)}
        .elgl:hover{border-color:rgba(168,85,247,.18);background:rgba(168,85,247,.05)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all" style={{background:sc?`${BG}E8`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:22,width:"auto",filter:"brightness(0) invert(1)"}}/></Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Ecosystem","/#ecosystem"],["Products","/products"],["Developers","/developers"]].map(([l,h])=>(
            <Link key={l} href={h} style={{color:"rgba(255,255,255,.4)"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#fff"}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)"}}>{l}</Link>
          ))}
          <a href="https://app.rald.cloud" className="px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff"}}>Enrol School</a>
        </div>
        <button className="md:hidden" style={{color:A}}><Menu className="w-5 h-5"/></button>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(${A}04 1px,transparent 1px),linear-gradient(90deg,${A}04 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
        <div className="absolute" style={{top:"50%",left:"55%",width:600,height:600,transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${A}08 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{animation:"elup .8s ease forwards"}}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6" style={{background:`${A}10`,border:`1px solid ${A}30`,color:A}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:A,animation:"elp 2s ease-in-out infinite"}}/>Education Layer · RALD OS
            </div>
            {/* Real Elimu logo */}
            <div className="mb-7">
              <img src="/elimu-wordmark.png" alt="RALD Elimu" style={{height:42,width:"auto",maxWidth:260,objectFit:"contain"}}/>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">The operating</span>
              <span className="block text-white">system for</span>
              <span className="elgrd block">African schools.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Student management, teacher tools, parent comms and school fees — all connected via RALD ALIA identity.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}40`}}>
                Enrol Your School <ArrowRight className="w-4 h-4"/>
              </a>
              <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>
                <Code2 className="w-4 h-4"/> API Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{height:320,animation:"elfl 6s ease-in-out infinite"}}>
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
            <div className="text-xs font-mono mb-3" style={{color:A}}>ONBOARDING</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Your school, fully digital in 4 steps</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s,i)=>(
              <div key={i} onClick={()=>setStep(i)} className="elgl rounded-2xl p-6 cursor-pointer transition-all relative" style={{borderColor:step===i?`${A}50`:`${A}08`,background:step===i?`${A}06`:"rgba(168,85,247,.01)",transform:step===i?"translateY(-2px)":"none"}}>
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
            <h2 className="text-3xl md:text-4xl font-black text-white">Everything a school needs to run</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPS.map(c=>(
              <div key={c.title} className="elgl rounded-2xl p-7 transition-all group hover:scale-[1.02]" style={{borderColor:`${c.color}10`}}>
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
          <div className="flex items-center justify-center mb-8">
            <img src="/elimu-wordmark.png" alt="RALD Elimu" style={{height:44,width:"auto",maxWidth:260,objectFit:"contain"}}/>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">World-class education infrastructure for every African school.</h2>
          <p className="text-white/45 text-lg mb-10">From primary school to university — RALD Elimu scales with every institution.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all" style={{background:A,color:"#fff",boxShadow:`0 0 30px ${A}35`}}>
            Enrol Your School <ArrowRight className="w-4 h-4"/>
          </a>
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
