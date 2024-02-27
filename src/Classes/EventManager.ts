import EventEmitter from "events";

const EventManager = new EventEmitter();

export const SEND_ADDED_TASK_EVENT: string = "SendAddedTaskEvent";
export const SEND_REMOVED_TASK_EVENT: string = "SendRemovedTaskEvent";
export const SEND_CHANGED_TASK_IMPORTANCE_EVENT: string = "SendChangedTaskImportanceEvent";
export const SEND_CHANGED_TASK_DONE_STATUS_EVENT: string = "SendChangedTaskDoneStatusEvent";

export const SYNCHRONIZE_ADDED_TASK_EVENT: string = "SynchronizeAddedTaskEvent";
export const SYNCHRONIZE_REMOVED_TASK_EVENT: string = "SynchronizeRemovedTaskEvent";
export const SYNCHRONIZE_CHANGED_TASK_IMPORTANCE_EVENT: string = "SynchronizeChangedTaskImportanceEvent";
export const SYNCHRONIZE_CHANGED_TASK_DONE_STATUS_EVENT: string = "SynchronizeChangedTaskDoneStatusEvent";

export default EventManager;