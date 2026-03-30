export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'todo' | 'in-progress' | 'review' | 'done';

export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  subTasks: SubTask[];
  projectId: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  members: string[];
  createdAt: string;
}

export interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface PriorityStyle {
  bg: string;
  text: string;
  border: string;
  glow: string;
}

export const PRIORITY_CONFIGS: Record<Priority, PriorityStyle> = {
  urgent: {
    bg: "bg-urgent/14",
    text: "text-urgent",
    border: "border-urgent/20 group-hover:border-urgent/50",
    glow: "from-urgent/30",
  },
  high: {
    bg: "bg-high/10",
    text: "text-high",
    border: "border-high/20 group-hover:border-high/50",
    glow: "from-high/30",
  },
  medium: {
    bg: "bg-medium/5",
    text: "text-medium",
    border: "border-medium/20 group-hover:border-medium/50",
    glow: "from-medium/30",
  },
  low: {
    bg: "bg-low/10",
    text: "text-low",
    border: "border-low/20 group-hover:border-low/50",
    glow: "from-low/30",
  },
};