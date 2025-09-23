import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function JobDescription({ onHandleInputChange }: any) {
  return (
    <div className="border rounded-2xl p-10">
      <div>
        <label className="text-black font-medium text-base ">Job Title</label>
        <Input
          placeholder="Full Stack Developer"
          className="text-black"
          onChange={(e) => onHandleInputChange("jobTitle", e.target.value)}
        />
      </div>
      <div className="mt-6">
        <label className="text-black font-medium text-base">
          Job Description
        </label>
        <Textarea
          placeholder="Enter Job Description"
          className="h-[200px] text-black"
          onChange={(e) =>
            onHandleInputChange("jobDescription", e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default JobDescription;
