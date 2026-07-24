import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey,
});

export async function getAIResponse(prompt) {
  try {
    if (!apiKey) {
      throw new Error(
        "Gemini API key not found. Please check your .env file."
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    console.log("Name:", error?.name);
    console.log("Message:", error?.message);
    console.log("Status:", error?.status);
    console.log("Error Object:", error?.error);
    console.log("Complete Error:", JSON.stringify(error, null, 2));

    let errorMessage = "Unknown error";

    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = JSON.stringify(error, null, 2);
    }

    alert(errorMessage);

    return "Sorry, I'm having trouble responding right now.";
  }
}