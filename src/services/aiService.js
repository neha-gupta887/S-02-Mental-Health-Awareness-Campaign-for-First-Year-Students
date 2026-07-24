export async function getAIResponse(message) {
  const text = message.toLowerCase();

  if (
    text.includes("stress") ||
    text.includes("stressed") ||
    text.includes("pressure")
  ) {
    return "I'm sorry you're feeling stressed. 🌿 Try taking five slow breaths. Sometimes a short break and a glass of water can also help.";
  }

  if (
    text.includes("sad") ||
    text.includes("cry") ||
    text.includes("depressed")
  ) {
    return "I'm here with you. ❤️ It's okay to have difficult days. You're not alone, and talking to someone you trust can really help.";
  }

  if (
    text.includes("anxiety") ||
    text.includes("anxious") ||
    text.includes("panic")
  ) {
    return "Let's slow down together. Try inhaling for 4 seconds, holding for 4 seconds, and exhaling for 6 seconds.";
  }

  if (
    text.includes("happy") ||
    text.includes("good") ||
    text.includes("great")
  ) {
    return "That's wonderful! 😊 I'm really happy you're feeling good today. Keep doing what makes you feel positive.";
  }

  if (
    text.includes("sleep") ||
    text.includes("insomnia")
  ) {
    return "A regular sleep schedule, avoiding screens before bedtime, and a few minutes of deep breathing may help you relax.";
  }

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    return "Hello! 👋 I'm Mana AI. How are you feeling today?";
  }

  return "Thank you for sharing that with me. 💚 I'm here to listen. Could you tell me a little more about how you're feeling?";
}