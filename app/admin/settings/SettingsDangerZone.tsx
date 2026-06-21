"use client";

import { Download, Trash2 } from "lucide-react";

export default function SettingsDangerZone() {
  return (
    <div className="rounded-2xl border border-red-500/40 bg-[var(--admin-card)] p-6">
      <h2 className="mb-6 text-xl font-semibold text-red-500">
        Danger Zone
      </h2>

      <div className="space-y-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/40 py-4 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white">
          <Download size={18} />
          Export All Data
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/40 py-4 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white">
          <Trash2 size={18} />
          Reset Dashboard Data
        </button>
      </div>
    </div>
  );
}