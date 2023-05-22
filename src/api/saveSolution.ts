import axios, { AxiosError } from "axios";
import { $token } from "./googleLogin";
import { SolutionType, SolutionSchema } from "../zod/solution";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: baseUrl,
});

export const saveSolution = async (
  solution: SolutionType
): Promise<SolutionType | undefined> => {
  const token = $token.getValue()
  try {
    const response = await client.post(`/api/solution`, {solution}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response.data", response.data);
    const result = SolutionSchema.safeParse(response.data);
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