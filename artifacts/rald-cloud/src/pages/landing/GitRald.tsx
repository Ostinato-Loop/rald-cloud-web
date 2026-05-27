import { ProductLandingPage, type ProductConfig } from "./shared";

const config: ProductConfig = {
  slug: "gitrald",
  name: "GitRald",
  tagline: "Where Africa ships.",
  description: "CI/CD and repo orchestration purpose-built for the RALD ecosystem. Green CI on every commit, automated Cloudflare deployments, and cross-repo context management for 60+ services.",
  gradient: "linear-gradient(135deg, #FF2E2E 0%, #E02020 50%, #CC0000 100%)",
  glowColor: "#FF2E2E",
  accentColor: "#FF2E2E",
  features: [
    { icon: "⚡", title: "Zero-Config CI", desc: "Push to GitHub. CI runs automatically. Green checkmarks in under 90 seconds. No YAML expertise needed." },
    { icon: "🚀", title: "Auto-Deploy to CF", desc: "Every merge to main triggers a Cloudflare Pages or Worker deployment. Blue/green by default." },
    { icon: "🔍", title: "Cross-Repo Search", desc: "Search code, commits, and PRs across all 60+ Ostinato-Loop repos from one interface." },
    { icon: "🤖", title: "Atlas Integration", desc: "Atlas agent monitors all repos, catches security issues, dependency drift, and broken builds." },
    { icon: "📋", title: "Changelog Gen", desc: "Auto-generate release notes from conventional commits. Publish to Slack, Notion, or email." },
    { icon: "🔐", title: "Secret Rotation", desc: "Sentinel scans every repo for leaked secrets. Auto-rotates compromised keys with zero downtime." },
  ],
  stats: [
    { value: "77+", label: "Repos managed" },
    { value: "90s", label: "CI build time" },
    { value: "55", label: "Green CI repos" },
    { value: "0", label: "Leaked secrets" },
  ],
  cta: "Ship with confidence.",
};

export default function GitRald() {
  return <ProductLandingPage config={config} />;
}
