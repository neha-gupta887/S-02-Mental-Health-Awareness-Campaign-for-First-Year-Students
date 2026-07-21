import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😣", label: "Stressed" },
];

function MoodSection() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800">
        How are you feeling today?
      </h2>

      <p className="text-gray-500 mt-2">
        Select the mood that best describes you.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood)}
            className={`rounded-xl p-5 transition border ${
              selectedMood?.label === mood.label
                ? "bg-green-100 border-green-500 shadow-md"
                : "bg-white border-gray-200 hover:bg-green-50 hover:border-green-400"
            }`}
          >
            <div className="text-4xl">{mood.emoji}</div>

            <p className="mt-2 font-medium">{mood.label}</p>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-lg font-semibold text-green-700">
            {selectedMood.emoji} You are feeling{" "}
            <span className="font-bold">{selectedMood.label}</span> today!
          </p>
        </div>
      )}
    </div>
  );
}

export default MoodSection;