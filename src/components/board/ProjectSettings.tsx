import {Settings, Trash2, UserPlus, Pencil} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useBoardStore} from "../../store/useBoardStore";
import type {Project} from "../../types/board";

export const ProjectSettings = ({project}: {project: Project}) => {
  const deleteProject = useBoardStore((state) => state.deleteProject);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="w-14 h-14 rounded-2xl bg-steel/10 hover:bg-steel/20 transition-all group p-0 flex items-center justify-center cursor-pointer">
          <Settings
            size={32}
            className="text-muted/40 group-hover:text-primary transition-all duration-700 group-hover:rotate-90"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl bg-card/80 backdrop-blur-2xl border-white/10 shadow-2xl p-2">
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted/50 px-3 py-2">
          Project Operations
        </DropdownMenuLabel>

        <DropdownMenuItem className="rounded-xl focus:bg-primary/10 gap-3 py-3 cursor-pointer font-bold">
          <Pencil size={16} /> Edit Details
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl focus:bg-primary/10 gap-3 py-3 cursor-pointer font-bold">
          <UserPlus size={16} /> Manage Team
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-steel/10" />

        <DropdownMenuItem
          onClick={() => confirm("Delete this project?") && deleteProject(project.id)}
          className="rounded-xl focus:bg-urgent/10 focus:text-urgent gap-3 py-3 cursor-pointer text-urgent/80 font-bold">
          <Trash2 size={16} /> Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
