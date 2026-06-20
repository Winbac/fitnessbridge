"use client";

import {
  Calendar,
  Download,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category?: string;
};

type OrderProduct = {
  productId: Product | string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  customerName: string;
  email: string;
  products: OrderProduct[];
  totalAmount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  orderStatus: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

function statusClass(status: string) {
  if (status === "DELIVERED") return "bg-emerald-500/15 text-emerald-400";
  if (status === "PROCESSING") return "bg-blue-500/15 text-blue-400";
  if (status === "SHIPPED") return "bg-orange-500/15 text-orange-400";
  if (status === "PLACED") return "bg-yellow-500/15 text-yellow-400";
  return "bg-rose-500/15 text-rose-400";
}

function getProductName(product?: Product | string) {
  if (!product) return "No Product";
  if (typeof product === "string") return product;
  return product.name;
}

function getProductCategory(product?: Product | string) {
  if (!product || typeof product === "string") return "Product";
  return product.category || "Product";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      fetchOrders();
    } else {
      alert(data.message || "Failed to delete order");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Filter orders by search and tab
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase());

      const matchesTab = activeTab === "ALL" || order.orderStatus === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [orders, search, activeTab]);

  // ✅ Reset page to 1 when search or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  // ✅ Paginate AFTER filtering
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalOrders = orders.length;
  const revenue = orders.reduce((total, order) => {
    if (order.orderStatus === "CANCELLED") return total;
    return total + order.totalAmount;
  }, 0);

  const inTransit = orders.filter(
    (order) =>
      order.orderStatus === "PROCESSING" || order.orderStatus === "SHIPPED"
  ).length;

  const cancelled = orders.filter(
    (order) => order.orderStatus === "CANCELLED"
  ).length;

  return (
    <div className="space-y-9">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <Link
            href="/admin/orders/create"
            className="flex w-fit items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]"
          >
            <Plus size={18} />
            New Order
          </Link>
          <p className="mt-2 text-[#9CA3AF]">
            Track and manage all product orders.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white hover:bg-[#1F2937]">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat title="TOTAL ORDERS" value={String(totalOrders)} desc="All time" />
        <Stat
          title="REVENUE"
          value={`₹${revenue.toLocaleString()}`}
          desc="Live from orders"
          positive
        />
        <Stat
          title="IN TRANSIT"
          value={String(inTransit)}
          desc="Processing + Shipped"
        />
        <Stat
          title="CANCELLED"
          value={String(cancelled)}
          desc="Needs review"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
        <div className="flex flex-col gap-4 border-b border-[#1F2937] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3 rounded-xl bg-[#171923] p-1">
            {["ALL", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 font-semibold ${
                    activeTab === tab
                      ? "bg-[#F97316] text-white"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
            <Search size={20} />
            <input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // ✅ Reset page when searching
              }}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="hidden grid-cols-[0.7fr_1.2fr_1.4fr_1fr_0.8fr_0.9fr_40px] border-b border-[#1F2937] px-6 py-4 text-sm tracking-[0.15em] text-[#9CA3AF] lg:grid">
          <span>ORDER</span>
          <span>CUSTOMER</span>
          <span>PRODUCT</span>
          <span>DATE</span>
          <span>AMOUNT</span>
          <span>STATUS</span>
          <span></span>
        </div>

        {loading ? (
          <p className="p-6 text-[#9CA3AF]">Loading orders...</p>
        ) : paginatedOrders.length === 0 ? (
          <p className="p-6 text-[#9CA3AF]">No orders found.</p>
        ) : (
          paginatedOrders.map((order) => {
            const firstProduct = order.products?.[0]?.productId;
            const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={order._id}
                className="grid gap-4 border-b border-[#1F2937] p-5 last:border-b-0 lg:grid-cols-[0.7fr_1.2fr_1.4fr_1fr_0.8fr_0.9fr_40px] lg:items-center lg:px-6"
              >
                <p className="text-sm text-[#9CA3AF]">
                  ORD-{order._id.slice(-4).toUpperCase()}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#431407] text-sm font-bold text-[#F97316]">
                    {initials(order.customerName)}
                  </div>
                  <h3 className="font-bold text-white">{order.customerName}</h3>
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    {getProductName(firstProduct)}
                  </h3>
                  <p className="text-sm text-[#9CA3AF]">
                    {getProductCategory(firstProduct)}
                  </p>
                </div>

                <p className="flex items-center gap-2 text-[#9CA3AF]">
                  <Calendar size={16} />
                  {date}
                </p>

                <p className="font-bold text-white">₹{order.totalAmount}</p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${statusClass(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>

                <div className="flex items-center gap-4">
                  <Link href={`/admin/orders/edit/${order._id}`}>
                    <Pencil
                      size={18}
                      className="cursor-pointer text-[#9CA3AF] hover:text-[#F97316]"
                    />
                  </Link>

                  <button onClick={() => handleDelete(order._id)}>
                    <Trash2
                      size={18}
                      className="cursor-pointer text-[#9CA3AF] hover:text-rose-400"
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* ✅ Pagination Controls */}
        <div className="flex justify-center gap-2 mt-4 p-5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#F97316] text-white"
                  : "bg-[#171923] text-[#9CA3AF] hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  desc,
  positive = false,
}: {
  title: string;
  value: string;
  desc: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <p className="tracking-[0.2em] text-[#9CA3AF]">{title}</p>
      <h2 className="mt-6 text-4xl font-bold text-white">{value}</h2>
      <p
        className={`mt-4 flex items-center gap-2 ${
          positive ? "text-emerald-400" : "text-[#9CA3AF]"
        }`}
      >
        {positive && <TrendingUp size={16} />}
        {desc}
      </p>
    </div>
  );
}