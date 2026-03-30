import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useBoardStore } from "../../store/useBoardStore";
import { SidebarRail } from "./SidebarRail";
import { SidebarExpanded } from "./SidebarExpanded";

const Sidebar = () => {
  const isCollapsed = true;
  const [activeNav, setActiveNav] = useState("board");
  const { projects, activeProjectId, setActiveProject } = useBoardStore();

  return (
    <aside className="relative flex h-screen bg-background border-r border-border/50 shadow-2xl select-none shrink-0 z-50">
      
      <SidebarRail 
        projects={projects} 
        activeProjectId={activeProjectId} 
        onSelectProject={setActiveProject} 
      />

      <SidebarExpanded 
        isCollapsed={isCollapsed} 
        activeNav={activeNav} 
        onNavClick={setActiveNav} 
        onCollapse={() => true} 
      />

      {/* Floating Expand Trigger */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            whileHover={{ x: 5 }}
            onClick={() => false}
            className="absolute left-18 top-13 z-50 h-14 w-8 bg-primary rounded-r-2xl text-white shadow-[10px_0_30px_rgba(var(--primary),0.3)] flex items-center justify-center transition-all cursor-pointer border-y border-r border-white/10"
          >
            <ChevronRight size={18} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default Sidebar;