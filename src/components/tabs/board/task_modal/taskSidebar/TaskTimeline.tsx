import {CalendarDays, History, Clock, ChevronDown, ChevronUp} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import type { TimelineProps} from "../../types/sidebar";

export const TaskTimeline = ({
  task,
  startDate,
  endDate,
  showAllHistory,
  setStartDate,
  setEndDate,
  setShowAllHistory,
  onSync,
}: TimelineProps) => {
  const formatToDateTimeLocal = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? ""
      : new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  const sortedHistory = task?.history ? [...task.history].reverse() : [];
  const displayedHistory = showAllHistory ? sortedHistory : sortedHistory.slice(0, 3);

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Date Inputs */}
      <section className="space-y-4">
        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-2">
          <CalendarDays size={14} /> Timeline
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {[
            {label: "Start", val: startDate, set: setStartDate, key: "startDate"},
            {label: "End", val: endDate, set: setEndDate, key: "endDate"},
          ].map((item) => (
            <div key={item.label} className="relative group">
              <label className="absolute -top-2 left-3 bg-[#0c0c0e] px-2 text-[7px] text-white/30 uppercase tracking-widest z-10">
                {item.label}
              </label>
              <input
                type="datetime-local"
                value={formatToDateTimeLocal(item.val)}
                onChange={(e) => {
                  const isoDate = e.target.value ? new Date(e.target.value).toISOString() : "";
                  item.set(isoDate);
                  onSync({[item.key]: isoDate});
                }}
                className="w-full bg-white/3 border border-white/5 rounded-2xl p-3 md:p-4 text-[11px] text-white/60 outline-none focus:border-primary/20 transition-all"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Audit Trail */}
      <section className="space-y-5">
        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-2">
          <History size={14} /> Audit Trail
        </h4>
        <div className="space-y-6 ml-1 md:ml-2 border-l border-white/5 pl-4 md:pl-6 text-[10px]">
          {task ? (
            displayedHistory.length > 0 ? (
              <>
                <AnimatePresence mode="popLayout">
                  {displayedHistory.map((entry, i) => (
                    <motion.div
                      key={entry.date + i}
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      className="relative group">
                      <div className="absolute -left-[1.6rem] md:-left-[1.85rem] top-1 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/40 transition-colors" />
                      <div className="text-white/50 leading-relaxed break-words">
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
                    className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-primary/40 hover:text-primary mt-2 transition-colors">
                    {showAllHistory ? (
                      <><ChevronUp size={12} /> Less</>
                    ) : (
                      <><ChevronDown size={12} /> {sortedHistory.length - 3} More</>
                    )}
                  </button>
                )}
              </>
            ) : (
              <div className="text-white/10 italic text-[9px]">No activity recorded.</div>
            )
          ) : (
            <div className="text-white/10 italic text-[9px]">Mission pending.</div>
          )}
        </div>
      </section>
    </div>
  );
};