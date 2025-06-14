import { useEffect, useState } from "react";

interface Props {
  entry: any | null;
  onSave: (entry: { title: string; content: string }) => void;
  onCancel: () => void;
}

export default function JournalForm({ entry, onSave, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-6 space-y-4"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        rows={4}
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          {entry ? "Update" : "Add"}
        </button>
        {entry && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded text-gray-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
