import { useMemo } from "react";
import { type Project, type Task } from "../../types/board";
import { MemberCard } from "./MemberCard";
import { TeamMetrics } from "./TeamMetrics";
import { LayoutGrid } from "lucide-react";

interface Props {
  project: Project;
  tasks: Task[];
}

export const TeamTab = ({ project, tasks }: Props) => {
  const memberStats = useMemo(() => {
    const data = project.members.map((memberId) => {
      // تعديل مهم: هنا بنربط بالتاسكات اللي الـ assigneeId بتاعها هو الـ memberId
      const userTasks = tasks.filter((t: Task) => t.assigneeId === memberId);
      const completed = userTasks.filter((t) => t.status === "done").length;
      const total = userTasks.length;
      const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        id: memberId,
        name: memberId.split("-")[0],
        role: "Core Contributor",
        completed,
        total,
        efficiency,
      };
    });

    return data.sort((a, b) => b.efficiency - a.efficiency);
  }, [project.members, tasks]);

  const topPerformer = memberStats[0]?.name || "N/A";
  const avgEfficiency = memberStats.length 
    ? Math.round(memberStats.reduce((acc, curr) => acc + curr.efficiency, 0) / memberStats.length) 
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TeamMetrics 
        totalMembers={project.members.length} 
        topPerformer={topPerformer} 
        avgEfficiency={avgEfficiency} 
      />

      <div className="flex items-center gap-3 px-4 mb-2">
        <LayoutGrid size={14} className="text-primary opacity-50" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Member Performance</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberStats.map((member) => (
          <MemberCard key={member.id} {...member} tasks={tasks} />
        ))}
      </div>
    </div>
  );
};