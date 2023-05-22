import axios, { AxiosError } from 'axios';
import { baseUrl } from './baseUrl';
import { $token } from './googleLogin';

const client = axios.create({
  baseURL: baseUrl,
});

const getStatistics = async (start: number, end: number) => {
  const token = $token.getValue()
  try {
    const response = await client.post(`/api/statistics`, { start, end }, {
      headers: { Authorization: `Bearer ${token}` },
      });
    const result = response.data;
    return result
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      localStorage.removeItem("token");
      $token.next(null)
      console.log(error);
    }
  }
};

export default getStatistics;


