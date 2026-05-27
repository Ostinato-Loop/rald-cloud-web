import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOMeta
        title="Terms of Service — RALD.cloud"
        description="Terms governing use of RALD.cloud enterprise infrastructure. Operated by LILCKY STUDIO LIMITED."
        canonicalPath="/terms"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/8 px-6 md:px-12 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-lg tracking-tight">
            <span className="text-white/80">RALD</span>
            <span className="text-[#00C97C]">.cloud</span>
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/80">Terms</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <p className="text-[#00C97C] text-sm font-mono mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
          <p className="text-white/40 text-sm">Last updated: 27 May 2026 · Effective: 27 May 2026</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using RALD.cloud ("the Platform"), you agree to be bound by these Terms of Service. The Platform is operated by <strong className="text-white">LILCKY STUDIO LIMITED</strong> ("we", "us", "our"). If you do not agree to these terms, do not use the Platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Description of Services</h2>
            <p>RALD.cloud provides pan-African enterprise cloud infrastructure including:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="text-white">Loop Business</strong> — Enterprise messaging and communications platform.</li>
              <li><strong className="text-white">PayRald</strong> — Multi-currency payment infrastructure for Africa.</li>
              <li><strong className="text-white">Raldtics</strong> — AI-powered analytics and business intelligence.</li>
              <li><strong className="text-white">Loop Dispatch</strong> — Logistics and last-mile delivery network.</li>
              <li><strong className="text-white">Loop Voice</strong> — VoIP and telephony infrastructure.</li>
              <li><strong className="text-white">RALD Identity</strong> — Enterprise identity and access management.</li>
              <li><strong className="text-white">GitRald</strong> — DevOps and code repository management.</li>
              <li><strong className="text-white">RALD SDK</strong> — Developer tools and API access.</li>
              <li><strong className="text-white">RALD Console</strong> — Unified infrastructure management console.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Account Registration</h2>
            <p>You must create an account to access the Platform's features. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account. You must provide accurate, current information and notify us of any security breach at <a href="mailto:security@rald.cloud" className="text-[#00C97C] hover:underline">security@rald.cloud</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Use the Platform for any unlawful purpose or in violation of any regulations.</li>
              <li>Attempt to gain unauthorized access to any part of the Platform or its infrastructure.</li>
              <li>Transmit malware, spam, or any harmful content through our services.</li>
              <li>Interfere with the security, integrity, or performance of the Platform.</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Platform.</li>
              <li>Resell or sublicense access to our services without prior written authorization.</li>
              <li>Use our services to process payments for prohibited goods or services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Fees and Payment</h2>
            <p>Certain services are provided on a subscription or usage basis. Fees are set out in our pricing documentation and may be updated with 30 days' notice. All fees are exclusive of applicable taxes. Late payments may result in service suspension.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <p>All content, trademarks, logos, and technology on the Platform are owned by or licensed to LILCKY STUDIO LIMITED. You receive a limited, non-exclusive, non-transferable licence to use the Platform solely for its intended purpose. You retain ownership of your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Data and Privacy</h2>
            <p>Your use of the Platform is also governed by our <Link href="/privacy" className="text-[#00C97C] hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. You grant us a licence to process your data as necessary to provide the services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Service Level and Availability</h2>
            <p>We target 99.9% uptime for production services but do not guarantee uninterrupted availability. We may perform maintenance during low-traffic periods with advance notice. Enterprise SLA agreements are available — contact <a href="mailto:enterprise@rald.cloud" className="text-[#00C97C] hover:underline">enterprise@rald.cloud</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, LILCKY STUDIO LIMITED shall not be liable for indirect, incidental, special, consequential, or punitive damages. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Termination</h2>
            <p>Either party may terminate these Terms with 30 days' written notice. We may terminate immediately for material breach, illegal activity, or non-payment. Upon termination, you may export your data within 30 days; thereafter we may delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">11. Governing Law</h2>
            <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales, without prejudice to mandatory consumer rights in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p>We may modify these Terms at any time. Material changes will be notified with at least 30 days' notice. Continued use after the effective date constitutes acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">13. Contact</h2>
            <div className="mt-3 p-4 rounded-xl border border-white/10 bg-white/2 font-mono text-sm">
              <p className="text-white">LILCKY STUDIO LIMITED</p>
              <p className="text-white/50">Legal Department</p>
              <p><a href="mailto:legal@rald.cloud" className="text-[#00C97C]">legal@rald.cloud</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/30">
          <span>© 2026 RALD.cloud · Operated by <strong className="text-white/50">LILCKY STUDIO LIMITED</strong></span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/50">Terms of Service</Link>
            <Link href="/products" className="hover:text-white/50 transition-colors">Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
