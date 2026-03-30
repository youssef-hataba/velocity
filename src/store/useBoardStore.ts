import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initialData from '../data/initial-data.json';
import type { Project, Status, Task, TaskHistory } from '../types/board';

interface BoardState {
  projects: Project[];
  tasks: Task[];
  activeProjectId: string;
  activeTab: string;
  setActiveProject: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveTab: (tabId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => string;
  moveTask: (taskId: string, newStatus: Status) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      projects: initialData.projects as Project[],
      tasks: initialData.tasks as Task[],
      activeProjectId: initialData.projects[0]?.id || '',
      activeTab: 'board',

      setActiveTab: (tabId) => set({ activeTab: tabId }),
      setActiveProject: (id) => set({ activeProjectId: id }),

      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),

      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),

      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        tasks: state.tasks.filter((t) => t.projectId !== id),
        activeProjectId: state.activeProjectId === id 
          ? (state.projects.find(p => p.id !== id)?.id || '') 
          : state.activeProjectId
      })),

      addTask: (task) => {
        const newId = crypto.randomUUID();
        const newTask: Task = {
          ...task,
          id: newId,
          createdAt: new Date().toISOString(),
          subTasks: task.subTasks || [],
          history: [
            {
              action: "created this task",
              user: "System Admin",
              date: new Date().toISOString()
            }
          ]
        } as Task;

        set((state) => ({ tasks: [...state.tasks, newTask] }));
        return newId;
      },

      moveTask: (taskId, newStatus) => set((state) => ({
        tasks: state.tasks.map((t) => {
          if (t.id === taskId && t.status !== newStatus) {
            const historyEntry: TaskHistory = {
              action: `moved task from ${t.status} to ${newStatus}`,
              user: "System Admin",
              date: new Date().toISOString()
            };

            return {
              ...t,
              status: newStatus,
              history: [...(t.history || []), historyEntry]
            };
          }
          return t;
        })
      })),

      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === taskId ? { ...t, ...updates } : t)
      })),

      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId)
      })),
    }),
    { name: 'volicity-storage' }
  )
);