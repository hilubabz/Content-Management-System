import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get(apiRoutes.GET_USER);
  return res.data;
};
