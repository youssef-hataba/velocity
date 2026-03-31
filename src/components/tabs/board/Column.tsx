import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, MoreHorizontal } from "lucide-react";
import type { Status, Task } from "@/types/board";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
}

const Column = ({ title, status, tasks }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const statusConfig: Record<Status, { dot: string; glow: string }> = {
    "todo": { dot: "bg-slate-400", glow: "shadow-none" },
    "in-progress": { dot: "bg-blue-500", glow: "shadow-[0_0_12px_rgba(59,130,246,0.5)]" },
    "review": { dot: "bg-amber-500", glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]" },
    "done": { dot: "bg-emerald-500", glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex flex-col w-90 min-w-70 h-full group/column relative rounded-[2.5rem] bg-surface/20 border border-steel/10 py-3 px-1 pb-0 backdrop-blur-sm transition-all duration-500">
      <header className="relative p-5 mx-2 rounded-[1.8rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-card/20 backdrop-blur-2xl flex items-center justify-between shadow-sm transition-all duration-500 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${config.dot} ${config.glow}`} />
          <h2 className="font-black text-[10px] uppercase tracking-[0.3em] text-foreground/70">{title}</h2>
          <div className="bg-steel/10 text-muted/60 px-2.5 py-0.5 rounded-full text-[9px] font-black border border-steel/5">{tasks.length}</div>
        </div>
        <button className="text-muted/30 hover:text-primary transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </header>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`flex-1 overflow-y-auto space-y-5 px-2 py-6 mt-2 custom-scrollbar transition-all duration-300 rounded-4xl ${
            isOver ? "bg-primary/5 ring-2 ring-primary/10" : ""
          }`}
        >
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))
          ) : (
            <div className="h-44 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 border-primary/10 bg-primary/5">
              <Plus size={20} className="text-steel" />
              <p className="text-[9px] uppercase tracking-[0.2em] font-black text-muted/20">Empty Sequence</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;