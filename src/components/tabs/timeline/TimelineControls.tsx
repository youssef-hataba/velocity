import { format, startOfDay } from "date-fns";
import { ArrowRight, Calendar, LayoutGrid } from "lucide-react";

interface DateRange {
  start: Date;
  end: Date;
}

interface Props {
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  sortBy: "date" | "priority";
  setBy: (s: "date" | "priority") => void;
}

export const TimelineControls = ({ 
  filterStatus, setFilterStatus, dateRange, setDateRange, sortBy, setBy 
}: Props) => (
  <div className="flex flex-col xl:flex-row gap-6 items-center justify-between bg-white/2 border border-white/5 p-4 md:p-6 rounded-4xl md:rounded-[2.5rem] backdrop-blur-2xl shadow-2xl w-full">
    
    {/* Status Filters - Scrollable on mobile */}
    <div className="w-full xl:w-auto overflow-x-auto no-scrollbar pb-2 xl:pb-0">
      <div className="flex items-center gap-1.5 justify-between bg-black/20 p-1.5 rounded-2xl border border-white/5 shadow-inner min-w-max">
        {["all", "todo", "in-progress", "review", "done"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap ${
              filterStatus === status
                ? "bg-primary text-black shadow-[0_0_25px_rgba(var(--color-primary),0.5)] scale-105"
                : "hover:bg-white/5 text-white/40 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
      {/* Date Range Selector */}
      <div className="flex items-center justify-center gap-3 md:gap-4 bg-black/30 px-4 md:px-5 py-2.5 rounded-2xl border border-white/10 group hover:border-primary/30 transition-colors w-full sm:w-auto">
        <div className="relative flex items-center gap-2">
          <Calendar size={12} className="text-primary/50 group-hover:text-primary transition-colors shrink-0" />
          <input
            type="date"
            value={format(dateRange.start, "yyyy-MM-dd")}
            onChange={(e) => setDateRange((prev) => ({ 
              ...prev, 
              start: startOfDay(new Date(e.target.value)) 
            }))}
            className="bg-transparent text-[10px] font-black uppercase outline-none text-white/80 focus:text-primary transition-colors cursor-pointer scheme-dark w-full"
          />
        </div>

        <ArrowRight size={14} className="opacity-10 shrink-0" />

        <div className="relative flex items-center gap-2">
          <input
            type="date"
            value={format(dateRange.end, "yyyy-MM-dd")}
            onChange={(e) => setDateRange((prev) => ({ 
              ...prev, 
              end: startOfDay(new Date(e.target.value)) 
            }))}
            className="bg-transparent text-[10px] font-black uppercase outline-none text-white/80 focus:text-primary transition-colors cursor-pointer scheme-dark w-full"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 md:gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-full sm:w-auto justify-center">
        {[
          { id: "date", label: "Date", icon: Calendar },
          { id: "priority", label: "Priority", icon: LayoutGrid }
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setBy(option.id as "date" | "priority")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              sortBy === option.id 
                ? "bg-white/10 text-white shadow-lg" 
                : "text-white/20 hover:text-white/40"
            }`}
          >
            <option.icon size={12} className={sortBy === option.id ? "text-primary" : ""} />
            <span className="text-[9px] font-black uppercase tracking-widest">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);