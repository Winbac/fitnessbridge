import { Mail, Lock } from "lucide-react";

export default function SettingsProfile() {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
      <h2 className="mb-6 text-xl font-semibold text-[var(--admin-text)]">
        Profile Settings
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F97316]/20 text-3xl font-bold text-[#F97316]">
          AD
        </div>

        <button className="rounded-xl bg-[var(--admin-panel)] px-5 py-3 text-[var(--admin-text)]">
          Change Photo
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          placeholder="First Name"
          className="rounded-xl bg-[var(--admin-panel)] p-4 text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
        />

        <input
          placeholder="Last Name"
          className="rounded-xl bg-[var(--admin-panel)] p-4 text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[var(--admin-panel)] p-4 text-[var(--admin-muted)]">
        <Mail size={18} />
        <input
          placeholder="Email"
          className="w-full bg-transparent text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[var(--admin-panel)] p-4 text-[var(--admin-muted)]">
        <Lock size={18} />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-xl bg-[#F97316] px-6 py-3 font-semibold text-white hover:bg-[#EA580C]">
          Save Changes
        </button>
      </div>
    </div>
  );
}