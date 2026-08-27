import React from "react";
import Link from "next/link";
import { pricingTiers } from "@/constants";
import {
  Check,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#090D12] text-white border-t border-[#30363D]/60 relative overflow-hidden">
      {/* Background glow behind center card */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Trophy className="size-3.5" />
            Transparent Academy Investment
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Choose Your <span className="gold-gradient-text">Coaching Pathway</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Whether you want self-guided drill mastery or our elite 1-on-1 PGA Master Foundation Program, we have an option tailored to your handicap goals.
          </p>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const isFeatured = tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? "bg-[#161B22] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)] lg:-translate-y-3"
                    : "bg-[#161B22]/70 border border-[#30363D] hover:border-[#D4AF37]/40"
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] text-xs font-extrabold uppercase tracking-wider shadow-md">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {tier.name}
                    </h3>
                    {isFeatured && <Sparkles className="size-5 text-[#D4AF37]" />}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed min-h-[40px] mb-6">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pb-6 border-b border-[#30363D]">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      / {tier.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="py-6 space-y-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      What&apos;s Included:
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

                {/* CTA Button */}
                <div className="pt-6 border-t border-[#30363D]">
                  <Link href={tier.ctaLink}>
                    <Button
                      className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isFeatured
                          ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                          : "bg-[#1F242C] hover:bg-[#D4AF37] hover:text-[#0B2B1F] text-white border border-[#30363D]"
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <p className="text-[10px] text-center text-gray-500 mt-2.5">
                    {isFeatured ? "Includes 100% Score Improvement Guarantee" : "Cancel or upgrade anytime"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 rounded-2xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-[#154734]/40 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                The KP Elite Performance Guarantee
              </h4>
              <p className="text-xs text-gray-400">
                If you complete the 8-Week Foundation Program and do not lower your handicap by at least 3 strokes, we coach you for free until you do.
              </p>
            </div>
          </div>
          <Link href="/?auth=signup" className="shrink-0">
            <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-semibold px-4 py-2 rounded-xl border border-[#D4AF37]/30">
              Review Enrollment Policy
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
