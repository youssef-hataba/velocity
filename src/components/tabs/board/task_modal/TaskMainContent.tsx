import {CheckSquare, Plus, Trash2, CheckCircle2, ListChecks} from "lucide-react";
import {AnimatePresence} from "framer-motion";
import type {Task, SubTask} from "@/types/board";
import {TaskDescriptionInput} from "./inputs/TaskDescriptionInput";
import {MilestoneInput} from "./inputs/MilestoneInput";
import {MilestoneItem} from "./MilestoneItem";
import {TaskAIIntelligence} from "./AI/TaskAIIntelligence";
import type {AIEstimation} from "../hooks/useTaskAI";

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
  isSubmitDisabled: boolean;
  isTitleOverLimit: boolean;
  aiEstimation: AIEstimation | null;
  isEstimating: boolean;
  onRunAi: () => void;
}

export const TaskMainContent = (props: MainContentProps) => {
  const handleLaunchOrSave = () => {
    if (props.isSubmitDisabled) return;
    props.handleSyncData({subTasks: props.localSubTasks});
    props.onClose();
  };

  const handleCompleteAll = () => {
    const updated = props.localSubTasks.map((st) => ({...st, isCompleted: true}));
    props.setLocalSubTasks(updated);
    props.handleSyncData({subTasks: updated});
  };

  return (
    <div className="lg:col-span-8 space-y-10 lg:space-y-12">
      <TaskDescriptionInput
        value={props.editedDesc}
        onChange={props.setEditedDesc}
        onBlur={props.handleSyncData}
      />

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
            <CheckSquare size={14} /> Milestones
          </h4>
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {props.total > 0 && props.completed !== props.total && (
              <button
                onClick={handleCompleteAll}
                className="text-[9px] font-black uppercase tracking-widest text-primary/40 hover:text-primary flex items-center gap-1.5 transition-colors">
                <ListChecks size={14} /> Mark all done
              </button>
            )}
            <span className="text-white/20 font-mono text-[10px]">
              {props.completed} / {props.total}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {props.localSubTasks.map((st) => (
              <MilestoneItem
                key={st.id}
                st={st}
                onToggle={() => props.handleToggleSubTask(st.id)}
              />
            ))}
          </AnimatePresence>

          <MilestoneInput
            value={props.newSubTaskTitle}
            onChange={props.setNewSubTaskTitle}
            onAdd={props.handleAddSubTask}
          />
        </div>
      </section>

      <TaskAIIntelligence
        estimation={props.aiEstimation}
        isEstimating={props.isEstimating}
        onRun={props.onRunAi}
      />

      <div className="pt-8 lg:pt-10 flex flex-row items-center gap-3 lg:gap-4 border-t border-white/5">
        <button
          onClick={handleLaunchOrSave}
          disabled={props.isSubmitDisabled}
          className={`flex-1 h-14 lg:h-16 rounded-3xl lg:rounded-4xl font-black uppercase tracking-widest text-[11px] lg:text-[12px] flex items-center justify-center gap-2 lg:gap-3 transition-all ${
            props.isSubmitDisabled
              ? "bg-white/5 text-white/10 cursor-not-allowed opacity-50"
              : "bg-primary hover:bg-primary/90 text-black active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          }`}>
          {props.isNew ? (
            <>
              <Plus size={18} strokeWidth={3} /> Launch Mission
            </>
          ) : (
            <>
              <CheckCircle2 size={18} strokeWidth={2} /> Save & Exit
            </>
          )}
        </button>

        {!props.isNew && (
          <button
            onClick={() => window.confirm("Terminate mission?") && props.onDeleteTask()}
            className="p-4 lg:p-5 rounded-2xl lg:rounded-[1.8rem] bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-500/60 hover:text-red-500 transition-all active:scale-95">
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
