import { predictMood } from "../services/moodForecastService";

function MoodForecastCard({ wellnessScore }) {
  const forecast = predictMood(wellnessScore);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-emerald-700">
        📈 Mood Forecast
      </h2>

      <p className="text-gray-600 mt-2">
        AI prediction based on your recent wellness trend.
      </p>

      <div className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-200">

        <h3 className="text-3xl font-bold text-emerald-700">
          {forecast.mood}
        </h3>

        <p className="mt-4">
          <strong>Confidence:</strong> {forecast.confidence}%
        </p>

        <p className="mt-4 text-gray-700">
          <strong>Reason:</strong> {forecast.reason}
        </p>

        <p className="mt-4 text-gray-700">
          <strong>Recommendation:</strong> {forecast.recommendation}
        </p>

      </div>
    </div>
  );
}

export default MoodForecastCard;