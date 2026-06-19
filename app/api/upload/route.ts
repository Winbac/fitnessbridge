import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { verifyAdmin } from "@/lib/auth";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

export async function POST(request: Request) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "fitnessbridge/products",
            resource_type: "image",
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Cloudinary upload failed"));
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}