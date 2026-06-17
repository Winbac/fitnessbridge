export default function SettingsDangerZone() {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-red-400">
        Danger Zone
      </h2>

      <div className="space-y-4">
        <button className="w-full rounded-xl border border-red-500/40 py-3 text-red-400">
          Export All Data
        </button>

        <button className="w-full rounded-xl border border-red-500/40 py-3 text-red-400">
          Reset Dashboard Data
        </button>
      </div>
    </div>
  );
}