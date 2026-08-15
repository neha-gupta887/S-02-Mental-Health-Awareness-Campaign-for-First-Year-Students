import {
  FaChartBar,
  FaStar,
  FaSmile,
  FaCalendarCheck,
} from "react-icons/fa";

function MoodSummary({ stats }) {
  const summaryItems = [
    {
      icon: <FaChartBar />,
      label: "Total Check-ins",
      value: stats.total,
      color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
    },
    {
      icon: <FaStar />,
      label: "Average Mood",
      value: `${stats.average.toFixed(1)} / 5`,
      color: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/30",
    },
    {
      icon: <FaSmile />,
      label: "Most Frequent",
      value: stats.mostFrequent,
      color: "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950/30",
    },
    {
      icon: <FaCalendarCheck />,
      label: "Most Recent",
      value: stats.mostRecent,
      color: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30",
    },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          Key Insights
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Mood Summary
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-white/[0.03] dark:hover:border-emerald-900/50 dark:hover:bg-white/[0.05]"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110 ${item.color}`}
            >
              {item.icon}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                {item.value}
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
        <p className="text-xs leading-5 text-slate-400">
          Your mood summary is based on all your check-ins. Keep tracking to
          discover more about your wellness patterns.
        </p>
      </div>
    </section>
  );
}

export default MoodSummary;