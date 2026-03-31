import { Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface DescriptionProps {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
}

export const TaskDescriptionInput = ({ value, onChange, onBlur }: DescriptionProps) => {
  const LIMIT = 500;
  const isOverLimit = value.length > LIMIT;

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          <Sparkles size={12} className="text-primary" /> Core Narrative
        </h4>
        <span className={`text-[9px] font-mono font-bold tracking-widest ${isOverLimit ? 'text-red-500' : 'text-white/10'}`}>
          {value.length} / {LIMIT}
        </span>
      </div>
      <div className={`relative w-full rounded-3xl lg:rounded-4xl border transition-all overflow-hidden ${
        isOverLimit ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 bg-white/3 focus-within:border-primary/30'
      }`}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => !isOverLimit && onBlur()}
          rows={6}
          className="custom-scrollbar outline-none w-full p-5 lg:p-8 bg-transparent text-[14px] leading-relaxed resize-none text-white/70 placeholder:text-white/10"
          placeholder="Define the mission objective..."
        />
        {isOverLimit && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-4 right-6 flex items-center gap-2 text-red-500 text-[10px] font-black uppercase italic">
            <AlertCircle size={12} /> Limit Exceeded
          </motion.div>
        )}
      </div>
    </section>
  );
};