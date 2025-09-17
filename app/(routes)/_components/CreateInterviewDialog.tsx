"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeUpload from "./ResumeUpload";
import JobDescription from "./JobDescription";
import axios from "axios";

function CreateInterviewDialog() {
  const [formData, setFormData] = useState<any>();
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const onHadnleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    
  };

  const onSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "api/generate-interview-questions",
        formData
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>+ Create</Button>
        </DialogTrigger>
        <DialogContent className="min-w-3xl">
          <DialogHeader>
            <DialogTitle>Please submit following details.</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="resume-upload" className="w-full mt-4">
                <TabsList>
                  <TabsTrigger value="resume-upload">Resume</TabsTrigger>
                  <TabsTrigger value="job-description">Job Title</TabsTrigger>
                </TabsList>
                <TabsContent value="resume-upload">
                  <ResumeUpload setFiles={(file: File) => setFile(file)} />
                </TabsContent>
                <TabsContent value="job-description">
                  <JobDescription onHandleInputChange={onHadnleInputChange} />
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"}>Cacel</Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={onSubmit} disabled={loading||!file}>Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateInterviewDialog;
