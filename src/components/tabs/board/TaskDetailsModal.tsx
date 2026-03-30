import * as Dialog from "@radix-ui/react-dialog";
import { X, History, CheckSquare, User } from "lucide-react";
import type { Task } from "@/types/board";

interface Props {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDetailsModal = ({ task, open, onOpenChange }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-[3rem] p-10 shadow-2xl z-[101] outline-none animate-in zoom-in-95 duration-300">
          
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">{task.title}</h2>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-60">ID: {task.id}</p>
            </div>
            <Dialog.Close className="p-3 rounded-2xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="space-y-10 max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
            <section className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Description</h4>
              <p className="text-white/70 text-sm leading-relaxed">{task.description}</p>
            </section>

            <section className="space-y-4">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                <CheckSquare size={14} /> Subtasks
              </h4>
              <div className="grid gap-2">
                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((st) => (
                    <div key={st.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                      <input type="checkbox" readOnly checked={st.isCompleted} className="w-4 h-4 rounded border-white/10 bg-transparent accent-primary" />
                      <span className={`text-xs font-bold ${st.isCompleted ? 'line-through opacity-30' : 'text-white/80'}`}>{st.title}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-white/20 italic">No subtasks defined.</p>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                <History size={14} /> Audit Trail
              </h4>
              <div className="space-y-6 ml-2 border-l border-white/10 pl-6">
                {task.history?.map((entry, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                      <User size={12} className="text-white/40" />
                      {entry.user} <span className="font-normal text-white/50 text-[11px]">{entry.action}</span>
                    </div>
                    <span className="text-[9px] text-white/20 font-black uppercase tracking-tighter">
                      {new Date(entry.date).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};