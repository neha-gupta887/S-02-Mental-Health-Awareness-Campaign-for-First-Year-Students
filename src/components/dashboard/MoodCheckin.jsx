import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaCheckCircle, FaLeaf } from "react-icons/fa";

import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { saveMood } from "../../services/moodService";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-green-400" },
  { emoji: "😌", label: "Calm", color: "bg-blue-400" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-400" },
  { emoji: "😔", label: "Sad", color: "bg-indigo-400" },
  { emoji: " stressed", label: "Stressed", color: "bg-orange-400" },
  { emoji: "😠", label: "Angry", color: "bg-red-400" },
];

function MoodCheckin() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast.error("Please select a mood first.");
      return;
    }

    setLoading(true);
    const success = await saveMood(selectedMood, note);

    if (success) {
      setSubmitted(true);
      toast.success("Mood saved successfully!");
    } else {
      toast.error("Failed to save mood. Please try again.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setNote("");
    setSubmitted(false);
  };

  return (
    <AuthenticatedLayout>
      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-gray-800"
            >
              <FaCheckCircle className="text-7xl text-emerald-500" />
              <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
                Thank You for Checking In
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Taking a moment to acknowledge your feelings is a wonderful act
                of self-care.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleReset}
                  className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Check In Again
                </button>
                <Link
                  to="/dashboard"
                  className="rounded-xl bg-gray-200 px-8 py-3 font-semibold text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                >
                  Back to Dashboard
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <FaLeaf /> Daily Check-in
                </span>
                <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                  How are you feeling right now?
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                  Take a moment to connect with your emotions. There's no right
                  or wrong answer.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {moods.map((mood) => (
                  <motion.div
                    key={mood.label}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleSelectMood(mood)}
                      className={`w-full rounded-2xl p-6 text-center transition-all duration-300 ${
                        selectedMood?.label === mood.label
                          ? "ring-4 ring-emerald-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-gray-900"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div className="text-6xl">{mood.emoji}</div>
                      <p className="mt-3 font-semibold text-gray-800 dark:text-white">
                        {mood.label}
                      </p>
                    </button>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {selectedMood && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-10 overflow-hidden"
                  >
                    <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-800">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add a note (optional)
                      </h2>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        What's on your mind? Adding context can help you
                        understand your feelings better over time.
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={4}
                        placeholder={`I'm feeling ${selectedMood.label.toLowerCase()} because...`}
                        className="mt-4 w-full rounded-xl border-gray-300 bg-gray-50 p-4 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedMood || loading}
                  className="rounded-2xl bg-emerald-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save My Mood"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthenticatedLayout>
  );
}

export default MoodCheckin;