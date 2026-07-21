const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😣", label: "Stressed" },
];

function MoodSection() {
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
            className="border rounded-xl p-5 hover:bg-green-50 hover:border-green-500 transition"
          >
            <div className="text-4xl">{mood.emoji}</div>
            <p className="mt-2 font-medium">{mood.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSection;