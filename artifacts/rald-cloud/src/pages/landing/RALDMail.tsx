import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, CheckCircle, Code2, Shield, Zap } from "lucide-react";

const A="#00E5FF", BG="#020B10", S="#030D14";

const STORIES=[
  {emoji:"🧾",name:"FinTech receipt",city:"Lagos",story:"User completes a payment on your app. Two seconds later, a clean receipt is in their inbox — not their spam. That's RALD Mail."},
  {emoji:"🔐",name:"OTP delivery",city:"Nairobi",story:"Your app sends an OTP for login. It arrives in under a second. No SMS fees. No failed deliveries. Just reliable email."},
  {emoji:"📢",name:"Promo campaign",city:"Accra",story:"A beauty brand sends 80,000 promotional emails. 38% of subscribers open them. Real numbers, not guesses."},
];

const FEATURES=[
  {icon:Zap,label:"Arrives in seconds",desc:"OTPs, receipts, welcome emails — delivered in under 500ms from servers in Lagos and Nairobi."},
  {icon:Shield,label:"Goes to inbox, not spam",desc:"We handle SPF, DKIM and DMARC for you. Your emails land where they should."},
  {icon:CheckCircle,label:"Know who opened it",desc:"See open rates, clicks, and bounces in real-time. Per campaign and per user."},
  {icon:Code2,label:"3 lines to integrate",desc:"Add RALD Mail to your app in minutes. We have SDKs for Node.js, Python and more."},
];

const CODE = `const mail = new RALDMail({ apiKey: process.env.KEY });

await mail.send({
  to: "customer@example.com",
  template: "receipt",
  data: { amount: "₦12,500", name: "Adaeze" }
});
// ✅ Delivered in 412ms`;

export default function RALDMail(){
  const [sc,setSc]=useState(false),[tab,setTab]=useState(0),[active,setActive]=useState(0);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{const t=setInterval(()=>setActive(a=>(a+1)%STORIES.length),3200);return()=>clearInterval(t);},[]);
  return(
    <div style={{background:BG,color:"#E8EDF3",minHeight:"100vh"}}>
      <style>{`
        @keyframes mup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mp{0%,100%{opacity:.4}50%{opacity:1}}
        .mailgrd{background:linear-gradient(135deg,#00E5FF,#00FF88);-webkit-background-clip:text;background-clip:text;color:transparent}
        .mailcard{background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.1);border-radius:16px;transition:all .25s}
        .mailcard:hover{background:rgba(0,229,255,.07);border-color:rgba(0,229,255,.22);transform:translateY(-2px)}
        .mailcode{font-family:ui-monospace,monospace;font-size:12px;line-height:1.8;color:#9DC8D8;white-space:pre}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{background:sc?`${BG}F0`:"transparent",backdropFilter:sc?"blur(16px)":"none",borderBottom:sc?`1px solid ${A}15`:"1px solid transparent"}}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{height:20,filter:"brightness(0) invert(1)"}}/></Link>
        <a href="https://console.rald.cloud" className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all" style={{background:A,color:"#000"}}>Get API key →</a>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{animation:"mup .7s ease forwards"}}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{background:`${A}12`,border:`1px solid ${A}30`,color:A}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:A,display:"inline-block",animation:"mp 2s ease-in-out infinite"}}/>
          Infrastructure Layer · RALD OS
        </div>
        <img src="/raldmail-wordmark.png" alt="RALD Mail" style={{height:56,width:"auto",maxWidth:280,objectFit:"contain",marginBottom:32,filter:`drop-shadow(0 0 18px ${A}30)`}}/>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{maxWidth:700}}>
          Emails that actually<br/><span className="mailgrd">land in the inbox.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.65}}>
          Send receipts, OTPs and notifications that reach your customers — not their spam folder. Built for Nigerian and African businesses.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://console.rald.cloud" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 28px ${A}40`}}>
            Get free API key <ArrowRight className="w-4 h-4"/>
          </a>
          <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{border:"1px solid rgba(255,255,255,.14)",color:"rgba(255,255,255,.7)"}}>
            <Code2 className="w-4 h-4"/> Read the docs
          </Link>
        </div>
        <a href="#stories" className="mt-16 flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce"/>
        </a>
      </section>

      {/* Stats bar */}
      <section className="py-12 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{v:"99.7%",l:"Delivery rate"},{v:"<500ms",l:"Inbox time"},{v:"38%",l:"Open rate"},{v:"0.3%",l:"Bounce rate"}].map(m=>(
            <div key={m.l} className="mailcard p-5 text-center">
              <div className="text-2xl font-black mb-1" style={{color:A}}>{m.v}</div>
              <div className="text-xs" style={{color:"rgba(255,255,255,.4)"}}>{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="stories" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Use cases</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">What businesses use RALD Mail for</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STORIES.map((s,i)=>(
              <div key={i} className="mailcard p-6 cursor-pointer" onClick={()=>setActive(i)} style={{borderColor:active===i?`${A}40`:`${A}10`,background:active===i?`${A}07`:"rgba(0,229,255,.03)"}}>
                <div className="text-3xl mb-4">{s.emoji}</div>
                <div className="font-black text-white mb-0.5">{s.name}</div>
                <div className="text-xs mb-4" style={{color:`${A}80`}}>{s.city}</div>
                <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,.55)"}}>{s.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code demo */}
      <section className="py-24 px-5" style={{background:S}}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{color:A}}>For developers</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-5">Add email to your app in 3 lines</h2>
            <p className="leading-relaxed mb-6" style={{color:"rgba(255,255,255,.45)"}}>
              Install our SDK, add your API key, call <code className="px-1 py-0.5 rounded text-xs" style={{background:`${A}15`,color:A}}>mail.send()</code>. That's it. We handle delivery, retries, and reporting automatically.
            </p>
            <div className="flex gap-3">
              {["Node.js","Python","PHP"].map((l,i)=>(
                <button key={l} onClick={()=>setTab(i)} className="px-4 py-2 rounded-lg text-xs font-semibold transition-all" style={{background:tab===i?`${A}20`:"rgba(255,255,255,.05)",color:tab===i?A:"rgba(255,255,255,.4)",border:`1px solid ${tab===i?A+"40":"rgba(255,255,255,.08)"}`}}>{l}</button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5 overflow-x-auto" style={{background:"rgba(0,0,0,.7)",border:`1px solid ${A}15`}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full" style={{background:"#FF5F57"}}/>
              <span className="w-3 h-3 rounded-full" style={{background:"#FEBC2E"}}/>
              <span className="w-3 h-3 rounded-full" style={{background:"#28C840"}}/>
            </div>
            <pre className="mailcode">{CODE}</pre>
          </div>
        </div>
      </section>

      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{color:A}}>Why RALD Mail</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">The email stack African apps deserve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f=>(
              <div key={f.label} className="mailcard p-7 flex gap-4">
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
          <img src="/raldmail-wordmark.png" alt="RALD Mail" style={{height:40,width:"auto",objectFit:"contain",margin:"0 auto 24px"}}/>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Every email delivered.<br/>Every time.</h2>
          <p className="mb-10" style={{color:"rgba(255,255,255,.45)"}}>Free tier available. No credit card needed to start.</p>
          <a href="https://console.rald.cloud" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black hover:scale-105 transition-all" style={{background:A,color:"#000",boxShadow:`0 0 30px ${A}35`}}>
            Get free API key <ArrowRight className="w-4 h-4"/>
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
