import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaWind,
  FaWalking,
  FaGlassWhiskey,
  FaMobileAlt,
  FaBed,
  FaBrain,
  FaPlus,
  FaGraduationCap
} from "react-icons/fa";
import { differenceInCalendarDays, format, isToday, isFuture, startOfToday } from "date-fns";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import useAuth from "../hooks/useAuth";
import { getActiveExam } from "../services/examService";
import LoadingState from "../../LoadingState";

const ExamModeDashboard = () => {
  const [exam, setExam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      const fetchExam = async () => {
        setIsLoading(true);
        try {
          const activeExam = await getActiveExam(user.uid);
          setExam(activeExam);
        } catch (err) {
          console.error("Failed to fetch exam:", err);
          setError("Could not load your exam plan. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchExam();
    }
  }, [user]);

  const calculateDaysToGo = () => {
    if (!exam?.date) return null;
    if (!isFuture(exam.date) && !isToday(exam.date)) return "Exam day has passed";

    const today = startOfToday();
    const days = differenceInCalendarDays(exam.date, today);

    if (days === 0) return "Exam day";
    if (days === 1) return "1 day to go";
    return `${days} days to go`;
  };

  const dailyPlan = [
    { icon: <FaBook />, text: "Focus session (45 mins)", link: null },
    { icon: <FaWind />, text: "Breathing (2 mins)", link: "/breathing" },
    { icon: <FaWalking />, text: "Movement (10 mins)", link: null },
    { icon: <FaGlassWhiskey />, text: "Hydration break", link: null },
    { icon: <FaMobileAlt />, text: "Screen break (5 mins)", link: null },
    { icon: <FaBed />, text: "Wind down for sleep", link: null },
  ];

  if (isLoading) {
    return (
      <AuthenticatedLayout>
        <div className="flex h-96 items-center justify-center">
          <LoadingState message="Loading Exam Mode..." />
        </div>
      </AuthenticatedLayout>
    );
  }
  
  if (!exam) {
    return (
         <AuthenticatedLayout>
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl">
                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-3xl text-white shadow-lg">
                    <FaGraduationCap />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome to Exam Mode</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">No active exam plan found. Let's create one!</p>
                <button
                    onClick={() => navigate('/exam-mode-setup')}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5"
                >
                    <FaPlus /> Create Exam Plan
                </button>
            </div>
        </AuthenticatedLayout>
    )
  }

  const daysToGo = calculateDaysToGo();

  return (
    <AuthenticatedLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                🎓 Exam Mode
              </p>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                {exam.name}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{daysToGo}</p>
              {daysToGo !== "Exam day has passed" && <p className="text-sm text-slate-500">by {format(exam.date, "EEEE, d MMMM")}</p>}
            </div>
          </div>
        </motion.div>

        {/* Today's Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition:{delay: 0.2} }} className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Today's Focus</h2>
          <div className="mt-4 space-y-3">
            {dailyPlan.map((item, index) => (
              <div key={index} className="flex items-center rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
                <div className="text-lg text-emerald-500">{item.icon}</div>
                <p className="ml-4 flex-grow text-slate-700 dark:text-slate-200">{item.text}</p>
                {item.link && <Link to={item.link} className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-white dark:hover:bg-emerald-900">Start</Link>}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Gentle Reminder */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition:{delay: 0.4} }} className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 p-6 text-white shadow-lg">
             <div className="flex items-start gap-4">
                <div className="text-2xl"><FaBrain /></div>
                <div>
                    <h3 className="font-bold">A gentle reminder</h3>
                    <p className="mt-1 text-emerald-100">Focus on the next small step. You don't need to do everything today.</p>
                </div>
             </div>
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ExamModeDashboard;
