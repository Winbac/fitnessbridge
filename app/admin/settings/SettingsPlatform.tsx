"use client";

import { Globe, Shield, Database } from "lucide-react";

export default function SettingsPlatform() {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
      <h2 className="mb-6 text-xl font-semibold text-[var(--admin-text)]">
        Platform Settings
      </h2>

      <div className="space-y-5">
        <SettingRow
          icon={<Globe size={20} />}
          title="Website Status"
          value="Online"
          color="text-emerald-400"
        />

        <SettingRow
          icon={<Shield size={20} />}
          title="Security"
          value="Protected"
          color="text-blue-400"
        />

        <SettingRow
          icon={<Database size={20} />}
          title="Database"
          value="Connected"
          color="text-[#F97316]"
        />
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[var(--admin-panel)] p-4">
      <div className="flex items-center gap-3">
        <div className="text-[var(--admin-muted)]">{icon}</div>

        <div>
          <h3 className="font-semibold text-[var(--admin-text)]">
            {title}
          </h3>

          <p className="text-sm text-[var(--admin-muted)]">
            System Configuration
          </p>
        </div>
      </div>

      <span className={`font-semibold ${color}`}>
        {value}
      </span>
    </div>
  );
}