import EventEmitter from "events";

const EventManager = new EventEmitter();

export const TASK_ADDED_EVENT: string = "TaskAddedEvent";
export const TASK_REMOVED_EVENT: string = "TaskRemovedEvent";
export const TASK_IMPORTANCY_CHANGED_EVENT: string = "TaskImportancyChangedEvent";
export const TASK_DONE_CHANGED_EVENT: string = "TaskDoneChangedEvent";

export default EventManager;