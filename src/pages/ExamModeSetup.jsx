import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import useAuth from "../hooks/useAuth";
import { setExam } from "../services/examService";
import { isPast, startOfToday } from 'date-fns';

const ExamModeSetup = () => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [feeling, setFeeling] = useState("Manageable");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const feelings = [
    { label: "Manageable", icon: <FaSmile className="text-green-500" />, value: "Manageable" },
    { label: "A little stressed", icon: <FaMeh className="text-yellow-500" />, value: "Stressed" },
    { label: "Overwhelmed", icon: <FaFrown className="text-red-500" />, value: "Overwhelmed" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!examName.trim()) {
      setError("Please enter a name for your exam.");
      return;
    }
    if (!examDate) {
      setError("Please select a date for your exam.");
      return;
    }
    if (isPast(new Date(examDate))) {
        setError("The exam date cannot be in the past.");
        return;
    }


    setIsSaving(true);
    try {
      await setExam(user.uid, {
        name: examName,
        date: new Date(examDate),
        feeling,
      });
      navigate("/exam-mode");
    } catch (err) {
      console.error("Failed to save exam:", err);
      setError("Could not save your exam plan. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-800"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-3xl text-white shadow-lg">
            <FaGraduationCap />
          </div>
          <h1 className="text-center text-3xl font-bold text-slate-800 dark:text-white">
            Set Up Exam Mode
          </h1>
          <p className="mt-2 text-center text-slate-600 dark:text-slate-300">
            Let's create a calm, focused plan for your upcoming exam.
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-100 p-3 text-center text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="examName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Exam / Test Name
              </label>
              <div className="relative mt-2">
                <input
                  id="examName"
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g., Data Structures Final"
                  className="w-full rounded-xl border-slate-300 p-4 text-slate-900 transition focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="examDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Exam Date
              </label>
              <div className="relative mt-2">
                <input
                  id="examDate"
                  type="date"
                  value={examDate}
                  min={startOfToday().toISOString().split('T')[0]}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full rounded-xl border-slate-300 p-4 text-slate-900 transition focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                How are you feeling about it?
              </span>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {feelings.map((f) => (
                  <button
                    type="button"
                    key={f.value}
                    onClick={() => setFeeling(f.value)}
                    className={`flex items-center justify-center gap-3 rounded-xl p-4 text-sm font-semibold ring-2 ring-transparent transition ${
                      feeling === f.value
                        ? "bg-emerald-100 text-emerald-800 ring-emerald-500 dark:bg-emerald-900/50 dark:text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {f.icon}
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Creating Plan..." : "Create My Plan"}
            </button>
          </form>
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ExamModeSetup;
