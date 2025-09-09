import React from "react";
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

function CreateInterviewDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
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
                  <ResumeUpload />
                </TabsContent>
                <TabsContent value="job-description">
                    <JobDescription />
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={'ghost'} >Cacel</Button>
            </DialogClose>
            <DialogClose>
                <Button>Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateInterviewDialog;
