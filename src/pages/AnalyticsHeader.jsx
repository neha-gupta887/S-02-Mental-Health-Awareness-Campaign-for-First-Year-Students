import { FaChartLine, FaDownload } from "react-icons/fa";
import { downloadWellnessReport } from "../../services/pdfService";

function AnalyticsHeader({ analytics }) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-6 text-white shadow-xl sm:p-8 lg:p-10">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-cyan-200/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-3xl backdrop-blur-md">
              <FaChartLine />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold">Wellness Analytics</h1>
              <p className="mt-2 text-lg text-emerald-100">
                Your journey of self-awareness and growth.
              </p>
            </div>
          </div>
          <button
            onClick={() => downloadWellnessReport(analytics)}
            className="inline-flex items-center gap-3 rounded-xl bg-white/20 px-5 py-3 font-semibold backdrop-blur-md transition hover:bg-white/30"
          >
            <FaDownload />
            Download Report
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Wellness Score"
            value={`${analytics.wellnessScore}%`}
          />
          <StatCard
            label="Current Mood"
            value={analytics.currentMood}
          />
          <StatCard
            label="Day Streak"
            value={analytics.streak}
          />
          <StatCard
            label="Total Entries"
            value={analytics.totalEntries}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
      <p className="text-sm font-medium text-emerald-100">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default AnalyticsHeader;