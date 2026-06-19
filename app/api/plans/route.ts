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

export async function GET() {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

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
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
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