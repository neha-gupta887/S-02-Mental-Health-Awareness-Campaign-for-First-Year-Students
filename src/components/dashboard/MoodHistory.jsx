/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaSyncAlt, FaHistory } from "react-icons/fa";

import LoadingState from "../ui/LoadingState";
import { getMoodHistory } from "../../services/moodService";
import useAuth from "../../hooks/useAuth";

function MoodHistory() {
    const { user } = useAuth();

  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMoods = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await getMoodHistory();
      setMoods(data);
    } catch (error) {
      console.error("Failed to load mood history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === undefined) return;

    fetchMoods();
  }, [user]);

  if (loading) {
    return (
      <section className="rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <LoadingState
          message="Loading your mood history..."
        />
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <FaHistory />
          </div>

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
              Your journey
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Mood History
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              A gentle look at how you've been feeling over time.
            </p>

          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-white/[0.03] dark:text-slate-300">
            {moods.length} {moods.length === 1 ? "entry" : "entries"}
          </div>

          <button
            type="button"
            onClick={fetchMoods}
            className="group inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
          >
            <FaSyncAlt className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
            Refresh
          </button>

        </div>

      </div>

      {/* Empty State */}
      {moods.length === 0 ? (
        <div className="mt-8 rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-14 text-center dark:border-slate-800 dark:bg-white/[0.025]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm dark:bg-slate-800">
            😊
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
            No mood entries yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Start checking in with yourself to build your personal emotional
            wellness timeline.
          </p>

          <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
            🌱 Your journey starts with one check-in
          </div>

        </div>
      ) : (

        /* Mood List */
        <div className="mt-7 max-h-[500px] space-y-3 overflow-y-auto pr-1">

          {moods.map((mood) => (

            <div
              key={mood.id}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-white/[0.025] dark:hover:bg-white/[0.04] md:flex-row md:items-center md:justify-between"
            >

              {/* Mood */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm dark:bg-slate-800">
                  {mood.emoji}
                </div>

                <div className="min-w-0">

                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                    {mood.mood}
                  </h3>

                  {mood.email && (
                    <p className="mt-1 truncate text-xs text-slate-400">
                      {mood.email}
                    </p>
                  )}

                </div>

              </div>

              {/* Date */}
              <div className="flex items-center gap-2 md:text-right">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {mood.createdAt?.toDate
                    ? mood.createdAt.toDate().toLocaleString()
                    : "Just now"}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MoodHistory;
