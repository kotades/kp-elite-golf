import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { golfModules, coaches } from "@/constants";
import {
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle,
  Star,
  ShieldCheck,
  Play,
  FileText,
  Video,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params;

  const currentCourse =
    golfModules.find((m) => m.slug === courseId || m.id === courseId) ||
    golfModules[0];

  if (!currentCourse) {
    notFound();
  }

  return (
    <div className="py-12 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-white">Curriculum</Link>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">{currentCourse.title}</span>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Details (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#154734] text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                Module 0{currentCourse.moduleNumber} • {currentCourse.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-[#30363D] text-xs font-medium text-gray-300">
                {currentCourse.level}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37]">
                <Star className="size-3.5 fill-[#D4AF37]" />
                <span className="font-bold">{currentCourse.rating}</span>
                <span className="text-gray-400 font-normal">({currentCourse.studentCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              {currentCourse.title}
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {currentCourse.description}
            </p>

            {/* Key Outcomes Box */}
            <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Sparkles className="size-4" />
                What You Will Master in This Module
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentCourse.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <CheckCircle className="size-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus Accordion */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Module Syllabus & Video Lessons
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  {currentCourse.chapters.length} Chapters • {currentCourse.lessonsCount} Lessons
                </span>
              </div>

              <Accordion type="single" collapsible defaultValue="chapter-0" className="space-y-3">
                {currentCourse.chapters.map((chapter, cIdx) => (
                  <AccordionItem
                    key={chapter.id}
                    value={`chapter-${cIdx}`}
                    className="rounded-2xl bg-[#161B22] border border-[#30363D] px-6 py-2"
                  >
                    <AccordionTrigger className="text-sm font-bold text-white hover:text-[#D4AF37] hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="size-6 rounded-full bg-[#154734] text-[#D4AF37] text-xs flex items-center justify-center font-mono">
                          {cIdx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{chapter.title}</p>
                          <p className="text-[11px] text-gray-400 font-normal">{chapter.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-3 pb-2 space-y-2 border-t border-[#30363D]/60 mt-2">
                      {chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D1117] border border-[#30363D]/50 text-xs hover:border-[#D4AF37]/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Video className="size-4 text-[#D4AF37] shrink-0" />
                            <div>
                              <span className="font-medium text-gray-200">{lesson.title}</span>
                              <p className="text-[10px] text-gray-500">{lesson.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {lesson.isPreview && (
                              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                                Free Preview
                              </span>
                            )}
                            <span className="font-mono text-gray-400 text-[11px]">{lesson.duration}</span>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Instructor Bio Box */}
            <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative size-24 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shrink-0">
                <Image
                  src={currentCourse.instructor.image}
                  alt={currentCourse.instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h4 className="font-serif text-lg font-bold text-white">
                    {currentCourse.instructor.name}
                  </h4>
                  <span className="text-xs font-semibold text-[#D4AF37]">
                    • {currentCourse.instructor.title}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentCourse.instructor.bio}
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  {currentCourse.instructor.tourExperience}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Enrollment Card (Col 3) */}
          <div className="lg:sticky lg:top-24 rounded-3xl bg-[#161B22] border-2 border-[#D4AF37]/50 p-6 space-y-6 shadow-2xl">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#30363D]">
              <Image
                src={currentCourse.image}
                alt={currentCourse.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="size-12 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Play className="size-5 text-[#0B2B1F] fill-[#0B2B1F] ml-0.5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-3xl font-bold text-white">
                  ${currentCourse.price}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Lifetime Module Access
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Or included in the 8-Week Foundation ($7,200) & Practice Library ($49/mo).
              </p>
            </div>

            <div className="space-y-2.5">
              <Link href="/?auth=signup">
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-sm py-3.5 rounded-xl shadow-lg hover:scale-102 transition-all cursor-pointer">
                  Apply for Foundation Program
                </Button>
              </Link>
              <Link href="/sign-in?plan=practice-library">
                <Button className="w-full bg-[#1F242C] hover:bg-[#2A313C] text-white border border-[#30363D] text-xs font-semibold py-3 rounded-xl">
                  Start $49/mo Free Trial
                </Button>
              </Link>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#30363D] text-xs text-gray-300">
              <p className="font-bold text-white text-xs uppercase tracking-wider">Module Includes:</p>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle className="size-3.5 text-[#D4AF37]" />
                <span>{currentCourse.lessonsCount} HD video lessons & step-by-step drills</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle className="size-3.5 text-[#D4AF37]" />
                <span>24/7 AI Voice Coach practice simulation</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle className="size-3.5 text-[#D4AF37]" />
                <span>Downloadable drill templates & yardage charts</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle className="size-3.5 text-[#D4AF37]" />
                <span>Official Course Completion Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
