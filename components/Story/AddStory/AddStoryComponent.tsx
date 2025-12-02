"use client";

import { SelectComponent } from "@/components/Dashboard/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AddStorySchema,
  AddStorySchemaType,
} from "@/utils/AddStory/addStory.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const category = ["Story", "News", "Blog", "Food", "Biography"];

export const AddStoryComponent = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<AddStorySchemaType>({
    resolver: zodResolver(AddStorySchema),
    mode: "onChange",
  });

  const desc = watch("description");
  useEffect(() => {
    console.log(desc);
  }, [desc]);
  return (
    <div className="space-y-5">
      <div className="flex justify-between py-5 border-b">
        <div className="text-lg font-semibold text-blue-700">New Article</div>
        <div className="flex gap-5">
          <Button variant={"outline"}>Save as Draft</Button>
          <Button className="bg-blue-900 text-white">Submit</Button>
        </div>
      </div>

      <div>
        <SelectComponent data={category} defaultValue="story" />
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-2">
            <Label htmlFor="shortTitle">Short Title*</Label>
            <Input id="shortTitle" {...register("shortTitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="articleTitle">Article Title*</Label>
            <Input id="articleTitle" {...register("articleTitle")} />
          </div>
        </div>

        <div className="flex items-end gap-2">
          <div className="space-y-2 w-[250px]">
            <Label htmlFor="tags">Topic Tags (3-5 in english)*</Label>
            <Input id="tags" {...register("tags")} />
          </div>
          <Button className="bg-blue-900 text-white">Add</Button>
        </div>

        <div className="space-y-2">
          <Label>Description*</Label>
          <div>
            <textarea {...register("description")} className="w-full border" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-2">
            <Label htmlFor="metaKeyword">Meta Keywords*</Label>
            <Input id="metaKeyword" {...register("metaKeywords")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description*</Label>
            <Input id="metaDescription" {...register("metaDescription")} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" accept="/image" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageCaption">Image Caption</Label>
            <Input id="imageCaption" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageCredit">Image Credit</Label>
            <Input id="imageCredit" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pdf">PDF File</Label>
          <Input type="file" id="pdf" />
        </div>
      </div>
    </div>
  );
};
