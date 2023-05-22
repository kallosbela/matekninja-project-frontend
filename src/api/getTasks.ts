import axios from "axios";
import { z } from "zod";
import { baseUrl } from "./baseUrl";
import { $token } from "./googleLogin"
import { TaskType, TasksArraySchema } from "../zod/task";

const client = axios.create({
  baseURL: baseUrl,
});

export const getTasks = async (
  tasklistId: String
): Promise<TaskType[] | undefined> => {
  const token = $token.getValue();
  console.log("token", token);
  try {
    const response = await client.post(`/api/tasks/${tasklistId}`, "", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("response.data", response.data);
    const result = TasksArraySchema.safeParse(response.data);
    if (!result.success) {
      console.log(result.error);
      return;
    }
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyTasks = async (
  taskIds: string[]
): Promise<TaskType[] | undefined> => {
  const token = $token.getValue();
  console.log("token", token);
  try {
    const response = await client.post(`/api/tasks/mytasks`, {"taskIds":taskIds}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("response.data", response.data);
    const result = TasksArraySchema.safeParse(response.data);
    if (!result.success) {
      console.log(result.error);
      return;
    }
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
