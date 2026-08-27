"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  User as UserIcon,
  LayoutDashboard,
  Award,
  Video,
  Mic,
  CreditCard,
  LogOut,
  Sparkles,
  Shield,
  ChevronDown,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const { user, profile, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const displayName = profile?.displayName || user.displayName || user.email?.split("@")[0] || "Tour Golfer";
  const customPhoto = profile?.photoURL || user.photoURL;
  const handicap = profile?.handicap ?? 0;

  const handleSignOut = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.href = "/";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2.5 p-1 pr-2.5 rounded-full bg-[#161B22] border border-[#30363D] hover:border-[#D4AF37]/60 transition-all outline-none group cursor-pointer"
          aria-label="User profile menu"
        >
          <div className="relative size-8 rounded-full overflow-hidden border border-[#D4AF37]/70 shrink-0 bg-gradient-to-br from-[#154734] to-[#0B2B1F] flex items-center justify-center">
            {customPhoto ? (
              <Image
                src={customPhoto}
                alt={displayName}
                fill
                className="object-cover"
              />
            ) : (
              <UserIcon className="size-4 text-[#D4AF37]" />
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-white max-w-[100px] truncate leading-tight">
              {displayName}
            </span>
            <span className="text-[9px] font-mono text-[#D4AF37] font-semibold leading-tight">
              HC {handicap}
            </span>
          </div>

          <ChevronDown className="size-3 text-gray-400 group-hover:text-white transition-colors" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-[#161B22] border border-[#30363D] text-white p-2 rounded-2xl shadow-2xl" align="end">
        <DropdownMenuLabel className="p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">{displayName}</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#154734] text-[#D4AF37] border border-[#D4AF37]/40">
                HC {handicap}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono truncate">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#30363D]" />

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2.5 py-2">
            <LayoutDashboard className="size-4 text-[#D4AF37]" />
            <span>Student Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/my-journey" className="flex items-center gap-2.5 py-2">
            <Award className="size-4 text-[#D4AF37]" />
            <span>My Journey & Stats</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/courses/full-swing-mechanics/chapters/m4-c1" className="flex items-center gap-2.5 py-2">
            <Video className="size-4 text-emerald-400" />
            <span>Video Theater</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/coach" className="flex items-center gap-2.5 py-2">
            <Mic className="size-4 text-emerald-400" />
            <span>AI Voice Range Coach</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/subscription" className="flex items-center gap-2.5 py-2">
            <CreditCard className="size-4 text-gray-400" />
            <span>Membership & Billing</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#30363D]" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2.5 py-2 text-red-400 focus:bg-red-950/60 focus:text-red-300"
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
