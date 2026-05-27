import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "dunarald",
  name: "DunaRald",
  tagline: "Africa's discovery commerce platform.",
  description:
    "The platform where African creators, brands, and communities meet buyers. Shop drops, discover viral products, and support homegrown brands — all powered by RALD infrastructure.",
  gradient: "linear-gradient(135deg, #A855F7 0%, #9333EA 50%, #7C22CE 100%)",
  glowColor: "#A855F7",
  accentColor: "#A855F7",
  features: [
    {
      icon: "🔥",
      title: "Drop Commerce",
      desc: "Limited-edition product launches with countdown timers, waitlists, and instant checkout — built for hype culture.",
    },
    {
      icon: "🌍",
      title: "African Creator Economy",
      desc: "Empower African creators and brands to sell directly. Zero gatekeepers, full brand control, integrated PayRald payouts.",
    },
    {
      icon: "🎯",
      title: "AI-Powered Discovery",
      desc: "Raldtics AI learns your taste and surfaces products you'll love. Personalised feeds, smart collections, trending boards.",
    },
    {
      icon: "📱",
      title: "Social Commerce",
      desc: "Share carts, group buys, and wishlists via Loop Messenger. Turn your followers into buyers natively.",
    },
    {
      icon: "🚚",
      title: "Instant Fulfilment",
      desc: "Same-day delivery via Loop Dispatch network. Real-time tracking, branded packaging, and reverse logistics built in.",
    },
    {
      icon: "💎",
      title: "Brand Storefronts",
      desc: "Every brand gets a cinematic storefront on duna.rald.cloud. Custom domains, editorial content, and loyalty tiers.",
    },
  ],
  stats: [
    { value: "200+", label: "African brands" },
    { value: "48h", label: "Fastest drop sell-out" },
    { value: "∞", label: "Creator storefronts" },
    { value: "1-day", label: "Lagos delivery" },
  ],
  cta: "Launch Your Brand on DunaRald",
};

export default function DunaRald() {
  return <ProductLandingPage config={config} />;
}
