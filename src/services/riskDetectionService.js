export const detectRisk = (moods) => {
  if (!moods || moods.length === 0) {
    return {
      level: "Low",
      message: "Start logging your mood to receive personalized insights.",
    };
  }

  const recent = moods.slice(0, 7);

  const negativeCount = recent.filter(
    (mood) =>
      mood.mood === "Sad" || mood.mood === "Stressed"
  ).length;

  if (negativeCount >= 5) {
    return {
      level: "High",
      message:
        "You've frequently reported feeling sad or stressed recently. Consider taking a break, using a breathing exercise, journaling, or talking to someone you trust.",
    };
  }

  if (negativeCount >= 3) {
    return {
      level: "Moderate",
      message:
        "Your recent mood history shows some signs of stress. Regular self-care may help improve your wellbeing.",
    };
  }

  return {
    level: "Low",
    message:
      "Your recent mood history looks balanced. Keep maintaining healthy habits.",
  };
};