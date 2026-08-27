import React from "react";
import Link from "next/link";
import { Trophy, ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy | KP Elite Golf Training",
  description: "Privacy policy and biometric data protection guidelines for KP Elite Golf Training Academy.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#0D1117] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[#30363D] pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <ShieldCheck className="size-3.5" />
            Data Protection Notice
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-mono">
            Last Updated: January 15, 2026 • Version 2.4
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Lock className="size-4 text-[#D4AF37]" />
              1. Overview & Commitment to Golfer Privacy
            </h2>
            <p>
              KP Elite Golf Training Academy LLC (&ldquo;KP Elite&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is dedicated to safeguarding the privacy and personal telemetry of our student members. This Privacy Policy details how we collect, process, and secure your personal, biomechanical, swing video, and payment data across our web application, AI voice coaching features, and in-person performance facilities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Eye className="size-4 text-[#D4AF37]" />
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>
                <strong className="text-white">Account & Contact Information:</strong> Full name, email address, phone number, home club affiliation, and handicap index.
              </li>
              <li>
                <strong className="text-white">Biomechanical & Swing Telemetry:</strong> Video submissions (face-on, down-the-line), high-frame 3D kinematic motion markers, TrackMan dual-radar launch parameters (ball speed, launch angle, spin rate, face angle), and force-plate distribution data.
              </li>
              <li>
                <strong className="text-white">AI Voice Interaction Data:</strong> Transcripts and voice audio clips generated during sessions with our 24/7 AI voice range coaches to improve diagnostic accuracy and response quality.
              </li>
              <li>
                <strong className="text-white">Billing & Payment Data:</strong> Processed through PCI-DSS Level 1 certified payment gateways (e.g. Stripe). KP Elite does not store raw credit card numbers on its servers.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <FileText className="size-4 text-[#D4AF37]" />
              3. How We Use Your Data
            </h2>
            <p>
              Your data is strictly utilized to deliver and personalize your golf coaching journey:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
              <li>Generating kinematic swing diagnostic overlays and milestone reports.</li>
              <li>Personalizing 1-on-1 coaching curriculum tailored to your swing anatomy.</li>
              <li>Enabling low-latency real-time voice synthesis for your range practice sessions.</li>
              <li>Facilitating scheduled lesson calendar bookings and billing management.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#D4AF37]" />
              4. Data Retention & Video Ownership
            </h2>
            <p>
              Students maintain full ownership of all uploaded swing video assets. You may request permanent deletion of your account, swing library, or voice logs at any time by contacting our data privacy officer at{" "}
              <a href="mailto:privacy@kpelitegolf.com" className="text-[#D4AF37] underline">
                privacy@kpelitegolf.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white">
              5. Contacting the Privacy Officer
            </h2>
            <p>
              If you have any questions or inquiries regarding our biometric data storage practices, please write to us at:
            </p>
            <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] text-xs font-mono text-gray-300">
              KP Elite Golf Training Academy LLC<br />
              Attn: Data Privacy Officer<br />
              1200 Championship Way, Suite 400<br />
              Augusta, GA 30904<br />
              Email: privacy@kpelitegolf.com
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
