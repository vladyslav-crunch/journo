import { useState } from "react";
import { format } from "date-fns";
import type { JournalEntryCreate } from "../../types/JournalEntry";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  onSave: (entry: JournalEntryCreate) => void;
}
const journalSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
});

export default function JournalForm({ onSave }: Props) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [title, setTitle] = useState(today);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof JournalEntryCreate, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = journalSchema.safeParse({ title, content });

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof JournalEntryCreate] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix validation errors.");
      return;
    }

    try {
      await onSave({ title, content });
      setContent("");
      setTitle(today);
      setErrors({});
      toast.success("Journal entry added!");
    } catch {
      toast.error("Failed to save entry.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-4"
    >
      <div>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <textarea
          className="w-full border p-2 rounded"
          rows={5}
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Add Entry
        </button>
      </div>
    </form>
  );
}
