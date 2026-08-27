"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  GraduationCap,
  LayoutDashboard,
  Mic,
  ArrowLeft,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#154734]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="w-full py-6 px-6 sm:px-12 flex items-center justify-between border-b border-[#30363D]/60 bg-[#0D1117]/80 backdrop-blur-md relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all">
            <Trophy className="size-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold text-white tracking-wide">
                KP ELITE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                PGA
              </span>
            </div>
            <span className="text-[11px] text-gray-400 tracking-wider font-medium">
              GOLF ACADEMY & AI
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-gray-300 hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Clubhouse</span>
        </Link>
      </header>

      {/* Center 404 Hero */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Telemetry Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#154734]/60 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-semibold uppercase tracking-widest shadow-lg">
          <Flag className="size-3.5 text-[#D4AF37]" />
          <span>Penalty: 0 Strokes • Ruling: Free Drop</span>
        </div>

        {/* Large 404 Graphic Number */}
        <div className="relative">
          <div className="font-serif text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#154734]/30 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs sm:text-sm uppercase font-mono tracking-[0.3em] font-extrabold text-[#FAFAF7] bg-[#0B2B1F]/90 px-4 py-1 rounded-full border border-[#D4AF37]/40 backdrop-blur-md shadow-2xl">
              LOST BALL IN THE ROUGH
            </span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Out of Bounds <span className="text-[#D4AF37]">(404)</span>
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-emerald-300/90 italic">
            Shot Lost in the Rough
          </p>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed pt-2">
            The fairway you&apos;re looking for doesn&apos;t exist or has been moved to another hole on the course.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-6 max-w-3xl">
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full h-14 bg-[#161B22] hover:bg-[#154734] text-white border border-[#30363D] hover:border-[#D4AF37] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group shadow-md"
            >
              <div className="flex items-center gap-2">
                <Trophy className="size-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs">Return to Clubhouse</span>
              </div>
              <span className="text-[10px] text-gray-400">Home Page (/)</span>
            </Button>
          </Link>

          <Link href="/courses" className="w-full">
            <Button
              variant="outline"
              className="w-full h-14 bg-[#161B22] hover:bg-[#154734] text-white border border-[#30363D] hover:border-[#D4AF37] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group shadow-md"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="size-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs">Browse Curriculum</span>
              </div>
              <span className="text-[10px] text-gray-400">/courses</span>
            </Button>
          </Link>

          <Link href="/dashboard" className="w-full">
            <Button
              variant="outline"
              className="w-full h-14 bg-[#161B22] hover:bg-[#154734] text-white border border-[#30363D] hover:border-[#D4AF37] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group shadow-md"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="size-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs">Go to Student Dashboard</span>
              </div>
              <span className="text-[10px] text-gray-400">/dashboard</span>
            </Button>
          </Link>

          <Link href="/coach" className="w-full">
            <Button
              className="w-full h-14 bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#154734] hover:from-[#1E5D46] hover:to-[#154734] text-white border border-[#D4AF37]/50 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Mic className="size-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs text-[#D4AF37]">Launch AI Voice Coach</span>
              </div>
              <span className="text-[10px] text-gray-300">/coach</span>
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer info */}
      <footer className="py-6 px-4 text-center border-t border-[#30363D]/40 text-xs text-gray-500 relative z-10">
        <p>© {new Date().getFullYear()} KP Elite Golf Training Academy. Augusta National Corridor & Pebble Beach HQ.</p>
      </footer>
    </div>
  );
}
