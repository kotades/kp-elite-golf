import React from "react";
import { partnerClubs } from "@/constants";
import { Star, Award, TrendingDown, Users2, ShieldCheck } from "lucide-react";

export default function TrustMarquee() {
  const stats = [
    {
      icon: TrendingDown,
      value: "-4.8",
      label: "Average Handicap Drop",
      desc: "Within 8 Weeks of Foundation Program",
    },
    {
      icon: Users2,
      value: "10,000+",
      label: "Swings Analyzed",
      desc: "3D Biomechanical & Launch Monitor Data",
    },
    {
      icon: Award,
      value: "Top 50",
      label: "PGA Master Instructors",
      desc: "Recognized Nationwide by Golf Digest",
    },
    {
      icon: ShieldCheck,
      value: "99.2%",
      label: "Course-Ready Certification",
      desc: "Beginners step onto the 1st tee with confidence",
    },
  ];

  return (
    <section className="relative w-full bg-[#0D1117] py-14 border-y border-[#30363D]/60 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2B1F]/30 via-transparent to-[#154734]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Rating Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#30363D]/40">
          <div className="flex items-center gap-3">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-sm font-semibold text-white">
              4.98 / 5.0 Rating <span className="text-gray-400 font-normal">from 1,400+ Certified Graduates</span>
            </p>
          </div>

          <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Trusted by golfers at prestigious championship clubs worldwide
          </div>
        </div>

        {/* 4-Column Stat Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#161B22]/80 border border-[#30363D] flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {stat.value}
                </span>
                <div className="size-8 rounded-lg bg-[#154734]/40 border border-[#D4AF37]/30 flex items-center justify-center">
                  <stat.icon className="size-4 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-200">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-3 bg-[#11161D]">
        <div className="flex items-center gap-12 animate-marquee">
          {partnerClubs.concat(partnerClubs).map((club, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-[#D4AF37] transition-colors shrink-0"
            >
              <span className="size-2 rounded-full bg-[#D4AF37]" />
              <span className="font-semibold text-gray-300">{club.name}</span>
              <span className="text-xs text-gray-500">({club.location})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
