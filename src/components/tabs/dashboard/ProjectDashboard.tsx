import { useBoardStore } from "@/store/useBoardStore";
import type { Project } from "@/types/board";
import { StatCards } from "./StatCards";
import { WorkflowAndTeam } from "./WorkflowAndTeam";
import { ManagementZone } from "./ManagementZone";

export const ProjectDashboard = ({ project }: { project: Project }) => {
  const allTasks = useBoardStore((state) => state.tasks) || [];
  const tasks = allTasks.filter((t) => t.projectId === project?.id);

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

      <StatCards tasks={tasks} />
      <WorkflowAndTeam tasks={tasks} project={project} />
      <ManagementZone project={project} />
    </div>
  );
};