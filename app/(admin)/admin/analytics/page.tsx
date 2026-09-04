"use client";

import React from "react";
import RevenueAreaChart from "@/components/admin/RevenueAreaChart";
import { pricingTiers } from "@/constants";
import {
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Video,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAnalyticsPage() {
  const kpis = [
    {
      title: "Monthly Recurring Run Rate",
      value: "$72,400",
      change: "+18.4% vs last month",
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      title: "Active Foundation Students",
      value: "42 Golfers",
      change: "+6 new enrollments ($7.2k)",
      icon: Users,
      color: "text-[#D4AF37]",
    },
    {
      title: "AI Voice Range Hours",
      value: "1,840 hrs",
      change: "+34% practice engagement",
      icon: Sparkles,
      color: "text-sky-400",
    },
    {
      title: "Handicap Reduction Rate",
      value: "98.7%",
      change: "-4.8 avg stroke drop",
      icon: Award,
      color: "text-purple-400",
    },
  ];

  const recentIntakes = [
    {
      name: "Cameron Smith",
      program: `8-Week Foundation (${pricingTiers[1].price}/mo)`,
      handicap: "14.2",
      coach: "Kevin Palmer",
      status: "Payment Confirmed",
      date: "2 hours ago",
    },
    {
      name: "Sarah Jenkins",
      program: `Practice Library (${pricingTiers[0].price}/mo)`,
      handicap: "22.0",
      coach: "Karol Priscila",
      status: "Active Member",
      date: "5 hours ago",
    },
    {
      name: "Robert Torres",
      program: `VIP Coaching (${pricingTiers[2].price}/mo)`,
      handicap: "4.1",
      coach: "David Vance",
      status: "Active Member",
      date: "Yesterday",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#30363D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <TrendingUp className="size-4" />
            <span>Academy Financials & Telemetry</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Performance & Analytics Hub
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button className="bg-[#154734] hover:bg-[#1E5D46] text-white text-xs font-semibold px-4 py-2 rounded-xl">
            Export Financial Report
          </Button>
        </div>
      </div>

      {/* 4-KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{kpi.title}</span>
              <div className="size-8 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center">
                <kpi.icon className={`size-4 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {kpi.value}
              </p>
              <p className="text-[11px] text-emerald-400 mt-0.5">{kpi.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Area Chart Card */}
      <div className="p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Revenue Growth Trajectory
            </h3>
            <p className="text-xs text-gray-400">
              Monthly revenue breakdown across Foundation, VIP, and Practice Library subscriptions.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
            <span className="size-2 rounded-full bg-[#D4AF37]" />
            <span>2026 Target: $100k/mo</span>
          </div>
        </div>

        <RevenueAreaChart />
      </div>

      {/* 2-Column: Completion Funnel & Recent Enrollments */}
      <div id="roster" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completion Funnel */}
        <div className="p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">
            Student Milestone Progression Funnel
          </h3>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">01. Foundation (Grip & Setup)</span>
                <span className="font-mono text-[#D4AF37] font-bold">100% (1,420 Golfers)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#D4AF37] h-full w-[100%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">02. Consistency (Transition & Wedges)</span>
                <span className="font-mono text-emerald-400 font-bold">84% (1,192 Golfers)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[84%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">03. On-Course Ready (DECADE & Bunker)</span>
                <span className="font-mono text-sky-400 font-bold">68% (965 Golfers)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full w-[68%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">04. Tour Caliber (Single Digit)</span>
                <span className="font-mono text-purple-400 font-bold">38% (540 Golfers)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[38%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Enrollments Table */}
        <div className="p-6 rounded-3xl bg-[#161B22] border border-[#30363D] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">
              Recent Admissions & Intake
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {recentIntakes.map((intake, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#0D1117] border border-[#30363D] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{intake.name}</h4>
                    <span className="text-[10px] font-mono text-gray-400">HDCP: {intake.handicap}</span>
                  </div>
                  <p className="text-[11px] text-[#D4AF37] font-medium">{intake.program}</p>
                  <p className="text-[10px] text-gray-500">Coach: {intake.coach} • {intake.date}</p>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/30 whitespace-nowrap">
                  {intake.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
