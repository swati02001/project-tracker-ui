import { create } from "zustand";

interface Filters {
  status: string[];
  priority: string[];
  assignee: string[];
  from: string;
  to: string;
}

interface TaskState {
  tasks: any[];
  filters: Filters;
  setTasks: (tasks: any[]) => void;
  moveTask: (id: number, newStatus: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
}

const initialFilters: Filters = {
  status: [],
  priority: [],
  assignee: [],
  from: "",
  to: "",
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filters: initialFilters,

  setTasks: (tasks) => set({ tasks }),

  moveTask: (id, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      ),
    })),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () => set({ filters: initialFilters }),
}));