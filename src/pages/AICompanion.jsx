import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

function AICompanion() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! 👋 I'm Mana AI, your wellness companion. How are you feeling today?",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: input,
      },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg flex flex-col">

        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-3xl flex items-center gap-3">
          <FaRobot size={28} />
          <div>
            <h1 className="text-2xl font-bold">Mana AI</h1>
            <p className="text-green-100 text-sm">
              Your AI Wellness Companion
            </p>
          </div>
        </div>

        {/* Chat Area */}
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

        </div>

        {/* Input */}
        <div className="border-t p-5 flex gap-3">

          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl flex items-center gap-2"
          >
            <FaPaperPlane />
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default AICompanion;