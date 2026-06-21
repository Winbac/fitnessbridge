"use client";

import { useState } from "react";

export default function SettingsNotifications() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [weekly, setWeekly] = useState(true);

  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
      <h2 className="mb-6 text-xl font-semibold text-[var(--admin-text)]">
        Notifications
      </h2>

      <NotificationItem
        label="Email Alerts"
        checked={email}
        onChange={() => setEmail(!email)}
      />

      <NotificationItem
        label="Push Notifications"
        checked={push}
        onChange={() => setPush(!push)}
      />

      <NotificationItem
        label="Weekly Reports"
        checked={weekly}
        onChange={() => setWeekly(!weekly)}
      />
    </div>
  );
}

function NotificationItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="mb-5 flex items-center justify-between last:mb-0">
      <span className="text-[var(--admin-text)]">
        {label}
      </span>

      <button
        onClick={onChange}
        className={`relative h-8 w-16 rounded-full transition ${
          checked
            ? "bg-[#F97316]"
            : "bg-[var(--admin-panel)]"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
            checked ? "left-9" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}