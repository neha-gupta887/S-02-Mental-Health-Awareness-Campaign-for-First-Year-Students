import {
  FaLeaf,
  FaHeart,
  FaSpa,
  FaSun,
  FaCalendarAlt,
  FaSync,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardHero({ stats, greeting, dailyMessage, onRefresh, isRefreshing, }) {
  // Today's Date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Daily Affirmations
  const affirmations = [
    "💚 You have survived every difficult day so far.",
    "🌿 Small progress is still progress.",
    "✨ Rest is productive too.",
    "🌸 Your feelings are valid.",
    "🌈 Be proud of how far you've come.",
    "☀️ Every new day is a fresh beginning.",
    "🍃 Breathe. Slow down. You've got this.",
  ];

  const affirmation =
    affirmations[new Date().getDate() % affirmations.length];

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-6 text-white shadow-xl sm:p-8 lg:p-10">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-cyan-200/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-green-200/10 blur-3xl" />

      <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <FaLeaf />
              Your Safe Wellness Space
            </span>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="group inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md transition-colors duration-300 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Refresh dashboard data"
            >
              <FaSync className={isRefreshing ? "animate-spin" : "transition-transform group-hover:rotate-90"} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>

          <div className="mt-8">
            <p className="text-lg font-medium text-emerald-100">
              {greeting}
            </p>

            <div className="mt-2 flex items-center gap-2 text-emerald-100">
              <FaCalendarAlt />
              <span>{today}</span>
            </div>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            How is your heart feeling today? 💚
          </h1>

          <p className="mt-6 text-lg leading-8 text-emerald-50">
            ManaSetu is your personal wellness companion. Slow down. Take a
            deep breath. Reflect on your emotions, celebrate your progress,
            and remember—you don't have to figure everything out today.
          </p>

          {/* Daily Message */}
          <div className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <FaSun />

              <h3 className="font-semibold">
                Today's Wellness Message
              </h3>
            </div>

            <p className="mt-4">{dailyMessage}</p>

            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="text-sm uppercase tracking-wider text-emerald-100">
                Daily Affirmation
              </p>

              <p className="mt-2 text-lg font-semibold">
                {affirmation}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid shrink-0 grid-cols-2 gap-4 sm:gap-6">
          <StatCard
            title="Today's Wellness"
            value={`${stats?.wellnessScore ?? 0}%`}
            icon="💚"
          />

          <StatCard
            title="Self-Care Journey"
            value={stats?.streak ?? 0}
            icon="🌱"
          />

          <StatCard
            title="Journal Entries"
            value={stats?.journalEntries ?? 0}
            icon="📖"
          />

          <StatCard
            title="Wellness Check-ins"
            value={stats?.totalMoodEntries ?? 0}
            icon="🤖"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="min-w-[140px] rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
      <div className="text-3xl">{icon}</div>

      <p className="mt-4 text-sm font-medium text-emerald-100">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
        {value}
      </h2>
    </div>
  );
}

export default DashboardHero;