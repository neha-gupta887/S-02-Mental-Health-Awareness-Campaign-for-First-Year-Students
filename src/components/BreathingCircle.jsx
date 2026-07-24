function BreathingCircle({ phase }) {
  let scale = "scale-100";
  let color = "bg-blue-500";

  if (phase === "Inhale") {
    scale = "scale-150";
    color = "bg-green-500";
  } else if (phase === "Hold") {
    scale = "scale-150";
    color = "bg-yellow-500";
  } else if (phase === "Exhale") {
    scale = "scale-100";
    color = "bg-blue-500";
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          ${color}
          ${scale}
          w-40 h-40 rounded-full
          transition-all duration-1000 ease-in-out
          shadow-2xl
        `}
      />
    </div>
  );
}

export default BreathingCircle;