import { useEffect, useMemo, useState } from "react";
import { Board } from "../components/Kanban/Board";
import { ListView } from "../components/List/ListView";
import { TimelineView } from "../components/Timeline/TimelineView";
import { FilterBar } from "../components/Common/FilterBar";
import { useTaskStore } from "../store/useTaskStore";
import { generateTasks } from "../utils/dataGenerator";
import { PresenceBar } from "../components/Common/PresenceBar";

export const Dashboard = () => {
  const [view, setView] = useState("kanban");

  const setTasks = useTaskStore((s: any) => s.setTasks);
  const tasks = useTaskStore((s: any) => s.tasks);
  const filters = useTaskStore((s: any) => s.filters);
  const setFilters = useTaskStore((s: any) => s.setFilters);

  useEffect(() => {
    const generated = generateTasks(500);
    setTasks(generated);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const status = params.get("status");
    const priority = params.get("priority");
    const assignee = params.get("assignee");
    const from = params.get("from");
    const to = params.get("to");
    const viewParam = params.get("view");

    setFilters({
      status: status ? status.split(",") : [],
      priority: priority ? priority.split(",") : [],
      assignee: assignee ? assignee.split(",") : [],
      from: from || "",
      to: to || "",
    });

    if (viewParam) setView(viewParam);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.status.length) params.set("status", filters.status.join(","));
    if (filters.priority.length) params.set("priority", filters.priority.join(","));
    if (filters.assignee.length) params.set("assignee", filters.assignee.join(","));
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);
    if (view) params.set("view", view);

    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [filters, view]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: any) => {
      const taskDate = new Date(task.dueDate);
      const fromOk = filters.from ? taskDate >= new Date(filters.from) : true;
      const toOk = filters.to ? taskDate <= new Date(filters.to) : true;

      const statusOk =
        filters.status.length === 0 || filters.status.includes(task.status);

      const priorityOk =
        filters.priority.length === 0 ||
        filters.priority.includes(task.priority);

      const assigneeOk =
        filters.assignee.length === 0 ||
        filters.assignee.includes(task.assignee);

      return fromOk && toOk && statusOk && priorityOk && assigneeOk;
    });
  }, [tasks, filters]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard </h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setView("kanban")}
          className={`px-4 py-2 rounded ${
            view === "kanban" ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          Kanban
        </button>

        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded ${
            view === "list" ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          List
        </button>

        <button
          onClick={() => setView("timeline")}
          className={`px-4 py-2 rounded ${
            view === "timeline" ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          Timeline
        </button>
      </div>

      <FilterBar />
      <PresenceBar tasks={filteredTasks} />

      {view === "kanban" && <Board tasks={filteredTasks} />}
      {view === "list" && <ListView tasks={filteredTasks} />}
      {view === "timeline" && <TimelineView tasks={filteredTasks} />}
    </div>
  );
};