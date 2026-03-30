import { format, startOfDay } from "date-fns";
import { ArrowRight, ArrowUpDown } from "lucide-react";

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
  <div className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-steel/5 border border-white/5 p-4 rounded-5xl backdrop-blur-xl">
    
    <div className="flex items-center gap-4 bg-background/40 p-1.5 rounded-2xl border border-white/5">
      {["all", "todo", "in-progress", "review", "done"].map((status) => (
        <button
          key={status}
          onClick={() => setFilterStatus(status)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            filterStatus === status
              ? "bg-primary text-black shadow-[0_0_20px_rgba(var(--color-primary),0.4)]"
              : "hover:bg-white/5 opacity-40"
          }`}
        >
          {status}
        </button>
      ))}
    </div>

    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3 bg-background/50 px-4 py-2 rounded-xl border border-white/5">
        <input
          type="date"
          value={format(dateRange.start, "yyyy-MM-dd")}
          onChange={(e) => setDateRange((prev: DateRange) => ({ 
            ...prev, 
            start: startOfDay(new Date(e.target.value)) 
          }))}
          className="bg-transparent text-[10px] font-black uppercase outline-none text-primary cursor-pointer"
        />
        <ArrowRight size={14} className="opacity-20" />
        <input
          type="date"
          value={format(dateRange.end, "yyyy-MM-dd")}
          onChange={(e) => setDateRange((prev: DateRange) => ({ 
            ...prev, 
            end: startOfDay(new Date(e.target.value)) 
          }))}
          className="bg-transparent text-[10px] font-black uppercase outline-none text-primary cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
        <ArrowUpDown size={14} className="text-primary" />
        <select
          value={sortBy}
          onChange={(e) => setBy(e.target.value as "date" | "priority")}
          className="bg-transparent text-[10px] font-bold uppercase outline-none cursor-pointer"
        >
          <option value="date" className="bg-steel">Sort: Date</option>
          <option value="priority" className="bg-steel">Sort: Priority</option>
        </select>
      </div>
    </div>
  </div>
);