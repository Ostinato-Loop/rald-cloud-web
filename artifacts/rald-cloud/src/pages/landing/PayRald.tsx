import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Zap, RefreshCw, ShieldCheck, Smartphone } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const A = "#0066FF", BG = "#020510", S = "#030714";

const STORIES = [
  { emoji: "🛒", name: "Online store",    city: "Lagos",   story: "Her customer's card failed at checkout. PayRald instantly switched to a different gateway. The sale went through. She never even knew there was an issue." },
  { emoji: "🏪", name: "Market seller",   city: "Aba",     story: "He was unbanked until PayRald. Now he receives ₦40,000 a day in his PayRald wallet. He pays his suppliers from the same wallet. Zero bank fees." },
  { emoji: "🚀", name: "Startup founder", city: "Nairobi", story: "He added PayRald to his app in one afternoon. One API key. The payment page worked in 20 minutes. His first transaction came in an hour later." },
];

const FEATURES = [
  { icon: Zap,         label: "Finds the gateway that works",   desc: "PayRald checks Paystack, Flutterwave and 8 more gateways in real-time — and picks whichever has the highest success rate. Every transaction." },
  { icon: RefreshCw,   label: "Auto-retries on failure",        desc: "If a payment fails, we retry with the next best gateway automatically. Your customer doesn't see the failure. They just pay." },
  { icon: ShieldCheck, label: "Fraud caught before it hits you", desc: "AI trained on 50M+ Nigerian transactions. Blocks fraud before it reaches your account. Sub-0.1% fraud rate." },
  { icon: Smartphone,  label: "USSD for customers without cards", desc: "Not everyone has a debit card. USSD and mobile money let all Nigerians pay — card or not." },
];

