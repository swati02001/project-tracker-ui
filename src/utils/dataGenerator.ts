const users = ["SV", "AK", "RM", "JP", "NS", "DK"];
const priorities = ["low", "medium", "high", "critical"];
const statuses = ["todo", "inprogress", "review", "done"];
const taskWords = [
  "Design",
  "Build",
  "Fix",
  "Test",
  "Deploy",
  "Review",
  "Refactor",
  "Document",
  "Plan",
  "Optimize",
];

export const generateTasks = (count: number) => {
  const tasks = [];

  for (let i = 1; i <= count; i++) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 8));

    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14) - 4);

    const hasStartDate = Math.random() > 0.2;

    tasks.push({
      id: i,
      title: `${taskWords[i % taskWords.length]} Task ${i}`,
      assignee: users[Math.floor(Math.random() * users.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: hasStartDate ? startDate.toISOString() : undefined,
      dueDate: dueDate.toISOString(),
    });
  }

  return tasks;
};