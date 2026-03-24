import { useEffect, useState } from "react";

const fakeUsers = [
  { id: 1, name: "Ava", color: "bg-pink-500" },
  { id: 2, name: "Noah", color: "bg-blue-500" },
  { id: 3, name: "Mia", color: "bg-green-500" },
];

export const PresenceBar = ({ tasks }: any) => {
  const [presence, setPresence] = useState<any[]>([]);

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
    <div className="bg-white/10 rounded-xl p-4 mb-4 flex items-center justify-between">
      <div className="text-sm text-gray-200">
        {presence.length} people are viewing this board
      </div>

      <div className="flex -space-x-2">
        {presence.map((user) => (
          <div
            key={user.id}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-gray-900 ${user.color}`}
            title={user.name}
          >
            {user.name[0]}
          </div>
        ))}
      </div>
    </div>
  );
};