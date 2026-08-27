"use client";

import React, { useState } from "react";
import Link from "next/link";
import { golfModules } from "@/constants";
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Star,
  Users,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCourseManagerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modulesState, setModulesState] = useState(
    golfModules.map((m) => ({ ...m, isPublished: true }))
  );

  const togglePublish = (id: string) => {
    setModulesState((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPublished: !m.isPublished } : m))
    );
  };

  const filtered = modulesState.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#30363D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <BookOpen className="size-4" />
            <span>Curriculum Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Academy Course & Module Directory
          </h1>
          <p className="text-xs text-gray-400">
            Publish, edit chapters, update drill attachments, and monitor student enrollment rates across all 9 modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/courses/module-4">
            <Button className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer">
              <Plus className="size-4" />
              <span>Create New Module</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search module title or lead instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="text-xs font-mono text-gray-400">
          Showing {filtered.length} of 9 Modules
        </div>
      </div>

      {/* Modules Table */}
      <div className="rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#0D1117] text-[#D4AF37] uppercase font-mono text-[10px] tracking-wider border-b border-[#30363D]">
              <tr>
                <th className="p-4">Module</th>
                <th className="p-4">Category & Level</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Lessons & Drills</th>
                <th className="p-4">Enrollment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363D]/60">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-[#1C222B]/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="size-7 rounded-lg bg-[#0B2B1F] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-xs">
                        0{m.moduleNumber}
                      </span>
                      <div>
                        <p className="font-bold text-white text-xs">{m.title}</p>
                        <p className="text-[10px] text-gray-400 font-mono">${m.price} standalone</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-gray-300 text-[10px]">
                      {m.category}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">{m.level}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-white">{m.instructor.name}</span>
                    <span className="block text-[10px] text-gray-400 truncate max-w-[140px]">{m.instructor.title}</span>
                  </td>

                  <td className="p-4 font-mono">
                    <span>{m.lessonsCount} Lessons</span>
                    <span className="block text-[10px] text-emerald-400">{m.drillsCount} Drills</span>
                  </td>

                  <td className="p-4 font-mono text-white">
                    <span>{m.studentCount.toLocaleString()} golfers</span>
                    <div className="flex items-center gap-1 text-[10px] text-[#D4AF37]">
                      <Star className="size-3 fill-[#D4AF37]" />
                      <span>{m.rating}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(m.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        m.isPublished
                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-950/80 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {m.isPublished ? "● Live / Published" : "○ Draft Mode"}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/courses/${m.slug}`} target="_blank">
                        <Button className="p-2 bg-[#0D1117] hover:bg-slate-800 border border-[#30363D] rounded-lg text-gray-400 hover:text-white" title="Preview Public Page">
                          <Eye className="size-3.5" />
                        </Button>
                      </Link>
                      <Link href={`/admin/courses/${m.slug}`}>
                        <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                          <Edit className="size-3" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
