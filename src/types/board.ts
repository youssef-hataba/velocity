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