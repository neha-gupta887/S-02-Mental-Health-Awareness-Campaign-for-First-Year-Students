import { generateWellnessPlan } from "../services/wellnessPlanService";

function WellnessPlanCard({ wellnessScore }) {
  const plan = generateWellnessPlan(wellnessScore);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-2xl font-bold text-emerald-700">
        🌿 Personalized Wellness Plan
      </h2>

      <p className="text-gray-600 mt-2">
        Based on your current wellness score, here are today's recommendations.
      </p>

      <div className="mt-6 space-y-4">

        {plan.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-200"
          >
            <span className="text-xl">✅</span>

            <span className="text-gray-700 font-medium">
              {item}
            </span>
          </div>

        ))}

      </div>

    </div>
  );
}

export default WellnessPlanCard;