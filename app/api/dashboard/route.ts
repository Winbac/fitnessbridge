import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Member from "@/models/Member";
import Order from "@/models/Order";
import Contact from "@/models/Contact";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const [products, members, orders, contacts] = await Promise.all([
      Product.find(),
      Member.find(),
      Order.find(),
      Contact.find(),
    ]);

    const activeMembers = members.filter((m) => m.status === "ACTIVE").length;

    const revenue = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    return NextResponse.json({
      success: true,
      data: {
        products: products.length,
        members: members.length,
        activeMembers,
        orders: orders.length,
        revenue,
        contacts: contacts.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}