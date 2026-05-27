import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "sdk",
  name: "RALD SDK",
  tagline: "Build anything. Ship everywhere.",
  description: "The developer toolkit for the RALD ecosystem. TypeScript-first SDKs for payments, logistics, identity, voice, and analytics — with one unified client, one auth token, one import.",
  gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #b45309 100%)",
  glowColor: "#fbbf24",
  accentColor: "#fbbf24",
  features: [
    { icon: "📦", title: "Unified Client", desc: "import { rald } from '@rald/sdk'. Access every RALD service with one client, one token, zero config." },
    { icon: "🔷", title: "TypeScript-First", desc: "Full type safety across all SDKs. IntelliSense for every method. Auto-generated from OpenAPI specs." },
    { icon: "⚛️", title: "React Hooks", desc: "usePayment(), useShipment(), useIdentity() — TanStack Query under the hood, already wired up." },
    { icon: "📱", title: "React Native", desc: "Same SDK, mobile-optimised. Biometric KYC, push OTPs, and offline-capable payment flows." },
    { icon: "🔄", title: "Auto-Codegen", desc: "SDK updates when the API changes. No manual sync. Orval-powered, always in sync with production." },
    { icon: "📖", title: "Interactive Docs", desc: "Docs that run in the browser. Every example is live. Test against real RALD staging instantly." },
  ],
  stats: [
    { value: "8", label: "SDK packages" },
    { value: "100%", label: "TypeScript" },
    { value: "v1.4.2", label: "Latest stable" },
    { value: "MIT", label: "License" },
  ],
  cta: "npm install @rald/sdk",
};

export default function RALDSDK() {
  return <ProductLandingPage config={config} />;
}
