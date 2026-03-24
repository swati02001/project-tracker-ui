import { useMemo, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { useVirtualScroll } from "../../hooks/useVirtualScroll";

export const ListView = ({ tasks }: any) => {
  const moveTask = useTaskStore((s: any) => s.moveTask);
  const [sortKey, setSortKey] = useState<"title" | "priority" | "dueDate">("title");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const priorityOrder: Record<string, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedTasks = useMemo(() => {
    const copied = [...tasks];

    copied.sort((a: any, b: any) => {
      let result = 0;

      if (sortKey === "title") {
        result = a.title.localeCompare(b.title);
      }

      if (sortKey === "priority") {
        result = priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (sortKey === "dueDate") {
        result = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      return direction === "asc" ? result : -result;
    });

    return copied;
  }, [tasks, sortKey, direction]);
  const { totalHeight, visibleItems, offsetY, setScrollTop } =
  useVirtualScroll(sortedTasks);
  if (!tasks.length) {
  return (
    <div className="bg-white/10 rounded-xl p-8 text-center text-gray-300">
      <div className="text-lg font-semibold mb-2">No tasks found</div>
      <div className="text-sm">Try changing or clearing your filters.</div>
    </div>
  );
  }

  const handleSort = (key: "title" | "priority" | "dueDate") => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  return (
    <div className="bg-white/10 rounded-xl overflow-hidden">
    
    {/* Header */}
    <div className="grid grid-cols-5 gap-4 p-4 font-semibold border-b border-white/10">
      <button onClick={() => handleSort("title")} className="text-left">
        Title {sortKey === "title" ? (direction === "asc" ? "↑" : "↓") : ""}
      </button>
      <div>Assignee</div>
      <button onClick={() => handleSort("priority")} className="text-left">
        Priority {sortKey === "priority" ? (direction === "asc" ? "↑" : "↓") : ""}
      </button>
      <button onClick={() => handleSort("dueDate")} className="text-left">
        Due Date {sortKey === "dueDate" ? (direction === "asc" ? "↑" : "↓") : ""}
      </button>
      <div>Status</div>
    </div>

    {/* Virtual Scroll Container */}
    <div
      className="h-[500px] overflow-auto"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((task: any) => (
            <div
              key={task.id}
              className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 items-center"
            >
              <div>{task.title}</div>
              <div>{task.assignee}</div>
              <div className="capitalize">{task.priority}</div>
              <div>{new Date(task.dueDate).toLocaleDateString()}</div>
              <select
                value={task.status}
                onChange={(e) => moveTask(task.id, e.target.value)}
                className="bg-gray-800 text-white rounded px-2 py-1"
              >
                <option value="todo">todo</option>
                <option value="inprogress">inprogress</option>
                <option value="review">review</option>
                <option value="done">done</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};