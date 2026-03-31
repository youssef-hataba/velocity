import * as Dialog from "@radix-ui/react-dialog";
import { useTaskActions } from "../hooks/useTaskActions";
import { useBoardStore } from "@/store/useBoardStore";
import { TaskHeader } from "./TaskHeader";
import { TaskMainContent } from "./TaskMainContent";
import { TaskSidebar } from "./taskSidebar/TaskSidebar";
import type { Task, Status } from "@/types/board";

interface Props {
  task: Task | null;
  initialStatus?: Status;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ModalInnerContentProps {
  task: Task | null;
  initialStatus?: Status;
  onOpenChange: (open: boolean) => void;
}

export const TaskDetailsModal = ({ task, initialStatus, open, onOpenChange }: Props) => {
  const modalKey = open ? (task?.id || "new-task-key") : "closed-key";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xl z-100 animate-in fade-in" />
        <Dialog.Content
          key={modalKey}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed left-[50%] top-[50%] z-101 w-[95%] lg:w-full max-w-275 translate-x-[-50%] translate-y-[-50%] outline-none"
        >
          <ModalInnerContent 
            task={task} 
            initialStatus={initialStatus} 
            onOpenChange={onOpenChange} 
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const ModalInnerContent = ({ task, initialStatus, onOpenChange }: ModalInnerContentProps) => {
  const actions = useTaskActions(task, initialStatus);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const isEditMode = !!task;

  const TITLE_LIMIT = 50;
  const DESC_LIMIT = 500;

  const isTitleOverLimit = actions.editedTitle.length > TITLE_LIMIT;
  const isDescOverLimit = actions.editedDesc.length > DESC_LIMIT;
  const isTitleEmpty = actions.editedTitle.trim() === "";
  
  const isSubmitDisabled = isTitleOverLimit || isDescOverLimit || isTitleEmpty;

  const handleDelete = () => {
    if (task?.id) {
      deleteTask(task.id);
      onOpenChange(false);
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/10 rounded-4xl lg:rounded-[3rem] shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="p-6 lg:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <TaskHeader
          editedTitle={actions.editedTitle}
          setEditedTitle={actions.setEditedTitle}
          onBlur={() => !isTitleOverLimit && actions.handleSyncData()}
          isNew={!isEditMode}
          isTitleOverLimit={isTitleOverLimit}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <TaskMainContent 
            {...actions} 
            task={task} 
            isNew={!isEditMode} 
            onDeleteTask={handleDelete}
            onClose={() => onOpenChange(false)}
            isSubmitDisabled={isSubmitDisabled}
            isTitleOverLimit={isTitleOverLimit}
          />
          <TaskSidebar {...actions} task={task} />
        </div>
      </div>
    </div>
  );
};