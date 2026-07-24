import { useEffect, useState } from "react";
import WellnessPlanCard from "../components/WellnessPlanCard";
import MoodForecastCard from "../components/MoodForecastCard";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import MoodCalendar from "../components/MoodCalendar";
import AchievementsCard from "../components/AchievementsCard";
import AIInsightsCard from "../components/AIInsightsCard";
import AIRiskCard from "../components/AIRiskCard";

import { getMoodAnalytics } from "../services/analyticsService";
import { downloadWellnessReport } from "../services/pdfService";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

function StatsCard({ title, value, emoji }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
      <div className="text-4xl">{emoji}</div>

      <h3 className="mt-3 text-gray-500">{title}</h3>

      <p className="text-3xl font-bold text-emerald-600 mt-2">
        {value}
      </p>
    </div>
  );
}

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
        <h1 className="text-3xl font-bold text-emerald-600">
          Loading Analytics...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <h1 className="text-5xl font-bold text-center text-emerald-700">
          📊 Mood Analytics
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Understand your emotions through meaningful insights.
        </p>

        {/* Download Button */}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => downloadWellnessReport(analytics)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
          >
            📥 Download Wellness Report
          </button>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <StatsCard
            title="Current Mood"
            value={analytics.currentMood}
            emoji="😊"
          />

          <StatsCard
            title="Mood Streak"
            value={`${analytics.streak} Day${
              analytics.streak !== 1 ? "s" : ""
            }`}
            emoji="🔥"
          />

          <StatsCard
            title="Mood Entries"
            value={analytics.totalEntries}
            emoji="📝"
          />

          <StatsCard
            title="Most Frequent"
            value={analytics.mostFrequentMood}
            emoji="⭐"
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          {/* Weekly Trend */}

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              📈 Weekly Mood Trend
            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={analytics.weeklyTrend}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis domain={[1, 5]} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#10B981"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>
                    {/* Mood Distribution */}

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              🥧 Mood Distribution
            </h2>

            {analytics.moodDistribution.length > 0 ? (

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={analytics.moodDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {analytics.moodDistribution.map((entry, index) => (

                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            ) : (

              <div className="flex items-center justify-center h-80 text-gray-500">
                No mood data available.
              </div>

            )}

          </div>

        </div>

        {/* Mood Summary */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            📋 Mood Summary
          </h2>

          {analytics.moodDistribution.length > 0 ? (

            <div className="space-y-4">

              {analytics.moodDistribution.map((item, index) => (

                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>

                  </div>

                  <span className="font-bold text-emerald-600">
                    {item.value}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-center text-gray-500">
              Start tracking your mood to view analytics.
            </p>

          )}

        </div>

        {/* AI Wellness Insights */}

        <AIInsightsCard analytics={analytics} />

        {/* Wellness Score */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-emerald-700">
            🌿 Wellness Score
          </h2>

          <div className="mt-6">

            <div className="w-full bg-gray-200 rounded-full h-5">

              <div
                className="bg-emerald-500 h-5 rounded-full transition-all duration-700"
                style={{
                  width: `${analytics.wellnessScore}%`,
                }}
              />

            </div>

            <p className="text-center text-4xl font-bold text-emerald-600 mt-6">
              {analytics.wellnessScore}%
            </p>

            <p className="text-center text-gray-600 mt-3">

              {analytics.wellnessScore >= 80 &&
                "Excellent! Keep maintaining your healthy routine."}

              {analytics.wellnessScore >= 60 &&
                analytics.wellnessScore < 80 &&
                "You're doing well. Small self-care habits can improve your wellbeing."}

              {analytics.wellnessScore >= 40 &&
                analytics.wellnessScore < 60 &&
                "Your wellbeing is moderate. Consider journaling and breathing exercises."}

              {analytics.wellnessScore < 40 &&
                "Your recent mood suggests you may need extra care. Try relaxation exercises or reach out to someone you trust."}

            </p>

          </div>

        </div>
        <WellnessPlanCard
  wellnessScore={analytics.wellnessScore}
/>
// <MoodForecastCard wellnessScore={analytics.wellnessScore}
/>

<AIRiskCard />
                {/* AI Risk Assessment */}


        {/* Achievements */}

        <AchievementsCard analytics={analytics} />

        {/* Mood Calendar */}

        <MoodCalendar />

        {/* Footer */}

        <div className="mt-10 text-center text-gray-500">

          <p>
            🌿 Your analytics are generated from your personal mood history.
          </p>

          <p className="mt-2 text-sm">
            Keep logging your mood daily to receive more meaningful insights.
          </p>

        </div>

      </div>

    </div>
  );
}

export default MoodAnalytics;