"use client";

import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";

export default function Topbar() {

  const router = useRouter();

async function handleLogout() {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  router.push("/login");
  router.refresh();
}

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#1F2937] bg-[#0B0F1A]/90 px-5 backdrop-blur md:px-8">
      <div className="flex w-full max-w-md items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
        <Search size={20} />
        <input
          placeholder="Search anything..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      <div className="ml-4 flex items-center gap-4">
        <Bell size={20} className="text-[#9CA3AF]" />
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#431407] font-bold text-[#F97316]">
          AD
        </div>
        <button
  onClick={handleLogout}
  className="rounded-xl bg-[#171923] px-4 py-2 font-semibold text-white hover:bg-[#1F2937]"
>
  Logout
</button>
      </div>
    </header>
  );
}