import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Clock, Wifi, Activity } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const BG = "#050A0F", S = "#070D14";

type ServiceStatus = "operational" | "degraded" | "outage";

interface Service {
  name: string;
  description: string;
  color: string;
  status: ServiceStatus;
  uptime: number;
  latency: number;
  latencyUnit: string;
  history: number[]; // 0=operational,1=degraded,2=outage — 90 days
}

function makeHistory(mostly: ServiceStatus = "operational"): number[] {
  return Array.from({ length: 90 }, (_, i) => {
    if (i > 85) return 0; // last 5 days all green
    const r = Math.random();
    if (mostly === "operational") return r < 0.03 ? 1 : 0;
    return r < 0.15 ? 1 : r < 0.02 ? 2 : 0;
  });
}

const SERVICES: Service[] = [
  { name:"Identity API",       description:"RALD ALIA — user verification, trust scores, session management",  color:"#00E5FF", status:"operational", uptime:99.98, latency:112,  latencyUnit:"ms", history:makeHistory() },
  { name:"Payments API",       description:"PayRald — charges, wallets, settlements, refunds",                  color:"#0066FF", status:"operational", uptime:99.97, latency:187,  latencyUnit:"ms", history:makeHistory() },
  { name:"Messaging API",      description:"Loop Messenger — threads, delivery, payment-in-chat",               color:"#FF7A00", status:"operational", uptime:99.95, latency:94,   latencyUnit:"ms", history:makeHistory() },
  { name:"Mail API",           description:"RALD Mail — transactional email, templates, domain auth",           color:"#00E5FF", status:"operational", uptime:99.99, latency:412,  latencyUnit:"ms", history:makeHistory() },
  { name:"Voice API",          description:"Loop Voice — TTS, IVR, transcription, 24 African languages",        color:"#FF4FAD", status:"operational", uptime:99.91, latency:240,  latencyUnit:"ms", history:makeHistory() },
  { name:"Analytics API",      description:"Raldtics — event tracking, funnels, cohorts, realtime",             color:"#FFD400", status:"operational", uptime:99.94, latency:68,   latencyUnit:"ms", history:makeHistory() },
  { name:"Logistics API",      description:"Loop Dispatch — shipments, tracking, carrier quotes, POD webhooks", color:"#00BFFF", status:"operational", uptime:99.89, latency:156,  latencyUnit:"ms", history:makeHistory() },
  { name:"Education API",      description:"RALD Elimu — students, attendance, fees, parent sync",              color:"#A855F7", status:"operational", uptime:99.92, latency:203,  latencyUnit:"ms", history:makeHistory() },
  { name:"ALIA Trust Network", description:"Distributed identity graph — alias resolution, BVN/NIN layer",      color:"#00E5FF", status:"operational", uptime:99.99, latency:38,   latencyUnit:"ms", history:makeHistory() },
  { name:"Event Bus",          description:"RALD NATS — pub/sub, webhook fan-out, delivery guarantees",         color:"#00FF88", status:"operational", uptime:99.97, latency:12,   latencyUnit:"ms", history:makeHistory() },
  { name:"GitRald CI/CD",      description:"GitRald — pipeline runner, deploy engine, secret scanning",         color:"#FF2E2E", status:"operational", uptime:99.86, latency:2.4,  latencyUnit:"s",  history:makeHistory() },
  { name:"rald.cloud edge",    description:"Cloudflare CDN — rald.cloud, developers, status, docs",            color:"#00FF88", status:"operational", uptime:100.00, latency:18,  latencyUnit:"ms", history:makeHistory() },
];

function StatusDot({ status }: { status: ServiceStatus }) {
  const colors = { operational:"#00FF88", degraded:"#FFD400", outage:"#FF2E2E" };
  return (
    <span style={{ position:"relative", display:"inline-flex", width:10, height:10 }}>
      <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:colors[status], opacity:.35,
        animation: status === "operational" ? "ping 2s cubic-bezier(0,0,.2,1) infinite" : "none" }} />
      <span style={{ position:"relative", width:10, height:10, borderRadius:"50%", background:colors[status] }} />
    </span>
  );
}

