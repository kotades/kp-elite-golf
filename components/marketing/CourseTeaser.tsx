import React from "react";
import Image from "next/image";
import Link from "next/link";
import { golfModules } from "@/constants";
import {
  GraduationCap,
  Clock,
  BookOpen,
  ArrowRight,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseTeaser() {
  const featuredModules = golfModules.slice(0, 3);

  return (
    <section className="py-24 bg-[#0D1117] text-white border-t border-[#30363D]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <GraduationCap className="size-3.5" />
              Comprehensive Academy Syllabus
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Curated <span className="gold-gradient-text">Core Golf Modules</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Structured step-by-step masterclasses designed to build an unbreakable repeatable motion from tee to green.
            </p>
          </div>

          <Link href="/courses">
            <Button className="bg-[#161B22] hover:bg-[#1E2530] text-white border border-[#30363D] hover:border-[#D4AF37] text-sm font-semibold rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all">
              Explore All 9 Modules
              <ArrowRight className="size-4 text-[#D4AF37]" />
            </Button>
          </Link>
        </div>

        {/* 3-Column Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredModules.map((module) => (
            <div
              key={module.id}
              className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/60 hover:-translate-y-2 transition-all duration-300 shadow-xl"
            >
              {/* Image Header with Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={module.image}
                  alt={module.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-black/40" />

                {/* Level Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#30363D] text-[11px] font-bold text-[#D4AF37] uppercase">
                    {module.level}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#30363D] text-xs font-semibold text-white">
                  <Star className="size-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{module.rating}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                  <span className="font-mono bg-[#0B2B1F]/90 px-2.5 py-0.5 rounded border border-[#D4AF37]/30 text-[#D4AF37]">
                    Module 0{module.moduleNumber}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-gray-300">
                    <Users className="size-3.5 text-gray-400" />
                    <span>{module.studentCount} golfers</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                    {module.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 bg-[#0D1117] p-3 rounded-xl border border-[#30363D]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-[#D4AF37]" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="size-3.5 text-[#D4AF37]" />
                      <span>{module.lessonsCount} Lessons ({module.drillsCount} Drills)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#30363D] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Lead Instructor</span>
                    <span className="text-xs font-semibold text-white">{module.instructor.name}</span>
                  </div>
                  <Link href={`/courses/${module.slug}`}>
                    <Button className="bg-[#154734] hover:bg-[#D4AF37] hover:text-[#0B2B1F] text-white text-xs font-bold rounded-xl px-4 py-2 transition-all">
                      View Syllabus →
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
