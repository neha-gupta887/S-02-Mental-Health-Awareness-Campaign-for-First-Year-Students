import { generateWellnessReport } from "../services/reportService";
import { motion } from "framer-motion";
import {
  FaFileMedical,
  FaUser,
  FaHeart,
  FaFire,
  FaBookOpen,
  FaDownload,
} from "react-icons/fa";

function WellnessReport() {
  const report = {
    student: "Neha Gupta",
    email: "nehaguptaj65@gmail.com",
    date: new Date().toLocaleDateString(),

    mood: "😊 Happy",

    score: 91,

    streak: 18,

    journals: 26,

    risk: "Low",

    insights: [
      "You usually feel stressed before examinations.",
      "Daily journaling improves your mood significantly.",
      "Better sleep leads to higher wellness scores.",
    ],

    recommendations: [
      "Sleep before 11 PM",
      "Drink at least 2L of water",
      "Meditate for 10 minutes",
      "Write today's journal",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >

          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-5 py-2 font-semibold text-emerald-700 dark:text-emerald-300">

            <FaFileMedical />

            AI Wellness Report

          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900 dark:text-white">

            ManaSetu Wellness Report

          </h1>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">

            Your personalized wellness summary generated
            using mood history, AI insights and emotional analysis.

          </p>

        </motion.div>

        {/* Student Info */}

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-xl p-6">

            <FaUser className="text-4xl text-emerald-600" />

            <h3 className="mt-4 text-gray-500">

              Student

            </h3>

            <p className="text-2xl font-bold dark:text-white">

              {report.student}

            </p>

          </div>

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-xl p-6">

            <FaBookOpen className="text-4xl text-blue-600" />

            <h3 className="mt-4 text-gray-500">

              Email

            </h3>

            <p className="font-semibold dark:text-white break-all">

              {report.email}

            </p>

          </div>

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-xl p-6">

            <FaFileMedical className="text-4xl text-purple-600" />

            <h3 className="mt-4 text-gray-500">

              Generated

            </h3>

            <p className="text-2xl font-bold dark:text-white">

              {report.date}

            </p>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-lg p-6">

            <FaHeart className="text-4xl text-pink-500" />

            <h3 className="mt-4 text-gray-500">

              Current Mood

            </h3>

            <p className="text-3xl font-bold dark:text-white">

              {report.mood}

            </p>

          </div>

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-lg p-6">

            <FaHeart className="text-4xl text-emerald-600" />

            <h3 className="mt-4 text-gray-500">

              Wellness Score

            </h3>

            <p className="text-4xl font-bold text-emerald-600">

              {report.score}

            </p>

          </div>

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-lg p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                    <FaFire className="text-2xl sm:text-3xl text-orange-500 shrink-0" />
                    <p className="text-2xl sm:text-3xl font-bold dark:text-white">
                        {report.streak} <span className="text-base font-medium text-gray-500 dark:text-gray-400">Days</span>
                    </p>
                </div>
                <div className="sm:text-right">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Current Streak
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Keep going! &bull; Best: 25 days
                    </p>
                </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-lg p-6">

            <FaBookOpen className="text-4xl text-indigo-600" />

            <h3 className="mt-4 text-gray-500">

              Journals

            </h3>

            <p className="text-4xl font-bold dark:text-white">

              {report.journals}

            </p>

          </div>

        </div>
                {/* AI Insights + Burnout Risk */}

        <div className="grid xl:grid-cols-2 gap-8 mt-10">

          {/* AI Insights */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[30px] bg-white dark:bg-gray-800 shadow-xl p-8"
          >

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">

              🤖 AI Wellness Insights

            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300">

              Based on your mood history and wellness activities.

            </p>

            <div className="mt-8 space-y-5">

              {report.insights.map((insight, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-emerald-50 dark:bg-gray-700 p-5"
                >

                  <div className="text-2xl">

                    💡

                  </div>

                  <p className="leading-7 text-gray-700 dark:text-gray-200">

                    {insight}

                  </p>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Burnout Risk */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-[30px] bg-white dark:bg-gray-800 shadow-xl p-8"
          >

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">

              ⚠ Burnout Assessment

            </h2>

            <div className="mt-8">

              <div className="flex justify-between">

                <span className="text-lg font-semibold">

                  Current Risk

                </span>

                <span className="text-xl font-bold text-green-600">

                  {report.risk}

                </span>

              </div>

              <div className="mt-6 h-5 rounded-full bg-gray-200 dark:bg-gray-700">

                <div className="h-5 w-1/4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>

              </div>

              <p className="mt-8 text-gray-600 dark:text-gray-300 leading-8">

                Your current wellbeing indicators suggest a
                healthy emotional balance. Continue practicing
                positive wellness habits to maintain this trend.

              </p>

            </div>

          </motion.div>

        </div>

        {/* Recommendations */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-10 rounded-[32px] bg-white dark:bg-gray-800 shadow-xl p-8"
        >

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">

            🎯 Personalized Wellness Plan

          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300">

            Suggested by Mana AI based on your recent wellness data.

          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {report.recommendations.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl bg-emerald-50 dark:bg-gray-700 p-5"
              >

                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">

                  ✓

                </div>

                <span className="text-gray-700 dark:text-gray-200">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </motion.div>
                {/* Download Report */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-10"
        >

          <div className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-10 text-white shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

              <div>

                <h2 className="text-4xl font-bold">

                  📄 Download Your Wellness Report

                </h2>

                <p className="mt-5 max-w-3xl text-green-100 leading-8">

                  Save your AI-generated wellness report as a PDF
                  to monitor your emotional wellbeing, wellness
                  score, mood trends and personalized
                  recommendations over time.

                </p>

              </div>

              <button
  onClick={() => generateWellnessReport(report)}
  className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-emerald-700 shadow-xl hover:scale-105 transition-all duration-300"
>

                <FaDownload />

                Download PDF

              </button>

            </div>

          </div>

        </motion.div>

        {/* Footer */}

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-5">

            <div>

              <h3 className="font-bold text-gray-900 dark:text-white">

                🌿 ManaSetu AI Wellness Platform

              </h3>

              <p className="mt-2 text-gray-500 dark:text-gray-400">

                Generated using AI-powered mood analysis,
                wellness tracking and personalized insights.

              </p>

            </div>

            <div className="flex gap-6 text-gray-500 dark:text-gray-400">

              <span>🤖 AI</span>

              <span>💚 Wellness</span>

              <span>📊 Analytics</span>

              <span>📄 Report</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default WellnessReport;