import axios, { AxiosError } from "axios";
import { UserType } from "../states/user";
import { $token } from "./googleLogin";
import { TaskListType, TaskListsSchema } from "../zod/task";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: baseUrl,
});

export const getTaskLists = async (
  user: UserType
): Promise<TaskListType[] | undefined> => {
  const token = $token.getValue()
  try {
    const response = await client.get(`/api/tasklists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response.data", response.data);
    const result = TaskListsSchema.safeParse(response.data);
    if (!result.success) {
      console.log(result.error);
      return;
    }
    return result.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      localStorage.removeItem("token");
      $token.next(null)
      console.log(error);
    }
  }
};
