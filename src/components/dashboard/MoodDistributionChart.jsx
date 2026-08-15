import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
];

function MoodDistributionChart({ moods = [] }) {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    if (moods.length > 0) {
      const moodCount = {};

      moods.forEach((mood) => {
        const key = `${mood.mood} ${mood.emoji}`;
        moodCount[key] = (moodCount[key] || 0) + 1;
      });

      const chartData = Object.keys(moodCount).map((key) => ({
        name: key,
        value: moodCount[key],
      }));

      setMoodData(chartData);
    }
  }, [moods]);

  const totalEntries = moodData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            Mood patterns
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Mood distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A gentle look at how you've been feeling.
          </p>
        </div>

        <div className="hidden rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:block dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
          {totalEntries} check-ins
        </div>

      </div>

      {/* Chart */}
      {moodData.length === 0 ? (
        <div className="flex h-72 flex-col items-center justify-center text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl dark:bg-emerald-950/30">
            🌱
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Your mood story is just beginning
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Start checking in with yourself and your mood patterns will appear
            here.
          </p>

        </div>
      ) : (
        <div className="mt-5 h-72">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={moodData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={100}
                paddingAngle={3}
                stroke="none"
                labelLine={false}
              >
                {moodData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                }}
              />

            </PieChart>
          </ResponsiveContainer>

        </div>
      )}

      {/* Center summary */}
      {moodData.length > 0 && (
        <div className="-mt-44 pointer-events-none flex h-24 items-center justify-center text-center">

          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              {totalEntries}
            </p>

            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Check-ins
            </p>
          </div>

        </div>
      )}

      {/* Custom Legend */}
      {moodData.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3">

          {moodData.map((mood, index) => (
            <div
              key={mood.name}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-white/[0.03]"
            >

              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />

              <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-600 dark:text-slate-300">
                {mood.name}
              </span>

              <span className="text-xs font-semibold text-slate-400">
                {mood.value}
              </span>

            </div>
          ))}

        </div>
      )}

      {/* Footer */}
      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">

        <p className="text-xs leading-5 text-slate-400">
          Your moods aren't good or bad — they're information that can help
          you understand yourself better.
        </p>

      </div>

    </div>
  );
}

export default MoodDistributionChart;