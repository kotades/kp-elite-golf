import React from "react";
import Link from "next/link";
import { Trophy, ShieldCheck, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service & Enrollment Conditions | KP Elite Golf Training",
  description: "Terms of service, lesson cancellation policy, and handicap reduction guarantee conditions for KP Elite Golf Training.",
};

export default function TermsPage() {
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
            <Trophy className="size-3.5" />
            Academy Rules & Enrollment Agreement
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-mono">
            Last Updated: January 15, 2026 • Version 2.4
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <FileText className="size-4 text-[#D4AF37]" />
              1. Acceptance of Terms & Academy Scope
            </h2>
            <p>
              By accessing the KP Elite Golf Training platform, subscribing to our Practice Video Library ($49/mo), enrolling in the 8-Week Foundation Program ($7,200), or engaging with our 24/7 AI voice coaching models, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#D4AF37]" />
              2. 8-Week Foundation Program & Handicap Guarantee
            </h2>
            <p>
              Our flagship 8-Week Foundation Intensive comes with a 100% money-back handicap reduction guarantee. To qualify for the guarantee refund:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
              <li>Student must attend all 16 scheduled 1-on-1 private coaching sessions.</li>
              <li>Student must complete and log weekly range practice drills inside the student portal.</li>
              <li>Student must submit an official GHIN or World Handicap System differential before and after the 8-week program window.</li>
              <li>If the handicap differential does not improve by at least 3.0 strokes, a full tuition refund will be processed upon written request.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white">
              3. Lesson Rescheduling & Cancellation Policy
            </h2>
            <p>
              Private 1-on-1 scheduled sessions with PGA Master Instructors can be rescheduled or canceled with no penalty up to 24 hours prior to the scheduled start time. Cancellations within less than 24 hours are subject to forfeiture of the lesson credit unless accompanied by a verified medical excuse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white">
              4. Subscription Memberships & Renewal
            </h2>
            <p>
              Monthly memberships (Practice Library and VIP Tour Coaching) renew automatically on the billing anniversary date. You can cancel at any time from your student portal settings with zero cancellation penalties. Access remains active through the conclusion of the paid billing cycle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white">
              5. Intellectual Property & Coaching Drills
            </h2>
            <p>
              All proprietary drills, kinematic formulas, DECADE course management guides, and video lessons are the copyrighted intellectual property of KP Elite Golf Training Academy LLC. Recording, reproducing, or redistributing academy curriculum without written authorization is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
