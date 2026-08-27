"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { academyInfo } from "@/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    handicap: "",
    programOfInterest: "foundation",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-24 bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#154734] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Trophy className="size-3.5" />
            Admissions & Concierge
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Connect With Our <br />
            <span className="gold-gradient-text">Coaching Admissions Team</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Have questions about program placement, customized fittings, or in-person biomechanics evaluations? Our admissions team is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information & Facilities Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-8 space-y-6 shadow-xl">
              <h2 className="font-serif text-2xl font-bold text-white">
                Performance Centers
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                KP Elite operates two premier biomechanics laboratories and custom fitting centers equipped with TrackMan 4 and Gears 3D motion capture.
              </p>

              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#154734]/40 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Augusta National Corridor HQ</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      1200 Championship Way, Suite 400<br />
                      Augusta, GA 30904
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#154734]/40 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Pebble Beach Studio</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      17-Mile Performance Center<br />
                      Pebble Beach, CA 93953
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#154734]/40 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Admissions Concierge Email</h3>
                    <p className="text-xs text-[#D4AF37] mt-0.5">{academyInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#154734]/40 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Direct Line</h3>
                    <p className="text-xs text-[#D4AF37] mt-0.5">{academyInfo.phone}</p>
                    <p className="text-[10px] text-gray-500">Mon-Sat: 7:00 AM - 7:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking Callout */}
            <div className="rounded-3xl bg-gradient-to-r from-[#154734] via-[#0B2B1F] to-[#154734] border border-[#D4AF37]/50 p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Calendar className="size-5" />
                <h4 className="font-serif font-bold text-base text-white">Ready to Apply Immediately?</h4>
              </div>
              <p className="text-xs text-gray-300">
                Skip the inquiry line and complete our official 8-Week Foundation Program intake application.
              </p>
              <Link href="/courses/apply">
                <Button className="w-full mt-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B2B1F] font-bold text-xs py-3 rounded-xl">
                  Go to Intake Portal →
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-8 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="size-16 rounded-full bg-[#154734] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting KP Elite Golf Training. Our Head Admissions Director will review your handicap goals and respond within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-4 border-[#30363D] hover:border-[#D4AF37] text-white text-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">Send An Inquiry</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill out the form below and an academy concierge will contact you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jordan Miller"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jordan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Current Handicap Index</label>
                      <input
                        type="text"
                        placeholder="e.g. 14.2, Scratch, or Beginner"
                        value={formData.handicap}
                        onChange={(e) => setFormData({ ...formData, handicap: e.target.value })}
                        className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Program of Interest</label>
                    <select
                      value={formData.programOfInterest}
                      onChange={(e) => setFormData({ ...formData, programOfInterest: e.target.value })}
                      className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="foundation">8-Week Foundation Program ($7,200)</option>
                      <option value="vip">VIP Tour Coaching ($890/mo)</option>
                      <option value="library">Practice Video Library ($49/mo)</option>
                      <option value="biomechanics">In-Person Biomechanics Lab Assessment</option>
                      <option value="corporate">Corporate / Team Coaching</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Message / Current Swing Struggles</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your current miss, swing goals, or any upcoming tournament dates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 bg-[#154734] hover:bg-[#1E5D46] text-white border border-[#D4AF37]/50 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Send className="size-4 text-[#D4AF37]" />
                    <span>Submit Concierge Inquiry</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
