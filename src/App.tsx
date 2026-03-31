import Sidebar from "./components/sidebar/Sidebar";
import { ThemeToggle } from "./components/layout/ThemeToggle";
import { useBoardStore } from "./store/useBoardStore";
import { ProjectDashboard } from "./components/tabs/dashboard/ProjectDashboard";
import Board from "./components/tabs/board/Board";
import { ProjectTimeline } from "./components/tabs/timeline/ProjectTimeline";
import { TeamTab } from "./components/tabs/team/TeamTab";

const App = () => {
  const { activeTab, activeProjectId, projects } = useBoardStore();
  const activeProject = projects.find((p) => p.id === activeProjectId);

  const renderContent = () => {
    if (!activeProject) return <Board />;
    switch (activeTab) {
      case "dashboard": return <ProjectDashboard project={activeProject} />;
      case "board": return <Board />;
      case "timeline": return <ProjectTimeline project={activeProject} />;
      case "team": return <TeamTab project={activeProject} tasks={useBoardStore.getState().tasks} />;
      default: return <Board />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30 transition-all duration-700">
      <Sidebar />
      
      <main className="relative z-10 flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Responsive Header */}
        <header className="h-16 md:h-20 border-b border-steel/10 flex items-center px-4 md:px-10 justify-between shrink-0 bg-white/10 dark:bg-background/40 backdrop-blur-3xl shadow-sm transition-all">
          
          {/* Workspace Title - Added ml-12 on mobile to clear the floating Sidebar button */}
          <div className="flex flex-col text-left ml-12 md:ml-0 overflow-hidden">
            <h1 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Workspace</h1>
            <p className="text-sm md:text-lg font-bold tracking-tight text-foreground/90 truncate">
              {activeProject?.name || "Select Workspace"}
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <div className="h-6 md:h-8 w-px bg-steel/20" />
            
            <div className="flex items-center gap-2 md:gap-4 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-wide">
                  Youssef Hataba
                </p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-[10px] md:text-[11px] font-black bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-lg shadow-primary/10 group-hover:scale-105 transition-all">
                YH
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <section className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent custom-scrollbar">
          <div className="max-w-400 mx-auto h-full">
            {renderContent()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;