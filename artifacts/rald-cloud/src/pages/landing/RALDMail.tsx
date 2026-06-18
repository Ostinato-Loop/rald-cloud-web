import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, X, Mail, Zap, Shield, BarChart3, Globe, Code2, ChevronDown, CheckCircle } from "lucide-react";

const A="#00E5FF",BG="#020B10",S="#030D14";

const CAPS=[
  {icon:Zap,title:"Transactional Email",color:A,desc:"Receipts, OTPs, welcome emails and order updates — delivered in <500ms from Lagos and Nairobi."},
  {icon:Mail,title:"Marketing Campaigns",color:"#FFD400",desc:"Build, segment and send campaigns to millions. Visual editor, A/B testing, auto-scheduling."},
  {icon:Shield,title:"Email Security",color:"#00FF88",desc:"SPF, DKIM, DMARC configured out of the box. Zero spam folder deliveries for RALD-powered senders."},
  {icon:BarChart3,title:"Delivery Analytics",color:"#A855F7",desc:"Open rates, clicks, bounces, unsubscribes — per campaign and per user in real-time."},
  {icon:Globe,title:"African Routing",color:"#FF7A00",desc:"Smart routing via Gmail, Yahoo, Outlook, Webmail Africa — highest inbox placement on the continent."},
  {icon:Code2,title:"Mail API + SDK",color:"#0066FF",desc:"REST API and Node/Python SDK. Send in 3 lines. Webhooks for delivery, open and click events."},
];

const METRICS=[
  {label:"Delivery Rate",value:"99.7%",delta:"+0.2pp",color:A},
  {label:"Avg Inbox Time",value:"420ms",delta:"-60ms",color:"#00FF88"},
  {label:"Open Rate",value:"38%",delta:"+4pp",color:"#FFD400"},
  {label:"Bounce Rate",value:"0.3%",delta:"-0.1pp",color:"#A855F7"},
];

const CODE=`import { RALDMail } from "@rald/mail";

const mail = new RALDMail({ apiKey: process.env.RALD_MAIL_KEY });

await mail.send({
  to: "user@example.com",
  template: "otp-verify",
  data: { otp: "847291", name: "Adaeze" },
});
// ✅ Delivered in 412ms`;

function Orb({on}:{on:boolean}){
  return(
    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",overflow:"visible"}}>
      <defs>
        <radialGradient id="mailg"><stop offset="0%" stopColor={A} stopOpacity=".15"/><stop offset="100%" stopColor={A} stopOpacity="0"/></radialGradient>
        <filter id="mailf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Orbit rings */}
      {[50,65,80].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={A} strokeWidth=".5" strokeOpacity={on?.2-i*.05:.06}/>)}
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeWidth="1" strokeDasharray="6 14" strokeOpacity=".3"
        style={{transformOrigin:"100px 100px",animation:on?"mailspin 10s linear infinite":"none"}}/>
      {on&&<circle cx="170" cy="100" r="3.5" fill={A} filter="url(#mailf)"
        style={{transformOrigin:"100px 100px",animation:"mailspin 10s linear infinite"}}/>}
      {/* Glow core */}
      <circle cx="100" cy="100" r="46" fill="url(#mailg)"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke={A} strokeWidth="1.5" strokeOpacity={on?.75:.2}/>
      {/* Envelope body */}
      <rect x="76" y="86" width="48" height="32" rx="3"
        fill={A} fillOpacity={on?.12:0} stroke={A} strokeWidth="1.2" strokeOpacity={on?.65:.12}
        style={{transition:"all .6s"}}/>
      {/* Envelope flap */}
      <polyline points="76,86 100,106 124,86"
        fill="none" stroke={A} strokeWidth="1.2" strokeOpacity={on?.65:.12}
        style={{transition:"stroke-opacity .6s",transitionDelay:".1s"}}/>
      {/* Envelope corners */}
      {on&&<>
        <line x1="76" y1="118" x2="94" y2="103" stroke={A} strokeWidth="1" strokeOpacity=".3"/>
        <line x1="124" y1="118" x2="106" y2="103" stroke={A} strokeWidth="1" strokeOpacity=".3"/>
      </>}
      {/* Floating particles — tiny send dots */}
      {on&&[[135,80],[140,95],[138,110],[128,75]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2" fill={A} fillOpacity=".5" filter="url(#mailf)"
          style={{animation:`mailpop 2s ease-in-out infinite`,animationDelay:i*.4+"s"}}/>
      ))}
    </svg>
  );
}

