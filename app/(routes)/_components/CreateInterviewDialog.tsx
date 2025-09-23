"use client";
import React, { useContext, useState } from "react";
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
import { Loader2Icon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/UserDetailContext";

function CreateInterviewDialog() {
  const [formData, setFormData] = useState<any>();
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  const saveInterviewQuestion = useMutation(api.Interview.SaveInterviewQuestion)

  const onHadnleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    
  };

  const onSubmit = async () => {

    setLoading(true);
    const formData_ = new FormData();
    formData_.append("file", file??'');
    formData_.append('jobTitle', formData?.jobTitle)
    formData_.append('jobDescription', formData?.jobDescription)

    try {
      const res = await axios.post(
        "api/generate-interview-questions",
        formData
      );
      console.log(res.data);
      //Save to Db
      const resp = await saveInterviewQuestion({
        questions: res.data?.questions,
        resumeUrl: res.data?.resumeUrl,
        uid: userDetail?._id
      })
      console.log(resp)

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

              <Button onClick={onSubmit} disabled={loading||!file}>     { loading && <Loader2Icon className="animate-spin"/>} Submit</Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateInterviewDialog;
