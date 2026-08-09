/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";

import JournalEditor from "../components/journal/JournalEditor";
import JournalItem from "./JournalItem.jsx";
import JournalHistory from "../components/journal/JournalHistory";
import JournalSearch from "../components/journal/JournalSearch";
import JournalStats from "../components/journal/JournalStats";
import JournalInsights from "../components/journal/JournalInsights";


import { ConfirmationModal } from "./ConfirmationModal.jsx";
import {
  saveJournal,
  getJournalHistory,
  deleteJournal,
  updateJournal,
} from "../services/journalService";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ onConfirm: () => {} });
  const [isDeleting, setIsDeleting] = useState(false);


  // Load Journals
  const loadJournals = async () => {
    setLoading(true);

    const journals = await getJournalHistory();

    const formatted = journals.map((journal) => ({
      id: journal.id,
      title:
        journal.title ||
        journal.content?.slice(0, 40) ||
        "Untitled",

      content: journal.content,
      mood: journal.mood || "😊",
      category: journal.category || "Personal",

      date: journal.createdAt?.toDate
        ? journal.createdAt
            .toDate()
            .toLocaleDateString()
        : "Today",
    }));

    setEntries(formatted);
    setLoading(false);
  };

  useEffect(() => {
    loadJournals();
  }, []);

  // Save Journal
  const handleSave = async (
    text,
    mood,
    category
  ) => {
    if (!text.trim()) return;

    const title = text.slice(0, 40);

    if (editingEntry) {
      const success = await updateJournal(
        editingEntry.id,
        title,
        text,
        mood,
        category
      );

      if (success) {
        setEditingEntry(null);
        loadJournals();
      }

      return;
    }

    const success = await saveJournal(
      title,
      text,
      mood,
      category
    );

    if (success) {
      loadJournals();
    }
  };

  // Delete Journal
  const handleDelete = (id) => {
    setModalContent({
      title: "Delete Journal Entry",
      message: "Are you sure you want to delete this entry? This action cannot be undone.",
      confirmText: "Delete",
      onConfirm: async () => {
        setIsDeleting(true);
        const success = await deleteJournal(id);
        if (success) {
          if (editingEntry?.id === id) {
            setEditingEntry(null);
          }
          loadJournals();
        }
        setIsDeleting(false);
        setIsModalOpen(false);
      },
    });
    setIsModalOpen(true);
  };

  // Edit Journal
  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };
  
  // Clear All
  const clearAllEntries = () => {
    if (entries.length === 0) return;

    setModalContent({
      title: "Clear All Entries",
      message: `Are you sure you want to delete all ${entries.length} journal entries? This action is permanent.`,
      confirmText: "Delete All",
      onConfirm: async () => {
        setIsDeleting(true);
        // We can optimize this later, but for now, deleting one by one is safe.
        for (const entry of entries) {
          await deleteJournal(entry.id);
        }
        setEntries([]);
        setEditingEntry(null);
        setIsDeleting(false);
        setIsModalOpen(false);
      },
    });
    setIsModalOpen(true);
  };

  const filteredEntries = entries.filter(
    (entry) => {
      const search =
        searchTerm.toLowerCase();

      return (
        entry.title
          .toLowerCase()
          .includes(search) ||
        entry.content
          .toLowerCase()
          .includes(search) ||
        entry.mood.includes(search) ||
        entry.category
          .toLowerCase()
          .includes(search)
      );
    }
  );

  return (
    <AuthenticatedLayout>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalContent.onConfirm}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.confirmText}
        isLoading={isDeleting}
      />

      {loading ? (
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl font-semibold">Loading Journals...</h2>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              📝 Smart Wellness Journal
            </h1>
            <button
              onClick={clearAllEntries}
              disabled={entries.length === 0}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear All Entries
            </button>
          </div>
          <div className="mt-8">
            <JournalStats entries={entries} />
          </div>
          <div className="mt-8">
            <JournalSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="mt-8">
            <JournalInsights entries={entries} />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <JournalEditor
                onSave={handleSave}
                editingEntry={editingEntry}
              />
            </div>
            <div>
              <JournalHistory entryCount={filteredEntries.length}>
                {filteredEntries.map((entry) => (
                  <JournalItem
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </JournalHistory>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}

export default Journal;
