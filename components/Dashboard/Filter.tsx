import { useStatus } from "@/context/Dashboard/StatusContext";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { DatePicker } from "./DatePicker";
import { SelectComponent } from "./SelectComponent";
import { useState } from "react";
import { toast } from "sonner";

const data = ["All", "Story", "News", "Blog", "Food", "Biography"];

export const Filter = () => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setCategory,
    getData,
    setGetData,
  } = useStatus();
  const handleSubmit = () => {
    if (!startDate) {
      toast.error("Please provide a start date");
      return;
    }
    if (!endDate) {
      toast.error("Please provide a end date");
      return;
    }
    setGetData(!getData);
  };
  return (
    <div className="flex items-end gap-5 mt-5">
      <div className="space-y-2">
        <Label htmlFor="startData">Start Date</Label>
        <DatePicker date={startDate as Date} setDate={setStartDate} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <DatePicker date={endDate as Date} setDate={setEndDate} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Content Type</Label>
        <SelectComponent
          data={data}
          defaultValue="all"
          setStatus={setCategory}
        />
      </div>
      <Button
        variant={"default"}
        className="bg-blue-900 text-white"
        onClick={handleSubmit}
      >
        Get Data
      </Button>
    </div>
  );
};
