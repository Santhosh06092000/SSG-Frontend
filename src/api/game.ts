import { AxiosResponse } from "axios";
import api from "../middleware/axios";

// generate game
export const generateGame = async (
  data: FormData
): Promise<AxiosResponse<Blob>> => {
  return await api.post(`/ssg/generate`, data, {
    responseType: "blob",
  });
};
