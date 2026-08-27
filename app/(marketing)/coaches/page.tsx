"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { coaches } from "@/constants";
import {
  Trophy,
  Award,
  ShieldCheck,
  Star,
  CheckCircle2,
  Play,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoachesPage() {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  return (
    <div className="py-16 sm:py-24 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#154734] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Trophy className="size-3.5" />
            World-Class Faculty & Mentorship
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Meet the Masters of <br />
            <span className="gold-gradient-text">The Kinematic Swing</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Our instructional faculty pairs decades of PGA and LPGA Tour competitive experience with cutting-edge 3D biomechanics, TPI body diagnostics, and TrackMan dual-radar telemetry.
          </p>
        </div>

        {/* Coach Faculty Showcase Grid */}
        <div className="space-y-12">
          {coaches.map((coach, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={coach.id}
                id={coach.id}
                className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center`}>
                  {/* Photo & Video Intro Card */}
                  <div className={`lg:col-span-5 relative group ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl">
                      <Image
                        src={coach.image}
                        alt={coach.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80" />

                      {/* Video Intro Play Button */}
                      <button
                        onClick={() => setActiveVideoModal(coach.id)}
                        className="absolute inset-0 m-auto size-16 rounded-full bg-[#154734]/90 backdrop-blur-md border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:scale-110 transition-all shadow-2xl group/btn cursor-pointer"
                        aria-label={`Watch ${coach.name} coaching video intro`}
                      >
                        <Play className="size-6 ml-1 fill-[#D4AF37] text-[#D4AF37]" />
                      </button>

                      {/* Rating pill */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#0D1117]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#30363D]">
                        <div className="flex text-[#D4AF37]">
                          <Star className="size-3.5 fill-[#D4AF37]" />
                        </div>
                        <span className="text-xs font-bold text-white">{coach.rating}</span>
                        <span className="text-[10px] text-gray-400">({coach.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Coach Bio & Pedagogy */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {coach.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider">
                            PGA Tour Lead
                          </span>
                        )}
                        <span className="text-xs font-mono text-emerald-400">
                          {coach.specialty}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                        {coach.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                        {coach.title}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {coach.bio}
                    </p>

                    {/* Credentials tags */}
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        Certifications & Accreditations:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {coach.credentials.map((cred, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-[#154734]/30 border border-[#D4AF37]/30 text-xs text-gray-200 flex items-center gap-1.5"
                          >
                            <Award className="size-3.5 text-[#D4AF37]" />
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tour Experience Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D]">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Tour Experience</p>
                        <p className="text-xs font-medium text-white mt-0.5">{coach.tourExperience}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D]">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Handicap Specialty</p>
                        <p className="text-xs font-medium text-[#D4AF37] mt-0.5">{coach.handicapSpecialty}</p>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Link href="/?auth=signup">
                        <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/40 text-xs font-semibold px-6 py-5 rounded-xl shadow-lg cursor-pointer flex items-center gap-2">
                          <span>Apply for Mentorship</span>
                          <ArrowRight className="size-4 text-[#D4AF37]" />
                        </Button>
                      </Link>
                      <Link href="/coach">
                        <Button variant="outline" className="border-[#30363D] hover:border-[#D4AF37] text-gray-300 hover:text-white text-xs px-5 py-5 rounded-xl">
                          Test Voice Persona
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Intro Modal Simulation */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-[#161B22] border border-[#D4AF37]/60 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="size-4 text-[#D4AF37]" />
                  <span className="font-serif font-bold text-sm text-white">
                    Master Class Intro Session
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="text-xs uppercase font-mono text-gray-400 hover:text-white px-2 py-1 bg-[#0D1117] rounded-lg border border-[#30363D]"
                >
                  Close ✕
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl bg-[#090D12] border border-[#30363D] overflow-hidden relative flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=85"
                  alt="Video Player Preview"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="relative z-10 text-center space-y-2 p-6 bg-[#0D1117]/80 rounded-2xl border border-[#D4AF37]/40 max-w-md">
                  <Sparkles className="size-8 text-[#D4AF37] mx-auto animate-pulse" />
                  <h4 className="font-serif text-lg font-bold text-white">Kinematic Blueprint Masterclass</h4>
                  <p className="text-xs text-gray-300">
                    Full 4K dual-camera swing breakdown with PGA TrackMan telemetry and wrist flexion analysis.
                  </p>
                  <Link href="/courses/full-swing-mechanics/chapters/m4-c1" onClick={() => setActiveVideoModal(null)}>
                    <Button className="mt-2 bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-semibold px-4 py-2 rounded-xl">
                      Launch Full Video in Student Theater →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Academy Philosophy Section */}
        <div className="rounded-3xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#161B22] border border-[#D4AF37]/50 p-8 sm:p-12 space-y-6 shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              The KP Elite Coaching Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              We do not force players into a rigid, one-size-fits-all model. By analyzing each golfer&apos;s physical mobility constraints, wrist flexion patterns, and ground reaction forces, our instructors engineer a natural, injury-free swing motion that produces consistent compression under tournament pressure.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/?auth=signup">
              <Button className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold px-6 py-5 rounded-xl shadow-lg cursor-pointer">
                Book Initial Swing Assessment
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-white/20 hover:border-white text-white text-xs px-5 py-5 rounded-xl">
                Explore Biomechanics Lab
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
