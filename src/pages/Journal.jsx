import { useEffect, useState } from "react";
import { FaBookOpen, FaSave, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import {
  saveJournal,
  getJournalHistory,
  deleteJournal,
  updateJournal,
} from "../services/journalService";
import useAuth from "../hooks/useAuth";

function Journal() {
  const user = useAuth();

  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Load Journals
  const loadJournals = async () => {
    const data = await getJournalHistory();
    setEntries(data);
  };

  // Wait for Firebase Auth before loading journals
  useEffect(() => {
    if (user === undefined) return;

    if (!user) return;

    loadJournals();
  }, [user]);

  // Save or Update Journal
  const handleSave = async () => {
    if (!journal.trim()) {
      alert("Please write something before saving.");
      return;
    }

    setLoading(true);

    let success = false;

    if (isEditing) {
      success = await updateJournal(editId, journal);

      if (success) {
        alert("✅ Journal updated successfully!");
      }
    } else {
      success = await saveJournal(journal);

      if (success) {
        alert("✅ Journal saved successfully!");
      }
    }

    if (success) {
      setJournal("");
      setIsEditing(false);
      setEditId(null);
      await loadJournals();
    } else {
      alert("❌ Something went wrong.");
    }

    setLoading(false);
  };

  // Delete Journal
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this journal entry?")) return;

    const success = await deleteJournal(id);

    if (success) {
      alert("🗑 Journal deleted.");
      await loadJournals();
    }
  };

  // Edit Journal
  const handleEdit = (entry) => {
    setJournal(entry.content);
    setEditId(entry.id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel Edit
  const handleCancel = () => {
    setJournal("");
    setEditId(null);
    setIsEditing(false);
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
            <p className="text-gray-500">
              Write your thoughts and reflect on your day.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <textarea
            rows={8}
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Write something..."
            className="w-full border rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-500">
              {journal.length} characters
            </span>

            <div className="flex gap-3">

              {isEditing && (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-xl"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                <FaSave />
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Entry"
                  : "Save Entry"}
              </button>

            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            📖 Previous Entries
          </h2>

          {entries.length === 0 ? (
            <p className="text-gray-500">
              No journal entries yet.
            </p>
          ) : (
            <div className="space-y-4">

              {entries.map((entry) => (

                <div
                  key={entry.id}
                  className="border rounded-2xl p-5"
                >
                  <p className="whitespace-pre-wrap">
                    {entry.content}
                  </p>

                  <div className="flex justify-between items-center mt-5">

                    <span className="text-sm text-gray-500">
                      {entry.createdAt?.toDate
                        ? entry.createdAt.toDate().toLocaleString()
                        : "Just now"}
                    </span>

                    <div className="flex gap-3">

                      <button
                        onClick={() => handleEdit(entry)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

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