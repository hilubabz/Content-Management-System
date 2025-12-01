import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";
import axios from "axios";

export const registerFunction = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post(apiRoutes.REGISTER, formData);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
