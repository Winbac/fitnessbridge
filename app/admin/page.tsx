"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import PageHeader from "@/components/admin/PageHeader";
import DashboardCharts from "@/components/admin/DashboardCharts";
import StatCardSkeleton from "@/components/admin/StatCardSkeleton";

const cards = [
  {
    title: "Products",
    href: "/admin/products",
    desc: "Manage shop products, prices, stock and images.",
  },
  {
    title: "Plans",
    href: "/admin/plans",
    desc: "Manage gym membership plans and pricing.",
  },
  {
    title: "Members",
    href: "/admin/members",
    desc: "View and manage gym members.",
  },
  {
    title: "Orders",
    href: "/admin/orders",
    desc: "Track product orders and payment status.",
  },
  {
    title: "Contacts",
    href: "/admin/contacts",
    desc: "View contact enquiries from website visitors.",
  },
];

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    members: 0,
    activeMembers: 0,
    orders: 0,
    revenue: 0,
    contacts: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-9">
      <PageHeader
        title="Fitness Bridge Admin"
        description="Manage products, plans, members, orders and enquiries."
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Products"
            value={String(stats.products)}
            desc="Total products in shop"
          />

          <StatCard
            title="Members"
            value={String(stats.members)}
            desc="Total registered members"
          />

          <StatCard
            title="Orders"
            value={String(stats.orders)}
            desc="Total product orders"
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            desc="Total revenue generated"
          />
        </div>
      )}

      {!loading && (
        <DashboardCharts
          members={stats.members}
          activeMembers={stats.activeMembers}
          products={stats.products}
          orders={stats.orders}
          revenue={stats.revenue}
          contacts={stats.contacts}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-[#1F2937] bg-[#111827] p-8 transition hover:border-[#F97316]"
          >
            <h2 className="text-2xl font-bold text-white">{card.title}</h2>
            <p className="mt-5 text-[#9CA3AF]">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}