import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
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

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
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

    const contact = await Contact.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Contact saved successfully",
        data: contact,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save contact",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}