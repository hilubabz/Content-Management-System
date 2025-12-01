import { getUser } from "@/lib/Sidebar/getUser";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    retry: false,
  });
  return { data, isLoading, error, isError };
};
