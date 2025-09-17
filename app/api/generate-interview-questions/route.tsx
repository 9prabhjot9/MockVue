import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_URL_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_URL_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file found" });
    }

    console.log("file", formData);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `upload-${Date.now()}.pdf`,
      isPublished: true,
      useUniqueFileName: true,
    });
    return NextResponse.json({ url: uploadResponse.url }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
