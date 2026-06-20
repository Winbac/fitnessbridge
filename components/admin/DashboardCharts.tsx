"use client";
import {

  Legend,
} from "recharts";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  members: number;
  activeMembers: number;
  products: number;
  orders: number;
  revenue: number;
  contacts: number;
};

export default function DashboardCharts({
  members,
  activeMembers,
  products,
  orders,
  revenue,
  contacts,
}: Props) {
  const overviewData = [
    { name: "Members", value: members },
    { name: "Products", value: products },
    { name: "Orders", value: orders },
    { name: "Contacts", value: contacts },
  ];

  const memberData = [
    { name: "Active", value: activeMembers },
    { name: "Inactive", value: Math.max(members - activeMembers, 0) },
  ];

  const revenueData = [
    { name: "Revenue", value: revenue },
    { name: "Orders", value: orders },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Business Overview */}
      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
        <h2 className="mb-6 text-xl font-bold text-[var(--admin-text)]">
          Business Overview
        </h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData}>
              <XAxis
                dataKey="name"
                stroke="var(--admin-muted)"
              />

              <YAxis
                stroke="var(--admin-muted)"
              />
<Tooltip
  cursor={{ fill: "rgba(249,115,22,0.08)" }}
  contentStyle={{
    background: "var(--admin-card)",
    border: "1px solid var(--admin-border)",
    borderRadius: "12px",
    color: "var(--admin-text)",
    boxShadow: "0 10px 25px rgba(0,0,0,.15)",
  }}
/>
<Legend />
              <Bar
                dataKey="value"
radius={[10,10,0,0]}
                fill="#F97316"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Member Status */}
      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
        <h2 className="mb-6 text-xl font-bold text-[var(--admin-text)]">
          Member Status
        </h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
           <Pie
  data={memberData}
  dataKey="value"
  nameKey="name"
  innerRadius={75}
  outerRadius={105}
  paddingAngle={5}
>
                <Cell fill="#22C55E" />
                <Cell fill="#EF4444" />
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "var(--admin-card)",
                  border: "1px solid var(--admin-border)",
                  borderRadius: "12px",
                  color: "var(--admin-text)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue */}
      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 xl:col-span-2">
        <h2 className="mb-6 text-xl font-bold text-[var(--admin-text)]">
          Revenue Analytics
        </h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis
                dataKey="name"
                stroke="var(--admin-muted)"
              />

              <YAxis
                stroke="var(--admin-muted)"
              />

              <Tooltip
                contentStyle={{
                  background: "var(--admin-card)",
                  border: "1px solid var(--admin-border)",
                  borderRadius: "12px",
                  color: "var(--admin-text)",
                }}
              />
<Legend />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                fill="#F97316"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}