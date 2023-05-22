import axios, { AxiosError, AxiosResponse } from "axios";
import { $token } from "./googleLogin";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: baseUrl,
});

export const deleteSolution = async (
  solutionId: string
): Promise<AxiosResponse | undefined> => {
  const token = $token.getValue()
  try {
    const response = await client.delete(`/api/solution`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { solutionId }
    });
    console.log("response", response);
    return response
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      localStorage.removeItem("token");
      $token.next(null)
      console.log(error);
    }
  }
};