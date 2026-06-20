"use client";

import Link from "next/link";
import toast from "react-hot-toast";
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
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function badgeClass(status?: string) {
  if (status === "new") return "bg-yellow-500/15 text-yellow-400";
  return "bg-[#F97316]/20 text-[#F97316]";
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
      } else {
        toast.error(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Contact deleted successfully");
        fetchContacts();
        setSelectedContact(null);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
          <h1 className="text-3xl font-bold text-[var(--admin-text)]">
            Contacts
          </h1>
          <p className="mt-2 text-[var(--admin-muted)]">
            Members and leads in your CRM.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]">
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <ContactStat
          title="TOTAL CONTACTS"
          value={totalContacts}
          desc="Live from database"
        />

        <ContactStat
          title="MEMBERS"
          value={members}
          desc="Active relationships"
          positive
        />

        <ContactStat
          title="LEADS"
          value={leads}
          desc="Awaiting conversion"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)]">
          <div className="border-b border-[var(--admin-border)] p-5">
            <div className="flex items-center gap-3 rounded-xl bg-[var(--admin-panel)] px-4 py-3 text-[var(--admin-muted)]">
              <Search size={20} />
              <input
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
              />
            </div>
          </div>

          <div>
            {loading ? (
              <p className="p-5 text-[var(--admin-muted)]">
                Loading contacts...
              </p>
            ) : filteredContacts.length === 0 ? (
              <p className="p-5 text-[var(--admin-muted)]">
                No contacts found.
              </p>
            ) : (
              filteredContacts.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`flex w-full items-center justify-between border-b border-[var(--admin-border)] p-5 text-left last:border-b-0 ${
                    selectedContact?._id === contact._id
                      ? "border-l-2 border-l-[#F97316] bg-[#F97316]/10"
                      : "hover:bg-[var(--admin-panel)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F97316]/20 font-bold text-[#F97316]">
                      {initials(contact.name)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[var(--admin-text)]">
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
                      <p className="text-sm text-[var(--admin-muted)]">
                        {contact.email}
                      </p>
                    </div>
                  </div>

                  <p className="hidden text-sm text-[var(--admin-muted)] sm:block">
                    {formatDate(contact.createdAt)}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)]">
          {!selectedContact ? (
            <p className="p-6 text-[var(--admin-muted)]">
              Select a contact to view details.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-4 border-b border-[var(--admin-border)] p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316]/20 text-xl font-bold text-[#F97316]">
                    {initials(selectedContact.name)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-[var(--admin-text)]">
                        {selectedContact.name}
                      </h2>
                      <span className="rounded-md bg-[#F97316]/20 px-2 py-1 text-xs font-bold text-[#F97316]">
                        {selectedContact.status || "lead"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/contacts/edit/${selectedContact._id}`}
                    className="text-[#F97316] hover:text-[#EA580C]"
                  >
                    <Pencil size={20} />
                  </Link>

                  <button
                    onClick={() => handleDelete(selectedContact._id)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoCard icon={<Mail size={18} />} label="EMAIL" value={selectedContact.email} />
                  <InfoCard icon={<Phone size={18} />} label="PHONE" value={selectedContact.phone} />
                  <InfoCard icon={<MapPin size={18} />} label="LOCATION" value="Not added" />
                  <InfoCard icon={<Calendar size={18} />} label="LAST CONTACT" value={formatDate(selectedContact.createdAt)} />
                </div>

                <div className="rounded-2xl bg-[var(--admin-panel)] p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm tracking-[0.12em] text-[var(--admin-muted)]">
                    <MessageSquare size={16} />
                    LATEST NOTE
                  </div>
                  <p className="font-semibold text-[var(--admin-text)]">
                    {selectedContact.message}
                  </p>
                </div>

                <div>
                  <p className="mb-4 text-sm tracking-[0.12em] text-[var(--admin-muted)]">
                    QUICK ACTIONS
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 rounded-xl bg-[#F97316] px-4 py-3 font-semibold text-white hover:bg-[#EA580C]">
                      <Mail size={17} />
                      Send Email
                    </button>

                    <ActionButton icon={<Tag size={17} />} label="Change Status" />
                    <ActionButton icon={<MessageSquare size={17} />} label="Add Note" />
                    <ActionButton icon={<RefreshCcw size={17} />} label="Log Activity" />
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

function ContactStat({
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
        className={`mt-4 flex items-center gap-2 ${
          positive ? "text-emerald-400" : "text-[var(--admin-muted)]"
        }`}
      >
        {positive && <TrendingUp size={16} />}
        {desc}
      </p>
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
    <div className="rounded-2xl bg-[var(--admin-panel)] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm tracking-[0.12em] text-[var(--admin-muted)]">
        {icon}
        {label}
      </div>
      <p className="font-bold text-[var(--admin-text)]">{value}</p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-4 py-3 font-semibold text-[var(--admin-text)] hover:bg-[#F97316] hover:text-white">
      {icon}
      {label}
    </button>
  );
}