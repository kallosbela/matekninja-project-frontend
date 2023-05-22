import { z } from "zod";

export const TaskListSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  tasks: z.string().array(),
  sequence: z.string(),
  startTime: z.string().datetime(),
  deadline: z.string().datetime(),
  team: z.string(),
  teacher: z.string(),
});
export type TaskListType = z.infer<typeof TaskListSchema>;

export const TaskListsSchema = TaskListSchema.array();

export const TaskSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  text: z.string(),
  illustration: z.string().array(),
  listen_text: z.string(),
  hints: z.string().array(),
  answer: z.string().array(),
  score: z.number(),
  tags: z.string().array(),
  type: z.string(),
});

export type TaskType = z.infer<typeof TaskSchema>;

export const TasksArraySchema = z.array(TaskSchema);

export type TasksArrayType = z.infer<typeof TasksArraySchema>;