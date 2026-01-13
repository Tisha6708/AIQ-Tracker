import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AQIChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 italic mt-4">
        No AQI trend data available.
      </div>
    );
  }

  return (
    <div className="bg-white/10 p-4 sm:p-5 rounded-2xl shadow-md mt-4 sm:mt-6 backdrop-blur-sm w-full max-w-2xl mx-auto">
      <h2 className="text-base sm:text-lg font-semibold text-center mb-3">
        📈 AQI Trend (PM2.5)
      </h2>

      <div className="w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis
              dataKey="time"
              stroke="#e5e7eb"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#e5e7eb"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                color: "#fff",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              labelStyle={{ color: "#93c5fd" }}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 3, stroke: "#fff", strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AQIChart;
