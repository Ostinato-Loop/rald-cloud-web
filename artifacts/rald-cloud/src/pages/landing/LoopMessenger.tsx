import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Lock, Wifi, CreditCard, Globe } from "lucide-react";

const A="#FF7A00", BG="#0F0700", S="#120900";

const STORIES=[
  {emoji:"💸",name:"Tunde",city:"Ibadan",story:"He was on a video call with his sister in the UK. She needed ₦15,000 urgently. He sent it in the same chat — without leaving the app."},
  {emoji:"📶",name:"Amara",city:"Aba",story:"Her network is always unstable. But Loop Messenger still delivered her messages. They queued up and sent the moment signal came back."},
  {emoji:"🏢",name:"QuickMart",city:"Nairobi",story:"They handle customer support on Loop Messenger. When a customer complains about an order, the team sees it and responds — payments included."},
];

const FEATURES=[
  {icon:CreditCard,label:"Send money in a chat",desc:"Type your message. Attach money. Send. No bank app needed."},
  {icon:Lock,label:"Fully encrypted",desc:"Nobody can read your chats. Not even us. End-to-end, always."},
  {icon:Wifi,label:"Works on slow network",desc:"Even on 2G or patchy WiFi. Messages queue and deliver when signal returns."},
  {icon:Globe,label:"24 African languages",desc:"Chat in Yoruba, Hausa, Igbo, Swahili, Zulu. Loop speaks your language."},
];

export default function LoopMessenger(){
  const [sc,setSc]=useState(false),[active,setActive]=useState(0);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3000);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes mup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mp{0%,100%{opacity:.4}50%{opacity:1}}
        .mgrd{background:linear-gradient(135deg,#FF7A00,#FFD400);-webkit-background-clip:text;background-clip:text;color:transparent}
        .mcard{background:rgba(255,122,0,.04);border:1px solid rgba(255,122,0,.1);border-radius:16px;transition:all .25s}
        .mcard:hover{background:rgba(255,122,0,.07);border-color:rgba(255,122,0,.22);transform:translateY(-2px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://app.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Download →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"mup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"mp 2s ease-in-out infinite"}}/>
          Part of RALD OS
        </div>
        <img src="/loop-messenger-wordmark.png" alt="Loop Messenger" style={{height:60,width:"auto",maxWidth:340,objectFit:"contain",marginBottom:32}}/>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Chat and send money<br/><span className="mgrd">in one message.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:500,lineHeight:1.65}}>
          Stop switching between WhatsApp and your bank app. With Loop Messenger, you chat and pay — in the same conversation. Works even when your network is slow.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://app.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 28px ${A}40`}}>
            Download free <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/payrald" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            See PayRald payments
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      <section id="stories" className="py-24 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Real stories</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">How Africans use Loop Messenger</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="mcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(255,122,0,.03)"}}>
                <div className="text-3xl mb-4">{s.emoji}</div>
                <div className="font-black text-white mb-0.5">{s.name}</div>
                <div className="text-xs mb-4" style={{color:`${A}80`}}>{s.city}</div>
                <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,.55)"}}>{s.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live chat preview */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{color:A}}>See it in action</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-5">Paying someone has never been this fast</h2>
            <p className="leading-relaxed mb-6" style={{color:"rgba(255,255,255,.45)"}}>
              Open a chat. Type a message. Tap the ₦ button. Enter amount. Send. <strong className="text-white">Done.</strong> The money arrives instantly in their PayRald wallet — no account number, no bank codes.
            </p>
            <div className="flex flex-col gap-3">
              {["No bank account number needed","Instant settlement, any time","Works person-to-person or business"].map(t=>(
                <div key={t} className="flex items-center gap-3 text-sm" style={{color:"rgba(255,255,255,.6)"}}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:A}}/>
                  {t}
                </div>
              ))}
            </div>
          </div>
          {/* Mock chat bubble */}
          <div className="rounded-2xl p-6 max-w-xs mx-auto w-full" style={{background:"rgba(255,122,0,.06)",border:`1px solid ${A}20`}}>
            <div className="text-xs mb-4 font-semibold" style={{color:`${A}70`}}>Tunde → Sister Bose</div>
            {[{side:"right",msg:"Hey Bose! Sending you the ₦15,000 now 🙏",pay:false},{side:"right",msg:"₦15,000",pay:true},{side:"left",msg:"Received! Thank you bro ❤️",pay:false}].map((b,i)=>(
              <div key={i} className={`flex mb-3 ${b.side==="right"?"justify-end":"justify-start"}`}>
                <div className="rounded-2xl px-4 py-2.5 max-w-[80%]" style={{
                  background:b.side==="right"?A:"rgba(255,255,255,.08)",
                  color:b.side==="right"?"#000":"#fff",
                  border:b.pay?`2px solid ${A}`:undefined,
                  fontWeight:b.pay?"900":"normal",
                  fontSize:b.pay?18:14
                }}>
                  {b.msg}
                </div>
              </div>
            ))}
            <div className="text-xs mt-2 text-center" style={{color:`${A}50`}}>✓ Delivered in 0.8s</div>
          </div>
        </div>
      </section>

      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Features</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Built for how Africans actually communicate</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="mcard p-7 flex gap-4">
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

      <section className="py-24 px-5 text-center" style={{background:S,borderTop:`1px solid ${A}10`}}>
        <div className="max-w-xl mx-auto">
          <img src="/loop-messenger-wordmark.png" alt="Loop Messenger" style={{height:44,width:"auto",objectFit:"contain",margin:"0 auto 24px"}}/>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Chat. Pay. Done.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Free to download. Free to send. No hidden charges.</p>
          <a href="https://app.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
            Download Loop Messenger <ArrowRight className="w-4 h-4"/>
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
