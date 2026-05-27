import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "raldtics",
  name: "Raldtics",
  tagline: "Data that moves markets.",
  description: "African-first analytics platform. Real-time merchant intelligence, region-specific growth scoring, and AI-powered expansion recommendations — so you always know your next move.",
  gradient: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #6d28d9 100%)",
  glowColor: "#8b5cf6",
  accentColor: "#a78bfa",
  features: [
    { icon: "📈", title: "Real-time Dashboards", desc: "Live transaction feeds, revenue streams, and cohort analysis. Data lands in under 500ms." },
    { icon: "🤖", title: "AI Expansion Engine", desc: "Our model scores 12+ African regions by profit potential. Tells you exactly where to expand next." },
    { icon: "🗺️", title: "Region Intelligence", desc: "City-level breakdown for Lagos, Abuja, PH, Kano and beyond. Growth rates, merchant density, market gaps." },
    { icon: "🔮", title: "Predictive Revenue", desc: "90-day revenue forecasts with 94% accuracy. Factor in seasonality, market trends, competition." },
    { icon: "🧩", title: "SDK Embeds", desc: "Drop Raldtics charts directly into your product. White-labeled, customisable, developer-friendly." },
    { icon: "📤", title: "Data Exports", desc: "CSV, JSON, BigQuery sync, Notion integration. Your data, your format, whenever you need it." },
  ],
  stats: [
    { value: "12+", label: "African regions tracked" },
    { value: "94%", label: "Forecast accuracy" },
    { value: "500ms", label: "Data latency" },
    { value: "5M+", label: "Events/day" },
  ],
  cta: "See through the noise.",
};

export default function Raldtics() {
  return <ProductLandingPage config={config} />;
}
