export default function StatCard({
  title,
  value,
  desc,
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
      <p className="tracking-[0.2em] text-[var(--admin-muted)]">{title}</p>
      <h2 className="mt-6 text-4xl font-bold text-[var(--admin-text)]">
        {value}
      </h2>
      <p className="mt-4 text-[var(--admin-muted)]">{desc}</p>
    </div>
  );
}