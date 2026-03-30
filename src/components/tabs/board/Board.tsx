import {useState, useMemo, type ChangeEvent} from "react";
import {DragDropContext} from "@hello-pangea/dnd";
import type {DropResult} from "@hello-pangea/dnd";
import {LayoutGrid} from "lucide-react";
import Column from "./Column";
import {BoardHeader} from "./BoardHeader";
import {BoardControls} from "./BoardControls";
import type {Status, Priority, Task} from "@/types/board";
import {useBoardStore} from "@/store/useBoardStore";

export type SortOption = "newest" | "priority" | "alphabetical";
type PriorityFilter = Priority | "all";

const COLUMNS: {title: string; status: Status}[] = [
  {title: "To Do", status: "todo"},
  {title: "In Progress", status: "in-progress"},
  {title: "In Review", status: "review"},
  {title: "Done", status: "done"},
];

const Board = () => {
  const tasksFromStore = useBoardStore((state) => state.tasks) || [];
  const moveTask = useBoardStore((state) => state.moveTask);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const projects = useBoardStore((state) => state.projects) || [];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePriority, setActivePriority] = useState<PriorityFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const filteredAndSortedTasks = useMemo(() => {
    const tasks = [...tasksFromStore];

    const filtered = tasks.filter((task: Task) => {
      const isInProject = task.projectId === activeProjectId;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesPriority = activePriority === "all" || task.priority === activePriority;

      return isInProject && matchesSearch && matchesPriority;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "priority") {
        const weight: Record<Priority, number> = {urgent: 4, high: 3, medium: 2, low: 1};
        return weight[b.priority] - weight[a.priority];
      }
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [tasksFromStore, activeProjectId, searchQuery, activePriority, sortBy]);

  const onDragEnd = (result: DropResult) => {
    const {destination, draggableId} = result;
    if (!destination) return;
    if (
      destination.droppableId === result.source.droppableId &&
      destination.index === result.source.index
    )
      return;

    moveTask(draggableId, destination.droppableId as Status);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-full flex flex-col gap-8">
        <BoardHeader project={activeProject} tasksCount={filteredAndSortedTasks.length} />

        <BoardControls
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activePriority={activePriority}
          onPriorityChange={setActivePriority}
          sortBy={sortBy}
          onSortChange={setSortBy}
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
    </DragDropContext>
  );
};

export default Board;
