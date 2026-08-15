import { useEffect, useState } from "react";
import {
  AreaChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

import LoadingState from "../ui/LoadingState";
import ErrorState from "../ui/ErrorState";

const moodScore = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Sad: 2,
  Stressed: 1,
  Angry: 1,
};

function MoodAnalyticsChart({ moods = [] }) {
  const { darkMode } = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const processMoodData = () => {
      // Sort by date ascending to get the correct order for the chart
      const sortedMoods = moods.sort(
        (a, b) => a.createdAt.toDate() - b.createdAt.toDate()
      );

      const weeklyData = sortedMoods
        .slice(-7) // Take the last 7 entries for the most recent trend
        .map((mood) => ({
          name: mood.mood,
          day: mood.createdAt?.toDate()
            ? mood.createdAt.toDate().toLocaleDateString("en-US", {
                weekday: "short",
              })
            : "Today",
          score: moodScore[mood.mood] || 3,
          fullDate: mood.createdAt?.toDate()
            ? mood.createdAt.toDate().toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })
            : "N/A",
        }));
      setChartData(weeklyData);
    };

    processMoodData();
  }, [moods]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
          <p className="font-bold text-slate-800 dark:text-white">{data.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {data.fullDate}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:p-7 dark:border-white/[0.06] dark:bg-white/[0.025]">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Mood insights
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Your mood this week
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A gentle look at how you've been feeling recently.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Last 7 check-ins
        </div>

      </div>

      {/* Chart */}
      <div className="mt-7 h-72 w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300/50 bg-emerald-50/20 text-center dark:border-emerald-700/50 dark:bg-emerald-950/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl text-emerald-500 shadow-sm dark:bg-slate-800 dark:text-emerald-400">
              🌿
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">
              Your Mood Journey Starts Here
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Check in with yourself to start building your personal mood
              history. Your weekly trend will appear here.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 6"
                vertical={false}
                stroke={darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(148, 163, 184, 0.16)"}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: darkMode ? "#64748b" : "#94a3b8",
                  fontSize: 11,
                }}
                dy={10}
              />

              <YAxis
                domain={[0, 5]}
                ticks={[1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: darkMode ? "#64748b" : "#94a3b8",
                  fontSize: 10,
                }}
                tickFormatter={(value) => {
                  const labels = {
                    1: "Angry",
                    2: "Sad",
                    3: "Neutral",
                    4: "Calm",
                    5: "Happy",
                  };

                  return labels[value];
                }}
                width={58}
              />

              <Tooltip
                cursor={{
                  stroke: "#10b981",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="score"
                strokeWidth={2.5}
                stroke="#10b981"
                fill="url(#colorScore)"
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#ffffff",
                  stroke: "#10b981",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#10b981",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />

            </AreaChart>
          </ResponsiveContainer>
        )}

      </div>
    </section>
  );
}

export default MoodAnalyticsChart;