import { FaArrowRight, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Talk to Mana",
    description: "A private space to talk, reflect, and receive personalized wellness guidance.",
    path: "/chat",
    icon: "✦",
    label: "AI Companion",
  },
  {
    title: "Write it down",
    description: "Put your thoughts into words and give yourself space to understand how you feel.",
    path: "/journal",
    icon: "◌",
    label: "Smart Journal",
  },
  {
    title: "Find your calm",
    description: "Slow down with guided breathing and simple mindfulness exercises.",
    path: "/breathing",
    icon: "〰",
    label: "Meditation",
  },
  {
    title: "See your journey",
    description: "Explore your mood patterns, wellness trends, and personal insights.",
    path: "/analytics",
    icon: "↗",
    label: "Analytics",
  },
];

function QuickActions() {
  return (
    <section>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 border-l-4 border-emerald-500 pl-4 sm:flex-row sm:items-end sm:justify-between sm:pl-5">

        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-sm text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <FaMagic />
             </span>

            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Your space
            </p>
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            What do you need right now?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Choose a space that feels right for you. No pressure, just one
            small step at a time.
          </p>
        </div>

      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
            }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Link
              to={action.path}
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_10px_32px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-emerald-200 hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-emerald-900/50 dark:focus-visible:ring-offset-slate-900 sm:p-6"
            >

              {/* Very subtle background glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl transition-all duration-500 group-hover:bg-emerald-200/60 dark:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10" />

              {/* Icon */}
              <div className="relative flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 text-xl font-semibold text-emerald-600 transition-all duration-300 group-hover:scale-105 group-hover:from-emerald-100 group-hover:to-teal-100 dark:border-emerald-900/40 dark:from-emerald-950/30 dark:to-teal-950/20 dark:text-emerald-400">
                  {action.icon}
                </div>

                <span className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-slate-500">
                  {action.label}
                </span>

              </div>

              {/* Content */}
              <div className="relative mt-7 flex-grow">

                <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 line-clamp-3">
                  {action.description}
                </p>

              </div>

              {/* Action Arrow */}
              <div className="mt-4 flex justify-end">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-emerald-500">
                  <FaArrowRight className="text-xs" />
                </div>
              </div>

            </Link>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export default QuickActions;