import {z} from 'zod';

export const SolutionSchema = z.object({
  _id: z.string().optional(),
  taskId: z.string(),
  taskListId: z.string(),
  studentId: z.string(),
  team: z.string(),
  answer: z.string(),
  teacherComment: z.string(),
  points: z.number(),
  duringTime: z.number(),
  correct: z.boolean(),
  checked: z.boolean(),
  usedHints: z.number(),
  ip: z.string(),
  date: z.number(),
});
  
export type SolutionType = z.infer<typeof SolutionSchema>;

export const SolutionSchemaArray = SolutionSchema.array();
  
export type SolutionTypeArray = z.infer<typeof SolutionSchemaArray>;