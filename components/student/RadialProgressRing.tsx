"use client";

import React from "react";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

interface RadialRingProps {
  progress: number;
}

export default function RadialProgressRing({ progress }: RadialRingProps) {
  const data = [
    {
      name: "Completion",
      value: progress,
      fill: "#D4AF37",
    },
  ];

  return (
    <div className="relative size-32 mx-auto flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="75%"
          outerRadius="100%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "#1F242C" }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-bold text-white">{progress}%</span>
        <span className="text-[9px] uppercase font-bold text-gray-400">Foundation</span>
      </div>
    </div>
  );
}
