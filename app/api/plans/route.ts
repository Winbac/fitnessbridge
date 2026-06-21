import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { requireRole } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const plans = await Plan.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: plans,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plans",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireRole(["ADMIN", "MANAGER"]);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();
    const plan = await Plan.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Plan created successfully",
        data: plan,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create plan",
        error: error.message,
      },
      { status: 500 }
    );
  }
}