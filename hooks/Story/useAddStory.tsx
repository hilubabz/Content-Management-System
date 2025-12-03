import { addStory } from "@/lib/Story/addStory";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddStory = () => {
  const data = useMutation({
    mutationKey: ["addStory"],
    mutationFn: addStory,
    onMutate: () => {
      return { toastId: toast.loading("Uploading Post") };
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
  });
  return data;
};
