import { AxiosResponse } from "axios";
import api from "../middleware/axios";

interface response {
  status: boolean;
  data: Blob;
}

// generate game
export const generateGame = async (
  data: FormData
): Promise<AxiosResponse<response>> => {
  return await api.post(`/ssg/generate`, data, {
    responseType: "blob",
  });
};
