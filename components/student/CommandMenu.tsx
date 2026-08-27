"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { golfModules, coaches } from "@/constants";
import {
  Search,
  BookOpen,
  Users,
  Mic,
  Video,
  Layers,
  Compass,
  Trophy,
} from "lucide-react";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#D4AF37]/50 text-gray-400 hover:text-white text-xs transition-all w-auto max-w-[140px] sm:max-w-none sm:w-64 justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Search className="size-3.5 text-[#D4AF37] shrink-0" />
          <span className="hidden sm:inline">Quick search...</span>
          <span className="inline sm:hidden font-medium">Search</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#0D1117] border border-[#30363D] text-[10px] font-mono text-gray-400">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, drills, biomechanics, coaches..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Curriculum & Modules">
            {golfModules.map((mod) => (
              <CommandItem
                key={mod.id}
                onSelect={() => handleSelect(`/courses/${mod.slug}`)}
              >
                <BookOpen className="size-4 text-[#D4AF37]" />
                <span className="font-medium">Module 0{mod.moduleNumber}: {mod.title}</span>
                <CommandShortcut>{mod.level}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Learning Zone Quick Links">
            <CommandItem onSelect={() => handleSelect("/dashboard")}>
              <Layers className="size-4 text-emerald-400" />
              <span>Student Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/coach")}>
              <Mic className="size-4 text-[#D4AF37]" />
              <span>24/7 AI Voice Coach Studio</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/search")}>
              <Compass className="size-4 text-sky-400" />
              <span>Drill & Technique Explorer</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/courses/full-swing-mechanics/chapters/m4-c1")}>
              <Video className="size-4 text-[#D4AF37]" />
              <span>Full Swing Video Theater (0.25x Slow-Mo)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="PGA Coaches">
            {coaches.map((coach) => (
              <CommandItem
                key={coach.id}
                onSelect={() => handleSelect(`/#coaches`)}
              >
                <Users className="size-4 text-gray-400" />
                <span>{coach.name} ({coach.title})</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
