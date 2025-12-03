import { fetchPost } from "@/lib/Dashboard/fetchPost";
import { useQuery } from "@tanstack/react-query";

export const useFetchPost = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchPost"],
    queryFn: fetchPost,
  });
  return { data, isLoading };
};
