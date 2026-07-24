export const getAchievements = (analytics) => {
  const achievements = [];

  if (analytics.totalEntries >= 1) {
    achievements.push({
      id: 1,
      title: "First Mood Logged",
      icon: "🌱",
      description: "You logged your first mood.",
      unlocked: true,
    });
  }

  if (analytics.totalEntries >= 10) {
    achievements.push({
      id: 2,
      title: "Mood Explorer",
      icon: "😊",
      description: "Logged 10 moods.",
      unlocked: true,
    });
  }

  if (analytics.totalEntries >= 30) {
    achievements.push({
      id: 3,
      title: "Consistency Champion",
      icon: "🏆",
      description: "Logged 30 moods.",
      unlocked: true,
    });
  }

  if (analytics.streak >= 3) {
    achievements.push({
      id: 4,
      title: "3-Day Streak",
      icon: "🔥",
      description: "Maintained a 3-day mood streak.",
      unlocked: true,
    });
  }

  if (analytics.streak >= 7) {
    achievements.push({
      id: 5,
      title: "7-Day Streak",
      icon: "⭐",
      description: "Amazing consistency!",
      unlocked: true,
    });
  }

  return achievements;
};