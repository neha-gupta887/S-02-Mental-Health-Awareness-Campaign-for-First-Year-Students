import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaComments, FaPen, FaUsers } from "react-icons/fa";

const CompletionStep = () => {
  const actions = [
    {
      to: "/ai-companion",
      text: "Talk to Mana",
      icon: <FaComments />,
      color: "bg-sky-500",
      shadow: "shadow-sky-500/20",
    },
    {
      to: "/journal",
      text: "Write it down",
      icon: <FaPen />,
      color: "bg-amber-500",
      shadow: "shadow-amber-500/20",
    },
    {
      to: "/support",
      text: "Human Support",
      icon: <FaUsers />,
      color: "bg-red-500",
      shadow: "shadow-red-500/20",
    },
  ];

  return (
    <motion.div
      key="completion"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-800"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-5xl text-white shadow-lg">
        <FaLeaf />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
        You made space for yourself.
      </h2>
      <p className="mt-4 text-lg italic text-slate-500 dark:text-slate-400">
        "There's no need to solve everything at once."
      </p>

      <div className="mt-8 space-y-4">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`group flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${action.color} ${action.shadow}`}
          >
            {action.icon}
            <span>{action.text}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default CompletionStep;
