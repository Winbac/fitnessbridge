import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const member = await Member.findById(id).populate("plan");

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch member", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const member = await Member.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("plan");

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update member", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to delete member", error: error.message },
      { status: 500 }
    );
  }
}