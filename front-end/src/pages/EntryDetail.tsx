import EntryToolbar from "../components/EntryDetail/EntryToolbar";
import EntryTitle from "../components/EntryDetail/EntryTitle";
import EntryContent from "../components/EntryDetail/EntryContent";
import EntryDateInput from "../components/EntryDetail/EntryDateInput";
import EntryActions from "../components/EntryDetail/EntryActions";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchEntries, updateEntry, deleteEntry } from "../api/journal";
import type { JournalEntry } from "../types/JournalEntry";
import { toast } from "react-toastify";
import { z } from "zod";

const entrySchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  createdAt: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Valid creation date is required.",
  }),
});

export default function EntryDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [entry, setEntry] = useState<JournalEntry>();
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    createdAt?: string;
  }>({});

  useEffect(() => {
    if (!token || !id) return;

    fetchEntries(token).then((entries) => {
      const found = entries.find((e: JournalEntry) => e._id === id);
      if (!found) return navigate("/");

      setEntry(found);
      setTitle(found.title);
      setContent(found.content);
      setCreatedAt(new Date(found.createdAt).toISOString().slice(0, 10));
    });
  }, [token, id, navigate]);

  const validate = () => {
    const result = entrySchema.safeParse({ title, content, createdAt });
    if (!result.success) {
      const zodErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        zodErrors[issue.path[0] as keyof typeof zodErrors] = issue.message;
      }
      setErrors(zodErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSave = async () => {
    if (!token || !id) return;
    if (!validate()) {
      toast.error("Please fix validation errors.");
      return;
    }

    try {
      const isoDate = new Date(createdAt + "T00:00:00.000Z");
      const updated = await updateEntry(token, id, {
        title,
        content,
        createdAt: isoDate,
      });

      setEntry(updated);
      setIsEditing(false);
      toast.success("Entry updated successfully.");
    } catch {
      toast.error("Failed to update entry.");
    }
  };

  const handleDelete = async () => {
    if (!token || !id) return;

    try {
      await deleteEntry(token, id);
      toast.success("Entry deleted.");
      navigate("/");
    } catch {
      toast.error("Failed to delete entry.");
    }
  };

  const handleCancelEdit = () => {
    if (!entry) return;
    setTitle(entry.title);
    setContent(entry.content);
    setCreatedAt(new Date(entry.createdAt).toISOString().slice(0, 10));
    setErrors({});
    setIsEditing(false);
  };

  if (!entry) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <EntryToolbar isEditing={isEditing} onEdit={() => setIsEditing(true)} />

      <EntryTitle
        isEditing={isEditing}
        title={title}
        onChange={setTitle}
        error={errors.title}
      />

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <EntryContent
          isEditing={isEditing}
          content={content}
          onChange={setContent}
          error={errors.content}
        />

        <EntryDateInput
          isEditing={isEditing}
          createdAt={createdAt}
          onChange={setCreatedAt}
          error={errors.createdAt}
        />

        {isEditing && (
          <EntryActions
            onCancel={handleCancelEdit}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}
