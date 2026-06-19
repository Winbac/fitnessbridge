"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import PageHeader from "@/components/admin/PageHeader";
import DashboardCharts from "@/components/admin/DashboardCharts";

const cards = [
  { title: "Products", href: "/admin/products", desc: "Manage shop products, prices, stock and images." },
  { title: "Plans", href: "/admin/plans", desc: "Manage gym membership plans and pricing." },
  { title: "Members", href: "/admin/members", desc: "View and manage gym members." },
  { title: "Orders", href: "/admin/orders", desc: "Track product orders and payment status." },
  { title: "Contacts", href: "/admin/contacts", desc: "View contact enquiries from website visitors." },
];

export default function AdminPage() {
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
        const [productsRes, membersRes, ordersRes, contactsRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/members"),
            fetch("/api/orders"),
            fetch("/api/contacts"),
          ]);

        const productsData = await productsRes.json();
        const membersData = await membersRes.json();
        const ordersData = await ordersRes.json();
        const contactsData = await contactsRes.json();

        const products = productsData.data || [];
        const members = membersData.data || [];
        const orders = ordersData.data || [];
        const contacts = contactsData.data || [];

        const activeMembers = members.filter(
          (m: any) => m.status === "ACTIVE"
        ).length;

        const revenue = orders.reduce(
          (sum: number, order: any) => sum + (order.totalAmount || 0),
          0
        );

        setStats({
          products: products.length,
          members: members.length,
          activeMembers,
          orders: orders.length,
          revenue,
          contacts: contacts.length,
        });
      } catch (error) {
        console.log("Dashboard Error:", error);
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="TOTAL MEMBERS"
          value={String(stats.members)}
          desc={`${stats.activeMembers} Active Members`}
        />
        <StatCard
          title="TOTAL PRODUCTS"
          value={String(stats.products)}
          desc="Products in database"
        />
        <StatCard
          title="TOTAL ORDERS"
          value={String(stats.orders)}
          desc="Orders received"
        />
        <StatCard
          title="TOTAL REVENUE"
          value={`₹${stats.revenue.toLocaleString()}`}
          desc="Revenue from orders"
        />
      </div>

      <DashboardCharts
        members={stats.members}
        activeMembers={stats.activeMembers}
        products={stats.products}
        orders={stats.orders}
        revenue={stats.revenue}
        contacts={stats.contacts}
      />

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