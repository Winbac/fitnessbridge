"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, TrendingUp, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

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
  return "bg-gray-500/20 text-gray-400";
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
    .join("")
    .slice(0, 2)
    .toUpperCase();
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
      } else {
        toast.error(data.message || "Failed to fetch members");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Member deleted successfully");
        fetchMembers();
      } else {
        toast.error(data.message || "Failed to delete member");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
  const pendingMembers = members.filter(
    (m) => m.paymentStatus === "PENDING"
  ).length;

  const activePercent =
    members.length > 0 ? Math.round((activeMembers / members.length) * 100) : 0;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--admin-text)]">
            Membership
          </h1>
          <p className="mt-2 text-[var(--admin-muted)]">
            {members.length} total members across all plans.
          </p>
        </div>

        <Link
          href="/admin/members/create"
          className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]"
        >
          <Plus size={18} />
          Add Member
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MemberStat
          title="ACTIVE"
          value={activeMembers}
          desc={`${activePercent}% of total`}
          positive
        />

        <MemberStat
          title="INACTIVE"
          value={inactiveMembers}
          desc="Inactive memberships"
        />

        <MemberStat
          title="PENDING"
          value={pendingMembers}
          desc="Pending payments"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)]">
        <div className="flex gap-4 border-b border-[var(--admin-border)] p-6">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-[var(--admin-panel)] px-4 py-3 text-[var(--admin-muted)]">
            <Search size={20} />
            <input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
            />
          </div>

          <button className="rounded-xl bg-[var(--admin-panel)] px-6 font-semibold text-[var(--admin-text)]">
            All Plans
          </button>
        </div>

        <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_60px] border-b border-[var(--admin-border)] bg-[var(--admin-panel)] px-6 py-4 text-sm tracking-[0.15em] text-[var(--admin-muted)] lg:grid">
          <span>MEMBER</span>
          <span>PLAN</span>
          <span>STATUS</span>
          <span>JOINED</span>
          <span></span>
        </div>

        {loading ? (
          <p className="p-6 text-[var(--admin-muted)]">Loading members...</p>
        ) : filteredMembers.length === 0 ? (
          <p className="p-6 text-[var(--admin-muted)]">No members found.</p>
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

            const displayStatus =
              member.paymentStatus === "PENDING" ? "PENDING" : member.status;

            return (
              <div
                key={member._id}
                className="grid gap-4 border-b border-[var(--admin-border)] p-5 last:border-b-0 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_60px] lg:items-center lg:px-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316]/20 font-bold text-[#F97316]">
                    {getInitials(member.fullName)}
                  </div>

                  <div>
                    <h3 className="font-bold text-[var(--admin-text)]">
                      {member.fullName}
                    </h3>
                    <p className="text-sm text-[var(--admin-muted)]">
                      {member.email}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-[var(--admin-text)]">
                  {getPlanName(member.plan)}
                </p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${getStatusClass(
                    displayStatus
                  )}`}
                >
                  {displayStatus}
                </span>

                <p className="text-[var(--admin-muted)]">{joinedDate}</p>

                <div className="flex items-center gap-4">
                  <Link href={`/admin/members/edit/${member._id}`}>
                    <Pencil
                      size={18}
                      className="cursor-pointer text-[#F97316]"
                    />
                  </Link>

                  <button onClick={() => handleDelete(member._id)}>
                    <Trash2
                      size={18}
                      className="cursor-pointer text-red-500"
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function MemberStat({
  title,
  value,
  desc,
  positive = false,
}: {
  title: string;
  value: number;
  desc: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
      <p className="tracking-[0.2em] text-[var(--admin-muted)]">{title}</p>

      <h2 className="mt-6 text-4xl font-bold text-[var(--admin-text)]">
        {value}
      </h2>

      <p
        className={`mt-5 flex items-center gap-2 ${
          positive ? "text-emerald-400" : "text-[var(--admin-muted)]"
        }`}
      >
        {positive && <TrendingUp size={16} />}
        {desc}
      </p>
    </div>
  );
}