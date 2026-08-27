import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Award,
  ShieldCheck,
  Sparkles,
  Activity,
  Compass,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Target,
  Zap,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About KP Elite Golf Training | Biomechanics & Heritage",
  description:
    "The story, mission, and dual-radar biomechanics technology behind KP Elite Golf Academy in Augusta & Pebble Beach.",
};

export default function AboutPage() {
  const labTechnologies = [
    {
      name: "TrackMan 4 Dual-Radar Telemetry",
      description: "Capturing club delivery angle, face-to-path, dynamic loft, and launch parameters at 40,000 measurements per second.",
      icon: Activity,
    },
    {
      name: "Gears 3D Motion Optical Tracking",
      description: "Full-body optical markers tracking 6 degrees of freedom across pelvis, thorax, lead wrist, and club shaft throughout transition.",
      icon: Cpu,
    },
    {
      name: "Dual Smart2Move Force Plates",
      description: "Measuring vertical, horizontal, and torque ground reaction forces to optimize rotational power and transition sequencing.",
      icon: Zap,
    },
    {
      name: "24/7 AI Voice Range Telemetry",
      description: "Instant sub-400ms voice synthesis trained on 22 years of PGA Tour coaching pedagogy for immediate range feedback.",
      icon: Sparkles,
    },
  ];

  const methodologyPillars = [
    {
      step: "01",
      title: "Diagnostic Assessment",
      desc: "Full kinematic scan, TPI movement screen, and current equipment specification mapping.",
    },
    {
      step: "02",
      title: "Anatomical Kinematic Blueprints",
      desc: "Custom swing path and wrist flexion mechanics built around your natural mobility constraints.",
    },
    {
      step: "03",
      title: "Reinforced Range Practice",
      desc: "Structured drill blueprints integrated with our AI range voice companion for uninterrupted practice.",
    },
    {
      step: "04",
      title: "DECADE Course Transfer",
      desc: "Translating range ball striking into confident course management, elimination of double bogeys, and lowered handicaps.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#154734] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Trophy className="size-3.5" />
              Our Heritage & Vision
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Where Championship Tradition Meets <br />
              <span className="gold-gradient-text">3D Biomechanics</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Founded by Head LPGA Master Coach Elena Rostova, KP Elite Golf Academy was born from a simple conviction: every golfer possesses a repeatable, effortless swing waiting to be unlocked through 3D kinematic science rather than guesswork.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/courses">
                <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/40 text-xs font-semibold px-6 py-5 rounded-xl shadow-lg cursor-pointer">
                  Explore Curriculum
                </Button>
              </Link>
              <Link href="/coaches">
                <Button variant="outline" className="border-[#30363D] hover:border-[#D4AF37] text-gray-300 text-xs px-6 py-5 rounded-xl">
                  Meet Our Faculty
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl">
              <Image
                src="/coaches/coach-1-elena-head-lpga.jpg"
                alt="Elena Rostova in the Golf Biomechanics Lab"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0D1117]/90 backdrop-blur-md border border-[#30363D]">
                <p className="font-serif font-bold text-sm text-white">Elena Rostova, LPGA Master</p>
                <p className="text-xs text-[#D4AF37]">Founder & Head of Instruction</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Biomechanics Lab Technology */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest">
              <Activity className="size-3.5" />
              High-Precision Diagnostics
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The KP Elite Biomechanics Lab
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              State-of-the-art laboratory facilities located in the Augusta National Corridor and Pebble Beach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labTechnologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 space-y-4 hover:border-[#D4AF37]/60 transition-all group"
                >
                  <div className="size-12 rounded-xl bg-[#154734]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">{tech.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{tech.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-Pillar Training Methodology */}
        <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-8 sm:p-12 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest">
              <Compass className="size-3.5" />
              The 4-Pillar System
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Our Championship Training Methodology
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              How we systematically transform golfers from inconsistent ball-strikers into confident, single-digit competitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologyPillars.map((pillar) => (
              <div
                key={pillar.step}
                className="p-6 rounded-2xl bg-[#0D1117] border border-[#30363D] space-y-3 hover:border-[#D4AF37]/40 transition-colors"
              >
                <span className="font-mono text-2xl font-black text-[#D4AF37]">{pillar.step}</span>
                <h4 className="font-serif text-base font-bold text-white">{pillar.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#154734] border border-[#D4AF37]/50 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ready to Transform Your Golf Game?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Apply for our 8-Week Foundation Program or start with our on-demand Practice Library today.
            </p>
          </div>
          <Link href="/?auth=signup">
            <Button className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold px-8 py-6 rounded-xl shadow-lg cursor-pointer">
              Apply for Intake
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
