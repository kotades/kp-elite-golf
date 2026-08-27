"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Trophy,
  LayoutDashboard,
  BookOpen,
  Video,
  Mic,
  Search,
  Award,
  CreditCard,
  Menu,
  ShieldCheck,
  ChevronRight,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserDropdown from "@/components/auth/UserDropdown";
import { useAuth } from "@/hooks/useAuth";
import CommandMenu from "@/components/student/CommandMenu";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Video Theater", href: "/courses/full-swing-mechanics/chapters/m4-c1", icon: Video },
    { label: "Curriculum & Drills", href: "/courses", icon: BookOpen },
    { label: "AI Voice Coach", href: "/coach", icon: Mic, badge: "24/7" },
    { label: "Search & Explorer", href: "/search", icon: Search },
    { label: "My Journey", href: "/my-journey", icon: Award },
    { label: "Membership & Billing", href: "/subscription", icon: CreditCard },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between py-6 px-4 bg-[#0D1117] text-white">
      <div className="space-y-6">
        {/* Crest Logo */}
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Trophy className="size-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base font-bold text-white tracking-wide">
                KP ELITE
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-1 py-0.2 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                PGA
              </span>
            </div>
            <span className="text-[10px] text-gray-400 tracking-wider font-semibold">
              STUDENT LEARNING ZONE
            </span>
          </div>
        </Link>

        {/* Active Streak Card */}
        <div className="p-3.5 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
              <Flame className="size-4 text-orange-400 fill-orange-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{profile?.streakDays || 0}-Day Streak</p>
              <p className="text-[10px] text-gray-400">Consistency Goal</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#D4AF37]">🔥 100%</span>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#154734] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-[#161B22]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`size-4 ${isActive ? "text-[#D4AF37]" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Coach Contact card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/40 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
            Lead Coach Kevin
          </span>
          <ShieldCheck className="size-3.5 text-[#D4AF37]" />
        </div>
        <p className="text-xs text-gray-200">
          {profile ? "PGA Master 1-on-1 coaching active." : "Join KP Elite Academy for private coaching."}
        </p>
        <Link
          href="/coach"
          className="text-[11px] font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
        >
          <span>Launch AI Voice Coach</span>
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#090D12] text-white selection:bg-[#D4AF37] selection:text-[#0B2B1F]">
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 border-r border-[#30363D] bg-[#0D1117] z-40">
        <SidebarContent />
      </aside>

      {/* Main Content Area with Sticky Header */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-[#30363D] bg-[#0D1117]/85 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
          {/* Mobile Sheet Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-xl bg-[#161B22] border border-[#30363D] text-gray-300 hover:text-white cursor-pointer"
                  aria-label="Open Sidebar"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-[#0D1117] border-[#30363D]">
                <SheetHeader className="sr-only">
                  <SheetTitle>Student Navigation</SheetTitle>
                </SheetHeader>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <span className="font-serif font-bold text-sm text-white">KP ELITE</span>
          </div>

          {/* Global Search Command Menu */}
          <div className="flex items-center gap-4">
            <CommandMenu />
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/coach"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#154734]/80 border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] hover:bg-[#154734] transition-colors"
            >
              <Mic className="size-3.5 animate-pulse" />
              <span>AI Coach Live</span>
            </Link>

            <UserDropdown />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
