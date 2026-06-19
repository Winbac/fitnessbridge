import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { verifyAdmin } from "@/lib/auth";

function unauthorized() {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}

export async function GET() {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

    await connectDB();

    const members = await Member.find()
      .populate("plan")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: members,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch members",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

    await connectDB();

    const body = await request.json();

    const member = await Member.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Member created successfully",
        data: member,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create member",
        error: error.message,
      },
      { status: 500 }
    );
  }
}