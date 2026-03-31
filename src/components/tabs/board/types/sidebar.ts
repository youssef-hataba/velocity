import type { Priority, Status, Task } from "@/types/board";
import type { TaskAIResult } from "../hooks/useTaskAI";

export interface TaskUpdate {
  status?: Status;
  priority?: Priority;
  startDate?: string;
  endDate?: string;
  progress?: number;
}

export interface SidebarProps {
  task: Task | null;
  ai: TaskAIResult;
  status: Status;
  priority: Priority;
  startDate: string;
  endDate: string;
  progress: number;
  setStatus: (s: Status) => void;
  setPriority: (p: Priority) => void;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  handleSyncData: (overrides?: TaskUpdate) => void;
  showAllHistory: boolean;
  setShowAllHistory: (val: boolean) => void;
}

export interface MetricsProps {
  progress: number;
  status: Status;
  priority: Priority;
  setStatus: (s: Status) => void;
  setPriority: (p: Priority) => void;
  onSync: (update: TaskUpdate) => void;
}

export interface TimelineProps {
  task: Task | null;
  startDate: string;
  endDate: string;
  showAllHistory: boolean;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  setShowAllHistory: (val: boolean) => void;
  onSync: (update: TaskUpdate) => void;
}