import { Plus } from "lucide-react";

interface MilestoneInputProps {
  value: string;
  onChange: (val: string) => void;
  onAdd: () => void;
}

export const MilestoneInput = ({ value, onChange, onAdd }: MilestoneInputProps) => {
  const LIMIT = 180;
  const isOverLimit = value.length > LIMIT;
  const isEmpty = value.trim() === "";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isOverLimit && !isEmpty) onAdd();
    }
  };

  return (
    <div className={`flex items-center gap-4 mt-6 p-2 pl-4 lg:pl-6 rounded-2xl bg-white/3 border border-dashed transition-colors ${
      isOverLimit ? 'border-red-500/40' : 'border-white/10'
    }`}>
      <div className="flex-1 flex flex-col">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ADD MILESTONE..."
          className="bg-transparent border-none text-[11px] font-black text-white outline-none placeholder:text-white/10 tracking-widest min-w-0 py-2"
        />
        {value.length > 0 && (
          <span className={`text-[8px] font-bold tracking-widest ${isOverLimit ? 'text-red-500' : 'text-white/10'}`}>
            {value.length} / {LIMIT}
          </span>
        )}
      </div>
      <button 
        disabled={isOverLimit || isEmpty}
        onClick={onAdd} 
        className={`p-3 rounded-xl transition-all ${
          isOverLimit || isEmpty 
          ? 'bg-white/5 text-white/10 cursor-not-allowed' 
          : 'bg-primary text-black hover:scale-105'
        }`}
      >
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
};