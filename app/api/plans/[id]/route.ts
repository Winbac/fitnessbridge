import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { verifyAdmin } from "@/lib/auth";

function unauthorized() {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

    await connectDB();

    const { id } = await params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return NextResponse.json(
        { success: false, message: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plan",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const plan = await Plan.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return NextResponse.json(
        { success: false, message: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update plan",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

    await connectDB();

    const { id } = await params;

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return NextResponse.json(
        { success: false, message: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete plan",
        error: error.message,
      },
      { status: 500 }
    );
  }
}