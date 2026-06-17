"use client";

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
import { useEffect, useMemo, useState } from "react";

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status?: string;
  createdAt: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

function badgeClass(status?: string) {
  if (status === "new") return "bg-yellow-500/15 text-yellow-400";
  return "bg-[#431407] text-[#F97316]";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchContacts() {
    try {
      const res = await fetch("/api/contacts", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setContacts(data.data);
        setSelectedContact(data.data[0] || null);
      }
    } catch (error) {
      console.log("Failed to fetch contacts", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [contacts, search]);

  const totalContacts = contacts.length;
  const leads = contacts.filter((contact) => contact.status === "new").length;
  const members = totalContacts - leads;

  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">TOTAL CONTACTS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">
            {totalContacts}
          </h2>
          <p className="mt-4 text-[#9CA3AF]">Live from database</p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">MEMBERS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">{members}</h2>
          <p className="mt-4 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} />
            Active relationships
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">LEADS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">{leads}</h2>
          <p className="mt-4 text-[#9CA3AF]">Awaiting conversion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
          <div className="border-b border-[#1F2937] p-5">
            <div className="flex items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
              <Search size={20} />
              <input
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            {loading ? (
              <p className="p-5 text-[#9CA3AF]">Loading contacts...</p>
            ) : filteredContacts.length === 0 ? (
              <p className="p-5 text-[#9CA3AF]">No contacts found.</p>
            ) : (
              filteredContacts.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`flex w-full items-center justify-between border-b border-[#1F2937] p-5 text-left last:border-b-0 ${
                    selectedContact?._id === contact._id
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
                        <h3 className="font-bold text-white">
                          {contact.name}
                        </h3>
                        <span
                          className={`rounded-md px-2 py-1 text-xs font-bold ${badgeClass(
                            contact.status
                          )}`}
                        >
                          {contact.status || "lead"}
                        </span>
                      </div>
                      <p className="text-sm text-[#9CA3AF]">{contact.email}</p>
                    </div>
                  </div>

                  <p className="hidden text-sm text-[#9CA3AF] sm:block">
                    {formatDate(contact.createdAt)}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827]">
          {!selectedContact ? (
            <p className="p-6 text-[#9CA3AF]">Select a contact to view details.</p>
          ) : (
            <>
              <div className="flex flex-col gap-4 border-b border-[#1F2937] p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#431407] text-xl font-bold text-[#F97316]">
                    {initials(selectedContact.name)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-white">
                        {selectedContact.name}
                      </h2>
                      <span className="rounded-md bg-[#431407] px-2 py-1 text-xs font-bold text-[#F97316]">
                        {selectedContact.status || "lead"}
                      </span>
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
                  <InfoCard
                    icon={<Mail size={18} />}
                    label="EMAIL"
                    value={selectedContact.email}
                  />
                  <InfoCard
                    icon={<Phone size={18} />}
                    label="PHONE"
                    value={selectedContact.phone}
                  />
                  <InfoCard
                    icon={<MapPin size={18} />}
                    label="LOCATION"
                    value="Not added"
                  />
                  <InfoCard
                    icon={<Calendar size={18} />}
                    label="LAST CONTACT"
                    value={formatDate(selectedContact.createdAt)}
                  />
                </div>

                <div className="rounded-2xl bg-[#171923] p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm tracking-[0.12em] text-[#9CA3AF]">
                    <MessageSquare size={16} />
                    LATEST NOTE
                  </div>
                  <p className="font-semibold text-white">
                    {selectedContact.message}
                  </p>
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
                      Change Status
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
            </>
          )}
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