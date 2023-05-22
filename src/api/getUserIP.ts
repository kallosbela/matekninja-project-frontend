import axios from "axios";
import { z } from "zod";

const getUserIP = async (): Promise<void> => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const result = z.object({ ip: z.string() }).safeParse(response.data);
    if (!result.success) {
      console.log(result.error);
      return;
    }
    localStorage.setItem("ip", result.data.ip);
  } catch (error) {
    console.log(error);
  }
};

export default getUserIP;
