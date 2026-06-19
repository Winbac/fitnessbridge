"use client";

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
    { name: "Products", value: products },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ChartCard title="Business Overview">
        <BarChart data={overviewData}>
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Bar dataKey="value" fill="#F97316" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Member Status">
        <PieChart>
          <Pie
            data={memberData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
          >
            <Cell fill="#22C55E" />
            <Cell fill="#EF4444" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ChartCard>

      <div className="xl:col-span-2">
        <ChartCard title="Revenue Analytics">
          <BarChart data={revenueData}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="value" fill="#F97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-bold text-white">{title}</h2>

      <div style={{ width: "100%", height: "320px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}