import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Plus,
  Search,
  Pencil,
  Trash2,
  Tag,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";

const contacts = [
  {
    name: "Alex Rivera",
    email: "alex.r@email.com",
    phone: "+1 (555) 201-4823",
    location: "New York, USA",
    type: "Member",
    plan: "Pro plan",
    note: "Interested in upgrading to Elite plan.",
    time: "2 days ago",
  },
  {
    name: "Jordan Lee",
    email: "j.lee@email.com",
    phone: "+1 (555) 884-1932",
    location: "Los Angeles, USA",
    type: "Member",
    plan: "Elite",
    note: "Asked about renewal discount.",
    time: "1 day ago",
  },
  {
    name: "Sara Nguyen",
    email: "s.nguyen@email.com",
    phone: "+1 (555) 232-8844",
    location: "Chicago, USA",
    type: "Inquiry",
    plan: "Lead",
    note: "Interested in joining next week.",
    time: "5 hours ago",
  },
  {
    name: "Morgan Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 903-1102",
    location: "Boston, USA",
    type: "Member",
    plan: "Starter",
    note: "Needs help with plan change.",
    time: "4 days ago",
  },
  {
    name: "Taylor Kim",
    email: "t.kim@email.com",
    phone: "+1 (555) 443-2210",
    location: "Seattle, USA",
    type: "Member",
    plan: "Pro",
    note: "Requested diet plan details.",
    time: "3 days ago",
  },
  {
    name: "Lena Park",
    email: "l.park@email.com",
    phone: "+1 (555) 765-0921",
    location: "Dallas, USA",
    type: "Inquiry",
    plan: "Lead",
    note: "Asked about gym membership fees.",
    time: "1 day ago",
  },
  {
    name: "Casey Brooks",
    email: "c.brooks@email.com",
    phone: "+1 (555) 390-7712",
    location: "Miami, USA",
    type: "Member",
    plan: "Elite",
    note: "Wants trainer consultation.",
    time: "Today",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

function badgeClass(type: string) {
  if (type === "Inquiry") return "bg-yellow-500/15 text-yellow-400";
  return "bg-[#431407] text-[#F97316]";
}

export default function ContactsPage() {
  const selected = contacts[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contacts</h1>
          <p className="mt-2 text-[#9CA3AF]">Members and leads in your CRM.</p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]">
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">TOTAL CONTACTS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">7</h2>
          <p className="mt-4 text-[#9CA3AF]">Members + leads</p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">MEMBERS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">5</h2>
          <p className="mt-4 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} />
            Active relationships
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">LEADS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">2</h2>
          <p className="mt-4 text-[#9CA3AF]">Awaiting conversion</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        {/* Contact List */}
        <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
          <div className="border-b border-[#1F2937] p-5">
            <div className="flex items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
              <Search size={20} />
              <input
                placeholder="Search contacts..."
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            {contacts.map((contact, index) => (
              <div
                key={contact.email}
                className={`flex items-center justify-between border-b border-[#1F2937] p-5 last:border-b-0 ${
                  index === 0
                    ? "border-l-2 border-l-[#F97316] bg-[#431407]/50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#431407] font-bold text-[#F97316]">
                    {initials(contact.name)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white">{contact.name}</h3>
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-bold ${badgeClass(
                          contact.type
                        )}`}
                      >
                        {contact.type === "Member" ? contact.plan.split(" ")[0] : "Inquiry"}
                      </span>
                    </div>
                    <p className="text-sm text-[#9CA3AF]">{contact.email}</p>
                  </div>
                </div>

                <p className="hidden text-sm text-[#9CA3AF] sm:block">
                  {contact.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827]">
          <div className="flex flex-col gap-4 border-b border-[#1F2937] p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#431407] text-xl font-bold text-[#F97316]">
                {initials(selected.name)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                  <span className="rounded-md bg-[#431407] px-2 py-1 text-xs font-bold text-[#F97316]">
                    Member
                  </span>
                  <span className="text-[#9CA3AF]">{selected.plan}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-[#9CA3AF]">
              <Pencil size={20} />
              <Trash2 size={20} />
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoCard icon={<Mail size={18} />} label="EMAIL" value={selected.email} />
              <InfoCard icon={<Phone size={18} />} label="PHONE" value={selected.phone} />
              <InfoCard icon={<MapPin size={18} />} label="LOCATION" value={selected.location} />
              <InfoCard icon={<Calendar size={18} />} label="LAST CONTACT" value={selected.time} />
            </div>

            <div className="rounded-2xl bg-[#171923] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm tracking-[0.12em] text-[#9CA3AF]">
                <MessageSquare size={16} />
                LATEST NOTE
              </div>
              <p className="font-semibold text-white">{selected.note}</p>
            </div>

            <div>
              <p className="mb-4 text-sm tracking-[0.12em] text-[#9CA3AF]">
                QUICK ACTIONS
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-[#F97316] px-4 py-3 font-semibold text-white hover:bg-[#EA580C]">
                  <Mail size={17} />
                  Send Email
                </button>

                <button className="flex items-center gap-2 rounded-xl bg-[#171923] px-4 py-3 font-semibold text-white">
                  <Tag size={17} />
                  Change Plan
                </button>

                <button className="flex items-center gap-2 rounded-xl bg-[#171923] px-4 py-3 font-semibold text-white">
                  <MessageSquare size={17} />
                  Add Note
                </button>

                <button className="flex items-center gap-2 rounded-xl bg-[#171923] px-4 py-3 font-semibold text-white">
                  <RefreshCcw size={17} />
                  Log Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#171923] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm tracking-[0.12em] text-[#9CA3AF]">
        {icon}
        {label}
      </div>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}