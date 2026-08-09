import {
  FaEdit,
  FaTrash,
  FaRobot,
} from "react-icons/fa";

function JournalHistory({
  entries = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-900">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Recent Entries
      </h2>

      {entries.length === 0 ? (
        <p className="mt-6 text-gray-500 dark:text-gray-400">
          No journal entries yet.
        </p>
      ) : (
        <div className="mt-6 space-y-6">

          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-gray-200 p-5 shadow-sm dark:border-gray-700"
            >

              {/* Header */}

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {entry.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {entry.date}
                  </p>

                </div>

                <span className="text-4xl">
                  {entry.mood}
                </span>

              </div>

              {/* Content */}

              <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
                {entry.content}
              </p>

              {/* Category */}

              <div className="mt-4">

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  {entry.category}
                </span>

              </div>

              {/* AI Analysis */}

              {entry.aiAnalysis && (
                <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 p-5 dark:from-gray-800 dark:to-gray-800">

                  <div className="flex items-center gap-2 mb-4">

                    <FaRobot className="text-emerald-600 text-xl" />

                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400">
                      Mana AI Analysis
                    </h4>

                  </div>

                  <div className="space-y-3">

                    <p>
                      <strong>😊 Emotion:</strong>{" "}
                      {entry.aiAnalysis.emotion}
                    </p>

                    <p>
                      <strong>📄 Summary:</strong>{" "}
                      {entry.aiAnalysis.summary}
                    </p>

                    <p>
                      <strong>💡 Suggestion:</strong>{" "}
                      {entry.aiAnalysis.suggestion}
                    </p>

                    <p>
                      <strong>🌿 Affirmation:</strong>{" "}
                      {entry.aiAnalysis.affirmation}
                    </p>

                    <p>
                      <strong>📊 Sentiment:</strong>{" "}
                      {entry.aiAnalysis.sentiment}%
                    </p>

                    <div>

                      <p className="font-semibold mb-2">
                        🏷️ Keywords
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {entry.aiAnalysis.keywords?.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow dark:bg-gray-700 dark:text-emerald-300"
                          >
                            {keyword}
                          </span>
                        ))}

                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* Actions */}

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => onEdit(entry)}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => onDelete(entry.id)}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
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
  );
}

export default JournalHistory;
