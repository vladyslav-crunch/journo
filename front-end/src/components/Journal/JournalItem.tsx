// JournalItem.tsx
interface Props {
  entry: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function JournalItem({ entry, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-lg">{entry.title}</h3>
          <p className="text-gray-700">{entry.content}</p>
        </div>
        <div className="space-x-2 text-sm">
          <button onClick={onEdit} className="text-indigo-600 hover:underline">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
