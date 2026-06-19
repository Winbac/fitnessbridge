import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const adminAuth: any = await verifyAdmin();

    if (!adminAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const admin = await Admin.findById(adminAuth.id).select("-password");

    return NextResponse.json({
      success: true,
      data: admin,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const adminAuth: any = await verifyAdmin();

    if (!adminAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const admin = await Admin.findByIdAndUpdate(
      adminAuth.id,
      {
        name: body.name,
        profileImage: body.profileImage,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: admin,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
        error: error.message,
      },
      { status: 500 }
    );
  }
}