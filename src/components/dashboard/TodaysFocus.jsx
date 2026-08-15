import { useMemo } from "react";
import { Link } from "react-router-dom";
import { isToday } from "date-fns";
import { FaRegSmile, FaBookOpen, FaWind, FaCheckCircle } from "react-icons/fa";

const lowMoods = ["Sad", "Stressed", "Angry"];

function TodaysFocus({ moods = [], journals = [] }) {
  const focus = useMemo(() => {
    const sortedMoods = [...moods].sort(
      (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
    );
    const sortedJournals = [...journals].sort(
      (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
    );

    const hasMoodToday =
      sortedMoods.length > 0 && isToday(sortedMoods[0].createdAt.toDate());
    const hasJournalToday =
      sortedJournals.length > 0 && isToday(sortedJournals[0].createdAt.toDate());
    const latestMood = sortedMoods.length > 0 ? sortedMoods[0].mood : null;

    // Rule 1: No mood check-in today
    if (!hasMoodToday) {
      return {
        icon: <FaRegSmile />,
        title: "Check in with your mood",
        description: "A great first step for your day.",
        path: "/mood-checkin",
        color: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30",
      };
    }

    // Rule 2: No journal entry today
    if (!hasJournalToday) {
      return {
        icon: <FaBookOpen />,
        title: "Write down your thoughts",
        description: "Give yourself a few quiet minutes.",
        path: "/journal",
        color: "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950/30",
      };
    }

    // Rule 3: Recent mood is low
    if (latestMood && lowMoods.includes(latestMood)) {
      return {
        icon: <FaWind />,
        title: "Find your calm",
        description: "A breathing exercise can help.",
        path: "/breathing",
        color: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/30",
      };
    }

    // Fallback: All done for today
    return {
      icon: <FaCheckCircle />,
      title: "You're on a great path!",
      description: "Keep your gentle routine going.",
      path: "/analytics",
      color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
    };
  }, [moods, journals]);

  return (
    <Link
      to={focus.path}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-white/[0.03] dark:hover:border-emerald-900/50 dark:hover:bg-white/[0.05]"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110 ${focus.color}`}
      >
        {focus.icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-800 dark:text-white">{focus.title}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">{focus.description}</p>
      </div>
    </Link>
  );
}

export default TodaysFocus;