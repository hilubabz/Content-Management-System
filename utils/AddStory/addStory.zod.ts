import { z } from "zod";

export const AddStorySchema = z.object({
  shortTitle: z.string().min(1, "Short title is required"),
  articleTitle: z.string().min(1, "Article title is required"),
  tags: z.array(z.string()).min(3, "Add at least 3 tags"),
  description: z.string().min(1, "Description is required"),
  metaKeywords: z.string().min(1, "Meta Keywords is required"),
  metaDescription: z.string().min(1, "Meta Description is required"),
  image: z.custom<File>(
    (file) => file instanceof File,
    "Please upload an image",
  ),
  imageCaption: z.string().min(1, "Image caption is required"),
  imageCredit: z.url().min(1, "Image credit is required"),
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "PDF must be under 5MB",
    }),
});

export type AddStorySchemaType = z.infer<typeof AddStorySchema>;
