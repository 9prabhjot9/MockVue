import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_URL_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_URL_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const jobTitle = formData.get("jobTitle") as File;
    const jobDescription = formData.get("jobDescription") as File;

    if (file) {
      console.log("file", formData);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `upload-${Date.now()}.pdf`,
        isPublished: true,
        useUniqueFileName: true,
      });

      
    }else{
      const result = await axios.post(
        "http://localhost:5678/webhook/generate-interview-question",
        {
          resumeUrl: null,
          jobTitle: jobTitle,
          jobDescription: jobDescription
        }
      );
      console.log(result.data);

      return NextResponse.json({
        questions: result.data?.content?.parts?.[0]?.text,
        resumeUrl: null
      });
    }


  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
