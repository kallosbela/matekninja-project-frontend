import axios from "axios";
import { $token } from "./googleLogin";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: baseUrl,
});

export const updateUserData = async (user: any, data: any): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    const response = await client.put(`/api/user/${user?._id}`, data, {headers: { Authorization: `Bearer ${token}`}});
    $token.next(response.data.token)
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};