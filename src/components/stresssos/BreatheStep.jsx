import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BreatheStep = ({ onComplete }) => {
  // Simplified phases for the SOS context
  const phases = useMemo(() => [
    { name: "Inhale", duration: 4 },
    { name: "Hold", duration: 4 },
    { name: "Exhale", duration: 6 },
    { name: "Hold", duration: 2 },
  ], []);

  const totalCycles = 5; // A short session of 5 cycles
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentPhase = useMemo(() => phases[phaseIndex], [phases, phaseIndex]);
  
  const phaseText = useMemo(() => {
    if (currentPhase.name === "Inhale") return "Breathe In";
    if (currentPhase.name === "Exhale") return "Breathe Out";
    return "Hold";
  }, [currentPhase]);

  // Main timer logic
  useEffect(() => {
    if (isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Move to the next phase
        const nextPhaseIndex = (phaseIndex + 1) % phases.length;
        setPhaseIndex(nextPhaseIndex);

        // Check if a full cycle has passed (Inhale -> Hold -> Exhale -> Hold)
        if (nextPhaseIndex === 0) {
          const newCyclesCompleted = cyclesCompleted + 1;
          setCyclesCompleted(newCyclesCompleted);
          if (newCyclesCompleted >= totalCycles) {
            setIsCompleted(true);
          }
        }
        
        return phases[nextPhaseIndex].duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phaseIndex, cyclesCompleted, isCompleted, phases, totalCycles]);


  const circleVariants = {
    inhale: { scale: 1.15 },
    hold: { scale: 1.15 },
    exhale: { scale: 1 },
  };

  const animationState = currentPhase.name.toLowerCase();

  return (
    <motion.div
      key="breathe"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7 }}
      className="relative flex w-full max-w-lg flex-col items-center justify-center text-center"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-teal-300/30 blur-3xl dark:bg-teal-500/10" />

      <AnimatePresence mode="wait">
        {isCompleted ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Nice work.</h2>
            <p className="text-emerald-200 mb-8">Let's reconnect with the present.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-white text-emerald-800 font-semibold rounded-full px-8 py-3 shadow-lg"
            >
              Continue
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Let's slow things down.</h2>
            <p className="text-emerald-200 mb-8">Follow the rhythm for a few gentle breaths.</p>

            <div className="relative mb-8 flex h-80 w-80 items-center justify-center">
              <motion.div
                className="absolute h-full w-full rounded-full bg-gradient-to-br from-emerald-500/80 to-teal-500/70 shadow-2xl shadow-teal-500/20"
                animate={animationState}
                variants={circleVariants}
                transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-[90%] w-[90%] rounded-full bg-gradient-to-br from-emerald-500/50 to-teal-500/40 opacity-80"
                animate={animationState}
                variants={circleVariants}
                transition={{ duration: currentPhase.duration, ease: "easeInOut", delay: 0.1 }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={phaseText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-white/90"
                  >
                    {phaseText}
                  </motion.h3>
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
             <p className="h-12 text-emerald-200/80">
              Cycle {cyclesCompleted + 1} of {totalCycles}
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BreatheStep;
