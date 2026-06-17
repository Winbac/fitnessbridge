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
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <p className="tracking-[0.2em] text-[#9CA3AF]">{title}</p>
      <h2 className="mt-6 text-4xl font-bold text-white">{value}</h2>
      <p className="mt-4 text-[#9CA3AF]">{desc}</p>
    </div>
  );
}