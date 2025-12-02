import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";
import axios from "axios";

export const addStory = async (data: FormData) => {
  try {
    const res = await axiosInstance.post(apiRoutes.ADD_POST, data);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
