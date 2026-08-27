"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
  Layers,
  Sparkles,
  Repeat,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomVideoTheaterProps {
  lessonTitle: string;
  thumbnail: string;
}

export default function CustomVideoTheater({
  lessonTitle,
  thumbnail,
}: CustomVideoTheaterProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showSwingPlaneGrid, setShowSwingPlaneGrid] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [frameIndex, setFrameIndex] = useState(142); // 240 fps simulation frame

  const speeds = [0.25, 0.5, 0.75, 1.0];

  const stepFrame = (delta: number) => {
    setFrameIndex((prev) => Math.max(0, prev + delta));
  };

  return (
    <div className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden shadow-2xl space-y-4">
      {/* Video Viewport */}
      <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center select-none">
        {/* Background Frame / Image */}
        <Image
          src={thumbnail}
          alt={lessonTitle}
          fill
          className="object-cover opacity-80"
        />

        {/* Swing Plane & Biomechanical Grid Overlay */}
        {showSwingPlaneGrid && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Target Line & Shaft Plane Angle Lines */}
            <svg className="size-full">
              <line
                x1="20%"
                y1="85%"
                x2="70%"
                y2="15%"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="opacity-80"
              />
              <line
                x1="35%"
                y1="85%"
                x2="85%"
                y2="20%"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />
              {/* Spine Angle Indicator */}
              <circle cx="48%" cy="38%" r="6" fill="#D4AF37" className="animate-pulse" />
              <line
                x1="48%"
                y1="38%"
                x2="52%"
                y2="62%"
                stroke="#F43F5E"
                strokeWidth="2"
                className="opacity-75"
              />
            </svg>

            {/* Live Telemetry Pill Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-[#30363D] text-[11px] font-mono text-[#D4AF37] flex items-center gap-1.5">
                <Activity className="size-3 text-emerald-400" />
                <span>SHAFT PLANE: 61.4°</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-[#30363D] text-[11px] font-mono text-emerald-400">
                FRAME #{frameIndex} (240 FPS)
              </div>
            </div>
          </div>
        )}

        {/* Center Play/Pause Overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-20 size-16 sm:size-20 rounded-full bg-black/60 hover:bg-[#D4AF37] border-2 border-[#D4AF37] text-white hover:text-[#0B2B1F] flex items-center justify-center transition-all cursor-pointer shadow-2xl"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-8 fill-current" />
          ) : (
            <Play className="size-8 fill-current ml-1" />
          )}
        </button>

        {/* Bottom Time Scrubber Simulation */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] w-[58%]" />
        </div>
      </div>

      {/* High-Precision Biomechanics Player Controls Bar */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#30363D] bg-[#0D1117]/60">
        {/* Left: Playback & Frame Stepper */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-[#161B22] border border-[#30363D] text-gray-300 hover:text-white"
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>

          {/* Frame Stepping Buttons */}
          <button
            onClick={() => stepFrame(-1)}
            className="px-2.5 py-1.5 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#D4AF37] text-[11px] font-mono text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="size-3 text-[#D4AF37]" />
            <span>◀ 1 Frame</span>
          </button>
          <button
            onClick={() => stepFrame(1)}
            className="px-2.5 py-1.5 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#D4AF37] text-[11px] font-mono text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>1 Frame ▶</span>
            <ChevronRight className="size-3 text-[#D4AF37]" />
          </button>

          {/* 5s Replay Loop */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isLooping
                ? "bg-[#154734] border-[#D4AF37] text-[#D4AF37]"
                : "bg-[#161B22] border-[#30363D] text-gray-400 hover:text-white"
            }`}
            title="5s Impact Loop"
          >
            <Repeat className="size-3.5" />
            <span className="text-[10px] hidden sm:inline">5s Loop</span>
          </button>
        </div>

        {/* Center: Slow-Motion Speed Toggles */}
        <div className="flex items-center gap-1 bg-[#161B22] p-1 rounded-xl border border-[#30363D]">
          {speeds.map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                playbackSpeed === speed
                  ? "bg-[#D4AF37] text-[#0B2B1F] shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {speed}x
              {speed === 0.25 && <span className="text-[8px] ml-0.5 opacity-80">(Impact)</span>}
            </button>
          ))}
        </div>

        {/* Right: Swing Plane Grid Toggle & Audio */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSwingPlaneGrid(!showSwingPlaneGrid)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              showSwingPlaneGrid
                ? "bg-[#154734] border-[#D4AF37] text-[#D4AF37]"
                : "bg-[#161B22] border-[#30363D] text-gray-400"
            }`}
          >
            <Eye className="size-3.5" />
            <span className="text-[11px]">Swing Plane Grid</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-[#161B22] border border-[#30363D] text-gray-400 hover:text-white"
          >
            {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
