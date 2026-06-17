import Link from "next/link";

const adminCards = [
  {
    title: "Products",
    description: "Manage shop products, prices, stock and images.",
    href: "/admin/products",
  },
  {
    title: "Plans",
    description: "Manage gym membership plans and pricing.",
    href: "/admin/plans",
  },
  {
    title: "Members",
    description: "View and manage gym members.",
    href: "/admin/members",
  },
  {
    title: "Orders",
    description: "Track product orders and payment status.",
    href: "/admin/orders",
  },
  {
    title: "Contacts",
    description: "View contact enquiries from website visitors.",
    href: "/admin/contacts",
  },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#0F172A] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#F97316]">
            Fitness Bridge Admin
          </h1>
          <p className="mt-2 text-[#D1D5DB]">
            Manage products, plans, members, orders and enquiries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-[#374151] bg-[#111827] p-6 transition hover:-translate-y-1 hover:border-[#F97316]"
            >
              <h2 className="text-xl font-bold">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}