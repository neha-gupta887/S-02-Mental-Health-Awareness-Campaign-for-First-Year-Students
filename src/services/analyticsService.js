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
    };
  }

  // Current Mood
  const currentMood = moods[0].mood;

  // Count each mood
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

  // Weekly Trend (last 7 mood entries)
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

  return {
    totalEntries: moods.length,
    currentMood,
    mostFrequentMood,
    moodDistribution,
    weeklyTrend,
  };
};