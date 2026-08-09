/* eslint-disable no-unused-vars */
import {
  saveChatMessage,
  getChatHistory,
} from "../services/chatService";
import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaBrain,
  FaMoon,
  FaBookOpen,
  FaHeartbeat,
  FaCircle,
  FaWind,
  FaSmile,
  FaLeaf,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { generateWellnessPlan } from "../agents/orchestrator/wellnessOrchestrator";
import AgentExecution from "../components/AgentExecution";
import { useAgent } from "../context/AgentContext";
import { saveWellnessRecord } from "../services/memoryService";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import AIReport from "../AIReport.jsx";

function AICompanion() {

  // ===========================
  // States
  // ===========================

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm Mana AI.\n\nI'm your Agentic Wellness Companion.\n\nTell me how you're feeling today and I'll analyze your wellbeing using multiple AI agents.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [activeAgents, setActiveAgents] = useState([]);

  const [latestResult, setLatestResult] = useState(null);

  const { setAgentResult } = useAgent();

  // New UI state — existing AI/agent logic is preserved
  const [selectedEmotion, setSelectedEmotion] = useState("");

  const chatRef = useRef(null);
  useEffect(() => {
    async function loadChats() {
      try {
        const history = await getChatHistory();

        if (history?.length > 0) {
          setMessages(
            history.map((chat) => ({
              sender: chat.sender,
              text: chat.text,
              time: chat.createdAt?.toDate
                ? chat.createdAt.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
            }))
          );
        }
      } catch (error) {
        console.error("Unable to load Mana AI chat history:", error);
      }
    }

    loadChats();
  }, []);
  // ===========================
  const handleSuggestion = (text) => {
    setInput(text);
    setTimeout(() => {
      document.getElementById("mana-chat-input")?.focus();
    }, 0);
  };

  // ===========================
  // Suggested Prompts
  // ===========================

  const suggestions = [
    "😔 I'm feeling stressed about exams",
    "😴 I'm not sleeping well",
    "😕 I feel anxious lately",
    "😊 I'm feeling happy today",
  ];

  // ===========================
  // Auto Scroll
  // ===========================

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ===========================
  // Send Message
  // ===========================
  // ===========================
  // Send Message
  // ===========================
const handleSend = async () => {

  if (!input.trim() || loading) return;

  const userMessage = input.trim();

  // Add User Message

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  try {
    await saveChatMessage("user", userMessage);
  } catch (chatError) {
    console.error("Unable to save user chat:", chatError);
  }

  setInput("");

  setLoading(true);

  try {

    // ===========================
    // Run Agentic AI
    // ===========================

    const result = await generateWellnessPlan({
      mood: userMessage,
      stress: "Unknown",
      sleep: "Unknown",
      journal: "",
      exam: "",
    });

    setLatestResult(result);

    // Global Context
    setAgentResult(result);

    // Save Memory

    try {
      await saveWellnessRecord(result);
    } catch (memoryError) {
      console.error("Unable to save wellness memory:", memoryError);
    }

    // ===========================
    // Build AI Report
    // ===========================

      // ===========================
      // Build AI Report
      // ===========================

      let aiReply = "🩺 ManaSetu AI Wellness Report\n";
      aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            // ===========================
      // 🧠 Mood Analysis
      // ===========================

      if (result.mood) {
        aiReply += "🧠 MOOD ANALYSIS\n\n";

        aiReply += `😊 Emotion: ${result.mood.emotion || "Unknown"}\n`;
        aiReply += `📊 Stress Level: ${result.mood.stressLevel || "Unknown"}\n`;
        aiReply += `⚠ Burnout Risk: ${result.mood.burnoutRisk || "Unknown"}\n\n`;

        aiReply += `📝 Summary\n`;
        aiReply += `${result.mood.summary || "No summary available."}\n\n`;

        aiReply += `💡 Recommendation\n`;
        aiReply += `${
          result.mood.recommendation ||
          "Take care of yourself and maintain healthy habits."
        }\n\n`;

        aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 😴 Sleep Analysis
      // ===========================

      if (result.sleep) {
        aiReply += "😴 SLEEP ANALYSIS\n\n";

        aiReply += `📝 Summary\n`;
        aiReply += `${
          result.sleep.summary || "No sleep issues detected."
        }\n\n`;

        aiReply += `💡 Recommendation\n`;
        aiReply += `${
          result.sleep.recommendation ||
          "Aim for at least 7-8 hours of quality sleep."
        }\n\n`;

        aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 📚 Study Analysis
      // ===========================

      if (result.study) {
        aiReply += "📚 STUDY ANALYSIS\n\n";

        aiReply += `📝 Summary\n`;
        aiReply += `${
          result.study.summary || "Study analysis unavailable."
        }\n\n`;

        aiReply += `💡 Recommendation\n`;
        aiReply += `${
          result.study.recommendation ||
          "Continue following a focused study routine."
        }\n\n`;

        aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 🚨 Crisis Analysis
      // ===========================

      if (result.crisis) {
        aiReply += "🚨 CRISIS ANALYSIS\n\n";

        aiReply += `⚠ Risk Level: ${result.crisis.risk || "Low"}\n\n`;

        aiReply += `📝 Summary\n`;
        aiReply += `${
          result.crisis.summary ||
          "No immediate concerns detected."
        }\n\n`;

        aiReply += `💡 Recommendation\n`;
        aiReply += `${
          result.crisis.recommendation ||
          "Continue monitoring your wellbeing."
        }\n\n`;

        aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 🎯 Decision Agent
      // ===========================

      if (result.decision) {
        aiReply += "🎯 TODAY'S WELLNESS PLAN\n\n";

        aiReply += `💚 Wellness Score: ${result.decision.wellnessScore}/100\n`;
        aiReply += `🔥 Priority: ${result.decision.priority}\n\n`;

        if (result.decision.tasks?.length > 0) {
          aiReply += "📋 Recommended Tasks\n\n";

          result.decision.tasks.forEach((task) => {
            aiReply += `✔ ${task}\n`;
          });

          aiReply += "\n";
        }

        aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 🔥 Burnout Prediction
      // ===========================

      if (result.burnout) {
        aiReply += "🔥 BURNOUT PREDICTION\n\n";

        aiReply += `Risk: ${result.burnout.risk}\n`;
        aiReply += `Score: ${result.burnout.score}%\n\n`;

        if (result.burnout.reasons?.length > 0) {
          aiReply += "Reasons:\n";

          result.burnout.reasons.forEach((reason) => {
            aiReply += `• ${reason}\n`;
          });

          aiReply += "\n";
        }

        aiReply += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 🚑 Emergency Support
      // ===========================

      if (result.support?.show) {
        aiReply += `${result.support.title}\n\n`;
        aiReply += `${result.support.message}\n\n`;

        result.support.actions?.forEach((action) => {
          aiReply += `• ${action}\n`;
        });

        aiReply += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      // ===========================
      // 🤖 Explainable AI
      // ===========================

      if (result.explanation) {
        aiReply += "🤖 AI EXPLANATION\n\n";

        aiReply += `Confidence: ${result.explanation.confidence}%\n\n`;

        result.explanation.reasons?.forEach((reason) => {
          aiReply += `• ${reason}\n`;
        });

        aiReply += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
      }

      aiReply += "🌿 Thank you for using ManaSetu.\n";
      aiReply +=
        "Remember: Small positive habits every day create better mental wellbeing. 💚";

      setMessages((prev) => [
  ...prev,
  {
    sender: "ai",
    text: aiReply,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
]);

      try {
        await saveChatMessage("ai", aiReply);
      } catch (chatError) {
        console.error("Unable to save AI chat:", chatError);
      }

    } catch (error) {
      console.error(error);

      const errorMessage =
        "I’m sorry, I couldn’t complete your wellness analysis right now. Please try again in a moment. 💚";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: errorMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      try {
        await saveChatMessage("ai", errorMessage);
      } catch (chatError) {
        console.error("Unable to save error message:", chatError);
      }
    }

    setLoading(false);
  };
    return (
  <AuthenticatedLayout>
    <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-5xl flex-col">
      {/* ===========================
          Chat Section
      =========================== */}

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
        {/* Chat Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              💬 Conversation
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Chat naturally with Mana AI
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900 px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Online
            </span>
          </div>
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-6 pt-6">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSuggestion(prompt)}
                  className="rounded-full border border-emerald-200 dark:border-gray-700 bg-emerald-50 dark:bg-gray-800 px-4 py-2 text-sm hover:bg-emerald-100 dark:hover:bg-gray-700 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >

                {/* Avatar */}

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                    msg.sender === "ai"
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >

                  {msg.sender === "ai" ? (
                    <FaRobot />
                  ) : (
                    "👤"
                  )}

                </div>

                {/* Bubble */}

                <div>

                  <div
                    className={`rounded-3xl px-5 py-4 whitespace-pre-wrap shadow-lg ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                    }`}
                  >
                    {msg.sender === "ai" ? (
                      <AIReport text={msg.text} />
                    ) : (
                      msg.text
                    )}
                  </div>

                  <p
                    className={`mt-2 text-xs text-gray-500 ${
                      msg.sender === "user"
                        ? "text-right"
                        : ""
                    }`}
                  >

                    {msg.time}

                  </p>

                </div>

              </div>

            </motion.div>

          ))}

          {/* Typing */}

          {loading && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 items-start"
            >

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center">

                <FaRobot />

              </div>

              <div className="rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-4 shadow-lg">

                <div className="flex gap-2">

                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>

                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]"></span>

                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]"></span>

                </div>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">

                  Mana AI is analyzing your wellbeing...

                </p>

              </div>

            </motion.div>

          )}

        </div>

      </div>

      {/* ===========================
          AI Wellness Dashboard
      =========================== */}

        {/* ===========================
            AI Wellness Dashboard
        ============================ */}

        {latestResult && (

          <div className="mt-8 rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 p-8">

  {/* Header */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

    <div>

      <h2 className="text-3xl font-bold dark:text-white">

        📊 AI Wellness Dashboard

      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-2">

        Personalized insights generated by Mana AI

      </p>

    </div>

    {latestResult.decision && (

      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 shadow-lg">

        <p className="text-sm opacity-90">

          Wellness Score

        </p>

        <h3 className="text-3xl font-bold">

          {latestResult.decision.wellnessScore}/100

        </h3>

      </div>

    )}

  </div>

  {/* Cards */}

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

    {latestResult.mood && (

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6 shadow-lg"
      >

        <h3 className="text-xl font-bold text-green-700 dark:text-green-200">

          🧠 Mood Analysis

        </h3>

        <p className="mt-4">

          <strong>Emotion:</strong> {latestResult.mood.emotion}

        </p>

        <p>

          <strong>Stress:</strong> {latestResult.mood.stressLevel}

        </p>

        <p>

          <strong>Burnout:</strong> {latestResult.mood.burnoutRisk}

        </p>

        <p className="mt-4 text-sm leading-7">

          {latestResult.mood.summary}

        </p>

      </motion.div>

    )}

    {latestResult.sleep && (

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-6 shadow-lg"
      >

        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-200">

          😴 Sleep

        </h3>

        <p className="mt-4 leading-7">

          {latestResult.sleep.summary}

        </p>

        <div className="mt-4 rounded-xl bg-white/60 dark:bg-black/20 p-4">

          <strong>Recommendation</strong>

          <p className="mt-2">

            {latestResult.sleep.recommendation}

          </p>

        </div>

      </motion.div>

    )}

    {latestResult.study && (

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6 shadow-lg"
      >

        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-200">

          📚 Study

        </h3>

        <p className="mt-4">

          {latestResult.study.summary}

        </p>

        <div className="mt-4 rounded-xl bg-white/60 dark:bg-black/20 p-4">

          <strong>Recommendation</strong>

          <p className="mt-2">

            {latestResult.study.recommendation}

          </p>

        </div>

      </motion.div>

    )}

    {latestResult.crisis && (

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900 dark:to-red-950 p-6 shadow-lg"
      >

        <h3 className="text-xl font-bold text-red-700 dark:text-red-300">

          🚨 Crisis

        </h3>

        <p className="mt-4">

          <strong>Risk:</strong> {latestResult.crisis.risk}

        </p>

        <p className="mt-4">

          {latestResult.crisis.summary}

        </p>

      </motion.div>

    )}

    {latestResult.burnout && (

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 p-6 shadow-lg"
      >

        <h3 className="text-xl font-bold text-orange-700 dark:text-orange-300">

          🔥 Burnout

        </h3>

        <p className="mt-4">

          Risk: {latestResult.burnout.risk}

        </p>

        <p>

          Score: {latestResult.burnout.score}%

        </p>

        <ul className="mt-4 list-disc ml-5 space-y-2">

          {latestResult.burnout.reasons?.map((reason, index) => (

            <li key={index}>{reason}</li>

          ))}

        </ul>

      </motion.div>

    )}

    {latestResult.decision && (

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 shadow-xl"
      >

        <h3 className="text-2xl font-bold">

          🎯 Today's Plan

        </h3>

        <p className="mt-4">

          Priority: {latestResult.decision.priority}

        </p>

        <ul className="mt-5 space-y-2">

          {latestResult.decision.tasks?.map((task, index) => (

            <li key={index}>

              ✔ {task}

            </li>

          ))}

        </ul>

      </motion.div>

    )}

  </div>

</div>
)}

              {/* ===========================
          Input Area
      =========================== */}

      <div className="sticky bottom-0 mt-8">

        <div className="rounded-[30px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl p-5">

          <div className="flex items-end gap-4">

            {/* Input */}

            <textarea
              id="mana-chat-input"
              rows={1}
              value={input}
              placeholder="Ask Mana AI anything about your wellbeing..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 resize-none rounded-2xl bg-gray-100 dark:bg-gray-800 px-5 py-4 outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 max-h-40"
            />

            {/* Send */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
              disabled={loading || !input.trim()}
              onClick={handleSend}
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaPaperPlane />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
  );
}

export default AICompanion;
