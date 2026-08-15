import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader.jsx";
import MoodDistributionChart from "../components/dashboard/MoodDistributionChart";
import WellnessHeatmap from "../components/dashboard/WellnessHeatmap";
import MoodHistory from "../components/dashboard/MoodHistory";
import MoodSummary from "../components/analytics/MoodSummary.jsx";
import LoadingState from "../components/ui/LoadingState.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";

import { getMoodHistory } from "../services/moodService";

const moodScore = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Sad: 2,
  Stressed: 1,
  Angry: 1,
};

function MoodAnalytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryStats, setSummaryStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const moodHistory = await getMoodHistory();
      setMoods(moodHistory);
      calculateSummary(moodHistory);
    } catch (err) {
      console.error("Failed to load mood analytics:", err);
      setError("Could not load your mood analytics data.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (moodHistory) => {
    if (moodHistory.length === 0) {
      setSummaryStats({
        total: 0,
        average: 0,
        mostFrequent: "N/A",
        mostRecent: "N/A",
      });
      return;
    }

    const total = moodHistory.length;
    const totalScore = moodHistory.reduce(
      (acc, mood) => acc + (moodScore[mood.mood] || 0),
      0
    );
    const average = total > 0 ? totalScore / total : 0;

    const moodCounts = moodHistory.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    const mostFrequent = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );

    const mostRecentEntry = moodHistory.sort(
      (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
    )[0];

    setSummaryStats({
      total,
      average,
      mostFrequent,
      mostRecent: mostRecentEntry.mood,
    });
  };

  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex h-96 items-center justify-center">
          <LoadingState message="Loading your wellness analytics..." />
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="space-y-8">
        <AnalyticsHeader analytics={{ totalEntries: moods.length }} />

        {error ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <MoodDistributionChart moods={moods} />
              </div>
              <div className="lg:col-span-2">
                {summaryStats && <MoodSummary stats={summaryStats} />}
              </div>
            </div>

            <WellnessHeatmap moods={moods} />

            <div>
              <MoodHistory moods={moods} onRefresh={fetchData} />
            </div>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

export default MoodAnalytics;