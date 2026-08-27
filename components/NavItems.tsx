"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Compass, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Curriculum", href: "/courses" },
  { label: "AI Voice Coach", href: "/coach" },
  { label: "Pricing", href: "/pricing" },
  { label: "My Journey", href: "/my-journey" },
  { label: "Gallery", href: "/gallery" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            key={label}
            className={cn(
              "text-xs font-semibold uppercase tracking-wider transition-colors",
              isActive ? "text-[#D4AF37]" : "text-gray-300 hover:text-white"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
