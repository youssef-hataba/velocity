import { motion } from "framer-motion";
import { Calendar, CheckSquare, Zap } from "lucide-react";
import type { Priority, Task } from "../../types/board";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

// --- Helper for Dynamic Card & Accent Colors ---
const getPriorityConfig = (priority: Priority) => {
  const configs: Record<Priority, { bg: string; text: string; ring: string; glow: string; icon: string }> = {
    urgent: { 
      bg: "bg-urgent/15", // Red
      text: "text-urgent", 
      ring: "group-hover:ring-urgent/30", 
      glow: "from-urgent/20",
      icon: "text-urgent" 
    },
    high: { 
      bg: "bg-high/15", // Orange/Amber
      text: "text-high", 
      ring: "group-hover:ring-high/30", 
      glow: "from-high/20",
      icon: "text-high"
    },
    medium: { 
      bg: "bg-medium/15", // Sky Blue
      text: "text-medium", 
      ring: "group-hover:ring-medium/30", 
      glow: "from-medium/20",
      icon: "text-medium"
    },
    low: { 
      bg: "bg-low/15", // Purple
      text: "text-low", 
      ring: "group-hover:ring-low/30", 
      glow: "from-low/20",
      icon: "text-low"
    },
  };
  return configs[priority];
};

// --- Main Component ---
const TaskCard = ({ task, onClick }: TaskCardProps) => {
  // 1. Get visual config based on priority
  const config = getPriorityConfig(task.priority);

  // 2. Calculate progress
  const totalSubTasks = task.subTasks.length;
  const completedSubTasks = task.subTasks.filter((st) => st.isCompleted).length;
  const progressPercentage = totalSubTasks > 0 
    ? Math.round((completedSubTasks / totalSubTasks) * 100) 
    : 0;

  return (
    <motion.div
      layoutId={task.id}
      onClick={() => onClick(task)}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      // Updated cinematic classes for better glass and colors
      className={`
        relative group p-6 rounded-3xl cursor-pointer 
        backdrop-blur-xl border border-white/5 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] 
        transition-all duration-300 overflow-hidden select-none
        bg-card/40 ${config.ring} group-hover:ring-1 group-hover:shadow-cinematic
        ${config.bg}
      `}
    >
      {/* 3. Deep Cinematic Glow on Hover */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br ${config.glow} to-transparent rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-500`} />
      <div className={`absolute left-1/2 bottom-0 w-2/3 h-1 ${config.glow} blur-lg group-hover:opacity-100 opacity-50 transition-opacity`} />

      {/* 4. Priority Badge */}
      <header className="flex justify-between items-start mb-5 relative z-10">
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${config.bg} border ${config.ring}`}>
          <Zap size={12} className={config.icon} />
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${config.text}`}>
            {task.priority}
          </span>
        </div>
        
        {/* Date */}
        <div className="flex items-center gap-1.5 text-muted/50 text-[10px] font-semibold bg-secondary/30 px-2 py-1 rounded-full border border-border/40">
          <Calendar size={11} className="text-muted/60" />
          {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </header>

      {/* 5. Title & Description */}
      <div className="relative z-10 space-y-2 mb-6">
        <h3 className="text-sm font-extrabold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {task.title}
        </h3>
        <p className="text-[11px] text-muted leading-relaxed font-medium line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* 6. Cinematic Progress Section */}
      <footer className="pt-5 border-t border-white/5 relative z-10">
        <div className="flex justify-between items-end mb-2.5">
          <div className="flex items-center gap-2 text-muted/60">
            <CheckSquare size={14} className="text-muted/70" />
            <span className="text-[11px] font-bold">{completedSubTasks}/{totalSubTasks} subtasks</span>
          </div>
          <span className={`text-xs font-black ${config.text} tabular-nums tracking-tight`}>
            {progressPercentage}%
          </span>
        </div>

          <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "circOut" }}
              className={`h-full bg-linear-to-r from-primary to-${config.text.split('-')[1]} rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]`}
            />
          </div>
      </footer>
    </motion.div>
  );
};

export default TaskCard;