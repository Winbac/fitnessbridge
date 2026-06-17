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
    items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-[#1F2937] bg-[#0B0F1A] lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-[#1F2937] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316] font-bold text-white">
            FB
          </div>
          <div>
            <h2 className="font-bold text-white">Fitness Bridge</h2>
            <p className="text-sm text-[#9CA3AF]">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-7 p-5">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#9CA3AF]">
                {section.title}
              </p>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                        isActive
                          ? "bg-[#431407] text-[#F97316]"
                          : "text-[#9CA3AF] hover:bg-[#111827] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={20} />
                        {item.label}
                      </span>

                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#1F2937] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#431407] font-bold text-[#F97316]">
              AD
            </div>
            <div>
              <p className="font-bold text-white">Admin</p>
              <p className="text-sm text-[#9CA3AF]">admin@gymbridge.io</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}