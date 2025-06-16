import { Link } from "react-router-dom";
import { format } from "date-fns";
import type { JournalEntry } from "../../types/JournalEntry";

export default function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link
      to={`/entries/${entry._id}`}
      className="flex justify-between items-center p-4 bg-white shadow rounded hover:bg-gray-50"
    >
      <div className="flex-1">
        <h3 className="text-lg font-bold">{entry.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1 pr-8">
          {entry.content}
        </p>
      </div>

      <div className="text-right text-xs text-gray-500 whitespace-nowrap ml-4">
        <p>Created: {format(new Date(entry.createdAt), "yyyy-MM-dd HH:mm")}</p>
        <p>Modified: {format(new Date(entry.updatedAt), "yyyy-MM-dd HH:mm")}</p>
      </div>
    </Link>
  );
}
