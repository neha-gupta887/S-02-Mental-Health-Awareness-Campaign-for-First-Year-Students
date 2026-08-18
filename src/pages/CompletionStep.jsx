import { motion } from "framer-motion";
import { FaLeaf, FaRobot, FaPenFancy, FaHandsHelping } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompletionStep = () => {
  const navigate = useNavigate();

  const handleTalkToMana = () => {
    navigate("/ai-companion");
  };

  const handleWriteItDown = () => {
    navigate("/journal");
  };

  const handleHumanSupport = () => {
    navigate("/support");
  };

  return (
    <motion.div
      key="completion"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-800"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-3xl text-white shadow-lg">
        <FaLeaf />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
        You made space for yourself.
      </h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        "There's no need to solve everything at once."
      </p>
      <div className="mt-8 space-y-4">
        <button
          onClick={handleTalkToMana}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <FaRobot />
          Talk to Mana
        </button>
        <button
          onClick={handleWriteItDown}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700"
        >
          <FaPenFancy />
          Write it down
        </button>
        <button
          onClick={handleHumanSupport}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          <FaHandsHelping />
          Human Support
        </button>
      </div>
    </motion.div>
  );
};

export default CompletionStep;