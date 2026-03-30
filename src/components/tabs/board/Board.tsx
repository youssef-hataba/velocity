import Column from "./Column";
import { LayoutGrid } from "lucide-react";
import { BoardHeader } from "./BoardHeader";
import type { Status } from "@/types/board";
import { useBoardStore } from "@/store/useBoardStore";

const COLUMNS: { title: string; status: Status }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "In Review", status: "review" },
  { title: "Done", status: "done" },
];

const Board = () => {
  const tasks = useBoardStore((state) => state.tasks) || [];
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const projects = useBoardStore((state) => state.projects) || [];

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const projectTasks = tasks.filter((task) => task.projectId === activeProjectId);

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
    <div className="h-full flex flex-col gap-12">
      <BoardHeader project={activeProject} tasksCount={projectTasks.length} />

      <div className="flex-1 flex gap-8 overflow-x-auto pb-10 pr-10 custom-scrollbar scroll-smooth items-start">
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={projectTasks.filter((t) => t.status === col.status)}
            onTaskClick={(task) => console.log("Task:", task)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;