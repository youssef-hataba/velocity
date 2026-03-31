import { motion } from "framer-motion";
import { Search, ChevronLeft } from "lucide-react";
import { NAVIGATION_ITEMS } from "../../config/navigation";

interface SidebarExpandedProps {
  isCollapsed: boolean;
  activeNav: string;
  onNavClick: (id: string) => void;
  onCollapse: () => void;
}

export const SidebarExpanded = ({ isCollapsed, activeNav, onNavClick, onCollapse }: SidebarExpandedProps) => (
  <motion.div
    initial={false}
    animate={{
      // On very small screens, we use 100vw to cover the screen, otherwise 280px
      width: isCollapsed ? 0 : "min(280px, 100vw)",
      opacity: isCollapsed ? 0 : 1,
      visibility: isCollapsed ? "hidden" : "visible",
    }}
    transition={{ type: "spring", stiffness: 350, damping: 35 }}
    className="bg-card/1 backdrop-blur-2xl overflow-hidden"
  >
    {/* Use max-w-full to prevent overflow on mobile */}
    <div className="w-70 max-w-full flex flex-col p-6 md:p-8 gap-6 md:gap-10 h-full border-r border-border/10">
      {/* Navigation */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/40">Menu</h3>
          <button 
            onClick={onCollapse} 
            className="p-2 rounded-xl hover:bg-secondary/80 text-muted-foreground/40 hover:text-primary transition-all group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
        <nav className="space-y-1.5">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`flex items-center gap-4 px-4 py-3 md:py-3.5 rounded-[1.2rem] text-sm font-bold transition-all w-full group relative ${
                  isActive ? "text-primary-foreground shadow-2xl shadow-primary/20" : "text-muted-foreground/70 hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-glow" 
                    className="absolute inset-0 bg-primary rounded-[1.2rem] -z-10" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
                  />
                )}
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "scale-110" : "group-hover:scale-110 transition-transform"} />
                <span className="tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </section>

      {/* Search */}
      <section>
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/40 mb-4 md:mb-6 px-1">Search</h3>
        <div className="relative group px-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Find anything..." 
            className="w-full bg-secondary/30 border border-white/3 focus:border-primary/30 rounded-[1.1rem] py-3 md:py-3.5 pl-12 pr-4 text-xs font-semibold outline-none transition-all placeholder:text-muted-foreground/20" 
          />
        </div>
      </section>

      {/* Analytics Card - Hidden or minimized on small mobile heights if necessary */}
      <div className="mt-auto p-5 md:p-6 rounded-4xl md:rounded-[2.2rem] bg-linear-to-br from-primary/8 to-transparent border border-primary/10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-2 md:mb-3">Analytics</p>
        <p className="text-[11px] md:text-[12px] text-muted-foreground/80 font-bold leading-relaxed">
          Efficiency is up <span className="text-foreground">14%</span> this week.
        </p>
      </div>
    </div>
  </motion.div>
);