import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Do not create the SDK client when this module is imported. In a deployment
// where the environment variable has not been configured, the SDK throws
// during construction and prevents React from rendering anything.
function getGeminiClient() {
  if (!apiKey) {
    throw new Error(
      "Gemini is not configured. Add VITE_GEMINI_API_KEY to the deployment environment."
    );
  }

  return new GoogleGenAI({ apiKey });
}

/**
 * Returns plain text response from Gemini.
 */
export async function getAIResponse(prompt) {
  try {
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    return "Sorry, I'm having trouble responding right now.";
  }
}

/**
 * Returns parsed JSON response.
 * Used by AI Agents.
 */
export async function getAIJsonResponse(prompt) {
  try {
    const text = await getAIResponse(prompt);

    // Remove markdown if Gemini returns ```json ... ```
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parsing Error:", error);

    return {
      success: false,
      error: "Failed to parse AI response.",
    };
  }
}
