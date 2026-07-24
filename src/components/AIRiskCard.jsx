import { detectRisk } from "../services/riskDetectionService";
import { getMoodHistory } from "../services/moodService";
import { useEffect, useState } from "react";

function AIRiskCard() {
  const [risk, setRisk] = useState({
    level: "Low",
    message: "Loading...",
  });

  useEffect(() => {
    const loadRisk = async () => {
      const moods = await getMoodHistory();
      const result = detectRisk(moods);
      setRisk(result);
    };

    loadRisk();
  }, []);

  const bgColor =
    risk.level === "High"
      ? "bg-red-100 border-red-400"
      : risk.level === "Moderate"
      ? "bg-yellow-100 border-yellow-400"
      : "bg-green-100 border-green-400";

  const textColor =
    risk.level === "High"
      ? "text-red-700"
      : risk.level === "Moderate"
      ? "text-yellow-700"
      : "text-green-700";

  const icon =
    risk.level === "High"
      ? "🚨"
      : risk.level === "Moderate"
      ? "⚠️"
      : "✅";

  return (
    <div className={`${bgColor} border-2 rounded-3xl shadow-lg p-8 mt-10`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>
        {icon} AI Risk Assessment
      </h2>

      <div className="mt-5">
        <p className="text-lg">
          <strong>Risk Level:</strong> {risk.level}
        </p>

        <p className="mt-4 text-gray-700 leading-7">
          {risk.message}
        </p>
      </div>
    </div>
  );
}

export default AIRiskCard;