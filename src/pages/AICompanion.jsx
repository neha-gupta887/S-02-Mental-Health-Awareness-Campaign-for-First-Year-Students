import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { getAIResponse } from "../services/aiService";
function AICompanion() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! 👋 I'm Mana AI, your wellness companion. How are you feeling today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const aiReply = await getAIResponse(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I couldn't generate a response.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg flex flex-col">

        <div className="bg-green-600 text-white p-6 rounded-t-3xl flex items-center gap-3">
          <FaRobot size={28} />
          <div>
            <h1 className="text-2xl font-bold">Mana AI</h1>
            <p className="text-green-100 text-sm">
              Your AI Wellness Companion
            </p>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto h-[500px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-5 py-3 rounded-2xl">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-5 flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleSend();
              }
            }}
            className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 rounded-xl flex items-center gap-2"
          >
            <FaPaperPlane />
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AICompanion;