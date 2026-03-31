import { useState, useMemo } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  defaultDropAnimationSideEffects,
  type DragStartEvent, 
  type DragEndEvent,
  type DropAnimation
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { LayoutGrid } from "lucide-react";

import Column from "./Column";
import { BoardHeader } from "./BoardHeader";
import { BoardControls } from "./BoardControls";
import TaskCard from "./TaskCard"; 
import { TaskDetailsModal } from "./task_modal/TaskDetailsModal";

import type { Status, Priority, Task } from "@/types/board";
import { useBoardStore } from "@/store/useBoardStore";

export type SortOption = "newest" | "priority" | "alphabetical";
export type PriorityFilter = Priority | "all";

const COLUMNS: { title: string; status: Status }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "In Review", status: "review" },
  { title: "Done", status: "done" },
];

const Board = () => {
  const tasksFromStore = useBoardStore((state) => state.tasks);
  const moveTask = useBoardStore((state) => state.moveTask);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const projects = useBoardStore((state) => state.projects) || [];

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePriority, setActivePriority] = useState<PriorityFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const filteredAndSortedTasks = useMemo(() => {
    const tasks = (tasksFromStore || []).slice();

    const filtered = tasks.filter((task: Task) => {
      const isInProject = task.projectId === activeProjectId;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesPriority = activePriority === "all" || task.priority === activePriority;

      return isInProject && matchesSearch && matchesPriority;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const weight: Record<Priority, number> = { urgent: 4, high: 3, medium: 2, low: 1 };
        return weight[b.priority] - weight[a.priority];
      }
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [tasksFromStore, activeProjectId, searchQuery, activePriority, sortBy]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = filteredAndSortedTasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
      document.body.style.overflow = "hidden";
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    document.body.style.overflow = "";

    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    const newStatus = COLUMNS.some(c => c.status === overId) 
      ? (overId as Status) 
      : (filteredAndSortedTasks.find(t => t.id === overId)?.status as Status);

    if (newStatus) {
      moveTask(taskId, newStatus);
    }
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  if (!activeProject) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 opacity-50">
        <div className="p-8 rounded-[3rem] bg-steel/5 border border-white/5 shadow-2xl">
          <LayoutGrid size={48} className="text-primary/20 animate-pulse" />
        </div>
        <p className="text-muted/30 font-black uppercase tracking-[0.4em] text-[9px]">
          Select project to synchronize
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full flex flex-col gap-8">
        <BoardHeader project={activeProject} tasksCount={filteredAndSortedTasks.length} />

        <BoardControls
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          activePriority={activePriority}
          onPriorityChange={setActivePriority}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onCreateClick={() => setIsCreateModalOpen(true)}
        />

        <div className="flex-1 flex gap-8 overflow-x-auto pb-10 pr-10 custom-scrollbar scroll-smooth items-start">
          {COLUMNS.map((col) => (
            <Column
              key={col.status}
              title={col.title}
              status={col.status}
              tasks={filteredAndSortedTasks.filter((t) => t.status === col.status)}
            />
          ))}
        </div>
      </div>

      <TaskDetailsModal 
        task={null} 
        initialStatus="todo"
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
          <div className="cursor-grabbing scale-105 rotate-2 transition-transform duration-200 shadow-2xl">
            <TaskCard task={activeTask} index={0} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;