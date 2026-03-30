import { type Task, type Project } from "@/types/board";

export const WorkflowAndTeam = ({ tasks, project }: { tasks: Task[], project: Project }) => {
  const statuses = ["todo", "in-progress", "review", "done"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-steel/5 border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-black tracking-tighter uppercase italic opacity-80">Workflow Health</h4>
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase">Live</div>
        </div>
        <div className="h-64 flex items-end gap-3 px-2">
          {statuses.map((s) => {
            const count = tasks.filter((t) => t.status === s).length;
            const percentage = tasks.length > 0 ? (count / tasks.length) * 100 : 0;
            return (
              <div key={s} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                <span className="text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">{count}</span>
                <div className="w-full relative rounded-t-2xl bg-steel/10 overflow-hidden transition-all duration-1000 ease-out border border-white/5" style={{ height: `${percentage}%`, minHeight: "12px" }}>
                  <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-primary/10 group-hover:from-primary/60 transition-all" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 shrink-0">{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 rounded-[2.5rem] bg-steel/5 border border-white/5 space-y-6">
        <h4 className="text-lg font-black tracking-tighter uppercase italic opacity-80">Team Hub</h4>
        <div className="space-y-4">
          {project.members?.map((member, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-steel/20 to-steel/5 flex items-center justify-center font-black text-xs border border-white/5">
                {member[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold truncate">{member}</p>
                <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-tighter">Contributor</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};