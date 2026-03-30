import {useMemo} from "react";
import {motion} from "framer-motion";
import {CheckCircle2, Clock, Users, Flame, Target, TrendingUp} from "lucide-react";
import {type Task, type Priority, PRIORITY_CONFIGS} from  "@/types/board";

interface Props {
  tasks: Task[];
}

export const ProjectAnalytics = ({tasks}: Props) => {
  // 1. حسابات الـ Progress العام
  const overallStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const pending = total - completed;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    const urgentRemaining = tasks.filter(
      (t) => (t.priority === "urgent" || t.priority === "high") && t.status !== "done",
    ).length;

    return {total, completed, pending, progress, urgentRemaining};
  }, [tasks]);

  const priorityDistribution = useMemo(() => {
    const counts: Record<Priority, number> = {urgent: 0, high: 0, medium: 0, low: 0};
    tasks.forEach((t) => counts[t.priority]++);
    return counts;
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      <div className="lg:col-span-4 bg-steel/5 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-8 flex items-center gap-2">
          <Target size={14} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
            Project Velocity
          </span>
        </div>

        <div className="relative w-40 h-40 flex items-center justify-center mt-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={440}
              initial={{strokeDashoffset: 440}}
              animate={{strokeDashoffset: 440 - (440 * overallStats.progress) / 100}}
              transition={{duration: 1.5, ease: "easeOut"}}
              className="text-primary"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black tracking-tighter">
              {Math.round(overallStats.progress)}%
            </span>
            <span className="text-[8px] font-black opacity-30 uppercase">Done</span>
          </div>
        </div>
      </div>

      {/* --- Card 2: Productivity Insights (8 Columns) --- */}
      <div className="lg:col-span-8 bg-steel/5 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
              Efficiency Metrics
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Priority Bars */}
          <div className="space-y-4">
            {(Object.keys(PRIORITY_CONFIGS) as Priority[]).map((p) => {
              const count = priorityDistribution[p];
              const percentage = overallStats.total > 0 ? (count / overallStats.total) * 100 : 0;
              return (
                <div key={p} className="space-y-1">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
                    <span className={PRIORITY_CONFIGS[p].text}>{p}</span>
                    <span className="opacity-40">{count} Tasks</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{width: 0}}
                      animate={{width: `${percentage}%`}}
                      className={`h-full ${PRIORITY_CONFIGS[p].bg.replace("/14", "").replace("/10", "").replace("/5", "")} opacity-60`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl">
              <CheckCircle2 size={16} className="text-emerald-500 mb-2" />
              <p className="text-xl font-black tracking-tighter">{overallStats.completed}</p>
              <p className="text-[8px] font-bold opacity-30 uppercase">Completed</p>
            </div>
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl">
              <Flame size={16} className="text-urgent mb-2" />
              <p className="text-xl font-black tracking-tighter">{overallStats.urgentRemaining}</p>
              <p className="text-[8px] font-bold opacity-30 uppercase">Urgent Left</p>
            </div>
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl">
              <Clock size={16} className="text-medium mb-2" />
              <p className="text-xl font-black tracking-tighter">{overallStats.pending}</p>
              <p className="text-[8px] font-bold opacity-30 uppercase">In Progress</p>
            </div>
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl">
              <Users size={16} className="text-primary mb-2" />
              <p className="text-xl font-black tracking-tighter">{tasks.length}</p>
              <p className="text-[8px] font-bold opacity-30 uppercase">Total Load</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
