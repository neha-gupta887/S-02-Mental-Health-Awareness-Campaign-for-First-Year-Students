import { useMemo } from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

const moodScore = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Sad: 2,
  Stressed: 1,
  Angry: 1,
};

const MIN_ENTRIES_FOR_TREND = 6;

function WellnessTrend({ moods = [] }) {
  const trend = useMemo(() => {
    if (moods.length < MIN_ENTRIES_FOR_TREND) {
      return {
        status: "insufficient",
        message: "Keep checking in to build your wellness trend.",
        icon: <FaMinus />,
        color: "text-slate-500 dark:text-slate-400",
        bgColor: "bg-slate-100 dark:bg-slate-800",
      };
    }

    const sortedMoods = [...moods].sort(
      (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
    );

    const recentPeriod = sortedMoods.slice(0, 3);
    const previousPeriod = sortedMoods.slice(3, 6);

    const getAverageScore = (period) => {
      const totalScore = period.reduce(
        (sum, entry) => sum + (moodScore[entry.mood] || 0),
        0
      );
      return totalScore / period.length;
    };

    const recentAvg = getAverageScore(recentPeriod);
    const previousAvg = getAverageScore(previousPeriod);

    const difference = recentAvg - previousAvg;

    if (difference > 0.2) {
      return {
        status: "Improving",
        message: "Your recent mood scores are higher than before. Keep it up!",
        icon: <FaArrowUp />,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/50",
      };
    } else if (difference < -0.2) {
      return {
        status: "Needs Attention",
        message: "Your recent mood scores are a bit lower. Be gentle with yourself.",
        icon: <FaArrowDown />,
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-100 dark:bg-amber-900/50",
      };
    } else {
      return {
        status: "Stable",
        message: "Your mood has been consistent recently. That's great!",
        icon: <FaMinus />,
        color: "text-sky-600 dark:text-sky-400",
        bgColor: "bg-sky-100 dark:bg-sky-900/50",
      };
    }
  }, [moods]);

  return (
    <div className={`flex items-center gap-3 rounded-2xl p-3 ${trend.bgColor}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs ${trend.color}`}
      >
        {trend.icon}
      </div>
      <div>
        <p className={`text-sm font-bold ${trend.color}`}>{trend.status}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{trend.message}</p>
      </div>
    </div>
  );
}

export default WellnessTrend;