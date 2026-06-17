import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Contact from "@/models/Contact";
import Plan from "@/models/Plan";

export async function GET() {
  try {
    await connectDB();

    const [
      totalMembers,
      activeMembers,
      totalProducts,
      totalOrders,
      totalContacts,
      totalPlans,
      orders,
    ] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ status: "ACTIVE" }),
      Product.countDocuments(),
      Order.countDocuments(),
      Contact.countDocuments(),
      Plan.countDocuments(),
      Order.find({ orderStatus: { $ne: "CANCELLED" } }),
    ]);

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    return NextResponse.json({
      success: true,
      data: {
        totalMembers,
        activeMembers,
        totalProducts,
        totalOrders,
        totalContacts,
        totalPlans,
        totalRevenue,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
        error: error.message,
      },
      { status: 500 }
    );
  }
}