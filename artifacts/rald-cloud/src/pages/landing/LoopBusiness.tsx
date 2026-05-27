import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "loop",
  name: "Loop Business",
  tagline: "Africa's Commerce OS.",
  description: "The all-in-one platform for African merchants to sell online, manage inventory, accept payments, and scale across borders — without the enterprise price tag.",
  gradient: "linear-gradient(135deg, #FF8A2A 0%, #FF6A00 50%, #CC5400 100%)",
  glowColor: "#FF6A00",
  accentColor: "#FF6A00",
  features: [
    { icon: "🏪", title: "Instant Storefront", desc: "Launch a fully branded online store in minutes. Custom domains, mobile-optimised, SEO-ready." },
    { icon: "📦", title: "Smart Inventory", desc: "Track stock across multiple locations in real-time. Auto-reorder alerts. Supplier management built in." },
    { icon: "💳", title: "10 Payment Gateways", desc: "Accept Paystack, Flutterwave, OPay and 7 more. Intelligent routing picks the best gateway automatically." },
    { icon: "🚚", title: "Last-Mile Delivery", desc: "Integrated with GIG, Sendbox, Kwik and 7 more carriers. Real-time tracking for you and your customer." },
    { icon: "📊", title: "Merchant Analytics", desc: "Revenue trends, top products, customer LTV — all in one dashboard powered by Raldtics." },
    { icon: "🌍", title: "Cross-Border Ready", desc: "Sell to Ghana, Kenya, and beyond. Multi-currency, localised checkout, auto tax handling." },
  ],
  stats: [
    { value: "₦2.4B+", label: "GMV processed" },
    { value: "12,000+", label: "Active merchants" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "3min", label: "Avg setup time" },
  ],
  cta: "Ready to sell smarter?",
};

export default function LoopBusiness() {
  return <ProductLandingPage config={config} />;
}
