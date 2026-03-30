import { useState, useCallback} from "react";
import { useBoardStore } from "@/store/useBoardStore";
import type { Task, SubTask, Status, Priority } from "@/types/board";

export const useTaskActions = (task: Task | null, initialStatus?: Status) => {
  const updateTask = useBoardStore((state) => state.updateTask);
  const addTask = useBoardStore((state) => state.addTask);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);

  const [createdTaskId, setCreatedTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDesc, setEditedDesc] = useState(task?.description || "");
  const [status, setStatus] = useState<Status>(task?.status || initialStatus || "todo");
  const [priority, setPriority] = useState<Priority>(task?.priority || "medium");
  const [startDate, setStartDate] = useState(task?.startDate || "");
  const [endDate, setEndDate] = useState(task?.endDate || "");
  
  const [localSubTasks, setLocalSubTasks] = useState<SubTask[]>(task?.subTasks || []);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");
  const [showAllHistory, setShowAllHistory] = useState(false);

  const targetId = task?.id || createdTaskId;

  const handleSyncData = useCallback((overrides?: Partial<Task>) => {
    const trimmedTitle = editedTitle.trim() || "UNTITLED MISSION";

    const currentData = {
      title: trimmedTitle,
      description: editedDesc,
      status,
      priority,
      startDate,
      endDate,
      subTasks: localSubTasks,
      ...overrides
    };

    if (task?.id) {
      updateTask(task.id, currentData);
    } else if (createdTaskId) {
      updateTask(createdTaskId, currentData);
    } else {
      const newId = addTask({
        ...currentData,
        projectId: activeProjectId,
      });
      setCreatedTaskId(newId);
    }
  }, [editedTitle, editedDesc, status, priority, startDate, endDate, localSubTasks, task, createdTaskId, addTask, updateTask, activeProjectId]);

  const handleToggleSubTask = useCallback((subTaskId: string) => {
    const updated = localSubTasks.map((st) =>
      st.id === subTaskId ? { ...st, isCompleted: !st.isCompleted } : st
    );
    setLocalSubTasks(updated);
    if (targetId) updateTask(targetId, { subTasks: updated });
  }, [localSubTasks, targetId, updateTask]);

  const handleAddSubTask = useCallback(() => {
    if (!newSubTaskTitle.trim()) return;
    const newSub: SubTask = {
      id: crypto.randomUUID(),
      title: newSubTaskTitle,
      isCompleted: false,
    };
    const updated = [...localSubTasks, newSub];
    setLocalSubTasks(updated);
    setNewSubTaskTitle("");
    if (targetId) updateTask(targetId, { subTasks: updated });
  }, [newSubTaskTitle, localSubTasks, targetId, updateTask]);

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
    localSubTasks,
    newSubTaskTitle, setNewSubTaskTitle,
    showAllHistory, setShowAllHistory,
    progress, completed, total,
    handleSyncData, handleToggleSubTask, handleAddSubTask,
    updateTask
  };
};