export default function SettingsPlatform() {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Platform Settings
      </h2>

      <div className="space-y-4">
        <input
          defaultValue="The Fitness Bridge"
          className="w-full rounded-xl bg-[#1F2937] p-4 text-white outline-none"
        />

        <input
          placeholder="Contact Email"
          className="w-full rounded-xl bg-[#1F2937] p-4 text-white outline-none"
        />

        <input
          placeholder="Phone Number"
          className="w-full rounded-xl bg-[#1F2937] p-4 text-white outline-none"
        />

        <textarea
          rows={3}
          placeholder="Gym Address"
          className="w-full rounded-xl bg-[#1F2937] p-4 text-white outline-none"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select className="rounded-xl bg-[#1F2937] p-4 text-white">
            <option>INR (₹)</option>
            <option>USD ($)</option>
          </select>

          <select className="rounded-xl bg-[#1F2937] p-4 text-white">
            <option>Asia/Kolkata (IST)</option>
            <option>UTC</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button className="rounded-xl bg-[#F97316] px-6 py-3 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}