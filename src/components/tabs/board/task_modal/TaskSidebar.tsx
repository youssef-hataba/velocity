import {CalendarDays, History, Clock, ChevronDown, ChevronUp, Sparkles} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import type {Task, Status, Priority} from "@/types/board";
import {PRIORITY_CONFIGS} from "@/types/board";

interface SidebarProps {
  task: Task;
  progress: number;
  updateTask: (id: string, updates: Partial<Task>) => void;
  showAllHistory: boolean;
  setShowAllHistory: (val: boolean) => void;
}

export const TaskSidebar = ({
  task,
  progress,
  updateTask,
  showAllHistory,
  setShowAllHistory,
}: SidebarProps) => {
  const statuses: Status[] = ["todo", "in-progress", "review", "done"];
  const priorities: Priority[] = ["low", "medium", "high", "urgent"];

  const formatToDateTimeLocal = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  const sortedHistory = [...(task.history || [])].reverse();
  const displayedHistory = showAllHistory ? sortedHistory : sortedHistory.slice(0, 3);

  return (
    <div className="lg:col-span-4 space-y-10 border-l border-white/5 pl-10">
      {/* Completion Card */}
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden">
        <p className="text-[10px] font-black uppercase text-primary mb-1 tracking-[0.3em]">
          Completion
        </p>
        <span className="text-5xl font-black italic text-white tracking-tighter">{progress}%</span>
        <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{width: 0}}
            animate={{width: `${progress}%`}}
            className="h-full bg-primary"
          />
        </div>
        <Sparkles size={60} className="absolute -right-4 -bottom-4 text-primary/10 rotate-12" />
      </div>

      <div className="space-y-6">
        {/* Status Section */}
        <div className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Status</h4>
          <div className="grid grid-cols-2 gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => updateTask(task.id, {status: s})}
                className={`px-3 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all border ${task.status === s ? "bg-primary text-black border-primary" : "bg-white/5 text-white/30 border-white/5"}`}>
                {s.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Section - Using PRIORITY_CONFIGS */}
        <div className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            Priority
          </h4>
          <div className="flex flex-wrap gap-2">
            {priorities.map((p) => {
              const config = PRIORITY_CONFIGS[p];
              const isActive = task.priority === p;
              return (
                <button
                  key={p}
                  onClick={() => updateTask(task.id, {priority: p})}
                  className={`px-4 py-2 rounded-full text-[9px] font-black uppercase border transition-all duration-300 
                    ${
                      isActive
                        ? `${config.bg} ${config.text} ${config.border.split(" ")[0]} ring-1 ring-white/10`
                        : "bg-white/5 text-white/20 border-white/5 hover:border-white/10"
                    }`}>
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-4">
        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-2">
          <CalendarDays size={14} /> Timeline
        </h4>
        <div className="space-y-2">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-[#0c0c0e] px-2 text-[7px] text-white/30 uppercase tracking-widest">
              Start
            </label>
            <input
              type="datetime-local"
              value={formatToDateTimeLocal(task.startDate)}
              onChange={(e) =>
                updateTask(task.id, {startDate: new Date(e.target.value).toISOString()})
              }
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[11px] text-white/60 outline-none color-scheme-dark focus:border-primary/20 transition-all"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-[#0c0c0e] px-2 text-[7px] text-white/30 uppercase tracking-widest">
              End
            </label>
            <input
              type="datetime-local"
              value={formatToDateTimeLocal(task.endDate)}
              onChange={(e) =>
                updateTask(task.id, {endDate: new Date(e.target.value).toISOString()})
              }
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[11px] text-white/60 outline-none color-scheme-dark focus:border-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Audit Trail Section with Show More */}
      <section className="space-y-5">
        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-2">
          <History size={14} /> Audit Trail
        </h4>
        <div className="space-y-6 ml-2 border-l border-white/5 pl-6 text-[10px]">
          {displayedHistory.length > 0 ? (
            <>
              <AnimatePresence mode="popLayout">
                {displayedHistory.map((entry, i) => (
                  <motion.div
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    key={i}
                    className="relative group">
                    <div className="absolute -left-[1.85rem] top-1 w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/40 transition-colors" />
                    <div className="text-white/50 leading-relaxed">
                      <span className="text-primary/60 font-bold">{entry.user}</span>
                      <span className="mx-1 text-white/20">{entry.action}</span>
                    </div>
                    <div className="text-[8px] text-white/10 uppercase flex items-center gap-1 mt-1 font-black tracking-tighter">
                      <Clock size={8} /> {new Date(entry.date).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {sortedHistory.length > 3 && (
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-all duration-300 mt-2">
                  {showAllHistory ? (
                    <>
                      <ChevronUp size={12} /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={12} /> View {sortedHistory.length - 3} More Actions
                    </>
                  )}
                </button>
              )}
            </>
          ) : (
            <div className="text-white/10 italic text-[9px]">No activity recorded yet.</div>
          )}
        </div>
      </section>
    </div>
  );
};
