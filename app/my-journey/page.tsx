"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Activity,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Video,
  Clock,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import RadialProgressRing from "@/components/student/RadialProgressRing";
import { getUserProgress, getSwingSubmissions, getUserSessions } from "@/lib/actions/firestore.actions";
import { StudentProgress, SwingSubmission } from "@/types";
import AuthModal from "@/components/auth/AuthModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/marketing/Footer";

export default function MyJourneyPage() {
  const { user, profile, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [progressData, setProgressData] = useState<StudentProgress | null>(null);
  const [submissions, setSubmissions] = useState<SwingSubmission[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const uid = user?.uid || "student-guest";
      const [prog, subs, sess] = await Promise.all([
        getUserProgress(uid),
        getSwingSubmissions(uid),
        getUserSessions(uid),
      ]);
      setProgressData(prog);
      setSubmissions(subs);
      setSessions(sess);
    };

    fetchData();
  }, [user]);

  const displayName = profile?.displayName || user?.displayName || "Jordan Miller";
  const userPhoto = profile?.photoURL || user?.photoURL || "/coaches/coach-1.jpg";
  const handicap = profile?.handicap ?? progressData?.handicapCurrent ?? 12.4;
  const startHandicap = progressData?.handicapStart ?? 18.2;
  const handicapDrop = (startHandicap - handicap).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-white">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* 1. Header Profile Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#161B22] border border-[#D4AF37]/50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 z-10">
          <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-xl shrink-0">
            <Image
              src={userPhoto}
              alt={displayName}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                Academy Cadet • Stage 02
              </span>
              <span className="text-xs font-mono text-emerald-400">● Active Member</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {displayName}
            </h1>
            <p className="text-xs text-gray-300 font-mono">
              {user?.email || "golfer@kpelitegolf.com"}
            </p>
          </div>
        </div>

        {/* Milestone Badge Pill */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <div className="p-3.5 rounded-2xl bg-[#0D1117]/80 backdrop-blur-md border border-[#30363D] text-center min-w-[110px]">
            <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
              <TrendingDown className="size-4" />
              <span className="text-lg font-mono font-extrabold text-white">-{handicapDrop}</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Handicap Drop</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0D1117]/80 backdrop-blur-md border border-[#30363D] text-center min-w-[110px]">
            <div className="flex items-center justify-center gap-1 text-emerald-400">
              <Flame className="size-4 fill-emerald-400" />
              <span className="text-lg font-mono font-extrabold text-white">{profile?.streakDays || 3} Days</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Active Streak</p>
          </div>
        </div>
      </div>

      {/* 2. Top Stats Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Handicap Progression */}
        <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Target className="size-4 text-[#D4AF37]" />
              <span>Handicap Differential</span>
            </h3>
            <span className="text-[10px] font-mono text-[#D4AF37] bg-[#154734]/50 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              USGA Index
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl font-extrabold text-white">{handicap}</span>
            <span className="text-xs text-gray-400 line-through">Start: {startHandicap}</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Goal: Single Digit (8.0)</span>
              <span className="text-emerald-400 font-bold">72% to Goal</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
        </div>

        {/* Course Completion */}
        <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Award className="size-4 text-[#D4AF37]" />
              <span>Foundation Curriculum</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Module 4 of 9</span>
          </div>

          <div className="py-2">
            <RadialProgressRing progress={progressData?.overallScore ?? 68} />
          </div>

          <div className="text-center text-xs text-gray-400">
            6 of 16 core lessons verified by PGA instructors
          </div>
        </div>

        {/* 1-on-1 Lesson Next Up */}
        <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Calendar className="size-4 text-[#D4AF37]" />
              <span>Next Coaching Session</span>
            </h3>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              Confirmed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D1117] border border-[#30363D] space-y-1.5">
            <p className="text-xs font-bold text-white">Tomorrow • 10:00 AM EST</p>
            <p className="text-xs text-[#D4AF37] font-medium">Driver Dispersion & Launch Optimization</p>
            <p className="text-[11px] text-gray-400">With Head Coach Kevin Palmer (PGA Master)</p>
          </div>

          <Link href="/coach">
            <Button className="w-full bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-semibold py-2.5 rounded-xl border border-[#D4AF37]/30 flex items-center justify-center gap-2">
              <Sparkles className="size-3.5 text-[#D4AF37]" />
              <span>Pre-Session AI Range Warm-up</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 3. Skill Breakdown Matrices */}
      <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#30363D]">
          <div>
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Activity className="size-5 text-[#D4AF37]" />
              <span>Biomechanics & Skill Competencies</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Calibrated via 240 fps TrackMan telemetry and coach evaluations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Grip & Setup Geometry", score: progressData?.skillRatings.grip ?? 88, status: "Tour Standard" },
            { label: "Postural Spine Angle Stability", score: progressData?.skillRatings.setup ?? 92, status: "Exceptional" },
            { label: "Downswing Transition & Lag", score: progressData?.skillRatings.fullSwing ?? 74, status: "In Progress" },
            { label: "Putting Speed & Pendulum Arc", score: progressData?.skillRatings.putting ?? 82, status: "Proficient" },
            { label: "Wedge Matrix & Low Point", score: progressData?.skillRatings.chipping ?? 79, status: "Proficient" },
            { label: "DECADE Course Strategy", score: progressData?.skillRatings.courseManagement ?? 70, status: "Developing" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0D1117] border border-[#30363D] space-y-2 hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.label}</span>
                <span className="text-xs font-mono font-extrabold text-[#D4AF37]">{item.score}%</span>
              </div>
              <Progress value={item.score} className="h-1.5" />
              <p className="text-[10px] text-gray-400 font-mono">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Swing Submissions History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Video className="size-5 text-[#D4AF37]" />
              <span>Recent Swing Telemetry Submissions</span>
            </h3>
            <p className="text-xs text-gray-400">
              Your historical swing analyses, AI kinematic markers, and coach voiceover feedback.
            </p>
          </div>

          <Link href="/dashboard">
            <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs px-4 py-2 rounded-xl border border-[#D4AF37]/40">
              Open Swing Locker
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full bg-black">
                <Image
                  src={sub.videoUrl || "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=85"}
                  alt={sub.clubUsed}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#154734] text-[#D4AF37] border border-[#D4AF37]/40">
                    {sub.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-xl border border-white/10">
                  <span>{sub.clubUsed}</span>
                  <span className="text-emerald-400">{sub.aiMetrics?.clubheadSpeedMph} mph</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{sub.studentName}</span>
                  <span>{sub.date}</span>
                </div>
                {sub.coachNotes && (
                  <p className="text-xs text-gray-300 italic p-3 rounded-xl bg-[#0D1117] border border-[#30363D]">
                    &ldquo;{sub.coachNotes}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
      <Footer />
    </div>
  );
}
