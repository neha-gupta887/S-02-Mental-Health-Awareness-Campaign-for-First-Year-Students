function AIInsightsCard({ analytics }) {
  if (!analytics || analytics.totalEntries === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
        <h2 className="text-2xl font-bold text-emerald-700">
          🧠 AI Wellness Insight
        </h2>

        <p className="mt-4 text-gray-600">
          Start logging your mood to receive personalized AI insights.
        </p>
      </div>
    );
  }

  let insight = "";
  let recommendation = "";
  let risk = "🟢 Low";

  switch (analytics.currentMood) {
    case "Happy":
      insight =
        "You've been feeling positive recently. Keep maintaining your healthy habits.";
      recommendation =
        "Continue journaling, meditation, and staying connected with friends.";
      break;

    case "Calm":
      insight =
        "You're maintaining emotional balance. That's a great sign.";
      recommendation =
        "Keep practicing mindfulness and regular breathing exercises.";
      break;

    case "Neutral":
      insight =
        "Your mood has been stable. A little self-care can boost your wellbeing.";
      recommendation =
        "Go for a short walk, listen to music, or write in your journal.";
      break;

    case "Sad":
      insight =
        "You've recently reported feeling sad.";
      recommendation =
        "Try a breathing session, journal your thoughts, and consider talking to someone you trust.";
      risk = "🟡 Moderate";
      break;

    case "Stressed":
      insight =
        "Your recent mood indicates elevated stress.";
      recommendation =
        "Take a break, do a breathing exercise, stay hydrated, and reduce screen time for a while.";
      risk = "🔴 High";
      break;

    default:
      insight =
        "Keep tracking your mood regularly to receive more accurate insights.";
      recommendation =
        "Log your mood daily.";
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-2xl font-bold text-emerald-700">
        🧠 AI Wellness Insight
      </h2>

      <p className="mt-5 text-gray-700">
        {insight}
      </p>

      <div className="mt-6 bg-emerald-50 rounded-2xl p-5">
        <h3 className="font-semibold text-emerald-700">
          💡 Recommendation
        </h3>

        <p className="mt-2 text-gray-700">
          {recommendation}
        </p>
      </div>

      <div className="mt-5">
        <span className="font-semibold">
          Risk Level:
        </span>{" "}
        {risk}
      </div>

    </div>
  );
}

export default AIInsightsCard;