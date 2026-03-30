import {useState} from "react";
import {Plus, Settings} from "lucide-react";
import {WorkspaceIcon} from "./WorkspaceIcon";
import {useBoardStore} from "../../store/useBoardStore"; // استيراد الـ Store
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {CreateProjectForm} from "../forms/CreateProjectForm";
import type {Project} from "../../types/board";

interface SidebarRailProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export const SidebarRail = ({projects, activeProjectId, onSelectProject}: SidebarRailProps) => {
  const [open, setOpen] = useState(false);
  const addProject = useBoardStore((state) => state.addProject);

  const handleCreate = (data: {name: string; color: string}) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: data.name,
      color: data.color,
    };

    addProject(newProject);
    onSelectProject(newProject.id);
    setOpen(false);
  };
  return (
    <div className="w-18 flex flex-col items-center py-8 border-r border-steel/10 bg-secondary/5 backdrop-blur-3xl z-30 gap-8 shrink-0">
      {/* Logo */}
      <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-2xl shadow-primary/40 group cursor-pointer transition-all hover:scale-105 active:scale-95">
        <img src="/favicon.png" alt="Logo" className="object-contain w-full h-full" />
      </div>

      <div className="flex flex-col gap-5 flex-1 no-scrollbar py-2 px-3 overflow-y-auto">
        {projects.map((p) => (
          <WorkspaceIcon
            key={p.id}
            project={p}
            isActive={activeProjectId === p.id}
            onSelect={onSelectProject}
          />
        ))}

        {/* Shadcn Dialog Integration */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-10 h-10 rounded-xl border-2 border-dashed border-steel/20 flex items-center justify-center text-muted/30 hover:text-primary hover:border-primary/50 transition-all active:scale-90 shrink-0">
              <Plus size={20} />
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] bg-card/90 backdrop-blur-2xl border-white/10 shadow-2xl focus:outline-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tighter text-center">
                New Project
              </DialogTitle>
            </DialogHeader>

            {/* الفورم الآن تستقبل الـ data كاملة */}
            <CreateProjectForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <button className="text-muted/40 hover:text-foreground transition-all p-3 hover:bg-secondary/50 rounded-xl">
        <Settings size={20} className="hover:rotate-45 transition-transform duration-500" />
      </button>
    </div>
  );
};
