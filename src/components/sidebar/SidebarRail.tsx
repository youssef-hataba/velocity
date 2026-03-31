import { useState } from "react";
import { Plus, Settings } from "lucide-react";
import { WorkspaceIcon } from "./WorkspaceIcon";
import { useBoardStore } from "../../store/useBoardStore"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateProjectForm } from "../forms/CreateProjectForm";
import type { Project } from "../../types/board";

interface SidebarRailProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export const SidebarRail = ({ projects, activeProjectId, onSelectProject }: SidebarRailProps) => {
  const [open, setOpen] = useState(false);
  const addProject = useBoardStore((state) => state.addProject);

  const handleCreate = (data: { name: string; color: string }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: data.name,
      color: data.color,
      members: [], 
      createdAt: new Date().toISOString(), 
    };

    addProject(newProject);
    onSelectProject(newProject.id);
    setOpen(false);
  };

  return (
    <div className="w-16 md:w-18 flex flex-col items-center py-6 md:py-8 border-r border-steel/10 bg-secondary/5 backdrop-blur-3xl z-30 gap-6 md:gap-8 shrink-0 h-full">
      {/* Logo Container */}
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden shadow-2xl shadow-primary/40 group cursor-pointer 
      transition-all hover:scale-105 active:scale-95 shrink-0">
        <img src="/favicon.png" alt="Logo" className="object-contain w-full h-full" />
      </div>

      {/* Project List - Scrollable */}
      <div className="flex flex-col gap-4 md:gap-5 flex-1 no-scrollbar py-2 px-2 md:px-3 w-full items-center">
        {projects.map((p) => (
          <WorkspaceIcon
            key={p.id}
            project={p}
            isActive={activeProjectId === p.id}
            onSelect={onSelectProject}
          />
        ))}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-xl border-2 border-dashed border-steel/20 flex items-center justify-center text-muted/30 hover:text-primary hover:border-primary/50 transition-all active:scale-90 shrink-0">
              <Plus size={18} className="md:size-[20px]" />
            </button>
          </DialogTrigger>

          <DialogContent className="w-[90vw] sm:max-w-100 rounded-[2rem] md:rounded-[2.5rem] bg-card/90 backdrop-blur-2xl border-white/10 shadow-2xl focus:outline-none border-none p-6 md:p-10">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-black tracking-tighter text-center uppercase italic">
                New Project
              </DialogTitle>
            </DialogHeader>

            <CreateProjectForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Settings Action */}
      <div className="mt-auto pb-2 shrink-0">
        <button className="text-muted/40 hover:text-foreground transition-all p-2 md:p-3 hover:bg-secondary/50 rounded-xl group">
          <Settings size={18} className="md:size-[20px] group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
};