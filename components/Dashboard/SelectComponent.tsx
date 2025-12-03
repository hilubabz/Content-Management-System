"use client";

import { Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useStatus } from "@/context/Dashboard/StatusContext";

export const SelectComponent = ({
  data,
  defaultValue,
  control,
}: {
  data: string[];
  defaultValue: string;
  //eslint-disable-next-line
  control?: Control<any>;
}) => {
  const { setStatus } = useStatus();
  if (!control) {
    return (
      <Select
        defaultValue={defaultValue}
        onValueChange={(value) => setStatus(value.toLowerCase())}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((val, index) => (
              <SelectItem key={index} value={val.toLowerCase()}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Controller
      name="category"
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data.map((val, index) => (
                <SelectItem key={index} value={val.toLowerCase()}>
                  {val}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
