import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBook, FaPlus } from "react-icons/fa";
import { getJournalHistory } from "../../services/journalService";
import { formatDistanceToNow } from "date-fns";
import LoadingState from "../ui/LoadingState";
import GlassCard from "../ui/GlassCard";

function RecentJournal() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const history = await getJournalHistory(3); // Fetch latest 3
        setJournals(history);
      } catch (error) {
        console.error("Error fetching recent journals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  if (loading) {
    return (
      <GlassCard><LoadingState message="Loading recent journals..." /></GlassCard>
    );
  }

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
            Your thoughts
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Recent journal entries
          </h2>
        </div>
        <Link
          to="/journal"
          className="group flex items-center gap-2 text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          View All
          <FaArrowRight className="text-[9px] transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Empty State */}
      {!loading && journals.length === 0 ? (
        <div className="mt-7 rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-14 text-center dark:border-slate-800 dark:bg-white/[0.025]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm dark:bg-slate-800">
            <FaBook />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
            Your journal is empty
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Writing down your thoughts is a great way to reflect. Your recent
            entries will appear here.
          </p>
          <Link
            to="/journal"
            className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700"
          >
            <FaPlus className="text-xs" />
            Write your first entry
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {journals.map((journal) => (
            <Link
              to="/journal"
              key={journal.id}
              className="group block rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-100 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-white/[0.025] dark:hover:border-violet-900/50 dark:hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <h3 className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                  {journal.title || "Untitled Entry"}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {journal.createdAt?.toDate
                    ? formatDistanceToNow(journal.createdAt.toDate(), {
                        addSuffix: true,
                      })
                    : "A while ago"}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {journal.content}
              </p>
            </Link>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export default RecentJournal;