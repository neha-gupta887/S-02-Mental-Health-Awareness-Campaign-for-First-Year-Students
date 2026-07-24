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

        const next = (phaseIndex + 1) % phases.length;
        setPhaseIndex(next);
        return phases[next].duration;
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">

        <h1 className="text-4xl font-bold text-center text-emerald-700">
          🌿 Guided Breathing
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Relax your mind with a calm breathing exercise.
        </p>

        <div className="mt-12 flex justify-center">
          <BreathingCircle phase={phases[phaseIndex].name} />
        </div>

        <h2 className="text-center text-3xl font-bold mt-10 text-gray-800">
          {phases[phaseIndex].name}
        </h2>

        <p className="text-center text-6xl font-extrabold text-emerald-600 mt-4">
          {timeLeft}
        </p>

        <div className="mt-10">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                phases[phaseIndex].name === "Inhale"
                  ? "bg-green-500 w-1/3"
                  : phases[phaseIndex].name === "Hold"
                  ? "bg-yellow-400 w-2/3"
                  : "bg-blue-500 w-full"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10">

          <button
            onClick={handleStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            ▶ Start
          </button>

          <button
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            ■ Stop
          </button>

        </div>

        <div className="mt-10 bg-emerald-50 rounded-2xl p-5 border border-emerald-100">

          <h3 className="text-lg font-semibold text-emerald-700">
            🌸 Breathing Guide
          </h3>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li>🟢 Inhale gently for 4 seconds.</li>
            <li>🟡 Hold your breath for 4 seconds.</li>
            <li>🔵 Exhale slowly for 6 seconds.</li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default BreathingExercise;