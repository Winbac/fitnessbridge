import SettingsProfile from "./SettingsProfile";
import SettingsPlatform from "./SettingsPlatform";
import SettingsNotifications from "./SettingsNotifications";
import SettingsDangerZone from "./SettingsDangerZone";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-[#9CA3AF]">
          Manage your platform preferences and account settings.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <SettingsProfile />
          <SettingsPlatform />
        </div>

        <div className="space-y-8">
          <SettingsNotifications />
          <SettingsDangerZone />
        </div>
      </div>
    </div>
  );
}