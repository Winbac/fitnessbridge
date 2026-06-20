"use client";

import { Bell, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--admin-border)] bg-[var(--admin-card)]">
      <div className="flex h-20 items-center justify-between px-6">

        {/* Search */}
        <div className="flex w-[420px] items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3">
          <Search
            size={18}
            className="text-[var(--admin-muted)]"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notification */}
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-text)] hover:bg-[#F97316] hover:text-white transition">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316] font-bold text-white">
              AD
            </div>

            <div className="hidden md:block">
              <p className="font-semibold text-[var(--admin-text)]">
                Admin
              </p>

              <p className="text-sm text-[var(--admin-muted)]">
                Administrator
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}