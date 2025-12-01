"use client";
import { logoutFunction } from "@/lib/Auth/logoutFunction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const data = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutFunction,
    onSuccess: () => {
      router.push("/login");
    },
  });
  return data;
};
