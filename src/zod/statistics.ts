import {z} from 'zod';

export const statisticsSchema = z.object({
  studentId: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  practiceTime: z.number().array(), // ez sem jó
  solvedTasks: z.number(),
  correctTasks: z.number(),
  points: z.number().array(),//ez sem jó
  pointRankInTeam: z.number(),
  practiceRankInTeam: z.number(),
  team: z.string(),
  teacher: z.string(),
  school: z.string(),
});

export type StatisticsType = z.infer<typeof statisticsSchema>;

