import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const ExamModeCard = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to a new setup page for Exam Mode
    navigate("/exam-mode-setup");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100 p-6 shadow-sm dark:from-slate-800 dark:to-slate-700"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-2xl text-white shadow-md">
          <FaGraduationCap />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Exam Mode
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Preparing for an exam? Create a calmer study and wellness routine.
          </p>
        </div>
      </div>
      <button
        onClick={handleStart}
        className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      >
        Start Exam Mode
      </button>
    </motion.div>
  );
};

export default ExamModeCard;
