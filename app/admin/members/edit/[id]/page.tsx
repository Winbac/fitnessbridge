"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; 

type Plan = {
  _id: string;
  name: string;
};

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    age: "",
    address: "",
    plan: "",
    membershipEndDate: "",
    paymentStatus: "PENDING",
    status: "ACTIVE",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [plansRes, memberRes] = await Promise.all([
          fetch("/api/plans", { cache: "no-store" }),
          fetch(`/api/members/${id}`, { cache: "no-store" }),
        ]);

        const plansData = await plansRes.json();
        const memberData = await memberRes.json();

        if (plansData.success) {
          setPlans(plansData.data);
        }

        if (memberData.success) {
          const member = memberData.data;

          setFormData({
            fullName: member.fullName || "",
            email: member.email || "",
            phone: member.phone || "",
            gender: member.gender || "Male",
            age: String(member.age || ""),
            address: member.address || "",
            plan:
              typeof member.plan === "string"
                ? member.plan
                : member.plan?._id || "",
            membershipEndDate: member.membershipEndDate
              ? member.membershipEndDate.slice(0, 10)
              : "",
            paymentStatus: member.paymentStatus || "PENDING",
            status: member.status || "ACTIVE",
          });
        }
      } catch (error) {
  console.error(error);
  toast.error("Failed to load member");
}
 finally {
        setFetching(false);
      }
    }

    if (id) loadData();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      ...formData,
      age: Number(formData.age),
    };

    const res = await fetch(`/api/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Member updated successfully!");

      setTimeout(() => {
        router.push("/admin/members");
        router.refresh();
      }, 1000);
    } else {
      toast.error(data.message || "Failed to update member");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
}
  if (fetching) {
    return <p className="text-[#9CA3AF]">Loading member...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/members"
          className="mb-5 inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F97316]"
        >
          <ArrowLeft size={18} />
          Back to Members
        </Link>

        <h1 className="text-3xl font-bold text-white">Edit Member</h1>
        <p className="mt-2 text-[#9CA3AF]">
          Update member profile and membership status.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <Input label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />

          <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>

          <Select label="Plan" name="plan" value={formData.plan} onChange={handleChange}>
            <option value="">Select Plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name}
              </option>
            ))}
          </Select>

          <Input
            label="Membership End Date"
            name="membershipEndDate"
            type="date"
            value={formData.membershipEndDate}
            onChange={handleChange}
          />

          <Select label="Payment Status" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
          </Select>

          <Select label="Member Status" name="status" value={formData.status} onChange={handleChange}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </Select>

          <div className="md:col-span-2">
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/members"
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
            {loading ? "Updating..." : "Update Member"}
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
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
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
        required={["fullName", "email", "phone", "age"].includes(name)}
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={name === "plan"}
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
      >
        {children}
      </select>
    </div>
  );
}