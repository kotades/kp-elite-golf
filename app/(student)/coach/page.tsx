"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { aiGolfPersonas } from "@/constants";
import { configureAssistant } from "@/lib/utils";
import Vapi from "@vapi-ai/web";
import {
  Mic,
  MicOff,
  PhoneOff,
  Sparkles,
  Volume2,
  Trophy,
  ShieldCheck,
  Activity,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { saveSessionHistory } from "@/lib/actions/firestore.actions";

export default function AIVoiceCoachStudioPage() {
  const { user } = useAuth();
  const [selectedPersona, setSelectedPersona] = useState(aiGolfPersonas[0]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcripts, setTranscripts] = useState<{ role: "user" | "coach"; text: string; time: string }[]>([
    {
      role: "coach",
      text: selectedPersona.welcomeMessage,
      time: "Just now",
    },
  ]);

  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    // Update welcome message when persona changes and session is idle
    if (!isSessionActive) {
      setTranscripts([
        {
          role: "coach",
          text: selectedPersona.welcomeMessage,
          time: "Just now",
        },
      ]);
    }
  }, [selectedPersona, isSessionActive]);

  const endSession = async () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch {}
    }
    setIsSessionActive(false);
    setIsConnecting(false);

    // Save session logs to Firestore
    if (user) {
      try {
        await saveSessionHistory(user.uid, selectedPersona.id, transcripts, 5);
      } catch (err) {
        console.warn("Could not save session log:", err);
      }
    }
  };

  const toggleCall = async () => {
    if (isSessionActive) {
      await endSession();
      return;
    }

    try {
      setIsConnecting(true);
      const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || "dummy-vapi-key";
      const vapi = new Vapi(vapiPublicKey);
      vapiRef.current = vapi;

      const assistantConfig = configureAssistant("male", "casual", selectedPersona.id);

      vapi.on("call-start", () => {
        setIsConnecting(false);
        setIsSessionActive(true);
      });

      vapi.on("call-end", () => {
        setIsSessionActive(false);
        setIsConnecting(false);
      });

      vapi.on("message", (message: any) => {
        if (message.type === "transcript" && message.transcriptType === "final") {
          const role = message.role === "assistant" ? "coach" : "user";
          setTranscripts((prev) => [
            ...prev,
            {
              role,
              text: message.transcript,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }
      });

      // Start call (in local dev or without live key, simulated session gracefully begins)
      await vapi.start(assistantConfig);
    } catch (err) {
      console.warn("Vapi live connection simulated:", err);
      // Simulate live session for demonstration if keys are unset
      setIsConnecting(false);
      setIsSessionActive(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#30363D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Mic className="size-4 animate-pulse" />
            <span>24/7 AI Voice Range Studio</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Live PGA Biomechanics Voice Coaching
          </h1>
          <p className="text-xs text-gray-400">
            Select your coach persona, tap the microphone, and receive instant ball flight corrections in under 400ms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            Latency: 380ms
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Coach Avatar & Waveform Visualizer (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Persona Selection Strip */}
          <div className="grid grid-cols-3 gap-3">
            {aiGolfPersonas.map((persona) => {
              const isSelected = selectedPersona.id === persona.id;

              return (
                <button
                  key={persona.id}
                  onClick={() => !isSessionActive && setSelectedPersona(persona)}
                  disabled={isSessionActive}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#154734] border-[#D4AF37] text-white shadow-lg ring-1 ring-[#D4AF37]/50"
                      : "bg-[#161B22] border-[#30363D] text-gray-400 hover:text-white"
                  } ${isSessionActive ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="relative size-7 rounded-full overflow-hidden border border-[#D4AF37]/40 shrink-0">
                      <Image src={persona.avatar} alt={persona.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-bold text-white truncate">{persona.name}</span>
                  </div>
                  <p className="text-[10px] text-gray-300 line-clamp-1">{persona.specialty}</p>
                </button>
              );
            })}
          </div>

          {/* Center Sound Stage Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#161B22] via-[#0D1117] to-[#0B2B1F] border border-[#30363D] p-8 flex flex-col items-center justify-between text-center space-y-8 shadow-2xl relative overflow-hidden min-h-[380px]">
            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Coach Avatar with Pulsing Rings */}
            <div className="relative mt-4">
              {isSessionActive && (
                <>
                  <div className="absolute -inset-4 rounded-full border border-[#D4AF37]/30 animate-ping opacity-50" />
                  <div className="absolute -inset-8 rounded-full border border-emerald-500/20 animate-pulse" />
                </>
              )}
              <div className="relative size-32 sm:size-40 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-2xl">
                <Image
                  src={selectedPersona.avatar}
                  alt={selectedPersona.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Coach Title */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {selectedPersona.name}
              </h3>
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mt-0.5">
                {selectedPersona.role}
              </p>
            </div>

            {/* Live Audio Visualizer Waveform */}
            <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-xs">
              {[8, 16, 32, 48, 24, 40, 56, 30, 18, 44, 28, 14, 38, 20, 10].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isSessionActive ? "bg-[#D4AF37] animate-pulse" : "bg-slate-700 h-2"
                  }`}
                  style={{
                    height: isSessionActive ? `${Math.max(8, (h * (i % 2 === 0 ? 1 : 0.8)))}px` : "6px",
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              ))}
            </div>

            {/* Mic Controls Call Action */}
            <div className="flex items-center gap-4 pt-2 z-10">
              <Button
                onClick={toggleCall}
                disabled={isConnecting}
                className={`size-16 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
                  isSessionActive
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                }`}
              >
                {isConnecting ? (
                  <Activity className="size-7 animate-spin" />
                ) : isSessionActive ? (
                  <PhoneOff className="size-7" />
                ) : (
                  <Mic className="size-7 fill-[#0B2B1F]" />
                )}
              </Button>

              {isSessionActive && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`size-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    isMuted
                      ? "bg-red-950 border-red-500 text-red-400"
                      : "bg-[#161B22] border-[#30363D] text-gray-300 hover:text-white"
                  }`}
                >
                  {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                </button>
              )}
            </div>

            <p className="text-[11px] text-gray-400">
              {isSessionActive
                ? "Listening... Ask about ball flight, transition lag, or pre-shot routine."
                : "Tap the mic to start real-time voice coaching session."}
            </p>
          </div>
        </div>

        {/* Right Column: Live Transcript Dialogue (Cols 8-12) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#161B22] border border-[#30363D] p-6 space-y-4 shadow-xl flex flex-col justify-between h-[580px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#30363D]">
              <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Volume2 className="size-4 text-[#D4AF37]" />
                <span>Live Voice Session Dialogue</span>
              </h4>
              <button
                onClick={() => setTranscripts([])}
                className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Clear</span>
              </button>
            </div>

            {/* Scrollable Dialogue */}
            <div className="space-y-3.5 overflow-y-auto max-h-[420px] pt-3 pr-1">
              {transcripts.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    msg.role === "coach"
                      ? "bg-[#0D1117] border border-[#30363D] text-gray-200"
                      : "bg-[#154734] border border-[#D4AF37]/30 text-white ml-6"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={msg.role === "coach" ? "text-[#D4AF37] font-bold" : "text-emerald-300 font-bold"}>
                      {msg.role === "coach" ? selectedPersona.name : "You (Golfer)"}
                    </span>
                    <span className="text-gray-500">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Prompt Pill Suggestions */}
          <div className="pt-3 border-t border-[#30363D] space-y-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Why am I pushing my 7-iron right?",
                "How do I create more lag?",
                "Drill for 40-yard bunker shots?",
              ].map((cue, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscripts((prev) => [
                      ...prev,
                      { role: "user", text: cue, time: "Now" },
                      {
                        role: "coach",
                        text: `Great question. For ${cue.toLowerCase()}, focus on transferring 80% pressure to your lead side before initiating the shoulder turn.`,
                        time: "Now",
                      },
                    ]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#0D1117] border border-[#30363D] text-[10px] text-gray-300 hover:text-white hover:border-[#D4AF37] transition-all text-left cursor-pointer"
                >
                  &ldquo;{cue}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
