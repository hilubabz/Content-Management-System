import { registerFunction } from "@/lib/Auth/registerFunction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegisterAdmin = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFunction,
    onMutate: () => {
      return { toastId: toast.loading("Registering Admin") };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      if (data.success) {
        toast.success("Admin added");
        queryClient.invalidateQueries({ queryKey: ["fetchAllUser"] });
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
