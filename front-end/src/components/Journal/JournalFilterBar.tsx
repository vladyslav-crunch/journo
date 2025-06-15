export default function JournalFilterBar({
  search,
  setSearch,
  yearFilter,
  setYearFilter,
  monthFilter,
  setMonthFilter,
  allYears,
}: {
  search: string;
  setSearch: (v: string) => void;
  yearFilter: string;
  setYearFilter: (v: string) => void;
  monthFilter: string;
  setMonthFilter: (v: string) => void;
  allYears: number[];
}) {
  return (
    <div className="flex flex-col justify-center md:flex-row flex-wrap gap-4 m-6 items-start md:items-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-1/2"
      />

      <select
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="all">All Years</option>
        {allYears.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={monthFilter}
        onChange={(e) => setMonthFilter(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="all">All Months</option>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month, index) => (
          <option key={index} value={index.toString()}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}
