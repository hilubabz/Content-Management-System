import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";

export const logoutFunction = async () => {
  const res = await axiosInstance.post(apiRoutes.LOGOUT);
  return res.data;
};
