import { Plus, Search, MoreHorizontal, TrendingUp } from "lucide-react";

const members = [
  { name: "Alex Rivera", email: "alex.r@email.com", plan: "Pro", status: "Active", joined: "Mar 12, 2024" },
  { name: "Jordan Lee", email: "j.lee@email.com", plan: "Elite", status: "Active", joined: "Jan 5, 2024" },
  { name: "Morgan Chen", email: "m.chen@email.com", plan: "Starter", status: "Inactive", joined: "May 20, 2024" },
  { name: "Taylor Kim", email: "t.kim@email.com", plan: "Pro", status: "Active", joined: "Feb 28, 2024" },
  { name: "Casey Brooks", email: "c.brooks@email.com", plan: "Elite", status: "Active", joined: "Jun 1, 2024" },
  { name: "Quinn Adams", email: "q.adams@email.com", plan: "Starter", status: "Pending", joined: "Jul 14, 2024" },
  { name: "Drew Santos", email: "d.santos@email.com", plan: "Pro", status: "Active", joined: "Apr 9, 2024" },
];

function getStatusClass(status: string) {
  if (status === "Active") return "bg-emerald-500/15 text-emerald-400";
  if (status === "Pending") return "bg-yellow-500/15 text-yellow-400";
  return "bg-gray-500/20 text-gray-300";
}

export default function MembersPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Membership</h1>
          <p className="mt-2 text-[#9CA3AF]">
            7 total members across all plans.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">ACTIVE</p>
          <h2 className="mt-6 text-4xl font-bold text-white">245</h2>
          <p className="mt-5 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} /> 84.8% of total
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">INACTIVE</p>
          <h2 className="mt-6 text-4xl font-bold text-white">32</h2>
          <p className="mt-5 text-[#9CA3AF]">11.1% of total</p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">PENDING</p>
          <h2 className="mt-6 text-4xl font-bold text-white">12</h2>
          <p className="mt-5 text-[#9CA3AF]">4.1% of total</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
        <div className="flex gap-4 border-b border-[#1F2937] p-6">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
            <Search size={20} />
            <input
              placeholder="Search members..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button className="rounded-xl bg-[#171923] px-6 font-semibold text-white">
            All Plans
          </button>
        </div>

        <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_60px] border-b border-[#1F2937] px-6 py-4 text-sm tracking-[0.15em] text-[#9CA3AF]">
          <span>MEMBER</span>
          <span>PLAN</span>
          <span>STATUS</span>
          <span>JOINED</span>
          <span></span>
        </div>

        {members.map((member) => {
          const initials = member.name
            .split(" ")
            .map((word) => word[0])
            .join("");

          return (
            <div
              key={member.email}
              className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_60px] items-center border-b border-[#1F2937] px-6 py-5 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#431407] font-bold text-[#F97316]">
                  {initials}
                </div>

                <div>
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-[#9CA3AF]">{member.email}</p>
                </div>
              </div>

              <p className="font-semibold text-white">{member.plan}</p>

              <span
                className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${getStatusClass(
                  member.status
                )}`}
              >
                {member.status}
              </span>

              <p className="text-[#9CA3AF]">{member.joined}</p>

              <MoreHorizontal className="text-[#9CA3AF]" size={22} />
            </div>
          );
        })}
      </div>
    </div>
  );
}