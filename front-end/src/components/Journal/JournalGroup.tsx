import type { JournalEntry } from "../../types/JournalEntry";
import JournalCard from "./JournalCard";

export default function JournalGroup({
  month,
  entries,
}: {
  month: string;
  entries: JournalEntry[];
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">{month}</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <JournalCard key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
