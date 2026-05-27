import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "identity",
  name: "RALD Identity",
  tagline: "One identity. Every surface.",
  description: "Unified authentication and KYC for African applications. BVN verification, NIN lookup, face matching, and SSO — all from a single API that works offline-first.",
  gradient: "linear-gradient(135deg, #00E5FF 0%, #00BFDF 50%, #008FAF 100%)",
  glowColor: "#00E5FF",
  accentColor: "#00E5FF",
  features: [
    { icon: "🪪", title: "BVN & NIN Verification", desc: "Real-time BVN and NIN lookup via NIBSS. Sub-2 second verification. Works even on slow connections." },
    { icon: "🤳", title: "Face Match & Liveness", desc: "Compare selfie to BVN photo. ML-powered liveness detection. NDPC compliant data handling." },
    { icon: "🔑", title: "SSO for RALD", desc: "One login across all RALD products. OAuth 2.0, PKCE, and SAML support for enterprise customers." },
    { icon: "📧", title: "OTP & Magic Links", desc: "SMS OTP via TERMII, email magic links, and WhatsApp verification — all from one endpoint." },
    { icon: "🛡️", title: "Fraud Signals", desc: "Device fingerprinting, velocity checks, and risk scoring on every authentication attempt." },
    { icon: "🏢", title: "CAC Verification", desc: "Verify Nigerian businesses via CAC registry. Director lookups, shareholder structure, compliance status." },
  ],
  stats: [
    { value: "2s", label: "BVN verification" },
    { value: "99.1%", label: "Match accuracy" },
    { value: "NDPC", label: "Compliant" },
    { value: "0ms", label: "Offline KYC" },
  ],
  cta: "Know your customer. Instantly.",
};

export default function RALDIdentity() {
  return <ProductLandingPage config={config} />;
}
