import { TrendingUp, CheckCircle2, Clock, AlertCircle, type LucideIcon } from "lucide-react";
import { type Task } from "@/types/board";

interface StatProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const StatCards = ({ tasks }: { tasks: Task[] }) => {
  const stats: StatProps[] = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "High Priority",
      value: tasks.filter((t) => t.priority === "high").length,
      icon: AlertCircle,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="relative group overflow-hidden p-6 rounded-4xl bg-steel/5 border border-white/5 hover:border-white/10 transition-all duration-500">
          <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 -mr-10 -mt-10 ${stat.bg}`} />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};