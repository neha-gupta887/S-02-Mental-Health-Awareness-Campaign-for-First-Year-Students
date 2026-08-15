import { Link } from "react-router-dom";
import { FaWind, FaBookOpen, FaRobot, FaSmile, FaGlassWhiskey } from "react-icons/fa";

function WellnessTips() {
  const tips = [
    {
      id: 1,
      icon: <FaWind />,
      title: "Take a Breathing Break",
      description: "A few deep breaths can help center your mind and reduce stress.",
      path: "/breathing",
      color: "text-sky-600 bg-sky-50 dark:bg-sky-950/30 dark:text-sky-400",
    },
    {
      id: 2,
      icon: <FaBookOpen />,
      title: "Write Down Your Thoughts",
      description: "Journaling is a powerful way to process your feelings and gain clarity.",
      path: "/journal",
      color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30 dark:text-violet-400",
    },
    {
      id: 3,
      icon: <FaRobot />,
      title: "Talk to Mana AI",
      description: "Your AI companion is here to listen without judgment, anytime you need.",
      path: "/chat",
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400",
    },
    {
      id: 4,
      icon: <FaSmile />,
      title: "Check In With Yourself",
      description: "Acknowledge how you're feeling. It's the first step to understanding yourself.",
      path: "/mood-checkin",
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400",
    },
  ];

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          💚
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Self-Care
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Daily Wellness Tips
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {tips.map((tip) => (
          <Link
            key={tip.id}
            to={tip.path}
            className="group block rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-white/[0.025] dark:hover:border-emerald-900/50 dark:hover:bg-white/[0.04]"
          >
            <div className="flex gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg shadow-sm transition-transform duration-300 group-hover:scale-110 ${tip.color}`}>
                {tip.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  {tip.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {tip.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WellnessTips;