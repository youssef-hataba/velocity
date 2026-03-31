import { Save } from "lucide-react";
import { motion } from "framer-motion";
import type { SubTask } from "@/types/board";

interface MilestoneItemProps {
  st: SubTask;
  onToggle: () => void;
}

export const MilestoneItem = ({ st, onToggle }: MilestoneItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl lg:rounded-[1.8rem] bg-white/2 border border-white/5 group"
    >
      <button
        onClick={onToggle}
        className={`w-6 h-6 shrink-0 rounded-lg border flex items-center justify-center transition-all ${
          st.isCompleted ? "bg-primary border-primary" : "border-white/10 hover:border-primary/50"
        }`}
      >
        {st.isCompleted && <Save size={12} className="text-black" />}
      </button>
      <span
        className={`text-[12px] font-bold wrap-break-words transition-all ${
          st.isCompleted ? "line-through text-white/10" : "text-white/80"
        }`}
      >
        {st.title}
      </span>
    </motion.div>
  );
};