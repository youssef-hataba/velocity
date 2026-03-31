import {useState} from "react";
import type {ChangeEvent, FC} from "react";
import {Search, ChevronDown, Clock, BarChart2, SortAsc, Plus, type LucideProps} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import type {SortOption, PriorityFilter} from "./Board";

interface SortOptionConfig {
  value: SortOption;
  label: string;
  icon: FC<LucideProps>;
}

interface BoardControlsProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  activePriority: PriorityFilter;
  onPriorityChange: (priority: PriorityFilter) => void;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  onCreateClick: () => void;
}

export const BoardControls = ({
  searchQuery,
  onSearchChange,
  activePriority,
  onPriorityChange,
  sortBy,
  onSortChange,
  onCreateClick,
}: BoardControlsProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const priorities: PriorityFilter[] = ["all", "urgent", "high", "medium", "low"];

  const sortOptions: SortOptionConfig[] = [
    {value: "newest", label: "NEWEST", icon: Clock},
    {value: "priority", label: "PRIORITY", icon: BarChart2},
    {value: "alphabetical", label: "A-Z INDEX", icon: SortAsc},
  ];

  const currentSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <div className="relative group w-full xl:min-w-[320px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 group-focus-within:text-primary 
            transition-colors duration-300"
          />
          <input
            type="text"
            placeholder="SEARCH SEQUENCES..."
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full bg-steel/5 border border-primary/20 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] font-black tracking-widest focus:outline-none focus:border-primary/40 focus:bg-steel/10 transition-all placeholder:text-muted/20 text-foreground"
          />
        </div>

        <button
          onClick={onCreateClick}
          className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-2 xl:px-5 xl:py-3.5 
          rounded-xl text-[9px] font-black tracking-[0.2em] transition-all hover:scale-105 active:scale-95 
          shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
          <Plus size={14} strokeWidth={3} />
          NEW TASK
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        <div className="flex bg-steel/5 p-1 rounded-xl border border-white/5 backdrop-blur-md shadow-inner w-full sm:w-auto overflow-x-auto no-scrollbar">
          <div className="flex min-w-full sm:min-w-0">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => onPriorityChange(p)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  activePriority === p
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "text-muted/40 hover:text-muted/60"
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-3 bg-steel/5 border border-white/5 rounded-2xl py-3 px-5 text-[9px] font-black uppercase tracking-widest text-muted/40 hover:text-primary hover:border-primary/20 transition-all w-full sm:min-w-40 justify-between group">
            <span className="group-hover:scale-105 transition-transform">{currentSortLabel}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                <motion.div
                  initial={{opacity: 0, y: 10, scale: 0.95}}
                  animate={{opacity: 1, y: 0, scale: 1}}
                  exit={{opacity: 0, y: 10, scale: 0.95}}
                  transition={{duration: 0.2, ease: "easeOut"}}
                  className="absolute right-0 mt-3 w-48 bg-[#0C0C0C]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 z-50 overflow-hidden">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                          sortBy === option.value
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted/40 hover:bg-white/5 hover:text-foreground"
                        }`}>
                        <Icon size={14} />
                        {option.label}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onCreateClick}
          className="lg:hidden w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl text-[9px] font-black tracking-widest shadow-lg active:scale-95 transition-transform">
          <Plus size={16} strokeWidth={3} />
          CREATE SEQUENCE
        </button>
      </div>
    </div>
  );
};