export default function PayRald() {
  const [sc, setSc] = useState(false), [active, setActive] = useState(0);

  useSEO({
    title: "PayRald — Payments That Work Every Time | RALD.cloud",
    description: "PayRald is Africa's smartest payment infrastructure. Send, receive, and process money instantly — with automatic gateway switching, fraud detection, and USSD support for every Nigerian.",
    url: "https://rald.cloud/payrald",
    themeColor: A,
    product: { name: "PayRald", applicationCategory: "FinanceApplication", operatingSystem: "Web, Android, iOS", offers: { price: "0", priceCurrency: "NGN" } },
  });

  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % STORIES.length), 3200); return () => clearInterval(t); }, []);

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <style>{`
        @keyframes pup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pp{0%,100%{opacity:.35}50%{opacity:1}}
        .pgrd{background:linear-gradient(135deg,#0066FF,#00E5FF);-webkit-background-clip:text;background-clip:text;color:transparent}
        .pcard{background:rgba(0,102,255,.04);border:1px solid rgba(0,102,255,.1);border-radius:16px;transition:all .25s}
        .pcard:hover{background:rgba(0,102,255,.08);border-color:rgba(0,102,255,.25);transform:translateY(-3px)}
        .pcode{font-family:ui-monospace,monospace;font-size:12px;line-height:1.8;color:#8EB4FF}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 transition-all"
        style={{ background: sc ? `${BG}F2` : "transparent", backdropFilter: sc ? "blur(16px)" : "none", borderBottom: sc ? `1px solid ${A}15` : "1px solid transparent" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height: 20, filter: "brightness(0) invert(1)" }} /></Link>
        
      </nav>

      <main>
        {/* HERO */}
        <section aria-label="Hero" className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-12" style={{ animation: "pup .7s ease forwards" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: `${A}12`, border: `1px solid ${A}30`, color: A }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: A, display: "inline-block", animation: "pp 2s ease-in-out infinite" }} />
            Payments Layer · RALD OS
          </div>
          <img src="/payrald-wordmark.png" alt="PayRald" style={{ height: 52, width: "auto", maxWidth: 240, objectFit: "contain", marginBottom: 28, filter: `drop-shadow(0 0 20px ${A}30)` }} />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5" style={{ maxWidth: 700 }}>
            Payments that work<br /><span className="pgrd">every single time.</span>
          </h1>
          <p className="text-lg md:text-xl mb-10" style={{ color: "rgba(255,255,255,.5)", maxWidth: 520, lineHeight: 1.65 }}>
            Stop losing sales to failed payments. PayRald automatically picks whichever gateway has the best success rate — and switches instantly if it fails. Built for Nigeria and Africa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            
            <Link href="/developers" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(255,255,255,.14)", color: "rgba(255,255,255,.7)" }}>
              Read the docs
            </Link>
          </div>
          <a href="#numbers" className="mt-16 flex flex-col items-center gap-1 text-white/25">
            <span className="text-xs">scroll</span><ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </section>

        {/* LIVE STATS */}
        <section id="numbers" aria-label="Live statistics" className="py-12 px-5" style={{ background: S }}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ v: "97.2%", l: "Payment success rate" }, { v: "<200ms", l: "Gateway decision" }, { v: "10+", l: "Gateway integrations" }, { v: "₦0 setup", l: "Free to start" }].map(m => (
              <div key={m.l} className="pcard p-5 text-center">
                <div className="text-2xl font-black mb-1" style={{ color: A }}>{m.v}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,.4)" }}>{m.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS FLOW */}
        <section aria-label="How PayRald works" className="py-20 px-5">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: A }}>How it works</p>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5">Smart routing that saves every sale</h2>
              <p className="leading-relaxed mb-6" style={{ color: "rgba(255,255,255,.45)" }}>
                Before each payment, PayRald checks which gateway has the highest real-time success rate. It routes there. If the first attempt fails, it retries with the next best gateway — invisible to your customer.
              </p>
              {["Paystack, Flutterwave, Interswitch + 7 more connected", "Real-time success-rate scoring for every transaction", "Automatic retry before showing any error to customer"].map(t => (
                <div key={t} className="flex items-center gap-3 text-sm mb-2" style={{ color: "rgba(255,255,255,.55)" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: A }} />{t}
                </div>
              ))}
            </div>
            {/* Gateway flow visual */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,102,255,.06)", border: `1px solid ${A}20` }}>
              <div className="text-xs font-semibold mb-4" style={{ color: `${A}80` }}>Routing decision — live</div>
              {[
                { name: "Paystack", score: 97, active: true },
                { name: "Flutterwave", score: 91, active: false },
                { name: "Interswitch", score: 88, active: false },
              ].map(g => (
                <div key={g.name} className="mb-3">
                  <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,.5)" }}>
                    <span className="font-semibold" style={{ color: g.active ? A : "inherit" }}>{g.name} {g.active ? "← selected" : ""}</span>
                    <span style={{ color: g.active ? A : "inherit" }}>{g.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.06)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${g.score}%`, background: g.active ? A : "rgba(255,255,255,.15)" }} />
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-3 text-center text-xs font-bold" style={{ color: "#00FF88", borderTop: `1px solid ${A}15` }}>
                ✅ Transaction routed in 187ms
              </div>
            </div>
          </div>
        </section>

        {/* CODE SNIPPET */}
        <section aria-label="Developer integration" className="py-16 px-5" style={{ background: S }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: A }}>For developers</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">Add payments in one afternoon</h2>
            <div className="rounded-2xl overflow-hidden text-left" style={{ border: `1px solid ${A}20`, background: "rgba(0,0,0,.7)" }}>
              <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: `${A}15` }}>
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-2 text-xs" style={{ color: "rgba(255,255,255,.3)" }}>Node.js · payrald</span>
              </div>
              <pre className="pcode p-6">{`import PayRald from "@rald/payrald";
const pay = new PayRald({ apiKey: process.env.PAYRALD_KEY });

const charge = await pay.charge({
  amount: 12500,          // ₦125.00
  currency: "NGN",
  customer: { email: "adaeze@example.com" },
  meta: { orderId: "ORD-001" }
});

// ✅ Routed to Paystack (97% success) in 187ms
// ✅ Charged successfully`}</pre>
            </div>
          </div>
        </section>

        {/* STORIES */}
        <section aria-label="Customer stories" className="py-24 px-5">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: A }}>Real businesses</p>
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">How Africans use PayRald</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {STORIES.map((s, i) => (
                <article key={i} className="pcard p-6 cursor-pointer" onClick={() => setActive(i)} style={{ borderColor: active === i ? `${A}40` : `${A}10`, background: active === i ? `${A}07` : "rgba(0,102,255,.02)" }}>
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
        <section aria-label="Features" className="py-24 px-5" style={{ background: S }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: A }}>Why PayRald</p>
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">Built for how Africa pays</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {FEATURES.map(f => (
                <div key={f.label} className="pcard p-7 flex gap-4">
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
        <section aria-label="Call to action" className="py-24 px-5 text-center" style={{ borderTop: `1px solid ${A}10` }}>
          <div className="max-w-xl mx-auto">
            <img src="/payrald-wordmark.png" alt="PayRald" style={{ height: 40, width: "auto", objectFit: "contain", margin: "0 auto 24px" }} />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Stop losing sales<br />to failed payments.</h2>
            <p className="mb-10" style={{ color: "rgba(255,255,255,.45)" }}>Free API key. No credit card. Your first payment in under an hour.</p>
            
          </div>
        </section>
      </main>

      <footer className="py-8 px-5" style={{ background: "#010508", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <img src="/rald-wordmark.png" alt="RALD" style={{ height: 18, filter: "brightness(0) invert(1)" }} />
          <nav className="flex gap-5 text-xs" style={{ color: "rgba(255,255,255,.25)" }} aria-label="Footer navigation">
            {[["Home", "/"], ["ALIA", "/alia"], ["Developers", "/developers"], ["Privacy", "/privacy"]].map(([l, h]) => (
              <Link key={l} href={h} className="hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </nav>
          <div className="text-xs" style={{ color: "rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
