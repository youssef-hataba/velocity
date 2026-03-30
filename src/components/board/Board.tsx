import { useBoardStore } from "../../store/useBoardStore";
import type { Status, Task } from "../../types/board";
import Column from "./Column";
import { LayoutGrid } from "lucide-react";

const Board = () => {
  const tasks = useBoardStore((state) => state.tasks);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const projects = useBoardStore((state) => state.projects);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const projectTasks = tasks.filter((task) => task.projectId === activeProjectId);

  const getTasksByStatus = (status: Status): Task[] => {
    return projectTasks.filter((task) => task.status === status);
  };

  const COLUMNS: { title: string; status: Status }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "In Review", status: "review" },
    { title: "Done", status: "done" },
  ];

  if (!activeProject) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="p-6 rounded-3xl bg-steel/5 border border-steel/10">
          <LayoutGrid size={40} className="text-muted/20 animate-pulse" />
        </div>
        <p className="text-muted/50 font-black uppercase tracking-[0.2em] text-[10px]">
          Select a project to initiate workflow
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-10">
      <header className="flex flex-col gap-2 shrink-0 px-2">
        <div className="flex items-center gap-4">
          <div
            className={`w-5 h-5 rounded-full ${activeProject.color} shadow-[0_0_15px_rgba(var(--color-primary),0.4)] border-2 border-white/20 dark:border-white/10`}
          />
          <h2 className="text-4xl font-black tracking-tighter text-foreground drop-shadow-sm">
            {activeProject.name}
          </h2>
          <span className="ml-2 px-3 py-1 rounded-full bg-steel/10 dark:bg-steel/40 text-muted/60 text-[10px] font-bold border border-steel/10">
            {projectTasks.length} Total Tasks
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-primary/40" />
          <p className="text-muted/40 dark:text-muted-foreground/30 text-[11px] font-black uppercase tracking-widest">
            Workflow Management Center
          </p>
        </div>
      </header>

      <div className="flex-1 flex gap-8 overflow-x-auto pb-10 pr-10 custom-scrollbar scroll-smooth items-start">
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={getTasksByStatus(col.status)}
            onTaskClick={(task) => console.log("Task Clicked:", task)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;