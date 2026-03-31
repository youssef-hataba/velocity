import {motion, AnimatePresence} from "framer-motion";
import {BrainCircuit, Loader2, Orbit, Zap} from "lucide-react";
import type {AIEstimation} from "../../hooks/useTaskAI";

interface AIForecasterProps {
  estimation: AIEstimation | null;
  isLoading: boolean;
  onEstimate: () => void;
}

export const AIForecaster = ({estimation, isLoading, onEstimate}: AIForecasterProps) => {
  const getConfidenceValue = () => {
    if (!estimation?.confidence) return 0;
    const val = estimation.confidence;
    return val > 1 ? Math.round(val) : Math.round(val * 100);
  };

  const confidencePercent = getConfidenceValue();

  return (
    <div className="relative p-px rounded-3xl overflow-hidden group bg-linear-to-br from-primary/70 via-transparent to-purple-500/70">
      <div className="relative bg-[#0c0c0e]/90 backdrop-blur-2xl rounded-3xl p-5 border border-white/5 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <BrainCircuit size={14} className="text-primary animate-spin-slow" />
              <div className="absolute inset-0 blur-sm bg-primary/30 animate-pulse" />
            </div>
            <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">
              Neural Link
            </h4>
          </div>

          {!estimation && !isLoading && (
            <button
              onClick={onEstimate}
              className="px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-black text-[8px] font-black uppercase tracking-tighter transition-all">
              Analyze
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="flex items-center justify-center py-4 gap-3">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                Syncing...
              </span>
            </motion.div>
          ) : estimation ? (
            <motion.div
              key="result"
              initial={{opacity: 0, y: 5}}
              animate={{opacity: 1, y: 0}}
              className="space-y-4">
              {/* Main Info Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black italic tracking-tighter text-white">
                    {estimation.hours}
                  </span>
                  <span className="text-xs font-black text-primary italic uppercase">Hours</span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/3 border border-white/5">
                    <Zap size={10} className="text-primary" />
                    <span className="text-[8px] font-black text-white/60 uppercase">
                      {estimation.complexity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimal Progress Bar */}
              <div className="relative">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/20">
                    Confidence Matrix
                  </span>
                  <span className="text-[10px] font-black text-primary">{confidencePercent}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{width: 0}}
                    animate={{width: `${confidencePercent}%`}}
                    transition={{duration: 1.2, ease: "circOut"}}
                    className="h-full bg-linear-to-r from-primary to-white/40 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-2 text-center">
              <p className="text-[8px] font-bold text-white/25 uppercase tracking-widest flex items-center justify-center gap-2">
                <Orbit size={12} /> Ready for Neural Uplink
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
