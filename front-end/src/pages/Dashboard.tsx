import { useEffect, useState } from "react";
import {
  fetchEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../api/journal";
import { useAuth } from "../context/AuthContext";
import JournalForm from "../components/Journal/JournalForm";
import JournalList from "../components/Journal/JournalList";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState<any>(null);

  const load = async () => {
    if (!token) return;
    const data = await fetchEntries(token);
    setEntries(data);
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleSave = async (entry: { title: string; content: string }) => {
    if (!token) return;
    if (editing) {
      const updated = await updateEntry(token, editing._id, entry);
      setEntries(entries.map((e) => (e._id === updated._id ? updated : e)));
      setEditing(null);
    } else {
      const newEntry = await createEntry(token, entry);
      setEntries([newEntry, ...entries]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    await deleteEntry(token, id);
    setEntries(entries.filter((e) => e._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📝 Dashboard</h1>
        <button onClick={logout} className="text-red-600 underline">
          Logout
        </button>
      </div>
      <JournalForm
        onSave={handleSave}
        entry={editing}
        onCancel={() => setEditing(null)}
      />
      <JournalList
        entries={entries}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}
