import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyAdmin, requireRole } from "@/lib/auth";

function unauthorized() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}

export async function GET() {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return unauthorized();
    }

    await connectDB();

    const orders = await Order.find()
      .populate("products.productId")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
   const admin = await requireRole(["ADMIN", "MANAGER"]);

if (!admin) {
  return NextResponse.json(
    {
      success: false,
      message: "Forbidden",
    },
    {
      status: 403,
    }
  );
}

    await connectDB();

    const body = await request.json();

    const order = await Order.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: order,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}