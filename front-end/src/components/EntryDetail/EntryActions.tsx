export default function EntryActions({
  onCancel,
  onDelete,
  onSave,
}: {
  onCancel: () => void;
  onDelete: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex gap-4 mt-4 justify-end">
      <button
        onClick={onCancel}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 cursor-pointer"
      >
        Delete Entry
      </button>
      <button
        onClick={onSave}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  );
}
