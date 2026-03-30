import {useState, useMemo} from "react";
import {useBoardStore} from "../../store/useBoardStore";
import {type Project, type Task, type Priority, PRIORITY_CONFIGS} from "../../types/board";
import {motion, AnimatePresence} from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  differenceInDays,
  startOfDay,
  isWithinInterval,
} from "date-fns";

import {TimelineControls} from "./TimelineControls";
import {ProjectAnalytics} from "./ProjectAnalytics";

export const ProjectTimeline = ({project}: {project: Project}) => {
  const tasksFromStore = useBoardStore((state) => state.tasks);
  const today = startOfDay(new Date());

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setBy] = useState<"date" | "priority">("date");
  const [dateRange, setDateRange] = useState({start: startOfMonth(today), end: endOfMonth(today)});

  const timelineDays = useMemo(
    () => eachDayOfInterval({start: dateRange.start, end: dateRange.end}),
    [dateRange],
  );

  const filteredTasks = useMemo(() => {
    let result = (tasksFromStore || []).filter((t) => t.projectId === project?.id);
    if (filterStatus !== "all") result = result.filter((t) => t.status === filterStatus);

    result = result.filter((t) =>
      isWithinInterval(new Date(t.startDate || t.createdAt), {
        start: dateRange.start,
        end: dateRange.end,
      }),
    );

    return [...result].sort((a, b) => {
      if (sortBy === "priority") {
        const order: Record<string, number> = {urgent: 0, high: 1, medium: 2, low: 3};
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
    return {left: `${offsetDays * 60}px`, width: `${durationDays * 60}px`};
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-1000 pb-20">
      <TimelineControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
        sortBy={sortBy}
        setBy={setBy}
      />
      <div className="bg-steel/5 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md relative">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-max relative pb-4">
            {/* Header: Timeline Days */}
            <div className="flex border-b border-white/5 bg-white/2">
              <div className="w-72 shrink-0 border-r border-white/5 p-6 flex items-center bg-steel/10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">
                  Roadmap
                </span>
              </div>
              <div className="flex">
                {timelineDays.map((day) => (
                  <div
                    key={day.toString()}
                    className={`w-15 py-6 text-center border-r border-white/5 ${isSameDay(day, today) ? "bg-primary/5" : ""}`}>
                    <span className="block text-[8px] font-black opacity-20 mb-1 uppercase">
                      {format(day, "EEE")}
                    </span>
                    <span
                      className={`text-sm font-black ${isSameDay(day, today) ? "text-primary" : "opacity-40"}`}>
                      {format(day, "d")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Logic */}
            <div className="relative min-h-120">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => {
                  const {left, width} = getTaskStyle(task);
                  const config = PRIORITY_CONFIGS[task.priority as Priority];
                  return (
                    <motion.div
                      layout
                      key={task.id}
                      className="flex border-b border-white/5 group h-20">
                      <div className="w-72 shrink-0 p-6 border-r border-white/5 flex flex-col justify-center gap-1">
                        <h5 className="text-xs font-bold truncate group-hover:text-primary transition-colors">
                          {task.title}
                        </h5>
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest ${config.text}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex-1 relative flex items-center">
                        <div
                          style={{left, width}}
                          className={`absolute h-11 rounded-2xl flex items-center px-4 border backdrop-blur-md ${config.bg} ${config.border}`}>
                          <span
                            className={`text-[9px] font-black uppercase truncate ${config.text}`}>
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
