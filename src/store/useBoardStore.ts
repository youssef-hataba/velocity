import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initialData from '../data/initial-data.json';
import type { Project, Status, Task } from '../types/board';

interface BoardState {
  // Data
  projects: Project[];
  tasks: Task[];
  activeProjectId: string;

  // Workspace Actions
  setActiveProject: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      // Initialize with data from JSON
      projects: initialData.projects as Project[],
      tasks: initialData.tasks as Task[],
      activeProjectId: initialData.projects[0]?.id || '',

      // Workspace Logic
      setActiveProject: (id) => set({ activeProjectId: id }),

      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: crypto.randomUUID() }]
      })),

      // Task Logic
      addTask: (task) => set((state) => ({
        tasks: [
          ...state.tasks, 
          { 
            ...task, 
            id: crypto.randomUUID(), 
            createdAt: new Date().toISOString() 
          } as Task
        ]
      })),

      moveTask: (taskId, newStatus) => set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      })),

      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === taskId ? { ...t, ...updates } : t
        )
      })),

      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId)
      })),
    }),
    {
      name: 'volicity-storage', // Key for LocalStorage
    }
  )
);