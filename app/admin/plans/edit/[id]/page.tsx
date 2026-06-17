"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPlanPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "monthly",
    description: "",
    features: "",
    isPopular: false,
  });

  useEffect(() => {
    async function fetchPlan() {
      const res = await fetch(`/api/plans/${id}`, { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        const plan = data.data;

        setFormData({
          name: plan.name || "",
          price: String(plan.price || ""),
          duration: plan.duration || "monthly",
          description: plan.description || "",
          features: plan.features?.join(", ") || "",
          isPopular: plan.isPopular || false,
        });
      }

      setFetching(false);
    }

    if (id) fetchPlan();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, isPopular: e.target.checked }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      features: formData.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const res = await fetch(`/api/plans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin/plans");
      router.refresh();
    } else {
      alert(data.message || "Failed to update plan");
    }
  }

  if (fetching) return <p className="text-[#9CA3AF]">Loading plan...</p>;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/plans"
          className="mb-5 inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F97316]"
        >
          <ArrowLeft size={18} />
          Back to Plans
        </Link>

        <h1 className="text-3xl font-bold text-white">Edit Plan</h1>
        <p className="mt-2 text-[#9CA3AF]">
          Update membership plan details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input label="Plan Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
          <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} />

          <label className="flex items-center gap-3 pt-8 text-[#D1D5DB]">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={handleCheckbox}
              className="h-4 w-4"
            />
            Mark as popular plan
          </label>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Features
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            />
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Separate features with comma.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/plans"
            className="rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white hover:bg-[#1F2937]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C] disabled:opacity-60"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update Plan"}
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
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={name === "name" || name === "price"}
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
      />
    </div>
  );
}