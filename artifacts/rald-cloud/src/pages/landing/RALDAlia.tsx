import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Fingerprint, Shield, Globe, Zap } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#00E5FF", BG = "#020C10", S = "#050F14";

const STORIES = [
  { emoji: "🪪", name: "Chidi", city: "Abuja", story: "He verified once with his NIN. Now he uses Loop, PayRald and Messenger with the same ALIA — no re-registration, no re-upload. One identity, every RALD product." },
  { emoji: "🔒", name: "Fatima's business", city: "Kano", story: "She uses her ALIA alias (@fatima.rald) to receive payments. Customers send to her alias — they never need her bank details. Safe, fast, professional." },
  { emoji: "🌍", name: "Emeka, UK diaspora", city: "London → Lagos", story: "His RALD ALIA is verified for both Nigeria and UK. He sends money and accesses all RALD services with one login — same identity, wherever he is." },
];

const FEATURES = [
  { icon: Fingerprint, label: "One ID, all products", desc: "Register once. Your ALIA works across Loop, PayRald, Elimu, Messenger — no re-sign-up anywhere." },
  { icon: Shield, label: "BVN + NIN verified", desc: "Real-time government ID check. Your identity is confirmed, so others can trust you instantly." },
  { icon: Globe, label: "Your RALD alias (@you.rald)", desc: "Send to @chidi.rald instead of an account number. Simple. Safe. Works everywhere in RALD." },
  { icon: Zap, label: "Fraud protection built-in", desc: "If someone tries to use your identity, RALD blocks it — and alerts you immediately." },
];

