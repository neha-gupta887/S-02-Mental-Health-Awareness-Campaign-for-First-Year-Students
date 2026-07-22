import { useState } from "react";
import { getAIResponse } from "../services/geminiService";

function AITest() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const result = await getAIResponse(prompt);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">🧪 Gemini AI Test</h1>

        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini anything..."
          className="w-full border rounded-xl p-4"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {response && (
          <div className="mt-6 p-4 border rounded-xl bg-gray-50">
            <h2 className="font-bold mb-2">AI Response:</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AITest;