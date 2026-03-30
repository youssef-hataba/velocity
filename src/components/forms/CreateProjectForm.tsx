import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus } from "lucide-react";

const PRESET_COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#a855f7", "#64748b"];

interface ProjectFormData {
  name: string;
  description: string;
  color: string;
  members: string[];
}

export const CreateProjectForm = ({ onSubmit }: { onSubmit: (data: ProjectFormData) => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  const addMember = () => {
    if (memberEmail && !members.includes(memberEmail)) {
      setMembers([...members, memberEmail]);
      setMemberEmail("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, description, color: selectedColor, members });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4 max-h-[80vh] overflow-y-auto px-1 no-scrollbar">
      {/* 1. Project Name */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 px-1">
          Project Name
        </label>
        <Input
          autoFocus
          placeholder="project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 h-12 rounded-xl bg-steel/5 border-steel/10 focus-visible:ring-primary/20 font-bold"
        />
      </div>

      {/* 2. Project Description */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 px-1">
          Description
        </label>
        <Textarea
          placeholder="What is this project about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 min-h-25 rounded-xl bg-steel/5 border-steel/10 focus-visible:ring-primary/20 resize-none"
        />
      </div>

      {/* 3. Team Collaboration */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 px-1 flex items-center gap-2">
          <Users size={12} /> Team Members
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Invite by email..."
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            className="h-10 rounded-xl bg-steel/5 border-steel/10"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMember())}
          />
          <Button 
            type="button" 
            variant="secondary" 
            onClick={addMember}
            className="h-10 w-10 p-0 rounded-xl"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        {/* Members List Chips */}
        <div className="flex flex-wrap gap-2">
          {members.map((email) => (
            <div key={email} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-[11px] font-medium text-primary">
              {email}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Color Picker */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-1">
          Theme Color
        </label>
        <div className="flex gap-3 px-1 mt-4">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-7 h-7 rounded-full transition-all duration-300 ${
                selectedColor === color ? "scale-125 ring-4 ring-primary/20 shadow-lg" : "opacity-40 hover:opacity-100"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <Button type="submit" className="cursor-pointer w-full h-14 rounded-2xl font-black uppercase tracking-widest mt-4">
        Create Project
      </Button>
    </form>
  );
};