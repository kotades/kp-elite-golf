"use client";

import React, { useState } from "react";
import Image from "next/image";
import { coaches } from "@/constants";
import {
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CoachCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCoach = () => {
    setCurrentIndex((prev) => (prev + 1) % coaches.length);
  };

  const prevCoach = () => {
    setCurrentIndex((prev) => (prev - 1 + coaches.length) % coaches.length);
  };

  return (
    <section id="coaches" className="py-24 bg-[#090D12] text-white border-t border-[#30363D]/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[#154734]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Trophy className="size-3.5" />
              World-Class Faculty
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Learn Directly From <span className="gold-gradient-text">Tour Instructors</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Our faculty comprises PGA Master Professionals, LPGA Tour winners, and TPI biomechanics researchers with over 50+ combined years of tour player development.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevCoach}
              className="size-12 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center justify-center text-gray-300 hover:text-white hover:border-[#D4AF37] transition-all cursor-pointer"
              aria-label="Previous Coach"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextCoach}
              className="size-12 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center justify-center text-gray-300 hover:text-white hover:border-[#D4AF37] transition-all cursor-pointer"
              aria-label="Next Coach"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, idx) => (
            <div
              key={coach.id}
              className={`rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:border-[#D4AF37]/60 hover:-translate-y-1.5 shadow-xl ${
                idx === currentIndex ? "ring-2 ring-[#D4AF37]/40" : ""
              }`}
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-black/30" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#30363D] text-xs font-bold text-[#D4AF37]">
                  <Star className="size-3.5 fill-[#D4AF37]" />
                  <span>{coach.rating}</span>
                  <span className="text-gray-400 font-normal text-[10px]">({coach.reviewCount})</span>
                </div>

                {/* Tour Experience Pill */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="px-2.5 py-1 rounded-lg bg-[#0B2B1F]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] font-medium text-emerald-300 truncate">
                    {coach.tourExperience}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {coach.name}
                    </h3>
                    <ShieldCheck className="size-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
                    {coach.title}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                    {coach.bio}
                  </p>

                  {/* Credentials Badges */}
                  <div className="space-y-1.5 mb-4">
                    {coach.credentials.map((cred, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-[11px] text-gray-400">
                        <CheckCircle className="size-3 text-[#D4AF37] shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-[#30363D] flex items-center justify-between gap-3">
                  <div className="text-[11px] text-gray-400">
                    <span className="text-white font-semibold">Specialty: </span>
                    <span className="truncate block max-w-[150px]">{coach.specialty}</span>
                  </div>
                  <Link href="/?auth=signup">
                    <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5 cursor-pointer">
                      <Calendar className="size-3.5 text-[#D4AF37]" />
                      Book Lesson
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
