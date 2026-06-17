export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-[#9CA3AF]">{description}</p>
    </div>
  );
}