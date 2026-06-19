import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Truck, MapPin, CheckCircle, BarChart3 } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A="#00BFFF", BG="#020B10", S="#030D14";

const STORIES=[
  {emoji:"👚",name:"Online clothing store",city:"Lagos",story:"Customer in Abuja orders a dress at 9am. Loop Dispatch picks the fastest carrier. It arrives next day. Customer shares the tracking link with her sister — live GPS, no calls needed."},
  {emoji:"💊",name:"Pharmacy",city:"Kaduna",story:"They dispatch 40 orders a day. Before Loop Dispatch, they spent 2 hours calling carriers manually. Now it's one tap. Everything is tracked, delivered and confirmed with a photo."},
  {emoji:"🛒",name:"Jumia seller",city:"Accra",story:"He uses Loop Dispatch to handle overflow when Jumia logistics is full. Best carrier is picked automatically — he saves 15% on delivery costs every month."},
];

const FEATURES=[
  {icon:Truck,label:"Best carrier, auto-selected",desc:"GIG, Sendbox, Kwik and 7+ carriers — Loop picks the fastest and cheapest for each order."},
  {icon:MapPin,label:"Live tracking for customers",desc:"Your buyer gets a link with real GPS tracking. They follow their package without calling you."},
  {icon:CheckCircle,label:"Photo proof of delivery",desc:"Driver takes a photo on delivery. You have proof. No 'I didn't receive it' disputes."},
  {icon:BarChart3,label:"See all your deliveries",desc:"Average delivery time, successful rate, carrier performance — all in one view."},
];

export default function LoopDispatch(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
    useSEO({title:"Loop Dispatch — Smart Delivery for African Businesses | RALD.cloud",description:"Loop Dispatch automatically picks the fastest and cheapest courier for every order — from GIG to Sendbox. Live GPS tracking. Photo proof of delivery. Works across Nigeria, Kenya and Ghana.",url:"https://rald.cloud/dispatch",themeColor:"#00BFFF",product:{name:"Loop Dispatch",applicationCategory:"BusinessApplication",operatingSystem:"Web, Android, iOS"}});

  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3200);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes dup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dp{0%,100%{opacity:.4}50%{opacity:1}}
        .dgrd{background:linear-gradient(135deg,#00BFFF,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent}
        .dcard{background:rgba(0,191,255,.04);border:1px solid rgba(0,191,255,.1);border-radius:16px;transition:all .25s}
        .dcard:hover{background:rgba(0,191,255,.07);border-color:rgba(0,191,255,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Start shipping →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"dup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"dp 2s ease-in-out infinite"}}/>
          Logistics Layer · RALD OS
        </div>
        <div className="text-5xl mb-3">🚚</div>
        <div className="mb-5 text-3xl font-black" style={{color:A}}>Loop Dispatch</div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          From your shop<br/>to their door.<br/><span className="dgrd">Every time.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          Stop calling courier companies one by one. Loop Dispatch automatically picks the best carrier for every order — cheaper, faster, with live GPS for your buyer.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 28px ${A}40`}}>
            Start shipping <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            Connect your store
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Simple how it works */}
      <section className="py-16 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-10 uppercase tracking-widest" style={{color:A}}>How it works</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-0 relative">
            {[{icon:"📦",step:"Order placed",sub:"From your store or app"},
              {icon:"🤖",step:"Best carrier selected",sub:"GIG, Sendbox, Kwik and more"},
              {icon:"🗺",step:"Driver picks up",sub:"Real-time GPS tracking starts"},
              {icon:"✅",step:"Delivered & confirmed",sub:"Photo proof sent to you"},
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
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real stories</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Businesses saving time and money</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="dcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(0,191,255,.03)"}}>
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
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Delivery made simple</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="dcard p-7 flex gap-4">
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
          <div className="text-4xl mb-6">📦</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Deliver more.<br/>Spend less. Stress less.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Connects with your store in minutes. Free to try.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
            Start shipping free <ArrowRight className="w-4 h-4"/>
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
