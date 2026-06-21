import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    return decoded;
  } catch {
    return null;
  }
}
export async function requireRole(allowedRoles: string[]) {
  const admin: any = await verifyAdmin();

  if (!admin) {
    return null;
  }

  if (!allowedRoles.includes(admin.role)) {
    return null;
  }

  return admin;
}