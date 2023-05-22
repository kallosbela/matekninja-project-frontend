import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";
import { baseUrl } from "./baseUrl";
import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode"
import { $isAssessmentActive } from "../states/isAssesmentActive";

export const $token = new BehaviorSubject<string | null>(localStorage.getItem("token"));
export const endSession = () => {
  localStorage.removeItem("token")
  $isAssessmentActive.next(false)
  $token.next(null)
}

let tokenTimeout: number | null = null
$token.subscribe(token=>{
  if (tokenTimeout) clearTimeout(tokenTimeout)
  if (!token) return
  const decoded = jwt_decode(token) as any
  tokenTimeout = setTimeout(endSession,(decoded.exp*1000-new Date().getTime()))
})

const TokenSchema = z.object({
  token: z.string(),
});
type TokenType = z.infer<typeof TokenSchema>;

const client = axios.create({ baseURL: baseUrl });

const request = async <T>(method: string, path: string, payload: T): Promise<any|undefined> => {
  try {
    const response = await client.request({
      method,
      url: path,
      data: payload,
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("token")}`,
      },
    })
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const response = (error as AxiosError).response as AxiosResponse;
    if (response.status === 401) {endSession()}
    if (response) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {
      data: null,
      status: 0,
    }
  }
};

export const googleLogin = async (code: string): Promise<string | null> => {
  try {
    const response = await client.post(`/api/login`, { code });
    const result = TokenSchema.safeParse(response.data);
    if (!result.success) return null;
    const token = result.data.token;
    $token.next(token);
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      console.log(error);
      endSession()
    }
    return null;
  }
};