import { Mail, Lock } from "lucide-react";

export default function SettingsProfile() {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Profile Settings
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#431407] text-3xl font-bold text-[#F97316]">
          AD
        </div>

        <button className="rounded-xl bg-[#1F2937] px-5 py-3 text-white">
          Change Photo
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          placeholder="First Name"
          className="rounded-xl bg-[#1F2937] p-4 text-white outline-none"
        />

        <input
          placeholder="Last Name"
          className="rounded-xl bg-[#1F2937] p-4 text-white outline-none"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#1F2937] p-4">
        <Mail size={18} />
        <input
          placeholder="Email"
          className="w-full bg-transparent outline-none"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#1F2937] p-4">
        <Lock size={18} />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent outline-none"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-xl bg-[#F97316] px-6 py-3 font-semibold text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}