import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "voice",
  name: "Loop Voice",
  tagline: "Voice infrastructure for builders.",
  description: "SIP trunking, number provisioning, IVR, and programmable voice calls — built for African telecoms realities. TERMII, DIDWW, and Tencent RTC under the hood.",
  gradient: "linear-gradient(135deg, #FF4FAD 0%, #E63FA0 50%, #CC2080 100%)",
  glowColor: "#FF4FAD",
  accentColor: "#FF4FAD",
  features: [
    { icon: "📞", title: "SIP Trunking", desc: "Enterprise SIP trunks with failover across TERMII and DIDWW. Crystal-clear calls at Nigerian rates." },
    { icon: "📱", title: "Local Numbers", desc: "Provision Nigerian mobile and landline numbers via API. Lagos, Abuja, PH area codes available instantly." },
    { icon: "🤖", title: "Programmable IVR", desc: "Build voice menus with JSON. No telephony expertise needed. Integrates with your backend webhooks." },
    { icon: "🌐", title: "WebRTC Calls", desc: "Browser-to-phone and browser-to-browser calls powered by Tencent RTC. Sub-100ms latency." },
    { icon: "🔊", title: "Text-to-Speech", desc: "Nigerian Pidgin, Yoruba, Igbo, and Hausa TTS engines. Your customers hear their language." },
    { icon: "📊", title: "Call Analytics", desc: "Duration, quality scores, drop rates, and cost per minute — all in real-time dashboards." },
  ],
  stats: [
    { value: "99.5%", label: "Call uptime" },
    { value: "3", label: "Carrier redundancy" },
    { value: "<100ms", label: "WebRTC latency" },
    { value: "4", label: "Local languages" },
  ],
  cta: "Give your app a voice.",
};

export default function LoopVoice() {
  return <ProductLandingPage config={config} />;
}
