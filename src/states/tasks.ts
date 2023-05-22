import { BehaviorSubject } from "rxjs";
import { TaskListType } from "../zod/task";
import { TaskType } from "../zod/task";

export const $tasklist = new BehaviorSubject<TaskListType|null>(null);
export const $tasks = new BehaviorSubject<TaskType[]>([]);
export const $taskIndex = new BehaviorSubject<number>(0);

export const setTaskList = (tasklist: TaskListType|null) => {
  $tasklist.next(tasklist);
}

export const resetTaskList = () => {
  $tasklist.next(null);
}

export const setTasks = (tasks: TaskType[], sequence: string) => {
  if (sequence === "random") {
    tasks = tasks.sort(() => Math.random() - 0.5);
  }
  $tasks.next(tasks);
}

export const resetTasks = () => {
  $tasks.next([]);
}

export const resetTaskIndex = () => {
  $taskIndex.next(0);
}


