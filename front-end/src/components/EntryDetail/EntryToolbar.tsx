import { useNavigate } from "react-router-dom";

export default function EntryToolbar({
  isEditing,
  onEdit,
}: {
  isEditing: boolean;
  onEdit: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-sm text-gray-600 hover:underline cursor-pointer"
      >
        ← Back to Dashboard
      </button>
      {!isEditing && (
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Edit Entry
        </button>
      )}
    </div>
  );
}
