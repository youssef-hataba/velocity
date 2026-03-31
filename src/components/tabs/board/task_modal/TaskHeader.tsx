import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TaskHeaderProps {
  editedTitle: string;
  setEditedTitle: (val: string) => void;
  onBlur: () => void;
  isNew: boolean;
  isTitleOverLimit: boolean;
}

export const TaskHeader = ({ editedTitle, setEditedTitle, onBlur, isNew, isTitleOverLimit }: TaskHeaderProps) => {
  const TITLE_LIMIT = 50;

  return (
    <header className="flex justify-between items-start mb-8 lg:mb-12">
      <div className="flex-1 mr-4 lg:mr-6 group relative">
        <div className="flex flex-col gap-1">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={onBlur}
            className={`bg-transparent border-none text-2xl lg:text-4xl font-black italic uppercase tracking-tighter w-full focus:outline-none placeholder:opacity-20 transition-colors ${
              isTitleOverLimit ? 'text-red-500' : 'text-white'
            }`}
            placeholder={isNew ? "UNTITLED MISSION" : "TASK NAME"}
          />
          
          <div className="relative h-0.5 w-full bg-white/5 mt-1 overflow-hidden rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: isTitleOverLimit ? "100%" : "50%",
                backgroundColor: isTitleOverLimit ? "#ef4444" : "#3b82f6"
              }}
              className={`h-full transition-all duration-1000 ${!isTitleOverLimit && 'group-focus-within:w-1/2 opacity-0 group-focus-within:opacity-50'}`}
            />
          </div>

          <AnimatePresence>
            {isTitleOverLimit && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2 italic"
              >
                <AlertCircle size={10} />
                Title sequence exceeds safe parameters ({editedTitle.length}/{TITLE_LIMIT})
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Dialog.Close className="p-3 lg:p-4 rounded-2xl lg:rounded-3xl bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all border border-white/5 shrink-0">
        <X size={20} className="lg:w-5.5" />
      </Dialog.Close>
    </header>
  );
};