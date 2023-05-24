import { BehaviorSubject } from "rxjs";
import { googleLogin, $token, endSession } from "../api/googleLogin";
import jwt_decode from "jwt-decode";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  picture: z.string(),
  sub: z.string(),
  role: z.string(),
  school: z.string(),
  team: z.string(),
  _id: z.string().optional(),
});
export type UserType = z.infer<typeof UserSchema>;

export const decodeUser = (token: string | null): UserType | null => {
  if (!token) return null;
  const decodedToken = jwt_decode(token);
  const result = UserSchema.safeParse(decodedToken);
  if (!result.success) return null;
  return result.data;
};

export const $user = new BehaviorSubject<UserType | null>(
  decodeUser($token.getValue())
);
$token.subscribe((token) => $user.next(decodeUser(token)));

type Callback = {
  onSuccess: ()=>any
  onError: ()=>any
}

export const login = async (code: string, callback: Callback): Promise<void> => {
  const token = await googleLogin(code);
  if (!token) return;
  const user = decodeUser(token);
  if (!user) callback.onError();
  $user.next(user)  
  callback.onSuccess();
};

export const logout = () => {
  endSession();
};