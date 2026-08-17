import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const supportOptions = [
  {
    icon: "👥",
    title: "Senior Buddy",
    description:
      "Talk to a senior who understands student life and can listen to you.",
    cta: "Talk to a Senior",
    path: "/support",
  },
  {
    icon: "🧑‍🏫",
    title: "Mentor Connect",
    description: "Connect with a mentor for guidance and support.",
    cta: "Connect with Mentor",
    path: "/support",
  },
  {
    icon: "🩺",
    title: "Counselor",
    description: "Find professional counseling and mental wellness support.",
    cta: "Find a Counselor",
    path: "/support",
  },
];

function HumanSupport() {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur-sm sm:p-7 dark:border-white/[0.06] dark:bg-white/[0.025]">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          🤝 Human Support
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
          Need someone to talk to? You're not alone. Connect with a real person
          who can listen and support you.
        </p>
      </div>

      {/* Support Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {supportOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Link
              to={option.path}
              className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950/40">
                {option.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {option.title}
              </h3>
              <p className="mt-2 flex-grow text-sm leading-6 text-slate-500 dark:text-slate-400">
                {option.description}
              </p>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-emerald-700">
                  {option.cta}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Supportive Message */}
      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Your well-being matters. Reaching out for support is a strength.
      </p>
    </section>
  );
}

export default HumanSupport;