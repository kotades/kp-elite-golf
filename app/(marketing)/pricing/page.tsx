"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Zap,
  Star,
  Users,
  Award,
  Video,
  Mic,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingTiers } from "@/constants";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const comparisonFeatures = [
    {
      category: "Instruction & Access",
      items: [
        {
          feature: "All 9 Core Curriculum Modules",
          library: true,
          foundation: true,
          vip: true,
        },
        {
          feature: "200+ Practice Drills & Warm-Up Routines",
          library: true,
          foundation: true,
          vip: true,
        },
        {
          feature: "Mobile Range Companion App",
          library: true,
          foundation: true,
          vip: true,
        },
        {
          feature: "24/7 AI Voice Range Coach Access",
          library: "5 Sessions / mo",
          foundation: "Unlimited Priority",
          vip: "Unlimited VIP",
        },
        {
          feature: "AI Swing Biomechanics Video Scanner",
          library: "5 Scans / mo",
          foundation: "Unlimited 3D",
          vip: "Unlimited 3D",
        },
      ],
    },
    {
      category: "1-on-1 PGA Coaching & Feedback",
      items: [
        {
          feature: "Private 1-on-1 PGA Master Sessions",
          library: false,
          foundation: "16 Scheduled (60m)",
          vip: "Bi-Weekly Live",
        },
        {
          feature: "Swing Video Upload & Coach Voiceover Reviews",
          library: false,
          foundation: "Unlimited (24h turnaround)",
          vip: "Unlimited (12h turnaround)",
        },
        {
          feature: "Full 3D Kinematics & Dual TrackMan Breakdown",
          library: false,
          foundation: true,
          vip: true,
        },
        {
          feature: "DECADE Course Management & Tournament Strategy",
          library: false,
          foundation: true,
          vip: true,
        },
        {
          feature: "Direct Priority Messaging with Head Coach",
          library: false,
          foundation: true,
          vip: true,
        },
      ],
    },
    {
      category: "Gear, Community & Guarantees",
      items: [
        {
          feature: "Custom Club Fitting Matrix Consultation",
          library: false,
          foundation: true,
          vip: true,
        },
        {
          feature: "Quarterly In-Person Clinics (Augusta/Pebble)",
          library: false,
          foundation: false,
          vip: true,
        },
        {
          feature: "Measurable Handicap Reduction Guarantee",
          library: false,
          foundation: "100% Money-Back",
          vip: "Guaranteed",
        },
      ],
    },
  ];

  const faqs = [
    {
      q: "What makes the $7,200 Foundation Program the gold standard in golf coaching?",
      a: "The 8-Week Foundation Program is a total transformation intensive. You receive 16 private 1-on-1 hour-long sessions with a PGA Master Instructor, high-speed dual radar TrackMan analysis, custom club fitting validation, and 24/7 AI voice practice reinforcement. We guarantee measurable handicap reduction or you receive a full refund.",
    },
    {
      q: "Can I upgrade or downgrade my membership at any time?",
      a: "Yes! Practice Library and VIP Tour Coaching subscriptions can be modified or canceled anytime directly from your student portal settings with zero cancellation fees.",
    },
    {
      q: "How does the AI Voice Coach compare to in-person instruction?",
      a: "The AI Coach serves as your constant range companion between human coaching sessions. Trained on Kevin Palmer's 22-year tour pedagogy and real-time biomechanics telemetry, it answers your swing questions with zero latency right through your earbuds.",
    },
    {
      q: "Are the in-person clinics included in the VIP coaching tier?",
      a: "Yes, active VIP Tour Coaching students receive VIP invitations to our quarterly member masterclasses hosted at our Augusta Corridor and Pebble Beach performance facilities.",
    },
    {
      q: "Do you offer corporate or team memberships?",
      a: "Yes. For executive groups and collegiate teams, please contact our admissions concierge at admissions@kpelitegolf.com for custom packages.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#154734] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Trophy className="size-3.5" />
            Academy Membership & Tuition
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Transparent Pricing for <br />
            <span className="gold-gradient-text">World-Class Performance</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Choose the coaching tier that matches your commitment. From on-demand drill libraries to 1-on-1 PGA tour-level mentorship, elevate your ball striking today.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const isFeatured = tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? "bg-[#161B22] border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.25)] lg:-translate-y-4"
                    : "bg-[#161B22]/80 border border-[#30363D] hover:border-[#D4AF37]/50"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] text-xs font-extrabold uppercase tracking-wider shadow-lg">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-2xl font-bold text-white">
                      {tier.name}
                    </h2>
                    {isFeatured && <Sparkles className="size-5 text-[#D4AF37]" />}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed min-h-[44px] mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-2 pb-6 border-b border-[#30363D]">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      / {tier.period}
                    </span>
                  </div>

                  <div className="py-6 space-y-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Core Inclusions:
                    </p>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-gray-300">
                        <div className="size-4 rounded-full bg-[#154734] border border-[#D4AF37]/50 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="size-3 text-[#D4AF37]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#30363D]">
                  <Link href={tier.ctaLink}>
                    <Button
                      className={`w-full py-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isFeatured
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B2B1F] hover:brightness-110 shadow-lg"
                          : "bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/30"
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Full Feature Comparison
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Detailed breakdown of every feature included in each coaching tier.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#30363D] bg-[#161B22]/90 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#30363D] bg-[#0D1117]">
                  <th className="py-4 px-6 text-gray-400 font-semibold uppercase tracking-wider text-xs w-2/5">
                    Curriculum & Features
                  </th>
                  <th className="py-4 px-4 text-center text-gray-300 font-bold uppercase tracking-wider text-xs w-1/5">
                    Practice Library ($49/mo)
                  </th>
                  <th className="py-4 px-4 text-center text-[#D4AF37] font-bold uppercase tracking-wider text-xs w-1/5 bg-[#154734]/30">
                    Foundation ($7,200)
                  </th>
                  <th className="py-4 px-4 text-center text-emerald-400 font-bold uppercase tracking-wider text-xs w-1/5">
                    VIP Coaching ($890/mo)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <tr className="bg-[#0D1117]/60 border-y border-[#30363D]">
                      <td
                        colSpan={4}
                        className="py-2.5 px-6 font-bold text-[#D4AF37] text-xs uppercase tracking-widest"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item, itemIdx) => (
                      <tr
                        key={itemIdx}
                        className="border-b border-[#30363D]/40 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3.5 px-6 text-gray-200 font-medium">
                          {item.feature}
                        </td>
                        <td className="py-3.5 px-4 text-center text-gray-300">
                          {typeof item.library === "boolean" ? (
                            item.library ? (
                              <Check className="size-4 text-emerald-400 mx-auto" />
                            ) : (
                              <span className="text-gray-600">—</span>
                            )
                          ) : (
                            <span className="text-xs text-gray-300">{item.library}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-[#D4AF37] font-semibold bg-[#154734]/15">
                          {typeof item.foundation === "boolean" ? (
                            item.foundation ? (
                              <Check className="size-4 text-[#D4AF37] mx-auto" />
                            ) : (
                              <span className="text-gray-600">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-[#D4AF37]">
                              {item.foundation}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-emerald-400">
                          {typeof item.vip === "boolean" ? (
                            item.vip ? (
                              <Check className="size-4 text-emerald-400 mx-auto" />
                            ) : (
                              <span className="text-gray-600">—</span>
                            )
                          ) : (
                            <span className="text-xs font-semibold text-emerald-300">
                              {item.vip}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#154734] border border-[#D4AF37]/50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="size-16 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
              <ShieldCheck className="size-8 text-[#D4AF37]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Our 100% Handicap Reduction Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Complete the 8-Week Foundation Program lessons and practice drills. If your official handicap differential does not drop by at least 3 strokes, receive a full 100% refund.
              </p>
            </div>
          </div>
          <Link href="/courses/apply" className="shrink-0 w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold px-8 py-6 rounded-xl shadow-lg cursor-pointer">
              Apply with Guarantee
            </Button>
          </Link>
        </div>

        {/* Pricing FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6 pt-4">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Everything you need to know about our plans, scheduling, and guarantee.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-[#30363D] bg-[#161B22] px-6 py-2"
              >
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-white hover:text-[#D4AF37] text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
