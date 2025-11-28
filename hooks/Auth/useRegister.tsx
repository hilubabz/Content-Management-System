import { registerFunction } from "@/lib/Auth/registerFunction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegister = () => {
  const data = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFunction,
    onMutate: () => {
      return { toastId: toast.loading("Registering User") };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Registration failed");
    },
  });
  return data;
};
