import { useEffect, useState } from "react";
import { FaBookOpen, FaSave, FaTrash } from "react-icons/fa";
import {
  saveJournal,
  getJournalHistory,
  deleteJournal,
} from "../services/journalService";

function Journal() {
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load Journal History
  const loadJournals = async () => {
    const data = await getJournalHistory();
    setEntries(data);
  };

  useEffect(() => {
    loadJournals();
  }, []);

  // Save Journal
  const handleSave = async () => {
    if (!journal.trim()) {
      alert("Please write something before saving.");
      return;
    }

    setLoading(true);

    const success = await saveJournal(journal);

    if (success) {
      alert("✅ Journal saved successfully!");
      setJournal("");
      await loadJournals();
    } else {
      alert("❌ Failed to save journal.");
    }

    setLoading(false);
  };

  // Delete Journal
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal entry?"
    );

    if (!confirmDelete) return;

    const success = await deleteJournal(id);

    if (success) {
      alert("🗑 Journal deleted successfully!");
      await loadJournals();
    } else {
      alert("❌ Failed to delete journal.");
    }
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

        {/* Journal Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            ✍️ How are you feeling today?
          </label>

          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={8}
            className="w-full border border-gray-300 rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500">
              {journal.length} characters
            </p>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition disabled:bg-green-400"
            >
              <FaSave />
              {loading ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </div>

        {/* Journal History */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📖 Previous Entries
          </h2>

          {entries.length === 0 ? (
            <p className="text-center text-gray-500">
              No journal entries yet.
            </p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {entry.content}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      {entry.createdAt?.toDate
                        ? entry.createdAt.toDate().toLocaleString()
                        : "Just now"}
                    </p>

                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Journal;