import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function WellnessHeatmap({ moods = [] }) {
  const today = new Date();

  const [values, setValues] = useState([]);

  useEffect(() => {
    if (moods.length > 0) {
        const activityMap = {};

        moods.forEach((mood) => {
          if (!mood.createdAt?.toDate) return;

          const date = mood.createdAt.toDate().toISOString().split("T")[0];

          activityMap[date] = (activityMap[date] || 0) + 1;
        });

        const heatmapData = Object.keys(activityMap).map((date) => ({
          date,
          count: activityMap[date],
        }));

        setValues(heatmapData);
    }
  }, [moods]);

  const totalCheckIns = values.reduce(
    (total, item) => total + item.count,
    0
  );

  const activeDays = values.length;

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            Consistency
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Wellness activity
          </h2>

          <p className="mt-1 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">
            Every check-in is a small moment of taking care of yourself.
          </p>
        </div>

        <div className="flex gap-2">

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Active days
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {activeDays}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Check-ins
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {totalCheckIns}
            </p>
          </div>

        </div>
      </div>

      {/* Heatmap */}
      <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-white/[0.02] sm:p-5">

        <div className="min-w-[620px]">

          <CalendarHeatmap
            startDate={
              new Date(
                today.getFullYear(),
                today.getMonth() - 3,
                today.getDate()
              )
            }
            endDate={today}
            values={values}
            classForValue={(value) => {
              if (!value) return "mana-empty";

              if (value.count >= 4) return "mana-level-4";
              if (value.count >= 3) return "mana-level-3";
              if (value.count >= 2) return "mana-level-2";

              return "mana-level-1";
            }}
            showWeekdayLabels
            gutterSize={3}
          />

        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

        <p className="text-xs text-slate-400">
          Fewer check-ins
        </p>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-[4px] bg-slate-100 dark:bg-slate-800" />

          <span className="h-3 w-3 rounded-[4px] bg-emerald-100" />

          <span className="h-3 w-3 rounded-[4px] bg-emerald-300" />

          <span className="h-3 w-3 rounded-[4px] bg-emerald-500" />

          <span className="h-3 w-3 rounded-[4px] bg-emerald-700" />

        </div>

        <p className="text-xs text-slate-400">
          More check-ins
        </p>

      </div>

      {/* Gentle message */}
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100/80 bg-emerald-50/50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-sm shadow-sm dark:bg-slate-800">
          🌱
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            Consistency over perfection
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            You don't need to check in every day. Just keep making space for
            yourself whenever you can.
          </p>
        </div>

      </div>

      {/* Custom Heatmap Styles */}
      <style>{`
        .react-calendar-heatmap {
          width: 100%;
        }

        .react-calendar-heatmap text {
          fill: #94a3b8;
          font-size: 9px;
        }

        .react-calendar-heatmap .react-calendar-heatmap-small-text {
          font-size: 9px;
        }

        .react-calendar-heatmap rect {
          rx: 4;
          ry: 4;
        }

        .react-calendar-heatmap .mana-empty {
          fill: #f1f5f9;
        }

        .react-calendar-heatmap .mana-level-1 {
          fill: #d1fae5;
        }

        .react-calendar-heatmap .mana-level-2 {
          fill: #6ee7b7;
        }

        .react-calendar-heatmap .mana-level-3 {
          fill: #34d399;
        }

        .react-calendar-heatmap .mana-level-4 {
          fill: #059669;
        }

        .dark .react-calendar-heatmap .mana-empty {
          fill: #1e293b;
        }

        .dark .react-calendar-heatmap .mana-level-1 {
          fill: #064e3b;
        }

        .dark .react-calendar-heatmap .mana-level-2 {
          fill: #047857;
        }

        .dark .react-calendar-heatmap .mana-level-3 {
          fill: #10b981;
        }

        .dark .react-calendar-heatmap .mana-level-4 {
          fill: #34d399;
        }
      `}</style>

    </div>
  );
}

export default WellnessHeatmap;