"use client";

import { SelectComponent } from "@/components/Dashboard/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddStory } from "@/hooks/Story/useAddStory";
import {
  AddStorySchema,
  AddStorySchemaType,
} from "@/utils/AddStory/addStory.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const category = ["Story", "News", "Blog", "Food", "Biography"];

export const AddStoryComponent = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddStorySchemaType>({
    resolver: zodResolver(AddStorySchema),
    mode: "onChange",
    defaultValues: {
      tags: [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const addStory = useAddStory();

  const onSubmit = (data: AddStorySchemaType) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("shortTitle", data.shortTitle);
    formData.append("articleTitle", data.articleTitle);
    formData.append("description", data.description);
    formData.append("metaKeywords", data.metaKeywords);
    formData.append("metaDescription", data.metaDescription);
    formData.append("imageCaption", data.imageCaption);
    formData.append("imageCredit", data.imageCredit);
    data.tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.pdfFile) {
      formData.append("pdfFile", data.pdfFile);
    }
    addStory.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          reset();
          setImagePreview("");
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 h-screen overflow-auto"
    >
      <div className="flex justify-between py-5 border-b">
        <div className="text-lg font-semibold text-blue-700">New Article</div>
        <div className="flex gap-5">
          <Button variant={"outline"}>Save as Draft</Button>
          <Button className="bg-blue-900 text-white" type="submit">
            Submit
          </Button>
        </div>
      </div>

      <div>
        <SelectComponent
          data={category}
          defaultValue="story"
          control={control}
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-2">
            <Label htmlFor="shortTitle">Short Title*</Label>
            <Input
              autoComplete="off"
              id="shortTitle"
              {...register("shortTitle")}
            />
            {errors.shortTitle && (
              <p className="text-red-500">{errors.shortTitle.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="articleTitle">Article Title*</Label>
            <Input
              autoComplete="off"
              id="articleTitle"
              {...register("articleTitle")}
            />
            {errors.articleTitle && (
              <p className="text-red-500">{errors.articleTitle.message}</p>
            )}
          </div>
        </div>

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="tags">Topic Tags (3-5 in English)*</Label>

              <div className="flex gap-2">
                <Input
                  autoComplete="off"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const newTag = tagInput.trim();
                      if (newTag && !field.value.includes(newTag)) {
                        field.onChange([...field.value, newTag]);
                      }
                      setTagInput("");
                    }
                  }}
                  placeholder="Enter a tag and press Enter"
                />
                <Button
                  type="button"
                  className="bg-blue-900 text-white"
                  onClick={() => {
                    const newTag = tagInput.trim();
                    if (newTag && !field.value.includes(newTag)) {
                      field.onChange([...field.value, newTag]);
                    }
                    setTagInput("");
                  }}
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className=" text-blue-900 px-2 py-1 rounded flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange(
                          //eslint-disable-next-line
                          field.value.filter(
                            (_: any, i: number) => i !== index,
                          ),
                        )
                      }
                      className="font-bold text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {errors.tags && (
                <p className="text-red-500">{errors.tags.message as string}</p>
              )}
            </div>
          )}
        />

        <div className="space-y-2">
          <Label>Description*</Label>
          <textarea
            {...register("description")}
            className="w-full border p-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-2">
            <Label htmlFor="metaKeywords">Meta Keywords*</Label>
            <Input
              autoComplete="off"
              id="metaKeywords"
              {...register("metaKeywords")}
            />
            {errors.metaKeywords && (
              <p className="text-red-500">{errors.metaKeywords.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description*</Label>
            <Input
              autoComplete="off"
              id="metaDescription"
              {...register("metaDescription")}
            />
            {errors.metaDescription && (
              <p className="text-red-500">{errors.metaDescription.message}</p>
            )}
          </div>
        </div>

        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="image">Image*</Label>

              {imagePreview && (
                <div className="w-48 h-48 border overflow-hidden rounded">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <Input
                autoComplete="off"
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />

              {errors.image && (
                <p className="text-red-500">{errors.image.message as string}</p>
              )}
            </div>
          )}
        />

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-2">
            <Label htmlFor="imageCaption">Image Caption*</Label>
            <Input
              autoComplete="off"
              id="imageCaption"
              {...register("imageCaption")}
            />
            {errors.imageCaption && (
              <p className="text-red-500">{errors.imageCaption.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageCredit">Image Credit URL*</Label>
            <Input
              autoComplete="off"
              id="imageCredit"
              {...register("imageCredit")}
            />
            {errors.imageCredit && (
              <p className="text-red-500">{errors.imageCredit.message}</p>
            )}
          </div>
        </div>

        <Controller
          control={control}
          name="pdfFile"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF File*</Label>
              <Input
                autoComplete="off"
                type="file"
                id="pdf"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
              {errors.pdfFile && (
                <p className="text-red-500">
                  {errors.pdfFile.message as string}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </form>
  );
};
