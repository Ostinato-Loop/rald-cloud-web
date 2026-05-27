import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "payrald",
  name: "PayRald",
  tagline: "Move money at the speed of Africa.",
  description: "Enterprise payment infrastructure built for African businesses. Intelligent multi-gateway routing, real-time settlements, and fraud detection — all from one API.",
  gradient: "linear-gradient(135deg, #0066FF 0%, #3385FF 50%, #0040CC 100%)",
  glowColor: "#0066FF",
  accentColor: "#0066FF",
  features: [
    { icon: "⚡", title: "Sub-second Routing", desc: "Our AI picks the payment gateway with the highest real-time success rate before every transaction." },
    { icon: "🔄", title: "Smart Failover", desc: "If Paystack goes down, we instantly route to Flutterwave. Zero failed transactions. Zero customer friction." },
    { icon: "🛡️", title: "Fraud Shield", desc: "Machine learning fraud detection trained on 50M+ Nigerian transactions. Sub-0.1% fraud rate." },
    { icon: "📡", title: "Webhooks & Events", desc: "Real-time payment events delivered to your systems in milliseconds. Guaranteed at-least-once delivery." },
    { icon: "💰", title: "Split Payments", desc: "Route portions of each transaction to multiple accounts instantly. Perfect for marketplaces." },
    { icon: "📱", title: "USSD & Mobile Money", desc: "Reach the 60% of Nigerians without a card. USSD, NIBSS, and mobile money all supported." },
  ],
  stats: [
    { value: "₦48.8M+", label: "Daily volume" },
    { value: "97.2%", label: "Success rate" },
    { value: "10", label: "Gateway integrations" },
    { value: "<200ms", label: "Routing decision" },
  ],
  cta: "Accept every Nigerian naira.",
};

export default function PayRald() {
  return <ProductLandingPage config={config} />;
}
