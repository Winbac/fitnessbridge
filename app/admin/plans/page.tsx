"use client";
import Link from "next/link";
import { Plus, Pencil, Trash2, Check, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Plan = {
  _id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
  features: string[];
  isPopular: boolean;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPlans() {
    try {
      const res = await fetch("/api/plans", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setPlans(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch plans", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this plan?"
  );

  if (!confirmDelete) return;

  const res = await fetch(`/api/plans/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.success) {
    toast.success("Plan deleted successfully!");
    fetchPlans();
  } else {
    toast.error(data.message || "Failed to delete plan");
  }
}


  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--admin-text)]">Membership Plans</h1>
          <p className="mt-2 text-[var(--admin-muted)]">
            Manage your subscription tiers and pricing.
          </p>
        </div>

        <Link
  href="/admin/plans/create"
  className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-[var(--admin-text)] hover:bg-[#EA580C]"
>
  <Plus size={18} />
  New Plan
</Link>

      </div>

      {loading ? (
        <p className="text-[var(--admin-muted)]">Loading plans...</p>
      ) : plans.length === 0 ? (
        <p className="text-[var(--admin-muted)]">No plans found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`rounded-2xl border bg-[var(--admin-card)] p-6 ${
                plan.isPopular
                  ? "border-[#F97316] shadow-[0_0_40px_rgba(249,115,22,0.18)]"
                  : "border-[var(--admin-border)]"
              }`}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-[var(--admin-text)]">{plan.name}</h2>

                  {plan.isPopular && (
                    <span className="rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold text-[var(--admin-text)]">
                      POPULAR
                    </span>
                  )}
                </div>

            <div className="flex gap-4">
  <Link href={`/admin/plans/edit/${plan._id}`}>
    <Pencil
      size={18}
      className="cursor-pointer text-[var(--admin-muted)] hover:text-[#F97316]"
    />
  </Link>

  <button onClick={() => handleDelete(plan._id)}>
    <Trash2
      size={18}
      className="cursor-pointer text-[var(--admin-muted)] hover:text-rose-400"
    />
  </button>
</div>
              </div>

              <div className="mb-7">
                <span className="text-4xl font-extrabold text-[var(--admin-text)]">
                  ₹{plan.price}
                </span>
                <span className="text-[var(--admin-muted)]"> /{plan.duration}</span>
              </div>

              <p className="mb-5 text-[var(--admin-muted)]">{plan.description}</p>

              <div className="space-y-4">
                {plan.features?.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check size={16} className="text-[#F97316]" />
                    <span className="text-[var(--admin-muted)]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="my-7 h-px bg-[#1F2937]" />

              <p className="text-sm text-[var(--admin-muted)]">Plan ID</p>

              <div className="mt-2 flex items-center justify-between">
                <h3 className="max-w-[180px] truncate text-sm text-[var(--admin-text)]">
                  {plan._id}
                </h3>

                <div className="flex items-center gap-1 text-[#00E396]">
                  <TrendingUp size={16} />
                  <span className="font-semibold">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)]">
        <div className="border-b border-[#1d2632] p-6">
          <h2 className="text-xl font-bold text-[var(--admin-text)]">Plan Performance</h2>
        </div>

        <div>
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="grid grid-cols-1 gap-4 border-b border-[var(--admin-border)] p-6 last:border-b-0 md:grid-cols-[160px_1fr_120px]"
            >
              <div className="flex items-center gap-4">
                <span className="h-3 w-3 rounded-full bg-[#F97316]" />
                <span className="font-bold text-[var(--admin-text)]">{plan.name}</span>
              </div>

              <div className="h-2 rounded-full bg-[#1F2937]">
                <div className="h-2 w-1/2 rounded-full bg-[#F97316]" />
              </div>

              <p className="text-[var(--admin-muted)]">₹{plan.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}