export default function RALDMail(){
  const [sc,setSc]=useState(false),[on,setOn]=useState(false),[tab,setTab]=useState(0);
  const metricsRef=useRef<HTMLDivElement>(null);
  const [mv,setMv]=useState(false);
  useEffect(()=>{setTimeout(()=>setOn(true),600);},[]);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{
    const el=metricsRef.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setMv(true)},{threshold:.3});
    obs.observe(el);return()=>obs.disconnect();
  },[]);

  const TABS=[
    {label:"Transactional",desc:"OTPs, receipts, password resets — delivered instantly from African infra."},
    {label:"Marketing",desc:"Drag-and-drop campaigns with open/click analytics and auto-unsubscribe."},
    {label:"Webhooks",desc:"Real-time delivery events pushed to your endpoint. Zero polling."},
  ];

  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes mailspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes mailfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes mailup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mailp{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes mailpop{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-6px);opacity:1}}
        @keyframes mailgr{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .mailgrd{background:linear-gradient(135deg,#00E5FF,#0088CC,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200%;animation:mailgr 5s ease infinite}
        .mailgl{background:rgba(0,229,255,.03);border:1px solid rgba(0,229,255,.08);backdrop-filter:blur(12px)}
        .mailgl:hover{border-color:rgba(0,229,255,.18);background:rgba(0,229,255,.05)}
        .mailcode{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.7;color:#A8D8E8}
        .mailcode .kw{color:#00E5FF} .mailcode .str{color:#A8FFB8} .mailcode .cm{color:#4A7A8A}
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all"
        style={{background:sc?`${BG}E8`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:22,width:"auto",filter:"brightness(0) invert(1)"}}/></Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[["Ecosystem","/#ecosystem"],["Products","/products"],["Developers","/developers"]].map(([l,h])=>(
            <Link key={l} href={h} style={{color:"rgba(255,255,255,.4)"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#fff"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)"}}>{l}</Link>
          ))}
          <a href="https://console.rald.cloud" className="px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Get API Key</a>
        </div>
        <button className="md:hidden" style={{color:A}}><Menu className="w-5 h-5"/></button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:`linear-gradient(${A}04 1px,transparent 1px),linear-gradient(90deg,${A}04 1px,transparent 1px)`,backgroundSize:"50px 50px"}}/>
        <div className="absolute pointer-events-none" style={{top:"50%",left:"55%",width:600,height:600,transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${A}08 0%,transparent 65%)`}}/>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div style={{animation:"mailup .8s ease forwards"}}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{background:`${A}10`,border:`1px solid ${A}30`,color:A}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:A,animation:"mailp 2s ease-in-out infinite"}}/>
              Infrastructure Layer · RALD OS
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              <span className="block text-white">Email that</span>
              <span className="block text-white">actually</span>
              <span className="mailgrd block">lands.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Transactional and marketing email infrastructure built for Africa. 99.7% delivery rate. Servers in Lagos and Nairobi.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://console.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all"
                style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}40`}}>
                Get API Key <ArrowRight className="w-4 h-4"/>
              </a>
              <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all"
                style={{border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>
                <Code2 className="w-4 h-4"/> API Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{height:320,animation:"mailfl 6s ease-in-out infinite"}}>
            <div style={{width:280,height:280}}><Orb on={on}/></div>
          </div>
        </div>

        <a href="#metrics" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-xs font-mono">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Live Metrics */}
      <section id="metrics" className="py-28 px-6" style={{background:S}}>
        <div ref={metricsRef} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>LIVE DELIVERY STATS</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Numbers that matter to your business</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5 mb-16">
            {METRICS.map(m=>(
              <div key={m.label} className="mailgl rounded-2xl p-6 text-center" style={{borderColor:`${m.color}15`}}>
                <div className="text-3xl font-black mb-1 transition-all duration-1000" style={{color:m.color,opacity:mv?1:.3}}>{m.value}</div>
                <div className="text-xs font-mono mb-2" style={{color:`${m.color}70`}}>{m.delta}</div>
                <div className="text-xs text-white/40">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Use-case tabs */}
          <div className="mailgl rounded-2xl overflow-hidden">
            <div className="flex border-b" style={{borderColor:`${A}10`}}>
              {TABS.map((t,i)=>(
                <button key={t.label} onClick={()=>setTab(i)} className="flex-1 py-4 text-sm font-semibold transition-all"
                  style={{background:tab===i?`${A}08`:"transparent",color:tab===i?A:"rgba(255,255,255,.35)",borderBottom:tab===i?`2px solid ${A}`:"2px solid transparent"}}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5" style={{color:A}}/>
                  <span className="font-bold text-white">{TABS[tab].label} Email</span>
                </div>
                <p className="text-white/50 leading-relaxed mb-6">{TABS[tab].desc}</p>
                <div className="flex flex-col gap-2">
                  {[
                    tab===0&&["<500ms delivery","99.7% inbox rate","Auto-retry on soft bounce"],
                    tab===1&&["Drag-and-drop editor","A/B subject line test","Auto unsubscribe handling"],
                    tab===2&&["delivered, opened, clicked","bounced, complained","Per-user event timeline"],
                  ][tab]!==false&&((([
                    ["<500ms delivery","99.7% inbox rate","Auto-retry on soft bounce"],
                    ["Drag-and-drop editor","A/B subject line test","Auto unsubscribe handling"],
                    ["delivered, opened, clicked","bounced, complained","Per-user event timeline"],
                  ][tab])||[]) as string[]).map((item:string)=>(
                    <div key={item} className="flex items-center gap-3 text-sm" style={{color:"rgba(255,255,255,.55)"}}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:A}}/>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* Code snippet */}
              <div className="rounded-xl p-5 overflow-x-auto" style={{background:"rgba(0,0,0,.6)",border:`1px solid ${A}15`}}>
                <pre className="mailcode whitespace-pre">{CODE}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono mb-3" style={{color:A}}>CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">The complete email stack</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPS.map(c=>(
              <div key={c.title} className="mailgl rounded-2xl p-7 transition-all duration-300 group hover:scale-[1.02]" style={{borderColor:`${c.color}10`}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all"
                  style={{background:`${c.color}10`,border:`1px solid ${c.color}25`}}>
                  <c.icon className="w-5 h-5" style={{color:c.color}}/>
                </div>
                <h3 className="font-black text-white mb-2">{c.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center" style={{background:S,borderTop:`1px solid ${A}10`}}>
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background:`${A}10`,border:`1px solid ${A}25`}}>
            <Mail className="w-8 h-8" style={{color:A}}/>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">Every email. Every inbox. Delivered.</h2>
          <p className="text-white/45 text-lg mb-10">Send your first email in under 5 minutes. No DNS headaches — RALD Mail handles all of it.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://console.rald.cloud" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all"
              style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
              Get API Key <ArrowRight className="w-4 h-4"/>
            </a>
            <Link href="/developers" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all"
              style={{border:"1px solid rgba(255,255,255,.12)",color:"#fff"}}>
              <Code2 className="w-4 h-4"/> Read the Docs
            </Link>
          </div>
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
