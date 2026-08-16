import { FaChartLine } from "react-icons/fa";

function AnalyticsHeader({ analytics }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
        <FaChartLine />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Wellness Analytics
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Explore your mood patterns and wellness journey over time.
        </p>
      </div>
    </div>
  );
}

export default AnalyticsHeader;