export default function RALDAlia() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0);

  useSEO({
    title: "RALD ALIA — Your Digital Identity for Africa | RALD.cloud",
    description: "RALD ALIA is your single verified identity across every RALD product. Verify once with BVN or NIN. Use everywhere — PayRald, Loop, Messenger, Elimu — with one login and one alias.",
    url: "https://rald.cloud/alia",
    themeColor: A,
    product: { name: "RALD ALIA", applicationCategory: "IdentityApplication", operatingSystem: "Web, Android, iOS" },
  });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <style>{`
        @keyframes aup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ap{0%,100%{opacity:.35}50%{opacity:1}}
        .agrd{background:linear-gradient(135deg,#00E5FF,#A855F7);-webkit-background-clip:text;background-clip:text;color:transparent}
        .acard{background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.1);border-radius:16px;transition:all .25s}
        .acard:hover{background:rgba(0,229,255,.08);border-color:rgba(0,229,255,.25);transform:translateY(-3px)}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{ background: sc ? `${BG}F2` : "transparent", backdropFilter: sc ? "blur(16px)" : "none", borderBottom: sc ? `1px solid ${A}15` : "1px solid transparent" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height: 20, filter: "brightness(0) invert(1)" }} /></Link>
        
      </nav>

      <main>
        {/* HERO */}
        <section aria-label="Hero" className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{ animation: "aup .7s ease forwards" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: `${A}12`, border: `1px solid ${A}30`, color: A }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: A, display: "inline-block", animation: "ap 2s ease-in-out infinite" }} />
            Identity Layer · RALD OS
          </div>
          <img src="/alia-wordmark.png" alt="RALD ALIA" style={{ height: 52, width: "auto", maxWidth: 240, objectFit: "contain", marginBottom: 28, filter: `drop-shadow(0 0 20px ${A}30)` }} />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{ maxWidth: 680 }}>
            One identity.<br /><span className="agrd">Every RALD product.</span>
          </h1>
          <p className="text-lg md:text-xl mb-10" style={{ color: "rgba(255,255,255,.5)", maxWidth: 520, lineHeight: 1.65 }}>
            Verify once with your BVN or NIN. Get a RALD alias — like @chidi.rald. Use it to pay, chat, learn and sell — across the whole RALD ecosystem.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            
            <Link href="/payrald" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(255,255,255,.14)", color: "rgba(255,255,255,.7)" }}>
              See PayRald →
            </Link>
          </div>
          <a href="#how" className="mt-16 flex flex-col items-center gap-1 text-white/25">
            <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" aria-label="How RALD ALIA works" className="py-16 px-5" style={{ background: S }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-center mb-10 uppercase tracking-widest" style={{ color: A }}>How it works</p>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 relative">
              {[
                { icon: "📱", step: "Enter your phone", sub: "Verified instantly via SMS" },
                { icon: "🪪", step: "Link BVN or NIN", sub: "Real-time government ID check" },
                { icon: "🤳", step: "Face match", sub: "Selfie compared to your ID photo" },
                { icon: "✨", step: "ALIA created", sub: "Your alias is live across RALD" },
              ].map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center px-4 relative">
                  {i < 3 && <div className="hidden md:block absolute top-5 left-[60%] right-0 h-px" style={{ background: `${A}25` }} />}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 relative z-10" style={{ background: `${A}12`, border: `1px solid ${A}25` }}>{s.icon}</div>
                  <div className="font-black text-white text-sm mb-1">{s.step}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,.35)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALIAS DEMO */}
        <section aria-label="Alias demonstration" className="py-20 px-5">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: A }}>Your RALD alias</p>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5">No more sharing bank account numbers</h2>
              <p className="leading-relaxed mb-6" style={{ color: "rgba(255,255,255,.45)" }}>
                Your RALD alias is like an email address — but for money, identity and everything in RALD. Send it to anyone. They pay you. No bank codes, no wrong account errors.
              </p>
              {["Pay someone without asking for account number", "Receive money from anyone on RALD", "Works for chat, payments, commerce — all in one"].map(t => (
                <div key={t} className="flex items-center gap-3 text-sm mb-2" style={{ color: "rgba(255,255,255,.6)" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: A }} />{t}
                </div>
              ))}
            </div>
            {/* Alias card visual */}
            <div className="rounded-2xl p-7 max-w-xs mx-auto w-full" style={{ background: `${A}08`, border: `1px solid ${A}20` }}>
              <div className="text-xs mb-5 font-semibold" style={{ color: `${A}80` }}>Your RALD identity card</div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${A}15`, border: `1px solid ${A}25` }}>🤳</div>
                <div>
                  <div className="font-black text-white text-lg">@chidi.rald</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,.4)" }}>Chidi Okafor · Lagos NG</div>
                </div>
              </div>
              {[{ label: "Identity verified", val: "✅ BVN + NIN", c: "#00FF88" }, { label: "Trust score", val: "94 / 100", c: A }, { label: "Products active", val: "6 / 11", c: "#FFD400" }].map(r => (
                <div key={r.label} className="flex justify-between items-center py-2 text-sm" style={{ borderTop: `1px solid rgba(255,255,255,.06)` }}>
                  <span style={{ color: "rgba(255,255,255,.4)" }}>{r.label}</span>
                  <span className="font-bold" style={{ color: r.c }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORIES */}
        <section aria-label="User stories" className="py-24 px-5" style={{ background: S }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: A }}>Real people</p>
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">How Africans use RALD ALIA</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {STORIES.map((s, i) => (
                <article key={i} className="acard p-6 cursor-pointer" onClick={() => setActive(i)} style={{ borderColor: active === i ? `${A}40` : `${A}10`, background: active === i ? `${A}07` : "rgba(0,229,255,.02)" }}>
                  <div className="text-3xl mb-4">{s.emoji}</div>
                  <h3 className="font-black text-white mb-0.5">{s.name}</h3>
                  <div className="text-xs mb-4" style={{ color: `${A}80` }}>{s.city}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.55)" }}>{s.story}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section aria-label="Features" className="py-24 px-5">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: A }}>What RALD ALIA does</p>
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Your identity, protecting you everywhere</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {FEATURES.map(f => (
                <div key={f.label} className="acard p-7 flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${A}12`, border: `1px solid ${A}22` }}>
                    <f.icon className="w-5 h-5" style={{ color: A }} />
                  </div>
                  <div>
                    <h3 className="font-black text-white mb-1">{f.label}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Call to action" className="py-24 px-5 text-center" style={{ background: S, borderTop: `1px solid ${A}10` }}>
          <div className="max-w-xl mx-auto">
            <img src="/alia-wordmark.png" alt="RALD ALIA" style={{ height: 38, width: "auto", objectFit: "contain", margin: "0 auto 24px" }} />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">One identity.<br />Endless possibilities.</h2>
            <p className="mb-10" style={{ color: "rgba(255,255,255,.45)" }}>Free to create. Works everywhere in RALD. Takes 2 minutes.</p>
            
          </div>
        </section>
      </main>

      <footer className="py-8 px-5" style={{ background: "#010508", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 18, filter: "brightness(0) invert(1)" }} />
          <nav className="flex gap-5 text-xs" style={{ color: "rgba(255,255,255,.25)" }} aria-label="Footer navigation">
            {[["Home", "/"], ["PayRald", "/payrald"], ["Privacy", "/privacy"]].map(([l, h]) => (
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </nav>
          <div className="text-xs" style={{ color: "rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
