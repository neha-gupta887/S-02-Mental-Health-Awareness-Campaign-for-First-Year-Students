import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import AnalyticsHeader from "../AnalyticsHeader.jsx";
import MoodDistributionChart from "../components/dashboard/MoodDistributionChart";
import WellnessHeatmap from "../components/dashboard/WellnessHeatmap";
import MoodHistory from "../components/dashboard/MoodHistory";

import { getMoodAnalytics } from "../services/analyticsService";

function MoodAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalEntries: 0,
    currentMood: "Loading...",
    mostFrequentMood: "Loading...",
    moodDistribution: [],
    weeklyTrend: [],
    streak: 0,
    wellnessScore: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      const data = await getMoodAnalytics();

      setAnalytics(data);

      setLoading(false);
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">

        <motion.h1
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="text-4xl font-bold text-emerald-600"
        >
          Loading Analytics...
        </motion.h1>

      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="space-y-8">
        <AnalyticsHeader analytics={analytics} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <MoodDistributionChart />
          <WellnessHeatmap />
        </div>

        <div>
          <MoodHistory />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default MoodAnalytics;