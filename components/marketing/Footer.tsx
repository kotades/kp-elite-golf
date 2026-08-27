import React from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { academyInfo, golfModules } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-[#090D12] text-gray-300 border-t border-[#30363D]/70 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top accreditation banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#30363D]/60">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#154734]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Trophy className="size-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">PGA Master Instructor</p>
              <p className="text-xs text-gray-400">Top 50 Teacher in America</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#154734]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Award className="size-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">TPI Level 3 Certified</p>
              <p className="text-xs text-gray-400">Golf Biomechanics Lab</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#154734]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">TrackMan Master</p>
              <p className="text-xs text-gray-400">Dual Radar 3D Analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#154734]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Handicap Guarantee</p>
              <p className="text-xs text-gray-400">Measurable score drop</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg">
                <Trophy className="size-5 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white">
                  KP ELITE GOLF
                </span>
                <span className="text-[11px] text-[#D4AF37] tracking-widest uppercase font-semibold">
                  Championship Training Academy
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              The premier hybrid golf coaching system integrating PGA master biomechanics, high-frame 3D swing tracking, and continuous 24/7 AI voice instruction.
            </p>
            <div className="space-y-2 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-[#D4AF37]" />
                <span>Augusta National Corridor & Pebble Beach Facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-[#D4AF37]" />
                <span>{academyInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-[#D4AF37]" />
                <span>{academyInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Curriculum & Modules
            </h4>
            <ul className="space-y-2 text-sm">
              {golfModules.slice(0, 5).map((mod) => (
                <li key={mod.id}>
                  <Link
                    href={`/courses/${mod.slug}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{mod.title}</span>
                    <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/courses"
                  className="text-[#D4AF37] hover:underline font-medium text-xs pt-1 inline-block"
                >
                  View All 9 Modules →
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy & Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Academy Programs
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses/apply" className="text-gray-400 hover:text-white">
                  8-Week Foundation ($7,200)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white">
                  VIP Tour Coaching ($890/mo)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white">
                  Practice Video Library ($49/mo)
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="text-gray-400 hover:text-white">
                  Faculty & Mentors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Biomechanics Lab & Tech
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white">
                  Academy Visual Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Portal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Student Portal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/my-journey" className="text-gray-400 hover:text-white">
                  My Journey & Milestones
                </Link>
              </li>
              <li>
                <Link href="/coach" className="text-gray-400 hover:text-white">
                  AI Voice Practice Sessions
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Curriculum & Drill Search
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-gray-400 hover:text-white">
                  Membership Billing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Concierge & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-[#30363D]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} KP Elite Golf Training Academy LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <span className="text-gray-700">•</span>
            <Link href="/privacy" className="hover:text-gray-400">Privacy Notice</Link>
            <span className="text-gray-700">•</span>
            <Link href="/about" className="hover:text-gray-400">About Academy</Link>
            <span className="text-gray-700">•</span>
            <Link href="/contact" className="hover:text-gray-400">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
