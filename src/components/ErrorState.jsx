import { FaExclamationTriangle, FaSync } from "react-icons/fa";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again.",
  onRetry,
  retryLabel = "Retry",
}) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-300/50 bg-red-50/20 py-12 text-center dark:border-red-700/50 dark:bg-red-950/20">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl text-red-500 shadow-sm dark:bg-slate-800 dark:text-red-400">
        <FaExclamationTriangle />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700"
        >
          <FaSync className="transition-transform duration-300 group-hover:rotate-180" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorState;