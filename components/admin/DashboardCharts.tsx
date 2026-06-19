"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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

  const revenueData = [
    { name: "Revenue", value: revenue },
    { name: "Orders", value: orders },
    { name: "Products", value: products },
    { name: "Members", value: members },
  ];

  const memberData = [
    { name: "Active", value: activeMembers },
    { name: "Inactive", value: Math.max(members - activeMembers, 0) },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Business Overview</h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="value" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Member Status</h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memberData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
              >
                <Cell fill="#22C55E" />
                <Cell fill="#EF4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 xl:col-span-2">
        <h2 className="mb-6 text-xl font-bold text-white">Revenue Analytics</h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="value" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}