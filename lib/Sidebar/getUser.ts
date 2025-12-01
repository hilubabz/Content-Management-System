import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";
import axios from "axios";

export const getUser = async () => {
  try {
    const res = await axiosInstance.get(apiRoutes.GET_USER);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
