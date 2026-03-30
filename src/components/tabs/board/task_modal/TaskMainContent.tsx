import { Sparkles, CheckSquare, Save, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Task, SubTask } from "@/types/board";

interface MainContentProps {
  task: Task | null;
  localSubTasks: SubTask[];
  editedDesc: string;
  setEditedDesc: (val: string) => void;
  newSubTaskTitle: string;
  setNewSubTaskTitle: (val: string) => void;
  completed: number;
  total: number;
  handleSyncData: () => void;
  handleToggleSubTask: (id: string) => void;
  handleAddSubTask: () => void;
}

export const TaskMainContent = (props: MainContentProps) => (
  <div className="lg:col-span-8 space-y-12">
    <section className="space-y-4">
      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
        <Sparkles size={12} className="text-primary" /> Core Narrative
      </h4>
      <textarea
        value={props.editedDesc}
        onChange={(e) => props.setEditedDesc(e.target.value)}
        onBlur={() => props.handleSyncData()}
        rows={6}
        className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 text-[14px] text-white/70 leading-relaxed focus:outline-none focus:border-primary/30 transition-all resize-none"
        placeholder="Define the mission objective..."
      />
    </section>

    <section className="space-y-6">
      <h4 className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-primary">
        <span className="flex items-center gap-2"><CheckSquare size={14} /> Milestones</span>
        <span className="text-white/20 font-mono">{props.completed} / {props.total}</span>
      </h4>
      
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {props.localSubTasks.map((st) => (
            <motion.div layout key={st.id} className="flex items-center gap-4 p-5 rounded-[1.8rem] bg-white/[0.02] border border-white/5 group">
              <button
                onClick={() => props.handleToggleSubTask(st.id)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${st.isCompleted ? 'bg-primary border-primary' : 'border-white/10'}`}
              >
                {st.isCompleted && <Save size={12} className="text-black" />}
              </button>
              <span className={`text-[12px] font-bold ${st.isCompleted ? 'line-through text-white/10' : 'text-white/80'}`}>
                {st.title}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-6 p-2 pl-6 rounded-2xl bg-white/[0.03] border border-dashed border-white/10">
          <input
            value={props.newSubTaskTitle}
            onChange={(e) => props.setNewSubTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && props.handleAddSubTask()}
            placeholder="ADD MILESTONE..."
            className="flex-1 bg-transparent border-none text-[11px] font-black text-white outline-none placeholder:text-white/10 tracking-widest"
          />
          <button onClick={props.handleAddSubTask} className="p-3 bg-primary text-black rounded-xl hover:scale-105 transition-all">
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  </div>
);