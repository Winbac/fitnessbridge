"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Box,
  ShoppingBag,
  Phone,
  Settings,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "MAIN",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "MANAGE",
    items: [
      { label: "Plans", href: "/admin/plans", icon: CreditCard },
      { label: "Membership", href: "/admin/members", icon: Users },
      { label: "Products", href: "/admin/products", icon: Box },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { label: "Contacts", href: "/admin/contacts", icon: Phone },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-[#1F2937] bg-[#0B0F1A] lg:block">
      <div className="flex h-full flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#1F2937] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316] font-bold text-white">
            FB
          </div>

          <div>
            <h2 className="font-bold text-white">
              Fitness Bridge
            </h2>
            <p className="text-sm text-[#9CA3AF]">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-10">
              <p className="mb-5 text-xs font-bold tracking-[0.35em] text-[#9CA3AF]">
                {section.title}
              </p>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-2xl px-5 py-4 transition ${
                        active
                          ? "bg-[#431407] text-[#F97316]"
                          : "text-[#D1D5DB] hover:bg-[#171923]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={22} />
                        <span className="text-lg">
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight size={18} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#1F2937] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#431407] font-bold text-[#F97316]">
              AD
            </div>

            <div>
              <p className="font-bold text-white">
                Admin
              </p>
              <p className="text-sm text-[#9CA3AF]">
                admin@gymbridge.io
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}