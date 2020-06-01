export class Task {
    taskId: string;
    userId: string;
    name: string;
    color: string;
    priorityId: string;
    projectId: string;
    parentTaskId: string;
    deadline: Date;
    recurring: Date;
    timesPostponed: number;
    isDone: boolean;
}
