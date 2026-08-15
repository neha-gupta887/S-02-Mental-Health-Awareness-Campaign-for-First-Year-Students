import {
  FaHeart,
  FaFire,
  FaBookOpen,
  FaSmile,
  FaArrowUp,
  FaLeaf,
} from "react-icons/fa";
import TodaysFocus from "./TodaysFocus";
import WellnessTrend from "./WellnessTrend";

function DashboardOverview({ stats = {}, moods = [], journals = [] }) {
  const toSafeNumber = (value) => {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  };

  const wellnessScore = toSafeNumber(stats?.wellnessScore);
  const streak = toSafeNumber(stats?.streak);
  const journalEntries = toSafeNumber(stats?.journalEntries);
  const totalMoodEntries = toSafeNumber(stats?.totalMoodEntries);
  const currentMood = stats?.currentMood || "Calm";

  const score = Math.min(Math.max(wellnessScore, 0), 100);

  const getScoreMessage = () => {
    if (score >= 80) return "You're doing beautifully";
    if (score >= 60) return "You're on a good path";
    if (score >= 40) return "Keep taking small steps";
    return "Be gentle with yourself";
  };

  return (
    <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur-sm sm:p-7 dark:border-white/[0.06] dark:bg-white/[0.025]">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Wellness overview
          </p>

          <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Your wellbeing at a glance
          </h3>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Updated today
        </div>

      </div>

      {/* Main wellness panel */}
      <div className="mt-6 rounded-[26px] border border-emerald-100/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 p-5 shadow-inner shadow-emerald-950/[0.015] sm:p-6 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:via-white/[0.025] dark:to-teal-950/10">

        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

          {/* Score */}
          <div className="flex items-center gap-5">

            <div
              className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full shadow-lg shadow-emerald-600/10"
              style={{
                background: `conic-gradient(#10b981 ${score * 3.6}deg, rgba(148,163,184,0.15) 0deg)`,
              }}
            >
              <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white dark:bg-[#101815]">

                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {score}
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  score
                </span>

              </div>
            </div>

            <div className="max-w-md">

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Your wellness score
              </p>

              <h4 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {getScoreMessage()}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Small, consistent moments of self-care can make a meaningful difference.
              </p>

            </div>

          </div>

          {/* Today indicator */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.04]">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FaArrowUp className="text-xs" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Today
              </p>

              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Keep going
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Wellness Trend */}
      <div className="mt-5">
        <WellnessTrend moods={moods} />
      </div>

      {/* Today's Focus */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Today's Focus
        </p>
        <TodaysFocus moods={moods} journals={journals} />
      </div>

      {/* Mini Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">

        <MiniStat
          icon={<FaFire />}
          value={streak}
          label="Day streak"
          tone="amber"
        />

        <MiniStat
          icon={<FaBookOpen />}
          value={journalEntries}
          label="Journal entries"
          tone="violet"
        />

        <MiniStat
          icon={<FaSmile />}
          value={currentMood}
          label="Current mood"
          tone="sky"
        />

        <MiniStat
          icon={<FaHeart />}
          value={totalMoodEntries}
          label="Mood check-ins"
          tone="rose"
        />

      </div>
    </section>
  );
}

function MiniStat({ icon, value, label, tone }) {
  const tones = {
    amber:
"bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",

    sky:
      "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400",

    rose:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
  };

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/80 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-100 hover:shadow-md dark:border-white/[0.05] dark:bg-white/[0.025] sm:p-4">

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm ${tones[tone]}`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="truncate text-base font-semibold text-slate-900 dark:text-white">
          {value}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-slate-400">
          {label}
        </p>

      </div>

    </div>
  );
}

export default DashboardOverview;