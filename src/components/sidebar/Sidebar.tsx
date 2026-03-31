import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu } from "lucide-react";
import { useBoardStore } from "../../store/useBoardStore";
import { SidebarRail } from "./SidebarRail";
import { SidebarExpanded } from "./SidebarExpanded";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Default to collapsed on mobile regardless of saved state for better UX
    if (typeof window !== "undefined" && window.innerWidth < 768) return true;
    
    const saved = localStorage.getItem("sidebar_collapsed");
    return saved ? saved === "true" : true;
  });

  const { projects, activeProjectId, setActiveProject, activeTab, setActiveTab } = useBoardStore();

  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", isCollapsed.toString());
  }, [isCollapsed]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Backdrop - Closes sidebar when clicking outside */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCollapse}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed md:relative flex h-screen bg-background border-r border-steel/20 
        shadow-2xl select-none shrink-0 z-50 transition-transform duration-500
        ${isCollapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
      `}>
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

        {/* Toggle Button for Desktop & Mobile */}
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
                absolute left-full md:left-18 top-6 md:top-12 z-50 h-12 w-8 md:h-14 
                bg-primary rounded-r-2xl text-primary-foreground 
                shadow-[10px_0_30px_rgba(59,130,246,0.3)] 
                flex items-center justify-center 
                transition-all cursor-pointer border-y border-r border-white/10
              "
            >
              {/* Using Menu icon for mobile context when collapsed */}
              <div className="md:hidden">
                <Menu size={18} strokeWidth={3} />
              </div>
              <div className="hidden md:block">
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};

export default Sidebar;