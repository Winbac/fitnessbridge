"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      router.push("/admin/contacts");
      router.refresh();
    } else {
      alert(data.message || "Failed to create contact");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/contacts"
          className="mb-5 inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F97316]"
        >
          <ArrowLeft size={18} />
          Back to Contacts
        </Link>

        <h1 className="text-3xl font-bold text-white">Add Contact</h1>
        <p className="mt-2 text-[#9CA3AF]">
          Create a new lead or customer record.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Customer inquiry..."
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/contacts"
            className="rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Contact"}
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
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}) {
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
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
      />
    </div>
  );
}