import { ShieldAlert, Pencil, Trash2 } from "lucide-react";
import { type Project } from "@/types/board";
import { useBoardStore } from "@/store/useBoardStore";

export const ManagementZone = ({ project }: { project: Project }) => {
  const deleteProject = useBoardStore((state) => state.deleteProject);

  return (
    <div className="pt-10 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <ShieldAlert size={18} className="text-primary" />
        <h4 className="text-lg font-black tracking-tighter uppercase italic opacity-80">Project Management</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group p-1 bg-linear-to-br from-white/10 to-transparent rounded-4xl transition-all hover:from-primary/40">
          <div className="bg-background/40 backdrop-blur-xl p-8 rounded-[1.9rem] flex items-center justify-between">
            <div className="space-y-2">
              <h5 className="font-black text-sm uppercase tracking-wider">Project Configuration</h5>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-50">Update name, description, and workspace visibility.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all cursor-pointer">
              <Pencil size={14} /> Edit
            </button>
          </div>
        </div>

        <div className="group p-1 bg-linear-to-br from-rose-500/30 to-transparent rounded-4xl transition-all hover:from-rose-500/40">
          <div className="bg-background/40 backdrop-blur-xl p-8 rounded-[1.9rem] flex items-center justify-between">
            <div className="space-y-2">
              <h5 className="font-black text-sm uppercase tracking-wider text-rose-500/80">Danger Zone</h5>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-50">Permanently delete this project and all its tasks.</p>
            </div>
            <button
              onClick={() => confirm("Delete this project permanently?") && deleteProject(project.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-rose-500/30 transition-all"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};