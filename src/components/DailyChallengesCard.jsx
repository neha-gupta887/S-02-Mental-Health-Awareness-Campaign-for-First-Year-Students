import { useState } from "react";
import { getDailyChallenges } from "../services/challengeService";

function DailyChallengesCard() {
  const [challenges, setChallenges] = useState(getDailyChallenges());

  const toggleChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    );
  };

  const completedCount = challenges.filter(
    (challenge) => challenge.completed
  ).length;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-emerald-700">
        🎯 Daily Wellness Challenges
      </h2>

      <p className="text-gray-600 mt-2">
        Complete today's healthy habits and build your wellness streak.
      </p>

      <div className="mt-6 space-y-4">
        {challenges.map((challenge) => (
          <label
            key={challenge.id}
            className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={challenge.completed}
              onChange={() => toggleChallenge(challenge.id)}
              className="w-5 h-5"
            />

            <span
              className={`${
                challenge.completed
                  ? "line-through text-gray-500"
                  : "text-gray-700"
              }`}
            >
              {challenge.title}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-emerald-700">
          Progress: {completedCount}/{challenges.length}
        </p>

        {completedCount === challenges.length && (
          <p className="mt-3 text-green-600 font-bold">
            🎉 Congratulations! You completed all today's challenges.
          </p>
        )}
      </div>
    </div>
  );
}

export default DailyChallengesCard;