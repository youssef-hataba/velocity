import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Board from "./components/board/Board";
import Sidebar from "./components/sidebar/Sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Global Application Container */}
    <div className="flex h-screen w-full overflow-hidden bg-[#050505] text-foreground font-sans selection:bg-primary/30">
      
      {/* Background Cinematic Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[0%] w-[30%] h-[30%] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <Sidebar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Global Header */}
        <header className="h-20 border-b border-white/3 flex items-center px-10 justify-between shrink-0 bg-background/20 backdrop-blur-2xl">
          <div className="flex flex-col">
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/50">
              Workspace
            </h1>
            <p className="text-lg font-bold tracking-tight text-foreground/90">
              Project Architecture
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Quick Stats or Search could go here */}
            <div className="h-10 w-px bg-white/5" />
            
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right">
                <p className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">Developer Mode</p>
                <p className="text-[10px] text-muted-foreground/40 font-medium">Active Now</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-[11px] font-black shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Board Section */}
        <section className="flex-1 overflow-hidden p-10 bg-transparent custom-scrollbar">
          <Board />
        </section>

      </main>
    </div>
  </StrictMode>
);