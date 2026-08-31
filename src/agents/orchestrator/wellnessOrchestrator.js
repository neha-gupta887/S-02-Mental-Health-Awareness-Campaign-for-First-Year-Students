import { generateExplanation } from "../explanationAgent";
import { getEmergencySupport } from "../emergencyAgent";
import { analyzeMood } from "../MoodAgent";
import { generateStudyPlan } from "../StudyAgent";
import { analyzeSleep } from "../SleepAgent";
import { analyzeCrisis } from "../CrisisAgent";

import { generateDecision } from "../DecisionAgent";
import { predictBurnout } from "../burnoutAgent";

import { getWellnessHistory } from "../../services/memoryService";

import { selectAgents } from "./agentCoordinator";
import { selectAgentsAI } from "./agentSelector";

export async function generateWellnessPlan(userData) {
  try {
    let selectedAgents = [];

    // =====================================
    // AI Coordinator (Gemini)
    // =====================================

    try {
      const aiResult = await selectAgentsAI(userData);

      selectedAgents = aiResult?.selectedAgents || ["mood"];

      console.log("🤖 Gemini Coordinator:", selectedAgents);
    } catch {
      console.warn(
        "⚠ Gemini Coordinator failed. Switching to Keyword Coordinator."
      );

      selectedAgents = selectAgents(userData);

      console.log("📝 Keyword Coordinator:", selectedAgents);
    }

    // Remove duplicate agents
    selectedAgents = [...new Set(selectedAgents)];

    const result = {
      selectedAgents,
    };

    // =====================================
    // Execute Agents
    // =====================================

    if (selectedAgents.includes("mood")) {
      result.mood = await analyzeMood(userData);
    }

    if (selectedAgents.includes("sleep")) {
      result.sleep = await analyzeSleep(userData);
    }

    if (selectedAgents.includes("study")) {
      result.study = await generateStudyPlan(userData);
    }

    if (selectedAgents.includes("crisis")) {
      result.crisis = await analyzeCrisis(userData);
    }

    // =====================================
    // Decision Agent
    // =====================================

    result.decision = await generateDecision(result);

    // =====================================
    // Burnout Prediction Agent
    // =====================================

const history = await getWellnessHistory();
    result.burnout = predictBurnout(result, history);
    result.support = getEmergencySupport(result);
    result.explanation = generateExplanation(result);
    // =====================================
    // Timestamp
    // =====================================

    result.generatedAt = new Date().toISOString();

    // =====================================
    // Return Final Result
    // =====================================

    return result;

  } catch (error) {
    console.error("❌ Wellness Orchestrator Error:", error);

    return {
      selectedAgents: [],
      error: "Unable to generate wellness plan. Please try again later.",
    };
  }
}
