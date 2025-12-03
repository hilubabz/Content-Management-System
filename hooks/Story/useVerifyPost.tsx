import { verifyPost } from "@/lib/Story/verifyPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVerifyPost = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["verifyPost"],
    mutationFn: verifyPost,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["fetchPost"] });
      } else {
        toast.error(data.message);
      }
    },
  });
  return data;
};
