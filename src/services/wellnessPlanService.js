export const generateWellnessPlan = (wellnessScore) => {
  if (wellnessScore >= 80) {
    return [
      "😊 Keep logging your mood daily.",
      "🚶 Walk for 20 minutes.",
      "💧 Drink enough water.",
      "📖 Write one gratitude journal entry.",
      "😴 Sleep 7–8 hours.",
    ];
  }

  if (wellnessScore >= 60) {
    return [
      "🧘 Practice breathing for 10 minutes.",
      "🚶 Take a short evening walk.",
      "📖 Journal your thoughts.",
      "💧 Stay hydrated.",
      "🎵 Listen to relaxing music.",
    ];
  }

  if (wellnessScore >= 40) {
    return [
      "🧘 Deep breathing twice today.",
      "📖 Write about today's emotions.",
      "📱 Reduce screen time for one hour.",
      "🌿 Spend time outdoors.",
      "💬 Talk to a trusted friend.",
    ];
  }

  return [
    "🚨 Practice guided breathing immediately.",
    "📖 Journal your feelings.",
    "💬 Reach out to someone you trust.",
    "🌿 Take regular breaks today.",
    "👨‍⚕️ Consider contacting a mental health professional if you're struggling.",
  ];
};