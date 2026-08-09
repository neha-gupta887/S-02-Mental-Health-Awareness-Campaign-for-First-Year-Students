/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BreathingCircle from "../components/BreathingCircle";

function BreathingExercise() {
  const phases = [
    { name: "Inhale", duration: 4 },
    { name: "Hold", duration: 4 },
    { name: "Exhale", duration: 6 },
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);

  const [isRunning, setIsRunning] = useState(false);

  const [sessionMinutes, setSessionMinutes] = useState(1);

  const [sessionTimeLeft, setSessionTimeLeft] = useState(60);

  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    setSessionTimeLeft(sessionMinutes * 60);
  }, [sessionMinutes]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        const next = (phaseIndex + 1) % phases.length;
        setPhaseIndex(next);

        return phases[next].duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phaseIndex]);

  useEffect(() => {
    if (!isRunning) return;

    const sessionTimer = setInterval(() => {
      setSessionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(sessionTimer);
          setIsRunning(false);
          setSessionCompleted(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(sessionTimer);
  }, [isRunning]);

  const handleStart = () => {
    setSessionCompleted(false);
    setPhaseIndex(0);
    setTimeLeft(phases[0].duration);
    setSessionTimeLeft(sessionMinutes * 60);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setSessionCompleted(false);
    setIsRunning(false);
    setPhaseIndex(0);
    setTimeLeft(phases[0].duration);
    setSessionTimeLeft(sessionMinutes * 60);
  };

  const progress =
    ((sessionMinutes * 60 - sessionTimeLeft) /
      (sessionMinutes * 60)) *
    100;

  const minutes = Math.floor(sessionTimeLeft / 60);
  const seconds = sessionTimeLeft % 60;
    if (sessionCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-6 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-gray-800"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-4xl text-white"
          >
            🌿
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Well Done!
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            You've completed your{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {sessionMinutes} minute
            </span>{" "}
            breathing session.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Carry this feeling of calm with you.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleStart}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Start Another Session
            </button>
            <Link
              to="/dashboard"
              className="rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Return to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }
    return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl dark:bg-gray-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={phaseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              {phases[phaseIndex].name}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="my-8 flex justify-center">
          <BreathingCircle phase={phases[phaseIndex].name} />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={timeLeft}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-7xl font-bold text-gray-800 dark:text-white"
          >
            {timeLeft}
          </motion.p>
        </AnimatePresence>

        <div className="mt-8">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Session Progress</span>
            <span>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Session Duration
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {[1, 2, 5, 10].map((minute) => (
              <button
                key={minute}
                onClick={() => !isRunning && setSessionMinutes(minute)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  sessionMinutes === minute
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isRunning}
              >
                {minute} min
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {!isRunning ? (
            <button
              onClick={
                sessionTimeLeft === sessionMinutes * 60
                  ? handleStart
                  : handleResume
              }
              className="rounded-xl bg-emerald-600 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700"
            >
              {sessionTimeLeft === sessionMinutes * 60
                ? "▶ Start"
                : "▶ Resume"}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="rounded-xl bg-yellow-500 py-3 text-lg font-semibold text-white transition hover:bg-yellow-600"
            >
              ⏸ Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="rounded-xl bg-gray-200 py-3 text-lg font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default BreathingExercise;
