import { useState, useCallback, useRef } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import type { Task, SubTask, Status, Priority } from "@/types/board";

export const useTaskActions = (task: Task | null, initialStatus?: Status) => {
  const updateTask = useBoardStore((state) => state.updateTask);
  const addTask = useBoardStore((state) => state.addTask);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);

  const createdTaskIdRef = useRef<string | null>(null);

  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDesc, setEditedDesc] = useState(task?.description || "");
  const [status, setStatus] = useState<Status>(task?.status || initialStatus || "todo");
  const [priority, setPriority] = useState<Priority>(task?.priority || "medium");
  const [startDate, setStartDate] = useState(task?.startDate || "");
  const [endDate, setEndDate] = useState(task?.endDate || "");
  const [localSubTasks, setLocalSubTasks] = useState<SubTask[]>(task?.subTasks || []);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");
  const [showAllHistory, setShowAllHistory] = useState(false);

  const handleSyncData = useCallback((overrides?: Partial<Task>) => {
    const trimmedTitle = (overrides?.title ?? editedTitle).trim() || "UNTITLED MISSION";
    
    const currentData = {
      title: trimmedTitle,
      description: overrides?.description ?? editedDesc,
      status: overrides?.status ?? status,
      priority: overrides?.priority ?? priority,
      startDate: overrides?.startDate ?? startDate,
      endDate: overrides?.endDate ?? endDate,
      subTasks: overrides?.subTasks ?? localSubTasks,
    };

    const targetId = task?.id || createdTaskIdRef.current;

    if (targetId) {
      updateTask(targetId, currentData);
    } else {
      const newId = addTask({
        ...currentData,
        projectId: activeProjectId,
      });
      createdTaskIdRef.current = newId;
    }
  }, [editedTitle, editedDesc, status, priority, startDate, endDate, localSubTasks, task, addTask, updateTask, activeProjectId]);

  const handleToggleSubTask = useCallback((subTaskId: string) => {
    setLocalSubTasks((prev) => {
      const updated = prev.map((st) =>
        st.id === subTaskId ? { ...st, isCompleted: !st.isCompleted } : st
      );
      const targetId = task?.id || createdTaskIdRef.current;
      if (targetId) {
        updateTask(targetId, { subTasks: updated });
      }
      return updated;
    });
  }, [task, updateTask]);

  const handleAddSubTask = useCallback(() => {
    if (!newSubTaskTitle.trim()) return;
    const newSub: SubTask = {
      id: crypto.randomUUID(),
      title: newSubTaskTitle.trim(),
      isCompleted: false,
    };
    
    setLocalSubTasks((prev) => {
      const updated = [...prev, newSub];
      handleSyncData({ subTasks: updated });
      return updated;
    });
    
    setNewSubTaskTitle("");
  }, [newSubTaskTitle, handleSyncData]);

  const total = localSubTasks.length;
  const completed = localSubTasks.filter((st) => st.isCompleted).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    editedTitle, setEditedTitle,
    editedDesc, setEditedDesc,
    status, setStatus,
    priority, setPriority,
    startDate, setStartDate,
    endDate, setEndDate,
    localSubTasks, setLocalSubTasks,
    newSubTaskTitle, setNewSubTaskTitle,
    showAllHistory, setShowAllHistory,
    progress, completed, total,
    handleSyncData, handleToggleSubTask, handleAddSubTask,
  };
};