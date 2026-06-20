"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-[280px]">
        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] bg-[var(--admin-bg)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}