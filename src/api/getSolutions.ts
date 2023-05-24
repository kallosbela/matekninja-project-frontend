import axios, { AxiosError } from "axios";
import { $token } from "./googleLogin";
import { baseUrl } from "./baseUrl";
import {SolutionType, SolutionSchemaArray} from "../zod/solution";

const client = axios.create({
  baseURL: baseUrl,
});

export const getSolutions = async (start: number, end: number): Promise<SolutionType[] | undefined> => {
  const token = $token.getValue()
  try {
    const response = await client.get(`/api/solution`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response.data", response.data);
    const filtered = response.data.filter((solution: SolutionType) => {
      return solution.date >= start && solution.date <= end;
    });

    const result = SolutionSchemaArray.safeParse(filtered);
    if (!result.success) {
      console.log(result.error);
      return;
    }
    return result.data
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      localStorage.removeItem("token");
      $token.next(null)
      console.log(error);
    }
  }
};