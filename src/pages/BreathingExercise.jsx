/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaLeaf, FaPause, FaPlay, FaRedo } from "react-icons/fa";

function BreathingExercise() {
  const phases = [
    { name: "Inhale", duration: 4 },
    { name: "Hold", duration: 4 },
    { name: "Exhale", duration: 6 },
  ];

  const shouldReduceMotion = useReducedMotion();

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);

  const [isRunning, setIsRunning] = useState(false);

  const [sessionMinutes, setSessionMinutes] = useState(1);

  const [sessionTimeLeft, setSessionTimeLeft] = useState(60);

  const [sessionCompleted, setSessionCompleted] = useState(false);

  const currentPhase = useMemo(() => phases[phaseIndex], [phaseIndex]);
  const phaseText = useMemo(() => {
    if (currentPhase.name === "Inhale") return "Breathe In";
    if (currentPhase.name === "Exhale") return "Breathe Out";
    return "Hold";
  }, [currentPhase]);

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

  useEffect(() => {
    setSessionTimeLeft(sessionMinutes * 60);
  }, [sessionMinutes]);

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
      <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-6 dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-800"
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Well Done!
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
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
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Start Another Session
            </button>
            <Link
              to="/dashboard"
              className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              Return to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 p-4 transition-colors duration-300 dark:bg-slate-900">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl dark:bg-teal-500/10" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="w-full max-w-md mx-auto">
          {/* Breathing Visualization */}
          <div className="relative flex h-80 w-full items-center justify-center">
            <motion.div
              key={phaseIndex}
              animate={{
                scale: shouldReduceMotion ? 1 : currentPhase.name === "Inhale" ? 1.1 : currentPhase.name === "Hold" ? 1.1 : 1,
              }}
              transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
              className="absolute h-72 w-72 rounded-full border-[10px] border-emerald-200/80 bg-emerald-100/50 shadow-inner shadow-emerald-300/20 dark:border-emerald-800/50 dark:bg-emerald-900/20 dark:shadow-emerald-950/20"
            />
            <motion.div
              key={`${phaseIndex}-2`}
              animate={{
                scale: shouldReduceMotion ? 1 : currentPhase.name === "Inhale" ? 1.15 : currentPhase.name === "Hold" ? 1.15 : 1,
              }}
              transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
              className="absolute h-80 w-80 rounded-full border-2 border-dashed border-emerald-300/50 dark:border-emerald-700/50"
            />

            <div className="relative flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={phaseIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  {phaseText}
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={timeLeft}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="text-8xl font-bold tracking-tighter text-slate-800 dark:text-white"
                >
                  {String(timeLeft).padStart(2, "0")}
                </motion.p>
              </AnimatePresence>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Slow down. Let your breath guide you.
              </p>
            </div>
          </div>

          {/* Session Duration */}
          <div className="mt-8">
            <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-300">
              Session Duration
            </p>
            <div className="mt-3 flex justify-center gap-2 rounded-full bg-slate-100 p-1.5 dark:bg-slate-800">
              {[1, 2, 5, 10].map((minute) => (
                <button
                  key={minute}
                  onClick={() => !isRunning && setSessionMinutes(minute)}
                  className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
                    sessionMinutes === minute
                      ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                  disabled={isRunning}
                >
                  {minute} min
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 grid grid-cols-5 items-center gap-4">
            <div className="col-span-1 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="col-span-3 flex justify-center">
              {!isRunning ? (
                <button
                  onClick={
                    sessionTimeLeft === sessionMinutes * 60
                      ? handleStart
                      : handleResume
                  }
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-xl text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:scale-110 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50"
                  aria-label={sessionTimeLeft === sessionMinutes * 60 ? "Start session" : "Resume session"}
                >
                  <FaPlay />
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-xl text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-110 hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
                  aria-label="Pause session"
                >
                  <FaPause />
                </button>
              )}
            </div>
            <div className="col-span-1 flex justify-end">
              <button
                onClick={handleReset}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm text-slate-600 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                aria-label="Reset session"
              >
                <FaRedo />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto mt-12 max-w-sm rounded-2xl border border-emerald-200/50 bg-white/60 p-5 shadow-sm backdrop-blur-sm dark:border-emerald-800/30 dark:bg-white/[0.04]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <FaLeaf />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">
                Why breathing helps
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Slow, intentional breathing can help you pause, reconnect with
                your body, and create a moment of calm.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BreathingExercise;
