import { format } from "date-fns";

export default function EntryDateInput({
  isEditing,
  createdAt,
  onChange,
  error,
}: {
  isEditing: boolean;
  createdAt: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return isEditing ? (
    <div>
      <label className="block mb-1 text-sm text-gray-600">Creation Date</label>
      <input
        type="date"
        className="border p-2 rounded"
        value={createdAt}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  ) : (
    <div className="flex justify-between text-sm text-gray-500 pt-2">
      <div />
      <p>Created: {format(new Date(createdAt), "yyyy-MM-dd")}</p>
    </div>
  );
}
