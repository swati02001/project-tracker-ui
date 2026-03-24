import { useMemo } from "react";

const DAY_WIDTH = 40;

const priorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const TimelineView = ({ tasks }: any) => {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  
  const monthEnd = new Date(year, month + 1, 0);
  const totalDays = monthEnd.getDate();

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const todayPosition = today.getDate() * DAY_WIDTH;

  const rows = useMemo(() => {
    return tasks.map((task: any) => {
      const due = new Date(task.dueDate);
      const start = task.startDate ? new Date(task.startDate) : due;

      const safeStartDay =
        start.getMonth() === month ? start.getDate() : 1;

      const safeDueDay =
        due.getMonth() === month ? due.getDate() : totalDays;

      const left = (safeStartDay - 1) * DAY_WIDTH;
      const width = Math.max((safeDueDay - safeStartDay + 1) * DAY_WIDTH, 12);

      return {
        ...task,
        left,
        width,
      };
    });
  }, [tasks, month, totalDays]);
  if (!tasks.length) {
  return (
    <div className="bg-white/10 rounded-xl p-8 text-center text-gray-300">
      <div className="text-lg font-semibold mb-2">No timeline items</div>
      <div className="text-sm">There are no tasks for the current filters.</div>
    </div>
  );
}

  return (
    <div className="bg-white/10 rounded-xl p-4 overflow-x-auto">
      <div className="min-w-[1400px] relative">
        <div className="grid grid-cols-[240px_repeat(31,minmax(40px,1fr))] border-b border-white/10 sticky top-0 bg-gray-900/80 backdrop-blur z-10">
          <div className="p-3 font-semibold">Task</div>
          {days.map((day) => (
            <div key={day} className="p-3 text-xs text-center text-gray-300 border-l border-white/5">
              {day}
            </div>
          ))}
        </div>

        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-400 z-20"
          style={{ left: 240 + todayPosition }}
        />

        {rows.map((task: any) => (
          <div
            key={task.id}
            className="grid grid-cols-[240px_1fr] border-b border-white/5 min-h-[56px] items-center"
          >
            <div className="p-3 truncate">{task.title}</div>

            <div className="relative h-10">
              <div
                className={`absolute top-2 h-6 rounded ${priorityColor(task.priority)}`}
                style={{
                  left: task.left,
                  width: task.width,
                }}
                title={`${task.title}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};