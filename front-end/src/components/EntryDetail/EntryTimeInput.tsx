export default function EntryTimeInput({
  isEditing,
  createdTime,
  onChange,
  error,
}: {
  isEditing: boolean;
  createdTime: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.match(/^\d{0,2}:?\d{0,2}$/)) return;
    if (value.length === 5 && value.match(/^\d{2}:\d{2}$/)) {
      const [h, m] = value.split(":").map(Number);
      if (h > 23 || m > 59) return;
    }
    onChange(value);
  };

  return isEditing ? (
    <div>
      <label className="block mb-1  text-sm text-gray-600">Creation Time</label>
      <input
        type="text"
        placeholder="e.g. 14:30"
        className="border px-2 py-1 rounded w-14 "
        value={createdTime}
        onChange={handleChange}
        inputMode="numeric"
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  ) : null;
}
