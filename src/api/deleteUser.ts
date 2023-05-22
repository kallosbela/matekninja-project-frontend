import axios from "axios";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: baseUrl,
});

export const deleteUser = async (user: any): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    const response = await client.delete(`/api/user/${user?.id}`, {headers: { Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};