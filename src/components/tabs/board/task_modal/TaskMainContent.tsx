import { Sparkles, CheckSquare, Save, Plus, Trash2, CheckCircle2, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Task, SubTask } from "@/types/board";

interface MainContentProps {
  task: Task | null;
  localSubTasks: SubTask[];
  setLocalSubTasks: (subtasks: SubTask[]) => void;
  editedDesc: string;
  setEditedDesc: (val: string) => void;
  newSubTaskTitle: string;
  setNewSubTaskTitle: (val: string) => void;
  completed: number;
  total: number;
  handleSyncData: (overrides?: Partial<Task>) => void;
  handleToggleSubTask: (id: string) => void;
  handleAddSubTask: () => void;
  onDeleteTask: () => void;
  isNew: boolean;
  onClose: () => void;
}

export const TaskMainContent = (props: MainContentProps) => {
  const handleLaunchOrSave = () => {
    props.handleSyncData({ subTasks: props.localSubTasks });
    props.onClose();
  };

  const handleCompleteAll = () => {
    const updated = props.localSubTasks.map(st => ({ ...st, isCompleted: true }));
    props.setLocalSubTasks(updated);
    props.handleSyncData({ subTasks: updated });
  };

  return (
    <div className="lg:col-span-8 space-y-10 lg:space-y-12">
      <section className="space-y-4">
        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          <Sparkles size={12} className="text-primary" /> Core Narrative
        </h4>
        <textarea
          value={props.editedDesc}
          onChange={(e) => props.setEditedDesc(e.target.value)}
          onBlur={() => props.handleSyncData()}
          rows={6}
          // Smaller padding on mobile
          className="w-full bg-white/3 border border-white/5 rounded-3xl lg:rounded-4xl p-5 lg:p-8 text-[14px] text-white/70 leading-relaxed focus:outline-none focus:border-primary/30 transition-all resize-none"
          placeholder="Define the mission objective..."
        />
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
            <CheckSquare size={14} /> Milestones
          </h4>
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {props.total > 0 && props.completed !== props.total && (
              <button 
                onClick={handleCompleteAll}
                className="text-[9px] font-black uppercase tracking-widest text-primary/40 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                <ListChecks size={14} /> Mark all done
              </button>
            )}
            <span className="text-white/20 font-mono text-[10px]">{props.completed} / {props.total}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {props.localSubTasks.map((st) => (
              <motion.div layout key={st.id} className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl lg:rounded-[1.8rem] bg-white/2 border border-white/5 group">
                <button
                  onClick={() => props.handleToggleSubTask(st.id)}
                  className={`w-6 h-6 shrink-0 rounded-lg border flex items-center justify-center transition-all ${st.isCompleted ? 'bg-primary border-primary' : 'border-white/10'}`}
                >
                  {st.isCompleted && <Save size={12} className="text-black" />}
                </button>
                <span className={`text-[12px] font-bold wrap-break-words ${st.isCompleted ? 'line-through text-white/10' : 'text-white/80'}`}>
                  {st.title}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-center gap-4 mt-6 p-2 pl-4 lg:pl-6 rounded-2xl bg-white/3 border border-dashed border-white/10">
            <input
              value={props.newSubTaskTitle}
              onChange={(e) => props.setNewSubTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && props.handleAddSubTask()}
              placeholder="ADD MILESTONE..."
              className="flex-1 bg-transparent border-none text-[11px] font-black text-white outline-none placeholder:text-white/10 tracking-widest min-w-0"
            />
            <button onClick={props.handleAddSubTask} className="p-3 bg-primary text-black rounded-xl hover:scale-105 transition-all">
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer Buttons: Horizontal on large screens, stack on small if needed or keep inline */}
      <div className="pt-8 lg:pt-10 flex flex-row items-center gap-3 lg:gap-4 border-t border-white/5">
        <button 
          onClick={handleLaunchOrSave}
          className="flex-1 bg-primary hover:bg-primary/90 text-black h-14 lg:h-16 rounded-3xl lg:rounded-4xl font-black uppercase tracking-widest text-[11px] lg:text-[12px] flex items-center justify-center gap-2 lg:gap-3 transition-all active:scale-95"
        >
          {props.isNew ? (
            <><Plus size={18} strokeWidth={3} /> Launch Mission</>
          ) : (
            <><CheckCircle2 size={18} strokeWidth={2} /> Save & Exit</>
          )}
        </button>

        {!props.isNew && (
          <button 
            onClick={() => {
              if(window.confirm("Terminate mission and erase all data?")) {
                props.onDeleteTask();
              }
            }}
            className="p-4 lg:p-5 rounded-2xl lg:rounded-[1.8rem] bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-500/60 hover:text-red-500 transition-all active:scale-95"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};