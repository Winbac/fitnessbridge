export default function SettingsNotifications() {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Notifications
      </h2>

      <div className="space-y-6">
        <NotificationRow title="Email Alerts" />
        <NotificationRow title="Push Notifications" />
        <NotificationRow title="Weekly Reports" />
      </div>
    </div>
  );
}

function NotificationRow({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-white">{title}</p>

      <div className="h-7 w-14 rounded-full bg-[#F97316]" />
    </div>
  );
}