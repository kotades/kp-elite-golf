"use client";

import React, { useState } from "react";
import Link from "next/link";
import { golfModules } from "@/constants";
import {
  Search,
  BookOpen,
  Video,
  Clock,
  Filter,
  CheckCircle,
  FileText,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Takeaway", "Transition", "Impact", "Putting", "Chipping", "Bunker", "DECADE Strategy"];

  // Extract all lessons across all modules for fine-grained search
  const allLessons = golfModules.flatMap((mod) =>
    mod.chapters.flatMap((ch) =>
      ch.lessons.map((lesson) => ({
        ...lesson,
        moduleTitle: mod.title,
        moduleNumber: mod.moduleNumber,
        chapterTitle: ch.title,
        moduleSlug: mod.slug,
        chapterId: ch.id,
      }))
    )
  );

  const filteredLessons = allLessons.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === "All" ||
      item.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
      item.description.toLowerCase().includes(selectedTag.toLowerCase()) ||
      item.moduleTitle.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
          <Compass className="size-4 shrink-0" />
          <span>Curriculum & Drill Explorer</span>
        </div>
        <h1 className="font-serif text-xl sm:text-3xl font-bold text-white tracking-tight break-words">
          Search Lessons, Drills & Biomechanics Cues
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Instantly jump to any specific swing checkpoint or practice drill in the KP Elite Academy library.
        </p>
      </div>

      {/* Search Input and Filter Pills */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4 max-w-full">
        <div className="relative w-full">
          <Search className="size-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 shrink-0" />
          <input
            type="text"
            placeholder="Search by keyword, e.g., 'shallow', 'hip rotation'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full flex-nowrap shrink-0">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                selectedTag === tag
                  ? "bg-[#D4AF37] text-[#0B2B1F]"
                  : "bg-[#0D1117] text-gray-400 hover:text-white border border-[#30363D]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-gray-400">
        <span>Found {filteredLessons.length} lessons and drills</span>
        <span className="font-mono text-[#D4AF37]">90+ Total Drills in Academy</span>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/courses/${lesson.moduleSlug}/chapters/${lesson.chapterId}`}
            className="rounded-2xl bg-[#161B22] border border-[#30363D] p-5 flex flex-col justify-between hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#D4AF37] bg-[#0B2B1F] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  Mod 0{lesson.moduleNumber} • {lesson.moduleTitle}
                </span>
                <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="size-3 text-gray-500" />
                  {lesson.duration}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-1">
                {lesson.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                {lesson.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#30363D] flex items-center justify-between text-xs text-gray-300">
              <span className="text-[11px] text-emerald-400 font-mono">
                {lesson.drillsCount} Practice Drills Attached
              </span>
              <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Theater <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
