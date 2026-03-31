import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface TaskHeaderProps {
  editedTitle: string;
  setEditedTitle: (val: string) => void;
  onBlur: () => void;
  isNew: boolean;
}

export const TaskHeader = ({ editedTitle, setEditedTitle, onBlur, isNew }: TaskHeaderProps) => (
  <header className="flex justify-between items-start mb-8 lg:mb-12">
    <div className="flex-1 mr-4 lg:mr-6 group">
      <input
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onBlur={onBlur}
        // Responsive font size: 2xl on mobile, 4xl on desktop
        className="bg-transparent border-none text-2xl lg:text-4xl font-black italic uppercase tracking-tighter text-white w-full focus:outline-none placeholder:opacity-20"
        placeholder={isNew ? "UNTITLED MISSION" : "TASK NAME"}
      />
      <div className="h-0.5 w-0 group-focus-within:w-1/2 bg-primary/50 transition-all duration-1000 mt-1" />
    </div>
    <Dialog.Close className="p-3 lg:p-4 rounded-2xl lg:rounded-3xl bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all border border-white/5">
      <X size={20} className="lg:w-[22px]" />
    </Dialog.Close>
  </header>
);