import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";
import axios from "axios";

export const fetchAllUser = async () => {
  try {
    const res = await axiosInstance.get(apiRoutes.FETCH_ALL_USERS);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
