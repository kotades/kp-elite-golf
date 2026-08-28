"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, LockKeyhole, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionRequiredModal from "./SubscriptionRequiredModal";

export default function SubscriptionBanner() {
  const { profile } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // If user is already subscribed, do not show the banner
  if (profile?.subscribed) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#161B22] border-b border-[#D4AF37]/50 text-white py-3 px-4 sm:px-6 relative z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <LockKeyhole className="size-4 text-[#D4AF37]" />
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider block sm:inline mr-2">
                Subscription Required:
              </span>
              <span className="text-gray-200">
                You are currently exploring as an unsubscribed cadet. Active membership is required to attend classes, stream drill videos, and use the 24/7 AI Voice Coach.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B2B1F] hover:brightness-110 font-bold text-xs px-4 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Activate Membership</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <SubscriptionRequiredModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        actionAttempted="attend classes and access full PGA coaching"
      />
    </>
  );
}
