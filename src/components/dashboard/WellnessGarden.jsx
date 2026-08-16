import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSeedling, FaLeaf, FaCheckCircle, FaPlusCircle, FaSmile, FaBookOpen, FaWind, FaRobot } from "react-icons/fa";
import { getGardenData, claimDailyReward } from "../../services/gardenService";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { isToday, format } from "date-fns";

// Reward component for individual daily rewards
function Reward({ reward, isCompleted, onClaim, isClaiming }) {
  const handleClaim = () => {
    if (!isCompleted && !isClaiming) {
      onClaim(reward.id, reward.xp);
    }
  };

  return (
    <motion.div
      whileHover={{ y: isCompleted ? 0 : -2 }} // Only animate hover if not completed
      className={`
        flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-200
        ${isCompleted
          ? "border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/30 dark:bg-emerald-950/20"
          : "border-slate-100 bg-slate-50/60 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-white/[0.025] dark:hover:bg-white/[0.04]"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Icon for the reward */}
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${isCompleted ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-white text-slate-500 shadow-sm dark:bg-slate-800"}`}>
          {reward.icon}
        </span>
        {/* Title of the reward */}
        <span className={`text-xs font-medium ${isCompleted ? "text-emerald-700 dark:text-emerald-300" : "text-slate-600 dark:text-slate-300"}`}>
          {reward.title}
        </span>
      </div>
      {isCompleted ? (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <FaCheckCircle /> Completed
        </span>
      ) : (
        <button
          onClick={handleClaim}
          disabled={isClaiming}
          className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/60"
        >
          {isClaiming ? "Claiming..." : `+${reward.xp} XP`}
          {!isClaiming && <FaPlusCircle className="text-[10px]" />}
        </button>
      )}
    </motion.div>
  );
};

const dailyRewards = [
  { id: 'mood', title: 'Mood Check-in', xp: 10, icon: <FaSmile /> },
  { id: 'journal', title: 'Journal Entry', xp: 15, icon: <FaBookOpen /> },
  { id: 'breathing', title: 'Breathing Exercise', xp: 10, icon: <FaWind /> },
  { id: 'chat', title: 'Talk to Mana AI', xp: 20, icon: <FaRobot /> },
];

function WellnessGarden() {
  const { user } = useAuth(); // Get authenticated user
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastRewardResetDate, setLastRewardResetDate] = useState(null);
  const [completedDailyRewards, setCompletedDailyRewards] = useState([]);
  const [claimingRewardId, setClaimingRewardId] = useState(null);

  const handleClaimReward = async (rewardId, xpAmount) => {
    setClaimingRewardId(rewardId);
    try {
      const result = await claimDailyReward(rewardId, xpAmount);
      if (result.success) {
        toast.success(`+${xpAmount} XP! Reward claimed.`);
        setXP(result.xp);
        setLevel(result.level);
        setCompletedDailyRewards(result.completedDailyRewards);
      } else {
        toast.error(result.message || "Could not claim reward.");
      }
    } catch (error) {
      toast.error("An error occurred while claiming the reward.");
      console.error("Claim reward error:", error);
    } finally {
      setClaimingRewardId(null);
    }
  };

  const [tree, setTree] = useState({
    emoji: "🌱",
    title: "Seed",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGarden = async () => {
      try {
        if (!user?.uid) return; // Don't load if user or user.uid is not yet available
        const data = await getGardenData();

        if (data) {
          setXP(data.xp || 0);
          setLevel(data.level || 1);

          setTree({
            emoji: data.tree || "🌱",
            title: data.treeTitle || "Seed",
          });
          setLastRewardResetDate(data.lastRewardResetDate?.toDate());
          setCompletedDailyRewards(data.completedDailyRewards || []);
        }
      } catch (error) {
        console.error("Error loading garden:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGarden();
  }, [user]); // Re-run when user object becomes available

  const nextLevelXP = level * 100;

  const progress = Math.min((xp / nextLevelXP) * 100, 100);

  if (loading) {
    return (
      <section className="rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl dark:bg-emerald-950/30">
            🌿
          </div>

          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Growing your wellness garden...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-950/20" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-950/20" />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FaSeedling />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Wellness Garden
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Grow with yourself
              </h2>
            </div>

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
            <FaLeaf className="text-[10px]" />
            Level {level}
          </div>

        </div>

        <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">
          Small acts of self-care help your garden grow. Keep showing up for
          yourself, one gentle step at a time.
        </p>

        {/* Garden */}
        <div className="relative mt-7 overflow-hidden rounded-[26px] border border-emerald-100 bg-gradient-to-b from-emerald-50/80 via-white to-teal-50/40 px-5 py-9 text-center dark:border-emerald-900/30 dark:from-emerald-950/25 dark:via-slate-900 dark:to-teal-950/20">

          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55 }}
            whileHover={{ scale: 1.06 }}
            className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-white bg-white text-7xl shadow-[0_10px_35px_rgba(16,185,129,0.10)] dark:border-slate-700 dark:bg-slate-800"
          >
            {tree.emoji}
          </motion.div>

          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {tree.title}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Your garden grows as you care for yourself.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <FaLeaf className="text-emerald-500" />
            Level {level}
          </div>

        </div>

        {/* Growth Progress */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-white/[0.025]">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Growth progress
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                {xp} / {nextLevelXP} XP
              </p>
            </div>

            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            />

          </div>
        </div>

        {/* Rewards */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                Daily growth
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                Today's Rewards
              </h3>
              {lastRewardResetDate && (
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Last reset: {format(lastRewardResetDate, "MMM dd, yyyy")}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {dailyRewards.map((reward) => (
              <Reward
                key={reward.id}
                reward={reward}
                isCompleted={completedDailyRewards.includes(reward.id)}
                onClaim={handleClaimReward}
                isClaiming={claimingRewardId === reward.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WellnessGarden;