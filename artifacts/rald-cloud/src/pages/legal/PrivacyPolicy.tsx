import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOMeta
        title="Privacy Policy — RALD.cloud"
        description="How RALD.cloud collects, uses, and protects your data. Operated by LILCKY STUDIO LIMITED."
        canonicalPath="/privacy"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/8 px-6 md:px-12 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-lg tracking-tight">
            <span className="text-white/80">RALD</span>
            <span className="text-[#00C97C]">.cloud</span>
          </Link>
          <div className="flex gap-4 text-sm text-white/40">
            <Link href="/privacy" className="text-white/80">Privacy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <p className="text-[#00C97C] text-sm font-mono mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-white/40 text-sm">Last updated: 27 May 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Who We Are</h2>
            <p>RALD.cloud is operated by <strong className="text-white">LILCKY STUDIO LIMITED</strong>, a company registered in England and Wales. We provide pan-African enterprise cloud infrastructure, payments, logistics, and developer tools through the RALD.cloud ecosystem.</p>
            <p className="mt-3">Contact: <a href="mailto:legal@rald.cloud" className="text-[#00C97C] hover:underline">legal@rald.cloud</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Account Information</strong> — Name, email, profile image when you sign in via Replit SSO.</li>
              <li><strong className="text-white">Usage Data</strong> — Pages visited, features used, API calls made, timestamps.</li>
              <li><strong className="text-white">Referral Data</strong> — Referral codes generated, referrals completed, waitlist entries.</li>
              <li><strong className="text-white">Technical Data</strong> — IP address, browser type, device identifiers, session tokens.</li>
              <li><strong className="text-white">Payment Data</strong> — Transaction IDs, payment routes, provider references (no raw card data stored).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Providing and improving RALD.cloud services.</li>
              <li>Authenticating your identity and securing your account.</li>
              <li>Processing payments and logistics through integrated providers.</li>
              <li>Sending product updates, security alerts, and operational notices.</li>
              <li>Analytics to understand usage patterns and improve the platform.</li>
              <li>Complying with legal obligations and resolving disputes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="text-white">Service Providers</strong> — Cloudflare (CDN/security), Replit (authentication), payment processors, logistics partners.</li>
              <li><strong className="text-white">Legal Authorities</strong> — Where required by law, court order, or to protect our rights.</li>
              <li><strong className="text-white">Business Transfers</strong> — In the event of a merger or acquisition, subject to the same privacy commitments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Data Retention</h2>
            <p>We retain your data for as long as your account is active, plus up to 7 years for financial records as required by law. You may request deletion at any time by contacting <a href="mailto:legal@rald.cloud" className="text-[#00C97C] hover:underline">legal@rald.cloud</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
            <p>Under GDPR and applicable data protection laws, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Rectify inaccurate or incomplete data.</li>
              <li>Request erasure ("right to be forgotten").</li>
              <li>Restrict or object to processing.</li>
              <li>Data portability — receive your data in a machine-readable format.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Cookies</h2>
            <p>We use session cookies for authentication (httpOnly, secure, SameSite=Lax). We do not use tracking or advertising cookies. No third-party analytics cookies are set without your consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Security</h2>
            <p>We use industry-standard measures including TLS encryption in transit, encrypted storage at rest, and strict access controls. Our infrastructure is distributed across Cloudflare's global network. No system is 100% secure; please use strong, unique credentials.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. International Transfers</h2>
            <p>RALD.cloud operates pan-African infrastructure. Data may be processed in multiple regions including the EU, UK, US, and Africa. All transfers comply with applicable data protection frameworks including UK GDPR and Standard Contractual Clauses where required.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Changes to This Policy</h2>
            <p>We may update this policy periodically. Material changes will be notified via email or prominent notice on the platform at least 30 days before they take effect.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">11. Contact</h2>
            <p>For privacy-related queries, contact our Data Protection team:</p>
            <div className="mt-3 p-4 rounded-xl border border-white/10 bg-white/2 font-mono text-sm">
              <p className="text-white">LILCKY STUDIO LIMITED</p>
              <p className="text-white/50">Data Protection Officer</p>
              <p><a href="mailto:legal@rald.cloud" className="text-[#00C97C]">legal@rald.cloud</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/30">
          <span>© 2026 RALD.cloud · Operated by <strong className="text-white/50">LILCKY STUDIO LIMITED</strong></span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/50">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <Link href="/products" className="hover:text-white/50 transition-colors">Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
