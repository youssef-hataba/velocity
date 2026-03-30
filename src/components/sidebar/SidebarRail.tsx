import { Plus, Settings } from "lucide-react";
import { WorkspaceIcon } from "./WorkspaceIcon";
import type { Project } from "../../types/board";

interface SidebarRailProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export const SidebarRail = ({
  projects,
  activeProjectId,
  onSelectProject,
}: SidebarRailProps) => (
  <div className="w-18 flex flex-col items-center py-8 border-r border-border/40 bg-secondary/2 backdrop-blur-3xl z-30 gap-8 shrink-0">
    {/* Logo */}
    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-2xl shadow-primary/40 group cursor-pointer transition-all hover:scale-105 active:scale-95">
      <img src="/favicon.png" alt="Logo" className="object-contain w-full h-full" />
    </div>

    {/* Projects */}
    <div className="flex flex-col gap-5 flex-1 no-scrollbar py-2 px-3 overflow-y-auto">
      {projects.map((p) => (
        <WorkspaceIcon
          key={p.id}
          project={p}
          isActive={activeProjectId === p.id}
          onSelect={onSelectProject}
        />
      ))}

      <button className="w-10 h-10 rounded-xl border-2 border-dashed border-border/40 flex items-center justify-center text-muted-foreground/30 hover:text-primary hover:border-primary/50 transition-all active:scale-90 shrink-0">
        <Plus size={20} />
      </button>
    </div>

    {/* Settings */}
    <button className="text-muted-foreground/40 hover:text-foreground transition-all p-3 hover:bg-secondary/50 rounded-xl">
      <Settings size={20} className="hover:rotate-45 transition-transform duration-500" />
    </button>
  </div>
);