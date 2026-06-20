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
} from "lucide-react";

const sections = [
  {
    title: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "MANAGE",
    items: [
      {
        label: "Plans",
        href: "/admin/plans",
        icon: CreditCard,
      },
      {
        label: "Membership",
        href: "/admin/members",
        icon: Users,
      },
      {
        label: "Products",
        href: "/admin/products",
        icon: Box,
      },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
      },
      {
        label: "Contacts",
        href: "/admin/contacts",
        icon: Phone,
      },
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
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-[var(--admin-border)] bg-[var(--admin-card)] lg:block">
      <div className="flex h-full flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-[var(--admin-border)] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316] font-bold text-white">
            FB
          </div>

          <div>
            <h2 className="font-bold text-[var(--admin-text)]">
              Fitness Bridge
            </h2>

            <p className="text-sm text-[var(--admin-muted)]">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-[var(--admin-muted)] uppercase">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                        active
                          ? "bg-[#F97316] text-white"
                          : "text-[var(--admin-muted)] hover:bg-[var(--admin-panel)] hover:text-[var(--admin-text)]"
                      }`}
                    >
                      <Icon size={18} />

                      <span className="font-medium">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--admin-border)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316]/20 font-bold text-[#F97316]">
              AD
            </div>

            <div>
              <p className="font-semibold text-[var(--admin-text)]">
                Admin
              </p>

              <p className="text-sm text-[var(--admin-muted)]">
                admin@gymbridge.io
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}