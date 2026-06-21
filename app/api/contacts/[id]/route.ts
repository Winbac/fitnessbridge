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

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact",
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

    const contact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact",
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

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete contact",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}