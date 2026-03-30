import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Board from "./components/board/Board";
import Sidebar from "./components/sidebar/Sidebar";
import { ThemeToggle } from "./components/layout/ThemeToggle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30 transition-all duration-700">
      <Sidebar />
      <main className="relative z-10 flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 border-b border-steel/10 dark:border-steel/60 flex items-center px-10 justify-between shrink-0 
          bg-white/10 dark:bg-background/40 backdrop-blur-3xl shadow-sm dark:shadow-none transition-all">
          
          <div className="flex flex-col">
            <h1 className="text-xs font-black uppercase tracking-widest text-muted/60 dark:text-muted-foreground/40">
              Workspace
            </h1>
            <p className="text-lg font-bold tracking-tight text-foreground/90">
              Project Architecture
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-8 w-px bg-steel/20 dark:bg-steel/10" />
            
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right">
                <p className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-wide">
                  Youssef Hataba
                </p>
              </div>
              
              <div className="
                w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black
                bg-linear-to-br from-primary/20 to-primary/5 
                border border-primary/20 shadow-lg shadow-primary/10 
                group-hover:scale-105 group-hover:shadow-primary/20 transition-all
              ">
                YH
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-hidden p-8 bg-transparent">
          <Board />
        </section>
      </main>
    </div>
  </StrictMode>
);