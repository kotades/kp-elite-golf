"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Trophy,
  Menu,
  X,
  Compass,
  GraduationCap,
  Sparkles,
  Users,
  Image as ImageIcon,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import UserDropdown from "@/components/auth/UserDropdown";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Streamlined 4-link architecture based on Ponytail (YAGNI / Deletion) & UI/UX Pro Max
  const navLinks = [
    { label: "Curriculum", href: "/courses", icon: GraduationCap },
    { label: "Coaches", href: "/coaches", icon: Users },
    { label: "Pricing", href: "/pricing", icon: ShieldCheck },
    { label: "About & Tech", href: "/about", icon: Sparkles },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 relative pointer-events-auto w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#0D1117]/90 backdrop-blur-xl border-b border-[#30363D]/80 shadow-2xl py-3.5"
            : "bg-[#0D1117]/70 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Crest */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative size-10 rounded-xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all">
              <Trophy className="size-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 size-2 rounded-full bg-[#D4AF37] animate-ping" />
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

          {/* Desktop Navigation - Clean 4 Focal Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-all duration-200 hover:text-[#D4AF37] flex items-center gap-1.5 ${
                    isActive ? "text-[#D4AF37] font-semibold" : "text-gray-300"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            {loading ? (
              <div className="size-8 rounded-full bg-[#161B22] animate-pulse" />
            ) : user ? (
              <UserDropdown />
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors cursor-pointer"
              >
                Student Sign In
              </button>
            )}

            <Link href="/courses/apply">
              <Button className="relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all cursor-pointer">
                <span className="relative z-10 flex items-center gap-1.5">
                  Apply for Academy
                  <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {!loading && user && <UserDropdown />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#30363D] bg-[#0D1117]/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-base text-gray-200 hover:text-[#D4AF37]"
                >
                  <link.icon className="size-5 text-[#D4AF37]" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#30363D] flex flex-col gap-3">
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="text-center py-2.5 text-sm font-medium text-gray-300 border border-[#30363D] rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Student Portal Sign In
                </button>
              )}
              <Link
                href="/courses/apply"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold rounded-xl py-3 cursor-pointer">
                  Apply for Foundation Program
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </>
  );
}
