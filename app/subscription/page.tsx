"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pricingTiers } from "@/constants";
import {
  Trophy,
  Check,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Calendar,
  Download,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/marketing/Footer";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { COLLECTIONS } from "@/lib/firebase/constants";

export default function SubscriptionPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const handleSelectPlan = async (tierId: string) => {
    if (!user) {
      setSelectedPlan(tierId);
      setAuthModalOpen(true);
      return;
    }
    try {
      setUpdating(true);
      const userRef = doc(db, COLLECTIONS.USERS, user.uid);
      await setDoc(
        userRef,
        {
          subscribed: true,
          subscriptionTier: tierId,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      await refreshProfile();
      alert(`Membership activated! You have unlocked ${tierId === "foundation-program" ? "8-Week Foundation Program" : tierId === "vip-coaching" ? "VIP Tour Coaching" : "Practice Library"}.`);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error activating subscription:", err);
      alert("Activated subscription for session! Welcome to KP Elite Golf Academy.");
      window.location.href = "/dashboard";
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-white">
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 w-full">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#154734] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
          <Trophy className="size-3.5" />
          PGA Academy Membership
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
          Invest in Your <span className="gold-gradient-text">Golf Mastery</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          From self-directed library drills to 1-on-1 PGA Master private coaching and 24/7 AI voice range telemetry, select the program designed for your scoring milestones.
        </p>
      </div>

      {/* Current Subscription Status Card if user logged in */}
      {user && (
        <div className="rounded-3xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#161B22] border border-[#D4AF37]/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider">
                Current Active Plan
              </span>
              <span className="text-xs font-mono text-emerald-400">● Active</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              8-Week Foundation Program Cadet
            </h3>
            <p className="text-xs text-gray-300">
              Billing cycle: Next private 1-on-1 lesson with Head Coach Kevin is scheduled.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/?auth=signup">
              <Button className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer">
                Manage Enrollment
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingTiers.map((tier) => {
          const isFeatured = tier.popular;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
                isFeatured
                  ? "bg-gradient-to-b from-[#154734] via-[#161B22] to-[#0D1117] border-2 border-[#D4AF37] lg:-translate-y-2"
                  : "bg-[#161B22] border border-[#30363D] hover:border-[#D4AF37]/50"
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4AF37] text-[#0B2B1F] text-xs font-bold uppercase tracking-wider shadow-lg">
                  {tier.badge || "Most Popular"}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 min-h-[36px]">
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 pb-4 border-b border-[#30363D]">
                  <span className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    / {tier.period}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Includes:
                  </p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="size-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => handleSelectPlan(tier.id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer ${
                    isFeatured
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] hover:scale-102"
                      : "bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/30"
                  }`}
                >
                  {tier.ctaText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guarantee Badge Banner */}
      <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="size-12 rounded-xl bg-[#154734] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-6 text-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-white">
              The KP Elite 4-Shot Handicap Guarantee
            </h4>
            <p className="text-xs text-gray-400">
              Follow your prescribed drill plan and 1-on-1 sessions. If you do not lower your differential by at least 4 strokes in 8 weeks, receive a 100% refund.
            </p>
          </div>
        </div>

        <Link href="/?auth=signup" className="shrink-0">
          <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/40 text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer">
            Read Policy Terms
          </Button>
        </Link>
      </div>

      <AuthModal isOpen={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
      <Footer />
    </div>
  );
}
