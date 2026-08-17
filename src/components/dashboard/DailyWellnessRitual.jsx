import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { Leaf } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { getTodaysWellnessRitual, updateWellnessRitualItem } from '../../services/wellnessRitualService';

const DailyWellnessRitual = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // If there's no user, we don't need to show a loading state indefinitely.
      if (loading) setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const ritualData = await getTodaysWellnessRitual(user.uid);
        if (ritualData && ritualData.items) {
          setItems(ritualData.items);
        }
      } catch (err) {
        console.error("Daily ritual load failed:", err); // Log the actual error
        setError("Could not load today's ritual. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleToggle = async (id) => {
    const originalItems = [...items];
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);

    try {
      const itemToUpdate = newItems.find(item => item.id === id);
      if (itemToUpdate) {
        await updateWellnessRitualItem(user.uid, id, itemToUpdate.completed);
      }
    } catch (err) {
      console.error("Error updating wellness ritual:", err);
      setError("Could not save your progress. Please check your connection.");
      // Revert to original state on error
      setItems(originalItems);
    }
  };

  const SkeletonLoader = () => (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-emerald-950/[0.03] backdrop-blur-sm sm:p-7 dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="flex animate-pulse items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="w-full space-y-2">
          <div className="h-5 w-2/3 rounded-md bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className="mt-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-20 rounded-md bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-5 space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full border-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />
              <div className="w-full flex-grow space-y-2">
                <div className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-rose-200/80 bg-rose-50/50 p-5 shadow-lg shadow-rose-950/[0.03] backdrop-blur-sm dark:border-rose-900/[0.2] dark:bg-rose-950/[0.1]">
            <p className="text-center text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>
        </div>
    );
  }
  
  const completedCount = items.filter(item => item.completed).length;
  const allCompleted = items.length > 0 && completedCount === items.length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-emerald-950/[0.03] backdrop-blur-sm sm:p-7 dark:border-white/[0.06] dark:bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100/80 text-emerald-600 dark:from-emerald-950/70 dark:to-teal-950/60 dark:text-emerald-400">
              <Leaf size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Daily Wellness Ritual
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Small moments of self-care can make a calmer day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Today's progress</p>
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {completedCount} / {items.length} completed
          </p>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-5 space-y-2">
        {items.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className="group cursor-pointer rounded-2xl p-4 transition-colors duration-200"
            animate={{
              backgroundColor: item.completed ? 'rgba(16, 185, 129, 0.05)' : 'transparent'
            }}
            whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.08)'}}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                animate={{
                  borderColor: item.completed ? '#10B981' : '#CBD5E1',
                  backgroundColor: item.completed ? '#10B981' : 'transparent',
                }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence>
                  {item.completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCheck className="text-xs text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <div className="flex-grow">
                <p
                  className="font-medium text-slate-800 transition-colors duration-200 dark:text-slate-200"
                  style={{
                    opacity: item.completed ? 0.7 : 1,
                  }}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.title}
                </p>
                <p
                  className="mt-1 text-sm text-slate-500 transition-colors duration-200 dark:text-slate-400"
                  style={{
                    opacity: item.completed ? 0.7 : 1,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completion State */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex flex-col items-center text-center"
          >
            <span className="text-4xl">🌿</span>
            <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-white">Beautiful work.</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">You showed up for yourself today.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DailyWellnessRitual;