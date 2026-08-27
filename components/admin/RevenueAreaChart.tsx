"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 38400, foundation: 4, practice: 210 },
  { month: "Feb", revenue: 44200, foundation: 5, practice: 250 },
  { month: "Mar", revenue: 52000, foundation: 6, practice: 310 },
  { month: "Apr", revenue: 61800, foundation: 7, practice: 380 },
  { month: "May", revenue: 68400, foundation: 8, practice: 440 },
  { month: "Jun", revenue: 72400, foundation: 9, practice: 510 },
];

export default function RevenueAreaChart() {
  return (
    <div className="h-72 w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fairwayGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" opacity={0.5} />
          <XAxis dataKey="month" stroke="#6B7280" fontSize={11} />
          <YAxis
            stroke="#6B7280"
            fontSize={11}
            tickFormatter={(val) => `$${val / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161B22",
              borderColor: "#30363D",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "12px",
            }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#D4AF37"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#goldGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
