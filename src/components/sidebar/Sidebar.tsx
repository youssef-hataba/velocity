import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useBoardStore } from "../../store/useBoardStore";
import { SidebarRail } from "./SidebarRail";
import { SidebarExpanded } from "./SidebarExpanded";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar_collapsed");
    return saved ? saved === "true" : true;
  });

  const { projects, activeProjectId, setActiveProject, activeTab, setActiveTab } = useBoardStore();

  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", isCollapsed.toString());
  }, [isCollapsed]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className="relative flex h-screen bg-background border-r border-steel/20 shadow-2xl select-none shrink-0 z-50 transition-all duration-500">
      <SidebarRail 
        projects={projects} 
        activeProjectId={activeProjectId} 
        onSelectProject={setActiveProject} 
      />

      <SidebarExpanded 
        isCollapsed={isCollapsed} 
        activeNav={activeTab} 
        onNavClick={setActiveTab}
        onCollapse={toggleCollapse} 
      />

      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            whileHover={{ x: 5, backgroundColor: "var(--color-primary-hover)" }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCollapse}
            className="
              absolute left-18 top-12 z-50 h-14 w-8 
              bg-primary rounded-r-2xl text-primary-foreground 
              shadow-[10px_0_30px_rgba(59,130,246,0.3)] 
              flex items-center justify-center 
              transition-all cursor-pointer border-y border-r border-white/10
            "
          >
            <ChevronRight size={18} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default Sidebar;