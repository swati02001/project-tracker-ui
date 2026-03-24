import { useEffect, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { Card } from "./Card";

const fakeUsers = [
  { id: 1, name: "Ava", color: "bg-pink-500" },
  { id: 2, name: "Noah", color: "bg-blue-500" },
  { id: 3, name: "Mia", color: "bg-green-500" },
];

export const Board = ({ tasks }: any) => {
  const moveTask = useTaskStore((s: any) => s.moveTask);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [presence, setPresence] = useState<any[]>([]);

  const columns = ["todo", "inprogress", "review", "done"];

  useEffect(() => {
    if (!tasks.length) return;

    const assignRandom = () => {
      const next = fakeUsers.map((user) => ({
        ...user,
        taskId: tasks[Math.floor(Math.random() * tasks.length)]?.id,
      }));
      setPresence(next);
    };

    assignRandom();
    const interval = setInterval(assignRandom, 2500);
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => (
        <div
          key={col}
          onDragOver={(e) => {
            e.preventDefault();
            setActiveColumn(col);
          }}
          onDragLeave={() => {
            setActiveColumn((prev) => (prev === col ? null : prev));
          }}
          onDrop={(e) => {
            const taskId = e.dataTransfer.getData("taskId");
            moveTask(Number(taskId), col);
            setActiveColumn(null);
          }}
          className={`p-4 rounded-lg min-h-[300px] transition-all ${
            activeColumn === col
              ? "bg-blue-500/20 ring-2 ring-blue-400"
              : "bg-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold uppercase">{col}</h2>
            <span className="text-sm text-gray-300">
              {tasks.filter((t: any) => t.status === col).length}
            </span>
          </div>

          {tasks.filter((t: any) => t.status === col).length === 0 ? (
            <div className="text-sm text-gray-400 border border-dashed border-white/20 rounded-lg p-4 text-center">
              No tasks
            </div>
          ) : (
            tasks
              .filter((t: any) => t.status === col)
              .map((task: any) => {
                const viewers = presence.filter((p: any) => p.taskId === task.id);

                return <Card key={task.id} task={task} viewers={viewers} />;
              })
          )}
        </div>
      ))}
    </div>
  );
};