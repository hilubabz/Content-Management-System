import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";

interface DataType {
  username: string;
  password: string;
}

export const loginFunction = async (data: DataType) => {
  const res = await axiosInstance.post(apiRoutes.LOGIN, data);
  return res.data;
};
