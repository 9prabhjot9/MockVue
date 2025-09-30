import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send} from "lucide-react";
import { Input } from "@/components/ui/input";

function Interview() {
  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <div className="max-w-2xl w-full">
        <Image
          src={"/interview.jpg"}
          alt="Interview"
          width={400}
          height={200}
          className="w-full h-[400px] object-cover"
        />
        <div className=" p-2 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center">Ready to Start Interview?</h2>
          <p>The interview will last for 30mins, Are you ready to begin?</p>
          <Button className="mt-2">Start Interview <ArrowRight /> </Button>
          <hr />

          <h2 className="mt-5 text-xl font-semibold">Want to send interview link to someone</h2>
          <div className="flex gap-2 p-3">
            <Input placeholder="Enter email address " className="w-[300px]"/>
          <Button><Send /> </Button>
          </div>
            
          
        </div>
      </div>
    </div>
  );
}

export default Interview;
