export default function EntryTitle({
  isEditing,
  title,
  onChange,
  error,
}: {
  isEditing: boolean;
  title: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="mb-4">
      {isEditing ? (
        <>
          <input
            type="text"
            className="text-2xl font-bold border p-2 rounded w-full"
            value={title}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </>
      ) : (
        <h2 className="text-2xl font-bold">{title}</h2>
      )}
    </div>
  );
}
