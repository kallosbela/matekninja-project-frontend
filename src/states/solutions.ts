import { SolutionType } from "../zod/solution";
import { BehaviorSubject } from "rxjs";
import { TaskListType, TaskType } from "../zod/task";
import { UserType } from "./user";

export const $solutions = new BehaviorSubject<SolutionType[]>([]); 
export const initialSolutions = (user: UserType, tasks: TaskType[], tasklist: TaskListType) => {
  const initial = tasks.map((task) => {
    return {
      taskId: task._id!,
      taskListId: tasklist._id!,
      studentId: user._id!,
      team: user.team,
      answer: "",
      teacherComment: "",
      points: 0,
      duringTime: 0,
      correct: false,
      checked: false,
      usedHints: 0,
      ip: localStorage.getItem("ip") || "",
      date: 0,
    }
  });
  $solutions.next(initial);
}