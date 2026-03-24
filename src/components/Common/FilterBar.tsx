import { useMemo } from "react";
import { useTaskStore } from "../../store/useTaskStore";

export const FilterBar = () => {
  const tasks = useTaskStore((s: any) => s.tasks);
  const filters = useTaskStore((s: any) => s.filters);
  const setFilters = useTaskStore((s: any) => s.setFilters);
  const clearFilters = useTaskStore((s: any) => s.clearFilters);

  const assignees = useMemo(() => {
  const uniqueAssignees = Array.from(
    new Set(tasks.map((t: any) => String(t.assignee)))
  );
  return uniqueAssignees as string[];
}, [tasks]);

  const toggleArrayFilter = (
    key: "status" | "priority" | "assignee",
    value: string
  ) => {
    const current = filters[key];
    const exists = current.includes(value);

    setFilters({
      [key]: exists
        ? current.filter((item: string) => item !== value)
        : [...current, value],
    });
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.priority.length > 0 ||
    filters.assignee.length > 0 ||
    filters.from ||
    filters.to;

  const pillClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-sm border transition ${
      active
        ? "bg-blue-500 text-white border-blue-400"
        : "bg-white/10 text-gray-200 border-white/10"
    }`;

  return (
    <div className="bg-white/10 rounded-xl p-4 mb-6 space-y-4">
      <div>
        <div className="text-sm font-semibold mb-2">Status</div>
        <div className="flex flex-wrap gap-2">
          {["todo", "inprogress", "review", "done"].map((item) => (
            <button
              key={item}
              onClick={() => toggleArrayFilter("status", item)}
              className={pillClass(filters.status.includes(item))}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold mb-2">Priority</div>
        <div className="flex flex-wrap gap-2">
          {["low", "medium", "high", "critical"].map((item) => (
            <button
              key={item}
              onClick={() => toggleArrayFilter("priority", item)}
              className={pillClass(filters.priority.includes(item))}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold mb-2">Assignee</div>
        <div className="flex flex-wrap gap-2">
          {assignees.map((item) => (
            <button
              key={item}
              onClick={() => toggleArrayFilter("assignee", item)}
              className={pillClass(filters.assignee.includes(item))}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm mb-1">From</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ from: e.target.value })}
            className="bg-gray-800 text-white rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">To</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ to: e.target.value })}
            className="bg-gray-800 text-white rounded px-3 py-2"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};