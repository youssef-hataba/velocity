import type { Project } from "@/types/board";

interface Props {
  project: Project;
  tasksCount: number;
}

const getMemberColor = (name: string) => {
  const colors = [
    "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

export const BoardHeader = ({ project, tasksCount }: Props) => {
  const shadowColor = project.color?.startsWith('#') ? `${project.color}66` : 'rgba(255,255,255,0.2)';

  return (
    <header className="flex flex-col gap-3 shrink-0 px-4 md:px-2 py-4">
      {/* Main Title and Members Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        
        {/* Project Identity */}
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white/20 transition-all duration-500 shrink-0"
            style={{ 
              backgroundColor: project.color?.startsWith('#') ? project.color : 'transparent', 
              boxShadow: `0 0 20px ${shadowColor}` 
            }}
          />
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground drop-shadow-sm italic uppercase truncate">
            {project.name}
          </h2>
          <span className="shrink-0 px-2 md:px-3 py-1 rounded-full bg-steel/10 text-muted/60 text-[9px] md:text-[10px] font-bold border border-steel/10">
            {tasksCount} Tasks
          </span>
        </div>

        {/* Member Avatars */}
        <div className="flex items-center self-end md:self-auto">
          <div className="flex -space-x-2 md:-space-x-3">
            {project.members?.slice(0, 3).map((email, i) => {
              const colorClasses = getMemberColor(email);
              return (
                <div 
                  key={i} 
                  title={email} 
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-background backdrop-blur-md flex items-center justify-center text-[9px] md:text-[10px] font-black uppercase ring-1 ring-white/5 transition-transform hover:-translate-y-1 hover:z-10 cursor-pointer ${colorClasses}`}
                >
                  {email[0]}
                </div>
              );
            })}
            {(project.members?.length || 0) > 3 && (
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-background bg-steel/10 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-muted-foreground ring-1 ring-white/5">
                +{(project.members?.length || 0) - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description and Divider Row */}
      <div className="flex items-center gap-3">
        <div className="h-px w-6 md:w-8 bg-primary/40 shrink-0" />
        <p className="text-muted/40 text-[10px] md:text-[11px] font-black uppercase tracking-widest truncate max-w-full italic">
          {project.description || "Workflow Management Center"}
        </p>
      </div>
    </header>
  );
};