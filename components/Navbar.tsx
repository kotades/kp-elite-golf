"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import UserDropdown from "@/components/auth/UserDropdown";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-[#0D1117]/90 backdrop-blur-xl border-b border-[#30363D] py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 relative pointer-events-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-9 rounded-xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg">
            <Trophy className="size-4 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-bold text-white tracking-wide">
              KP ELITE GOLF
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#D4AF37]">
              Student Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <div className="hidden md:block">
            <NavItems />
          </div>

          {loading ? (
            <div className="size-9 rounded-full bg-[#161B22] animate-pulse" />
          ) : user ? (
            <UserDropdown />
          ) : (
            <Button
              onClick={() => setAuthModalOpen(true)}
              className="bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/40 text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer shadow-md"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </>
  );
};

export default Navbar;
