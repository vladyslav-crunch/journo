import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createEntry, fetchEntries } from "../api/journal";
import JournalForm from "../components/Journal/JournalForm";
import JournalGroup from "../components/Journal/JournalGroup";
import JournalFilterBar from "../components/Journal/JournalFilterBar";
import { format } from "date-fns";
import type { JournalEntry, JournalEntryCreate } from "../types/JournalEntry";

export default function Dashboard() {
  const { token } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5); // 👈 global visible count

  useEffect(() => {
    if (token) fetchEntries(token).then(setEntries);
  }, [token]);

  const handleSave = async (entry: JournalEntryCreate) => {
    if (!token) return;
    const newEntry = await createEntry(token, entry);
    setEntries([newEntry, ...entries]);
  };

  const filteredEntries = entries
    .filter((entry) => {
      const created = new Date(entry.createdAt);
      const matchesSearch = entry.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesYear =
        yearFilter === "all" || created.getFullYear().toString() === yearFilter;
      const matchesMonth =
        monthFilter === "all" || created.getMonth().toString() === monthFilter;
      return matchesSearch && matchesYear && matchesMonth;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const groupByMonth = (entries: JournalEntry[]) => {
    const map = new Map<string, JournalEntry[]>();
    entries.forEach((entry) => {
      const date = new Date(entry.createdAt);
      const key = format(date, "yyyy MMMM");
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(entry);
    });
    return Array.from(map.entries()).sort(
      (a, b) =>
        new Date(b[1][0].createdAt).getTime() -
        new Date(a[1][0].createdAt).getTime()
    );
  };

  // 🔢 Apply global pagination across all groups
  const grouped = groupByMonth(filteredEntries);
  let totalShown = 0;
  const visibleGroups: [string, JournalEntry[]][] = [];

  for (const [month, monthEntries] of grouped) {
    if (totalShown >= visibleCount) break;

    const remaining = visibleCount - totalShown;
    const sliced = monthEntries.slice(0, remaining);
    if (sliced.length > 0) {
      visibleGroups.push([month, sliced]);
      totalShown += sliced.length;
    }
  }

  const uniqueYears = [
    ...new Set(entries.map((e) => new Date(e.createdAt).getFullYear())),
  ].sort((a, b) => b - a);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">📝 Journal Dashboard</h1>
      </div>

      <JournalForm onSave={handleSave} />

      <JournalFilterBar
        search={search}
        setSearch={setSearch}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
        allYears={uniqueYears}
      />

      {visibleGroups.length === 0 ? (
        <div className="p-6 text-center text-gray-500 bg-white rounded shadow">
          <p className="text-lg">🕵️ No entries found</p>
          <p className="text-sm mt-1">
            Try changing your filters or search term.
          </p>
        </div>
      ) : (
        visibleGroups.map(([month, groupEntries]) => (
          <JournalGroup key={month} month={month} entries={groupEntries} />
        ))
      )}

      {/* 🔽 Load More button at bottom (global) */}
      {visibleCount < filteredEntries.length && (
        <div className="flex justify-center my-6">
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + 10, filteredEntries.length)
              )
            }
            className="text-sm text-indigo-600 hover:underline cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
