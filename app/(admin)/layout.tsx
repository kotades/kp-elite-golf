"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Trophy,
  BarChart3,
  BookOpen,
  Users,
  Video,
  Settings,
  ShieldCheck,
  Menu,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserDropdown from "@/components/auth/UserDropdown";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNav = [
    { label: "Analytics & Revenue", href: "/admin/analytics", icon: BarChart3 },
    { label: "Course Manager", href: "/admin/courses", icon: BookOpen },
    { label: "Student Roster", href: "/admin/analytics#roster", icon: Users },
    { label: "AI Range Telemetry", href: "/coach", icon: Sparkles },
    { label: "Public Academy", href: "/", icon: ArrowUpRight },
  ];

  const AdminSidebar = () => (
    <div className="h-full flex flex-col justify-between py-6 px-4 bg-[#0B0F14] text-white">
      <div className="space-y-6">
        {/* Admin Brand Crest */}
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg">
            <Trophy className="size-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base font-bold text-white tracking-wide">
                KP ELITE
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-1 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                ADMIN
              </span>
            </div>
            <span className="text-[10px] text-gray-400 tracking-wider font-semibold">
              COMMAND CENTER
            </span>
          </div>
        </Link>

        {/* Quick KPI Snapshot Card */}
        <div className="p-3.5 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Monthly Run Rate</span>
            <span className="text-emerald-400 font-bold font-mono">+18.4%</span>
          </div>
          <p className="font-serif text-xl font-bold text-white">$72,400</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#D4AF37] h-full w-[82%]" />
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5 pt-2">
          {adminNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && !!pathname?.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#154734] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-[#161B22]"
                }`}
              >
                <item.icon className={`size-4 ${isActive ? "text-[#D4AF37]" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#161B22] border border-[#30363D] text-[11px] text-gray-400">
        <span className="text-white font-semibold block mb-0.5">Admin Security</span>
        <span>PGA Master Multi-Factor Active</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#070A0E] text-white selection:bg-[#D4AF37] selection:text-[#0B2B1F]">
      {/* Desktop Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 border-r border-[#30363D] bg-[#0B0F14] z-40">
        <AdminSidebar />
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-[#30363D] bg-[#0B0F14]/90 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-xl bg-[#161B22] border border-[#30363D] text-gray-300 cursor-pointer"
                  aria-label="Open Admin Menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-[#0B0F14] border-[#30363D]">
                <SheetHeader className="sr-only">
                  <SheetTitle>Admin Navigation</SheetTitle>
                </SheetHeader>
                <AdminSidebar />
              </SheetContent>
            </Sheet>

            <span className="font-serif font-bold text-sm text-white">KP ADMIN</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Academy Production Cluster • v2.4.0</span>
          </div>

          <div className="flex items-center gap-4">
            <UserDropdown />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
