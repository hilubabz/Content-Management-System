import { addStory } from "@/lib/Story/addStory";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddStory = () => {
  const data = useMutation({
    mutationKey: ["addStory"],
    mutationFn: addStory,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });
  return data;
};
