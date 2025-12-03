import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";
import axios from "axios";

export const fetchPost = async () => {
  try {
    const res = await axiosInstance.get(apiRoutes.FETCH_POST);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
