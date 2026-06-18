"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("fitness_admin_auth");

    if (!isLoggedIn) {
router.replace("/login");
    }
  }, [router]);

  const isLoggedIn =
    typeof window !== "undefined"
      ? localStorage.getItem("fitness_admin_auth")
      : null;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <div className="min-h-screen lg:ml-[280px]">
        <Topbar />
        <main className="p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}