import { format, isBefore, isToday, differenceInCalendarDays } from "date-fns";

export const Card = ({ task, viewers = [] }: any) => {
  const dueDate = new Date(task.dueDate);
  const today = new Date();

  const isOverdue = isBefore(dueDate, today) && !isToday(dueDate);
  const overdueDays = differenceInCalendarDays(today, dueDate);

  const getPriorityColor = () => {
    switch (task.priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDueText = () => {
    if (isToday(dueDate)) return "Due Today";
    if (isOverdue && overdueDays > 7) return `${overdueDays} days overdue`;
    if (isOverdue) return "Overdue";
    return format(dueDate, "dd MMM");
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", String(task.id));
      }}
      className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-md hover:scale-[1.02] transition-all mb-3 cursor-grab active:cursor-grabbing"
    >
      <h3 className="font-semibold text-white text-sm">
        {task.title}
      </h3>

      <div className="flex justify-between items-center mt-3">
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-xs font-bold">
          {task.assignee}
        </div>

        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor()}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center mt-2 -space-x-2">
        {viewers.slice(0, 2).map((viewer: any) => (
          <div
            key={viewer.id}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-gray-900 ${viewer.color}`}
            title={viewer.name}
          >
            {viewer.name[0]}
          </div>
        ))}
        {viewers.length > 2 && (
          <div className="w-6 h-6 rounded-full bg-gray-700 text-[10px] flex items-center justify-center ring-2 ring-gray-900">
            +{viewers.length - 2}
          </div>
        )}
      </div>

      <div
        className={`text-xs mt-2 ${
          isOverdue ? "text-red-400" : "text-gray-300"
        }`}
      >
        {getDueText()}
      </div>
    </div>
  );
};