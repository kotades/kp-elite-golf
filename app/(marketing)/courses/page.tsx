"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { golfModules } from "@/constants";
import {
  GraduationCap,
  Search,
  Clock,
  BookOpen,
  Star,
  Users,
  ArrowRight,
  Filter,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursesCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Fundamentals",
    "Swing Mechanics",
    "Short Game & Scrambling",
    "Strategy & Mindset",
  ];

  const filteredModules = golfModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || module.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-16 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <GraduationCap className="size-3.5" />
            9-Module Championship Curriculum
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Explore All <span className="gold-gradient-text">Golf Modules</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            From the grip and posture fundamentals to advanced 3D biomechanics and DECADE tournament strategy. Master each tier at your own pace or through 1-on-1 private instruction.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#161B22] border border-[#30363D]">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drills, modules, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#D4AF37] text-[#0B2B1F]"
                    : "bg-[#0D1117] text-gray-400 hover:text-white border border-[#30363D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/60 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
            >
              {/* Card Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={module.image}
                  alt={module.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-[#30363D] text-[10px] font-bold text-[#D4AF37] uppercase">
                    {module.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0B2B1F]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] font-mono text-emerald-300">
                    Mod {module.moduleNumber}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-[#30363D] text-xs font-semibold text-white">
                  <Star className="size-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{module.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-300">
                  <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                    {module.category}
                  </span>
                  <span className="font-mono text-gray-400">{module.studentCount} enrolled</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                    {module.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {module.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-300">
                        <CheckCircle className="size-3 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 bg-[#0D1117] p-2.5 rounded-xl border border-[#30363D]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3 text-[#D4AF37]" />
                      <span className="text-[11px]">{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="size-3 text-[#D4AF37]" />
                      <span className="text-[11px]">{module.lessonsCount} Lessons ({module.drillsCount} Drills)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#30363D] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Instructor</span>
                    <span className="text-xs font-semibold text-white">{module.instructor.name}</span>
                  </div>
                  <Link href={`/courses/${module.slug}`}>
                    <Button className="bg-[#154734] hover:bg-[#D4AF37] hover:text-[#0B2B1F] text-white text-xs font-bold rounded-xl px-3.5 py-1.5 transition-all">
                      View Syllabus →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
