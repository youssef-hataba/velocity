import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Task } from "@/types/board";

interface Props {
  memberId: string;
  tasks: Task[];
}

export const MemberActivityHeatmap = ({ memberId, tasks }: Props) => {
  const days = useMemo(() => {
    const items = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      items.push(d.toISOString().split('T')[0]);
    }
    return items;
  }, []);

  const activityData = useMemo(() => {
    const counts: Record<string, number> = {};
    
    tasks
      .filter(t => t.assigneeId === memberId && t.status === "done")
      .forEach(t => {
        const date = t.endDate?.split('T')[0] || t.createdAt.split('T')[0];
        counts[date] = (counts[date] || 0) + 1;
      });

    return days.map(date => ({
      date,
      count: counts[date] || 0
    }));
  }, [days, tasks, memberId]);

  return (
    <div className="mt-4 p-4 bg-white/2 border border-white/5 rounded-2xl">
      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-[8px] font-black uppercase tracking-widest opacity-30">30-Day Activity Pulse</span>
        <div className="flex gap-1 items-center">
            <span className="text-[7px] font-bold opacity-20 uppercase">Less</span>
            <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-sm bg-white/5" />
                <div className="w-1.5 h-1.5 rounded-sm bg-primary/30" />
                <div className="w-1.5 h-1.5 rounded-sm bg-primary/60" />
                <div className="w-1.5 h-1.5 rounded-sm bg-primary" />
            </div>
            <span className="text-[7px] font-bold opacity-20 uppercase">More</span>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {activityData.map((day, idx) => (
          <motion.div
            key={day.date}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.01 }}
            className={`w-3 h-3 rounded-sm transition-colors ${
              day.count === 0 ? "bg-white/5" : 
              day.count === 1 ? "bg-primary/30" :
              day.count === 2 ? "bg-primary/60" : "bg-primary"
            }`}
          />
        ))}
      </div>
    </div>
  );
};