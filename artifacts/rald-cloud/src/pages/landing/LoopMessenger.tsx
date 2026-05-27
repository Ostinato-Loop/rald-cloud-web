import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "messenger",
  name: "Loop Messenger",
  tagline: "Team messaging built for African bandwidth.",
  description:
    "Real-time messaging that works at 2G. Thread-based channels, end-to-end encryption, and native voice notes — optimised for African connectivity and enterprise teams.",
  gradient: "linear-gradient(135deg, #FF7A00 0%, #E66D00 50%, #CC5500 100%)",
  glowColor: "#FF7A00",
  accentColor: "#FF7A00",
  features: [
    {
      icon: "📡",
      title: "Offline-First Architecture",
      desc: "Messages queue locally and sync the moment connectivity returns. Works on 2G, 3G, and flaky WiFi without data loss.",
    },
    {
      icon: "🔒",
      title: "E2E Encryption",
      desc: "Signal Protocol end-to-end encryption on every message, voice note, and file. Zero metadata stored on servers.",
    },
    {
      icon: "🧵",
      title: "Thread Channels",
      desc: "Slack-style threads without the Slack price tag. Unlimited channels, pinned messages, and rich media.",
    },
    {
      icon: "🎙️",
      title: "Voice Notes",
      desc: "Record and send crystal-clear voice notes compressed for low-bandwidth. Auto-transcribed via Loop Voice AI.",
    },
    {
      icon: "📎",
      title: "File Sharing",
      desc: "Share documents, images, and spreadsheets up to 250MB. Smart compression keeps transfers fast on mobile data.",
    },
    {
      icon: "🔗",
      title: "Ecosystem Integration",
      desc: "Native hooks into Loop Business, PayRald notifications, Dispatch alerts, and RALD Identity verified profiles.",
    },
  ],
  stats: [
    { value: "2G", label: "Minimum bandwidth" },
    { value: "E2E", label: "Encryption standard" },
    { value: "∞", label: "Message history" },
    { value: "250MB", label: "Max file size" },
  ],
  cta: "Get Early Access to Loop Messenger",
};

export default function LoopMessenger() {
  return <ProductLandingPage config={config} />;
}
