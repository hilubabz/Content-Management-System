import { loginFunction } from "@/lib/Auth/loginFunction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const data = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFunction,
    onMutate: () => {
      return { toastId: toast.loading("Logging in") };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      if (data.success) {
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    },
  });
  return data;
};
