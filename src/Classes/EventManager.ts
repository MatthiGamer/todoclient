import EventEmitter from "events";

const EventManager = new EventEmitter();

export const TASK_ADDED_OR_REMOVED_EVENT: string = "TaskAddedOrRemovedEvent";
export const TASK_IMPORTANCY_CHANGED_EVENT: string = "TaskImportancyChangedEvent";
export const TASK_DONE_CHANGED_EVENT: string = "TaskDoneChangedEvent";

export default EventManager;