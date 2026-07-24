import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        const nextIndex = (phaseIndex + 1) % phases.length;
        setPhaseIndex(nextIndex);
        return phases[nextIndex].duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phaseIndex]);

  const handleStart = () => {
    setPhaseIndex(0);
    setTimeLeft(phases[0].duration);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setTimeLeft(phases[0].duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-bold text-green-700 mb-3">
        🌿 Guided Breathing
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Relax your mind by following the breathing cycle.
      </p>

      <BreathingCircle phase={phases[phaseIndex].name} />

      <h2 className="text-3xl font-semibold mt-10 text-gray-800">
        {phases[phaseIndex].name}
      </h2>

      <p className="text-5xl font-bold text-green-700 mt-4">
        {timeLeft}
      </p>

      <div className="flex gap-5 mt-10">
        <button
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg"
        >
          ▶ Start
        </button>

        <button
          onClick={handleStop}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl text-lg"
        >
          ■ Stop
        </button>
      </div>
    </div>
  );
}

export default BreathingExercise;