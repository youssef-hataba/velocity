import { motion } from "framer-motion";
import type { Project } from "../../types/board";

interface WorkspaceIconProps {
  project: Project;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export const WorkspaceIcon = ({ project, isActive, onSelect }: WorkspaceIconProps) => {
  const isHex = project.color.startsWith("#");

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(project.id)}
      style={{ 
        backgroundColor: isHex ? project.color : undefined,
        boxShadow: isActive && isHex ? `0 10px 20px -5px ${project.color}66` : undefined 
      }}
      className={`
        w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[10px]
        transition-all duration-500 relative group shrink-0
        ${!isHex ? project.color : ""} 
        ${isActive 
          ? "ring-2 ring-primary ring-offset-4 ring-offset-background scale-110" 
          : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0 shadow-lg"}
      `}
    >
      <span className="relative z-10 tracking-widest">
        {project.name.substring(0, 2).toUpperCase()}
      </span>

      {/* Cinematic Glow (Visible only when active) */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-xl blur-md -z-10 opacity-40 animate-pulse"
          style={{ backgroundColor: isHex ? project.color : undefined }}
        />
      )}

      {/* Tooltip - Floating Label */}
      <div className="absolute left-full ml-4 px-3 py-1.5 bg-popover text-popover-foreground text-[11px] font-bold rounded-lg border border-border shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-all translate-x-2 group-hover:translate-x-0">
        {project.name}
        {/* Tooltip Arrow */}
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-popover border-l border-b border-border rotate-45" />
      </div>
    </motion.button>
  );
};