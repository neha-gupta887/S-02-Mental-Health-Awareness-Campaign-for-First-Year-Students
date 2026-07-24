export const predictMood = (wellnessScore) => {
  if (wellnessScore >= 80) {
    return {
      mood: "😊 Happy",
      confidence: 82,
      reason:
        "Your recent wellness trend is positive.",
      recommendation:
        "Maintain your healthy habits and keep tracking your mood.",
    };
  }

  if (wellnessScore >= 60) {
    return {
      mood: "😌 Calm",
      confidence: 74,
      reason:
        "Your emotional pattern appears stable.",
      recommendation:
        "Continue journaling and regular breathing exercises.",
    };
  }

  if (wellnessScore >= 40) {
    return {
      mood: "😟 Stressed",
      confidence: 69,
      reason:
        "Your recent wellness score suggests moderate stress.",
      recommendation:
        "Take breaks, practice breathing, and reduce screen time.",
    };
  }

  return {
    mood: "😔 Low Mood",
    confidence: 64,
    reason:
      "Recent activity suggests you may need extra self-care.",
    recommendation:
      "Complete your wellness plan and consider talking to someone you trust.",
  };
};