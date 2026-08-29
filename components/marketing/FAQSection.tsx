"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { testimonials, pricingTiers } from "@/constants";
import {
  HelpCircle,
  Trophy,
  ArrowRight,
  Quote,
  Star,
  CheckCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FAQSection() {
  const faqs = [
    {
      q: "How long is each private lesson in the Foundation Program?",
      a: "Each 1-on-1 private coaching session is 60 minutes long and includes high-speed dual camera capture, TrackMan launch monitor telemetry, and personalized homework drills uploaded directly to your student portal.",
    },
    {
      q: "How does the 24/7 AI Voice Range Coach work?",
      a: "Simply open the mobile companion app on your phone, insert your wireless earbuds, and select your AI coach (e.g. Coach Kevin or Coach Elena). As you practice on the range or putting green, ask questions naturally about club choice, ball flight fixes, or drill steps, and receive instantaneous coaching feedback in under 400 milliseconds.",
    },
    {
      q: "What equipment or experience level do I need before starting?",
      a: "We welcome golfers of all experience levels—from absolute beginners who have never held a club to single-digit tournament amateurs. If you do not own clubs yet, our Module 02 includes a complete custom fitting consultation where we recommend the exact specs before you buy.",
    },
    {
      q: "What happens if I need to reschedule a lesson?",
      a: "Students can reschedule or cancel scheduled lessons up to 24 hours prior to the session directly inside the student portal calendar with zero penalty.",
    },
    {
      q: "How does the swing video submission and analysis work?",
      a: "You can record and upload swings directly from your phone. Our PGA Master instructors and biomechanics engine analyze your face-on and down-the-line angles, overlaying kinematic data and sending you voice-annotated corrections within 24 hours.",
    },
  ];

  return (
    <section className="py-24 bg-[#0D1117] text-white border-t border-[#30363D]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Carousel / Grid */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Trophy className="size-3.5" />
              Verified Graduate Outcomes
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Real Golfers. <span className="gold-gradient-text">Measurable Handicap Drops.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {test.handicapDrop}
                    </span>
                  </div>

                  <Quote className="size-5 text-[#D4AF37]/40 mb-2" />
                  <p className="text-xs text-gray-300 leading-relaxed italic mb-4">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#30363D] flex items-center gap-3">
                  <div className="relative size-10 rounded-full overflow-hidden border border-[#D4AF37]/40 shrink-0">
                    <Image
                      src={test.image}
                      alt={test.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{test.name}</h4>
                    <p className="text-[10px] text-gray-400">{test.homeClub}</p>
                    <span className="text-[9px] text-[#D4AF37] font-semibold">{test.milestone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-400">
              Everything you need to know about our academy, scheduling, and hybrid coaching model.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="rounded-2xl bg-[#161B22] border border-[#30363D] px-6 py-1 data-[state=open]:border-[#D4AF37]/50"
              >
                <AccordionTrigger className="text-sm font-semibold text-white hover:text-[#D4AF37] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-400 leading-relaxed pt-2 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* High-Impact Final Call to Action */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#154734] via-[#0B2B1F] to-[#0D1117] border border-[#D4AF37]/50 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle gold rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] border border-[#D4AF37]/10 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] border border-[#D4AF37]/20 rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Limited Cohort Enrollment
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to Transform Your Golf Game Forever?
            </h2>

            <p className="text-sm sm:text-base text-gray-300">
              Join the 8-Week Foundation Program or enroll in the Practice Library today. Step onto the first tee with tour-level confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/?auth=signup">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl hover:scale-105 transition-all cursor-pointer">
                  Apply for Academy Intake ({pricingTiers[1].price}/mo)
                </Button>
              </Link>

              <Link href="/sign-in?plan=practice-library">
                <Button className="w-full sm:w-auto bg-[#161B22] hover:bg-[#1F242C] text-white border border-[#30363D] text-sm font-semibold px-6 py-3.5 rounded-xl">
                  Enroll in Practice Library
                </Button>
              </Link>
            </div>

            <p className="text-xs text-gray-400 pt-2">
              ✓ 100% Handicap Reduction Guarantee • ✓ Instant Portal Access • ✓ No Hidden Fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
