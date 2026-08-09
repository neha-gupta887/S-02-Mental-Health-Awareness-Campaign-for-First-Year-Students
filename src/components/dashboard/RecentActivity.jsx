import { useEffect, useState } from "react";
import {
  FaSmile,
  FaBookOpen,
  FaHistory,
} from "react-icons/fa";
import { getMoodHistory } from "../../services/moodService";
import { getJournalHistory } from "../../services/journalService";
import { formatDistanceToNow } from "date-fns";

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const moodHistory = await getMoodHistory();
        const journalHistory = await getJournalHistory();

        const moodActivities = moodHistory.map((mood) => ({
          id: `mood-${mood.id}`,
          title: "Mood Check-in",
          description: `You logged a ${mood.mood} mood.`,
          time: mood.createdAt?.toDate
            ? formatDistanceToNow(mood.createdAt.toDate(), { addSuffix: true })
            : "Just now",
          icon: <FaSmile />,
          type: "Mood",
          date: mood.createdAt?.toDate() || new Date(),
        }));

        const journalActivities = journalHistory.map((journal) => ({
          id: `journal-${journal.id}`,
          title: "Journal Entry",
          description: journal.title || "You wrote a new journal entry.",
          time: journal.createdAt?.toDate
            ? formatDistanceToNow(journal.createdAt.toDate(), {
                addSuffix: true,
              })
            : "Just now",
          icon: <FaBookOpen />,
          type: "Journal",
          date: journal.createdAt?.toDate() || new Date(),
        }));

        const combinedActivities = [...moodActivities, ...journalActivities]
          .sort((a, b) => b.date - a.date)
          .slice(0, 5);

        setActivities(combinedActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <FaHistory />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Timeline
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && activities.length === 0 && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center dark:border-slate-700">
          <FaBookOpen className="text-4xl text-slate-400" />
          <p className="mt-4 font-semibold text-slate-600 dark:text-slate-300">
            No recent activity yet
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your mood and journal entries will appear here.
          </p>
        </div>
      )}

      {!loading && activities.length > 0 && (
        <div className="mt-6 space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-white/[0.025]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-400">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {activity.title}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
