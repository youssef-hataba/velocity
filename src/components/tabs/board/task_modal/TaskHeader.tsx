import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface TaskHeaderProps {
  editedTitle: string;
  setEditedTitle: (val: string) => void;
  onBlur: () => void;
}

export const TaskHeader = ({ editedTitle, setEditedTitle, onBlur }: TaskHeaderProps) => (
  <header className="flex justify-between items-start mb-12">
    <div className="flex-1 mr-6 group">
      <input
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onBlur={onBlur}
        className="bg-transparent border-none text-4xl font-black italic uppercase tracking-tighter text-white w-full focus:outline-none focus:ring-0"
        placeholder="Task Name"
      />
      <div className="h-0.5 w-0 group-focus-within:w-1/2 bg-primary/50 transition-all duration-1000 mt-1" />
    </div>
    <Dialog.Close className="p-4 rounded-[1.5rem] bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all border border-white/5">
      <X size={22} />
    </Dialog.Close>
  </header>
);