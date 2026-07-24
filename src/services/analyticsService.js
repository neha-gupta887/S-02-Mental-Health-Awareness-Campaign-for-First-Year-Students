import { getMoodHistory } from "./moodService";

export const getMoodAnalytics = async () => {
  const moods = await getMoodHistory();

  if (!moods.length) {
    return {
      totalEntries: 0,
      currentMood: "No Data",
      mostFrequentMood: "No Data",
      moodDistribution: [],
      weeklyTrend: [],
      streak: 0,
    };
  }

  // Current Mood
  const currentMood = moods[0].mood;

  // Mood Count
  const moodCount = {};

  moods.forEach((item) => {
    moodCount[item.mood] = (moodCount[item.mood] || 0) + 1;
  });

  const moodDistribution = Object.keys(moodCount).map((mood) => ({
    name: mood,
    value: moodCount[mood],
  }));

  // Most Frequent Mood
  let mostFrequentMood = "";
  let max = 0;

  Object.entries(moodCount).forEach(([mood, count]) => {
    if (count > max) {
      max = count;
      mostFrequentMood = mood;
    }
  });

  // Weekly Trend
  const weeklyTrend = moods
    .slice(0, 7)
    .reverse()
    .map((item) => ({
      day: item.createdAt?.toDate().toLocaleDateString("en-US", {
        weekday: "short",
      }),
      mood:
        item.mood === "Happy"
          ? 5
          : item.mood === "Calm"
          ? 4
          : item.mood === "Neutral"
          ? 3
          : item.mood === "Sad"
          ? 2
          : 1,
    }));

  // Daily Streak
  const uniqueDays = [
    ...new Set(
      moods.map((item) =>
        item.createdAt?.toDate().toISOString().split("T")[0]
      )
    ),
  ];

  uniqueDays.sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;

  if (uniqueDays.length > 0) {
    let expectedDate = new Date();

    expectedDate.setHours(0, 0, 0, 0);

    for (const day of uniqueDays) {
      const current = new Date(day);
      current.setHours(0, 0, 0, 0);

      if (current.getTime() === expectedDate.getTime()) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return {
    totalEntries: moods.length,
    currentMood,
    mostFrequentMood,
    moodDistribution,
    weeklyTrend,
    streak,
  };
};