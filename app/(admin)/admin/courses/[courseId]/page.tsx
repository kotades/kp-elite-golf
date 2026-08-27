"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { golfModules, coaches } from "@/constants";
import {
  BookOpen,
  Plus,
  Trash2,
  Save,
  Video,
  Upload,
  FileText,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseBuilderPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function CourseBuilderPage({ params }: CourseBuilderPageProps) {
  const resolvedParams = use(params);
  const { courseId } = resolvedParams;

  const currentCourse =
    golfModules.find((m) => m.slug === courseId || m.id === courseId) ||
    golfModules[3];

  const [courseTitle, setCourseTitle] = useState(currentCourse.title);
  const [courseCategory, setCourseCategory] = useState(currentCourse.category);
  const [coursePrice, setCoursePrice] = useState(currentCourse.price);
  const [courseLevel, setCourseLevel] = useState(currentCourse.level);
  const [chapters, setChapters] = useState(currentCourse.chapters);
  const [saved, setSaved] = useState(false);

  const addChapter = () => {
    const newChapter = {
      id: `new-ch-${Date.now()}`,
      title: "New Custom Chapter",
      description: "Enter chapter description...",
      lessons: [
        {
          id: `new-l-${Date.now()}`,
          title: "New Lesson 1",
          duration: "15m",
          description: "Lesson details and drills",
          drillsCount: 2,
          isPreview: false,
        },
      ],
    };
    setChapters([...chapters, newChapter]);
  };

  const addLesson = (chapterIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lessons.push({
      id: `new-l-${Date.now()}`,
      title: "New Video Lesson",
      duration: "12m",
      description: "Drill description...",
      drillsCount: 1,
      isPreview: false,
    });
    setChapters(updated);
  };

  const removeLesson = (chapterIndex: number, lessonIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lessons.splice(lessonIndex, 1);
    setChapters(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#30363D]">
        <div className="space-y-1">
          <Link
            href="/admin/courses"
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 mb-1"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Course Directory</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Curriculum Builder & Editor
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle className="size-4" />
              Changes Published Live!
            </span>
          )}
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="size-4" />
            <span>Save & Publish Changes</span>
          </Button>
        </div>
      </div>

      {/* Module Meta Information Card */}
      <div className="p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-6 shadow-xl">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="size-4 text-[#D4AF37]" />
          <span>Module Metadata & Pricing</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Module Title
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              value={courseCategory}
              onChange={(e) => setCourseCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Target Level
            </label>
            <input
              type="text"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Standalone Price ($ USD)
            </label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* Chapter & Lesson Curriculum Tree */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Chapters & Video Lessons
            </h3>
            <p className="text-xs text-gray-400">
              Bind high-speed 240 fps videos, configure slow-mo checkpoints, and attach range drill PDFs.
            </p>
          </div>

          <Button
            type="button"
            onClick={addChapter}
            className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="size-4 text-[#D4AF37]" />
            <span>Add New Chapter</span>
          </Button>
        </div>

        <div className="space-y-6">
          {chapters.map((chapter, cIdx) => (
            <div
              key={chapter.id}
              className="p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4 shadow-xl"
            >
              {/* Chapter Header Input */}
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#30363D]">
                <div className="flex items-center gap-3 w-full max-w-xl">
                  <span className="size-7 rounded-lg bg-[#0B2B1F] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    Ch {cIdx + 1}
                  </span>
                  <input
                    type="text"
                    defaultValue={chapter.title}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => addLesson(cIdx)}
                  className="bg-[#0D1117] hover:bg-slate-800 border border-[#30363D] text-gray-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <Plus className="size-3 text-[#D4AF37]" />
                  <span>Add Lesson</span>
                </Button>
              </div>

              {/* Lessons in Chapter */}
              <div className="space-y-3 pt-2">
                {chapter.lessons.map((lesson, lIdx) => (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-2xl bg-[#0D1117] border border-[#30363D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 w-full max-w-md">
                      <GripVertical className="size-4 text-gray-600 shrink-0 cursor-move" />
                      <Video className="size-4 text-[#D4AF37] shrink-0" />
                      <input
                        type="text"
                        defaultValue={lesson.title}
                        className="w-full px-2.5 py-1 rounded-lg bg-[#161B22] border border-[#30363D] text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-mono">Duration:</span>
                        <input
                          type="text"
                          defaultValue={lesson.duration}
                          className="w-16 px-2 py-1 rounded-lg bg-[#161B22] border border-[#30363D] text-xs text-white text-center font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-mono">Drills:</span>
                        <input
                          type="number"
                          defaultValue={lesson.drillsCount}
                          className="w-12 px-2 py-1 rounded-lg bg-[#161B22] border border-[#30363D] text-xs text-white text-center font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeLesson(cIdx, lIdx)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Lesson"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
