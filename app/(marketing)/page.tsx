import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Play,
  TrendingDown,
  Users2,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/marketing/HeroVideoDialog";
import TrustMarquee from "@/components/marketing/TrustMarquee";
import BentoFeatures from "@/components/marketing/BentoFeatures";
import CoachCarousel from "@/components/marketing/CoachCarousel";
import CourseTeaser from "@/components/marketing/CourseTeaser";
import PricingSection from "@/components/marketing/PricingSection";
import FAQSection from "@/components/marketing/FAQSection";

export default function MarketingPage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B2B1F] text-white">
        {/* Background Image / Video Simulation with rich overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=2000&q=85"
            alt="Golf Swing at Sunrise"
            fill
            priority
            className="object-cover object-center opacity-40 scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0B2B1F]/80 to-[#0B2B1F]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0D1117]/60 to-[#0D1117]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#154734]/80 border border-[#D4AF37]/50 backdrop-blur-md shadow-lg">
            <Trophy className="size-4 text-[#D4AF37]" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              The #1 Hybrid PGA Coaching & AI Telemetry Academy
            </span>
            <span className="size-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Master Your Swing. <br />
            <span className="gold-gradient-text">Lower Your Handicap.</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-300 font-normal leading-relaxed">
            The elite PGA-caliber hybrid coaching system combining high-speed biomechanics, personalized 1-on-1 mastery, and 24/7 AI voice coaching.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/?auth=signup">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-extrabold text-base px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all cursor-pointer">
                <span>Apply for Academy</span>
                <ArrowRight className="size-5 ml-2" />
              </Button>
            </Link>

            <HeroVideoDialog />
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-gray-400 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#D4AF37]" />
              <span className="text-gray-200">16 1-on-1 PGA Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#D4AF37]" />
              <span className="text-gray-200">24/7 AI Voice Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#D4AF37]" />
              <span className="text-gray-200">TrackMan 3D Telemetry</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Social Proof & Trust Marquee */}
      <TrustMarquee />

      {/* 3. Bento Box Feature Grid */}
      <BentoFeatures />

      {/* 4. Instructor Roster Carousel */}
      <CoachCarousel />

      {/* 5. Course Teaser / 3-Column Syllabus Strip */}
      <CourseTeaser />

      {/* 6. 3-Tier Pricing Section */}
      <PricingSection />

      {/* 7. FAQ & Final CTA */}
      <FAQSection />
    </div>
  );
}
