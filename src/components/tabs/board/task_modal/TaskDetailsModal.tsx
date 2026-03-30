import * as Dialog from "@radix-ui/react-dialog";
import { useTaskActions } from "../hooks/useTaskActions";
import { TaskHeader } from "./TaskHeader";
import { TaskMainContent } from "./TaskMainContent";
import { TaskSidebar } from "./TaskSidebar";
import type { Task, Status } from "@/types/board";

interface Props {
  task: Task | null;
  initialStatus?: Status;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDetailsModal = ({ task, initialStatus, open, onOpenChange }: Props) => {
  const actions = useTaskActions(task, initialStatus);
  const isEditMode = !!task;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] animate-in fade-in" />
        <Dialog.Content 
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[1100px] translate-x-[-50%] translate-y-[-50%] outline-none"
        >
          <div className="bg-[#0c0c0e] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <div className="p-8 lg:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <TaskHeader 
                editedTitle={actions.editedTitle}
                setEditedTitle={actions.setEditedTitle}
                onBlur={() => actions.handleSyncData()}
                isNew={!isEditMode}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <TaskMainContent 
                  {...actions}
                  task={task}
                />
                <TaskSidebar 
                  {...actions}
                  task={task}
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};