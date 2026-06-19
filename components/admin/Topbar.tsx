"use client";

import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
const [profileImage, setProfileImage] = useState("");
const [uploading, setUploading] = useState(false);  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  setUploading(false);

  if (data.success) {
    setProfileImage(data.imageUrl);
  } else {
    alert(data.message || "Upload failed");
  }
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

        {/* Avatar triggers hidden input */}
      <label className="cursor-pointer">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />

  {profileImage ? (
    <img
      src={profileImage}
      alt="Admin"
      className="h-11 w-11 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316] font-bold text-white">
      AD
    </div>
  )}
</label>
        {/* Hidden file input */}
        <input
          id="imageUploadInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

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
