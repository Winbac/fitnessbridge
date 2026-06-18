"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    totalAmount: "",
    paymentStatus: "PENDING",
    orderStatus: "PLACED",
  });

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          const order = data.data;

          setFormData({
            customerName: order.customerName || "",
            email: order.email || "",
            phone: order.phone || "",
            address: order.address || "",
            totalAmount: String(order.totalAmount || ""),
            paymentStatus: order.paymentStatus || "PENDING",
            orderStatus: order.orderStatus || "PLACED",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    }

    if (id) fetchOrder();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...formData,
      totalAmount: Number(formData.totalAmount),
    };

    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      router.push("/admin/orders");
      router.refresh();
    } else {
      alert(data.message || "Failed to update order");
    }
  }

  if (fetching) {
    return <p className="text-[#9CA3AF]">Loading order...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/orders"
          className="mb-5 inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F97316]"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <h1 className="text-3xl font-bold text-white">Edit Order</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Total Amount"
            name="totalAmount"
            type="number"
            value={formData.totalAmount}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Payment Status
            </label>

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white"
            >
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Order Status
            </label>

            <select
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white"
            >
              <option value="PLACED">PLACED</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Address
            </label>

            <textarea
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/orders"
            className="rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white"
      />
    </div>
  );
}