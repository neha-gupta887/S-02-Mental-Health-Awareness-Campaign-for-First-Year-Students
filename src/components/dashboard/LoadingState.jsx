import { FaLeaf } from "react-icons/fa";

function LoadingState({
  message = "Loading...",
  className = "py-12",
  size = "default",
}) {
  const sizeClasses = {
    small: "h-8 w-8 text-lg",
    default: "h-12 w-12 text-xl",
    large: "h-16 w-16 text-2xl",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]}`}
      >
        <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-500 dark:border-emerald-800 dark:border-t-emerald-400" />
        <FaLeaf className="animate-pulse text-emerald-500 dark:text-emerald-400" />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
}

export default LoadingState;