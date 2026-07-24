import { getAchievements } from "../services/achievementService";

function AchievementsCard({ analytics }) {
  const achievements = getAchievements(analytics);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        🏆 Achievements
      </h2>

      {achievements.length === 0 ? (
        <p className="text-gray-500 text-center">
          Start tracking your mood to unlock achievements!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border border-emerald-200 rounded-2xl p-5 hover:shadow-lg transition bg-emerald-50"
            >
              <div className="text-5xl text-center">
                {achievement.icon}
              </div>

              <h3 className="text-lg font-bold text-center mt-3">
                {achievement.title}
              </h3>

              <p className="text-sm text-gray-600 text-center mt-2">
                {achievement.description}
              </p>

              <div className="text-center mt-4">
                <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm">
                  ✅ Unlocked
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AchievementsCard;