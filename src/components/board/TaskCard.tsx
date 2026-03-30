import { motion } from "framer-motion";
import { Calendar, CheckSquare, Zap } from "lucide-react";
import type { Priority, Task } from "../../types/board";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

const getPriorityConfig = (priority: Priority) => {
  const configs: Record<Priority, { bg: string; text: string; ring: string; glow: string; icon: string }> = {
    urgent: { 
      bg: "bg-urgent/10 dark:bg-urgent/15", 
      text: "text-urgent", 
      ring: "group-hover:border-urgent/30 dark:group-hover:border-urgent/50", 
      glow: "from-urgent/20",
      icon: "text-urgent" 
    },
    high: { 
      bg: "bg-high/10 dark:bg-high/15", 
      text: "text-high", 
      ring: "group-hover:border-high/30 dark:group-hover:border-high/50", 
      glow: "from-high/20",
      icon: "text-high"
    },
    medium: { 
      bg: "bg-medium/10 dark:bg-medium/15", 
      text: "text-medium", 
      ring: "group-hover:border-medium/30 dark:group-hover:border-medium/50", 
      glow: "from-medium/20",
      icon: "text-medium"
    },
    low: { 
      bg: "bg-low/10 dark:bg-low/15", 
      text: "text-low", 
      ring: "group-hover:border-low/30 dark:group-hover:border-low/50", 
      glow: "from-low/20",
      icon: "text-low"
    },
  };
  return configs[priority];
};

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const config = getPriorityConfig(task.priority);

  const totalSubTasks = task.subTasks.length;
  const completedSubTasks = task.subTasks.filter((st) => st.isCompleted).length;
  const progressPercentage = totalSubTasks > 0 
    ? Math.round((completedSubTasks / totalSubTasks) * 100) 
    : 0;

  return (
    <motion.div
      layoutId={task.id}
      onClick={() => onClick(task)}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative group p-6 rounded-[2rem] cursor-pointer 
        transition-all duration-500 overflow-hidden select-none
        bg-card/40 dark:bg-card/20 backdrop-blur-md
        border border-black/5 dark:border-white/5
        shadow-sm hover:shadow-cinematic
        ${config.ring} hover:border-opacity-100
      `}
    >
      {/* Cinematic Glows - مخففة في اللايت مود وقوية في الدارك */}
      <div className={`absolute -right-8 -top-8 w-28 h-28 bg-linear-to-br ${config.glow} to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Priority Badge & Date */}
      <header className="flex justify-between items-center mb-6 relative z-10">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${config.bg} border border-transparent group-hover:border-current transition-colors duration-500`}>
          <Zap size={10} className={`${config.icon} fill-current opacity-80`} />
          <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${config.text}`}>
            {task.priority}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted/40 text-[9px] font-bold uppercase tracking-wider">
          <Calendar size={12} />
          {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </header>

      {/* Content Area */}
      <div className="relative z-10 mb-6 space-y-2">
        <h3 className="text-[15px] font-extrabold leading-tight tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-300">
          {task.title}
        </h3>
        <p className="text-[11.5px] text-muted/70 leading-relaxed font-medium line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* Progress Footer */}
      <footer className="relative z-10 pt-5 border-t border-black/5 dark:border-white/5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-muted/50">
            <CheckSquare size={13} className="opacity-70" />
            <span className="text-[10px] font-black uppercase tracking-widest">{completedSubTasks}/{totalSubTasks}</span>
          </div>
          <span className={`text-[11px] font-black ${config.text} tabular-nums`}>
            {progressPercentage}%
          </span>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden p-[1px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
          />
        </div>
      </footer>
    </motion.div>
  );
};

export default TaskCard;