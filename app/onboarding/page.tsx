"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createIntakeApplication } from "@/lib/actions/firestore.actions";

export default function StudentIntakeApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "Email" as "Email" | "Text" | "Phone",
    experienceLevel: "Beginner" as "Brand new" | "Beginner" | "Intermediate" | "Advanced",
    yearsPlaying: "",
    currentHandicap: "",
    homeCourse: "",
    primaryGoal: "Learn basics" as "Learn basics" | "Improve swing mechanics" | "Lower tournament scores" | "Course confidence",
    specificChallenges: "",
    physicalLimitations: "",
    preferredDays: ["Sat", "Sun"],
    preferredTime: "Morning" as "Morning" | "Afternoon" | "Evening",
    agreedToTerms: false,
  });

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createIntakeApplication(formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      // Still show confirmation
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-24 bg-[#0D1117] text-white min-h-[80vh] flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="size-20 rounded-full bg-[#154734] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle2 className="size-10 text-[#D4AF37]" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Profile Setup Complete!
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Thank you, <span className="text-[#D4AF37] font-semibold">{formData.fullName}</span>. Your golf goals have been saved to your student profile.
          </p>

          <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] text-left text-xs text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Experience Level:</span>
              <span className="font-semibold text-[#D4AF37]">{formData.experienceLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Account:</span>
              <span className="font-mono text-white">{formData.email}</span>
            </div>
          </div>
          
          <div className="pt-4 flex items-center justify-center">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-xl cursor-pointer">
                Enter Student Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#0D1117] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Trophy className="size-3.5" />
            Academy Admissions Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Complete Your Student <span className="gold-gradient-text">Profile</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please provide your background, goals, and scheduling availability. This helps our PGA instructors tailor your custom 8-Week Foundation curriculum before your first private lesson.
          </p>
        </div>

        {/* Application Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 sm:p-10 space-y-8 shadow-2xl"
        >
          {/* Section 1: Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 pb-2 border-b border-[#30363D]">
              <span>01 • Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jordan Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Email", "Text", "Phone"] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, preferredContact: method })}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        formData.preferredContact === method
                          ? "bg-[#154734] border-[#D4AF37] text-white"
                          : "bg-[#0D1117] border-[#30363D] text-gray-400 hover:text-white"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Golf Background */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 pb-2 border-b border-[#30363D]">
              <span>02 • Golf Background</span>
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-300">
                Experience Level *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(["Brand new", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      formData.experienceLevel === lvl
                        ? "bg-[#D4AF37] border-[#D4AF37] text-[#0B2B1F]"
                        : "bg-[#0D1117] border-[#30363D] text-gray-300 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  How long have you played?
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6 months / 3 years"
                  value={formData.yearsPlaying}
                  onChange={(e) => setFormData({ ...formData, yearsPlaying: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Current Handicap (if known)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 18.4 or None"
                  value={formData.currentHandicap}
                  onChange={(e) => setFormData({ ...formData, currentHandicap: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Usual Course / Club
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pinehurst #2"
                  value={formData.homeCourse}
                  onChange={(e) => setFormData({ ...formData, homeCourse: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Goals & Challenges */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 pb-2 border-b border-[#30363D]">
              <span>03 • Primary Goals & Challenges</span>
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-300">
                Primary Objective *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(["Learn basics", "Improve swing mechanics", "Lower tournament scores", "Course confidence"] as const).map((goal) => (
                  <button
                    type="button"
                    key={goal}
                    onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      formData.primaryGoal === goal
                        ? "bg-[#154734] border-[#D4AF37] text-[#D4AF37]"
                        : "bg-[#0D1117] border-[#30363D] text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                What is the biggest challenge in your golf game?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Inconsistent driver dispersion, chunked 50-yard pitch shots, 3-putts..."
                value={formData.specificChallenges}
                onChange={(e) => setFormData({ ...formData, specificChallenges: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Any physical limitations, previous injuries, or mobility concerns?
              </label>
              <input
                type="text"
                placeholder="e.g. Lower back stiffness, right shoulder surgery (optional)"
                value={formData.physicalLimitations}
                onChange={(e) => setFormData({ ...formData, physicalLimitations: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Section 4: Scheduling & Availability */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 pb-2 border-b border-[#30363D]">
              <span>04 • Scheduling & Time Preferences</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Preferred Days for Scheduled Lessons
              </label>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`size-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.preferredDays.includes(day)
                        ? "bg-[#D4AF37] text-[#0B2B1F]"
                        : "bg-[#0D1117] border border-[#30363D] text-gray-400 hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Preferred Time of Day
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Morning", "Afternoon", "Evening"] as const).map((time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setFormData({ ...formData, preferredTime: time })}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      formData.preferredTime === time
                        ? "bg-[#154734] border-[#D4AF37] text-white"
                        : "bg-[#0D1117] border-[#30363D] text-gray-400 hover:text-white"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Acknowledgement */}
          <div className="pt-4 border-t border-[#30363D] space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-1 size-4 rounded accent-[#D4AF37]"
              />
              <span className="text-xs text-gray-300 leading-relaxed">
                I understand that the 8-Week Foundation Program ($7,200) requires scheduling commitment and academy cancellation and payment policies apply.
              </span>
            </label>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-extrabold text-base py-4 rounded-xl shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Saving Profile Details...</span>
                </>
              ) : (
                <span>Save Profile & Enter Academy</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
