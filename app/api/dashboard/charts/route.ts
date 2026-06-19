// ✅ CORRECT - add export
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { verifyAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    await connectDB()

    return NextResponse.json({ success: true, data: [] })

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}