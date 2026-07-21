import { useState } from "react";
import { FaBookOpen, FaSave } from "react-icons/fa";

function Journal() {
  const [journal, setJournal] = useState("");

  const handleSave = () => {
    if (!journal.trim()) {
      alert("Please write something before saving.");
      return;
    }

    // Firestore integration will be added next
    alert("Journal saved successfully! (Firestore coming next)");
    setJournal("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <FaBookOpen className="text-4xl text-green-600" />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              My Journal
            </h1>
            <p className="text-gray-500 mt-1">
              Write down your thoughts, emotions, and experiences.
            </p>
          </div>
        </div>

        {/* Journal Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            ✍️ How are you feeling today?
          </label>

          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={10}
            className="w-full border border-gray-300 rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500">
              {journal.length} characters
            </p>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              <FaSave />
              Save Entry
            </button>
          </div>
        </div>

        {/* History Placeholder */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📖 Previous Entries
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
            No journal entries yet.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journal;