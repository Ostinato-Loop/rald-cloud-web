import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "console",
  name: "RALD Control Center",
  tagline: "The bridge between vision and execution.",
  description: "A single command center for governing the entire RALD.cloud ecosystem. Monitor all 12 services, rotate credentials, manage deployments, and orchestrate your AI agent fleet — from one hardened dashboard.",
  gradient: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)",
  glowColor: "#94a3b8",
  accentColor: "#e2e8f0",
  features: [
    { icon: "🖥️", title: "Ecosystem Overview", desc: "Live health grid for all 12 RALD services. Instant status for every endpoint. Historical uptime charts." },
    { icon: "🔐", title: "Credential Vault", desc: "Store, rotate, and audit 3rd-party API keys. Sentinel auto-alerts when credentials approach expiry." },
    { icon: "☁️", title: "CF Deployments", desc: "Trigger Cloudflare Pages and Worker deployments. View build logs. Rollback in one click." },
    { icon: "🤖", title: "Agent Command", desc: "Dispatch Atlas, Nova, Forge, and all 7 agents. View their activity feed. Override their decisions." },
    { icon: "📊", title: "Expansion Board", desc: "Real-time profit scores for 12 African regions. AI recommendations update every 6 hours." },
    { icon: "🔑", title: "Access Control", desc: "Role-based access for your team. Audit logs for every action. SSO via RALD Identity." },
  ],
  stats: [
    { value: "12", label: "Services monitored" },
    { value: "7", label: "AI agents" },
    { value: "100%", label: "Audit logged" },
    { value: "99.9%", label: "Dashboard uptime" },
  ],
  cta: "One dashboard to rule them all.",
};

export default function RALDConsole() {
  return <ProductLandingPage config={config} />;
}
