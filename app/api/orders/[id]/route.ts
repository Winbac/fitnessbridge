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

    const order = await Order.findById(id).populate("products.productId");

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    const order = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("products.productId");

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
   const admin = await requireRole(["ADMIN"]);

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

    const { id } = await params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete order",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}