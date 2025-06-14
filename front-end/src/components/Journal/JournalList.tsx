// JournalList.tsx
import JournalItem from "./JournalItem";

interface Props {
  entries: any[];
  onEdit: (entry: any) => void;
  onDelete: (id: string) => void;
}

export default function JournalList({ entries, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <JournalItem
          key={entry._id}
          entry={entry}
          onEdit={() => onEdit(entry)}
          onDelete={() => onDelete(entry._id)}
        />
      ))}
    </div>
  );
}
