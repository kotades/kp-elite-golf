"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { golfModules, coaches } from "@/constants";
import CustomVideoTheater from "@/components/student/CustomVideoTheater";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Download,
  Mic,
  Activity,
  Award,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { updateChapterProgress } from "@/lib/actions/firestore.actions";
import SubscriptionRequiredModal from "@/components/student/SubscriptionRequiredModal";

interface VideoTheaterPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

export default function VideoTheaterPage({ params }: VideoTheaterPageProps) {
  const resolvedParams = use(params);
  const { courseId, chapterId } = resolvedParams;
  const { user, profile } = useAuth();
  const [subModalOpen, setSubModalOpen] = useState(false);

  const currentCourse =
    golfModules.find((m) => m.slug === courseId || m.id === courseId) ||
    golfModules[3]; // Default to Full Swing Biomechanics

  const currentChapter =
    currentCourse.chapters.find((c) => c.id === chapterId) ||
    currentCourse.chapters[0];

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const activeLesson = currentChapter.lessons[activeLessonIndex] || currentChapter.lessons[0];

  const handleCompleteAndNext = async () => {
    if (!profile?.subscribed) {
      setSubModalOpen(true);
      return;
    }
    if (user) {
      try {
        await updateChapterProgress(user.uid, currentCourse.slug, currentChapter.id, true);
      } catch (err) {
        console.warn("Could not save progress:", err);
      }
    }
    setActiveLessonIndex((prev) => (prev + 1) % currentChapter.lessons.length);
  };

  // Anatomical checkpoints data
  const checkpoints = [
    { name: "01. Address & Posture", angle: "Spine 36° / Knee flex 22°", cue: "Weight balanced on balls of feet, arms hang naturally from shoulders." },
    { name: "02. One-Piece Takeaway", angle: "Clubface parallel to spine at 8 o'clock", cue: "Chest and shoulders initiate rotation; no early wrist flicking." },
    { name: "03. Apex Coil", angle: "90° shoulder turn / 45° hip rotation", cue: "Maintain trail knee flexion to store ground reaction torque." },
    { name: "04. Downswing Transition", angle: "Shaft shallowing to 58° plane", cue: "Lower body pressure shift onto lead heel before arms pull down." },
    { name: "05. Tour Impact", angle: "Lead wrist flat / Shaft lean +7°", cue: "Hips open 40° towards target, chest covering the golf ball." },
    { name: "06. Balanced Finish", angle: "Chest facing target / 95% weight on lead heel", cue: "Hold finish for 3 seconds until ball lands in fairway." },
  ];

  const drills = [
    { title: "Split-Hand Pressure Shift Drill", reps: "3 Sets of 10 Swings", description: "Separates lead and trail hand feel to prevent over-the-top casting." },
    { title: "Alignment Stick Under Armpit Drill", reps: "15 Balls with 7-Iron", description: "Enforces chest rotation and eliminates disconnected arm swings." },
    { title: "Impact Bag Compression Test", reps: "10 Strikes at 50% Speed", description: "Builds muscle memory for forward shaft lean and square face angle." },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#30363D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white">Curriculum</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{currentCourse.title}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {activeLesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/coach">
            <Button className="bg-[#154734] hover:bg-[#1E5D46] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-2 cursor-pointer">
              <Mic className="size-4 animate-pulse" />
              <span>Voice Ask Coach</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2-Column Theater Layout (70% Video, 30% Playlist) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video Theater + Tabs (Col 1-8 / 70%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Custom Player with Subscription Lock Overlay if unsubscribed */}
          <div className="relative group overflow-hidden rounded-3xl">
            <CustomVideoTheater
              lessonTitle={activeLesson.title}
              thumbnail="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=85"
              videoUrl="https://videos.pexels.com/video-files/7542066/7542066-uhd_2560_1440_25fps.mp4"
            />

            {!profile?.subscribed && (
              <div
                onClick={() => setSubModalOpen(true)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6 space-y-4 cursor-pointer"
              >
                <div className="size-14 rounded-2xl bg-[#154734] border border-[#D4AF37]/60 flex items-center justify-center shadow-xl">
                  <Lock className="size-7 text-[#D4AF37]" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                    Class Access Restricted
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Subscription Required to Stream Class Video
                  </h3>
                  <p className="text-xs text-gray-300">
                    Active PGA Academy membership is required to attend live class sessions, stream HD video lessons, and interact with drill breakdowns.
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B2B1F] font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg cursor-pointer">
                  Activate Membership to Watch
                </Button>
              </div>
            )}
          </div>

          {/* Tabbed Lesson Drawer */}
          <Tabs defaultValue="checkpoints" className="w-full">
            <TabsList className="w-full flex items-center justify-start sm:justify-stretch overflow-x-auto bg-[#161B22] p-1 border border-[#30363D] rounded-2xl h-auto min-h-[48px] scrollbar-none gap-1">
              <TabsTrigger value="checkpoints" className="text-[11px] sm:text-xs font-bold whitespace-nowrap px-3 py-2 flex-1 shrink-0">
                Anatomical Checkpoints
              </TabsTrigger>
              <TabsTrigger value="drills" className="text-[11px] sm:text-xs font-bold whitespace-nowrap px-3 py-2 flex-1 shrink-0">
                Prescribed Range Drills
              </TabsTrigger>
              <TabsTrigger value="ai-coach" className="text-[11px] sm:text-xs font-bold whitespace-nowrap px-3 py-2 flex-1 shrink-0">
                AI Coach Guidance
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Anatomical Checkpoints */}
            <TabsContent value="checkpoints" className="mt-4 p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#30363D]">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="size-4 text-[#D4AF37]" />
                  <span>Kinematic Sequence Checkpoints</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  TrackMan 3D Calibrated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {checkpoints.map((cp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0D1117] border border-[#30363D] space-y-1 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{cp.name}</span>
                      <span className="text-[10px] font-mono text-[#D4AF37]">{cp.angle}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{cp.cue}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Tab 2: Range Drills */}
            <TabsContent value="drills" className="mt-4 p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#30363D]">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="size-4 text-[#D4AF37]" />
                  <span>Range Practice Homework</span>
                </h3>

                <button
                  onClick={() => alert("Downloading printable drill sheet PDF...")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Download PDF Blueprint</span>
                </button>
              </div>

              <div className="space-y-3">
                {drills.map((drill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#0D1117] border border-[#30363D] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="size-5 rounded-full bg-[#154734] text-[#D4AF37] text-xs flex items-center justify-center font-mono font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-white">{drill.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400 pl-7">{drill.description}</p>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-400 whitespace-nowrap bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
                      {drill.reps}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Tab 3: AI Voice Coach Insight */}
            <TabsContent value="ai-coach" className="mt-4 p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#30363D]">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#154734] border border-[#D4AF37]/50 flex items-center justify-center">
                    <Mic className="size-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">
                      Coach Kevin AI Assistant
                    </h3>
                    <p className="text-[10px] text-gray-400">Tuned specifically for this lesson</p>
                  </div>
                </div>

                <Link href="/coach">
                  <Button className="bg-[#D4AF37] text-[#0B2B1F] font-bold text-xs px-3.5 py-1.5 rounded-xl cursor-pointer">
                    Launch Studio
                  </Button>
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D1117] border border-[#30363D] space-y-2">
                <p className="text-xs font-semibold text-emerald-300 font-mono">
                  &ldquo;When practicing Lesson 3, focus on transferring your center of mass onto your lead heel before your arms start dropping. This naturally shallows the club shaft into the slot without requiring artificial manipulation.&rdquo;
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  - Head PGA Master Instructor Kevin Palmer AI Model
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Chapter Playlist Sidebar (Col 9-12 / 30%) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#161B22] border border-[#30363D] p-6 space-y-6 shadow-xl sticky top-24">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
                Module 0{currentCourse.moduleNumber} Syllabus
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                {activeLessonIndex + 1} of {currentChapter.lessons.length}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              {currentChapter.title}
            </h3>
          </div>

          {/* Lessons List */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {currentChapter.lessons.map((lesson, idx) => {
              const isCurrent = idx === activeLessonIndex;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (!profile?.subscribed) {
                      setSubModalOpen(true);
                    } else {
                      setActiveLessonIndex(idx);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isCurrent
                      ? "bg-[#154734] border-[#D4AF37] text-white shadow-md"
                      : "bg-[#0D1117] border-[#30363D] text-gray-300 hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-7 rounded-xl flex items-center justify-center shrink-0 ${
                      isCurrent ? "bg-[#D4AF37] text-[#0B2B1F]" : "bg-[#161B22] text-gray-400"
                    }`}>
                      {isCurrent ? <Play className="size-3.5 fill-[#0B2B1F]" /> : <CheckCircle2 className="size-4 text-emerald-400" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold line-clamp-1">{lesson.title}</h4>
                      <span className="text-[10px] text-gray-400 font-mono">{lesson.duration}</span>
                    </div>
                  </div>

                  {lesson.isPreview && (
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      Sample
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Complete & Next Button */}
          <div className="pt-4 border-t border-[#30363D] space-y-2">
            <Button
              onClick={handleCompleteAndNext}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-xs py-3 rounded-xl shadow-lg hover:scale-102 transition-all cursor-pointer"
            >
              <span>Mark Complete & Next Lesson →</span>
            </Button>
          </div>
        </div>
      </div>

      <SubscriptionRequiredModal
        isOpen={subModalOpen}
        onOpenChange={setSubModalOpen}
        actionAttempted="attend this video class lesson"
      />
    </div>
  );
}
