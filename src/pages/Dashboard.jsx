import DailyWellnessRitual from "../components/dashboard/DailyWellnessRitual";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import MoodAnalyticsChart from "../components/dashboard/MoodAnalyticsChart";
import HumanSupport from "../components/dashboard/HumanSupport";
import QuickActions from "../components/dashboard/QuickActions";
import WellnessGarden from "../components/dashboard/WellnessGarden";
import EmotionalWeather from "../components/dashboard/EmotionalWeather";
import RecentActivity from "../components/dashboard/RecentActivity";
import LoadingState from "../../LoadingState.jsx";
import { getDashboardStats } from "../services/dashboardStatsService.js";
import { getMoodHistory } from "../services/moodService";
import { getJournalHistory } from "../services/journalService.js";
import useAuth from "../hooks/useAuth.js";
import ErrorState from "./ErrorState.jsx";
import ExamModeCard from "../components/dashboard/ExamModeCard.jsx";

import StressSOSCard from "../components/dashboard/StressSOSCard";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // For the first page load
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [greeting, setGreeting] = useState("Welcome back");
  const [dailyMessage, setDailyMessage] = useState(
    "Take a moment for yourself today."
  );

  const { user } = useAuth();
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const fetchData = async () => {
    if (!user) {
      return;
    }

    // Don't show the full-page loader on subsequent refreshes
    if (!isInitialLoading) {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const [statsData, moodData, journalData] = await Promise.all([
        getDashboardStats(),
        getMoodHistory(),
        getJournalHistory(),
      ]);
      setStats(statsData);
      setMoods(moodData);
      setJournals(journalData || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError("Could not load dashboard data. Please try again.");
    } finally {
      setIsInitialLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    // Re-call fetchData to refresh all dashboard data
    await fetchData();
  };

  return (
    <AuthenticatedLayout>
      <div className="space-y-8">
        <DashboardHero
          stats={stats}
          greeting={greeting}
          user={user}
          dailyMessage={dailyMessage}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        <HumanSupport />
        <StressSOSCard />
        <ExamModeCard />
        <QuickActions />

        {isInitialLoading ? (
          <div className="mt-8 flex h-96 items-center justify-center">
            <LoadingState message="Loading your wellness dashboard..." />
          </div>
        ) : error ? (
          <ErrorState
            title="Could not load dashboard"
            message={error}
            onRetry={fetchData}
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Column */}
            <div className="space-y-8 lg:col-span-2">
              <DashboardOverview stats={stats} moods={moods} journals={journals} />
              <MoodAnalyticsChart moods={moods} />
              <RecentActivity moods={moods} journals={journals} />
            </div>
            {/* Right Sidebar */}
            <div className="space-y-8 lg:col-span-1">
              <EmotionalWeather />
              <WellnessGarden />
              <DailyWellnessRitual />
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

export default Dashboard;
