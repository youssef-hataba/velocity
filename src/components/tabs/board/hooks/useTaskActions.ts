import { useState } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import type { Task, SubTask } from "@/types/board";

export const useTaskActions = (task: Task) => {
  const updateTask = useBoardStore((state) => state.updateTask);
  
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description || "");
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");
  const [showAllHistory, setShowAllHistory] = useState(false);

  const handleSyncData = () => {
    updateTask(task.id, { title: editedTitle, description: editedDesc });
  };

  const handleToggleSubTask = (subTaskId: string) => {
    const updatedSubTasks = task.subTasks.map(st => 
      st.id === subTaskId ? { ...st, isCompleted: !st.isCompleted } : st
    );
    updateTask(task.id, { subTasks: updatedSubTasks });
  };

  const handleAddSubTask = () => {
    if (!newSubTaskTitle.trim()) return;
    const newSub: SubTask = {
      id: crypto.randomUUID(),
      title: newSubTaskTitle,
      isCompleted: false
    };
    updateTask(task.id, { subTasks: [...(task.subTasks || []), newSub] });
    setNewSubTaskTitle("");
  };

  const total = task.subTasks?.length || 0;
  const completed = task.subTasks?.filter(st => st.isCompleted).length || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    editedTitle, setEditedTitle,
    editedDesc, setEditedDesc,
    newSubTaskTitle, setNewSubTaskTitle,
    showAllHistory, setShowAllHistory,
    progress, completed, total,
    handleSyncData, handleToggleSubTask, handleAddSubTask,
    updateTask
  };
};