import { useState, useMemo, useRef, useEffect } from "react";
import { type Project, type Task, type Priority, PRIORITY_CONFIGS } from "@/types/board";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  isSameDay,
  differenceInDays,
  startOfDay,
  isWithinInterval,
  subDays,
  addDays,
  eachDayOfInterval,
} from "date-fns";

import { TimelineControls } from "./TimelineControls";
import { ProjectAnalytics } from "./ProjectAnalytics";
import { useBoardStore } from "@/store/useBoardStore";

export const ProjectTimeline = ({ project }: { project: Project }) => {
  const tasksFromStore = useBoardStore((state) => state.tasks);
  const today = startOfDay(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setBy] = useState<"date" | "priority">("date");
  
  const [dateRange, setDateRange] = useState({
    start: subDays(today, 15),
    end: addDays(today, 15)
  });

  const timelineDays = useMemo(
    () => eachDayOfInterval({ start: dateRange.start, end: dateRange.end }),
    [dateRange]
  );

  // Auto-scroll to "Today" on initial load
  useEffect(() => {
    if (scrollRef.current) {
      const todayIndex = differenceInDays(today, dateRange.start);
      // 288px is the sidebar width (w-72), 60px is the day width
      const scrollPosition = (todayIndex * 60);
      scrollRef.current.scrollLeft = scrollPosition;
    }
  }, []);

  const filteredTasks = useMemo(() => {
    let result = (tasksFromStore || []).filter((t) => t.projectId === project?.id);
    if (filterStatus !== "all") result = result.filter((t) => t.status === filterStatus);

    result = result.filter((t) => {
      const tStart = new Date(t.startDate || t.createdAt);
      return isWithinInterval(tStart, {
        start: dateRange.start,
        end: dateRange.end,
      });
    });

    return [...result].sort((a, b) => {
      if (sortBy === "priority") {
        const order: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
        return order[a.priority as Priority] - order[b.priority as Priority];
      }
      return new Date(a.startDate || "").getTime() - new Date(b.startDate || "").getTime();
    });
  }, [tasksFromStore, project?.id, filterStatus, sortBy, dateRange]);

  const getTaskStyle = (task: Task) => {
    const start = startOfDay(new Date(task.startDate || task.createdAt));
    const end = startOfDay(new Date(task.endDate || task.createdAt));
    const offsetDays = differenceInDays(start, dateRange.start);
    const durationDays = Math.max(1, differenceInDays(end, start) + 1);
    
    return { 
      left: `${offsetDays * 60}px`, 
      width: `${durationDays * 60}px` 
    };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-1000 pb-20 px-1 md:px-0">
      <TimelineControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
        sortBy={sortBy}
        setBy={setBy}
      />
      
      <div className="bg-steel/5 border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden backdrop-blur-md relative">
        <div 
          ref={scrollRef} 
          className="overflow-x-auto custom-scrollbar scroll-smooth"
        >
          <div className="min-w-max relative pb-4">
            {/* Header Row */}
            <div className="flex border-b border-white/5 bg-white/2">
              <div className="w-48 md:w-72 shrink-0 border-r border-white/5 p-4 md:p-6 flex items-center bg-steel/10 sticky left-0 z-20 backdrop-blur-3xl">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">
                  Roadmap
                </span>
              </div>
              <div className="flex">
                {timelineDays.map((day) => (
                  <div
                    key={day.toString()}
                    className={`w-15 py-4 md:py-6 text-center border-r border-white/5 transition-colors ${isSameDay(day, today) ? "bg-primary/10 border-x border-primary/20" : ""}`}
                  >
                    <span className="block text-[7px] md:text-[8px] font-black opacity-20 mb-1 uppercase">
                      {format(day, "EEE")}
                    </span>
                    <span className={`text-xs md:text-sm font-black ${isSameDay(day, today) ? "text-primary" : "opacity-40"}`}>
                      {format(day, "d")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Rows */}
            <div className="relative min-h-[300px] md:min-h-120">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => {
                  const { left, width } = getTaskStyle(task);
                  const config = PRIORITY_CONFIGS[task.priority as Priority];
                  return (
                    <motion.div
                      layout
                      key={task.id}
                      className="flex border-b border-white/5 group h-16 md:h-20"
                    >
                      {/* Sticky Task Info Sidebar */}
                      <div className="w-48 md:w-72 shrink-0 p-4 md:p-6 border-r border-white/5 flex flex-col justify-center gap-0.5 md:gap-1 sticky left-0 z-20 bg-[#0C0C0C]/80 backdrop-blur-3xl">
                        <h5 className="text-[11px] md:text-xs font-bold truncate group-hover:text-primary transition-colors">
                          {task.title}
                        </h5>
                        <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest ${config.text}`}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Task Timeline Bar */}
                      <div className="flex-1 relative flex items-center">
                        <div
                          style={{ left, width }}
                          className={`absolute h-8 md:h-11 rounded-xl md:rounded-2xl flex items-center px-3 md:px-4 border backdrop-blur-md transition-all duration-300 ${config.bg} ${config.border}`}
                        >
                          <span className={`text-[8px] md:text-[9px] font-black uppercase truncate ${config.text}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <ProjectAnalytics tasks={filteredTasks} />
    </div>
  );
};