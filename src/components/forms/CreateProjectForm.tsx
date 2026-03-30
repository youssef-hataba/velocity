import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PRESET_COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#a855f7", "#64748b"];

interface ProjectFormData {
  name: string;
  color: string;
}

export const CreateProjectForm = ({ onSubmit }: { onSubmit: (data: ProjectFormData) => void }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, color: selectedColor });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pt-4">
      {/* Project Name */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-1">
          Project Name
        </label>
        <Input
          autoFocus
          placeholder="e.g. MooDist Studio"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 h-14 rounded-2xl bg-steel/5 border-steel/10 focus-visible:ring-primary/20 font-bold"
        />
      </div>

      {/* Color Picker */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-1">
          Theme Color
        </label>
        <div className="flex gap-4 px-1 my-4">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                selectedColor === color ? "scale-125 ring-4 ring-primary/20 shadow-lg" : "opacity-50 hover:opacity-100"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <Button type="submit" className="cursor-pointer w-full h-14 rounded-2xl font-black uppercase tracking-widest">
        Create Project
      </Button>
    </form>
  );
};