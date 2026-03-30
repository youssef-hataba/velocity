import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Calendar, CheckSquare, Zap } from "lucide-react";
import { useState } from "react";
import type { Priority, Task } from "@/types/board";
import { TaskDetailsModal } from "./TaskDetailsModal";

interface TaskCardProps {
  task: Task;
  index: number;
  isOverlay?: boolean;
}

const getPriorityConfig = (priority: Priority) => {
  const configs: Record<
    Priority,
    { bg: string; text: string; border: string; glow: string }
  > = {
    urgent: {
      bg: "bg-urgent/14",
      text: "text-urgent",
      border: "border-urgent/20 group-hover:border-urgent/50",
      glow: "from-urgent/30"
    },
    high: {
      bg: "bg-high/10",
      text: "text-high",
      border: "border-high/20 group-hover:border-high/50",
      glow: "from-high/30"
    },
    medium: {
      bg: "bg-medium/5",
      text: "text-medium",
      border: "border-medium/20 group-hover:border-medium/50",
      glow: "from-medium/30"
    },
    low: {
      bg: "bg-low/10",
      text: "text-low",
      border: "border-low/20 group-hover:border-low/50",
      glow: "from-low/30"
    }
  };
  return configs[priority];
};

const TaskCard = ({ task, isOverlay }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const config = getPriorityConfig(task.priority);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  const totalSubTasks = task.subTasks?.length || 0;
  const completedSubTasks =
    task.subTasks?.filter((st) => st.isCompleted).length || 0;
  const progressPercentage =
    totalSubTasks > 0
      ? Math.round((completedSubTasks / totalSubTasks) * 100)
      : 0;

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-50 rounded-4xl border-2 border-dashed border-white/5 bg-white/2"
      />
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="outline-none touch-none"
      >
        <motion.div
          layoutId={task.id}
          onClick={() => setIsModalOpen(true)}
          whileHover={!isOverlay ? { y: -5, scale: 1.01 } : {}}
          className={`
            relative group p-6 rounded-4xl cursor-grab active:cursor-grabbing transition-all duration-500 overflow-hidden backdrop-blur-xl border shadow-sm
            ${config.bg} ${config.border}
            ${isOverlay ? "shadow-2xl z-50 border-primary/50 cursor-grabbing" : ""}
          `}
        >
          <div
            className={`
              absolute -right-8 -top-8 w-28 h-28 bg-linear-to-br ${config.glow} to-transparent 
              rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
            `}
          />

          <header className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/40 dark:bg-black/20 border border-white/20">
              <Zap size={10} className={`${config.text} fill-current`} />
              <span
                className={`text-[9px] font-black uppercase tracking-[0.15em] ${config.text}`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground/30 text-[9px] font-bold uppercase tracking-wider">
              <Calendar size={12} />
              {new Date(task.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric"
              })}
            </div>
          </header>

          <div className="relative z-10 mb-6 space-y-2">
            <h3 className="text-[15px] font-bold leading-tight tracking-wider text-foreground/90">
              {task.title}
            </h3>
            <p className="text-[11.5px] text-foreground/60 leading-relaxed font-medium line-clamp-2">
              {task.description}
            </p>
          </div>

          <footer className="relative z-10 pt-5 border-t border-black/5 dark:border-white/5">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-foreground/40">
                <CheckSquare size={13} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {completedSubTasks}/{totalSubTasks}
                </span>
              </div>
              <span
                className={`text-[11px] font-black ${config.text} tabular-nums`}
              >
                {progressPercentage}%
              </span>
            </div>

            <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden p-px">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              />
            </div>
          </footer>
        </motion.div>
      </div>

      {!isOverlay && (
        <TaskDetailsModal
          task={task}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
};

export default TaskCard;