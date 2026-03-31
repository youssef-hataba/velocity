import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";
import type {Status, Priority} from "@/types/board";
import {PRIORITY_CONFIGS} from "@/types/board";
import type {MetricsProps} from "../../types/sidebar";

const STATUSES: Status[] = ["todo", "in-progress", "review", "done"];
const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

export const TaskMetrics = ({
  progress,
  status,
  priority,
  setStatus,
  setPriority,
  onSync,
}: MetricsProps) => {
  return (
    <div className="space-y-8 md:space-y-10">
      {/* Progress Card */}
      <div className="p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden">
        <p className="text-[10px] font-black uppercase text-primary mb-1 tracking-[0.3em]">
          Completion
        </p>
        <span className="text-4xl md:text-5xl font-black italic text-white tracking-tighter">{progress}%</span>
        <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{width: 0}}
            animate={{width: `${progress}%`}}
            transition={{duration: 0.8, ease: "circOut"}}
            className="h-full bg-primary"
          />
        </div>
        <Sparkles
          size={60}
          className="absolute -right-4 -bottom-4 text-primary/10 rotate-12 pointer-events-none hidden sm:block"
        />
      </div>

      {/* Selectors */}
      <div className="space-y-6 md:space-y-8">
        <section className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Status</h4>
          <div className="grid grid-cols-2 xs:grid-cols-2 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  onSync({status: s});
                }}
                className={`px-2 py-2.5 md:px-3 rounded-xl text-[9px] font-black uppercase transition-all border 
                  ${status === s ? "bg-primary text-black border-primary" : "bg-white/5 text-white/30 border-white/5 hover:bg-white/10"}`}>
                {s.replace("-", " ")}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            Priority
          </h4>
          <div className="flex flex-wrap gap-2">
            {PRIORITIES.map((p) => {
              const config = PRIORITY_CONFIGS[p];
              return (
                <button
                  key={p}
                  onClick={() => {
                    setPriority(p);
                    onSync({priority: p});
                  }}
                  className={`px-3 py-2 md:px-4 rounded-full text-[9px] font-black uppercase border transition-all duration-300 
                    ${priority === p ? `${config.bg} ${config.text} ${config.border.split(" ")[0]} ring-1 ring-white/10` : "bg-white/5 text-white/20 border-white/5 hover:border-white/10"}`}>
                  {p}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};