import { useBoardStore } from "../../store/useBoardStore";
import type { Status, Task } from "../../types/board";
import Column from "./Column";

const Board = () => {
  // Select state from store
  const tasks = useBoardStore((state) => state.tasks);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const projects = useBoardStore((state) => state.projects);

  // Get active project details
  const activeProject = projects.find((p) => p.id === activeProjectId);

  // 1. Filter tasks by active project
  const projectTasks = tasks.filter((task) => task.projectId === activeProjectId);

  // 2. Helper to get tasks by status
  const getTasksByStatus = (status: Status): Task[] => {
    return projectTasks.filter((task) => task.status === status);
  };

  // أضفنا "In Review" هنا ليكون العمود الثالث قبل "Done"
  const COLUMNS: { title: string; status: Status }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "In Review", status: "review" }, 
    { title: "Done", status: "done" },
  ];

  if (!activeProject) {
    return (
      <div className="flex items-center justify-center h-full text-muted/50 font-medium italic">
        Select a project from the sidebar to view the board
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Board Header Info */}
      <header className="flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full ${activeProject.color} shadow-lg shadow-primary/20`} />
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            {activeProject.name}
          </h2>
        </div>
        <p className="text-muted/60 text-[11px] font-bold uppercase tracking-[0.3em] px-8">
          Workflow Management Center
        </p>
      </header>

      {/* Columns Container */}
      <div className="flex-1 flex gap-8 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
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