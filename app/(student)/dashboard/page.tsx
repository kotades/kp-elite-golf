"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Play,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Upload,
  ArrowRight,
  TrendingDown,
  Activity,
  Calendar,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import RadialProgressRing from "@/components/student/RadialProgressRing";
import SwingUploadModal from "@/components/student/SwingUploadModal";
import { golfModules } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { getSwingSubmissions, getUserProgress } from "@/lib/actions/firestore.actions";
import { SwingSubmission, StudentProgress } from "@/types";

export default function StudentDashboardPage() {
  const { user, profile } = useAuth();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SwingSubmission[]>([]);
  const [progressData, setProgressData] = useState<StudentProgress | null>(null);

  const fetchDashboardData = async () => {
    const uid = user?.uid || "student-guest";
    const [subs, prog] = await Promise.all([
      getSwingSubmissions(uid),
      getUserProgress(uid),
    ]);
    setSubmissions(subs);
    setProgressData(prog);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const currentResume = {
    courseTitle: "Module 04 • Full Swing Biomechanics",
    chapterTitle: "Chapter 2: Downswing Transition & Shaft Shallowing",
    lessonTitle: "Lesson 3: Lower Body Pressure Shift onto Lead Side",
    pausedTime: "14:28 / 25:00",
    progressPercent: progressData?.overallScore ?? 68,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=85",
    link: "/courses/full-swing-mechanics/chapters/m4-c1",
  };

  return (
    <div className="space-y-8">
      {/* 1. Daily Swing Focus Tip Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#161B22] border border-[#D4AF37]/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
            <Sparkles className="size-5 text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                Daily Tour Technique Cue
              </span>
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-sm font-semibold text-white">
              Keep your trail elbow pinned to the ribcage during the transition to compress the ball with pure forward shaft lean.
            </p>
          </div>
        </div>

        <Link href="/coach" className="shrink-0">
          <Button className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
            Ask AI Coach
          </Button>
        </Link>
      </div>

      {/* 2. Top 3-Column Grid: Resume Learning Hero (Cols 1-2) & Quick Stats (Col 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Learning Hero Card (Cols 1-2) */}
        <div className="lg:col-span-2 rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all shadow-xl">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900">
            <Image
              src={currentResume.image}
              alt={currentResume.lessonTitle}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-[#161B22]/40 to-transparent" />

            {/* In-Progress Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#30363D] text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                Active Chapter
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#0B2B1F]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] font-mono text-emerald-300">
                0.25x Slow-Mo Ready
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-gray-300">
              <span className="bg-black/70 px-2 py-0.5 rounded border border-white/10">
                Paused at {currentResume.pausedTime}
              </span>
              <span className="text-[#D4AF37] font-bold">{currentResume.progressPercent}% Complete</span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                {currentResume.courseTitle}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {currentResume.lessonTitle}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {currentResume.chapterTitle}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <Progress value={currentResume.progressPercent} className="h-2" />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="size-3.5 text-[#D4AF37]" />
                <span>10m remaining in this session</span>
              </div>

              <Link href={currentResume.link}>
                <Button className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2">
                  <Play className="size-4 fill-[#0B2B1F]" />
                  <span>Resume Lesson</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Stack (Col 3) */}
        <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col justify-between space-y-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif text-lg font-bold text-white">
                Course Progress
              </h4>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#154734]/40 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                8-Week Path
              </span>
            </div>
            <RadialProgressRing progress={progressData?.overallScore ?? 68} />
          </div>

          <div className="space-y-3 pt-2 border-t border-[#30363D]">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0D1117] border border-[#30363D]">
              <div className="flex items-center gap-2.5">
                <Flame className="size-5 text-orange-400 fill-orange-400" />
                <div>
                  <p className="text-xs font-bold text-white">{profile?.streakDays || 3}-Day Streak</p>
                  <p className="text-[10px] text-gray-400">Active Practice</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">+120 pts</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0D1117] border border-[#30363D]">
              <div className="flex items-center gap-2.5">
                <Award className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="text-xs font-bold text-white">🥈 Consistency</p>
                  <p className="text-[10px] text-gray-400">Milestone Stage 02</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Up Next Course Curriculum Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Up Next in Your Pathway
            </h3>
            <p className="text-xs text-gray-400">
              Continue your sequential 9-module progression.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>View All Modules</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {golfModules.slice(4, 7).map((module) => (
            <div
              key={module.id}
              className="rounded-2xl bg-[#161B22] border border-[#30363D] p-5 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#D4AF37] bg-[#0B2B1F] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                    Module 0{module.moduleNumber}
                  </span>
                  <span className="text-[10px] text-gray-400">{module.duration}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-1">
                  {module.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                  {module.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#30363D] flex items-center justify-between">
                <span className="text-[11px] text-gray-400">{module.lessonsCount} Lessons</span>
                <Link href={`/courses/${module.slug}`}>
                  <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer">
                    Start Module
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Swing Locker & Coach Feedback */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Video className="size-5 text-[#D4AF37]" />
              <span>Personal Swing Locker & Telemetry</span>
            </h3>
            <p className="text-xs text-gray-400">
              Review your uploaded video submissions, TrackMan metrics, and instructor feedback notes.
            </p>
          </div>

          <Button
            onClick={() => setUploadModalOpen(true)}
            className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer border border-[#D4AF37]/40 shadow-md"
          >
            <Upload className="size-4 text-[#D4AF37]" />
            <span>Upload New Swing</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full bg-black">
                <Image
                  src={sub.videoUrl || "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=85"}
                  alt={sub.clubUsed}
                  fill
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border text-emerald-400 bg-emerald-950/60 border-emerald-500/30">
                    {sub.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-gray-300">
                  <span className="bg-black/70 px-2 py-0.5 rounded border border-white/10">{sub.clubUsed}</span>
                  <span className="text-emerald-400 font-bold">{sub.aiMetrics?.clubheadSpeedMph ? `${sub.aiMetrics.clubheadSpeedMph} mph` : "88.2 mph"}</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{sub.studentName || "Kevin Palmer (PGA Master)"}</span>
                  <span className="text-gray-500 font-mono text-[11px]">{sub.date}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-gray-300">
                  <p className="text-[11px] text-[#D4AF37] font-semibold mb-0.5">Instructor Voiceover Note:</p>
                  <p className="italic">{sub.coachNotes || "Kinematic sequence and clubface angle within tour tolerance."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SwingUploadModal
        isOpen={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUploadSuccess={fetchDashboardData}
      />
    </div>
  );
}
