import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaPause, FaPlay, FaTimes, FaLeaf } from "react-icons/fa";

const BreatheStep = ({ onComplete }) => {
  const phases = useMemo(
    () => [
      { name: "Inhale", duration: 4, instruction: "Breathe in slowly..." },
      { name: "Hold", duration: 4, instruction: "Stay here for a moment..." },
      { name: "Exhale", duration: 6, instruction: "Let it gently go..." },
    ],
    []
  );

  const totalCycles = 3;
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const currentPhase = useMemo(() => phases[phaseIndex], [phases, phaseIndex]);
  const phaseText = useMemo(() => {
    if (currentPhase.name === "Inhale") return "INHALE";
    if (currentPhase.name === "Exhale") return "EXHALE";
    return "HOLD";
  }, [currentPhase]);

  useEffect(() => {
    if (isPaused || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        const nextPhaseIndex = (phaseIndex + 1) % phases.length;
        if (nextPhaseIndex === 0) {
          const newCyclesCompleted = cyclesCompleted + 1;
          if (newCyclesCompleted >= totalCycles) {
            setIsCompleted(true);
            return phases[nextPhaseIndex].duration;
          }
          setCyclesCompleted(newCyclesCompleted);
        }
        setPhaseIndex(nextPhaseIndex);
        return phases[nextPhaseIndex].duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    phaseIndex,
    cyclesCompleted,
    isCompleted,
    isPaused,
    phases,
    totalCycles,
  ]);

  const progress = (cyclesCompleted / totalCycles) * 100 + (100 / totalCycles) * ((phases[phaseIndex].duration - timeLeft) / phases[phaseIndex].duration);

  const animationState = currentPhase.name.toLowerCase();
  const circleVariants = {
    inhale: { scale: 1.1, filter: "blur(40px)", opacity: 0.5 },
    hold: { scale: 1.1, filter: "blur(40px)", opacity: 0.5 },
    exhale: { scale: 1, filter: "blur(80px)", opacity: 0.3 },
  };
  
  const orbVariants = {
    inhale: { scale: 1.15 },
    hold: { scale: 1.15 },
    exhale: { scale: 1 },
  }

  if (isCompleted) {
    return (
      <motion.div
        key="completed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex w-full max-w-lg flex-col items-center text-center"
      >
        <motion.div 
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-4xl text-white shadow-lg"
            initial={{scale: 0, rotate: -90}}
            animate={{scale: 1, rotate: 0}}
            transition={{type: 'spring', stiffness: 260, damping: 20, delay: 0.8}}
        >
          <FaLeaf />
        </motion.div>
        <h2 className="text-3xl font-bold text-white">Nice work.</h2>
        <p className="mt-2 text-lg text-emerald-200">
          You gave yourself a moment to slow down.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-emerald-800 shadow-lg"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white">
        {/* Ambient Background */}
        <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            animate={animationState}
            variants={{
                inhale: { opacity: 1 },
                hold: { opacity: 1 },
                exhale: { opacity: 0.8 },
            }}
            transition={{ duration: 4, ease: 'easeInOut' }}
        >
            <motion.div 
                className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-emerald-500/80" 
                animate={animationState}
                variants={circleVariants}
                transition={{ duration: currentPhase.duration, ease: 'easeInOut' }}
            />
            <motion.div 
                className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-teal-500/80" 
                animate={animationState}
                variants={circleVariants}
                transition={{ duration: currentPhase.duration, ease: 'easeInOut', delay: 0.2 }}
            />
        </motion.div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-between p-6 sm:p-8">
            {/* Header Text & Progress */}
            <div className="flex w-full max-w-md flex-col items-center text-center">
                <h1 className="text-2xl font-semibold text-white/90">Let's slow things down.</h1>
                <p className="mt-4 text-emerald-200/90">ROUND {cyclesCompleted + 1} OF {totalCycles}</p>
            </div>

            {/* Breathing Orb */}
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/80 to-teal-500/70 shadow-2xl shadow-teal-500/20"
                    animate={shouldReduceMotion ? {} : orbVariants[animationState]}
                    transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
                />
                <div className="relative z-10 flex flex-col items-center">
                    <AnimatePresence mode="wait">
                    <motion.h2
                        key={phaseText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-semibold uppercase tracking-widest text-white/80"
                    >
                        {phaseText}
                    </motion.h2>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                    <motion.p
                        key={timeLeft}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="text-8xl font-bold tracking-tighter text-white"
                    >
                        {timeLeft}
                    </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Text, Controls & Progress Bar */}
            <div className="flex w-full max-w-md flex-col items-center text-center">
                 <p className="h-6 text-emerald-200/90">{currentPhase.instruction}</p>
                <div className="my-6 grid grid-cols-3 items-center gap-4">
                    <button onClick={onComplete} aria-label="Exit" className="flex justify-center items-center h-12 w-12 rounded-full text-white/50 transition-colors hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50">
                        <FaTimes size={20} />
                    </button>
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        aria-label={isPaused ? "Resume" : "Pause"}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        {isPaused ? <FaPlay size={20} /> : <FaPause size={20} />}
                    </button>
                    <div className="w-12"></div> {/* Spacer */}
                </div>
                 <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                    <motion.div
                    className="h-full rounded-full bg-emerald-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default BreatheStep;
