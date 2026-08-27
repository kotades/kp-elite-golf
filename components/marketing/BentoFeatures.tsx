"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  Mic,
  Activity,
  CheckCircle2,
  Smartphone,
  Layers,
  ChevronRight,
  TrendingUp,
  Compass,
} from "lucide-react";
import Link from "next/link";

export default function BentoFeatures() {
  return (
    <section id="features" className="relative py-24 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="size-3.5" />
            Cutting-Edge Hybrid Golf Technology
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineered for <span className="gold-gradient-text">Rapid Swing Transformation</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Eliminate guesswork on the driving range. We pair PGA Master instruction with 240 fps dual-radar telemetry and real-time AI voice coaching.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {/* Card 1: Large 2x2 - Biomechanical Swing Analyzer */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 rounded-3xl bg-[#161B22] border border-[#30363D] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all shadow-xl">
            {/* Background Image with telemetry overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=85"
                alt="3D Swing Biomechanics"
                fill
                className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-[#161B22]/70 to-transparent" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#30363D] text-xs font-mono text-[#D4AF37]">
                <Activity className="size-3.5 text-emerald-400" />
                <span>240 FPS HIGH-SPEED MOTION CAPTURE</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                PGA Master Calibrated
              </span>
            </div>

            {/* Live Telemetry Card Simulation */}
            <div className="relative z-10 my-auto py-4">
              <div className="grid grid-cols-3 gap-3 bg-[#0D1117]/85 backdrop-blur-md border border-[#30363D] p-3.5 rounded-2xl">
                <div className="text-center border-r border-[#30363D] pr-2">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">TEMPO RATIO</p>
                  <p className="text-base font-bold text-white font-mono">3.1 : 1</p>
                  <span className="text-[9px] text-emerald-400">Tour Ideal</span>
                </div>
                <div className="text-center border-r border-[#30363D] px-2">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">HIP ROTATION</p>
                  <p className="text-base font-bold text-[#D4AF37] font-mono">44.2°</p>
                  <span className="text-[9px] text-[#D4AF37]">At Impact</span>
                </div>
                <div className="text-center pl-2">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">SHAFT LEAN</p>
                  <p className="text-base font-bold text-emerald-400 font-mono">+6.8°</p>
                  <span className="text-[9px] text-emerald-400">Pure Compression</span>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="relative z-10 space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white">
                Biomechanical Video Diagnostics
              </h3>
              <p className="text-sm text-gray-300">
                Upload your swing from down-the-line or face-on. Our AI neural network instantly maps your kinematic chain, spine angles, and transition lag against PGA Tour benchmarks.
              </p>
              <Link
                href="/courses/full-swing-mechanics"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#D4AF37] hover:underline pt-1"
              >
                Explore Swing Mechanics Module <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Wide 2x1 - AI Voice Coach Wave */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/40 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37] transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <Mic className="size-4 animate-pulse" />
                <span>24/7 AI Voice Range Coach</span>
              </div>
              <span className="text-[10px] font-mono bg-black/40 text-gray-300 px-2 py-0.5 rounded border border-white/10">
                Ultra-Low Latency &lt;400ms
              </span>
            </div>

            {/* Simulated Live Audio Visualizer */}
            <div className="flex items-center justify-center gap-1.5 py-3">
              {[12, 24, 40, 18, 32, 48, 28, 14, 38, 52, 34, 20, 44, 22, 16].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-[#D4AF37] rounded-full transition-all duration-300 animate-pulse"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-xs font-semibold text-emerald-300 font-mono">
                  &ldquo;Your transition started with the shoulders. Drop your hands 2 inches first before turning.&rdquo;
                </p>
              </div>
              <p className="text-xs text-gray-300">
                Pop in your earbuds on the driving range. Coach Kevin talks you through every strike in real-time.
              </p>
            </div>
          </div>

          {/* Card 3: Tall 1x2 - Radial Milestones & 8-Week Pathway */}
          <div className="md:col-span-1 lg:col-span-1 md:row-span-2 rounded-3xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col justify-between group hover:border-[#D4AF37]/60 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-9 rounded-xl bg-[#154734]/40 border border-[#D4AF37]/30 flex items-center justify-center">
                  <Layers className="size-5 text-[#D4AF37]" />
                </div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  8-Week Pathway
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Structured Student Milestones
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                Clear checkpoints ensuring steady, measurable handicap drops.
              </p>
            </div>

            {/* Pathway Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-[#154734] border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-3.5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">01. Foundation</p>
                  <p className="text-[11px] text-gray-400">Grip, athletic posture & equipment fitting</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-[#154734] border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-3.5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">02. Consistency</p>
                  <p className="text-[11px] text-gray-400">Kinematic chain & 3-position wedge matrix</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-[#154734] border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-3.5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">03. On-Course Ready</p>
                  <p className="text-[11px] text-gray-400">DECADE target zones & bunker escape rules</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="size-3.5 text-[#0B2B1F]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D4AF37]">04. Tour Caliber</p>
                  <p className="text-[11px] text-gray-300">Single digit handicap & club tournament mastery</p>
                </div>
              </div>
            </div>

            <Link
              href="/courses/apply"
              className="mt-4 text-center py-2.5 rounded-xl bg-[#1F242C] hover:bg-[#D4AF37] hover:text-[#0B2B1F] text-xs font-bold text-white transition-all border border-[#30363D]"
            >
              View Full Syllabus
            </Link>
          </div>

          {/* Card 4: Small 1x1 - Mobile Range Companion */}
          <div className="md:col-span-1 lg:col-span-1 rounded-3xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col justify-between group hover:border-[#D4AF37]/60 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div className="size-8 rounded-lg bg-[#154734]/30 border border-[#D4AF37]/30 flex items-center justify-center">
                <Smartphone className="size-4 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400">iOS & Android</span>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-white">
                Range Companion App
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                Carry your custom 14-club yardage matrix, shot dispersion charts, and drill timers in your pocket.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#30363D]">
              <span className="text-[11px] font-medium text-gray-400">Offline Sync</span>
              <Compass className="size-4 text-[#D4AF37]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
