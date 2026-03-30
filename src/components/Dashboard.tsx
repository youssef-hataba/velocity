import {useBoardStore} from "@/store/useBoardStore";
import type {Project} from "@/types/board";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Trash2,
  Pencil,
  ShieldAlert,
} from "lucide-react";

export const ProjectDashboard = ({project}: {project: Project}) => {
  const allTasks = useBoardStore((state) => state.tasks) || [];
  const deleteProject = useBoardStore((state) => state.deleteProject);
  const tasks = allTasks.filter((t) => t.projectId === project?.id);

  const stats = [
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

  if (!project) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black tracking-tighter uppercase italic bg-linear-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
          {project.name}
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
          Insight & Control Center
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative group overflow-hidden p-6 rounded-4xl bg-steel/5 border border-white/5 hover:border-white/10 transition-all duration-500">
            <div
              className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 -mr-10 -mt-10 ${stat.bg}`}
            />
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-steel/5 border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-black tracking-tighter uppercase italic opacity-80">
              Workflow Health
            </h4>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black">
              LIVE
            </div>
          </div>
          <div className="h-64 flex items-end gap-3 px-2">
            {["todo", "in-progress", "review", "done"].map((s) => {
              const count = tasks.filter((t) => t.status === s).length;
              const percentage = tasks.length > 0 ? (count / tasks.length) * 100 : 0;

              return (
                <div
                  key={s}
                  className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                  <span className="text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {count}
                  </span>

                  <div
                    className="w-full relative rounded-t-2xl bg-steel/10 overflow-hidden transition-all duration-1000 ease-out border border-white/5"
                    style={{height: `${percentage}%`, minHeight: "12px"}}>
                    <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-primary/10 group-hover:from-primary/60 transition-all" />
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 shrink-0">
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-steel/5 border border-white/5 space-y-6">
          <h4 className="text-lg font-black tracking-tighter uppercase italic opacity-80">
            Team Hub
          </h4>
          <div className="space-y-4">
            {project.members?.map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-steel/20 to-steel/5 flex items-center justify-center font-black text-xs border border-white/5">
                  {member.substring(0, 1).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold truncate">{member}</p>
                  <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-tighter">
                    Contributor
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/5">
        <div className="flex items-center gap-3 mb-8">
          <ShieldAlert size={18} className="text-primary" />
          <h4 className="text-lg font-black tracking-tighter uppercase italic opacity-80">
            Project Management
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group p-1 bg-linear-to-br from-white/10 to-transparent rounded-4xl transition-all hover:from-primary/40">
            <div className="bg-background/40 backdrop-blur-xl p-8 rounded-[1.9rem] flex items-center justify-between">
              <div className="space-y-2">
                <h5 className="font-black text-sm uppercase tracking-wider">
                  Project Configuration
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-50">
                  Update name, description, and workspace visibility.
                </p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all cursor-pointer">
                <Pencil size={14} /> Edit
              </button>
            </div>
          </div>

          <div className="group p-1 bg-linear-to-br from-urgent/30 to-transparent rounded-4xl transition-all hover:from-destructive/40">
            <div className="bg-background/40 backdrop-blur-xl p-8 rounded-[1.9rem] flex items-center justify-between">
              <div className="space-y-2">
                <h5 className="font-black text-sm uppercase tracking-wider text-destructive/80">
                  Danger Zone
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-50">
                  Permanently delete this project and all its tasks.
                </p>
              </div>
              <button
                onClick={() =>
                  confirm("Are you sure you want to delete this project?") &&
                  deleteProject(project.id)
                }
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-urgent/40 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
