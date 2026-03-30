import { Plus, MoreHorizontal } from "lucide-react";
import type { Status, Task } from "../../types/board";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const Column = ({ title, status, tasks, onTaskClick }: ColumnProps) => {
  const statusConfig: Record<Status, { accent: string; dot: string }> = {
    "todo": { accent: "from-steel/40 to-transparent", dot: "bg-faint" },
    "in-progress": { accent: "from-primary/20 to-transparent", dot: "bg-primary shadow-glow" },
    "review": { accent: "from-amber-500/20 to-transparent", dot: "bg-amber-500 shadow-glow" },
    "done": { accent: "from-success/20 to-transparent", dot: "bg-success shadow-glow" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex flex-col w-90 min-w-70 h-full group/column relative rounded-3xl bg-surface/30 border border-steel/10 p-2 pb-0">
      <header
        className={`
          relative p-4 rounded-2xl border border-white/5 
          bg-linear-to-br ${config.accent} backdrop-blur-xl
          flex items-center justify-between shadow-sm
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          <h2 className="font-black text-[11px] uppercase tracking-[0.2em] text-foreground/80">
            {title}
          </h2>
          <span className="bg-background/20 text-faint px-2 py-0.5 rounded-lg text-[10px] font-bold border border-white/5">
            {tasks.length}
          </span>
        </div>

        <button className="text-faint/40 hover:text-primary transition-colors duration-300">
          <MoreHorizontal size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 px-2 custom-scrollbar scroll-smooth py-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} onClick={onTaskClick} />)
        ) : (
          <div className="group/empty h-40 border-2 border-dashed border-steel/10 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:border-primary/20 hover:bg-primary/5">
            <div className="p-3 rounded-full bg-surface/50 text-steel group-hover/empty:text-primary/40 transition-colors">
              <Plus size={20} />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-black text-faint/20 group-hover/empty:text-primary/40 transition-colors">
              Empty Column
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 right-6">
          <button
            title="Add Task"
            className="
              w-11 h-11 rounded-2xl bg-primary text-white 
              shadow-2xl shadow-primary/40 flex items-center justify-center 
              hover:scale-110 active:scale-95 hover:rotate-90
              transition-all duration-500 backdrop-blur-md border border-white/20
              group/fab
            "
          >
            <Plus size={22} strokeWidth={3} className="group-hover/fab:scale-110" />
          </button>
        </div>
    </div>
  );
};

export default Column;