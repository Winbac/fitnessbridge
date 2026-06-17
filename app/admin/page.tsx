import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import PageHeader from "@/components/admin/PageHeader";

const cards = [
  { title: "Products", href: "/admin/products", desc: "Manage shop products, prices, stock and images." },
  { title: "Plans", href: "/admin/plans", desc: "Manage gym membership plans and pricing." },
  { title: "Members", href: "/admin/members", desc: "View and manage gym members." },
  { title: "Orders", href: "/admin/orders", desc: "Track product orders and payment status." },
  { title: "Contacts", href: "/admin/contacts", desc: "View contact enquiries from website visitors." },
];

export default function AdminPage() {
  return (
    <div className="space-y-9">
      <PageHeader
        title="Fitness Bridge Admin"
        description="Manage products, plans, members, orders and enquiries."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="TOTAL MEMBERS" value="289" desc="+24 this month" />
        <StatCard title="TOTAL PRODUCTS" value="24" desc="6 categories" />
        <StatCard title="TOTAL ORDERS" value="8" desc="All time" />
        <StatCard title="MONTHLY SALES" value="₹8,412" desc="+22% vs last month" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-[#1F2937] bg-[#111827] p-7 transition hover:border-[#F97316]"
          >
            <h2 className="text-2xl font-bold text-white">{card.title}</h2>
            <p className="mt-4 text-[#9CA3AF]">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}