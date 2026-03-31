import type {SidebarProps} from "../../types/sidebar";
import {TaskMetrics} from "./TaskMetrics";
import {TaskTimeline} from "./TaskTimeline";

export const TaskSidebar = (props: SidebarProps) => {
  return (
    <div className="lg:col-span-4 space-y-10 md:space-y-12 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 md:pt-10 lg:pt-0 lg:pl-10 pb-10 lg:pb-0">
      <TaskMetrics
        progress={props.progress}
        status={props.status}
        priority={props.priority}
        setStatus={props.setStatus}
        setPriority={props.setPriority}
        onSync={props.handleSyncData}
      />

      <TaskTimeline
        task={props.task}
        startDate={props.startDate}
        endDate={props.endDate}
        showAllHistory={props.showAllHistory}
        setStartDate={props.setStartDate}
        setEndDate={props.setEndDate}
        setShowAllHistory={props.setShowAllHistory}
        onSync={props.handleSyncData}
      />
    </div>
  );
};