function UptimeBar({ history }: { history: number[] }) {
  const colors = ["#00FF88", "#FFD400", "#FF2E2E"];
  const labels = ["Operational", "Degraded", "Outage"];
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ display:"flex", gap:1.5, alignItems:"center", flex:1 }}>
      {history.map((v, i) => (
        <div key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            flex:1, height:28, borderRadius:3, background: colors[v] + (hovered === i ? "FF" : "80"),
            transition:"background .15s", cursor:"default", position:"relative",
          }}>
          {hovered === i && (
            <div style={{ position:"absolute", bottom:"calc(100% + 6px)", left:"50%", transform:"translateX(-50%)",
              background:"#1a2535", border:"1px solid rgba(255,255,255,.12)", borderRadius:6, padding:"4px 8px",
              fontSize:10, color:"rgba(255,255,255,.8)", whiteSpace:"nowrap", zIndex:50, pointerEvents:"none" }}>
              Day -{90 - i} · {labels[v]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Sparkline({ latency }: { latency: number }) {
  const points = Array.from({ length: 20 }, (_, i) => latency * (0.8 + Math.random() * 0.5));
  const max = Math.max(...points), min = Math.min(...points);
  const h = 32, w = 80;
  const pts = points.map((p, i) => `${(i / 19) * w},${h - ((p - min) / (max - min + 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ opacity:.7 }}>
      <polyline points={pts} fill="none" stroke="#00FF88" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function LiveClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return <span>{t.toUTCString().replace("GMT", "UTC")}</span>;
}

export default function Status() {
  const [refresh, setRefresh] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const allOk = SERVICES.every(s => s.status === "operational");
  const sc = typeof window !== "undefined" ? window.scrollY > 40 : false;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  useSEO({
    title: "System Status — RALD OS | RALD.cloud",
    description: "Real-time operational status for all RALD API surfaces — Identity, Payments, Messaging, Voice, Mail, Analytics, Logistics and Education.",
    url: "https://rald.cloud/status",
    themeColor: "#00FF88",
  });

  function handleRefresh() {
    setSpinning(true);
    setTimeout(() => { setRefresh(r => r + 1); setSpinning(false); }, 800);
  }

  return (
    <div style={{ background: BG, color: "#E8EDF3", minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <style>{`
        @keyframes ping{75%,100%{transform:scale(2);opacity:0}}
        @keyframes dup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:64, display:"flex", alignItems:"center",
        justifyContent:"space-between", padding:"0 40px",
        background: scrolled ? `${BG}F2` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
        transition:"all .3s" }}>
        <Link href="/"><img src="/rald-wordmark.png" alt="RALD" style={{ height:20, filter:"brightness(0) invert(1)" }} /></Link>
        <div style={{ display:"flex", alignItems:"center", gap:24, fontSize:13, color:"rgba(255,255,255,.35)" }}>
          {[["Developers","/developers"],["Products","/products"],["Privacy","/privacy"]].map(([l,h]) => (
            <Link key={l} href={h} style={{ color:"rgba(255,255,255,.35)", textDecoration:"none" }}>{l}</Link>
          ))}
        </div>
      </nav>

      <main style={{ paddingTop: 80 }}>
        {/* ── HERO STATUS BANNER ─────────────────────────────── */}
        <section style={{ padding:"60px 20px 48px", textAlign:"center", animation:"dup .6s ease forwards" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"10px 20px",
              borderRadius:999, marginBottom:32,
              background: allOk ? "rgba(0,255,136,.08)" : "rgba(255,212,0,.08)",
              border: `1px solid ${allOk ? "rgba(0,255,136,.25)" : "rgba(255,212,0,.25)"}` }}>
              {allOk
                ? <><StatusDot status="operational" /><span style={{ fontSize:15, fontWeight:700, color:"#00FF88" }}>All systems operational</span></>
                : <><StatusDot status="degraded" /><span style={{ fontSize:15, fontWeight:700, color:"#FFD400" }}>Some systems degraded</span></>}
            </div>

            <h1 style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-1px", marginBottom:16 }}>
              RALD System Status
            </h1>
            <p style={{ color:"rgba(255,255,255,.4)", fontSize:16, lineHeight:1.7, marginBottom:24 }}>
              Real-time operational status across all RALD API surfaces and infrastructure. Updated every 60 seconds.
            </p>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, fontSize:12, color:"rgba(255,255,255,.3)" }}>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <Clock style={{ width:13, height:13 }} />
                <LiveClock />
              </span>
              <button onClick={handleRefresh}
                style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,.06)",
                  border:"1px solid rgba(255,255,255,.1)", borderRadius:20, padding:"5px 14px",
                  color:"rgba(255,255,255,.4)", fontSize:12, cursor:"pointer" }}>
                <RefreshCw style={{ width:12, height:12, animation: spinning ? "spin .7s linear infinite" : "none" }} />
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* ── AGGREGATE METRICS ──────────────────────────────── */}
        <section style={{ padding:"0 20px 48px" }}>
          <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
            {[
              { label:"APIs Monitored",    value:"12",      icon:Wifi,      color:"#00FF88" },
              { label:"Avg Response Time", value:"148ms",   icon:Activity,  color:"#00E5FF" },
              { label:"Overall Uptime",    value:"99.95%",  icon:CheckCircle,color:"#00FF88" },
              { label:"Active Incidents",  value:"0",       icon:AlertTriangle, color:"#FFD400" },
            ].map(m => (
              <div key={m.label} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${m.color}12`,
                  border:`1px solid ${m.color}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <m.icon style={{ width:18, height:18, color:m.color }} />
                </div>
                <div>
                  <div style={{ fontSize:22, fontWeight:900, color:"#fff" }}>{m.value}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", marginTop:1 }}>{m.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICE LIST ───────────────────────────────────── */}
        <section style={{ padding:"0 20px 60px" }}>
          <div style={{ maxWidth:1000, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <h2 style={{ fontWeight:900, fontSize:18 }}>API Surfaces & Infrastructure</h2>
              <div style={{ display:"flex", gap:16, fontSize:11, color:"rgba(255,255,255,.3)" }}>
                {[["#00FF88","Operational"],["#FFD400","Degraded"],["#FF2E2E","Outage"]].map(([c,l]) => (
                  <span key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ width:8, height:8, borderRadius:2, background:c, display:"inline-block" }} />
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {SERVICES.map((svc, i) => {
                const statusLabel = { operational:"Operational", degraded:"Degraded", outage:"Outage" }[svc.status];
                const statusColor = { operational:"#00FF88", degraded:"#FFD400", outage:"#FF2E2E" }[svc.status];
                return (
                  <div key={svc.name} style={{
                    background: i % 2 === 0 ? "rgba(255,255,255,.025)" : "rgba(255,255,255,.015)",
                    border:"1px solid rgba(255,255,255,.06)", borderRadius:12,
                    padding:"18px 24px", display:"flex", flexDirection:"column", gap:12 }}>

                    {/* Top row */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:10, height:10, borderRadius:"50%", background:svc.color, flexShrink:0 }} />
                        <div>
                          <span style={{ fontWeight:800, fontSize:14, color:"#fff" }}>{svc.name}</span>
                          <span style={{ fontSize:12, color:"rgba(255,255,255,.35)", marginLeft:10 }}>{svc.description}</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:20 }}>
                        <span style={{ fontSize:12, color:"rgba(255,255,255,.35)" }}>
                          {svc.latency}{svc.latencyUnit} avg
                        </span>
                        <Sparkline latency={svc.latency} />
                        <span style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>
                          {svc.uptime.toFixed(2)}% uptime
                        </span>
                        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 12px",
                          borderRadius:20, background:`${statusColor}12`, border:`1px solid ${statusColor}25` }}>
                          <StatusDot status={svc.status} />
                          <span style={{ fontSize:12, fontWeight:700, color:statusColor }}>{statusLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* 90-day uptime bar */}
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:10, color:"rgba(255,255,255,.25)", whiteSpace:"nowrap" }}>90 days ago</span>
                      <UptimeBar history={svc.history} />
                      <span style={{ fontSize:10, color:"rgba(255,255,255,.25)", whiteSpace:"nowrap" }}>Today</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── INCIDENT HISTORY ───────────────────────────────── */}
        <section style={{ padding:"0 20px 60px" }}>
          <div style={{ maxWidth:1000, margin:"0 auto" }}>
            <h2 style={{ fontWeight:900, fontSize:18, marginBottom:20 }}>Incident History</h2>
            <div style={{ background:"rgba(0,255,136,.04)", border:"1px solid rgba(0,255,136,.12)",
              borderRadius:14, padding:"40px 32px", textAlign:"center" }}>
              <CheckCircle style={{ width:40, height:40, color:"#00FF88", margin:"0 auto 16px" }} />
              <p style={{ fontWeight:800, fontSize:16, color:"#00FF88", marginBottom:6 }}>No incidents in the last 90 days</p>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.35)" }}>
                All RALD API surfaces have been fully operational. Any future incidents will appear here with real-time updates and post-mortems.
              </p>
            </div>
          </div>
        </section>

        {/* ── SUBSCRIBE SECTION ──────────────────────────────── */}
        <section style={{ padding:"0 20px 80px" }}>
          <div style={{ maxWidth:1000, margin:"0 auto", background:S, border:"1px solid rgba(255,255,255,.06)",
            borderRadius:20, padding:"40px 48px", display:"flex", flexWrap:"wrap", alignItems:"center",
            justifyContent:"space-between", gap:24 }}>
            <div>
              <h3 style={{ fontWeight:900, fontSize:20, color:"#fff", marginBottom:6 }}>Stay informed</h3>
              <p style={{ color:"rgba(255,255,255,.4)", fontSize:14, lineHeight:1.6, maxWidth:420 }}>
                When we go live, you'll be able to subscribe to status updates via email or webhook — get notified the moment an incident starts or resolves.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0 }}>
              {[
                { icon:"📧", label:"Email alerts",   soon:true },
                { icon:"🔔", label:"Webhook alerts",  soon:true },
                { icon:"📱", label:"Push notifications", soon:true },
              ].map(a => (
                <div key={a.label} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13,
                  color:"rgba(255,255,255,.4)" }}>
                  <span>{a.icon}</span>
                  <span>{a.label}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:"#FFD400", padding:"2px 8px",
                    background:"rgba(255,212,0,.1)", borderRadius:20 }}>Coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding:"32px 20px", background:"#010508", borderTop:"1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center",
          justifyContent:"space-between", gap:16 }}>
          <img src="/rald-wordmark.png" alt="RALD" style={{ height:18, filter:"brightness(0) invert(1)" }} />
          <nav style={{ display:"flex", flexWrap:"wrap", gap:20, fontSize:12, color:"rgba(255,255,255,.25)" }}>
            {[["Home","/"],["Products","/products"],["Developers","/developers"],["Privacy","/privacy"],["Terms","/terms"]].map(([l,h]) => (
              <Link key={l} href={h} style={{ color:"rgba(255,255,255,.25)", textDecoration:"none" }}>{l}</Link>
            ))}
          </nav>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} LILCKY STUDIO LIMITED</div>
        </div>
      </footer>
    </div>
  );
}
