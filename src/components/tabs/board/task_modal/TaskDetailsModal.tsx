import * as Dialog from "@radix-ui/react-dialog";
import { useTaskActions } from "../hooks/useTaskActions";
import { TaskHeader } from "./TaskHeader";
import { TaskMainContent } from "./TaskMainContent";
import { TaskSidebar } from "./TaskSidebar";
import type { Task } from "@/types/board";

interface Props {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDetailsModal = ({ task, open, onOpenChange }: Props) => {
  const actions = useTaskActions(task);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] animate-in fade-in" />
        <Dialog.Content 
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl bg-[#0c0c0e]/90 border border-white/10 rounded-[3.5rem] shadow-2xl z-[101] overflow-hidden outline-none animate-in zoom-in-95 duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
          
          <div className="p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <TaskHeader 
              editedTitle={actions.editedTitle}
              setEditedTitle={actions.setEditedTitle}
              onBlur={actions.handleSyncData}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <TaskMainContent 
                task={task}
                editedDesc={actions.editedDesc}
                setEditedDesc={actions.setEditedDesc}
                newSubTaskTitle={actions.newSubTaskTitle}
                setNewSubTaskTitle={actions.setNewSubTaskTitle}
                completed={actions.completed}
                total={actions.total}
                handleSyncData={actions.handleSyncData}
                handleToggleSubTask={actions.handleToggleSubTask}
                handleAddSubTask={actions.handleAddSubTask}
              />

              <TaskSidebar 
                task={task}
                progress={actions.progress}
                updateTask={actions.updateTask}
                showAllHistory={actions.showAllHistory}
                setShowAllHistory={actions.setShowAllHistory}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};