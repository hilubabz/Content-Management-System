import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";

export const registerFunction = async (formData: FormData) => {
  const res = await axiosInstance.post(apiRoutes.REGISTER, formData);
  return res.data;
};
