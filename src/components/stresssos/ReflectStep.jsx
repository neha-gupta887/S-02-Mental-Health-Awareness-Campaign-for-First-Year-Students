import { motion } from "framer-motion";
import { FaPen, FaLightbulb } from "react-icons/fa";

const ReflectStep = ({ onComplete }) => {
  return (
    <motion.div
      key="reflect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-800"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-3xl text-white shadow-lg">
        <FaLightbulb />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
        Reflect on Your Feelings
      </h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Take a moment to understand what's causing your stress. What are the
        triggers? What can you control?
      </p>
      <div className="mt-8">
        <button
          onClick={onComplete}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <FaPen />
          I've Reflected, Continue
        </button>
      </div>
    </motion.div>
  );
};

export default ReflectStep;