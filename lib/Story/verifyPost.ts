import { apiRoutes } from "@/app/apis/apiRoutes";
import { axiosInstance } from "@/app/apis/axiosInstance";
import axios from "axios";

interface DataType {
  id: string;
  verified: boolean;
}

export const verifyPost = async ({ data }: { data: DataType }) => {
  try {
    const res = await axiosInstance.post(apiRoutes.VERIFY_POST, data);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
