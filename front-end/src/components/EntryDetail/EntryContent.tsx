export default function EntryContent({
  isEditing,
  content,
  onChange,
  error,
}: {
  isEditing: boolean;
  content: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return isEditing ? (
    <>
      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        placeholder="Content"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  ) : (
    <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
  );
}
