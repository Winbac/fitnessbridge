"use client";

import { Plus, Search, MoreHorizontal, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Plan = {
  _id: string;
  name: string;
};

type Member = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  plan?: Plan | string;
  status: "ACTIVE" | "INACTIVE";
  paymentStatus: "PAID" | "PENDING";
  joinDate: string;
};

function getStatusClass(status: string) {
  if (status === "ACTIVE") return "bg-emerald-500/15 text-emerald-400";
  if (status === "PENDING") return "bg-yellow-500/15 text-yellow-400";
  return "bg-gray-500/20 text-gray-300";
}

function getPlanName(plan?: Plan | string) {
  if (!plan) return "No Plan";
  if (typeof plan === "string") return plan;
  return plan.name;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/members", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch members", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

  const activeMembers = members.filter((m) => m.status === "ACTIVE").length;
  const inactiveMembers = members.filter((m) => m.status === "INACTIVE").length;
  const pendingMembers = members.filter((m) => m.paymentStatus === "PENDING").length;

  const activePercent =
    members.length > 0 ? Math.round((activeMembers / members.length) * 100) : 0;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Membership</h1>
          <p className="mt-2 text-[#9CA3AF]">
            {members.length} total members across all plans.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">ACTIVE</p>
          <h2 className="mt-6 text-4xl font-bold text-white">{activeMembers}</h2>
          <p className="mt-5 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} /> {activePercent}% of total
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">INACTIVE</p>
          <h2 className="mt-6 text-4xl font-bold text-white">
            {inactiveMembers}
          </h2>
          <p className="mt-5 text-[#9CA3AF]">Inactive memberships</p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">PENDING</p>
          <h2 className="mt-6 text-4xl font-bold text-white">
            {pendingMembers}
          </h2>
          <p className="mt-5 text-[#9CA3AF]">Pending payments</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
        <div className="flex gap-4 border-b border-[#1F2937] p-6">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
            <Search size={20} />
            <input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button className="rounded-xl bg-[#171923] px-6 font-semibold text-white">
            All Plans
          </button>
        </div>

        <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_60px] border-b border-[#1F2937] px-6 py-4 text-sm tracking-[0.15em] text-[#9CA3AF] lg:grid">
          <span>MEMBER</span>
          <span>PLAN</span>
          <span>STATUS</span>
          <span>JOINED</span>
          <span></span>
        </div>

        {loading ? (
          <p className="p-6 text-[#9CA3AF]">Loading members...</p>
        ) : filteredMembers.length === 0 ? (
          <p className="p-6 text-[#9CA3AF]">No members found.</p>
        ) : (
          filteredMembers.map((member) => {
            const joinedDate = new Date(member.joinDate).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <div
                key={member._id}
                className="grid gap-4 border-b border-[#1F2937] p-5 last:border-b-0 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_60px] lg:items-center lg:px-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#431407] font-bold text-[#F97316]">
                    {getInitials(member.fullName)}
                  </div>

                  <div>
                    <h3 className="font-bold text-white">{member.fullName}</h3>
                    <p className="text-sm text-[#9CA3AF]">{member.email}</p>
                  </div>
                </div>

                <p className="font-semibold text-white">
                  {getPlanName(member.plan)}
                </p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${getStatusClass(
                    member.paymentStatus === "PENDING"
                      ? "PENDING"
                      : member.status
                  )}`}
                >
                  {member.paymentStatus === "PENDING"
                    ? "PENDING"
                    : member.status}
                </span>

                <p className="text-[#9CA3AF]">{joinedDate}</p>

                <MoreHorizontal className="text-[#9CA3AF]" size={22} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}