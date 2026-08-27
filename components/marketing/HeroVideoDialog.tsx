"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, Sparkles, Activity, Eye, Disc } from "lucide-react";
import Image from "next/image";

export default function HeroVideoDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#161B22]/90 border border-[#30363D] hover:border-[#D4AF37]/60 text-white text-sm font-semibold transition-all hover:bg-[#1E2530] shadow-md cursor-pointer">
          <div className="size-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="size-4 text-[#D4AF37] fill-[#D4AF37]" />
          </div>
          <span>Watch Academy Trailer</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-[#0D1117] border-[#30363D] p-0 overflow-hidden text-white">
        <DialogHeader className="p-4 bg-[#161B22] border-b border-[#30363D]">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-base font-serif text-[#D4AF37]">
              <Sparkles className="size-4" />
              KP Elite Golf Training • 2026 Biomechanics & Academy Preview
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="relative aspect-video w-full bg-black overflow-hidden flex flex-col justify-between p-6">
          {/* Simulated High-Res Video Frame */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85"
              alt="KP Elite Swing Analysis"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-black/60" />
          </div>

          {/* Telemetry Overlays */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 border border-[#30363D] text-xs font-mono text-[#D4AF37]">
              <Disc className="size-3 text-red-500 animate-pulse" />
              <span>REC • 240 FPS 3D BIOMECHANICS</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
                BALL SPEED: 168.4 MPH
              </span>
              <span className="text-xs font-mono text-[#D4AF37] bg-yellow-950/60 px-2.5 py-1 rounded border border-[#D4AF37]/30">
                LAUNCH: 14.2°
              </span>
            </div>
          </div>

          {/* Center Play Overlay & Cinematic graphics */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <div className="size-16 rounded-full bg-[#D4AF37]/90 text-[#0B2B1F] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
              <Play className="size-8 fill-[#0B2B1F] ml-1" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">
                The Science of Tour-Level Ball Striking
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto mt-1 drop-shadow">
                Watch how our 8-week kinematic sequence system transforms early extension and casting into pure forward shaft lean.
              </p>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="relative z-10 grid grid-cols-4 gap-2 pt-4 border-t border-white/10 text-center font-mono text-xs">
            <div className="bg-black/60 p-2 rounded border border-white/10">
              <p className="text-gray-400 text-[10px]">SMASH FACTOR</p>
              <p className="text-[#D4AF37] font-bold">1.49</p>
            </div>
            <div className="bg-black/60 p-2 rounded border border-white/10">
              <p className="text-gray-400 text-[10px]">CLUB PATH</p>
              <p className="text-emerald-400 font-bold">+2.4° (In-to-Out)</p>
            </div>
            <div className="bg-black/60 p-2 rounded border border-white/10">
              <p className="text-gray-400 text-[10px]">FACE TO PATH</p>
              <p className="text-emerald-400 font-bold">-0.8° (Slight Draw)</p>
            </div>
            <div className="bg-black/60 p-2 rounded border border-white/10">
              <p className="text-gray-400 text-[10px]">CARRY DISTANCE</p>
              <p className="text-white font-bold">294 YDS</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
