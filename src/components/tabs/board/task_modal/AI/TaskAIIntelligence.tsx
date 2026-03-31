import {motion, AnimatePresence} from "framer-motion";
import {ListChecks, FileText, Loader2, BrainCircuit, Orbit} from "lucide-react";
import type {AIEstimation} from "../../hooks/useTaskAI";

interface TaskAIIntelligenceProps {
  estimation: AIEstimation | null;
  isEstimating?: boolean;
  onRun?: () => void;
}

export const TaskAIIntelligence = ({estimation, isEstimating, onRun}: TaskAIIntelligenceProps) => {
  if (!estimation && !isEstimating) {
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="relative not-only:mt-8 p-px rounded-4xl overflow-hidden group bg-linear-to-br from-primary/70 via-transparent to-purple-500/70">
        <div className="absolute bg-linear-to-br from-primary/20 via-transparent to-purple-500/20 opacity-40" />
        <div className="relative bg-[#0c0c0e]/80 backdrop-blur-xl rounded-4xl p-8 flex items-center justify-between border border-white/5 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:rotate-12 transition-transform">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-widest text-white/90">
                Strategy Core
              </h5>
              <p className="text-[10px] text-white/30 font-medium tracking-tight">
                Initialize neural mission breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onRun}
            className="cursor-pointer px-6 py-2.5 rounded-xl bg-linear-to-br from-primary/30 to-purple-500/30 text- text-[9px] font-black uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] active:scale-95">
            Analyze
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      className="mt-8 relative group">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative bg-[#0c0c0e]/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 space-y-8">
        {/* Decrypting Overlay */}
        <AnimatePresence>
          {isEstimating && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="absolute inset-0 z-20 bg-[#0c0c0e]/90 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center gap-4">
              <Loader2 className="text-primary animate-spin" size={20} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                Syncing...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategy Mini-Report */}
        {estimation?.fullReport && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
              <FileText size={12} className="text-primary/50" /> Strategy
            </div>
            <div className="relative p-5 rounded-2xl bg-white/2 border border-white/5 group-hover:border-primary/10 transition-colors">
              <p className="text-[12px] text-white/50 leading-relaxed italic pl-4 border-l border-primary/40">
                {estimation.fullReport}
              </p>
            </div>
          </section>
        )}

        {/* Tactical Grid (The Steps) */}
        {estimation?.suggestedSteps && estimation.suggestedSteps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                <ListChecks size={12} className="text-primary/50" /> Tactical Steps
              </div>
              <div className="flex items-center gap-1 text-[7px] font-black uppercase tracking-widest text-primary/40">
                <Orbit size={8} className="animate-spin-slow" /> AI Verified
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {estimation.suggestedSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: i * 0.05}}
                  className="group/item flex items-center gap-3 p-3.5 rounded-xl bg-white/1 border border-white/5 hover:bg-white/3 hover:border-primary/20 transition-all duration-300">
                  <div className="w-5 h-5 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-[8px] font-black text-primary border border-primary/10 group-hover/item:bg-primary group-hover/item:text-black transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-[11px] font-medium text-white/40 group-hover/item:text-white/80 transition-colors truncate">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};
