import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "dispatch",
  name: "Loop Dispatch",
  tagline: "Last-mile, first class.",
  description: "Nigeria's intelligent last-mile delivery aggregator. One API to book, track, and manage shipments across GIG, Sendbox, Kwik, Topship, DHL and 5 more carriers — automatically routed for speed and cost.",
  gradient: "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #c2410c 100%)",
  glowColor: "#fb923c",
  accentColor: "#fb923c",
  features: [
    { icon: "🚀", title: "Smart Carrier Selection", desc: "AI picks the best carrier per shipment based on destination, weight, SLA, and real-time capacity." },
    { icon: "📍", title: "Real-time Tracking", desc: "Live GPS updates every 2 minutes. Auto-SMS notifications to your customers. Zero manual follow-up." },
    { icon: "💸", title: "Rate Comparison", desc: "Compare rates across 10 carriers instantly. Save up to 40% on average shipping costs." },
    { icon: "🔁", title: "Returns Management", desc: "One-click return labels, automated pickup scheduling, instant refund triggers." },
    { icon: "🏙️", title: "36 States Coverage", desc: "Full nationwide coverage from Lagos Island to Maiduguri. Cross-border to Ghana and Kenya." },
    { icon: "📦", title: "Bulk Shipping", desc: "Upload CSV of 10,000 shipments. We handle routing, booking, and tracking for all of them." },
  ],
  stats: [
    { value: "8,247+", label: "Shipments monthly" },
    { value: "94.7%", label: "On-time delivery" },
    { value: "10", label: "Carrier partners" },
    { value: "36+", label: "States covered" },
  ],
  cta: "Ship smarter across Nigeria.",
};

export default function LoopDispatch() {
  return <ProductLandingPage config={config} />;
}
