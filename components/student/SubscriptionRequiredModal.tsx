"use client";

import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/constants";
import {
  LockKeyhole,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Trophy,
  CheckCircle2,
} from "lucide-react";

interface SubscriptionRequiredModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionAttempted?: string;
}

export default function SubscriptionRequiredModal({
  isOpen,
  onOpenChange,
  actionAttempted = "attend this class session",
}: SubscriptionRequiredModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0D1117] border border-[#D4AF37]/40 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.2)] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center sm:text-center space-y-3">
          {/* Badge & Lock Icon */}
          <div className="mx-auto size-14 rounded-2xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/60 flex items-center justify-center shadow-lg relative">
            <LockKeyhole className="size-7 text-[#D4AF37]" />
            <div className="absolute -top-1 -right-1 size-3 bg-amber-400 rounded-full animate-ping" />
          </div>

          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#154734]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mx-auto">
            <Trophy className="size-3.5" />
            Academy Membership Required
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Unlock Full <span className="gold-gradient-text">Coaching Access</span>
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto">
            To <span className="text-[#D4AF37] font-semibold">{actionAttempted}</span>, an active PGA Academy subscription is required. Unsubscribed cadets can browse course outlines and search drills, but class participation, video streaming, and AI telemetry require an active plan.
          </DialogDescription>
        </DialogHeader>

        {/* 3 Tier Quick Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between text-left transition-all ${
                tier.popular
                  ? "bg-[#161B22] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                  : "bg-[#161B22]/70 border-[#30363D]"
              }`}
            >
              <div>
                {tier.badge && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {tier.badge.split("/")[0]}
                  </span>
                )}
                <h4 className="font-serif text-sm font-bold text-white">
                  {tier.name}
                </h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-serif text-xl font-bold text-[#D4AF37]">
                    {tier.price}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    /{tier.period === "one-time enrollment" ? "total" : "mo"}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#30363D]/60 space-y-1 text-[11px] text-gray-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{tier.features[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-[#30363D]/60">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto border-[#30363D] text-gray-300 hover:text-white hover:bg-[#161B22] rounded-xl text-xs py-2.5 cursor-pointer"
          >
            Continue Browsing
          </Button>

          <Link href="/subscription" className="w-full sm:w-auto">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B2B1F] font-bold hover:brightness-110 rounded-xl text-xs py-2.5 px-6 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>View Plans & Subscribe</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
