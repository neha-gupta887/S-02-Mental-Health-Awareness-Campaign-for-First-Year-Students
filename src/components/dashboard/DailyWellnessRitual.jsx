import { useEffect, useMemo, useState } from "react";
import {
  FaCheck,
  FaTint,
  FaWind,
  FaWalking,
  FaPen,
  FaMobileAlt,
  FaMoon,
  FaSun,
  FaLeaf,
} from "react-icons/fa";

const STORAGE_KEY = "manasetu_daily_wellness_ritual";

const wellnessTasks = [
  {
    id: "mindful-start",
    title: "Start your day mindfully",
    description: "Take 2 minutes to pause, breathe, and set an intention.",
    icon: FaSun,
  },
  {
    id: "mindful-breaths",
    title: "Take 5 mindful breaths",
    description: "Pause for a few slow breaths when your mind feels busy.",
    icon: FaWind,
  },
  {
    id: "hydration",
    title: "Drink enough water",
    description: "Take regular hydration breaks throughout the day.",
    icon: FaTint,
  },
  {
    id: "movement",
    title: "Move for 10 minutes",
    description: "Walk, stretch, or step outside for a short movement break.",
    icon: FaWalking,
  },
  {
    id: "write",
    title: "Write one thing down",
    description: "Write a thought, feeling, or something you appreciate.",
    icon: FaPen,
  },
  {
    id: "screen-break",
    title: "Take a screen break",
    description: "Step away from your phone or laptop for a few minutes.",
    icon: FaMobileAlt,
  },
  {
    id: "sleep",
    title: "Prepare for restful sleep",
    description: "Create a calm wind-down routine before bedtime.",
    icon: FaMoon,
  },
];

function getTodayKey() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getInitialCompleted() {
  const today = getTodayKey();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    const parsed = JSON.parse(saved);

    if (parsed?.date !== today) {
      return {};
    }

    return parsed.completed || {};
  } catch (error) {
    console.error("Unable to load wellness ritual:", error);
    return {};
  }
}

function DailyWellnessRitual() {
  const [completed, setCompleted] = useState(getInitialCompleted);

  const today = getTodayKey();

  const completedCount = useMemo(() => {
    return wellnessTasks.filter((task) => completed[task.id]).length;
  }, [completed]);

  const progress = Math.round(
    (completedCount / wellnessTasks.length) * 100
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          date: today,
          completed,
        })
      );
    } catch (error) {
      console.error("Unable to save wellness ritual:", error);
    }
  }, [completed, today]);

  // Check for a new day when the component remains open.
  useEffect(() => {
    const checkNewDay = () => {
      const currentDate = getTodayKey();

      if (currentDate !== today) {
        setCompleted({});
      }
    };

    const interval = setInterval(checkNewDay, 60 * 1000);

    return () => clearInterval(interval);
  }, [today]);

  const toggleTask = (taskId) => {
    setCompleted((previous) => ({
      ...previous,
      [taskId]: !previous[taskId],
    }));
  };

  return (
    <section className="mt-6 overflow-hidden rounded-[26px] border border-emerald-100/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-white/[0.025]">
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FaLeaf className="text-sm" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Daily wellness
              </p>

              <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Your daily ritual
              </h3>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400">
                Small moments of self-care can make a calmer day.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="shrink-0 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/[0.04]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Today's progress
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {completedCount}
              </span>

              <span className="text-xs text-slate-400">
                / {wellnessTasks.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-emerald-50 dark:bg-emerald-950/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {progress}% complete
            </span>

            {completedCount === wellnessTasks.length ? (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Beautiful work 🌿
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                One small step at a time
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="border-t border-slate-100 px-4 py-3 dark:border-white/[0.05] sm:px-5">
        <div className="space-y-2">
          {wellnessTasks.map((task) => {
            const Icon = task.icon;
            const isCompleted = Boolean(completed[task.id]);

            return (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${
                  isCompleted
                    ? "border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                    : "border-transparent bg-slate-50/70 hover:border-emerald-100 hover:bg-emerald-50/40 dark:bg-white/[0.025] dark:hover:border-emerald-900/40 dark:hover:bg-emerald-950/10"
                }`}
                aria-pressed={isCompleted}
                aria-label={`${isCompleted ? "Completed" : "Complete"} ${task.title}`}
              >
                {/* Checkbox */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-200 bg-white text-transparent group-hover:border-emerald-300 dark:border-white/[0.1] dark:bg-white/[0.04]"
                  }`}
                >
                  {isCompleted && <FaCheck className="text-[11px]" />}
                </span>

                {/* Icon */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs ${
                    isCompleted
                      ? "bg-white/80 text-emerald-600 dark:bg-white/[0.06] dark:text-emerald-400"
                      : "bg-white text-slate-400 dark:bg-white/[0.04] dark:text-slate-500"
                  }`}
                >
                  <Icon />
                </span>

                {/* Text */}
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-semibold transition-colors ${
                      isCompleted
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {task.title}
                  </span>

                  <span
                    className={`mt-0.5 block text-[11px] leading-4 ${
                      isCompleted
                        ? "text-emerald-600/70 dark:text-emerald-400/70"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {task.description}
                  </span>
                </span>

                {/* Status */}
                <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:block">
                  {isCompleted ? "Done" : "Do it"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion message */}
      {completedCount === wellnessTasks.length && (
        <div className="border-t border-emerald-100 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
              <FaCheck className="text-xs" />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                You showed up for yourself today.
              </p>

              <p className="mt-0.5 text-xs text-emerald-700/70 dark:text-emerald-400/70">
                Take a moment to appreciate that.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DailyWellnessRitual;