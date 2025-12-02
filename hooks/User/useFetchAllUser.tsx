"use client";

import { fetchAllUser } from "@/lib/User/fetchAllUser";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchAllUser"],
    queryFn: fetchAllUser,
  });
  return { data, isLoading };
};
